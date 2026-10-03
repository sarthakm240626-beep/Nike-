import React, { useEffect, useRef, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { Category } from '../types';
import { SNEAKER_IMAGES } from '../data/imageAssets';

interface CategorySectionsProps {
  onSelectCategory: (category: Category) => void;
}

const CATEGORY_DATA = [
  {
    category: 'Road Running' as Category,
    title: 'ROAD RUNNING',
    tagline: 'Engineered for Everyday Momentum & Milage',
    description: 'From 5K tempo runs to daily morning loops, experience responsive foam cushioning, dual Zoom Air units, and breathable engineered mesh designed to keep your stride feeling light and rhythmic.',
    image: SNEAKER_IMAGES.pegasusSunset,
    accentColor: '#ff461e',
    badge: 'Road & Speed',
  },
  {
    category: 'Training & Gym' as Category,
    title: 'TRAINING & GYM',
    tagline: 'Heavy Lifts, Turf Drills & High-Impact Stability',
    description: 'Featuring flat, stable wide outriggers and tuned Max Air heel chambers that lock you down for squats, deadlifts, sled pushes, and intense HIIT circuit training.',
    image: SNEAKER_IMAGES.alphaTrainerBlue,
    accentColor: '#2563eb',
    badge: 'Strength & Conditioning',
  },
  {
    category: 'Skateboarding & Court' as Category,
    title: 'COURT & RETRO SKATE',
    tagline: '80s Hardwood Heritage & Vulcanized Grip',
    description: 'Crisp leather uppers, classic cupsole traction, and durable suede overlays that transition effortlessly from half-pipes to metropolitan street style.',
    image: SNEAKER_IMAGES.courtVisionRetro,
    accentColor: '#ffffff',
    badge: 'Heritage & Street',
  },
  {
    category: 'Basketball' as Category,
    title: 'BASKETBALL',
    tagline: 'Instant Court Response & Lateral Lock',
    description: 'Low-to-the-ground court feel engineered for rapid changes of direction, decisive step-backs, and explosive first steps with locked-in containment.',
    image: SNEAKER_IMAGES.hoopsElite,
    accentColor: '#38bdf8',
    badge: 'Court Performance',
  },
];

export const CategorySections: React.FC<CategorySectionsProps> = ({ onSelectCategory }) => {
  const [visibleIndices, setVisibleIndices] = useState<number[]>([]);
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = Number(entry.target.getAttribute('data-index'));
          if (entry.isIntersecting && !visibleIndices.includes(index)) {
            setVisibleIndices((prev) => [...prev, index]);
          }
        });
      },
      { threshold: 0.15 }
    );

    sectionRefs.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [visibleIndices]);

  const handleExplore = (cat: Category) => {
    onSelectCategory(cat);
    const shopSection = document.getElementById('shop-all');
    if (shopSection) {
      shopSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="py-20 bg-[#09090b] border-t border-neutral-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#ff461e] mb-2">
            <span>Specialized Disciplines</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#ff461e]" />
            <span>Category Hub</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold uppercase tracking-tight text-white font-headline">
            DISCIPLINES IN MOTION
          </h2>
          <p className="text-sm text-neutral-400 mt-2">
            Explore dedicated footwear categories tuned for specific athletic demands and lifestyle expression.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="space-y-12">
          {CATEGORY_DATA.map((item, idx) => {
            const isVisible = visibleIndices.includes(idx);
            const isReverse = idx % 2 === 1;

            return (
              <div
                key={item.category}
                data-index={idx}
                ref={(el) => {
                  sectionRefs.current[idx] = el;
                }}
                className={`transition-all duration-700 transform ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
                }`}
              >
                <div className="bg-[#121216] border border-neutral-800 rounded-2xl overflow-hidden hover:border-neutral-700 transition-colors shadow-xl">
                  <div
                    className={`grid grid-cols-1 lg:grid-cols-12 items-stretch ${
                      isReverse ? 'lg:grid-flow-dense' : ''
                    }`}
                  >
                    {/* Normal Static Product Image Container */}
                    <div
                      className={`lg:col-span-6 bg-[#0f0f13] p-8 sm:p-12 flex items-center justify-center border-b lg:border-b-0 ${
                        isReverse
                          ? 'lg:col-start-7 lg:border-l border-neutral-800'
                          : 'lg:border-r border-neutral-800'
                      }`}
                    >
                      <div className="w-full max-w-md aspect-[4/3] flex items-center justify-center">
                        <img
                          src={item.image}
                          alt={`${item.title} footwear`}
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
                    </div>

                    {/* Text & Action Column */}
                    <div
                      className={`lg:col-span-6 p-8 sm:p-12 flex flex-col justify-between ${
                        isReverse ? 'lg:col-start-1' : ''
                      }`}
                    >
                      <div>
                        <div className="flex items-center gap-2 mb-3">
                          <span className="text-xs font-semibold uppercase tracking-wider text-neutral-400 bg-neutral-900 border border-neutral-800 px-2.5 py-1 rounded">
                            {item.badge}
                          </span>
                        </div>

                        <h3 className="text-4xl sm:text-5xl font-black uppercase text-white font-headline tracking-tight mb-2">
                          {item.title}
                        </h3>

                        <h4 className="text-base sm:text-lg font-semibold text-neutral-300 mb-4">
                          {item.tagline}
                        </h4>

                        <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed max-w-lg">
                          {item.description}
                        </p>
                      </div>

                      <div className="pt-8 mt-8 border-t border-neutral-800/80">
                        <button
                          type="button"
                          onClick={() => handleExplore(item.category)}
                          className="group inline-flex items-center gap-3 px-6 py-3.5 bg-neutral-900 hover:bg-white text-white hover:text-black border border-neutral-700 hover:border-white rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer shadow-md"
                        >
                          <span>Explore {item.title}</span>
                          <ArrowRight className="w-4 h-4 text-[#ff461e] group-hover:text-black group-hover:translate-x-1 transition-all duration-200" />
                        </button>
                      </div>
                    </div>
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
