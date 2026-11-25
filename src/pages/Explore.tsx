import React, { useState, useMemo, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import {
  Search,
  SlidersHorizontal,
  X,
  ArrowUpDown,
  Filter,
  Check,
} from 'lucide-react'
import { MOCK_PRODUCTS } from '@/data/mockProducts'
import { StoneCategory } from '@/types'
import { StoneProductCard } from '@/components/common/StoneProductCard'
import { EmptyState } from '@/components/common/EmptyState'
import { DemoPriceNotice } from '@/components/common/DemoPriceNotice'

const CATEGORY_TABS: (StoneCategory | 'All')[] = [
  'All',
  'Quartzite',
  'Quartz',
  'Marble',
  'Granite',
  'Soapstone',
  'Semi-Precious',
  'Monuments',
  'Tiles',
]

const COLOR_OPTIONS = ['White', 'Beige', 'Grey', 'Black', 'Green', 'Blue']
const FINISH_OPTIONS = ['Polished Mirror', 'Honed Velvet', 'Leathered Satin', 'High Polished Diamond Mirror']
const THICKNESS_OPTIONS = ['3 cm (1-1/4")', '2 cm (3/4")', '10 mm (3/8")']
const ORIGIN_OPTIONS = ['Brazil', 'Italy', 'India', 'Zambia', 'Gran Trade Engineered Collection']

export const Explore: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams()

  // State from URL or defaults
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '')
  const [selectedCategory, setSelectedCategory] = useState<StoneCategory | 'All'>(
    (searchParams.get('category') as StoneCategory) || 'All'
  )
  const [selectedColor, setSelectedColor] = useState<string>(searchParams.get('color') || '')
  const [selectedFinish, setSelectedFinish] = useState<string>(searchParams.get('finish') || '')
  const [selectedThickness, setSelectedThickness] = useState<string>(
    searchParams.get('thickness') || ''
  )
  const [selectedOrigin, setSelectedOrigin] = useState<string>(searchParams.get('origin') || '')
  const [sortBy, setSortBy] = useState<string>(searchParams.get('sort') || 'recommended')

  // Bottom sheet modal visibility
  const [isFilterSheetOpen, setIsFilterSheetOpen] = useState(false)

  // Sync state if URL search params change
  useEffect(() => {
    const cat = searchParams.get('category') as StoneCategory
    if (cat && CATEGORY_TABS.includes(cat)) {
      setSelectedCategory(cat)
    }
    const q = searchParams.get('search')
    if (q !== null) {
      setSearchQuery(q)
    }
  }, [searchParams])

  // Active filter count
  const activeFiltersCount = [
    selectedCategory !== 'All',
    Boolean(selectedColor),
    Boolean(selectedFinish),
    Boolean(selectedThickness),
    Boolean(selectedOrigin),
  ].filter(Boolean).length

  // Filter & Sort logic
  const filteredProducts = useMemo(() => {
    return MOCK_PRODUCTS.filter((product) => {
      // 1. Search Query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim()
        const matchName = product.name.toLowerCase().includes(q)
        const matchRef = product.gtReference.toLowerCase().includes(q)
        const matchLot = product.lotNumber.toLowerCase().includes(q)
        const matchColor = product.color.toLowerCase().includes(q)
        const matchOrigin = product.origin.toLowerCase().includes(q)
        const matchCategory = product.category.toLowerCase().includes(q)

        if (
          !matchName &&
          !matchRef &&
          !matchLot &&
          !matchColor &&
          !matchOrigin &&
          !matchCategory
        ) {
          return false
        }
      }

      // 2. Category Tab
      if (selectedCategory !== 'All' && product.category !== selectedCategory) {
        return false
      }

      // 3. Color
      if (selectedColor && product.colorGroup !== selectedColor) {
        return false
      }

      // 4. Finish
      if (selectedFinish && !product.finish.toLowerCase().includes(selectedFinish.toLowerCase().split(' ')[0])) {
        return false
      }

      // 5. Thickness
      if (selectedThickness && !product.thickness.includes(selectedThickness.split(' ')[0])) {
        return false
      }

      // 6. Origin
      if (selectedOrigin && !product.origin.toLowerCase().includes(selectedOrigin.toLowerCase())) {
        return false
      }

      return true
    }).sort((a, b) => {
      if (sortBy === 'newest') {
        return (b.newArrival ? 1 : 0) - (a.newArrival ? 1 : 0)
      }
      if (sortBy === 'price-low') {
        return a.demoSlabPrice - b.demoSlabPrice
      }
      if (sortBy === 'price-high') {
        return b.demoSlabPrice - a.demoSlabPrice
      }
      if (sortBy === 'name-az') {
        return a.name.localeCompare(b.name)
      }
      // default: recommended (featured first)
      return (b.featured ? 1 : 0) - (a.featured ? 1 : 0)
    })
  }, [
    searchQuery,
    selectedCategory,
    selectedColor,
    selectedFinish,
    selectedThickness,
    selectedOrigin,
    sortBy,
  ])

  // Clear all filters
  const handleClearFilters = () => {
    setSelectedCategory('All')
    setSelectedColor('')
    setSelectedFinish('')
    setSelectedThickness('')
    setSelectedOrigin('')
    setSearchQuery('')
    setSearchParams({})
  }

  return (
    <div className="flex-1 w-full bg-[#faf9f6] text-stone-900 pb-20 flex flex-col">
      {/* 1. Header Search & Filter Bar */}
      <div className="bg-[#2b257d] text-white px-4 pt-3 pb-3 border-b border-[#3b3394]/50 shrink-0 sticky top-0 z-30 shadow-xs">
        <div className="relative flex items-center gap-2">
          <div className="relative flex-1">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search stone name, GT ref, lot, origin..."
              className="w-full bg-[#1e1960] text-stone-100 text-xs pl-8 pr-8 py-2 rounded-xl border border-[#433b9c]/60 focus:outline-none focus:border-[#dfc07c] placeholder:text-stone-300"
            />
            <Search className="w-3.5 h-3.5 text-stone-400 absolute left-2.5 top-2.5" />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-2.5 text-stone-400 hover:text-white"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Filter Button with Count Badge */}
          <button
            onClick={() => setIsFilterSheetOpen(true)}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium border transition-colors shrink-0 active:scale-95 ${
              activeFiltersCount > 0
                ? 'bg-[#c29d53] text-black border-[#c29d53]'
                : 'bg-[#20252e] text-stone-200 border-stone-700 hover:bg-stone-800'
            }`}
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span>Filters</span>
            {activeFiltersCount > 0 && (
              <span className="bg-black text-[#dfc07c] text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                {activeFiltersCount}
              </span>
            )}
          </button>
        </div>

        {/* 2. Horizontal Category Tabs */}
        <div className="flex items-center gap-1.5 mt-2.5 overflow-x-auto no-scrollbar py-0.5">
          {CATEGORY_TABS.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1 rounded-full text-[11px] whitespace-nowrap transition-all ${
                selectedCategory === cat
                  ? 'bg-[#c29d53] text-black font-semibold shadow-xs'
                  : 'bg-stone-800/80 text-stone-300 hover:bg-stone-700 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* 3. Active Filter Chips & Sort Controls */}
      <div className="px-4 py-2 bg-stone-100/90 border-b border-stone-200/90 flex items-center justify-between gap-2 shrink-0 text-xs">
        {/* Results Count & Active Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
          <span className="text-[11px] font-bold text-stone-800 shrink-0">
            {filteredProducts.length} {filteredProducts.length === 1 ? 'slab' : 'slabs'}
          </span>

          {selectedCategory !== 'All' && (
            <span className="inline-flex items-center gap-1 bg-white text-stone-800 text-[10px] font-medium px-2 py-0.5 rounded-full border border-stone-300 shrink-0">
              {selectedCategory}
              <X
                className="w-3 h-3 cursor-pointer hover:text-red-600"
                onClick={() => setSelectedCategory('All')}
              />
            </span>
          )}

          {selectedColor && (
            <span className="inline-flex items-center gap-1 bg-white text-stone-800 text-[10px] font-medium px-2 py-0.5 rounded-full border border-stone-300 shrink-0">
              Color: {selectedColor}
              <X
                className="w-3 h-3 cursor-pointer hover:text-red-600"
                onClick={() => setSelectedColor('')}
              />
            </span>
          )}

          {selectedFinish && (
            <span className="inline-flex items-center gap-1 bg-white text-stone-800 text-[10px] font-medium px-2 py-0.5 rounded-full border border-stone-300 shrink-0">
              {selectedFinish}
              <X
                className="w-3 h-3 cursor-pointer hover:text-red-600"
                onClick={() => setSelectedFinish('')}
              />
            </span>
          )}

          {selectedOrigin && (
            <span className="inline-flex items-center gap-1 bg-white text-stone-800 text-[10px] font-medium px-2 py-0.5 rounded-full border border-stone-300 shrink-0">
              Origin: {selectedOrigin}
              <X
                className="w-3 h-3 cursor-pointer hover:text-red-600"
                onClick={() => setSelectedOrigin('')}
              />
            </span>
          )}

          {activeFiltersCount > 0 && (
            <button
              onClick={handleClearFilters}
              className="text-[10px] text-red-600 font-semibold underline shrink-0 ml-1"
            >
              Clear All
            </button>
          )}
        </div>

        {/* Sort Dropdown */}
        <div className="shrink-0 flex items-center gap-1">
          <ArrowUpDown className="w-3 h-3 text-stone-500" />
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="bg-transparent text-[11px] font-semibold text-stone-700 focus:outline-none cursor-pointer"
          >
            <option value="recommended">Featured</option>
            <option value="newest">New Arrivals</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="name-az">Name (A-Z)</option>
          </select>
        </div>
      </div>

      {/* 4. Products Grid */}
      <div className="p-3.5 flex-1">
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-2 gap-3">
            {filteredProducts.map((product) => (
              <StoneProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <EmptyState
            icon={Filter}
            title="No Slabs Found"
            description="No stone varieties matched your exact search or filter combination. Try resetting your filters."
            actionLabel="Reset All Filters"
            onAction={handleClearFilters}
          />
        )}

        <div className="mt-6">
          <DemoPriceNotice />
        </div>
      </div>

      {/* 5. Mobile-Friendly Bottom Sheet for Filters */}
      {isFilterSheetOpen && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div
            className="w-full max-w-md bg-white rounded-t-3xl p-5 max-h-[85vh] flex flex-col shadow-2xl animate-in slide-in-from-bottom duration-200 border-t border-stone-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Sheet Handle & Header */}
            <div className="flex items-center justify-between pb-3 border-b border-stone-200">
              <div className="flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4 text-[#997327]" />
                <h3 className="font-serif font-bold text-base text-stone-900">Filter Slabs</h3>
              </div>
              <button
                onClick={() => setIsFilterSheetOpen(false)}
                className="p-1.5 text-stone-400 hover:text-stone-800 rounded-full"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Scrollable Filter Options */}
            <div className="flex-1 overflow-y-auto py-3 space-y-4 text-xs pr-1">
              {/* Category */}
              <div>
                <label className="font-semibold text-stone-800 block mb-2">Material Category</label>
                <div className="grid grid-cols-3 gap-1.5">
                  {CATEGORY_TABS.map((cat) => (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => setSelectedCategory(cat)}
                      className={`py-1.5 px-2 rounded-lg text-center font-medium transition-all ${
                        selectedCategory === cat
                          ? 'bg-[#2b257d] text-[#dfc07c] shadow-xs'
                          : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Color Group */}
              <div>
                <label className="font-semibold text-stone-800 block mb-2">Color Tone</label>
                <div className="flex flex-wrap gap-1.5">
                  <button
                    onClick={() => setSelectedColor('')}
                    className={`px-3 py-1.5 rounded-lg font-medium ${
                      selectedColor === ''
                        ? 'bg-[#2b257d] text-white'
                        : 'bg-stone-100 text-stone-600'
                    }`}
                  >
                    All Tones
                  </button>
                  {COLOR_OPTIONS.map((color) => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color === selectedColor ? '' : color)}
                      className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
                        selectedColor === color
                          ? 'bg-[#c29d53] text-black font-semibold'
                          : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                      }`}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>

              {/* Surface Finish */}
              <div>
                <label className="font-semibold text-stone-800 block mb-2">Surface Finish</label>
                <div className="space-y-1.5">
                  {FINISH_OPTIONS.map((finish) => (
                    <button
                      key={finish}
                      onClick={() => setSelectedFinish(selectedFinish === finish ? '' : finish)}
                      className={`w-full py-2 px-3 rounded-xl flex items-center justify-between text-left font-medium transition-colors ${
                        selectedFinish === finish
                          ? 'bg-stone-900 text-[#dfc07c]'
                          : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                      }`}
                    >
                      <span>{finish}</span>
                      {selectedFinish === finish && <Check className="w-4 h-4 text-[#dfc07c]" />}
                    </button>
                  ))}
                </div>
              </div>

              {/* Thickness */}
              <div>
                <label className="font-semibold text-stone-800 block mb-2">Thickness</label>
                <div className="flex flex-wrap gap-1.5">
                  {THICKNESS_OPTIONS.map((thick) => (
                    <button
                      key={thick}
                      onClick={() => setSelectedThickness(selectedThickness === thick ? '' : thick)}
                      className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
                        selectedThickness === thick
                          ? 'bg-[#2b257d] text-[#dfc07c]'
                          : 'bg-stone-100 text-stone-700'
                      }`}
                    >
                      {thick}
                    </button>
                  ))}
                </div>
              </div>

              {/* Stone Origin */}
              <div>
                <label className="font-semibold text-stone-800 block mb-2">Origin</label>
                <div className="space-y-1">
                  {ORIGIN_OPTIONS.map((origin) => (
                    <button
                      key={origin}
                      onClick={() => setSelectedOrigin(selectedOrigin === origin ? '' : origin)}
                      className={`w-full py-1.5 px-3 rounded-lg flex items-center justify-between text-left font-medium text-xs ${
                        selectedOrigin === origin
                          ? 'bg-stone-900 text-white'
                          : 'bg-stone-100 text-stone-600'
                      }`}
                    >
                      <span>{origin}</span>
                      {selectedOrigin === origin && <Check className="w-3.5 h-3.5 text-[#dfc07c]" />}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="pt-3 border-t border-stone-200 flex items-center gap-3">
              <button
                type="button"
                onClick={handleClearFilters}
                className="w-1/3 py-2.5 bg-stone-100 hover:bg-stone-200 text-stone-700 font-semibold text-xs rounded-xl transition-colors"
              >
                Reset
              </button>
              <button
                type="button"
                onClick={() => setIsFilterSheetOpen(false)}
                className="w-2/3 py-2.5 bg-[#2b257d] hover:bg-[#201a61] text-[#dfc07c] font-semibold text-xs rounded-xl shadow-md transition-colors"
              >
                Apply Filters ({filteredProducts.length})
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
