import React from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Scale,
  ShoppingBag,
  ArrowLeft,
  Plus,
  Check,
  X,
} from 'lucide-react'
import { useWishlist } from '@/context/WishlistContext'
import { useCart } from '@/context/CartContext'
import { EmptyState } from '@/components/common/EmptyState'
import { DemoPriceNotice } from '@/components/common/DemoPriceNotice'

export const Compare: React.FC = () => {
  const navigate = useNavigate()
  const { comparedProducts, removeFromCompare, clearCompare } = useWishlist()
  const { addToCart } = useCart()

  return (
    <div className="flex-1 w-full bg-[#faf9f6] text-stone-900 pb-20 flex flex-col">
      {/* 1. Sticky Compare Header */}
      <div className="sticky top-0 z-40 w-full bg-[#2b257d] text-white px-4 py-3 border-b border-[#3b3394]/50 shadow-sm shrink-0">
        <div className="flex items-center justify-between">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-1 text-xs text-stone-300 hover:text-white"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back</span>
          </button>

          <div className="text-center">
            <h1 className="font-serif font-bold text-sm text-white">Compare Stone Slabs</h1>
            <p className="text-[10px] text-stone-400">
              {comparedProducts.length} of 3 slabs selected
            </p>
          </div>

          {comparedProducts.length > 0 ? (
            <button
              onClick={clearCompare}
              className="text-[11px] text-stone-400 hover:text-red-400 underline"
            >
              Clear All
            </button>
          ) : (
            <div className="w-10" />
          )}
        </div>
      </div>

      {comparedProducts.length === 0 ? (
        <div className="p-4 flex-1">
          <EmptyState
            icon={Scale}
            title="No Slabs in Comparison"
            description="Select up to three stone slabs from the catalogue or your saved list to compare physical properties, finishes, and pricing side-by-side."
            actionLabel="Explore Stone Catalogue"
            onAction={() => navigate('/explore')}
          />
        </div>
      ) : (
        <div className="p-3.5 flex-1 flex flex-col">
          {/* Add Another Slab Prompt if < 3 */}
          {comparedProducts.length < 3 && (
            <div className="mb-3 p-2 bg-[#f4f1eb] rounded-xl border border-stone-200/80 flex items-center justify-between text-xs">
              <span className="text-[11px] text-stone-600">
                You can add {3 - comparedProducts.length} more slab to compare.
              </span>
              <button
                onClick={() => navigate('/explore')}
                className="px-2.5 py-1 bg-[#2b257d] hover:bg-[#201a61] text-[#dfc07c] rounded-lg font-medium text-[10px] flex items-center gap-1 transition-colors shadow-2xs"
              >
                <Plus className="w-3 h-3" />
                <span>Add Slab</span>
              </button>
            </div>
          )}

          {/* Side-by-Side Comparison Grid Table */}
          <div className="bg-white rounded-2xl border border-stone-200 shadow-xs overflow-hidden">
            {/* 1. Product Cards Header Row */}
            <div
              className={`grid divide-x divide-stone-200 border-b border-stone-200 ${
                comparedProducts.length === 1
                  ? 'grid-cols-1'
                  : comparedProducts.length === 2
                  ? 'grid-cols-2'
                  : 'grid-cols-3'
              }`}
            >
              {comparedProducts.map((product) => (
                <div key={product.id} className="p-2.5 flex flex-col justify-between relative group">
                  {/* Remove Button */}
                  <button
                    onClick={() => removeFromCompare(product.id)}
                    className="absolute top-2 right-2 w-6 h-6 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-red-600 transition-colors z-10"
                    title="Remove slab from comparison"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>

                  <div>
                    <div
                      onClick={() => navigate(`/product/${product.id}`)}
                      className="w-full aspect-square rounded-xl overflow-hidden bg-stone-100 cursor-pointer border border-stone-200"
                    >
                      <img
                        src={product.images[0]}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                      />
                    </div>

                    <div className="mt-2 text-center">
                      <span className="text-[8px] font-bold uppercase tracking-wider text-[#997327]">
                        {product.category}
                      </span>
                      <h3
                        onClick={() => navigate(`/product/${product.id}`)}
                        className="font-semibold text-xs text-stone-900 leading-tight mt-0.5 line-clamp-2 cursor-pointer hover:underline"
                      >
                        {product.name}
                      </h3>
                      <div className="font-mono text-[9px] text-stone-400 mt-0.5">
                        {product.gtReference}
                      </div>
                    </div>
                  </div>

                  {/* Add to Cart Button */}
                  <div className="mt-2.5 pt-2 border-t border-stone-100">
                    <button
                      onClick={() => addToCart(product, 1)}
                      className="w-full py-1.5 bg-[#2b257d] hover:bg-[#201a61] text-[#dfc07c] text-[10px] font-semibold rounded-lg flex items-center justify-center gap-1 active:scale-95 transition-all shadow-xs"
                    >
                      <ShoppingBag className="w-3 h-3" />
                      <span>Add Cart</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* 2. Comparison Metrics Rows */}
            <div className="divide-y divide-stone-100 text-xs">
              {/* Demo Price */}
              <div className="bg-stone-50/70 p-2 text-center font-bold text-stone-700 text-[11px] tracking-wide uppercase border-b border-stone-200">
                Demo Price / Slab
              </div>
              <div
                className={`grid divide-x divide-stone-100 p-2.5 text-center ${
                  comparedProducts.length === 1
                    ? 'grid-cols-1'
                    : comparedProducts.length === 2
                    ? 'grid-cols-2'
                    : 'grid-cols-3'
                }`}
              >
                {comparedProducts.map((p) => (
                  <div key={p.id}>
                    <div className="font-bold text-xs text-stone-900">
                      ${p.demoSlabPrice.toLocaleString()}
                    </div>
                    <div className="text-[9px] text-stone-500">${p.demoPricePerSqFt}/sq ft</div>
                  </div>
                ))}
              </div>

              {/* Material Family */}
              <div className="bg-stone-50/70 p-1.5 text-center font-semibold text-stone-600 text-[10px] tracking-wide uppercase">
                Stone Category
              </div>
              <div
                className={`grid divide-x divide-stone-100 p-2 text-center text-[11px] ${
                  comparedProducts.length === 1
                    ? 'grid-cols-1'
                    : comparedProducts.length === 2
                    ? 'grid-cols-2'
                    : 'grid-cols-3'
                }`}
              >
                {comparedProducts.map((p) => (
                  <div key={p.id} className="font-medium text-stone-800">
                    {p.category}
                  </div>
                ))}
              </div>

              {/* Origin */}
              <div className="bg-stone-50/70 p-1.5 text-center font-semibold text-stone-600 text-[10px] tracking-wide uppercase">
                Quarry Origin
              </div>
              <div
                className={`grid divide-x divide-stone-100 p-2 text-center text-[10.5px] ${
                  comparedProducts.length === 1
                    ? 'grid-cols-1'
                    : comparedProducts.length === 2
                    ? 'grid-cols-2'
                    : 'grid-cols-3'
                }`}
              >
                {comparedProducts.map((p) => (
                  <div key={p.id} className="text-stone-700">
                    {p.origin}
                  </div>
                ))}
              </div>

              {/* Surface Finish */}
              <div className="bg-stone-50/70 p-1.5 text-center font-semibold text-stone-600 text-[10px] tracking-wide uppercase">
                Surface Finish
              </div>
              <div
                className={`grid divide-x divide-stone-100 p-2 text-center text-[10.5px] ${
                  comparedProducts.length === 1
                    ? 'grid-cols-1'
                    : comparedProducts.length === 2
                    ? 'grid-cols-2'
                    : 'grid-cols-3'
                }`}
              >
                {comparedProducts.map((p) => (
                  <div key={p.id} className="text-stone-700 font-medium">
                    {p.finish}
                  </div>
                ))}
              </div>

              {/* Thickness */}
              <div className="bg-stone-50/70 p-1.5 text-center font-semibold text-stone-600 text-[10px] tracking-wide uppercase">
                Thickness
              </div>
              <div
                className={`grid divide-x divide-stone-100 p-2 text-center text-[10.5px] ${
                  comparedProducts.length === 1
                    ? 'grid-cols-1'
                    : comparedProducts.length === 2
                    ? 'grid-cols-2'
                    : 'grid-cols-3'
                }`}
              >
                {comparedProducts.map((p) => (
                  <div key={p.id} className="text-stone-700">
                    {p.thickness}
                  </div>
                ))}
              </div>

              {/* Dimensions */}
              <div className="bg-stone-50/70 p-1.5 text-center font-semibold text-stone-600 text-[10px] tracking-wide uppercase">
                Full Dimensions
              </div>
              <div
                className={`grid divide-x divide-stone-100 p-2 text-center text-[10.5px] ${
                  comparedProducts.length === 1
                    ? 'grid-cols-1'
                    : comparedProducts.length === 2
                    ? 'grid-cols-2'
                    : 'grid-cols-3'
                }`}
              >
                {comparedProducts.map((p) => (
                  <div key={p.id} className="font-mono text-[9.5px] text-stone-700">
                    {p.dimensions}
                  </div>
                ))}
              </div>

              {/* Mohs Hardness */}
              <div className="bg-stone-50/70 p-1.5 text-center font-semibold text-stone-600 text-[10px] tracking-wide uppercase">
                Mohs Mineral Hardness
              </div>
              <div
                className={`grid divide-x divide-stone-100 p-2 text-center text-[10.5px] ${
                  comparedProducts.length === 1
                    ? 'grid-cols-1'
                    : comparedProducts.length === 2
                    ? 'grid-cols-2'
                    : 'grid-cols-3'
                }`}
              >
                {comparedProducts.map((p) => (
                  <div key={p.id} className="font-medium text-stone-800">
                    {p.specifications.hardness}
                  </div>
                ))}
              </div>

              {/* Water Absorption */}
              <div className="bg-stone-50/70 p-1.5 text-center font-semibold text-stone-600 text-[10px] tracking-wide uppercase">
                Water Absorption Rate
              </div>
              <div
                className={`grid divide-x divide-stone-100 p-2 text-center text-[10.5px] ${
                  comparedProducts.length === 1
                    ? 'grid-cols-1'
                    : comparedProducts.length === 2
                    ? 'grid-cols-2'
                    : 'grid-cols-3'
                }`}
              >
                {comparedProducts.map((p) => (
                  <div key={p.id} className="text-stone-700">
                    {p.specifications.waterAbsorption}
                  </div>
                ))}
              </div>

              {/* Bookmatching */}
              <div className="bg-stone-50/70 p-1.5 text-center font-semibold text-stone-600 text-[10px] tracking-wide uppercase">
                Bookmatched Ready
              </div>
              <div
                className={`grid divide-x divide-stone-100 p-2 text-center text-[10.5px] ${
                  comparedProducts.length === 1
                    ? 'grid-cols-1'
                    : comparedProducts.length === 2
                    ? 'grid-cols-2'
                    : 'grid-cols-3'
                }`}
              >
                {comparedProducts.map((p) => (
                  <div key={p.id} className="flex justify-center">
                    {p.specifications.bookmatchReady ? (
                      <span className="inline-flex items-center gap-1 text-emerald-700 font-medium">
                        <Check className="w-3.5 h-3.5" /> Yes
                      </span>
                    ) : (
                      <span className="text-stone-400">Random Vein</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-4">
            <DemoPriceNotice />
          </div>
        </div>
      )}
    </div>
  )
}
