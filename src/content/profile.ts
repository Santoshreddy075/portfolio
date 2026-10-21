import type { Profile } from './types'

/**
 * Everything the site says lives here. Edit this file, push to GitHub, and the
 * Pages workflow rebuilds and redeploys the site.
 */
export const profile: Profile = {
  name: 'Rowan Ellis',
  initials: 'RE',
  role: 'Product Engineer',
  location: 'San Francisco, CA',
  email: 'hello@example.com',
  resumeUrl: '#',
  githubUsername: '',

  hero: {
    eyebrow: 'Rowan Ellis — Product Engineer',
    title: 'Software that feels',
    accent: 'inevitable.',
    subtitle: 'I design and build products used by millions, from the first sketch to the last pixel of polish.',
  },

  statement:
    'I care about the space between an idea and the interface. I prototype early, measure honestly, and sweat the details most people never notice — because that is where trust is built.',

  about: {
    title: 'Engineer by trade. Designer at heart.',
    body: 'Eight years of building products where design and engineering meet — leading teams, shipping fast, and keeping the bar high long after launch day.',
  },

  projects: [
    {
      slug: 'tidepool',
      title: 'Tidepool',
      category: 'Real-time collaboration',
      tagline: 'A whiteboard that keeps up with fifty people thinking at once.',
      year: '2025',
      stack: ['React', 'CRDTs', 'WebRTC', 'Rust'],
      art: 'board',
      palette: ['#4facfe', '#a78bfa', '#f9a8d4'],
      theme: 'dark',
      links: [
        { label: 'Read the case study', href: '#case-study' },
        { label: 'Source', href: '#' },
      ],
    },
    {
      slug: 'ledgerly',
      title: 'Ledgerly',
      category: 'Fintech',
      tagline: 'Invoices, cash flow and tax estimates for freelancers, in one calm place.',
      year: '2024',
      stack: ['React Native', 'TypeScript', 'Node', 'Postgres'],
      art: 'finance',
      palette: ['#34d399', '#22d3ee', '#a3e635'],
      theme: 'light',
      links: [{ label: 'Visit site', href: '#' }],
    },
    {
      slug: 'beacon',
      title: 'Beacon',
      category: 'Developer tools',
      tagline: 'Streaming observability that turns a wall of logs into a single answer.',
      year: '2023',
      stack: ['Go', 'ClickHouse', 'WebSockets', 'D3'],
      art: 'dashboard',
      palette: ['#fb923c', '#f43f5e', '#facc15'],
      theme: 'dark',
      links: [
        { label: 'Live demo', href: '#' },
        { label: 'Source', href: '#' },
      ],
    },
    {
      slug: 'verse',
      title: 'Verse',
      category: 'AI writing',
      tagline: 'A journaling companion that asks better questions than it answers.',
      year: '2026',
      stack: ['Next.js', 'Claude API', 'Edge functions'],
      art: 'editor',
      palette: ['#c084fc', '#818cf8', '#f472b6'],
      theme: 'light',
      links: [{ label: 'Try the beta', href: '#' }],
    },
  ],

  featured: {
    projectSlug: 'tidepool',
    eyebrow: 'Case study · Tidepool',
    title: 'From laggy to instant.',
    steps: [
      {
        eyebrow: '01 — The problem',
        title: 'Big boards froze for seconds.',
        body: 'Once a board passed fifty live collaborators, every stroke waited on a round trip to the server. Teams started splitting work across boards just to keep typing.',
        metric: { value: '4.2s', label: 'p95 sync latency before' },
        art: 'board',
      },
      {
        eyebrow: '02 — The approach',
        title: 'Local first, server second.',
        body: 'I rebuilt the sync engine on CRDTs so every edit applies instantly on-device, then gossips peer-to-peer over WebRTC with the server as a durable fallback.',
        metric: { value: '10 wks', label: 'from prototype to rollout' },
        art: 'dashboard',
      },
      {
        eyebrow: '03 — The result',
        title: 'Collaboration that feels solo.',
        body: 'Edits now land faster than a frame. Large teams moved back onto shared boards, and daily active boards tripled within a quarter.',
        metric: { value: '80ms', label: 'p95 sync latency after' },
        art: 'hero',
      },
    ],
  },

  stats: [
    { value: 8, suffix: '+', label: 'years shipping production software' },
    { value: 40, suffix: 'M+', label: 'people reached by products I built' },
    { value: 120, suffix: '+', label: 'open-source contributions' },
    { value: 99.99, suffix: '%', decimals: 2, label: 'uptime on systems I own' },
  ],

  stack: ['TypeScript', 'React', 'Next.js', 'Node', 'Go', 'Rust', 'Postgres', 'GSAP', 'Figma', 'AWS'],

  now: {
    updated: 'October 2026',
    items: [
      { label: 'Building', value: 'Offline sync for Verse' },
      { label: 'Reading', value: 'The Design of Everyday Things' },
      { label: 'Learning', value: 'Shader programming' },
      { label: 'Based in', value: 'San Francisco' },
    ],
  },

  experience: [
    {
      company: 'Lumen Labs',
      role: 'Staff Product Engineer',
      start: '2023',
      end: 'Present',
      summary: 'Lead engineer for the collaboration platform used by 2M+ teams.',
      highlights: ['Rebuilt real-time sync (p95 4.2s → 80ms)', 'Grew the team from 4 to 11 engineers'],
    },
    {
      company: 'Arcwise',
      role: 'Senior Software Engineer',
      start: '2020',
      end: '2023',
      summary: 'Built the observability product from zero to $12M ARR.',
      highlights: ['Designed the streaming query engine', 'Shipped the public API and SDKs'],
    },
    {
      company: 'Brightline',
      role: 'Software Engineer',
      start: '2017',
      end: '2020',
      summary: 'Full-stack engineer on consumer finance apps.',
      highlights: ['Cut app start time by 60%', 'Launched budgeting to 5M users'],
    },
  ],

  socials: [
    { label: 'GitHub', href: 'https://github.com/' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/' },
    { label: 'Read.cv', href: 'https://read.cv/' },
  ],
}
