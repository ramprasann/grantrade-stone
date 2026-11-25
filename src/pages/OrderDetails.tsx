import React from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import {
  ArrowLeft,
  Package,
  RotateCcw,
} from 'lucide-react'
import { useOrders } from '@/context/OrderContext'
import { useCart } from '@/context/CartContext'
import { EmptyState } from '@/components/common/EmptyState'
import { DemoPriceNotice } from '@/components/common/DemoPriceNotice'

export const OrderDetails: React.FC = () => {
  const { orderId } = useParams<{ orderId: string }>()
  const navigate = useNavigate()
  const { getOrderById, cancelOrder } = useOrders()
  const { addToCart } = useCart()

  const order = orderId ? getOrderById(orderId) : undefined

  if (!order) {
    return (
      <div className="flex-1 w-full bg-[#faf9f6] p-4 flex flex-col">
        <button
          onClick={() => navigate('/orders')}
          className="flex items-center gap-1 text-xs text-stone-600 mb-4"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Orders
        </button>
        <EmptyState
          icon={Package}
          title="Order Not Found"
          description="Could not find the requested order record in your demo session."
          actionLabel="View All Orders"
          onAction={() => navigate('/orders')}
        />
      </div>
    )
  }

  const isCancellable = ['Order Placed', 'Processing', 'Confirmed'].includes(order.status)

  const handleReorder = () => {
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

  return (
    <div className="flex-1 w-full bg-[#faf9f6] text-stone-900 pb-20 flex flex-col">
      {/* 1. Sticky Header */}
      <div className="sticky top-0 z-40 w-full bg-[#2b257d] text-white px-4 py-3 border-b border-[#3b3394]/50 shadow-sm shrink-0">
        <div className="flex items-center justify-between">
          <button
            onClick={() => navigate('/orders')}
            className="flex items-center gap-1 text-xs text-stone-300 hover:text-white"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Orders History</span>
          </button>
          <span className="font-mono text-xs text-[#dfc07c] font-bold">{order.id}</span>
        </div>
      </div>

      <div className="p-4 flex-1 space-y-4">
        {/* 2. Top Order Status Banner */}
        <div className="bg-white rounded-2xl border border-stone-200/90 p-4 shadow-xs">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-[10px] text-stone-500 uppercase tracking-wider block font-medium">
                Order Date
              </span>
              <span className="font-semibold text-xs text-stone-900">{order.date}</span>
            </div>
            <div className="text-right">
              <span className="text-[10px] text-stone-500 uppercase tracking-wider block font-medium">
                Status
              </span>
              <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#c29d53]/20 text-[#8d6e30] border border-[#c29d53]/30">
                {order.status}
              </span>
            </div>
          </div>

          {/* Tracking Timeline Log */}
          <div className="mt-4 pt-3 border-t border-stone-100">
            <h4 className="text-[11px] font-bold text-stone-800 mb-2">Simulated Yard Progress</h4>
            <div className="space-y-3 relative pl-4 border-l-2 border-[#c29d53]/40 ml-1 text-xs">
              {order.timeline.map((step, idx) => (
                <div key={idx} className="relative">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#c29d53] absolute -left-[21px] top-1 border-2 border-white shadow-xs" />
                  <div className="font-semibold text-stone-900 text-[11px]">{step.status}</div>
                  <div className="text-[9.5px] text-stone-400">{step.timestamp}</div>
                  <div className="text-[10px] text-stone-600 mt-0.5">{step.description}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 3. Items Ordered Card */}
        <div className="bg-white rounded-2xl border border-stone-200/90 p-4 shadow-xs space-y-3">
          <h3 className="font-serif font-bold text-sm text-stone-900 pb-2 border-b border-stone-100">
            Reserved Stone Slabs ({order.items.length})
          </h3>

          <div className="space-y-2.5">
            {order.items.map((item) => (
              <div
                key={item.cartItemId}
                onClick={() => navigate(`/product/${item.product.id}`)}
                className="flex items-center gap-3 p-2 rounded-xl hover:bg-stone-50 transition-colors cursor-pointer border border-stone-100"
              >
                <img
                  src={item.product.images[0]}
                  alt={item.product.name}
                  className="w-14 h-14 rounded-lg object-cover border border-stone-200 shrink-0"
                />

                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between">
                    <h4 className="font-semibold text-xs text-stone-900 truncate">
                      {item.product.name}
                    </h4>
                  </div>
                  <div className="text-[10px] text-stone-500 mt-0.5">
                    {item.quantity} {item.unitType === 'bundle' ? 'bundles' : 'slabs'} •{' '}
                    {item.selectedFinish} • {item.selectedThickness}
                  </div>
                  <div className="text-[9px] font-mono text-[#997327] mt-0.5">
                    Ref: {item.product.gtReference} • Lot: {item.product.lotNumber}
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <div className="font-bold text-xs text-stone-900">
                    $
                    {(
                      item.product.demoSlabPrice *
                      (item.unitType === 'bundle' ? 5 : 1) *
                      item.quantity
                    ).toLocaleString()}
                  </div>
                  <div className="text-[8.5px] text-stone-500">demo</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 4. Delivery & Payment Details */}
        <div className="bg-white rounded-2xl border border-stone-200/90 p-4 shadow-xs space-y-3 text-xs">
          <h3 className="font-serif font-bold text-sm text-stone-900 pb-2 border-b border-stone-100">
            Delivery & Payment Information
          </h3>

          <div className="space-y-1 text-stone-700">
            <div className="font-semibold text-stone-900">
              {order.shippingAddress.fullName}
              {order.shippingAddress.companyName ? ` (${order.shippingAddress.companyName})` : ''}
            </div>
            <div>{order.shippingAddress.address}</div>
            <div>
              {order.shippingAddress.city}, {order.shippingAddress.state}{' '}
              {order.shippingAddress.zipCode}
            </div>
            <div className="text-stone-500">Phone: {order.shippingAddress.phone}</div>
            <div className="text-stone-500">Email: {order.shippingAddress.email}</div>
            {order.shippingAddress.deliveryNotes && (
              <div className="text-[10.5px] text-stone-600 bg-stone-50 p-2 rounded-lg mt-1 border border-stone-200">
                <strong>Boom truck note:</strong> {order.shippingAddress.deliveryNotes}
              </div>
            )}
          </div>

          <div className="pt-2 border-t border-stone-100 text-[11px] text-stone-600">
            <span className="font-semibold text-stone-800">Payment Terms: </span>
            <span>{order.paymentMethod}</span>
          </div>
        </div>

        {/* 5. Cost Breakdown */}
        <div className="bg-white rounded-2xl border border-stone-200/90 p-4 shadow-xs space-y-2 text-xs">
          <h3 className="font-serif font-bold text-sm text-stone-900 pb-1.5 border-b border-stone-100">
            Cost Breakdown
          </h3>

          <div className="flex justify-between text-stone-600">
            <span>Slabs Subtotal:</span>
            <span className="font-semibold text-stone-900">${order.subtotal.toLocaleString()}</span>
          </div>
          <div className="flex justify-between text-stone-600">
            <span>Demo A-Frame Freight:</span>
            <span className="font-semibold text-stone-900">
              ${order.shippingEstimate.toLocaleString()}
            </span>
          </div>
          <div className="flex justify-between text-stone-600">
            <span>Estimated Sales Tax:</span>
            <span className="font-semibold text-stone-900">
              ${order.taxEstimate.toLocaleString()}
            </span>
          </div>
          <div className="flex justify-between font-bold text-sm text-stone-900 pt-1.5 border-t border-stone-100">
            <span>Demo Grand Total:</span>
            <span>${order.total.toLocaleString()}</span>
          </div>
        </div>

        {/* 6. Action Buttons */}
        <div className="pt-2 space-y-2">
          <button
            onClick={handleReorder}
            className="w-full py-3 bg-[#2b257d] hover:bg-[#201a61] text-[#dfc07c] font-semibold text-xs rounded-xl shadow-md flex items-center justify-center gap-2 active:scale-95 transition-all"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Reorder These Slabs</span>
          </button>

          {isCancellable && (
            <button
              onClick={() => {
                cancelOrder(order.id)
              }}
              className="w-full py-2.5 bg-stone-100 hover:bg-rose-50 text-rose-700 font-semibold text-xs rounded-xl border border-stone-200 transition-colors"
            >
              Cancel This Demo Order
            </button>
          )}
        </div>

        <DemoPriceNotice />
      </div>
    </div>
  )
}
