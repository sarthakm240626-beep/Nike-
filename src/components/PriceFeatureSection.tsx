import React from 'react';
import { ArrowRight, Zap, Award, ShieldCheck, Flame, Sparkles } from 'lucide-react';
import { PRICE_TIERS_INFO } from '../data/products';
import { PriceRange } from '../types';

interface PriceFeatureSectionProps {
  onSelectPriceTier: (tier: PriceRange) => void;
  selectedPrice: PriceRange;
}

export const PriceFeatureSection: React.FC<PriceFeatureSectionProps> = ({
  onSelectPriceTier,
  selectedPrice,
}) => {
  const getIcon = (tier: string) => {
    switch (tier) {
      case 'under-3500':
        return <ShieldCheck className="w-5 h-5 text-neutral-300" />;
      case '3500-5000':
        return <Sparkles className="w-5 h-5 text-sky-400" />;
      case '5000-8000':
        return <Flame className="w-5 h-5 text-[#ff461e]" />;
      case '8000-12000':
        return <Zap className="w-5 h-5 text-purple-400" />;
      case 'above-12000':
        return <Award className="w-5 h-5 text-amber-400" />;
      default:
        return <Zap className="w-5 h-5 text-[#ff461e]" />;
    }
  };

  const handleCardClick = (tier: PriceRange) => {
    onSelectPriceTier(tier);
    const element = document.getElementById('shop-all');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="py-20 bg-[#0c0c0f] border-t border-neutral-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#ff461e] mb-2">
            <span>Engineering & Value</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#ff461e]" />
            <span>Range Guide</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold uppercase tracking-tight text-white font-headline">
            PRECISION BY PRICE
          </h2>
          <p className="text-sm text-neutral-400 mt-2">
            Every Nike sneaker delivers purposeful innovation. Select any price bracket below to explore matching footwear engineered for your training or lifestyle demands.
          </p>
        </div>

        {/* 5 Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {PRICE_TIERS_INFO.map((tierInfo) => {
            const isSelected = selectedPrice === tierInfo.tier;
            return (
              <div
                key={tierInfo.tier}
                onClick={() => handleCardClick(tierInfo.tier)}
                className={`group relative flex flex-col justify-between p-5 rounded-xl border transition-all duration-300 cursor-pointer hover:-translate-y-1.5 hover:shadow-[0_16px_36px_rgba(0,0,0,0.65)] ${
                  isSelected
                    ? 'bg-[#18181d] border-[#ff461e] shadow-lg shadow-[#ff461e]/10'
                    : 'bg-[#121215] border-neutral-800 hover:border-neutral-600'
                }`}
              >
                <div>
                  {/* Top indicator & Price badge */}
                  <div className="flex items-center justify-between mb-3">
                    <span className="w-9 h-9 rounded-lg bg-neutral-900 border border-neutral-800 flex items-center justify-center">
                      {getIcon(tierInfo.tier)}
                    </span>
                    <span className="text-[11px] font-mono font-semibold text-neutral-400 uppercase tracking-wider">
                      {tierInfo.rangeLabel}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-lg font-bold uppercase text-white font-headline tracking-tight group-hover:text-neutral-100 mb-1.5">
                    {tierInfo.title}
                  </h3>

                  {/* Description */}
                  <p className="text-xs leading-relaxed text-neutral-400 line-clamp-3">
                    {tierInfo.description}
                  </p>
                </div>

                {/* Footer action */}
                <div className="pt-4 mt-4 border-t border-neutral-800/80 flex items-center justify-between text-xs font-semibold">
                  <span className={isSelected ? 'text-[#ff461e]' : 'text-neutral-300 group-hover:text-white'}>
                    {isSelected ? 'Active Tier' : 'Explore'}
                  </span>
                  <div className="w-6 h-6 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center group-hover:bg-[#ff461e] group-hover:border-[#ff461e] group-hover:text-white transition-colors duration-200">
                    <ArrowRight className="w-3 h-3 text-neutral-400 group-hover:text-white group-hover:translate-x-0.5 transition-all duration-200" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
