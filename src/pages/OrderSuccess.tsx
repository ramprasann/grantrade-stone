import React from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { CheckCircle2, Package, Home, Truck, MapPin } from 'lucide-react'
import { useOrders } from '@/context/OrderContext'

export const OrderSuccess: React.FC = () => {
  const { orderId } = useParams<{ orderId: string }>()
  const navigate = useNavigate()
  const { getOrderById } = useOrders()

  const order = orderId ? getOrderById(orderId) : undefined

  return (
    <div className="flex-1 w-full bg-[#faf9f6] text-stone-900 pb-20 p-4 flex flex-col items-center">
      {/* 1. Success Celebration Header */}
      <div className="w-full max-w-sm text-center pt-6 pb-4">
        <div className="w-16 h-16 rounded-full bg-[#c29d53]/20 border border-[#c29d53]/40 flex items-center justify-center mx-auto mb-3 shadow-inner">
          <CheckCircle2 className="w-9 h-9 text-[#a68239] animate-in zoom-in-75 duration-300" />
        </div>

        <span className="inline-block bg-[#556353]/15 text-[#455242] text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full mb-1">
          Demo Order Confirmed
        </span>

        <h1 className="font-serif font-bold text-xl text-stone-900">Thank You!</h1>
        <p className="text-xs text-stone-600 mt-1">
          Your demo stone slab order has been created and registered in your customer history.
        </p>

        {order && (
          <div className="mt-3 inline-block bg-white border border-stone-200 px-3 py-1.5 rounded-xl font-mono text-xs text-stone-800 shadow-2xs font-semibold">
            Order ID: <span className="text-[#997327]">{order.id}</span>
          </div>
        )}
      </div>

      {order ? (
        <div className="w-full max-w-sm space-y-3.5 text-xs">
          {/* 2. Order Summary Card */}
          <div className="bg-white rounded-2xl border border-stone-200 p-4 shadow-xs space-y-2.5">
            <div className="flex items-center justify-between pb-2 border-b border-stone-100">
              <span className="font-serif font-bold text-sm text-stone-900">Items Ordered</span>
              <span className="text-stone-500 text-[11px]">{order.items.length} varieties</span>
            </div>

            <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
              {order.items.map((item) => (
                <div key={item.cartItemId} className="flex items-center gap-2.5">
                  <img
                    src={item.product.images[0]}
                    alt=""
                    className="w-10 h-10 rounded-lg object-cover border border-stone-200 shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-xs text-stone-900 truncate">
                      {item.product.name}
                    </h4>
                    <p className="text-[10px] text-stone-500 truncate">
                      {item.quantity} {item.unitType === 'bundle' ? 'bundles' : 'slabs'} •{' '}
                      {item.selectedFinish}
                    </p>
                  </div>
                  <span className="font-bold text-xs text-stone-800 shrink-0">
                    $
                    {(
                      item.product.demoSlabPrice *
                      (item.unitType === 'bundle' ? 5 : 1) *
                      item.quantity
                    ).toLocaleString()}
                  </span>
                </div>
              ))}
            </div>

            <div className="pt-2 border-t border-stone-100 flex justify-between items-baseline font-bold text-sm text-stone-900">
              <span>Demo Total:</span>
              <span>${order.total.toLocaleString()}</span>
            </div>
          </div>

          {/* 3. Delivery Details */}
          <div className="bg-white rounded-2xl border border-stone-200 p-4 shadow-xs space-y-2">
            <div className="flex items-center gap-2 pb-1.5 border-b border-stone-100 font-semibold text-stone-800">
              <MapPin className="w-4 h-4 text-[#997327]" />
              <span>Fabrication Yard Destination</span>
            </div>
            <div className="text-stone-600 leading-relaxed text-[11px]">
              <div className="font-semibold text-stone-900">{order.shippingAddress.fullName}</div>
              {order.shippingAddress.companyName && (
                <div className="text-stone-700">{order.shippingAddress.companyName}</div>
              )}
              <div>{order.shippingAddress.address}</div>
              <div>
                {order.shippingAddress.city}, {order.shippingAddress.state}{' '}
                {order.shippingAddress.zipCode}
              </div>
              <div className="text-stone-500 mt-1">Phone: {order.shippingAddress.phone}</div>
            </div>
          </div>

          {/* 4. Yard Timeline */}
          <div className="bg-white rounded-2xl border border-stone-200 p-4 shadow-xs">
            <div className="flex items-center gap-2 pb-2 border-b border-stone-100 font-semibold text-stone-800 mb-2">
              <Truck className="w-4 h-4 text-[#556353]" />
              <span>Simulated Yard Timeline</span>
            </div>

            <div className="space-y-3 relative pl-4 border-l-2 border-[#c29d53]/50 ml-2">
              {order.timeline.map((step, idx) => (
                <div key={idx} className="relative">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#c29d53] absolute -left-[21px] top-1 border-2 border-white shadow-xs" />
                  <div className="font-semibold text-stone-900 text-xs">{step.status}</div>
                  <div className="text-[10px] text-stone-500">{step.timestamp}</div>
                  <div className="text-[10.5px] text-stone-600 mt-0.5">{step.description}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : null}

      {/* 5. Action Buttons */}
      <div className="w-full max-w-sm mt-5 space-y-2">
        <button
          onClick={() => navigate('/orders')}
          className="w-full py-3 bg-[#2b257d] hover:bg-[#201a61] text-[#dfc07c] font-semibold text-xs rounded-xl shadow-md flex items-center justify-center gap-2 active:scale-95 transition-all"
        >
          <Package className="w-4 h-4" />
          <span>View Orders History</span>
        </button>

        <button
          onClick={() => navigate('/')}
          className="w-full py-2.5 bg-stone-100 hover:bg-stone-200 text-stone-700 font-semibold text-xs rounded-xl flex items-center justify-center gap-2 transition-colors"
        >
          <Home className="w-4 h-4" />
          <span>Back to Home Dashboard</span>
        </button>
      </div>
    </div>
  )
}
