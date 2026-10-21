import { useEffect } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router'
import { Footer } from './components/Footer'
import { Nav } from './components/Nav'
import { PageTransition } from './components/PageTransition'
import { ScrollManager } from './components/ScrollManager'
import { ScrollTrigger } from './lib/gsap'
import { AboutPage } from './pages/AboutPage'
import { CredentialsPage } from './pages/CredentialsPage'
import { HomePage } from './pages/HomePage'
import { NotFoundPage } from './pages/NotFoundPage'
import { ProjectPage } from './pages/ProjectPage'
import { WritingPage } from './pages/WritingPage'

/** The site's pages and shared chrome, independent of which router hosts them. */
export function AppRoutes() {
  return (
    <>
      <ScrollManager />
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <Nav />
      <main id="main">
        <PageTransition>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/projects/:slug" element={<ProjectPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/credentials" element={<CredentialsPage />} />
            <Route path="/writing" element={<WritingPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </PageTransition>
      </main>
      <Footer />
    </>
  )
}

export default function App() {
  // Pin and trigger positions depend on text metrics; re-measure once web fonts land.
  useEffect(() => {
    document.fonts?.ready.then(() => ScrollTrigger.refresh())
  }, [])

  return (
    <BrowserRouter basename={import.meta.env.BASE_URL.replace(/\/$/, '') || '/'}>
      <AppRoutes />
    </BrowserRouter>
  )
}
