'use client'
import { useLanguage } from '@/context/LanguageContext'

interface SectionTitleProps {
  label?: string
  title: string
  subtitle?: string
  center?: boolean
  light?: boolean
  className?: string
}

export default function SectionTitle({ label, title, subtitle, center = true, light = false, className = '' }: SectionTitleProps) {
  const { isRTL } = useLanguage()
  const align = center ? 'text-center' : isRTL ? 'text-right' : 'text-left'

  return (
    <div className={`${align} ${className}`}>
      {label && <span className="label-luxury block mb-3">{label}</span>}
      <h2 className={`section-title display-serif ${light ? 'text-white' : 'text-ink'}`}>{title}</h2>
      <div className={`gold-rule-sm mt-3 mb-4 ${center ? 'mx-auto' : ''}`} />
      {subtitle && (
        <p className={`text-sm leading-relaxed max-w-xl ${center ? 'mx-auto' : ''} ${light ? 'text-white/60' : 'text-ink-muted'}`}>
          {subtitle}
        </p>
      )}
    </div>
  )
}
