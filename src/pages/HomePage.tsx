import { Header } from '@/components/Header'
import { Hero } from '@/components/Hero'
import { About } from '@/components/About'
import { Projects } from '@/components/Projects'
import { Highlights } from '@/components/Highlights'
import { Contact } from '@/components/Contact'
import { Footer } from '@/components/Footer'

export default function HomePage() {
  return (
    <div className="min-h-[100dvh] overflow-x-hidden bg-[var(--piffer-bg)]">
      <Header />
      <main>
        <Hero />
        <About />
        <Projects />
        <Highlights />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}
