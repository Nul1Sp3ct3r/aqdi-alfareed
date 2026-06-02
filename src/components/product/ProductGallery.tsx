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
  const [active, setActive] = useState(0)
  const { isRTL } = useLanguage()

  const prev = () => setActive(i => (i - 1 + images.length) % images.length)
  const next = () => setActive(i => (i + 1) % images.length)

  return (
    <div className="flex flex-col gap-3.5">

      {/* ── Main image ─────────────────────────────────── */}
      <div
        className="relative overflow-hidden rounded-2xl border border-[#EDE8DF] bg-[#0a0a0a] group"
        style={{
          aspectRatio: '4/5',
          boxShadow: '0 4px 32px rgba(0,0,0,0.10), 0 1px 4px rgba(0,0,0,0.06)',
        }}
      >
        {/* Current image */}
        {images.map((img, i) => (
          <div
            key={img}
            className={`absolute inset-0 transition-opacity duration-500 ${i === active ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
          >
            <Image
              src={img}
              alt={`${productName} ${i + 1}`}
              fill
              priority={i === 0}
              className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
              sizes="(max-width: 768px) 100vw, 52vw"
            />
          </div>
        ))}

        {/* Hover zoom hint */}
        <div className="absolute top-4 end-4 z-10 w-9 h-9 bg-white/85 backdrop-blur-sm rounded-full flex items-center justify-center shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
          <ZoomIn size={14} className="text-[#333]" />
        </div>

        {/* Gold corner frame — shows on hover */}
        <div className="absolute inset-4 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-400">
          <span className="absolute top-0 start-0 w-8 h-8 border-t border-s border-[#D4AF37]/50" />
          <span className="absolute top-0 end-0 w-8 h-8 border-t border-e border-[#D4AF37]/50" />
          <span className="absolute bottom-0 start-0 w-8 h-8 border-b border-s border-[#D4AF37]/50" />
          <span className="absolute bottom-0 end-0 w-8 h-8 border-b border-e border-[#D4AF37]/50" />
        </div>

        {/* Arrow navigation */}
        {images.length > 1 && (
          <>
            <button
              onClick={isRTL ? next : prev}
              aria-label="Previous image"
              className="absolute start-3 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-200 hover:bg-white hover:shadow-xl text-[#222]"
            >
              <ChevronLeft size={17} />
            </button>
            <button
              onClick={isRTL ? prev : next}
              aria-label="Next image"
              className="absolute end-3 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-200 hover:bg-white hover:shadow-xl text-[#222]"
            >
              <ChevronRight size={17} />
            </button>
          </>
        )}

        {/* Dot indicators */}
        {images.length > 1 && (
          <div className="absolute bottom-4 inset-x-0 flex justify-center gap-1.5 z-10">
            {images.map((_, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                aria-label={`Image ${i + 1}`}
                className={`rounded-full transition-all duration-300 ${
                  i === active
                    ? 'w-5 h-[5px] bg-[#D4AF37]'
                    : 'w-[5px] h-[5px] bg-white/45 hover:bg-white/70'
                }`}
              />
            ))}
          </div>
        )}
      </div>

      {/* ── Thumbnails ─────────────────────────────────── */}
      {images.length > 1 && (
        <div className="flex gap-3 overflow-x-auto no-scroll pb-0.5">
          {images.map((img, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              aria-label={`View image ${i + 1}`}
              className={`relative w-[72px] h-[72px] flex-shrink-0 rounded-xl overflow-hidden border-2 transition-all duration-200 bg-[#0a0a0a]
                ${active === i
                  ? 'border-[#B9922F] shadow-[0_0_0_3px_rgba(185,146,47,0.14)]'
                  : 'border-[#E8E2D6] opacity-65 hover:opacity-100 hover:border-[#B9922F]/45'
                }`}
            >
              <Image
                src={img}
                alt={`${productName} view ${i + 1}`}
                fill
                className="object-cover"
                sizes="72px"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
