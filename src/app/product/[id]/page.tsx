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

/* ─── palette constants ─────────────────────────────────── */
// Card surfaces that sit on the champagne page background
const C = {
  card:        'bg-white',
  cardBorder:  'border border-[#E0CFA0]',
  cardShadow:  'shadow-[0_4px_24px_rgba(185,146,47,0.09),0_1px_3px_rgba(185,146,47,0.06)]',
  innerBg:     'bg-[#FBF6EC]',          // warm ivory for nested cells
  innerBorder: 'border-[#E8D9B0]',
  divideWarm:  'divide-[#EFE5C8]',
  textMuted:   'text-[#6B6B6B]',
} as const

const categoryLabel: Record<string, { ar: string; en: string }> = {
  necklaces: { ar: 'القلائد',         en: 'Necklaces'  },
  earrings:  { ar: 'الحلقان',         en: 'Earrings'   },
  rings:     { ar: 'الخواتم',         en: 'Rings'      },
  bracelets: { ar: 'الأساور',         en: 'Bracelets'  },
  giftSets:  { ar: 'أطقم الهدايا',    en: 'Gift Sets'  },
}

export default function ProductPage({ params }: { params: { id: string } }) {
  const { t, lang } = useLanguage()
  const { addToCart } = useCart()

  const [qty, setQty]               = useState(1)
  const [selectedSize, setSelectedSize] = useState('')
  const [justAdded, setJustAdded]   = useState(false)
  const [wishlisted, setWishlisted] = useState(false)
  const [openSection, setOpenSection] = useState<string | null>('care')

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
      id: 'care',
      Icon: Sparkles,
      title: t.product.careInstructions,
      content:
        product.careInstructions?.[lang] ??
        (lang === 'ar'
          ? 'نظّفي بقطعة قماش ناعمة جافة. تجنّبي الرطوبة والعطور.'
          : 'Clean with a soft dry cloth. Avoid moisture and perfumes.'),
    },
    { id: 'shipping', Icon: Truck,     title: t.product.shippingInfo, content: t.product.shippingText },
    { id: 'returns',  Icon: RotateCcw, title: t.product.returnPolicy, content: t.product.returnText   },
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
      value: categoryLabel[product.category]?.[lang] ?? product.category },
  ].filter(r => r.value)

  return (
    <>
      <Navbar />

      {/* ══════════════════════════════════════════════════════
          MAIN — champagne / warm-gold gradient background
      ══════════════════════════════════════════════════════ */}
      <main
        className="min-h-screen"
        style={{
          background: 'linear-gradient(160deg, #F7F1E6 0%, #F3E9D5 45%, #EDE1CA 100%)',
        }}
      >

        {/* ── Breadcrumb bar ──────────────────────────────── */}
        <div
          className="border-b"
          style={{
            background: 'rgba(201,164,76,0.12)',
            borderBottomColor: 'rgba(185,146,47,0.20)',
          }}
        >
          <div className="container py-3.5">
            <nav className="flex items-center gap-1.5 text-[11.5px] flex-wrap" style={{ color: '#8C7A5A' }}>
              <Link href="/" className="hover:text-[#B9922F] transition-colors duration-150">
                {lang === 'ar' ? 'الرئيسية' : 'Home'}
              </Link>
              <ChevronRight
                size={11}
                className={`flex-shrink-0 ${isRTL ? 'rotate-180' : ''}`}
                style={{ color: '#C9A44C', opacity: 0.6 }}
              />
              <Link href="/shop" className="hover:text-[#B9922F] transition-colors duration-150">
                {lang === 'ar' ? 'المتجر' : 'Shop'}
              </Link>
              <ChevronRight
                size={11}
                className={`flex-shrink-0 ${isRTL ? 'rotate-180' : ''}`}
                style={{ color: '#C9A44C', opacity: 0.6 }}
              />
              <span className="font-semibold truncate max-w-[180px] sm:max-w-xs" style={{ color: '#3D2F1A' }}>
                {product.name[lang]}
              </span>
            </nav>
          </div>
        </div>

        {/* ── Two-column layout ───────────────────────────── */}
        <div className="container py-10 md:py-14">
          <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] gap-10 lg:gap-14 lg:items-start">

            {/* ══ GALLERY COLUMN ══════════════════════════ */}
            <ProductGallery images={product.images} productName={product.name[lang]} />

            {/* ══ INFO COLUMN — floats as a white card ════ */}
            <div
              className={`${C.card} rounded-2xl ${C.cardBorder} ${C.cardShadow} p-6 md:p-8 lg:sticky lg:top-24`}
            >

              {/* ── Badge row ─────────────────────────────── */}
              <div className={`flex flex-wrap items-center gap-2 mb-5 ${isRTL ? 'justify-end' : ''}`}>
                {/* Material pill */}
                <span
                  className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold tracking-[0.18em] uppercase
                    ${product.material === 'gold'
                      ? 'text-[#7A5E1A] border border-[#C9A44C]/40'
                      : 'text-[#5A5A5A] border border-[#C0B090]/50'
                    }`}
                  style={{
                    background: product.material === 'gold'
                      ? 'rgba(201,164,76,0.12)'
                      : 'rgba(180,170,140,0.12)',
                  }}
                >
                  <span
                    className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${
                      product.material === 'gold' ? 'bg-[#B9922F]' : 'bg-[#909090]'
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
                  <span
                    className="inline-flex items-center text-[#C9A44C] text-[10px] font-bold px-3 py-1 rounded-full tracking-[0.12em] uppercase border"
                    style={{ background: '#1A1A1A', borderColor: 'rgba(201,164,76,0.35)' }}
                  >
                    ✦ {t.product.bestSellerBadge}
                  </span>
                )}
              </div>

              {/* ── Product name ──────────────────────────── */}
              <h1
                className={`text-[#1A1A1A] leading-tight mb-4
                  ${isRTL
                    ? 'display-arabic text-[1.85rem] md:text-[2.2rem] font-bold'
                    : 'display-serif text-[1.85rem] md:text-[2.2rem]'
                  }`}
              >
                {product.name[lang]}
              </h1>

              {/* ── Rating ────────────────────────────────── */}
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
                            : 'text-[#DDD0B0] fill-[#DDD0B0]'
                        }
                      />
                    ))}
                  </div>
                  <span className="text-[12px] font-medium" style={{ color: '#8C7A5A' }}>
                    {product.rating}
                    <span className="mx-1" style={{ color: '#C9A44C', opacity: 0.5 }}>·</span>
                    {product.reviewCount} {t.product.reviews}
                  </span>
                </div>
              )}

              {/* ── Price ─────────────────────────────────── */}
              <div
                className="flex flex-wrap items-baseline gap-2.5 mb-5 pb-5"
                style={{ borderBottom: '1px solid rgba(185,146,47,0.22)' }}
              >
                <span className="text-[2.1rem] font-bold text-[#B9922F] leading-none tabular-nums">
                  {product.price.toLocaleString()}
                </span>
                <span className="text-[13px] font-semibold leading-none" style={{ color: 'rgba(185,146,47,0.65)' }}>
                  {t.common.sar}
                </span>
                {product.originalPrice && (
                  <>
                    <span className="text-base leading-none tabular-nums ms-1" style={{ color: '#B0A090', textDecoration: 'line-through' }}>
                      {product.originalPrice.toLocaleString()} {t.common.sar}
                    </span>
                    <span className="bg-[#D94040] text-white text-[9.5px] font-bold px-2.5 py-[3.5px] rounded-full leading-none">
                      −{discount}%
                    </span>
                  </>
                )}
              </div>

              {/* ── Short description ─────────────────────── */}
              <p
                className={`text-[14px] leading-[1.85] mb-6 ${isRTL ? 'text-right' : ''}`}
                style={{ color: '#6B6B6B' }}
              >
                {product.shortDescription[lang]}
              </p>

              {/* ── Size selector ─────────────────────────── */}
              {product.sizes && product.sizes.length > 0 && (
                <div className="mb-6">
                  <div className={`flex items-center justify-between mb-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
                    <span className="text-[13px] font-bold text-[#2A2A2A] tracking-wide">{t.product.size}</span>
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
                            ? 'bg-[#B9922F] text-white border-[#B9922F] shadow-[0_2px_12px_rgba(185,146,47,0.30)]'
                            : 'bg-white text-[#333] border-[#E0CFA0] hover:border-[#B9922F] hover:text-[#B9922F]'
                          }`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* ── Quantity + stock ──────────────────────── */}
              <div className="mb-6">
                <div className={`flex items-center justify-between mb-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <span className="text-[13px] font-bold text-[#2A2A2A] tracking-wide">{t.product.quantity}</span>
                  <span
                    className={`text-[12.5px] font-semibold flex items-center gap-1.5 ${
                      product.inStock ? 'text-emerald-600' : 'text-red-500'
                    }`}
                  >
                    <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${product.inStock ? 'bg-emerald-500' : 'bg-red-500'}`} />
                    {product.inStock ? t.product.inStock : t.product.outOfStock}
                  </span>
                </div>

                <div
                  className="inline-flex items-center rounded-xl overflow-hidden bg-white"
                  style={{ border: '1px solid #E0CFA0', boxShadow: '0 1px 4px rgba(185,146,47,0.08)' }}
                >
                  <button
                    onClick={() => setQty(q => Math.max(1, q - 1))}
                    className="w-11 h-11 flex items-center justify-center text-xl select-none font-light transition-colors"
                    style={{ color: '#8C7A5A' }}
                    onMouseEnter={e => (e.currentTarget.style.color = '#B9922F')}
                    onMouseLeave={e => (e.currentTarget.style.color = '#8C7A5A')}
                  >
                    −
                  </button>
                  <span
                    className="w-12 text-center text-[#1A1A1A] font-bold text-sm"
                    style={{ borderLeft: '1px solid #E0CFA0', borderRight: '1px solid #E0CFA0' }}
                  >
                    {qty}
                  </span>
                  <button
                    onClick={() => setQty(q => Math.min(product.stockCount ?? 99, q + 1))}
                    className="w-11 h-11 flex items-center justify-center text-xl select-none font-light transition-colors"
                    style={{ color: '#8C7A5A' }}
                    onMouseEnter={e => (e.currentTarget.style.color = '#B9922F')}
                    onMouseLeave={e => (e.currentTarget.style.color = '#8C7A5A')}
                  >
                    +
                  </button>
                </div>
              </div>

              {/* ── CTA buttons ───────────────────────────── */}
              <div className="space-y-2.5 mb-7">
                {/* Cart + Wishlist row */}
                <div className="flex gap-2.5">
                  <button
                    onClick={handleAddToCart}
                    disabled={!product.inStock}
                    className={`flex-1 flex items-center justify-center gap-2 py-[14px] rounded-xl text-[13px] font-bold tracking-[0.04em] transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed
                      ${justAdded
                        ? 'bg-[#1A1A1A] text-white'
                        : 'bg-[#B9922F] text-white hover:bg-[#C9A44C] hover:shadow-[0_6px_28px_rgba(185,146,47,0.38)]'
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
                        : 'bg-white text-[#B0956A] hover:text-[#B9922F] hover:border-[#C9A44C]'
                      }`}
                    style={{ borderColor: wishlisted ? undefined : '#E0CFA0' }}
                    aria-label={t.product.addToWishlist}
                  >
                    <Heart size={19} strokeWidth={1.6} fill={wishlisted ? 'currentColor' : 'none'} />
                  </button>
                </div>

                {/* WhatsApp */}
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2.5 py-[14px] rounded-xl w-full text-[13px] font-bold tracking-[0.04em] transition-all duration-200 hover:text-white hover:shadow-[0_6px_24px_rgba(29,170,98,0.25)]"
                  style={{
                    border: '2px solid rgba(29,170,98,0.40)',
                    color: '#1DAA62',
                  }}
                  onMouseEnter={e => {
                    const el = e.currentTarget
                    el.style.background = '#1DAA62'
                    el.style.color = '#fff'
                    el.style.borderColor = '#1DAA62'
                  }}
                  onMouseLeave={e => {
                    const el = e.currentTarget
                    el.style.background = ''
                    el.style.color = '#1DAA62'
                    el.style.borderColor = 'rgba(29,170,98,0.40)'
                  }}
                >
                  <MessageCircle size={17} strokeWidth={1.8} />
                  {t.product.orderWhatsapp}
                </a>
              </div>

              {/* ── Trust badges ──────────────────────────── */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mb-7">
                {trustItems.map(({ Icon, labelAr, labelEn }) => (
                  <div
                    key={labelEn}
                    className="flex flex-col items-center gap-2 p-3 rounded-xl text-center"
                    style={{
                      background: '#FBF6EC',
                      border: '1px solid #E8D9B0',
                    }}
                  >
                    <div
                      className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
                      style={{ background: 'rgba(185,146,47,0.13)' }}
                    >
                      <Icon size={14} className="text-[#B9922F]" strokeWidth={1.6} />
                    </div>
                    <span className="text-[10.5px] font-semibold leading-tight" style={{ color: '#6B5A3A' }}>
                      {lang === 'ar' ? labelAr : labelEn}
                    </span>
                  </div>
                ))}
              </div>

              {/* ── Product specifications ────────────────── */}
              {metaRows.length > 0 && (
                <div
                  className="rounded-2xl overflow-hidden mb-5"
                  style={{ border: '1px solid #E0CFA0', boxShadow: '0 2px 12px rgba(185,146,47,0.07)' }}
                >
                  <div
                    className="px-4 py-3"
                    style={{ background: '#F8F0DC', borderBottom: '1px solid #E0CFA0' }}
                  >
                    <span className="text-[11px] font-bold text-[#B9922F] tracking-[0.2em] uppercase">
                      {lang === 'ar' ? 'مواصفات المنتج' : 'Product Specifications'}
                    </span>
                  </div>
                  <div className="bg-white divide-y" style={{ '--tw-divide-opacity': 1, borderColor: '#EFE5C8' } as React.CSSProperties}>
                    {metaRows.map(({ label, value }) => (
                      <div
                        key={label}
                        className="flex items-center justify-between px-4 py-3"
                        style={{ borderBottom: '1px solid #EFE5C8' }}
                      >
                        <span className="text-[12.5px]" style={{ color: '#8C7A5A' }}>{label}</span>
                        <span className="text-[12.5px] font-semibold text-[#1A1A1A]">{value}</span>
                      </div>
                    ))}
                    {/* Availability row */}
                    <div className="flex items-center justify-between px-4 py-3">
                      <span className="text-[12.5px]" style={{ color: '#8C7A5A' }}>
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

              {/* ── Accordion ─────────────────────────────── */}
              <div
                className="rounded-2xl overflow-hidden"
                style={{ border: '1px solid #E0CFA0', boxShadow: '0 2px 12px rgba(185,146,47,0.07)' }}
              >
                {accordionSections.map(({ id, Icon, title, content }, idx) => (
                  <div
                    key={id}
                    style={idx > 0 ? { borderTop: '1px solid #EFE5C8' } : undefined}
                  >
                    <button
                      onClick={() => setOpenSection(openSection === id ? null : id)}
                      className="w-full flex items-center justify-between px-4 py-4 bg-white transition-colors duration-150"
                      onMouseEnter={e => (e.currentTarget.style.background = '#FBF6EC')}
                      onMouseLeave={e => (e.currentTarget.style.background = '#fff')}
                    >
                      <div className="flex items-center gap-2.5">
                        <div
                          className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0"
                          style={{ background: 'rgba(185,146,47,0.13)' }}
                        >
                          <Icon size={13} className="text-[#B9922F]" strokeWidth={1.7} />
                        </div>
                        <span className="text-[13px] font-bold text-[#1A1A1A]">{title}</span>
                      </div>
                      <ChevronDown
                        size={14}
                        className={`transition-transform duration-200 flex-shrink-0 ${openSection === id ? 'rotate-180' : ''}`}
                        style={{ color: '#C9A44C', opacity: 0.7 }}
                      />
                    </button>

                    {openSection === id && (
                      <div
                        className="px-4 pb-4 pt-2 text-[13px] leading-[1.9]"
                        style={{
                          background: '#FBF6EC',
                          borderTop: '1px solid #EFE5C8',
                          color: '#6B5A3A',
                        }}
                      >
                        {content}
                      </div>
                    )}
                  </div>
                ))}
              </div>

            </div>
            {/* ══ END INFO COLUMN ════════════════════════════ */}

          </div>

          {/* ── Description — white card ─────────────────────── */}
          <div
            className="mt-14 rounded-2xl p-8 md:p-12 bg-white"
            style={{
              border: '1px solid #E0CFA0',
              boxShadow: '0 2px 20px rgba(185,146,47,0.08)',
            }}
          >
            {/* Header */}
            <div className="flex items-center gap-5 mb-8">
              <div
                className="h-px flex-1"
                style={{ background: 'linear-gradient(to right, rgba(185,146,47,0.30), transparent)' }}
              />
              <div className="text-center flex-shrink-0">
                <span className="text-[11px] font-bold text-[#B9922F] tracking-[0.24em] uppercase block mb-2">
                  {lang === 'ar' ? 'عن القطعة' : 'About This Piece'}
                </span>
                <h2
                  className={`text-[1.5rem] md:text-[1.75rem] font-bold text-[#1A1A1A] leading-tight
                    ${isRTL ? 'display-arabic' : 'display-serif'}`}
                >
                  {t.product.description}
                </h2>
              </div>
              <div
                className="h-px flex-1"
                style={{ background: 'linear-gradient(to left, rgba(185,146,47,0.30), transparent)' }}
              />
            </div>

            {/* Text */}
            <div className="max-w-2xl mx-auto">
              <p
                className={`text-[14.5px] leading-[2.1] mb-7 ${isRTL ? 'text-right' : ''}`}
                style={{ color: '#5A5040' }}
              >
                {product.description[lang]}
              </p>

              {/* "Why you'll love it" */}
              <div
                className="rounded-2xl p-6"
                style={{ background: '#FBF6EC', border: '1px solid #E8D9B0' }}
              >
                <p className="text-[11px] font-bold text-[#B9922F] tracking-[0.22em] uppercase mb-3">
                  {lang === 'ar' ? '✦ لماذا ستحبّينها؟' : "✦ Why You'll Love It"}
                </p>
                <p
                  className={`text-[13.5px] leading-[2] ${isRTL ? 'text-right' : ''}`}
                  style={{ color: '#6B5A3A' }}
                >
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

          {/* ── Related products ─────────────────────────────── */}
          <RelatedProducts products={related} />

        </div>
      </main>

      <Footer />
    </>
  )
}
