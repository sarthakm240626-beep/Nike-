import React, { useState, useMemo } from 'react';
import { SNEAKER_IMAGES } from '../data/imageAssets';
import { Search, X, ArrowRight, Tag } from 'lucide-react';
import { Product } from '../types';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
  onSelectProduct: (product: Product) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  products,
  onSelectProduct,
}) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filtered = useMemo(() => {
    if (!searchTerm.trim()) return [];
    const term = searchTerm.toLowerCase();
    return products.filter(
      (p) =>
        p.name.toLowerCase().includes(term) ||
        p.category.toLowerCase().includes(term) ||
        p.colorName.toLowerCase().includes(term) ||
        p.colorFamily.toLowerCase().includes(term)
    );
  }, [searchTerm, products]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 sm:px-6">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/85 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />

      {/* Search Container */}
      <div className="relative w-full max-w-2xl bg-[#121216] border border-neutral-800 rounded-2xl overflow-hidden shadow-2xl z-10">
        {/* Search Input Bar */}
        <div className="p-4 sm:p-5 border-b border-neutral-800 flex items-center gap-3">
          <Search className="w-5 h-5 text-neutral-400 shrink-0" />
          <input
            type="text"
            autoFocus
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by sneaker name, silhouette, or color..."
            className="w-full bg-transparent text-white placeholder-neutral-500 text-sm focus:outline-none"
          />
          {searchTerm && (
            <button
              type="button"
              onClick={() => setSearchTerm('')}
              className="text-neutral-500 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            type="button"
            onClick={onClose}
            className="text-xs uppercase font-bold text-neutral-400 hover:text-white px-2 py-1"
          >
            Esc
          </button>
        </div>

        {/* Quick Suggestions when empty */}
        {!searchTerm && (
          <div className="p-6">
            <span className="text-xs font-bold uppercase tracking-wider text-neutral-500 block mb-3">
              Popular Searches
            </span>
            <div className="flex flex-wrap gap-2">
              {['Quest 5', 'Running', 'Crimson', 'Desert Sand', 'Basketball', 'Lifestyle'].map(
                (tag) => (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => setSearchTerm(tag)}
                    className="px-3 py-1.5 bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 hover:border-neutral-700 text-neutral-300 text-xs rounded-lg transition-colors"
                  >
                    {tag}
                  </button>
                )
              )}
            </div>
          </div>
        )}

        {/* Search Results */}
        {searchTerm && (
          <div className="max-h-[60vh] overflow-y-auto p-4 divide-y divide-neutral-800/80">
            {filtered.length > 0 ? (
              filtered.map((prod) => (
                <div
                  key={prod.id}
                  onClick={() => {
                    onSelectProduct(prod);
                    onClose();
                  }}
                  className="py-3 px-3 flex items-center justify-between hover:bg-neutral-900/60 rounded-xl cursor-pointer transition-colors group"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-12 h-12 bg-neutral-900 rounded-lg p-1 shrink-0 border border-neutral-800 flex items-center justify-center">
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
                    <div className="truncate">
                      <h4 className="text-sm font-semibold text-white group-hover:text-[#ff461e] transition-colors truncate">
                        {prod.name}
                      </h4>
                      <p className="text-xs text-neutral-400 truncate">
                        {prod.category} · {prod.colorName}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    <span className="text-xs font-bold text-white tabular-nums">
                      ₹{prod.price.toLocaleString('en-IN')}
                    </span>
                    <ArrowRight className="w-3.5 h-3.5 text-neutral-600 group-hover:text-white group-hover:translate-x-0.5 transition-all" />
                  </div>
                </div>
              ))
            ) : (
              <div className="py-12 text-center text-xs text-neutral-500">
                No sneakers matching "{searchTerm}".
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
