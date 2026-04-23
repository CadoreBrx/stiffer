import { motion } from 'framer-motion'
import { ArrowRight, MessageCircle } from 'lucide-react'
import { whatsappHref } from '@/lib/site'

/** Fachada em destaque — lâmina 0002 (Adelina Sbors) */
const facadeImage = '/empreendimentos/adelina/page-0002.png'

export function Hero() {
  return (
    <section
      id="inicio"
      className="relative min-h-[100dvh] overflow-hidden bg-[var(--piffer-primary)] lg:min-h-[min(100dvh,1100px)]"
    >
      {/* Camadas de fundo (não entram no grid) */}
      <div className="pointer-events-none absolute inset-0 z-0" aria-hidden>
        <div
          className="absolute inset-0 bg-[length:cover] bg-[position:center_25%] bg-no-repeat lg:hidden"
          style={{ backgroundImage: `url(${facadeImage})` }}
        />
        <div
          className="absolute inset-0 lg:hidden"
          style={{ background: 'var(--piffer-hero-overlay)' }}
        />
        <div className="absolute -left-20 top-1/3 h-80 w-80 rounded-full bg-[var(--piffer-accent)]/14 blur-3xl lg:left-0" />
        <div className="absolute left-1/3 top-1/2 h-[28rem] w-[28rem] -translate-y-1/2 rounded-full bg-[var(--piffer-primary-soft)]/20 blur-3xl lg:left-1/4" />
        <div className="absolute -right-10 bottom-0 h-72 w-72 rounded-full bg-[var(--piffer-primary-mid)]/45 blur-3xl lg:-right-5" />
      </div>

      <div className="relative z-10 grid min-h-[100dvh] lg:min-h-[min(100dvh,1100px)] lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)]">
        {/* Conteúdo */}
        <div className="relative mx-auto flex w-full max-w-6xl flex-col justify-center px-4 pb-24 pt-32 sm:px-6 lg:mx-0 lg:max-w-none lg:px-10 lg:pb-20 lg:pt-28 xl:pl-16 xl:pr-8">
          <div className="hidden lg:absolute lg:inset-0 lg:-z-10 lg:block lg:bg-[var(--piffer-primary)]" />
          <div
            className="hidden lg:absolute lg:inset-0 lg:-z-10 lg:block"
            style={{
              background:
                'linear-gradient(105deg, rgba(6, 25, 47, 0.97) 0%, rgba(6, 25, 47, 0.82) 45%, rgba(6, 25, 47, 0.15) 100%)',
            }}
          />
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mb-4 font-[family-name:var(--font-display)] text-sm font-medium uppercase tracking-[0.2em] text-[var(--piffer-accent)]"
          >
            Construção &amp; incorporação
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.15 }}
            className="max-w-3xl font-[family-name:var(--font-display)] text-4xl font-semibold leading-[1.1] tracking-tight text-white sm:text-5xl md:text-6xl"
          >
            Onde a engenharia encontra o lugar de morar.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.25 }}
            className="mt-6 max-w-xl text-lg leading-relaxed text-white/80"
          >
            A Construtora Piffer desenvolve empreendimentos residenciais na região
            de Brusque e entorno, com foco em qualidade executiva e acabamento
            contemporâneo.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center"
          >
            <a
              href="#empreendimentos"
              className="inline-flex items-center justify-center gap-2 rounded-md bg-[var(--piffer-accent)] px-6 py-3.5 text-sm font-semibold text-[var(--piffer-primary)] shadow-lg shadow-black/20 transition hover:bg-[var(--piffer-accent-hover)] focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--piffer-primary)]"
            >
              Ver empreendimentos
              <ArrowRight className="h-4 w-4" aria-hidden />
            </a>
            <a
              href={whatsappHref}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-md border border-white/20 bg-white/5 px-6 py-3.5 text-sm font-semibold text-white backdrop-blur-sm transition hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--piffer-accent)]"
            >
              <MessageCircle className="h-4 w-4" aria-hidden />
              Fale no WhatsApp
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.6 }}
            className="mt-16 flex flex-wrap items-center gap-8 border-t border-white/10 pt-8 text-sm text-white/60"
          >
            <div>
              <p className="font-[family-name:var(--font-display)] text-2xl font-semibold text-white">
                SC
              </p>
              <p className="text-white/50">Atuação regional</p>
            </div>
            <div className="h-10 w-px bg-white/10" />
            <div>
              <p className="font-[family-name:var(--font-display)] text-2xl font-semibold text-white">
                Obra
              </p>
              <p className="text-white/50">Acompanhamento de ponta a ponta</p>
            </div>
          </motion.div>
        </div>

        {/* Fachada — coluna larga (desktop) */}
        <div className="relative hidden min-h-0 lg:block">
          <img
            src={facadeImage}
            alt="Fachada do Residencial Adelina Sbors — Guabiruba, SC"
            className="absolute inset-0 h-full w-full object-cover object-center"
            loading="eager"
            fetchPriority="high"
            decoding="async"
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[var(--piffer-primary)]/50 via-transparent to-transparent" />
          <p className="absolute bottom-6 right-6 max-w-xs rounded-sm bg-black/35 px-3 py-1.5 text-right text-xs text-white/90 backdrop-blur-sm">
            Fachada — Residencial Adelina Sbors
          </p>
        </div>
      </div>
    </section>
  )
}
