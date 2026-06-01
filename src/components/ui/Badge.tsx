import { ReactNode } from 'react'

interface BadgeProps {
  children: ReactNode
  variant?: 'gold' | 'silver' | 'new' | 'bestseller' | 'sale' | 'ink'
  className?: string
}

export default function Badge({ children, variant = 'gold', className = '' }: BadgeProps) {
  const variants: Record<string, string> = {
    gold:       'bg-gold/10 text-gold border border-gold/25',
    silver:     'bg-silver/10 text-silver border border-silver/25',
    new:        'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20',
    bestseller: 'bg-amber-500/10 text-amber-400 border border-amber-500/20',
    sale:       'bg-red-500/10 text-red-400 border border-red-500/20',
    ink:        'bg-ink-lifted text-white/50 border border-ink-border',
  }

  return (
    <span className={`badge ${variants[variant]} ${className}`}>
      {children}
    </span>
  )
}
