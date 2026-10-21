import { useRef } from 'react'
import { profile } from '../content/profile'
import { MEDIA, SplitText, gsap, useGSAP } from '../lib/gsap'
import './Statement.css'

export function Statement() {
  const root = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      // Each word brightens as the scrollbar passes it. Pinned on desktop.
      mm.add({ desktop: MEDIA.desktopMotion, mobile: MEDIA.mobileMotion }, (ctx) => {
        const { desktop } = ctx.conditions!
        const split = SplitText.create('.statement__text', { type: 'words' })
        gsap.fromTo(
          split.words,
          { opacity: 0.16 },
          {
            opacity: 1,
            stagger: 0.1,
            ease: 'none',
            scrollTrigger: desktop
              ? { trigger: root.current, start: 'top top', end: '+=160%', scrub: true, pin: true }
              : { trigger: '.statement__text', start: 'top 80%', end: 'bottom 45%', scrub: true },
          },
        )
        return () => split.revert()
      })
    },
    { scope: root },
  )

  return (
    <section className="section section--dark statement" ref={root} aria-labelledby="statement-title">
      <div className="container statement__inner">
        <h2 id="statement-title" className="statement__eyebrow eyebrow">
          How I work
        </h2>
        <p className="statement__text">{profile.statement}</p>
      </div>
    </section>
  )
}
