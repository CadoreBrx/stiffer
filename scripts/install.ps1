# Instalacao automatica (Windows) — gera .env, npm install, build
# Uso:
#   .\scripts\install.ps1
#   .\scripts\install.ps1 -Domain "www.construtorapiffer.com.br"
#   $env:DOMAIN = "exemplo.com.br"; .\scripts\install.ps1

param(
    [string] $Domain = $env:DOMAIN
)

$ErrorActionPreference = "Stop"
$here = Split-Path -Parent $MyInvocation.MyCommand.Path
$root = Resolve-Path (Join-Path $here "..")
Set-Location $root

if ($Domain) {
    npm run setup -- --domain=$Domain
} else {
    npm run setup
}
if ($LASTEXITCODE -ne 0) { exit $LASTEXITCODE }
