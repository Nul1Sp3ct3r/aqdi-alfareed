import { ReactNode } from 'react'

interface BadgeProps {
  children: ReactNode
  variant?: 'gold' | 'silver' | 'new' | 'bestseller' | 'sale' | 'dark'
  size?: 'sm' | 'md'
  className?: string
}

export default function Badge({ children, variant = 'gold', size = 'sm', className = '' }: BadgeProps) {
  const variants = {
    gold: 'bg-gold/15 text-gold border border-gold/30',
    silver: 'bg-silver/15 text-silver border border-silver/30',
    new: 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30',
    bestseller: 'bg-amber-500/15 text-amber-400 border border-amber-500/30',
    sale: 'bg-red-500/15 text-red-400 border border-red-500/30',
    dark: 'bg-dark-card text-white/60 border border-dark-border',
  }

  const sizes = {
    sm: 'text-xs px-2 py-0.5 rounded-full font-medium tracking-wide',
    md: 'text-sm px-3 py-1 rounded-full font-semibold tracking-wide',
  }

  return (
    <span className={`inline-flex items-center ${variants[variant]} ${sizes[size]} ${className}`}>
      {children}
    </span>
  )
}
