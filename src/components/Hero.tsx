import { useRef } from 'react'
import { profile } from '../content/profile'
import { MEDIA, SplitText, gsap, useGSAP } from '../lib/gsap'
import { DeviceFrame } from './DeviceFrame'
import { ProjectArt } from './ProjectArt'
import './Hero.css'

export function Hero() {
  const root = useRef<HTMLElement>(null)
  const { hero } = profile

  useGSAP(
    () => {
      const mm = gsap.matchMedia()

      // Intro: headline lines rise out of masks, then the rest follows.
      mm.add(MEDIA.motion, () => {
        SplitText.create('.hero__title', {
          type: 'lines',
          mask: 'lines',
          autoSplit: true,
          onSplit: (self) =>
            gsap.from(self.lines, { yPercent: 110, duration: 1.3, stagger: 0.12, ease: 'expo.out', delay: 0.1 }),
        })
        gsap.from(['.hero__eyebrow', '.hero__sub', '.hero__ctas'], {
          y: 24,
          opacity: 0,
          duration: 1.1,
          stagger: 0.1,
          delay: 0.35,
        })
        gsap.from('.hero__device-inner', { y: 120, opacity: 0, duration: 1.6, ease: 'expo.out', delay: 0.55 })
      })

      // Scroll: pin the stage, shrink the copy away, raise the laptop to centre.
      mm.add(MEDIA.desktopMotion, () => {
        const device = root.current!.querySelector<HTMLElement>('.hero__device')!
        // Distance that centres the laptop in the space below the nav.
        const lift = () => {
          const nav = document.querySelector<HTMLElement>('.nav')?.offsetHeight ?? 0
          return nav + (window.innerHeight - nav - device.offsetHeight) / 2 - device.offsetTop
        }
        gsap
          .timeline({
            scrollTrigger: {
              trigger: '.hero__stage',
              start: 'top top',
              end: '+=110%',
              scrub: 1,
              pin: true,
              invalidateOnRefresh: true,
            },
          })
          .to('.hero__copy', { scale: 0.88, opacity: 0, y: -60, ease: 'none' }, 0)
          .fromTo(device, { scale: 0.9 }, { scale: 1, y: lift, ease: 'none' }, 0)
      })

      // Small screens: no pin, just let the copy drift and fade as it leaves.
      mm.add(MEDIA.mobileMotion, () => {
        gsap.to('.hero__copy', {
          opacity: 0.2,
          y: -40,
          ease: 'none',
          scrollTrigger: { trigger: '.hero__stage', start: 'top top', end: '60% top', scrub: true },
        })
      })
    },
    { scope: root },
  )

  return (
    <section className="hero" id="top" ref={root} aria-label="Introduction">
      <div className="hero__stage">
        <div className="hero__copy">
          <p className="hero__eyebrow eyebrow">{hero.eyebrow}</p>
          <h1 className="hero__title">
            {hero.title} <span className="gradient-text">{hero.accent}</span>
          </h1>
          <p className="hero__sub">{hero.subtitle}</p>
          <div className="hero__ctas">
            <a className="btn btn--primary" href="#work">
              See my work
            </a>
            <a className="link-arrow" href="#contact">
              Get in touch
            </a>
          </div>
        </div>
        <div className="hero__device">
          <div className="hero__device-inner">
            <DeviceFrame>
              <ProjectArt variant="hero" />
            </DeviceFrame>
          </div>
        </div>
      </div>
    </section>
  )
}
