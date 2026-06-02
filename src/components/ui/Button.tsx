'use client'
import { ButtonHTMLAttributes, ReactNode } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'gold' | 'outline-gold' | 'dark' | 'whatsapp' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  fullWidth?: boolean
  children: ReactNode
}

export default function Button({
  variant = 'gold', size = 'md', fullWidth = false,
  children, className = '', disabled, ...props
}: ButtonProps) {
  const base = 'btn rounded font-semibold tracking-wide disabled:opacity-40 disabled:cursor-not-allowed'

  const variants: Record<string, string> = {
    'gold':         'btn-gold',
    'outline-gold': 'btn-outline-gold',
    'dark':         'btn-dark',
    'whatsapp':     'btn-whatsapp',
    'ghost':        'text-ink-muted hover:text-ink hover:bg-cream transition-colors',
  }

  const sizes: Record<string, string> = {
    sm: 'text-xs px-4 py-2.5 gap-1.5',
    md: 'text-sm px-6 py-3 gap-2',
    lg: 'text-sm px-8 py-4 gap-2.5',
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
