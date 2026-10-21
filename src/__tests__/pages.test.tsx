import { screen, within } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { profile } from '../content/profile'
import { renderAt } from '../test/render'

const notArt = { ignore: 'script, style, svg *' }

describe('Project pages', () => {
  it.each(profile.projects.map((p, i) => [p.slug, p, profile.projects[(i + 1) % profile.projects.length]] as const))(
    '/projects/%s tells the whole project',
    (_slug, project, next) => {
      renderAt(`/projects/${project.slug}`)

      expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(project.title)
      expect(screen.getByText(project.summary)).toBeInTheDocument()
      expect(screen.getAllByText(project.result.value, notArt).length).toBeGreaterThan(0)
      for (const step of project.story) {
        expect(screen.getByRole('heading', { name: step.title })).toBeInTheDocument()
      }
      for (const highlight of project.highlights) {
        expect(screen.getByText(highlight)).toBeInTheDocument()
      }
      for (const link of project.links) {
        expect(screen.getByRole('link', { name: new RegExp(link.label) })).toHaveAttribute('href', link.href)
      }
      expect(screen.getByRole('link', { name: new RegExp(`next project.*${next.title}`, 'i') })).toHaveAttribute(
        'href',
        `/projects/${next.slug}`,
      )
    },
  )

  it('shows a not-found page for an unknown project', () => {
    renderAt('/projects/does-not-exist')
    expect(screen.getByRole('heading', { level: 1, name: /not found/i })).toBeInTheDocument()
  })
})

describe('About page', () => {
  it('introduces Santosh with photo, story and journey', () => {
    renderAt('/about')
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(profile.name.split(' ')[0])
    const photo = screen.getAllByRole('img', { name: profile.about.photoAlt })[0]
    expect(photo.getAttribute('src')).toMatch(new RegExp(`${profile.about.photo}$`))
    for (const paragraph of profile.about.long) {
      expect(screen.getByText(paragraph)).toBeInTheDocument()
    }
    for (const step of profile.about.journey) {
      expect(screen.getByRole('heading', { name: step.title })).toBeInTheDocument()
    }
    for (const interest of profile.about.interests) {
      expect(screen.getByText(interest)).toBeInTheDocument()
    }
  })
})

describe('Credentials page', () => {
  it('lists every credential with a way to verify it', () => {
    renderAt('/credentials')
    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument()
    const list = screen.getByRole('list', { name: /credentials/i })
    for (const credential of profile.credentials) {
      expect(within(list).getByRole('heading', { name: credential.name })).toBeInTheDocument()
      if (credential.url) {
        expect(within(list).getByRole('link', { name: `Verify ${credential.name}` })).toHaveAttribute('href', credential.url)
      } else if (credential.post) {
        expect(within(list).getByRole('link', { name: `See the announcement for ${credential.name}` })).toHaveAttribute(
          'href',
          credential.post,
        )
      }
    }
  })
})

describe('Writing page', () => {
  it('lists every post linking to the original', () => {
    renderAt('/writing')
    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument()
    for (const post of profile.posts) {
      expect(screen.getByRole('link', { name: new RegExp(post.title) })).toHaveAttribute('href', post.url)
    }
  })
})
