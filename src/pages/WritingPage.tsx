import { useRef } from 'react'
import { PageHero } from '../components/PageHero'
import { PostCard, PostRow } from '../components/PostCard'
import { profile } from '../content/profile'
import { MEDIA, gsap, useGSAP } from '../lib/gsap'
import './WritingPage.css'

export function WritingPage() {
  const root = useRef<HTMLElement>(null)
  const [latest, ...rest] = profile.posts

  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add(MEDIA.motion, () => {
        gsap.from('.writing-page__lead', { y: 60, opacity: 0, duration: 1.2, ease: 'expo.out', delay: 0.4 })
        gsap.from('.post-list > li', {
          y: 30,
          opacity: 0,
          duration: 0.9,
          stagger: 0.06,
          scrollTrigger: { trigger: '.post-list', start: 'top 85%' },
        })
      })
    },
    { scope: root },
  )

  return (
    <>
      <PageHero eyebrow="Writing" title="Learning in public." lead={profile.copy.writingLead} />
      <section className="section section--alt writing-page" ref={root} aria-label="Posts">
        <div className="container">
          <div className="writing-page__lead">
            <PostCard post={latest} featured />
          </div>
          <ul className="post-list">
            {rest.map((post) => (
              <li key={post.url}>
                <PostRow post={post} />
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  )
}
