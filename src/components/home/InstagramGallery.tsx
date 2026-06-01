'use client'
import Image from 'next/image'
import { Instagram } from 'lucide-react'
import { useLanguage } from '@/context/LanguageContext'
import { products } from '@/data/products'
import { siteConfig } from '@/lib/config'

export default function InstagramGallery() {
  const { t, lang, isRTL } = useLanguage()

  // Use all real product images for the gallery
  const galleryItems = products.slice(0, 9).map(p => ({
    src: p.images[0],
    alt: p.name[lang],
    id: p.id,
  }))

  return (
    <section className="section-y bg-ink relative">
      <div className="absolute inset-x-0 top-0 h-px gold-rule" />

      <div className="wrap">
        <div className="text-center mb-10">
          <span className="label-gold block mb-4">{t.gallery.title}</span>
          <p className="text-white/35 text-sm">{t.gallery.subtitle}</p>
        </div>

        {/* 3×3 product photo grid */}
        <div className="grid grid-cols-3 gap-2 md:gap-3 max-w-3xl mx-auto">
          {galleryItems.map((item, i) => (
            <a key={item.id} href={siteConfig.instagramUrl}
              target="_blank" rel="noopener noreferrer"
              className="group relative overflow-hidden rounded-xl md:rounded-2xl"
              style={{ aspectRatio: '1/1' }}
            >
              <Image
                src={item.src}
                alt={item.alt}
                fill
                className="object-cover transition-transform duration-600 group-hover:scale-[1.08]"
                sizes="(max-width: 768px) 33vw, 225px"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300 flex items-center justify-center">
                <Instagram size={22} className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            </a>
          ))}
        </div>

        {/* Instagram CTA */}
        <div className="text-center mt-8">
          <a href={siteConfig.instagramUrl} target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-6 py-3 rounded-full border border-ink-border hover:border-gold-border text-white/40 hover:text-gold transition-all text-sm font-medium"
          >
            <Instagram size={17} />
            <span>{isRTL ? 'تابعينا على إنستغرام' : 'Follow us on Instagram'}</span>
            <span className="text-white/20">@aqdi.alfareed</span>
          </a>
        </div>
      </div>
    </section>
  )
}
