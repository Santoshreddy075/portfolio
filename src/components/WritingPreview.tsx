import { useRef } from 'react'
import { Link } from 'react-router'
import { profile } from '../content/profile'
import { MEDIA, gsap, useGSAP } from '../lib/gsap'
import { PostCard } from './PostCard'
import './WritingPreview.css'

export function WritingPreview() {
  const root = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add(MEDIA.motion, () => {
        gsap.from('.writing__head > *', {
          y: 40,
          opacity: 0,
          duration: 1,
          stagger: 0.1,
          scrollTrigger: { trigger: '.writing__head', start: 'top 85%' },
        })
        gsap.from('.writing__grid > li', {
          y: 60,
          opacity: 0,
          duration: 1.1,
          stagger: 0.1,
          ease: 'expo.out',
          scrollTrigger: { trigger: '.writing__grid', start: 'top 82%' },
        })
      })
    },
    { scope: root },
  )

  return (
    <section id="writing" className="section section--alt writing" ref={root} aria-labelledby="writing-title">
      <div className="container">
        <header className="section-head writing__head">
          <h2 id="writing-title" className="display">
            Writing.
          </h2>
          <p className="lead">{profile.copy.writingLead}</p>
        </header>
        <ul className="writing__grid">
          {profile.posts.slice(0, 3).map((post) => (
            <li key={post.url}>
              <PostCard post={post} />
            </li>
          ))}
        </ul>
        <Link className="link-arrow writing__all" to="/writing">
          Read all posts
        </Link>
      </div>
    </section>
  )
}
