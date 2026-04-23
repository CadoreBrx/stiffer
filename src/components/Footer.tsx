import { FacebookIcon, InstagramIcon } from '@/components/SocialBrandIcons'
import { SITE, whatsappHref } from '@/lib/site'

export function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="border-t border-[var(--piffer-border)] bg-[var(--piffer-primary)] px-4 py-12 text-center sm:px-6 sm:text-left">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 sm:flex-row sm:items-start">
        <div>
          <p className="font-[family-name:var(--font-display)] text-lg font-semibold text-white">
            {SITE.name}
          </p>
          <p className="mt-1 max-w-sm text-sm text-white/60">
            Empreendimentos residenciais com padrão executivo. Brusque e região.
          </p>
          <p className="mt-3 text-xs text-white/40">CNPJ {SITE.cnpj}</p>
        </div>
        <div className="flex flex-col items-center gap-4 sm:items-end">
          <a
            href={whatsappHref}
            target="_blank"
            rel="noreferrer"
            className="text-sm font-medium text-[var(--piffer-accent)] transition hover:text-[var(--piffer-accent-hover)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--piffer-accent)]"
          >
            {SITE.phoneDisplay}
          </a>
          <div className="flex items-center gap-2">
            <a
              href={SITE.instagramUrl}
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram da Construtora Piffer"
              className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-white/15 bg-white/5 text-white transition hover:border-[var(--piffer-accent)]/40 hover:bg-white/10 hover:text-[var(--piffer-accent)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--piffer-accent)]"
            >
              <InstagramIcon className="h-5 w-5" />
            </a>
            <a
              href={SITE.facebookUrl}
              target="_blank"
              rel="noreferrer"
              aria-label="Facebook da Construtora Piffer"
              className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-white/15 bg-white/5 text-white transition hover:border-[var(--piffer-accent)]/40 hover:bg-white/10 hover:text-[var(--piffer-accent)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--piffer-accent)]"
            >
              <FacebookIcon className="h-5 w-5" />
            </a>
          </div>
          <p className="text-xs text-white/45">
            © {year} {SITE.shortName}. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  )
}
