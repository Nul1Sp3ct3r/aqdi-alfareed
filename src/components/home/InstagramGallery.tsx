'use client'
import Image from 'next/image'
import { Instagram } from 'lucide-react'
import { useLanguage } from '@/context/LanguageContext'
import { products } from '@/data/products'
import { siteConfig } from '@/lib/config'

export default function InstagramGallery() {
  const { isRTL } = useLanguage()

  // 9-cell grid — index 4 (center) is the Instagram promo card
  const imgSlots = [0, 1, 2, 3, null, 4, 5, 6, 7]
  const imgProducts = products.slice(0, 8)

  return (
    <section className="section-y bg-white">
      <div className="container">
        {/* Header */}
        <div className="text-center mb-10">
          <span className="label-luxury block mb-3">
            {isRTL ? 'تابعينا' : 'Follow Us'}
          </span>
          <h2 className={`text-[1.85rem] md:text-[2.2rem] font-bold text-ink leading-tight ${isRTL ? 'display-arabic' : 'display-serif'}`}>
            {isRTL ? 'معرض الصور' : 'Photo Gallery'}
          </h2>
          <div className="h-[2px] w-10 bg-gold mx-auto mt-4 opacity-70" />
        </div>

        {/* 3×3 grid */}
        <div className="grid grid-cols-3 gap-1.5 md:gap-2 max-w-[780px] mx-auto">
          {imgSlots.map((productIdx, i) => {
            if (productIdx === null) {
              // Center Instagram promo card
              return (
                <a
                  key="insta-card"
                  href={siteConfig.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center justify-center gap-3 bg-[#0d0d0d] text-white aspect-square hover:bg-[#1a1a1a] transition-colors group"
                >
                  <Instagram size={26} className="text-gold" />
                  <div className="text-center px-2">
                    <p className="text-xs font-bold tracking-[0.2em] uppercase text-white/90">Instagram</p>
                    <p className="text-[11px] text-white/45 mt-0.5 tracking-wide">@aqdi_alfareed</p>
                  </div>
                  <span className="text-[10px] px-4 py-1.5 border border-gold/60 text-gold tracking-widest uppercase hover:bg-gold hover:text-white transition-colors group-hover:bg-gold group-hover:text-white">
                    {isRTL ? 'متابعة' : 'Follow'}
                  </span>
                </a>
              )
            }

            const product = imgProducts[productIdx]
            if (!product) {
              return <div key={i} className="aspect-square bg-[#FAFAF8]" />
            }

            return (
              <a
                key={i}
                href={siteConfig.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="relative aspect-square bg-[#080808] overflow-hidden group"
              >
                <Image
                  src={product.images[0]}
                  alt={product.name.ar}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.08]"
                  sizes="(max-width: 768px) 33vw, 240px"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/35 transition-colors duration-300 flex items-center justify-center">
                  <Instagram
                    size={22}
                    className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  />
                </div>
              </a>
            )
          })}
        </div>
      </div>
    </section>
  )
}
