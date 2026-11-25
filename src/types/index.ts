export type StoneCategory =
  | 'Quartzite'
  | 'Quartz'
  | 'Marble'
  | 'Granite'
  | 'Soapstone'
  | 'Semi-Precious'
  | 'Monuments'
  | 'Tiles'

export interface StoneProduct {
  id: string
  name: string
  category: StoneCategory
  gtReference: string
  lotNumber: string
  color: string
  colorGroup: 'White' | 'Beige' | 'Grey' | 'Black' | 'Green' | 'Blue' | 'Brown'
  origin: string
  thickness: string
  finish: string
  dimensions: string
  approxSqFt: number
  bundleInfo: string
  availableSlabsCount: number
  demoPricePerSqFt: number
  demoSlabPrice: number
  images: string[]
  featured?: boolean
  newArrival?: boolean
  popular?: boolean
  description: string
  applications: string[]
  specifications: {
    hardness: string
    waterAbsorption: string
    density: string
    patternType: string
    bookmatchReady: boolean
  }
}

export interface CartItem {
  cartItemId: string
  product: StoneProduct
  quantity: number
  selectedFinish: string
  selectedThickness: string
  unitType: 'slab' | 'bundle'
}

export interface WishlistItem {
  productId: string
  product: StoneProduct
  addedAt: string
  projectName?: string
}

export type OrderStatus =
  | 'Order Placed'
  | 'Processing'
  | 'Confirmed'
  | 'Shipped'
  | 'Delivered'
  | 'Cancelled'

export interface OrderShippingAddress {
  fullName: string
  email: string
  phone: string
  address: string
  city: string
  state: string
  zipCode: string
  country: string
  companyName?: string
  deliveryNotes?: string
}

export interface Order {
  id: string
  date: string
  items: CartItem[]
  subtotal: number
  shippingEstimate: number
  taxEstimate: number
  total: number
  status: OrderStatus
  shippingAddress: OrderShippingAddress
  paymentMethod: string
  timeline: {
    status: OrderStatus
    timestamp: string
    description: string
  }[]
}

export interface CustomerProfile {
  fullName: string
  email: string
  phone: string
  customerType: 'Stone Fabricator' | 'Interior Designer' | 'Architect' | 'General Contractor' | 'Homeowner'
  companyName: string
  address: {
    street: string
    city: string
    state: string
    zipCode: string
    country: string
  }
  notificationPreferences: {
    newArrivals: boolean
    orderStatusUpdates: boolean
    exclusiveOffers: boolean
  }
}

export interface AppNotification {
  id: string
  title: string
  message: string
  category: 'arrival' | 'order' | 'quote' | 'announcement'
  timestamp: string
  isRead: boolean
  link?: string
  actionLabel?: string
}

