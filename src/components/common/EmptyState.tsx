import React from 'react'
import { LucideIcon } from 'lucide-react'

interface EmptyStateProps {
  icon: LucideIcon
  title: string
  description: string
  actionLabel?: string
  onAction?: () => void
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  icon: Icon,
  title,
  description,
  actionLabel,
  onAction,
}) => {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-6 text-center">
      <div className="w-16 h-16 rounded-2xl bg-stone-100 flex items-center justify-center mb-4 border border-stone-200/80 shadow-xs">
        <Icon className="w-8 h-8 text-[#a68239]" />
      </div>
      <h3 className="font-semibold text-stone-900 text-sm mb-1">{title}</h3>
      <p className="text-stone-500 text-xs max-w-xs mb-5 leading-relaxed">{description}</p>
      {actionLabel && onAction && (
        <button
          onClick={onAction}
          className="px-4 py-2 bg-[#14171c] hover:bg-black text-[#e4c987] font-medium text-xs rounded-xl shadow-sm transition-all active:scale-95"
        >
          {actionLabel}
        </button>
      )}
    </div>
  )
}
