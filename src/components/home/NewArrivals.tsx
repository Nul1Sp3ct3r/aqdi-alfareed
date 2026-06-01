'use client'

import Link from 'next/link'
import { ArrowRight, Sparkles } from 'lucide-react'
import { useLanguage } from '@/context/LanguageContext'
import { getNewArrivals } from '@/data/products'
import ProductCard from '@/components/product/ProductCard'
import SectionTitle from '@/components/ui/SectionTitle'

export default function NewArrivals() {
  const { t, isRTL } = useLanguage()
  const newProducts = getNewArrivals().slice(0, 4)

  return (
    <section className="section-padding bg-dark relative overflow-hidden">
      {/* Gold accent top */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />

      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gold/3 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-end justify-between mb-10">
          <SectionTitle
            title={t.newArrivals.title}
            subtitle={t.newArrivals.subtitle}
            center={false}
          />
          <Link
            href="/shop?filter=new"
            className="hidden sm:inline-flex items-center gap-2 text-gold hover:text-gold-light transition-colors text-sm font-medium group flex-shrink-0 mb-1"
          >
            {t.newArrivals.viewAll}
            <ArrowRight size={16} className={`transition-transform group-hover:translate-x-1 ${isRTL ? 'rotate-180' : ''}`} />
          </Link>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {newProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <div className="text-center mt-8 sm:hidden">
          <Link href="/shop?filter=new" className="inline-flex items-center gap-2 text-gold text-sm font-medium">
            {t.newArrivals.viewAll} <ArrowRight size={14} className={isRTL ? 'rotate-180' : ''} />
          </Link>
        </div>
      </div>
    </section>
  )
}
