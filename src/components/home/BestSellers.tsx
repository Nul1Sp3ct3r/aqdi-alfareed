'use client'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { useLanguage } from '@/context/LanguageContext'
import { getBestSellers } from '@/data/products'
import ProductCard from '@/components/product/ProductCard'
import SectionTitle from '@/components/ui/SectionTitle'

export default function BestSellers() {
  const { t, isRTL } = useLanguage()
  const items = getBestSellers().slice(0, 4)

  return (
    <section className="section-y bg-ink-deep relative">
      <div className="absolute inset-x-0 top-0 h-px gold-rule" />

      {/* Ambient glow */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-96 h-96 rounded-full bg-gold/4 blur-[100px]" />
      </div>

      <div className="relative wrap">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
          <SectionTitle
            label={isRTL ? 'الأكثر طلباً' : 'Best Selling'}
            title={t.bestSellers.title}
            subtitle={t.bestSellers.subtitle}
            center={false}
          />
          <Link href="/shop?filter=bestsellers"
            className="flex items-center gap-2 text-gold/70 hover:text-gold transition-colors text-sm font-medium shrink-0 group"
          >
            {t.bestSellers.viewAll}
            <ArrowRight size={15} className={`transition-transform group-hover:translate-x-1 ${isRTL ? 'rotate-180' : ''}`} />
          </Link>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
          {items.map(p => <ProductCard key={p.id} product={p} />)}
        </div>
      </div>
    </section>
  )
}
