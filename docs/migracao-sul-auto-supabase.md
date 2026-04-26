# Migracao Sul Auto Center para Supabase

## 1) O que ja foi extraido

- Origem DBF: `C:\Users\User\Desktop\bckp]`
- Exportacao pronta em:
  - `migracao_cliente_v2/csv/*.csv`
  - `migracao_cliente_v2/migracao.db`
  - `migracao_cliente_v2/relatorio_migracao.json`
  - `migracao_cliente_v2/erros.txt`

## 2) Preparar credencial do Supabase

No painel Supabase:
`Project Settings -> Database -> Connection string -> URI`

Use a URI com `sslmode=require`.

No PowerShell:

```powershell
$env:SUPABASE_DB_URL = "postgresql://postgres.PROJECT_REF:SENHA@aws-0-us-east-1.pooler.supabase.com:6543/postgres?sslmode=require"
```

## 3) Importar para schema staging

```powershell
cd C:\Users\User\Desktop\construtora-stiffer
.\scripts\importar-supabase.ps1 -Cliente "Sul Auto Center" -Schema "sul_auto_center_raw"
```

Se for reprocessar tudo do zero:

```powershell
.\scripts\importar-supabase.ps1 -Cliente "Sul Auto Center" -Schema "sul_auto_center_raw" -Truncate
```

## 4) Validar no Supabase SQL Editor

```sql
select table_name
from information_schema.tables
where table_schema = 'sul_auto_center_raw'
order by 1;
```

```sql
select *
from sul_auto_center_raw._import_log
order by executado_em desc
limit 20;
```

## 5) Proximo passo (recomendado)

Mapear do staging para as tabelas oficiais do sistema:
- `clientes` <- `sul_auto_center_raw.clientes`
- `ordens_servico` <- `sul_auto_center_raw.ordem` + `ordem2` + `ordem3`
- `produtos` <- `sul_auto_center_raw.produtos`
- `contas_receber` <- `sul_auto_center_raw.receber`
- `contas_pagar` <- `sul_auto_center_raw.pagar`

Importante:
- O schema `sul_auto_center_raw` e privado (nao expor via API publica).
- Evitar usar esse schema direto no app; use transformacao para schema de dominio.
