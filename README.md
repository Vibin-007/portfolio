# Vibin D. — Cinematic Developer Portfolio

A production-ready, frontend-only personal portfolio for **Vibin D.**, an AI &
Data Science undergraduate at Rathinam College of Arts and Science.

Premium minimalist art direction, an interactive 3D character hero, GSAP +
ScrollTrigger cinematic scroll choreography, Lenis smooth scrolling, and a
fully responsive, accessible layout — no backend, no paid services.

---

## Tech stack

| Area        | Choice                                             |
| ----------- | -------------------------------------------------- |
| Framework   | React 19 + Vite + TypeScript                       |
| Styling     | Tailwind CSS v4 (`@tailwindcss/vite`)              |
| 3D          | three.js via `@react-three/fiber` + `@react-three/drei` |
| Animation   | GSAP + ScrollTrigger, `motion` (Framer Motion)     |
| Smooth scroll | Lenis                                            |
| Icons       | lucide-react (+ local brand marks)                 |

---

## Getting started

```bash
npm install
npm run dev        # http://localhost:5173
```

### Scripts

| Script              | Purpose                                  |
| ------------------- | ---------------------------------------- |
| `npm run dev`       | Vite dev server                          |
| `npm run build`     | `tsc` type-check + production build       |
| `npm run preview`   | Serve the production build                |
| `npm run typecheck` | `tsc --noEmit`                            |

---

## Project structure

```
public/
  models/     # optional rigged GLB (see README inside)
  images/     # (empty — no bundled photography)
  textures/   # (empty)
  fonts/      # (empty — fonts load from Google Fonts)
src/
  components/   # Navbar, Loader, Footer, SectionHeading, SplitText,
                # ProjectPanel, SmoothScroll, BrandIcons, mockups/
  sections/     # Hero, About, Skills, Projects, DataScience, Workshops,
                # Hackathon, Education, Contact
  scenes/       # HeroScene, Character, CameraRig, Lighting, FallbackCharacter,
                # ModelErrorBoundary, sceneConfig, characterConfig
  animations/   # gsap.ts, transitions.ts, heroTimeline.ts, scrollScenes.ts,
                # scrollState.ts
  data/         # projects.ts, skills.ts, education.ts, workshops.ts,
                # contact.ts, site.ts  (typed content)
  hooks/        # useReveal.ts
  lib/          # smoothScroll.ts
  styles/       # index.css (Tailwind theme + base + utilities)
```

**Content is fully separated from presentation** — edit the files in `src/data/`
to change any copy, and the UI updates automatically. Every data file is typed.

---

## Editing content

| What                    | File                        |
| ----------------------- | --------------------------- |
| Hero + about + identity | `src/data/site.ts`          |
| Projects                | `src/data/projects.ts`      |
| Skills                  | `src/data/skills.ts`        |
| Education               | `src/data/education.ts`     |
| Workshops + hackathon   | `src/data/workshops.ts`     |
| Contact details         | `src/data/contact.ts`       |

### Links policy

Project `liveUrl` / `githubUrl` and the hackathon `websiteUrl` / `codeUrl` are
**intentionally omitted** for this build because no public destinations are
confirmed. The UI renders a clear, **non-clickable** status label instead of
linking to `#`. Add a real URL to the data file and the corresponding button
appears automatically.

---

## The hero 3D character

The hero is a single WebGL canvas rendering a lit, shadowed studio scene with
camera choreography driven by scroll progress and a subtle desktop pointer
parallax.

**Default (no model configured):** a fully three-dimensional, procedurally
built stand-in figure (`src/scenes/FallbackCharacter.tsx`) performs a looping
tie-adjust gesture, idle breathing and a weight shift. It is a real animated
mesh — not an image.

**Opt-in rigged GLB:**

```bash
cp .env.example .env
# .env
VITE_CHARACTER_MODEL=/models/character.glb
VITE_CHARACTER_ROTATION=180   # optional
```

Place the licensed model in `public/models/`. The loader will then:

- load asynchronously with `useGLTF` inside `<Suspense>`
- normalise the model to ~1.8 units tall, feet at `y = 0`
- prefer an animation clip matching `/tie|adjust|suit|idle|loop/i`, else the
  first clip, looping it
- fall back to the procedural figure on **any** load/render error

See `public/models/README.md` for recommended (licence-verified) sources.

### Assets requiring manual replacement / licensing review

| Asset                          | Status                                                                 |
| ------------------------------ | ---------------------------------------------------------------------- |
| `public/models/character.glb`  | **Not bundled.** You must supply a licensed rigged model (optional).   |
| Project previews               | Original CSS/SVG mockups (no screenshots bundled).                     |
| Hackathon / team photography   | **Not bundled** — add only a properly licensed image.                  |
| Fonts — Inter, Instrument Serif| Google Fonts, SIL Open Font License.                                   |
| Icons — lucide-react           | ISC licence. GitHub/LinkedIn marks are hand-written inline SVG.        |

---

## Animation system

- **GSAP + ScrollTrigger** orchestrate reveals; **Lenis** smooth-scrolls.
- Lenis is driven by the GSAP ticker and updates ScrollTrigger on scroll, so
  the two never fight over position.
- `src/hooks/useReveal.ts` provides declarative reveals via data attributes:
  `data-reveal="words" | "up" | "stagger" | "clip"`.
- All GSAP work runs inside `gsap.context(...)` and is reverted on unmount — no
  duplicate ScrollTriggers under React Strict Mode.
- `prefers-reduced-motion` disables parallax, scrubbed scenes and entrance
  motion; all content remains visible and fully functional.
- A **Skip intro** control on the loader bypasses the intro sequencing.

## Performance

- Single WebGL canvas, capped DPR (`[1, 1.6]`), soft shadow maps.
- Continuous animation runs in `useFrame` via a shared non-reactive state object
  (`src/animations/scrollState.ts`) — no React re-renders per frame.
- Below-the-fold media is CSS/SVG only; vendor code is split into
  `three`, `gsap`, `motion` chunks.
- Scroll content is plain semantic DOM, so the page stays usable if WebGL or an
  animation dependency fails.

## Accessibility

- Semantic landmarks, single `h1`, ordered headings, keyboard-navigable nav.
- Focus-visible outlines, a skip-to-content link, `aria-current` on active nav.
- Mobile menu closes on selection and on `Escape`.
- Decorative 3D/mockups are `aria-hidden` or labelled `role="img"`.
- Real `mailto:` / `tel:` links and copy-to-clipboard with visible feedback.

---

## Deployment (Vercel)

The project builds to static files in `dist/` and needs no environment
variables unless you enable a 3D model.

**Option A — Git integration**
1. Push the repo to GitHub/GitLab.
2. In Vercel, **New Project → Import** the repo.
3. Framework preset **Vite**; build `npm run build`; output `dist`.
4. Deploy.

**Option B — Vercel CLI**
```bash
npm i -g vercel
vercel          # preview deployment
vercel --prod   # production deployment
```

`vercel.json` is included (SPA rewrite to `index.html`). If you enable a model,
add `VITE_CHARACTER_MODEL` in **Project → Settings → Environment Variables**.

> No deployment is claimed here — run one of the options above to publish.

---

## Verification results

- `npx tsc --noEmit` — **passes, no errors**
- `npm run build` — **passes** (tsc + Vite production build)
- Output chunks: `three` ≈ 265 kB gz, `motion` ≈ 49 kB gz, `gsap` ≈ 44 kB gz,
  app ≈ 92 kB gz, CSS ≈ 9.6 kB gz.

### Honest limitations

- The rigged GLB with a dedicated tie-adjust clip is **not bundled**; the
  shipped hero uses the procedural 3D figure. Drop in a licensed model to use a
  real rigged performance.
- No project live/GitHub URLs are fabricated; status labels are shown instead.
- The hackathon team image is omitted rather than replaced with an unlicensed
  photo.
