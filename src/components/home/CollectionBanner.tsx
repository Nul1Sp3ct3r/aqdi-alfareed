'use client'
import Link from 'next/link'
import Image from 'next/image'
import { useLanguage } from '@/context/LanguageContext'

export default function CollectionBanner() {
  const { t, isRTL } = useLanguage()

  return (
    <section className="bg-white section-y">
      <div className="container">
        <div
          className="overflow-hidden grid grid-cols-1 md:grid-cols-2"
          style={{ minHeight: '420px' }}
        >
          {/* Image side */}
          <div
            className={`relative bg-[#050505] ${isRTL ? 'order-2 md:order-2' : 'order-1 md:order-1'}`}
            style={{ minHeight: '280px' }}
          >
            <Image
              src="/images/products/layered-necklace.jpg"
              alt={isRTL ? t.collection.bannerTitle : t.collection.bannerTitleEn}
              fill
              className="object-cover object-center opacity-80"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            {/* Gradient edge blend */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: isRTL
                  ? 'linear-gradient(to left, #111 0%, transparent 60%)'
                  : 'linear-gradient(to right, #111 0%, transparent 60%)',
              }}
            />
          </div>

          {/* Text side */}
          <div
            className={`bg-[#111] flex items-center ${isRTL ? 'order-1 md:order-1' : 'order-2 md:order-2'}`}
          >
            <div className={`p-10 md:p-14 lg:p-16 ${isRTL ? 'text-right' : 'text-left'} max-w-md w-full ${isRTL ? 'ms-auto' : 'me-auto'}`}>
              {/* Label */}
              <span className="label-luxury block mb-4">
                {isRTL ? 'عقدي الفريد' : 'Aqdi Alfareed'}
              </span>

              {/* Heading */}
              <h2
                className={`text-white font-bold leading-tight mb-5
                  ${isRTL
                    ? 'display-arabic text-[1.9rem] md:text-[2.4rem]'
                    : 'display-serif text-[1.9rem] md:text-[2.4rem]'
                  }`}
              >
                {isRTL ? t.collection.bannerTitle : t.collection.bannerTitleEn}
              </h2>

              {/* Gold rule */}
              <div className="h-px w-12 bg-gold mb-6 opacity-60" />

              {/* Sub */}
              <p className="text-white/50 text-sm leading-relaxed mb-8">
                {t.collection.bannerSub}
              </p>

              {/* CTA */}
              <Link
                href="/shop"
                className="btn btn-gold rounded-none px-9 py-3.5 text-[12px] tracking-[0.18em] uppercase font-semibold inline-flex"
              >
                {t.collection.shopNow}
              </Link>

              {/* Decorative dots */}
              <div className={`flex gap-1.5 mt-10 ${isRTL ? 'justify-end' : 'justify-start'}`}>
                {[1, 2, 3].map(i => (
                  <span
                    key={i}
                    className={`rounded-full ${i === 1 ? 'w-5 h-1.5 bg-gold' : 'w-1.5 h-1.5 bg-white/20'}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
