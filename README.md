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

## Repositório no GitHub (recomendado: GitHub CLI)

O [GitHub CLI](https://cli.github.com/) (`gh`) cria o repositório e faz o primeiro push num comando.

1. **Uma vez por máquina**, autenticar (abre o browser ou pede um código no [github.com/login/device](https://github.com/login/device)):

```powershell
gh auth login
```

2. Na pasta do projeto:

```powershell
cd construtora-stiffer
.\scripts\publish-github.ps1
```

Por defeito cria o repositório `construtora-piffer` **público**. Repositório privado: `.\scripts\publish-github.ps1 -Publico:$false`. Outro nome: `-NomeRepo "outro-nome"`.

Se já existir `remote origin`, o script só faz `git push`.

### Alternativa manual

1. Crie um repositório vazio no site do GitHub.
2. Ligue o remoto e envie a branch `main` (já existente neste clone):

```bash
git remote add origin https://github.com/SEU_USUARIO/construtora-piffer.git
git push -u origin main
```

## Estrutura útil

| Caminho            | Conteúdo                          |
| ------------------ | --------------------------------- |
| `src/lib/site.ts`  | Contatos, redes, `publicSiteUrl`  |
| `scripts/setup.mjs`    | Instala, escreve `.env`, compila  |
| `scripts/publish-github.ps1` | Cria repo no GitHub e dá `push` (com `gh`) |
| `vercel.json`      | Reescrita SPA na Vercel           |
| `netlify.toml`     | Build e reescrita na Netlify      |

Ficheiro `.env` (gerado pelo setup) **não** é versionado; use `.env.example` como referência.
