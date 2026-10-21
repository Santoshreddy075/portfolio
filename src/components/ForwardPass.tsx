import { useRef } from 'react'
import { MEDIA, gsap, useGSAP } from '../lib/gsap'
import './ForwardPass.css'

const CY = 280
const STACKS = [
  { x: 260, size: 150, cells: 5 },
  { x: 440, size: 116, cells: 4 },
  { x: 590, size: 84, cells: 3 },
]
const STACK_GAP_IN = [200, 410, 556] // right edge of the previous stage
const DENSE = [730, 850]
const OUT_X = 960

const CLASSES = [
  { label: 'Water', p: 0.02 },
  { label: 'Cereal', p: 0.95 },
  { label: 'Apple', p: 0.01 },
  { label: 'Soda', p: 0.02 },
]

const STEPS = [
  { title: 'Pixels in', body: 'The photo arrives as a grid of numbers.' },
  { title: 'Features emerge', body: 'Convolutions pick out edges, shapes and textures.' },
  { title: 'A confident answer', body: 'Dense layers weigh the evidence and choose a label.' },
]

function rand(i: number) {
  const x = Math.sin(i * 12.9898) * 43758.5453
  return x - Math.floor(x)
}

function ys(n: number, gap = 52) {
  const start = CY - ((n - 1) * gap) / 2
  return Array.from({ length: n }, (_, i) => start + i * gap)
}

const L1 = ys(6)
const L2 = ys(6)
const OUT = ys(4, 56)

/**
 * A product photo takes a forward pass through a small neural network. The SVG is
 * drawn fully lit, so with reduced motion it's a complete static diagram; with
 * motion, the timeline plays it forward as you scroll.
 */
export function ForwardPass() {
  const root = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add({ desktop: MEDIA.desktopMotion, mobile: MEDIA.mobileMotion }, (ctx) => {
        const { desktop } = ctx.conditions!
        gsap.set('.fp-step', { opacity: 0.3 })
        const tl = gsap.timeline({
          defaults: { ease: 'none' },
          scrollTrigger: desktop
            ? { trigger: root.current, start: 'top top', end: '+=220%', scrub: 1, pin: true }
            : { trigger: '.fp-stage', start: 'top 75%', end: 'bottom 40%', scrub: 1 },
        })
        tl.to('.fp-step-0', { opacity: 1, duration: 0.2 }, 0)
          .fromTo('.fp-scan', { attr: { y: 182 }, opacity: 0.9 }, { attr: { y: 372 }, opacity: 0, duration: 1 }, 0)
          .addLabel('maps')
          .to('.fp-step-1', { opacity: 1, duration: 0.2 }, 'maps')
        STACKS.forEach((_, i) => {
          tl.from(`.fp-connector-${i}`, { strokeDashoffset: 1, duration: 0.35 }).from(
            `.fp-stack-${i} .fp-cell`,
            { opacity: 0, stagger: { each: 0.02, from: 'random' }, duration: 0.3 },
            '<0.15',
          )
        })
        tl.addLabel('dense')
          .to('.fp-step-2', { opacity: 1, duration: 0.2 }, 'dense')
          .from('.fp-e1', { strokeDashoffset: 1, stagger: 0.03, duration: 0.5 }, 'dense')
          .from('.fp-l1 .fp-node-lit', { opacity: 0, stagger: 0.05, duration: 0.3 }, '<0.2')
          .from('.fp-e2', { strokeDashoffset: 1, stagger: 0.008, duration: 0.6 })
          .from('.fp-l2 .fp-node-lit', { opacity: 0, stagger: 0.05, duration: 0.3 }, '<0.2')
          .from('.fp-e3', { strokeDashoffset: 1, stagger: 0.012, duration: 0.5 })
          .from('.fp-out .fp-node-lit', { opacity: 0, stagger: 0.05, duration: 0.3 }, '<0.2')
          .from('.fp-bar', { scaleX: 0, transformOrigin: '0% 50%', stagger: 0.06, duration: 0.6 })
          .from('.fp-result', { opacity: 0, y: 14, duration: 0.4 })
      })
    },
    { scope: root },
  )

  return (
    <section className="section section--alt fp" ref={root} aria-labelledby="fp-title">
      <div className="container">
        <header className="section-head fp__head">
          <p className="eyebrow">Under the hood</p>
          <h2 id="fp-title" className="display">
            Watch a model think.
          </h2>
          <p className="lead">A product photo takes a forward pass through a neural network — pixels in, features out, and finally a confident answer.</p>
        </header>

        <div className="fp-stage">
          <svg className="fp-svg" viewBox="0 0 1000 540" role="img" aria-label="Diagram of an image passing through a neural network">
            <defs>
              <linearGradient id="fp-grad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0" stopColor="#4facfe" />
                <stop offset=".5" stopColor="#a78bfa" />
                <stop offset="1" stopColor="#f472b6" />
              </linearGradient>
              <clipPath id="fp-tile-clip">
                <rect x="20" y="180" width="180" height="200" rx="22" />
              </clipPath>
            </defs>

            {/* input photo */}
            <g>
              <rect className="fp-tile" x="20" y="180" width="180" height="200" rx="22" />
              <g clipPath="url(#fp-tile-clip)">
                <rect x="66" y="208" width="88" height="148" rx="9" fill="#a78bfa" />
                <rect x="80" y="232" width="60" height="42" rx="7" fill="rgba(255,255,255,.45)" />
                <circle cx="110" cy="312" r="17" fill="rgba(255,255,255,.35)" />
                {Array.from({ length: 8 }, (_, i) => (
                  <path key={`v${i}`} className="fp-grid" d={`M${20 + (i + 1) * 20} 180 V380`} />
                ))}
                {Array.from({ length: 9 }, (_, i) => (
                  <path key={`h${i}`} className="fp-grid" d={`M20 ${180 + (i + 1) * 20} H200`} />
                ))}
                <rect className="fp-scan" x="20" y="182" width="180" height="6" fill="url(#fp-grad)" opacity="0" />
              </g>
            </g>

            {/* convolution feature maps */}
            {STACKS.map((s, i) => {
              const y = CY - s.size / 2
              const cell = s.size / s.cells
              return (
                <g key={s.x}>
                  <path
                    className={`fp-connector fp-connector-${i}`}
                    pathLength={1}
                    d={`M${STACK_GAP_IN[i] + 6} ${CY} H${s.x - 6}`}
                  />
                  <g className={`fp-stack-${i}`}>
                    {[3, 2, 1].map((d) => (
                      <rect
                        key={d}
                        className="fp-map-back"
                        x={s.x + d * 9}
                        y={y - d * 9}
                        width={s.size}
                        height={s.size}
                        rx="10"
                      />
                    ))}
                    <rect className="fp-map-front" x={s.x} y={y} width={s.size} height={s.size} rx="10" />
                    {Array.from({ length: s.cells * s.cells }, (_, c) => (
                      <rect
                        key={c}
                        className="fp-cell"
                        x={s.x + (c % s.cells) * cell + 3}
                        y={y + Math.floor(c / s.cells) * cell + 3}
                        width={cell - 6}
                        height={cell - 6}
                        rx="4"
                        fill={['#4facfe', '#a78bfa', '#f472b6'][(c + i) % 3]}
                        opacity={(0.15 + rand(c * 7 + i * 31) * 0.75).toFixed(2)}
                      />
                    ))}
                  </g>
                </g>
              )
            })}

            {/* fully connected layers */}
            {L1.map((y) => (
              <path key={`e1-${y}`} className="fp-edge fp-e1" pathLength={1} d={`M680 ${CY} L${DENSE[0]} ${y}`} />
            ))}
            {L1.flatMap((y1) =>
              L2.map((y2) => (
                <path key={`e2-${y1}-${y2}`} className="fp-edge fp-e2" pathLength={1} d={`M${DENSE[0]} ${y1} L${DENSE[1]} ${y2}`} />
              )),
            )}
            {L2.flatMap((y1) =>
              OUT.map((y2) => (
                <path key={`e3-${y1}-${y2}`} className="fp-edge fp-e3" pathLength={1} d={`M${DENSE[1]} ${y1} L${OUT_X} ${y2}`} />
              )),
            )}
            {[
              { cls: 'fp-l1', x: DENSE[0], ys: L1 },
              { cls: 'fp-l2', x: DENSE[1], ys: L2 },
              { cls: 'fp-out', x: OUT_X, ys: OUT },
            ].map((layer) => (
              <g key={layer.cls} className={layer.cls}>
                {layer.ys.map((y, i) => (
                  <g key={y}>
                    <circle className="fp-node" cx={layer.x} cy={y} r="13" />
                    <circle
                      className="fp-node-lit"
                      cx={layer.x}
                      cy={y}
                      r="13"
                      opacity={layer.cls === 'fp-out' ? (i === 1 ? 1 : 0.25) : (0.45 + rand(y + layer.x) * 0.55).toFixed(2)}
                    />
                  </g>
                ))}
              </g>
            ))}

            <g className="fp-label">
              <text x="110" y="472" textAnchor="middle">
                Input
              </text>
              <text x="440" y="472" textAnchor="middle">
                Convolutions
              </text>
              <text x="790" y="472" textAnchor="middle">
                Dense layers
              </text>
              <text x="960" y="472" textAnchor="middle">
                Output
              </text>
            </g>
          </svg>

          <div className="fp-card">
            <p className="fp-card__title">Prediction</p>
            <ul className="fp-card__list">
              {CLASSES.map((c) => (
                <li key={c.label} className={c.p > 0.5 ? 'is-top' : undefined}>
                  <span className="fp-card__label">{c.label}</span>
                  <span className="fp-track">
                    <span className="fp-bar" style={{ width: `${Math.max(c.p * 100, 3)}%` }} />
                  </span>
                  <span className="fp-card__p mono">{c.p.toFixed(2)}</span>
                </li>
              ))}
            </ul>
            <p className="fp-result">
              <span className="gradient-text">Cereal · 0.95</span>
            </p>
          </div>
        </div>

        <ol className="fp-steps">
          {STEPS.map((step, i) => (
            <li key={step.title} className={`fp-step fp-step-${i}`}>
              <span className="fp-step__n">{String(i + 1).padStart(2, '0')}</span>
              <h3 className="fp-step__title">{step.title}</h3>
              <p className="fp-step__body">{step.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
