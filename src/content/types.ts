/** Which generated "screen" ProjectArt draws. */
export type ArtVariant = 'hero' | 'vision' | 'metrics' | 'prompt' | 'chain' | 'player'

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
  /** Shown as mail links in the contact section; the first one is the "Email me" button. */
  emails: string[]
  /** Link to a résumé (e.g. './resume.pdf' in public/). Leave empty to hide the résumé buttons. */
  resumeUrl: string
  /** Your GitHub username; the GitHub tile links to your profile. */
  githubUsername: string
  /** true: the GitHub tile fetches your latest public repos live. false: it shows `projects`. */
  liveGithubRepos: boolean
  hero: { eyebrow: string; title: string; accent: string; subtitle: string }
  statement: string
  about: { title: string; body: string }
  /** Section intros and the closing call to action. */
  copy: {
    workLead: string
    highlightsLead: string
    experienceLead: string
    contactTitle: string
    contactLead: string
  }
  projects: Project[]
  featured: { projectSlug: string; eyebrow: string; title: string; steps: CaseStep[] }
  stats: Stat[]
  stack: string[]
  now: { updated: string; items: { label: string; value: string }[] }
  experience: Role[]
  socials: Link[]
}
