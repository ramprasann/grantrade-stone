import React, { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import {
  Heart,
  Scale,
  ShoppingBag,
  ArrowLeft,
  Share2,
  Check,
  Layers,
  Info,
  Minus,
  Plus,
} from 'lucide-react'
import { MOCK_PRODUCTS } from '@/data/mockProducts'
import { useCart } from '@/context/CartContext'
import { useWishlist } from '@/context/WishlistContext'
import { StoneProductCard } from '@/components/common/StoneProductCard'
import { DemoPriceNotice } from '@/components/common/DemoPriceNotice'
import { EmptyState } from '@/components/common/EmptyState'

export const ProductDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { addToCart } = useCart()
  const { isSaved, toggleSaved, addToCompare, isCompared } = useWishlist()

  const product = MOCK_PRODUCTS.find((p) => p.id === id)

  // Selection states
  const [activeImageIndex, setActiveImageIndex] = useState(0)
  const [selectedFinish, setSelectedFinish] = useState<string>(product?.finish || 'Polished Mirror')
  const [selectedThickness, setSelectedThickness] = useState<string>(
    product?.thickness || '3 cm (1-1/4")'
  )
  const [unitType, setUnitType] = useState<'slab' | 'bundle'>('slab')
  const [quantity, setQuantity] = useState(1)
  const [showShareToast, setShowShareToast] = useState(false)

  if (!product) {
    return (
      <div className="flex-1 w-full bg-[#faf9f6] flex flex-col">
        <div className="p-4">
          <button
            onClick={() => navigate('/explore')}
            className="flex items-center gap-1.5 text-xs text-stone-600 hover:text-black mb-4 font-medium"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Catalogue
          </button>
          <EmptyState
            icon={Info}
            title="Slab Not Found"
            description="The requested stone slab reference may have been archived or unbundled."
            actionLabel="Browse Catalogue"
            onAction={() => navigate('/explore')}
          />
        </div>
      </div>
    )
  }

  const saved = isSaved(product.id)
  const compared = isCompared(product.id)

  // Related products from same category
  const relatedProducts = MOCK_PRODUCTS.filter(
    (p) => p.category === product.category && p.id !== product.id
  ).slice(0, 4)

  // Price calculation
  const multiplier = unitType === 'bundle' ? 5 : 1
  const currentItemPrice = product.demoSlabPrice * multiplier * quantity

  const handleAddToCart = () => {
    addToCart(product, quantity, selectedFinish, selectedThickness, unitType)
  }

  const handleToggleSaved = () => {
    toggleSaved(product)
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `${product.name} - Gran Trade Stone`,
        text: `Check out ${product.name} (${product.gtReference}) at Gran Trade Inc.`,
        url: window.location.href,
      }).catch(() => {})
    } else {
      setShowShareToast(true)
      setTimeout(() => setShowShareToast(false), 2500)
    }
  }

  return (
    <div className="flex-1 w-full h-full min-h-0 flex flex-col bg-[#faf9f6] text-stone-900 overflow-hidden relative">
      {/* Share Toast */}
      {showShareToast && (
        <div className="fixed top-14 left-1/2 -translate-x-1/2 bg-black text-white text-xs px-4 py-2 rounded-full shadow-lg z-50 flex items-center gap-1.5 animate-in fade-in zoom-in-95">
          <Check className="w-3.5 h-3.5 text-[#dfc07c]" />
          <span>Product link copied to clipboard</span>
        </div>
      )}

      {/* Top Sticky Navigation Buttons over Gallery */}
      <div className="shrink-0 w-full bg-[#2b257d] px-4 py-2.5 flex items-center justify-between text-white border-b border-[#3b3394]/50 shadow-sm z-30">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-1 text-xs text-stone-300 hover:text-white"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back</span>
        </button>

        <div className="flex items-center gap-1">
          <button
            onClick={handleShare}
            className="p-1.5 rounded-full text-stone-300 hover:text-white hover:bg-stone-800 transition-colors"
            title="Share Slab"
          >
            <Share2 className="w-4 h-4" />
          </button>
          <button
            onClick={() => addToCompare(product)}
            className={`p-1.5 rounded-full transition-colors ${
              compared ? 'text-[#dfc07c]' : 'text-stone-300 hover:text-white hover:bg-stone-800'
            }`}
            title="Compare Slab"
          >
            <Scale className="w-4 h-4" />
          </button>
          <button
            onClick={handleToggleSaved}
            className={`p-1.5 rounded-full transition-colors ${
              saved ? 'text-red-500' : 'text-stone-300 hover:text-white hover:bg-stone-800'
            }`}
            title="Save to Wishlist"
          >
            <Heart className={`w-4 h-4 ${saved ? 'fill-current' : ''}`} />
          </button>
        </div>
      </div>

      {/* Scrollable Middle Details Canvas */}
      <div className="flex-1 min-h-0 overflow-y-auto no-scrollbar">

      {/* 1. Large Product Slab Image Showcase */}
      <div className="relative w-full bg-stone-950 aspect-4/3 overflow-hidden shadow-inner">
        <img
          src={product.images[activeImageIndex] || product.images[0]}
          alt={product.name}
          className="w-full h-full object-cover transition-all duration-300"
        />

        {/* Category & Status Overlay */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
          <span className="bg-[#12151b]/90 backdrop-blur-xs text-[#dfc07c] font-semibold text-[10px] px-2.5 py-0.5 rounded-md border border-[#c29d53]/30 tracking-wider">
            {product.category}
          </span>
          <span className="bg-black/75 backdrop-blur-xs text-stone-200 font-mono text-[9px] px-2 py-0.5 rounded">
            {product.lotNumber}
          </span>
        </div>

        {/* Image index counter indicator */}
        <div className="absolute bottom-3 right-3 bg-black/70 backdrop-blur-xs text-white text-[10px] px-2.5 py-1 rounded-full font-mono">
          {activeImageIndex + 1} / {product.images.length}
        </div>
      </div>

      {/* Image Thumbnails Slider */}
      {product.images.length > 1 && (
        <div className="px-4 py-2.5 bg-stone-100 border-b border-stone-200/80 flex gap-2 overflow-x-auto no-scrollbar">
          {product.images.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setActiveImageIndex(idx)}
              className={`w-14 h-14 rounded-lg overflow-hidden shrink-0 border-2 transition-all ${
                activeImageIndex === idx
                  ? 'border-[#c29d53] ring-2 ring-[#c29d53]/30'
                  : 'border-transparent opacity-65 hover:opacity-100'
              }`}
            >
              <img src={img} alt="" className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      )}

      {/* 2. Slab Title, Reference & Pricing Header */}
      <div className="p-4 bg-white border-b border-stone-200/80">
        <div className="flex items-start justify-between gap-2">
          <div>
            <div className="text-[10px] font-mono text-stone-500 font-semibold tracking-wider uppercase">
              GT REF: <span className="text-[#997327]">{product.gtReference}</span>
            </div>
            <h1 className="font-serif font-bold text-lg text-stone-900 mt-0.5 leading-snug">
              {product.name}
            </h1>
            <p className="text-xs text-stone-600 mt-1">
              Origin: <span className="font-medium text-stone-800">{product.origin}</span> • Color:{' '}
              <span className="font-medium text-stone-800">{product.color}</span>
            </p>
          </div>

          <div className="text-right shrink-0">
            <div className="text-base font-bold text-stone-900">
              ${product.demoSlabPrice.toLocaleString()}
            </div>
            <div className="text-[10px] text-stone-500 font-medium">
              ${product.demoPricePerSqFt}/sq ft{' '}
              <span className="bg-[#c29d53]/20 text-[#8d6e30] px-1 py-0.2 rounded font-mono text-[8px] font-bold">
                DEMO
              </span>
            </div>
          </div>
        </div>

        {/* Bundle Info Banner */}
        <div className="mt-3 p-2.5 bg-[#f5f3ec] rounded-xl border border-[#e6dfcf] flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            <Layers className="w-4 h-4 text-[#997327]" />
            <div>
              <div className="font-semibold text-stone-800 text-[11px]">{product.bundleInfo}</div>
              <div className="text-[10px] text-stone-500">
                {product.availableSlabsCount} slabs reserved in Carlstadt yard
              </div>
            </div>
          </div>
          <span className="text-[9px] bg-white text-stone-700 px-2 py-0.5 rounded font-mono border border-stone-300">
            {product.dimensions}
          </span>
        </div>
      </div>

      {/* 3. Slab Options & Customization */}
      <div className="p-4 bg-white border-b border-stone-200/80 mt-2 space-y-3.5 text-xs">
        {/* Unit Type: Single Slab vs Full Consecutive Bundle */}
        <div>
          <label className="font-semibold text-stone-800 block mb-1.5">Purchase Unit Format</label>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => setUnitType('slab')}
              className={`p-2.5 rounded-xl border text-left transition-all ${
                unitType === 'slab'
                  ? 'border-[#c29d53] bg-[#fbf9f4] text-stone-900 shadow-2xs'
                  : 'border-stone-200 bg-white text-stone-600 hover:bg-stone-50'
              }`}
            >
              <div className="font-semibold text-xs flex items-center justify-between">
                <span>Single Slab</span>
                {unitType === 'slab' && <Check className="w-3.5 h-3.5 text-[#a68239]" />}
              </div>
              <div className="text-[10px] text-stone-500 mt-0.5">
                ${product.demoSlabPrice.toLocaleString()} (approx {product.approxSqFt} sq ft)
              </div>
            </button>

            <button
              type="button"
              onClick={() => setUnitType('bundle')}
              className={`p-2.5 rounded-xl border text-left transition-all ${
                unitType === 'bundle'
                  ? 'border-[#c29d53] bg-[#fbf9f4] text-stone-900 shadow-2xs'
                  : 'border-stone-200 bg-white text-stone-600 hover:bg-stone-50'
              }`}
            >
              <div className="font-semibold text-xs flex items-center justify-between">
                <span>Consecutive Bundle</span>
                {unitType === 'bundle' && <Check className="w-3.5 h-3.5 text-[#a68239]" />}
              </div>
              <div className="text-[10px] text-stone-500 mt-0.5">
                5 Bookmatched Slabs (~${(product.demoSlabPrice * 5).toLocaleString()})
              </div>
            </button>
          </div>
        </div>

        {/* Surface Finish Option */}
        <div>
          <label className="font-semibold text-stone-800 block mb-1.5">Surface Finish</label>
          <div className="flex flex-wrap gap-2">
            {[product.finish, 'Honed Velvet', 'Leathered Satin'].filter(Boolean).map((finish) => (
              <button
                key={finish}
                type="button"
                onClick={() => setSelectedFinish(finish)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${
                  selectedFinish === finish
                    ? 'border-stone-900 bg-stone-900 text-[#dfc07c]'
                    : 'border-stone-200 bg-stone-50 text-stone-700 hover:bg-stone-100'
                }`}
              >
                {finish}
              </button>
            ))}
          </div>
        </div>

        {/* Thickness Selection */}
        <div>
          <label className="font-semibold text-stone-800 block mb-1.5">Slab Thickness</label>
          <div className="flex gap-2">
            {[product.thickness, '2 cm (3/4")'].map((thick) => (
              <button
                key={thick}
                type="button"
                onClick={() => setSelectedThickness(thick)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${
                  selectedThickness === thick
                    ? 'border-stone-900 bg-stone-900 text-[#dfc07c]'
                    : 'border-stone-200 bg-stone-50 text-stone-700 hover:bg-stone-100'
                }`}
              >
                {thick}
              </button>
            ))}
          </div>
        </div>

        {/* Quantity Controls */}
        <div className="flex items-center justify-between pt-1">
          <label className="font-semibold text-stone-800">
            Quantity ({unitType === 'bundle' ? 'Bundles' : 'Slabs'})
          </label>
          <div className="flex items-center border border-stone-300 rounded-xl bg-white shadow-2xs">
            <button
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              className="p-1.5 text-stone-600 hover:text-black active:scale-95 transition-all"
              aria-label="Decrease quantity"
            >
              <Minus className="w-3.5 h-3.5" />
            </button>
            <span className="w-9 text-center font-bold text-xs text-stone-900">{quantity}</span>
            <button
              onClick={() => setQuantity((q) => q + 1)}
              className="p-1.5 text-stone-600 hover:text-black active:scale-95 transition-all"
              aria-label="Increase quantity"
            >
              <Plus className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* 4. Description & Recommended Applications */}
      <div className="p-4 bg-white border-b border-stone-200/80 mt-2">
        <h3 className="font-serif font-bold text-sm text-stone-900 mb-1.5">Stone Description</h3>
        <p className="text-xs text-stone-600 leading-relaxed">{product.description}</p>

        <h4 className="font-semibold text-xs text-stone-800 mt-3.5 mb-2">Ideal Applications</h4>
        <div className="flex flex-wrap gap-1.5">
          {product.applications.map((app) => (
            <span
              key={app}
              className="bg-stone-100 text-stone-700 text-[10px] font-medium px-2.5 py-1 rounded-md border border-stone-200"
            >
              {app}
            </span>
          ))}
        </div>
      </div>

      {/* 5. Physical & Quarry Specifications Table */}
      <div className="p-4 bg-white border-b border-stone-200/80 mt-2">
        <h3 className="font-serif font-bold text-sm text-stone-900 mb-2.5">
          Technical Specifications
        </h3>

        <div className="border border-stone-200 rounded-xl overflow-hidden divide-y divide-stone-100 text-xs">
          <div className="grid grid-cols-2 p-2.5 bg-stone-50/70">
            <span className="text-stone-500">Mineral Hardness</span>
            <span className="font-medium text-stone-900">{product.specifications.hardness}</span>
          </div>
          <div className="grid grid-cols-2 p-2.5">
            <span className="text-stone-500">Water Absorption</span>
            <span className="font-medium text-stone-900">
              {product.specifications.waterAbsorption}
            </span>
          </div>
          <div className="grid grid-cols-2 p-2.5 bg-stone-50/70">
            <span className="text-stone-500">Density</span>
            <span className="font-medium text-stone-900">{product.specifications.density}</span>
          </div>
          <div className="grid grid-cols-2 p-2.5">
            <span className="text-stone-500">Pattern Style</span>
            <span className="font-medium text-stone-900">
              {product.specifications.patternType}
            </span>
          </div>
          <div className="grid grid-cols-2 p-2.5 bg-stone-50/70">
            <span className="text-stone-500">Bookmatched Pairing</span>
            <span className="font-medium text-stone-900">
              {product.specifications.bookmatchReady ? 'Available (Sequential)' : 'Natural Random'}
            </span>
          </div>
          <div className="grid grid-cols-2 p-2.5">
            <span className="text-stone-500">Full Dimensions</span>
            <span className="font-medium text-stone-900">{product.dimensions}</span>
          </div>
          <div className="grid grid-cols-2 p-2.5 bg-stone-50/70">
            <span className="text-stone-500">Quarry Lot</span>
            <span className="font-medium text-stone-900 font-mono">{product.lotNumber}</span>
          </div>
        </div>
      </div>

      {/* 6. Demo Pricing Notice */}
      <div className="px-4 mt-3">
        <DemoPriceNotice />
      </div>

      {/* Related Stone Slabs */}
      {relatedProducts.length > 0 && (
        <div className="mt-4 px-4 pb-4">
          <h3 className="font-serif font-bold text-sm text-stone-900 mb-2.5">
            Similar {product.category} Slabs
          </h3>
          <div className="grid grid-cols-2 gap-2.5">
            {relatedProducts.map((p) => (
              <StoneProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      )}
      </div>

      {/* Sticky Bottom Action Bar */}
      <div className="shrink-0 w-full bg-white/95 backdrop-blur-md border-t border-stone-200 px-4 py-3 sm:pb-3.5 pb-3 flex items-center justify-between gap-3 shadow-[0_-4px_20px_rgba(0,0,0,0.06)] z-30">
        <div>
          <div className="text-[10px] text-stone-500 font-medium">Demo Total:</div>
          <div className="text-base font-bold text-stone-900 leading-tight">
            ${currentItemPrice.toLocaleString()}
          </div>
        </div>

        <button
          onClick={handleAddToCart}
          className="flex-1 py-3 px-4 bg-[#2b257d] hover:bg-[#201a61] text-[#dfc07c] font-semibold text-xs rounded-xl shadow-md flex items-center justify-center gap-2 active:scale-95 transition-all"
        >
          <ShoppingBag className="w-4 h-4" />
          <span>Add to Cart ({quantity} {unitType === 'bundle' ? 'Bundles' : 'Slabs'})</span>
        </button>
      </div>
    </div>
  )
}
