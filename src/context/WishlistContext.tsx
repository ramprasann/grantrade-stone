import React, { createContext, useContext, useState, useEffect } from 'react'
import { StoneProduct, WishlistItem } from '@/types'

interface WishlistContextType {
  savedItems: WishlistItem[]
  projectLists: string[]
  isSaved: (productId: string) => boolean
  toggleSaved: (product: StoneProduct, projectName?: string) => void
  removeFromSaved: (productId: string) => void
  moveToProject: (productId: string, projectName?: string) => void
  addProjectList: (name: string) => void
  comparedProducts: StoneProduct[]
  addToCompare: (product: StoneProduct) => { success: boolean; message: string }
  removeFromCompare: (productId: string) => void
  clearCompare: () => void
  isCompared: (productId: string) => boolean
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined)

const WISHLIST_STORAGE_KEY = 'grantrade_wishlist_v1'
const PROJECTS_STORAGE_KEY = 'grantrade_projects_v1'
const COMPARE_STORAGE_KEY = 'grantrade_compare_v1'

const DEFAULT_PROJECTS = ['Kitchen Renovation', 'Master Bathroom', 'Fireplace Wall', 'Commercial Lobby']

export const WishlistProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [savedItems, setSavedItems] = useState<WishlistItem[]>(() => {
    try {
      const stored = localStorage.getItem(WISHLIST_STORAGE_KEY)
      return stored ? JSON.parse(stored) : []
    } catch {
      return []
    }
  })

  const [projectLists, setProjectLists] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem(PROJECTS_STORAGE_KEY)
      return stored ? JSON.parse(stored) : DEFAULT_PROJECTS
    } catch {
      return DEFAULT_PROJECTS
    }
  })

  const [comparedProducts, setComparedProducts] = useState<StoneProduct[]>(() => {
    try {
      const stored = localStorage.getItem(COMPARE_STORAGE_KEY)
      return stored ? JSON.parse(stored) : []
    } catch {
      return []
    }
  })

  useEffect(() => {
    try {
      localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(savedItems))
    } catch (e) {
      console.error(e)
    }
  }, [savedItems])

  useEffect(() => {
    try {
      localStorage.setItem(PROJECTS_STORAGE_KEY, JSON.stringify(projectLists))
    } catch (e) {
      console.error(e)
    }
  }, [projectLists])

  useEffect(() => {
    try {
      localStorage.setItem(COMPARE_STORAGE_KEY, JSON.stringify(comparedProducts))
    } catch (e) {
      console.error(e)
    }
  }, [comparedProducts])

  const isSaved = (productId: string) => {
    return savedItems.some((item) => item.productId === productId)
  }

  const toggleSaved = (product: StoneProduct, projectName?: string) => {
    setSavedItems((prev) => {
      const exists = prev.some((item) => item.productId === product.id)
      if (exists) {
        return prev.filter((item) => item.productId !== product.id)
      } else {
        return [
          ...prev,
          {
            productId: product.id,
            product,
            addedAt: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
            projectName: projectName || 'General Wishlist',
          },
        ]
      }
    })
  }

  const removeFromSaved = (productId: string) => {
    setSavedItems((prev) => prev.filter((item) => item.productId !== productId))
  }

  const moveToProject = (productId: string, projectName?: string) => {
    setSavedItems((prev) =>
      prev.map((item) =>
        item.productId === productId ? { ...item, projectName: projectName || 'General Wishlist' } : item
      )
    )
  }

  const addProjectList = (name: string) => {
    const trimmed = name.trim()
    if (trimmed && !projectLists.includes(trimmed)) {
      setProjectLists((prev) => [...prev, trimmed])
    }
  }

  const isCompared = (productId: string) => {
    return comparedProducts.some((p) => p.id === productId)
  }

  const addToCompare = (product: StoneProduct): { success: boolean; message: string } => {
    if (comparedProducts.some((p) => p.id === product.id)) {
      return { success: false, message: `${product.name} is already in comparison` }
    }
    if (comparedProducts.length >= 3) {
      return { success: false, message: 'You can compare up to 3 slabs simultaneously' }
    }
    setComparedProducts((prev) => [...prev, product])
    return { success: true, message: `Added ${product.name} to compare` }
  }

  const removeFromCompare = (productId: string) => {
    setComparedProducts((prev) => prev.filter((p) => p.id !== productId))
  }

  const clearCompare = () => {
    setComparedProducts([])
  }

  return (
    <WishlistContext.Provider
      value={{
        savedItems,
        projectLists,
        isSaved,
        toggleSaved,
        removeFromSaved,
        moveToProject,
        addProjectList,
        comparedProducts,
        addToCompare,
        removeFromCompare,
        clearCompare,
        isCompared,
      }}
    >
      {children}
    </WishlistContext.Provider>
  )
}

export const useWishlist = () => {
  const context = useContext(WishlistContext)
  if (!context) {
    throw new Error('useWishlist must be used within a WishlistProvider')
  }
  return context
}
