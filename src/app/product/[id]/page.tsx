'use client'

import { useState } from 'react'
import { notFound } from 'next/navigation'
import { ShoppingBag, Heart, Share2, Shield, Truck, RotateCcw, ChevronDown, Star } from 'lucide-react'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import ProductGallery from '@/components/product/ProductGallery'
import RelatedProducts from '@/components/product/RelatedProducts'
import Badge from '@/components/ui/Badge'
import Button from '@/components/ui/Button'
import { useLanguage } from '@/context/LanguageContext'
import { useCart } from '@/context/CartContext'
import { getProductById, getRelatedProducts } from '@/data/products'

interface ProductPageProps {
  params: { id: string }
}

export default function ProductPage({ params }: ProductPageProps) {
  const { t, lang } = useLanguage()
  const { addToCart, isInCart } = useCart()
  const [quantity, setQuantity] = useState(1)
  const [selectedSize, setSelectedSize] = useState<string>('')
  const [isAdding, setIsAdding] = useState(false)
  const [isWishlisted, setIsWishlisted] = useState(false)
  const [expandedSection, setExpandedSection] = useState<string | null>(null)

  // CONNECT: Replace with async fetch from Firebase/Supabase
  const product = getProductById(params.id)

  if (!product) notFound()

  const relatedProducts = getRelatedProducts(product)
  const discountPercent = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : null

  const handleAddToCart = () => {
    if (isAdding) return
    if (product.sizes && product.sizes.length > 0 && !selectedSize) {
      alert(t.product.selectSize)
      return
    }
    setIsAdding(true)
    addToCart(product, quantity, selectedSize || undefined)
    setTimeout(() => setIsAdding(false), 1500)
  }

  const infoSections = [
    {
      id: 'care',
      title: t.product.careInstructions,
      content: product.careInstructions?.[lang] ?? (lang === 'ar'
        ? 'احتفظي بالمجوهرات في كيس ناعم بعيداً عن الرطوبة والمواد الكيميائية. نظفيها بقطعة قماش ناعمة جافة.'
        : 'Store jewelry in a soft pouch away from moisture and chemicals. Clean with a soft dry cloth.')
    },
    {
      id: 'shipping',
      title: t.product.shippingInfo,
      content: t.product.shippingText,
    },
    {
      id: 'returns',
      title: t.product.returnPolicy,
      content: t.product.returnText,
    },
  ]

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-dark-deeper pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
            {/* Gallery */}
            <ProductGallery images={product.images} productName={product.name[lang]} />

            {/* Product Info */}
            <div className="flex flex-col">
              {/* Badges */}
              <div className="flex flex-wrap gap-2 mb-4">
                <Badge variant={product.material === 'gold' ? 'gold' : 'silver'} size="md">
                  {product.material === 'gold' ? t.product.goldBadge : t.product.silverBadge}
                </Badge>
                {product.isNew && <Badge variant="new" size="md">{t.product.newBadge}</Badge>}
                {product.isBestSeller && <Badge variant="bestseller" size="md">{t.product.bestSellerBadge}</Badge>}
              </div>

              {/* Name */}
              <h1 className="text-2xl md:text-3xl font-serif font-semibold text-white leading-tight mb-3">
                {product.name[lang]}
              </h1>

              {/* Rating */}
              {product.rating && (
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={15} className={i < Math.floor(product.rating!) ? 'text-gold fill-gold' : 'text-white/20 fill-white/10'} />
                    ))}
                  </div>
                  <span className="text-sm text-white/60">
                    {product.rating} ({product.reviewCount} {t.product.reviews})
                  </span>
                </div>
              )}

              {/* Price */}
              <div className="flex items-baseline gap-3 mb-6 pb-6 border-b border-dark-border">
                <span className="text-3xl font-bold text-gold">
                  {product.price.toLocaleString()}
                </span>
                <span className="text-white/50">{t.common.sar}</span>
                {product.originalPrice && (
                  <>
                    <span className="text-white/30 line-through text-lg">
                      {product.originalPrice.toLocaleString()}
                    </span>
                    <Badge variant="sale" size="md">-{discountPercent}%</Badge>
                  </>
                )}
              </div>

              {/* Short description */}
              <p className="text-white/60 leading-relaxed mb-6">
                {product.shortDescription[lang]}
              </p>

              {/* Size selector */}
              {product.sizes && product.sizes.length > 0 && (
                <div className="mb-6">
                  <label className="block text-sm font-medium text-white/70 mb-3">
                    {t.product.size}: {selectedSize && <span className="text-gold">{selectedSize}</span>}
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {product.sizes.map(size => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`w-11 h-11 rounded-xl text-sm font-medium transition-all duration-200 border
                          ${selectedSize === size
                            ? 'bg-gold text-dark-deeper border-gold'
                            : 'bg-dark-card text-white/70 border-dark-border hover:border-gold/40 hover:text-white'
                          }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-white/70 mb-3">{t.product.quantity}</label>
                <div className="flex items-center gap-3">
                  <div className="flex items-center rounded-xl border border-dark-border overflow-hidden">
                    <button
                      onClick={() => setQuantity(q => Math.max(1, q - 1))}
                      className="px-4 py-3 text-white/50 hover:text-white hover:bg-dark-card transition-colors text-lg"
                    >
                      −
                    </button>
                    <span className="px-5 py-3 text-white font-medium text-center min-w-[50px]">{quantity}</span>
                    <button
                      onClick={() => setQuantity(q => Math.min(product.stockCount ?? 99, q + 1))}
                      className="px-4 py-3 text-white/50 hover:text-white hover:bg-dark-card transition-colors text-lg"
                    >
                      +
                    </button>
                  </div>
                  {product.inStock ? (
                    <span className="text-sm text-emerald-400 font-medium">✓ {t.product.inStock}</span>
                  ) : (
                    <span className="text-sm text-red-400">{t.product.outOfStock}</span>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 mb-6">
                <Button
                  variant="gold"
                  size="lg"
                  className="flex-1 gap-2"
                  onClick={handleAddToCart}
                  disabled={!product.inStock}
                >
                  <ShoppingBag size={18} />
                  {isAdding ? '✓' : t.product.addToCart}
                </Button>
                <button
                  onClick={() => setIsWishlisted(!isWishlisted)}
                  className={`p-4 rounded-xl border transition-all duration-200
                    ${isWishlisted
                      ? 'bg-red-500/20 border-red-500/50 text-red-400'
                      : 'bg-dark-card border-dark-border text-white/40 hover:text-red-400 hover:border-red-400/30'
                    }`}
                  aria-label={t.product.addToWishlist}
                >
                  <Heart size={20} fill={isWishlisted ? 'currentColor' : 'none'} />
                </button>
                <button
                  className="p-4 rounded-xl border border-dark-border bg-dark-card text-white/40 hover:text-gold hover:border-gold/30 transition-all duration-200"
                  aria-label="Share"
                >
                  <Share2 size={20} />
                </button>
              </div>

              {/* Buy Now */}
              <Button variant="outline-gold" size="lg" fullWidth className="mb-8">
                {t.product.buyNow}
              </Button>

              {/* Product details */}
              <div className="space-y-2 mb-8 p-4 bg-dark-card rounded-2xl border border-dark-border">
                {product.sku && (
                  <div className="flex justify-between text-sm">
                    <span className="text-white/40">{t.product.sku}</span>
                    <span className="text-white/70 font-mono">{product.sku}</span>
                  </div>
                )}
                <div className="flex justify-between text-sm">
                  <span className="text-white/40">{t.product.material}</span>
                  <span className={`font-medium ${product.material === 'gold' ? 'text-gold' : 'text-silver'}`}>
                    {product.material === 'gold' ? t.product.goldBadge : t.product.silverBadge}
                  </span>
                </div>
                {product.weight && (
                  <div className="flex justify-between text-sm">
                    <span className="text-white/40">{t.product.weight}</span>
                    <span className="text-white/70">{product.weight}</span>
                  </div>
                )}
              </div>

              {/* Trust icons */}
              <div className="grid grid-cols-3 gap-3 mb-8">
                {[
                  { icon: Shield, text: lang === 'ar' ? 'ضمان الأصالة' : 'Authenticity Guaranteed' },
                  { icon: Truck, text: lang === 'ar' ? 'توصيل مجاني' : 'Free Shipping' },
                  { icon: RotateCcw, text: lang === 'ar' ? 'إرجاع ١٤ يوم' : '14-Day Returns' },
                ].map(({ icon: Icon, text }) => (
                  <div key={text} className="flex flex-col items-center gap-2 p-3 bg-dark-card rounded-xl border border-dark-border text-center">
                    <Icon size={18} className="text-gold" />
                    <span className="text-[11px] text-white/50 leading-tight">{text}</span>
                  </div>
                ))}
              </div>

              {/* Accordion Info */}
              <div className="space-y-2">
                {infoSections.map(section => (
                  <div key={section.id} className="border border-dark-border rounded-xl overflow-hidden">
                    <button
                      onClick={() => setExpandedSection(expandedSection === section.id ? null : section.id)}
                      className="w-full flex items-center justify-between px-4 py-3.5 text-sm font-medium text-white/70 hover:text-white transition-colors bg-dark-card"
                    >
                      {section.title}
                      <ChevronDown
                        size={16}
                        className={`text-white/40 transition-transform duration-200 ${expandedSection === section.id ? 'rotate-180' : ''}`}
                      />
                    </button>
                    {expandedSection === section.id && (
                      <div className="px-4 py-3 text-sm text-white/50 leading-relaxed bg-dark-deeper border-t border-dark-border">
                        {section.content}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Full description */}
          <div className="mt-16 pt-10 border-t border-dark-border">
            <h2 className="text-xl font-serif font-semibold text-white mb-4">{t.product.description}</h2>
            <p className="text-white/55 leading-relaxed max-w-3xl">
              {product.description[lang]}
            </p>
          </div>

          {/* Related Products */}
          <RelatedProducts products={relatedProducts} />
        </div>
      </main>
      <Footer />
    </>
  )
}
