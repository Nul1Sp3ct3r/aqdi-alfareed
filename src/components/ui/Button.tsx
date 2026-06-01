'use client'

import { ButtonHTMLAttributes, ReactNode } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'gold' | 'outline-gold' | 'silver' | 'ghost' | 'dark'
  size?: 'sm' | 'md' | 'lg'
  fullWidth?: boolean
  children: ReactNode
}

export default function Button({
  variant = 'gold',
  size = 'md',
  fullWidth = false,
  children,
  className = '',
  disabled,
  ...props
}: ButtonProps) {
  const base = 'inline-flex items-center justify-center font-semibold tracking-wide transition-all duration-300 rounded-lg cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed select-none'

  const variants = {
    gold: 'bg-gradient-gold text-dark-deeper hover:shadow-[0_8px_25px_rgba(212,175,55,0.45)] hover:-translate-y-0.5 active:translate-y-0',
    'outline-gold': 'bg-transparent text-gold border border-gold hover:bg-gold-subtle hover:shadow-[0_8px_25px_rgba(212,175,55,0.2)] hover:-translate-y-0.5 active:translate-y-0',
    silver: 'bg-silver text-dark-deeper hover:bg-silver-light hover:shadow-[0_8px_25px_rgba(192,192,192,0.3)] hover:-translate-y-0.5',
    ghost: 'bg-transparent text-white/70 hover:text-white hover:bg-white/10',
    dark: 'bg-dark-card text-white border border-dark-border hover:border-gold/30 hover:text-gold',
  }

  const sizes = {
    sm: 'text-sm px-4 py-2 gap-1.5',
    md: 'text-sm px-6 py-3 gap-2',
    lg: 'text-base px-8 py-4 gap-2.5',
  }

  return (
    <button
      className={`${base} ${variants[variant]} ${sizes[size]} ${fullWidth ? 'w-full' : ''} ${className}`}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  )
}
