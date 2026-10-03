import React, { useState } from 'react';
import { X, Ruler, CheckCircle2, HelpCircle } from 'lucide-react';

interface SizeGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface SizeRow {
  uk: string;
  us: string;
  eu: string;
  cm: string;
  inches: string;
}

const MENS_SIZES: SizeRow[] = [
  { uk: '6', us: '6.5', eu: '39', cm: '24.5', inches: '9.6' },
  { uk: '6.5', us: '7.0', eu: '40', cm: '25.0', inches: '9.8' },
  { uk: '7', us: '7.5', eu: '40.5', cm: '25.5', inches: '10.0' },
  { uk: '7.5', us: '8.0', eu: '41', cm: '26.0', inches: '10.2' },
  { uk: '8', us: '8.5', eu: '42', cm: '26.5', inches: '10.4' },
  { uk: '8.5', us: '9.0', eu: '42.5', cm: '27.0', inches: '10.6' },
  { uk: '9', us: '9.5', eu: '43', cm: '27.5', inches: '10.8' },
  { uk: '9.5', us: '10.0', eu: '44', cm: '28.0', inches: '11.0' },
  { uk: '10', us: '10.5', eu: '44.5', cm: '28.5', inches: '11.2' },
  { uk: '10.5', us: '11.0', eu: '45', cm: '29.0', inches: '11.4' },
  { uk: '11', us: '11.5', eu: '45.5', cm: '29.5', inches: '11.6' },
  { uk: '12', us: '12.5', eu: '47', cm: '30.5', inches: '12.0' },
];

const WOMENS_SIZES: SizeRow[] = [
  { uk: '4', us: '6.5', eu: '37.5', cm: '23.5', inches: '9.3' },
  { uk: '4.5', us: '7.0', eu: '38', cm: '24.0', inches: '9.4' },
  { uk: '5', us: '7.5', eu: '38.5', cm: '24.5', inches: '9.6' },
  { uk: '5.5', us: '8.0', eu: '39', cm: '25.0', inches: '9.8' },
  { uk: '6', us: '8.5', eu: '40', cm: '25.5', inches: '10.0' },
  { uk: '6.5', us: '9.0', eu: '40.5', cm: '26.0', inches: '10.2' },
  { uk: '7', us: '9.5', eu: '41', cm: '26.5', inches: '10.4' },
  { uk: '7.5', us: '10.0', eu: '42', cm: '27.0', inches: '10.6' },
  { uk: '8', us: '10.5', eu: '42.5', cm: '27.5', inches: '10.8' },
  { uk: '8.5', us: '11.0', eu: '43', cm: '28.0', inches: '11.0' },
];

export const SizeGuideModal: React.FC<SizeGuideModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'men' | 'women'>('men');

  if (!isOpen) return null;

  const currentSizes = activeTab === 'men' ? MENS_SIZES : WOMENS_SIZES;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/85 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal Content */}
      <div className="relative w-full max-w-2xl bg-[#121216] border border-neutral-800 rounded-2xl overflow-hidden shadow-2xl z-10 my-8">
        {/* Header */}
        <div className="p-6 border-b border-neutral-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-neutral-900 border border-neutral-800 flex items-center justify-center text-[#ff461e]">
              <Ruler className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-xl font-bold uppercase tracking-tight text-white font-headline">
                NIKE SNEAKER SIZE GUIDE
              </h2>
              <p className="text-xs text-neutral-400">
                Official international conversion table for adult footwear
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close size guide"
            className="w-8 h-8 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center text-neutral-400 hover:text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Tab Switcher (Men's / Women's) */}
        <div className="p-6 pb-0">
          <div className="flex items-center gap-1 p-1 bg-neutral-900 rounded-lg max-w-xs border border-neutral-800">
            <button
              type="button"
              onClick={() => setActiveTab('men')}
              className={`flex-1 py-1.5 px-3 rounded-md text-xs font-bold uppercase tracking-wider transition-all ${
                activeTab === 'men'
                  ? 'bg-white text-black shadow-sm'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              Men's Sizing
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('women')}
              className={`flex-1 py-1.5 px-3 rounded-md text-xs font-bold uppercase tracking-wider transition-all ${
                activeTab === 'women'
                  ? 'bg-white text-black shadow-sm'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              Women's Sizing
            </button>
          </div>
        </div>

        {/* Sizing Table */}
        <div className="p-6">
          <div className="border border-neutral-800 rounded-xl overflow-hidden">
            <div className="max-h-72 overflow-y-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#18181d] text-neutral-300 uppercase tracking-wider sticky top-0 border-b border-neutral-800">
                  <tr>
                    <th scope="col" className="px-4 py-3 font-bold text-[#ff461e]">
                      UK Size
                    </th>
                    <th scope="col" className="px-4 py-3 font-semibold text-neutral-300">
                      US Size
                    </th>
                    <th scope="col" className="px-4 py-3 font-semibold text-neutral-300">
                      EU Size
                    </th>
                    <th scope="col" className="px-4 py-3 font-semibold text-neutral-300">
                      Heel-to-Toe (CM)
                    </th>
                    <th scope="col" className="px-4 py-3 font-semibold text-neutral-300">
                      Inches
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-800/80 font-mono tabular-nums">
                  {currentSizes.map((row, idx) => (
                    <tr
                      key={row.uk}
                      className={`hover:bg-neutral-800/50 transition-colors ${
                        idx % 2 === 0 ? 'bg-[#121216]' : 'bg-[#15151a]'
                      }`}
                    >
                      <td className="px-4 py-2.5 font-bold text-white">
                        UK {row.uk}
                      </td>
                      <td className="px-4 py-2.5 text-neutral-300">
                        {row.us}
                      </td>
                      <td className="px-4 py-2.5 text-neutral-300">
                        {row.eu}
                      </td>
                      <td className="px-4 py-2.5 text-neutral-300">
                        {row.cm} cm
                      </td>
                      <td className="px-4 py-2.5 text-neutral-400">
                        {row.inches}"
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Measuring Tip Card */}
          <div className="mt-5 p-4 rounded-xl bg-neutral-900/80 border border-neutral-800 flex items-start gap-3 text-xs text-neutral-400">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <span className="font-semibold text-neutral-200 block">
                How to find your accurate size:
              </span>
              <p>
                Stand on a hard surface with your heel against the wall. Measure from the base of your heel to the tip of your longest toe in centimeters. If you are between sizes, we recommend ordering half a size up for running shoes.
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 sm:p-5 border-t border-neutral-800 bg-[#0d0d10] flex items-center justify-between">
          <span className="text-[11px] text-neutral-500">
            India standard size chart corresponds to UK measurements.
          </span>
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 bg-white text-black hover:bg-neutral-200 text-xs font-bold uppercase rounded-lg transition-colors cursor-pointer"
          >
            Got It
          </button>
        </div>
      </div>
    </div>
  );
};
