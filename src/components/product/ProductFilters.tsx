'use client'
import { X, SlidersHorizontal } from 'lucide-react'
import { useLanguage } from '@/context/LanguageContext'
import { CategoryId, Material } from '@/types'
import { categories } from '@/data/products'

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
  onFilterChange: (f: FilterState) => void
  onClear: () => void
  isMobileOpen: boolean
  onMobileClose: () => void
}

export default function ProductFilters({ filters, onFilterChange, onClear, isMobileOpen, onMobileClose }: ProductFiltersProps) {
  const { t, lang } = useLanguage()
  const set = (u: Partial<FilterState>) => onFilterChange({ ...filters, ...u })

  const activeCount = [filters.category, filters.material, filters.isNew, filters.isBestSeller].filter(Boolean).length

  return (
    <>
      {isMobileOpen && <div className="fixed inset-0 bg-black/40 z-30 lg:hidden" onClick={onMobileClose} />}

      <aside className={`fixed top-0 bottom-0 z-40 w-72 bg-white border-e border-[#E8E2D6] overflow-y-auto
        transition-transform duration-300 lg:static lg:transform-none lg:z-auto lg:w-56 lg:bg-transparent lg:border-0
        ${isMobileOpen ? 'translate-x-0 start-0' : '-translate-x-full start-0 lg:translate-x-0'}`}
      >
        <div className="p-5 lg:p-0 lg:sticky lg:top-24">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <SlidersHorizontal size={16} className="text-gold" />
              <span className="font-semibold text-ink text-sm">{t.shop.filters}</span>
              {activeCount > 0 && (
                <span className="w-5 h-5 bg-gold rounded-full text-white text-[10px] font-bold flex items-center justify-center">{activeCount}</span>
              )}
            </div>
            <div className="flex gap-2">
              {activeCount > 0 && (
                <button onClick={onClear} className="text-xs text-ink-muted hover:text-gold transition-colors">{t.shop.clearFilters}</button>
              )}
              <button onClick={onMobileClose} className="lg:hidden p-1 text-ink-muted hover:text-ink"><X size={16} /></button>
            </div>
          </div>

          {/* Category */}
          <FilterBlock title={t.shop.category}>
            {[{ id: '', label: t.shop.allCategories }, ...categories.map(c => ({ id: c.id, label: c.name[lang] }))].map(opt => (
              <button key={opt.id} onClick={() => set({ category: opt.id as CategoryId | '' })}
                className={`w-full text-start py-2 px-3 rounded-lg text-sm transition-colors
                  ${filters.category === opt.id ? 'bg-gold/10 text-gold font-medium' : 'text-ink-muted hover:text-ink hover:bg-cream'}`}
              >{opt.label}</button>
            ))}
          </FilterBlock>

          {/* Material */}
          <FilterBlock title={t.shop.material}>
            {[
              { id: '', label: t.shop.allMaterials, dot: '' },
              { id: 'gold',   label: t.shop.gold,   dot: 'bg-gold' },
              { id: 'silver', label: t.shop.silver, dot: 'bg-[#999]' },
            ].map(opt => (
              <button key={opt.id} onClick={() => set({ material: opt.id as Material | '' })}
                className={`w-full text-start py-2 px-3 rounded-lg text-sm transition-colors flex items-center gap-2
                  ${filters.material === opt.id ? 'bg-gold/10 text-gold font-medium' : 'text-ink-muted hover:text-ink hover:bg-cream'}`}
              >
                {opt.dot && <span className={`w-2.5 h-2.5 rounded-full ${opt.dot} shrink-0`} />}
                {opt.label}
              </button>
            ))}
          </FilterBlock>

          {/* Price */}
          <FilterBlock title={t.shop.priceRange}>
            <div className="flex gap-2 items-center">
              <input type="number" value={filters.minPrice} min={0}
                onChange={e => set({ minPrice: Number(e.target.value) })}
                className="input-clean text-sm py-2 w-24" placeholder="0" />
              <span className="text-ink-muted text-sm">—</span>
              <input type="number" value={filters.maxPrice} max={2000}
                onChange={e => set({ maxPrice: Number(e.target.value) })}
                className="input-clean text-sm py-2 w-24" placeholder="2000" />
            </div>
            <p className="text-[11px] text-ink-muted mt-2">{filters.minPrice} — {filters.maxPrice} {t.common.sar}</p>
          </FilterBlock>

          {/* More */}
          <FilterBlock title="More">
            {[{ key: 'isNew' as const, label: t.shop.newArrivals }, { key: 'isBestSeller' as const, label: t.shop.bestSellers }].map(({ key, label }) => (
              <label key={key} className="flex items-center gap-3 cursor-pointer py-2 px-1 group">
                <div onClick={() => set({ [key]: !filters[key] })}
                  className={`w-4 h-4 rounded border-2 flex items-center justify-center transition-colors cursor-pointer
                    ${filters[key] ? 'bg-gold border-gold' : 'border-[#ccc] group-hover:border-gold'}`}
                >
                  {filters[key] && <span className="text-white text-[9px]">✓</span>}
                </div>
                <span className="text-sm text-ink-muted group-hover:text-ink transition-colors select-none">{label}</span>
              </label>
            ))}
          </FilterBlock>
        </div>
      </aside>
    </>
  )
}

function FilterBlock({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-6 pb-6 border-b border-[#E8E2D6] last:border-0">
      <h3 className="text-[11px] tracking-[0.18em] uppercase text-gold font-semibold mb-3">{title}</h3>
      <div className="space-y-0.5">{children}</div>
    </div>
  )
}
