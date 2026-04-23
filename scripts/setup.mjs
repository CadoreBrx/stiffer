#!/usr/bin/env node
/**
 * Instala dependências, grava o domínio em .env (VITE_SITE_URL) e gera dist/.
 * Uso:
 *   npm run setup
 *   npm run setup -- --domain=www.construtorapiffer.com.br
 *   DOMAIN=www.exemplo.com.br npm run setup
 */
import { writeFileSync } from 'node:fs'
import { spawnSync } from 'node:child_process'
import { fileURLToPath } from 'node:url'
import path from 'node:path'

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..')

let domain = process.env.DOMAIN?.trim() ?? ''
for (const a of process.argv.slice(2)) {
  if (a.startsWith('--domain=')) domain = a.slice(9).trim()
}

if (domain) {
  let url = domain.trim()
  if (!/^https?:\/\//i.test(url)) {
    const hostOnly = url.split('/')[0]
    const ipv4WithOptionalPort =
      /^(\d{1,3}\.){3}\d{1,3}(:\d{1,5})?$/i.test(hostOnly)
    url = ipv4WithOptionalPort ? `http://${url}` : `https://${url}`
  }
  url = url.replace(/\/$/, '')
  const content = `# Gerado por scripts/setup.mjs\nVITE_SITE_URL=${url}\n`
  writeFileSync(path.join(root, '.env'), content, 'utf8')
  console.log(`[setup] .env com VITE_SITE_URL=${url}`)
} else {
  console.log(
    '[setup] Nenhum --domain=… : .env não alterado. Copie .env.example se quiser URL pública no build.',
  )
}

const npm = process.platform === 'win32' ? 'npm.cmd' : 'npm'
const sh = { cwd: root, stdio: 'inherit', shell: true }

let r = spawnSync(npm, ['install'], sh)
if (r.status !== 0) process.exit(r.status ?? 1)

r = spawnSync(npm, ['run', 'build'], sh)
if (r.status !== 0) process.exit(r.status ?? 1)

console.log(
  '\n[setup] Concluído. Envie a pasta dist/ ao hospedeiro ou ligue o domínio conforme deploy/README.md',
)
