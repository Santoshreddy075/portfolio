/** Which generated "screen" ProjectArt draws. */
export type ArtVariant = 'hero' | 'board' | 'finance' | 'dashboard' | 'editor'

export type Link = { label: string; href: string }

export type Project = {
  slug: string
  title: string
  category: string
  tagline: string
  year: string
  stack: string[]
  art: ArtVariant
  /** Three colors that tint the project's generated art. */
  palette: [string, string, string]
  /** Card surface in the work gallery. */
  theme: 'light' | 'dark'
  links: Link[]
}

export type CaseStep = {
  eyebrow: string
  title: string
  body: string
  metric: { value: string; label: string }
  art: ArtVariant
}

export type Stat = {
  value: number
  prefix?: string
  suffix?: string
  decimals?: number
  label: string
}

export type Role = {
  company: string
  role: string
  start: string
  end: string
  summary: string
  highlights: string[]
}

export type Profile = {
  name: string
  initials: string
  role: string
  location: string
  email: string
  resumeUrl: string
  /** Public GitHub username for the live "Latest on GitHub" tile. Leave empty to show `projects` instead. */
  githubUsername: string
  hero: { eyebrow: string; title: string; accent: string; subtitle: string }
  statement: string
  about: { title: string; body: string }
  projects: Project[]
  featured: { projectSlug: string; eyebrow: string; title: string; steps: CaseStep[] }
  stats: Stat[]
  stack: string[]
  now: { updated: string; items: { label: string; value: string }[] }
  experience: Role[]
  socials: Link[]
}
