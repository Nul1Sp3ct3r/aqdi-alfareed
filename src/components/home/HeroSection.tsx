'use client'

import Link from 'next/link'
import { ChevronDown, Sparkles } from 'lucide-react'
import { useLanguage } from '@/context/LanguageContext'
import Button from '@/components/ui/Button'

export default function HeroSection() {
  const { t, isRTL } = useLanguage()

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-dark-deeper">
      {/* Animated gold orbs background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gold/5 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-gold/8 rounded-full blur-[100px] animate-pulse [animation-delay:1s]" />
        <div className="absolute top-2/3 left-1/2 w-64 h-64 bg-silver/5 rounded-full blur-[80px] animate-pulse [animation-delay:2s]" />
      </div>

      {/* Subtle grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(rgba(212,175,55,0.5) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(212,175,55,0.5) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
      />

      {/* Gold top border */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent" />

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center animate-slide-up">
        {/* Brand label */}
        <div className="inline-flex items-center gap-2 mb-8">
          <div className="h-px w-8 bg-gold/50" />
          <span className="text-xs tracking-[0.4em] text-gold/70 uppercase font-medium flex items-center gap-2">
            <Sparkles size={12} className="text-gold" />
            {isRTL ? 'عقدي الفريد' : 'Aqdi Alfareed'}
            <Sparkles size={12} className="text-gold" />
          </span>
          <div className="h-px w-8 bg-gold/50" />
        </div>

        {/* Main Title */}
        <h1 className={`text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight tracking-wide
          ${isRTL ? 'font-arabic' : 'font-serif'}`}
        >
          {t.hero.title.split(' ').map((word, i) => (
            <span
              key={i}
              className={word === 'أناقتك' || word === 'Elegance' ? 'text-gradient-gold' : ''}
            >
              {word}{' '}
            </span>
          ))}
        </h1>

        {/* Subtitle */}
        <p className="text-base sm:text-lg md:text-xl text-white/55 max-w-2xl mx-auto mb-10 leading-relaxed">
          {t.hero.subtitle}
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link href="/shop">
            <Button variant="gold" size="lg" className="min-w-[160px] shadow-[0_0_40px_rgba(212,175,55,0.3)]">
              {t.hero.shopNow}
            </Button>
          </Link>
          <Link href="/shop">
            <Button variant="outline-gold" size="lg" className="min-w-[160px]">
              {t.hero.exploreCollection}
            </Button>
          </Link>
        </div>

        {/* Trust indicators */}
        <div className="mt-16 flex flex-wrap justify-center gap-8">
          {[
            { value: isRTL ? '١٨ قيراط' : '18K Gold', label: isRTL ? 'ذهب خالص' : 'Pure Gold' },
            { value: isRTL ? '٩٢٥' : '925', label: isRTL ? 'فضة استرليني' : 'Sterling Silver' },
            { value: isRTL ? '١٤ يوم' : '14 Days', label: isRTL ? 'سياسة الإرجاع' : 'Return Policy' },
            { value: isRTL ? 'مجاني' : 'Free', label: isRTL ? 'توصيل مجاني' : 'Shipping' },
          ].map((item) => (
            <div key={item.value} className="text-center">
              <div className="text-gold font-bold text-lg font-serif">{item.value}</div>
              <div className="text-white/30 text-xs tracking-wider mt-0.5">{item.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <a
        href="#categories"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/30 hover:text-gold transition-colors group"
        aria-label={t.hero.scrollDown}
      >
        <span className="text-[10px] tracking-[0.3em] uppercase">{t.hero.scrollDown}</span>
        <ChevronDown size={18} className="animate-bounce" />
      </a>
    </section>
  )
}
