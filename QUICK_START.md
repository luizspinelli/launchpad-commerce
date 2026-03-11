# Quick Start Guide - LaunchPad Commerce Landing Page

## 🚀 Get Up & Running in 2 Minutes

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 3. View the Landing Page
The landing page is the home route (`/`). It includes:
- Navbar (sticky navigation)
- Hero section (headline + CTAs)
- Features grid (4 items)
- Testimonials (3 customer reviews)
- FAQ section (expandable accordion)
- Footer (links + social)

---

## 📝 Customization

### Change Headlines & Copy
Edit the content directly in components:

**Hero Section** (`app/components/Hero.tsx`):
```tsx
<h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight max-w-3xl">
  Your new headline here
</h2>
```

**Features** (`app/components/Features.tsx`):
Update the `features` array:
```tsx
const features: Feature[] = [
  {
    title: 'Your Feature',
    description: 'Your description',
    icon: '🎯', // Change emoji
  },
  // ...
];
```

**FAQ** (`app/components/FAQ.tsx`):
Update the `faqs` array:
```tsx
const faqs: FAQItem[] = [
  {
    question: 'Your question?',
    answer: 'Your answer.',
  },
  // ...
];
```

### Change Colors

Update TailwindCSS classes throughout the components:

**Current color scheme:**
- Primary Blue: `bg-blue-900`, `bg-blue-600`
- White: `bg-white`
- Gray: `bg-gray-50`, `text-gray-900`

**To change to Indigo:**
```bash
# Find & replace
blue-900 → indigo-900
blue-600 → indigo-500
```

### Change Fonts & Sizes

Edit in the relevant component. Example from Hero:
```tsx
// Default
<h2 className="text-4xl sm:text-5xl lg:text-6xl">

// Smaller
<h2 className="text-3xl sm:text-4xl lg:text-5xl">
```

---

## 🔧 Common Changes

### Add a New Feature
1. Open `app/components/Features.tsx`
2. Add to the `features` array:
```tsx
{
  title: 'Your Feature',
  description: 'Your description',
  icon: '💡',
}
```

### Add More Testimonials
1. Open `app/components/Testimonials.tsx`
2. Add to the `testimonials` array:
```tsx
{
  quote: 'Customer quote here',
  author: 'Name',
  role: 'Title',
  initials: 'N',
  color: 'bg-blue-500',
}
```

### Update Logo
1. Replace your logo at `public/logo.png`
2. Update Navbar.tsx:
```tsx
<img src="/logo.png" alt="Logo" className="h-8" />
```

### Update Footer Links
Edit `app/components/Footer.tsx` - replace `href="#"` with your actual links.

---

## 🌐 Deployment

### Deploy to Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Deploy to Netlify

```bash
npm run build
# Drag the 'out' folder to Netlify
```

### Deploy to Any Node Host

```bash
npm run build
npm run start
# Server runs on port 3000
```

---

## 📊 Project Structure

```
app/
├── components/
│   ├── Navbar.tsx      ← Navigation
│   ├── Hero.tsx        ← Main headline
│   ├── Features.tsx    ← 4 features grid
│   ├── Testimonials.tsx ← 3 customer reviews
│   ├── FAQ.tsx         ← Q&A accordion
│   └── Footer.tsx      ← Footer with links
├── layout.tsx          ← Root layout
├── page.tsx            ← Landing page (combines all components)
└── globals.css         ← Tailwind imports
```

---

## 🎨 Styling with TailwindCSS

All styling is done with Tailwind utility classes. Examples:

```tsx
// Colors
className="bg-blue-600 text-white"

// Spacing
className="px-8 py-4"  // padding
className="gap-8"      // gap between items

// Responsive
className="text-2xl md:text-3xl lg:text-4xl"

// Hover/Interactive
className="hover:bg-blue-700 transition-colors"
```

No CSS files needed! See [Tailwind Docs](https://tailwindcss.com/docs) for more.

---

## 🔐 Environment Setup

Create `.env.local` with:
```
NEXT_PUBLIC_STRIPE_KEY=pk_test_...
RESEND_API_KEY=re_...
DATABASE_URL=postgresql://...
```

(These are configured but not active until you set up Stripe & Resend accounts)

---

## ✨ Browser Support

Works on:
- ✅ Chrome/Edge (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Mobile browsers (iOS, Android)

---

## 📚 Full Documentation

For detailed design guidelines, see: **DESIGN_GUIDELINES.md**  
For implementation details, see: **IMPLEMENTATION_SUMMARY.md**

---

## 🆘 Troubleshooting

### Port 3000 already in use?
```bash
npm run dev -- -p 3001
```

### Module not found errors?
```bash
rm -rf node_modules package-lock.json
npm install
```

### Build fails?
```bash
npm run type-check  # Check TypeScript errors
npm run build       # Full build
```

---

## 💡 Tips

1. **Live Editing:** Changes to components auto-refresh in browser
2. **Mobile Testing:** Use browser DevTools (F12) → Toggle Device Toolbar
3. **Dark Mode:** Add `dark:` prefix to any class for dark mode support
4. **Performance:** Use `next/image` for all images
5. **SEO:** Metadata is in `app/page.tsx` — update title/description there

---

## 🚀 You're Ready!

The landing page is fully functional and ready to customize. Start by editing component content, then adjust colors and styling to match your brand.

Happy building! 🎉

---

**Need Help?**  
- View component files in `app/components/`
- Check `DESIGN_GUIDELINES.md` for styling rules
- Read the comments in each component file

**Ready to Deploy?**  
```bash
npm run build
# All files ready in .next/ folder
```
