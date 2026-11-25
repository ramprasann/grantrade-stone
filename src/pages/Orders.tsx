import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Package,
  Clock,
  RotateCcw,
  Ban,
  ChevronRight,
} from 'lucide-react'
import { useOrders } from '@/context/OrderContext'
import { useCart } from '@/context/CartContext'
import { OrderStatus, Order } from '@/types'
import { EmptyState } from '@/components/common/EmptyState'
import { DemoPriceNotice } from '@/components/common/DemoPriceNotice'

export const Orders: React.FC = () => {
  const navigate = useNavigate()
  const { orders, cancelOrder } = useOrders()
  const { addToCart } = useCart()

  const [activeTab, setActiveTab] = useState<'All' | 'Active' | 'Delivered' | 'Cancelled'>('All')
  const [cancelModalOrderId, setCancelModalOrderId] = useState<string | null>(null)

  const filteredOrders = orders.filter((order) => {
    if (activeTab === 'All') return true
    if (activeTab === 'Active') {
      return ['Order Placed', 'Processing', 'Confirmed', 'Shipped'].includes(order.status)
    }
    if (activeTab === 'Delivered') return order.status === 'Delivered'
    if (activeTab === 'Cancelled') return order.status === 'Cancelled'
    return true
  })

  const getStatusBadge = (status: OrderStatus) => {
    switch (status) {
      case 'Delivered':
        return 'bg-emerald-100 text-emerald-800 border-emerald-200'
      case 'Confirmed':
        return 'bg-blue-100 text-blue-800 border-blue-200'
      case 'Shipped':
        return 'bg-amber-100 text-amber-800 border-amber-200'
      case 'Cancelled':
        return 'bg-rose-100 text-rose-700 border-rose-200'
      case 'Processing':
        return 'bg-purple-100 text-purple-800 border-purple-200'
      default:
        return 'bg-stone-100 text-stone-800 border-stone-200'
    }
  }

  const handleReorder = (order: Order, e: React.MouseEvent) => {
    e.stopPropagation()
    order.items.forEach((item) => {
      addToCart(
        item.product,
        item.quantity,
        item.selectedFinish,
        item.selectedThickness,
        item.unitType
      )
    })
    navigate('/cart')
  }

  const handleConfirmCancel = () => {
    if (cancelModalOrderId) {
      cancelOrder(cancelModalOrderId)
      setCancelModalOrderId(null)
    }
  }

  return (
    <div className="flex-1 w-full bg-[#faf9f6] text-stone-900 pb-20 flex flex-col">
      {/* 1. Orders Header */}
      <div className="bg-[#2b257d] text-white px-4 pt-3 pb-3 border-b border-[#3b3394]/50 shrink-0 sticky top-0 z-30 shadow-xs">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-serif font-bold text-base text-white">Order History</h1>
            <p className="text-[10px] text-stone-400">
              Track simulated stone slab purchases and yard staging
            </p>
          </div>
          <span className="bg-white/10 text-stone-200 font-mono text-[10px] px-2.5 py-1 rounded-full border border-white/10">
            {orders.length} Total
          </span>
        </div>

        {/* Status Filter Tabs */}
        <div className="flex gap-1.5 mt-3 overflow-x-auto no-scrollbar">
          {(['All', 'Active', 'Delivered', 'Cancelled'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-3 py-1 rounded-full text-[11px] font-medium whitespace-nowrap transition-all ${
                activeTab === tab
                  ? 'bg-[#c29d53] text-black font-semibold'
                  : 'bg-stone-800 text-stone-300 hover:bg-stone-700'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* 2. Order Cards List */}
      <div className="p-4 flex-1 space-y-3.5">
        {filteredOrders.length > 0 ? (
          filteredOrders.map((order) => {
            const isCancellable = ['Order Placed', 'Processing', 'Confirmed'].includes(order.status)

            return (
              <div
                key={order.id}
                onClick={() => navigate(`/order/${order.id}`)}
                className="bg-white rounded-2xl border border-stone-200/90 p-4 shadow-xs hover:shadow-md transition-all cursor-pointer relative group"
              >
                {/* Order Top Bar: ID, Date, Status */}
                <div className="flex items-center justify-between pb-2.5 border-b border-stone-100">
                  <div>
                    <span className="font-mono font-bold text-xs text-stone-900">
                      {order.id}
                    </span>
                    <div className="flex items-center gap-1 text-[10px] text-stone-500 mt-0.5">
                      <Clock className="w-3 h-3" />
                      <span>{order.date}</span>
                    </div>
                  </div>

                  <span
                    className={`text-[9.5px] font-semibold px-2 py-0.5 rounded-full border ${getStatusBadge(
                      order.status
                    )}`}
                  >
                    {order.status}
                  </span>
                </div>

                {/* Slabs In This Order */}
                <div className="py-2.5 space-y-2">
                  {order.items.map((item) => (
                    <div key={item.cartItemId} className="flex items-center gap-2.5">
                      <img
                        src={item.product.images[0]}
                        alt={item.product.name}
                        className="w-12 h-12 rounded-lg object-cover border border-stone-200 shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-xs text-stone-900 truncate">
                          {item.product.name}
                        </h4>
                        <div className="text-[10px] text-stone-500 truncate">
                          {item.quantity} {item.unitType === 'bundle' ? 'bundles' : 'slabs'} •{' '}
                          {item.selectedFinish}
                        </div>
                        <div className="text-[9px] font-mono text-[#997327]">
                          {item.product.gtReference}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Bottom Bar: Total, Reorder & Cancel buttons */}
                <div className="pt-2.5 border-t border-stone-100 flex items-center justify-between">
                  <div>
                    <span className="text-[9px] text-stone-500 block">Demo Total</span>
                    <span className="font-bold text-xs text-stone-900">
                      ${order.total.toLocaleString()}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    {isCancellable && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          setCancelModalOrderId(order.id)
                        }}
                        className="px-2.5 py-1 text-[10px] text-stone-500 hover:text-red-600 rounded-lg border border-stone-200 hover:border-red-300 transition-colors"
                      >
                        Cancel Demo
                      </button>
                    )}

                    <button
                      onClick={(e) => handleReorder(order, e)}
                      className="px-2.5 py-1 bg-[#2b257d] hover:bg-[#201a61] text-[#dfc07c] text-[10px] font-semibold rounded-lg flex items-center gap-1 active:scale-95 transition-all shadow-xs"
                    >
                      <RotateCcw className="w-3 h-3" />
                      <span>Reorder</span>
                    </button>

                    <ChevronRight className="w-4 h-4 text-stone-400 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </div>
              </div>
            )
          })
        ) : (
          <EmptyState
            icon={Package}
            title={activeTab === 'All' ? 'No Orders Yet' : `No ${activeTab} Orders`}
            description="You don't have any stone slab orders in this category yet. Explore our warehouse inventory to place a simulated demo order."
            actionLabel="Explore Inventory"
            onAction={() => navigate('/explore')}
          />
        )}

        <div className="mt-4">
          <DemoPriceNotice />
        </div>
      </div>

      {/* Cancel Confirmation Modal */}
      {cancelModalOrderId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in">
          <div className="w-full max-w-sm bg-white rounded-2xl p-5 shadow-2xl text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-red-100 text-red-600 flex items-center justify-center mx-auto">
              <Ban className="w-6 h-6" />
            </div>
            <h3 className="font-serif font-bold text-sm text-stone-900">Cancel Demo Order?</h3>
            <p className="text-xs text-stone-600">
              Are you sure you want to cancel simulated order{' '}
              <span className="font-mono font-bold text-stone-800">{cancelModalOrderId}</span>?
            </p>
            <div className="pt-2 flex items-center gap-2">
              <button
                onClick={() => setCancelModalOrderId(null)}
                className="w-1/2 py-2 bg-stone-100 text-stone-700 text-xs font-semibold rounded-xl"
              >
                Keep Order
              </button>
              <button
                onClick={handleConfirmCancel}
                className="w-1/2 py-2 bg-red-600 text-white text-xs font-semibold rounded-xl hover:bg-red-700"
              >
                Yes, Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
