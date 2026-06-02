'use client'
import { Product } from '@/types'
import { useLanguage } from '@/context/LanguageContext'
import ProductCard from './ProductCard'

export default function RelatedProducts({ products }: { products: Product[] }) {
  const { t, isRTL } = useLanguage()
  if (!products.length) return null

  return (
    <section className="mt-10 pt-12" style={{ borderTop: '1px solid rgba(139,94,60,0.28)' }}>

      {/* Section header */}
      <div className="text-center mb-12">
        <div className="flex items-center justify-center gap-3 mb-3">
          <span className="h-px w-10 bg-[#B9922F] opacity-40" />
          <span className="text-[11px] font-bold text-[#B9922F] tracking-[0.26em] uppercase">
            {isRTL ? 'قد يعجبكِ أيضاً' : 'You May Also Like'}
          </span>
          <span className="h-px w-10 bg-[#B9922F] opacity-40" />
        </div>

        <h2
          className={`text-[1.7rem] md:text-[2rem] font-bold text-[#050505] leading-tight
            ${isRTL ? 'display-arabic' : 'display-serif'}`}
        >
          {t.product.relatedProducts}
        </h2>

        <div className="h-[2.5px] w-10 rounded-full bg-[#B9922F] mx-auto mt-4 opacity-60" />
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-5 sm:gap-6">
        {products.map(p => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>

    </section>
  )
}
