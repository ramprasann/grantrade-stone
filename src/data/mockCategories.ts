import { StoneCategory } from '@/types'

export interface CategoryInfo {
  id: StoneCategory
  name: string
  tagline: string
  description: string
  imageUrl: string
  slabCount: number
}

export const CATEGORIES: CategoryInfo[] = [
  {
    id: 'Quartzite',
    name: 'Quartzite',
    tagline: 'Exotic Strength & Translucent Beauty',
    description: 'Natural metamorphic rock offering the crystalline elegance of marble with superior hardness and durability.',
    imageUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
    slabCount: 42,
  },
  {
    id: 'Quartz',
    name: 'Gran Trade Quartz',
    tagline: 'Premium Engineered Architectural Surfaces',
    description: 'Precision engineered quartz surfaces combining natural quartz crystals with advanced resin technology.',
    imageUrl: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800&q=80',
    slabCount: 36,
  },
  {
    id: 'Marble',
    name: 'Marble',
    tagline: 'Timeless Luxury & Classic Veining',
    description: 'Finest imported Italian, Greek, and international marble slabs for landmark residential and commercial spaces.',
    imageUrl: 'https://images.unsplash.com/photo-1590381105924-c72589b9ef3f?auto=format&fit=crop&w=800&q=80',
    slabCount: 58,
  },
  {
    id: 'Granite',
    name: 'Granite',
    tagline: 'Enduring Hardness & Dynamic Movements',
    description: 'Deep-quarried igneous granite slabs delivering high scratch and heat resistance in vibrant patterns.',
    imageUrl: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=800&q=80',
    slabCount: 49,
  },
  {
    id: 'Soapstone',
    name: 'Soapstone',
    tagline: 'Silky Texture & Classic Patina',
    description: 'Dense, chemically inert natural stone that deepens with age and requires minimal maintenance.',
    imageUrl: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80',
    slabCount: 16,
  },
  {
    id: 'Semi-Precious',
    name: 'Semi-Precious',
    tagline: 'Bespoke Gemstone Showpieces',
    description: 'Handcrafted master slabs composed of hand-selected agates, petrified wood, and crystal gems.',
    imageUrl: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=800&q=80',
    slabCount: 12,
  },
  {
    id: 'Monuments',
    name: 'Monuments',
    tagline: 'Flawless Dense Monumental Granite',
    description: 'Specially selected fine-grain granite blocks and slabs tested for monumental longevity and deep engraving.',
    imageUrl: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=80',
    slabCount: 14,
  },
  {
    id: 'Tiles',
    name: 'Natural Stone Tiles',
    tagline: 'Calibrated Precision Formats',
    description: 'Architectural stone tiles cut from identical quarry lots to match slab installations seamlessly.',
    imageUrl: 'https://images.unsplash.com/photo-1502005229762-ee1b2b8ab98f?auto=format&fit=crop&w=800&q=80',
    slabCount: 28,
  },
]
