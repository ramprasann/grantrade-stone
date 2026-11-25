import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Heart,
  Scale,
  ShoppingBag,
  Trash2,
  FolderPlus,
  Share2,
  Check,
  CheckSquare,
  Square,
} from 'lucide-react'
import { useWishlist } from '@/context/WishlistContext'
import { useCart } from '@/context/CartContext'
import { EmptyState } from '@/components/common/EmptyState'
import { DemoPriceNotice } from '@/components/common/DemoPriceNotice'

export const Saved: React.FC = () => {
  const navigate = useNavigate()
  const {
    savedItems,
    projectLists,
    removeFromSaved,
    moveToProject,
    addProjectList,
    addToCompare,
    comparedProducts,
  } = useWishlist()
  const { addToCart } = useCart()

  const [activeProjectTab, setActiveProjectTab] = useState<string>('All')
  const [selectedIds, setSelectedIds] = useState<string[]>([])
  const [newProjectName, setNewProjectName] = useState('')
  const [isAddingProject, setIsAddingProject] = useState(false)
  const [shareToast, setShareToast] = useState(false)

  // Filter items by active project
  const filteredItems = savedItems.filter((item) => {
    if (activeProjectTab === 'All') return true
    return item.projectName === activeProjectTab
  })

  // Selection toggle
  const toggleSelect = (productId: string) => {
    setSelectedIds((prev) =>
      prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId]
    )
  }

  const handleSelectAll = () => {
    if (selectedIds.length === filteredItems.length) {
      setSelectedIds([])
    } else {
      setSelectedIds(filteredItems.map((item) => item.productId))
    }
  }

  // Batch actions
  const handleBatchAddToCart = () => {
    const itemsToAdd = savedItems.filter((item) => selectedIds.includes(item.productId))
    itemsToAdd.forEach((item) => addToCart(item.product, 1))
    setSelectedIds([])
  }

  const handleBatchCompare = () => {
    const itemsToCompare = savedItems
      .filter((item) => selectedIds.includes(item.productId))
      .slice(0, 3)

    itemsToCompare.forEach((item) => addToCompare(item.product))
    navigate('/compare')
  }

  const handleBatchRemove = () => {
    selectedIds.forEach((id) => removeFromSaved(id))
    setSelectedIds([])
  }

  const handleCreateProject = (e: React.FormEvent) => {
    e.preventDefault()
    if (newProjectName.trim()) {
      addProjectList(newProjectName.trim())
      setActiveProjectTab(newProjectName.trim())
      setNewProjectName('')
      setIsAddingProject(false)
    }
  }

  const handleShareList = () => {
    setShareToast(true)
    setTimeout(() => setShareToast(false), 2500)
  }

  return (
    <div className="flex-1 w-full bg-[#faf9f6] text-stone-900 pb-20 flex flex-col">
      {/* Toast Notice */}
      {shareToast && (
        <div className="fixed top-14 left-1/2 -translate-x-1/2 bg-black text-white text-xs px-4 py-2 rounded-full shadow-lg z-50 flex items-center gap-1.5 animate-in fade-in zoom-in-95">
          <Check className="w-3.5 h-3.5 text-[#dfc07c]" />
          <span>Saved slabs portfolio link copied!</span>
        </div>
      )}

      {/* 1. Header with Comparison Quick Bar */}
      <div className="bg-[#2b257d] text-white px-4 pt-3 pb-3 border-b border-[#3b3394]/50 shrink-0 sticky top-0 z-30 shadow-xs">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-serif font-bold text-base text-white">Saved Slabs</h1>
            <p className="text-[10px] text-stone-400">
              {savedItems.length} curated {savedItems.length === 1 ? 'variety' : 'varieties'} for your projects
            </p>
          </div>

          <div className="flex items-center gap-2">
            {comparedProducts.length > 0 && (
              <button
                onClick={() => navigate('/compare')}
                className="flex items-center gap-1 bg-[#c29d53] text-black px-2.5 py-1 rounded-lg text-xs font-semibold shadow-xs"
              >
                <Scale className="w-3.5 h-3.5" />
                <span>Compare ({comparedProducts.length})</span>
              </button>
            )}

            <button
              onClick={handleShareList}
              className="p-1.5 text-stone-300 hover:text-white rounded-full bg-white/10"
              title="Share Saved List"
            >
              <Share2 className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* 2. Project List Tabs */}
        <div className="flex items-center gap-1.5 mt-3 overflow-x-auto no-scrollbar">
          <button
            onClick={() => setActiveProjectTab('All')}
            className={`px-3 py-1 rounded-full text-[11px] font-medium whitespace-nowrap transition-all ${
              activeProjectTab === 'All'
                ? 'bg-[#c29d53] text-black font-semibold'
                : 'bg-stone-800 text-stone-300 hover:bg-stone-700'
            }`}
          >
            All Slabs ({savedItems.length})
          </button>

          {projectLists.map((project) => {
            const count = savedItems.filter((i) => i.projectName === project).length
            return (
              <button
                key={project}
                onClick={() => setActiveProjectTab(project)}
                className={`px-3 py-1 rounded-full text-[11px] font-medium whitespace-nowrap transition-all ${
                  activeProjectTab === project
                    ? 'bg-[#c29d53] text-black font-semibold'
                    : 'bg-stone-800 text-stone-300 hover:bg-stone-700'
                }`}
              >
                {project} {count > 0 && `(${count})`}
              </button>
            )
          })}

          <button
            onClick={() => setIsAddingProject(true)}
            className="flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] bg-stone-800 text-[#dfc07c] hover:bg-stone-700 shrink-0 font-medium"
          >
            <FolderPlus className="w-3 h-3" />
            <span>New List</span>
          </button>
        </div>

        {/* New Project Inline Input */}
        {isAddingProject && (
          <form onSubmit={handleCreateProject} className="flex gap-2 mt-2.5">
            <input
              type="text"
              value={newProjectName}
              onChange={(e) => setNewProjectName(e.target.value)}
              placeholder="Project name (e.g. Guest En-Suite)"
              className="flex-1 bg-stone-900 text-white text-xs px-3 py-1.5 rounded-lg border border-stone-700 focus:outline-none focus:border-[#c29d53]"
              autoFocus
            />
            <button
              type="submit"
              className="px-3 py-1.5 bg-[#c29d53] text-black text-xs font-semibold rounded-lg"
            >
              Add
            </button>
            <button
              type="button"
              onClick={() => setIsAddingProject(false)}
              className="px-2 py-1.5 text-stone-400 text-xs"
            >
              Cancel
            </button>
          </form>
        )}
      </div>

      {/* 3. Batch Action Bar if items exist */}
      {filteredItems.length > 0 && (
        <div className="bg-stone-100 px-4 py-2 border-b border-stone-200 flex items-center justify-between text-xs shrink-0">
          <button
            onClick={handleSelectAll}
            className="flex items-center gap-1.5 font-medium text-stone-700 hover:text-stone-900"
          >
            {selectedIds.length === filteredItems.length ? (
              <CheckSquare className="w-4 h-4 text-[#997327]" />
            ) : (
              <Square className="w-4 h-4 text-stone-400" />
            )}
            <span>
              {selectedIds.length > 0 ? `${selectedIds.length} Selected` : 'Select Multiple'}
            </span>
          </button>

          {selectedIds.length > 0 && (
            <div className="flex items-center gap-2">
              {selectedIds.length <= 3 && (
                <button
                  onClick={handleBatchCompare}
                  className="px-2 py-1 bg-[#2b257d] hover:bg-[#201a61] text-[#dfc07c] rounded text-[10px] font-semibold flex items-center gap-1 active:scale-95 transition-colors shadow-2xs"
                >
                  <Scale className="w-3 h-3" />
                  <span>Compare</span>
                </button>
              )}
              <button
                onClick={handleBatchAddToCart}
                className="px-2.5 py-1 bg-[#c29d53] text-black rounded text-[10px] font-semibold flex items-center gap-1 active:scale-95"
              >
                <ShoppingBag className="w-3 h-3" />
                <span>Add to Cart</span>
              </button>
              <button
                onClick={handleBatchRemove}
                className="p-1 text-red-600 hover:text-red-800"
                title="Remove selected"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
        </div>
      )}

      {/* 4. Saved Items List */}
      <div className="p-4 flex-1">
        {filteredItems.length > 0 ? (
          <div className="space-y-3">
            {filteredItems.map(({ product, projectName }) => {
              const isSelected = selectedIds.includes(product.id)
              return (
                <div
                  key={product.id}
                  className={`bg-white rounded-xl border transition-all p-3 shadow-xs relative flex gap-3 ${
                    isSelected
                      ? 'border-[#c29d53] ring-1 ring-[#c29d53]/40 bg-[#fefdfa]'
                      : 'border-stone-200/90'
                  }`}
                >
                  {/* Select Checkbox */}
                  <div
                    onClick={() => toggleSelect(product.id)}
                    className="flex items-center justify-center shrink-0 cursor-pointer pt-1"
                  >
                    {isSelected ? (
                      <CheckSquare className="w-4 h-4 text-[#997327]" />
                    ) : (
                      <Square className="w-4 h-4 text-stone-300 hover:text-stone-500" />
                    )}
                  </div>

                  {/* Product Thumbnail */}
                  <div
                    onClick={() => navigate(`/product/${product.id}`)}
                    className="relative w-20 h-20 rounded-lg overflow-hidden shrink-0 bg-stone-100 cursor-pointer border border-stone-200"
                  >
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                    <span className="absolute bottom-0.5 left-0.5 bg-black/75 text-[7px] text-white font-mono px-1 rounded">
                      {product.gtReference}
                    </span>
                  </div>

                  {/* Slab Content */}
                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between">
                        <span className="text-[9px] font-bold uppercase tracking-wider text-[#997327]">
                          {product.category}
                        </span>
                        <button
                          onClick={() => removeFromSaved(product.id)}
                          className="text-stone-400 hover:text-red-600 p-0.5"
                          title="Remove from favorites"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <h3
                        onClick={() => navigate(`/product/${product.id}`)}
                        className="font-semibold text-xs text-stone-900 truncate cursor-pointer hover:text-[#997327]"
                      >
                        {product.name}
                      </h3>

                      <div className="text-[10px] text-stone-500 mt-0.5">
                        {product.finish} • {product.thickness}
                      </div>

                      {/* Project Tag Dropdown Selector */}
                      <div className="mt-1 flex items-center gap-1 text-[9px] text-stone-500">
                        <span>Project:</span>
                        <select
                          value={projectName || 'General Wishlist'}
                          onChange={(e) => moveToProject(product.id, e.target.value)}
                          className="bg-stone-100 text-stone-700 font-medium px-1.5 py-0.5 rounded text-[9px] border border-stone-200 cursor-pointer"
                        >
                          <option value="General Wishlist">General Wishlist</option>
                          {projectLists.map((p) => (
                            <option key={p} value={p}>
                              {p}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {/* Bottom Pricing & Actions */}
                    <div className="mt-2 pt-1.5 border-t border-stone-100 flex items-center justify-between">
                      <div className="text-[11px] font-bold text-stone-900">
                        ${product.demoSlabPrice.toLocaleString()}{' '}
                        <span className="text-[8.5px] font-normal text-stone-500">/slab demo</span>
                      </div>

                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => addToCompare(product)}
                          className="p-1 text-stone-500 hover:text-stone-800"
                          title="Compare"
                        >
                          <Scale className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => addToCart(product, 1)}
                          className="px-2 py-1 bg-[#2b257d] hover:bg-[#201a61] text-[#dfc07c] text-[10px] font-medium rounded-lg flex items-center gap-1 active:scale-95 transition-all shadow-xs"
                        >
                          <ShoppingBag className="w-3 h-3" />
                          <span>Add to Cart</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        ) : (
          <EmptyState
            icon={Heart}
            title={activeProjectTab === 'All' ? 'No Saved Slabs Yet' : `No Slabs in ${activeProjectTab}`}
            description="Bookmark quartzite, marble, and granite slabs from our direct quarry shipments to plan your stone projects."
            actionLabel="Explore Stone Slabs"
            onAction={() => navigate('/explore')}
          />
        )}

        <div className="mt-6">
          <DemoPriceNotice />
        </div>
      </div>
    </div>
  )
}
