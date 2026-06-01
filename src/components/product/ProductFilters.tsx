'use client'

import { X, SlidersHorizontal } from 'lucide-react'
import { useLanguage } from '@/context/LanguageContext'
import { CategoryId, Material } from '@/types'
import { categories } from '@/data/products'
import Button from '@/components/ui/Button'

export interface FilterState {
  category: CategoryId | ''
  material: Material | ''
  minPrice: number
  maxPrice: number
  isNew: boolean
  isBestSeller: boolean
}

interface ProductFiltersProps {
  filters: FilterState
  onFilterChange: (filters: FilterState) => void
  onClear: () => void
  isMobileOpen: boolean
  onMobileClose: () => void
}

export default function ProductFilters({
  filters,
  onFilterChange,
  onClear,
  isMobileOpen,
  onMobileClose,
}: ProductFiltersProps) {
  const { t, lang } = useLanguage()

  const set = (update: Partial<FilterState>) => {
    onFilterChange({ ...filters, ...update })
  }

  const activeCount = [
    filters.category,
    filters.material,
    filters.isNew,
    filters.isBestSeller,
    filters.minPrice > 0 || filters.maxPrice < 2000,
  ].filter(Boolean).length

  return (
    <>
      {/* Mobile overlay */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-30 lg:hidden"
          onClick={onMobileClose}
        />
      )}

      {/* Filters panel */}
      <aside
        className={`
          fixed top-0 bottom-0 z-40 w-72 bg-dark-deeper border-e border-dark-border overflow-y-auto
          transition-transform duration-300 lg:static lg:transform-none lg:z-auto lg:w-64 lg:bg-transparent lg:border-0
          ${isMobileOpen ? 'translate-x-0 start-0' : '-translate-x-full start-0 lg:translate-x-0'}
        `}
      >
        <div className="p-6 lg:p-0 lg:sticky lg:top-28">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <SlidersHorizontal size={18} className="text-gold" />
              <h2 className="font-semibold text-white">{t.shop.filters}</h2>
              {activeCount > 0 && (
                <span className="w-5 h-5 bg-gold rounded-full text-dark-deeper text-[10px] font-bold flex items-center justify-center">
                  {activeCount}
                </span>
              )}
            </div>
            <div className="flex gap-2">
              {activeCount > 0 && (
                <button
                  onClick={onClear}
                  className="text-xs text-white/40 hover:text-gold transition-colors"
                >
                  {t.shop.clearFilters}
                </button>
              )}
              <button
                onClick={onMobileClose}
                className="lg:hidden p-1 text-white/40 hover:text-white"
              >
                <X size={18} />
              </button>
            </div>
          </div>

          {/* Category */}
          <FilterSection title={t.shop.category}>
            <button
              onClick={() => set({ category: '' })}
              className={`w-full text-start py-2 px-3 rounded-lg text-sm transition-colors
                ${!filters.category ? 'bg-gold/20 text-gold' : 'text-white/60 hover:text-white hover:bg-dark-card'}`}
            >
              {t.shop.allCategories}
            </button>
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => set({ category: cat.id })}
                className={`w-full text-start py-2 px-3 rounded-lg text-sm transition-colors flex items-center justify-between
                  ${filters.category === cat.id ? 'bg-gold/20 text-gold' : 'text-white/60 hover:text-white hover:bg-dark-card'}`}
              >
                <span>{cat.name[lang]}</span>
                <span className="text-[11px] text-white/30">{cat.count}</span>
              </button>
            ))}
          </FilterSection>

          {/* Material */}
          <FilterSection title={t.shop.material}>
            <button
              onClick={() => set({ material: '' })}
              className={`w-full text-start py-2 px-3 rounded-lg text-sm transition-colors
                ${!filters.material ? 'bg-gold/20 text-gold' : 'text-white/60 hover:text-white hover:bg-dark-card'}`}
            >
              {t.shop.allMaterials}
            </button>
            <button
              onClick={() => set({ material: 'gold' })}
              className={`w-full text-start py-2 px-3 rounded-lg text-sm transition-colors flex items-center gap-2
                ${filters.material === 'gold' ? 'bg-gold/20 text-gold' : 'text-white/60 hover:text-white hover:bg-dark-card'}`}
            >
              <span className="w-3 h-3 rounded-full bg-gold flex-shrink-0" />
              {t.shop.gold}
            </button>
            <button
              onClick={() => set({ material: 'silver' })}
              className={`w-full text-start py-2 px-3 rounded-lg text-sm transition-colors flex items-center gap-2
                ${filters.material === 'silver' ? 'bg-silver/20 text-silver' : 'text-white/60 hover:text-white hover:bg-dark-card'}`}
            >
              <span className="w-3 h-3 rounded-full bg-silver flex-shrink-0" />
              {t.shop.silver}
            </button>
          </FilterSection>

          {/* Price Range */}
          <FilterSection title={t.shop.priceRange}>
            <div className="space-y-3 px-1">
              <div className="flex items-center gap-3">
                <div className="flex-1">
                  <label className="text-xs text-white/40 mb-1 block">Min</label>
                  <input
                    type="number"
                    value={filters.minPrice}
                    onChange={(e) => set({ minPrice: Number(e.target.value) })}
                    min={0}
                    max={filters.maxPrice}
                    className="input-luxury text-sm py-2"
                    placeholder="0"
                  />
                </div>
                <span className="text-white/30 mt-5">—</span>
                <div className="flex-1">
                  <label className="text-xs text-white/40 mb-1 block">Max</label>
                  <input
                    type="number"
                    value={filters.maxPrice}
                    onChange={(e) => set({ maxPrice: Number(e.target.value) })}
                    min={filters.minPrice}
                    max={10000}
                    className="input-luxury text-sm py-2"
                    placeholder="2000"
                  />
                </div>
              </div>
              <div className="text-xs text-white/30 text-center">
                {filters.minPrice} - {filters.maxPrice} {t.common.sar}
              </div>
            </div>
          </FilterSection>

          {/* More filters */}
          <FilterSection title="More">
            <label className="flex items-center gap-3 cursor-pointer py-1.5 px-1 group">
              <div
                className={`w-4 h-4 rounded border-2 flex items-center justify-center transition-colors
                  ${filters.isNew ? 'bg-gold border-gold' : 'border-dark-muted group-hover:border-gold/40'}`}
                onClick={() => set({ isNew: !filters.isNew })}
              >
                {filters.isNew && <span className="text-dark-deeper text-[10px]">✓</span>}
              </div>
              <span className="text-sm text-white/60 group-hover:text-white transition-colors select-none">
                {t.shop.newArrivals}
              </span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer py-1.5 px-1 group">
              <div
                className={`w-4 h-4 rounded border-2 flex items-center justify-center transition-colors
                  ${filters.isBestSeller ? 'bg-gold border-gold' : 'border-dark-muted group-hover:border-gold/40'}`}
                onClick={() => set({ isBestSeller: !filters.isBestSeller })}
              >
                {filters.isBestSeller && <span className="text-dark-deeper text-[10px]">✓</span>}
              </div>
              <span className="text-sm text-white/60 group-hover:text-white transition-colors select-none">
                {t.shop.bestSellers}
              </span>
            </label>
          </FilterSection>

          <Button variant="gold" fullWidth onClick={onMobileClose} className="mt-4 lg:hidden">
            {t.common.filter}
          </Button>
        </div>
      </aside>
    </>
  )
}

function FilterSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-6 pb-6 border-b border-dark-border last:border-0">
      <h3 className="text-xs font-semibold text-gold/80 tracking-widest uppercase mb-3">
        {title}
      </h3>
      <div className="space-y-1">
        {children}
      </div>
    </div>
  )
}
