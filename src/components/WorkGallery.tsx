import { useRef } from 'react'
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
    <section id="work" className="section section--mist work" ref={root} aria-labelledby="work-title">
      <div className="container work__head">
        <h2 id="work-title" className="display">
          Selected work.
        </h2>
        <p className="lead">{profile.copy.workLead}</p>
      </div>

      <div className="work__viewport">
        <ul className="work__track">
          {profile.projects.map((project) => (
            <li key={project.slug} className={`work-card work-card--${project.theme}`}>
              <div className="work-card__copy">
                <p className="work-card__meta">
                  {project.category} · {project.year}
                </p>
                <h3 className="work-card__title">{project.title}</h3>
                <p className="work-card__tagline">{project.tagline}</p>
              </div>
              <div className="work-card__art">
                <div className="work-card__art-inner">
                  <ProjectArt variant={project.art} palette={project.palette} />
                </div>
              </div>
              <div className="work-card__foot">
                <ul className="work-card__stack" aria-label="Built with">
                  {project.stack.map((tech) => (
                    <li key={tech} className="chip">
                      {tech}
                    </li>
                  ))}
                </ul>
                <div className="work-card__links">
                  {project.links.map((link) => (
                    <a key={link.label} className="link-arrow" href={link.href}>
                      {link.label}
                    </a>
                  ))}
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
