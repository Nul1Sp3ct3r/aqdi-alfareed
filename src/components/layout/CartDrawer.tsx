'use client'
import { X, ShoppingBag, Trash2, Plus, Minus } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { useCart } from '@/context/CartContext'
import { useLanguage } from '@/context/LanguageContext'

export default function CartDrawer() {
  const { items, isOpen, closeCart, removeFromCart, updateQuantity, subtotal, itemCount } = useCart()
  const { t, lang, isRTL } = useLanguage()

  if (!isOpen) return null

  return (
    <>
      <div className="drawer-overlay" onClick={closeCart} />

      <div className={`fixed top-0 bottom-0 z-50 w-full xs:w-96 bg-white flex flex-col shadow-2xl
        ${isRTL ? 'left-0 border-r border-[#E8DEC8]' : 'right-0 border-l border-[#E8DEC8]'}`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-[#E8DEC8]">
          <div className="flex items-center gap-3">
            <ShoppingBag size={20} className="text-gold" strokeWidth={1.5} />
            <h2 className="font-semibold text-ink">{t.cart.title}</h2>
            {itemCount > 0 && (
              <span className="w-5 h-5 bg-gold text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                {itemCount}
              </span>
            )}
          </div>
          <button onClick={closeCart}
            className="p-2 text-ink-muted hover:text-ink hover:bg-cream rounded-full transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto py-4 px-5">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-5 text-center">
              <div className="w-16 h-16 rounded-full bg-cream border border-[#E8DEC8] flex items-center justify-center">
                <ShoppingBag size={24} className="text-ink-muted" />
              </div>
              <div>
                <p className="text-ink-mid font-medium">{t.cart.empty}</p>
                <p className="text-ink-muted text-sm mt-1">{t.cart.emptyText}</p>
              </div>
              <button onClick={closeCart}
                className="btn btn-outline-gold text-sm rounded px-6 py-2.5"
              >
                {t.cart.continueShopping}
              </button>
            </div>
          ) : (
            <ul className="space-y-3">
              {items.map(item => (
                <li key={`${item.product.id}-${item.selectedSize}`}
                  className="flex gap-4 p-3.5 bg-cream rounded-xl border border-[#E8DEC8]"
                >
                  <div className="relative w-20 h-20 rounded-lg overflow-hidden bg-[#080808] shrink-0">
                    <Image src={item.product.images[0]} alt={item.product.name[lang]}
                      fill className="object-cover" sizes="80px" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-ink truncate">{item.product.name[lang]}</p>
                    <p className="text-gold font-bold text-sm mt-0.5">{item.product.price.toLocaleString()} {t.common.sar}</p>
                    <div className="flex items-center justify-between mt-2.5">
                      <div className="flex items-center border border-[#E8DEC8] rounded-lg overflow-hidden">
                        <button onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          className="px-2.5 py-1.5 text-ink-muted hover:text-gold hover:bg-cream transition-colors">
                          <Minus size={12} />
                        </button>
                        <span className="px-3 text-sm font-medium text-ink">{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          className="px-2.5 py-1.5 text-ink-muted hover:text-gold hover:bg-cream transition-colors">
                          <Plus size={12} />
                        </button>
                      </div>
                      <button onClick={() => removeFromCart(item.product.id)}
                        className="p-1.5 text-ink-muted hover:text-red-500 transition-colors">
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
          <div className="border-t border-[#E8DEC8] px-5 py-5 space-y-4 bg-cream">
            <div className="space-y-2">
              <div className="flex justify-between text-sm text-ink-muted">
                <span>{t.cart.subtotal}</span>
                <span>{subtotal.toLocaleString()} {t.common.sar}</span>
              </div>
              <div className="flex justify-between text-sm text-ink-muted">
                <span>{t.cart.shipping}</span>
                <span className="text-emerald-600 font-medium">{t.cart.freeShipping}</span>
              </div>
              <div className="flex justify-between font-bold text-base pt-2.5 border-t border-[#E8DEC8]">
                <span className="text-ink">{t.cart.orderTotal}</span>
                <span className="text-gold">{subtotal.toLocaleString()} {t.common.sar}</span>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <Link href="/cart" onClick={closeCart}>
                <button className="btn btn-outline-gold w-full text-sm rounded py-3">{t.nav.cart}</button>
              </Link>
              <Link href="/checkout" onClick={closeCart}>
                <button className="btn btn-gold w-full text-sm rounded py-3">{t.cart.checkout}</button>
              </Link>
            </div>
            <p className="text-center text-[11px] text-ink-muted">{t.cart.shippingNote}</p>
          </div>
        )}
      </div>
    </>
  )
}
