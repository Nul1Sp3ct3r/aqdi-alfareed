'use client'

import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { useLanguage } from '@/context/LanguageContext'
import { getBestSellers } from '@/data/products'
import ProductCard from '@/components/product/ProductCard'
import SectionTitle from '@/components/ui/SectionTitle'

export default function BestSellers() {
  const { t, isRTL } = useLanguage()
  const bestSellers = getBestSellers().slice(0, 4)

  return (
    <section className="section-padding bg-dark-deeper">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-end justify-between mb-10">
          <SectionTitle
            title={t.bestSellers.title}
            subtitle={t.bestSellers.subtitle}
            center={false}
          />
          <Link
            href="/shop?filter=bestsellers"
            className="hidden sm:inline-flex items-center gap-2 text-gold hover:text-gold-light transition-colors text-sm font-medium group flex-shrink-0 mb-1"
          >
            {t.bestSellers.viewAll}
            <ArrowRight size={16} className={`transition-transform group-hover:translate-x-1 ${isRTL ? 'rotate-180' : ''}`} />
          </Link>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {bestSellers.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <div className="text-center mt-8 sm:hidden">
          <Link href="/shop?filter=bestsellers" className="inline-flex items-center gap-2 text-gold text-sm font-medium">
            {t.bestSellers.viewAll} <ArrowRight size={14} className={isRTL ? 'rotate-180' : ''} />
          </Link>
        </div>
      </div>
    </section>
  )
}
