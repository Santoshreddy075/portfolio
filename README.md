# Portfolio

A one-page portfolio in an Apple-inspired style, built with React, Vite and GSAP.

## Make it yours

Everything the site says lives in **`src/content/profile.ts`**: your name, hero text, section intros, projects, case study, stats, the "Now" tile, experience and social links. Edit that file, push, and the site redeploys.

- **GitHub tile:** it links to `githubUsername`'s profile. With `liveGithubRepos: true` it shows your most recently pushed public repos, fetched live. With `false` it shows your `projects`.
- **Project visuals:** each project's `art` picks a generated screen (`vision`, `metrics`, `prompt`, `chain`, `player`, `hero`) and `palette` tints it. These live in `src/components/ProjectArt.tsx` if you want to draw your own.
- **Email and résumé:** list your addresses in `emails` (the first one is the "Email me" button) and set `resumeUrl`. Résumé buttons only appear when `resumeUrl` is set. To host a résumé PDF with the site, put it in `public/` and set `resumeUrl: './resume.pdf'`.

## Develop

```bash
npm install
npm run dev      # http://localhost:5173
npm test         # unit tests (Vitest)
npm run build    # production build into dist/
npm run preview  # serve the production build
```

## Deploy to GitHub Pages

1. Create a GitHub repository and push this project to its `main` branch.
2. In the repository, open **Settings → Pages** and set **Source** to **GitHub Actions**.
3. Every push to `main` runs `.github/workflows/deploy.yml`, which tests, builds and publishes the site at `https://<your-user>.github.io/<repo>/`.

The build uses relative asset paths (`base: './'` in `vite.config.ts`), so it works under any repository name or on a custom domain without changes.

## How the motion works

Each section owns its animations in a `useGSAP` block, built on GSAP's `ScrollTrigger` and `SplitText`. All of them run inside `gsap.matchMedia()` with the conditions in `src/lib/gsap.ts`:

- **Desktop:** pinned, scroll-scrubbed sequences (hero, statement, horizontal work gallery).
- **Phones:** lighter effects with no pinning. The work gallery becomes a native swipe carousel.
- **Reduced motion** (`prefers-reduced-motion: reduce`): no animation. Content appears in place.

The matching CSS uses the same media queries, so the static layout is always complete without JavaScript animation.
