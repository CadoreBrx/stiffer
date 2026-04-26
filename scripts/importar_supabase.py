#!/usr/bin/env python3
"""
Importa CSVs (gerados dos DBFs) para Supabase Postgres em schema staging.

Exemplo:
  python scripts/importar_supabase.py \
    --csv-dir "./migracao_cliente_v2/csv" \
    --schema "sul_auto_center_raw" \
    --cliente "Sul Auto Center"

Config:
  - Use env SUPABASE_DB_URL ou passe --db-url
"""
from __future__ import annotations

import argparse
import csv
import hashlib
import os
import re
from pathlib import Path
from typing import Dict, List, Tuple

import psycopg


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description="Importa CSV para Supabase")
    parser.add_argument(
        "--csv-dir",
        default="./migracao_cliente_v2/csv",
        help="Diretorio com CSVs exportados dos DBFs",
    )
    parser.add_argument(
        "--schema",
        default="sul_auto_center_raw",
        help="Schema destino no Postgres",
    )
    parser.add_argument(
        "--cliente",
        default="Sul Auto Center",
        help="Nome do cliente para rastreabilidade da carga",
    )
    parser.add_argument(
        "--db-url",
        default="",
        help="String de conexao Postgres (sobrescreve SUPABASE_DB_URL)",
    )
    parser.add_argument(
        "--truncate",
        action="store_true",
        help="Limpa a tabela antes de inserir",
    )
    parser.add_argument(
        "--batch-size",
        type=int,
        default=1000,
        help="Tamanho do lote de insert",
    )
    return parser.parse_args()


def quote_ident(name: str) -> str:
    return '"' + name.replace('"', '""') + '"'


def sanitize_base_col(name: str) -> str:
    col = name.strip().lower()
    col = re.sub(r"[^a-z0-9_]+", "_", col)
    col = re.sub(r"_+", "_", col).strip("_")
    if not col:
        col = "campo"
    if col[0].isdigit():
        col = f"c_{col}"
    if len(col) > 54:
        suffix = hashlib.sha1(col.encode("utf-8")).hexdigest()[:8]
        col = f"{col[:45]}_{suffix}"
    return col


def sanitize_columns(raw_cols: List[str]) -> List[Tuple[str, str]]:
    used: Dict[str, int] = {}
    mapped: List[Tuple[str, str]] = []
    for raw in raw_cols:
        base = sanitize_base_col(raw)
        idx = used.get(base, 0) + 1
        used[base] = idx
        if idx == 1:
            final = base
        else:
            final = f"{base}_{idx}"
        mapped.append((raw, final))
    return mapped


def create_table(
    cur: psycopg.Cursor,
    schema: str,
    table: str,
    mapped_cols: List[Tuple[str, str]],
) -> None:
    cols_sql = [f"{quote_ident(col)} text" for _, col in mapped_cols]
    sql = f"""
    create schema if not exists {quote_ident(schema)};
    create table if not exists {quote_ident(schema)}.{quote_ident(table)} (
      id bigserial primary key,
      _cliente text not null,
      _imported_at timestamptz not null default now(),
      {", ".join(cols_sql)}
    );
    """
    cur.execute(sql)


def import_csv(
    conn: psycopg.Connection,
    csv_path: Path,
    schema: str,
    cliente: str,
    truncate: bool,
    batch_size: int,
) -> int:
    table = sanitize_base_col(csv_path.stem)
    with csv_path.open("r", encoding="utf-8-sig", newline="") as f:
        reader = csv.DictReader(f)
        if not reader.fieldnames:
            return 0
        mapped_cols = sanitize_columns(reader.fieldnames)
        raw_cols = [raw for raw, _ in mapped_cols]
        dst_cols = [dst for _, dst in mapped_cols]

        with conn.cursor() as cur:
            create_table(cur, schema, table, mapped_cols)
            if truncate:
                cur.execute(
                    f"truncate table {quote_ident(schema)}.{quote_ident(table)};"
                )

            insert_cols = ["_cliente"] + dst_cols
            placeholders = ", ".join(["%s"] * len(insert_cols))
            insert_sql = f"""
            insert into {quote_ident(schema)}.{quote_ident(table)}
            ({", ".join(quote_ident(c) for c in insert_cols)})
            values ({placeholders})
            """
            batch: List[List[str | None]] = []
            total = 0
            for row in reader:
                values: List[str | None] = [cliente]
                for raw in raw_cols:
                    val = row.get(raw)
                    values.append(val if val not in ("", None) else None)
                batch.append(values)
                if len(batch) >= batch_size:
                    cur.executemany(insert_sql, batch)
                    total += len(batch)
                    batch.clear()
            if batch:
                cur.executemany(insert_sql, batch)
                total += len(batch)
            return total


def ensure_import_log(cur: psycopg.Cursor, schema: str) -> None:
    cur.execute(
        f"""
        create schema if not exists {quote_ident(schema)};
        create table if not exists {quote_ident(schema)}._import_log (
          id bigserial primary key,
          cliente text not null,
          tabela text not null,
          arquivo text not null,
          linhas integer not null,
          executado_em timestamptz not null default now()
        );
        """
    )


def main() -> int:
    args = parse_args()
    csv_dir = Path(args.csv_dir)
    if not csv_dir.exists():
        raise SystemExit(f"Diretorio nao encontrado: {csv_dir}")

    db_url = args.db_url or os.getenv("SUPABASE_DB_URL", "")
    if not db_url:
        raise SystemExit("Informe --db-url ou variavel de ambiente SUPABASE_DB_URL.")

    csv_files = sorted(list(csv_dir.glob("*.csv")))
    if not csv_files:
        raise SystemExit(f"Nenhum CSV encontrado em: {csv_dir}")

    print(f"Conectando ao Supabase: schema={args.schema}, cliente={args.cliente}")
    with psycopg.connect(db_url) as conn:
        conn.autocommit = False
        total_rows = 0
        try:
            with conn.cursor() as cur:
                ensure_import_log(cur, args.schema)
            for csv_path in csv_files:
                inserted = import_csv(
                    conn=conn,
                    csv_path=csv_path,
                    schema=args.schema,
                    cliente=args.cliente,
                    truncate=args.truncate,
                    batch_size=args.batch_size,
                )
                with conn.cursor() as cur:
                    cur.execute(
                        f"""
                        insert into {quote_ident(args.schema)}._import_log
                        (cliente, tabela, arquivo, linhas)
                        values (%s, %s, %s, %s)
                        """,
                        (
                            args.cliente,
                            sanitize_base_col(csv_path.stem),
                            str(csv_path),
                            inserted,
                        ),
                    )
                conn.commit()
                total_rows += inserted
                print(f"[OK] {csv_path.name}: {inserted} linhas")
        except Exception:
            conn.rollback()
            raise

    print(f"\nImportacao concluida: {len(csv_files)} tabelas, {total_rows} linhas.")
    print(
        "Proximo passo: mapear do schema staging para as tabelas oficiais do sistema."
    )
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
