#!/usr/bin/env bash
# Instalador automático — Ubuntu/Debian (VPS).
# Uso:
#   curl -fsSL https://raw.githubusercontent.com/CadoreBrx/stiffer/main/scripts/install.sh | bash -s --
#   bash scripts/install.sh
#
# Variáveis (opcional):
#   STIFFER_REPO   URL do git (default: https://github.com/CadoreBrx/stiffer.git)
#   STIFFER_DIR    Pasta do projeto (default: ~/stiffer se não estiver dentro do repo)
#   STIFFER_DOMAIN     domínio/IP → npm run setup (sobrescreve .env)
#   STIFFER_PUBLIC_URL fallback do URL mostrado no fim (se .env.production não tiver VITE_SITE_URL)
#   SKIP_NODE=1   não instala Node via apt
#   SKIP_PM2=1    não instala nem arranca PM2

set -euo pipefail

STIFFER_REPO="${STIFFER_REPO:-https://github.com/CadoreBrx/stiffer.git}"
STIFFER_DIR="${STIFFER_DIR:-$HOME/stiffer}"
STIFFER_DOMAIN="${STIFFER_DOMAIN:-}"
STIFFER_PUBLIC_URL="${STIFFER_PUBLIC_URL:-http://206.183.131.181:6173}"

SKIP_NODE="${SKIP_NODE:-0}"
SKIP_PM2="${SKIP_PM2:-0}"

log() { printf '\033[1;36m[stiffer]\033[0m %s\n' "$*"; }
die() { printf '\033[1;31m[stiffer]\033[0m %s\n' "$*" >&2; exit 1; }

# URL pública (browser) a partir de .env.production — não confundir com bind 0.0.0.0 do Node
vite_public_url() {
  local root="$1"
  local f="$root/.env.production"
  [[ -f "$f" ]] || return 1
  grep -m1 '^[[:space:]]*VITE_SITE_URL=' "$f" 2>/dev/null \
    | sed -e 's/^[[:space:]]*VITE_SITE_URL=//' -e 's/[[:space:]]*#.*$//' -e 's/\r$//' \
      -e 's/^"//' -e 's/"$//' -e "s/^'//" -e "s/'$//"
}

run_as_root() {
  if [[ "$(id -u)" -eq 0 ]]; then
    "$@"
  else
    command -v sudo >/dev/null 2>&1 || die "Precisa de root ou sudo para instalar Node/apt."
    sudo "$@"
  fi
}

node_meets_engine() {
  command -v node >/dev/null 2>&1 || return 1
  node <<'NODE'
const v = process.version.slice(1).split('.').map(Number);
const [a, b, c] = v;
const ok =
  a > 20 ||
  (a === 20 && (b > 19 || (b === 19 && c >= 0)));
process.exit(ok ? 0 : 1);
NODE
}

install_node_debian() {
  log "A instalar Node.js 22 (NodeSource)…"
  run_as_root apt-get update -qq
  run_as_root apt-get install -y ca-certificates curl gnupg
  if [[ "$(id -u)" -eq 0 ]]; then
    curl -fsSL https://deb.nodesource.com/setup_22.x | bash -
  else
    curl -fsSL https://deb.nodesource.com/setup_22.x | sudo bash -
  fi
  run_as_root apt-get install -y nodejs
  hash -r
  command -v node >/dev/null 2>&1 || die "Node não ficou disponível no PATH."
  log "Node $(node -v) | npm $(npm -v)"
}

ensure_git() {
  command -v git >/dev/null 2>&1 && return 0
  log "A instalar git…"
  run_as_root apt-get update -qq
  run_as_root apt-get install -y git
}

find_project_root() {
  local here rel
  # Executado a partir de ficheiro no disco
  if [[ -n "${BASH_SOURCE[0]:-}" && "${BASH_SOURCE[0]}" != "-" && -f "${BASH_SOURCE[0]}" ]]; then
    here="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
    rel="$(cd "$here/.." && pwd)"
    if [[ -f "$rel/package.json" && -f "$rel/ecosystem.config.cjs" ]]; then
      echo "$rel"
      return 0
    fi
  fi
  return 1
}

clone_or_update() {
  local dir="$1"
  ensure_git
  if [[ -d "$dir/.git" ]]; then
    log "Repositório existente em $dir — git pull"
    git -C "$dir" pull --ff-only
  else
    if [[ -e "$dir" ]]; then
      die "A pasta $dir já existe e não é um clone git. Apague ou defina STIFFER_DIR."
    fi
    log "A clonar $STIFFER_REPO → $dir"
    git clone "$STIFFER_REPO" "$dir"
  fi
}

usage() {
  cat <<'EOF'
Uso: bash scripts/install.sh [opções]
  ou: curl -fsSL …/install.sh | bash -s -- [opções]

  --domain=HOST     Ex.: www.construtorapiffer.com.br (corre npm run setup)
  --dir=CAMINHO     Onde clonar/atualizar (default: ~/stiffer)
  --repo=URL        Repositório git
  --skip-node       Não instalar Node via apt
  --skip-pm2        Não instalar nem iniciar PM2

Variáveis: STIFFER_DOMAIN, STIFFER_DIR, STIFFER_REPO, SKIP_NODE, SKIP_PM2
EOF
}

parse_args() {
  while [[ $# -gt 0 ]]; do
    case "$1" in
      --domain=*)
        STIFFER_DOMAIN="${1#*=}"
        ;;
      --dir=*)
        STIFFER_DIR="${1#*=}"
        ;;
      --repo=*)
        STIFFER_REPO="${1#*=}"
        ;;
      --skip-node)
        SKIP_NODE=1
        ;;
      --skip-pm2)
        SKIP_PM2=1
        ;;
      -h|--help)
        usage
        exit 0
        ;;
      *)
        die "Opção desconhecida: $1 (use --help)"
        ;;
    esac
    shift
  done
}

main() {
  parse_args "$@"

  if [[ "$(uname -s)" != "Linux" ]]; then
    die "Este script é para Linux (Ubuntu/Debian). Em Windows use: powershell -File scripts/install.ps1"
  fi

  if ! grep -qiE 'debian|ubuntu' /etc/os-release 2>/dev/null; then
    log "Aviso: não detetei Debian/Ubuntu em /etc/os-release. Continuo na mesma…"
  fi

  if [[ "$SKIP_NODE" != "1" ]]; then
    if ! node_meets_engine; then
      install_node_debian
    else
      log "Node OK: $(node -v)"
    fi
  else
    node_meets_engine || die "Node precisa ser >= 20.19.0 (atual: $(node -v 2>/dev/null || echo ausente))"
  fi

  local ROOT
  if ROOT="$(find_project_root 2>/dev/null)"; then
    log "Projeto local: $ROOT"
  else
    ROOT="$STIFFER_DIR"
    clone_or_update "$ROOT"
  fi

  cd "$ROOT"
  log "A instalar dependências npm em $ROOT"
  rm -rf node_modules
  npm install

  if [[ -n "$STIFFER_DOMAIN" ]]; then
    log "Setup com domínio: $STIFFER_DOMAIN"
    npm run setup -- "--domain=$STIFFER_DOMAIN"
  else
    if [[ -f "$ROOT/.env.production" ]] && grep -q '^[[:space:]]*VITE_SITE_URL=' "$ROOT/.env.production" 2>/dev/null; then
      log "Build com VITE_SITE_URL do ficheiro .env.production"
    else
      log "Build (sem STIFFER_DOMAIN; sem VITE_SITE_URL em .env.production — canonical pode ficar vazio)"
    fi
    npm run build
  fi

  if [[ "$SKIP_PM2" != "1" ]]; then
    if ! command -v pm2 >/dev/null 2>&1; then
      log "A instalar PM2 globalmente…"
      npm install -g pm2
    fi
    log "A iniciar/reiniciar PM2 (app: stiffer)"
    pm2 delete stiffer 2>/dev/null || true
    pm2 start ecosystem.config.cjs
    pm2 save
    log "Concluído. Comandos: pm2 list | pm2 logs stiffer"
    local browser_url
    browser_url="$(vite_public_url "$ROOT" || true)"
    browser_url="${browser_url:-$STIFFER_PUBLIC_URL}"
    log "O servidor escuta em 0.0.0.0:6173 (todas as interfaces da VPS — é o comportamento normal)."
    log "No browser use este endereço: ${browser_url}"
    log "Se não abrir fora do servidor: ufw allow 6173/tcp && ufw reload"
  else
    log "PM2 ignorado. Testar: npm run start"
  fi
}

main "$@"
