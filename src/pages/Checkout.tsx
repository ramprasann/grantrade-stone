import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  ArrowLeft,
  ShieldCheck,
  Truck,
  CreditCard,
  Building,
  Info,
} from 'lucide-react'
import { useCart } from '@/context/CartContext'
import { useOrders } from '@/context/OrderContext'
import { useProfile } from '@/context/ProfileContext'
import { Order } from '@/types'

export const Checkout: React.FC = () => {
  const navigate = useNavigate()
  const { cartItems, subtotal, shippingEstimate, taxEstimate, grandTotal, clearCart } = useCart()
  const { createOrder } = useOrders()
  const { profile } = useProfile()

  // Form State initialized with Profile
  const [formData, setFormData] = useState({
    fullName: profile.fullName || '',
    companyName: profile.companyName || '',
    email: profile.email || '',
    phone: profile.phone || '',
    address: profile.address.street || '',
    city: profile.address.city || '',
    state: profile.address.state || 'NJ',
    zipCode: profile.address.zipCode || '',
    country: 'United States',
    deliveryNotes: 'Standard A-frame boom truck delivery to fabrication yard.',
    paymentMethod: 'Commercial Wholesale Terms (Net 30 - Demo)',
  })

  const [formErrors, setFormErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Redirect if cart is empty
  if (cartItems.length === 0) {
    return (
      <div className="flex-1 w-full bg-[#faf9f6] p-6 flex flex-col items-center justify-center text-center">
        <h2 className="font-serif font-bold text-base text-stone-900 mb-2">
          No Products to Checkout
        </h2>
        <p className="text-xs text-stone-500 mb-4">
          Please add stone slabs to your shopping cart before checking out.
        </p>
        <button
          onClick={() => navigate('/explore')}
          className="px-4 py-2 bg-[#2b257d] hover:bg-[#201a61] text-[#dfc07c] text-xs font-semibold rounded-xl transition-colors shadow-xs"
        >
          Browse Stone Catalogue
        </button>
      </div>
    )
  }

  const validate = () => {
    const errors: Record<string, string> = {}
    if (!formData.fullName.trim()) errors.fullName = 'Full name is required'
    if (!formData.email.trim() || !formData.email.includes('@'))
      errors.email = 'Valid business email is required'
    if (!formData.phone.trim()) errors.phone = 'Phone number is required'
    if (!formData.address.trim()) errors.address = 'Street address is required'
    if (!formData.city.trim()) errors.city = 'City is required'
    if (!formData.state.trim()) errors.state = 'State is required'
    if (!formData.zipCode.trim()) errors.zipCode = 'ZIP code is required'
    setFormErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (formErrors[name]) {
      setFormErrors((prev) => ({ ...prev, [name]: '' }))
    }
  }

  const handlePlaceDemoOrder = (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return

    setIsSubmitting(true)

    setTimeout(() => {
      const generatedOrderId = `GT-ORD-${new Date().getFullYear()}-${Math.floor(
        1000 + Math.random() * 9000
      )}`

      const newOrder: Order = {
        id: generatedOrderId,
        date: new Date().toISOString().split('T')[0],
        items: [...cartItems],
        subtotal,
        shippingEstimate,
        taxEstimate,
        total: grandTotal,
        status: 'Order Placed',
        shippingAddress: {
          fullName: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          address: formData.address,
          city: formData.city,
          state: formData.state,
          zipCode: formData.zipCode,
          country: formData.country,
          companyName: formData.companyName,
          deliveryNotes: formData.deliveryNotes,
        },
        paymentMethod: formData.paymentMethod,
        timeline: [
          {
            status: 'Order Placed',
            timestamp: new Date().toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
            }),
            description: 'Demo slab order placed successfully. Inventory hold simulated.',
          },
          {
            status: 'Processing',
            timestamp: new Date().toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
            }),
            description: 'Carlstadt yard order staging initiated.',
          },
        ],
      }

      createOrder(newOrder)
      clearCart()
      setIsSubmitting(false)
      navigate(`/order-success/${generatedOrderId}`)
    }, 700)
  }

  return (
    <div className="flex-1 w-full bg-[#faf9f6] text-stone-900 pb-8 flex flex-col">
      {/* 1. Sticky Header */}
      <div className="sticky top-0 z-40 w-full bg-[#2b257d] text-white px-4 py-3 border-b border-[#3b3394]/50 shadow-sm shrink-0">
        <div className="flex items-center justify-between">
          <button
            onClick={() => navigate('/cart')}
            className="flex items-center gap-1 text-xs text-stone-300 hover:text-white"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Cart</span>
          </button>

          <h1 className="font-serif font-bold text-sm text-white">Dummy Checkout</h1>
          <div className="w-10" />
        </div>
      </div>

      {/* Demo Notice Banner */}
      <div className="bg-[#f2eee3] border-b border-[#dfd7c2] px-4 py-2 flex items-center gap-2 text-[10.5px] text-[#7d6023]">
        <Info className="w-4 h-4 shrink-0" />
        <span>
          <strong>Demo Order Simulation:</strong> No real money will be charged and no real stone
          freight will be scheduled.
        </span>
      </div>

      <form onSubmit={handlePlaceDemoOrder} className="p-4 flex-1 space-y-4">
        {/* 2. Customer Information */}
        <div className="bg-white rounded-2xl border border-stone-200/90 p-4 shadow-xs space-y-3">
          <div className="flex items-center gap-2 pb-2 border-b border-stone-100">
            <Building className="w-4 h-4 text-[#997327]" />
            <h2 className="font-serif font-bold text-sm text-stone-900">Customer Information</h2>
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-stone-700 mb-1">
              Full Name *
            </label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleInputChange}
              className={`w-full bg-stone-50 text-xs px-3 py-2 rounded-xl border focus:outline-none focus:border-[#c29d53] ${
                formErrors.fullName ? 'border-red-500' : 'border-stone-200'
              }`}
            />
            {formErrors.fullName && (
              <span className="text-[10px] text-red-500 mt-0.5 block">{formErrors.fullName}</span>
            )}
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-[11px] font-semibold text-stone-700 mb-1">Email *</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className={`w-full bg-stone-50 text-xs px-3 py-2 rounded-xl border focus:outline-none focus:border-[#c29d53] ${
                  formErrors.email ? 'border-red-500' : 'border-stone-200'
                }`}
              />
              {formErrors.email && (
                <span className="text-[10px] text-red-500 mt-0.5 block">{formErrors.email}</span>
              )}
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-stone-700 mb-1">Phone *</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className={`w-full bg-stone-50 text-xs px-3 py-2 rounded-xl border focus:outline-none focus:border-[#c29d53] ${
                  formErrors.phone ? 'border-red-500' : 'border-stone-200'
                }`}
              />
              {formErrors.phone && (
                <span className="text-[10px] text-red-500 mt-0.5 block">{formErrors.phone}</span>
              )}
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-stone-700 mb-1">
              Company / Fabrication Business (Optional)
            </label>
            <input
              type="text"
              name="companyName"
              value={formData.companyName}
              onChange={handleInputChange}
              placeholder="e.g. Vance Architectural Stone"
              className="w-full bg-stone-50 text-xs px-3 py-2 rounded-xl border border-stone-200 focus:outline-none focus:border-[#c29d53]"
            />
          </div>
        </div>

        {/* 3. Job Site / Yard Shipping Address */}
        <div className="bg-white rounded-2xl border border-stone-200/90 p-4 shadow-xs space-y-3">
          <div className="flex items-center gap-2 pb-2 border-b border-stone-100">
            <Truck className="w-4 h-4 text-[#556353]" />
            <h2 className="font-serif font-bold text-sm text-stone-900">
              Delivery / Fabrication Yard Address
            </h2>
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-stone-700 mb-1">
              Street Address *
            </label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              className={`w-full bg-stone-50 text-xs px-3 py-2 rounded-xl border focus:outline-none focus:border-[#c29d53] ${
                formErrors.address ? 'border-red-500' : 'border-stone-200'
              }`}
            />
            {formErrors.address && (
              <span className="text-[10px] text-red-500 mt-0.5 block">{formErrors.address}</span>
            )}
          </div>

          <div className="grid grid-cols-3 gap-2">
            <div>
              <label className="block text-[11px] font-semibold text-stone-700 mb-1">City *</label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleInputChange}
                className={`w-full bg-stone-50 text-xs px-3 py-2 rounded-xl border focus:outline-none focus:border-[#c29d53] ${
                  formErrors.city ? 'border-red-500' : 'border-stone-200'
                }`}
              />
              {formErrors.city && (
                <span className="text-[10px] text-red-500 mt-0.5 block">{formErrors.city}</span>
              )}
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-stone-700 mb-1">State *</label>
              <input
                type="text"
                name="state"
                value={formData.state}
                onChange={handleInputChange}
                className="w-full bg-stone-50 text-xs px-3 py-2 rounded-xl border border-stone-200 focus:outline-none focus:border-[#c29d53]"
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-stone-700 mb-1">ZIP *</label>
              <input
                type="text"
                name="zipCode"
                value={formData.zipCode}
                onChange={handleInputChange}
                className={`w-full bg-stone-50 text-xs px-3 py-2 rounded-xl border focus:outline-none focus:border-[#c29d53] ${
                  formErrors.zipCode ? 'border-red-500' : 'border-stone-200'
                }`}
              />
              {formErrors.zipCode && (
                <span className="text-[10px] text-red-500 mt-0.5 block">{formErrors.zipCode}</span>
              )}
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-stone-700 mb-1">
              A-Frame Boom Truck Delivery Notes
            </label>
            <textarea
              name="deliveryNotes"
              rows={2}
              value={formData.deliveryNotes}
              onChange={handleInputChange}
              className="w-full bg-stone-50 text-xs px-3 py-2 rounded-xl border border-stone-200 focus:outline-none focus:border-[#c29d53]"
            />
          </div>
        </div>

        {/* 4. Demo Payment Selection */}
        <div className="bg-white rounded-2xl border border-stone-200/90 p-4 shadow-xs space-y-3">
          <div className="flex items-center gap-2 pb-2 border-b border-stone-100">
            <CreditCard className="w-4 h-4 text-[#997327]" />
            <h2 className="font-serif font-bold text-sm text-stone-900">
              Demo Wholesale Payment Method
            </h2>
          </div>

          <div className="space-y-2 text-xs">
            {[
              {
                id: 'Commercial Wholesale Terms (Net 30 - Demo)',
                name: 'Commercial Wholesale Terms (Net 30 - Demo)',
                desc: 'Standard commercial credit terms for verified fabricators & contractors',
              },
              {
                id: 'Bank Wire / ACH Transfer (Demo)',
                name: 'Bank Wire / ACH Direct Transfer (Demo)',
                desc: 'Instant verification for direct slab bundle reservations',
              },
              {
                id: 'Carlstadt Yard Pick-up / Certified Check (Demo)',
                name: 'Carlstadt Yard Pick-up / Certified Check (Demo)',
                desc: 'Customer brings dedicated A-Frame trailer to Carlstadt warehouse',
              },
            ].map((option) => (
              <label
                key={option.id}
                className={`p-3 rounded-xl border flex items-start gap-2.5 cursor-pointer transition-all ${
                  formData.paymentMethod === option.id
                    ? 'border-[#c29d53] bg-[#fdfbf6] shadow-2xs'
                    : 'border-stone-200 hover:bg-stone-50'
                }`}
              >
                <input
                  type="radio"
                  name="paymentMethod"
                  value={option.id}
                  checked={formData.paymentMethod === option.id}
                  onChange={handleInputChange}
                  className="mt-0.5 text-[#c29d53] focus:ring-[#c29d53]"
                />
                <div className="flex-1">
                  <div className="font-semibold text-stone-900 text-xs">{option.name}</div>
                  <div className="text-[10px] text-stone-500 mt-0.5">{option.desc}</div>
                </div>
              </label>
            ))}
          </div>
        </div>

        {/* 5. Order Summary Mini Review */}
        <div className="bg-white rounded-2xl border border-stone-200/90 p-4 shadow-xs space-y-2 text-xs">
          <h3 className="font-serif font-bold text-sm text-stone-900 pb-1.5 border-b border-stone-100">
            Order Items ({cartItems.length})
          </h3>

          <div className="space-y-1.5 max-h-36 overflow-y-auto pr-1">
            {cartItems.map((item) => (
              <div key={item.cartItemId} className="flex justify-between items-center text-xs">
                <div className="truncate pr-2">
                  <span className="font-semibold text-stone-800">{item.product.name}</span>
                  <span className="text-[10px] text-stone-500 ml-1">
                    ({item.quantity} {item.unitType === 'bundle' ? 'bundles' : 'slabs'})
                  </span>
                </div>
                <span className="font-mono text-stone-700 shrink-0">
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

          <div className="pt-2 border-t border-stone-200 space-y-1 text-stone-600">
            <div className="flex justify-between">
              <span>Subtotal:</span>
              <span className="font-semibold text-stone-900">${subtotal.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span>Demo Freight:</span>
              <span className="font-semibold text-stone-900">
                ${shippingEstimate.toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Estimated Tax (NJ 6.625%):</span>
              <span className="font-semibold text-stone-900">${taxEstimate.toLocaleString()}</span>
            </div>
            <div className="flex justify-between font-bold text-sm text-stone-900 pt-1 border-t border-stone-100">
              <span>Demo Total:</span>
              <span>${grandTotal.toLocaleString()}</span>
            </div>
          </div>
        </div>

        {/* 6. Place Demo Order Button */}
        <div className="pt-2">
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3.5 bg-[#2b257d] hover:bg-[#201a61] text-[#dfc07c] font-bold text-xs rounded-xl shadow-lg flex items-center justify-center gap-2 active:scale-95 transition-all disabled:opacity-50"
          >
            {isSubmitting ? (
              <div className="w-5 h-5 border-2 border-[#dfc07c] border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
                <ShieldCheck className="w-4 h-4 text-[#dfc07c]" />
                <span>Place Demo Order (${grandTotal.toLocaleString()})</span>
              </>
            )}
          </button>
          <p className="text-[9.5px] text-stone-500 text-center mt-2">
            By clicking Place Demo Order, this simulated transaction is recorded in your app Orders
            history.
          </p>
        </div>
      </form>
    </div>
  )
}
