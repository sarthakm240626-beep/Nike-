import React from 'react';
import { SNEAKER_IMAGES } from '../data/imageAssets';
import { X, Heart, ArrowRight, ShoppingBag } from 'lucide-react';
import { Product } from '../types';

interface WishlistDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  wishlistProducts: Product[];
  onRemoveWishlist: (product: Product) => void;
  onViewProduct: (product: Product) => void;
  onQuickAdd: (product: Product, size: string) => void;
}

export const WishlistDrawer: React.FC<WishlistDrawerProps> = ({
  isOpen,
  onClose,
  wishlistProducts,
  onRemoveWishlist,
  onViewProduct,
  onQuickAdd,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Drawer */}
      <div className="relative w-full max-w-md bg-[#101014] border-l border-neutral-800 h-full flex flex-col justify-between z-10 shadow-2xl">
        {/* Header */}
        <div className="p-6 border-b border-neutral-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Heart className="w-5 h-5 text-[#ff461e] fill-current" />
            <h2 className="text-xl font-bold uppercase tracking-tight text-white font-headline">
              SAVED ITEMS ({wishlistProducts.length})
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center text-neutral-400 hover:text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Wishlist Items List */}
        <div className="flex-1 overflow-y-auto p-6 divide-y divide-neutral-800/80">
          {wishlistProducts.length > 0 ? (
            wishlistProducts.map((prod) => (
              <div key={prod.id} className="py-4 first:pt-0 last:pb-0 flex gap-4 items-center">
                <div
                  className="w-20 h-20 bg-neutral-900 rounded-lg p-1.5 shrink-0 border border-neutral-800 flex items-center justify-center cursor-pointer"
                  onClick={() => {
                    onViewProduct(prod);
                    onClose();
                  }}
                >
                  <img
                    src={prod.image}
                    alt={prod.name}
                    loading="eager"
                    onError={(e) => {
                      const target = e.currentTarget;
                      if (!target.dataset.fallbackTried) {
                        target.dataset.fallbackTried = 'true';
                        target.src = SNEAKER_IMAGES.questCrimson;
                      }
                    }}
                    className="w-full h-full object-contain pointer-events-none"
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <h3
                      className="text-sm font-semibold text-white truncate cursor-pointer hover:text-[#ff461e] transition-colors"
                      onClick={() => {
                        onViewProduct(prod);
                        onClose();
                      }}
                    >
                      {prod.name}
                    </h3>
                    <button
                      type="button"
                      onClick={() => onRemoveWishlist(prod)}
                      className="text-neutral-500 hover:text-red-400 transition-colors shrink-0"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <p className="text-xs text-neutral-400 mt-0.5">{prod.colorName}</p>

                  <div className="flex items-center justify-between mt-3">
                    <span className="text-sm font-bold text-white tabular-nums">
                      ₹{prod.price.toLocaleString('en-IN')}
                    </span>

                    <button
                      type="button"
                      onClick={() => onQuickAdd(prod, prod.sizes[2] || prod.sizes[0] || 'UK 8')}
                      className="px-3 py-1 bg-white hover:bg-[#ff461e] text-black hover:text-white rounded-md text-xs font-semibold flex items-center gap-1 transition-colors"
                    >
                      <ShoppingBag className="w-3 h-3" />
                      <span>Add to Bag</span>
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="py-20 text-center">
              <div className="w-14 h-14 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center mx-auto mb-4 text-neutral-500">
                <Heart className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-white uppercase font-headline">No saved sneakers</h3>
              <p className="text-xs text-neutral-400 mt-1 max-w-xs mx-auto">
                Click the heart icon on any sneaker card to keep track of items you like.
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-neutral-800 bg-[#0d0d10]">
          <button
            type="button"
            onClick={onClose}
            className="w-full py-3 bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 text-white font-bold uppercase text-xs rounded-xl transition-colors"
          >
            Back to Catalog
          </button>
        </div>
      </div>
    </div>
  );
};
