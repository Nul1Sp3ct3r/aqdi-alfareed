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
    e.preventDefault(); e.stopPropagation()
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
    <div className="group bg-white border border-[#E8E2D6] overflow-hidden transition-all duration-300 hover:shadow-[0_12px_48px_rgba(0,0,0,0.10)] hover:-translate-y-1">
      {/* Image */}
      <Link href={`/product/${product.id}`} className="block relative bg-[#060606]" style={{ aspectRatio: '1/1' }}>
        <Image
          src={product.images[0]}
          alt={product.name[lang]}
          fill
          priority={priority}
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          className="object-cover transition-transform duration-500 group-hover:scale-[1.05]"
        />

        {/* Hover overlay + quick actions */}
        <div className="absolute inset-0 bg-black/25 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2.5">
          <button
            onClick={e => { e.preventDefault(); e.stopPropagation(); setWishlisted(w => !w) }}
            className="w-9 h-9 bg-white rounded-full flex items-center justify-center text-ink hover:bg-gold hover:text-white transition-all duration-200 shadow-lg"
            title={t.product.addToWishlist}
          >
            <Heart size={14} fill={wishlisted ? '#B9922F' : 'none'} className={wishlisted ? 'text-gold' : ''} />
          </button>
          <Link
            href={`/product/${product.id}`}
            className="w-9 h-9 bg-white rounded-full flex items-center justify-center text-ink hover:bg-gold hover:text-white transition-all duration-200 shadow-lg"
            title="View Details"
            onClick={e => e.stopPropagation()}
          >
            <Eye size={14} />
          </Link>
          <button
            onClick={handleCart}
            disabled={!product.inStock}
            className="w-9 h-9 bg-white rounded-full flex items-center justify-center text-ink hover:bg-gold hover:text-white transition-all duration-200 shadow-lg disabled:opacity-40"
            title={t.product.addToCart}
          >
            <ShoppingBag size={14} className={justAdded ? 'text-gold' : ''} />
          </button>
        </div>

        {/* Badges */}
        <div className="absolute top-3 start-3 flex flex-col gap-1 pointer-events-none z-10">
          {product.isNew && (
            <span className="bg-gold text-white text-[9px] font-bold px-2 py-0.5 tracking-wider uppercase leading-tight">
              {t.product.newBadge}
            </span>
          )}
          {discount && (
            <span className="bg-red-600 text-white text-[9px] font-bold px-2 py-0.5 leading-tight">
              -{discount}%
            </span>
          )}
        </div>
      </Link>

      {/* Card info */}
      <div className="p-4">
        {/* Material label */}
        <div className="flex items-center gap-1.5 mb-2">
          <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${product.material === 'gold' ? 'bg-gold' : 'bg-[#888]'}`} />
          <span className="text-[10px] tracking-widest text-ink-muted uppercase font-medium">
            {product.material === 'gold' ? t.product.goldBadge : t.product.silverBadge} · 925
          </span>
        </div>

        {/* Name */}
        <h3 className="text-sm font-medium text-ink leading-snug mb-3 line-clamp-2 min-h-[2.5rem]">
          <Link href={`/product/${product.id}`} className="hover:text-gold transition-colors">
            {product.name[lang]}
          </Link>
        </h3>

        {/* Price row */}
        <div className="flex items-baseline gap-2 mb-3">
          <span className="text-gold font-bold text-base">{product.price.toLocaleString()}</span>
          <span className="text-ink-muted text-xs">{t.common.sar}</span>
          {product.originalPrice && (
            <span className="text-ink-faint text-xs line-through">{product.originalPrice.toLocaleString()}</span>
          )}
        </div>

        {/* Gold separator */}
        <div className="h-px mb-3 opacity-20" style={{ background: 'linear-gradient(90deg, #B9922F, #D4AF37, transparent)' }} />

        {/* Actions */}
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={handleCart}
            disabled={!product.inStock}
            className={`btn text-[11px] rounded-none py-2.5 tracking-wide ${justAdded ? 'btn-dark' : 'btn-gold'}`}
          >
            <ShoppingBag size={12} strokeWidth={1.5} />
            {justAdded ? (lang === 'ar' ? '✓ أُضيف' : '✓ Added') : t.product.addToCart}
          </button>
          <a
            href={`${siteConfig.whatsappUrl}?text=${whatsappMsg}`}
            target="_blank" rel="noopener noreferrer"
            className="btn btn-whatsapp text-[11px] rounded-none py-2.5 tracking-wide"
          >
            <MessageCircle size={12} strokeWidth={1.5} />
            {lang === 'ar' ? 'واتساب' : 'WhatsApp'}
          </a>
        </div>
      </div>
    </div>
  )
}
