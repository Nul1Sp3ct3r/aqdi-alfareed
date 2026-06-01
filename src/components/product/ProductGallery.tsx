'use client'

import { useState } from 'react'
import Image from 'next/image'
import { ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react'
import { useLanguage } from '@/context/LanguageContext'

interface ProductGalleryProps {
  images: string[]
  productName: string
}

export default function ProductGallery({ images, productName }: ProductGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isZoomed, setIsZoomed] = useState(false)
  const { isRTL, t } = useLanguage()

  const prev = () => setActiveIndex(i => (i - 1 + images.length) % images.length)
  const next = () => setActiveIndex(i => (i + 1) % images.length)

  return (
    <div className="flex flex-col-reverse md:flex-row gap-4">
      {/* Thumbnails */}
      <div className="flex md:flex-col gap-3 overflow-x-auto md:overflow-y-auto md:max-h-[520px] no-scrollbar shrink-0">
        {images.map((img, i) => (
          <button
            key={i}
            onClick={() => setActiveIndex(i)}
            className={`relative w-16 h-16 md:w-20 md:h-20 rounded-xl overflow-hidden flex-shrink-0 transition-all duration-200 border-2
              ${activeIndex === i
                ? 'border-gold shadow-[0_0_0_2px_rgba(212,175,55,0.3)]'
                : 'border-dark-border hover:border-gold/40'
              }`}
          >
            <Image
              src={img}
              alt={`${productName} ${i + 1}`}
              fill
              className="object-cover"
              sizes="80px"
            />
          </button>
        ))}
      </div>

      {/* Main Image */}
      <div className="relative flex-1 aspect-square rounded-2xl overflow-hidden bg-dark-card group">
        <Image
          src={images[activeIndex]}
          alt={productName}
          fill
          priority
          className={`object-cover transition-transform duration-500 ${isZoomed ? 'scale-110 cursor-zoom-out' : 'cursor-zoom-in'}`}
          onClick={() => setIsZoomed(!isZoomed)}
          sizes="(max-width: 768px) 100vw, 50vw"
        />

        {/* Navigation arrows */}
        {images.length > 1 && (
          <>
            <button
              onClick={isRTL ? next : prev}
              className="absolute start-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/60 backdrop-blur-sm text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/80"
              aria-label="Previous"
            >
              <ChevronLeft size={20} className={isRTL ? 'rtl-flip' : ''} />
            </button>
            <button
              onClick={isRTL ? prev : next}
              className="absolute end-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/60 backdrop-blur-sm text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/80"
              aria-label="Next"
            >
              <ChevronRight size={20} className={isRTL ? 'rtl-flip' : ''} />
            </button>
          </>
        )}

        {/* Zoom icon */}
        <div className="absolute bottom-3 end-3 w-8 h-8 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity text-white/60">
          <ZoomIn size={15} />
        </div>

        {/* Dots indicator */}
        {images.length > 1 && (
          <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-1.5">
            {images.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveIndex(i)}
                className={`rounded-full transition-all duration-200
                  ${i === activeIndex ? 'w-4 h-1.5 bg-gold' : 'w-1.5 h-1.5 bg-white/30'}`}
                aria-label={`Image ${i + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
