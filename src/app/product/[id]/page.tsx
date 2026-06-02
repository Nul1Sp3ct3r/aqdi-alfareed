'use client'
import { useState } from 'react'
import { notFound } from 'next/navigation'
import {
  ShoppingBag, Heart, MessageCircle,
  Shield, Truck, RotateCcw, ChevronDown, Star,
} from 'lucide-react'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import ProductGallery from '@/components/product/ProductGallery'
import RelatedProducts from '@/components/product/RelatedProducts'
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
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : null

  const handleAddToCart = () => {
    if (justAdded) return
    addToCart(product, qty, selectedSize || undefined)
    setJustAdded(true)
    setTimeout(() => setJustAdded(false), 1800)
  }

  const whatsappMsg = encodeURIComponent(
    lang === 'ar'
      ? `السلام عليكم، أريد الطلب:\n${product.name.ar}\nالسعر: ${product.price} ر.س`
      : `Hello, I'd like to order:\n${product.name.en}\nPrice: ${product.price} SAR`
  )
  const whatsappUrl = `${siteConfig.whatsappUrl}?text=${whatsappMsg}`

  const accordionSections = [
    {
      id: 'care',
      title: t.product.careInstructions,
      content:
        product.careInstructions?.[lang] ??
        (lang === 'ar'
          ? 'نظّفي بقطعة قماش ناعمة جافة. تجنّبي الرطوبة والعطور.'
          : 'Clean with a soft dry cloth. Avoid moisture and perfumes.'),
    },
    { id: 'shipping', title: t.product.shippingInfo, content: t.product.shippingText },
    { id: 'returns',  title: t.product.returnPolicy,  content: t.product.returnText },
  ]

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-white">
        {/* Breadcrumb */}
        <div className="bg-[#FAFAF8] border-b border-[#E8E2D6] py-3">
          <div className="container text-xs text-ink-muted flex items-center gap-2 flex-wrap">
            <span className="hover:text-gold transition-colors cursor-pointer">
              {lang === 'ar' ? 'الرئيسية' : 'Home'}
            </span>
            <span className="text-[#ddd]">/</span>
            <span className="hover:text-gold transition-colors cursor-pointer">
              {lang === 'ar' ? 'المتجر' : 'Shop'}
            </span>
            <span className="text-[#ddd]">/</span>
            <span className="text-ink font-medium truncate max-w-[200px]">
              {product.name[lang]}
            </span>
          </div>
        </div>

        <div className="container py-10 md:py-14">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
            {/* Gallery */}
            <ProductGallery images={product.images} productName={product.name[lang]} />

            {/* Product info */}
            <div>
              {/* Material + badges */}
              <div className="flex flex-wrap items-center gap-2.5 mb-4">
                <span
                  className={`text-[11px] tracking-widest uppercase font-bold ${
                    product.material === 'gold' ? 'text-gold' : 'text-[#666]'
                  }`}
                >
                  {product.material === 'gold' ? t.product.goldBadge : t.product.silverBadge} · 925
                </span>
                {product.isNew && (
                  <span className="bg-gold text-white text-[9px] font-bold px-2.5 py-0.5 tracking-wider uppercase">
                    {t.product.newBadge}
                  </span>
                )}
                {product.isBestSeller && (
                  <span className="bg-[#7a5c10] text-white text-[9px] font-bold px-2.5 py-0.5 tracking-wider uppercase">
                    {t.product.bestSellerBadge}
                  </span>
                )}
              </div>

              {/* Name */}
              <h1
                className={`text-ink leading-tight mb-4
                  ${lang === 'ar'
                    ? 'display-arabic text-[1.9rem] md:text-[2.3rem] font-bold'
                    : 'display-serif text-[1.9rem] md:text-[2.3rem]'
                  }`}
              >
                {product.name[lang]}
              </h1>

              {/* Rating */}
              {product.rating && (
                <div className="flex items-center gap-2 mb-5">
                  <div className="flex gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={13}
                        className={
                          i < Math.floor(product.rating!)
                            ? 'text-gold fill-gold'
                            : 'text-[#ddd] fill-[#ddd]'
                        }
                      />
                    ))}
                  </div>
                  <span className="text-xs text-ink-muted">
                    {product.rating} · {product.reviewCount} {t.product.reviews}
                  </span>
                </div>
              )}

              {/* Price */}
              <div className="flex items-baseline gap-3 pb-6 mb-6 border-b border-[#E8E2D6]">
                <span className="text-[2rem] font-bold text-gold leading-none">
                  {product.price.toLocaleString()}
                </span>
                <span className="text-ink-muted text-sm">{t.common.sar}</span>
                {product.originalPrice && (
                  <>
                    <span className="text-ink-muted line-through text-lg">
                      {product.originalPrice.toLocaleString()}
                    </span>
                    <span className="bg-red-600 text-white text-[9px] font-bold px-2 py-0.5">
                      -{discount}%
                    </span>
                  </>
                )}
              </div>

              {/* Short description */}
              <p className="text-ink-muted leading-relaxed mb-7 text-sm">
                {product.shortDescription[lang]}
              </p>

              {/* Size selector */}
              {product.sizes && product.sizes.length > 0 && (
                <div className="mb-7">
                  <div className="flex justify-between mb-3">
                    <span className="text-sm font-semibold text-ink">{t.product.size}</span>
                    {selectedSize && (
                      <span className="text-gold text-sm font-semibold">{selectedSize}</span>
                    )}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {product.sizes.map(s => (
                      <button
                        key={s}
                        onClick={() => setSelectedSize(s)}
                        className={`w-11 h-11 border text-sm font-medium transition-all duration-200
                          ${selectedSize === s
                            ? 'bg-gold text-white border-gold'
                            : 'bg-white text-ink border-[#E8E2D6] hover:border-gold hover:text-gold'
                          }`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity */}
              <div className="mb-7">
                <span className="text-sm font-semibold text-ink block mb-3">
                  {t.product.quantity}
                </span>
                <div className="flex items-center gap-5">
                  <div className="flex items-center border border-[#E8E2D6]">
                    <button
                      onClick={() => setQty(q => Math.max(1, q - 1))}
                      className="px-4 py-3 text-ink-muted hover:text-gold hover:bg-[#FAFAF8] transition-colors text-lg select-none"
                    >
                      −
                    </button>
                    <span className="px-5 text-ink font-semibold min-w-[44px] text-center border-x border-[#E8E2D6]">
                      {qty}
                    </span>
                    <button
                      onClick={() => setQty(q => Math.min(product.stockCount ?? 99, q + 1))}
                      className="px-4 py-3 text-ink-muted hover:text-gold hover:bg-[#FAFAF8] transition-colors text-lg select-none"
                    >
                      +
                    </button>
                  </div>
                  <span
                    className={`text-sm font-semibold ${
                      product.inStock ? 'text-emerald-600' : 'text-red-500'
                    }`}
                  >
                    {product.inStock ? `✓ ${t.product.inStock}` : t.product.outOfStock}
                  </span>
                </div>
              </div>

              {/* CTA buttons */}
              <div className="flex gap-3 mb-4">
                <button
                  onClick={handleAddToCart}
                  disabled={!product.inStock}
                  className={`btn flex-1 py-4 rounded-none tracking-wide text-sm gap-2 ${
                    justAdded ? 'btn-dark' : 'btn-gold'
                  }`}
                >
                  <ShoppingBag size={17} strokeWidth={1.5} />
                  {justAdded
                    ? lang === 'ar' ? '✓ تمت الإضافة' : '✓ Added!'
                    : t.product.addToCart}
                </button>
                <button
                  onClick={() => setWishlisted(w => !w)}
                  className={`p-4 border transition-all rounded-none ${
                    wishlisted
                      ? 'bg-red-50 border-red-300 text-red-500'
                      : 'bg-white border-[#E8E2D6] text-ink-muted hover:border-gold hover:text-gold'
                  }`}
                >
                  <Heart size={20} strokeWidth={1.5} fill={wishlisted ? 'currentColor' : 'none'} />
                </button>
              </div>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-whatsapp w-full py-4 rounded-none tracking-wide text-sm gap-2 mb-8 flex items-center justify-center"
              >
                <MessageCircle size={17} strokeWidth={1.5} />
                {t.product.orderWhatsapp}
              </a>

              {/* Trust badges */}
              <div className="grid grid-cols-3 gap-3 mb-7">
                {[
                  { Icon: Shield,    text: lang === 'ar' ? 'ضمان الأصالة' : 'Authentic' },
                  { Icon: Truck,     text: lang === 'ar' ? 'توصيل مجاني' : 'Free Shipping' },
                  { Icon: RotateCcw, text: lang === 'ar' ? 'إرجاع ١٤ يوم' : '14-Day Return' },
                ].map(({ Icon, text }) => (
                  <div
                    key={text}
                    className="flex flex-col items-center gap-2 p-3.5 bg-[#FAFAF8] border border-[#E8E2D6] text-center"
                  >
                    <Icon size={16} className="text-gold" strokeWidth={1.5} />
                    <span className="text-[11px] text-ink-muted leading-tight">{text}</span>
                  </div>
                ))}
              </div>

              {/* Product meta */}
              <div className="p-4 bg-[#FAFAF8] border border-[#E8E2D6] mb-7 space-y-2.5">
                {[
                  { label: t.product.sku,      value: product.sku },
                  { label: t.product.material, value: product.material },
                  { label: t.product.weight,   value: product.weight },
                ]
                  .filter(r => r.value)
                  .map(({ label, value }) => (
                    <div key={label} className="flex justify-between text-sm">
                      <span className="text-ink-muted">{label}</span>
                      <span className="text-ink font-semibold">{value}</span>
                    </div>
                  ))}
              </div>

              {/* Accordion */}
              <div className="space-y-2">
                {accordionSections.map(s => (
                  <div key={s.id} className="overflow-hidden border border-[#E8E2D6]">
                    <button
                      onClick={() => setOpenSection(openSection === s.id ? null : s.id)}
                      className="w-full flex items-center justify-between px-4 py-4 text-sm font-semibold text-ink bg-white hover:bg-[#FAFAF8] transition-colors"
                    >
                      {s.title}
                      <ChevronDown
                        size={15}
                        className={`text-ink-muted transition-transform duration-200 ${
                          openSection === s.id ? 'rotate-180' : ''
                        }`}
                      />
                    </button>
                    {openSection === s.id && (
                      <div className="px-4 py-4 text-sm text-ink-muted leading-relaxed border-t border-[#E8E2D6] bg-[#FAFAF8]">
                        {s.content}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Full description */}
          <div className="mt-16 pt-10 border-t border-[#E8E2D6]">
            <h2
              className={`text-ink mb-4 ${
                lang === 'ar'
                  ? 'display-arabic text-xl font-bold'
                  : 'display-serif text-2xl'
              }`}
            >
              {t.product.description}
            </h2>
            <p className="text-ink-muted leading-relaxed max-w-3xl text-sm">
              {product.description[lang]}
            </p>
          </div>

          <RelatedProducts products={related} />
        </div>
      </main>
      <Footer />
    </>
  )
}
