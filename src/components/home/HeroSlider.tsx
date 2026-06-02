'use client'
import { useState, useEffect, useCallback } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useLanguage } from '@/context/LanguageContext'

const slides = [
  {
    image: '/images/products/crescent-necklace.jpg',
    tagAr: 'تشكيلة جديدة',
    tagEn: 'New Collection',
    titleAr: 'أكبر مجموعة مجوهرات يمكن أن تراها',
    titleEn: 'Discover Timeless Jewelry Elegance',
    subtitleAr: 'اختاري من تشكيلات فاخرة من الفضة والذهب بتصاميم تناسب كل لحظة.',
    subtitleEn: 'Choose from luxury silver and gold collections designed for every occasion.',
  },
  {
    image: '/images/products/laurel-necklace.jpg',
    tagAr: 'الأكثر مبيعاً',
    tagEn: 'Best Sellers',
    titleAr: 'تصاميم حصرية لذوق رفيع',
    titleEn: 'Exclusive Designs for Refined Taste',
    subtitleAr: 'كل قطعة تُصنع بعناية لتُعبّر عن أناقتك وتبقى معك في كل لحظة.',
    subtitleEn: 'Every piece is crafted with care to express your elegance in every moment.',
  },
  {
    image: '/images/products/green-stone-earring.jpg',
    tagAr: 'أفكار هدايا',
    tagEn: 'Gift Ideas',
    titleAr: 'هدايا لا تُنسى لأحبائك',
    titleEn: 'Unforgettable Gifts for Loved Ones',
    subtitleAr: 'فاجئي من تحبّين بقطعة مجوهرات تحكي قصة الاهتمام والتميّز.',
    subtitleEn: 'Surprise your loved ones with jewelry that tells a story of care.',
  },
]

export default function HeroSlider() {
  const { t, isRTL } = useLanguage()
  const [current, setCurrent] = useState(0)
  const [transitioning, setTransitioning] = useState(false)

  const goTo = useCallback(
    (idx: number) => {
      if (transitioning) return
      setTransitioning(true)
      setCurrent(idx)
      setTimeout(() => setTransitioning(false), 700)
    },
    [transitioning]
  )

  const prev = () => goTo((current - 1 + slides.length) % slides.length)
  const next = () => goTo((current + 1) % slides.length)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent(c => (c + 1) % slides.length)
    }, 6000)
    return () => clearInterval(timer)
  }, [])

  const slide = slides[current]

  return (
    <div className="relative w-full overflow-hidden bg-[#050505]" style={{ height: 'clamp(380px, 72vh, 700px)' }}>
      {/* Slides */}
      {slides.map((s, i) => (
        <div
          key={i}
          className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${i === current ? 'opacity-100' : 'opacity-0'}`}
        >
          <Image
            src={s.image}
            alt={isRTL ? s.titleAr : s.titleEn}
            fill
            priority={i === 0}
            className="object-cover object-center"
            sizes="100vw"
          />
        </div>
      ))}

      {/* Dark gradient overlay — stronger on the text side */}
      <div
        className="absolute inset-0 z-10 pointer-events-none"
        style={{
          background: isRTL
            ? 'linear-gradient(to left, rgba(5,5,5,0.90) 38%, rgba(5,5,5,0.55) 70%, rgba(5,5,5,0.20) 100%)'
            : 'linear-gradient(to right, rgba(5,5,5,0.90) 38%, rgba(5,5,5,0.55) 70%, rgba(5,5,5,0.20) 100%)',
        }}
      />
      {/* Bottom fade */}
      <div className="absolute bottom-0 inset-x-0 h-24 z-10 pointer-events-none"
        style={{ background: 'linear-gradient(to top, rgba(5,5,5,0.55), transparent)' }}
      />

      {/* Content */}
      <div className="relative z-20 h-full container flex items-center">
        <div
          key={current}
          className={`max-w-[560px] animate-fade-up ${isRTL ? 'text-right' : 'text-left'}`}
        >
          {/* Tag pill */}
          <span className="inline-flex items-center gap-2 mb-6">
            <span className="h-px w-8 bg-gold opacity-60" />
            <span className="text-[11px] tracking-[0.25em] text-gold uppercase font-semibold">
              {isRTL ? slide.tagAr : slide.tagEn}
            </span>
          </span>

          {/* Main headline */}
          <h1
            className={`text-white font-bold leading-[1.15] mb-5
              ${isRTL
                ? 'display-arabic text-[2.2rem] sm:text-[2.8rem] lg:text-[3.4rem]'
                : 'display-serif text-[2rem] sm:text-[2.6rem] lg:text-[3.2rem]'
              }`}
          >
            {isRTL ? slide.titleAr : slide.titleEn}
          </h1>

          {/* Subtitle */}
          <p className="text-white/60 text-sm sm:text-base leading-relaxed mb-9 max-w-md">
            {isRTL ? slide.subtitleAr : slide.subtitleEn}
          </p>

          {/* CTA buttons */}
          <div
            className="flex flex-wrap gap-3"
            style={{ justifyContent: isRTL ? 'flex-end' : 'flex-start' }}
          >
            <Link
              href="/shop"
              className="btn btn-gold rounded-none px-8 py-3.5 text-[12px] tracking-[0.18em] uppercase font-semibold"
            >
              {t.hero.shopNow}
            </Link>
            <Link
              href="/shop"
              className="btn btn-outline-gold rounded-none px-8 py-3.5 text-[12px] tracking-[0.18em] uppercase font-semibold"
            >
              {t.hero.exploreCollection}
            </Link>
          </div>
        </div>
      </div>

      {/* Arrow buttons */}
      <button
        onClick={isRTL ? next : prev}
        className="absolute start-4 top-1/2 -translate-y-1/2 z-30 w-11 h-11 border border-white/25 bg-black/35 backdrop-blur-sm text-white/80 flex items-center justify-center hover:bg-white/15 hover:border-white/50 hover:text-white transition-all duration-200"
        aria-label="Previous"
      >
        <ChevronLeft size={20} />
      </button>
      <button
        onClick={isRTL ? prev : next}
        className="absolute end-4 top-1/2 -translate-y-1/2 z-30 w-11 h-11 border border-white/25 bg-black/35 backdrop-blur-sm text-white/80 flex items-center justify-center hover:bg-white/15 hover:border-white/50 hover:text-white transition-all duration-200"
        aria-label="Next"
      >
        <ChevronRight size={20} />
      </button>

      {/* Dot indicators */}
      <div className="absolute bottom-7 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            className={`transition-all duration-400 rounded-full ${
              i === current
                ? 'w-7 h-[5px] bg-gold'
                : 'w-[5px] h-[5px] bg-white/35 hover:bg-white/60'
            }`}
            aria-label={`Slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  )
}
