import React, { createContext, useContext, useState } from 'react'

interface OnboardingContextType {
  showSplash: boolean
  showOnboarding: boolean
  completeSplash: () => void
  startOnboarding: () => void
  completeOnboarding: () => void
  replayOnboarding: () => void
}

const OnboardingContext = createContext<OnboardingContextType | undefined>(undefined)

const ONBOARDING_KEY = 'grantrade_onboarded_v1'
const SPLASH_SEEN_KEY = 'grantrade_splash_seen_v1'

export const OnboardingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Splash screen displays on session start for 2.4 seconds
  const [showSplash, setShowSplash] = useState<boolean>(() => {
    try {
      return !sessionStorage.getItem(SPLASH_SEEN_KEY)
    } catch {
      return true
    }
  })

  // Onboarding displays automatically if user has never seen it, or when requested
  const [showOnboarding, setShowOnboarding] = useState<boolean>(false)

  const completeSplash = () => {
    setShowSplash(false)
    try {
      sessionStorage.setItem(SPLASH_SEEN_KEY, 'true')
    } catch (e) {
      console.error(e)
    }

    // Check if onboarding was completed before
    try {
      const hasOnboarded = localStorage.getItem(ONBOARDING_KEY)
      if (!hasOnboarded) {
        setShowOnboarding(true)
      }
    } catch {
      // ignore
    }
  }

  const startOnboarding = () => {
    setShowOnboarding(true)
  }

  const completeOnboarding = () => {
    setShowOnboarding(false)
    try {
      localStorage.setItem(ONBOARDING_KEY, 'true')
    } catch (e) {
      console.error(e)
    }
  }

  const replayOnboarding = () => {
    setShowOnboarding(true)
  }

  return (
    <OnboardingContext.Provider
      value={{
        showSplash,
        showOnboarding,
        completeSplash,
        startOnboarding,
        completeOnboarding,
        replayOnboarding,
      }}
    >
      {children}
    </OnboardingContext.Provider>
  )
}

export const useOnboarding = () => {
  const context = useContext(OnboardingContext)
  if (!context) {
    throw new Error('useOnboarding must be used within an OnboardingProvider')
  }
  return context
}
