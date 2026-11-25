import React, { createContext, useContext, useState, useEffect } from 'react'
import { Order, OrderStatus } from '@/types'
import { INITIAL_MOCK_ORDERS } from '@/data/mockOrders'

interface OrderContextType {
  orders: Order[]
  createOrder: (order: Order) => void
  cancelOrder: (orderId: string) => void
  getOrderById: (orderId: string) => Order | undefined
}

const OrderContext = createContext<OrderContextType | undefined>(undefined)

const ORDERS_STORAGE_KEY = 'grantrade_orders_v1'

export const OrderProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const stored = localStorage.getItem(ORDERS_STORAGE_KEY)
      return stored ? JSON.parse(stored) : INITIAL_MOCK_ORDERS
    } catch {
      return INITIAL_MOCK_ORDERS
    }
  })

  useEffect(() => {
    try {
      localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(orders))
    } catch (e) {
      console.error(e)
    }
  }, [orders])

  const createOrder = (order: Order) => {
    setOrders((prev) => [order, ...prev])
  }

  const cancelOrder = (orderId: string) => {
    setOrders((prev) =>
      prev.map((order) => {
        if (order.id === orderId) {
          const updatedTimeline = [
            ...order.timeline,
            {
              status: 'Cancelled' as OrderStatus,
              timestamp: new Date().toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
              }),
              description: 'Customer requested cancellation of this demo order.',
            },
          ]
          return {
            ...order,
            status: 'Cancelled',
            timeline: updatedTimeline,
          }
        }
        return order
      })
    )
  }

  const getOrderById = (orderId: string) => {
    return orders.find((o) => o.id === orderId)
  }

  return (
    <OrderContext.Provider value={{ orders, createOrder, cancelOrder, getOrderById }}>
      {children}
    </OrderContext.Provider>
  )
}

export const useOrders = () => {
  const context = useContext(OrderContext)
  if (!context) {
    throw new Error('useOrders must be used within an OrderProvider')
  }
  return context
}
