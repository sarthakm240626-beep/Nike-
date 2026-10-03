import React from 'react';
import {
  ArrowUpDown,
  Filter,
  Flame,
  RotateCcw,
  Search,
  SlidersHorizontal,
  Tag,
  X,
} from 'lucide-react';
import {
  Category,
  ColorOption,
  GenderFilter,
  PriceRange,
  Product,
  ShoeSize,
  SilhouetteFilter,
  SortOption,
} from '../types';
import { ProductCard } from './ProductCard';

interface FilterSectionProps {
  products: Product[];
  totalProductsCount: number;
  selectedCategory: Category;
  setSelectedCategory: (cat: Category) => void;
  selectedGender: GenderFilter;
  setSelectedGender: (gender: GenderFilter) => void;
  selectedSilhouette: SilhouetteFilter;
  setSelectedSilhouette: (sil: SilhouetteFilter) => void;
  selectedColor: ColorOption;
  setSelectedColor: (color: ColorOption) => void;
  selectedPrice: PriceRange;
  setSelectedPrice: (price: PriceRange) => void;
  selectedSize: ShoeSize;
  setSelectedSize: (size: ShoeSize) => void;
  onlySale: boolean;
  setOnlySale: (val: boolean | ((prev: boolean) => boolean)) => void;
  sortBy: SortOption;
  setSortBy: (sort: SortOption) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  onViewProduct: (product: Product) => void;
  onQuickAdd: (product: Product, size: string) => void;
  wishlistIds: string[];
  onToggleWishlist: (product: Product) => void;
  onResetFilters: () => void;
}

const CATEGORIES: Category[] = [
  'All',
  'Road Running',
  'Training & Gym',
  'Lifestyle & Sneakers',
  'Basketball',
  'Skateboarding & Court',
  'Sportswear & Classics',
  'Easy-On & Slip-On',
];

const GENDERS: GenderFilter[] = ['All', 'Men', 'Women', 'Unisex'];

const SILHOUETTES: SilhouetteFilter[] = [
  'All',
  'Pegasus',
  'Air Max',
  'Revolution',
  'Quest',
  'Downshifter',
  'Court Vision',
  'SB Skate',
];

const COLORS: { name: ColorOption; bg: string; border: string }[] = [
  { name: 'All', bg: 'transparent', border: 'border-neutral-600' },
  { name: 'Black', bg: '#000000', border: 'border-neutral-700' },
  { name: 'White', bg: '#ffffff', border: 'border-neutral-400' },
  { name: 'Blue', bg: '#2563eb', border: 'border-blue-500' },
  { name: 'Grey', bg: '#71717a', border: 'border-neutral-500' },
  { name: 'Red', bg: '#ef4444', border: 'border-red-600' },
  { name: 'Green', bg: '#22c55e', border: 'border-green-500' },
  { name: 'Beige', bg: '#d4b996', border: 'border-amber-400' },
  { name: 'Orange', bg: '#f97316', border: 'border-orange-500' },
];

const PRICE_OPTIONS: { id: PriceRange; label: string }[] = [
  { id: 'All', label: 'All Prices' },
  { id: 'under-3500', label: 'Under ₹3,500' },
  { id: '3500-5000', label: '₹3,500 – ₹5,000' },
  { id: '5000-8000', label: '₹5,000 – ₹8,000' },
  { id: '8000-12000', label: '₹8,000 – ₹12,000' },
  { id: 'above-12000', label: 'Above ₹12,000' },
];

const SIZES: ShoeSize[] = ['All', 'UK 6', 'UK 7', 'UK 8', 'UK 9', 'UK 10', 'UK 11'];

export const FilterSection: React.FC<FilterSectionProps> = ({
  products,
  totalProductsCount,
  selectedCategory,
  setSelectedCategory,
  selectedGender,
  setSelectedGender,
  selectedSilhouette,
  setSelectedSilhouette,
  selectedColor,
  setSelectedColor,
  selectedPrice,
  setSelectedPrice,
  selectedSize,
  setSelectedSize,
  onlySale,
  setOnlySale,
  sortBy,
  setSortBy,
  searchQuery,
  setSearchQuery,
  onViewProduct,
  onQuickAdd,
  wishlistIds,
  onToggleWishlist,
  onResetFilters,
}) => {
  const isAnyFilterActive =
    selectedCategory !== 'All' ||
    selectedGender !== 'All' ||
    selectedSilhouette !== 'All' ||
    selectedColor !== 'All' ||
    selectedPrice !== 'All' ||
    selectedSize !== 'All' ||
    onlySale ||
    searchQuery.trim().length > 0;

  return (
    <section id="shop-all" className="py-16 bg-[#09090b] border-t border-neutral-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header & Search */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#ff461e] mb-1.5">
              <span>Dynamic Storefront</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#ff461e]" />
              <span>Full Nike Catalog</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold uppercase tracking-tight text-white font-headline">
              BROWSE BY DISCIPLINE & OPTIONS
            </h2>
            <p className="text-sm text-neutral-400 mt-1 max-w-xl">
              Filter through genuine Nike road runners, court classics, Max Air cushions, and gym trainers with fine-grained control.
            </p>
          </div>

          {/* Quick Search & Sort Control */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <div className="relative w-full sm:w-64">
              <Search className="w-4 h-4 text-neutral-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search models, colorways..."
                className="w-full bg-[#141417] border border-neutral-800 rounded-lg pl-9 pr-8 py-2 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-[#ff461e] transition-colors"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-white"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Sort Dropdown */}
            <div className="relative shrink-0">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
                className="w-full sm:w-auto bg-[#141417] border border-neutral-800 text-neutral-200 text-xs font-semibold rounded-lg px-3.5 py-2 pr-8 appearance-none focus:outline-none focus:border-[#ff461e] cursor-pointer"
              >
                <option value="featured">Sort: Featured</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating">Top Customer Rated</option>
                <option value="discount">Biggest Discount</option>
              </select>
              <ArrowUpDown className="w-3.5 h-3.5 text-neutral-500 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Filter Controls Box */}
        <div className="bg-[#121215] border border-neutral-800 rounded-xl p-5 mb-8 shadow-xl space-y-6">
          {/* 1. CATEGORY BUTTONS */}
          <div>
            <div className="flex items-center justify-between mb-2.5">
              <span className="text-xs font-bold uppercase tracking-wider text-neutral-400">
                Primary Categories
              </span>
              <span className="text-xs text-neutral-500">{selectedCategory}</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {CATEGORIES.map((cat) => {
                const isActive = selectedCategory === cat;
                return (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all duration-200 cursor-pointer ${
                      isActive
                        ? 'bg-white text-black shadow-md shadow-white/10'
                        : 'bg-neutral-900 border border-neutral-800 text-neutral-300 hover:bg-neutral-800 hover:text-white'
                    }`}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>
          </div>

          {/* 2. GENDER & SILHOUETTE ROW */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-neutral-800/80">
            {/* Gender Options */}
            <div>
              <span className="block text-xs font-bold uppercase tracking-wider text-neutral-400 mb-2.5">
                Gender / Fit
              </span>
              <div className="flex flex-wrap gap-2">
                {GENDERS.map((gender) => {
                  const isActive = selectedGender === gender;
                  return (
                    <button
                      key={gender}
                      type="button"
                      onClick={() => setSelectedGender(gender)}
                      className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all duration-200 cursor-pointer ${
                        isActive
                          ? 'bg-[#ff461e] text-white shadow-md shadow-[#ff461e]/20'
                          : 'bg-neutral-900 border border-neutral-800 text-neutral-300 hover:bg-neutral-800 hover:text-white'
                      }`}
                    >
                      {gender === 'All' ? 'All Genders' : gender}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Silhouette / Line Options */}
            <div>
              <span className="block text-xs font-bold uppercase tracking-wider text-neutral-400 mb-2.5">
                Shoe Line / Model
              </span>
              <div className="flex flex-wrap gap-2">
                {SILHOUETTES.map((sil) => {
                  const isActive = selectedSilhouette === sil;
                  return (
                    <button
                      key={sil}
                      type="button"
                      onClick={() => setSelectedSilhouette(sil)}
                      className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all duration-200 cursor-pointer ${
                        isActive
                          ? 'bg-white text-black shadow-md'
                          : 'bg-neutral-900 border border-neutral-800 text-neutral-300 hover:bg-neutral-800 hover:text-white'
                      }`}
                    >
                      {sil}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* 3. COLOR SELECTOR */}
          <div className="pt-4 border-t border-neutral-800/80">
            <div className="flex items-center justify-between mb-2.5">
              <span className="text-xs font-bold uppercase tracking-wider text-neutral-400">
                Color Options
              </span>
              <span className="text-xs text-neutral-500">{selectedColor}</span>
            </div>
            <div className="flex flex-wrap items-center gap-2.5">
              {COLORS.map((color) => {
                const isActive = selectedColor === color.name;
                return (
                  <button
                    key={color.name}
                    type="button"
                    onClick={() => setSelectedColor(color.name)}
                    className={`group flex items-center gap-2 px-3 py-1.5 rounded-lg border text-xs font-medium transition-all duration-200 cursor-pointer ${
                      isActive
                        ? 'bg-neutral-800 border-[#ff461e] text-white ring-1 ring-[#ff461e]'
                        : 'bg-neutral-900 border-neutral-800 text-neutral-300 hover:border-neutral-700 hover:text-white'
                    }`}
                  >
                    {color.name === 'All' ? (
                      <span className="w-3.5 h-3.5 rounded-full border border-dashed border-neutral-400 flex items-center justify-center text-[9px] text-neutral-400">
                        *
                      </span>
                    ) : (
                      <span
                        className={`w-3.5 h-3.5 rounded-full ${color.border} border`}
                        style={{ backgroundColor: color.bg }}
                      />
                    )}
                    <span>{color.name}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 4. PRICE RANGE, SIZE, AND DEALS TOGGLE */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 pt-4 border-t border-neutral-800/80 items-center">
            {/* Price Brackets */}
            <div className="md:col-span-6">
              <span className="block text-xs font-bold uppercase tracking-wider text-neutral-400 mb-2.5">
                Price Brackets
              </span>
              <div className="flex flex-wrap gap-2">
                {PRICE_OPTIONS.map((price) => {
                  const isActive = selectedPrice === price.id;
                  return (
                    <button
                      key={price.id}
                      type="button"
                      onClick={() => setSelectedPrice(price.id)}
                      className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all duration-200 cursor-pointer ${
                        isActive
                          ? 'bg-[#ff461e] text-white shadow-md shadow-[#ff461e]/20'
                          : 'bg-neutral-900 border border-neutral-800 text-neutral-300 hover:bg-neutral-800 hover:text-white'
                      }`}
                    >
                      {price.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Sizes */}
            <div className="md:col-span-4">
              <span className="block text-xs font-bold uppercase tracking-wider text-neutral-400 mb-2.5">
                Shoe Size (UK)
              </span>
              <div className="flex flex-wrap gap-2">
                {SIZES.map((size) => {
                  const isActive = selectedSize === size;
                  return (
                    <button
                      key={size}
                      type="button"
                      onClick={() => setSelectedSize(size)}
                      className={`w-11 h-8 text-xs font-semibold rounded-lg flex items-center justify-center transition-all duration-200 cursor-pointer ${
                        isActive
                          ? 'bg-white text-black font-bold shadow-md shadow-white/10'
                          : 'bg-neutral-900 border border-neutral-800 text-neutral-300 hover:bg-neutral-800 hover:text-white'
                      }`}
                    >
                      {size === 'All' ? 'All' : size.replace('UK ', '')}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Deals / Sale Toggle */}
            <div className="md:col-span-2 flex flex-col justify-center">
              <span className="block text-xs font-bold uppercase tracking-wider text-neutral-400 mb-2.5">
                Special Offers
              </span>
              <button
                type="button"
                onClick={() => setOnlySale((prev) => !prev)}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  onlySale
                    ? 'bg-red-500/20 text-[#ff461e] border border-[#ff461e]'
                    : 'bg-neutral-900 text-neutral-400 border border-neutral-800 hover:text-white'
                }`}
              >
                <Flame className={`w-4 h-4 ${onlySale ? 'text-[#ff461e]' : 'text-neutral-500'}`} />
                <span>On Sale Only</span>
              </button>
            </div>
          </div>

          {/* Active Filter Badges */}
          {isAnyFilterActive && (
            <div className="mt-5 pt-4 border-t border-neutral-800 flex flex-wrap items-center justify-between gap-3 text-xs">
              <div className="flex flex-wrap items-center gap-2 text-neutral-400">
                <span className="font-semibold text-neutral-500">Active filters:</span>
                {selectedCategory !== 'All' && (
                  <span className="bg-neutral-800 text-neutral-200 px-2 py-0.5 rounded flex items-center gap-1">
                    {selectedCategory}
                    <button type="button" onClick={() => setSelectedCategory('All')}>
                      <X className="w-3 h-3 hover:text-white" />
                    </button>
                  </span>
                )}
                {selectedGender !== 'All' && (
                  <span className="bg-neutral-800 text-neutral-200 px-2 py-0.5 rounded flex items-center gap-1">
                    Gender: {selectedGender}
                    <button type="button" onClick={() => setSelectedGender('All')}>
                      <X className="w-3 h-3 hover:text-white" />
                    </button>
                  </span>
                )}
                {selectedSilhouette !== 'All' && (
                  <span className="bg-neutral-800 text-neutral-200 px-2 py-0.5 rounded flex items-center gap-1">
                    Model: {selectedSilhouette}
                    <button type="button" onClick={() => setSelectedSilhouette('All')}>
                      <X className="w-3 h-3 hover:text-white" />
                    </button>
                  </span>
                )}
                {selectedColor !== 'All' && (
                  <span className="bg-neutral-800 text-neutral-200 px-2 py-0.5 rounded flex items-center gap-1">
                    Color: {selectedColor}
                    <button type="button" onClick={() => setSelectedColor('All')}>
                      <X className="w-3 h-3 hover:text-white" />
                    </button>
                  </span>
                )}
                {selectedPrice !== 'All' && (
                  <span className="bg-neutral-800 text-neutral-200 px-2 py-0.5 rounded flex items-center gap-1">
                    {PRICE_OPTIONS.find((p) => p.id === selectedPrice)?.label}
                    <button type="button" onClick={() => setSelectedPrice('All')}>
                      <X className="w-3 h-3 hover:text-white" />
                    </button>
                  </span>
                )}
                {selectedSize !== 'All' && (
                  <span className="bg-neutral-800 text-neutral-200 px-2 py-0.5 rounded flex items-center gap-1">
                    Size: {selectedSize}
                    <button type="button" onClick={() => setSelectedSize('All')}>
                      <X className="w-3 h-3 hover:text-white" />
                    </button>
                  </span>
                )}
                {onlySale && (
                  <span className="bg-red-500/20 text-[#ff461e] border border-[#ff461e]/40 px-2 py-0.5 rounded flex items-center gap-1">
                    On Sale Deals
                    <button type="button" onClick={() => setOnlySale(false)}>
                      <X className="w-3 h-3 hover:text-white" />
                    </button>
                  </span>
                )}
                {searchQuery && (
                  <span className="bg-neutral-800 text-neutral-200 px-2 py-0.5 rounded flex items-center gap-1">
                    "{searchQuery}"
                    <button type="button" onClick={() => setSearchQuery('')}>
                      <X className="w-3 h-3 hover:text-white" />
                    </button>
                  </span>
                )}
              </div>

              <button
                type="button"
                onClick={onResetFilters}
                className="inline-flex items-center gap-1.5 text-xs text-neutral-400 hover:text-[#ff461e] transition-colors cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset all filters</span>
              </button>
            </div>
          )}
        </div>

        {/* Counter and Status */}
        <div className="flex items-center justify-between mb-6 text-xs text-neutral-400">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-white font-mono tabular-nums text-sm">
              {products.length}
            </span>
            <span>of {totalProductsCount} Nike sneakers shown</span>
          </div>
          <span className="text-neutral-500 hidden sm:inline">
            Free shipping on orders over ₹5,000 · Easy 30-day returns
          </span>
        </div>

        {/* Products Grid */}
        {products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 transition-all duration-300">
            {products.map((product) => (
              <div
                key={product.id}
                className="transition-all duration-300 transform opacity-100 translate-y-0"
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
        ) : (
          /* Empty State */
          <div className="py-16 text-center bg-[#121215] border border-neutral-800/80 rounded-xl px-4">
            <div className="w-12 h-12 rounded-full bg-neutral-800 flex items-center justify-center mx-auto mb-4 text-neutral-400">
              <SlidersHorizontal className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white uppercase font-headline">
              No sneakers match your filters
            </h3>
            <p className="text-xs text-neutral-400 max-w-md mx-auto mt-1 mb-5">
              Try adjusting your category, colorway, price bracket, or silhouette options to discover more footwear models.
            </p>
            <button
              type="button"
              onClick={onResetFilters}
              className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-black bg-white rounded-lg hover:bg-neutral-200 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Clear all filters</span>
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
