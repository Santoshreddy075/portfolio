import { screen, within } from '@testing-library/react'
import { beforeEach, describe, expect, it } from 'vitest'
import { profile } from '../content/profile'
import { formatDate, formatStat } from '../lib/format'
import { renderAt } from '../test/render'

// Skip the decorative artwork's own SVG text when matching copy.
const notArt = { ignore: 'script, style, svg *' }

describe('Home page', () => {
  beforeEach(() => {
    renderAt('/')
  })

  it('renders the hero headline with its accent', () => {
    const h1 = screen.getByRole('heading', { level: 1 })
    expect(h1).toHaveTextContent(profile.hero.title)
    expect(h1).toHaveTextContent(profile.hero.accent)
  })

  it('renders the statement', () => {
    expect(screen.getByText(profile.statement)).toBeInTheDocument()
  })

  it('shows the forward-pass scene ending in a prediction', () => {
    const scene = screen.getByRole('region', { name: /watch a model think/i })
    expect(within(scene).getByText(/cereal · 0\.95/i)).toBeInTheDocument()
  })

  it('links every project card to its project page', () => {
    const work = screen.getByRole('region', { name: /selected work/i })
    for (const project of profile.projects) {
      expect(within(work).getByRole('link', { name: project.title })).toHaveAttribute('href', `/projects/${project.slug}`)
      expect(within(work).getByText(project.tagline)).toBeInTheDocument()
    }
  })

  it('tells the featured project as a case study', () => {
    const featured = profile.projects.find((p) => p.slug === profile.featured.projectSlug)!
    const caseStudy = screen.getByRole('region', { name: profile.featured.title })
    for (const step of featured.story) {
      expect(within(caseStudy).getByRole('heading', { name: step.title })).toBeInTheDocument()
      if (step.metric) expect(within(caseStudy).getByText(step.metric.value, notArt)).toBeInTheDocument()
    }
  })

  it('renders every stat at its final value and the Now tile', () => {
    const highlights = screen.getByRole('region', { name: /highlights/i })
    for (const stat of profile.stats) {
      expect(within(highlights).getByText(formatStat(stat))).toBeInTheDocument()
      expect(within(highlights).getByText(stat.label)).toBeInTheDocument()
    }
    for (const item of profile.now.items) {
      expect(within(highlights).getByText(item.value)).toBeInTheDocument()
    }
    expect(within(highlights).getByRole('img', { name: profile.about.photoAlt })).toBeInTheDocument()
  })

  it('links the GitHub tile to the GitHub profile', () => {
    const highlights = screen.getByRole('region', { name: /highlights/i })
    expect(within(highlights).getByRole('link', { name: new RegExp(profile.githubUsername, 'i') })).toHaveAttribute(
      'href',
      `https://github.com/${profile.githubUsername}`,
    )
  })

  it('previews credentials and links to all of them', () => {
    const section = screen.getByRole('region', { name: /credentials/i })
    expect(within(section).getByRole('link', { name: /all 7 credentials/i })).toHaveAttribute('href', '/credentials')
  })

  it('renders every role in the experience timeline', () => {
    const experience = screen.getByRole('region', { name: /experience/i })
    for (const role of profile.experience) {
      expect(within(experience).getByText(role.company)).toBeInTheDocument()
      expect(within(experience).getByText(role.role)).toBeInTheDocument()
    }
  })

  it('previews the latest posts and links to all writing', () => {
    const section = screen.getByRole('region', { name: /^writing/i })
    for (const post of profile.posts.slice(0, 3)) {
      expect(within(section).getByRole('link', { name: new RegExp(post.title) })).toHaveAttribute('href', post.url)
    }
    expect(within(section).getByRole('link', { name: /all posts/i })).toHaveAttribute('href', '/writing')
  })

  it('takes section intros and the call to action from the profile', () => {
    for (const lead of [
      profile.copy.workLead,
      profile.copy.highlightsLead,
      profile.copy.experienceLead,
      profile.copy.credentialsLead,
      profile.copy.writingLead,
      profile.copy.contactLead,
    ]) {
      expect(screen.getByText(lead)).toBeInTheDocument()
    }
    expect(screen.getByRole('heading', { name: profile.copy.contactTitle })).toBeInTheDocument()
  })

  it('links the contact button and every email address', () => {
    expect(screen.getByRole('link', { name: /email me/i })).toHaveAttribute('href', `mailto:${profile.emails[0]}`)
    const contact = screen.getByRole('region', { name: profile.copy.contactTitle })
    for (const email of profile.emails) {
      expect(within(contact).getByRole('link', { name: email })).toHaveAttribute('href', `mailto:${email}`)
    }
  })

  it('shows résumé links only when a résumé is set', () => {
    const resumeLinks = screen.queryAllByRole('link', { name: /résumé/i })
    if (profile.resumeUrl) expect(resumeLinks.length).toBeGreaterThan(0)
    else expect(resumeLinks).toHaveLength(0)
  })

  it('links the main pages from the navigation', () => {
    const nav = screen.getByRole('navigation', { name: 'Primary' })
    for (const [name, href] of [
      ['About', '/about'],
      ['Credentials', '/credentials'],
      ['Writing', '/writing'],
    ]) {
      expect(within(nav).getAllByRole('link', { name })[0]).toHaveAttribute('href', href)
    }
  })
})

describe('format helpers', () => {
  it('formatStat applies prefix, suffix and decimals', () => {
    expect(formatStat({ value: 99.99, decimals: 2, suffix: '%', label: '' })).toBe('99.99%')
    expect(formatStat({ value: 40, prefix: '$', suffix: 'M+', label: '' })).toBe('$40M+')
    expect(formatStat({ value: 8, suffix: '+', label: '' }, 3.6)).toBe('4+')
  })

  it('formatDate renders day, short month and year', () => {
    expect(formatDate('2026-10-14')).toBe('14 Oct 2026')
    expect(formatDate('2025-05-28')).toBe('28 May 2025')
  })
})
