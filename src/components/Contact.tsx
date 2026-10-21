import { type PointerEvent, useRef } from 'react'
import { profile } from '../content/profile'
import { MEDIA, gsap, useGSAP } from '../lib/gsap'
import './Contact.css'

export function Contact() {
  const root = useRef<HTMLElement>(null)
  const title = useRef<HTMLHeadingElement>(null)

  const { contextSafe } = useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add(MEDIA.motion, () => {
        const el = title.current!
        gsap.set(el, { '--x': `${el.offsetWidth / 2}px`, '--y': `${el.offsetHeight / 2}px` })
        gsap.from('.contact__inner > *', {
          y: 48,
          opacity: 0,
          duration: 1.2,
          stagger: 0.1,
          ease: 'expo.out',
          scrollTrigger: { trigger: '.contact__inner', start: 'top 80%' },
        })
      })
    },
    { scope: root },
  )

  // The headline's highlight follows the pointer.
  const onPointerMove = contextSafe((e: PointerEvent<HTMLElement>) => {
    if (e.pointerType !== 'mouse' || !window.matchMedia(MEDIA.motion).matches) return
    const el = e.currentTarget.querySelector<HTMLElement>('.contact__title')!
    const box = el.getBoundingClientRect()
    gsap.to(el, {
      '--x': `${e.clientX - box.left}px`,
      '--y': `${e.clientY - box.top}px`,
      duration: 0.9,
      overwrite: 'auto',
    })
  })

  return (
    <section
      id="contact"
      className="section contact"
      ref={root}
      onPointerMove={onPointerMove}
      aria-labelledby="contact-title"
    >
      <div className="container contact__inner">
        <p className="eyebrow">What's next?</p>
        <h2 id="contact-title" className="contact__title" ref={title}>
          {profile.copy.contactTitle}
        </h2>
        <p className="lead contact__lead">{profile.copy.contactLead}</p>
        <div className="contact__actions">
          <a className="btn btn--primary" href={`mailto:${profile.emails[0]}`}>
            Email me
          </a>
          {profile.resumeUrl && (
            <a className="btn btn--ghost" href={profile.resumeUrl}>
              Download résumé
            </a>
          )}
        </div>
        <ul className="contact__emails">
          {profile.emails.map((email) => (
            <li key={email}>
              <a href={`mailto:${email}`}>{email}</a>
            </li>
          ))}
        </ul>
        <ul className="contact__socials">
          {profile.socials.map((social) => (
            <li key={social.label}>
              <a className="link-arrow" href={social.href} target="_blank" rel="noreferrer">
                {social.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
