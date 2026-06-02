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
    <section className="section-y bg-white">
      <div className="container">
        {/* Section header */}
        <div className={`flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12 ${isRTL ? 'text-right' : 'text-left'}`}>
          <div>
            <span className="label-luxury block mb-3">{t.latest.label}</span>
            <h2 className={`text-[1.85rem] md:text-[2.2rem] font-bold text-ink leading-tight
              ${isRTL ? 'display-arabic' : 'display-serif'}`}>
              {isRTL ? t.latest.title : t.latest.titleEn}
            </h2>
            <div className="h-[2px] w-10 bg-gold mt-4 opacity-70" />
          </div>

          <Link
            href="/shop"
            className={`inline-flex items-center gap-2 text-sm font-semibold text-gold hover:text-[#D4AF37] transition-colors shrink-0 group`}
          >
            {t.latest.viewAll}
            {isRTL
              ? <ArrowLeft size={15} className="transition-transform group-hover:-translate-x-1" />
              : <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
            }
          </Link>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
          {items.map((p, i) => (
            <ProductCard key={p.id} product={p} priority={i < 2} />
          ))}
        </div>
      </div>
    </section>
  )
}
