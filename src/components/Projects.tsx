import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, MapPin } from 'lucide-react'
import { empreendimentos } from '@/data/empreendimentos'

export function Projects() {
  return (
    <section
      id="empreendimentos"
      className="scroll-mt-20 bg-[var(--piffer-surface)] px-4 py-24 sm:px-6"
    >
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-10%' }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl"
        >
          <p className="font-[family-name:var(--font-display)] text-sm font-semibold uppercase tracking-widest text-[var(--piffer-primary-mid)]">
            Portfólio
          </p>
          <h2 className="mt-2 font-[family-name:var(--font-display)] text-3xl font-semibold tracking-tight text-[var(--piffer-heading)] sm:text-4xl">
            Empreendimentos
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-[var(--piffer-muted)]">
            Cada empreendimento tem página própria com todas as lâminas do material
            comercial (plantas, fachadas, tabelas). Clique no card para abrir a
            galeria completa.
          </p>
        </motion.div>

        <div className="mt-14 grid gap-8 lg:grid-cols-3">
          {empreendimentos.map((e, i) => (
            <motion.div
              key={e.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-5%' }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
            >
              <Link
                to={`/empreendimentos/${e.id}`}
                className="group flex flex-col overflow-hidden rounded-2xl border border-[var(--piffer-border)] bg-[var(--piffer-bg)] shadow-sm transition hover:border-[var(--piffer-primary-mid)]/25 hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--piffer-accent)]"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={e.image}
                    alt=""
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[var(--piffer-primary)]/40 to-transparent opacity-0 transition group-hover:opacity-100" />
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <p className="text-xs font-semibold uppercase tracking-wider text-[var(--piffer-primary-mid)]/80">
                    {e.tagline}
                  </p>
                  <h3 className="mt-1 font-[family-name:var(--font-display)] text-xl font-semibold text-[var(--piffer-heading)]">
                    {e.title}
                  </h3>
                  <p className="mt-2 flex items-start gap-2 text-sm text-[var(--piffer-muted)]">
                    <MapPin
                      className="mt-0.5 h-4 w-4 shrink-0 text-[var(--piffer-primary-mid)]/70"
                      aria-hidden
                    />
                    <span>
                      {e.address} — {e.city}
                    </span>
                  </p>
                  <dl className="mt-4 grid grid-cols-2 gap-3 border-t border-[var(--piffer-border)] pt-4">
                    {e.stats.map((s) => (
                      <div key={s.label}>
                        <dt className="text-xs text-[var(--piffer-muted)]">
                          {s.label}
                        </dt>
                        <dd className="font-[family-name:var(--font-display)] text-sm font-semibold text-[var(--piffer-heading)]">
                          {s.value}
                        </dd>
                      </div>
                    ))}
                  </dl>
                  <span className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-[var(--piffer-primary-mid)]">
                    Ver todas as lâminas
                    <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
