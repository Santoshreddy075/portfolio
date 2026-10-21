import type { Stat } from '../content/types'

/** Renders a stat as display text, optionally at an in-between value while it counts up. */
export function formatStat(stat: Stat, value = stat.value): string {
  return `${stat.prefix ?? ''}${value.toFixed(stat.decimals ?? 0)}${stat.suffix ?? ''}`
}

const dateFormat = new Intl.DateTimeFormat('en-AU', { day: 'numeric', month: 'short', year: 'numeric', timeZone: 'UTC' })

/** '2026-10-14' → '14 Oct 2026'. */
export function formatDate(iso: string): string {
  return dateFormat.format(new Date(`${iso}T00:00:00Z`))
}

/** URL for a file in public/, respecting the deploy base path. */
export function asset(path: string): string {
  return `${import.meta.env.BASE_URL}${path}`
}
