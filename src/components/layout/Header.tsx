import React from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { ShoppingBag, Scale, ArrowLeft, Bell } from 'lucide-react'
import { useCart } from '@/context/CartContext'
import { useWishlist } from '@/context/WishlistContext'
import { useNotification } from '@/context/NotificationContext'

interface HeaderProps {
  title?: string
  showBack?: boolean
  onBack?: () => void
}

export const Header: React.FC<HeaderProps> = ({ title, showBack, onBack }) => {
  const navigate = useNavigate()
  const location = useLocation()
  const { totalCount } = useCart()
  const { comparedProducts } = useWishlist()
  const { unreadCount } = useNotification()

  const handleBack = () => {
    if (onBack) {
      onBack()
    } else {
      navigate(-1)
    }
  }

  const isCartPage = location.pathname === '/cart'
  const isNotificationsPage = location.pathname === '/notifications'

  return (
    <>
      {/* Main Sticky App Header with Rich Indigo/Blue Palette */}
      <header className="w-full shrink-0 z-40 bg-gradient-to-r from-[#383284] via-[#312a80] to-[#29227b] text-white px-3.5 py-2.5 flex items-center justify-between border-b border-[#403896]/60 shadow-md select-none">
        {/* Left: Back button or Gran Trade Brand Wordmark */}
        <div className="flex items-center gap-2">
          {showBack ? (
            <button
              onClick={handleBack}
              className="p-1.5 -ml-1 rounded-full text-stone-200 hover:text-white hover:bg-white/15 active:scale-95 transition-all"
              aria-label="Go back"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
          ) : (
            <div
              onClick={() => navigate('/')}
              className="cursor-pointer flex items-center gap-2.5 group"
            >
              {/* Logo without yellow circle border */}
              <img
                src="/logo.png"
                alt="Gran Trade Inc."
                className="w-8 h-8 object-contain shrink-0 group-hover:scale-105 transition-transform"
              />
              <div className="flex flex-col">
                <span className="font-serif tracking-wider font-bold text-sm text-white leading-none group-hover:text-[#dfc07c] transition-colors">
                  GRAN TRADE
                </span>
                <span className="text-[9px] text-[#dfc07c] tracking-widest uppercase font-medium mt-0.5">
                  Natural Stone
                </span>
              </div>
            </div>
          )}

          {title && showBack && (
            <h1 className="font-semibold text-sm text-stone-100 truncate ml-1">{title}</h1>
          )}
        </div>

        {/* Right: Compare shortcut & Shopping Cart Button with live counter */}
        <div className="flex items-center gap-1.5">
          {/* Quick Comparison Drawer Shortcut if items are in compare */}
          {comparedProducts.length > 0 && (
            <button
              onClick={() => navigate('/compare')}
              className="relative p-2 rounded-full text-stone-200 hover:text-white hover:bg-white/15 active:scale-95 transition-all"
              title="View Product Comparison"
              aria-label="Comparison"
            >
              <Scale className="w-4.5 h-4.5 text-[#dfc07c]" />
              <span className="absolute -top-0.5 -right-0.5 bg-[#dfc07c] text-black text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center border border-stone-900 shadow-sm">
                {comparedProducts.length}
              </span>
            </button>
          )}

          {/* Cart Icon Button - Always in TOP HEADER */}
          <button
            onClick={() => navigate('/cart')}
            className={`relative p-2 rounded-full active:scale-95 transition-colors ${
              isCartPage
                ? 'bg-[#dfc07c] text-black'
                : 'text-stone-200 hover:text-white hover:bg-white/15'
            }`}
            aria-label="Shopping Cart"
            title="Open Shopping Cart"
          >
            <ShoppingBag className="w-5 h-5" />
            {totalCount > 0 && (
              <span
                className={`absolute -top-0.5 -right-0.5 text-[10px] font-bold min-w-4.5 h-4.5 px-1 rounded-full flex items-center justify-center shadow-md ${
                  isCartPage
                    ? 'bg-black text-[#dfc07c] border border-white/20'
                    : 'bg-[#dfc07c] text-black border border-stone-900'
                }`}
              >
                {totalCount}
              </span>
            )}
          </button>

          {/* Notification Bell Button - Beside Cart */}
          <button
            onClick={() => navigate('/notifications')}
            className={`relative p-2 rounded-full active:scale-95 transition-colors ${
              isNotificationsPage
                ? 'bg-[#dfc07c] text-black'
                : 'text-stone-200 hover:text-white hover:bg-white/15'
            }`}
            aria-label="Notifications"
            title="Notifications & Yard Alerts"
          >
            <Bell className="w-5 h-5" />
            {unreadCount > 0 && (
              <span
                className={`absolute -top-0.5 -right-0.5 text-[10px] font-bold min-w-4.5 h-4.5 px-1 rounded-full flex items-center justify-center shadow-md ${
                  isNotificationsPage
                    ? 'bg-black text-[#dfc07c] border border-white/20'
                    : 'bg-[#dfc07c] text-black border border-stone-900'
                }`}
              >
                {unreadCount}
              </span>
            )}
          </button>
        </div>
      </header>
    </>
  )
}
