# عقدي الفريد | Aqdi Alfareed

Luxury jewelry e-commerce website built with **Next.js 14 App Router**, TypeScript, and Tailwind CSS.

---

## Tech Stack

| Layer | Choice |
|---|---|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS |
| Icons | lucide-react |
| Hosting | Vercel |
| Database (future) | Firebase / Supabase |

---

## Local Development

```bash
# 1. Install dependencies
npm install

# 2. Copy environment variables template
cp .env.local.example .env.local
# Edit .env.local with your values

# 3. Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## Build & Verify

```bash
npm run build   # must pass with zero errors before deploying
npm run start   # preview the production build locally
npm run lint    # run ESLint checks
```

---

## Deploy to Vercel

### Option A — GitHub + Vercel Dashboard (Recommended)

1. **Push to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit — Aqdi Alfareed"
   git remote add origin https://github.com/<your-username>/aqdi-alfareed.git
   git push -u origin main
   ```

2. **Import on Vercel**
   - Go to [vercel.com/new](https://vercel.com/new)
   - Click **"Import Git Repository"** and select `aqdi-alfareed`
   - Framework preset: **Next.js** (auto-detected)
   - Build command: `npm run build` (default)
   - Output directory: `.next` (default)
   - Click **Deploy**

3. **Add Environment Variables**
   - In the Vercel project → **Settings → Environment Variables**
   - Add each key from `.env.local.example` (see table below)
   - Every subsequent `git push` to `main` triggers a new deployment automatically

---

### Option B — Vercel CLI

```bash
# Install Vercel CLI globally
npm install -g vercel

# Login to your Vercel account
vercel login

# Deploy (first time — interactive setup)
vercel

# Deploy to production
vercel --prod
```

The CLI will ask you to confirm the project name and link it to your Vercel account on the first run.

---

## Environment Variables

Set these in **Vercel → Project Settings → Environment Variables**.  
For local development, put them in `.env.local` (never commit this file).

| Variable | Required | Description |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | Recommended | Your production URL, e.g. `https://aqdi-alfareed.com` |
| `NEXT_PUBLIC_WHATSAPP_URL` | Yes | WhatsApp link, e.g. `https://wa.me/966500000000` |
| `NEXT_PUBLIC_INSTAGRAM_URL` | Yes | Instagram profile URL |
| `NEXT_PUBLIC_CONTACT_EMAIL` | Yes | Contact email address |
| `NEXT_PUBLIC_FIREBASE_*` | When connecting Firebase | See `.env.local.example` |
| `NEXT_PUBLIC_SUPABASE_URL` | When connecting Supabase | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | When connecting Supabase | Supabase anon key |

> **Rule:** Any variable read in browser code must be prefixed `NEXT_PUBLIC_`.  
> Server-only secrets (payment keys, admin passwords) must NOT have that prefix.

---

## Custom Domain

1. Vercel → Project → **Settings → Domains**
2. Add your domain (e.g. `aqdi-alfareed.com`)
3. Update your DNS provider with the CNAME/A record Vercel shows you
4. Update `NEXT_PUBLIC_SITE_URL` to the new domain

---

## Replacing Placeholder Images

All product images currently use `placehold.co` for development.  
To replace them with real images:

1. Upload images to **Firebase Storage** or **Supabase Storage** (or any CDN)
2. Add the CDN hostname to `next.config.js` → `images.remotePatterns` (commented examples are already there)
3. Update the `images: []` array in `src/data/products.ts` with real URLs

---

## Connecting a Real Database

All mock data is in `src/data/products.ts`. Every function that returns data has a `// CONNECT:` comment explaining what to replace:

| File | What to connect |
|---|---|
| `src/data/products.ts` | Replace mock arrays with Firestore/Supabase queries |
| `src/context/CartContext.tsx` | Sync cart to user document in DB |
| `src/app/checkout/page.tsx` → `handleSubmit` | Create order, send WhatsApp notification |
| `src/app/contact/page.tsx` → `handleSubmit` | Send email via Resend / EmailJS |
| `src/app/admin/layout.tsx` | Add auth guard (Firebase Auth / Supabase Auth) |
| `src/lib/config.ts` | Firebase/Supabase SDK initialization |

---

## Project Structure

```
src/
├── app/                    # Next.js pages (App Router)
│   ├── page.tsx            # Home
│   ├── shop/               # Product listing with filters
│   ├── product/[id]/       # Product detail (dynamic)
│   ├── cart/               # Cart
│   ├── checkout/           # Checkout
│   ├── about/              # About
│   ├── contact/            # Contact + form
│   └── admin/              # Admin dashboard UI
├── components/
│   ├── ui/                 # Button, Badge, SectionTitle
│   ├── layout/             # Navbar, Footer, CartDrawer
│   ├── home/               # Hero, Categories, BestSellers, etc.
│   ├── product/            # ProductCard, Gallery, Filters
│   └── admin/              # AdminSidebar
├── context/
│   ├── LanguageContext.tsx # AR/EN switcher + RTL/LTR
│   └── CartContext.tsx     # Cart state + localStorage
├── data/products.ts        # Mock product data (15 products)
├── lib/
│   ├── config.ts           # Environment variables
│   └── translations.ts     # AR/EN translation strings
└── types/index.ts          # TypeScript types
```

---

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start dev server at `localhost:3000` |
| `npm run build` | Production build (must pass before deploy) |
| `npm run start` | Run production build locally |
| `npm run lint` | ESLint check |
