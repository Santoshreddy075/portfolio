import { useRef } from 'react'
import { Link, useParams } from 'react-router'
import { DeviceFrame } from '../components/DeviceFrame'
import { ProjectArt } from '../components/ProjectArt'
import { Statement } from '../components/Statement'
import { StoryScroller } from '../components/StoryScroller'
import { profile } from '../content/profile'
import type { Project } from '../content/types'
import { MEDIA, SplitText, gsap, useGSAP } from '../lib/gsap'
import { NotFoundPage } from './NotFoundPage'
import './ProjectPage.css'

export function ProjectPage() {
  const { slug } = useParams()
  const index = profile.projects.findIndex((p) => p.slug === slug)
  if (index < 0) return <NotFoundPage />
  const project = profile.projects[index]
  const next = profile.projects[(index + 1) % profile.projects.length]

  return (
    <>
      <ProjectHero project={project} />
      <AtAGlance project={project} />
      <Statement eyebrow="The project" text={project.summary} />
      <section className="section section--alt project-story" aria-labelledby="story-title">
        <div className="container">
          <header className="section-head">
            <h2 id="story-title" className="display">
              How it came together.
            </h2>
          </header>
          <StoryScroller steps={project.story} palette={project.palette} />
        </div>
      </section>
      <Highlights project={project} />
      <NextProject project={next} />
    </>
  )
}

function ProjectHero({ project }: { project: Project }) {
  const root = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add(MEDIA.motion, () => {
        SplitText.create('.project-hero__title', {
          type: 'lines',
          mask: 'lines',
          autoSplit: true,
          onSplit: (self) => gsap.from(self.lines, { yPercent: 110, duration: 1.3, stagger: 0.1, ease: 'expo.out', delay: 0.2 }),
        })
        gsap.from(['.project-hero__back', '.project-hero__eyebrow', '.project-hero__tagline', '.project-hero__result'], {
          y: 24,
          opacity: 0,
          duration: 1,
          stagger: 0.08,
          delay: 0.35,
        })
        gsap.from('.project-hero__device-inner', { y: 120, opacity: 0, duration: 1.6, ease: 'expo.out', delay: 0.5 })
        // The laptop grows to full size as it scrolls into the middle of the screen.
        gsap.fromTo(
          '.project-hero__device',
          { scale: 0.86 },
          {
            scale: 1,
            ease: 'none',
            scrollTrigger: { trigger: '.project-hero__device', start: 'top 90%', end: 'center 55%', scrub: true },
          },
        )
      })
    },
    { scope: root },
  )

  return (
    <section className="project-hero" ref={root}>
      <div className="container project-hero__copy">
        <Link className="project-hero__back link-back" to="/#work">
          All work
        </Link>
        <p className="eyebrow project-hero__eyebrow">
          {project.category} · {project.period}
        </p>
        <h1 className="project-hero__title">{project.title}</h1>
        <p className="lead project-hero__tagline">{project.tagline}</p>
        <p className="pill project-hero__result">
          <span className="pill__value">{project.result.value}</span>
          <span>{project.result.label}</span>
        </p>
      </div>
      <div className="project-hero__device">
        <div className="project-hero__device-inner">
          <DeviceFrame>
            <ProjectArt variant={project.art} palette={project.palette} />
          </DeviceFrame>
        </div>
      </div>
    </section>
  )
}

function AtAGlance({ project }: { project: Project }) {
  const facts = [
    { label: 'Role', value: project.role },
    { label: 'Where', value: project.context },
    { label: 'When', value: project.period },
    { label: 'Outcome', value: project.result.label },
  ]
  return (
    <section className="section glance" aria-label="At a glance">
      <div className="container">
        <dl className="glance__grid">
          {facts.map((fact) => (
            <div key={fact.label} className="glance__fact">
              <dt>{fact.label}</dt>
              <dd>{fact.value}</dd>
            </div>
          ))}
        </dl>
        <ul className="glance__stack" aria-label="Built with">
          {project.stack.map((tech) => (
            <li key={tech} className="chip">
              {tech}
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

function Highlights({ project }: { project: Project }) {
  const root = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add(MEDIA.motion, () => {
        gsap.from('.highlight', {
          y: 60,
          opacity: 0,
          duration: 1.1,
          stagger: 0.1,
          ease: 'expo.out',
          scrollTrigger: { trigger: '.highlight-grid', start: 'top 82%' },
        })
      })
    },
    { scope: root },
  )

  return (
    <section className="section project-highlights" ref={root} aria-labelledby="highlights-heading">
      <div className="container">
        <header className="section-head">
          <h2 id="highlights-heading" className="display">
            What stands out.
          </h2>
        </header>
        <ul className="highlight-grid">
          {project.highlights.map((highlight, i) => (
            <li key={highlight} className="highlight">
              <span className="highlight__n gradient-text">{String(i + 1).padStart(2, '0')}</span>
              <p>{highlight}</p>
            </li>
          ))}
        </ul>
        {project.links.length > 0 && (
          <div className="project-links">
            {project.links.map((link, i) => (
              <a
                key={link.href}
                className={`btn ${i === 0 ? 'btn--primary' : 'btn--ghost'} link-out`}
                href={link.href}
                target="_blank"
                rel="noreferrer"
              >
                {link.label}
              </a>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

function NextProject({ project }: { project: Project }) {
  return (
    <section className="next-project">
      <Link className="next-project__link" to={`/projects/${project.slug}`}>
        <span className="next-project__art" aria-hidden="true">
          <ProjectArt variant={project.art} palette={project.palette} />
        </span>
        <span className="next-project__copy">
          <span className="next-project__eyebrow">Next project</span>
          <span className="next-project__title">{project.title}</span>
          <span className="next-project__cta">View project</span>
        </span>
      </Link>
    </section>
  )
}
