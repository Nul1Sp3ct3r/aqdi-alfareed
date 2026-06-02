import { ReactNode } from 'react'

interface BadgeProps {
  children: ReactNode
  variant?: 'gold' | 'silver' | 'new' | 'bestseller' | 'sale' | 'outline'
  className?: string
}

export default function Badge({ children, variant = 'gold', className = '' }: BadgeProps) {
  const variants: Record<string, string> = {
    gold:       'bg-gold text-white',
    silver:     'bg-[#888] text-white',
    new:        'bg-emerald-600 text-white',
    bestseller: 'bg-amber-600 text-white',
    sale:       'bg-red-600 text-white',
    outline:    'border border-gold text-gold bg-transparent',
  }

  return (
    <span className={`inline-flex items-center text-[10px] font-bold px-2 py-0.5 tracking-widest uppercase ${variants[variant]} ${className}`}>
      {children}
    </span>
  )
}
