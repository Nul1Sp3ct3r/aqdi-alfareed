'use client'
import { useState } from 'react'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import {
  ShoppingBag, Heart, MessageCircle,
  Shield, Truck, RotateCcw, ChevronDown, Star,
  Package, Gift, Sparkles, ChevronRight,
} from 'lucide-react'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import ProductGallery from '@/components/product/ProductGallery'
import RelatedProducts from '@/components/product/RelatedProducts'
import { useLanguage } from '@/context/LanguageContext'
import { useCart } from '@/context/CartContext'
import { getProductById, getRelatedProducts } from '@/data/products'
import { siteConfig } from '@/lib/config'

const categoryLabel: Record<string, { ar: string; en: string }> = {
  necklaces: { ar: 'القلائد',      en: 'Necklaces' },
  earrings:  { ar: 'الحلقان',      en: 'Earrings'  },
  rings:     { ar: 'الخواتم',      en: 'Rings'     },
  bracelets: { ar: 'الأساور',      en: 'Bracelets' },
  giftSets:  { ar: 'أطقم الهدايا', en: 'Gift Sets' },
}

export default function ProductPage({ params }: { params: { id: string } }) {
  const { t, lang } = useLanguage()
  const { addToCart } = useCart()

  const [qty, setQty]                   = useState(1)
  const [selectedSize, setSelectedSize] = useState('')
  const [justAdded, setJustAdded]       = useState(false)
  const [wishlisted, setWishlisted]     = useState(false)
  const [openSection, setOpenSection]   = useState<string | null>('care')

  const product  = getProductById(params.id)
  if (!product) notFound()

  const related  = getRelatedProducts(product)
  const isRTL    = lang === 'ar'
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
      id: 'care', Icon: Sparkles, title: t.product.careInstructions,
      content: product.careInstructions?.[lang] ?? (lang === 'ar'
        ? 'نظّفي بقطعة قماش ناعمة جافة. تجنّبي الرطوبة والعطور.'
        : 'Clean with a soft dry cloth. Avoid moisture and perfumes.'),
    },
    { id: 'shipping', Icon: Truck,     title: t.product.shippingInfo, content: t.product.shippingText },
    { id: 'returns',  Icon: RotateCcw, title: t.product.returnPolicy, content: t.product.returnText   },
  ]

  const trustItems = [
    { Icon: Truck,   labelAr: 'شحن سريع ومجاني', labelEn: 'Free Fast Shipping' },
    { Icon: Package, labelAr: 'تغليف فاخر',       labelEn: 'Luxury Packaging'   },
    { Icon: Shield,  labelAr: 'ضمان الجودة',      labelEn: 'Quality Guarantee'  },
    { Icon: Gift,    labelAr: 'إمكانية الإهداء',  labelEn: 'Gift-Ready'         },
  ]

  const metaRows = [
    { label: t.product.sku,      value: product.sku },
    { label: t.product.material, value: lang === 'ar'
        ? (product.material === 'gold' ? 'ذهب · 18K' : 'فضة · 925')
        : (product.material === 'gold' ? 'Gold · 18K' : 'Silver · 925') },
    { label: t.product.weight,   value: product.weight },
    { label: lang === 'ar' ? 'الفئة' : 'Category',
      value: categoryLabel[product.category]?.[lang] ?? product.category },
  ].filter(r => r.value)

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-cream">

        {/* ── Breadcrumb ────────────────────────────────────── */}
        <div className="bg-cream-warm border-b border-[#E8DEC8]">
          <div className="container py-3.5">
            <nav className="flex items-center gap-1.5 text-[11.5px] text-ink-muted flex-wrap">
              <Link href="/" className="hover:text-gold transition-colors duration-150">
                {lang === 'ar' ? 'الرئيسية' : 'Home'}
              </Link>
              <ChevronRight size={11} className={`text-[#C8BFA8] flex-shrink-0 ${isRTL ? 'rotate-180' : ''}`} />
              <Link href="/shop" className="hover:text-gold transition-colors duration-150">
                {lang === 'ar' ? 'المتجر' : 'Shop'}
              </Link>
              <ChevronRight size={11} className={`text-[#C8BFA8] flex-shrink-0 ${isRTL ? 'rotate-180' : ''}`} />
              <span className="text-ink font-medium truncate max-w-[180px] sm:max-w-xs">
                {product.name[lang]}
              </span>
            </nav>
          </div>
        </div>

        {/* ── Main two-column layout ────────────────────────── */}
        <div className="container py-10 md:py-14">
          <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] gap-10 lg:gap-14 lg:items-start">

            {/* ══ GALLERY ══════════════════════════════════ */}
            <ProductGallery images={product.images} productName={product.name[lang]} />

            {/* ══ INFO CARD ════════════════════════════════ */}
            <div className="bg-white rounded-2xl border border-[#E8DEC8] shadow-card p-6 md:p-8 lg:sticky lg:top-24">

              {/* Badge row */}
              <div className={`flex flex-wrap items-center gap-2 mb-5 ${isRTL ? 'justify-end' : ''}`}>
                <span
                  className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold tracking-[0.16em] uppercase border
                    ${product.material === 'gold'
                      ? 'bg-gold/10 text-[#7A5E1A] border-gold/25'
                      : 'bg-cream text-ink-muted border-[#E8DEC8]'
                    }`}
                >
                  <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${product.material === 'gold' ? 'bg-gold' : 'bg-[#909090]'}`} />
                  {product.material === 'gold' ? t.product.goldBadge : t.product.silverBadge} · 925
                </span>
                {product.isNew && (
                  <span className="inline-flex items-center bg-gold text-white text-[10px] font-bold px-3 py-1 rounded-full tracking-[0.12em] uppercase">
                    {t.product.newBadge}
                  </span>
                )}
                {product.isBestSeller && (
                  <span className="inline-flex items-center bg-jet-deep text-[#D8B45A] text-[10px] font-bold px-3 py-1 rounded-full tracking-[0.12em] uppercase border border-gold/20">
                    ✦ {t.product.bestSellerBadge}
                  </span>
                )}
              </div>

              {/* Product name */}
              <h1
                className={`text-ink leading-tight mb-4
                  ${isRTL
                    ? 'display-arabic text-[1.85rem] md:text-[2.2rem] font-bold'
                    : 'display-serif text-[1.85rem] md:text-[2.2rem]'
                  }`}
              >
                {product.name[lang]}
              </h1>

              {/* Rating */}
              {product.rating && (
                <div className={`flex items-center gap-2.5 mb-5 ${isRTL ? 'flex-row-reverse justify-end' : ''}`}>
                  <div className="flex gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={13}
                        className={i < Math.floor(product.rating!) ? 'text-gold fill-gold' : 'text-[#D8CEB8] fill-[#D8CEB8]'}
                      />
                    ))}
                  </div>
                  <span className="text-[12px] text-ink-muted font-medium">
                    {product.rating}
                    <span className="mx-1 text-[#C8BFA8]">·</span>
                    {product.reviewCount} {t.product.reviews}
                  </span>
                </div>
              )}

              {/* Price */}
              <div className="flex flex-wrap items-baseline gap-2.5 mb-5 pb-5 border-b border-[#E8DEC8]">
                <span className="text-[2.1rem] font-bold text-gold leading-none tabular-nums">
                  {product.price.toLocaleString()}
                </span>
                <span className="text-[13px] font-semibold text-gold/60 leading-none">
                  {t.common.sar}
                </span>
                {product.originalPrice && (
                  <>
                    <span className="text-base text-ink-muted line-through leading-none tabular-nums ms-1">
                      {product.originalPrice.toLocaleString()} {t.common.sar}
                    </span>
                    <span className="bg-red-500 text-white text-[9.5px] font-bold px-2.5 py-[3.5px] rounded-full leading-none">
                      −{discount}%
                    </span>
                  </>
                )}
              </div>

              {/* Short description */}
              <p className={`text-ink-muted text-[14px] leading-[1.85] mb-6 ${isRTL ? 'text-right' : ''}`}>
                {product.shortDescription[lang]}
              </p>

              {/* Size selector */}
              {product.sizes && product.sizes.length > 0 && (
                <div className="mb-6">
                  <div className={`flex items-center justify-between mb-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
                    <span className="text-[13px] font-bold text-ink tracking-wide">{t.product.size}</span>
                    {selectedSize && <span className="text-[13px] text-gold font-bold">{selectedSize}</span>}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {product.sizes.map(s => (
                      <button key={s} onClick={() => setSelectedSize(s)}
                        className={`w-11 h-11 rounded-xl border text-sm font-semibold transition-all duration-200
                          ${selectedSize === s
                            ? 'bg-gold text-white border-gold shadow-gold-sm'
                            : 'bg-white text-ink border-[#E8DEC8] hover:border-gold hover:text-gold'
                          }`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity */}
              <div className="mb-6">
                <div className={`flex items-center justify-between mb-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <span className="text-[13px] font-bold text-ink tracking-wide">{t.product.quantity}</span>
                  <span className={`text-[12.5px] font-semibold flex items-center gap-1.5 ${product.inStock ? 'text-emerald-600' : 'text-red-500'}`}>
                    <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${product.inStock ? 'bg-emerald-500' : 'bg-red-500'}`} />
                    {product.inStock ? t.product.inStock : t.product.outOfStock}
                  </span>
                </div>
                <div className="inline-flex items-center rounded-xl overflow-hidden border border-[#E8DEC8] bg-white shadow-sm">
                  <button onClick={() => setQty(q => Math.max(1, q - 1))}
                    className="w-11 h-11 flex items-center justify-center text-xl select-none font-light text-ink-muted hover:text-gold hover:bg-cream transition-colors duration-150">
                    −
                  </button>
                  <span className="w-12 text-center text-ink font-bold text-sm border-x border-[#E8DEC8]">
                    {qty}
                  </span>
                  <button onClick={() => setQty(q => Math.min(product.stockCount ?? 99, q + 1))}
                    className="w-11 h-11 flex items-center justify-center text-xl select-none font-light text-ink-muted hover:text-gold hover:bg-cream transition-colors duration-150">
                    +
                  </button>
                </div>
              </div>

              {/* CTA buttons */}
              <div className="space-y-2.5 mb-7">
                <div className="flex gap-2.5">
                  <button onClick={handleAddToCart} disabled={!product.inStock}
                    className={`flex-1 flex items-center justify-center gap-2 py-[14px] rounded-xl text-[13px] font-bold tracking-[0.04em] transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed
                      ${justAdded
                        ? 'bg-jet-deep text-white'
                        : 'bg-gold text-white hover:bg-gold-light hover:shadow-[0_6px_24px_rgba(185,146,47,0.30)]'
                      }`}
                  >
                    <ShoppingBag size={17} strokeWidth={1.8} />
                    {justAdded
                      ? lang === 'ar' ? '✓ تمت الإضافة' : '✓ Added!'
                      : t.product.addToCart}
                  </button>

                  <button onClick={() => setWishlisted(w => !w)}
                    className={`w-[50px] flex items-center justify-center rounded-xl border transition-all duration-200 flex-shrink-0
                      ${wishlisted
                        ? 'bg-rose-50 border-rose-200 text-rose-400'
                        : 'bg-white border-[#E8DEC8] text-ink-muted hover:border-gold hover:text-gold hover:bg-cream'
                      }`}
                    aria-label={t.product.addToWishlist}
                  >
                    <Heart size={19} strokeWidth={1.6} fill={wishlisted ? 'currentColor' : 'none'} />
                  </button>
                </div>

                <a href={whatsappUrl} target="_blank" rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2.5 py-[14px] rounded-xl w-full text-[13px] font-bold tracking-[0.04em] border-2 border-[#25d366]/40 text-[#1daa58] transition-all duration-200 hover:bg-[#25d366] hover:text-white hover:border-[#25d366] hover:shadow-[0_6px_24px_rgba(37,211,102,0.22)]"
                >
                  <MessageCircle size={17} strokeWidth={1.8} />
                  {t.product.orderWhatsapp}
                </a>
              </div>

              {/* Trust badges */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mb-7">
                {trustItems.map(({ Icon, labelAr, labelEn }) => (
                  <div key={labelEn}
                    className="flex flex-col items-center gap-2 p-3 rounded-xl text-center bg-cream-warm border border-[#E8DEC8]"
                  >
                    <div className="w-8 h-8 rounded-full bg-gold/10 flex items-center justify-center flex-shrink-0">
                      <Icon size={14} className="text-gold" strokeWidth={1.6} />
                    </div>
                    <span className="text-[10.5px] font-semibold text-ink-muted leading-tight">
                      {lang === 'ar' ? labelAr : labelEn}
                    </span>
                  </div>
                ))}
              </div>

              {/* Specifications table */}
              {metaRows.length > 0 && (
                <div className="rounded-2xl overflow-hidden border border-[#E8DEC8] mb-5 shadow-sm">
                  <div className="px-4 py-3 bg-cream-warm border-b border-[#E8DEC8]">
                    <span className="text-[11px] font-bold text-gold tracking-[0.20em] uppercase">
                      {lang === 'ar' ? 'مواصفات المنتج' : 'Product Specifications'}
                    </span>
                  </div>
                  <div className="bg-white">
                    {metaRows.map(({ label, value }) => (
                      <div key={label} className="flex items-center justify-between px-4 py-3 border-b border-[#E8DEC8]">
                        <span className="text-[12.5px] text-ink-muted">{label}</span>
                        <span className="text-[12.5px] text-ink font-semibold">{value}</span>
                      </div>
                    ))}
                    <div className="flex items-center justify-between px-4 py-3">
                      <span className="text-[12.5px] text-ink-muted">{lang === 'ar' ? 'التوفر' : 'Availability'}</span>
                      <span className={`text-[12.5px] font-bold flex items-center gap-1.5 ${product.inStock ? 'text-emerald-600' : 'text-red-500'}`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${product.inStock ? 'bg-emerald-500' : 'bg-red-500'}`} />
                        {product.inStock ? t.product.inStock : t.product.outOfStock}
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* Accordion */}
              <div className="rounded-2xl overflow-hidden border border-[#E8DEC8] shadow-sm">
                {accordionSections.map(({ id, Icon, title, content }, idx) => (
                  <div key={id} style={idx > 0 ? { borderTop: '1px solid #E8DEC8' } : undefined}>
                    <button
                      onClick={() => setOpenSection(openSection === id ? null : id)}
                      className="w-full flex items-center justify-between px-4 py-4 bg-white hover:bg-cream-warm transition-colors duration-150"
                    >
                      <div className="flex items-center gap-2.5">
                        <div className="w-7 h-7 rounded-lg bg-gold/10 flex items-center justify-center flex-shrink-0">
                          <Icon size={13} className="text-gold" strokeWidth={1.7} />
                        </div>
                        <span className="text-[13px] font-bold text-ink">{title}</span>
                      </div>
                      <ChevronDown size={14} className={`text-ink-muted transition-transform duration-200 flex-shrink-0 ${openSection === id ? 'rotate-180' : ''}`} />
                    </button>
                    {openSection === id && (
                      <div className="px-4 pb-4 pt-2 text-[13px] text-ink-muted leading-[1.9] bg-cream-warm border-t border-[#E8DEC8]">
                        {content}
                      </div>
                    )}
                  </div>
                ))}
              </div>

            </div>
            {/* ══ END INFO CARD ═══════════════════════════════ */}

          </div>

          {/* ── Description card ──────────────────────────────── */}
          <div className="mt-14 rounded-2xl bg-white border border-[#E8DEC8] shadow-card p-8 md:p-12">
            <div className="flex items-center gap-5 mb-8">
              <div className="h-px flex-1" style={{ background: 'linear-gradient(to right, rgba(185,146,47,0.28), transparent)' }} />
              <div className="text-center flex-shrink-0">
                <span className="label-luxury block mb-2">{lang === 'ar' ? 'عن القطعة' : 'About This Piece'}</span>
                <h2 className={`text-[1.5rem] md:text-[1.75rem] font-bold text-ink leading-tight ${isRTL ? 'display-arabic' : 'display-serif'}`}>
                  {t.product.description}
                </h2>
              </div>
              <div className="h-px flex-1" style={{ background: 'linear-gradient(to left, rgba(185,146,47,0.28), transparent)' }} />
            </div>

            <div className="max-w-2xl mx-auto">
              <p className={`text-ink-muted text-[14.5px] leading-[2.1] mb-7 ${isRTL ? 'text-right' : ''}`}>
                {product.description[lang]}
              </p>
              <div className="bg-cream-warm rounded-2xl border border-[#E8DEC8] p-6">
                <p className="label-luxury mb-3">
                  {lang === 'ar' ? '✦ لماذا ستحبّينها؟' : "✦ Why You'll Love It"}
                </p>
                <p className={`text-[13.5px] text-ink-muted leading-[2] ${isRTL ? 'text-right' : ''}`}>
                  {lang === 'ar'
                    ? `كل تفصيلة في هذه القطعة تعكس الذوق الرفيع والحرفية العالية. من ${product.material === 'gold' ? 'الذهب الأصيل' : 'الفضة الخالصة 925'} — قطعة تُكملك وتبقى معكِ في كل مناسبة.`
                    : `Every detail in this piece reflects refined taste and exceptional craftsmanship. Crafted from ${product.material === 'gold' ? 'authentic gold' : '925 sterling silver'} — a piece that completes you and stays with you in every occasion.`
                  }
                </p>
              </div>
            </div>
          </div>

          <RelatedProducts products={related} />
        </div>
      </main>
      <Footer />
    </>
  )
}
