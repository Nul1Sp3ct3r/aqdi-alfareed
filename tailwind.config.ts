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
        ink: {
          DEFAULT: '#0A0A0A',
          deep: '#030303',
          card: '#111111',
          lifted: '#181818',
          surface: '#1E1E1E',
          border: 'rgba(255,255,255,0.07)',
          hover: '#161616',
        },
        gold: {
          DEFAULT: '#D4AF37',
          soft: '#E7C76F',
          dim: '#B8961F',
          pale: '#F0DC82',
          subtle: 'rgba(212,175,55,0.08)',
          border: 'rgba(212,175,55,0.22)',
          glow: 'rgba(212,175,55,0.15)',
        },
        silver: {
          DEFAULT: '#C0C0C0',
          muted: '#8A8A8A',
          subtle: 'rgba(192,192,192,0.1)',
        },
        zinc: {
          850: '#1c1c1c',
          950: '#0a0a0a',
        },
      },
      fontFamily: {
        serif:   ['var(--font-playfair)', 'Playfair Display', 'Georgia', 'serif'],
        arabic:  ['var(--font-tajawal)', 'Tajawal', 'Arial', 'sans-serif'],
        sans:    ['var(--font-inter)', 'Inter', 'system-ui', 'sans-serif'],
        display: ['var(--font-cormorant)', 'Cormorant Garamond', 'Playfair Display', 'serif'],
      },
      fontSize: {
        '2xs': ['0.65rem', { lineHeight: '1rem' }],
      },
      letterSpacing: {
        luxury: '0.25em',
        widest: '0.35em',
      },
      animation: {
        'fade-up':       'fadeUp 0.7s ease forwards',
        'fade-in':       'fadeIn 0.5s ease forwards',
        'slide-in-end':  'slideInEnd 0.35s ease forwards',
        'gold-pulse':    'goldPulse 3s ease-in-out infinite',
        'float':         'float 4s ease-in-out infinite',
        'shimmer':       'shimmer 2s linear infinite',
      },
      keyframes: {
        fadeUp: {
          from: { opacity: '0', transform: 'translateY(24px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          from: { opacity: '0' },
          to:   { opacity: '1' },
        },
        slideInEnd: {
          from: { transform: 'translateX(100%)' },
          to:   { transform: 'translateX(0)' },
        },
        goldPulse: {
          '0%, 100%': { opacity: '0.6' },
          '50%':      { opacity: '1' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%':      { transform: 'translateY(-10px)' },
        },
        shimmer: {
          '0%':   { backgroundPosition: '-400px 0' },
          '100%': { backgroundPosition: '400px 0' },
        },
      },
      backgroundImage: {
        'gradient-gold':    'linear-gradient(135deg, #D4AF37 0%, #E7C76F 50%, #B8961F 100%)',
        'gradient-gold-h':  'linear-gradient(90deg, #B8961F 0%, #D4AF37 50%, #E7C76F 100%)',
        'gradient-ink':     'linear-gradient(180deg, #111111 0%, #030303 100%)',
        'gradient-card':    'linear-gradient(160deg, #181818 0%, #0d0d0d 100%)',
        'gradient-hero':    'linear-gradient(125deg, #030303 0%, #0f0f0f 60%, #030303 100%)',
        'radial-gold':      'radial-gradient(circle, rgba(212,175,55,0.15) 0%, transparent 70%)',
        'radial-silver':    'radial-gradient(circle, rgba(192,192,192,0.1) 0%, transparent 70%)',
      },
      boxShadow: {
        'gold-sm':  '0 0 15px rgba(212,175,55,0.15)',
        'gold-md':  '0 0 30px rgba(212,175,55,0.2)',
        'gold-lg':  '0 0 60px rgba(212,175,55,0.15)',
        'card':     '0 4px 30px rgba(0,0,0,0.5)',
        'card-hover': '0 20px 60px rgba(0,0,0,0.7), 0 0 40px rgba(212,175,55,0.08)',
        'lift':     '0 25px 60px rgba(0,0,0,0.65)',
      },
      screens: {
        xs: '480px',
      },
    },
  },
  plugins: [],
}

export default config
