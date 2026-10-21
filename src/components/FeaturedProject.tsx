import { useRef, useState } from 'react'
import { profile } from '../content/profile'
import { MEDIA, ScrollTrigger, gsap, useGSAP } from '../lib/gsap'
import { DeviceFrame } from './DeviceFrame'
import { ProjectArt } from './ProjectArt'
import './FeaturedProject.css'

export function FeaturedProject() {
  const root = useRef<HTMLElement>(null)
  const [active, setActive] = useState(0)
  const { featured } = profile
  const project = profile.projects.find((p) => p.slug === featured.projectSlug)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()

      // Desktop: the laptop is CSS-sticky; whichever step crosses the middle of
      // the viewport decides which screen it shows. (Not motion — runs for everyone.)
      mm.add(MEDIA.desktop, () => {
        gsap.utils.toArray<HTMLElement>('.case__step').forEach((step, i) => {
          // Enter callbacks (not onToggle) so a step stays active until the next
          // one takes over — and fast jumps past the end still land on the last step.
          ScrollTrigger.create({
            trigger: step,
            start: 'top 55%',
            end: 'bottom 55%',
            onEnter: () => setActive(i),
            onEnterBack: () => setActive(i),
          })
        })
      })

      mm.add(MEDIA.motion, () => {
        gsap.from('.case__head > *', {
          y: 40,
          opacity: 0,
          duration: 1,
          stagger: 0.1,
          scrollTrigger: { trigger: '.case__head', start: 'top 85%' },
        })
        gsap.from('.case__visual .device', {
          y: 80,
          scale: 0.94,
          opacity: 0,
          duration: 1.4,
          ease: 'expo.out',
          scrollTrigger: { trigger: '.case__grid', start: 'top 80%' },
        })
      })
    },
    { scope: root },
  )

  return (
    <section id="case-study" className="section section--dark case" ref={root} aria-labelledby="case-title">
      <div className="container">
        <header className="case__head">
          <p className="eyebrow">{featured.eyebrow}</p>
          <h2 id="case-title" className="display">
            {featured.title}
          </h2>
        </header>

        <div className="case__grid">
          <div className="case__visual">
            <div className="case__sticky">
              <DeviceFrame>
                {featured.steps.map((step, i) => (
                  <div key={step.eyebrow} className={`case__screen${i === active ? ' is-active' : ''}`}>
                    <ProjectArt variant={step.art} palette={project?.palette} />
                  </div>
                ))}
              </DeviceFrame>
            </div>
          </div>

          <ol className="case__steps">
            {featured.steps.map((step, i) => (
              <li key={step.eyebrow} className={`case__step${i === active ? ' is-active' : ''}`}>
                <div className="case__step-art" aria-hidden="true">
                  <ProjectArt variant={step.art} palette={project?.palette} />
                </div>
                <p className="case__step-eyebrow">{step.eyebrow}</p>
                <h3 className="case__step-title">{step.title}</h3>
                <p className="case__step-body">{step.body}</p>
                <p className="case__metric">
                  <span className="case__metric-value gradient-text">{step.metric.value}</span>
                  <span className="case__metric-label">{step.metric.label}</span>
                </p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
