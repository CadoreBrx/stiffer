import { motion } from 'framer-motion'
import { Building2, HardHat, MapPin } from 'lucide-react'

const block = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-10%' },
  transition: { duration: 0.5 },
}

const cards = [
  {
    icon: Building2,
    title: 'Projetos completos',
    text: 'Planejamento integrado, do estudo de viabilidade à entrega — com padrão visual alinhado ao mercado atual.',
  },
  {
    icon: HardHat,
    title: 'Execução disciplinada',
    text: 'Foco em prazo, normas técnicas e controle de qualidade em canteiro, reduzindo retrabalho.',
  },
  {
    icon: MapPin,
    title: 'Brusque e região',
    text: 'Empreendimentos em endereços estratégicos, próximos a serviços e mobilidade no Vale.',
  },
] as const

export function About() {
  return (
    <section
      id="sobre"
      className="scroll-mt-20 bg-[var(--piffer-bg)] px-4 py-24 sm:px-6"
    >
      <div className="mx-auto max-w-6xl">
        <motion.div
          {...block}
          className="max-w-2xl"
        >
          <p className="font-[family-name:var(--font-display)] text-sm font-semibold uppercase tracking-widest text-[var(--piffer-primary-mid)]">
            Sobre
          </p>
          <h2 className="mt-2 font-[family-name:var(--font-display)] text-3xl font-semibold tracking-tight text-[var(--piffer-heading)] sm:text-4xl">
            Construção de alto padrão, com linguagem clara
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-[var(--piffer-muted)]">
            A Piffer reúne experiência em incorporação e execução de obras
            residenciais, priorizando transparência com clientes e parceiros.
            Cada empreendimento reflete cuidado com a fachada, a circulação e o
            conforto de quem vai viver o espaço.
          </p>
        </motion.div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {cards.map((c, i) => (
            <motion.article
              key={c.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-8%' }}
              transition={{ delay: i * 0.08, duration: 0.45 }}
              className="rounded-2xl border border-[var(--piffer-border)] bg-[var(--piffer-surface)] p-6 shadow-sm shadow-[rgba(6,25,47,0.06)]"
            >
              <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-[var(--piffer-accent-soft)] text-[var(--piffer-primary-mid)]">
                <c.icon className="h-5 w-5" strokeWidth={1.75} />
              </div>
              <h3 className="font-[family-name:var(--font-display)] text-lg font-semibold text-[var(--piffer-heading)]">
                {c.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-[var(--piffer-muted)]">
                {c.text}
              </p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
