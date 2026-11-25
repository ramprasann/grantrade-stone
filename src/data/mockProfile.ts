import { CustomerProfile } from '@/types'

export const INITIAL_CUSTOMER_PROFILE: CustomerProfile = {
  fullName: 'Marcus Vance',
  email: 'm.vance@vancedesign.com',
  phone: '(201) 555-0198',
  customerType: 'Stone Fabricator',
  companyName: 'Vance Design & Stone Works LLC',
  address: {
    street: '450 Industrial Parkway, Suite 4',
    city: 'Hackensack',
    state: 'NJ',
    zipCode: '07601',
    country: 'United States',
  },
  notificationPreferences: {
    newArrivals: true,
    orderStatusUpdates: true,
    exclusiveOffers: false,
  },
}
