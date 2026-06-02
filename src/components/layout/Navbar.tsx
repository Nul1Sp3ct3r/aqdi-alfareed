'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ShoppingBag, Menu, X, Search, Globe } from 'lucide-react'
import { useLanguage } from '@/context/LanguageContext'
import { useCart } from '@/context/CartContext'
import CartDrawer from './CartDrawer'
import TopBar from './TopBar'

export default function Navbar() {
  const { t, lang, setLang, isRTL } = useLanguage()
  const { itemCount, openCart } = useCart()
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  // Split links for centered-logo desktop layout
  const startLinks = [
    { href: '/',       label: t.nav.home },
    { href: '/shop',   label: t.nav.shop },
    { href: '/about',  label: t.nav.about },
  ]
  const endLinks = [
    { href: '/shop?filter=bestsellers', label: t.nav.fineJewelry },
    { href: '/#tips',                   label: t.nav.tips },
    { href: '/contact',                 label: t.nav.contact },
  ]
  const allLinks = [...startLinks, ...endLinks]

  const navLinkClass =
    'text-[13px] text-ink-muted hover:text-ink transition-colors tracking-wide relative group font-medium whitespace-nowrap'

  return (
    <>
      <TopBar />

      <header
        className={`sticky top-0 z-40 transition-all duration-300 bg-white
          ${scrolled ? 'shadow-[0_2px_24px_rgba(0,0,0,0.08)]' : 'border-b border-[#E8DEC8]'}`}
      >
        <div className="container">
          {/* ── Desktop: 3-column centered-logo ─────────────── */}
          <div
            className="hidden lg:grid items-center h-[68px]"
            style={{ gridTemplateColumns: '1fr auto 1fr' }}
          >
            {/* Start nav */}
            <nav className="flex items-center gap-7 justify-start">
              {startLinks.map(l => (
                <Link key={l.href + l.label} href={l.href} className={navLinkClass}>
                  {l.label}
                  <span className="absolute -bottom-0.5 inset-x-0 h-[1.5px] bg-gold scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center" />
                </Link>
              ))}
            </nav>

            {/* Center logo */}
            <Link href="/" className="flex flex-col items-center px-10 group">
              <span className="text-[22px] font-display font-light tracking-[0.14em] text-gradient-gold leading-none">
                {isRTL ? 'عقدي الفريد' : 'Aqdi Alfareed'}
              </span>
              <span className="text-[8px] tracking-[0.35em] text-ink-faint uppercase font-light mt-0.5">
                {isRTL ? 'Aqdi Alfareed' : 'عقدي الفريد'}
              </span>
            </Link>

            {/* End nav + icons */}
            <div className="flex items-center justify-end gap-7">
              {endLinks.map(l => (
                <Link key={l.href + l.label} href={l.href} className={navLinkClass}>
                  {l.label}
                  <span className="absolute -bottom-0.5 inset-x-0 h-[1.5px] bg-gold scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center" />
                </Link>
              ))}

              <div className="flex items-center gap-0.5 ms-2 border-s border-[#E8DEC8] ps-5">
                <Link
                  href="/shop"
                  className="p-2 text-ink-muted hover:text-gold transition-colors rounded-full"
                  aria-label="Search"
                >
                  <Search size={18} strokeWidth={1.5} />
                </Link>
                <button
                  onClick={openCart}
                  className="relative p-2 text-ink-muted hover:text-gold transition-colors rounded-full"
                  aria-label={t.nav.cart}
                >
                  <ShoppingBag size={18} strokeWidth={1.5} />
                  {itemCount > 0 && (
                    <span className="absolute top-1 end-1 w-4 h-4 bg-gold text-white text-[9px] font-bold rounded-full flex items-center justify-center leading-none">
                      {itemCount > 9 ? '9+' : itemCount}
                    </span>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* ── Mobile bar ────────────────────────────────── */}
          <div className="flex lg:hidden items-center justify-between h-16">
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="p-2 text-ink-muted hover:text-ink transition-colors"
              aria-label="Menu"
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>

            <Link href="/" className="flex flex-col items-center">
              <span className="text-xl font-display font-light tracking-[0.14em] text-gradient-gold leading-none">
                {isRTL ? 'عقدي الفريد' : 'Aqdi Alfareed'}
              </span>
            </Link>

            <div className="flex items-center gap-1">
              <button
                onClick={() => setLang(lang === 'ar' ? 'en' : 'ar')}
                className="flex items-center gap-1 px-2 py-1.5 text-[11px] text-ink-muted hover:text-gold transition-colors rounded font-medium tracking-wider"
              >
                <Globe size={13} />
                {lang === 'ar' ? 'EN' : 'AR'}
              </button>
              <button
                onClick={openCart}
                className="relative p-2 text-ink-muted hover:text-gold transition-colors"
                aria-label={t.nav.cart}
              >
                <ShoppingBag size={19} strokeWidth={1.5} />
                {itemCount > 0 && (
                  <span className="absolute top-1 end-1 w-4 h-4 bg-gold text-white text-[9px] font-bold rounded-full flex items-center justify-center leading-none">
                    {itemCount > 9 ? '9+' : itemCount}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile drawer menu */}
        {mobileOpen && (
          <div className="lg:hidden bg-white border-t border-[#E8DEC8] animate-fade-in shadow-lg">
            <nav className="container py-5 flex flex-col gap-0.5">
              {allLinks.map(l => (
                <Link
                  key={l.href + l.label}
                  href={l.href}
                  onClick={() => setMobileOpen(false)}
                  className="py-3.5 px-4 text-ink-mid hover:text-gold hover:bg-cream rounded-lg text-sm transition-all font-medium"
                >
                  {l.label}
                </Link>
              ))}
              <div className="mt-3 pt-3 border-t border-[#E8DEC8] flex gap-3">
                <button
                  onClick={() => { setLang(lang === 'ar' ? 'en' : 'ar'); setMobileOpen(false) }}
                  className="flex-1 py-2.5 text-xs text-ink-muted border border-[#E8DEC8] rounded-lg hover:border-gold hover:text-gold transition-all tracking-wider"
                >
                  {lang === 'ar' ? 'English' : 'العربية'}
                </button>
                <Link
                  href="/admin"
                  onClick={() => setMobileOpen(false)}
                  className="flex-1 py-2.5 text-xs text-center text-gold border border-gold/30 rounded-lg hover:border-gold hover:bg-gold/5 transition-all"
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
