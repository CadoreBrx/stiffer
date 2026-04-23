import { useEffect } from 'react'
import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
} from 'react-router-dom'
import HomePage from '@/pages/HomePage'
import EmpreendimentoPage from '@/pages/EmpreendimentoPage'
import { publicSiteUrl } from '@/lib/site'

function CanonicalLink() {
  const { pathname } = useLocation()
  useEffect(() => {
    if (!publicSiteUrl) return
    let link = document.querySelector(
      'link[rel="canonical"]',
    ) as HTMLLinkElement | null
    if (!link) {
      link = document.createElement('link')
      link.rel = 'canonical'
      document.head.appendChild(link)
    }
    const path = pathname === '/' ? '' : pathname
    link.href = `${publicSiteUrl}${path}`
  }, [pathname])
  return null
}

export default function App() {
  return (
    <BrowserRouter>
      <CanonicalLink />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/empreendimentos/:slug" element={<EmpreendimentoPage />} />
      </Routes>
    </BrowserRouter>
  )
}
