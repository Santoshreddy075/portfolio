import { type ReactNode, useRef } from 'react'
import { useLocation } from 'react-router'
import { MEDIA, gsap, useGSAP } from '../lib/gsap'
import './PageTransition.css'

/**
 * Remounts the page on every route change and plays a curtain wipe over it.
 * Only opacity is animated on the page itself: a transform on an ancestor would
 * break the page's pinned (position: fixed) sections.
 */
export function PageTransition({ children }: { children: ReactNode }) {
  const { pathname } = useLocation()
  const curtain = useRef<HTMLDivElement>(null)
  const page = useRef<HTMLDivElement>(null)
  const shown = useRef(pathname)

  useGSAP(
    () => {
      // The first load has its own hero intro; only animate later navigations.
      if (shown.current === pathname) return
      shown.current = pathname
      const mm = gsap.matchMedia()
      mm.add(MEDIA.motion, () => {
        gsap
          .timeline()
          .set(curtain.current, { scaleY: 1, transformOrigin: '50% 0%', visibility: 'visible' })
          .from(page.current, { opacity: 0, duration: 0.6, ease: 'power2.out' }, 0.15)
          .to(curtain.current, { scaleY: 0, duration: 0.75, ease: 'expo.inOut' }, 0)
          .set(curtain.current, { visibility: 'hidden' })
      })
    },
    { dependencies: [pathname], revertOnUpdate: true },
  )

  return (
    <>
      <div className="page-curtain" ref={curtain} aria-hidden="true" />
      <div className="page" key={pathname} ref={page}>
        {children}
      </div>
    </>
  )
}
