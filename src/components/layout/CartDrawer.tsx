'use client'

import { X, ShoppingBag, Trash2, Plus, Minus } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { useCart } from '@/context/CartContext'
import { useLanguage } from '@/context/LanguageContext'
import Button from '@/components/ui/Button'

export default function CartDrawer() {
  const { items, isOpen, closeCart, removeFromCart, updateQuantity, subtotal, itemCount } = useCart()
  const { t, lang, isRTL } = useLanguage()

  if (!isOpen) return null

  return (
    <>
      {/* Overlay */}
      <div
        className="cart-overlay"
        onClick={closeCart}
        aria-hidden="true"
      />

      {/* Drawer */}
      <div
        className={`fixed top-0 bottom-0 z-50 w-full sm:w-96 bg-dark-deeper flex flex-col shadow-2xl border-dark-border animate-slide-in-right
          ${isRTL ? 'left-0 border-r' : 'right-0 border-l'}`}
        role="dialog"
        aria-label={t.cart.title}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-dark-border">
          <div className="flex items-center gap-3">
            <ShoppingBag className="text-gold" size={22} />
            <h2 className="text-lg font-semibold text-white">{t.cart.title}</h2>
            {itemCount > 0 && (
              <span className="px-2 py-0.5 bg-gold/20 text-gold text-xs rounded-full font-medium">
                {itemCount}
              </span>
            )}
          </div>
          <button
            onClick={closeCart}
            className="p-2 text-white/50 hover:text-white hover:bg-dark-card rounded-full transition-colors"
            aria-label={t.common.close}
          >
            <X size={20} />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto py-4 px-6">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-4 text-center">
              <div className="w-16 h-16 rounded-full bg-dark-card flex items-center justify-center">
                <ShoppingBag className="text-white/20" size={30} />
              </div>
              <p className="text-white/50 text-lg">{t.cart.empty}</p>
              <p className="text-white/30 text-sm">{t.cart.emptyText}</p>
              <Button variant="outline-gold" size="sm" onClick={closeCart}>
                {t.cart.continueShopping}
              </Button>
            </div>
          ) : (
            <ul className="space-y-4">
              {items.map((item) => (
                <li key={`${item.product.id}-${item.selectedSize}`}
                    className="flex gap-4 p-3 bg-dark-card rounded-xl border border-dark-border">
                  {/* Product Image */}
                  <div className="relative w-20 h-20 rounded-lg overflow-hidden flex-shrink-0 bg-dark-muted">
                    <Image
                      src={item.product.images[0]}
                      alt={item.product.name[lang]}
                      fill
                      className="object-cover"
                      sizes="80px"
                    />
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-medium text-white truncate">
                      {item.product.name[lang]}
                    </h3>
                    {item.selectedSize && (
                      <p className="text-xs text-white/40 mt-0.5">
                        {t.product.size}: {item.selectedSize}
                      </p>
                    )}
                    <p className="text-gold font-semibold text-sm mt-1">
                      {item.product.price.toLocaleString()} {t.common.sar}
                    </p>

                    {/* Quantity + Remove */}
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center gap-2 bg-dark-deeper rounded-lg border border-dark-border">
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          className="p-1.5 text-white/50 hover:text-white transition-colors"
                        >
                          <Minus size={13} />
                        </button>
                        <span className="text-sm font-medium w-5 text-center">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          className="p-1.5 text-white/50 hover:text-white transition-colors"
                        >
                          <Plus size={13} />
                        </button>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.product.id)}
                        className="p-1.5 text-white/30 hover:text-red-400 transition-colors rounded"
                        aria-label={t.cart.remove}
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-dark-border px-6 py-5 space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm text-white/60">
                <span>{t.cart.subtotal}</span>
                <span>{subtotal.toLocaleString()} {t.common.sar}</span>
              </div>
              <div className="flex justify-between text-sm text-white/60">
                <span>{t.cart.shipping}</span>
                <span className="text-emerald-400">{t.cart.freeShipping}</span>
              </div>
              <div className="flex justify-between font-semibold text-base pt-2 border-t border-dark-border">
                <span className="text-white">{t.cart.orderTotal}</span>
                <span className="text-gold">{subtotal.toLocaleString()} {t.common.sar}</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <Link href="/cart" onClick={closeCart}>
                <Button variant="outline-gold" fullWidth size="sm">
                  {t.nav.cart}
                </Button>
              </Link>
              <Link href="/checkout" onClick={closeCart}>
                <Button variant="gold" fullWidth size="sm">
                  {t.cart.checkout}
                </Button>
              </Link>
            </div>

            <p className="text-center text-xs text-white/30">
              {t.cart.shippingNote}
            </p>
          </div>
        )}
      </div>
    </>
  )
}
