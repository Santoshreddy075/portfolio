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

/** Lays out a row of pill labels left to right; width grows with the label. */
function layoutChips(labels: string[], x0: number, charWidth: number, padding: number, gap = 14) {
  return labels.reduce<{ label: string; x: number; w: number }[]>((row, label) => {
    const prev = row[row.length - 1]
    row.push({ label, x: prev ? prev.x + prev.w + gap : x0, w: label.length * charWidth + padding })
    return row
  }, [])
}

function hex(seed: number, length: number) {
  return Array.from({ length }, (_, i) => Math.floor(rand(seed * 31 + i) * 16).toString(16)).join('')
}

function Gradients({ id, c }: ArtProps) {
  return (
    <>
      <linearGradient id={`${id}-line`} x1="0" x2="1">
        <stop offset="0" stopColor={c[0]} />
        <stop offset=".5" stopColor={c[1]} />
        <stop offset="1" stopColor={c[2]} />
      </linearGradient>
      <linearGradient id={`${id}-diag`} x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stopColor={c[0]} />
        <stop offset=".55" stopColor={c[1]} />
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

function Glow({ id, blobs, opacity }: { id: string; blobs: [number, number, number, string][]; opacity: number }) {
  return (
    <g filter={`url(#${id}-blur)`} opacity={opacity}>
      {blobs.map(([cx, cy, r, fill]) => (
        <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r={r} fill={fill} />
      ))}
    </g>
  )
}

// ---------- hero: an ML workspace ----------

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
      <Glow
        id={id}
        opacity={0.85}
        blobs={[
          [330, 250, 360, c[0]],
          [1310, 260, 380, c[1]],
          [820, 930, 420, c[2]],
        ]}
      />

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
          Model accuracy
        </text>
        <text x="40" y="136" fill="#fff" fontSize="60" fontWeight="700">
          96%
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

// ---------- vision: zero-shot product recognition ----------

type ProductKind = 'bottle' | 'box' | 'fruit' | 'can' | 'carton' | 'jar'

const PRODUCTS: { kind: ProductKind; label: string; score: string; wrong?: boolean }[] = [
  { kind: 'bottle', label: 'Water', score: '0.98' },
  { kind: 'box', label: 'Cereal', score: '0.95' },
  { kind: 'fruit', label: 'Apple', score: '0.99' },
  { kind: 'can', label: 'Soda', score: '0.97' },
  { kind: 'carton', label: 'Milk', score: '0.93' },
  { kind: 'jar', label: 'Juice', score: '✕', wrong: true },
]

/** A product silhouette centred in a 300×300 tile. */
function Product({ kind, fill }: { kind: ProductKind; fill: string }) {
  const sheen = 'rgba(255,255,255,.28)'
  switch (kind) {
    case 'bottle':
      return (
        <g>
          <rect x="131" y="34" width="38" height="14" rx="4" fill={sheen} />
          <rect x="136" y="46" width="28" height="28" rx="6" fill={fill} />
          <rect x="110" y="70" width="80" height="150" rx="28" fill={fill} />
          <rect x="110" y="118" width="80" height="44" fill={sheen} />
        </g>
      )
    case 'box':
      return (
        <g>
          <rect x="98" y="48" width="104" height="172" rx="10" fill={fill} />
          <rect x="114" y="78" width="72" height="50" rx="8" fill={sheen} />
          <circle cx="150" cy="172" r="20" fill={sheen} />
        </g>
      )
    case 'fruit':
      return (
        <g>
          <rect x="147" y="64" width="6" height="26" rx="3" fill="rgba(255,255,255,.5)" />
          <ellipse cx="170" cy="76" rx="20" ry="9" fill="#34d399" transform="rotate(-28 170 76)" />
          <circle cx="150" cy="150" r="64" fill={fill} />
          <ellipse cx="126" cy="126" rx="16" ry="24" fill={sheen} transform="rotate(30 126 126)" />
        </g>
      )
    case 'can':
      return (
        <g>
          <rect x="106" y="58" width="88" height="164" rx="16" fill={fill} />
          <ellipse cx="150" cy="62" rx="44" ry="10" fill={sheen} />
          <rect x="106" y="122" width="88" height="38" fill={sheen} />
        </g>
      )
    case 'carton':
      return (
        <g>
          <path d="M104 92 L150 52 L196 92 V220 H104 Z" fill={fill} />
          <path d="M104 92 L150 52 L196 92 Z" fill={sheen} />
          <rect x="120" y="128" width="60" height="48" rx="8" fill={sheen} />
        </g>
      )
    case 'jar':
      return (
        <g>
          <rect x="114" y="54" width="72" height="28" rx="6" fill="rgba(255,255,255,.4)" />
          <rect x="102" y="78" width="96" height="142" rx="24" fill={fill} />
          <rect x="102" y="128" width="96" height="40" fill={sheen} />
        </g>
      )
  }
}

function Corners({ stroke }: { stroke: string }) {
  const L = 26
  return (
    <g fill="none" stroke={stroke} strokeWidth="5" strokeLinecap="round">
      <path d={`M78 ${28 + L} V28 H${78 + L}`} />
      <path d={`M${222 - L} 28 H222 V${28 + L}`} />
      <path d={`M78 ${232 - L} V232 H${78 + L}`} />
      <path d={`M${222 - L} 232 H222 V${232 - L}`} />
    </g>
  )
}

function VisionArt({ id, c }: ArtProps) {
  return (
    <>
      <defs>
        <Gradients id={id} c={c} />
      </defs>
      <rect width="1600" height="1000" fill="#0a0b10" />
      <Glow
        id={id}
        opacity={0.3}
        blobs={[
          [400, 300, 340, c[0]],
          [1250, 760, 340, c[2]],
        ]}
      />

      <text x="310" y="168" fill="rgba(255,255,255,.62)" fontSize="28" fontWeight="600">
        LLaVA · zero-shot
      </text>
      <rect x="1080" y="132" width="210" height="50" rx="25" fill={`url(#${id}-line)`} />
      <text x="1185" y="165" textAnchor="middle" fill="#0a0b10" fontSize="23" fontWeight="700">
        96% accuracy
      </text>

      {PRODUCTS.map((p, i) => {
        const x = 310 + (i % 3) * 340
        const y = 210 + Math.floor(i / 3) * 340
        const accent = p.wrong ? '#ff6b6b' : c[0]
        return (
          <g key={p.label} transform={`translate(${x} ${y})`}>
            <rect
              width="300"
              height="300"
              rx="28"
              fill="rgba(255,255,255,.06)"
              stroke={p.wrong ? 'rgba(255,107,107,.6)' : 'rgba(255,255,255,.12)'}
              strokeWidth="2"
            />
            <Product kind={p.kind} fill={c[i % 3]} />
            <Corners stroke={accent} />
            <rect x="24" y="244" width="252" height="40" rx="20" fill="rgba(255,255,255,.1)" />
            <text x="46" y="271" fill="#fff" fontSize="22" fontWeight="600">
              {p.label}
            </text>
            <text x="254" y="271" textAnchor="end" fill={accent} fontSize="22" fontWeight="700">
              {p.score}
            </text>
          </g>
        )
      })}
    </>
  )
}

// ---------- metrics: model evaluation dashboard ----------

function MetricsArt({ id, c }: ArtProps) {
  const cells: [number, number, number][] = [
    [0, 0, 0.9],
    [1, 0, 0.22],
    [0, 1, 0.3],
    [1, 1, 0.75],
  ]
  const scores: [string, number][] = [
    ['Precision', 250],
    ['Recall', 226],
    ['F1 score', 238],
    ['ROC AUC', 266],
  ]
  const train = Array.from({ length: 12 }, (_, i): Pt => {
    const t = i / 11
    return [t * 1190, 14 + 86 * (1 - t) ** 2 + 6 * rand(i + 70)]
  })
  const val = train.map(([x, y], i): Pt => [x, y + 10 + 8 * rand(i + 90) + (i / 11) * 8])
  return (
    <>
      <defs>
        <Gradients id={id} c={c} />
      </defs>
      <rect width="1600" height="1000" fill="#f5f7f9" />
      <Glow
        id={id}
        opacity={0.3}
        blobs={[
          [240, 160, 300, c[0]],
          [1400, 900, 300, c[1]],
        ]}
      />
      <g filter={`url(#${id}-shadow)`}>
        <rect x="140" y="110" width="1320" height="790" rx="36" fill="#fff" />
      </g>

      <text x="210" y="196" fill="#1d1d1f" fontSize="40" fontWeight="700">
        Model evaluation
      </text>
      <text x="210" y="238" fill="#6e6e73" fontSize="24" fontWeight="500">
        Census income · held-out test set
      </text>

      <g transform="translate(210 330)">
        <text y="-52" fill="#424245" fontSize="22" fontWeight="600">
          Confusion matrix
        </text>
        <text x="90" y="-14" textAnchor="middle" fill="#86868b" fontSize="19">
          ≤50K
        </text>
        <text x="282" y="-14" textAnchor="middle" fill="#86868b" fontSize="19">
          &gt;50K
        </text>
        {cells.map(([cx, cy, o]) => (
          <rect key={`${cx}-${cy}`} x={cx * 192} y={cy * 172} width="180" height="160" rx="16" fill={c[0]} opacity={o} />
        ))}
      </g>

      <g transform="translate(680 330)">
        <text y="-52" fill="#424245" fontSize="22" fontWeight="600">
          ROC curve
        </text>
        <path d="M0 0 V332 H340" fill="none" stroke="rgba(0,0,0,.14)" strokeWidth="2" />
        <path d="M0 332 L340 0" fill="none" stroke="rgba(0,0,0,.18)" strokeWidth="2" strokeDasharray="8 10" />
        <path d="M0 332 C 26 110, 110 34, 340 6 L340 332 Z" fill={`url(#${id}-fill)`} />
        <path
          d="M0 332 C 26 110, 110 34, 340 6"
          fill="none"
          stroke={`url(#${id}-line)`}
          strokeWidth="6"
          strokeLinecap="round"
        />
      </g>

      <g transform="translate(1100 330)">
        <text y="-52" fill="#424245" fontSize="22" fontWeight="600">
          Scores
        </text>
        {scores.map(([label, w], i) => (
          <g key={label} transform={`translate(0 ${i * 84})`}>
            <text y="6" fill="#424245" fontSize="21" fontWeight="500">
              {label}
            </text>
            <rect y="22" width="300" height="14" rx="7" fill="rgba(0,0,0,.06)" />
            <rect y="22" width={w} height="14" rx="7" fill={c[i % 3]} />
          </g>
        ))}
      </g>

      <g transform="translate(210 740)">
        <text y="-20" fill="#424245" fontSize="22" fontWeight="600">
          Training loss
        </text>
        <path d={smoothPath(train)} fill="none" stroke={c[0]} strokeWidth="5" strokeLinecap="round" />
        <path d={smoothPath(val)} fill="none" stroke={c[1]} strokeWidth="5" strokeLinecap="round" strokeDasharray="2 12" />
      </g>
    </>
  )
}

// ---------- prompt: a Colab notebook driving LLaVA ----------

const LABELS = ['Water', 'Cereal', 'Apple', 'Soda', 'Milk', 'Juice']

function PromptArt({ id, c }: ArtProps) {
  return (
    <>
      <defs>
        <Gradients id={id} c={c} />
      </defs>
      <rect width="1600" height="1000" fill="#f8f7fd" />
      <Glow
        id={id}
        opacity={0.3}
        blobs={[
          [260, 220, 320, c[0]],
          [1380, 820, 320, c[2]],
        ]}
      />

      <g filter={`url(#${id}-shadow)`}>
        <rect x="290" y="100" width="1020" height="840" rx="34" fill="#fff" />
      </g>
      <WindowDots x={336} y={146} fill="rgba(0,0,0,.12)" />
      <text className="mono" x="430" y="154" fill="#86868b" fontSize="22">
        prompt_design.ipynb
      </text>
      <text x="378" y="246" fill="#1d1d1f" fontSize="46" fontWeight="700">
        Classify each product
      </text>

      <rect x="360" y="286" width="880" height="232" rx="18" fill="#f3f3f8" />
      <circle cx="398" cy="326" r="17" fill={c[1]} />
      <path d="M392 317 L407 326 L392 335 Z" fill="#fff" />
      <text className="mono" fontSize="23">
        <tspan x="440" y="336" fill="#1d1d1f">
          prompt = (
        </tspan>
        <tspan x="476" y="376" fill={c[1]}>
          &quot;Which product is in this image? &quot;
        </tspan>
        <tspan x="476" y="416" fill={c[1]}>
          &quot;Answer with one label from the list.&quot;)
        </tspan>
        <tspan x="440" y="472" fill="#1d1d1f">
          answer = llava(image, prompt)
        </tspan>
      </text>

      <text x="380" y="584" fill="#86868b" fontSize="22" fontWeight="600">
        Output
      </text>
      {layoutChips(LABELS, 380, 14, 44).map(({ label, x, w }) => {
        const active = label === 'Cereal'
        return (
          <g key={label}>
            <rect x={x} y="604" width={w} height="44" rx="22" fill={active ? `url(#${id}-line)` : '#f0f0f5'} />
            <text
              x={x + w / 2}
              y="633"
              textAnchor="middle"
              fill={active ? '#fff' : '#424245'}
              fontSize="20"
              fontWeight="600"
            >
              {label}
            </text>
          </g>
        )
      })}

      {[0, 1, 2].map((i) => (
        <g key={i} transform={`translate(380 ${706 + i * 50})`}>
          <circle cx="12" cy="0" r="12" fill={c[0]} opacity=".9" />
          <path d="M6 0 L10.5 4.5 L18 -4" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" />
          <rect x="40" y="-7" width={[340, 280, 380][i]} height="14" rx="7" fill="#e6e6ec" />
        </g>
      ))}

      <g transform="translate(860 640)" filter={`url(#${id}-shadow)`}>
        <rect width="480" height="250" rx="30" fill="#fff" stroke={`url(#${id}-line)`} strokeWidth="4" />
        <path
          d="M58 40 C 62 62, 70 70, 92 74 C 70 78, 62 86, 58 108 C 54 86, 46 78, 24 74 C 46 70, 54 62, 58 40 Z"
          fill={`url(#${id}-line)`}
        />
        <text x="112" y="86" fill={c[1]} fontSize="28" fontWeight="700">
          LLaVA
        </text>
        <rect x="40" y="128" width="390" height="14" rx="7" fill="#e6e6ec" />
        <rect x="40" y="158" width="300" height="14" rx="7" fill="#e6e6ec" />
        <rect x="40" y="192" width="130" height="40" rx="20" fill={`url(#${id}-line)`} />
        <text x="105" y="219" textAnchor="middle" fill="#fff" fontSize="18" fontWeight="600">
          Check
        </text>
      </g>
    </>
  )
}

// ---------- chain: three-layer blockchain for academic records ----------

const LAYERS = [
  { name: 'Authentication · smart contracts', icon: 'lock' },
  { name: 'Access control', icon: 'shield' },
  { name: 'Data storage', icon: 'store' },
] as const

function LayerIcon({ icon, color }: { icon: (typeof LAYERS)[number]['icon']; color: string }) {
  if (icon === 'lock')
    return (
      <g>
        <path d="M5 14 V8 a8 8 0 0 1 16 0 V14" fill="none" stroke={color} strokeWidth="4" />
        <rect x="0" y="13" width="26" height="20" rx="4" fill={color} />
      </g>
    )
  if (icon === 'shield') return <path d="M13 0 L26 5 V15 C26 24 20 30 13 33 C6 30 0 24 0 15 V5 Z" fill={color} />
  return (
    <g fill={color}>
      <ellipse cx="13" cy="5" rx="13" ry="5" />
      <path d="M0 5 V27 C0 30 6 32 13 32 C20 32 26 30 26 27 V5 C26 8 20 10 13 10 C6 10 0 8 0 5 Z" opacity=".75" />
    </g>
  )
}

function ChainArt({ id, c }: ArtProps) {
  const xs = [330, 600, 870, 1140]
  const ys = [200, 450, 700]
  return (
    <>
      <defs>
        <Gradients id={id} c={c} />
      </defs>
      <rect width="1600" height="1000" fill="#07080d" />
      <Glow
        id={id}
        opacity={0.28}
        blobs={[
          [500, 240, 320, c[0]],
          [1200, 800, 320, c[1]],
        ]}
      />

      {[430, 1240].map((x) =>
        ys.slice(0, -1).map((y) => (
          <path
            key={`${x}-${y}`}
            d={`M${x} ${y + 130} V${y + 210}`}
            stroke="rgba(255,255,255,.25)"
            strokeWidth="3"
            strokeDasharray="8 10"
          />
        )),
      )}

      {LAYERS.map((layer, row) => {
        const y = ys[row]
        const color = c[row]
        return (
          <g key={layer.name}>
            <text x="835" y={y - 26} textAnchor="middle" fill="rgba(255,255,255,.62)" fontSize="24" fontWeight="600">
              {layer.name}
            </text>
            {xs.slice(0, -1).map((x) => (
              <g key={x}>
                <path d={`M${x + 200} ${y + 65} H${x + 270}`} stroke={color} strokeWidth="4" />
                <circle cx={x + 200} cy={y + 65} r="6" fill={color} />
                <circle cx={x + 270} cy={y + 65} r="6" fill={color} />
              </g>
            ))}
            {xs.map((x, i) => {
              const n = row * 4 + i
              return (
                <g key={x} transform={`translate(${x} ${y})`}>
                  <rect width="200" height="130" rx="18" fill="rgba(255,255,255,.06)" stroke="rgba(255,255,255,.14)" strokeWidth="2" />
                  <rect x="18" y="0" width="164" height="6" rx="3" fill={color} />
                  <text x="22" y="54" fill="#fff" fontSize="24" fontWeight="700">
                    #{1040 + n}
                  </text>
                  <text className="mono" x="22" y="92" fill="rgba(255,255,255,.5)" fontSize="19">
                    0x{hex(n, 4)}…{hex(n + 50, 3)}
                  </text>
                  <g transform="translate(152 28)">
                    <LayerIcon icon={layer.icon} color={color} />
                  </g>
                </g>
              )
            })}
          </g>
        )
      })}
    </>
  )
}

// ---------- player: mood-based music recommendations ----------

const MOODS = ['Happy', 'Relaxed', 'Energetic']

function PlayerArt({ id, c }: ArtProps) {
  return (
    <>
      <defs>
        <Gradients id={id} c={c} />
      </defs>
      <rect width="1600" height="1000" fill="#0b0a12" />
      <Glow
        id={id}
        opacity={0.55}
        blobs={[
          [300, 200, 340, c[0]],
          [1320, 860, 340, c[2]],
        ]}
      />
      <rect x="200" y="140" width="1200" height="720" rx="36" fill="rgba(14,14,20,.84)" stroke="rgba(255,255,255,.12)" strokeWidth="2" />

      <g transform="translate(270 210)">
        <rect width="380" height="380" rx="28" fill={`url(#${id}-diag)`} />
        {[150, 110, 70].map((r) => (
          <circle key={r} cx="190" cy="190" r={r} fill="none" stroke="rgba(255,255,255,.28)" strokeWidth="2" />
        ))}
        <circle cx="190" cy="190" r="22" fill="rgba(0,0,0,.35)" />
      </g>
      <text x="270" y="652" fill="#fff" fontSize="34" fontWeight="700">
        Morning Drive
      </text>
      <text x="270" y="692" fill="rgba(255,255,255,.55)" fontSize="24" fontWeight="500">
        Happy · picked for your mood
      </text>
      <rect x="270" y="724" width="380" height="8" rx="4" fill="rgba(255,255,255,.15)" />
      <rect x="270" y="724" width="230" height="8" rx="4" fill={`url(#${id}-line)`} />
      <circle cx="500" cy="728" r="10" fill="#fff" />
      <g transform="translate(460 792)">
        <circle cx="-86" cy="0" r="24" fill="rgba(255,255,255,.12)" />
        <path d="M-80 -9 L-94 0 L-80 9 Z" fill="#fff" />
        <circle r="36" fill="#fff" />
        <path d="M-9 -14 L15 0 L-9 14 Z" fill="#0b0a12" />
        <circle cx="86" cy="0" r="24" fill="rgba(255,255,255,.12)" />
        <path d="M80 -9 L94 0 L80 9 Z" fill="#fff" />
      </g>

      <g transform="translate(730 220)">
        <text y="30" fill="#fff" fontSize="32" fontWeight="700">
          Recommended for your mood
        </text>
        {layoutChips(MOODS, 0, 15, 48).map(({ label: mood, x, w }, i) => {
          return (
            <g key={mood}>
              <rect x={x} y="62" width={w} height="46" rx="23" fill={i === 0 ? `url(#${id}-line)` : 'rgba(255,255,255,.1)'} />
              <text
                x={x + w / 2}
                y="92"
                textAnchor="middle"
                fill={i === 0 ? '#0b0a12' : '#fff'}
                fontSize="21"
                fontWeight="600"
              >
                {mood}
              </text>
            </g>
          )
        })}
        {[0, 1, 2, 3, 4].map((i) => {
          const y = 150 + i * 92
          return (
            <g key={i}>
              {i === 0 && <rect x="-14" y={y} width="628" height="76" rx="16" fill="rgba(255,255,255,.08)" />}
              <text x="10" y={y + 46} fill="rgba(255,255,255,.45)" fontSize="22" fontWeight="600">
                {i + 1}
              </text>
              <rect x="56" y={y + 22} width={[230, 190, 250, 210, 170][i]} height="14" rx="7" fill="rgba(255,255,255,.82)" />
              <rect x="56" y={y + 48} width="130" height="10" rx="5" fill="rgba(255,255,255,.32)" />
              {i === 0 ? (
                Array.from({ length: 9 }, (_, b) => {
                  const h = 12 + rand(b + 7) * 34
                  return <rect key={b} x={470 + b * 14} y={y + 38 - h / 2} width="7" height={h} rx="3.5" fill={c[0]} />
                })
              ) : (
                <text x="600" y={y + 46} textAnchor="end" fill="rgba(255,255,255,.45)" fontSize="20">
                  {`${2 + (i % 3)}:${String(10 + Math.floor(rand(i + 30) * 49)).padStart(2, '0')}`}
                </text>
              )}
            </g>
          )
        })}
      </g>
    </>
  )
}

const ART: Record<ArtVariant, (props: ArtProps) => ReactNode> = {
  hero: HeroArt,
  vision: VisionArt,
  metrics: MetricsArt,
  prompt: PromptArt,
  chain: ChainArt,
  player: PlayerArt,
}
