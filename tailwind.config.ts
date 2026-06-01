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
        gold: {
          DEFAULT: '#D4AF37',
          light: '#E8C94D',
          dark: '#B8961F',
          pale: '#F0DC82',
          subtle: 'rgba(212,175,55,0.15)',
        },
        silver: {
          DEFAULT: '#C0C0C0',
          dark: '#A0A0A0',
          light: '#E0E0E0',
          subtle: 'rgba(192,192,192,0.15)',
        },
        dark: {
          DEFAULT: '#111111',
          deeper: '#050505',
          card: '#1A1A1A',
          border: '#2A2A2A',
          muted: '#3A3A3A',
          hover: '#242424',
        },
      },
      fontFamily: {
        serif: ['var(--font-playfair)', 'Playfair Display', 'Georgia', 'serif'],
        arabic: ['var(--font-tajawal)', 'Tajawal', 'Arial', 'sans-serif'],
        sans: ['var(--font-inter)', 'Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'slide-in-right': 'slideInRight 0.3s ease-out',
        'scale-in': 'scaleIn 0.3s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideInRight: {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(0)' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
      },
      backgroundImage: {
        'gradient-gold': 'linear-gradient(135deg, #D4AF37 0%, #E8C94D 50%, #B8961F 100%)',
        'gradient-dark': 'linear-gradient(180deg, #111111 0%, #050505 100%)',
        'gradient-card': 'linear-gradient(145deg, #1A1A1A 0%, #111111 100%)',
        'gradient-hero': 'linear-gradient(135deg, #050505 0%, #1A1A1A 50%, #050505 100%)',
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
    },
  },
  plugins: [],
}

export default config
