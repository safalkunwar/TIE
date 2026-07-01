# TIE Nepal — Study Abroad Marketing Website

A modern, interactive website for Target International Education (TIE Nepal), helping students discover study opportunities worldwide. Built with Next.js and featuring a 3D globe, smooth animations, and a seamless user experience.

**🌐 Live Demo:** https://tie-iota.vercel.app/

## Quick Start

```bash
npm install
npm run dev
```

Open **http://localhost:3000** in your browser.

## How to Build & Deploy

```bash
npm run build
npm start
```

## What's Inside

```
src/
  app/
    layout.tsx          Main layout, metadata, fonts
    page.tsx            Homepage
    globals.css         Styles and design colors
    sitemap.ts          Sitemap for search engines
  components/
    Navbar.tsx          Top navigation menu
    Hero.tsx            Welcome section with intro text
    Globe.tsx           3D interactive map of destinations
    Stats.tsx           Key numbers (years, students, visa success)
    DreamJourney.tsx    Step-by-step study abroad process
    Destinations.tsx    Country cards with universities
    Testimonials.tsx    Student success stories
    SocialProof.tsx     Partner logos and credentials
    CTA.tsx             Booking form and contact options
    Footer.tsx          Footer with links
  data/                 Information about destinations and students
  hooks/                Reusable code for animations
  lib/                  Helper functions
  public/               Images and files
```

## Main Sections

1. **Navigation** — Easy menu at the top
2. **Welcome Section** — "Your Future Has No Borders"
3. **Key Numbers** — 13+ years, 5,000+ students, 97% visa success
4. **Interactive Globe** — Click destinations to explore
5. **Countries & Universities** — Browse 8 countries and their top universities
6. **Study Journey** — 7 steps from consultation to success
7. **Student Stories** — Real testimonials from our students
8. **Partners** — ECAN, ICEF, British Council verification
9. **Book a Consultation** — Contact form and WhatsApp link
10. **Footer** — Contact info and links

## Colors & Design

- Dark blue background with gold and light blue accents
- Easy to read fonts: Sora for headings, Inter for text
- Works on phones, tablets, and computers

## Mobile Friendly

- Responsive design that works on all screen sizes
- Touch-friendly buttons and menus
- Works smoothly on slower connections

## Accessibility

- Works without animations (for users who prefer it)
- Keyboard navigation support
- Good color contrast for easy reading
- Screen reader compatible

## What You Can Customize

### Change Images
- Update destination photos in `src/data/destinations.ts`
- Update student photos in `src/data/testimonials.ts`
- Add a campus image in `Hero.tsx`
- Add social media preview image: `public/og-image.jpg` (1200×630)

### Connect the Booking Form
The booking form currently shows a success message. To save data to a database:
- Import Firebase config from `js/config.js`
- Update `CTA.tsx` to send form data to your backend
- Add error handling and validation

### Future Features
- AI Career Matching Quiz
- Scholarship Calculator
- University Database & Search
- Individual Country Pages
- Blog & About Pages

## Technology Stack

- **Next.js 14** — Fast web framework
- **React 18** — User interface library
- **TypeScript** — Type-safe JavaScript
- **Tailwind CSS** — Styling framework
- **Three.js** — 3D graphics library for globe
- **GSAP** — Smooth animations
- **Lenis** — Smooth scrolling

## Common Tasks

### Change text content
Edit files in `src/data/` and component files in `src/components/`

### Add a new page
Create a new folder in `src/app/` with a `page.tsx` file

### Update styling
Edit `src/app/globals.css` or use Tailwind classes in components

### Deploy to production
- Push to GitHub
- Connect to Vercel (recommended for Next.js)
- Or use any hosting that supports Node.js

## Need Help?

- Check Next.js docs: https://nextjs.org
- Tailwind CSS: https://tailwindcss.com
- Three.js: https://threejs.org
- GSAP: https://gsap.com

## License

Proprietary — Target International Education, Pokhara, Nepal.
