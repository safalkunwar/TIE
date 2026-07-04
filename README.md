# TIE Nepal to provide  Study-Abroad Experience

A cinematic website for **Target International Education (TIE Nepal)**, Pokhara — built from the ground up with Next.js, React Three Fiber, GSAP and Tailwind CSS.

## Quick start

## Tech stack

- **Next.js 14** (App Router) + **React 18** + **TypeScript**
- **Tailwind CSS** — utility-first styling
- **React Three Fiber** + **drei** — interactive 3D globe
- **GSAP** + **ScrollTrigger** — scroll storytelling & animations
- **Lenis** — smooth scrolling, bridged to GSAP ticker
- **Google Fonts** via `next/font` (Sora + Inter)

## Accessibility

- `prefers-reduced-motion` fully respected — Lenis disabled, auto-rotate paused, animations collapse to fades, globe falls back to CSS version
- WCAG AA contrast ratios
- Skip-to-content link
- Keyboard-navigable carousel & globe pins (focusable buttons)
- ARIA labels on icon controls
- Semantic HTML (`<main>`, `<section>`, `<article>`, `<nav>`, `<footer>`)

## SEO

- Per-page metadata, OpenGraph & Twitter cards
- JSON-LD `EducationalOrganization` structured data
- `robots.txt` + dynamic sitemap via `sitemap.ts`
- Semantic heading hierarchy

## Customisation

### Swap in real assets
- Replace Pexels image URLs in `src/data/destinations.ts` and `src/data/testimonials.ts` with TIE's own photography
- Replace the hero image in `Hero.tsx` with a campus/brand video loop
- Add `public/og-image.jpg` (1200×630) for social sharing
- Add real social media URLs in `Footer.tsx`

### Wire the booking form to Firebase
- The booking form in `CTA.tsx` currently shows a success toast on submit
- To connect to the existing Firebase backend, import `firebaseConfig` from the parent repo's `js/config.js` and POST the form data to Firestore/Functions
- See `../js/config.js` for the Firebase project config (`fir-a7a69`)

### Coming soon (architecture ready)
- **AI Career Match** — add a quiz component + results view, data in `src/data/`
- **Scholarship Finder** — interactive calculator, filter by GPA/budget/country
- **University Explorer** — searchable/filterable database page at `/universities`
- **Individual destination pages** — route at `/destinations/[slug]`, data already in `destinations.ts`
- **Blog / About pages** — standard Next.js routes

## License

Proprietary — Target International Education, Pokhara, Nepal.
