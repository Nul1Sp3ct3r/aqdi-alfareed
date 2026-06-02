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
        // Light luxury palette
        cream: {
          DEFAULT: '#FAFAF8',
          warm:    '#F5F0E8',
          border:  '#E8E2D6',
        },
        // Text hierarchy
        ink: {
          DEFAULT: '#050505',
          mid:     '#333333',
          muted:   '#666666',
          faint:   '#999999',
        },
        // Gold accent
        gold: {
          DEFAULT: '#B9922F',
          light:   '#D4AF37',
          pale:    '#F5E6C0',
          muted:   'rgba(185,146,47,0.15)',
          border:  'rgba(185,146,47,0.3)',
        },
        // Dark for hero/nav elements
        jet: {
          DEFAULT: '#111111',
          deep:    '#050505',
          card:    '#1A1A1A',
        },
      },
      fontFamily: {
        serif:   ['var(--font-playfair)',    'Playfair Display', 'Georgia', 'serif'],
        display: ['var(--font-cormorant)',   'Cormorant Garamond', 'Playfair Display', 'serif'],
        arabic:  ['var(--font-tajawal)',     'Tajawal', 'Arial', 'sans-serif'],
        sans:    ['var(--font-inter)',        'Inter', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        '2xs': ['0.65rem', { lineHeight: '1rem' }],
      },
      letterSpacing: {
        luxury: '0.2em',
        wide:   '0.12em',
      },
      animation: {
        'fade-in':  'fadeIn 0.5s ease forwards',
        'fade-up':  'fadeUp 0.6s ease forwards',
        'slide-left': 'slideLeft 0.45s ease forwards',
        'slide-right': 'slideRight 0.45s ease forwards',
      },
      keyframes: {
        fadeIn: {
          from: { opacity: '0' },
          to:   { opacity: '1' },
        },
        fadeUp: {
          from: { opacity: '0', transform: 'translateY(20px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
        slideLeft: {
          from: { transform: 'translateX(100%)', opacity: '0' },
          to:   { transform: 'translateX(0)',    opacity: '1' },
        },
        slideRight: {
          from: { transform: 'translateX(-100%)', opacity: '0' },
          to:   { transform: 'translateX(0)',     opacity: '1' },
        },
      },
      boxShadow: {
        'card':       '0 2px 16px rgba(0,0,0,0.07)',
        'card-hover': '0 8px 40px rgba(0,0,0,0.13)',
        'gold-sm':    '0 0 20px rgba(185,146,47,0.2)',
      },
      backgroundImage: {
        'gradient-gold': 'linear-gradient(135deg, #B9922F 0%, #D4AF37 50%, #B9922F 100%)',
        'gradient-gold-h': 'linear-gradient(90deg, #B9922F 0%, #D4AF37 100%)',
        'hero-overlay': 'linear-gradient(to right, rgba(5,5,5,0.85) 45%, rgba(5,5,5,0.3) 100%)',
        'hero-overlay-rtl': 'linear-gradient(to left, rgba(5,5,5,0.85) 45%, rgba(5,5,5,0.3) 100%)',
      },
      screens: {
        xs: '480px',
      },
    },
  },
  plugins: [],
}

export default config
