'use client'
import Link from 'next/link'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { useLanguage } from '@/context/LanguageContext'
import { getNewArrivals } from '@/data/products'
import ProductCard from '@/components/product/ProductCard'

export default function LatestProducts() {
  const { t, isRTL } = useLanguage()
  const items = getNewArrivals().slice(0, 4)

  return (
    <section className="section-y bg-cream">
      <div className="container">

        {/* ── Section header ─────────────────────────── */}
        <div
          className={`flex flex-col sm:flex-row sm:items-end justify-between gap-5 mb-12
            ${isRTL ? 'text-right' : 'text-left'}`}
        >
          <div>
            {/* Eyebrow label */}
            <div className="flex items-center gap-3 mb-3">
              {!isRTL && <span className="h-px w-8 bg-[#B9922F] opacity-50 flex-shrink-0" />}
              <span className="text-[11px] font-bold text-[#B9922F] tracking-[0.28em] uppercase">
                {t.latest.label}
              </span>
              {isRTL && <span className="h-px w-8 bg-[#B9922F] opacity-50 flex-shrink-0" />}
            </div>

            {/* Main title */}
            <h2
              className={`text-[1.8rem] md:text-[2.15rem] font-bold text-[#050505] leading-tight
                ${isRTL ? 'display-arabic' : 'display-serif'}`}
            >
              {isRTL ? t.latest.title : t.latest.titleEn}
            </h2>

            {/* Gold underline accent */}
            <div className="h-[2.5px] w-10 rounded-full bg-[#B9922F] mt-4 opacity-65" />
          </div>

          {/* View all link */}
          <Link
            href="/shop"
            className="group inline-flex items-center gap-2 text-[12.5px] font-bold text-[#B9922F] hover:text-[#D4AF37] transition-colors duration-200 shrink-0 pb-0.5 border-b border-[#B9922F]/30 hover:border-[#D4AF37]/50"
          >
            {t.latest.viewAll}
            {isRTL
              ? <ArrowLeft size={13} className="transition-transform duration-200 group-hover:-translate-x-1" />
              : <ArrowRight size={13} className="transition-transform duration-200 group-hover:translate-x-1" />
            }
          </Link>
        </div>

        {/* ── Product grid ───────────────────────────── */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
          {items.map((p, i) => (
            <ProductCard key={p.id} product={p} priority={i < 2} />
          ))}
        </div>

      </div>
    </section>
  )
}
