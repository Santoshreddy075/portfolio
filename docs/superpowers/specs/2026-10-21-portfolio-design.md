# Apple-style personal portfolio (React + GSAP, GitHub Pages)

## Context

You asked whether I can build Apple-style websites and chose a **personal portfolio**. You left the content to me, with one requirement: it must be *visually stunning and professional*. You want it hosted on **GitHub**. You lean toward **GSAP**, but because "my life isn't static," you asked for a mix: React for content that changes often, GSAP for Apple's cinematic scroll effects.

`/Users/santoshreddy/repo` is empty and isn't a git repo yet, so this is a new project. Node 24 and npm 11 are installed.

**What I'll deliver:** a one-page portfolio with Apple-style design: big tight headlines, generous white space, alternating black and off-white sections, frosted nav, and pinned scroll effects scrubbed to the scrollbar. All content lives in **one file** you edit, and every push to GitHub redeploys the site automatically.

**Assumptions** (all easy to change later):
- The content is a believable but fictional persona: a product-minded software engineer with 4 projects. You swap in your own details in `src/content/profile.ts`.
- I copy Apple's design language only: no Apple logo, trademarks or product photos. Fonts use the system stack, so Apple devices render SF Pro natively and everything else falls back to Inter. Device mockups are drawn in CSS/SVG, and project "screens" are generated gradient art, so there are no external image assets.
- There's no theme toggle. The look comes from alternating light and dark sections, the way Apple's own product pages do it.

## Stack

- **Vite + React + TypeScript**, using `npm create vite@latest` with the react-ts template.
- **GSAP** with the `ScrollTrigger` and `SplitText` plugins, which are free since GSAP 3.13. I'll use `@gsap/react`'s `useGSAP()` hook so every animation is scoped to its component and cleaned up when the component unmounts.
- **Plain CSS with design tokens**, using custom properties in `tokens.css`. No Tailwind, which keeps typography and spacing fully under control.
- **`@fontsource-variable/inter`** as the fallback font after `-apple-system, BlinkMacSystemFont`.
- **Vitest + React Testing Library** for tests.
- **No router.** It's one page with anchor links, which avoids the 404 problem GitHub Pages has with client-side routes. `vite.config.ts` uses `base: './'`, so the build works under any repo name.

## Page design (top to bottom)

| # | Section | Apple reference | Effect (GSAP) |
|---|---------|-----------------|---------------|
| 1 | **Nav**: name plus Work / About / Contact | apple.com global nav | Frosted glass (`backdrop-filter`), hides on scroll down and returns on scroll up |
| 2 | **Hero** (dark): giant headline, one-line subtitle, gradient accent word | iPhone Pro hero | `SplitText` lines rise and un-blur on load; on scroll the hero scales to 0.9, fades, and a laptop mockup rises into view (scrubbed) |
| 3 | **Statement** (dark): one large paragraph about how you work | AirPods Pro text-highlight sections | Pinned; each word brightens from gray to white as you scroll (scrubbed) |
| 4 | **Selected Work** (light): 4 large project cards | "Get to know iPhone" carousel | Section pins and cards scroll **horizontally** (`containerAnimation`), with parallax on each card's art; below 768px, cards stack vertically instead |
| 5 | **Featured case study** (dark): problem, approach, result | Feature walkthroughs on MacBook pages | Sticky device frame on one side, 3 text steps scroll past on the other, and the screen crossfades with each step |
| 6 | **Highlights bento** (light): stats, tech stack, **Now** tile, **Latest on GitHub** tile | Bento grids on Apple's product pages | Tiles fade up in a stagger; stat numbers count up |
| 7 | **Experience** (light): timeline of roles | — | The vertical line draws itself as you scroll (`scaleY`, scrubbed) |
| 8 | **Contact** (dark): huge "Let's build something." plus email button and social links | Closing call to action on product pages | A gradient spotlight follows the cursor across the headline |
| 9 | **Footer**: small gray text | apple.com footer | — |

**Handling content that changes often:**
- Projects, roles, stats, the **Now** tile (what you're building, reading or learning, and where you are) and social links are all plain data in `profile.ts`. To update the site you edit that one file and push.
- The **Latest on GitHub** tile reads `githubUsername` from `profile.ts` and fetches your public repos live from the GitHub API, which needs no token. If the username is unset or the fetch fails, it shows the projects from `profile.ts` instead, so the tile always shows something.

**Motion rules:**
- All scroll effects run inside `gsap.matchMedia()`.
- With `prefers-reduced-motion: reduce`, nothing pins or scrubs. Content just appears in place.
- Mobile gets a lighter set of effects: no horizontal pinning.
- Native scrolling stays as is, with no smooth-scroll takeover, the same as on Apple's site.

## File layout

```
repo/
  index.html
  package.json
  vite.config.ts                 # base: './'
  .github/workflows/deploy.yml   # build → actions/upload-pages-artifact → actions/deploy-pages
  public/favicon.svg
  src/
    main.tsx, App.tsx
    content/profile.ts           # ← the ONE file you edit
    styles/tokens.css, global.css
    lib/gsap.ts                  # registers plugins once, exports gsap/ScrollTrigger/SplitText/useGSAP
    hooks/useGithubRepos.ts      # fetch + fallback
    components/
      Nav.tsx  Hero.tsx  Statement.tsx  WorkGallery.tsx  FeaturedProject.tsx
      Bento.tsx  Experience.tsx  Contact.tsx  Footer.tsx
      DeviceFrame.tsx            # CSS laptop / phone mockup
      ProjectArt.tsx             # generated SVG gradient "screens"
    __tests__/
  README.md                      # how to edit content + deploy
```

Each component keeps its own markup, its `useGSAP` block and a co-located `*.css` file, so changing one section never touches another.

## Implementation steps

1. Scaffold the Vite react-ts app into `repo/`, add gsap, @gsap/react, @fontsource-variable/inter, vitest and @testing-library/react, and run `git init`.
2. Add the design tokens (type scale, colors, spacing, easing) and global styles, plus `lib/gsap.ts`.
3. Write `profile.ts` with the full persona content and a typed schema.
4. Tests first, following TDD: every project, role and stat in `profile.ts` renders, and `useGithubRepos` falls back when the fetch fails or the username is unset.
5. Build the sections in page order, adding each one's GSAP timeline as it's built.
6. Add the reduced-motion and mobile versions through `gsap.matchMedia()`.
7. Add the GitHub Pages workflow and the README: edit content, push, and enable Pages with Settings → Pages → Source: GitHub Actions.
8. Save this design to `docs/superpowers/specs/2026-10-21-portfolio-design.md` in the repo.

I won't commit or push unless you ask. Creating the GitHub repo and enabling Pages stays with you, and the README explains how.

## Verification

- Run `npm run test`: all tests pass.
- Run `npm run build`: no TypeScript or build errors, and the main JS bundle is under about 200 KB gzipped.
- Run `npm run preview` and open the site in the built-in browser pane:
  - Check at **1440px, 768px and 375px**: no horizontal page scroll, and the text stays readable.
  - Scroll through every section and screenshot each effect: hero scale-down, word brightening, horizontal work gallery, sticky case study, bento count-up, timeline drawing.
  - The console shows no errors or GSAP warnings.
  - With `githubUsername` set to a real public account, the GitHub tile fills with repos; with it unset, it shows the fallback projects.
- For reduced motion, force the `prefers-reduced-motion: reduce` media query in the page through the pane's JS console and confirm nothing pins or scrubs.
- Check that the built `dist/` loads from a subpath, so the GitHub Pages project URL works.
