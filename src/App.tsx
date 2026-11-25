import React, { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import { CartProvider } from '@/context/CartContext'
import { WishlistProvider } from '@/context/WishlistContext'
import { OrderProvider } from '@/context/OrderContext'
import { ProfileProvider } from '@/context/ProfileContext'
import { NotificationProvider } from '@/context/NotificationContext'
import { OnboardingProvider } from '@/context/OnboardingContext'
import { AppLayout } from '@/components/layout/AppLayout'

// Pages
import { Home } from '@/pages/Home'
import { Explore } from '@/pages/Explore'
import { ProductDetails } from '@/pages/ProductDetails'
import { Saved } from '@/pages/Saved'
import { Compare } from '@/pages/Compare'
import { Cart } from '@/pages/Cart'
import { Checkout } from '@/pages/Checkout'
import { OrderSuccess } from '@/pages/OrderSuccess'
import { Orders } from '@/pages/Orders'
import { OrderDetails } from '@/pages/OrderDetails'
import { Profile } from '@/pages/Profile'
import { Notifications } from '@/pages/Notifications'

// Helper component to scroll to top on navigation
const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return null
}

export default function App() {
  return (
    <Router>
      <OnboardingProvider>
        <NotificationProvider>
          <ProfileProvider>
            <WishlistProvider>
              <CartProvider>
                <OrderProvider>
                  <ScrollToTop />
                  <AppLayout>
                    <Routes>
                      <Route path="/" element={<Home />} />
                      <Route path="/explore" element={<Explore />} />
                      <Route path="/product/:id" element={<ProductDetails />} />
                      <Route path="/saved" element={<Saved />} />
                      <Route path="/compare" element={<Compare />} />
                      <Route path="/cart" element={<Cart />} />
                      <Route path="/checkout" element={<Checkout />} />
                      <Route path="/order-success/:orderId" element={<OrderSuccess />} />
                      <Route path="/orders" element={<Orders />} />
                      <Route path="/order/:orderId" element={<OrderDetails />} />
                      <Route path="/profile" element={<Profile />} />
                      <Route path="/notifications" element={<Notifications />} />
                      <Route path="*" element={<Home />} />
                    </Routes>
                  </AppLayout>
                </OrderProvider>
              </CartProvider>
            </WishlistProvider>
          </ProfileProvider>
        </NotificationProvider>
      </OnboardingProvider>
    </Router>
  )
}
