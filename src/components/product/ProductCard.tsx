'use client'
import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Heart, Eye, ShoppingBag, MessageCircle } from 'lucide-react'
import { Product } from '@/types'
import { useLanguage } from '@/context/LanguageContext'
import { useCart } from '@/context/CartContext'
import { siteConfig } from '@/lib/config'

interface ProductCardProps {
  product: Product
  priority?: boolean
}

export default function ProductCard({ product, priority = false }: ProductCardProps) {
  const { t, lang } = useLanguage()
  const { addToCart } = useCart()
  const [wishlisted, setWishlisted] = useState(false)
  const [justAdded, setJustAdded] = useState(false)

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : null

  const handleCart = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (justAdded || !product.inStock) return
    addToCart(product)
    setJustAdded(true)
    setTimeout(() => setJustAdded(false), 1800)
  }

  const whatsappMsg = encodeURIComponent(
    lang === 'ar'
      ? `السلام عليكم، أريد الطلب:\n${product.name.ar}\nالسعر: ${product.price} ر.س`
      : `Hello, I'd like to order:\n${product.name.en}\nPrice: ${product.price} SAR`
  )

  return (
    <div className="group relative bg-white border border-[#EDE8DF] rounded-2xl overflow-hidden transition-all duration-300 ease-out shadow-[0_2px_12px_rgba(0,0,0,0.06)] hover:shadow-[0_20px_56px_rgba(0,0,0,0.10)] hover:-translate-y-[6px]">

      {/* ── Image block ───────────────────────────────── */}
      <Link
        href={`/product/${product.id}`}
        className="block relative bg-[#0c0c0c]"
        style={{ aspectRatio: '4/5' }}
      >
        <Image
          src={product.images[0]}
          alt={product.name[lang]}
          fill
          priority={priority}
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.06]"
        />

        {/* Subtle hover darkening */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/18 transition-colors duration-300" />

        {/* Quick-action trio — floats up from image bottom on hover */}
        <div
          className="absolute bottom-3.5 inset-x-0 flex items-center justify-center gap-2.5 z-10
            opacity-0 translate-y-3
            group-hover:opacity-100 group-hover:translate-y-0
            transition-all duration-300 ease-out"
        >
          {/* Wishlist */}
          <button
            onClick={e => { e.preventDefault(); e.stopPropagation(); setWishlisted(w => !w) }}
            className={`w-9 h-9 rounded-full flex items-center justify-center shadow-lg transition-all duration-200
              ${wishlisted
                ? 'bg-rose-50 text-rose-400 border border-rose-200'
                : 'bg-white text-ink border border-white/80 hover:bg-[#B9922F] hover:text-white hover:border-[#B9922F]'
              }`}
            title={t.product.addToWishlist}
          >
            <Heart size={13} fill={wishlisted ? 'currentColor' : 'none'} />
          </button>

          {/* Quick view */}
          <Link
            href={`/product/${product.id}`}
            className="w-9 h-9 bg-white text-ink rounded-full flex items-center justify-center shadow-lg border border-white/80 hover:bg-[#B9922F] hover:text-white hover:border-[#B9922F] transition-all duration-200"
            title="Quick View"
            onClick={e => e.stopPropagation()}
          >
            <Eye size={13} />
          </Link>

          {/* Add to cart icon */}
          <button
            onClick={handleCart}
            disabled={!product.inStock}
            className={`w-9 h-9 rounded-full flex items-center justify-center shadow-lg border transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed
              ${justAdded
                ? 'bg-[#111] text-white border-[#111]'
                : 'bg-white text-ink border-white/80 hover:bg-[#B9922F] hover:text-white hover:border-[#B9922F]'
              }`}
            title={t.product.addToCart}
          >
            <ShoppingBag size={13} />
          </button>
        </div>

        {/* Badges — top-start stack */}
        <div className="absolute top-3 start-3 flex flex-col gap-1.5 z-20 pointer-events-none">
          {product.isNew && (
            <span className="inline-flex items-center bg-[#B9922F] text-white text-[8.5px] font-bold px-2.5 py-[3.5px] rounded-full tracking-[0.14em] uppercase leading-none shadow-sm">
              {t.product.newBadge}
            </span>
          )}
          {discount && (
            <span className="inline-flex items-center bg-[#D94040] text-white text-[8.5px] font-bold px-2.5 py-[3.5px] rounded-full leading-none shadow-sm">
              −{discount}%
            </span>
          )}
          {product.isBestSeller && !product.isNew && (
            <span className="inline-flex items-center bg-[#111] text-[#D4AF37] text-[8.5px] font-bold px-2.5 py-[3.5px] rounded-full tracking-[0.12em] uppercase leading-none border border-[#D4AF37]/25">
              ✦ {lang === 'ar' ? 'الأكثر مبيعاً' : 'Top Pick'}
            </span>
          )}
        </div>
      </Link>

      {/* ── Card body ─────────────────────────────────── */}
      <div className="px-4 pt-3.5 pb-4">

        {/* Material · purity */}
        <div className="flex items-center gap-1.5 mb-2.5">
          <span
            className={`w-[5px] h-[5px] rounded-full flex-shrink-0 ${
              product.material === 'gold' ? 'bg-[#B9922F]' : 'bg-[#909090]'
            }`}
          />
          <span className="text-[9.5px] font-semibold text-[#9A9590] tracking-[0.18em] uppercase leading-none">
            {product.material === 'gold' ? t.product.goldBadge : t.product.silverBadge}
            <span className="mx-1 opacity-40">·</span>
            925
          </span>
        </div>

        {/* Product name */}
        <h3 className="line-clamp-2 leading-[1.55] mb-3" style={{ minHeight: '2.8rem' }}>
          <Link
            href={`/product/${product.id}`}
            className={`transition-colors duration-200 hover:text-[#B9922F]
              ${lang === 'ar'
                ? 'text-[0.875rem] font-semibold text-[#111]'
                : 'text-[0.825rem] font-semibold text-[#111] tracking-[0.01em]'
              }`}
          >
            {product.name[lang]}
          </Link>
        </h3>

        {/* Price row */}
        <div className="flex items-baseline gap-1 mb-3.5">
          <span className="text-[1.1rem] font-bold text-[#B9922F] leading-none tabular-nums">
            {product.price.toLocaleString()}
          </span>
          <span className="text-[10.5px] font-semibold text-[#B9922F]/65 leading-none ms-0.5">
            {t.common.sar}
          </span>
          {product.originalPrice && (
            <span className="text-[11px] text-[#B0A89E] line-through leading-none ms-1 tabular-nums">
              {product.originalPrice.toLocaleString()}
            </span>
          )}
        </div>

        {/* Gold gradient separator */}
        <div
          className="h-px mb-3.5 rounded-full"
          style={{
            background:
              'linear-gradient(to right, rgba(185,146,47,0.40), rgba(212,175,55,0.18), rgba(185,146,47,0.03))',
          }}
        />

        {/* Action buttons */}
        <div className="grid grid-cols-2 gap-2">

          {/* Add to Cart */}
          <button
            onClick={handleCart}
            disabled={!product.inStock}
            className={`flex items-center justify-center gap-[5px] py-[9px] rounded-xl text-[10.5px] font-bold tracking-[0.04em] transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed
              ${justAdded
                ? 'bg-[#111] text-white shadow-none'
                : 'bg-[#B9922F] text-white hover:bg-[#D4AF37] hover:shadow-[0_4px_18px_rgba(185,146,47,0.32)]'
              }`}
          >
            <ShoppingBag size={11} strokeWidth={2.2} className="flex-shrink-0" />
            <span className="truncate">
              {justAdded
                ? lang === 'ar' ? '✓ أُضيف' : '✓ Added'
                : t.product.addToCart}
            </span>
          </button>

          {/* WhatsApp */}
          <a
            href={`${siteConfig.whatsappUrl}?text=${whatsappMsg}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-[5px] py-[9px] rounded-xl text-[10.5px] font-bold tracking-[0.04em] border border-[#1DAA62]/35 text-[#1DAA62] transition-all duration-200 hover:bg-[#1DAA62] hover:text-white hover:border-[#1DAA62] hover:shadow-[0_4px_18px_rgba(29,170,98,0.22)]"
          >
            <MessageCircle size={11} strokeWidth={2.2} className="flex-shrink-0" />
            <span>{lang === 'ar' ? 'واتساب' : 'WhatsApp'}</span>
          </a>

        </div>
      </div>
    </div>
  )
}
