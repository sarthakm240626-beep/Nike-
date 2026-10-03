export type Category =
  | 'All'
  | 'Road Running'
  | 'Training & Gym'
  | 'Lifestyle & Sneakers'
  | 'Basketball'
  | 'Skateboarding & Court'
  | 'Sportswear & Classics'
  | 'Easy-On & Slip-On';

export type GenderFilter = 'All' | 'Men' | 'Women' | 'Unisex';

export type SilhouetteFilter =
  | 'All'
  | 'Pegasus'
  | 'Revolution'
  | 'Air Max'
  | 'Quest'
  | 'Downshifter'
  | 'Court Vision'
  | 'SB Skate';

export type ColorOption =
  | 'All'
  | 'Black'
  | 'White'
  | 'Blue'
  | 'Grey'
  | 'Red'
  | 'Green'
  | 'Beige'
  | 'Orange';

export type PriceRange =
  | 'All'
  | 'under-3500'
  | '3500-5000'
  | '5000-8000'
  | '8000-12000'
  | 'above-12000';

export type ShoeSize = 'All' | 'UK 6' | 'UK 7' | 'UK 8' | 'UK 9' | 'UK 10' | 'UK 11';

export type SortOption = 'featured' | 'price-asc' | 'price-desc' | 'rating' | 'discount';

export interface Product {
  id: string;
  name: string;
  category: Category;
  gender: 'Men' | 'Women' | 'Unisex';
  silhouette: SilhouetteFilter;
  colorFamily: ColorOption;
  colorName: string;
  price: number;
  originalPrice?: number;
  discountPercent?: number;
  rating: number;
  reviewsCount: number;
  image: string;
  sizes: ('UK 6' | 'UK 7' | 'UK 8' | 'UK 9' | 'UK 10' | 'UK 11')[];
  description: string;
  badge?: string;
  priceTier: 'under-3500' | '3500-5000' | '5000-8000' | '8000-12000' | 'above-12000';
  features: string[];
  isOnSale?: boolean;
}

export interface CartItem {
  product: Product;
  selectedSize: string;
  quantity: number;
}

export type OrderStatus = 'Confirmed' | 'Preparing Shipment' | 'In Transit' | 'Delivered';

export interface OrderItem {
  product: Product;
  selectedSize: string;
  quantity: number;
  pricePaid: number;
}

export interface Order {
  id: string;
  date: string;
  status: OrderStatus;
  estimatedDelivery: string;
  trackingNumber: string;
  carrier: string;
  items: OrderItem[];
  subtotal: number;
  shippingFee: number;
  total: number;
  paymentMethod: string;
  shippingAddress: string;
}

