import { useRef, useState } from 'react'
import type { CaseStep } from '../content/types'
import { MEDIA, ScrollTrigger, gsap, useGSAP } from '../lib/gsap'
import { DeviceFrame } from './DeviceFrame'
import { ProjectArt } from './ProjectArt'
import './StoryScroller.css'

/**
 * A sticky laptop beside scrolling steps. Whichever step crosses the middle of the
 * viewport picks the screen; a step's `focus` zooms the camera into its art.
 */
export function StoryScroller({ steps, palette }: { steps: CaseStep[]; palette?: [string, string, string] }) {
  const root = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(0)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()

      // Desktop only (phones show each step's art inline). Not motion — runs for everyone.
      mm.add(MEDIA.desktop, () => {
        gsap.utils.toArray<HTMLElement>('.story__step').forEach((step, i) => {
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
        gsap.from('.story__visual .device', {
          y: 80,
          scale: 0.94,
          opacity: 0,
          duration: 1.4,
          ease: 'expo.out',
          scrollTrigger: { trigger: root.current, start: 'top 80%' },
        })
      })
    },
    { scope: root },
  )

  const zoom = (step: CaseStep, on: boolean) => {
    const [x, y, scale] = step.focus ?? [50, 50, 1]
    return { transformOrigin: `${x}% ${y}%`, transform: `scale(${on ? scale : 1})` }
  }

  return (
    <div className="story" ref={root}>
      <div className="story__visual">
        <div className="story__sticky">
          <DeviceFrame>
            {steps.map((step, i) => (
              <div key={step.eyebrow} className={`story__screen${i === active ? ' is-active' : ''}`}>
                <div className="story__zoom" style={zoom(step, i === active)}>
                  <ProjectArt variant={step.art} palette={palette} />
                </div>
              </div>
            ))}
          </DeviceFrame>
        </div>
      </div>

      <ol className="story__steps">
        {steps.map((step, i) => (
          <li key={step.eyebrow} className={`story__step${i === active ? ' is-active' : ''}`}>
            <div className="story__step-art" aria-hidden="true">
              <div className="story__zoom" style={zoom(step, true)}>
                <ProjectArt variant={step.art} palette={palette} />
              </div>
            </div>
            <p className="story__eyebrow">{step.eyebrow}</p>
            <h3 className="story__title">{step.title}</h3>
            <p className="story__body">{step.body}</p>
            {step.metric && (
              <p className="story__metric">
                <span className="story__metric-value gradient-text">{step.metric.value}</span>
                <span className="story__metric-label">{step.metric.label}</span>
              </p>
            )}
          </li>
        ))}
      </ol>
    </div>
  )
}
