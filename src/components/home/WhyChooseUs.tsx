'use client'
import { Shield, Truck, Gift, Headphones, Gem, Lock } from 'lucide-react'
import { useLanguage } from '@/context/LanguageContext'
import SectionTitle from '@/components/ui/SectionTitle'

const icons = { quality: Shield, shipping: Truck, packaging: Gift, support: Headphones, authentic: Gem, secure: Lock }

export default function WhyChooseUs() {
  const { t } = useLanguage()

  const features = [
    { key: 'quality'   as const, ...t.whyUs.quality },
    { key: 'shipping'  as const, ...t.whyUs.shipping },
    { key: 'packaging' as const, ...t.whyUs.packaging },
    { key: 'support'   as const, ...t.whyUs.support },
    { key: 'authentic' as const, ...t.whyUs.authentic },
    { key: 'secure'    as const, ...t.whyUs.secure },
  ]

  return (
    <section className="section-y-lg bg-ink relative overflow-hidden">
      <div className="absolute inset-x-0 top-0 h-px gold-rule" />

      {/* Background pattern */}
      <div className="absolute inset-0 grid-pattern pointer-events-none opacity-40" />

      <div className="relative wrap">
        <SectionTitle
          label="Aqdi Alfareed"
          title={t.whyUs.title}
          subtitle={t.whyUs.subtitle}
          className="mb-16"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map(({ key, title, desc }, i) => {
            const Icon = icons[key]
            return (
              <div key={key} className="group p-7 rounded-2xl bg-gradient-card border border-white/5 hover:border-gold-border transition-all duration-400 hover:-translate-y-1 hover:shadow-card-hover">
                <div className="w-12 h-12 rounded-2xl bg-gold-subtle border border-gold/15 flex items-center justify-center mb-5 group-hover:bg-gold/12 transition-colors">
                  <Icon size={21} className="text-gold" strokeWidth={1.5} />
                </div>
                <h3 className="font-semibold text-white mb-2.5 group-hover:text-gold transition-colors">{title}</h3>
                <p className="text-sm text-white/40 leading-relaxed">{desc}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
