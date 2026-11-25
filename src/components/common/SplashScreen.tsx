import React, { useEffect, useState } from 'react'
import { Sparkles, ArrowRight } from 'lucide-react'

interface SplashScreenProps {
  onFinish: () => void
}

export const SplashScreen: React.FC<SplashScreenProps> = ({ onFinish }) => {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    // Smooth progress animation over 2.2 seconds
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          return 100
        }
        return prev + 4
      })
    }, 80)

    const timer = setTimeout(() => {
      onFinish()
    }, 2400)

    return () => {
      clearInterval(interval)
      clearTimeout(timer)
    }
  }, [onFinish])

  return (
    <div
      onClick={onFinish}
      className="absolute inset-0 z-50 bg-gradient-to-b from-[#241e73] via-[#2c2680] to-[#181352] text-white flex flex-col items-center justify-between py-12 px-6 select-none cursor-pointer animate-in fade-in duration-300"
    >
      {/* Top Branding Pill */}
      <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 border border-white/15 text-[10px] tracking-wider text-[#dfc07c] uppercase font-semibold">
        <Sparkles className="w-3 h-3 text-[#dfc07c]" />
        <span>Direct Quarry Importer</span>
      </div>

      {/* Center Gemstone Emblem & Brand Title */}
      <div className="flex flex-col items-center text-center -mt-6">
        {/* Gemstone Logo in Glowing Ambient Circle */}
        <div className="relative mb-5 group">
          <div className="absolute -inset-3 bg-[#dfc07c]/25 rounded-full blur-xl animate-pulse" />
          <div className="relative w-24 h-24 rounded-full bg-gradient-to-tr from-[#3b3394] via-[#2a227e] to-[#1b1559] border-2 border-[#dfc07c]/70 shadow-[0_0_40px_rgba(223,192,124,0.3)] flex items-center justify-center p-3.5">
            <img
              src="/logo.png"
              alt="Gran Trade Gemstone Emblem"
              className="w-full h-full object-contain filter drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)]"
            />
          </div>
        </div>

        <h1 className="font-serif text-3xl font-bold tracking-wider text-white drop-shadow-sm">
          GRAN TRADE
        </h1>
        <p className="text-xs text-[#dfc07c] font-medium tracking-[0.25em] uppercase mt-1">
          Natural Stone & Slabs
        </p>

        <p className="text-[11px] text-stone-300/90 max-w-[260px] leading-relaxed mt-4">
          Wholesale distributor of premium Quartzite, Marble, Granite, and Engineered Surfaces.
        </p>
      </div>

      {/* Bottom Loading Progress & Skip */}
      <div className="w-full max-w-[240px] flex flex-col items-center space-y-3">
        {/* Animated Gold Progress Bar */}
        <div className="w-full h-1 bg-white/15 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-[#c29d53] via-[#dfc07c] to-white rounded-full transition-all duration-100 ease-out shadow-[0_0_8px_#dfc07c]"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="flex items-center justify-between w-full text-[10px] text-stone-300">
          <span>Carlstadt, NJ Yard</span>
          <span className="flex items-center gap-0.5 text-[#dfc07c] font-semibold hover:underline">
            <span>Enter App</span>
            <ArrowRight className="w-2.5 h-2.5" />
          </span>
        </div>
      </div>
    </div>
  )
}
