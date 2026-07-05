# TIE Nepal — Build Progress Tracker
**Last updated:** 2026-07-02
**Branch:** `sky-blue` → https://github.com/safalkunwar/TIE
**Working dir:** `C:\Users\Acer\OneDrive\Desktop\target\TIE` (D:\safety\TIE is backup)
**Build state:** ✅ Compiles, 0 errors, 155 kB First Load JS
**To run:** `cd TIE && npm run build && npm start` → http://localhost:3000

---

## ✅ DONE (committed & pushed)

### Foundation
- [x] Next.js 14 + React 18 + TS + Tailwind + R3F + GSAP + Lenis
- [x] SEO: metadata, OG, JSON-LD EducationalOrganization, sitemap, robots
- [x] Smooth scroll (Lenis + GSAP ticker bridge), reduced-motion fallback

### Theme (dark → sky-blue, then readability fix)
- [x] Sky-blue tokens: sky-50/100/200, ocean/ocean-deep/azure
- [x] **Contrast fix:** text tokens = neutral slate (mist #0F172A, muted #475569, dim #64748B) — NOT blue-tinted. This is critical for readability.
- [x] Body bg: multi-radial gradient + linear (F4F9FF→E7F1FE→F4F9FF)
- [x] Fonts: **Plus Jakarta Sans** (body) + Sora (display)
- [x] White floating cards, blue-tinted glass, ocean gradient text

### Sections (order on page)
1. [x] Navbar — real TIE logo, hover = bg-ocean+white (FIXED, visible), mobile sheet, real contacts
2. [x] Hero — premium animated gradient mesh bg (NOT photo), GSAP split-text, **13+ Years count-up stat beside CTA** (useCountUpOnMount), cursor glow, floating chips
3. [x] Stats — animated counters (13+ yrs, 5000+ students, 97% visa, 350+ unis)
4. [x] About/Why TIE — team photo + floating credential chips + story (founded 2012, ECAN/ICEF/Govt)
5. [x] Globe — **realistic NASA Blue Marble earth** + starfield + atmosphere + pulsing pins with **country name labels** + arcs from Pokhara + info panel
6. [x] Destinations — 8 country cards (parallax hover, tuition chips, university badges)
7. [x] DreamJourney — scroll-storytelling timeline (cards fade/scale in, nodes light up, scrubbed progress line, step counter)
8. [x] Testimonials — Netflix-style carousel
9. [x] SocialProof — ECAN/ICEF/British Council + partner marquee + FB/IG follow strip
10. [x] Credentials — 4 real images with lightbox (govt cert, ICEF badge, workshop photo, team)
11. [x] CTA — booking modal (name/phone/email/destination/date) + WhatsApp + real contacts
12. [x] Footer — real contacts, social, destinations ribbon

### Real assets & intel
- [x] 4 real images in `public/gallery/` (team, govt-approval, icef-accredited, icef-workshop)
- [x] Real TIE logo (`tie-logo.png` 270×270, blue/orange graduation cap)
- [x] company.ts: real phone (+977 9856032278), WhatsApp, FB /targetintl, IG /targetintl, MD Bhuwan Chhetri, Director Laxmi Kunwar Chhetri, mission, vision, 6 services

---

## ⏳ PENDING (user requested, NOT yet done)

### Destinations Navigation Redesign & Admin Panel
- [x] Set up database (Prisma + SQLite)
- [x] Defined relational schema (Country, Hero, University, Scholarship, FAQ, Testimonial)
- [x] Seeded database with initial destination data
- [x] Built secure Admin Authentication (cookie-based middleware)
- [x] Built Admin Dashboard to list countries
- [x] Build Admin Country forms (Create, Edit with relational nested data)
- [x] Build dynamic GSAP Mega Menu with live preview panel
- [x] Integrate dynamic data into Navbar and Destinations cards
- [x] Create dynamic country detail page template `/country/[slug]` with modular sections

### DreamJourney — needs 2 specific tweaks
- [ ] **Boxes strictly alternating left/right** (currently uses alternating but user wants clearer L-R-L-R). Verify the `[direction:rtl]` flip works on desktop. The logic IS there (`right = i % 2 === 1`) but may need visual verification.
- [ ] **Background picture** behind the journey section to make it attractive (user asked for this — NOT yet added). Add a subtle, low-opacity campus/world image or a stronger gradient.

### User asked but needs confirmation
- [ ] "add other information from facebook page" — gathered intel (services, leadership, mission/vision) into company.ts, but not all displayed on page. Could add a dedicated "Our Services" section using `company.services` array.

---

## 🐛 KNOWN ISSUES / WATCH
- **Disk space on C:** was critical (5 GB free caused build hangs). Cleaned to ~12 GB. If build hangs → `Remove-Item $env:TEMP\* -Recurse -Force; npm cache clean --force`
- **node.exe processes** linger and lock `.next`. Before build: kill them (see run script below)
- `tie-logo-full.png` (169×41) is a JPEG mislamed as .png — works but could be re-saved. Low priority.
- Globe earth texture loads from githubusercontent (NASA Blue Marble) — needs internet on first load. If offline, falls back to nothing (would need a local copy in `public/`)

---

## 🔧 QUICK RUN SCRIPT
```powershell
cd C:\Users\Acer\OneDrive\Desktop\target\TIE
taskkill /F /IM node.exe 2>$null
Remove-Item -Recurse -Force .next -ErrorAction SilentlyContinue
npm run build
npm start
# → http://localhost:3000
```

## 🚀 DEPLOY
- Repo: https://github.com/safalkunwar/TIE (branch: sky-blue)
- To merge to main: PR at https://github.com/safalkunwar/TIE/pull/new/sky-blue
- Deploy: Vercel (auto-deploys from GitHub) — connect repo, framework=Next.js
