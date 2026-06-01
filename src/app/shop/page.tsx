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
  const [searchQuery, setSearchQuery] = useState('')
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false)
  const [isSortOpen, setIsSortOpen] = useState(false)

  const filteredProducts = useMemo(() => {
    let result: Product[] = [...products]

    // Search
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase()
      result = result.filter(p =>
        p.name.ar.toLowerCase().includes(q) ||
        p.name.en.toLowerCase().includes(q) ||
        p.tags.some(tag => tag.toLowerCase().includes(q))
      )
    }

    // Category
    if (filters.category) {
      result = result.filter(p => p.category === filters.category)
    }

    // Material
    if (filters.material) {
      result = result.filter(p => p.material === filters.material)
    }

    // Price range
    result = result.filter(p => p.price >= filters.minPrice && p.price <= filters.maxPrice)

    // New
    if (filters.isNew) result = result.filter(p => p.isNew)

    // Best Sellers
    if (filters.isBestSeller) result = result.filter(p => p.isBestSeller)

    // Sort
    switch (sortBy) {
      case 'priceLow': result.sort((a, b) => a.price - b.price); break
      case 'priceHigh': result.sort((a, b) => b.price - a.price); break
      case 'rating': result.sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0)); break
      case 'bestselling': result.sort((a, b) => (b.reviewCount ?? 0) - (a.reviewCount ?? 0)); break
      default: result.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0)); break
    }

    return result
  }, [filters, sortBy, searchQuery])

  const sortOptions: { key: SortKey; label: string }[] = [
    { key: 'newest', label: t.shop.sortOptions.newest },
    { key: 'priceLow', label: t.shop.sortOptions.priceLow },
    { key: 'priceHigh', label: t.shop.sortOptions.priceHigh },
    { key: 'rating', label: t.shop.sortOptions.rating },
    { key: 'bestselling', label: t.shop.sortOptions.bestselling },
  ]

  const currentSort = sortOptions.find(s => s.key === sortBy)!

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-dark-deeper pt-20">
        {/* Page header */}
        <div className="bg-dark border-b border-dark-border py-10 px-4 sm:px-6">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-serif text-white mb-2">{t.shop.title}</h1>
            <p className="text-white/50">{t.shop.subtitle}</p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
          {/* Top Bar */}
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute start-3 top-1/2 -translate-y-1/2 text-white/30" size={18} />
              <input
                type="search"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder={t.shop.searchPlaceholder}
                className="input-luxury ps-10 pe-4 py-3"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute end-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white"
                >
                  <X size={16} />
                </button>
              )}
            </div>

            <div className="flex gap-3">
              {/* Mobile filters toggle */}
              <button
                onClick={() => setIsMobileFiltersOpen(true)}
                className="lg:hidden flex items-center gap-2 px-4 py-3 bg-dark-card border border-dark-border rounded-lg text-white/70 hover:text-gold hover:border-gold/30 text-sm transition-colors"
              >
                <SlidersHorizontal size={16} />
                {t.shop.filters}
              </button>

              {/* Sort dropdown */}
              <div className="relative">
                <button
                  onClick={() => setIsSortOpen(!isSortOpen)}
                  className="flex items-center gap-2 px-4 py-3 bg-dark-card border border-dark-border rounded-lg text-white/70 hover:text-gold hover:border-gold/30 text-sm transition-colors whitespace-nowrap"
                >
                  <span>{currentSort.label}</span>
                  <ChevronDown size={14} className={`transition-transform ${isSortOpen ? 'rotate-180' : ''}`} />
                </button>

                {isSortOpen && (
                  <>
                    <div className="fixed inset-0 z-10" onClick={() => setIsSortOpen(false)} />
                    <div className={`absolute top-full mt-2 z-20 bg-dark-card border border-dark-border rounded-xl overflow-hidden shadow-xl min-w-[180px]
                      ${isRTL ? 'left-0' : 'right-0'}`}>
                      {sortOptions.map(opt => (
                        <button
                          key={opt.key}
                          onClick={() => { setSortBy(opt.key); setIsSortOpen(false) }}
                          className={`w-full text-start px-4 py-3 text-sm transition-colors
                            ${sortBy === opt.key ? 'text-gold bg-gold/10' : 'text-white/60 hover:text-white hover:bg-dark-hover'}`}
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

          {/* Results count */}
          <p className="text-sm text-white/40 mb-6">
            {t.shop.showing} {filteredProducts.length} {t.shop.of} {products.length} {t.shop.products}
          </p>

          <div className="flex gap-8">
            {/* Sidebar Filters */}
            <ProductFilters
              filters={filters}
              onFilterChange={setFilters}
              onClear={() => setFilters(defaultFilters)}
              isMobileOpen={isMobileFiltersOpen}
              onMobileClose={() => setIsMobileFiltersOpen(false)}
            />

            {/* Product Grid */}
            <div className="flex-1">
              {filteredProducts.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-20 text-center gap-4">
                  <div className="text-5xl">🔍</div>
                  <h3 className="text-xl font-semibold text-white">{t.shop.noResults}</h3>
                  <p className="text-white/40">{t.shop.noResultsText}</p>
                  <button
                    onClick={() => { setFilters(defaultFilters); setSearchQuery('') }}
                    className="btn-outline-gold text-sm"
                  >
                    {t.shop.clearFilters}
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-2 md:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-5">
                  {filteredProducts.map(product => (
                    <ProductCard key={product.id} product={product} />
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
