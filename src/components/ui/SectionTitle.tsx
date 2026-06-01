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
      {label && (
        <span className="label-gold block mb-4">{label}</span>
      )}
      <h2 className={`display-serif text-3xl md:text-4xl lg:text-5xl mb-4 ${light ? 'text-ink-deep' : 'text-white'}`}>
        {title}
      </h2>
      <div className={`h-px w-12 bg-gradient-gold-h rounded-full mb-5 ${center ? 'mx-auto' : isRTL ? '' : ''}`} />
      {subtitle && (
        <p className={`text-base leading-relaxed max-w-xl ${center ? 'mx-auto' : ''} ${light ? 'text-ink-lifted' : 'text-white/50'}`}>
          {subtitle}
        </p>
      )}
    </div>
  )
}
