import { type ReactNode, useRef } from 'react'
import { MEDIA, SplitText, gsap, useGSAP } from '../lib/gsap'
import './PageHero.css'

/** The opening of an inner page: eyebrow, a big headline that rises in, and a lead. */
export function PageHero({ eyebrow, title, lead, children }: { eyebrow: string; title: string; lead?: string; children?: ReactNode }) {
  const root = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add(MEDIA.motion, () => {
        SplitText.create('.page-hero__title', {
          type: 'lines',
          mask: 'lines',
          autoSplit: true,
          onSplit: (self) => gsap.from(self.lines, { yPercent: 110, duration: 1.2, stagger: 0.1, ease: 'expo.out', delay: 0.2 }),
        })
        gsap.from(['.page-hero__eyebrow', '.page-hero__lead', '.page-hero__extra'], {
          y: 24,
          opacity: 0,
          duration: 1,
          stagger: 0.08,
          delay: 0.35,
        })
      })
    },
    { scope: root },
  )

  return (
    <section className="page-hero" ref={root}>
      <div className="container page-hero__inner">
        <p className="eyebrow page-hero__eyebrow">{eyebrow}</p>
        <h1 className="page-hero__title">{title}</h1>
        {lead && <p className="lead page-hero__lead">{lead}</p>}
        {children && <div className="page-hero__extra">{children}</div>}
      </div>
    </section>
  )
}
