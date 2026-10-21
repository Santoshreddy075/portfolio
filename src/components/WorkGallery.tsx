import { useRef } from 'react'
import { Link } from 'react-router'
import { profile } from '../content/profile'
import { MEDIA, gsap, useGSAP } from '../lib/gsap'
import { ProjectArt } from './ProjectArt'
import './WorkGallery.css'

export function WorkGallery() {
  const root = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()

      mm.add(MEDIA.motion, () => {
        gsap.from('.work__head > *', {
          y: 40,
          opacity: 0,
          duration: 1,
          stagger: 0.1,
          scrollTrigger: { trigger: '.work__head', start: 'top 85%' },
        })
      })

      // Desktop: pin the section and turn vertical scroll into a horizontal ride.
      // Elsewhere the track is a native swipeable carousel (see CSS).
      mm.add(MEDIA.desktopMotion, () => {
        const track = root.current!.querySelector<HTMLElement>('.work__track')!
        const distance = () => Math.max(0, track.scrollWidth - document.documentElement.clientWidth)

        const ride = gsap.to(track, {
          x: () => -distance(),
          ease: 'none',
          scrollTrigger: {
            trigger: root.current,
            start: 'top top',
            end: () => `+=${distance()}`,
            pin: true,
            scrub: 1,
            invalidateOnRefresh: true,
          },
        })

        // Parallax: each card's art drifts against the direction of travel.
        gsap.utils.toArray<HTMLElement>('.work-card__art-inner').forEach((art) => {
          gsap.fromTo(
            art,
            { xPercent: -7 },
            {
              xPercent: 7,
              ease: 'none',
              scrollTrigger: {
                trigger: art,
                containerAnimation: ride,
                start: 'left right',
                end: 'right left',
                scrub: true,
              },
            },
          )
        })
      })
    },
    { scope: root },
  )

  return (
    <section id="work" className="section work" ref={root} aria-labelledby="work-title">
      <div className="container section-head work__head">
        <h2 id="work-title" className="display">
          Selected work.
        </h2>
        <p className="lead">{profile.copy.workLead}</p>
      </div>

      <div className="work__viewport">
        <ul className="work__track">
          {profile.projects.map((project) => (
            <li key={project.slug} className="work-card">
              <div className="work-card__copy">
                <p className="work-card__meta">
                  {project.category} · {project.period}
                </p>
                <h3 className="work-card__title">
                  {/* Stretched link: the whole card opens the project page. */}
                  <Link to={`/projects/${project.slug}`} className="work-card__link">
                    {project.title}
                  </Link>
                </h3>
                <p className="work-card__tagline">{project.tagline}</p>
              </div>
              <div className="work-card__art">
                <div className="work-card__art-inner">
                  <ProjectArt variant={project.art} palette={project.palette} />
                </div>
                <span className="work-card__result pill">
                  <span className="pill__value">{project.result.value}</span>
                </span>
              </div>
              <div className="work-card__foot">
                <ul className="work-card__stack" aria-label="Built with">
                  {project.stack.map((tech) => (
                    <li key={tech} className="chip">
                      {tech}
                    </li>
                  ))}
                </ul>
                <span className="work-card__cta" aria-hidden="true">
                  Explore project
                </span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
