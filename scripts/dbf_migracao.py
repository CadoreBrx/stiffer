#!/usr/bin/env python3
"""
Migra arquivos DBF em lote para CSV e SQLite.

Uso:
  python scripts/dbf_migracao.py --origem "C:\\Users\\User\\Desktop\\bckp]" --saida "./migracao_cliente"
  python scripts/dbf_migracao.py --origem "C:\\bckp]" --saida "./migracao" --somente CLIENTES,ORDEM --encoding cp1252
"""
from __future__ import annotations

import argparse
import csv
import datetime as dt
import decimal
import json
import sqlite3
from pathlib import Path
from typing import Iterable, List

from dbfread import DBF


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description="Exporta DBF para CSV + SQLite")
    parser.add_argument("--origem", required=True, help="Pasta com arquivos .DBF")
    parser.add_argument("--saida", required=True, help="Pasta de output")
    parser.add_argument(
        "--somente",
        default="",
        help="Lista de tabelas sem extensão, separadas por vírgula (ex: CLIENTES,ORDEM)",
    )
    parser.add_argument(
        "--encoding",
        default="cp1252",
        help="Encoding dos DBF (default: cp1252)",
    )
    return parser.parse_args()


def list_dbf_files(source_dir: Path) -> List[Path]:
    files = sorted(source_dir.glob("*.DBF")) + sorted(source_dir.glob("*.dbf"))
    unique = {}
    for f in files:
        unique[f.stem.upper()] = f
    return sorted(unique.values(), key=lambda p: p.stem.upper())


def normalize_value(value: object) -> object:
    if value is None:
        return None
    if isinstance(value, (dt.date, dt.datetime)):
        return value.isoformat()
    if isinstance(value, dt.time):
        return value.isoformat()
    if isinstance(value, decimal.Decimal):
        return float(value)
    if isinstance(value, bytes):
        return value.decode("utf-8", errors="ignore")
    return value


def quote_ident(name: str) -> str:
    return '"' + name.replace('"', '""') + '"'


def unique_columns(columns: List[str]) -> List[str]:
    seen: dict[str, int] = {}
    out: List[str] = []
    for col in columns:
        key = col.upper()
        seen[key] = seen.get(key, 0) + 1
        if seen[key] == 1:
            out.append(col)
        else:
            out.append(f"{col}_{seen[key]}")
    return out


def create_sqlite_table(conn: sqlite3.Connection, table_name: str, columns: Iterable[str]) -> None:
    cols_sql = ", ".join(f"{quote_ident(c)} TEXT" for c in columns)
    sql = f"CREATE TABLE IF NOT EXISTS {quote_ident(table_name)} ({cols_sql})"
    conn.execute(sql)


def insert_rows_sqlite(
    conn: sqlite3.Connection,
    table_name: str,
    columns: List[str],
    rows: List[dict],
) -> None:
    if not rows:
        return
    placeholders = ", ".join(["?"] * len(columns))
    cols = ", ".join(quote_ident(c) for c in columns)
    sql = f"INSERT INTO {quote_ident(table_name)} ({cols}) VALUES ({placeholders})"
    payload = []
    for row in rows:
        payload.append([None if row.get(c) is None else str(row.get(c)) for c in columns])
    conn.executemany(sql, payload)


def export_table(
    dbf_path: Path,
    output_dir: Path,
    conn: sqlite3.Connection,
    encoding: str,
) -> dict:
    table_name = dbf_path.stem.upper()
    csv_path = output_dir / "csv" / f"{table_name}.csv"
    dbf = DBF(
        str(dbf_path),
        encoding=encoding,
        ignore_missing_memofile=True,
        char_decode_errors="ignore",
        load=True,
    )
    fields_original = [f.name for f in dbf.fields]
    fields = unique_columns(fields_original)
    rows_normalized: List[dict] = []

    for record in dbf:
        # Alguns DBFs têm nomes de campo duplicados; repetimos o mesmo valor em colunas sufixadas.
        mapped: dict[str, object] = {}
        for original, unique in zip(fields_original, fields):
            mapped[unique] = normalize_value(record.get(original))
        rows_normalized.append(mapped)

    csv_path.parent.mkdir(parents=True, exist_ok=True)
    with csv_path.open("w", newline="", encoding="utf-8-sig") as f:
        writer = csv.DictWriter(f, fieldnames=fields, extrasaction="ignore")
        writer.writeheader()
        for row in rows_normalized:
            writer.writerow(row)

    create_sqlite_table(conn, table_name, fields)
    insert_rows_sqlite(conn, table_name, fields, rows_normalized)

    return {
        "tabela": table_name,
        "arquivo_dbf": str(dbf_path),
        "arquivo_csv": str(csv_path),
        "linhas": len(rows_normalized),
        "campos": fields,
    }


def main() -> int:
    args = parse_args()
    source_dir = Path(args.origem)
    output_dir = Path(args.saida)

    if not source_dir.exists():
        raise SystemExit(f"Pasta de origem não existe: {source_dir}")

    output_dir.mkdir(parents=True, exist_ok=True)
    sqlite_path = output_dir / "migracao.db"
    relatorio_path = output_dir / "relatorio_migracao.json"
    erros_path = output_dir / "erros.txt"

    only = {t.strip().upper() for t in args.somente.split(",") if t.strip()}
    dbf_files = list_dbf_files(source_dir)
    if only:
        dbf_files = [f for f in dbf_files if f.stem.upper() in only]

    if not dbf_files:
        raise SystemExit("Nenhum arquivo DBF encontrado para processar.")

    summary = {
        "origem": str(source_dir),
        "saida": str(output_dir),
        "encoding": args.encoding,
        "total_tabelas": 0,
        "total_linhas": 0,
        "tabelas": [],
    }
    errors: List[str] = []

    conn = sqlite3.connect(sqlite_path)
    try:
        for dbf_path in dbf_files:
            try:
                info = export_table(dbf_path, output_dir, conn, args.encoding)
                summary["tabelas"].append(info)
                summary["total_tabelas"] += 1
                summary["total_linhas"] += info["linhas"]
                print(f"[OK] {info['tabela']}: {info['linhas']} linhas")
            except Exception as exc:  # noqa: BLE001
                msg = f"[ERRO] {dbf_path.name}: {exc}"
                errors.append(msg)
                print(msg)
        conn.commit()
    finally:
        conn.close()

    relatorio_path.write_text(
        json.dumps(summary, ensure_ascii=False, indent=2),
        encoding="utf-8",
    )
    if errors:
        erros_path.write_text("\n".join(errors), encoding="utf-8")

    print(f"\nRelatório: {relatorio_path}")
    print(f"SQLite: {sqlite_path}")
    print(f"CSV: {output_dir / 'csv'}")
    if errors:
        print(f"Erros: {erros_path}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
