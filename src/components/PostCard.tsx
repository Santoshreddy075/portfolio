import type { Post } from '../content/types'
import { formatDate } from '../lib/format'
import './PostCard.css'

/** A post as a card (`featured` makes it the large lead story). */
export function PostCard({ post, featured = false }: { post: Post; featured?: boolean }) {
  return (
    <a className={`post-card${featured ? ' post-card--featured' : ''}`} href={post.url} target="_blank" rel="noreferrer">
      <time className="post-card__date" dateTime={post.date}>
        {formatDate(post.date)}
      </time>
      <h3 className="post-card__title">{post.title}</h3>
      <p className="post-card__excerpt">{post.excerpt}</p>
      <span className="post-card__foot">
        <span className="post-card__tags">
          {post.tags.map((tag) => (
            <span key={tag} className="chip">
              {tag}
            </span>
          ))}
        </span>
        <span className="post-card__cta link-out">Read on LinkedIn</span>
      </span>
    </a>
  )
}

/** A post as a compact row in a list. */
export function PostRow({ post }: { post: Post }) {
  return (
    <a className="post-row" href={post.url} target="_blank" rel="noreferrer">
      <time className="post-row__date" dateTime={post.date}>
        {formatDate(post.date)}
      </time>
      <span className="post-row__main">
        <span className="post-row__title">{post.title}</span>
        <span className="post-row__excerpt">{post.excerpt}</span>
      </span>
      <span className="post-row__tags">{post.tags.join(' · ')}</span>
      <span className="post-row__arrow" aria-hidden="true">
        ↗
      </span>
    </a>
  )
}
