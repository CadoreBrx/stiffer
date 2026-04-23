# Instalador — Windows (dev / build local). Requer Node.js 20.19+ (recomendado: 22 LTS).
# Uso: powershell -ExecutionPolicy Bypass -File scripts\install.ps1 [-Domain www.exemplo.com.br]

param(
    [string] $Domain = "",
    [switch] $SkipBuild
)

$ErrorActionPreference = "Stop"
$Root = (Resolve-Path (Join-Path $PSScriptRoot "..")).Path
if (-not (Test-Path (Join-Path $Root "package.json"))) {
    Write-Host "[stiffer] package.json nao encontrado acima de scripts/" -ForegroundColor Red
    exit 1
}

function Write-Stiffer($msg) { Write-Host "[stiffer] $msg" -ForegroundColor Cyan }

Set-Location $Root
Write-Stiffer "Raiz: $Root"

if (-not (Get-Command node -ErrorAction SilentlyContinue)) {
    Write-Host "[stiffer] Node.js nao encontrado. Instale 22 LTS: https://nodejs.org/" -ForegroundColor Red
    exit 1
}

$ver = node -p "process.version"
node -e "const v=process.version.slice(1).split('.').map(Number);const [a,b,c]=v;process.exit(a>20||(a===20&&(b>19||(b===19&&c>=0)))?0:1)" 2>$null | Out-Null
if ($LASTEXITCODE -ne 0) {
    Write-Host "[stiffer] Node $ver e antigo. Este projeto precisa >= 20.19.0 (use nvm-windows ou instalador oficial)." -ForegroundColor Red
    exit 1
}
Write-Stiffer "Node $ver OK"

Remove-Item -Recurse -Force node_modules -ErrorAction SilentlyContinue
npm install
if ($SkipBuild) { Write-Stiffer "Skip build."; exit 0 }

if ($Domain) {
    npm run setup -- "--domain=$Domain"
} else {
    npm run build
}

Write-Stiffer "Concluido. Dev: npm run dev | Preview estatico: npm run start"
