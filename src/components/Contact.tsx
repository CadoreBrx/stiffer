import { useState, type FormEvent } from 'react'
import { motion } from 'framer-motion'
import { Mail, MapPin, Phone, Send } from 'lucide-react'
import { FacebookIcon, InstagramIcon } from '@/components/SocialBrandIcons'
import { mailtoHref, SITE, whatsappHref } from '@/lib/site'

export function Contact() {
  const [submitted, setSubmitted] = useState(false)

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    const data = new FormData(form)
    const nome = String(data.get('nome') ?? '')
    const email = String(data.get('email') ?? '')
    const telefone = String(data.get('telefone') ?? '')
    const mensagem = String(data.get('mensagem') ?? '')
    const body = `Nome: ${nome}\nE-mail: ${email}\nTelefone: ${telefone}\n\n${mensagem}`
    const subject = encodeURIComponent(`Contato site — ${SITE.name}`)
    const bodyEnc = encodeURIComponent(body)
    window.location.href = `${mailtoHref}?subject=${subject}&body=${bodyEnc}`
    setSubmitted(true)
  }

  return (
    <section
      id="contato"
      className="scroll-mt-20 bg-[var(--piffer-bg)] px-4 py-24 sm:px-6"
    >
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
          className="max-w-2xl"
        >
          <p className="font-[family-name:var(--font-display)] text-sm font-semibold uppercase tracking-widest text-[var(--piffer-primary-mid)]">
            Contato
          </p>
          <h2 className="mt-2 font-[family-name:var(--font-display)] text-3xl font-semibold tracking-tight text-[var(--piffer-heading)] sm:text-4xl">
            Fale com a Piffer
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-[var(--piffer-muted)]">
            Revise e-mail, telefone e endereço no arquivo
            <code className="mx-1 rounded bg-white px-1.5 py-0.5 text-sm">
              src/lib/site.ts
            </code>
            antes de publicar.
          </p>
        </motion.div>

        <div className="mt-12 grid gap-10 lg:grid-cols-5">
          <motion.div
            className="space-y-6 rounded-2xl border border-[var(--piffer-border)] bg-[var(--piffer-surface)] p-6 shadow-sm lg:col-span-2"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.05, duration: 0.45 }}
          >
            <a
              href={whatsappHref}
              target="_blank"
              rel="noreferrer"
              className="flex items-start gap-3 rounded-lg p-2 transition hover:bg-[var(--piffer-bg)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--piffer-accent)]"
            >
              <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[var(--piffer-accent-soft)] text-[var(--piffer-primary-mid)]">
                <Phone className="h-5 w-5" />
              </span>
              <span>
                <span className="block text-xs font-medium uppercase text-[var(--piffer-muted)]">
                  WhatsApp / telefone
                </span>
                <span className="font-[family-name:var(--font-display)] font-semibold text-[var(--piffer-heading)]">
                  {SITE.phoneDisplay}
                </span>
              </span>
            </a>
            <a
              href={mailtoHref}
              className="flex items-start gap-3 rounded-lg p-2 transition hover:bg-[var(--piffer-bg)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--piffer-accent)]"
            >
              <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[var(--piffer-accent-soft)] text-[var(--piffer-primary-mid)]">
                <Mail className="h-5 w-5" />
              </span>
              <span>
                <span className="block text-xs font-medium uppercase text-[var(--piffer-muted)]">
                  E-mail
                </span>
                <span className="break-all font-medium text-[var(--piffer-primary-mid)]">
                  {SITE.email}
                </span>
              </span>
            </a>
            <div className="flex items-start gap-3 p-2">
              <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[var(--piffer-accent-soft)] text-[var(--piffer-primary-mid)]">
                <MapPin className="h-5 w-5" />
              </span>
              <span>
                <span className="block text-xs font-medium uppercase text-[var(--piffer-muted)]">
                  Endereço
                </span>
                <span className="text-[var(--piffer-heading)]">
                  {SITE.addressLine}
                </span>
              </span>
            </div>
            <div className="border-t border-[var(--piffer-border)] pt-4">
              <p className="mb-3 text-xs font-medium uppercase text-[var(--piffer-muted)]">
                Redes sociais
              </p>
              <div className="flex flex-wrap gap-2">
                <a
                  href={SITE.instagramUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg border border-[var(--piffer-border)] bg-[var(--piffer-bg)] px-3 py-2 text-sm font-medium text-[var(--piffer-heading)] transition hover:border-[var(--piffer-primary-mid)]/30 hover:bg-[var(--piffer-surface)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--piffer-accent)]"
                >
                  <InstagramIcon className="h-4 w-4 shrink-0 text-[var(--piffer-primary-mid)]" />
                  Instagram
                </a>
                <a
                  href={SITE.facebookUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg border border-[var(--piffer-border)] bg-[var(--piffer-bg)] px-3 py-2 text-sm font-medium text-[var(--piffer-heading)] transition hover:border-[var(--piffer-primary-mid)]/30 hover:bg-[var(--piffer-surface)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--piffer-accent)]"
                >
                  <FacebookIcon className="h-4 w-4 shrink-0 text-[var(--piffer-primary-mid)]" />
                  Facebook
                </a>
              </div>
            </div>
          </motion.div>

          <motion.form
            onSubmit={onSubmit}
            className="space-y-4 rounded-2xl border border-[var(--piffer-border)] bg-[var(--piffer-surface)] p-6 shadow-sm lg:col-span-3"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.45 }}
            noValidate
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="nome"
                  className="mb-1.5 block text-sm font-medium text-[var(--piffer-heading)]"
                >
                  Nome
                </label>
                <input
                  id="nome"
                  name="nome"
                  required
                  autoComplete="name"
                  className="w-full rounded-md border border-[var(--piffer-border)] bg-[var(--piffer-bg)] px-3 py-2.5 text-sm text-[var(--piffer-heading)] outline-none transition focus:border-[var(--piffer-primary-mid)] focus:ring-2 focus:ring-[var(--piffer-accent)]/30"
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="mb-1.5 block text-sm font-medium text-[var(--piffer-heading)]"
                >
                  E-mail
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  className="w-full rounded-md border border-[var(--piffer-border)] bg-[var(--piffer-bg)] px-3 py-2.5 text-sm text-[var(--piffer-heading)] outline-none transition focus:border-[var(--piffer-primary-mid)] focus:ring-2 focus:ring-[var(--piffer-accent)]/30"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="telefone"
                className="mb-1.5 block text-sm font-medium text-[var(--piffer-heading)]"
              >
                Telefone
              </label>
              <input
                id="telefone"
                name="telefone"
                type="tel"
                autoComplete="tel"
                className="w-full rounded-md border border-[var(--piffer-border)] bg-[var(--piffer-bg)] px-3 py-2.5 text-sm text-[var(--piffer-heading)] outline-none transition focus:border-[var(--piffer-primary-mid)] focus:ring-2 focus:ring-[var(--piffer-accent)]/30"
              />
            </div>
            <div>
              <label
                htmlFor="mensagem"
                className="mb-1.5 block text-sm font-medium text-[var(--piffer-heading)]"
              >
                Mensagem
              </label>
              <textarea
                id="mensagem"
                name="mensagem"
                required
                rows={4}
                className="w-full resize-y rounded-md border border-[var(--piffer-border)] bg-[var(--piffer-bg)] px-3 py-2.5 text-sm text-[var(--piffer-heading)] outline-none transition focus:border-[var(--piffer-primary-mid)] focus:ring-2 focus:ring-[var(--piffer-accent)]/30"
                placeholder="Conte o que você procura: investimento, moradia, padrão de acabamento…"
              />
            </div>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <button
                type="submit"
                className="inline-flex items-center justify-center gap-2 rounded-md bg-gradient-to-r from-[var(--piffer-primary)] to-[var(--piffer-primary-mid)] px-5 py-3 text-sm font-semibold text-white shadow-md shadow-[rgba(6,25,47,0.25)] transition hover:from-[var(--piffer-primary-mid)] hover:to-[var(--piffer-primary-soft)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--piffer-accent)] focus-visible:ring-offset-2"
              >
                <Send className="h-4 w-4" />
                Enviar por e-mail
              </button>
              {submitted && (
                <p className="text-sm text-[var(--piffer-muted)]">
                  Abrindo o aplicativo de e-mail…
                </p>
              )}
            </div>
          </motion.form>
        </div>
      </div>
    </section>
  )
}
