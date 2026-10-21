/** Which generated "screen" ProjectArt draws. */
export type ArtVariant = 'hero' | 'vision' | 'metrics' | 'prompt' | 'chain' | 'player'

export type Link = { label: string; href: string }

/** One beat of a scroll story: the device shows `art`, zoomed to `focus` if set. */
export type CaseStep = {
  eyebrow: string
  title: string
  body: string
  metric?: { value: string; label: string }
  art: ArtVariant
  /** Zoom into the art: [x %, y %, scale]. */
  focus?: [number, number, number]
}

export type Project = {
  slug: string
  title: string
  category: string
  tagline: string
  /** Intro paragraph on the project page. */
  summary: string
  role: string
  context: string
  period: string
  /** Headline outcome, shown on cards and at the top of the page. */
  result: { value: string; label: string }
  stack: string[]
  art: ArtVariant
  /** Three colors that tint the project's generated art. */
  palette: [string, string, string]
  story: CaseStep[]
  highlights: string[]
  links: Link[]
}

export type Credential = {
  name: string
  issuer: string
  issued: string
  credentialId?: string
  /** Issuer's verification page. */
  url?: string
  /** LinkedIn post announcing it. */
  post?: string
  skills: string[]
  /** Pass colour. */
  tint: string
}

export type Post = {
  title: string
  /** ISO date, e.g. '2026-10-14'. */
  date: string
  excerpt: string
  url: string
  tags: string[]
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
  /** Link to a résumé (e.g. 'resume.pdf' in public/). Leave empty to hide the résumé buttons. */
  resumeUrl: string
  /** Your GitHub username; the GitHub tile links to your profile. */
  githubUsername: string
  /** true: the GitHub tile fetches your latest public repos live. false: it shows `projects`. */
  liveGithubRepos: boolean
  hero: { eyebrow: string; title: string; accent: string; subtitle: string }
  statement: string
  about: {
    /** Short version, used on the home page. */
    title: string
    body: string
    /** Photo file in public/. */
    photo: string
    photoAlt: string
    /** Long version, one paragraph per item, for the About page. */
    long: string[]
    journey: { year: string; title: string; body: string }[]
    interests: string[]
  }
  /** Section intros and the closing call to action. */
  copy: {
    workLead: string
    highlightsLead: string
    experienceLead: string
    credentialsLead: string
    writingLead: string
    contactTitle: string
    contactLead: string
  }
  projects: Project[]
  /** The project told as a scroll story on the home page. */
  featured: { projectSlug: string; eyebrow: string; title: string }
  credentials: Credential[]
  posts: Post[]
  stats: Stat[]
  stack: string[]
  now: { updated: string; items: { label: string; value: string }[] }
  experience: Role[]
  socials: Link[]
}
