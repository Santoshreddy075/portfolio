import { profile } from '../content/profile'
import './Footer.css'

const YEAR = new Date().getFullYear()

export function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <p>
          Designed and built by {profile.name} with React and GSAP. © {YEAR}
        </p>
        <a href="#top">Back to top ↑</a>
      </div>
    </footer>
  )
}
