import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'

gsap.registerPlugin(ScrollTrigger, SplitText, useGSAP)
gsap.defaults({ ease: 'power3.out' })

/**
 * Media-query conditions shared by every section. Each section's animations run
 * inside `gsap.matchMedia()` with these, so reduced-motion users get a static page
 * and small screens get a lighter set of effects. Matching CSS uses the same queries.
 */
export const MEDIA = {
  motion: '(prefers-reduced-motion: no-preference)',
  desktop: '(min-width: 768px)',
  desktopMotion: '(min-width: 768px) and (prefers-reduced-motion: no-preference)',
  mobileMotion: '(max-width: 767.98px) and (prefers-reduced-motion: no-preference)',
} as const

export { gsap, ScrollTrigger, SplitText, useGSAP }
