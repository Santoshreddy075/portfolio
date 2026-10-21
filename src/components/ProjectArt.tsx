import { type ReactNode, useId } from 'react'
import type { ArtVariant } from '../content/types'
import './ProjectArt.css'

type Palette = [string, string, string]
type ArtProps = { id: string; c: Palette }

const DEFAULT_PALETTE: Palette = ['#4facfe', '#a78bfa', '#f472b6']

/**
 * Generated "product screens" — no image assets. Each variant draws a stylised UI
 * on a 1600×1000 canvas that crops to fill whatever box it sits in, so keep the
 * important shapes near the middle.
 */
export function ProjectArt({
  variant,
  palette = DEFAULT_PALETTE,
  className,
}: {
  variant: ArtVariant
  palette?: Palette
  className?: string
}) {
  const id = `art${useId().replace(/[^a-zA-Z0-9_-]/g, '')}`
  const Art = ART[variant]
  return (
    <svg
      className={['project-art', className].filter(Boolean).join(' ')}
      viewBox="0 0 1600 1000"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
      focusable="false"
    >
      <Art id={id} c={palette} />
    </svg>
  )
}

// ---------- helpers ----------

/** Deterministic pseudo-random in [0, 1), so the art renders identically every time. */
function rand(i: number) {
  const x = Math.sin(i * 12.9898) * 43758.5453
  return x - Math.floor(x)
}

type Pt = [number, number]

/** An upward-trending, slightly noisy series between x0 and x1. */
function series(n: number, x0: number, x1: number, base: number, amp: number, seed: number): Pt[] {
  return Array.from({ length: n }, (_, i) => {
    const t = i / (n - 1)
    return [x0 + (x1 - x0) * t, base - amp * (0.15 + 0.6 * t + 0.25 * rand(seed + i))]
  })
}

function smoothPath(points: Pt[]) {
  return points.reduce((d, [x, y], i) => {
    if (i === 0) return `M${x},${y}`
    const [px, py] = points[i - 1]
    const cx = (px + x) / 2
    return `${d} C${cx},${py} ${cx},${y} ${x},${y}`
  }, '')
}

function areaPath(points: Pt[], base: number) {
  const first = points[0]
  const last = points[points.length - 1]
  return `${smoothPath(points)} L${last[0]},${base} L${first[0]},${base} Z`
}

function Gradients({ id, c }: ArtProps) {
  return (
    <>
      <linearGradient id={`${id}-line`} x1="0" x2="1">
        <stop offset="0" stopColor={c[0]} />
        <stop offset=".5" stopColor={c[1]} />
        <stop offset="1" stopColor={c[2]} />
      </linearGradient>
      <linearGradient id={`${id}-fill`} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor={c[0]} stopOpacity=".42" />
        <stop offset="1" stopColor={c[0]} stopOpacity="0" />
      </linearGradient>
      <filter id={`${id}-blur`} x="-50%" y="-50%" width="200%" height="200%">
        <feGaussianBlur stdDeviation="90" />
      </filter>
      <filter id={`${id}-shadow`} x="-20%" y="-20%" width="140%" height="160%">
        <feDropShadow dx="0" dy="28" stdDeviation="36" floodColor="#000" floodOpacity=".14" />
      </filter>
    </>
  )
}

function WindowDots({ x = 40, y = 38, fill = 'rgba(255,255,255,.22)' }) {
  return (
    <g fill={fill}>
      <circle cx={x} cy={y} r="9" />
      <circle cx={x + 30} cy={y} r="9" />
      <circle cx={x + 60} cy={y} r="9" />
    </g>
  )
}

// ---------- variants ----------

/** Code: [indent, [width, colour index]...] — index 3/4 are translucent whites. */
const CODE: [number, ...Pt[]][] = [
  [0, [110, 0], [220, 3]],
  [1, [90, 1], [160, 3], [120, 2]],
  [2, [140, 3], [200, 4]],
  [2, [70, 0], [260, 3]],
  [1, [40, 4]],
  [0, [0, 4]],
  [0, [130, 2], [180, 3]],
  [1, [100, 0], [90, 1], [150, 3]],
  [2, [240, 4]],
  [1, [40, 4]],
  [0, [180, 1], [120, 3]],
]

function HeroArt({ id, c }: ArtProps) {
  const colors = [c[0], c[1], c[2], 'rgba(255,255,255,.62)', 'rgba(255,255,255,.28)']
  const pts = series(9, 40, 480, 350, 170, 3)
  return (
    <>
      <defs>
        <Gradients id={id} c={c} />
      </defs>
      <rect width="1600" height="1000" fill="#06070b" />
      <g filter={`url(#${id}-blur)`} opacity=".85">
        <circle cx="330" cy="250" r="360" fill={c[0]} />
        <circle cx="1310" cy="260" r="380" fill={c[1]} />
        <circle cx="820" cy="930" r="420" fill={c[2]} />
      </g>

      <g transform="translate(170 170)">
        <rect width="790" height="580" rx="28" fill="rgba(12,12,16,.8)" stroke="rgba(255,255,255,.14)" strokeWidth="2" />
        <WindowDots />
        <rect y="76" width="790" height="2" fill="rgba(255,255,255,.07)" />
        {CODE.map(([indent, ...segments], line) => {
          let x = 56 + indent * 40
          return segments.map(([w, ci], s) => {
            const rect = (
              <rect key={`${line}-${s}`} x={x} y={118 + line * 38} width={w} height="14" rx="7" fill={colors[ci]} />
            )
            x += w + 16
            return rect
          })
        })}
      </g>

      <g transform="translate(900 380)">
        <rect width="520" height="400" rx="28" fill="rgba(255,255,255,.1)" stroke="rgba(255,255,255,.2)" strokeWidth="2" />
        <text x="40" y="72" fill="rgba(255,255,255,.62)" fontSize="26" fontWeight="500">
          Weekly active
        </text>
        <text x="40" y="136" fill="#fff" fontSize="60" fontWeight="700">
          1.2M
        </text>
        <path d={areaPath(pts, 370)} fill={`url(#${id}-fill)`} />
        <path d={smoothPath(pts)} fill="none" stroke={`url(#${id}-line)`} strokeWidth="6" strokeLinecap="round" />
      </g>

      <g transform="translate(1030 175)">
        <rect width="390" height="112" rx="28" fill="rgba(255,255,255,.14)" stroke="rgba(255,255,255,.22)" strokeWidth="2" />
        <circle cx="58" cy="56" r="30" fill={`url(#${id}-line)`} />
        <rect x="108" y="36" width="190" height="15" rx="7.5" fill="rgba(255,255,255,.9)" />
        <rect x="108" y="64" width="240" height="12" rx="6" fill="rgba(255,255,255,.45)" />
      </g>
    </>
  )
}

const NOTES = [
  { x: 330, y: 190, r: -5, ci: 0 },
  { x: 640, y: 270, r: 4, ci: 1 },
  { x: 950, y: 180, r: -2, ci: 2 },
  { x: 420, y: 540, r: 3, ci: 1 },
  { x: 1000, y: 520, r: -4, ci: 0 },
  { x: 720, y: 600, r: 2, ci: 2 },
]

const CURSORS = [
  { x: 1210, y: 330, ci: 0, name: 'Maya' },
  { x: 650, y: 500, ci: 2, name: 'Leo' },
  { x: 1150, y: 770, ci: 1, name: 'Ana' },
]

function BoardArt({ id, c }: ArtProps) {
  return (
    <>
      <defs>
        <Gradients id={id} c={c} />
        <pattern id={`${id}-dots`} width="34" height="34" patternUnits="userSpaceOnUse">
          <circle cx="17" cy="17" r="1.8" fill="rgba(255,255,255,.13)" />
        </pattern>
      </defs>
      <rect width="1600" height="1000" fill="#0d0e12" />
      <rect width="1600" height="1000" fill={`url(#${id}-dots)`} />
      <g filter={`url(#${id}-blur)`} opacity=".25">
        <circle cx="800" cy="500" r="380" fill={c[1]} />
      </g>

      <path
        d="M450 400 C 470 520, 520 560, 560 600"
        fill="none"
        stroke="rgba(255,255,255,.45)"
        strokeWidth="4"
        strokeDasharray="10 12"
        strokeLinecap="round"
      />
      <path
        d="M880 380 C 960 420, 1000 470, 1080 520"
        fill="none"
        stroke="rgba(255,255,255,.45)"
        strokeWidth="4"
        strokeDasharray="10 12"
        strokeLinecap="round"
      />

      {NOTES.map((n, i) => (
        <g key={i} transform={`translate(${n.x} ${n.y}) rotate(${n.r} 120 105)`}>
          <rect width="240" height="210" rx="20" fill={c[n.ci]} opacity=".94" />
          <rect x="28" y="40" width="170" height="16" rx="8" fill="rgba(0,0,0,.3)" />
          <rect x="28" y="74" width="140" height="16" rx="8" fill="rgba(0,0,0,.22)" />
          <rect x="28" y="108" width="100" height="16" rx="8" fill="rgba(0,0,0,.22)" />
        </g>
      ))}

      {/* selection around the third note */}
      <g transform="translate(930 160) rotate(-2 140 125)">
        <rect width="280" height="250" rx="24" fill="none" stroke="#fff" strokeWidth="3" strokeDasharray="12 10" />
        {[
          [0, 0],
          [280, 0],
          [0, 250],
          [280, 250],
        ].map(([x, y]) => (
          <rect key={`${x}-${y}`} x={x - 9} y={y - 9} width="18" height="18" rx="4" fill="#fff" />
        ))}
      </g>

      {CURSORS.map((cur) => (
        <g key={cur.name} transform={`translate(${cur.x} ${cur.y})`}>
          <path
            d="M0 0 L0 46 L12 35 L22 56 L32 52 L22 31 L38 31 Z"
            fill={c[cur.ci]}
            stroke="#fff"
            strokeWidth="2.5"
            strokeLinejoin="round"
          />
          <rect x="34" y="50" width={cur.name.length * 15 + 34} height="38" rx="19" fill={c[cur.ci]} />
          <text x="51" y="76" fill="#0d0e12" fontSize="22" fontWeight="600">
            {cur.name}
          </text>
        </g>
      ))}

      <g transform="translate(540 870)">
        <rect width="520" height="84" rx="42" fill="rgba(255,255,255,.08)" stroke="rgba(255,255,255,.14)" strokeWidth="2" />
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <circle
            key={i}
            cx={70 + i * 76}
            cy="42"
            r="18"
            fill={i === 1 ? `url(#${id}-line)` : 'rgba(255,255,255,.22)'}
          />
        ))}
      </g>
    </>
  )
}

function FinanceArt({ id, c }: ArtProps) {
  const pts = series(10, 340, 1380, 720, 330, 11)
  return (
    <>
      <defs>
        <Gradients id={id} c={c} />
        <linearGradient id={`${id}-bg`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#eefaf5" />
          <stop offset="1" stopColor="#f8fbff" />
        </linearGradient>
      </defs>
      <rect width="1600" height="1000" fill={`url(#${id}-bg)`} />
      <g filter={`url(#${id}-blur)`} opacity=".35">
        <circle cx="260" cy="160" r="300" fill={c[0]} />
        <circle cx="1400" cy="900" r="300" fill={c[1]} />
      </g>

      <g filter={`url(#${id}-shadow)`}>
        <rect x="150" y="130" width="1300" height="740" rx="38" fill="#fff" />
      </g>
      <path d="M150 168 a38 38 0 0 1 38 -38 H410 V870 H188 a38 38 0 0 1 -38 -38 Z" fill="#f5f7f6" />
      <WindowDots x={196} y={176} fill="rgba(0,0,0,.12)" />
      {[0, 1, 2, 3, 4].map((i) => (
        <g key={i}>
          {i === 1 && <rect x="174" y={232 + i * 64} width="212" height="48" rx="14" fill={c[0]} opacity=".18" />}
          <circle cx="206" cy={256 + i * 64} r="10" fill={i === 1 ? c[0] : 'rgba(0,0,0,.18)'} />
          <rect x="230" y={249 + i * 64} width={[110, 130, 90, 120, 80][i]} height="14" rx="7" fill="rgba(0,0,0,.14)" />
        </g>
      ))}

      <text x="470" y="236" fill="#6e6e73" fontSize="28" fontWeight="500">
        Balance
      </text>
      <text x="468" y="312" fill="#1d1d1f" fontSize="72" fontWeight="700">
        $48,210.32
      </text>
      <rect x="880" y="262" width="150" height="50" rx="25" fill={c[0]} opacity=".2" />
      <text x="905" y="296" fill="#0b7a55" fontSize="26" fontWeight="600">
        +12.4%
      </text>

      {[0, 1, 2, 3].map((i) => (
        <rect key={i} x="470" y={420 + i * 100} width="910" height="2" fill="rgba(0,0,0,.05)" />
      ))}
      <path d={areaPath(pts, 760)} fill={`url(#${id}-fill)`} />
      <path d={smoothPath(pts)} fill="none" stroke={c[0]} strokeWidth="7" strokeLinecap="round" />
      <circle cx={pts[7][0]} cy={pts[7][1]} r="14" fill="#fff" stroke={c[0]} strokeWidth="6" />

      {['Invoices', 'Expenses', 'Taxes'].map((label, i) => (
        <g key={label} transform={`translate(${470 + i * 230} 800)`}>
          <circle cx="12" cy="0" r="10" fill={c[i]} />
          <text x="34" y="9" fill="#424245" fontSize="26" fontWeight="500">
            {label}
          </text>
        </g>
      ))}
    </>
  )
}

function DashboardArt({ id, c }: ArtProps) {
  const panelW = 432
  const panelH = 364
  const col = (i: number) => 120 + i * (panelW + 32)
  const row = (i: number) => 120 + i * (panelH + 32)
  const spark = series(12, 40, panelW - 40, 300, 110, 21)
  const lines = [0, 1, 2].map((k) => series(14, 40, panelW * 2 + 32 - 40, 310 - k * 40, 170, 40 + k * 9))
  return (
    <>
      <defs>
        <Gradients id={id} c={c} />
        <linearGradient id={`${id}-bar`} x1="0" y1="1" x2="0" y2="0">
          <stop offset="0" stopColor={c[0]} />
          <stop offset="1" stopColor={c[1]} />
        </linearGradient>
      </defs>
      <rect width="1600" height="1000" fill="#09090c" />
      <g filter={`url(#${id}-blur)`} opacity=".22">
        <circle cx="400" cy="200" r="320" fill={c[0]} />
        <circle cx="1300" cy="820" r="320" fill={c[1]} />
      </g>

      {[
        [0, 0, 1],
        [1, 0, 1],
        [2, 0, 1],
        [0, 1, 2],
        [2, 1, 1],
      ].map(([x, y, span]) => (
        <rect
          key={`${x}-${y}`}
          x={col(x)}
          y={row(y)}
          width={panelW * span + 32 * (span - 1)}
          height={panelH}
          rx="26"
          fill="rgba(255,255,255,.05)"
          stroke="rgba(255,255,255,.1)"
          strokeWidth="2"
        />
      ))}

      <g transform={`translate(${col(0)} ${row(0)})`}>
        <text x="40" y="70" fill="rgba(255,255,255,.55)" fontSize="24" fontWeight="500">
          Events / sec
        </text>
        <text x="40" y="146" fill="#fff" fontSize="68" fontWeight="700">
          2.4M
        </text>
        <path d={smoothPath(spark)} fill="none" stroke={c[0]} strokeWidth="6" strokeLinecap="round" />
      </g>

      <g transform={`translate(${col(1)} ${row(0)})`}>
        <text x="40" y="70" fill="rgba(255,255,255,.55)" fontSize="24" fontWeight="500">
          Throughput
        </text>
        {Array.from({ length: 12 }, (_, i) => {
          const h = 60 + rand(i + 3) * 170
          return <rect key={i} x={40 + i * 30} y={316 - h} width="18" height={h} rx="9" fill={`url(#${id}-bar)`} />
        })}
      </g>

      <g transform={`translate(${col(2)} ${row(0)})`}>
        <circle cx={panelW / 2} cy="196" r="110" fill="none" stroke="rgba(255,255,255,.1)" strokeWidth="28" />
        <circle
          cx={panelW / 2}
          cy="196"
          r="110"
          fill="none"
          stroke={`url(#${id}-line)`}
          strokeWidth="28"
          strokeLinecap="round"
          strokeDasharray={`${2 * Math.PI * 110 * 0.78} 999`}
          transform={`rotate(-90 ${panelW / 2} 196)`}
        />
        <text x={panelW / 2} y="210" textAnchor="middle" fill="#fff" fontSize="44" fontWeight="700">
          99.98%
        </text>
      </g>

      <g transform={`translate(${col(0)} ${row(1)})`}>
        <text x="40" y="70" fill="rgba(255,255,255,.55)" fontSize="24" fontWeight="500">
          Latency by region
        </text>
        {[0, 1, 2, 3].map((i) => (
          <rect key={i} x="40" y={120 + i * 60} width={panelW * 2 - 48} height="1.5" fill="rgba(255,255,255,.07)" />
        ))}
        {lines.map((pts, k) => (
          <path key={k} d={smoothPath(pts)} fill="none" stroke={c[k]} strokeWidth="5" strokeLinecap="round" />
        ))}
      </g>

      <g transform={`translate(${col(2)} ${row(1)})`}>
        <text x="40" y="70" fill="rgba(255,255,255,.55)" fontSize="24" fontWeight="500">
          Services
        </text>
        {[0, 1, 2, 3, 4].map((i) => (
          <g key={i} transform={`translate(40 ${112 + i * 48})`}>
            <circle cx="10" cy="0" r="9" fill={i === 3 ? c[2] : i === 1 ? c[1] : '#34d399'} />
            <rect x="36" y="-7" width={120 + rand(i + 50) * 120} height="14" rx="7" fill="rgba(255,255,255,.2)" />
          </g>
        ))}
      </g>
    </>
  )
}

function EditorArt({ id, c }: ArtProps) {
  const widths = [820, 780, 840, 600, 0, 800, 760, 520]
  return (
    <>
      <defs>
        <Gradients id={id} c={c} />
      </defs>
      <rect width="1600" height="1000" fill="#f8f7fd" />
      <g filter={`url(#${id}-blur)`} opacity=".3">
        <circle cx="260" cy="220" r="320" fill={c[0]} />
        <circle cx="1380" cy="820" r="320" fill={c[2]} />
      </g>

      <g filter={`url(#${id}-shadow)`}>
        <rect x="290" y="100" width="1020" height="840" rx="34" fill="#fff" />
      </g>
      <WindowDots x={336} y={146} fill="rgba(0,0,0,.12)" />
      <text x="380" y="240" fill="#86868b" fontSize="26" fontWeight="500">
        Tuesday, October 21
      </text>
      <text x="378" y="306" fill="#1d1d1f" fontSize="54" fontWeight="700">
        Morning pages
      </text>

      {widths.map((w, i) =>
        w === 0 ? null : <rect key={i} x="380" y={370 + i * 46} width={w} height="16" rx="8" fill="#e6e6ec" />,
      )}
      {/* highlighted phrase */}
      <rect x="560" y={370 + 2 * 46 - 10} width="330" height="36" rx="10" fill={c[1]} opacity=".18" />
      <rect x="560" y={370 + 2 * 46 + 30} width="330" height="5" rx="2.5" fill={`url(#${id}-line)`} />

      <g transform="translate(800 560)" filter={`url(#${id}-shadow)`}>
        <rect width="560" height="290" rx="30" fill="#fff" stroke={`url(#${id}-line)`} strokeWidth="4" />
        <path
          d="M58 44 C 62 66, 70 74, 92 78 C 70 82, 62 90, 58 112 C 54 90, 46 82, 24 78 C 46 74, 54 66, 58 44 Z"
          fill={`url(#${id}-line)`}
        />
        <text x="112" y="88" fill={c[1]} fontSize="28" fontWeight="700">
          Ask Verse
        </text>
        <rect x="40" y="136" width="470" height="14" rx="7" fill="#e6e6ec" />
        <rect x="40" y="168" width="400" height="14" rx="7" fill="#e6e6ec" />
        <rect x="40" y="222" width="140" height="44" rx="22" fill={`url(#${id}-line)`} />
        <rect x="196" y="222" width="140" height="44" rx="22" fill="#f0f0f5" />
      </g>
    </>
  )
}

const ART: Record<ArtVariant, (props: ArtProps) => ReactNode> = {
  hero: HeroArt,
  board: BoardArt,
  finance: FinanceArt,
  dashboard: DashboardArt,
  editor: EditorArt,
}
