'use client'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { useLanguage } from '@/context/LanguageContext'
import { getNewArrivals } from '@/data/products'
import ProductCard from '@/components/product/ProductCard'
import SectionTitle from '@/components/ui/SectionTitle'

export default function NewArrivals() {
  const { t, isRTL } = useLanguage()
  const items = getNewArrivals().slice(0, 4)

  return (
    <section id="arrivals" className="section-y bg-ink-deep relative overflow-hidden">
      <div className="absolute inset-x-0 top-0 h-px gold-rule" />

      <div className="wrap">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
          <SectionTitle
            label={isRTL ? 'وصل حديثاً' : 'New Arrivals'}
            title={t.newArrivals.title}
            subtitle={t.newArrivals.subtitle}
            center={false}
          />
          <Link href="/shop?filter=new"
            className="flex items-center gap-2 text-gold/70 hover:text-gold transition-colors text-sm font-medium shrink-0 group"
          >
            {t.newArrivals.viewAll}
            <ArrowRight size={15} className={`transition-transform group-hover:translate-x-1 ${isRTL ? 'rotate-180 group-hover:-translate-x-1 group-hover:translate-x-0' : ''}`} />
          </Link>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
          {items.map((p, i) => <ProductCard key={p.id} product={p} priority={i < 2} />)}
        </div>
      </div>
    </section>
  )
}
