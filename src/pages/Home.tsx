import React from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Truck,
} from 'lucide-react'
import { MOCK_PRODUCTS } from '@/data/mockProducts'
import { CATEGORIES } from '@/data/mockCategories'
import { StoneProductCard } from '@/components/common/StoneProductCard'
import { DemoPriceNotice } from '@/components/common/DemoPriceNotice'

export const Home: React.FC = () => {
  const navigate = useNavigate()

  // Filtered lists for Home sections
  const featuredProducts = MOCK_PRODUCTS.filter((p) => p.featured)
  const newArrivals = MOCK_PRODUCTS.filter((p) => p.newArrival)
  const popularProducts = MOCK_PRODUCTS.filter((p) => p.popular)

  const handleCategoryClick = (categoryName: string) => {
    navigate(`/explore?category=${encodeURIComponent(categoryName)}`)
  }

  return (
    <div className="flex-1 w-full bg-[#faf9f6] text-stone-900 pb-20">
      {/* 1. Hero Promotional Slab Showcase Banner */}
      <section className="px-4 pt-3.5">
        <div
          onClick={() => navigate('/explore?category=Quartzite')}
          className="relative rounded-2xl overflow-hidden cursor-pointer shadow-md group bg-stone-900 min-h-[160px] flex items-end p-4 border border-stone-200/50"
        >
          <img
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80"
            alt="Exotic Brazilian Quartzite"
            className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

          <div className="relative z-10 w-full text-white">
            <span className="inline-block bg-[#c29d53] text-black font-semibold text-[9px] uppercase tracking-wider px-2 py-0.5 rounded mb-1">
              Direct Import Arrival
            </span>
            <h3 className="font-serif font-bold text-sm text-stone-100">
              New Exotic Quartzite Shipments
            </h3>
            <p className="text-[11px] text-stone-300 mt-0.5 line-clamp-1">
              Direct from Brazil • Bookmatched 3cm slabs inspected & staged in yard
            </p>
            <div className="mt-2 flex items-center text-[10px] font-medium text-[#dfc07c] gap-1 group-hover:translate-x-1 transition-transform">
              <span>Explore Quartzite Collection</span>
              <ArrowRight className="w-3 h-3" />
            </div>
          </div>
        </div>
      </section>

      {/* 2. Value Assurance Badges */}
      <section className="px-4 mt-3 grid grid-cols-2 gap-2 text-[10.5px]">
        <div className="bg-white p-2.5 rounded-xl border border-stone-200/80 flex items-center gap-2 shadow-2xs">
          <ShieldCheck className="w-4 h-4 text-[#a68239] shrink-0" />
          <div className="leading-tight">
            <div className="font-semibold text-stone-800">Direct Importer</div>
            <div className="text-[9.5px] text-stone-500">First-grade quarries</div>
          </div>
        </div>

        <div className="bg-white p-2.5 rounded-xl border border-stone-200/80 flex items-center gap-2 shadow-2xs">
          <Truck className="w-4 h-4 text-[#556353] shrink-0" />
          <div className="leading-tight">
            <div className="font-semibold text-stone-800">A-Frame Transport</div>
            <div className="text-[9.5px] text-stone-500">Safe heavy slab freight</div>
          </div>
        </div>
      </section>

      {/* 3. Explore Stone Collections (Horizontal Category Scroll) */}
      <section className="mt-5">
        <div className="px-4 flex items-center justify-between mb-2.5">
          <div>
            <h2 className="font-serif font-bold text-sm text-stone-900">Explore Collections</h2>
            <p className="text-[10px] text-stone-500">Browse by natural & engineered stone family</p>
          </div>
          <button
            onClick={() => navigate('/explore')}
            className="text-[11px] text-[#997327] font-semibold flex items-center gap-0.5 hover:underline"
          >
            <span>All</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>

        <div className="flex gap-2.5 px-4 overflow-x-auto no-scrollbar pb-1">
          {CATEGORIES.map((cat) => (
            <div
              key={cat.id}
              onClick={() => handleCategoryClick(cat.id)}
              className="shrink-0 w-24 flex flex-col items-center text-center cursor-pointer group active:scale-95 transition-all"
            >
              <div className="w-18 h-18 rounded-2xl overflow-hidden bg-stone-200 relative border border-stone-300 shadow-2xs group-hover:border-[#c29d53] transition-colors">
                <img
                  src={cat.imageUrl}
                  alt={cat.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
              </div>
              <span className="text-[10.5px] font-semibold text-stone-800 mt-1.5 leading-tight truncate w-full">
                {cat.name}
              </span>
              <span className="text-[9px] text-stone-500">{cat.slabCount} varieties</span>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Featured Stone Slabs */}
      <section className="mt-6 px-4">
        <div className="flex items-center justify-between mb-2.5">
          <div>
            <div className="flex items-center gap-1 text-[10px] font-bold text-[#997327] uppercase tracking-wider">
              <Sparkles className="w-3 h-3" />
              <span>Curated Selection</span>
            </div>
            <h2 className="font-serif font-bold text-sm text-stone-900">Featured Stone Slabs</h2>
          </div>
          <button
            onClick={() => navigate('/explore')}
            className="text-[11px] text-[#997327] font-semibold hover:underline"
          >
            View More
          </button>
        </div>

        <div className="grid grid-cols-2 gap-2.5">
          {featuredProducts.slice(0, 2).map((product) => (
            <StoneProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* 5. New Arrivals Banner */}
      <section className="mt-6 px-4">
        <div className="flex items-center justify-between mb-2.5">
          <div>
            <h2 className="font-serif font-bold text-sm text-stone-900">New Arrivals</h2>
            <p className="text-[10px] text-stone-500">Freshly unbundled in Carlstadt yard</p>
          </div>
          <button
            onClick={() => navigate('/explore?sort=newest')}
            className="text-[11px] text-[#997327] font-semibold hover:underline"
          >
            See All
          </button>
        </div>

        <div className="flex gap-3 overflow-x-auto no-scrollbar pb-2">
          {newArrivals.map((product) => (
            <div key={product.id} className="w-48 shrink-0">
              <StoneProductCard product={product} />
            </div>
          ))}
        </div>
      </section>

      {/* 6. Demo Pricing Notice */}
      <section className="mt-5 px-4">
        <DemoPriceNotice />
      </section>

      {/* 7. Popular Collections / Top Picks */}
      <section className="mt-6 px-4">
        <div className="flex items-center justify-between mb-2.5">
          <div>
            <h2 className="font-serif font-bold text-sm text-stone-900">Popular Slabs</h2>
            <p className="text-[10px] text-stone-500">Most requested by Tri-State fabricators</p>
          </div>
          <button
            onClick={() => navigate('/explore')}
            className="text-[11px] text-[#997327] font-semibold hover:underline"
          >
            Explore
          </button>
        </div>

        <div className="flex flex-col gap-2.5">
          {popularProducts.slice(0, 3).map((product) => (
            <StoneProductCard key={product.id} product={product} layout="horizontal" />
          ))}
        </div>
      </section>

      {/* 8. Showroom & Yard Walk Invitation */}
      <section className="mt-6 px-4">
        <div className="bg-[#2b257d] text-white rounded-2xl p-4 border border-[#3b3394]/50 shadow-md">
          <div className="flex items-start justify-between">
            <div>
              <span className="text-[9px] uppercase tracking-wider text-[#dfc07c] font-semibold">
                Carlstadt Showroom & Yard
              </span>
              <h3 className="font-serif font-bold text-sm text-stone-100 mt-0.5">
                Visit Gran Trade Slab Yard
              </h3>
              <p className="text-[11px] text-stone-400 mt-1 leading-snug">
                178 Commerce Road, Carlstadt, NJ 07072
                <br />
                Walk the indoor yard under overhead staging lights.
              </p>
            </div>
          </div>

          <div className="mt-3 pt-3 border-t border-stone-800/80 flex items-center justify-between">
            <div className="text-[10px] text-stone-400">
              Yard Phone: <span className="text-stone-200 font-mono">(201) 438-1888</span>
            </div>
            <button
              onClick={() => navigate('/explore')}
              className="px-3 py-1.5 bg-[#c29d53] text-black font-semibold text-[11px] rounded-lg shadow-sm hover:bg-[#dfc07c] transition-colors"
            >
              Browse Inventory
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}
