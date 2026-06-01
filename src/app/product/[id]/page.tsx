'use client'
import { useState } from 'react'
import { notFound } from 'next/navigation'
import { ShoppingBag, Heart, MessageCircle, Shield, Truck, RotateCcw, ChevronDown, Star } from 'lucide-react'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import ProductGallery from '@/components/product/ProductGallery'
import RelatedProducts from '@/components/product/RelatedProducts'
import Badge from '@/components/ui/Badge'
import Button from '@/components/ui/Button'
import { useLanguage } from '@/context/LanguageContext'
import { useCart } from '@/context/CartContext'
import { getProductById, getRelatedProducts } from '@/data/products'
import { siteConfig } from '@/lib/config'

export default function ProductPage({ params }: { params: { id: string } }) {
  const { t, lang } = useLanguage()
  const { addToCart } = useCart()
  const [qty, setQty] = useState(1)
  const [selectedSize, setSelectedSize] = useState('')
  const [justAdded, setJustAdded] = useState(false)
  const [wishlisted, setWishlisted] = useState(false)
  const [openSection, setOpenSection] = useState<string | null>('care')

  const product = getProductById(params.id)
  if (!product) notFound()

  const related = getRelatedProducts(product)
  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) : null

  const handleAddToCart = () => {
    if (justAdded) return
    addToCart(product, qty, selectedSize || undefined)
    setJustAdded(true)
    setTimeout(() => setJustAdded(false), 1800)
  }

  const whatsappMsg = encodeURIComponent(
    lang === 'ar'
      ? `السلام عليكم، أريد الطلب:\n${product.name.ar}\nالسعر: ${product.price} ر.س\n${typeof window !== 'undefined' ? window.location.href : ''}`
      : `Hello, I'd like to order:\n${product.name.en}\nPrice: ${product.price} SAR`
  )
  const whatsappUrl = `${siteConfig.whatsappUrl}?text=${whatsappMsg}`

  const accordionSections = [
    {
      id: 'care', title: t.product.careInstructions,
      content: product.careInstructions?.[lang]
        ?? (lang === 'ar' ? 'نظّفي بقطعة قماش ناعمة جافة. تجنّبي الرطوبة والعطور.' : 'Clean with a soft dry cloth. Avoid moisture and perfumes.'),
    },
    { id: 'shipping', title: t.product.shippingInfo, content: t.product.shippingText },
    { id: 'returns',  title: t.product.returnPolicy,  content: t.product.returnText },
  ]

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-ink-deep pt-20">
        <div className="wrap py-10 md:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20">

            {/* Gallery */}
            <ProductGallery images={product.images} productName={product.name[lang]} />

            {/* Info */}
            <div className="flex flex-col">
              {/* Badges */}
              <div className="flex flex-wrap gap-2 mb-5">
                <Badge variant={product.material === 'gold' ? 'gold' : 'silver'}>
                  {product.material === 'gold' ? t.product.goldBadge : t.product.silverBadge} · 925
                </Badge>
                {product.isNew       && <Badge variant="new">{t.product.newBadge}</Badge>}
                {product.isBestSeller && <Badge variant="bestseller">{t.product.bestSellerBadge}</Badge>}
              </div>

              {/* Name */}
              <h1 className="display-serif text-3xl md:text-4xl text-white leading-tight mb-4">
                {product.name[lang]}
              </h1>

              {/* Rating */}
              {product.rating && (
                <div className="flex items-center gap-2 mb-5">
                  <div className="flex gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={14} className={i < Math.floor(product.rating!) ? 'text-gold fill-gold' : 'text-white/15'} />
                    ))}
                  </div>
                  <span className="text-sm text-white/40">{product.rating} · {product.reviewCount} {t.product.reviews}</span>
                </div>
              )}

              {/* Price */}
              <div className="flex items-baseline gap-3 pb-7 mb-7 border-b border-ink-border">
                <span className="text-4xl font-bold text-gold">{product.price.toLocaleString()}</span>
                <span className="text-white/35 text-sm">{t.common.sar}</span>
                {product.originalPrice && (
                  <>
                    <span className="text-white/25 line-through text-lg">{product.originalPrice.toLocaleString()}</span>
                    <Badge variant="sale">-{discount}%</Badge>
                  </>
                )}
              </div>

              {/* Short desc */}
              <p className="text-white/50 text-sm leading-relaxed mb-7">
                {product.shortDescription[lang]}
              </p>

              {/* Size */}
              {product.sizes && product.sizes.length > 0 && (
                <div className="mb-7">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm font-medium text-white/60">{t.product.size}</span>
                    {selectedSize && <span className="text-gold text-sm font-semibold">{selectedSize}</span>}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {product.sizes.map(s => (
                      <button key={s} onClick={() => setSelectedSize(s)}
                        className={`w-11 h-11 rounded-xl text-sm font-medium border transition-all duration-200
                          ${selectedSize === s
                            ? 'bg-gold text-ink-deep border-gold'
                            : 'bg-ink-card border-ink-border text-white/50 hover:border-gold/40 hover:text-white'
                          }`}
                      >{s}</button>
                    ))}
                  </div>
                </div>
              )}

              {/* Qty */}
              <div className="mb-7">
                <span className="text-sm font-medium text-white/60 block mb-3">{t.product.quantity}</span>
                <div className="flex items-center gap-4">
                  <div className="flex items-center rounded-xl border border-ink-border overflow-hidden">
                    <button onClick={() => setQty(q => Math.max(1, q - 1))}
                      className="px-4 py-3 text-white/40 hover:text-white hover:bg-ink-lifted transition-colors text-lg">−</button>
                    <span className="px-5 text-white font-medium min-w-[42px] text-center">{qty}</span>
                    <button onClick={() => setQty(q => Math.min(product.stockCount ?? 99, q + 1))}
                      className="px-4 py-3 text-white/40 hover:text-white hover:bg-ink-lifted transition-colors text-lg">+</button>
                  </div>
                  <span className={`text-sm font-medium ${product.inStock ? 'text-emerald-400' : 'text-red-400'}`}>
                    {product.inStock ? `✓ ${t.product.inStock}` : t.product.outOfStock}
                  </span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3 mb-4">
                <Button variant="gold" size="lg" className="flex-1 gap-2" onClick={handleAddToCart} disabled={!product.inStock}>
                  <ShoppingBag size={18} strokeWidth={1.5} />
                  {justAdded ? t.product.addedToCart : t.product.addToCart}
                </Button>
                <button onClick={() => setWishlisted(w => !w)}
                  className={`p-4 rounded-xl border transition-all duration-200
                    ${wishlisted ? 'bg-red-500/15 border-red-500/40 text-red-400' : 'bg-ink-card border-ink-border text-white/30 hover:text-red-400 hover:border-red-400/30'}`}
                >
                  <Heart size={20} strokeWidth={1.5} fill={wishlisted ? 'currentColor' : 'none'} />
                </button>
              </div>

              <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                <Button variant="whatsapp" size="lg" fullWidth className="gap-2 mb-8">
                  <MessageCircle size={18} strokeWidth={1.5} />
                  {t.product.orderWhatsapp}
                </Button>
              </a>

              {/* Trust icons */}
              <div className="grid grid-cols-3 gap-3 mb-7">
                {[
                  { Icon: Shield, text: lang === 'ar' ? 'ضمان الأصالة' : 'Authentic' },
                  { Icon: Truck,  text: lang === 'ar' ? 'توصيل مجاني' : 'Free Delivery' },
                  { Icon: RotateCcw, text: lang === 'ar' ? 'إرجاع ١٤ يوم' : '14-Day Return' },
                ].map(({ Icon, text }) => (
                  <div key={text} className="flex flex-col items-center gap-2 p-3.5 bg-ink-card rounded-xl border border-ink-border text-center">
                    <Icon size={17} className="text-gold" strokeWidth={1.5} />
                    <span className="text-[11px] text-white/40 leading-tight">{text}</span>
                  </div>
                ))}
              </div>

              {/* Product meta */}
              <div className="p-4 bg-ink-card rounded-xl border border-ink-border mb-7 space-y-2">
                {[
                  { label: t.product.sku,      value: product.sku },
                  { label: t.product.material, value: product.material === 'gold' ? t.product.goldBadge : t.product.silverBadge },
                  { label: t.product.weight,   value: product.weight },
                ].filter(r => r.value).map(({ label, value }) => (
                  <div key={label} className="flex justify-between text-sm">
                    <span className="text-white/30">{label}</span>
                    <span className="text-white/60 font-medium">{value}</span>
                  </div>
                ))}
              </div>

              {/* Accordion */}
              <div className="space-y-2">
                {accordionSections.map(s => (
                  <div key={s.id} className="overflow-hidden rounded-xl border border-ink-border">
                    <button
                      onClick={() => setOpenSection(openSection === s.id ? null : s.id)}
                      className="w-full flex items-center justify-between px-4 py-4 text-sm font-medium text-white/60 hover:text-white bg-ink-card transition-colors"
                    >
                      {s.title}
                      <ChevronDown size={15} className={`text-white/30 transition-transform duration-200 ${openSection === s.id ? 'rotate-180' : ''}`} />
                    </button>
                    {openSection === s.id && (
                      <div className="px-4 py-4 text-sm text-white/40 leading-relaxed border-t border-ink-border bg-ink-deep">
                        {s.content}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Full description */}
          <div className="mt-20 pt-12 border-t border-ink-border">
            <h2 className="display-serif text-2xl text-white mb-4">{t.product.description}</h2>
            <p className="text-white/45 leading-relaxed max-w-3xl">{product.description[lang]}</p>
          </div>

          <RelatedProducts products={related} />
        </div>
      </main>
      <Footer />
    </>
  )
}
