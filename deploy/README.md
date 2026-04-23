# Publicar o site e apontar o domínio

O build gera a pasta `dist/` (HTML/CSS/JS estáticos). O roteamento do React (`/empreendimentos/...`) exige **fallback para `index.html`** no servidor (SPA).

## DNS (sempre, em qualquer hospedagem)

1. No painel do **registro.br**, GoDaddy, Cloudflare, etc., crie:
   - **A** `www` → IP do servidor **ou** **CNAME** `www` → `seudominio.netlify.app` / `cname.vercel-dns.com` (se a plataforma fornecer).
   - **A** `@` (raiz) → mesmo IP, ou use redirecionamento da plataforma de raiz → `www`.
2. Aguarde a propagação (minutos a horas).
3. Rode de novo o build com o domínio final: `npm run setup -- --domain=www.seudominio.com.br` para gravar `VITE_SITE_URL` no `.env`.

## Hospedagens com um clique

- **Vercel:** conecte o repositório Git; o ficheiro `vercel.json` já define o rewrite da SPA. Em *Settings → Domains* adicione o domínio e siga as instruções de DNS.
- **Netlify:** idem; `netlify.toml` e `public/_redirects` tratam a SPA. *Domain settings* → domínio personalizado.
- **Cloudflare Pages:** build `npm run build`, pasta `dist`, mesmo rewrite que Netlify (configurável na UI).

## Servidor próprio (Nginx / Caddy)

Veja ficheiros de exemplo na mesma pasta: `nginx-exemplo.conf` e `Caddyfile.exemplo`. Coloque o conteúdo de `dist/` em `/var/www/...` e configure SSL (Certbot ou Caddy).

## Variável de ambiente

`VITE_SITE_URL` (definida pelo `npm run setup -- --domain=...`) fica disponível no código em `import.meta.env` e no objeto `publicSiteUrl` em `src/lib/site.ts` para extensões futuras (metadados, canonical).
