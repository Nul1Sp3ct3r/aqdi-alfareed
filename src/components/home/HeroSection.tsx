'use client'
import Link from 'next/link'
import Image from 'next/image'
import { ChevronDown } from 'lucide-react'
import { useLanguage } from '@/context/LanguageContext'
import Button from '@/components/ui/Button'

export default function HeroSection() {
  const { t, isRTL } = useLanguage()

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-ink-deep">
      {/* Dot grid background */}
      <div className="absolute inset-0 dot-pattern opacity-60 pointer-events-none" />

      {/* Ambient gold glow */}
      <div className="absolute top-1/2 -translate-y-1/2 end-1/4 w-[600px] h-[600px] pointer-events-none">
        <div className="w-full h-full rounded-full bg-radial-gold opacity-60" />
      </div>

      {/* Top border */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-gold-h opacity-30" />

      <div className="relative wrap w-full pt-28 pb-16 md:pt-0">
        <div className={`flex flex-col ${isRTL ? 'md:flex-row-reverse' : 'md:flex-row'} items-center gap-12 md:gap-8 lg:gap-16`}>

          {/* Text side */}
          <div className={`flex-1 ${isRTL ? 'text-right' : 'text-left'} animate-fade-up`}>
            {/* Brand label */}
            <div className="flex items-center gap-3 mb-8" style={{ justifyContent: isRTL ? 'flex-end' : 'flex-start' }}>
              <div className="h-px w-10 bg-gold/50" />
              <span className="label-gold">{isRTL ? 'عقدي الفريد' : 'Aqdi Alfareed'}</span>
              <div className="h-px w-10 bg-gold/50" />
            </div>

            {/* Main headline */}
            <h1 className="mb-6 leading-none">
              {isRTL ? (
                <span className="display-arabic text-5xl sm:text-6xl lg:text-7xl text-white block">
                  مجوهرات <span className="text-gradient-gold">فاخرة</span>
                  <br />
                  تروي <span className="text-gradient-gold">أناقتك</span>
                </span>
              ) : (
                <span className="display-serif text-5xl sm:text-6xl lg:text-7xl text-white block">
                  Luxury <span className="text-gradient-gold italic">Jewelry</span>
                  <br />
                  <span className="text-white/80 text-4xl sm:text-5xl lg:text-6xl">That Tells Your</span>{' '}
                  <span className="text-gradient-gold">Elegance</span>
                </span>
              )}
            </h1>

            {/* Subtitle */}
            <p className="text-base md:text-lg text-white/45 leading-relaxed max-w-lg mb-10">
              {t.hero.subtitle}
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap gap-4" style={{ justifyContent: isRTL ? 'flex-end' : 'flex-start' }}>
              <Link href="/shop">
                <Button variant="gold" size="lg" className="shadow-gold-sm min-w-[150px]">
                  {t.hero.shopNow}
                </Button>
              </Link>
              <Link href="/shop">
                <Button variant="outline-gold" size="lg" className="min-w-[150px]">
                  {t.hero.exploreCollection}
                </Button>
              </Link>
            </div>

            {/* Trust bar */}
            <div className={`flex flex-wrap gap-6 mt-14 pt-10 border-t border-ink-border`}
              style={{ justifyContent: isRTL ? 'flex-end' : 'flex-start' }}
            >
              {[
                { v: isRTL ? 'فضة ٩٢٥' : '925', l: isRTL ? 'فضة خالصة' : 'Sterling Silver' },
                { v: isRTL ? 'مجاني'   : 'Free',  l: isRTL ? 'توصيل مجاني' : 'Delivery' },
                { v: isRTL ? '١٤ يوم'  : '14',    l: isRTL ? 'سياسة الإرجاع' : 'Day Returns' },
                { v: isRTL ? 'أصيلة'   : '100%',  l: isRTL ? 'ضمان الأصالة' : 'Authentic' },
              ].map(item => (
                <div key={item.v} className={isRTL ? 'text-right' : 'text-left'}>
                  <div className="text-gold font-bold text-xl font-serif">{item.v}</div>
                  <div className="text-white/30 text-2xs tracking-widest uppercase mt-0.5">{item.l}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Image side */}
          <div className="flex-shrink-0 w-full md:w-auto md:flex-1 flex justify-center items-center relative animate-fade-in">
            {/* Glow ring */}
            <div className="absolute inset-0 m-auto w-80 h-80 rounded-full bg-gold/8 blur-3xl" />

            {/* Product image */}
            <div className="relative w-72 sm:w-80 md:w-96 aspect-[3/4] rounded-3xl overflow-hidden glow-gold border border-gold/15 shadow-lift animate-float">
              <Image
                src="/images/products/crescent-necklace.jpg"
                alt={isRTL ? 'مجوهرات عقدي الفريد' : 'Aqdi Alfareed Jewelry'}
                fill
                priority
                className="object-cover"
                sizes="(max-width: 768px) 288px, 384px"
              />
              {/* Subtle inner vignette */}
              <div className="absolute inset-0 bg-gradient-to-t from-ink-deep/20 via-transparent to-transparent pointer-events-none" />
            </div>

            {/* Floating accent badge */}
            <div className={`absolute bottom-10 ${isRTL ? 'start-0 sm:start-4' : 'end-0 sm:end-4'} bg-ink-card/95 backdrop-blur border border-gold/20 rounded-2xl px-4 py-3 shadow-gold-sm`}>
              <div className="text-2xs text-white/40 tracking-widest uppercase mb-0.5">
                {isRTL ? 'فضة خالصة' : 'Sterling Silver'}
              </div>
              <div className="text-gold font-semibold text-sm">925 ✦</div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <a href="#arrivals"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/20 hover:text-gold transition-colors"
      >
        <span className="text-2xs tracking-widest uppercase">{t.hero.scrollDown}</span>
        <ChevronDown size={16} className="animate-bounce" />
      </a>
    </section>
  )
}
