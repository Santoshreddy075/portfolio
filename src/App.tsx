import { useEffect } from 'react'
import { Bento } from './components/Bento'
import { Contact } from './components/Contact'
import { Experience } from './components/Experience'
import { FeaturedProject } from './components/FeaturedProject'
import { Footer } from './components/Footer'
import { Hero } from './components/Hero'
import { Nav } from './components/Nav'
import { Statement } from './components/Statement'
import { WorkGallery } from './components/WorkGallery'
import { ScrollTrigger } from './lib/gsap'

export default function App() {
  // Pin and trigger positions depend on text metrics; re-measure once web fonts land.
  useEffect(() => {
    document.fonts?.ready.then(() => ScrollTrigger.refresh())
  }, [])

  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <Nav />
      <main id="main">
        <Hero />
        <Statement />
        <WorkGallery />
        <FeaturedProject />
        <Bento />
        <Experience />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
