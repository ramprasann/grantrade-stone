import { AppNotification } from '@/types'

export const INITIAL_NOTIFICATIONS: AppNotification[] = [
  {
    id: 'notif-001',
    title: 'New Taj Mahal Quartzite Slabs Arrived',
    message: 'New shipment of Lot TM-904 (18 slabs, 3cm Polished, Brazil) received at Carlstadt, NJ yard. Available for fabricator hold.',
    category: 'arrival',
    timestamp: '25m ago',
    isRead: false,
    link: '/product/gt-001',
    actionLabel: 'View Slab Details',
  },
  {
    id: 'notif-002',
    title: 'Hold Reservation Confirmed',
    message: 'Your 48-hour fabricator hold for Lot CG-102 (Calacatta Gold Extra, Italy) is confirmed under Vance Design & Stone Works.',
    category: 'quote',
    timestamp: '2 hours ago',
    isRead: false,
    link: '/saved',
    actionLabel: 'View Saved Holds',
  },
  {
    id: 'notif-003',
    title: 'Order GT-ORD-2026-8941 Dispatched',
    message: 'Your A-frame flatbed delivery of 4 slabs Bianco Carrara Marble is en route from Carlstadt warehouse.',
    category: 'order',
    timestamp: 'Yesterday',
    isRead: true,
    link: '/orders',
    actionLabel: 'Track Shipment',
  },
  {
    id: 'notif-004',
    title: 'Spring 2026 Direct Quarry Shipments',
    message: 'New containers of Brazilian Soapstone and Italian Arabescato Corchia scheduled to dock next week.',
    category: 'announcement',
    timestamp: '3 days ago',
    isRead: true,
    link: '/explore',
    actionLabel: 'Explore Catalog',
  },
]
