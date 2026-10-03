import React, { useState, useMemo } from 'react';
import { SNEAKER_IMAGES } from '../data/imageAssets';
import {
  X,
  Package,
  Truck,
  CheckCircle2,
  Clock,
  ChevronDown,
  ChevronUp,
  RotateCcw,
  Search,
  Download,
  MapPin,
  CreditCard,
  ExternalLink,
  ShieldCheck,
  User,
  ShoppingBag,
} from 'lucide-react';
import { Order, OrderStatus, Product } from '../types';

interface OrdersModalProps {
  isOpen: boolean;
  onClose: () => void;
  orders: Order[];
  onBuyAgain: (product: Product, size: string) => void;
  onViewProduct: (product: Product) => void;
  onDownloadInvoice: (orderId: string) => void;
}

export const OrdersModal: React.FC<OrdersModalProps> = ({
  isOpen,
  onClose,
  orders,
  onBuyAgain,
  onViewProduct,
  onDownloadInvoice,
}) => {
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedOrderIds, setExpandedOrderIds] = useState<string[]>([orders[0]?.id || '']);

  const toggleExpand = (orderId: string) => {
    setExpandedOrderIds((prev) =>
      prev.includes(orderId) ? prev.filter((id) => id !== orderId) : [...prev, orderId]
    );
  };

  const filteredOrders = useMemo(() => {
    return orders.filter((order) => {
      if (filterStatus === 'active') {
        if (order.status === 'Delivered') return false;
      } else if (filterStatus === 'delivered') {
        if (order.status !== 'Delivered') return false;
      }

      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesId = order.id.toLowerCase().includes(q);
        const matchesItem = order.items.some(
          (item) =>
            item.product.name.toLowerCase().includes(q) ||
            item.product.category.toLowerCase().includes(q)
        );
        if (!matchesId && !matchesItem) return false;
      }
      return true;
    });
  }, [orders, filterStatus, searchQuery]);

  if (!isOpen) return null;

  const getStatusBadge = (status: OrderStatus) => {
    switch (status) {
      case 'Delivered':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
            <CheckCircle2 className="w-3.5 h-3.5" />
            Delivered
          </span>
        );
      case 'In Transit':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-sky-500/15 text-sky-400 border border-sky-500/30 animate-pulse">
            <Truck className="w-3.5 h-3.5" />
            In Transit
          </span>
        );
      case 'Preparing Shipment':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-purple-500/15 text-purple-400 border border-purple-500/30">
            <Package className="w-3.5 h-3.5" />
            Preparing
          </span>
        );
      case 'Confirmed':
      default:
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-500/15 text-amber-400 border border-amber-500/30">
            <Clock className="w-3.5 h-3.5" />
            Order Confirmed
          </span>
        );
    }
  };

  const getStepIndex = (status: OrderStatus) => {
    switch (status) {
      case 'Confirmed':
        return 1;
      case 'Preparing Shipment':
        return 2;
      case 'In Transit':
        return 3;
      case 'Delivered':
        return 4;
      default:
        return 1;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/85 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-4xl bg-[#121216] border border-neutral-800 rounded-2xl overflow-hidden shadow-2xl z-10 my-6 flex flex-col max-h-[90vh]">
        {/* User Profile Header */}
        <div className="p-6 border-b border-neutral-800 bg-[#0f0f13] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-neutral-800 to-neutral-700 border border-neutral-600 flex items-center justify-center text-white font-bold text-lg shadow-inner">
              <User className="w-6 h-6 text-neutral-300" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-bold uppercase tracking-tight text-white font-headline">
                  NIKE MEMBER PROFILE
                </h2>
                <span className="text-[11px] font-semibold text-[#ff461e] bg-[#ff461e]/10 border border-[#ff461e]/30 px-2 py-0.5 rounded">
                  Gold Member
                </span>
              </div>
              <p className="text-xs text-neutral-400 mt-0.5">
                sarthakm240626@gmail.com · Member since 2024
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 self-end sm:self-center">
            <button
              type="button"
              onClick={onClose}
              className="w-9 h-9 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center text-neutral-400 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Filter and Search Bar */}
        <div className="p-4 sm:px-6 border-b border-neutral-800 bg-[#121216] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          {/* Status Tabs */}
          <div className="flex items-center gap-1 p-1 bg-neutral-900 rounded-lg border border-neutral-800 w-fit">
            <button
              type="button"
              onClick={() => setFilterStatus('all')}
              className={`px-3 py-1.5 rounded-md text-xs font-bold uppercase transition-all cursor-pointer ${
                filterStatus === 'all'
                  ? 'bg-white text-black shadow-sm'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              All Orders ({orders.length})
            </button>
            <button
              type="button"
              onClick={() => setFilterStatus('active')}
              className={`px-3 py-1.5 rounded-md text-xs font-bold uppercase transition-all cursor-pointer ${
                filterStatus === 'active'
                  ? 'bg-white text-black shadow-sm'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              Active ({orders.filter((o) => o.status !== 'Delivered').length})
            </button>
            <button
              type="button"
              onClick={() => setFilterStatus('delivered')}
              className={`px-3 py-1.5 rounded-md text-xs font-bold uppercase transition-all cursor-pointer ${
                filterStatus === 'delivered'
                  ? 'bg-white text-black shadow-sm'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              Delivered ({orders.filter((o) => o.status === 'Delivered').length})
            </button>
          </div>

          {/* Search within orders */}
          <div className="relative w-full sm:w-64">
            <Search className="w-3.5 h-3.5 text-neutral-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by Order ID, shoe..."
              className="w-full bg-[#18181d] border border-neutral-800 rounded-lg pl-8 pr-7 py-1.5 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-[#ff461e]"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-white"
              >
                <X className="w-3 h-3" />
              </button>
            )}
          </div>
        </div>

        {/* Orders Scrollable List */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
          {filteredOrders.length > 0 ? (
            filteredOrders.map((order) => {
              const isExpanded = expandedOrderIds.includes(order.id);
              const currentStep = getStepIndex(order.status);

              return (
                <div
                  key={order.id}
                  className="bg-[#15151a] border border-neutral-800 rounded-xl overflow-hidden transition-all duration-200 hover:border-neutral-700 shadow-md"
                >
                  {/* Order Card Header */}
                  <div
                    onClick={() => toggleExpand(order.id)}
                    className="p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 cursor-pointer hover:bg-neutral-900/50 transition-colors"
                  >
                    <div>
                      <div className="flex flex-wrap items-center gap-3 mb-1.5">
                        <span className="font-mono text-sm font-bold text-white tracking-wide">
                          Order #{order.id}
                        </span>
                        {getStatusBadge(order.status)}
                      </div>
                      <div className="flex flex-wrap items-center gap-2 text-xs text-neutral-400">
                        <span>Placed on {order.date}</span>
                        <span>·</span>
                        <span className="font-mono tabular-nums text-neutral-300 font-semibold">
                          ₹{order.total.toLocaleString('en-IN')}
                        </span>
                        <span>·</span>
                        <span>
                          {order.items.reduce((s, i) => s + i.quantity, 0)} item
                          {order.items.length > 1 ? 's' : ''}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="text-xs text-neutral-400 hidden sm:inline">
                        {order.status === 'Delivered'
                          ? order.estimatedDelivery
                          : `Est. Delivery: ${order.estimatedDelivery}`}
                      </span>
                      <div className="w-7 h-7 rounded-full bg-neutral-800 flex items-center justify-center text-neutral-300">
                        {isExpanded ? (
                          <ChevronUp className="w-4 h-4" />
                        ) : (
                          <ChevronDown className="w-4 h-4" />
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Order Progress Stepper Bar */}
                  <div className="px-5 pb-4 pt-1 bg-[#15151a] border-b border-neutral-800/80">
                    <div className="grid grid-cols-4 gap-2 text-center text-[11px] mb-2">
                      <span className={currentStep >= 1 ? 'text-white font-semibold' : 'text-neutral-500'}>
                        1. Confirmed
                      </span>
                      <span className={currentStep >= 2 ? 'text-white font-semibold' : 'text-neutral-500'}>
                        2. Preparing
                      </span>
                      <span className={currentStep >= 3 ? 'text-white font-semibold' : 'text-neutral-500'}>
                        3. In Transit
                      </span>
                      <span className={currentStep >= 4 ? 'text-white font-semibold' : 'text-neutral-500'}>
                        4. Delivered
                      </span>
                    </div>
                    <div className="w-full bg-neutral-800 h-1.5 rounded-full overflow-hidden flex">
                      <div
                        className={`h-full transition-all duration-300 ${
                          currentStep === 4
                            ? 'bg-emerald-500 w-full'
                            : currentStep === 3
                            ? 'bg-sky-400 w-3/4'
                            : currentStep === 2
                            ? 'bg-purple-400 w-2/4'
                            : 'bg-amber-400 w-1/4'
                        }`}
                      />
                    </div>
                  </div>

                  {/* Order Items List */}
                  <div className="p-5 divide-y divide-neutral-800/80">
                    {order.items.map((item, idx) => (
                      <div
                        key={`${item.product.id}-${item.selectedSize}-${idx}`}
                        className="py-3.5 first:pt-0 last:pb-0 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                      >
                        <div className="flex items-center gap-3.5">
                          {/* Static Product Image */}
                          <div className="w-16 h-16 rounded-lg bg-neutral-900 border border-neutral-800 p-1 flex items-center justify-center shrink-0">
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

                          <div>
                            <h4
                              onClick={() => {
                                onViewProduct(item.product);
                                onClose();
                              }}
                              className="text-sm font-semibold text-white hover:text-[#ff461e] cursor-pointer transition-colors"
                            >
                              {item.product.name}
                            </h4>
                            <p className="text-xs text-neutral-400 mt-0.5">
                              Size: <span className="text-neutral-200 font-medium">{item.selectedSize}</span> · Qty: {item.quantity} · {item.product.colorName}
                            </p>
                            <span className="text-xs font-bold text-white font-mono tabular-nums mt-1 block">
                              ₹{(item.pricePaid * item.quantity).toLocaleString('en-IN')}
                            </span>
                          </div>
                        </div>

                        {/* Item Actions */}
                        <div className="flex items-center gap-2 self-start sm:self-center">
                          <button
                            type="button"
                            onClick={() => onBuyAgain(item.product, item.selectedSize)}
                            className="px-3 py-1.5 bg-neutral-800 hover:bg-[#ff461e] text-neutral-200 hover:text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                          >
                            <ShoppingBag className="w-3 h-3" />
                            <span>Buy Again</span>
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              onViewProduct(item.product);
                              onClose();
                            }}
                            className="px-3 py-1.5 bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 text-neutral-300 rounded-lg text-xs font-medium transition-colors cursor-pointer"
                          >
                            View Shoe
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Expanded Order Details Section */}
                  {isExpanded && (
                    <div className="p-5 bg-[#101014] border-t border-neutral-800 text-xs text-neutral-400 space-y-4 animate-in fade-in duration-200">
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        {/* Courier Details */}
                        <div className="space-y-1">
                          <span className="font-bold text-neutral-300 block uppercase tracking-wider text-[11px]">
                            Shipment Tracking
                          </span>
                          <p className="text-neutral-200 font-mono">{order.trackingNumber}</p>
                          <p className="text-neutral-400">Carrier: {order.carrier}</p>
                        </div>

                        {/* Delivery Address */}
                        <div className="space-y-1">
                          <span className="font-bold text-neutral-300 block uppercase tracking-wider text-[11px] flex items-center gap-1">
                            <MapPin className="w-3 h-3 text-[#ff461e]" /> Delivery Address
                          </span>
                          <p className="text-neutral-300 leading-relaxed">
                            {order.shippingAddress}
                          </p>
                        </div>

                        {/* Payment Summary */}
                        <div className="space-y-1">
                          <span className="font-bold text-neutral-300 block uppercase tracking-wider text-[11px] flex items-center gap-1">
                            <CreditCard className="w-3 h-3 text-sky-400" /> Payment & Total
                          </span>
                          <p className="text-neutral-300">{order.paymentMethod}</p>
                          <p className="font-mono text-white font-bold">
                            Total: ₹{order.total.toLocaleString('en-IN')} (Free Delivery)
                          </p>
                        </div>
                      </div>

                      {/* Download Invoice Action */}
                      <div className="pt-3 border-t border-neutral-800 flex items-center justify-between">
                        <span className="text-[11px] text-neutral-500">
                          GST Compliant Invoice available for tax records.
                        </span>
                        <button
                          type="button"
                          onClick={() => onDownloadInvoice(order.id)}
                          className="inline-flex items-center gap-1.5 text-xs text-neutral-300 hover:text-white font-semibold underline cursor-pointer"
                        >
                          <Download className="w-3.5 h-3.5" />
                          <span>Download Tax Invoice (PDF)</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              );
            })
          ) : (
            <div className="py-16 text-center">
              <div className="w-12 h-12 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center mx-auto mb-3 text-neutral-500">
                <Package className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-white uppercase font-headline">
                No orders match your filter
              </h3>
              <p className="text-xs text-neutral-400 mt-1 max-w-sm mx-auto">
                Check back after making your next purchase or clear the search query.
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 sm:p-5 border-t border-neutral-800 bg-[#0d0d10] flex items-center justify-between text-xs text-neutral-400">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Nike 30-Day Wear Test & Free Returns Guaranteed</span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 bg-neutral-800 hover:bg-neutral-700 text-white font-bold uppercase rounded-lg text-xs transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
