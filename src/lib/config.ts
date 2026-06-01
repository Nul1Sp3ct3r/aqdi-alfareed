/**
 * Centralized environment variable access.
 * Set all NEXT_PUBLIC_* variables in Vercel → Project Settings → Environment Variables.
 * For local development, copy .env.local.example to .env.local and fill in values.
 */

export const siteConfig = {
  // Brand
  brandNameAr: 'عقدي الفريد',
  brandNameEn: 'Aqdi Alfareed',

  // Site URL — used for OG tags and canonical links
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://aqdi-alfareed.vercel.app',

  // Social / contact — set these in Vercel env vars
  // CONNECT: WhatsApp Business number. Format: https://wa.me/966XXXXXXXXX?text=...
  whatsappUrl: process.env.NEXT_PUBLIC_WHATSAPP_URL ?? 'https://wa.me/966000000000',

  // CONNECT: Your Instagram profile URL
  instagramUrl: process.env.NEXT_PUBLIC_INSTAGRAM_URL ?? 'https://instagram.com/aqdi.alfareed',

  // CONNECT: Contact email address
  contactEmail: process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? 'info@aqdi-alfareed.com',

  // Currency
  currency: 'SAR',
  currencyAr: 'ر.س',

  // Free shipping threshold (0 = always free)
  freeShippingThreshold: 0,

  // CONNECT: Firebase config keys (set in Vercel, prefix with NEXT_PUBLIC_)
  // firebase: {
  //   apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY ?? '',
  //   authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN ?? '',
  //   projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID ?? '',
  //   storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET ?? '',
  //   messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID ?? '',
  //   appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID ?? '',
  // },

  // CONNECT: Supabase config (alternative to Firebase)
  // supabase: {
  //   url: process.env.NEXT_PUBLIC_SUPABASE_URL ?? '',
  //   anonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? '',
  // },
}
