'use client'
import Link from 'next/link'
import { Instagram, Mail, MessageCircle } from 'lucide-react'
import { useLanguage } from '@/context/LanguageContext'
import { siteConfig } from '@/lib/config'

export default function Footer() {
  const { t, isRTL } = useLanguage()
  const year = new Date().getFullYear()

  return (
    <footer className="bg-[#050505] text-white/60">
      {/* Gold accent top line */}
      <div className="h-[2px]" style={{ background: 'linear-gradient(90deg, #B9922F 0%, #D4AF37 50%, #B9922F 100%)' }} />

      <div className="container py-14 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-12">

          {/* Brand column */}
          <div className="lg:col-span-1">
            <Link href="/" className="inline-block mb-6">
              <div className="text-2xl font-display font-light text-gradient-gold tracking-[0.13em] leading-none">
                {isRTL ? 'عقدي الفريد' : 'Aqdi Alfareed'}
              </div>
              <div className="text-[9px] tracking-[0.35em] text-white/20 uppercase mt-1.5">
                {isRTL ? 'Aqdi Alfareed' : 'عقدي الفريد'}
              </div>
            </Link>

            <p className="text-sm leading-loose text-white/38 max-w-xs mb-7">
              {t.footer.aboutText}
            </p>

            {/* Social icons */}
            <div className="flex gap-2.5">
              {[
                { href: siteConfig.instagramUrl, icon: Instagram, label: 'Instagram' },
                { href: siteConfig.whatsappUrl,  icon: MessageCircle, label: 'WhatsApp' },
                { href: `mailto:${siteConfig.contactEmail}`, icon: Mail, label: 'Email' },
              ].map(({ href, icon: Icon, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 border border-white/12 flex items-center justify-center text-white/30 hover:text-gold hover:border-gold/50 transition-all duration-200"
                  aria-label={label}
                >
                  <Icon size={14} strokeWidth={1.5} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="text-[10px] tracking-[0.22em] uppercase text-gold font-bold mb-5">
              {t.footer.quickLinks}
            </h3>
            <ul className="space-y-3.5">
              {[
                { href: '/',        label: t.nav.home },
                { href: '/shop',    label: t.nav.shop },
                { href: '/about',   label: t.nav.about },
                { href: '/contact', label: t.nav.contact },
              ].map(l => (
                <li key={l.href}>
                  <Link href={l.href} className="text-sm text-white/38 hover:text-gold transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Collections */}
          <div>
            <h3 className="text-[10px] tracking-[0.22em] uppercase text-gold font-bold mb-5">
              {isRTL ? 'التشكيلات' : 'Collections'}
            </h3>
            <ul className="space-y-3.5">
              {[
                { href: '/shop?category=necklaces', label: isRTL ? 'القلائد' : 'Necklaces' },
                { href: '/shop?category=earrings',  label: isRTL ? 'الحلقان' : 'Earrings' },
                { href: '/shop?filter=new',         label: isRTL ? 'وصل حديثاً' : 'New Arrivals' },
                { href: '/shop?filter=bestsellers', label: isRTL ? 'الأكثر مبيعاً' : 'Best Sellers' },
              ].map(l => (
                <li key={l.href + l.label}>
                  <Link href={l.href} className="text-sm text-white/38 hover:text-gold transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-[10px] tracking-[0.22em] uppercase text-gold font-bold mb-5">
              {t.footer.newsletter}
            </h3>
            <p className="text-sm text-white/38 mb-5 leading-relaxed">
              {t.footer.newsletterText}
            </p>

            <form onSubmit={e => e.preventDefault()} className="flex gap-0">
              <input
                type="email"
                placeholder={t.footer.emailPlaceholder}
                className="flex-1 bg-white/5 border border-white/12 text-white placeholder:text-white/22 px-3.5 py-2.5 text-xs outline-none focus:border-gold/60 transition-colors min-w-0"
              />
              <button
                type="submit"
                className="btn btn-gold rounded-none text-[10px] px-4 py-2.5 tracking-[0.15em] uppercase shrink-0"
              >
                {t.footer.subscribe}
              </button>
            </form>

            {/* Payment methods */}
            <div className="mt-6">
              <p className="text-[9px] text-white/18 mb-2.5 uppercase tracking-widest">
                {isRTL ? 'طرق الدفع الآمنة' : 'Secure Payment'}
              </p>
              <div className="flex gap-2 flex-wrap">
                {['VISA', 'Mastercard', 'Mada', 'Apple Pay'].map(m => (
                  <span
                    key={m}
                    className="px-2.5 py-1 border border-white/10 text-[9px] text-white/22 tracking-wide"
                  >
                    {m}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/[0.07]">
        <div className="container py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-white/22">
            © {year} {isRTL ? 'عقدي الفريد' : 'Aqdi Alfareed'}. {t.footer.rights}
          </p>
          <div className="flex gap-5 text-xs text-white/22">
            <Link href="#" className="hover:text-gold transition-colors">{t.footer.privacyPolicy}</Link>
            <Link href="#" className="hover:text-gold transition-colors">{t.footer.returnPolicy}</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
