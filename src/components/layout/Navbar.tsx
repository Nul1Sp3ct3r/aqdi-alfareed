'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ShoppingBag, Menu, X, Globe } from 'lucide-react'
import { useLanguage } from '@/context/LanguageContext'
import { useCart } from '@/context/CartContext'
import CartDrawer from './CartDrawer'

export default function Navbar() {
  const { t, lang, setLang, isRTL } = useLanguage()
  const { itemCount, openCart } = useCart()
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const links = [
    { href: '/',                     label: t.nav.home },
    { href: '/shop',                 label: t.nav.shop },
    { href: '/shop?filter=new',      label: t.nav.newArrivals },
    { href: '/shop?filter=bestsellers', label: t.nav.bestSellers },
    { href: '/about',                label: t.nav.about },
    { href: '/contact',              label: t.nav.contact },
  ]

  return (
    <>
      <header className={`fixed top-0 inset-x-0 z-40 transition-all duration-500
        ${scrolled
          ? 'bg-ink-deep/95 backdrop-blur-xl border-b border-ink-border shadow-[0_1px_0_rgba(212,175,55,0.12)]'
          : 'bg-transparent'
        }`}
      >
        {/* Top accent line */}
        {!scrolled && <div className="absolute top-0 inset-x-0 h-px bg-gradient-gold-h opacity-30" />}

        <div className="wrap flex items-center justify-between h-[72px]">
          {/* Logo */}
          <Link href="/" className="flex flex-col group shrink-0">
            <span className={`text-lg md:text-xl font-display font-light tracking-[0.12em] text-gradient-gold leading-none ${isRTL ? '' : 'font-serif'}`}>
              {isRTL ? 'عقدي الفريد' : 'Aqdi Alfareed'}
            </span>
            <span className="text-2xs tracking-[0.35em] text-white/25 uppercase mt-0.5 font-light">
              {isRTL ? 'Aqdi Alfareed' : 'عقدي الفريد'}
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-8">
            {links.map(link => (
              <Link key={link.href} href={link.href}
                className="text-[13px] text-white/55 hover:text-gold transition-colors duration-300 tracking-wide relative group"
              >
                {link.label}
                <span className="absolute -bottom-0.5 inset-x-0 h-px bg-gold scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center" />
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-1">
            {/* Language toggle */}
            <button
              onClick={() => setLang(lang === 'ar' ? 'en' : 'ar')}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-ink-border text-white/40 hover:text-gold hover:border-gold-border transition-all text-[11px] tracking-[0.2em] font-medium"
            >
              <Globe size={12} />
              {lang === 'ar' ? 'EN' : 'AR'}
            </button>

            {/* Cart */}
            <button
              onClick={openCart}
              className="relative p-2.5 text-white/50 hover:text-gold transition-colors rounded-full hover:bg-gold-subtle"
              aria-label={t.nav.cart}
            >
              <ShoppingBag size={19} strokeWidth={1.5} />
              {itemCount > 0 && (
                <span className="absolute top-1 end-1 w-4 h-4 bg-gold text-ink-deep text-[9px] font-bold rounded-full flex items-center justify-center leading-none">
                  {itemCount > 9 ? '9+' : itemCount}
                </span>
              )}
            </button>

            {/* Mobile toggle */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden p-2.5 text-white/50 hover:text-gold transition-colors rounded-full"
            >
              {mobileOpen ? <X size={20} strokeWidth={1.5} /> : <Menu size={20} strokeWidth={1.5} />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="lg:hidden bg-ink-deep/98 backdrop-blur-xl border-t border-ink-border animate-fade-in">
            <nav className="wrap py-6 flex flex-col gap-1">
              {links.map(link => (
                <Link key={link.href} href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="py-3 px-4 text-white/60 hover:text-gold hover:bg-gold-subtle rounded-xl text-sm transition-all"
                >
                  {link.label}
                </Link>
              ))}
              <div className="mt-4 pt-4 border-t border-ink-border flex gap-3">
                <button
                  onClick={() => { setLang(lang === 'ar' ? 'en' : 'ar'); setMobileOpen(false) }}
                  className="flex-1 py-2.5 text-xs text-white/40 border border-ink-border rounded-xl hover:border-gold-border hover:text-gold transition-all tracking-widest"
                >
                  {lang === 'ar' ? 'English' : 'العربية'}
                </button>
                <Link href="/admin" onClick={() => setMobileOpen(false)}
                  className="flex-1 py-2.5 text-xs text-center text-gold/50 border border-ink-border rounded-xl hover:border-gold-border hover:text-gold transition-all"
                >
                  {t.nav.admin}
                </Link>
              </div>
            </nav>
          </div>
        )}
      </header>

      <CartDrawer />
    </>
  )
}
