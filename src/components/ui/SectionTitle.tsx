'use client'

import { useLanguage } from '@/context/LanguageContext'

interface SectionTitleProps {
  title: string
  subtitle?: string
  center?: boolean
  light?: boolean
  className?: string
}

export default function SectionTitle({
  title,
  subtitle,
  center = true,
  light = false,
  className = '',
}: SectionTitleProps) {
  const { isRTL } = useLanguage()

  return (
    <div className={`${center ? 'text-center' : isRTL ? 'text-right' : 'text-left'} ${className}`}>
      <h2
        className={`text-3xl md:text-4xl font-serif font-semibold tracking-wide mb-3
          ${light ? 'text-dark-deeper' : 'text-white'}`}
      >
        {title}
      </h2>

      {/* Gold underline accent */}
      <div className={`h-0.5 w-16 bg-gradient-gold rounded-full mb-4
        ${center ? 'mx-auto' : isRTL ? 'mr-0' : 'ml-0'}`}
      />

      {subtitle && (
        <p className={`text-base md:text-lg max-w-2xl ${center ? 'mx-auto' : ''} leading-relaxed
          ${light ? 'text-gray-600' : 'text-white/60'}`}>
          {subtitle}
        </p>
      )}
    </div>
  )
}
