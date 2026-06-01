'use client'

import Link from 'next/link'
import { Instagram, Mail, MessageCircle, Heart } from 'lucide-react'
import { useLanguage } from '@/context/LanguageContext'
import { siteConfig } from '@/lib/config'

export default function Footer() {
  const { t, isRTL } = useLanguage()
  const year = new Date().getFullYear()

  const quickLinks = [
    { href: '/', label: t.nav.home },
    { href: '/shop', label: t.nav.shop },
    { href: '/shop?filter=new', label: t.nav.newArrivals },
    { href: '/shop?filter=bestsellers', label: t.nav.bestSellers },
  ]

  const serviceLinks = [
    { href: '#', label: t.footer.returnPolicy },
    { href: '#', label: t.footer.shipping },
    { href: '#', label: t.footer.privacyPolicy },
    { href: '#', label: t.footer.faq },
  ]

  return (
    <footer className="bg-dark-deeper border-t border-dark-border">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="inline-block mb-4">
              <div className="text-2xl font-serif text-gradient-gold tracking-wider">
                {isRTL ? 'عقدي الفريد' : 'Aqdi Alfareed'}
              </div>
              <div className="text-xs tracking-[0.3em] text-silver/50 uppercase mt-1">
                {isRTL ? 'Aqdi Alfareed' : 'عقدي الفريد'}
              </div>
            </Link>
            <p className="text-sm text-white/50 leading-relaxed mt-4 max-w-xs">
              {t.footer.aboutText}
            </p>

            {/* Social Icons — URLs come from NEXT_PUBLIC_* env vars via siteConfig */}
            <div className="flex gap-3 mt-6">
              <a
                href={siteConfig.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-dark-card border border-dark-border flex items-center justify-center text-white/40 hover:text-gold hover:border-gold/30 transition-all"
                aria-label="Instagram"
              >
                <Instagram size={16} />
              </a>
              <a
                href={siteConfig.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-dark-card border border-dark-border flex items-center justify-center text-white/40 hover:text-gold hover:border-gold/30 transition-all"
                aria-label="WhatsApp"
              >
                <MessageCircle size={16} />
              </a>
              <a
                href={`mailto:${siteConfig.contactEmail}`}
                className="w-9 h-9 rounded-full bg-dark-card border border-dark-border flex items-center justify-center text-white/40 hover:text-gold hover:border-gold/30 transition-all"
                aria-label="Email"
              >
                <Mail size={16} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold text-gold tracking-widest uppercase mb-5">
              {t.footer.quickLinks}
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/50 hover:text-gold transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/about" className="text-sm text-white/50 hover:text-gold transition-colors">
                  {t.nav.about}
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-sm text-white/50 hover:text-gold transition-colors">
                  {t.nav.contact}
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="text-sm font-semibold text-gold tracking-widest uppercase mb-5">
              {t.footer.customerService}
            </h3>
            <ul className="space-y-3">
              {serviceLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/50 hover:text-gold transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-sm font-semibold text-gold tracking-widest uppercase mb-5">
              {t.footer.newsletter}
            </h3>
            <p className="text-sm text-white/50 mb-4 leading-relaxed">
              {t.footer.newsletterText}
            </p>
            {/* CONNECT: Wire this form to your email marketing service (Mailchimp, etc.) */}
            <form
              onSubmit={(e) => e.preventDefault()}
              className="flex gap-2"
            >
              <input
                type="email"
                placeholder={t.footer.emailPlaceholder}
                className="input-luxury text-sm flex-1 py-2.5"
              />
              <button
                type="submit"
                className="btn-gold text-sm px-4 py-2.5 rounded-lg whitespace-nowrap"
              >
                {t.footer.subscribe}
              </button>
            </form>

            {/* Payment icons placeholder */}
            <div className="mt-6">
              <p className="text-xs text-white/30 mb-3 uppercase tracking-wider">Secure Payment</p>
              <div className="flex gap-2 flex-wrap">
                {['VISA', 'Mastercard', 'Mada', 'Apple Pay'].map((method) => (
                  <span
                    key={method}
                    className="px-2 py-1 bg-dark-card border border-dark-border rounded text-[10px] text-white/40 font-medium"
                  >
                    {method}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-dark-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-white/30">
            © {year} {isRTL ? 'عقدي الفريد' : 'Aqdi Alfareed'}. {t.footer.rights}
          </p>
          <p className="text-xs text-white/20 flex items-center gap-1">
            Made with <Heart size={11} className="text-red-500/60" /> in Saudi Arabia
          </p>
        </div>
      </div>
    </footer>
  )
}
