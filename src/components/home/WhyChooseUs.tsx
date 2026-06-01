'use client'

import { Shield, Truck, Gift, Headphones, Gem, Lock } from 'lucide-react'
import { useLanguage } from '@/context/LanguageContext'
import SectionTitle from '@/components/ui/SectionTitle'

const iconMap = {
  quality: Shield,
  shipping: Truck,
  packaging: Gift,
  support: Headphones,
  authentic: Gem,
  secure: Lock,
}

export default function WhyChooseUs() {
  const { t } = useLanguage()

  const features = [
    { key: 'quality' as const, ...t.whyUs.quality },
    { key: 'shipping' as const, ...t.whyUs.shipping },
    { key: 'packaging' as const, ...t.whyUs.packaging },
    { key: 'support' as const, ...t.whyUs.support },
    { key: 'authentic' as const, ...t.whyUs.authentic },
    { key: 'secure' as const, ...t.whyUs.secure },
  ]

  return (
    <section className="section-padding bg-dark-deeper relative">
      {/* Pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(rgba(212,175,55,0.8) 1px, transparent 1px)',
          backgroundSize: '30px 30px',
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
        <SectionTitle
          title={t.whyUs.title}
          subtitle={t.whyUs.subtitle}
          className="mb-14"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, i) => {
            const Icon = iconMap[feature.key]
            return (
              <div
                key={feature.key}
                className="group p-6 rounded-2xl bg-dark-card border border-dark-border hover:border-gold/25 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_15px_40px_rgba(212,175,55,0.08)]"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                {/* Icon */}
                <div className="w-12 h-12 rounded-xl bg-gold/10 flex items-center justify-center mb-4 group-hover:bg-gold/20 transition-colors">
                  <Icon size={22} className="text-gold" />
                </div>

                {/* Content */}
                <h3 className="font-semibold text-white mb-2 group-hover:text-gold transition-colors">
                  {feature.title}
                </h3>
                <p className="text-sm text-white/50 leading-relaxed">
                  {feature.desc}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
