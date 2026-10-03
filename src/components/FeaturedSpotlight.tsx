import React, { useState } from 'react';
import { SNEAKER_IMAGES } from '../data/imageAssets';
import { Check, Heart, Shield, ShoppingBag, Star, Zap } from 'lucide-react';
import { Product } from '../types';

interface FeaturedSpotlightProps {
  products: Product[];
  onAddToCart: (product: Product, size: string) => void;
  isWishlisted: boolean;
  onToggleWishlist: (product: Product) => void;
  onOpenSizeGuide: () => void;
}

const SIZES = ['UK 6', 'UK 7', 'UK 8', 'UK 9', 'UK 10', 'UK 11'];

export const FeaturedSpotlight: React.FC<FeaturedSpotlightProps> = ({
  products,
  onAddToCart,
  isWishlisted,
  onToggleWishlist,
  onOpenSizeGuide,
}) => {
  // Let's use the first product as featured, with capability to select colorway variants
  const featuredProductList = products.slice(0, 4);
  const [selectedProductIndex, setSelectedProductIndex] = useState(0);
  const currentProduct = featuredProductList[selectedProductIndex] || products[0];

  const [selectedSize, setSelectedSize] = useState<string>('UK 8');
  const [buttonState, setButtonState] = useState<'idle' | 'adding' | 'added'>('idle');

  const handleAddToBag = () => {
    if (buttonState !== 'idle') return;
    setButtonState('adding');
    setTimeout(() => {
      onAddToCart(currentProduct, selectedSize);
      setButtonState('added');
      setTimeout(() => {
        setButtonState('idle');
      }, 2200);
    }, 350);
  };

  return (
    <section className="py-20 bg-[#09090c] border-t border-neutral-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#ff461e] mb-3">
          <span>Spotlight Selection</span>
          <span className="w-1.5 h-1.5 rounded-full bg-[#ff461e]" />
          <span>Editor's Choice</span>
        </div>

        <div className="bg-[#121216] border border-neutral-800 rounded-2xl overflow-hidden shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
            {/* LEFT COLUMN: Large normal static sneaker image */}
            <div className="lg:col-span-7 bg-[#0f0f13] p-8 sm:p-12 lg:p-16 flex items-center justify-center relative border-b lg:border-b-0 lg:border-r border-neutral-800/80">
              {/* Static Product Image - NO ANIMATION, NO TRANSFORMATION */}
              <div className="w-full max-w-lg aspect-[4/3] flex items-center justify-center">
                <img
                  src={currentProduct.image}
                  alt={currentProduct.name}
                  loading="eager"
                  decoding="async"
                  onError={(e) => {
                    const target = e.currentTarget;
                    if (!target.dataset.fallbackTried) {
                      target.dataset.fallbackTried = 'true';
                      target.src = SNEAKER_IMAGES.questCrimson;
                    }
                  }}
                  className="w-full h-full object-contain pointer-events-none select-none"
                />
              </div>

              {/* Wishlist quick toggle */}
              <button
                type="button"
                onClick={() => onToggleWishlist(currentProduct)}
                className={`absolute top-6 right-6 w-10 h-10 rounded-full flex items-center justify-center transition-colors duration-200 backdrop-blur-sm border ${
                  isWishlisted
                    ? 'bg-[#ff461e] border-[#ff461e] text-white'
                    : 'bg-neutral-900/90 border-neutral-700 text-neutral-400 hover:text-white hover:bg-neutral-800'
                }`}
                title="Save to Wishlist"
              >
                <Heart className="w-4 h-4" fill={isWishlisted ? 'currentColor' : 'none'} />
              </button>
            </div>

            {/* RIGHT COLUMN: Details & Controls */}
            <div className="lg:col-span-5 p-8 sm:p-10 flex flex-col justify-between space-y-6">
              <div>
                {/* Category & Badge */}
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#ff461e]">
                    {currentProduct.category} · Road Running
                  </span>
                  <div className="flex items-center gap-1 text-xs text-amber-400">
                    <Star className="w-3.5 h-3.5 fill-current" />
                    <span className="font-semibold text-neutral-200 tabular-nums">{currentProduct.rating}</span>
                    <span className="text-neutral-500">({currentProduct.reviewsCount})</span>
                  </div>
                </div>

                {/* Product Name */}
                <h3 className="text-2xl sm:text-3xl font-extrabold uppercase text-white font-headline tracking-tight">
                  {currentProduct.name}
                </h3>

                {/* Price Display */}
                <div className="flex items-baseline gap-3 mt-2 mb-4">
                  <span className="text-2xl sm:text-3xl font-bold text-white tabular-nums tracking-tight">
                    ₹{currentProduct.price.toLocaleString('en-IN')}
                  </span>
                  {currentProduct.originalPrice && (
                    <span className="text-sm text-neutral-500 line-through tabular-nums">
                      ₹{currentProduct.originalPrice.toLocaleString('en-IN')}
                    </span>
                  )}
                  <span className="text-xs text-emerald-400 font-medium">Free Delivery</span>
                </div>

                {/* Description */}
                <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
                  {currentProduct.description}
                </p>

                {/* COLOR OPTIONS SELECTOR */}
                <div className="mt-6 pt-5 border-t border-neutral-800">
                  <div className="flex items-center justify-between mb-2.5">
                    <span className="text-xs font-bold uppercase tracking-wider text-neutral-400">
                      Colorway
                    </span>
                    <span className="text-xs text-neutral-400 font-medium truncate max-w-[200px]">
                      {currentProduct.colorName}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    {featuredProductList.map((variant, idx) => {
                      const isActive = selectedProductIndex === idx;
                      return (
                        <button
                          key={variant.id}
                          type="button"
                          onClick={() => setSelectedProductIndex(idx)}
                          className={`relative w-12 h-12 rounded-lg overflow-hidden border transition-all duration-200 bg-neutral-900 cursor-pointer ${
                            isActive
                              ? 'border-[#ff461e] ring-2 ring-[#ff461e]/40 scale-105'
                              : 'border-neutral-700 hover:border-neutral-500 opacity-70 hover:opacity-100'
                          }`}
                          title={variant.colorName}
                        >
                          <img
                            src={variant.image}
                            alt={variant.name}
                            loading="eager"
                            onError={(e) => {
                              const target = e.currentTarget;
                              if (!target.dataset.fallbackTried) {
                                target.dataset.fallbackTried = 'true';
                                target.src = SNEAKER_IMAGES.questCrimson;
                              }
                            }}
                            className="w-full h-full object-cover pointer-events-none"
                          />
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* SIZE SELECTOR */}
                <div className="mt-6">
                  <div className="flex items-center justify-between mb-2.5">
                    <span className="text-xs font-bold uppercase tracking-wider text-neutral-400">
                      Select Size (UK)
                    </span>
                    <button
                      type="button"
                      onClick={onOpenSizeGuide}
                      className="text-xs text-neutral-400 hover:text-white cursor-pointer underline flex items-center gap-1 transition-colors"
                    >
                      Size Guide (UK/US/EU)
                    </button>
                  </div>
                  <div className="grid grid-cols-6 gap-2">
                    {SIZES.map((size) => {
                      const isSelected = selectedSize === size;
                      return (
                        <button
                          key={size}
                          type="button"
                          onClick={() => setSelectedSize(size)}
                          className={`h-11 rounded-lg text-xs font-semibold flex items-center justify-center transition-all duration-200 cursor-pointer ${
                            isSelected
                              ? 'bg-white text-black font-bold shadow-lg shadow-white/10 ring-2 ring-white'
                              : 'bg-neutral-900 border border-neutral-800 text-neutral-300 hover:bg-neutral-800 hover:border-neutral-700 hover:text-white'
                          }`}
                        >
                          {size.replace('UK ', '')}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* ADD TO BAG BUTTON WITH ANIMATION & FEEDBACK */}
              <div className="space-y-3 pt-4">
                <button
                  type="button"
                  onClick={handleAddToBag}
                  disabled={buttonState !== 'idle'}
                  className={`w-full py-4 px-6 rounded-xl font-bold uppercase tracking-wider text-sm flex items-center justify-center gap-2.5 transition-all duration-300 shadow-xl cursor-pointer ${
                    buttonState === 'added'
                      ? 'bg-emerald-600 text-white shadow-emerald-900/30'
                      : buttonState === 'adding'
                      ? 'bg-neutral-800 text-white cursor-wait'
                      : 'bg-white hover:bg-[#ff461e] text-black hover:text-white hover:scale-[1.01] active:scale-[0.99] shadow-white/5 hover:shadow-[#ff461e]/20'
                  }`}
                >
                  {buttonState === 'adding' ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>Adding to Bag...</span>
                    </>
                  ) : buttonState === 'added' ? (
                    <>
                      <Check className="w-5 h-5 text-white" />
                      <span>Added to Bag</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-4 h-4" />
                      <span>Add to Bag · {selectedSize}</span>
                    </>
                  )}
                </button>

                {/* Assurance points */}
                <div className="flex items-center justify-between text-[11px] text-neutral-400 pt-1">
                  <span className="flex items-center gap-1">
                    <Shield className="w-3.5 h-3.5 text-neutral-400" /> 100% Authentic Nike
                  </span>
                  <span className="flex items-center gap-1">
                    <Zap className="w-3.5 h-3.5 text-neutral-400" /> 30-Day Free Returns
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
