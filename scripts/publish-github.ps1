# Cria o repositorio no GitHub (na tua conta) e faz o primeiro push.
# Requisito: ja ter executado `gh auth login` uma vez nesta maquina.
#
# Uso:
#   .\scripts\publish-github.ps1
#   .\scripts\publish-github.ps1 -NomeRepo "construtora-piffer" -Publico

param(
    [string] $NomeRepo = "construtora-piffer",
    [switch] $Publico = $true
)

$gh = "C:\Program Files\GitHub CLI\gh.exe"
if (-not (Test-Path $gh)) {
    throw "GitHub CLI (gh) nao encontrado. Instale: winget install GitHub.cli"
}

$root = Resolve-Path (Join-Path $PSScriptRoot "..")
Set-Location $root

$prevErr = $ErrorActionPreference
$ErrorActionPreference = 'SilentlyContinue'
$null = & $gh auth status 2>&1
$authed = ($LASTEXITCODE -eq 0)
$ErrorActionPreference = $prevErr
if (-not $authed) {
    Write-Host ""
    Write-Host "Nao estas autenticado no GitHub. Num terminal, executa:"
    Write-Host "  gh auth login"
    Write-Host "Depois corre de novo: .\scripts\publish-github.ps1"
    Write-Host ""
    exit 1
}

$vis = if ($Publico) { "--public" } else { "--private" }
$remoteUrl = git remote get-url origin 2>$null
if ($LASTEXITCODE -eq 0) {
    Write-Host "Remote 'origin' ja existe: $remoteUrl"
    Write-Host "A fazer push..."
    git push -u origin main
    exit $LASTEXITCODE
}

Write-Host "A criar repositorio '$NomeRepo' e a enviar codigo..."
& $gh repo create $NomeRepo $vis --source=. --remote=origin --push
if ($LASTEXITCODE -ne 0) { exit $LASTEXITCODE }
$user = (& $gh api user -q .login 2>$null)
if ($user) { Write-Host "Feito. Abre: https://github.com/$user/$NomeRepo" }
else { Write-Host "Feito. Verifica o repositorio na tua conta GitHub." }
