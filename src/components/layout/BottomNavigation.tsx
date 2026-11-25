import React from 'react'
import { NavLink } from 'react-router-dom'
import { Home, Compass, Heart, Package, User } from 'lucide-react'
import { useWishlist } from '@/context/WishlistContext'

interface NavTab {
  name: string
  to: string
  icon: React.ElementType
  badgeCount?: number
}

export const BottomNavigation: React.FC = () => {
  const { savedItems } = useWishlist()

  const tabs: NavTab[] = [
    { name: 'Home', to: '/', icon: Home },
    { name: 'Explore', to: '/explore', icon: Compass },
    { name: 'Saved', to: '/saved', icon: Heart, badgeCount: savedItems.length },
    { name: 'Orders', to: '/orders', icon: Package },
    { name: 'Profile', to: '/profile', icon: User },
  ]

  return (
    <div className="w-full px-3.5 pt-1 z-40 select-none shrink-0 bg-transparent pb-[max(0.625rem,env(safe-area-inset-bottom))] sm:pb-2.5">
      <nav
        aria-label="Mobile Navigation"
        className="w-full max-w-md mx-auto bg-white/95 backdrop-blur-xl rounded-[26px] border border-stone-200/90 shadow-[0_8px_30px_rgba(0,0,0,0.12),0_2px_8px_rgba(0,0,0,0.06)] px-2 py-1.5 pointer-events-auto"
      >
        <div className="grid grid-cols-5 items-center">
          {tabs.map((tab) => {
            const Icon = tab.icon
            return (
              <NavLink
                key={tab.name}
                to={tab.to}
                end={tab.to === '/'}
                className={({ isActive }) =>
                  `flex flex-col items-center justify-center py-0.5 rounded-2xl transition-all duration-200 group active:scale-95 ${
                    isActive ? 'text-stone-900' : 'text-stone-400 hover:text-stone-600'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <div
                      className={`relative px-3.5 py-1 rounded-full flex items-center justify-center transition-all duration-200 ${
                        isActive
                          ? 'bg-[#2b257d] text-[#dfc07c] shadow-xs'
                          : 'text-stone-400 group-hover:text-stone-700'
                      }`}
                    >
                      <Icon
                        className={`w-4.5 h-4.5 transition-transform duration-200 ${
                          isActive ? 'scale-105 stroke-[2.3]' : 'stroke-[1.8]'
                        }`}
                      />
                      {tab.badgeCount !== undefined && tab.badgeCount > 0 && (
                        <span className="absolute -top-1 -right-1 bg-[#dfc07c] text-stone-900 text-[9px] font-bold min-w-3.5 h-3.5 px-0.5 rounded-full flex items-center justify-center shadow-xs">
                          {tab.badgeCount}
                        </span>
                      )}
                    </div>
                    <span
                      className={`text-[10px] tracking-tight mt-0.5 transition-colors ${
                        isActive ? 'font-bold text-[#2b257d]' : 'font-medium text-stone-500'
                      }`}
                    >
                      {tab.name}
                    </span>
                  </>
                )}
              </NavLink>
            )
          })}
        </div>
      </nav>
    </div>
  )
}
