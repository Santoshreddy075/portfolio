import { useRef } from 'react'
import { profile } from '../content/profile'
import { type RepoItem, useGithubRepos } from '../hooks/useGithubRepos'
import { formatStat } from '../lib/format'
import { MEDIA, gsap, useGSAP } from '../lib/gsap'
import './Bento.css'

const GITHUB_URL = profile.githubUsername ? `https://github.com/${profile.githubUsername}` : ''

const FALLBACK_REPOS: RepoItem[] = profile.projects.map((p) => ({
  name: p.title,
  description: p.tagline,
  url: p.links.find((l) => l.href.startsWith('http'))?.href ?? (GITHUB_URL || '#'),
  language: p.stack[0],
}))

export function Bento() {
  const root = useRef<HTMLElement>(null)
  const { repos, live } = useGithubRepos(profile.liveGithubRepos ? profile.githubUsername : '', FALLBACK_REPOS)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add(MEDIA.motion, () => {
        gsap.from('.bento__head > *', {
          y: 40,
          opacity: 0,
          duration: 1,
          stagger: 0.1,
          scrollTrigger: { trigger: '.bento__head', start: 'top 85%' },
        })
        gsap.from('.tile', {
          y: 60,
          opacity: 0,
          duration: 1.1,
          stagger: 0.07,
          ease: 'expo.out',
          scrollTrigger: { trigger: '.bento', start: 'top 80%' },
        })

        // Count each stat up from zero the first time it scrolls into view.
        const els = gsap.utils.toArray<HTMLElement>('[data-stat]')
        els.forEach((el) => {
          const stat = profile.stats[Number(el.dataset.stat)]
          const counter = { value: 0 }
          el.textContent = formatStat(stat, 0)
          gsap.to(counter, {
            value: stat.value,
            duration: 1.8,
            ease: 'power2.out',
            scrollTrigger: { trigger: el, start: 'top 88%' },
            onUpdate: () => {
              el.textContent = formatStat(stat, counter.value)
            },
          })
        })
        return () => els.forEach((el) => (el.textContent = formatStat(profile.stats[Number(el.dataset.stat)])))
      })
    },
    { scope: root },
  )

  return (
    <section id="about" className="section section--light bento-section" ref={root} aria-labelledby="highlights-title">
      <div className="container">
        <header className="bento__head">
          <h2 id="highlights-title" className="display">
            The highlights.
          </h2>
          <p className="lead">{profile.copy.highlightsLead}</p>
        </header>

        <div className="bento">
          <article className="tile tile--dark tile--intro">
            <p className="tile__eyebrow">About</p>
            <h3 className="tile__title">{profile.about.title}</h3>
            <p className="tile__body">{profile.about.body}</p>
            <p className="tile__foot">
              {profile.role} · {profile.location}
            </p>
          </article>

          {profile.stats.map((stat, i) => (
            <article key={stat.label} className={`tile tile--stat tile--s${i + 1}`}>
              <p className="tile__stat gradient-text" data-stat={i}>
                {formatStat(stat)}
              </p>
              <p className="tile__label">{stat.label}</p>
            </article>
          ))}

          <article className="tile tile--dark tile--now">
            <div className="tile__row">
              <h3 className="tile__title tile__title--sm">
                <span className="live-dot" aria-hidden="true" /> Now
              </h3>
              <p className="tile__meta">Updated {profile.now.updated}</p>
            </div>
            <dl className="now-list">
              {profile.now.items.map((item) => (
                <div key={item.label} className="now-list__item">
                  <dt>{item.label}</dt>
                  <dd>{item.value}</dd>
                </div>
              ))}
            </dl>
          </article>

          <article className="tile tile--stack">
            <h3 className="tile__title tile__title--sm">Toolkit</h3>
            <ul className="tile__chips">
              {profile.stack.map((tech) => (
                <li key={tech} className="chip">
                  {tech}
                </li>
              ))}
            </ul>
          </article>

          <article className="tile tile--github">
            <div className="tile__row">
              <h3 className="tile__title tile__title--sm">{live ? 'Latest on GitHub' : 'On GitHub'}</h3>
              <span className={`badge${live ? ' badge--live' : ''}`}>{live ? 'Live' : 'Featured'}</span>
            </div>
            {GITHUB_URL && (
              <a className="link-arrow tile__profile-link" href={GITHUB_URL} target="_blank" rel="noreferrer">
                github.com/{profile.githubUsername}
              </a>
            )}
            <ul className="repo-list">
              {repos.map((repo) => (
                <li key={repo.name}>
                  <a className="repo" href={repo.url}>
                    <span className="repo__name">{repo.name}</span>
                    <span className="repo__desc">{repo.description}</span>
                    <span className="repo__meta">
                      {[repo.language, repo.stars !== undefined ? `★ ${repo.stars}` : null].filter(Boolean).join(' · ')}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </article>
        </div>
      </div>
    </section>
  )
}
