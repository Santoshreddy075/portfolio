# Portfolio redesign: richer, multi-page, evidence-backed

**Date:** 2026-10-21 · **Status:** approved and implemented

## Why

The single-page site looked polished but felt simple. Santosh wanted it to stay in the cinematic Apple style and become "visually stunning". He wasn't optimising for recruiters, and he wanted more depth and more evidence. Research (Brittany Chiang, Andrej Karpathy, Chip Huyen, Lee Robinson, Emil Kowalski, Rauno Freiberg) showed what strong portfolios share: proof behind every claim, a real photo, and writing. The site was missing all three.

## Decisions

- **Multi-page with React Router.** Home, four project pages (`/projects/:slug`), About, Credentials, Writing and a 404. The URLs are real, so the build takes `BASE_PATH` (set by the workflow) and writes `404.html` for GitHub Pages deep links.
- **The theme follows the system only.** Light by default, dark under `prefers-color-scheme: dark`, switching live. Santosh asked for no toggle. Every colour is a semantic token in `tokens.css`.
- **Signature scene: forward pass.** A product image flows through convolution and dense layers into a "Cereal · 0.95" prediction. It's pinned and scrubbed on desktop, scrubbed on phones, and drawn complete for reduced motion.
- **Evidence is real data:** 7 credentials (6 with issuer verify links, plus the AWS announcement post), 7 LinkedIn posts with exact dates, and the LinkedIn photo. Everything is sourced from Santosh's LinkedIn on 2026-10-21.
- **Project pages:** hero with a laptop reveal, at a glance, the summary as a word-reveal statement, a `StoryScroller` whose steps can zoom into the art (`focus`), highlights, links, and a "next project" hand-off.
- **Page transitions:** a curtain wipe on route changes. Only opacity is animated on the page itself, because a transformed ancestor would break pinned sections.
- **Content stays in one file.** `profile.ts` holds projects (with stories), credentials, posts and the About story.

## Testing

Vitest and Testing Library render every route through `MemoryRouter`. The tests cover project stories, highlights, links and next-project links, About content and photo, credential verify links, post links, home previews and navigation. The forward pass and story steps are also checked visually in both themes, at desktop and phone widths.
