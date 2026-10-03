import React from 'react';
import { MapPin, ArrowUp } from 'lucide-react';

interface FooterProps {
  onOpenOrders?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenOrders }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#08080a] text-neutral-400 border-t border-neutral-800/80 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 pb-12 border-b border-neutral-800">
          {/* Column 1: Featured / Actions */}
          <div className="col-span-2 md:col-span-1 space-y-3">
            <h4 className="text-xs font-black uppercase tracking-wider text-white font-headline">
              FEATURED
            </h4>
            <ul className="space-y-2 text-xs font-semibold text-neutral-300">
              <li>
                <a href="#collection" className="hover:text-white transition-colors">
                  FIND A STORE
                </a>
              </li>
              <li>
                <a href="#shop-all" className="hover:text-white transition-colors">
                  BECOME A MEMBER
                </a>
              </li>
              <li>
                <a href="#shop-all" className="hover:text-white transition-colors">
                  SIGN UP FOR EMAIL
                </a>
              </li>
              <li>
                <a href="#shop-all" className="hover:text-white transition-colors">
                  SEND US FEEDBACK
                </a>
              </li>
              <li>
                <a href="#shop-all" className="hover:text-[#ff461e] transition-colors">
                  STUDENT DISCOUNTS
                </a>
              </li>
            </ul>
          </div>

          {/* Column 2: GET HELP */}
          <div className="space-y-3">
            <h4 className="text-xs font-black uppercase tracking-wider text-white font-headline">
              GET HELP
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  type="button"
                  onClick={onOpenOrders}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Order Status
                </button>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Shipping & Delivery
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Returns & Exchanges
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Payment Options
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Contact Us
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: ABOUT NIKE */}
          <div className="space-y-3">
            <h4 className="text-xs font-black uppercase tracking-wider text-white font-headline">
              ABOUT NIKE
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  News & Innovations
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Careers
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Investors
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Sustainability
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Purpose & Impact
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: NIKE APPS */}
          <div className="space-y-3">
            <h4 className="text-xs font-black uppercase tracking-wider text-white font-headline">
              JOIN THE COMMUNITY
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Nike Training Club
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Nike Run Club
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  SNKRS Platform
                </a>
              </li>
            </ul>
          </div>

          {/* Column 5: Social Icons & Back to top */}
          <div className="col-span-2 md:col-span-1 flex flex-col justify-between items-start md:items-end">
            <div className="flex items-center gap-3">
              {/* X / Twitter */}
              <a
                href="#"
                aria-label="Nike on X"
                className="w-8 h-8 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>

              {/* Instagram */}
              <a
                href="#"
                aria-label="Nike on Instagram"
                className="w-8 h-8 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>

              {/* YouTube */}
              <a
                href="#"
                aria-label="Nike on YouTube"
                className="w-8 h-8 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              </a>
            </div>

            <button
              type="button"
              onClick={scrollToTop}
              className="mt-6 inline-flex items-center gap-1.5 text-xs text-neutral-400 hover:text-white transition-colors"
            >
              <span>Back to top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Bottom Legal & Region Row */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-500">
          <div className="flex items-center gap-2 text-neutral-300">
            <MapPin className="w-3.5 h-3.5 text-neutral-400" />
            <span>India</span>
            <span className="text-neutral-600">·</span>
            <span>© 2026 Nike, Inc. All Rights Reserved</span>
          </div>

          <div className="flex flex-wrap items-center gap-4 sm:gap-6">
            <a href="#" className="hover:text-neutral-300 transition-colors">Guides</a>
            <a href="#" className="hover:text-neutral-300 transition-colors">Terms of Sale</a>
            <a href="#" className="hover:text-neutral-300 transition-colors">Terms of Use</a>
            <a href="#" className="hover:text-neutral-300 transition-colors">Nike Privacy Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
