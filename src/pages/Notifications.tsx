import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Sparkles,
  Truck,
  ShieldCheck,
  Megaphone,
  CheckCheck,
  Trash2,
  ChevronRight,
  Info,
  ArrowLeft,
  Inbox
} from 'lucide-react'
import { useNotification } from '@/context/NotificationContext'

export const Notifications: React.FC = () => {
  const navigate = useNavigate()
  const {
    notifications,
    unreadCount,
    markAsRead,
    markAllAsRead,
    clearAllNotifications,
  } = useNotification()

  const [filter, setFilter] = useState<'all' | 'unread'>('all')

  const filteredNotifications =
    filter === 'unread'
      ? notifications.filter((n) => !n.isRead)
      : notifications

  const handleAction = (link?: string, notifId?: string) => {
    if (notifId) markAsRead(notifId)
    if (link) {
      navigate(link)
    }
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'arrival':
        return <Sparkles className="w-4 h-4 text-[#c29d53]" />
      case 'order':
        return <Truck className="w-4 h-4 text-emerald-600" />
      case 'quote':
        return <ShieldCheck className="w-4 h-4 text-amber-600" />
      case 'announcement':
      default:
        return <Megaphone className="w-4 h-4 text-stone-600" />
    }
  }

  const getCategoryBadge = (category: string) => {
    switch (category) {
      case 'arrival':
        return 'bg-[#c29d53]/15 text-[#8f6d2b] border-[#c29d53]/30'
      case 'order':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200'
      case 'quote':
        return 'bg-amber-50 text-amber-700 border-amber-200'
      case 'announcement':
      default:
        return 'bg-stone-100 text-stone-700 border-stone-200'
    }
  }

  return (
    <div className="flex-1 w-full pb-20 bg-[#faf9f6]">
      {/* Top Header for Notifications */}
      <div className="sticky top-0 z-30 bg-[#2b257d] text-white px-4 py-3 flex items-center justify-between border-b border-[#3b3394]/50 shadow-sm">
        <div className="flex items-center gap-2">
          <button
            onClick={() => navigate(-1)}
            className="p-1.5 -ml-1 rounded-full text-stone-300 hover:text-white hover:bg-stone-800 active:scale-95 transition-all"
            aria-label="Go back"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-2">
            <h1 className="font-serif text-base font-bold text-stone-100">
              Notifications & Alerts
            </h1>
            {unreadCount > 0 && (
              <span className="px-2 py-0.5 rounded-full bg-[#c29d53] text-black text-[11px] font-bold">
                {unreadCount} new
              </span>
            )}
          </div>
        </div>

        {/* Global actions */}
        {notifications.length > 0 && (
          <div className="flex items-center gap-1.5">
            {unreadCount > 0 && (
              <button
                type="button"
                onClick={markAllAsRead}
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-stone-800 border border-stone-700 text-stone-200 text-[11px] font-medium hover:text-[#dfc07c] transition-colors"
                title="Mark all as read"
              >
                <CheckCheck className="w-3.5 h-3.5 text-[#dfc07c]" />
                <span className="hidden sm:inline">Mark read</span>
              </button>
            )}
            <button
              type="button"
              onClick={clearAllNotifications}
              className="inline-flex items-center gap-1 px-2 py-1 rounded-lg bg-stone-800/80 border border-stone-700 text-stone-400 hover:text-rose-400 text-[11px] font-medium transition-colors"
              title="Clear all notifications"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </div>
        )}
      </div>

      <div className="p-4 space-y-4 max-w-md mx-auto">
        {/* Yard Updates Announcement Info Banner */}
        <div className="p-3 rounded-xl bg-white border border-stone-200/80 shadow-xs flex items-start gap-2.5">
          <Info className="w-4 h-4 text-[#c29d53] shrink-0 mt-0.5" />
          <p className="text-xs text-stone-600 leading-relaxed">
            Real-time slab arrival alerts from Carlstadt, NJ yard and active shipment tracking for registered trade fabricators.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex p-1 rounded-xl bg-stone-200/60 border border-stone-300/60">
          <button
            type="button"
            onClick={() => setFilter('all')}
            className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-all ${
              filter === 'all'
                ? 'bg-white text-stone-900 shadow-xs'
                : 'text-stone-500 hover:text-stone-800'
            }`}
          >
            All Updates ({notifications.length})
          </button>
          <button
            type="button"
            onClick={() => setFilter('unread')}
            className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-all ${
              filter === 'unread'
                ? 'bg-white text-stone-900 shadow-xs'
                : 'text-stone-500 hover:text-stone-800'
            }`}
          >
            Unread ({unreadCount})
          </button>
        </div>

        {/* Notifications List */}
        {filteredNotifications.length === 0 ? (
          <div className="py-16 text-center space-y-3">
            <div className="w-14 h-14 rounded-full bg-stone-200/80 text-stone-400 flex items-center justify-center mx-auto">
              <Inbox className="w-7 h-7" />
            </div>
            <h2 className="font-semibold text-stone-800 text-sm">
              {filter === 'unread' ? 'No unread notifications' : 'No notifications yet'}
            </h2>
            <p className="text-xs text-stone-500 max-w-xs mx-auto">
              {filter === 'unread'
                ? 'You are all caught up on stone arrivals and shipment notices.'
                : 'New slab arrivals, yard inventory, and order dispatch notices will appear here.'}
            </p>
          </div>
        ) : (
          <div className="space-y-2.5">
            {filteredNotifications.map((n) => (
              <div
                key={n.id}
                onClick={() => handleAction(n.link, n.id)}
                className={`p-3.5 rounded-xl border transition-all cursor-pointer relative ${
                  n.isRead
                    ? 'bg-white border-stone-200/70 hover:border-stone-300'
                    : 'bg-white border-[#c29d53]/50 shadow-xs hover:border-[#c29d53]'
                }`}
              >
                {!n.isRead && (
                  <span className="absolute top-3.5 right-3.5 w-2 h-2 rounded-full bg-[#c29d53]" />
                )}

                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-stone-100 border border-stone-200/60 shrink-0 mt-0.5">
                    {getCategoryIcon(n.category)}
                  </div>

                  <div className="flex-1 min-w-0 pr-3">
                    <div className="flex items-center gap-2 mb-1">
                      <span
                        className={`text-[10px] font-bold px-1.5 py-0.5 rounded border uppercase tracking-wider ${getCategoryBadge(
                          n.category
                        )}`}
                      >
                        {n.category}
                      </span>
                      <span className="text-[11px] text-stone-400">{n.timestamp}</span>
                    </div>

                    <h2
                      className={`text-xs font-bold leading-tight mb-1 ${
                        n.isRead ? 'text-stone-800' : 'text-stone-950'
                      }`}
                    >
                      {n.title}
                    </h2>

                    <p className="text-xs text-stone-600 leading-relaxed mb-2">
                      {n.message}
                    </p>

                    {n.link && (
                      <div className="flex items-center gap-1 text-[11px] font-semibold text-[#8f6d2b] hover:text-[#5e4718]">
                        <span>{n.actionLabel || 'View Details'}</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
