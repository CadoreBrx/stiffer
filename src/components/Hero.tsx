import { motion } from 'framer-motion'
import { ArrowRight, MessageCircle } from 'lucide-react'
import { whatsappHref } from '@/lib/site'

/** Fachada em destaque — lâmina 0002 (Adelina Sbors) */
const facadeImage = '/empreendimentos/adelina/page-0002.png'

export function Hero() {
  return (
    <section id="inicio" className="bg-[var(--piffer-primary)]">
      {/* Banner apenas com a foto (sem texto sobreposto) */}
      <div className="relative h-[62dvh] min-h-[420px] w-full overflow-hidden sm:h-[70dvh] lg:h-[78dvh] lg:min-h-[680px]">
        <img
          src={facadeImage}
          alt="Fachada de empreendimento da Construtora Piffer"
          className="h-full w-full object-cover object-center"
          loading="eager"
          fetchPriority="high"
          decoding="async"
        />
      </div>

      {/* Texto movido para baixo do banner */}
      <div className="relative">
        <div className="pointer-events-none absolute -left-20 top-1/4 h-72 w-72 rounded-full bg-[var(--piffer-accent)]/14 blur-3xl" />
        <div className="pointer-events-none absolute right-0 top-1/2 h-80 w-80 -translate-y-1/2 rounded-full bg-[var(--piffer-primary-soft)]/20 blur-3xl" />
        <div className="relative mx-auto max-w-6xl px-4 pb-20 pt-14 sm:px-6 lg:px-12 lg:pb-24 lg:pt-16 xl:px-16">
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
      </div>
    </section>
  )
}
