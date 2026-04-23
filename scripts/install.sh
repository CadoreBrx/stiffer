#!/usr/bin/env sh
# Instalação automática (Linux/macOS) — gera .env, npm install, build
# Uso:
#   ./scripts/install.sh
#   ./scripts/install.sh www.exemplo.com.br
#   DOMAIN=exemplo.com.br ./scripts/install.sh

set -e
cd "$(dirname "$0")/.."
if [ -n "${1:-}" ]; then
  export DOMAIN="$1"
fi
if [ -n "${DOMAIN:-}" ]; then
  npm run setup -- --domain="${DOMAIN}"
else
  npm run setup
fi
