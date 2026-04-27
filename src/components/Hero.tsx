import { motion } from 'framer-motion'
import { ArrowRight, MessageCircle } from 'lucide-react'
import { whatsappHref } from '@/lib/site'

/** Fachada em destaque — lâmina 0002 (Adelina Sbors) */
const facadeImage = '/empreendimentos/adelina/page-0002.png'

export function Hero() {
  return (
    <section id="inicio" className="bg-[var(--piffer-bg)]">
      <div className="relative h-[58vh] min-h-[24rem] w-full overflow-hidden sm:h-[66vh] lg:h-[78vh]">
        <img
          src={facadeImage}
          alt="Fachada de empreendimento residencial"
          className="block h-full w-full object-cover object-center"
          loading="eager"
          fetchPriority="high"
          decoding="async"
        />
      </div>

      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-12">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-4 font-[family-name:var(--font-display)] text-sm font-medium uppercase tracking-[0.2em] text-[var(--piffer-primary-mid)]"
        >
          Construção &amp; incorporação
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.15 }}
          className="max-w-3xl font-[family-name:var(--font-display)] text-4xl font-semibold leading-[1.1] tracking-tight text-[var(--piffer-heading)] sm:text-5xl md:text-6xl"
        >
          Onde a engenharia encontra o lugar de morar.
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.25 }}
          className="mt-6 max-w-xl text-lg leading-relaxed text-[var(--piffer-muted)]"
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
            className="inline-flex items-center justify-center gap-2 rounded-md bg-[var(--piffer-accent)] px-6 py-3.5 text-sm font-semibold text-[var(--piffer-primary)] shadow-lg shadow-black/15 transition hover:bg-[var(--piffer-accent-hover)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--piffer-primary)] focus-visible:ring-offset-2"
          >
            Ver empreendimentos
            <ArrowRight className="h-4 w-4" aria-hidden />
          </a>
          <a
            href={whatsappHref}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-md border border-[var(--piffer-border)] bg-white px-6 py-3.5 text-sm font-semibold text-[var(--piffer-primary)] transition hover:bg-[var(--piffer-bg)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--piffer-accent)]"
          >
            <MessageCircle className="h-4 w-4" aria-hidden />
            Fale no WhatsApp
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.6 }}
          className="mt-16 flex flex-wrap items-center gap-8 border-t border-[var(--piffer-border)] pt-8 text-sm text-[var(--piffer-muted)]"
        >
          <div>
            <p className="font-[family-name:var(--font-display)] text-2xl font-semibold text-[var(--piffer-heading)]">
              SC
            </p>
            <p>Atuação regional</p>
          </div>
          <div className="h-10 w-px bg-[var(--piffer-border)]" />
          <div>
            <p className="font-[family-name:var(--font-display)] text-2xl font-semibold text-[var(--piffer-heading)]">
              Obra
            </p>
            <p>Acompanhamento de ponta a ponta</p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
