'use client'
import Link from 'next/link'
import { Instagram, Mail, MessageCircle, Heart } from 'lucide-react'
import { useLanguage } from '@/context/LanguageContext'
import { siteConfig } from '@/lib/config'

export default function Footer() {
  const { t, isRTL } = useLanguage()
  const year = new Date().getFullYear()

  const quickLinks = [
    { href: '/',                      label: t.nav.home },
    { href: '/shop',                  label: t.nav.shop },
    { href: '/shop?filter=new',       label: t.nav.newArrivals },
    { href: '/shop?filter=bestsellers', label: t.nav.bestSellers },
    { href: '/about',                 label: t.nav.about },
    { href: '/contact',               label: t.nav.contact },
  ]

  const serviceLinks = [
    { href: '#', label: t.footer.returnPolicy },
    { href: '#', label: t.footer.shipping },
    { href: '#', label: t.footer.privacyPolicy },
    { href: '#', label: t.footer.faq },
  ]

  return (
    <footer className="bg-ink-deep border-t border-ink-border">
      {/* Gold top line */}
      <div className="h-px bg-gradient-gold-h opacity-25" />

      <div className="wrap py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="inline-block mb-5">
              <div className="text-2xl font-display font-light text-gradient-gold tracking-[0.1em] leading-none">
                {isRTL ? 'عقدي الفريد' : 'Aqdi Alfareed'}
              </div>
              <div className="text-2xs tracking-[0.35em] text-white/20 uppercase mt-1.5">
                {isRTL ? 'Aqdi Alfareed' : 'عقدي الفريد'}
              </div>
            </Link>
            <p className="text-sm text-white/35 leading-relaxed max-w-xs">{t.footer.aboutText}</p>

            <div className="flex gap-3 mt-6">
              <a href={siteConfig.instagramUrl} target="_blank" rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-ink-lifted border border-ink-border flex items-center justify-center text-white/30 hover:text-gold hover:border-gold-border transition-all"
                aria-label="Instagram"
              >
                <Instagram size={15} strokeWidth={1.5} />
              </a>
              <a href={siteConfig.whatsappUrl} target="_blank" rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-ink-lifted border border-ink-border flex items-center justify-center text-white/30 hover:text-gold hover:border-gold-border transition-all"
                aria-label="WhatsApp"
              >
                <MessageCircle size={15} strokeWidth={1.5} />
              </a>
              <a href={`mailto:${siteConfig.contactEmail}`}
                className="w-9 h-9 rounded-full bg-ink-lifted border border-ink-border flex items-center justify-center text-white/30 hover:text-gold hover:border-gold-border transition-all"
                aria-label="Email"
              >
                <Mail size={15} strokeWidth={1.5} />
              </a>
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="label-gold mb-5">{t.footer.quickLinks}</h3>
            <ul className="space-y-3">
              {quickLinks.map(l => (
                <li key={l.href}>
                  <Link href={l.href} className="text-sm text-white/35 hover:text-gold transition-colors">{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Service */}
          <div>
            <h3 className="label-gold mb-5">{t.footer.customerService}</h3>
            <ul className="space-y-3">
              {serviceLinks.map(l => (
                <li key={l.href}>
                  <Link href={l.href} className="text-sm text-white/35 hover:text-gold transition-colors">{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="label-gold mb-5">{t.footer.newsletter}</h3>
            <p className="text-sm text-white/35 mb-4 leading-relaxed">{t.footer.newsletterText}</p>
            {/* CONNECT: Wire to Mailchimp / Resend */}
            <form onSubmit={e => e.preventDefault()} className="flex gap-2">
              <input type="email" placeholder={t.footer.emailPlaceholder} className="input-ink text-sm flex-1 py-2.5" />
              <button type="submit" className="btn btn-gold text-xs px-4 py-2.5 rounded-lg whitespace-nowrap">
                {t.footer.subscribe}
              </button>
            </form>

            <div className="mt-6">
              <p className="text-2xs text-white/20 mb-3 uppercase tracking-wider">Secure Payment</p>
              <div className="flex gap-2 flex-wrap">
                {['VISA', 'Mastercard', 'Mada', 'Apple Pay'].map(m => (
                  <span key={m} className="px-2 py-1 bg-ink-card border border-ink-border rounded text-[10px] text-white/25">{m}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-ink-border">
        <div className="wrap py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-white/20">
            © {year} {isRTL ? 'عقدي الفريد' : 'Aqdi Alfareed'}. {t.footer.rights}
          </p>
          <p className="text-xs text-white/15 flex items-center gap-1">
            Made with <Heart size={10} className="text-red-500/50 fill-red-500/50" /> in Saudi Arabia
          </p>
        </div>
      </div>
    </footer>
  )
}
