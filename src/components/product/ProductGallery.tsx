'use client'
import { useState } from 'react'
import Image from 'next/image'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useLanguage } from '@/context/LanguageContext'

export default function ProductGallery({ images, productName }: { images: string[]; productName: string }) {
  const [active, setActive] = useState(0)
  const { isRTL } = useLanguage()
  const prev = () => setActive(i => (i - 1 + images.length) % images.length)
  const next = () => setActive(i => (i + 1) % images.length)

  return (
    <div className="flex flex-col-reverse md:flex-row gap-4">
      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="flex md:flex-col gap-3 overflow-x-auto md:overflow-y-auto md:max-h-[540px] no-scroll shrink-0">
          {images.map((img, i) => (
            <button key={i} onClick={() => setActive(i)}
              className={`relative w-16 h-16 md:w-20 md:h-20 rounded-xl overflow-hidden shrink-0 border-2 transition-all bg-ink-deep
                ${active === i ? 'border-gold shadow-gold-sm' : 'border-ink-border hover:border-gold/40'}`}
            >
              <Image src={img} alt={`${productName} ${i + 1}`} fill className="object-cover" sizes="80px" />
            </button>
          ))}
        </div>
      )}

      {/* Main image */}
      <div className="relative flex-1 overflow-hidden rounded-2xl bg-ink-deep group" style={{ aspectRatio: '3/4' }}>
        <Image
          src={images[active]} alt={productName} fill priority
          className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          sizes="(max-width: 768px) 100vw, 50vw"
        />

        {images.length > 1 && (
          <>
            <button onClick={isRTL ? next : prev}
              className="absolute start-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/60 backdrop-blur text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/80"
            >
              <ChevronLeft size={18} className={isRTL ? 'flip-rtl' : ''} />
            </button>
            <button onClick={isRTL ? prev : next}
              className="absolute end-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/60 backdrop-blur text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/80"
            >
              <ChevronRight size={18} className={isRTL ? 'flip-rtl' : ''} />
            </button>
          </>
        )}

        {/* Dot indicators */}
        {images.length > 1 && (
          <div className="absolute bottom-4 inset-x-0 flex justify-center gap-1.5">
            {images.map((_, i) => (
              <button key={i} onClick={() => setActive(i)}
                className={`rounded-full transition-all duration-300 ${i === active ? 'w-5 h-1.5 bg-gold' : 'w-1.5 h-1.5 bg-white/25'}`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
