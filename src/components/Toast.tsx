import React, { useEffect } from 'react';
import { Check, ShoppingBag } from 'lucide-react';

interface ToastProps {
  message: string | null;
  onClose: () => void;
}

export const Toast: React.FC<ToastProps> = ({ message, onClose }) => {
  useEffect(() => {
    if (!message) return;
    const timer = setTimeout(() => {
      onClose();
    }, 3200);
    return () => clearTimeout(timer);
  }, [message, onClose]);

  if (!message) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 transition-all duration-300 transform translate-y-0 opacity-100">
      <div className="flex items-center gap-3 bg-neutral-900 border border-neutral-700/80 text-white px-5 py-3.5 rounded-lg shadow-2xl backdrop-blur-md">
        <div className="w-7 h-7 rounded-full bg-[#ff461e]/20 text-[#ff461e] flex items-center justify-center shrink-0">
          <Check className="w-4 h-4" />
        </div>
        <div className="flex flex-col">
          <span className="text-xs font-semibold uppercase tracking-wider text-neutral-400">Bag Updated</span>
          <span className="text-sm font-medium text-neutral-100">{message}</span>
        </div>
      </div>
    </div>
  );
};
