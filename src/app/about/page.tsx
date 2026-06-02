'use client'
import { Shield, Gem, Sparkles, Users, Package, Award, Star } from 'lucide-react'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import { useLanguage } from '@/context/LanguageContext'

export default function AboutPage() {
  const { t, lang, isRTL } = useLanguage()

  const stats = [
    { value: '+500', label: t.about.happyCustomers, icon: Users },
    { value: '15+',  label: t.about.products,       icon: Package },
    { value: '3+',   label: t.about.yearsExperience, icon: Award },
    { value: '4.9',  label: t.about.rating,          icon: Star },
  ]

  const values = [
    { icon: Shield,   title: t.about.quality,     text: t.about.qualityText },
    { icon: Sparkles, title: t.about.elegance,     text: t.about.eleganceText },
    { icon: Gem,      title: t.about.authenticity, text: t.about.authenticityText },
  ]

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-cream">
        {/* Hero */}
        <div className="bg-jet-deep py-20">
          <div className="container text-center">
            <span className="label-luxury block mb-4">{isRTL ? 'قصتنا' : 'Our Story'}</span>
            <h1 className={`text-white font-bold leading-tight mb-4 ${isRTL ? 'display-arabic text-4xl sm:text-5xl' : 'display-serif text-4xl sm:text-5xl'}`}>
              {t.about.title}
            </h1>
            <div className="h-[2px] w-12 bg-gold mx-auto" />
          </div>
        </div>

        {/* Story */}
        <section className="section-y bg-white">
          <div className="container">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
              <div className={isRTL ? 'text-right' : 'text-left'}>
                <span className="label-luxury block mb-3">{t.about.story}</span>
                <h2 className="display-serif text-3xl text-ink mb-6">{isRTL ? 'عقدي الفريد' : 'Aqdi Alfareed'}</h2>
                <div className="space-y-4">
                  <p className="text-ink-muted leading-relaxed">{t.about.storyText1}</p>
                  <p className="text-ink-muted leading-relaxed">{t.about.storyText2}</p>
                </div>
                <div className="mt-8 p-5 bg-cream rounded-xl border border-[#E8E2D6]">
                  <h3 className="font-semibold text-gold mb-2">{t.about.mission}</h3>
                  <p className="text-ink-muted text-sm leading-relaxed">{t.about.missionText}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {stats.map(({ value, label, icon: Icon }) => (
                  <div key={label} className="p-6 bg-white border border-[#E8E2D6] rounded-xl text-center shadow-card hover:shadow-card-hover hover:-translate-y-1 transition-all group">
                    <div className="w-12 h-12 rounded-xl bg-gold/10 flex items-center justify-center mx-auto mb-3 group-hover:bg-gold/20 transition-colors">
                      <Icon size={22} className="text-gold" strokeWidth={1.5} />
                    </div>
                    <div className="text-3xl font-bold text-gold mb-1">{value}</div>
                    <div className="text-xs text-ink-muted">{label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="section-y bg-cream">
          <div className="container">
            <div className="text-center mb-12">
              <span className="label-luxury block mb-3">{t.about.values}</span>
              <h2 className="display-serif text-3xl text-ink">{t.about.values}</h2>
              <div className="gold-rule-sm mx-auto mt-3" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {values.map(({ icon: Icon, title, text }) => (
                <div key={title} className="p-8 bg-white rounded-xl border border-[#E8E2D6] text-center shadow-card hover:shadow-card-hover hover:-translate-y-1 transition-all group">
                  <div className="w-14 h-14 rounded-2xl bg-gold/10 flex items-center justify-center mx-auto mb-5 group-hover:bg-gold/20 transition-colors">
                    <Icon size={24} className="text-gold" strokeWidth={1.5} />
                  </div>
                  <h3 className="font-semibold text-ink text-lg mb-3">{title}</h3>
                  <p className="text-ink-muted text-sm leading-relaxed">{text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
