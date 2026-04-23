# Construtora Piffer — site institucional

Site estático (Vite + React + TypeScript + Tailwind) com páginas de empreendimentos e galeria.

## Instalação automática (com domínio no `.env`)

O domínio alimenta `VITE_SITE_URL` para o build (URL pública, com `https://`).

**Windows (PowerShell):**

```powershell
cd construtora-stiffer
.\scripts\install.ps1 -Domain "www.seudominio.com.br"
```

**Qualquer SO (Node.js):**

```bash
cd construtora-stiffer
npm run setup -- --domain=www.seudominio.com.br
```

**Sem domínio ainda** (só dependências + build):

```bash
npm run setup
# ou: npm install && npm run build
```

A pasta de saída é `dist/`.

## Desenvolvimento

```bash
npm install
npm run dev
```

## Publicação e DNS

Resumo: subir o conteúdo de `dist/` a um host estático e apontar o **DNS** (A ou CNAME) para esse host. Rotas do tipo `/empreendimentos/...` precisam de **rewrite para `index.html`** (já documentado com exemplos Nginx, Caddy, Vercel e Netlify).

**Documentação detalhada:** [deploy/README.md](deploy/README.md)

## Repositório Git (GitHub, etc.)

1. Crie um repositório vazio no GitHub (ou outro fornecedor).
2. No computador, na pasta do projeto:

```bash
git init
git add -A
git commit -m "Initial commit: site Construtora Piffer"
git branch -M main
git remote add origin https://github.com/SEU_USUARIO/construtora-piffer.git
git push -u origin main
```

Substitua a URL de `origin` pelo endereço do seu repositório.

## Estrutura útil

| Caminho            | Conteúdo                          |
| ------------------ | --------------------------------- |
| `src/lib/site.ts`  | Contatos, redes, `publicSiteUrl`  |
| `scripts/setup.mjs`| Instala, escreve `.env`, compila  |
| `vercel.json`      | Reescrita SPA na Vercel           |
| `netlify.toml`     | Build e reescrita na Netlify      |

Ficheiro `.env` (gerado pelo setup) **não** é versionado; use `.env.example` como referência.
