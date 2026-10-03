import React, { useState } from 'react';
import { SNEAKER_IMAGES } from '../data/imageAssets';
import { X, Check, Heart, Shield, ShoppingBag, Star, Zap } from 'lucide-react';
import { Product } from '../types';

interface ProductQuickViewModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, size: string) => void;
  isWishlisted: boolean;
  onToggleWishlist: (product: Product) => void;
  onOpenSizeGuide: () => void;
}

export const ProductQuickViewModal: React.FC<ProductQuickViewModalProps> = ({
  product,
  onClose,
  onAddToCart,
  isWishlisted,
  onToggleWishlist,
  onOpenSizeGuide,
}) => {
  if (!product) return null;

  const [selectedSize, setSelectedSize] = useState<string>(
    product.sizes[2] || product.sizes[0] || 'UK 8'
  );
  const [buttonState, setButtonState] = useState<'idle' | 'adding' | 'added'>('idle');

  const handleAdd = () => {
    if (buttonState !== 'idle') return;
    setButtonState('adding');
    setTimeout(() => {
      onAddToCart(product, selectedSize);
      setButtonState('added');
      setTimeout(() => {
        setButtonState('idle');
      }, 1800);
    }, 350);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/85 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-4xl bg-[#121216] border border-neutral-800 rounded-2xl overflow-hidden shadow-2xl z-10 my-8">
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Close modal"
          className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-neutral-900/90 border border-neutral-700/80 flex items-center justify-center text-neutral-400 hover:text-white transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-12 items-stretch">
          {/* Left Column: Normal Static Product Image */}
          <div className="md:col-span-6 bg-[#0c0c10] p-8 sm:p-12 flex items-center justify-center relative border-b md:border-b-0 md:border-r border-neutral-800">
            <div className="w-full aspect-[4/3] flex items-center justify-center">
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
                className="w-full h-full object-contain pointer-events-none select-none drop-shadow-xl"
              />
            </div>

            {/* Wishlist toggle */}
            <button
              type="button"
              onClick={() => onToggleWishlist(product)}
              className={`absolute top-4 left-4 w-9 h-9 rounded-full flex items-center justify-center transition-colors border ${
                isWishlisted
                  ? 'bg-[#ff461e] border-[#ff461e] text-white'
                  : 'bg-neutral-900 border-neutral-800 text-neutral-400 hover:text-white'
              }`}
            >
              <Heart className="w-4 h-4" fill={isWishlisted ? 'currentColor' : 'none'} />
            </button>
          </div>

          {/* Right Column: Information & Selection */}
          <div className="md:col-span-6 p-6 sm:p-8 flex flex-col justify-between space-y-6">
            <div>
              {/* Category & Rating */}
              <div className="flex items-center justify-between text-xs mb-2">
                <span className="font-bold uppercase tracking-wider text-[#ff461e]">
                  {product.category} Footwear
                </span>
                <div className="flex items-center gap-1 text-amber-400">
                  <Star className="w-3.5 h-3.5 fill-current" />
                  <span className="font-medium text-neutral-200 tabular-nums">{product.rating}</span>
                  <span className="text-neutral-500">({product.reviewsCount})</span>
                </div>
              </div>

              {/* Title */}
              <h2 className="text-2xl sm:text-3xl font-extrabold uppercase text-white font-headline tracking-tight">
                {product.name}
              </h2>

              {/* Color name */}
              <p className="text-xs text-neutral-400 mt-1">
                Colorway: <span className="text-neutral-200">{product.colorName}</span>
              </p>

              {/* Price */}
              <div className="flex items-baseline gap-3 my-4">
                <span className="text-2xl font-bold text-white tabular-nums tracking-tight">
                  ₹{product.price.toLocaleString('en-IN')}
                </span>
                {product.originalPrice && (
                  <span className="text-sm text-neutral-500 line-through tabular-nums">
                    ₹{product.originalPrice.toLocaleString('en-IN')}
                  </span>
                )}
                <span className="text-xs text-neutral-400">incl. of all taxes</span>
              </div>

              {/* Description */}
              <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed mb-4">
                {product.description}
              </p>

              {/* Size Selection */}
              <div className="pt-4 border-t border-neutral-800">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-neutral-400">
                    Select Size (UK)
                  </span>
                  <button
                    type="button"
                    onClick={onOpenSizeGuide}
                    className="text-xs text-neutral-400 hover:text-white cursor-pointer underline transition-colors"
                  >
                    Size Guide (UK/US/EU)
                  </button>
                </div>
                <div className="grid grid-cols-6 gap-2">
                  {product.sizes.map((size) => {
                    const isSelected = selectedSize === size;
                    return (
                      <button
                        key={size}
                        type="button"
                        onClick={() => setSelectedSize(size)}
                        className={`h-10 rounded-lg text-xs font-semibold flex items-center justify-center transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-white text-black font-bold shadow-md shadow-white/10 ring-2 ring-white'
                            : 'bg-neutral-900 border border-neutral-800 text-neutral-300 hover:bg-neutral-800 hover:text-white'
                        }`}
                      >
                        {size.replace('UK ', '')}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Features bullet list */}
              <div className="mt-4 pt-3 border-t border-neutral-800/80">
                <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-500 block mb-1.5">
                  Key Benefits
                </span>
                <ul className="text-xs text-neutral-400 space-y-1">
                  {product.features.map((feat, i) => (
                    <li key={i} className="flex items-start gap-1.5">
                      <span className="text-[#ff461e] font-bold">·</span>
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Action Button */}
            <div className="pt-2">
              <button
                type="button"
                onClick={handleAdd}
                disabled={buttonState !== 'idle'}
                className={`w-full py-3.5 px-6 rounded-xl font-bold uppercase tracking-wider text-xs sm:text-sm flex items-center justify-center gap-2 transition-all duration-300 cursor-pointer ${
                  buttonState === 'added'
                    ? 'bg-emerald-600 text-white'
                    : buttonState === 'adding'
                    ? 'bg-neutral-800 text-white cursor-wait'
                    : 'bg-white hover:bg-[#ff461e] text-black hover:text-white shadow-lg'
                }`}
              >
                {buttonState === 'adding' ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Adding...</span>
                  </>
                ) : buttonState === 'added' ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Added to Bag</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4" />
                    <span>Add to Bag · {selectedSize}</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
