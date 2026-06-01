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
      <div className="fixed inset-0 bg-black/75 backdrop-blur-sm z-49" onClick={closeCart} />

      {/* Drawer */}
      <div className={`fixed top-0 bottom-0 z-50 w-full xs:w-96 bg-ink-deep flex flex-col border-ink-border animate-slide-in-end
        ${isRTL ? 'left-0 border-r' : 'right-0 border-l'}`}>

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-ink-border">
          <div className="flex items-center gap-3">
            <ShoppingBag size={20} className="text-gold" strokeWidth={1.5} />
            <h2 className="font-medium text-white tracking-wide">{t.cart.title}</h2>
            {itemCount > 0 && (
              <span className="px-2 py-0.5 bg-gold/15 text-gold text-xs rounded-full font-medium border border-gold/20">
                {itemCount}
              </span>
            )}
          </div>
          <button onClick={closeCart}
            className="p-2 text-white/30 hover:text-white hover:bg-ink-lifted rounded-full transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto py-4 px-5">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-5 text-center">
              <div className="w-16 h-16 rounded-full bg-ink-lifted border border-ink-border flex items-center justify-center">
                <ShoppingBag size={26} className="text-white/15" />
              </div>
              <div>
                <p className="text-white/50">{t.cart.empty}</p>
                <p className="text-white/25 text-sm mt-1">{t.cart.emptyText}</p>
              </div>
              <Button variant="outline-gold" size="sm" onClick={closeCart}>{t.cart.continueShopping}</Button>
            </div>
          ) : (
            <ul className="space-y-3">
              {items.map(item => (
                <li key={`${item.product.id}-${item.selectedSize}`}
                  className="flex gap-4 p-4 bg-ink-card rounded-2xl border border-ink-border hover:border-gold-border transition-colors"
                >
                  <div className="relative w-20 h-20 rounded-xl overflow-hidden flex-shrink-0 bg-ink-deep">
                    <Image src={item.product.images[0]} alt={item.product.name[lang]}
                      fill className="object-cover" sizes="80px" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-medium text-white truncate">{item.product.name[lang]}</h3>
                    <p className="text-gold font-semibold text-sm mt-1">{item.product.price.toLocaleString()} {t.common.sar}</p>
                    <div className="flex items-center justify-between mt-2.5">
                      <div className="flex items-center rounded-lg border border-ink-border overflow-hidden">
                        <button onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          className="px-2.5 py-1.5 text-white/40 hover:text-white hover:bg-ink-lifted transition-colors">
                          <Minus size={12} />
                        </button>
                        <span className="px-3 text-sm font-medium text-white">{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          className="px-2.5 py-1.5 text-white/40 hover:text-white hover:bg-ink-lifted transition-colors">
                          <Plus size={12} />
                        </button>
                      </div>
                      <button onClick={() => removeFromCart(item.product.id)}
                        className="p-1.5 text-white/20 hover:text-red-400 transition-colors rounded-lg hover:bg-red-500/10">
                        <Trash2 size={14} />
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
          <div className="border-t border-ink-border px-5 py-5 space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm text-white/50">
                <span>{t.cart.subtotal}</span>
                <span>{subtotal.toLocaleString()} {t.common.sar}</span>
              </div>
              <div className="flex justify-between text-sm text-white/50">
                <span>{t.cart.shipping}</span>
                <span className="text-emerald-400">{t.cart.freeShipping}</span>
              </div>
              <div className="flex justify-between font-semibold pt-3 border-t border-ink-border">
                <span className="text-white">{t.cart.orderTotal}</span>
                <span className="text-gold text-lg">{subtotal.toLocaleString()} {t.common.sar}</span>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <Link href="/cart" onClick={closeCart}>
                <Button variant="outline-gold" fullWidth size="sm">{t.nav.cart}</Button>
              </Link>
              <Link href="/checkout" onClick={closeCart}>
                <Button variant="gold" fullWidth size="sm">{t.cart.checkout}</Button>
              </Link>
            </div>
            <p className="text-center text-[11px] text-white/25">{t.cart.shippingNote}</p>
          </div>
        )}
      </div>
    </>
  )
}
