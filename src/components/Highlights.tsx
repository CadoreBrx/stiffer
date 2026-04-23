import { motion } from 'framer-motion'
import { Check } from 'lucide-react'

const items = [
  'Fachadas contemporâneas e leitura clara de volumes',
  'Plantas otimizadas para circulação e insolação',
  'Parceria com fornecedores e fiscalização de obra',
] as const

export function Highlights() {
  return (
    <section className="relative overflow-hidden bg-[var(--piffer-primary)] px-4 py-24 sm:px-6">
      <div className="pointer-events-none absolute left-0 top-0 h-72 w-72 rounded-full bg-[var(--piffer-accent)]/18 blur-3xl" />
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--piffer-primary-soft)]/25 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 right-0 h-96 w-96 rounded-full bg-[var(--piffer-primary-mid)]/45 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-6xl">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <p className="font-[family-name:var(--font-display)] text-sm font-semibold uppercase tracking-widest text-[var(--piffer-accent)]">
              Diferenciais
            </p>
            <h2 className="mt-2 font-[family-name:var(--font-display)] text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              O que guia a Piffer em cada empreendimento
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-white/70">
              Atenção à experiência de morar, desde o acesso do edifício até o
              apartamento. Processos definidos, comunicação alinhada e busca
              contínua por acabamento superior.
            </p>
          </motion.div>
          <motion.ul
            className="space-y-4"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-5%' }}
            variants={{
              hidden: {},
              show: {
                transition: { staggerChildren: 0.08 },
              },
            }}
          >
            {items.map((t) => (
              <motion.li
                key={t}
                variants={{
                  hidden: { opacity: 0, y: 12 },
                  show: { opacity: 1, y: 0 },
                }}
                className="flex gap-3 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white/90 backdrop-blur-sm"
              >
                <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[var(--piffer-accent)]/20 text-[var(--piffer-accent)]">
                  <Check className="h-3.5 w-3.5" strokeWidth={2.5} />
                </span>
                <span className="text-sm leading-relaxed sm:text-base">{t}</span>
              </motion.li>
            ))}
          </motion.ul>
        </div>
      </div>
    </section>
  )
}
