import { useId, useRef } from 'react'
import { MEDIA, SplitText, gsap, useGSAP } from '../lib/gsap'
import './Statement.css'

/** A large paragraph whose words brighten as you scroll past (pinned on desktop). */
export function Statement({ eyebrow, text, alt = false }: { eyebrow: string; text: string; alt?: boolean }) {
  const root = useRef<HTMLElement>(null)
  const titleId = useId()

  useGSAP(
    () => {
      const mm = gsap.matchMedia()
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
    <section className={`section statement${alt ? ' section--alt' : ''}`} ref={root} aria-labelledby={titleId}>
      <div className="container statement__inner">
        <h2 id={titleId} className="statement__eyebrow eyebrow">
          {eyebrow}
        </h2>
        <p className="statement__text">{text}</p>
      </div>
    </section>
  )
}
