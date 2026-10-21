import { type CSSProperties, useRef } from 'react'
import { Link } from 'react-router'
import { profile } from '../content/profile'
import { MEDIA, gsap, useGSAP } from '../lib/gsap'
import { CredentialPass } from './CredentialPass'
import './CredentialsPreview.css'

const FAN = [
  { r: -9, x: -64, y: 18 },
  { r: 0, x: 0, y: -10 },
  { r: 9, x: 64, y: 18 },
]

export function CredentialsPreview() {
  const root = useRef<HTMLElement>(null)
  const { credentials, copy } = profile
  const issuers = [...new Set(credentials.map((c) => c.issuer))]

  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add(MEDIA.motion, () => {
        gsap.from('.creds__copy > *', {
          y: 40,
          opacity: 0,
          duration: 1,
          stagger: 0.1,
          scrollTrigger: { trigger: '.creds__copy', start: 'top 85%' },
        })
        // The passes start stacked and deal out into a fan.
        gsap.from('.fan__slot', {
          rotation: 0,
          x: 0,
          y: 80,
          opacity: 0,
          duration: 1.3,
          stagger: 0.12,
          ease: 'expo.out',
          clearProps: 'transform,opacity',
          scrollTrigger: { trigger: '.fan', start: 'top 80%' },
        })
      })
    },
    { scope: root },
  )

  return (
    <section id="credentials" className="section section--alt creds" ref={root} aria-labelledby="creds-title">
      <div className="container creds__grid">
        <div className="creds__copy">
          <h2 id="creds-title" className="display">
            Credentials.
          </h2>
          <p className="lead">{copy.credentialsLead}</p>
          <p className="creds__issuers">{issuers.join(' · ')}</p>
          <Link className="link-arrow" to="/credentials">
            See all {credentials.length} credentials
          </Link>
        </div>
        <ul className="fan" aria-label="Latest credentials">
          {credentials.slice(0, 3).map((credential, i) => (
            <li
              key={credential.name}
              className="fan__slot"
              style={{ '--r': `${FAN[i].r}deg`, '--x': `${FAN[i].x}px`, '--y': `${FAN[i].y}px`, zIndex: i === 1 ? 3 : 2 - i } as CSSProperties}
            >
              <CredentialPass credential={credential} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
