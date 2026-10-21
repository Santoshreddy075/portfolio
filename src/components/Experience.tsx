import { useRef } from 'react'
import { profile } from '../content/profile'
import { MEDIA, gsap, useGSAP } from '../lib/gsap'
import './Experience.css'

export function Experience() {
  const root = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add(MEDIA.motion, () => {
        // The rail draws itself down the timeline as you scroll.
        gsap.fromTo(
          '.timeline__progress',
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: 'none',
            scrollTrigger: { trigger: '.timeline', start: 'top 65%', end: 'bottom 65%', scrub: true },
          },
        )
        gsap.utils.toArray<HTMLElement>('.timeline__item').forEach((item) => {
          const trigger = { trigger: item, start: 'top 65%', toggleActions: 'play none none reverse' }
          gsap.from(item.querySelector('.timeline__body'), { x: -24, opacity: 0, duration: 0.9, scrollTrigger: trigger })
          gsap.fromTo(
            item.querySelector('.timeline__dot'),
            { scale: 0.5, backgroundColor: '#d2d2d7' },
            { scale: 1, backgroundColor: '#0071e3', duration: 0.5, scrollTrigger: trigger },
          )
        })
      })
    },
    { scope: root },
  )

  return (
    <section
      id="experience"
      className="section section--mist experience"
      ref={root}
      aria-labelledby="experience-title"
    >
      <div className="container experience__grid">
        <header className="experience__head">
          <h2 id="experience-title" className="display">
            Experience.
          </h2>
          <p className="lead">{profile.copy.experienceLead}</p>
          {profile.resumeUrl && (
            <a className="link-arrow" href={profile.resumeUrl}>
              Download résumé
            </a>
          )}
        </header>

        <div className="timeline">
          <div className="timeline__rail" aria-hidden="true">
            <div className="timeline__progress" />
          </div>
          <ol className="timeline__list">
            {profile.experience.map((role) => (
              <li key={`${role.company}-${role.start}`} className="timeline__item">
                <span className="timeline__dot" aria-hidden="true" />
                <div className="timeline__body">
                  <p className="timeline__dates">
                    {role.start} — {role.end}
                  </p>
                  <h3 className="timeline__role">{role.role}</h3>
                  <p className="timeline__company">{role.company}</p>
                  <p className="timeline__summary">{role.summary}</p>
                  <ul className="timeline__highlights">
                    {role.highlights.map((h) => (
                      <li key={h}>{h}</li>
                    ))}
                  </ul>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
