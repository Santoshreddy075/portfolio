import { useLayoutEffect, useRef } from 'react'
import { useLocation } from 'react-router'
import { ScrollTrigger } from '../lib/gsap'

/**
 * Route changes start at the top of the new page, or at the section named in the
 * hash (e.g. /#work). Arriving from elsewhere jumps straight there; a hash link
 * within the same page scrolls smoothly. Waits a beat so the page's pins exist.
 */
export function ScrollManager() {
  const { pathname, hash } = useLocation()
  const lastPath = useRef<string | null>(null)

  useLayoutEffect(() => {
    if ('scrollRestoration' in history) history.scrollRestoration = 'manual'
    const samePage = lastPath.current === pathname

    if (!hash) {
      if (!samePage) window.scrollTo({ top: 0, behavior: 'instant' })
      lastPath.current = pathname
      return
    }
    // Record the page only once the scroll has happened, so a cancelled run
    // (e.g. React re-running effects in development) still counts as arriving.
    const timer = window.setTimeout(() => {
      ScrollTrigger.refresh()
      document
        .getElementById(decodeURIComponent(hash.slice(1)))
        ?.scrollIntoView({ behavior: samePage ? 'smooth' : 'instant' })
      lastPath.current = pathname
    }, 80)
    return () => window.clearTimeout(timer)
  }, [pathname, hash])

  return null
}
