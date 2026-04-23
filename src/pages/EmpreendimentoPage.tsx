import { useEffect, useState } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import {
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  MapPin,
  X,
} from 'lucide-react'
import { getEmpreendimentoBySlug } from '@/data/empreendimentos'

export default function EmpreendimentoPage() {
  const { slug } = useParams<{ slug: string }>()
  const emp = getEmpreendimentoBySlug(slug)
  const [lightbox, setLightbox] = useState<number | null>(null)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [slug])

  useEffect(() => {
    if (lightbox === null || !emp) return
    document.body.style.overflow = 'hidden'
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLightbox(null)
      if (emp.gallery.length === 0) return
      if (e.key === 'ArrowRight') {
        e.preventDefault()
        setLightbox((i) =>
          i === null ? null : (i + 1) % emp.gallery.length,
        )
      }
      if (e.key === 'ArrowLeft') {
        e.preventDefault()
        setLightbox((i) =>
          i === null
            ? null
            : (i - 1 + emp.gallery.length) % emp.gallery.length,
        )
      }
    }
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [lightbox, emp])

  if (!emp) return <Navigate to="/" replace />

  const hasGallery = emp.gallery.length > 0

  const goPrev = () => {
    if (!hasGallery || lightbox === null) return
    setLightbox((i) =>
      i === null ? null : (i - 1 + emp.gallery.length) % emp.gallery.length,
    )
  }

  const goNext = () => {
    if (!hasGallery || lightbox === null) return
    setLightbox((i) => (i === null ? null : (i + 1) % emp.gallery.length))
  }

  return (
    <div className="min-h-[100dvh] bg-[var(--piffer-bg)] text-[var(--piffer-heading)]">
      <header className="sticky top-0 z-40 border-b border-[var(--piffer-border)] bg-[var(--piffer-surface)]/95 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-3 px-4 py-3 sm:px-6 sm:py-4">
          <Link
            to="/"
            className="inline-flex items-center gap-2 rounded-md px-2 py-1.5 text-sm font-medium text-[var(--piffer-primary-mid)] transition hover:bg-[var(--piffer-bg)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--piffer-accent)]"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden />
            Voltar ao site
          </Link>
          <span className="hidden text-[var(--piffer-border)] sm:inline">/</span>
          <Link
            to="/#empreendimentos"
            className="text-sm font-medium text-[var(--piffer-muted)] underline-offset-4 hover:text-[var(--piffer-primary-mid)] hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--piffer-accent)]"
          >
            Todos os empreendimentos
          </Link>
          <h1 className="w-full font-[family-name:var(--font-display)] text-xl font-semibold tracking-tight text-[var(--piffer-heading)] sm:ml-auto sm:w-auto sm:text-2xl">
            {emp.title}
          </h1>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
        <p className="text-sm font-semibold uppercase tracking-wider text-[var(--piffer-primary-mid)]">
          {emp.tagline}
        </p>
        <p className="mt-2 flex flex-wrap items-center gap-2 text-[var(--piffer-muted)]">
          <MapPin className="h-4 w-4 shrink-0" aria-hidden />
          <span>
            {emp.address} — {emp.city}
          </span>
          {emp.mapUrl && (
            <a
              href={emp.mapUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 text-sm font-medium text-[var(--piffer-primary-mid)] underline-offset-2 hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--piffer-accent)]"
            >
              Mapa
              <ExternalLink className="h-3.5 w-3.5" aria-hidden />
            </a>
          )}
        </p>

        <dl className="mt-6 flex flex-wrap gap-6 border-y border-[var(--piffer-border)] py-6">
          {emp.stats.map((s) => (
            <div key={s.label}>
              <dt className="text-xs uppercase text-[var(--piffer-muted)]">
                {s.label}
              </dt>
              <dd className="font-[family-name:var(--font-display)] text-lg font-semibold">
                {s.value}
              </dd>
            </div>
          ))}
        </dl>

        <h2 className="mt-10 font-[family-name:var(--font-display)] text-2xl font-semibold tracking-tight">
          Material do empreendimento
        </h2>
        <p className="mt-2 max-w-2xl text-[var(--piffer-muted)]">
          Clique em qualquer lâmina para ampliar. Use as setas ou Esc para fechar.
        </p>

        {!hasGallery ? (
          <div className="mt-10 rounded-2xl border border-dashed border-[var(--piffer-border)] bg-[var(--piffer-surface)] px-6 py-16 text-center text-[var(--piffer-muted)]">
            <p className="font-medium text-[var(--piffer-heading)]">
              Galeria em breve
            </p>
            <p className="mt-2 text-sm">
              Ainda não há PDF ou imagens deste empreendimento no site. Entre em
              contato para receber o material por e-mail ou WhatsApp.
            </p>
          </div>
        ) : (
          <ul className="mt-8 grid list-none grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {emp.gallery.map((src, index) => (
              <li key={src}>
                <button
                  type="button"
                  className="group relative w-full overflow-hidden rounded-xl border border-[var(--piffer-border)] bg-[var(--piffer-surface)] text-left shadow-sm transition hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--piffer-accent)]"
                  onClick={() => setLightbox(index)}
                  aria-label={`Abrir lâmina ${index + 1} de ${emp.gallery.length}`}
                >
                  <div className="aspect-[4/3] w-full overflow-hidden bg-[var(--piffer-bg)]">
                    <img
                      src={src}
                      alt=""
                      className="h-full w-full object-cover transition duration-300 group-hover:scale-[1.02]"
                      loading="lazy"
                    />
                  </div>
                  <span className="absolute bottom-2 right-2 rounded bg-[var(--piffer-primary)]/80 px-2 py-0.5 text-xs font-medium text-white">
                    {index + 1}/{emp.gallery.length}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        )}
      </main>

      <AnimatePresence>
        {lightbox !== null && hasGallery && (
          <motion.div
            className="fixed inset-0 z-[100] flex flex-col bg-black/92 p-3 sm:p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            role="dialog"
            aria-modal="true"
            aria-label="Visualização ampliada"
          >
            <div className="flex shrink-0 items-center justify-between gap-2 text-white">
              <p className="truncate text-sm font-medium sm:text-base">
                {emp.title} — {lightbox + 1} / {emp.gallery.length}
              </p>
              <button
                type="button"
                className="rounded-md p-2 hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--piffer-accent)]"
                onClick={() => setLightbox(null)}
                aria-label="Fechar"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            <div className="relative mt-4 flex min-h-0 flex-1 items-center justify-center">
              <button
                type="button"
                className="absolute left-0 z-10 rounded-full bg-white/10 p-2 text-white hover:bg-white/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--piffer-accent)] disabled:opacity-30 sm:left-2 sm:p-3"
                onClick={goPrev}
                aria-label="Lâmina anterior"
                disabled={emp.gallery.length <= 1}
              >
                <ChevronLeft className="h-7 w-7 sm:h-8 sm:w-8" />
              </button>
              <motion.img
                key={lightbox}
                src={emp.gallery[lightbox]}
                alt=""
                className="max-h-[calc(100dvh-8rem)] max-w-full object-contain"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.2 }}
              />
              <button
                type="button"
                className="absolute right-0 z-10 rounded-full bg-white/10 p-2 text-white hover:bg-white/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--piffer-accent)] disabled:opacity-30 sm:right-2 sm:p-3"
                onClick={goNext}
                aria-label="Próxima lâmina"
                disabled={emp.gallery.length <= 1}
              >
                <ChevronRight className="h-7 w-7 sm:h-8 sm:w-8" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
