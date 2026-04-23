/**
 * Contato institucional (material comercial Construtora Piffer).
 * Ajuste se o escritório usar outro e-mail ou sede.
 */

/** Definido em `.env` / `.env.production` (VITE_SITE_URL); usado em SEO/links canónicos. */
const envUrl = import.meta.env.VITE_SITE_URL
export const publicSiteUrl =
  typeof envUrl === 'string' && envUrl.length > 0
    ? envUrl.replace(/\/$/, '')
    : ''

export const SITE = {
  name: 'Construtora Piffer',
  shortName: 'Piffer',
  /** DDD 47 + número, só dígitos, para https://wa.me/55{whatsappDigits} */
  whatsappDigits: '55479991040747',
  phoneDisplay: '(47) 99104-0747',
  email: 'fabiodpiffer31@gmail.com',
  addressLine: 'Brusque e região — SC',
  cnpj: '29.007.488/0001-60',
  /** Perfil oficial — sem parâmetros de rastreamento */
  instagramUrl: 'https://www.instagram.com/construtorapiffer/',
  /** Se o slug da página for outro, altere aqui */
  facebookUrl: 'https://www.facebook.com/construtorapiffer',
} as const

export const whatsappHref = `https://wa.me/${SITE.whatsappDigits}`

export const mailtoHref = `mailto:${SITE.email}`
