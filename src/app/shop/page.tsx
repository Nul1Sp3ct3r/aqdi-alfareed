'use client'
import { useState, useMemo } from 'react'
import { SlidersHorizontal, Search, ChevronDown, X } from 'lucide-react'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import ProductCard from '@/components/product/ProductCard'
import ProductFilters, { FilterState } from '@/components/product/ProductFilters'
import { useLanguage } from '@/context/LanguageContext'
import { products } from '@/data/products'
import { Product } from '@/types'

type SortKey = 'newest' | 'priceLow' | 'priceHigh' | 'rating' | 'bestselling'
const defaultFilters: FilterState = {
  category: '',
  material: '',
  minPrice: 0,
  maxPrice: 2000,
  isNew: false,
  isBestSeller: false,
}

export default function ShopPage() {
  const { t, lang, isRTL } = useLanguage()
  const [filters, setFilters] = useState<FilterState>(defaultFilters)
  const [sortBy, setSortBy] = useState<SortKey>('newest')
  const [query, setQuery] = useState('')
  const [mobileFilters, setMobileFilters] = useState(false)
  const [sortOpen, setSortOpen] = useState(false)

  const filtered = useMemo(() => {
    let r: Product[] = [...products]
    if (query.trim()) {
      const q = query.toLowerCase()
      r = r.filter(
        p =>
          p.name.ar.includes(q) ||
          p.name.en.toLowerCase().includes(q) ||
          p.tags.some(tag => tag.includes(q))
      )
    }
    if (filters.category) r = r.filter(p => p.category === filters.category)
    if (filters.material) r = r.filter(p => p.material === filters.material)
    r = r.filter(p => p.price >= filters.minPrice && p.price <= filters.maxPrice)
    if (filters.isNew) r = r.filter(p => p.isNew)
    if (filters.isBestSeller) r = r.filter(p => p.isBestSeller)

    switch (sortBy) {
      case 'priceLow':
        r.sort((a, b) => a.price - b.price)
        break
      case 'priceHigh':
        r.sort((a, b) => b.price - a.price)
        break
      case 'rating':
        r.sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0))
        break
      case 'bestselling':
        r.sort((a, b) => (b.reviewCount ?? 0) - (a.reviewCount ?? 0))
        break
      default:
        r.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0))
    }
    return r
  }, [filters, sortBy, query])

  const sortOpts: { key: SortKey; label: string }[] = [
    { key: 'newest',      label: t.shop.sortOptions.newest },
    { key: 'priceLow',    label: t.shop.sortOptions.priceLow },
    { key: 'priceHigh',   label: t.shop.sortOptions.priceHigh },
    { key: 'rating',      label: t.shop.sortOptions.rating },
    { key: 'bestselling', label: t.shop.sortOptions.bestselling },
  ]

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-white">
        {/* Page header — dark luxury */}
        <div className="bg-[#050505] py-14 px-4">
          <div className="container">
            <span className="label-luxury block mb-3">
              {isRTL ? 'متجرنا' : 'Our Store'}
            </span>
            <h1
              className={`text-white font-bold leading-tight
                ${isRTL ? 'display-arabic text-4xl' : 'display-serif text-4xl md:text-5xl'}`}
            >
              {isRTL ? 'تسوقي المجوهرات' : 'Shop Fine Jewelry'}
            </h1>
            <div className="h-[2px] w-10 bg-gold mt-5 opacity-70" />
          </div>
        </div>

        <div className="container py-8 md:py-10">
          {/* Toolbar */}
          <div className="flex flex-col sm:flex-row gap-3 mb-6">
            {/* Search */}
            <div className="relative flex-1">
              <Search
                className="absolute start-3.5 top-1/2 -translate-y-1/2 text-ink-muted"
                size={16}
                strokeWidth={1.5}
              />
              <input
                type="search"
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder={t.shop.searchPlaceholder}
                className="input-clean ps-10 pe-10 py-3"
              />
              {query && (
                <button
                  onClick={() => setQuery('')}
                  className="absolute end-3 top-1/2 -translate-y-1/2 text-ink-muted hover:text-ink"
                >
                  <X size={14} />
                </button>
              )}
            </div>

            <div className="flex gap-2.5">
              {/* Mobile filters toggle */}
              <button
                onClick={() => setMobileFilters(true)}
                className="lg:hidden flex items-center gap-2 px-4 py-3 bg-white border border-[#E8E2D6] text-ink-muted hover:text-gold hover:border-gold text-sm transition-all"
              >
                <SlidersHorizontal size={14} strokeWidth={1.5} />
                {t.shop.filters}
              </button>

              {/* Sort dropdown */}
              <div className="relative">
                <button
                  onClick={() => setSortOpen(!sortOpen)}
                  className="flex items-center gap-2 px-4 py-3 bg-white border border-[#E8E2D6] text-ink-muted hover:text-gold hover:border-gold text-sm transition-all whitespace-nowrap"
                >
                  {sortOpts.find(s => s.key === sortBy)!.label}
                  <ChevronDown
                    size={13}
                    className={`transition-transform duration-200 ${sortOpen ? 'rotate-180' : ''}`}
                  />
                </button>

                {sortOpen && (
                  <>
                    <div className="fixed inset-0 z-10" onClick={() => setSortOpen(false)} />
                    <div
                      className={`absolute top-full mt-2 z-20 bg-white border border-[#E8E2D6] overflow-hidden shadow-card-hover min-w-[185px] ${isRTL ? 'left-0' : 'right-0'}`}
                    >
                      {sortOpts.map(opt => (
                        <button
                          key={opt.key}
                          onClick={() => { setSortBy(opt.key); setSortOpen(false) }}
                          className={`w-full text-start px-4 py-3 text-sm transition-colors
                            ${sortBy === opt.key
                              ? 'text-gold bg-gold/5 font-semibold'
                              : 'text-ink-muted hover:text-ink hover:bg-[#FAFAF8]'
                            }`}
                        >
                          {opt.label}
                        </button>
                      ))}
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Result count */}
          <p className="text-xs text-ink-muted mb-6">
            {t.shop.showing}{' '}
            <span className="font-semibold text-ink">{filtered.length}</span>{' '}
            {t.shop.of} {products.length} {t.shop.products}
          </p>

          {/* Main content: filters sidebar + grid */}
          <div className="flex gap-8">
            <ProductFilters
              filters={filters}
              onFilterChange={setFilters}
              onClear={() => setFilters(defaultFilters)}
              isMobileOpen={mobileFilters}
              onMobileClose={() => setMobileFilters(false)}
            />

            <div className="flex-1 min-w-0">
              {filtered.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-24 text-center gap-5">
                  <div className="w-16 h-16 border border-[#E8E2D6] flex items-center justify-center text-2xl text-ink-muted">
                    ✦
                  </div>
                  <h3 className="text-xl font-semibold text-ink">{t.shop.noResults}</h3>
                  <p className="text-ink-muted text-sm">{t.shop.noResultsText}</p>
                  <button
                    onClick={() => { setFilters(defaultFilters); setQuery('') }}
                    className="btn btn-outline-gold text-sm px-6 py-3 rounded-none"
                  >
                    {t.shop.clearFilters}
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-2 xl:grid-cols-3 gap-4 md:gap-5">
                  {filtered.map(p => (
                    <ProductCard key={p.id} product={p} />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
