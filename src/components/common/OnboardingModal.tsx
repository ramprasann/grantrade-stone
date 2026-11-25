import React, { useState } from 'react'
import {
  Sparkles,
  Layers,
  Truck,
  ArrowRight,
  Check
} from 'lucide-react'

interface OnboardingModalProps {
  onComplete: () => void
  onSkip: () => void
}

interface Slide {
  badge: string
  badgeIcon: React.ElementType
  title: string
  subtitle: string
  description: string
  imageUrl: string
  highlights: string[]
}

const ONBOARDING_SLIDES: Slide[] = [
  {
    badge: 'Direct Quarry Imports',
    badgeIcon: Sparkles,
    title: 'Exotic Natural & Engineered Stone',
    subtitle: 'From Brazilian & Italian Quarries',
    description:
      'Browse first-choice Quartzite, Marble, Granite, Soapstone, and Engineered Quartz slabs inspected and staged at our Carlstadt, NJ yard.',
    imageUrl:
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
    highlights: ['First-choice quarry blocks', 'Bookmatched 3cm slabs', 'Polished & honed finishes'],
  },
  {
    badge: 'Live Yard Inventory',
    badgeIcon: Layers,
    title: 'Inspect Lots & Real-Time Specs',
    subtitle: 'GT Reference Numbers & Bundle Info',
    description:
      'Access technical specifications for every individual slab: lot numbers, bundle quantities, approximate square footage, and certified thicknesses.',
    imageUrl:
      'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800&q=80',
    highlights: ['Live slab counts', 'Exact dimensions & sq ft', 'Fabricator bundle tags'],
  },
  {
    badge: 'Wholesale Experience',
    badgeIcon: Truck,
    title: 'Compare, Project Boards & Delivery',
    subtitle: 'Interactive B2B Trade Shopping',
    description:
      'Compare up to 3 stone slabs side-by-side, organize project wishlists for kitchens or commercial renovations, and place simulated orders for A-frame delivery.',
    imageUrl:
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80',
    highlights: ['Multi-slab comparison', 'Project-based saved lists', 'A-frame heavy transport'],
  },
]

export const OnboardingModal: React.FC<OnboardingModalProps> = ({ onComplete, onSkip }) => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0)

  const currentSlide = ONBOARDING_SLIDES[currentSlideIndex]
  const isLastSlide = currentSlideIndex === ONBOARDING_SLIDES.length - 1

  const handleNext = () => {
    if (isLastSlide) {
      onComplete()
    } else {
      setCurrentSlideIndex((prev) => prev + 1)
    }
  }

  const BadgeIcon = currentSlide.badgeIcon

  return (
    <div className="absolute inset-0 z-50 bg-[#faf9f6] flex flex-col justify-between overflow-hidden animate-in fade-in duration-200 select-none">
      {/* Top Bar with Brand and Skip Button */}
      <div className="px-5 pt-4 pb-2 flex items-center justify-between z-10 shrink-0">
        <div className="flex items-center gap-2">
          <img src="/logo.png" alt="Gran Trade" className="w-6 h-6 object-contain" />
          <span className="font-serif font-bold text-xs tracking-wider text-stone-900">
            GRAN TRADE
          </span>
        </div>

        <button
          type="button"
          onClick={onSkip}
          className="text-xs font-semibold text-stone-500 hover:text-stone-900 px-2.5 py-1 rounded-lg hover:bg-stone-200/60 transition-colors"
        >
          Skip Tour
        </button>
      </div>

      {/* Main Slide Content Area */}
      <div className="flex-1 flex flex-col px-5 py-2 overflow-y-auto no-scrollbar">
        {/* Slide Visual Card with Rounded Curves */}
        <div className="relative w-full h-56 rounded-3xl overflow-hidden shadow-md bg-stone-900 shrink-0 border border-stone-200">
          <img
            src={currentSlide.imageUrl}
            alt={currentSlide.title}
            className="w-full h-full object-cover transition-all duration-500 hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />

          {/* Top Category / Pillar Pill */}
          <div className="absolute top-3 left-3 flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/90 backdrop-blur-md text-stone-900 text-[10px] font-bold shadow-xs">
            <BadgeIcon className="w-3.5 h-3.5 text-[#a88232]" />
            <span>{currentSlide.badge}</span>
          </div>

          {/* Subtitle at bottom of image */}
          <div className="absolute bottom-3 left-3 right-3 text-white">
            <span className="text-[10px] text-[#dfc07c] font-semibold uppercase tracking-wider">
              {currentSlide.subtitle}
            </span>
          </div>
        </div>

        {/* Text Description Block */}
        <div className="pt-4 flex-1 flex flex-col justify-center">
          <h2 className="font-serif text-xl font-bold text-stone-900 leading-tight">
            {currentSlide.title}
          </h2>

          <p className="text-xs text-stone-600 leading-relaxed mt-2">
            {currentSlide.description}
          </p>

          {/* Feature Highlights Pills */}
          <div className="mt-4 flex flex-wrap gap-1.5">
            {currentSlide.highlights.map((item, idx) => (
              <span
                key={idx}
                className="inline-flex items-center gap-1 text-[10.5px] font-medium bg-white px-2.5 py-1 rounded-xl border border-stone-200 shadow-2xs text-stone-700"
              >
                <Check className="w-3 h-3 text-[#2b257d]" />
                <span>{item}</span>
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Navigation & Controls */}
      <div className="p-5 pt-3 bg-white/80 backdrop-blur-md border-t border-stone-200/80 shrink-0 flex items-center justify-between">
        {/* Dot / Pill Step Indicators */}
        <div className="flex items-center gap-1.5">
          {ONBOARDING_SLIDES.map((_, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setCurrentSlideIndex(idx)}
              className={`h-2 rounded-full transition-all duration-300 ${
                currentSlideIndex === idx
                  ? 'w-7 bg-[#2b257d]'
                  : 'w-2 bg-stone-300 hover:bg-stone-400'
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>

        {/* Next / Complete Action Button */}
        <button
          type="button"
          onClick={handleNext}
          className="px-5 py-2.5 rounded-xl bg-[#2b257d] hover:bg-[#201a61] text-[#dfc07c] font-semibold text-xs shadow-md flex items-center gap-1.5 active:scale-95 transition-all"
        >
          <span>{isLastSlide ? 'Explore Slabs' : 'Next'}</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  )
}
