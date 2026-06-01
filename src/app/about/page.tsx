'use client'

import { Shield, Gem, Sparkles, Users, Package, Award, Star } from 'lucide-react'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import SectionTitle from '@/components/ui/SectionTitle'
import { useLanguage } from '@/context/LanguageContext'

export default function AboutPage() {
  const { t, lang, isRTL } = useLanguage()

  const stats = [
    { value: '+500', label: t.about.happyCustomers, icon: Users },
    { value: '15+', label: t.about.products, icon: Package },
    { value: '3+', label: t.about.yearsExperience, icon: Award },
    { value: '4.9', label: t.about.rating, icon: Star },
  ]

  const values = [
    { key: 'quality', icon: Shield, title: t.about.quality, text: t.about.qualityText },
    { key: 'elegance', icon: Sparkles, title: t.about.elegance, text: t.about.eleganceText },
    { key: 'authenticity', icon: Gem, title: t.about.authenticity, text: t.about.authenticityText },
  ]

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-dark-deeper pt-20">
        {/* Hero */}
        <section className="relative py-24 bg-dark overflow-hidden">
          {/* Gold glow */}
          <div className="absolute top-0 bottom-0 start-0 end-0 pointer-events-none">
            <div className="absolute top-1/4 start-1/4 w-96 h-96 bg-gold/5 rounded-full blur-[100px]" />
            <div className="absolute bottom-1/4 end-1/4 w-64 h-64 bg-gold/5 rounded-full blur-[80px]" />
          </div>
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />

          <div className="relative max-w-4xl mx-auto px-4 sm:px-6 text-center">
            <div className="inline-flex items-center gap-2 mb-6">
              <div className="h-px w-8 bg-gold/50" />
              <span className="text-xs tracking-[0.4em] text-gold/70 uppercase">{t.about.title}</span>
              <div className="h-px w-8 bg-gold/50" />
            </div>
            <h1 className="text-4xl md:text-5xl font-serif text-white mb-6 leading-tight">
              {isRTL ? 'عقدي الفريد' : 'Aqdi Alfareed'}
            </h1>
            <div className="h-0.5 w-16 bg-gradient-gold rounded-full mx-auto mb-6" />
            <p className="text-lg text-white/60 leading-relaxed max-w-2xl mx-auto">
              {t.about.subtitle}
            </p>
          </div>
        </section>

        {/* Story */}
        <section className="section-padding">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              {/* Text */}
              <div>
                <h2 className="text-2xl md:text-3xl font-serif text-gold mb-6">{t.about.story}</h2>
                <div className="space-y-5">
                  <p className="text-white/65 leading-relaxed text-base">
                    {t.about.storyText1}
                  </p>
                  <p className="text-white/65 leading-relaxed text-base">
                    {t.about.storyText2}
                  </p>
                </div>
                <div className="mt-8 p-5 bg-dark-card rounded-2xl border border-gold/20">
                  <h3 className="font-semibold text-gold mb-2">{t.about.mission}</h3>
                  <p className="text-white/55 text-sm leading-relaxed">{t.about.missionText}</p>
                </div>
              </div>

              {/* Stats visual */}
              <div className="grid grid-cols-2 gap-4">
                {stats.map(({ value, label, icon: Icon }) => (
                  <div
                    key={label}
                    className="p-6 bg-dark-card rounded-2xl border border-dark-border hover:border-gold/25 transition-all duration-300 text-center group"
                  >
                    <div className="w-12 h-12 rounded-xl bg-gold/10 flex items-center justify-center mx-auto mb-3 group-hover:bg-gold/20 transition-colors">
                      <Icon size={22} className="text-gold" />
                    </div>
                    <div className="text-3xl font-bold text-gradient-gold mb-1">{value}</div>
                    <div className="text-xs text-white/40 tracking-wide">{label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="section-padding bg-dark">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <SectionTitle title={t.about.values} className="mb-12" />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {values.map(({ key, icon: Icon, title, text }) => (
                <div
                  key={key}
                  className="p-8 bg-dark-card rounded-2xl border border-dark-border hover:border-gold/25 transition-all duration-300 hover:-translate-y-1 text-center group"
                >
                  <div className="w-16 h-16 rounded-2xl bg-gold/10 flex items-center justify-center mx-auto mb-5 group-hover:bg-gold/20 transition-colors">
                    <Icon size={28} className="text-gold" />
                  </div>
                  <h3 className="font-semibold text-white text-lg mb-3 group-hover:text-gold transition-colors">{title}</h3>
                  <p className="text-white/50 text-sm leading-relaxed">{text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Gold quality banner */}
        <section className="py-16 bg-dark-deeper relative overflow-hidden">
          <div className="absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage: `repeating-linear-gradient(45deg, #D4AF37 0px, #D4AF37 1px, transparent 1px, transparent 12px)`,
            }}
          />
          <div className="relative max-w-3xl mx-auto px-4 sm:px-6 text-center">
            <div className="inline-flex items-center gap-3 px-8 py-4 rounded-full border border-gold/30 bg-gold/5">
              <Gem size={20} className="text-gold" />
              <span className="text-gold font-medium text-sm tracking-wide">
                {isRTL
                  ? 'جميع مجوهراتنا تأتي مع شهادة ضمان الأصالة'
                  : 'All our jewelry comes with an authenticity certificate'}
              </span>
              <Gem size={20} className="text-gold" />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
