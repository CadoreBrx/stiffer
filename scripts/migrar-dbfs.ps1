# Migra DBFs para CSV + SQLite.
# Exemplo:
#   .\scripts\migrar-dbfs.ps1 -Origem "C:\Users\User\Desktop\bckp]" -Saida ".\migracao_cliente"

param(
    [Parameter(Mandatory = $true)]
    [string] $Origem,

    [string] $Saida = ".\migracao_cliente",

    [string] $Somente = "",

    [string] $Encoding = "cp1252"
)

$ErrorActionPreference = "Stop"
$root = Resolve-Path (Join-Path $PSScriptRoot "..")
Set-Location $root

python -m pip install --quiet dbfread
if ($LASTEXITCODE -ne 0) { exit $LASTEXITCODE }

$args = @(
    "scripts/dbf_migracao.py",
    "--origem", $Origem,
    "--saida", $Saida,
    "--encoding", $Encoding
)
if ($Somente) {
    $args += @("--somente", $Somente)
}

python @args
exit $LASTEXITCODE
