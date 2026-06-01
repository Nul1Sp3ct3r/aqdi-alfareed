'use client'
import Link from 'next/link'
import Image from 'next/image'
import { useLanguage } from '@/context/LanguageContext'
import { products } from '@/data/products'
import SectionTitle from '@/components/ui/SectionTitle'

export default function FeaturedCategories() {
  const { t, lang, isRTL } = useLanguage()

  // Earrings (first 4) and necklaces (first 4) from real products
  const earrings  = products.filter(p => p.category === 'earrings')
  const necklaces = products.filter(p => p.category === 'necklaces').slice(0, 4)

  const CollectionRow = ({
    titleAr, titleEn, subtitleAr, subtitleEn, items, href,
  }: {
    titleAr: string; titleEn: string; subtitleAr: string; subtitleEn: string
    items: typeof products; href: string
  }) => (
    <div className="mb-20 last:mb-0">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
        <div>
          <span className="label-gold block mb-3">{isRTL ? subtitleAr : subtitleEn}</span>
          <h2 className="display-serif text-3xl md:text-4xl text-white">{isRTL ? titleAr : titleEn}</h2>
          <div className="h-px w-10 bg-gradient-gold-h rounded-full mt-3" />
        </div>
        <Link href={href}
          className="text-sm text-gold/60 hover:text-gold transition-colors font-medium shrink-0"
        >
          {t.categories.viewAll} →
        </Link>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {items.map(product => (
          <Link key={product.id} href={`/product/${product.id}`}
            className="group relative overflow-hidden rounded-2xl bg-ink-card border border-white/5 hover:border-gold-border transition-all duration-400 hover:-translate-y-1"
            style={{ aspectRatio: '3/4' }}
          >
            <Image
              src={product.images[0]}
              alt={product.name[lang]}
              fill
              className="object-cover transition-transform duration-600 group-hover:scale-[1.07]"
              sizes="(max-width: 768px) 50vw, 25vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />
            <div className="absolute bottom-0 inset-x-0 p-4">
              <p className="text-white/85 text-sm font-medium leading-snug">{product.name[lang]}</p>
              <p className="text-gold text-sm font-bold mt-1">{product.price.toLocaleString()} <span className="text-2xs text-white/40">{t.common.sar}</span></p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )

  return (
    <section className="section-y-lg bg-ink relative">
      <div className="absolute inset-x-0 top-0 h-px gold-rule" />

      <div className="wrap">
        <CollectionRow
          titleAr="الأقراط"       titleEn="Earrings Collection"
          subtitleAr="التشكيلة"   subtitleEn="Collection"
          items={earrings}
          href="/shop?category=earrings"
        />
        <CollectionRow
          titleAr="العقود"        titleEn="Necklaces Collection"
          subtitleAr="التشكيلة"   subtitleEn="Collection"
          items={necklaces}
          href="/shop?category=necklaces"
        />
      </div>
    </section>
  )
}
