# LaunchPad Commerce - Design Guidelines & Implementation

## 🎨 Design System

### Color Palette

| Role | Color | Hex | TailwindCSS |
|------|-------|-----|-------------|
| Primary | Dark Blue | #1e3a8a | `bg-blue-900`, `text-blue-900` |
| Accent | Bright Blue | #3b82f6 | `bg-blue-600`, `text-blue-600` |
| Background | White | #ffffff | `bg-white` |
| Text Primary | Dark Gray | #111827 | `text-gray-900` |
| Text Secondary | Medium Gray | #4b5563 | `text-gray-600` |
| Muted | Light Gray | #f3f4f6 | `bg-gray-50` |
| Success | Green | #10b981 | `bg-emerald-500` |
| Accent | Purple | #a855f7 | `bg-purple-500` |

### Typography

```
Headlines (H1, H2):
  - Font Weight: Bold (700)
  - Font Size: 4xl-6xl (48px-60px)
  - Line Height: Tight (1.1-1.2)
  - Classes: font-bold text-4xl sm:text-5xl lg:text-6xl

Subheadings (H3):
  - Font Weight: Semibold (600)
  - Font Size: xl-2xl (20px-24px)
  - Classes: font-semibold text-xl lg:text-2xl

Body Text:
  - Font Weight: Regular (400)
  - Font Size: base-lg (16px-18px)
  - Line Height: Relaxed (1.625)
  - Classes: text-base leading-relaxed

Small Text:
  - Font Weight: Regular (400)
  - Font Size: sm (14px)
  - Classes: text-sm
```

### Spacing & Layout

```
Sections:
  - Vertical Padding: 96px (24rem) / py-24
  - Horizontal Padding: 16px mobile, 24px tablet, 32px desktop
  - Max Width: 80rem (1280px) / max-w-7xl

Cards & Elements:
  - Gap (between items): gap-6 (1.5rem) or gap-8 (2rem)
  - Padding (inside cards): p-6 to p-8 (1.5rem to 2rem)
  - Border Radius:
    * Buttons: rounded-full
    * Cards: rounded-lg
    * Inputs: rounded-lg

Responsive Breakpoints:
  - Mobile First: Default mobile (320px)
  - Tablet: sm: (640px), md: (768px)
  - Desktop: lg: (1024px), xl: (1280px)
```

### Component Styling

#### Buttons
```
Primary (CTA):
  - Background: bg-blue-600
  - Hover: hover:bg-blue-700
  - Text: text-white font-bold
  - Padding: px-8 py-4
  - Border Radius: rounded-full
  - Transition: transition-colors

Secondary (Outline):
  - Border: border-2 border-white
  - Hover: hover:bg-white/10
  - Text: text-white font-bold
  - Padding: px-8 py-4
```

#### Cards
```
Base:
  - Background: bg-white (or bg-gray-50 on muted sections)
  - Border: border border-gray-200
  - Border Radius: rounded-lg
  - Padding: p-6 to p-8
  - Hover: hover:shadow-lg transition-shadow
```

### Responsive Design Rules

1. **Mobile-First Approach**: Design for mobile, enhance for tablet/desktop
2. **Grid Layouts**:
   - Features: `grid-cols-1 md:grid-cols-2 lg:grid-cols-4`
   - Testimonials: `grid-cols-1 md:grid-cols-3`
   - Footer: `grid-cols-1 md:grid-cols-4`

3. **Text Sizing**:
   - Hero H1: `text-4xl sm:text-5xl lg:text-6xl`
   - Section H2: `text-3xl sm:text-4xl lg:text-5xl`

4. **Spacing Adaptation**:
   - Sections: `py-16 md:py-24`
   - Gaps: `gap-4 md:gap-8`

## 📱 Page Structure

```
HTML Structure:
  <main>
    <Navbar /> (sticky, z-50)
    <Hero /> (full viewport, gradient bg)
    <Features /> (grid, 4 columns)
    <Testimonials /> (grid, 3 columns)
    <FAQ /> (accordion, max-w-3xl)
    <Footer /> (footer with links, dark bg)
  </main>
```

## 📊 Component Breakdown

### 1. Navbar
- **Purpose**: Navigation and primary CTA
- **Styling**: Sticky, white bg, shadow on scroll
- **Content**: Logo + "Get Started Free" button
- **Responsive**: Logo left, button right on all devices

### 2. Hero
- **Purpose**: Headline, value proposition, CTAs
- **Styling**: Gradient background (blue-900 to blue-800), full viewport
- **Content**: 
  - Main headline (4xl-6xl)
  - Subheadline (lg-2xl, muted blue)
  - Dual CTAs (white primary, outline secondary)
  - Trust badge
- **Responsive**: Centered text, stacked buttons on mobile

### 3. Features
- **Purpose**: Key benefits with icons
- **Styling**: White background, grid layout, hover effects
- **Content**: 4 features with emoji icons
- **Responsive**: 1 col (mobile) → 2 col (tablet) → 4 col (desktop)

### 4. Testimonials
- **Purpose**: Social proof with customer quotes
- **Styling**: Gray background, white cards, star ratings
- **Content**: 3 testimonials with avatars (colored circles)
- **Responsive**: 1 col (mobile) → 3 col (desktop)

### 5. FAQ
- **Purpose**: Answer common questions
- **Styling**: White background, accordion with expand/collapse
- **Content**: 7 Q&A pairs with animated chevron
- **Interactive**: Click to expand/collapse answers

### 6. Footer
- **Purpose**: Links, legal, social, copyright
- **Styling**: Dark blue (bg-blue-900), four-column grid
- **Content**: Brand info, Product links, Company links, Legal links, Social icons
- **Responsive**: 1 col (mobile) → 4 col (desktop)

## 🎯 SEO Implementation

### Page Metadata
```
Title: "LaunchPad Commerce - Create & Sell Digital Products in Minutes"
Description: "No coding needed. Launch a beautiful storefront with secure Stripe payments and automatic email delivery."
Keywords: digital products, online course platform, ebook seller, stripe integration, no-code commerce
```

### Semantic HTML
- `<main>` wrapper
- `<section>` for each major section
- `<h1>` for hero headline
- `<h2>` for section headings
- `<nav>` for navigation
- `<footer>` for footer

### OpenGraph Tags
- og:title, og:description
- og:type: website
- og:image: 1200x630px

### Twitter Cards
- twitter:card: summary_large_image
- twitter:title, twitter:description

## 🚀 Performance

- **CSS**: TailwindCSS v4 (PostCSS)
- **JS**: Minimal client-side (FAQ accordion only)
- **Images**: Next.js Image component ready
- **Build**: Static pre-rendering for all pages
- **Bundle Size**: ~30KB gzipped (TailwindCSS minified)

## ✨ Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS 12+, Android 8+)

## 🔧 Customization Guide

### Change Color Scheme
Edit TailwindCSS classes throughout components:
```
Replace: bg-blue-900 → bg-indigo-900
Replace: bg-blue-600 → bg-blue-500
etc.
```

### Change Typography
Edit font sizes in components:
```
text-6xl → text-5xl (smaller headlines)
text-2xl → text-3xl (larger subheadings)
```

### Adjust Spacing
Edit padding/margin classes:
```
py-24 → py-32 (larger sections)
gap-8 → gap-12 (more space between items)
```

### Add New Sections
1. Create new component in `app/components/`
2. Import in `app/page.tsx`
3. Add to main layout
4. Style using existing design system

## 📁 File Structure

```
app/
├── components/
│   ├── Navbar.tsx (58 lines)
│   ├── Hero.tsx (76 lines)
│   ├── Features.tsx (102 lines)
│   ├── Testimonials.tsx (143 lines)
│   ├── FAQ.tsx (156 lines)
│   └── Footer.tsx (196 lines)
├── layout.tsx (Root layout with fonts)
├── page.tsx (Landing page entry point)
└── globals.css (Tailwind imports)
```

## ✅ Implementation Checklist

- [x] Navbar component with sticky positioning
- [x] Hero section with gradient background
- [x] Features grid (4 items, responsive)
- [x] Testimonials grid (3 items, stars, avatars)
- [x] FAQ accordion (expandable, 7 items)
- [x] Footer with multiple columns
- [x] TailwindCSS styling only (no UI libraries)
- [x] Mobile-first responsive design
- [x] SEO metadata (title, description, OG tags)
- [x] TypeScript types
- [x] Build successfully (npm run build)
- [x] Zero external dependencies (TailwindCSS builtin)

## 🎉 Ready to Deploy

The landing page is production-ready and can be deployed to:
- Vercel (recommended)
- Netlify
- AWS Amplify
- Any Node.js hosting

```bash
npm run build
npm run start
```

---

**Last Updated**: 2026-03-11  
**Version**: 1.0 - Initial Launch  
**Team**: @bmad-ux-designer + @bmad-developer
