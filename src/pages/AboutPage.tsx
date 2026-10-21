import { useRef } from 'react'
import { Contact } from '../components/Contact'
import { Experience } from '../components/Experience'
import { profile } from '../content/profile'
import { asset } from '../lib/format'
import { MEDIA, SplitText, gsap, useGSAP } from '../lib/gsap'
import './AboutPage.css'

export function AboutPage() {
  const root = useRef<HTMLDivElement>(null)
  const { about } = profile
  const firstName = profile.name.split(' ')[0]

  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add(MEDIA.motion, () => {
        SplitText.create('.about-hero__title', {
          type: 'lines',
          mask: 'lines',
          autoSplit: true,
          onSplit: (self) => gsap.from(self.lines, { yPercent: 110, duration: 1.3, stagger: 0.1, ease: 'expo.out', delay: 0.2 }),
        })
        gsap.from(['.about-hero__eyebrow', '.about-hero__lead', '.about-hero__chips'], {
          y: 24,
          opacity: 0,
          duration: 1,
          stagger: 0.08,
          delay: 0.35,
        })
        gsap.from('.portrait', { scale: 0.92, opacity: 0, duration: 1.6, ease: 'expo.out', delay: 0.3 })
        // Depth: the photo drifts slower than the page.
        gsap.to('.portrait__img', {
          yPercent: 8,
          ease: 'none',
          scrollTrigger: { trigger: '.about-hero', start: 'top top', end: 'bottom top', scrub: true },
        })
        gsap.from('.about-story p', {
          y: 30,
          opacity: 0,
          duration: 1,
          stagger: 0.12,
          scrollTrigger: { trigger: '.about-story', start: 'top 75%' },
        })
        gsap.fromTo(
          '.journey__progress',
          { scaleX: 0 },
          {
            scaleX: 1,
            ease: 'none',
            scrollTrigger: { trigger: '.journey__list', start: 'top 75%', end: 'bottom 55%', scrub: true },
          },
        )
        gsap.from('.journey__item', {
          y: 40,
          opacity: 0,
          duration: 1,
          stagger: 0.12,
          ease: 'expo.out',
          scrollTrigger: { trigger: '.journey__list', start: 'top 78%' },
        })
      })
    },
    { scope: root },
  )

  return (
    <div ref={root}>
      <section className="about-hero">
        <div className="container about-hero__grid">
          <div className="about-hero__copy">
            <p className="eyebrow about-hero__eyebrow">About</p>
            <h1 className="about-hero__title">Hi, I’m {firstName}.</h1>
            <p className="lead about-hero__lead">
              {profile.role} at La Trobe University, based in {profile.location}. I build machine learning models and care how they
              behave in the real world.
            </p>
            <ul className="about-hero__chips" aria-label="Interests">
              {about.interests.map((interest) => (
                <li key={interest} className="chip">
                  {interest}
                </li>
              ))}
            </ul>
          </div>
          <figure className="portrait">
            <div className="portrait__frame">
              <img className="portrait__img" src={asset(about.photo)} alt={about.photoAlt} width="800" height="800" />
            </div>
          </figure>
        </div>
      </section>

      <section className="section about-story" aria-label="My story">
        <div className="container about-story__inner">
          {about.long.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </section>

      <section className="section section--alt journey" aria-labelledby="journey-title">
        <div className="container">
          <header className="section-head">
            <h2 id="journey-title" className="display">
              The journey so far.
            </h2>
          </header>
          <div className="journey__track">
            <div className="journey__rail" aria-hidden="true">
              <div className="journey__progress" />
            </div>
            <ol className="journey__list">
              {about.journey.map((step) => (
                <li key={step.year} className="journey__item">
                  <span className="journey__dot" aria-hidden="true" />
                  <p className="journey__year gradient-text">{step.year}</p>
                  <h3 className="journey__title">{step.title}</h3>
                  <p className="journey__body">{step.body}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <Experience />
      <Contact />
    </div>
  )
}
