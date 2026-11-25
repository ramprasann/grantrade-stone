import React from 'react'
import { useLocation } from 'react-router-dom'
import { Header } from './Header'
import { BottomNavigation } from './BottomNavigation'
import { DeviceWrapper } from './DeviceWrapper'
import { SplashScreen } from '@/components/common/SplashScreen'
import { OnboardingModal } from '@/components/common/OnboardingModal'
import { useOnboarding } from '@/context/OnboardingContext'

interface AppLayoutProps {
  children: React.ReactNode
}

export const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  const location = useLocation()
  const { showSplash, showOnboarding, completeSplash, completeOnboarding } = useOnboarding()

  // Detail / focused pages handle their own header
  const isDetailsPage = location.pathname.startsWith('/product/')
  const isOrderDetailsPage = location.pathname.startsWith('/order/')
  const isCheckoutPage = location.pathname === '/checkout'
  const isOrderSuccessPage = location.pathname.startsWith('/order-success')
  const isComparePage = location.pathname === '/compare'
  const isCartPage = location.pathname === '/cart'
  const isNotificationsPage = location.pathname === '/notifications'

  const showMainHeader =
    !isDetailsPage &&
    !isOrderDetailsPage &&
    !isComparePage &&
    !isCheckoutPage &&
    !isCartPage &&
    !isNotificationsPage

  // Pinned Bottom nav is hidden on checkout, order success, cart, and product details so their action bars don't conflict
  const hideBottomNav = isCheckoutPage || isOrderSuccessPage || isCartPage || isDetailsPage

  return (
    <DeviceWrapper>
      <div className="w-full h-full flex-1 flex flex-col relative bg-[#faf9f6] overflow-hidden text-stone-900 antialiased selection:bg-[#383284]/30">
        {/* Sticky Top App Header with Gran Trade Wordmark & Live Cart Counter */}
        {showMainHeader && <Header />}

        {/* Scrollable Mobile Content Canvas */}
        <main
          className={`flex-1 min-h-0 flex flex-col relative w-full bg-[#faf9f6] ${
            isCartPage || isDetailsPage ? 'overflow-hidden' : 'overflow-y-auto no-scrollbar'
          }`}
        >
          {children}
        </main>

        {/* Pinned Mobile Bottom Navigation Bar */}
        {!hideBottomNav && <BottomNavigation />}

        {/* Brand Splash Screen on Initial App Load */}
        {showSplash && <SplashScreen onFinish={completeSplash} />}

        {/* 3-Step Interactive Mobile Onboarding Tour */}
        {showOnboarding && (
          <OnboardingModal onComplete={completeOnboarding} onSkip={completeOnboarding} />
        )}
      </div>
    </DeviceWrapper>
  )
}
