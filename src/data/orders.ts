import { Order } from '../types';
import { PRODUCTS } from './products';

export const INITIAL_ORDERS: Order[] = [
  {
    id: 'NK-9482104',
    date: 'Sep 29, 2026',
    status: 'In Transit',
    estimatedDelivery: 'Oct 2, 2026 (By 7:00 PM)',
    trackingNumber: 'BD-88219482IN',
    carrier: 'BlueDart Air Express',
    items: [
      {
        product: PRODUCTS[2], // Nike Air Zoom Pegasus 41 "Sunset"
        selectedSize: 'UK 9',
        quantity: 1,
        pricePaid: 9746,
      },
    ],
    subtotal: 9746,
    shippingFee: 0,
    total: 9746,
    paymentMethod: 'UPI (Google Pay)',
    shippingAddress: '12B, Green Glen Layout, Bellandur, Bengaluru, Karnataka 560103',
  },
  {
    id: 'NK-8921471',
    date: 'Sep 14, 2026',
    status: 'Delivered',
    estimatedDelivery: 'Delivered on Sep 17, 2026',
    trackingNumber: 'DELH-44109827IN',
    carrier: 'Delhivery Surface',
    items: [
      {
        product: PRODUCTS[5], // Nike Quest 5 "Volt Kinetic"
        selectedSize: 'UK 8',
        quantity: 1,
        pricePaid: 4995,
      },
      {
        product: PRODUCTS[1], // Nike Court Vision Lo NN
        selectedSize: 'UK 8',
        quantity: 1,
        pricePaid: 3496,
      },
    ],
    subtotal: 8491,
    shippingFee: 0,
    total: 8491,
    paymentMethod: 'Visa Card ending in •••• 4092',
    shippingAddress: '12B, Green Glen Layout, Bellandur, Bengaluru, Karnataka 560103',
  },
  {
    id: 'NK-7612049',
    date: 'Aug 28, 2026',
    status: 'Delivered',
    estimatedDelivery: 'Delivered on Aug 31, 2026',
    trackingNumber: 'FEDEX-9921401IN',
    carrier: 'FedEx Express Ground',
    items: [
      {
        product: PRODUCTS[0], // Nike Air Max Alpha Trainer 5
        selectedSize: 'UK 8',
        quantity: 1,
        pricePaid: 3747,
      },
    ],
    subtotal: 3747,
    shippingFee: 495,
    total: 4242,
    paymentMethod: 'Cash on Delivery (Verified)',
    shippingAddress: '12B, Green Glen Layout, Bellandur, Bengaluru, Karnataka 560103',
  },
];
