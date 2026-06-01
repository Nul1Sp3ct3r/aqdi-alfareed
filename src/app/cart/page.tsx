'use client'

import Link from 'next/link'
import Image from 'next/image'
import { ShoppingBag, Trash2, Plus, Minus, ArrowRight, Tag } from 'lucide-react'
import { useState } from 'react'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Button from '@/components/ui/Button'
import { useCart } from '@/context/CartContext'
import { useLanguage } from '@/context/LanguageContext'

export default function CartPage() {
  const { items, removeFromCart, updateQuantity, subtotal, clearCart } = useCart()
  const { t, lang, isRTL } = useLanguage()
  const [promoCode, setPromoCode] = useState('')

  const shippingCost = 0 // Free shipping always
  const total = subtotal + shippingCost

  if (items.length === 0) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen bg-dark-deeper pt-20 flex items-center justify-center">
          <div className="text-center max-w-sm mx-auto px-4 py-20">
            <div className="w-24 h-24 rounded-full bg-dark-card border border-dark-border flex items-center justify-center mx-auto mb-6">
              <ShoppingBag size={36} className="text-white/20" />
            </div>
            <h2 className="text-2xl font-serif text-white mb-3">{t.cart.empty}</h2>
            <p className="text-white/40 mb-8">{t.cart.emptyText}</p>
            <Link href="/shop">
              <Button variant="gold" size="lg">
                {t.cart.continueShopping}
              </Button>
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
      <main className="min-h-screen bg-dark-deeper pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
          <h1 className="text-3xl font-serif text-white mb-8">
            {t.cart.title}
            <span className="text-white/30 text-lg font-sans ms-3">({items.length} {t.cart.items})</span>
          </h1>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {items.map(item => (
                <div
                  key={`${item.product.id}-${item.selectedSize}`}
                  className="flex gap-5 p-5 bg-dark-card rounded-2xl border border-dark-border hover:border-gold/20 transition-colors"
                >
                  {/* Image */}
                  <Link href={`/product/${item.product.id}`}>
                    <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-xl overflow-hidden bg-dark-muted flex-shrink-0">
                      <Image
                        src={item.product.images[0]}
                        alt={item.product.name[lang]}
                        fill
                        className="object-cover hover:scale-105 transition-transform duration-300"
                        sizes="112px"
                      />
                    </div>
                  </Link>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between gap-2">
                      <div>
                        <Link href={`/product/${item.product.id}`}>
                          <h3 className="font-medium text-white hover:text-gold transition-colors">
                            {item.product.name[lang]}
                          </h3>
                        </Link>
                        {item.selectedSize && (
                          <p className="text-sm text-white/40 mt-0.5">
                            {t.product.size}: {item.selectedSize}
                          </p>
                        )}
                        <p className="text-xs text-white/30 mt-0.5 uppercase tracking-wide">
                          {item.product.sku}
                        </p>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.product.id)}
                        className="p-1.5 text-white/25 hover:text-red-400 transition-colors rounded-lg hover:bg-red-500/10 flex-shrink-0"
                        aria-label={t.cart.remove}
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>

                    <div className="flex items-center justify-between mt-4">
                      {/* Quantity */}
                      <div className="flex items-center gap-1 bg-dark-deeper rounded-lg border border-dark-border overflow-hidden">
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          className="px-3 py-2 text-white/50 hover:text-white hover:bg-dark-card transition-colors"
                        >
                          <Minus size={14} />
                        </button>
                        <span className="px-3 py-2 text-white font-medium text-sm min-w-[40px] text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          className="px-3 py-2 text-white/50 hover:text-white hover:bg-dark-card transition-colors"
                        >
                          <Plus size={14} />
                        </button>
                      </div>

                      {/* Item total */}
                      <div className="text-end">
                        <div className="text-gold font-bold">
                          {(item.product.price * item.quantity).toLocaleString()} {t.common.sar}
                        </div>
                        {item.quantity > 1 && (
                          <div className="text-white/30 text-xs">
                            {item.product.price.toLocaleString()} × {item.quantity}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {/* Continue shopping + clear */}
              <div className="flex items-center justify-between pt-2">
                <Link href="/shop">
                  <Button variant="ghost" size="sm" className="gap-2">
                    <ArrowRight size={16} className={isRTL ? '' : 'rotate-180'} />
                    {t.cart.continueShopping}
                  </Button>
                </Link>
                <button
                  onClick={clearCart}
                  className="text-sm text-white/30 hover:text-red-400 transition-colors"
                >
                  {lang === 'ar' ? 'إفراغ السلة' : 'Clear Cart'}
                </button>
              </div>
            </div>

            {/* Order Summary */}
            <div className="space-y-4">
              <div className="p-6 bg-dark-card rounded-2xl border border-dark-border">
                <h2 className="font-semibold text-white text-lg mb-5">{t.cart.orderTotal}</h2>

                <div className="space-y-3 mb-5">
                  <div className="flex justify-between text-sm text-white/60">
                    <span>{t.cart.subtotal}</span>
                    <span>{subtotal.toLocaleString()} {t.common.sar}</span>
                  </div>
                  <div className="flex justify-between text-sm text-white/60">
                    <span>{t.cart.shipping}</span>
                    <span className="text-emerald-400">{t.cart.freeShipping}</span>
                  </div>
                </div>

                <div className="flex justify-between font-bold text-base pt-4 border-t border-dark-border mb-6">
                  <span className="text-white">{t.cart.orderTotal}</span>
                  <span className="text-gold text-xl">{total.toLocaleString()} {t.common.sar}</span>
                </div>

                <Link href="/checkout">
                  <Button variant="gold" fullWidth size="lg" className="gap-2">
                    <ShoppingBag size={18} />
                    {t.cart.checkout}
                  </Button>
                </Link>

                <p className="text-center text-xs text-white/30 mt-3">
                  {t.cart.shippingNote}
                </p>
              </div>

              {/* Promo code */}
              <div className="p-5 bg-dark-card rounded-2xl border border-dark-border">
                <h3 className="text-sm font-medium text-white/70 mb-3 flex items-center gap-2">
                  <Tag size={15} className="text-gold" />
                  {t.cart.promoCode}
                </h3>
                {/* CONNECT: Validate promo code against backend */}
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={promoCode}
                    onChange={e => setPromoCode(e.target.value)}
                    placeholder="AQDI2024"
                    className="input-luxury text-sm flex-1 py-2.5"
                  />
                  <Button variant="outline-gold" size="sm" className="px-4">
                    {t.cart.apply}
                  </Button>
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
