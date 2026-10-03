import React, { useState } from 'react';
import { SNEAKER_IMAGES } from '../data/imageAssets';
import { ArrowRight, Heart, Star, Check } from 'lucide-react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onViewProduct: (product: Product) => void;
  onQuickAdd: (product: Product, size: string) => void;
  isWishlisted: boolean;
  onToggleWishlist: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onViewProduct,
  onQuickAdd,
  isWishlisted,
  onToggleWishlist,
}) => {
  const [quickAdded, setQuickAdded] = useState(false);

  const handleQuickAddClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    const defaultSize = product.sizes[2] || product.sizes[0] || 'UK 8';
    onQuickAdd(product, defaultSize);
    setQuickAdded(true);
    setTimeout(() => setQuickAdded(false), 1600);
  };

  return (
    <div
      onClick={() => onViewProduct(product)}
      className="group relative flex flex-col h-full bg-[#121215] border border-neutral-800 rounded-xl overflow-hidden cursor-pointer transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_16px_36px_rgba(0,0,0,0.65)] hover:border-neutral-600"
    >
      {/* Top badges & Wishlist */}
      <div className="absolute top-3 left-3 right-3 z-10 flex items-center justify-between pointer-events-none">
        <div>
          {product.badge && (
            <span className="text-[11px] font-semibold tracking-wider uppercase text-neutral-300 bg-neutral-900/90 border border-neutral-700/80 px-2 py-0.5 rounded backdrop-blur-sm">
              {product.badge}
            </span>
          )}
        </div>
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onToggleWishlist(product);
          }}
          className={`pointer-events-auto w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-200 backdrop-blur-sm ${
            isWishlisted
              ? 'bg-[#ff461e] text-white'
              : 'bg-neutral-900/80 text-neutral-400 hover:text-white hover:bg-neutral-800'
          }`}
          title={isWishlisted ? 'Remove from Wishlist' : 'Add to Wishlist'}
        >
          <Heart className="w-4 h-4" fill={isWishlisted ? 'currentColor' : 'none'} />
        </button>
      </div>

      {/* Static Product Image Container - NO ROTATION, NO DISTORTION, NO IMAGE SCALE */}
      <div className="relative w-full aspect-[4/3] bg-neutral-950/60 flex items-center justify-center p-4 overflow-hidden border-b border-neutral-800/60">
        <img
          src={product.image}
          alt={product.name}
          loading="eager"
          decoding="async"
          onError={(e) => {
            const target = e.currentTarget;
            if (!target.dataset.fallbackTried) {
              target.dataset.fallbackTried = 'true';
              target.src = SNEAKER_IMAGES.questCrimson;
            }
          }}
          className="w-full h-full object-contain pointer-events-none transition-opacity duration-200"
        />
      </div>

      {/* Product Information Container - moves upward slightly on card hover */}
      <div className="flex-1 p-5 flex flex-col justify-between transition-transform duration-200 group-hover:-translate-y-0.5">
        <div>
          {/* Category & Colorway - clean unboxed typography */}
          <div className="flex items-center justify-between text-xs text-neutral-400 mb-1.5">
            <span className="font-semibold uppercase tracking-wider text-neutral-400">{product.category}</span>
            <span className="text-neutral-400 truncate max-w-[150px]">{product.colorFamily}</span>
          </div>

          {/* Product Name */}
          <h3 className="text-base font-semibold text-neutral-100 group-hover:text-white transition-colors duration-200 line-clamp-1">
            {product.name}
          </h3>

          {/* Color description */}
          <p className="text-xs text-neutral-400 line-clamp-1 mt-0.5">
            {product.colorName}
          </p>

          {/* Rating */}
          <div className="flex items-center gap-1.5 mt-2 text-xs text-neutral-400">
            <div className="flex items-center text-amber-400">
              <Star className="w-3.5 h-3.5 fill-current" />
              <span className="ml-1 font-medium text-neutral-300 tabular-nums">{product.rating}</span>
            </div>
            <span className="text-neutral-600">·</span>
            <span className="text-neutral-400 tabular-nums">{product.reviewsCount} reviews</span>
          </div>
        </div>

        {/* Price and Hover View Action */}
        <div className="pt-4 mt-3 border-t border-neutral-800/80 flex items-center justify-between">
          <div className="flex flex-col">
            <div className="flex items-baseline gap-1.5">
              <span className="text-base font-bold text-white tabular-nums tracking-tight">
                ₹{product.price.toLocaleString('en-IN')}
              </span>
              {product.originalPrice && (
                <span className="text-xs text-neutral-500 line-through tabular-nums">
                  ₹{product.originalPrice.toLocaleString('en-IN')}
                </span>
              )}
            </div>
            {product.discountPercent && (
              <span className="text-[10px] font-bold text-emerald-400">
                {product.discountPercent}% off MRP
              </span>
            )}
          </div>

          {/* Action Button: Visible with arrow movement on card hover */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleQuickAddClick}
              className={`px-2.5 py-1 text-xs font-semibold rounded transition-all duration-200 ${
                quickAdded
                  ? 'bg-emerald-600 text-white'
                  : 'bg-neutral-800 hover:bg-[#ff461e] text-neutral-200 hover:text-white'
              }`}
              title="Quick Add standard size"
            >
              {quickAdded ? (
                <span className="flex items-center gap-1">
                  <Check className="w-3 h-3" /> Added
                </span>
              ) : (
                '+ Add'
              )}
            </button>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onViewProduct(product);
              }}
              className="inline-flex items-center gap-1 text-xs font-semibold text-neutral-300 group-hover:text-white transition-colors duration-200"
            >
              <span>View</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1 text-[#ff461e]" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
