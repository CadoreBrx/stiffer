import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import { motion, useScroll, useTransform } from 'framer-motion'

const links = [
  { to: '/#inicio', label: 'Início' },
  { to: '/#sobre', label: 'Sobre' },
  { to: '/#empreendimentos', label: 'Empreendimentos' },
  { to: '/#contato', label: 'Contato' },
] as const

export function Header() {
  const [open, setOpen] = useState(false)
  const { scrollY } = useScroll()
  const headerBg = useTransform(
    scrollY,
    [0, 80],
    ['rgba(6, 25, 47, 0.78)', 'rgba(6, 25, 47, 0.96)'],
  )
  const headerShadow = useTransform(
    scrollY,
    [0, 40],
    ['0 0 0 1px var(--piffer-border)', '0 12px 40px -12px rgba(6,25,47,0.28)'],
  )

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <motion.header
      id="top"
      className="fixed inset-x-0 top-0 z-50 backdrop-blur-md"
      style={{ backgroundColor: headerBg, boxShadow: headerShadow }}
    >
      <div className="mx-auto flex h-[4.25rem] max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link
          to="/#inicio"
          className="group flex items-center gap-2 font-[family-name:var(--font-display)] text-lg font-semibold tracking-tight text-[var(--piffer-surface)]"
        >
          {/* TODO(brand): trocar por <img src="/logo-piffer.svg" alt="Piffer" className="h-9" /> */}
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-md bg-[var(--piffer-accent)]/15 text-sm font-bold text-[var(--piffer-accent)] transition group-hover:bg-[var(--piffer-accent)]/25">
            P
          </span>
          <span>Piffer</span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex" aria-label="Principal">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="rounded-md px-3 py-2 text-sm font-medium text-white/80 transition hover:bg-white/10 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--piffer-accent)]"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <button
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center rounded-md text-white md:hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--piffer-accent)]"
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? 'Fechar menu' : 'Abrir menu'}
          onClick={() => setOpen((o) => !o)}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {open && (
        <div
          id="mobile-nav"
          className="border-t border-white/10 bg-[var(--piffer-primary)] px-4 py-4 md:hidden"
          role="dialog"
          aria-modal="true"
        >
          <div className="mx-auto flex max-w-6xl flex-col gap-1">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                className="rounded-md px-3 py-3 text-base font-medium text-white/90 hover:bg-white/10"
                onClick={() => setOpen(false)}
              >
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </motion.header>
  )
}
