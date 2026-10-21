import { useRef } from 'react'
import { profile } from '../content/profile'
import { MEDIA, ScrollTrigger, gsap, useGSAP } from '../lib/gsap'
import './Nav.css'

const LINKS = [
  { label: 'Work', href: '#work' },
  { label: 'Case study', href: '#case-study' },
  { label: 'About', href: '#about' },
  { label: 'Experience', href: '#experience' },
]

export function Nav() {
  const ref = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      // Tuck the bar away while scrolling down, bring it back on any scroll up.
      mm.add(MEDIA.motion, () => {
        const nav = ref.current!
        let hidden = false
        ScrollTrigger.create({
          start: 0,
          end: 'max',
          onUpdate: (self) => {
            const hide = self.direction === 1 && self.scroll() > 320 && !nav.contains(document.activeElement)
            if (hide === hidden) return
            hidden = hide
            gsap.to(nav, { yPercent: hide ? -100 : 0, duration: 0.45, overwrite: true })
          },
        })
      })
    },
    { scope: ref },
  )

  return (
    <header className="nav" ref={ref}>
      <nav className="nav__inner" aria-label="Primary">
        <a className="nav__brand" href="#top">
          {profile.name}
        </a>
        <ul className="nav__links">
          {LINKS.map((link) => (
            <li key={link.href}>
              <a href={link.href}>{link.label}</a>
            </li>
          ))}
        </ul>
        <a className="nav__cta" href="#contact">
          Contact
        </a>
      </nav>
    </header>
  )
}
