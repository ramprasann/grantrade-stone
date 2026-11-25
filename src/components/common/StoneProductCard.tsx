import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Heart, ShoppingBag, Scale, Layers } from 'lucide-react'
import { StoneProduct } from '@/types'
import { useCart } from '@/context/CartContext'
import { useWishlist } from '@/context/WishlistContext'

interface StoneProductCardProps {
  product: StoneProduct
  layout?: 'grid' | 'horizontal'
}

export const StoneProductCard: React.FC<StoneProductCardProps> = ({
  product,
  layout = 'grid',
}) => {
  const navigate = useNavigate()
  const { addToCart } = useCart()
  const { isSaved, toggleSaved, addToCompare, isCompared } = useWishlist()

  const saved = isSaved(product.id)
  const compared = isCompared(product.id)

  const handleCardClick = () => {
    navigate(`/product/${product.id}`)
  }

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation()
    addToCart(product, 1)
  }

  const handleToggleSaved = (e: React.MouseEvent) => {
    e.stopPropagation()
    toggleSaved(product)
  }

  const handleToggleCompare = (e: React.MouseEvent) => {
    e.stopPropagation()
    addToCompare(product)
  }

  if (layout === 'horizontal') {
    return (
      <div
        onClick={handleCardClick}
        className="bg-white rounded-xl border border-stone-200/90 shadow-xs hover:shadow-md transition-all p-2.5 flex gap-3 cursor-pointer relative group active:scale-[0.99]"
      >
        {/* Thumbnail Image */}
        <div className="relative w-24 h-24 rounded-lg overflow-hidden shrink-0 bg-stone-100 border border-stone-200">
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />
          <span className="absolute bottom-1 left-1 bg-black/75 text-[8px] text-white font-mono px-1 py-0.5 rounded">
            {product.gtReference}
          </span>
        </div>

        {/* Content */}
        <div className="flex-1 flex flex-col justify-between min-w-0">
          <div>
            <div className="flex items-start justify-between gap-1">
              <span className="text-[10px] font-semibold uppercase tracking-wider text-[#997327]">
                {product.category}
              </span>
              <button
                onClick={handleToggleSaved}
                className={`p-1 -mr-1 rounded-full transition-colors ${
                  saved ? 'text-red-500' : 'text-stone-400 hover:text-stone-700'
                }`}
                aria-label="Save slab"
              >
                <Heart className={`w-4 h-4 ${saved ? 'fill-current' : ''}`} />
              </button>
            </div>

            <h3 className="font-semibold text-xs text-stone-900 truncate mt-0.5">
              {product.name}
            </h3>

            <p className="text-[10px] text-stone-500 truncate mt-0.5">
              {product.origin} • {product.thickness}
            </p>
          </div>

          <div className="flex items-center justify-between mt-2 pt-1.5 border-t border-stone-100">
            <div>
              <div className="text-[11px] font-bold text-stone-900">
                ${product.demoSlabPrice.toLocaleString()}{' '}
                <span className="text-[9px] font-normal text-stone-500">/slab demo</span>
              </div>
            </div>

            <button
              onClick={handleAddToCart}
              className="px-2.5 py-1 bg-[#181a1f] hover:bg-black text-[#e4c987] text-[10px] font-medium rounded-lg flex items-center gap-1 active:scale-95 transition-all"
            >
              <ShoppingBag className="w-3 h-3" />
              <span>Add</span>
            </button>
          </div>
        </div>
      </div>
    )
  }

  // Grid layout (Standard Mobile Card)
  return (
    <div
      onClick={handleCardClick}
      className="bg-white rounded-xl border border-stone-200/90 shadow-xs hover:shadow-md transition-all overflow-hidden flex flex-col cursor-pointer relative group active:scale-[0.99]"
    >
      {/* Slab Image Container */}
      <div className="relative w-full h-36 bg-stone-100 overflow-hidden">
        <img
          src={product.images[0]}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />

        {/* Top Badges */}
        <div className="absolute top-2 left-2 flex flex-col gap-1 z-10">
          <span className="bg-[#12151b]/85 backdrop-blur-xs text-[#e4c987] font-semibold text-[9px] px-2 py-0.5 rounded tracking-wide border border-[#c29d53]/30">
            {product.category}
          </span>
          {product.newArrival && (
            <span className="bg-[#556353]/90 text-white font-medium text-[8px] px-1.5 py-0.5 rounded tracking-wider uppercase">
              New Arrival
            </span>
          )}
        </div>

        {/* Quick Action Buttons (Wishlist & Compare) */}
        <div className="absolute top-2 right-2 flex flex-col gap-1 z-10">
          <button
            onClick={handleToggleSaved}
            className={`w-7 h-7 rounded-full bg-white/90 backdrop-blur-xs shadow-sm flex items-center justify-center transition-all active:scale-90 ${
              saved ? 'text-red-500' : 'text-stone-600 hover:text-stone-900'
            }`}
            aria-label="Wishlist"
          >
            <Heart className={`w-3.5 h-3.5 ${saved ? 'fill-current' : ''}`} />
          </button>

          <button
            onClick={handleToggleCompare}
            className={`w-7 h-7 rounded-full backdrop-blur-xs shadow-sm flex items-center justify-center transition-all active:scale-90 ${
              compared
                ? 'bg-[#c29d53] text-black font-bold'
                : 'bg-white/90 text-stone-600 hover:text-stone-900'
            }`}
            title="Compare slab"
            aria-label="Compare slab"
          >
            <Scale className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* GT Reference & Lot tag over image bottom */}
        <div className="absolute bottom-1.5 left-2 right-2 flex items-center justify-between text-[9px] text-white/90 bg-black/60 backdrop-blur-xs px-2 py-0.5 rounded">
          <span className="font-mono font-medium">{product.gtReference}</span>
          <span className="text-[8px] text-stone-300 truncate max-w-[90px]">
            {product.lotNumber}
          </span>
        </div>
      </div>

      {/* Card Details Body */}
      <div className="p-3 flex-1 flex flex-col justify-between">
        <div>
          <h3 className="font-semibold text-xs text-stone-900 line-clamp-1 group-hover:text-[#997327] transition-colors">
            {product.name}
          </h3>

          <div className="mt-1 flex items-center gap-1.5 text-[10px] text-stone-500">
            <span className="truncate">{product.origin}</span>
            <span>•</span>
            <span className="font-medium text-stone-600 truncate">{product.finish}</span>
          </div>

          <div className="mt-1 flex items-center gap-1 text-[9px] text-stone-400">
            <Layers className="w-2.5 h-2.5 text-[#c29d53]" />
            <span className="truncate">{product.thickness}</span>
          </div>
        </div>

        {/* Pricing & Add to Cart button */}
        <div className="mt-2.5 pt-2 border-t border-stone-100 flex items-center justify-between">
          <div>
            <div className="text-[12px] font-bold text-stone-900 leading-tight">
              ${product.demoSlabPrice.toLocaleString()}
            </div>
            <div className="text-[8.5px] text-stone-500 font-medium">
              ${product.demoPricePerSqFt}/sq ft{' '}
              <span className="bg-stone-100 text-stone-600 px-1 py-0.2 rounded font-mono text-[7.5px]">
                DEMO
              </span>
            </div>
          </div>

          <button
            onClick={handleAddToCart}
            className="px-2.5 py-1.5 bg-[#14171c] hover:bg-black text-[#e4c987] font-medium text-[10px] rounded-lg shadow-xs flex items-center gap-1 active:scale-95 transition-all"
            aria-label="Add to cart"
          >
            <ShoppingBag className="w-3 h-3" />
            <span>Add</span>
          </button>
        </div>
      </div>
    </div>
  )
}
