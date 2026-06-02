'use client'
import Image from 'next/image'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { useLanguage } from '@/context/LanguageContext'

const tipImages = [
  '/images/products/teardrop-necklace.jpg',
  '/images/products/geometric-earring.jpg',
  '/images/products/flower-necklace.jpg',
]

export default function TipsSection() {
  const { t, isRTL } = useLanguage()

  const tips = [
    { ...t.tips.tip1, image: tipImages[0] },
    { ...t.tips.tip2, image: tipImages[1] },
    { ...t.tips.tip3, image: tipImages[2] },
  ]

  return (
    <section id="tips" className="section-y bg-[#FAFAF8]">
      <div className="container">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="label-luxury block mb-3">{t.tips.label}</span>
          <h2 className={`text-[1.85rem] md:text-[2.2rem] font-bold text-ink leading-tight ${isRTL ? 'display-arabic' : 'display-serif'}`}>
            {isRTL ? t.tips.title : t.tips.titleEn}
          </h2>
          <div className="h-[2px] w-10 bg-gold mx-auto mt-4 opacity-70" />
          <p className="text-ink-muted text-sm mt-5 max-w-lg mx-auto leading-relaxed">
            {t.tips.subtitle}
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {tips.map((tip, i) => (
            <article key={i} className="group bg-white border border-[#E8E2D6] overflow-hidden transition-all duration-300 hover:shadow-[0_8px_36px_rgba(0,0,0,0.09)] hover:-translate-y-1">
              {/* Image */}
              <div className="relative overflow-hidden bg-[#080808]" style={{ aspectRatio: '4/3' }}>
                <Image
                  src={tip.image}
                  alt={tip.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.06]"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                {/* Top badge */}
                <div className={`absolute top-3.5 ${isRTL ? 'end-3.5' : 'start-3.5'}`}>
                  <span className="bg-gold text-white text-[9px] font-bold px-2.5 py-1 tracking-widest uppercase">
                    {isRTL ? 'نصائح' : 'Tips'}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <p className="text-[10px] text-gold font-semibold tracking-[0.2em] uppercase mb-3">
                  {isRTL ? 'مجوهرات' : 'Jewelry'}
                </p>
                <h3 className="font-bold text-ink text-[0.94rem] leading-snug mb-3 group-hover:text-gold transition-colors line-clamp-2">
                  {tip.title}
                </h3>
                <p className="text-ink-muted text-[0.82rem] leading-relaxed mb-5 line-clamp-2">
                  {tip.desc}
                </p>

                {/* Gold line */}
                <div className="h-px mb-5 opacity-25" style={{ background: 'linear-gradient(90deg, #B9922F, transparent)' }} />

                <button className={`flex items-center gap-2 text-[12px] font-semibold text-gold hover:text-[#D4AF37] transition-all group/btn`}>
                  {t.tips.readMore}
                  {isRTL
                    ? <ArrowLeft size={13} className="transition-transform group-hover/btn:-translate-x-1" />
                    : <ArrowRight size={13} className="transition-transform group-hover/btn:translate-x-1" />
                  }
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
