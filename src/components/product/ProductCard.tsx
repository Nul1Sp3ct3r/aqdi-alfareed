'use client'
import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Heart, ShoppingBag, MessageCircle } from 'lucide-react'
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
  const { addToCart, isInCart } = useCart()
  const [wishlisted, setWishlisted] = useState(false)
  const [justAdded, setJustAdded] = useState(false)

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : null

  const handleAddToCart = (e: React.MouseEvent) => {
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
  const whatsappUrl = `${siteConfig.whatsappUrl}?text=${whatsappMsg}`

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-2xl
      bg-gradient-card border border-white/5 hover:border-gold-border
      transition-all duration-500 hover:-translate-y-2
      shadow-card hover:shadow-card-hover"
    >
      {/* Image — dark bg to match product photo backgrounds */}
      <Link href={`/product/${product.id}`} className="block relative overflow-hidden bg-[#060606]" style={{ aspectRatio: '3/4' }}>
        <Image
          src={product.images[0]}
          alt={product.name[lang]}
          fill
          priority={priority}
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          className="object-cover transition-transform duration-700 group-hover:scale-[1.07]"
        />

        {/* Gradient vignette */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

        {/* Badges top start */}
        <div className="absolute top-3 start-3 flex flex-col gap-1.5 pointer-events-none">
          {product.isNew && (
            <span className="badge bg-emerald-500/15 text-emerald-400 border border-emerald-500/25">
              {t.product.newBadge}
            </span>
          )}
          {product.isBestSeller && !product.isNew && (
            <span className="badge bg-amber-500/15 text-amber-400 border border-amber-500/25">
              {t.product.bestSellerBadge}
            </span>
          )}
          {discount && (
            <span className="badge bg-red-500/15 text-red-400 border border-red-500/25">
              -{discount}%
            </span>
          )}
        </div>

        {/* Wishlist top end */}
        <button
          onClick={e => { e.preventDefault(); e.stopPropagation(); setWishlisted(w => !w) }}
          className={`absolute top-3 end-3 w-8 h-8 rounded-full backdrop-blur-sm flex items-center justify-center
            opacity-0 group-hover:opacity-100 transition-all duration-300
            ${wishlisted ? 'bg-red-500/80 text-white scale-110' : 'bg-black/50 text-white/60 hover:text-red-400'}`}
        >
          <Heart size={14} fill={wishlisted ? 'currentColor' : 'none'} />
        </button>

        {/* Action buttons — slide up on hover */}
        <div className="absolute inset-x-0 bottom-0 flex gap-2 px-3 pb-3
          translate-y-full group-hover:translate-y-0 transition-transform duration-400 ease-out"
        >
          <button
            onClick={handleAddToCart}
            disabled={!product.inStock}
            className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-xs font-semibold tracking-wide transition-all
              ${justAdded
                ? 'bg-emerald-500 text-white'
                : 'btn-gold text-[11px]'
              }`}
          >
            <ShoppingBag size={13} />
            {justAdded ? t.product.addedToCart : (isInCart(product.id) ? t.product.addToCart : t.product.addToCart)}
          </button>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={e => e.stopPropagation()}
            className="w-10 h-10 flex items-center justify-center rounded-xl btn-whatsapp text-white shrink-0"
            title={t.product.orderWhatsapp}
          >
            <MessageCircle size={15} />
          </a>
        </div>
      </Link>

      {/* Info */}
      <div className="p-4 flex flex-col gap-2">
        {/* Material */}
        <div className="flex items-center gap-1.5">
          <span className={`w-1.5 h-1.5 rounded-full ${product.material === 'gold' ? 'bg-gold' : 'bg-silver'}`} />
          <span className={`text-2xs font-medium tracking-[0.15em] uppercase ${product.material === 'gold' ? 'text-gold' : 'text-silver'}`}>
            {product.material === 'gold' ? t.product.goldBadge : t.product.silverBadge} · 925
          </span>
        </div>

        {/* Name */}
        <h3 className="text-sm font-medium text-white/85 leading-snug line-clamp-2 group-hover:text-white transition-colors">
          {product.name[lang]}
        </h3>

        {/* Price */}
        <div className="flex items-baseline gap-2 mt-auto pt-1">
          <span className="text-gold font-bold text-base">{product.price.toLocaleString()}</span>
          <span className="text-2xs text-white/30">{t.common.sar}</span>
          {product.originalPrice && (
            <span className="text-2xs text-white/25 line-through ms-1">
              {product.originalPrice.toLocaleString()}
            </span>
          )}
        </div>
      </div>
    </div>
  )
}
