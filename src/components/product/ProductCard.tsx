'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ShoppingBag, Heart, Star } from 'lucide-react'
import { Product } from '@/types'
import { useLanguage } from '@/context/LanguageContext'
import { useCart } from '@/context/CartContext'
import Badge from '@/components/ui/Badge'

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  const { t, lang } = useLanguage()
  const { addToCart, isInCart } = useCart()
  const [isWishlisted, setIsWishlisted] = useState(false)
  const [isAdding, setIsAdding] = useState(false)

  const discountPercent = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : null

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (isAdding || !product.inStock) return
    setIsAdding(true)
    addToCart(product)
    setTimeout(() => setIsAdding(false), 1500)
  }

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    // CONNECT: Save wishlist to Firebase/Supabase for logged-in users
    setIsWishlisted(!isWishlisted)
  }

  return (
    <div className="group relative card-luxury overflow-hidden">
      {/* Image Container */}
      <Link href={`/product/${product.id}`} className="block">
        <div className="relative aspect-square overflow-hidden bg-dark-muted">
          <Image
            src={product.images[0]}
            alt={product.name[lang]}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-108"
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          />

          {/* Hover overlay */}
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <button
              onClick={handleAddToCart}
              disabled={!product.inStock || isAdding}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full font-semibold text-sm tracking-wide
                transition-all duration-300 transform translate-y-4 group-hover:translate-y-0
                ${isAdding
                  ? 'bg-emerald-500 text-white scale-95'
                  : isInCart(product.id)
                    ? 'bg-gold/90 text-dark-deeper'
                    : 'bg-gold text-dark-deeper hover:bg-gold-light'
                }`}
            >
              <ShoppingBag size={16} />
              {isAdding
                ? '✓'
                : isInCart(product.id)
                  ? t.product.addToCart
                  : t.product.addToCart
              }
            </button>
          </div>

          {/* Badges */}
          <div className="absolute top-3 start-3 flex flex-col gap-1.5">
            {product.isNew && (
              <Badge variant="new">{t.product.newBadge}</Badge>
            )}
            {product.isBestSeller && (
              <Badge variant="bestseller">{t.product.bestSellerBadge}</Badge>
            )}
            {discountPercent && (
              <Badge variant="sale">-{discountPercent}%</Badge>
            )}
          </div>

          {/* Wishlist */}
          <button
            onClick={handleWishlist}
            className={`absolute top-3 end-3 w-8 h-8 rounded-full backdrop-blur-sm flex items-center justify-center
              transition-all duration-200 opacity-0 group-hover:opacity-100
              ${isWishlisted
                ? 'bg-red-500/80 text-white'
                : 'bg-black/40 text-white/70 hover:text-red-400'
              }`}
            aria-label={isWishlisted ? t.product.removeFromWishlist : t.product.addToWishlist}
          >
            <Heart size={14} fill={isWishlisted ? 'currentColor' : 'none'} />
          </button>
        </div>

        {/* Product Info */}
        <div className="p-4">
          {/* Material badge */}
          <Badge variant={product.material === 'gold' ? 'gold' : 'silver'} className="mb-2">
            {product.material === 'gold' ? t.product.goldBadge : t.product.silverBadge}
          </Badge>

          {/* Name */}
          <h3 className="font-medium text-white/90 text-sm leading-snug mb-1 line-clamp-2 group-hover:text-gold transition-colors">
            {product.name[lang]}
          </h3>

          {/* Rating */}
          {product.rating && (
            <div className="flex items-center gap-1.5 mb-2">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={11}
                    className={i < Math.floor(product.rating!) ? 'text-gold fill-gold' : 'text-white/20 fill-white/10'}
                  />
                ))}
              </div>
              <span className="text-[11px] text-white/40">({product.reviewCount})</span>
            </div>
          )}

          {/* Price */}
          <div className="flex items-baseline gap-2">
            <span className="text-gold font-bold text-base">
              {product.price.toLocaleString()}
            </span>
            <span className="text-xs text-white/50">{t.common.sar}</span>
            {product.originalPrice && (
              <span className="text-xs text-white/30 line-through">
                {product.originalPrice.toLocaleString()}
              </span>
            )}
          </div>
        </div>
      </Link>
    </div>
  )
}
