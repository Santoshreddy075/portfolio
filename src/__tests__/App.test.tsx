import { render, screen, within } from '@testing-library/react'
import { beforeEach, describe, expect, it } from 'vitest'
import App from '../App'
import { profile } from '../content/profile'
import { formatStat } from '../lib/format'

describe('App', () => {
  beforeEach(() => {
    render(<App />)
  })

  it('renders the hero headline with its accent', () => {
    const h1 = screen.getByRole('heading', { level: 1 })
    expect(h1).toHaveTextContent(profile.hero.title)
    expect(h1).toHaveTextContent(profile.hero.accent)
  })

  it('renders the statement', () => {
    expect(screen.getByText(profile.statement)).toBeInTheDocument()
  })

  it('renders every project in the work gallery', () => {
    const work = screen.getByRole('region', { name: /selected work/i })
    for (const project of profile.projects) {
      expect(within(work).getByRole('heading', { name: project.title })).toBeInTheDocument()
      expect(within(work).getByText(project.tagline)).toBeInTheDocument()
    }
  })

  it('renders every case-study step', () => {
    const caseStudy = screen.getByRole('region', { name: profile.featured.title })
    for (const step of profile.featured.steps) {
      expect(within(caseStudy).getByRole('heading', { name: step.title })).toBeInTheDocument()
      // Skip the decorative artwork's own SVG text.
      expect(within(caseStudy).getByText(step.metric.value, { ignore: 'script, style, svg *' })).toBeInTheDocument()
    }
  })

  it('renders every stat at its final value', () => {
    const highlights = screen.getByRole('region', { name: /highlights/i })
    for (const stat of profile.stats) {
      expect(within(highlights).getByText(formatStat(stat))).toBeInTheDocument()
      expect(within(highlights).getByText(stat.label)).toBeInTheDocument()
    }
  })

  it('renders the Now tile', () => {
    const highlights = screen.getByRole('region', { name: /highlights/i })
    for (const item of profile.now.items) {
      expect(within(highlights).getByText(item.value)).toBeInTheDocument()
    }
  })

  it('renders every role in the experience timeline', () => {
    const experience = screen.getByRole('region', { name: /experience/i })
    for (const role of profile.experience) {
      expect(within(experience).getByText(role.company)).toBeInTheDocument()
      expect(within(experience).getByText(role.role)).toBeInTheDocument()
    }
  })

  it('links the contact button to the email address', () => {
    expect(screen.getByRole('link', { name: /email me/i })).toHaveAttribute('href', `mailto:${profile.email}`)
  })

  it('takes section intros and the call to action from the profile', () => {
    expect(screen.getByText(profile.copy.workLead)).toBeInTheDocument()
    expect(screen.getByText(profile.copy.highlightsLead)).toBeInTheDocument()
    expect(screen.getByText(profile.copy.experienceLead)).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: profile.copy.contactTitle })).toBeInTheDocument()
    expect(screen.getByText(profile.copy.contactLead)).toBeInTheDocument()
  })

  it('shows résumé links only when a résumé is set', () => {
    const resumeLinks = screen.queryAllByRole('link', { name: /résumé/i })
    if (profile.resumeUrl) expect(resumeLinks.length).toBeGreaterThan(0)
    else expect(resumeLinks).toHaveLength(0)
  })

  it('links the GitHub tile to the GitHub profile', () => {
    const highlights = screen.getByRole('region', { name: /highlights/i })
    expect(within(highlights).getByRole('link', { name: new RegExp(profile.githubUsername, 'i') })).toHaveAttribute(
      'href',
      `https://github.com/${profile.githubUsername}`,
    )
  })
})

describe('formatStat', () => {
  it('applies prefix, suffix and decimals', () => {
    expect(formatStat({ value: 99.99, decimals: 2, suffix: '%', label: '' })).toBe('99.99%')
    expect(formatStat({ value: 40, prefix: '$', suffix: 'M+', label: '' })).toBe('$40M+')
    expect(formatStat({ value: 8, suffix: '+', label: '' }, 3.6)).toBe('4+')
  })
})
