import React, { useState, useEffect } from 'react';
import { Search, Heart, ShoppingBag, Menu, X, ArrowRight, User, Package } from 'lucide-react';
import { Category } from '../types';

interface NavbarProps {
  cartCount: number;
  wishlistCount: number;
  onOpenCart: () => void;
  onOpenWishlist: () => void;
  onOpenOrders: () => void;
  onSelectNavCategory: (navType: string) => void;
  onOpenSearch: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  cartCount,
  wishlistCount,
  onOpenCart,
  onOpenWishlist,
  onOpenOrders,
  onSelectNavCategory,
  onOpenSearch,
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [cartBadgePulse, setCartBadgePulse] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 24);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Trigger brief bounce/pulse on cart icon when count updates
  useEffect(() => {
    if (cartCount > 0) {
      setCartBadgePulse(true);
      const timer = setTimeout(() => setCartBadgePulse(false), 500);
      return () => clearTimeout(timer);
    }
  }, [cartCount]);

  const navLinks = [
    { label: 'NEW & FEATURED', action: () => onSelectNavCategory('NEW') },
    { label: 'MEN', action: () => onSelectNavCategory('MEN') },
    { label: 'WOMEN', action: () => onSelectNavCategory('WOMEN') },
    { label: 'KIDS', action: () => onSelectNavCategory('KIDS') },
    { label: 'SALE', action: () => onSelectNavCategory('SALE'), highlight: true },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 border-b ${
          scrolled
            ? 'py-3 bg-[#0a0a0d]/92 backdrop-blur-md border-neutral-800 shadow-xl'
            : 'py-5 bg-[#0b0b0e]/80 backdrop-blur-sm border-neutral-800/40'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-4">
            {/* ZONE 1: Brand Wordmark & Swoosh Icon */}
            <a
              href="#"
              className="flex items-center gap-2.5 text-white group cursor-pointer shrink-0"
              aria-label="Nike Home"
            >
              {/* Nike Swoosh SVG */}
              <svg
                viewBox="0 0 24 24"
                className="w-8 h-8 fill-current text-white transition-transform duration-200 group-hover:scale-105"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M21.707 5.293a1 1 0 0 0-1.414 0L7.5 18.086l-3.793-3.793a1 1 0 0 0-1.414 1.414l4.5 4.5a1 1 0 0 0 1.414 0l13.5-13.5a1 1 0 0 0 0-1.414z" />
                {/* Classic Swoosh geometry */}
                <path d="M21.71 7.04c-.33-.4-.84-.57-1.35-.45-3.08.76-7.85 2.51-11.83 5.48-2.6 1.94-4.52 4.14-5.55 6.36-.34.73-.24 1.58.26 2.22.49.63 1.27.95 2.07.86 2.22-.26 5.34-1.63 8.84-3.89 4.39-2.83 7.82-7.1 8.27-9.15.11-.51-.08-1.03-.41-1.43z" />
              </svg>
              <span className="text-xl sm:text-2xl font-black uppercase tracking-tighter text-white font-headline">
                NIKE
              </span>
            </a>

            {/* ZONE 2: Clean Navigation Links (Desktop) */}
            <nav className="hidden md:flex items-center gap-7 lg:gap-9 text-xs font-bold uppercase tracking-wider">
              {navLinks.map((item) => (
                <button
                  key={item.label}
                  type="button"
                  onClick={item.action}
                  className={`transition-colors duration-200 whitespace-nowrap cursor-pointer hover:text-white ${
                    item.highlight
                      ? 'text-[#ff461e] hover:text-[#ff6240]'
                      : 'text-neutral-300'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </nav>

            {/* ZONE 3: Utility Actions: Search, Wishlist, Cart, Mobile Menu */}
            <div className="flex items-center gap-2 sm:gap-3 shrink-0">
              {/* Search Button */}
              <button
                type="button"
                onClick={onOpenSearch}
                aria-label="Search sneakers"
                className="w-9 h-9 rounded-full flex items-center justify-center text-neutral-300 hover:text-white hover:bg-neutral-800 transition-colors duration-200 cursor-pointer"
              >
                <Search className="w-4 h-4" />
              </button>

              {/* Wishlist Button with Counter */}
              <button
                type="button"
                onClick={onOpenWishlist}
                aria-label="Saved sneakers"
                className="relative w-9 h-9 rounded-full flex items-center justify-center text-neutral-300 hover:text-white hover:bg-neutral-800 transition-colors duration-200 cursor-pointer"
              >
                <Heart className="w-4 h-4" />
                {wishlistCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 min-w-[17px] h-[17px] bg-[#ff461e] text-white text-[10px] font-bold rounded-full flex items-center justify-center px-1 tabular-nums shadow-sm">
                    {wishlistCount}
                  </span>
                )}
              </button>

              {/* Cart Button with Counter */}
              <button
                type="button"
                onClick={onOpenCart}
                aria-label="Shopping Bag"
                className={`relative w-9 h-9 rounded-full flex items-center justify-center text-neutral-300 hover:text-white hover:bg-neutral-800 transition-all duration-200 cursor-pointer ${
                  cartBadgePulse ? 'scale-110' : ''
                }`}
              >
                <ShoppingBag className="w-4 h-4" />
                {cartCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 min-w-[17px] h-[17px] bg-white text-black text-[10px] font-bold rounded-full flex items-center justify-center px-1 tabular-nums shadow-sm">
                    {cartCount}
                  </span>
                )}
              </button>

              {/* User Profile & Orders Button */}
              <button
                type="button"
                onClick={onOpenOrders}
                aria-label="My Orders & Profile"
                className="w-9 h-9 rounded-full flex items-center justify-center text-neutral-300 hover:text-white hover:bg-neutral-800 transition-colors duration-200 cursor-pointer"
                title="My Orders & Profile"
              >
                <User className="w-4 h-4" />
              </button>

              {/* Mobile Menu Trigger */}
              <button
                type="button"
                onClick={() => setMobileMenuOpen(true)}
                aria-label="Open navigation menu"
                className="md:hidden w-9 h-9 rounded-full flex items-center justify-center text-neutral-300 hover:text-white hover:bg-neutral-800 transition-colors duration-200"
              >
                <Menu className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden flex justify-end">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
            onClick={() => setMobileMenuOpen(false)}
          />

          {/* Drawer Body */}
          <div className="relative w-4/5 max-w-sm bg-[#101014] border-l border-neutral-800 h-full p-6 flex flex-col justify-between z-10 overflow-y-auto">
            <div>
              <div className="flex items-center justify-between pb-6 border-b border-neutral-800 mb-6">
                <span className="text-xl font-black uppercase tracking-tight text-white font-headline">
                  NIKE
                </span>
                <button
                  type="button"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-8 h-8 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center text-neutral-400 hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Navigation Items */}
              <div className="flex flex-col space-y-4">
                {navLinks.map((item) => (
                  <button
                    key={item.label}
                    type="button"
                    onClick={() => {
                      item.action();
                      setMobileMenuOpen(false);
                    }}
                    className={`flex items-center justify-between text-left py-2 font-bold uppercase tracking-wider text-sm transition-colors ${
                      item.highlight ? 'text-[#ff461e]' : 'text-neutral-200 hover:text-white'
                    }`}
                  >
                    <span>{item.label}</span>
                    <ArrowRight className="w-4 h-4 text-neutral-600" />
                  </button>
                ))}
              </div>

              <div className="mt-8 pt-6 border-t border-neutral-800 space-y-3">
                <button
                  type="button"
                  onClick={() => {
                    onOpenSearch();
                    setMobileMenuOpen(false);
                  }}
                  className="w-full flex items-center gap-3 py-2.5 px-3 rounded-lg bg-neutral-900 text-xs font-semibold text-neutral-300"
                >
                  <Search className="w-4 h-4 text-neutral-400" />
                  <span>Search sneakers</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    onOpenWishlist();
                    setMobileMenuOpen(false);
                  }}
                  className="w-full flex items-center justify-between py-2.5 px-3 rounded-lg bg-neutral-900 text-xs font-semibold text-neutral-300"
                >
                  <div className="flex items-center gap-3">
                    <Heart className="w-4 h-4 text-neutral-400" />
                    <span>Saved items</span>
                  </div>
                  <span className="font-mono tabular-nums text-neutral-500">{wishlistCount}</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    onOpenOrders();
                    setMobileMenuOpen(false);
                  }}
                  className="w-full flex items-center justify-between py-2.5 px-3 rounded-lg bg-neutral-900 text-xs font-semibold text-neutral-300"
                >
                  <div className="flex items-center gap-3">
                    <Package className="w-4 h-4 text-neutral-400" />
                    <span>My Orders & Profile</span>
                  </div>
                  <span className="text-[10px] text-[#ff461e] font-semibold">Active</span>
                </button>
              </div>
            </div>

            <div className="pt-6 border-t border-neutral-800 text-xs text-neutral-500">
              <p>Nike Store India · Customer Service: 1800-102-6453</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
