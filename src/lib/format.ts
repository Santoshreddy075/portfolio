import type { Stat } from '../content/types'

/** Renders a stat as display text, optionally at an in-between value while it counts up. */
export function formatStat(stat: Stat, value = stat.value): string {
  return `${stat.prefix ?? ''}${value.toFixed(stat.decimals ?? 0)}${stat.suffix ?? ''}`
}
