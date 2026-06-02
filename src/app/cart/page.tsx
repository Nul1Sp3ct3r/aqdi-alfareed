'use client'
import Link from 'next/link'
import Image from 'next/image'
import { ShoppingBag, Trash2, Plus, Minus, ArrowRight, Tag } from 'lucide-react'
import { useState } from 'react'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import { useCart } from '@/context/CartContext'
import { useLanguage } from '@/context/LanguageContext'

export default function CartPage() {
  const { items, removeFromCart, updateQuantity, subtotal, clearCart } = useCart()
  const { t, lang, isRTL } = useLanguage()
  const [promoCode, setPromoCode] = useState('')

  if (items.length === 0) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen bg-cream flex items-center justify-center">
          <div className="text-center max-w-sm mx-auto px-4 py-20">
            <div className="w-20 h-20 rounded-full bg-white border border-[#E8E2D6] flex items-center justify-center mx-auto mb-5 shadow-card">
              <ShoppingBag size={32} className="text-gold" strokeWidth={1.5} />
            </div>
            <h2 className="text-2xl display-serif text-ink mb-3">{t.cart.empty}</h2>
            <p className="text-ink-muted mb-8 text-sm">{t.cart.emptyText}</p>
            <Link href="/shop">
              <button className="btn btn-gold rounded px-8 py-4 text-sm tracking-wide">{t.cart.continueShopping}</button>
            </Link>
          </div>
        </main>
        <Footer />
      </>
    )
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-cream">
        <div className="bg-jet-deep py-10">
          <div className="container">
            <span className="label-luxury block mb-2">{isRTL ? 'مشترياتك' : 'Your Cart'}</span>
            <h1 className="display-serif text-3xl md:text-4xl text-white">{t.cart.title}</h1>
          </div>
        </div>

        <div className="container py-10">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Items */}
            <div className="lg:col-span-2 space-y-4">
              {items.map(item => (
                <div key={`${item.product.id}-${item.selectedSize}`}
                  className="flex gap-5 p-5 bg-white rounded-xl border border-[#E8E2D6] shadow-card"
                >
                  <Link href={`/product/${item.product.id}`}>
                    <div className="relative w-24 h-24 rounded-lg overflow-hidden bg-[#080808] shrink-0">
                      <Image src={item.product.images[0]} alt={item.product.name[lang]}
                        fill className="object-cover hover:scale-105 transition-transform duration-300" sizes="96px" />
                    </div>
                  </Link>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between gap-2">
                      <div>
                        <Link href={`/product/${item.product.id}`}>
                          <h3 className="font-medium text-ink hover:text-gold transition-colors">{item.product.name[lang]}</h3>
                        </Link>
                        {item.selectedSize && <p className="text-xs text-ink-muted mt-0.5">{t.product.size}: {item.selectedSize}</p>}
                        <p className="text-[11px] text-ink-muted mt-0.5 font-mono">{item.product.sku}</p>
                      </div>
                      <button onClick={() => removeFromCart(item.product.id)}
                        className="p-1.5 text-ink-muted hover:text-red-500 transition-colors rounded hover:bg-red-50 shrink-0">
                        <Trash2 size={16} />
                      </button>
                    </div>
                    <div className="flex items-center justify-between mt-4">
                      <div className="flex items-center border border-[#E8E2D6] rounded overflow-hidden">
                        <button onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          className="px-3 py-2 text-ink-muted hover:text-gold hover:bg-cream transition-colors"><Minus size={14} /></button>
                        <span className="px-4 text-sm font-medium text-ink">{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          className="px-3 py-2 text-ink-muted hover:text-gold hover:bg-cream transition-colors"><Plus size={14} /></button>
                      </div>
                      <div className="text-end">
                        <div className="text-gold font-bold">{(item.product.price * item.quantity).toLocaleString()} {t.common.sar}</div>
                        {item.quantity > 1 && <div className="text-xs text-ink-muted">{item.product.price.toLocaleString()} × {item.quantity}</div>}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              <div className="flex items-center justify-between pt-2">
                <Link href="/shop">
                  <button className={`btn btn-ghost text-sm gap-1.5 text-ink-muted`}>
                    <ArrowRight size={15} className={isRTL ? '' : 'rotate-180'} />
                    {t.cart.continueShopping}
                  </button>
                </Link>
                <button onClick={clearCart} className="text-sm text-ink-muted hover:text-red-500 transition-colors">
                  {lang === 'ar' ? 'إفراغ السلة' : 'Clear Cart'}
                </button>
              </div>
            </div>

            {/* Summary */}
            <div className="space-y-4">
              <div className="p-6 bg-white rounded-xl border border-[#E8E2D6] shadow-card">
                <h2 className="font-semibold text-ink text-lg mb-5 display-serif">{t.cart.orderTotal}</h2>
                <div className="space-y-3 mb-5">
                  <div className="flex justify-between text-sm text-ink-muted">
                    <span>{t.cart.subtotal}</span><span>{subtotal.toLocaleString()} {t.common.sar}</span>
                  </div>
                  <div className="flex justify-between text-sm text-ink-muted">
                    <span>{t.cart.shipping}</span><span className="text-emerald-600 font-medium">{t.cart.freeShipping}</span>
                  </div>
                </div>
                <div className="flex justify-between font-bold text-base pt-4 border-t border-[#E8E2D6] mb-6">
                  <span className="text-ink">{t.cart.orderTotal}</span>
                  <span className="text-gold text-xl">{subtotal.toLocaleString()} {t.common.sar}</span>
                </div>
                <Link href="/checkout">
                  <button className="btn btn-gold w-full py-4 rounded tracking-wide text-sm gap-2">
                    <ShoppingBag size={17} />{t.cart.checkout}
                  </button>
                </Link>
                <p className="text-center text-xs text-ink-muted mt-3">{t.cart.shippingNote}</p>
              </div>

              {/* Promo */}
              <div className="p-5 bg-white rounded-xl border border-[#E8E2D6]">
                <h3 className="text-sm font-medium text-ink mb-3 flex items-center gap-2">
                  <Tag size={15} className="text-gold" />{t.cart.promoCode}
                </h3>
                {/* CONNECT: Validate promo code against backend */}
                <div className="flex gap-2">
                  <input type="text" value={promoCode} onChange={e => setPromoCode(e.target.value)}
                    placeholder="AQDI2024" className="input-clean text-sm flex-1 py-2.5" />
                  <button className="btn btn-outline-gold text-xs px-4 py-2.5 rounded">{t.cart.apply}</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
