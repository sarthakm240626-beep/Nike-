import React from 'react';
import { ArrowRight, ChevronRight } from 'lucide-react';
import { SNEAKER_IMAGES } from '../data/imageAssets';

interface HeroProps {
  onShopClick: (gender?: 'Men' | 'Women') => void;
}

export const Hero: React.FC<HeroProps> = ({ onShopClick }) => {
  return (
    <section className="relative min-h-[88vh] flex items-center justify-center pt-24 pb-16 overflow-hidden bg-[#0b0b0e]">
      {/* Background subtle radial gradient for depth (NOT neon/excessive) */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-10%,rgba(255,70,30,0.08),rgba(11,11,14,0))] pointer-events-none" />

      {/* Grid pattern overlay */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(rgba(255, 255, 255, 0.4) 1px, transparent 0)',
          backgroundSize: '24px 24px',
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          {/* Left Column: Strong Headline, Supporting Text, and Interactive Buttons */}
          <div className="lg:col-span-6 flex flex-col justify-center text-left">
            {/* Top brand kicker */}
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#ff461e] mb-4 animate-hero-text">
              <span className="w-2 h-2 rounded-full bg-[#ff461e] animate-pulse" />
              <span>Nike Footwear Collection 2026</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black uppercase tracking-tight text-white font-headline leading-[0.92] text-balance mb-6 animate-hero-text">
              FIND YOUR <br />
              <span className="text-white hover:text-neutral-200 transition-colors">
                NEXT MOVE.
              </span>
            </h1>

            {/* Supporting Text */}
            <p className="text-base sm:text-lg text-neutral-400 font-normal leading-relaxed max-w-xl mb-8 animate-hero-subtext">
              Explore the latest Nike sneakers built for everyday movement. Engineered cushioning, lightweight breathability, and iconic street-level aesthetics.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 animate-hero-btn">
              {/* SHOP MEN BUTTON */}
              <button
                type="button"
                onClick={() => onShopClick('Men')}
                className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 bg-white text-black font-bold uppercase tracking-wider text-xs sm:text-sm rounded-xl transition-all duration-200 hover:bg-neutral-100 hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-white/5 cursor-pointer"
              >
                <span>SHOP MEN</span>
                <ArrowRight className="w-4 h-4 text-black transition-transform duration-200 group-hover:translate-x-1" />
              </button>

              {/* SHOP WOMEN BUTTON */}
              <button
                type="button"
                onClick={() => onShopClick('Women')}
                className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 bg-neutral-900 border border-neutral-700 text-white font-bold uppercase tracking-wider text-xs sm:text-sm rounded-xl transition-all duration-200 hover:bg-neutral-800 hover:border-neutral-500 hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
              >
                <span>SHOP WOMEN</span>
                <ArrowRight className="w-4 h-4 text-[#ff461e] transition-transform duration-200 group-hover:translate-x-1" />
              </button>
            </div>

            {/* Quiet trust markers */}
            <div className="flex items-center gap-4 sm:gap-6 mt-10 text-xs text-neutral-400 border-t border-neutral-800/80 pt-6">
              <span>Standard delivery on orders ₹4,000+</span>
              <span aria-hidden="true" className="text-neutral-700">·</span>
              <span>30-day return policy</span>
              <span aria-hidden="true" className="text-neutral-700 hidden sm:inline">·</span>
              <span className="hidden sm:inline">Member rewards</span>
            </div>
          </div>

          {/* Right Column: Hero Sneaker Image (STATIC, FADE/SLIDE REVEAL ON LOAD ONCE) */}
          <div className="lg:col-span-6 flex items-center justify-center relative animate-hero-image">
            <div className="relative w-full max-w-xl aspect-[4/3] flex items-center justify-center">
              {/* Soft spotlight circular background for high-contrast presentation */}
              <div className="absolute inset-0 bg-neutral-900/60 rounded-3xl border border-neutral-800/60" />

              {/* NORMAL STATIC SNEAKER IMAGE - NO ROTATION, NO DISTORTION, NO PERSPECTIVE SHIFT */}
              <img
                src={SNEAKER_IMAGES.questCrimson}
                alt="Nike Quest 5 Midnight Crimson featured running sneaker"
                loading="eager"
                decoding="async"
                onError={(e) => {
                  const target = e.currentTarget;
                  if (!target.dataset.fallbackTried) {
                    target.dataset.fallbackTried = 'true';
                    target.src = SNEAKER_IMAGES.questCrimson;
                  }
                }}
                className="relative z-10 w-full h-full object-contain p-6 sm:p-8 pointer-events-none select-none drop-shadow-[0_20px_35px_rgba(0,0,0,0.8)]"
              />

              {/* Quiet model tag on hero */}
              <div className="absolute bottom-5 left-6 z-20 flex items-center gap-2 bg-neutral-900/90 border border-neutral-800 backdrop-blur-md px-3 py-1.5 rounded-lg text-xs">
                <span className="font-semibold text-white">Nike Quest 5</span>
                <span className="text-neutral-400">·</span>
                <span className="text-neutral-400">Midnight Crimson</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
