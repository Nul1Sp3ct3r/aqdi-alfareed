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
  necklaces:  { ar: 'القلائد',  en: 'Necklaces' },
  earrings:   { ar: 'الحلقان',  en: 'Earrings'  },
  rings:      { ar: 'الخواتم',  en: 'Rings'     },
  bracelets:  { ar: 'الأساور',  en: 'Bracelets' },
  giftSets:   { ar: 'أطقم الهدايا', en: 'Gift Sets' },
}

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
      id: 'care',
      Icon: Sparkles,
      title: t.product.careInstructions,
      content:
        product.careInstructions?.[lang] ??
        (lang === 'ar'
          ? 'نظّفي بقطعة قماش ناعمة جافة. تجنّبي الرطوبة والعطور.'
          : 'Clean with a soft dry cloth. Avoid moisture and perfumes.'),
    },
    { id: 'shipping', Icon: Truck,     title: t.product.shippingInfo,  content: t.product.shippingText },
    { id: 'returns',  Icon: RotateCcw, title: t.product.returnPolicy,  content: t.product.returnText   },
  ]

  const trustItems = [
    { Icon: Truck,   labelAr: 'شحن سريع ومجاني',   labelEn: 'Free Fast Shipping' },
    { Icon: Package, labelAr: 'تغليف فاخر',         labelEn: 'Luxury Packaging'   },
    { Icon: Shield,  labelAr: 'ضمان الجودة',        labelEn: 'Quality Guarantee'  },
    { Icon: Gift,    labelAr: 'إمكانية الإهداء',    labelEn: 'Gift-Ready'         },
  ]

  const metaRows = [
    { label: t.product.sku,      value: product.sku },
    { label: t.product.material, value: lang === 'ar'
        ? (product.material === 'gold' ? 'ذهب · 18K' : 'فضة · 925')
        : (product.material === 'gold' ? 'Gold · 18K' : 'Silver · 925') },
    { label: t.product.weight,   value: product.weight },
    { label: lang === 'ar' ? 'الفئة' : 'Category',
      value: (categoryLabel[product.category]?.[lang]) ?? product.category },
  ].filter(r => r.value)

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-white">

        {/* ── Breadcrumb ──────────────────────────────────── */}
        <div className="bg-[#FAFAF8] border-b border-[#EDE8DF]">
          <div className="container py-3.5">
            <nav className="flex items-center gap-1.5 text-[11.5px] text-[#999] flex-wrap">
              <Link href="/" className="hover:text-[#B9922F] transition-colors duration-150">
                {lang === 'ar' ? 'الرئيسية' : 'Home'}
              </Link>
              <ChevronRight size={11} className={`text-[#ccc] flex-shrink-0 ${isRTL ? 'rotate-180' : ''}`} />
              <Link href="/shop" className="hover:text-[#B9922F] transition-colors duration-150">
                {lang === 'ar' ? 'المتجر' : 'Shop'}
              </Link>
              <ChevronRight size={11} className={`text-[#ccc] flex-shrink-0 ${isRTL ? 'rotate-180' : ''}`} />
              <span className="text-[#444] font-medium truncate max-w-[180px] sm:max-w-xs">
                {product.name[lang]}
              </span>
            </nav>
          </div>
        </div>

        {/* ── Main two-column layout ───────────────────────── */}
        <div className="container py-10 md:py-14">
          <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] gap-10 lg:gap-16 lg:items-start">

            {/* ═══ GALLERY COLUMN ═══════════════════════════ */}
            <ProductGallery images={product.images} productName={product.name[lang]} />

            {/* ═══ INFO COLUMN ══════════════════════════════ */}
            <div className="lg:sticky lg:top-24">

              {/* ── Badges row ──────────────────────────────── */}
              <div className={`flex flex-wrap items-center gap-2 mb-4 ${isRTL ? 'justify-end' : ''}`}>
                {/* Material pill */}
                <span
                  className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold tracking-[0.18em] uppercase border
                    ${product.material === 'gold'
                      ? 'bg-[#B9922F]/10 text-[#8A6A1F] border-[#B9922F]/25'
                      : 'bg-[#F0F0F0] text-[#555] border-[#DDD]'
                    }`}
                >
                  <span
                    className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${
                      product.material === 'gold' ? 'bg-[#B9922F]' : 'bg-[#888]'
                    }`}
                  />
                  {product.material === 'gold' ? t.product.goldBadge : t.product.silverBadge} · 925
                </span>

                {product.isNew && (
                  <span className="inline-flex items-center bg-[#B9922F] text-white text-[10px] font-bold px-3 py-1 rounded-full tracking-[0.12em] uppercase">
                    {t.product.newBadge}
                  </span>
                )}
                {product.isBestSeller && (
                  <span className="inline-flex items-center bg-[#111] text-[#D4AF37] text-[10px] font-bold px-3 py-1 rounded-full tracking-[0.12em] uppercase border border-[#D4AF37]/20">
                    ✦ {t.product.bestSellerBadge}
                  </span>
                )}
              </div>

              {/* ── Product name ─────────────────────────────── */}
              <h1
                className={`text-[#050505] leading-tight mb-4
                  ${isRTL
                    ? 'display-arabic text-[1.85rem] md:text-[2.25rem] font-bold'
                    : 'display-serif text-[1.85rem] md:text-[2.25rem]'
                  }`}
              >
                {product.name[lang]}
              </h1>

              {/* ── Rating ───────────────────────────────────── */}
              {product.rating && (
                <div className={`flex items-center gap-2.5 mb-5 ${isRTL ? 'flex-row-reverse justify-end' : ''}`}>
                  <div className="flex gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={13}
                        className={
                          i < Math.floor(product.rating!)
                            ? 'text-[#B9922F] fill-[#B9922F]'
                            : 'text-[#E0D8CE] fill-[#E0D8CE]'
                        }
                      />
                    ))}
                  </div>
                  <span className="text-[12px] text-[#777] font-medium">
                    {product.rating}
                    <span className="text-[#BBB] mx-1">·</span>
                    {product.reviewCount} {t.product.reviews}
                  </span>
                </div>
              )}

              {/* ── Price block ──────────────────────────────── */}
              <div
                className={`flex flex-wrap items-baseline gap-2.5 mb-1.5 pb-6 border-b border-[#EDE8DF]`}
              >
                <span className="text-[2.1rem] font-bold text-[#B9922F] leading-none tabular-nums">
                  {product.price.toLocaleString()}
                </span>
                <span className="text-[13px] font-semibold text-[#B9922F]/65 leading-none">
                  {t.common.sar}
                </span>
                {product.originalPrice && (
                  <>
                    <span className="text-base text-[#B0A898] line-through leading-none tabular-nums ms-1">
                      {product.originalPrice.toLocaleString()} {t.common.sar}
                    </span>
                    <span className="bg-[#D94040] text-white text-[9.5px] font-bold px-2.5 py-[3.5px] rounded-full leading-none">
                      −{discount}%
                    </span>
                  </>
                )}
              </div>

              {/* ── Short description ────────────────────────── */}
              <p className={`text-[#666] text-[14px] leading-[1.85] mb-6 ${isRTL ? 'text-right' : ''}`}>
                {product.shortDescription[lang]}
              </p>

              {/* ── Size selector ────────────────────────────── */}
              {product.sizes && product.sizes.length > 0 && (
                <div className="mb-6">
                  <div className={`flex items-center justify-between mb-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
                    <span className="text-[13px] font-bold text-[#222] tracking-wide">{t.product.size}</span>
                    {selectedSize && (
                      <span className="text-[13px] text-[#B9922F] font-bold">{selectedSize}</span>
                    )}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {product.sizes.map(s => (
                      <button
                        key={s}
                        onClick={() => setSelectedSize(s)}
                        className={`w-11 h-11 rounded-xl border text-sm font-semibold transition-all duration-200
                          ${selectedSize === s
                            ? 'bg-[#B9922F] text-white border-[#B9922F] shadow-[0_2px_12px_rgba(185,146,47,0.3)]'
                            : 'bg-white text-[#333] border-[#E8E2D6] hover:border-[#B9922F] hover:text-[#B9922F]'
                          }`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* ── Quantity + stock status ───────────────────── */}
              <div className="mb-6">
                <div className={`flex items-center ${isRTL ? 'justify-between flex-row-reverse' : 'justify-between'} mb-3`}>
                  <span className="text-[13px] font-bold text-[#222] tracking-wide">{t.product.quantity}</span>
                  <span
                    className={`text-[12.5px] font-semibold flex items-center gap-1.5 ${
                      product.inStock ? 'text-emerald-600' : 'text-red-500'
                    }`}
                  >
                    <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${product.inStock ? 'bg-emerald-500' : 'bg-red-500'}`} />
                    {product.inStock ? t.product.inStock : t.product.outOfStock}
                  </span>
                </div>

                <div className="inline-flex items-center border border-[#EDE8DF] rounded-xl overflow-hidden bg-white shadow-sm">
                  <button
                    onClick={() => setQty(q => Math.max(1, q - 1))}
                    className="w-11 h-11 flex items-center justify-center text-[#666] hover:text-[#B9922F] hover:bg-[#FAFAF8] transition-colors text-xl select-none font-light"
                  >
                    −
                  </button>
                  <span className="w-12 text-center text-[#111] font-bold text-sm border-x border-[#EDE8DF]">
                    {qty}
                  </span>
                  <button
                    onClick={() => setQty(q => Math.min(product.stockCount ?? 99, q + 1))}
                    className="w-11 h-11 flex items-center justify-center text-[#666] hover:text-[#B9922F] hover:bg-[#FAFAF8] transition-colors text-xl select-none font-light"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* ── CTA buttons ──────────────────────────────── */}
              <div className="space-y-2.5 mb-7">
                {/* Add to cart + wishlist row */}
                <div className="flex gap-2.5">
                  <button
                    onClick={handleAddToCart}
                    disabled={!product.inStock}
                    className={`flex-1 flex items-center justify-center gap-2 py-[14px] rounded-xl text-[13px] font-bold tracking-[0.04em] transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed
                      ${justAdded
                        ? 'bg-[#111] text-white'
                        : 'bg-[#B9922F] text-white hover:bg-[#D4AF37] hover:shadow-[0_6px_24px_rgba(185,146,47,0.32)]'
                      }`}
                  >
                    <ShoppingBag size={17} strokeWidth={1.8} />
                    {justAdded
                      ? lang === 'ar' ? '✓ تمت الإضافة' : '✓ Added!'
                      : t.product.addToCart}
                  </button>

                  <button
                    onClick={() => setWishlisted(w => !w)}
                    className={`w-[50px] flex items-center justify-center rounded-xl border transition-all duration-200 flex-shrink-0
                      ${wishlisted
                        ? 'bg-rose-50 border-rose-200 text-rose-400'
                        : 'bg-white border-[#EDE8DF] text-[#888] hover:border-[#B9922F] hover:text-[#B9922F] hover:bg-[#FDFAF5]'
                      }`}
                    aria-label={t.product.addToWishlist}
                  >
                    <Heart size={19} strokeWidth={1.6} fill={wishlisted ? 'currentColor' : 'none'} />
                  </button>
                </div>

                {/* WhatsApp full width */}
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2.5 py-[14px] rounded-xl w-full text-[13px] font-bold tracking-[0.04em] border-2 border-[#1DAA62]/40 text-[#1DAA62] transition-all duration-200 hover:bg-[#1DAA62] hover:text-white hover:border-[#1DAA62] hover:shadow-[0_6px_24px_rgba(29,170,98,0.22)]"
                >
                  <MessageCircle size={17} strokeWidth={1.8} />
                  {t.product.orderWhatsapp}
                </a>
              </div>

              {/* ── Trust badges ─────────────────────────────── */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mb-7">
                {trustItems.map(({ Icon, labelAr, labelEn }) => (
                  <div
                    key={labelEn}
                    className="flex flex-col items-center gap-2 p-3 bg-[#FAFAF8] rounded-xl border border-[#EDE8DF] text-center"
                  >
                    <div className="w-8 h-8 rounded-full bg-[#B9922F]/10 flex items-center justify-center flex-shrink-0">
                      <Icon size={14} className="text-[#B9922F]" strokeWidth={1.6} />
                    </div>
                    <span className="text-[10.5px] text-[#555] font-medium leading-tight">
                      {lang === 'ar' ? labelAr : labelEn}
                    </span>
                  </div>
                ))}
              </div>

              {/* ── Product specifications ───────────────────── */}
              {metaRows.length > 0 && (
                <div className="border border-[#EDE8DF] rounded-2xl overflow-hidden mb-5">
                  <div className="px-4 py-3 bg-[#FAFAF8] border-b border-[#EDE8DF]">
                    <span className="text-[11px] font-bold text-[#B9922F] tracking-[0.2em] uppercase">
                      {lang === 'ar' ? 'مواصفات المنتج' : 'Product Specifications'}
                    </span>
                  </div>
                  <div className="divide-y divide-[#EDE8DF]">
                    {metaRows.map(({ label, value }) => (
                      <div key={label} className="flex items-center justify-between px-4 py-3">
                        <span className="text-[12.5px] text-[#777]">{label}</span>
                        <span className="text-[12.5px] text-[#111] font-semibold">{value}</span>
                      </div>
                    ))}
                    {/* Stock row */}
                    <div className="flex items-center justify-between px-4 py-3">
                      <span className="text-[12.5px] text-[#777]">
                        {lang === 'ar' ? 'التوفر' : 'Availability'}
                      </span>
                      <span
                        className={`text-[12.5px] font-bold flex items-center gap-1.5 ${
                          product.inStock ? 'text-emerald-600' : 'text-red-500'
                        }`}
                      >
                        <span className={`w-1.5 h-1.5 rounded-full ${product.inStock ? 'bg-emerald-500' : 'bg-red-500'}`} />
                        {product.inStock ? t.product.inStock : t.product.outOfStock}
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* ── Accordion ────────────────────────────────── */}
              <div className="border border-[#EDE8DF] rounded-2xl overflow-hidden divide-y divide-[#EDE8DF]">
                {accordionSections.map(({ id, Icon, title, content }) => (
                  <div key={id}>
                    <button
                      onClick={() => setOpenSection(openSection === id ? null : id)}
                      className="w-full flex items-center justify-between px-4 py-4 bg-white hover:bg-[#FAFAF8] transition-colors duration-150"
                    >
                      <div className="flex items-center gap-2.5">
                        <div className="w-7 h-7 rounded-lg bg-[#B9922F]/10 flex items-center justify-center flex-shrink-0">
                          <Icon size={13} className="text-[#B9922F]" strokeWidth={1.7} />
                        </div>
                        <span className="text-[13px] font-bold text-[#222]">{title}</span>
                      </div>
                      <ChevronDown
                        size={14}
                        className={`text-[#AAA] transition-transform duration-200 flex-shrink-0 ${
                          openSection === id ? 'rotate-180' : ''
                        }`}
                      />
                    </button>

                    {openSection === id && (
                      <div className="px-4 pb-4 pt-2 text-[13px] text-[#666] leading-[1.9] bg-[#FAFAF8] border-t border-[#EDE8DF]">
                        {content}
                      </div>
                    )}
                  </div>
                ))}
              </div>

            </div>
            {/* ═══ END INFO COLUMN ════════════════════════════ */}
          </div>

          {/* ── Full description ──────────────────────────────── */}
          <div className="mt-20 pt-14 border-t border-[#EDE8DF]">

            {/* Section header */}
            <div className="flex items-center gap-5 mb-8">
              <div className="h-px flex-1 bg-gradient-to-r from-[#B9922F]/25 via-[#D4AF37]/15 to-transparent" />
              <div className="text-center flex-shrink-0">
                <span className="text-[11px] font-bold text-[#B9922F] tracking-[0.24em] uppercase block mb-2">
                  {lang === 'ar' ? 'عن القطعة' : 'About This Piece'}
                </span>
                <h2
                  className={`text-[1.5rem] md:text-[1.75rem] font-bold text-[#050505] leading-tight
                    ${isRTL ? 'display-arabic' : 'display-serif'}`}
                >
                  {t.product.description}
                </h2>
              </div>
              <div className="h-px flex-1 bg-gradient-to-l from-[#B9922F]/25 via-[#D4AF37]/15 to-transparent" />
            </div>

            {/* Description text */}
            <div className="max-w-2xl mx-auto">
              <p className={`text-[#555] text-[14.5px] leading-[2.1] mb-6 ${isRTL ? 'text-right' : ''}`}>
                {product.description[lang]}
              </p>

              {/* "Why you'll love it" callout */}
              <div className="bg-[#FAFAF8] border border-[#EDE8DF] rounded-2xl p-6">
                <p className="text-[11px] font-bold text-[#B9922F] tracking-[0.22em] uppercase mb-3">
                  {lang === 'ar' ? '✦ لماذا ستحبّينها؟' : '✦ Why You\'ll Love It'}
                </p>
                <p className={`text-[13.5px] text-[#555] leading-[1.95] ${isRTL ? 'text-right' : ''}`}>
                  {lang === 'ar'
                    ? `كل تفصيلة في هذه القطعة تعكس الذوق الرفيع والحرفية العالية. من ${
                        product.material === 'gold' ? 'الذهب الأصيل' : 'الفضة الخالصة 925'
                      } — قطعة تُكملك وتبقى معكِ في كل مناسبة.`
                    : `Every detail in this piece reflects refined taste and exceptional craftsmanship. Crafted from ${
                        product.material === 'gold' ? 'authentic gold' : '925 sterling silver'
                      } — a piece that completes you and stays with you in every occasion.`
                  }
                </p>
              </div>
            </div>

          </div>

          {/* ── Related products ──────────────────────────────── */}
          <RelatedProducts products={related} />

        </div>
      </main>

      <Footer />
    </>
  )
}
