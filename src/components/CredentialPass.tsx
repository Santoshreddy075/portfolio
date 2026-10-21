import { type CSSProperties, type PointerEvent, useRef } from 'react'
import type { Credential } from '../content/types'
import { MEDIA, gsap, useGSAP } from '../lib/gsap'
import './CredentialPass.css'

/** A certification drawn as a wallet pass. Tilts toward the cursor on desktop. */
export function CredentialPass({ credential }: { credential: Credential }) {
  const ref = useRef<HTMLElement>(null)
  const { contextSafe } = useGSAP({ scope: ref })
  const { name, issuer, issued, credentialId, url, post, skills, tint } = credential

  const onMove = contextSafe((e: PointerEvent<HTMLElement>) => {
    if (e.pointerType !== 'mouse' || !window.matchMedia(MEDIA.motion).matches) return
    const el = e.currentTarget
    const box = el.getBoundingClientRect()
    const px = (e.clientX - box.left) / box.width - 0.5
    const py = (e.clientY - box.top) / box.height - 0.5
    el.style.setProperty('--gx', `${(px + 0.5) * 100}%`)
    el.style.setProperty('--gy', `${(py + 0.5) * 100}%`)
    gsap.to(el, { rotateY: px * 14, rotateX: -py * 14, transformPerspective: 900, duration: 0.5, overwrite: 'auto' })
  })

  const onLeave = contextSafe((e: PointerEvent<HTMLElement>) => {
    gsap.to(e.currentTarget, { rotateY: 0, rotateX: 0, duration: 0.9, ease: 'elastic.out(1, 0.55)', overwrite: 'auto' })
  })

  return (
    <article
      className="pass"
      ref={ref}
      style={{ '--tint': tint } as CSSProperties}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
    >
      <div className="pass__head">
        <span className="pass__issuer">{issuer}</span>
        <span className="pass__date">{issued}</span>
      </div>
      <h3 className="pass__name">{name}</h3>
      <ul className="pass__skills" aria-label="Skills">
        {skills.map((skill) => (
          <li key={skill}>{skill}</li>
        ))}
      </ul>
      <div className="pass__foot">
        {credentialId ? <span className="pass__id mono">ID {credentialId}</span> : <span className="pass__id">Certificate</span>}
        <span className="pass__links">
          {url && (
            <a className="link-out" href={url} target="_blank" rel="noreferrer">
              Verify <span className="visually-hidden">{name}</span>
            </a>
          )}
          {post && (
            <a className="link-out" href={post} target="_blank" rel="noreferrer">
              {url ? (
                <>
                  Post <span className="visually-hidden">about {name}</span>
                </>
              ) : (
                <>
                  See the announcement <span className="visually-hidden">for {name}</span>
                </>
              )}
            </a>
          )}
        </span>
      </div>
      <span className="pass__glare" aria-hidden="true" />
    </article>
  )
}
