import React, { createContext, useContext, useState, useEffect } from 'react'
import { CartItem, StoneProduct } from '@/types'

interface CartContextType {
  cartItems: CartItem[]
  addToCart: (
    product: StoneProduct,
    quantity?: number,
    finish?: string,
    thickness?: string,
    unitType?: 'slab' | 'bundle'
  ) => void
  removeFromCart: (cartItemId: string) => void
  updateQuantity: (cartItemId: string, quantity: number) => void
  clearCart: () => void
  totalCount: number
  subtotal: number
  shippingEstimate: number
  taxEstimate: number
  grandTotal: number
  lastAddedNotification: string | null
  clearNotification: () => void
}

const CartContext = createContext<CartContextType | undefined>(undefined)

const CART_STORAGE_KEY = 'grantrade_cart_items_v1'

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const stored = localStorage.getItem(CART_STORAGE_KEY)
      return stored ? JSON.parse(stored) : []
    } catch {
      return []
    }
  })

  const [lastAddedNotification, setLastAddedNotification] = useState<string | null>(null)

  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems))
    } catch (e) {
      console.error('Error saving cart state:', e)
    }
  }, [cartItems])

  const addToCart = (
    product: StoneProduct,
    quantity = 1,
    finish?: string,
    thickness?: string,
    unitType: 'slab' | 'bundle' = 'slab'
  ) => {
    const selectedFinish = finish || product.finish
    const selectedThickness = thickness || product.thickness

    setCartItems((prev) => {
      const existingIndex = prev.findIndex(
        (item) =>
          item.product.id === product.id &&
          item.selectedFinish === selectedFinish &&
          item.selectedThickness === selectedThickness &&
          item.unitType === unitType
      )

      if (existingIndex > -1) {
        const next = [...prev]
        next[existingIndex].quantity += quantity
        return next
      } else {
        const newItem: CartItem = {
          cartItemId: `item-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
          product,
          quantity,
          selectedFinish,
          selectedThickness,
          unitType,
        }
        return [...prev, newItem]
      }
    })

    setLastAddedNotification(`Added ${product.name} to Cart`)
    setTimeout(() => {
      setLastAddedNotification((curr) => (curr ? null : curr))
    }, 3200)
  }

  const removeFromCart = (cartItemId: string) => {
    setCartItems((prev) => prev.filter((item) => item.cartItemId !== cartItemId))
  }

  const updateQuantity = (cartItemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(cartItemId)
      return
    }
    setCartItems((prev) =>
      prev.map((item) => (item.cartItemId === cartItemId ? { ...item, quantity } : item))
    )
  }

  const clearCart = () => {
    setCartItems([])
  }

  const clearNotification = () => {
    setLastAddedNotification(null)
  }

  const totalCount = cartItems.reduce((sum, item) => sum + item.quantity, 0)

  const subtotal = cartItems.reduce((sum, item) => {
    const unitPrice = item.product.demoSlabPrice
    const multiplier = item.unitType === 'bundle' ? 5 : 1
    return sum + unitPrice * multiplier * item.quantity
  }, 0)

  // Demo freight calculation for heavy stone distribution (e.g. flatbed A-frame delivery)
  const shippingEstimate = subtotal > 0 ? (subtotal > 8000 ? 350 : 250) : 0
  const taxEstimate = Math.round(subtotal * 0.06625) // NJ sales tax ~6.625%
  const grandTotal = subtotal + shippingEstimate + taxEstimate

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalCount,
        subtotal,
        shippingEstimate,
        taxEstimate,
        grandTotal,
        lastAddedNotification,
        clearNotification,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}
