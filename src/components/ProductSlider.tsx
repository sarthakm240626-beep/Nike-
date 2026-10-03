import React, { useRef, useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';
import { Product } from '../types';
import { ProductCard } from './ProductCard';

interface ProductSliderProps {
  products: Product[];
  onViewProduct: (product: Product) => void;
  onQuickAdd: (product: Product, size: string) => void;
  wishlistIds: string[];
  onToggleWishlist: (product: Product) => void;
}

export const ProductSlider: React.FC<ProductSliderProps> = ({
  products,
  onViewProduct,
  onQuickAdd,
  wishlistIds,
  onToggleWishlist,
}) => {
  const sliderRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeftState, setScrollLeftState] = useState(0);

  const checkScroll = () => {
    if (!sliderRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = sliderRef.current;
    setCanScrollLeft(scrollLeft > 10);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
  };

  useEffect(() => {
    const el = sliderRef.current;
    if (!el) return;
    checkScroll();
    el.addEventListener('scroll', checkScroll, { passive: true });
    window.addEventListener('resize', checkScroll);
    return () => {
      el.removeEventListener('scroll', checkScroll);
      window.removeEventListener('resize', checkScroll);
    };
  }, [products]);

  const scroll = (direction: 'left' | 'right') => {
    if (!sliderRef.current) return;
    const clientWidth = sliderRef.current.clientWidth;
    const scrollAmount = direction === 'left' ? -clientWidth * 0.8 : clientWidth * 0.8;
    sliderRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
  };

  // Mouse drag handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!sliderRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - sliderRef.current.offsetLeft);
    setScrollLeftState(sliderRef.current.scrollLeft);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !sliderRef.current) return;
    e.preventDefault();
    const x = e.pageX - sliderRef.current.offsetLeft;
    const walk = (x - startX) * 1.5;
    sliderRef.current.scrollLeft = scrollLeftState - walk;
  };

  const handleMouseUpOrLeave = () => {
    setIsDragging(false);
  };

  return (
    <section id="collection" className="py-16 border-t border-neutral-800/80 bg-[#0c0c0f]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header with Title and Slider Navigation Buttons */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#ff461e] mb-1.5">
              <span>Performance Footwear</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#ff461e]" />
              <span>Trending Now</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold uppercase tracking-tight text-white font-headline">
              EXPLORE THE COLLECTION
            </h2>
            <p className="text-sm text-neutral-400 mt-1 max-w-xl">
              Curated everyday movement sneakers. Engineered for road runs, city sessions, and signature street style.
            </p>
          </div>

          {/* Navigation Controls: ← Previous / Next → */}
          <div className="flex items-center gap-2.5 self-start sm:self-auto">
            <button
              type="button"
              onClick={() => scroll('left')}
              disabled={!canScrollLeft}
              aria-label="Previous sneakers"
              className={`w-11 h-11 rounded-full border flex items-center justify-center transition-all duration-200 ${
                canScrollLeft
                  ? 'border-neutral-700 bg-neutral-900 text-white hover:bg-neutral-800 hover:border-neutral-500 hover:scale-105 active:scale-95'
                  : 'border-neutral-800 bg-neutral-950 text-neutral-600 cursor-not-allowed opacity-50'
              }`}
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              type="button"
              onClick={() => scroll('right')}
              disabled={!canScrollRight}
              aria-label="Next sneakers"
              className={`w-11 h-11 rounded-full border flex items-center justify-center transition-all duration-200 ${
                canScrollRight
                  ? 'border-neutral-700 bg-neutral-900 text-white hover:bg-neutral-800 hover:border-neutral-500 hover:scale-105 active:scale-95'
                  : 'border-neutral-800 bg-neutral-950 text-neutral-600 cursor-not-allowed opacity-50'
              }`}
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Horizontal Slider Track */}
        <div
          ref={sliderRef}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUpOrLeave}
          onMouseLeave={handleMouseUpOrLeave}
          className={`flex gap-5 overflow-x-auto pb-4 pt-2 no-scrollbar select-none snap-x snap-mandatory ${
            isDragging ? 'cursor-grabbing scroll-auto' : 'cursor-grab'
          }`}
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {products.map((product) => (
            <div
              key={product.id}
              className="shrink-0 w-[84vw] sm:w-[46vw] md:w-[31vw] lg:w-[23.5vw] max-w-[320px] snap-start"
            >
              <ProductCard
                product={product}
                onViewProduct={onViewProduct}
                onQuickAdd={onQuickAdd}
                isWishlisted={wishlistIds.includes(product.id)}
                onToggleWishlist={onToggleWishlist}
              />
            </div>
          ))}
        </div>

        {/* Mobile Swipe Hint */}
        <div className="flex items-center justify-between mt-4 text-xs text-neutral-500 sm:hidden">
          <span>Swipe horizontally or tap arrows</span>
          <span className="font-mono tabular-nums">{products.length} models</span>
        </div>
      </div>
    </section>
  );
};
