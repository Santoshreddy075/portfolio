import { Link } from 'react-router'
import { profile } from '../content/profile'
import './Footer.css'

const YEAR = new Date().getFullYear()

export function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <nav className="footer__links" aria-label="Footer">
          <Link to="/#work">Work</Link>
          <Link to="/about">About</Link>
          <Link to="/credentials">Credentials</Link>
          <Link to="/writing">Writing</Link>
          {profile.socials.map((social) => (
            <a key={social.label} href={social.href} target="_blank" rel="noreferrer">
              {social.label}
            </a>
          ))}
        </nav>
        <div className="footer__inner">
          <p>
            Designed and built by {profile.name} with React and GSAP. © {YEAR}
          </p>
          <a href="#top" onClick={() => window.scrollTo({ top: 0 })}>
            Back to top ↑
          </a>
        </div>
      </div>
    </footer>
  )
}
