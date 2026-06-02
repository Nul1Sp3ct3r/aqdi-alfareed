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

/* ─── Dark-copper design tokens ──────────────────────────── */
// Page bg:   espresso + copper gradient (dark)
// Surfaces:  warm ivory cards floating on the dark bg
// Accents:   burnished copper (#A56A43), dark copper (#8B5E3C)
const T = {
  // content card (floats on dark bg)
  cardBg:      '#F7F1E8',
  cardBorder:  'rgba(139,94,60,0.30)',
  cardShadow:  '0 8px 48px rgba(43,30,23,0.45), 0 1px 4px rgba(43,30,23,0.22)',
  // nested cells inside the card
  innerBg:     '#F0E8DC',
  innerBorder: 'rgba(139,94,60,0.22)',
  // dividers
  divider:     'rgba(139,94,60,0.18)',
  // text
  heading:     '#1A1A1A',
  body:        '#3D2A1A',
  muted:       '#7A5C42',
  faint:       '#A08060',
  // copper accents
  copper:      '#A56A43',
  copperDark:  '#8B5E3C',
  // breadcrumb (on dark page bg)
  bcText:      '#B8A090',
  bcActive:    '#F7F1E8',
} as const

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
    { Icon: Truck,   labelAr: 'شحن سريع ومجاني', labelEn: 'Free Fast Shipping' },
    { Icon: Package, labelAr: 'تغليف فاخر',       labelEn: 'Luxury Packaging'   },
    { Icon: Shield,  labelAr: 'ضمان الجودة',      labelEn: 'Quality Guarantee'  },
    { Icon: Gift,    labelAr: 'إمكانية الإهداء',  labelEn: 'Gift-Ready'         },
  ]

  const metaRows = [
    { label: t.product.sku, value: product.sku },
    {
      label: t.product.material,
      value: lang === 'ar'
        ? (product.material === 'gold' ? 'ذهب · 18K' : 'فضة · 925')
        : (product.material === 'gold' ? 'Gold · 18K' : 'Silver · 925'),
    },
    { label: t.product.weight, value: product.weight },
    {
      label: lang === 'ar' ? 'الفئة' : 'Category',
      value: categoryLabel[product.category]?.[lang] ?? product.category,
    },
  ].filter(r => r.value)

  return (
    <>
      <Navbar />

      {/* ═══════════════════════════════════════════════════════
          MAIN — dark espresso / copper atmosphere background
      ═══════════════════════════════════════════════════════ */}
      <main
        className="min-h-screen"
        style={{
          background: [
            'radial-gradient(ellipse 160% 120% at 65% 0%, rgba(110,75,51,0.28) 0%, transparent 55%)',
            'linear-gradient(155deg, #2B1E17 0%, #3C2920 40%, #241810 100%)',
          ].join(', '),
        }}
      >

        {/* ── Breadcrumb ────────────────────────────────────── */}
        <div
          className="border-b"
          style={{
            background: 'rgba(255,255,255,0.04)',
            borderBottomColor: 'rgba(139,94,60,0.30)',
          }}
        >
          <div className="container py-3.5">
            <nav className="flex items-center gap-1.5 text-[11.5px] flex-wrap" style={{ color: T.bcText }}>
              <Link
                href="/"
                className="transition-colors duration-150"
                style={{ color: T.bcText }}
                onMouseEnter={e => (e.currentTarget.style.color = T.copper)}
                onMouseLeave={e => (e.currentTarget.style.color = T.bcText)}
              >
                {lang === 'ar' ? 'الرئيسية' : 'Home'}
              </Link>
              <ChevronRight
                size={11}
                className={`flex-shrink-0 ${isRTL ? 'rotate-180' : ''}`}
                style={{ color: T.copper, opacity: 0.55 }}
              />
              <Link
                href="/shop"
                className="transition-colors duration-150"
                style={{ color: T.bcText }}
                onMouseEnter={e => (e.currentTarget.style.color = T.copper)}
                onMouseLeave={e => (e.currentTarget.style.color = T.bcText)}
              >
                {lang === 'ar' ? 'المتجر' : 'Shop'}
              </Link>
              <ChevronRight
                size={11}
                className={`flex-shrink-0 ${isRTL ? 'rotate-180' : ''}`}
                style={{ color: T.copper, opacity: 0.55 }}
              />
              <span
                className="font-semibold truncate max-w-[180px] sm:max-w-xs"
                style={{ color: T.bcActive }}
              >
                {product.name[lang]}
              </span>
            </nav>
          </div>
        </div>

        {/* ── Two-column layout ─────────────────────────────── */}
        <div className="container py-10 md:py-14">
          <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] gap-10 lg:gap-14 lg:items-start">

            {/* ══ GALLERY ══════════════════════════════════ */}
            <ProductGallery images={product.images} productName={product.name[lang]} />

            {/* ══ INFO CARD — warm ivory on dark bg ════════ */}
            <div
              className="rounded-2xl p-6 md:p-8 lg:sticky lg:top-24"
              style={{
                background: T.cardBg,
                border: `1px solid ${T.cardBorder}`,
                boxShadow: T.cardShadow,
              }}
            >

              {/* ── Badge row ─────────────────────────────── */}
              <div className={`flex flex-wrap items-center gap-2 mb-5 ${isRTL ? 'justify-end' : ''}`}>
                {/* Material pill */}
                <span
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold tracking-[0.18em] uppercase"
                  style={{
                    background: product.material === 'gold'
                      ? 'rgba(139,94,60,0.12)'
                      : 'rgba(122,92,66,0.10)',
                    color:   product.material === 'gold' ? '#7A5030' : '#5A4535',
                    border: `1px solid ${
                      product.material === 'gold'
                        ? 'rgba(139,94,60,0.35)'
                        : 'rgba(100,80,60,0.30)'
                    }`,
                  }}
                >
                  <span
                    className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                    style={{ background: product.material === 'gold' ? T.copperDark : '#909090' }}
                  />
                  {product.material === 'gold' ? t.product.goldBadge : t.product.silverBadge} · 925
                </span>

                {product.isNew && (
                  <span
                    className="inline-flex items-center text-white text-[10px] font-bold px-3 py-1 rounded-full tracking-[0.12em] uppercase"
                    style={{ background: T.copperDark }}
                  >
                    {t.product.newBadge}
                  </span>
                )}
                {product.isBestSeller && (
                  <span
                    className="inline-flex items-center text-[10px] font-bold px-3 py-1 rounded-full tracking-[0.12em] uppercase"
                    style={{
                      background: '#1A1A1A',
                      color: T.copper,
                      border: `1px solid rgba(165,106,67,0.35)`,
                    }}
                  >
                    ✦ {t.product.bestSellerBadge}
                  </span>
                )}
              </div>

              {/* ── Product name ──────────────────────────── */}
              <h1
                className={`leading-tight mb-4
                  ${isRTL
                    ? 'display-arabic text-[1.85rem] md:text-[2.2rem] font-bold'
                    : 'display-serif text-[1.85rem] md:text-[2.2rem]'
                  }`}
                style={{ color: T.heading }}
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
                        style={
                          i < Math.floor(product.rating!)
                            ? { color: T.copper,  fill: T.copper  }
                            : { color: '#D0B898', fill: '#D0B898' }
                        }
                      />
                    ))}
                  </div>
                  <span className="text-[12px] font-medium" style={{ color: T.muted }}>
                    {product.rating}
                    <span className="mx-1" style={{ color: T.copper, opacity: 0.5 }}>·</span>
                    {product.reviewCount} {t.product.reviews}
                  </span>
                </div>
              )}

              {/* ── Price ─────────────────────────────────── */}
              <div
                className="flex flex-wrap items-baseline gap-2.5 mb-5 pb-5"
                style={{ borderBottom: `1px solid ${T.divider}` }}
              >
                <span
                  className="text-[2.1rem] font-bold leading-none tabular-nums"
                  style={{ color: T.copperDark }}
                >
                  {product.price.toLocaleString()}
                </span>
                <span
                  className="text-[13px] font-semibold leading-none"
                  style={{ color: `${T.copperDark}99` }}
                >
                  {t.common.sar}
                </span>
                {product.originalPrice && (
                  <>
                    <span
                      className="text-base leading-none tabular-nums ms-1"
                      style={{ color: '#A89880', textDecoration: 'line-through' }}
                    >
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
                style={{ color: T.body }}
              >
                {product.shortDescription[lang]}
              </p>

              {/* ── Size selector ─────────────────────────── */}
              {product.sizes && product.sizes.length > 0 && (
                <div className="mb-6">
                  <div className={`flex items-center justify-between mb-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
                    <span
                      className="text-[13px] font-bold tracking-wide"
                      style={{ color: T.heading }}
                    >
                      {t.product.size}
                    </span>
                    {selectedSize && (
                      <span
                        className="text-[13px] font-bold"
                        style={{ color: T.copper }}
                      >
                        {selectedSize}
                      </span>
                    )}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {product.sizes.map(s => (
                      <button
                        key={s}
                        onClick={() => setSelectedSize(s)}
                        className="w-11 h-11 rounded-xl text-sm font-semibold transition-all duration-200"
                        style={
                          selectedSize === s
                            ? {
                                background: T.copperDark,
                                color: '#F7F1E8',
                                border: `1px solid ${T.copperDark}`,
                                boxShadow: `0 2px 12px rgba(139,94,60,0.35)`,
                              }
                            : {
                                background: T.innerBg,
                                color: T.body,
                                border: `1px solid ${T.innerBorder}`,
                              }
                        }
                        onMouseEnter={e => {
                          if (selectedSize !== s) {
                            e.currentTarget.style.borderColor = T.copper
                            e.currentTarget.style.color = T.copper
                          }
                        }}
                        onMouseLeave={e => {
                          if (selectedSize !== s) {
                            e.currentTarget.style.borderColor = T.innerBorder
                            e.currentTarget.style.color = T.body
                          }
                        }}
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
                  <span
                    className="text-[13px] font-bold tracking-wide"
                    style={{ color: T.heading }}
                  >
                    {t.product.quantity}
                  </span>
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
                  className="inline-flex items-center rounded-xl overflow-hidden"
                  style={{
                    background: T.innerBg,
                    border: `1px solid ${T.innerBorder}`,
                    boxShadow: '0 1px 4px rgba(43,30,23,0.10)',
                  }}
                >
                  <button
                    onClick={() => setQty(q => Math.max(1, q - 1))}
                    className="w-11 h-11 flex items-center justify-center text-xl select-none font-light transition-colors duration-150"
                    style={{ color: T.muted }}
                    onMouseEnter={e => (e.currentTarget.style.color = T.copper)}
                    onMouseLeave={e => (e.currentTarget.style.color = T.muted)}
                  >
                    −
                  </button>
                  <span
                    className="w-12 text-center font-bold text-sm"
                    style={{
                      color: T.heading,
                      borderLeft:  `1px solid ${T.innerBorder}`,
                      borderRight: `1px solid ${T.innerBorder}`,
                    }}
                  >
                    {qty}
                  </span>
                  <button
                    onClick={() => setQty(q => Math.min(product.stockCount ?? 99, q + 1))}
                    className="w-11 h-11 flex items-center justify-center text-xl select-none font-light transition-colors duration-150"
                    style={{ color: T.muted }}
                    onMouseEnter={e => (e.currentTarget.style.color = T.copper)}
                    onMouseLeave={e => (e.currentTarget.style.color = T.muted)}
                  >
                    +
                  </button>
                </div>
              </div>

              {/* ── CTA buttons ───────────────────────────── */}
              <div className="space-y-2.5 mb-7">
                {/* Cart + wishlist */}
                <div className="flex gap-2.5">
                  <button
                    onClick={handleAddToCart}
                    disabled={!product.inStock}
                    className="flex-1 flex items-center justify-center gap-2 py-[14px] rounded-xl text-[13px] font-bold tracking-[0.04em] transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed"
                    style={
                      justAdded
                        ? { background: '#1A1A1A', color: '#F7F1E8' }
                        : { background: T.copperDark, color: '#F7F1E8' }
                    }
                    onMouseEnter={e => {
                      if (!justAdded && !product.inStock) return
                      if (!justAdded) {
                        e.currentTarget.style.background = T.copper
                        e.currentTarget.style.boxShadow = `0 6px 28px rgba(139,94,60,0.45)`
                      }
                    }}
                    onMouseLeave={e => {
                      if (!justAdded) {
                        e.currentTarget.style.background = T.copperDark
                        e.currentTarget.style.boxShadow = 'none'
                      }
                    }}
                  >
                    <ShoppingBag size={17} strokeWidth={1.8} />
                    {justAdded
                      ? lang === 'ar' ? '✓ تمت الإضافة' : '✓ Added!'
                      : t.product.addToCart}
                  </button>

                  <button
                    onClick={() => setWishlisted(w => !w)}
                    className="w-[50px] flex items-center justify-center rounded-xl transition-all duration-200 flex-shrink-0"
                    style={
                      wishlisted
                        ? { background: '#FFF0EF', border: '1px solid #F5BFBA', color: '#E05050' }
                        : {
                            background: T.innerBg,
                            border: `1px solid ${T.innerBorder}`,
                            color: T.muted,
                          }
                    }
                    aria-label={t.product.addToWishlist}
                    onMouseEnter={e => {
                      if (!wishlisted) {
                        e.currentTarget.style.borderColor = T.copper
                        e.currentTarget.style.color = T.copper
                      }
                    }}
                    onMouseLeave={e => {
                      if (!wishlisted) {
                        e.currentTarget.style.borderColor = T.innerBorder
                        e.currentTarget.style.color = T.muted
                      }
                    }}
                  >
                    <Heart size={19} strokeWidth={1.6} fill={wishlisted ? 'currentColor' : 'none'} />
                  </button>
                </div>

                {/* WhatsApp */}
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2.5 py-[14px] rounded-xl w-full text-[13px] font-bold tracking-[0.04em] transition-all duration-200"
                  style={{ border: '2px solid rgba(29,170,98,0.40)', color: '#1DAA62' }}
                  onMouseEnter={e => {
                    const el = e.currentTarget
                    el.style.background = '#1DAA62'
                    el.style.color = '#fff'
                    el.style.borderColor = '#1DAA62'
                    el.style.boxShadow = '0 6px 24px rgba(29,170,98,0.25)'
                  }}
                  onMouseLeave={e => {
                    const el = e.currentTarget
                    el.style.background = ''
                    el.style.color = '#1DAA62'
                    el.style.borderColor = 'rgba(29,170,98,0.40)'
                    el.style.boxShadow = 'none'
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
                      background: T.innerBg,
                      border: `1px solid ${T.innerBorder}`,
                    }}
                  >
                    <div
                      className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
                      style={{ background: 'rgba(139,94,60,0.14)' }}
                    >
                      <Icon size={14} style={{ color: T.copperDark }} strokeWidth={1.6} />
                    </div>
                    <span
                      className="text-[10.5px] font-semibold leading-tight"
                      style={{ color: T.body }}
                    >
                      {lang === 'ar' ? labelAr : labelEn}
                    </span>
                  </div>
                ))}
              </div>

              {/* ── Specifications ────────────────────────── */}
              {metaRows.length > 0 && (
                <div
                  className="rounded-2xl overflow-hidden mb-5"
                  style={{
                    border: `1px solid ${T.innerBorder}`,
                    boxShadow: '0 2px 10px rgba(43,30,23,0.10)',
                  }}
                >
                  {/* Header */}
                  <div
                    className="px-4 py-3"
                    style={{
                      background: '#E8D8C4',
                      borderBottom: `1px solid rgba(139,94,60,0.22)`,
                    }}
                  >
                    <span
                      className="text-[11px] font-bold tracking-[0.22em] uppercase"
                      style={{ color: T.copperDark }}
                    >
                      {lang === 'ar' ? 'مواصفات المنتج' : 'Product Specifications'}
                    </span>
                  </div>

                  {/* Rows */}
                  <div style={{ background: T.cardBg }}>
                    {metaRows.map(({ label, value }) => (
                      <div
                        key={label}
                        className="flex items-center justify-between px-4 py-3"
                        style={{ borderBottom: `1px solid ${T.divider}` }}
                      >
                        <span className="text-[12.5px]" style={{ color: T.muted }}>{label}</span>
                        <span className="text-[12.5px] font-semibold" style={{ color: T.heading }}>{value}</span>
                      </div>
                    ))}
                    <div className="flex items-center justify-between px-4 py-3">
                      <span className="text-[12.5px]" style={{ color: T.muted }}>
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
                style={{
                  border: `1px solid ${T.innerBorder}`,
                  boxShadow: '0 2px 10px rgba(43,30,23,0.10)',
                }}
              >
                {accordionSections.map(({ id, Icon, title, content }, idx) => (
                  <div
                    key={id}
                    style={idx > 0 ? { borderTop: `1px solid ${T.divider}` } : undefined}
                  >
                    <button
                      onClick={() => setOpenSection(openSection === id ? null : id)}
                      className="w-full flex items-center justify-between px-4 py-4 transition-colors duration-150"
                      style={{ background: T.cardBg }}
                      onMouseEnter={e => (e.currentTarget.style.background = T.innerBg)}
                      onMouseLeave={e => (e.currentTarget.style.background = T.cardBg)}
                    >
                      <div className="flex items-center gap-2.5">
                        <div
                          className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0"
                          style={{ background: 'rgba(139,94,60,0.14)' }}
                        >
                          <Icon size={13} style={{ color: T.copperDark }} strokeWidth={1.7} />
                        </div>
                        <span className="text-[13px] font-bold" style={{ color: T.heading }}>
                          {title}
                        </span>
                      </div>
                      <ChevronDown
                        size={14}
                        className={`transition-transform duration-200 flex-shrink-0 ${openSection === id ? 'rotate-180' : ''}`}
                        style={{ color: T.copper, opacity: 0.7 }}
                      />
                    </button>

                    {openSection === id && (
                      <div
                        className="px-4 pb-4 pt-2 text-[13px] leading-[1.9]"
                        style={{
                          background: T.innerBg,
                          borderTop: `1px solid ${T.divider}`,
                          color: T.body,
                        }}
                      >
                        {content}
                      </div>
                    )}
                  </div>
                ))}
              </div>

            </div>
            {/* ══ END INFO CARD ══════════════════════════════ */}

          </div>

          {/* ── Description card ─────────────────────────────── */}
          <div
            className="mt-14 rounded-2xl p-8 md:p-12"
            style={{
              background: T.cardBg,
              border: `1px solid ${T.cardBorder}`,
              boxShadow: '0 4px 32px rgba(43,30,23,0.28)',
            }}
          >
            {/* Header */}
            <div className="flex items-center gap-5 mb-8">
              <div
                className="h-px flex-1"
                style={{ background: `linear-gradient(to right, rgba(139,94,60,0.40), transparent)` }}
              />
              <div className="text-center flex-shrink-0">
                <span
                  className="text-[11px] font-bold tracking-[0.24em] uppercase block mb-2"
                  style={{ color: T.copper }}
                >
                  {lang === 'ar' ? 'عن القطعة' : 'About This Piece'}
                </span>
                <h2
                  className={`text-[1.5rem] md:text-[1.75rem] font-bold leading-tight
                    ${isRTL ? 'display-arabic' : 'display-serif'}`}
                  style={{ color: T.heading }}
                >
                  {t.product.description}
                </h2>
              </div>
              <div
                className="h-px flex-1"
                style={{ background: `linear-gradient(to left, rgba(139,94,60,0.40), transparent)` }}
              />
            </div>

            {/* Text */}
            <div className="max-w-2xl mx-auto">
              <p
                className={`text-[14.5px] leading-[2.1] mb-7 ${isRTL ? 'text-right' : ''}`}
                style={{ color: T.body }}
              >
                {product.description[lang]}
              </p>

              {/* "Why you'll love it" callout */}
              <div
                className="rounded-2xl p-6"
                style={{
                  background: T.innerBg,
                  border: `1px solid ${T.innerBorder}`,
                }}
              >
                <p
                  className="text-[11px] font-bold tracking-[0.22em] uppercase mb-3"
                  style={{ color: T.copperDark }}
                >
                  {lang === 'ar' ? '✦ لماذا ستحبّينها؟' : "✦ Why You'll Love It"}
                </p>
                <p
                  className={`text-[13.5px] leading-[2] ${isRTL ? 'text-right' : ''}`}
                  style={{ color: T.body }}
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
