import React from 'react'
import { Info } from 'lucide-react'

export const DemoPriceNotice: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <div
      className={`bg-stone-100/90 border border-stone-200/80 rounded-lg p-2.5 flex items-start gap-2 text-stone-600 text-[10.5px] ${className}`}
    >
      <Info className="w-4 h-4 text-[#a68239] shrink-0 mt-0.5" />
      <div className="leading-snug">
        <span className="font-semibold text-stone-800">Stone Distributor Demo Pricing:</span>{' '}
        Wholesale natural stone costs vary based on quarry lot yield and bundle size. Prices displayed
        are illustrative demo calculations for interactive shopping simulation.
      </div>
    </div>
  )
}
