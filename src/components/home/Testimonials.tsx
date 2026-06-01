'use client'
import { Star, Quote } from 'lucide-react'
import { useLanguage } from '@/context/LanguageContext'
import { testimonials } from '@/data/products'
import SectionTitle from '@/components/ui/SectionTitle'

export default function Testimonials() {
  const { t, lang } = useLanguage()

  return (
    <section className="section-y bg-ink-deep relative overflow-hidden">
      <div className="absolute inset-x-0 top-0 h-px gold-rule" />

      <div className="wrap">
        <SectionTitle
          label="Reviews"
          title={t.testimonials.title}
          subtitle={t.testimonials.subtitle}
          className="mb-14"
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {testimonials.map(review => (
            <div key={review.id}
              className="relative p-7 rounded-2xl bg-gradient-card border border-white/5 hover:border-gold-border transition-all duration-400 group"
            >
              <Quote className="absolute top-5 end-5 text-gold/10 group-hover:text-gold/20 transition-colors" size={40} />

              <div className="flex gap-0.5 mb-5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={14}
                    className={i < review.rating ? 'text-gold fill-gold' : 'text-white/10'}
                  />
                ))}
              </div>

              <p className="text-sm text-white/55 leading-relaxed mb-6 relative">
                &ldquo;{review.comment[lang]}&rdquo;
              </p>

              <div className="flex items-center gap-3 pt-5 border-t border-ink-border">
                <div className="w-9 h-9 rounded-full bg-gradient-gold flex items-center justify-center text-ink-deep font-bold text-sm shrink-0">
                  {review.name.charAt(0)}
                </div>
                <div>
                  <div className="text-white text-sm font-medium">{review.name}</div>
                  <div className="text-white/30 text-2xs">{review.location[lang]}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Overall rating */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-4 px-7 py-3.5 rounded-full bg-ink-card border border-ink-border">
            <div className="flex gap-0.5">
              {[...Array(5)].map((_, i) => <Star key={i} size={15} className="text-gold fill-gold" />)}
            </div>
            <span className="text-white font-semibold">4.9</span>
            <span className="h-4 w-px bg-ink-border" />
            <span className="text-white/35 text-sm">+{lang === 'ar' ? '٣٠٠' : '300'} {lang === 'ar' ? 'تقييم' : 'Reviews'}</span>
          </div>
        </div>
      </div>
    </section>
  )
}
