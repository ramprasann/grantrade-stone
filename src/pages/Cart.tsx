import React from 'react'
import { useNavigate } from 'react-router-dom'
import {
  ShoppingBag,
  Trash2,
  Minus,
  Plus,
  ArrowRight,
  ArrowLeft,
  Truck,
  Layers,
} from 'lucide-react'
import { useCart } from '@/context/CartContext'
import { EmptyState } from '@/components/common/EmptyState'
import { DemoPriceNotice } from '@/components/common/DemoPriceNotice'

export const Cart: React.FC = () => {
  const navigate = useNavigate()
  const {
    cartItems,
    removeFromCart,
    updateQuantity,
    clearCart,
    totalCount,
    subtotal,
    shippingEstimate,
    taxEstimate,
    grandTotal,
  } = useCart()

  return (
    <div className="flex-1 w-full h-full min-h-0 flex flex-col bg-[#faf9f6] text-stone-900 overflow-hidden">
      {/* 1. Sticky Header */}
      <div className="shrink-0 w-full bg-[#2b257d] text-white px-4 py-3 border-b border-[#3b3394]/50 shadow-sm z-30">
        <div className="flex items-center justify-between">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-1 text-xs text-stone-300 hover:text-white"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back</span>
          </button>

          <div className="text-center">
            <h1 className="font-serif font-bold text-sm text-white">Your Shopping Cart</h1>
            <p className="text-[10px] text-stone-300">
              {totalCount} {totalCount === 1 ? 'slab item' : 'slab items'} selected
            </p>
          </div>

          {cartItems.length > 0 ? (
            <button
              onClick={clearCart}
              className="text-[11px] text-stone-300 hover:text-red-300 underline"
            >
              Clear Cart
            </button>
          ) : (
            <div className="w-10" />
          )}
        </div>
      </div>

      {cartItems.length === 0 ? (
        <div className="p-4 flex-1 min-h-0 overflow-y-auto no-scrollbar flex flex-col items-center justify-center">
          <EmptyState
            icon={ShoppingBag}
            title="Your Cart is Empty"
            description="You haven't added any natural or engineered stone slabs to your shopping cart yet."
            actionLabel="Explore Stone Catalogue"
            onAction={() => navigate('/explore')}
          />
        </div>
      ) : (
        <div className="flex-1 min-h-0 overflow-y-auto no-scrollbar p-4 space-y-4">
          {/* 2. Items List */}
          <div className="space-y-3">
            {cartItems.map((item) => {
              const multiplier = item.unitType === 'bundle' ? 5 : 1
              const itemTotal = item.product.demoSlabPrice * multiplier * item.quantity

              return (
                <div
                  key={item.cartItemId}
                  className="bg-white rounded-xl border border-stone-200/90 p-3 shadow-xs flex gap-3 relative"
                >
                  {/* Thumbnail Image */}
                  <div
                    onClick={() => navigate(`/product/${item.product.id}`)}
                    className="relative w-20 h-20 rounded-lg overflow-hidden shrink-0 bg-stone-100 cursor-pointer border border-stone-200"
                  >
                    <img
                      src={item.product.images[0]}
                      alt={item.product.name}
                      className="w-full h-full object-cover"
                    />
                    <span className="absolute bottom-0.5 left-0.5 bg-black/80 text-[7px] text-white font-mono px-1 rounded">
                      {item.product.gtReference}
                    </span>
                  </div>

                  {/* Item Details */}
                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between">
                        <span className="text-[9px] font-bold uppercase tracking-wider text-[#997327]">
                          {item.product.category}
                        </span>
                        <button
                          onClick={() => removeFromCart(item.cartItemId)}
                          className="text-stone-400 hover:text-red-600 p-0.5"
                          title="Remove item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <h3
                        onClick={() => navigate(`/product/${item.product.id}`)}
                        className="font-semibold text-xs text-stone-900 truncate cursor-pointer hover:underline"
                      >
                        {item.product.name}
                      </h3>

                      <div className="text-[10px] text-stone-500 mt-0.5">
                        {item.selectedFinish} • {item.selectedThickness}
                      </div>

                      <div className="text-[9px] text-[#997327] font-medium mt-0.5 flex items-center gap-1">
                        <Layers className="w-2.5 h-2.5" />
                        <span>
                          {item.unitType === 'bundle'
                            ? 'Consecutive Bundle (5 Bookmatched Slabs)'
                            : 'Single Full Slab'}
                        </span>
                      </div>
                    </div>

                    {/* Quantity & Item Pricing */}
                    <div className="mt-2 pt-1.5 border-t border-stone-100 flex items-center justify-between">
                      {/* Quantity Selector */}
                      <div className="flex items-center border border-stone-300 rounded-lg bg-stone-50">
                        <button
                          onClick={() => updateQuantity(item.cartItemId, item.quantity - 1)}
                          className="p-1 text-stone-600 hover:text-black active:scale-95"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-6 text-center font-bold text-xs text-stone-900">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.cartItemId, item.quantity + 1)}
                          className="p-1 text-stone-600 hover:text-black active:scale-95"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      {/* Item Total */}
                      <div className="text-right">
                        <div className="text-xs font-bold text-stone-900">
                          ${itemTotal.toLocaleString()}
                        </div>
                        <div className="text-[8.5px] text-stone-500">
                          ${item.product.demoSlabPrice.toLocaleString()}{' '}
                          {item.unitType === 'bundle' ? '× 5 slabs' : 'ea demo'}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          {/* 3. Continue Shopping Shortcut */}
          <div className="text-center pt-1">
            <button
              onClick={() => navigate('/explore')}
              className="text-xs text-[#997327] font-semibold hover:underline inline-flex items-center gap-1"
            >
              <span>+ Add More Stone Slabs</span>
            </button>
          </div>

          {/* 4. Order Cost Summary Card */}
          <div className="bg-white rounded-2xl border border-stone-200 p-4 shadow-xs space-y-2.5 text-xs">
            <h3 className="font-serif font-bold text-sm text-stone-900 pb-1 border-b border-stone-100">
              Estimated Order Summary
            </h3>

            <div className="flex justify-between text-stone-600">
              <span>Slabs Subtotal ({totalCount} items)</span>
              <span className="font-semibold text-stone-900">${subtotal.toLocaleString()}</span>
            </div>

            <div className="flex justify-between text-stone-600">
              <span className="flex items-center gap-1">
                <Truck className="w-3 h-3 text-[#556353]" />
                <span>Demo A-Frame Freight</span>
              </span>
              <span className="font-semibold text-stone-900">
                ${shippingEstimate.toLocaleString()}
              </span>
            </div>

            <div className="flex justify-between text-stone-600">
              <span>Estimated Sales Tax (NJ 6.625%)</span>
              <span className="font-semibold text-stone-900">${taxEstimate.toLocaleString()}</span>
            </div>

            <div className="pt-2 border-t border-stone-200 flex justify-between items-baseline">
              <div>
                <span className="font-bold text-sm text-stone-900">Demo Grand Total</span>
                <span className="block text-[9px] text-stone-500">
                  Wholesale simulation calculation
                </span>
              </div>
              <span className="font-bold text-base text-stone-900">
                ${grandTotal.toLocaleString()}
              </span>
            </div>
          </div>

          {/* 5. Demo Pricing Notice */}
          <DemoPriceNotice />
        </div>
      )}

      {/* Sticky Bottom Checkout Action */}
      {cartItems.length > 0 && (
        <div className="shrink-0 w-full bg-white/95 backdrop-blur-md border-t border-stone-200 px-4 py-3 sm:pb-3.5 pb-3 flex items-center justify-between gap-3 shadow-[0_-4px_20px_rgba(0,0,0,0.06)] z-30">
          <div>
            <div className="text-[10px] text-stone-500 font-medium">Grand Total:</div>
            <div className="text-base font-bold text-stone-900 leading-tight">
              ${grandTotal.toLocaleString()}
            </div>
          </div>

          <button
            onClick={() => navigate('/checkout')}
            className="flex-1 py-3 px-4 bg-[#2b257d] hover:bg-[#201a61] text-[#dfc07c] font-semibold text-xs rounded-xl shadow-md flex items-center justify-center gap-2 active:scale-95 transition-all"
          >
            <span>Proceed to Checkout</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  )
}
