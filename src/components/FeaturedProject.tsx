import { useRef } from 'react'
import { Link } from 'react-router'
import { profile } from '../content/profile'
import { MEDIA, gsap, useGSAP } from '../lib/gsap'
import { StoryScroller } from './StoryScroller'
import './FeaturedProject.css'

export function FeaturedProject() {
  const root = useRef<HTMLElement>(null)
  const { featured } = profile
  const project = profile.projects.find((p) => p.slug === featured.projectSlug)!

  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add(MEDIA.motion, () => {
        gsap.from('.case__head > *', {
          y: 40,
          opacity: 0,
          duration: 1,
          stagger: 0.1,
          scrollTrigger: { trigger: '.case__head', start: 'top 85%' },
        })
      })
    },
    { scope: root },
  )

  return (
    <section id="case-study" className="section section--alt case" ref={root} aria-labelledby="case-title">
      <div className="container">
        <header className="section-head case__head">
          <p className="eyebrow">{featured.eyebrow}</p>
          <h2 id="case-title" className="display">
            {featured.title}
          </h2>
          <Link className="link-arrow" to={`/projects/${project.slug}`}>
            The full project
          </Link>
        </header>
        <StoryScroller steps={project.story} palette={project.palette} />
      </div>
    </section>
  )
}
