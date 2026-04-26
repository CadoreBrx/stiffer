# Importa CSVs para Supabase (schema staging).
#
# Exemplo:
#   $env:SUPABASE_DB_URL = "postgresql://postgres.PROJECT_REF:senha@aws-0-us-east-1.pooler.supabase.com:6543/postgres?sslmode=require"
#   .\scripts\importar-supabase.ps1 -Cliente "Sul Auto Center" -Schema "sul_auto_center_raw"
#
param(
    [string] $CsvDir = ".\migracao_cliente_v2\csv",
    [string] $Schema = "sul_auto_center_raw",
    [string] $Cliente = "Sul Auto Center",
    [switch] $Truncate,
    [int] $BatchSize = 1000,
    [string] $DbUrl = ""
)

$ErrorActionPreference = "Stop"
$root = Resolve-Path (Join-Path $PSScriptRoot "..")
Set-Location $root

python -m pip install --quiet psycopg[binary]
if ($LASTEXITCODE -ne 0) { exit $LASTEXITCODE }

$args = @(
    "scripts/importar_supabase.py",
    "--csv-dir", $CsvDir,
    "--schema", $Schema,
    "--cliente", $Cliente,
    "--batch-size", $BatchSize
)
if ($Truncate) { $args += "--truncate" }
if ($DbUrl) { $args += @("--db-url", $DbUrl) }

python @args
exit $LASTEXITCODE
