export type Empreendimento = {
  id: string
  title: string
  tagline: string
  address: string
  city: string
  /** Capa para o card na home */
  image: string
  /** Todas as lâminas (PDF) — caminhos em /public */
  gallery: string[]
  stats: { label: string; value: string }[]
  /** Link Google Maps quando existir */
  mapUrl?: string
}

const pad = (n: number) => String(n).padStart(4, '0')

const pages = (folder: string, from: number, to: number) =>
  Array.from({ length: to - from + 1 }, (_, i) => {
    const num = from + i
    return `/empreendimentos/${folder}/page-${pad(num)}.png`
  })

export const empreendimentos: Empreendimento[] = [
  {
    id: 'moretti',
    title: 'Moretti Residence',
    tagline: 'Residencial multifamiliar',
    address: 'R. Maria Scarpa Formonte, Limoeiro',
    city: 'Brusque, SC',
    image: '/empreendimentos/moretti/page-0001.png',
    gallery: pages('moretti', 1, 20),
    stats: [
      { label: 'Unidades', value: '48 studios' },
      { label: 'Perfil', value: 'Multifamiliar' },
    ],
    mapUrl: 'https://maps.app.goo.gl/zymWYtt6CtL125r38',
  },
  {
    id: 'vitali',
    title: 'Studios Vitali',
    tagline: 'Residencial multifamiliar',
    address: 'Rua Mathias Moritz, 325, Santa Terezinha',
    city: 'Brusque, SC',
    image: '/empreendimentos/vitali/page-0001.png',
    gallery: pages('vitali', 1, 23),
    stats: [
      { label: 'Studios', value: '34' },
      { label: 'Vagas', value: '35' },
    ],
    mapUrl: 'https://maps.app.goo.gl/PsApu3wKymjn8EiB7',
  },
  {
    id: 'verona',
    title: 'Residencial Verona',
    tagline: 'Conforto e localização',
    address: 'Rua Luz e Harmonia, Santa Terezinha',
    city: 'Brusque, SC',
    image: '/empreendimentos/verona/page-0002.png',
    gallery: pages('verona', 1, 17),
    stats: [
      { label: 'Studios', value: '10' },
      { label: 'Extras', value: '1 apto 2 quartos' },
    ],
    mapUrl: 'https://maps.app.goo.gl/ZNRiDpJYi3o57jv28',
  },
]

export function getEmpreendimentoBySlug(slug: string | undefined) {
  if (!slug) return undefined
  return empreendimentos.find((e) => e.id === slug)
}
