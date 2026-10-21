import { useRef } from 'react'
import { CredentialPass } from '../components/CredentialPass'
import { PageHero } from '../components/PageHero'
import { profile } from '../content/profile'
import { MEDIA, gsap, useGSAP } from '../lib/gsap'
import './CredentialsPage.css'

export function CredentialsPage() {
  const root = useRef<HTMLElement>(null)
  const issuers = [...new Set(profile.credentials.map((c) => c.issuer))]

  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add(MEDIA.motion, () => {
        gsap.from('.pass-grid > li', {
          y: 80,
          rotateX: -12,
          opacity: 0,
          duration: 1.2,
          stagger: 0.08,
          ease: 'expo.out',
          transformPerspective: 1000,
          scrollTrigger: { trigger: '.pass-grid', start: 'top 85%' },
        })
      })
    },
    { scope: root },
  )

  return (
    <>
      <PageHero eyebrow="Credentials" title="Verified, not just claimed." lead={profile.copy.credentialsLead}>
        <p className="creds-page__issuers">
          {profile.credentials.length} certifications · {issuers.join(' · ')}
        </p>
      </PageHero>
      <section className="section section--alt creds-page" ref={root}>
        <div className="container">
          <ul className="pass-grid" aria-label="Credentials">
            {profile.credentials.map((credential) => (
              <li key={credential.name}>
                <CredentialPass credential={credential} />
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  )
}
