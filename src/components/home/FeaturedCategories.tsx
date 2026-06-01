'use client'

import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'
import { useLanguage } from '@/context/LanguageContext'
import { categories } from '@/data/products'
import SectionTitle from '@/components/ui/SectionTitle'

export default function FeaturedCategories() {
  const { t, lang, isRTL } = useLanguage()

  return (
    <section id="categories" className="section-padding bg-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <SectionTitle
          title={t.categories.title}
          subtitle={t.categories.subtitle}
          className="mb-12"
        />

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {categories.map((category, i) => (
            <Link
              key={category.id}
              href={`/shop?category=${category.id}`}
              className="group relative flex flex-col overflow-hidden rounded-2xl border border-dark-border hover:border-gold/30 transition-all duration-300 hover:-translate-y-1"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              {/* Image */}
              <div className="relative aspect-[3/4] overflow-hidden bg-dark-card">
                <Image
                  src={category.image}
                  alt={category.name[lang]}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                  sizes="(max-width: 768px) 50vw, 20vw"
                />
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-dark-deeper/90 via-dark-deeper/20 to-transparent" />

                {/* Icon */}
                <div className="absolute top-3 start-3 text-2xl filter drop-shadow-lg">
                  {category.icon}
                </div>

                {/* Info */}
                <div className="absolute bottom-0 start-0 end-0 p-4">
                  <h3 className="font-semibold text-white text-base mb-0.5 group-hover:text-gold transition-colors">
                    {category.name[lang]}
                  </h3>
                  <p className="text-xs text-white/50">
                    {category.count} {t.categories.products}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* View All */}
        <div className="text-center mt-10">
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 text-gold hover:text-gold-light transition-colors text-sm font-medium group"
          >
            {t.categories.viewAll}
            <ArrowRight
              size={16}
              className={`transition-transform group-hover:translate-x-1 ${isRTL ? 'rotate-180 group-hover:-translate-x-1 group-hover:translate-x-0' : ''}`}
            />
          </Link>
        </div>
      </div>
    </section>
  )
}
