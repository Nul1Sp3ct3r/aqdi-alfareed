'use client'

import { Product } from '@/types'
import { useLanguage } from '@/context/LanguageContext'
import ProductCard from './ProductCard'
import SectionTitle from '@/components/ui/SectionTitle'

interface RelatedProductsProps {
  products: Product[]
}

export default function RelatedProducts({ products }: RelatedProductsProps) {
  const { t } = useLanguage()

  if (products.length === 0) return null

  return (
    <section className="mt-20 pt-12 border-t border-dark-border">
      <SectionTitle
        title={t.product.relatedProducts}
        center={true}
        className="mb-10"
      />
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  )
}
