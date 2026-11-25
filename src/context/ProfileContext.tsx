import React, { createContext, useContext, useState, useEffect } from 'react'
import { CustomerProfile } from '@/types'
import { INITIAL_CUSTOMER_PROFILE } from '@/data/mockProfile'

interface ProfileContextType {
  profile: CustomerProfile
  updateProfile: (updated: Partial<CustomerProfile>) => void
}

const ProfileContext = createContext<ProfileContextType | undefined>(undefined)

const PROFILE_STORAGE_KEY = 'grantrade_profile_v1'

export const ProfileProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [profile, setProfile] = useState<CustomerProfile>(() => {
    try {
      const stored = localStorage.getItem(PROFILE_STORAGE_KEY)
      return stored ? JSON.parse(stored) : INITIAL_CUSTOMER_PROFILE
    } catch {
      return INITIAL_CUSTOMER_PROFILE
    }
  })

  useEffect(() => {
    try {
      localStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify(profile))
    } catch (e) {
      console.error(e)
    }
  }, [profile])

  const updateProfile = (updated: Partial<CustomerProfile>) => {
    setProfile((prev) => ({
      ...prev,
      ...updated,
      address: {
        ...prev.address,
        ...(updated.address || {}),
      },
      notificationPreferences: {
        ...prev.notificationPreferences,
        ...(updated.notificationPreferences || {}),
      },
    }))
  }

  return (
    <ProfileContext.Provider value={{ profile, updateProfile }}>
      {children}
    </ProfileContext.Provider>
  )
}

export const useProfile = () => {
  const context = useContext(ProfileContext)
  if (!context) {
    throw new Error('useProfile must be used within a ProfileProvider')
  }
  return context
}
