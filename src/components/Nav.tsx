import { useEffect, useRef, useState } from 'react'
import { Link, NavLink } from 'react-router'
import { profile } from '../content/profile'
import { MEDIA, ScrollTrigger, gsap, useGSAP } from '../lib/gsap'
import './Nav.css'

const LINKS = [
  { label: 'Work', to: '/#work' },
  { label: 'About', to: '/about' },
  { label: 'Credentials', to: '/credentials' },
  { label: 'Writing', to: '/writing' },
]

export function Nav() {
  const ref = useRef<HTMLElement>(null)
  const [open, setOpen] = useState(false)
  const close = () => setOpen(false)

  useEffect(() => {
    document.documentElement.classList.toggle('menu-open', open)
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

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
            const hide =
              self.direction === 1 &&
              self.scroll() > 320 &&
              !nav.contains(document.activeElement) &&
              !document.documentElement.classList.contains('menu-open')
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
    <>
      <header className={`nav${open ? ' nav--open' : ''}`} ref={ref}>
        <nav className="nav__inner" aria-label="Primary">
          <Link className="nav__brand" to="/" onClick={close}>
            {profile.name}
          </Link>
          <ul className="nav__links">
            {LINKS.map((link) => (
              <li key={link.to}>
                {/* A section of the home page, not a page: never shown as the current page. */}
                {link.to.startsWith('/#') ? <Link to={link.to}>{link.label}</Link> : <NavLink to={link.to}>{link.label}</NavLink>}
              </li>
            ))}
          </ul>
          <div className="nav__end">
            <Link className="nav__cta" to="/#contact" onClick={close}>
              Contact
            </Link>
            <button
              type="button"
              className="nav__toggle"
              aria-expanded={open}
              aria-controls="nav-sheet"
              onClick={() => setOpen((o) => !o)}
            >
              <span className="visually-hidden">{open ? 'Close menu' : 'Open menu'}</span>
              <span className="nav__burger" aria-hidden="true" />
            </button>
          </div>
        </nav>
      </header>
      {/* Outside the header: its backdrop-filter would trap a fixed-position sheet inside the bar. */}
      <div className="nav__sheet" id="nav-sheet" hidden={!open}>
        <ul>
          {LINKS.map((link) => (
            <li key={link.to}>
              <Link to={link.to} onClick={close}>
                {link.label}
              </Link>
            </li>
          ))}
          <li>
            <Link to="/#contact" onClick={close}>
              Contact
            </Link>
          </li>
        </ul>
      </div>
    </>
  )
}
