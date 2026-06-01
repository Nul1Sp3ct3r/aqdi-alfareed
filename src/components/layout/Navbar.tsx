'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ShoppingBag, Menu, X, Search, Heart } from 'lucide-react'
import { useLanguage } from '@/context/LanguageContext'
import { useCart } from '@/context/CartContext'
import CartDrawer from './CartDrawer'

export default function Navbar() {
  const { t, lang, setLang, isRTL } = useLanguage()
  const { itemCount, openCart } = useCart()
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileOpen, setIsMobileOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileOpen(false)
  }, [])

  const navLinks = [
    { href: '/', label: t.nav.home },
    { href: '/shop', label: t.nav.shop },
    { href: '/shop?filter=new', label: t.nav.newArrivals },
    { href: '/shop?filter=bestsellers', label: t.nav.bestSellers },
    { href: '/about', label: t.nav.about },
    { href: '/contact', label: t.nav.contact },
  ]

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300
          ${isScrolled
            ? 'bg-dark-deeper/95 backdrop-blur-md border-b border-dark-border shadow-2xl'
            : 'bg-transparent'
          }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-18 py-4">

            {/* Logo */}
            <Link href="/" className="flex flex-col leading-none group">
              <span className="text-xl md:text-2xl font-serif text-gradient-gold tracking-wider group-hover:opacity-90 transition-opacity">
                {isRTL ? 'عقدي الفريد' : 'Aqdi Alfareed'}
              </span>
              <span className="text-[10px] tracking-[0.25em] text-silver/60 uppercase font-light mt-0.5">
                {isRTL ? 'Aqdi Alfareed' : 'عقدي الفريد'}
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-7">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm text-white/70 hover:text-gold transition-colors duration-200 tracking-wide relative group"
                >
                  {link.label}
                  <span className="absolute -bottom-0.5 left-0 right-0 h-px bg-gold scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-center" />
                </Link>
              ))}
            </nav>

            {/* Right Actions */}
            <div className="flex items-center gap-2 md:gap-3">
              {/* Language Switcher */}
              <button
                onClick={() => setLang(lang === 'ar' ? 'en' : 'ar')}
                className="hidden sm:flex items-center gap-1.5 text-xs text-white/60 hover:text-gold transition-colors px-3 py-1.5 rounded-full border border-dark-border hover:border-gold/30 font-medium tracking-widest"
                aria-label="Switch language"
              >
                {lang === 'ar' ? 'EN' : 'عربي'}
              </button>

              {/* Search */}
              <Link
                href="/shop"
                className="p-2 text-white/60 hover:text-gold transition-colors rounded-full hover:bg-dark-card"
                aria-label={t.common.search}
              >
                <Search size={19} />
              </Link>

              {/* Wishlist - placeholder */}
              <Link
                href="#"
                className="hidden sm:flex p-2 text-white/60 hover:text-gold transition-colors rounded-full hover:bg-dark-card"
                aria-label={t.nav.wishlist}
              >
                <Heart size={19} />
              </Link>

              {/* Cart */}
              <button
                onClick={openCart}
                className="relative p-2 text-white/60 hover:text-gold transition-colors rounded-full hover:bg-dark-card"
                aria-label={t.nav.cart}
              >
                <ShoppingBag size={20} />
                {itemCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 w-4.5 h-4.5 bg-gold text-dark-deeper text-[9px] font-bold rounded-full flex items-center justify-center min-w-[18px] min-h-[18px] leading-none">
                    {itemCount > 9 ? '9+' : itemCount}
                  </span>
                )}
              </button>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileOpen(!isMobileOpen)}
                className="lg:hidden p-2 text-white/70 hover:text-gold transition-colors rounded-full hover:bg-dark-card"
                aria-label="Menu"
              >
                {isMobileOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileOpen && (
          <div className="lg:hidden bg-dark-deeper/98 backdrop-blur-md border-t border-dark-border animate-fade-in">
            <nav className="max-w-7xl mx-auto px-4 py-6 flex flex-col gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMobileOpen(false)}
                  className="py-3 px-4 text-white/70 hover:text-gold hover:bg-dark-card rounded-lg transition-all duration-200 text-base tracking-wide"
                >
                  {link.label}
                </Link>
              ))}
              <div className="mt-4 pt-4 border-t border-dark-border flex items-center gap-3">
                <button
                  onClick={() => { setLang(lang === 'ar' ? 'en' : 'ar'); setIsMobileOpen(false) }}
                  className="flex-1 py-2.5 text-sm text-white/60 hover:text-gold transition-colors rounded-lg border border-dark-border hover:border-gold/30 font-medium tracking-widest"
                >
                  {lang === 'ar' ? 'English' : 'العربية'}
                </button>
                <Link
                  href="/admin"
                  onClick={() => setIsMobileOpen(false)}
                  className="flex-1 py-2.5 text-sm text-center text-gold/70 hover:text-gold transition-colors rounded-lg border border-dark-border hover:border-gold/30"
                >
                  {t.nav.admin}
                </Link>
              </div>
            </nav>
          </div>
        )}
      </header>

      {/* Cart Drawer */}
      <CartDrawer />
    </>
  )
}
