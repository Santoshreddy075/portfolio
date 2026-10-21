# Portfolio

Santosh Maryada's portfolio: a multi-page site in an Apple-inspired style, built with React, Vite, React Router and GSAP. Live at https://santoshreddy075.github.io/portfolio/.

## Pages

| Path | What's there |
|---|---|
| `/` | Hero, how I work, the forward-pass scene, selected work, a case study, highlights, credentials, experience, writing, contact |
| `/projects/:slug` | One page per project: hero, at a glance, the story (pinned laptop with zooming screens), highlights, next project |
| `/about` | Photo, story, journey timeline, experience |
| `/credentials` | Every certification as a wallet pass with a link to verify it |
| `/writing` | Posts, linking to the originals on LinkedIn |

## Make it yours

Everything the site says lives in **`src/content/profile.ts`**: hero text, section intros, projects (with their stories), credentials, posts, the About story, stats, the "Now" tile, experience and links. Edit that file, push, and the site redeploys.

- **Projects:** each project's `story` is the scroll story on its page. A step's `art` picks the generated screen (`vision`, `metrics`, `prompt`, `chain`, `player`, `hero`), and `focus: [x%, y%, scale]` zooms into it. Screens are drawn in `src/components/ProjectArt.tsx`.
- **Credentials:** `url` is the issuer's verify page and `post` is the LinkedIn announcement. `tint` colours the pass.
- **Photo:** `about.photo` is a file in `public/`.
- **GitHub tile:** it links to `githubUsername`'s profile. With `liveGithubRepos: true` it shows your latest public repos, fetched live. With `false` it shows your projects.
- **Email and résumé:** list your addresses in `emails` (the first one is the "Email me" button). Résumé buttons only appear when `resumeUrl` is set, e.g. `'resume.pdf'` in `public/`.

## Light and dark

The site follows the device's light/dark setting and switches live when it changes. There's no toggle. Colours are semantic tokens in `src/styles/tokens.css`, with a light set and a dark set under `prefers-color-scheme: dark`.

## Develop

```bash
npm install
npm run dev      # http://localhost:5173
npm test         # unit tests (Vitest)
npm run build    # production build into dist/
npm run preview  # serve the production build
```

## Deploy to GitHub Pages

Every push to `main` runs `.github/workflows/deploy.yml`, which tests, builds and publishes the site. Pages must be set to deploy from GitHub Actions (Settings → Pages → Source).

The site has real page URLs, so the build needs the path it's served from. The workflow sets `BASE_PATH=/<repo>/`. Locally it's `/`, and you can build for a subpath with `BASE_PATH=/portfolio/ npm run build`. The build also writes `dist/404.html`, so GitHub Pages serves the app for direct links to inner pages.

## How the motion works

Each section owns its animations in a `useGSAP` block, built on GSAP's `ScrollTrigger` and `SplitText`. All of them run inside `gsap.matchMedia()` with the conditions in `src/lib/gsap.ts`:

- **Desktop:** pinned, scroll-scrubbed sequences (hero, statement, forward pass, horizontal work gallery).
- **Phones:** lighter effects with no pinning. The work gallery becomes a native swipe carousel.
- **Reduced motion** (`prefers-reduced-motion: reduce`): no animation. Content appears in place, fully drawn.

Route changes play a curtain wipe (`PageTransition`) and scroll to the top, or to the section in the URL hash (`ScrollManager`).
