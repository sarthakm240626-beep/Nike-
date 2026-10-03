import React from 'react';
import { SNEAKER_IMAGES } from '../data/imageAssets';
import { X, Minus, Plus, Trash2, ArrowRight, ShoppingBag, ShieldCheck } from 'lucide-react';
import { CartItem } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (productId: string, size: string, delta: number) => void;
  onRemoveItem: (productId: string, size: string) => void;
  onCheckout: () => void;
}

const FREE_SHIPPING_THRESHOLD = 5000;

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onCheckout,
}) => {
  if (!isOpen) return null;

  const totalAmount = cartItems.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  const amountToFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD - totalAmount);
  const progressPercent = Math.min(100, (totalAmount / FREE_SHIPPING_THRESHOLD) * 100);

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Drawer */}
      <div className="relative w-full max-w-md bg-[#101014] border-l border-neutral-800 h-full flex flex-col justify-between z-10 shadow-2xl">
        {/* Drawer Header */}
        <div className="p-6 border-b border-neutral-800">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-white" />
              <h2 className="text-xl font-bold uppercase tracking-tight text-white font-headline">
                YOUR BAG ({cartItems.reduce((acc, i) => acc + i.quantity, 0)})
              </h2>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center text-neutral-400 hover:text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Free Shipping Progress Indicator */}
          <div className="bg-neutral-900/90 border border-neutral-800 p-3 rounded-xl">
            <div className="flex items-center justify-between text-xs mb-1.5">
              <span className="text-neutral-400">
                {amountToFreeShipping === 0
                  ? '🎉 You qualify for Free Standard Delivery!'
                  : `Add ₹${amountToFreeShipping.toLocaleString('en-IN')} for Free Delivery`}
              </span>
              <span className="text-[11px] font-mono text-neutral-500 tabular-nums">
                {Math.round(progressPercent)}%
              </span>
            </div>
            <div className="w-full bg-neutral-800 h-1.5 rounded-full overflow-hidden">
              <div
                className="bg-[#ff461e] h-full transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>
        </div>

        {/* Drawer Items List */}
        <div className="flex-1 overflow-y-auto p-6 divide-y divide-neutral-800/80">
          {cartItems.length > 0 ? (
            cartItems.map((item) => (
              <div
                key={`${item.product.id}-${item.selectedSize}`}
                className="py-4 first:pt-0 last:pb-0 flex gap-4 items-center"
              >
                {/* Normal Static Product Thumbnail */}
                <div className="w-20 h-20 bg-neutral-900 rounded-lg p-1.5 shrink-0 border border-neutral-800 flex items-center justify-center">
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    loading="eager"
                    onError={(e) => {
                      const target = e.currentTarget;
                      if (!target.dataset.fallbackTried) {
                        target.dataset.fallbackTried = 'true';
                        target.src = SNEAKER_IMAGES.questCrimson;
                      }
                    }}
                    className="w-full h-full object-contain pointer-events-none"
                  />
                </div>

                {/* Item Details */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="text-sm font-semibold text-white truncate">
                      {item.product.name}
                    </h3>
                    <button
                      type="button"
                      onClick={() => onRemoveItem(item.product.id, item.selectedSize)}
                      className="text-neutral-500 hover:text-red-400 transition-colors shrink-0"
                      title="Remove item"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <p className="text-xs text-neutral-400 mt-0.5">
                    Size: <span className="text-neutral-200 font-medium">{item.selectedSize}</span>
                  </p>

                  <div className="flex items-center justify-between mt-3">
                    {/* Quantity Stepper */}
                    <div className="flex items-center border border-neutral-700 rounded-lg bg-neutral-900">
                      <button
                        type="button"
                        onClick={() => onUpdateQuantity(item.product.id, item.selectedSize, -1)}
                        className="w-7 h-7 flex items-center justify-center text-neutral-400 hover:text-white transition-colors"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="w-7 text-center text-xs font-semibold text-white font-mono tabular-nums">
                        {item.quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() => onUpdateQuantity(item.product.id, item.selectedSize, 1)}
                        className="w-7 h-7 flex items-center justify-center text-neutral-400 hover:text-white transition-colors"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    {/* Price */}
                    <span className="text-sm font-bold text-white tabular-nums">
                      ₹{(item.product.price * item.quantity).toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="py-20 text-center">
              <div className="w-14 h-14 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center mx-auto mb-4 text-neutral-500">
                <ShoppingBag className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-white uppercase font-headline">Your bag is empty</h3>
              <p className="text-xs text-neutral-400 mt-1 max-w-xs mx-auto">
                Explore our collection of performance running and lifestyle sneakers to fill your bag.
              </p>
              <button
                type="button"
                onClick={onClose}
                className="mt-6 inline-flex items-center gap-2 px-6 py-2.5 bg-white text-black font-bold uppercase text-xs rounded-lg hover:bg-neutral-200 transition-colors"
              >
                Start Shopping
              </button>
            </div>
          )}
        </div>

        {/* Drawer Footer */}
        {cartItems.length > 0 && (
          <div className="p-6 border-t border-neutral-800 bg-[#0d0d10] space-y-4">
            <div className="space-y-1.5 text-xs">
              <div className="flex justify-between text-neutral-400">
                <span>Subtotal</span>
                <span className="tabular-nums font-mono text-white">
                  ₹{totalAmount.toLocaleString('en-IN')}
                </span>
              </div>
              <div className="flex justify-between text-neutral-400">
                <span>Estimated Delivery</span>
                <span className="tabular-nums font-medium text-emerald-400">
                  {amountToFreeShipping === 0 ? 'FREE' : '₹495'}
                </span>
              </div>
              <div className="pt-2 border-t border-neutral-800 flex justify-between text-sm font-bold text-white">
                <span>Total</span>
                <span className="tabular-nums font-mono text-base">
                  ₹{(totalAmount + (amountToFreeShipping === 0 ? 0 : 495)).toLocaleString('en-IN')}
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={onCheckout}
              className="w-full py-4 bg-white hover:bg-[#ff461e] text-black hover:text-white font-bold uppercase tracking-wider text-xs rounded-xl flex items-center justify-center gap-2 transition-all duration-300 shadow-xl cursor-pointer"
            >
              <span>Member Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <div className="flex items-center justify-center gap-2 text-[11px] text-neutral-500">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Encrypted 256-Bit SSL Checkout</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
