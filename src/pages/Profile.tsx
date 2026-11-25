import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Heart,
  Package,
  MapPin,
  Bell,
  HelpCircle,
  FileText,
  Shield,
  LogOut,
  ChevronRight,
  Edit3,
  Check,
  X,
  Sparkles,
} from 'lucide-react'
import { useProfile } from '@/context/ProfileContext'
import { useWishlist } from '@/context/WishlistContext'
import { useOrders } from '@/context/OrderContext'
import { useOnboarding } from '@/context/OnboardingContext'

export const Profile: React.FC = () => {
  const navigate = useNavigate()
  const { profile, updateProfile } = useProfile()
  const { savedItems } = useWishlist()
  const { orders } = useOrders()
  const { replayOnboarding } = useOnboarding()

  // Modal states
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [activeInfoModal, setActiveInfoModal] = useState<'privacy' | 'terms' | 'support' | null>(null)
  const [toastMessage, setToastMessage] = useState<string | null>(null)

  // Edit Profile Form State
  const [editForm, setEditForm] = useState({
    fullName: profile.fullName,
    customerType: profile.customerType,
    companyName: profile.companyName,
    email: profile.email,
    phone: profile.phone,
    street: profile.address.street,
    city: profile.address.city,
    state: profile.address.state,
    zipCode: profile.address.zipCode,
  })

  const showToast = (msg: string) => {
    setToastMessage(msg)
    setTimeout(() => setToastMessage(null), 2500)
  }

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault()
    updateProfile({
      fullName: editForm.fullName,
      customerType: editForm.customerType as any,
      companyName: editForm.companyName,
      email: editForm.email,
      phone: editForm.phone,
      address: {
        street: editForm.street,
        city: editForm.city,
        state: editForm.state,
        zipCode: editForm.zipCode,
        country: 'United States',
      },
    })
    setIsEditModalOpen(false)
    showToast('Profile updated successfully')
  }

  const handleToggleNotification = (key: 'newArrivals' | 'orderStatusUpdates' | 'exclusiveOffers') => {
    updateProfile({
      notificationPreferences: {
        ...profile.notificationPreferences,
        [key]: !profile.notificationPreferences[key],
      },
    })
    showToast('Preference updated')
  }

  const handleLogout = () => {
    showToast('Signed out of demo session')
  }

  return (
    <div className="flex-1 w-full bg-[#faf9f6] text-stone-900 pb-20 flex flex-col relative">
      {/* Toast Notice */}
      {toastMessage && (
        <div className="fixed top-14 left-1/2 -translate-x-1/2 bg-black text-white text-xs px-4 py-2 rounded-full shadow-lg z-50 flex items-center gap-1.5 animate-in fade-in zoom-in-95">
          <Check className="w-3.5 h-3.5 text-[#dfc07c]" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* 1. Header & Profile Banner */}
      <div className="bg-gradient-to-b from-[#383284] to-[#241e73] text-white px-4 pt-4 pb-6 rounded-b-[24px] shadow-sm shrink-0">
        <div className="flex items-center justify-between mb-4">
          <h1 className="font-serif font-bold text-base text-white">Customer Account</h1>
          <button
            onClick={() => setIsEditModalOpen(true)}
            className="flex items-center gap-1 bg-white/10 hover:bg-white/15 px-2.5 py-1 rounded-full text-xs text-stone-200 border border-white/10 transition-colors"
          >
            <Edit3 className="w-3 h-3 text-[#dfc07c]" />
            <span>Edit</span>
          </button>
        </div>

        {/* Customer Badge */}
        <div className="flex items-center gap-3">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-[#a68239] via-[#c29d53] to-[#e4c987] flex items-center justify-center text-black font-serif font-bold text-lg shadow-md shrink-0">
            {profile.fullName
              .split(' ')
              .map((n) => n[0])
              .join('')}
          </div>

          <div className="min-w-0">
            <div className="flex items-center gap-1.5">
              <h2 className="font-serif font-bold text-base text-white truncate">
                {profile.fullName}
              </h2>
            </div>

            <div className="inline-block bg-[#c29d53]/25 text-[#dfc07c] text-[10px] font-semibold px-2 py-0.5 rounded border border-[#c29d53]/30 mt-0.5">
              {profile.customerType}
            </div>

            <p className="text-[11px] text-stone-300 mt-1 truncate">
              {profile.companyName} • {profile.email}
            </p>
          </div>
        </div>
      </div>

      <div className="p-4 flex-1 space-y-4">
        {/* 2. Quick Activity Shortcuts */}
        <div className="grid grid-cols-2 gap-2.5 text-xs">
          <button
            onClick={() => navigate('/saved')}
            className="p-3 bg-white rounded-2xl border border-stone-200/90 shadow-2xs hover:shadow-xs flex items-center gap-2.5 text-left transition-all active:scale-98"
          >
            <div className="w-9 h-9 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center shrink-0">
              <Heart className="w-4.5 h-4.5 fill-rose-500/20" />
            </div>
            <div>
              <div className="font-bold text-stone-900">{savedItems.length} Saved</div>
              <div className="text-[10px] text-stone-500">Project Lists</div>
            </div>
          </button>

          <button
            onClick={() => navigate('/orders')}
            className="p-3 bg-white rounded-2xl border border-stone-200/90 shadow-2xs hover:shadow-xs flex items-center gap-2.5 text-left transition-all active:scale-98"
          >
            <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
              <Package className="w-4.5 h-4.5" />
            </div>
            <div>
              <div className="font-bold text-stone-900">{orders.length} Orders</div>
              <div className="text-[10px] text-stone-500">History & Staging</div>
            </div>
          </button>
        </div>

        {/* 3. Delivery Address Card */}
        <div className="bg-white rounded-2xl border border-stone-200/90 p-4 shadow-xs space-y-2 text-xs">
          <div className="flex items-center justify-between pb-1.5 border-b border-stone-100">
            <div className="flex items-center gap-2 font-semibold text-stone-900">
              <MapPin className="w-4 h-4 text-[#997327]" />
              <span>Default Delivery Yard</span>
            </div>
            <button
              onClick={() => setIsEditModalOpen(true)}
              className="text-[#997327] font-semibold text-[11px] hover:underline"
            >
              Change
            </button>
          </div>

          <div className="text-stone-600 leading-relaxed text-[11.5px]">
            <div className="font-medium text-stone-900">{profile.companyName}</div>
            <div>{profile.address.street}</div>
            <div>
              {profile.address.city}, {profile.address.state} {profile.address.zipCode}
            </div>
            <div className="text-stone-500 mt-1">Phone: {profile.phone}</div>
          </div>
        </div>

        {/* 4. Notification Preferences */}
        <div className="bg-white rounded-2xl border border-stone-200/90 p-4 shadow-xs space-y-3 text-xs">
          <div className="flex items-center gap-2 pb-1.5 border-b border-stone-100 font-semibold text-stone-900">
            <Bell className="w-4 h-4 text-[#997327]" />
            <span>Notification Preferences</span>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium text-stone-900">New Quarry Shipments</div>
                <div className="text-[10px] text-stone-500">
                  Alerts when new quartzite & marble lots arrive
                </div>
              </div>
              <input
                type="checkbox"
                checked={profile.notificationPreferences.newArrivals}
                onChange={() => handleToggleNotification('newArrivals')}
                className="w-4 h-4 text-[#c29d53] rounded focus:ring-[#c29d53] cursor-pointer"
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium text-stone-900">Order & Staging Updates</div>
                <div className="text-[10px] text-stone-500">
                  Status changes for yard orders & flatbed dispatch
                </div>
              </div>
              <input
                type="checkbox"
                checked={profile.notificationPreferences.orderStatusUpdates}
                onChange={() => handleToggleNotification('orderStatusUpdates')}
                className="w-4 h-4 text-[#c29d53] rounded focus:ring-[#c29d53] cursor-pointer"
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium text-stone-900">Exclusive Bundle Promotions</div>
                <div className="text-[10px] text-stone-500">
                  Wholesale volume discounts on consecutive slabs
                </div>
              </div>
              <input
                type="checkbox"
                checked={profile.notificationPreferences.exclusiveOffers}
                onChange={() => handleToggleNotification('exclusiveOffers')}
                className="w-4 h-4 text-[#c29d53] rounded focus:ring-[#c29d53] cursor-pointer"
              />
            </div>
          </div>
        </div>

        {/* 5. Support & Legal Section */}
        <div className="bg-white rounded-2xl border border-stone-200/90 overflow-hidden shadow-xs divide-y divide-stone-100 text-xs">
          <button
            onClick={replayOnboarding}
            className="w-full p-3.5 flex items-center justify-between text-left hover:bg-stone-50 transition-colors"
          >
            <div className="flex items-center gap-2.5 text-stone-800 font-medium">
              <Sparkles className="w-4 h-4 text-[#2b257d]" />
              <span>App Tour & Features Onboarding</span>
            </div>
            <span className="text-[10px] font-semibold text-[#2b257d] bg-[#2b257d]/10 px-2 py-0.5 rounded-full flex items-center gap-1">
              <span>View Tour</span>
              <ChevronRight className="w-3 h-3" />
            </span>
          </button>

          <button
            onClick={() => setActiveInfoModal('support')}
            className="w-full p-3.5 flex items-center justify-between text-left hover:bg-stone-50 transition-colors"
          >
            <div className="flex items-center gap-2.5 text-stone-800 font-medium">
              <HelpCircle className="w-4 h-4 text-[#997327]" />
              <span>Gran Trade Yard Support & Hours</span>
            </div>
            <ChevronRight className="w-4 h-4 text-stone-400" />
          </button>

          <button
            onClick={() => setActiveInfoModal('privacy')}
            className="w-full p-3.5 flex items-center justify-between text-left hover:bg-stone-50 transition-colors"
          >
            <div className="flex items-center gap-2.5 text-stone-800 font-medium">
              <Shield className="w-4 h-4 text-stone-500" />
              <span>Privacy Policy</span>
            </div>
            <ChevronRight className="w-4 h-4 text-stone-400" />
          </button>

          <button
            onClick={() => setActiveInfoModal('terms')}
            className="w-full p-3.5 flex items-center justify-between text-left hover:bg-stone-50 transition-colors"
          >
            <div className="flex items-center gap-2.5 text-stone-800 font-medium">
              <FileText className="w-4 h-4 text-stone-500" />
              <span>Terms & Wholesale Conditions</span>
            </div>
            <ChevronRight className="w-4 h-4 text-stone-400" />
          </button>
        </div>

        {/* 6. Logout UI */}
        <div className="pt-2">
          <button
            onClick={handleLogout}
            className="w-full py-3 bg-stone-100 hover:bg-rose-50 text-rose-700 font-semibold text-xs rounded-xl border border-stone-200 transition-colors flex items-center justify-center gap-2"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out of Demo Account</span>
          </button>
          <p className="text-[9.5px] text-stone-400 text-center mt-2">
            Gran Trade Inc. Mobile App • Version 1.0 (Demo Prototype)
          </p>
        </div>
      </div>

      {/* Edit Profile Modal */}
      {isEditModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in">
          <div className="w-full max-w-sm bg-white rounded-3xl p-5 shadow-2xl max-h-[85vh] overflow-y-auto border border-stone-200 flex flex-col">
            <div className="flex items-center justify-between pb-3 border-b border-stone-200">
              <h3 className="font-serif font-bold text-base text-stone-900">Edit Profile</h3>
              <button
                onClick={() => setIsEditModalOpen(false)}
                className="p-1 rounded-full text-stone-400 hover:text-stone-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveProfile} className="py-3 space-y-3 text-xs flex-1">
              <div>
                <label className="block text-[11px] font-semibold text-stone-700 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  value={editForm.fullName}
                  onChange={(e) => setEditForm({ ...editForm, fullName: e.target.value })}
                  className="w-full bg-stone-50 text-xs px-3 py-2 rounded-xl border border-stone-200 focus:outline-none focus:border-[#c29d53]"
                  required
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-stone-700 mb-1">
                  Customer Type
                </label>
                <select
                  value={editForm.customerType}
                  onChange={(e) => setEditForm({ ...editForm, customerType: e.target.value as any })}
                  className="w-full bg-stone-50 text-xs px-3 py-2 rounded-xl border border-stone-200 focus:outline-none focus:border-[#c29d53]"
                >
                  <option value="Stone Fabricator">Stone Fabricator</option>
                  <option value="Interior Designer">Interior Designer</option>
                  <option value="Architect">Architect</option>
                  <option value="General Contractor">General Contractor</option>
                  <option value="Homeowner">Homeowner</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-stone-700 mb-1">
                  Company Name
                </label>
                <input
                  type="text"
                  value={editForm.companyName}
                  onChange={(e) => setEditForm({ ...editForm, companyName: e.target.value })}
                  className="w-full bg-stone-50 text-xs px-3 py-2 rounded-xl border border-stone-200 focus:outline-none focus:border-[#c29d53]"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-[11px] font-semibold text-stone-700 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    value={editForm.email}
                    onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                    className="w-full bg-stone-50 text-xs px-3 py-2 rounded-xl border border-stone-200 focus:outline-none focus:border-[#c29d53]"
                    required
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-stone-700 mb-1">
                    Phone
                  </label>
                  <input
                    type="tel"
                    value={editForm.phone}
                    onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
                    className="w-full bg-stone-50 text-xs px-3 py-2 rounded-xl border border-stone-200 focus:outline-none focus:border-[#c29d53]"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-stone-700 mb-1">
                  Street Address
                </label>
                <input
                  type="text"
                  value={editForm.street}
                  onChange={(e) => setEditForm({ ...editForm, street: e.target.value })}
                  className="w-full bg-stone-50 text-xs px-3 py-2 rounded-xl border border-stone-200 focus:outline-none focus:border-[#c29d53]"
                />
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="block text-[11px] font-semibold text-stone-700 mb-1">
                    City
                  </label>
                  <input
                    type="text"
                    value={editForm.city}
                    onChange={(e) => setEditForm({ ...editForm, city: e.target.value })}
                    className="w-full bg-stone-50 text-xs px-3 py-2 rounded-xl border border-stone-200 focus:outline-none focus:border-[#c29d53]"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-stone-700 mb-1">
                    State
                  </label>
                  <input
                    type="text"
                    value={editForm.state}
                    onChange={(e) => setEditForm({ ...editForm, state: e.target.value })}
                    className="w-full bg-stone-50 text-xs px-3 py-2 rounded-xl border border-stone-200 focus:outline-none focus:border-[#c29d53]"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-stone-700 mb-1">
                    ZIP
                  </label>
                  <input
                    type="text"
                    value={editForm.zipCode}
                    onChange={(e) => setEditForm({ ...editForm, zipCode: e.target.value })}
                    className="w-full bg-stone-50 text-xs px-3 py-2 rounded-xl border border-stone-200 focus:outline-none focus:border-[#c29d53]"
                  />
                </div>
              </div>

              <div className="pt-3 border-t border-stone-200 flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setIsEditModalOpen(false)}
                  className="w-1/2 py-2.5 bg-stone-100 text-stone-700 font-semibold rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="w-1/2 py-2.5 bg-[#2b257d] hover:bg-[#201a61] text-[#dfc07c] font-semibold rounded-xl shadow-md transition-colors"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Internal Support / Policy Modals (No external windows or tabs!) */}
      {activeInfoModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in">
          <div className="w-full max-w-sm bg-white rounded-3xl p-5 shadow-2xl max-h-[80vh] overflow-y-auto border border-stone-200 flex flex-col text-xs">
            <div className="flex items-center justify-between pb-3 border-b border-stone-200 mb-3">
              <h3 className="font-serif font-bold text-base text-stone-900">
                {activeInfoModal === 'support' && 'Gran Trade Showroom & Yard'}
                {activeInfoModal === 'privacy' && 'Privacy Policy'}
                {activeInfoModal === 'terms' && 'Wholesale Terms & Conditions'}
              </h3>
              <button
                onClick={() => setActiveInfoModal(null)}
                className="p-1 rounded-full text-stone-400 hover:text-stone-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 space-y-3 text-stone-600 leading-relaxed">
              {activeInfoModal === 'support' && (
                <>
                  <p>
                    Gran Trade Inc. is a premier wholesale distributor of natural and engineered
                    stone slabs serving fabricators, architects, designers, and homeowners.
                  </p>
                  <div className="p-3 bg-stone-50 rounded-xl space-y-1.5 border border-stone-200">
                    <div className="font-bold text-stone-900">Warehouse & Slab Yard:</div>
                    <div>178 Commerce Road, Carlstadt, NJ 07072</div>
                    <div className="mt-1 font-semibold text-stone-800">Phone Lines:</div>
                    <div>(201) 438-1888 • (201) 438-9339</div>
                    <div className="mt-1 font-semibold text-stone-800">Direct Email:</div>
                    <div className="font-mono text-stone-700">sales.grantrade@gmail.com</div>
                    <div className="mt-1 font-semibold text-stone-800">Yard Hours:</div>
                    <div>Mon – Fri: 8:00 AM – 5:00 PM EST</div>
                    <div>Sat: 9:00 AM – 1:00 PM EST</div>
                  </div>
                  <p className="text-[11px] text-stone-500">
                    Visitors are welcome to walk our indoor slab yard to inspect consecutive
                    bundles under overhead staging lights.
                  </p>
                </>
              )}

              {activeInfoModal === 'privacy' && (
                <>
                  <p>
                    <strong>Gran Trade Inc. Privacy Statement (Demo Prototype):</strong>
                  </p>
                  <p>
                    This application is a frontend shopping prototype designed for stone selection,
                    wishlist management, and ordering simulations.
                  </p>
                  <p>
                    We do NOT collect, harvest, or transmit your credit card numbers, confidential
                    banking details, or personal identifying data to external third-party servers.
                    All customer profile and order data are held locally in your browser session.
                  </p>
                </>
              )}

              {activeInfoModal === 'terms' && (
                <>
                  <p>
                    <strong>Gran Trade Wholesale Distribution Terms:</strong>
                  </p>
                  <p>
                    1. <strong>Material Characteristics:</strong> Natural stones including Quartzite,
                    Marble, Granite, and Soapstone feature organic variations in veining, fissure
                    lines, and color tones. Inspection of actual quarry lot slabs prior to cutting is
                    encouraged.
                  </p>
                  <p>
                    2. <strong>Supply Only:</strong> Gran Trade Inc. strictly operates as a stone
                    distributor and wholesaler. We do not provide fabrication, templating, or
                    residential installation services.
                  </p>
                  <p>
                    3. <strong>Demo Pricing:</strong> All prices displayed in this application are
                    for demonstration purposes. Actual commercial wholesale pricing is determined by
                    bundle volume and quarry yield.
                  </p>
                </>
              )}
            </div>

            <div className="pt-3 border-t border-stone-200 mt-4">
              <button
                onClick={() => setActiveInfoModal(null)}
                className="w-full py-2 bg-[#2b257d] hover:bg-[#201a61] text-[#dfc07c] font-semibold rounded-xl text-xs transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
