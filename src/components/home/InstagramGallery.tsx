'use client'

import { Instagram } from 'lucide-react'
import Image from 'next/image'
import { useLanguage } from '@/context/LanguageContext'
import SectionTitle from '@/components/ui/SectionTitle'

// CONNECT: Replace with real Instagram feed using Instagram Graph API
const galleryImages = [
  { id: 1, src: 'https://placehold.co/400x400/1a1a1a/d4af37', alt: 'Jewelry 1' },
  { id: 2, src: 'https://placehold.co/400x400/111111/c0c0c0', alt: 'Jewelry 2' },
  { id: 3, src: 'https://placehold.co/400x400/0d0d0d/d4af37', alt: 'Jewelry 3' },
  { id: 4, src: 'https://placehold.co/400x400/1a1a1a/e8c94d', alt: 'Jewelry 4' },
  { id: 5, src: 'https://placehold.co/400x400/111111/d4af37', alt: 'Jewelry 5' },
  { id: 6, src: 'https://placehold.co/400x400/0d0d0d/c0c0c0', alt: 'Jewelry 6' },
]

export default function InstagramGallery() {
  const { t, isRTL } = useLanguage()

  return (
    <section className="section-padding bg-dark-deeper">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <SectionTitle
          title={t.gallery.title}
          subtitle={t.gallery.subtitle}
          className="mb-10"
        />

        {/* Grid */}
        <div className="grid grid-cols-3 md:grid-cols-6 gap-2 md:gap-3">
          {galleryImages.map((img, i) => (
            <a
              key={img.id}
              href="#" // CONNECT: Link to your Instagram post
              className="group relative aspect-square overflow-hidden rounded-xl md:rounded-2xl"
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
                sizes="(max-width: 768px) 33vw, 17vw"
              />
              {/* Hover overlay */}
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <Instagram size={22} className="text-white" />
              </div>
            </a>
          ))}
        </div>

        {/* Instagram CTA */}
        <div className="text-center mt-8">
          {/* CONNECT: Replace # with your actual Instagram profile URL */}
          <a
            href="#"
            className="inline-flex items-center gap-3 px-6 py-3 rounded-full border border-dark-border hover:border-gold/30 text-white/60 hover:text-gold transition-all duration-200 text-sm font-medium group"
          >
            <Instagram size={18} />
            <span>{isRTL ? 'تابعينا على إنستغرام' : 'Follow us on Instagram'}</span>
            <span className="text-white/30">@aqdi.alfareed</span>
          </a>
        </div>
      </div>
    </section>
  )
}
