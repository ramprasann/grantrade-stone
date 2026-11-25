import { Order } from '@/types'
import { MOCK_PRODUCTS } from './mockProducts'

export const INITIAL_MOCK_ORDERS: Order[] = [
  {
    id: 'GT-ORD-2026-8941',
    date: '2026-11-20',
    items: [
      {
        cartItemId: 'item-8941-1',
        product: MOCK_PRODUCTS[0], // Taj Mahal Quartzite
        quantity: 2,
        selectedFinish: 'Polished Mirror',
        selectedThickness: '3 cm (1-1/4")',
        unitType: 'slab',
      },
      {
        cartItemId: 'item-8941-2',
        product: MOCK_PRODUCTS[6], // Calacatta Mist Quartz
        quantity: 1,
        selectedFinish: 'Polished High Gloss',
        selectedThickness: '3 cm (1-1/4")',
        unitType: 'slab',
      },
    ],
    subtotal: 15226,
    shippingEstimate: 450,
    taxEstimate: 1008,
    total: 16684,
    status: 'Confirmed',
    shippingAddress: {
      fullName: 'Marcus Vance',
      companyName: 'Vance Design & Stone Works',
      email: 'm.vance@vancedesign.com',
      phone: '(201) 555-0198',
      address: '450 Industrial Parkway, Suite 4',
      city: 'Hackensack',
      state: 'NJ',
      zipCode: '07601',
      country: 'United States',
      deliveryNotes: 'Boom truck required for slab unloading at rear bay.',
    },
    paymentMethod: 'Commercial Wholesale Terms (Net 30 - Demo)',
    timeline: [
      {
        status: 'Order Placed',
        timestamp: '2026-11-20 09:14 AM',
        description: 'Demo slab purchase request received and logged in system.',
      },
      {
        status: 'Confirmed',
        timestamp: '2026-11-20 11:30 AM',
        description: 'Slab bundles reserved at Carlstadt Yard, A-Frame #14 inspected.',
      },
    ],
  },
  {
    id: 'GT-ORD-2026-7810',
    date: '2026-10-15',
    items: [
      {
        cartItemId: 'item-7810-1',
        product: MOCK_PRODUCTS[8], // Absolute Black Granite
        quantity: 4,
        selectedFinish: 'Leathered Satin',
        selectedThickness: '3 cm (1-1/4")',
        unitType: 'slab',
      },
    ],
    subtotal: 13516,
    shippingEstimate: 600,
    taxEstimate: 890,
    total: 15006,
    status: 'Delivered',
    shippingAddress: {
      fullName: 'Marcus Vance',
      companyName: 'Vance Design & Stone Works',
      email: 'm.vance@vancedesign.com',
      phone: '(201) 555-0198',
      address: '450 Industrial Parkway, Suite 4',
      city: 'Hackensack',
      state: 'NJ',
      zipCode: '07601',
      country: 'United States',
      deliveryNotes: 'Delivered to Carlstadt fabrication yard.',
    },
    paymentMethod: 'Wire Transfer / ACH (Demo)',
    timeline: [
      {
        status: 'Order Placed',
        timestamp: '2026-10-15 08:30 AM',
        description: 'Order registered.',
      },
      {
        status: 'Confirmed',
        timestamp: '2026-10-15 10:00 AM',
        description: 'Yard slab verification completed.',
      },
      {
        status: 'Shipped',
        timestamp: '2026-10-16 07:45 AM',
        description: 'Dispatched via dedicated A-Frame Flatbed transport.',
      },
      {
        status: 'Delivered',
        timestamp: '2026-10-16 02:15 PM',
        description: 'Safely unloaded at customer facility.',
      },
    ],
  },
]
