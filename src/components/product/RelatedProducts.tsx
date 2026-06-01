'use client'
import { Product } from '@/types'
import { useLanguage } from '@/context/LanguageContext'
import ProductCard from './ProductCard'

export default function RelatedProducts({ products }: { products: Product[] }) {
  const { t } = useLanguage()
  if (!products.length) return null

  return (
    <section className="mt-20 pt-12 border-t border-ink-border">
      <h2 className="display-serif text-2xl text-white mb-10 text-center">{t.product.relatedProducts}</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-5">
        {products.map(p => <ProductCard key={p.id} product={p} />)}
      </div>
    </section>
  )
}
