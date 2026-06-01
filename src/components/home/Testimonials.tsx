'use client'

import { Star, Quote } from 'lucide-react'
import { useLanguage } from '@/context/LanguageContext'
import { testimonials } from '@/data/products'
import SectionTitle from '@/components/ui/SectionTitle'

export default function Testimonials() {
  const { t, lang } = useLanguage()

  return (
    <section className="section-padding bg-dark relative overflow-hidden">
      {/* Gold glow */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <SectionTitle
          title={t.testimonials.title}
          subtitle={t.testimonials.subtitle}
          className="mb-12"
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, i) => (
            <div
              key={testimonial.id}
              className="relative p-6 rounded-2xl bg-dark-card border border-dark-border hover:border-gold/25 transition-all duration-300 hover:-translate-y-1"
              style={{ animationDelay: `${i * 0.15}s` }}
            >
              {/* Quote icon */}
              <Quote className="absolute top-5 end-5 text-gold/15" size={36} />

              {/* Stars */}
              <div className="flex gap-0.5 mb-4">
                {[...Array(5)].map((_, j) => (
                  <Star
                    key={j}
                    size={14}
                    className={j < testimonial.rating ? 'text-gold fill-gold' : 'text-white/15'}
                  />
                ))}
              </div>

              {/* Comment */}
              <p className="text-sm text-white/65 leading-relaxed mb-5">
                {testimonial.comment[lang]}
              </p>

              {/* Author */}
              <div className="flex items-center gap-3 pt-4 border-t border-dark-border">
                <div className="w-9 h-9 rounded-full bg-gradient-gold flex items-center justify-center text-dark-deeper font-bold text-sm flex-shrink-0">
                  {testimonial.name.charAt(0)}
                </div>
                <div>
                  <div className="font-medium text-white text-sm">{testimonial.name}</div>
                  <div className="text-xs text-white/35">{testimonial.location[lang]}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Overall rating */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-dark-card border border-dark-border">
            <div className="flex gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={16} className="text-gold fill-gold" />
              ))}
            </div>
            <span className="text-white font-semibold text-sm">4.9</span>
            <span className="text-white/40 text-sm">·</span>
            <span className="text-white/50 text-sm">+500 {lang === 'ar' ? 'تقييم' : 'Reviews'}</span>
          </div>
        </div>
      </div>
    </section>
  )
}
