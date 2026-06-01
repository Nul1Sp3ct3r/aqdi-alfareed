'use client'
import { ButtonHTMLAttributes, ReactNode } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'gold' | 'outline-gold' | 'whatsapp' | 'ghost' | 'ink'
  size?: 'sm' | 'md' | 'lg'
  fullWidth?: boolean
  children: ReactNode
}

export default function Button({
  variant = 'gold', size = 'md', fullWidth = false,
  children, className = '', disabled, ...props
}: ButtonProps) {
  const base = 'btn rounded-xl font-semibold tracking-wide disabled:opacity-40 disabled:cursor-not-allowed select-none'

  const variants: Record<string, string> = {
    'gold':         'btn-gold',
    'outline-gold': 'btn-outline-gold',
    'whatsapp':     'btn-whatsapp',
    'ghost':        'text-white/50 hover:text-white hover:bg-white/5 transition-colors',
    'ink':          'bg-ink-lifted text-white/70 border border-ink-border hover:border-gold-border hover:text-gold transition-all',
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
