import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // ── Brand palette ──────────────────────────────────
        cream: {
          DEFAULT: '#FAF7F0',   // main page background
          warm:    '#FCF8EF',   // warm section background
          border:  '#E8DEC8',   // universal border color
        },
        ink: {
          DEFAULT: '#151515',   // primary text
          mid:     '#2A2A2A',   // medium emphasis
          muted:   '#6F6A61',   // secondary / metadata text
          faint:   '#9A9590',   // placeholder / disabled text
        },
        gold: {
          DEFAULT: '#B9922F',   // primary luxury accent
          light:   '#D8B45A',   // hover / soft highlight
          pale:    '#F5E6C0',   // very light gold tint
          muted:   'rgba(185,146,47,0.15)',
          border:  'rgba(185,146,47,0.30)',
        },
        copper: {
          DEFAULT: '#A56A43',   // secondary warm accent
          light:   '#BF7F55',   // copper hover
        },
        jet: {
          DEFAULT: '#111111',   // navbar / dark elements
          deep:    '#050505',   // footer / hero / max-black
          card:    '#1A1A1A',   // dark card bg
        },
      },
      fontFamily: {
        serif:   ['var(--font-playfair)',   'Playfair Display', 'Georgia', 'serif'],
        display: ['var(--font-cormorant)',  'Cormorant Garamond', 'Playfair Display', 'serif'],
        arabic:  ['var(--font-tajawal)',    'Tajawal', 'Arial', 'sans-serif'],
        sans:    ['var(--font-inter)',      'Inter', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        '2xs': ['0.65rem', { lineHeight: '1rem' }],
      },
      letterSpacing: {
        luxury: '0.2em',
        wide:   '0.12em',
      },
      animation: {
        'fade-in':    'fadeIn 0.5s ease forwards',
        'fade-up':    'fadeUp 0.6s ease forwards',
        'slide-left': 'slideLeft 0.45s ease forwards',
        'slide-right':'slideRight 0.45s ease forwards',
      },
      keyframes: {
        fadeIn:      { from: { opacity: '0' },                              to: { opacity: '1' } },
        fadeUp:      { from: { opacity: '0', transform: 'translateY(20px)' }, to: { opacity: '1', transform: 'translateY(0)' } },
        slideLeft:   { from: { transform: 'translateX(100%)',  opacity: '0' }, to: { transform: 'translateX(0)', opacity: '1' } },
        slideRight:  { from: { transform: 'translateX(-100%)', opacity: '0' }, to: { transform: 'translateX(0)', opacity: '1' } },
      },
      boxShadow: {
        'card':       '0 2px 12px rgba(0,0,0,0.06)',
        'card-hover': '0 8px 40px rgba(0,0,0,0.10)',
        'gold-sm':    '0 0 20px rgba(185,146,47,0.18)',
      },
      backgroundImage: {
        'gradient-gold':    'linear-gradient(135deg, #B9922F 0%, #D8B45A 50%, #B9922F 100%)',
        'gradient-gold-h':  'linear-gradient(90deg, #B9922F 0%, #D8B45A 100%)',
        'hero-overlay':     'linear-gradient(to right, rgba(5,5,5,0.88) 40%, rgba(5,5,5,0.25) 100%)',
        'hero-overlay-rtl': 'linear-gradient(to left,  rgba(5,5,5,0.88) 40%, rgba(5,5,5,0.25) 100%)',
      },
      screens: {
        xs: '480px',
      },
    },
  },
  plugins: [],
}

export default config
