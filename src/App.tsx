import React, { useState, useMemo } from 'react';
import { PRODUCTS } from './data/products';
import { INITIAL_ORDERS } from './data/orders';
import {
  Category,
  ColorOption,
  GenderFilter,
  PriceRange,
  Product,
  ShoeSize,
  SilhouetteFilter,
  SortOption,
  CartItem,
  Order,
} from './types';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ProductSlider } from './components/ProductSlider';
import { PriceFeatureSection } from './components/PriceFeatureSection';
import { FilterSection } from './components/FilterSection';
import { FeaturedSpotlight } from './components/FeaturedSpotlight';
import { CategorySections } from './components/CategorySections';
import { ProductQuickViewModal } from './components/ProductQuickViewModal';
import { CartDrawer } from './components/CartDrawer';
import { WishlistDrawer } from './components/WishlistDrawer';
import { SearchModal } from './components/SearchModal';
import { SizeGuideModal } from './components/SizeGuideModal';
import { OrdersModal } from './components/OrdersModal';
import { Toast } from './components/Toast';
import { Footer } from './components/Footer';

export default function App() {
  // Filter States
  const [selectedCategory, setSelectedCategory] = useState<Category>('All');
  const [selectedGender, setSelectedGender] = useState<GenderFilter>('All');
  const [selectedSilhouette, setSelectedSilhouette] = useState<SilhouetteFilter>('All');
  const [selectedColor, setSelectedColor] = useState<ColorOption>('All');
  const [selectedPrice, setSelectedPrice] = useState<PriceRange>('All');
  const [selectedSize, setSelectedSize] = useState<ShoeSize>('All');
  const [onlySale, setOnlySale] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<SortOption>('featured');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Cart & Wishlist States
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      product: PRODUCTS[0],
      selectedSize: 'UK 8',
      quantity: 1,
    },
    {
      product: PRODUCTS[1],
      selectedSize: 'UK 9',
      quantity: 1,
    },
  ]);
  const [wishlistIds, setWishlistIds] = useState<string[]>([PRODUCTS[2].id, PRODUCTS[4].id]);

  // Orders State
  const [orders, setOrders] = useState<Order[]>(INITIAL_ORDERS);

  // Modals & Drawers States
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);
  const [isOrdersOpen, setIsOrdersOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  // Notification Toast State
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Filtered & Sorted Products Logic
  const filteredProducts = useMemo(() => {
    let result = PRODUCTS.filter((product) => {
      // Category filter
      if (selectedCategory !== 'All' && product.category !== selectedCategory) {
        return false;
      }
      // Gender filter
      if (selectedGender !== 'All') {
        if (selectedGender === 'Men' && product.gender !== 'Men' && product.gender !== 'Unisex') return false;
        if (selectedGender === 'Women' && product.gender !== 'Women' && product.gender !== 'Unisex') return false;
        if (selectedGender === 'Unisex' && product.gender !== 'Unisex') return false;
      }
      // Silhouette filter
      if (selectedSilhouette !== 'All' && product.silhouette !== selectedSilhouette) {
        return false;
      }
      // Color filter
      if (selectedColor !== 'All' && product.colorFamily !== selectedColor) {
        return false;
      }
      // Price range filter
      if (selectedPrice !== 'All') {
        if (selectedPrice === 'under-3500' && product.price >= 3500) return false;
        if (selectedPrice === '3500-5000' && (product.price < 3500 || product.price > 5000)) return false;
        if (selectedPrice === '5000-8000' && (product.price < 5000 || product.price > 8000)) return false;
        if (selectedPrice === '8000-12000' && (product.price < 8000 || product.price > 12000)) return false;
        if (selectedPrice === 'above-12000' && product.price <= 12000) return false;
      }
      // Size filter
      if (selectedSize !== 'All') {
        if (!product.sizes.includes(selectedSize as any)) return false;
      }
      // Only sale
      if (onlySale && !product.isOnSale) {
        return false;
      }
      // Search query
      if (searchQuery.trim().length > 0) {
        const query = searchQuery.toLowerCase();
        const matchesName = product.name.toLowerCase().includes(query);
        const matchesCat = product.category.toLowerCase().includes(query);
        const matchesSil = product.silhouette.toLowerCase().includes(query);
        const matchesColor = product.colorName.toLowerCase().includes(query);
        const matchesFamily = product.colorFamily.toLowerCase().includes(query);
        if (!matchesName && !matchesCat && !matchesSil && !matchesColor && !matchesFamily) return false;
      }
      return true;
    });

    // Sorting
    if (sortBy === 'price-asc') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-desc') {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'rating') {
      result.sort((a, b) => b.rating - a.rating);
    } else if (sortBy === 'discount') {
      result.sort((a, b) => (b.discountPercent || 0) - (a.discountPercent || 0));
    }

    return result;
  }, [
    selectedCategory,
    selectedGender,
    selectedSilhouette,
    selectedColor,
    selectedPrice,
    selectedSize,
    onlySale,
    sortBy,
    searchQuery,
  ]);

  // Wishlist products
  const wishlistProducts = useMemo(() => {
    return PRODUCTS.filter((p) => wishlistIds.includes(p.id));
  }, [wishlistIds]);

  // Handlers
  const handleAddToCart = (product: Product, size: string) => {
    setCartItems((prev) => {
      const existing = prev.find(
        (item) => item.product.id === product.id && item.selectedSize === size
      );
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id && item.selectedSize === size
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { product, selectedSize: size, quantity: 1 }];
    });
    setToastMessage(`${product.name} (${size}) added to your bag`);
  };

  const handleUpdateQuantity = (productId: string, size: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) => {
          if (item.product.id === productId && item.selectedSize === size) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter((item): item is CartItem => item !== null)
    );
  };

  const handleRemoveItem = (productId: string, size: string) => {
    setCartItems((prev) =>
      prev.filter(
        (item) => !(item.product.id === productId && item.selectedSize === size)
      )
    );
  };

  const handleToggleWishlist = (product: Product) => {
    setWishlistIds((prev) => {
      if (prev.includes(product.id)) {
        setToastMessage(`${product.name} removed from saved items`);
        return prev.filter((id) => id !== product.id);
      } else {
        setToastMessage(`${product.name} saved to your wishlist`);
        return [...prev, product.id];
      }
    });
  };

  const handleResetFilters = () => {
    setSelectedCategory('All');
    setSelectedGender('All');
    setSelectedSilhouette('All');
    setSelectedColor('All');
    setSelectedPrice('All');
    setSelectedSize('All');
    setOnlySale(false);
    setSortBy('featured');
    setSearchQuery('');
  };

  const handleCheckout = () => {
    if (cartItems.length === 0) return;
    const newOrderId = `NK-${Math.floor(1000000 + Math.random() * 9000000)}`;
    const subtotal = cartItems.reduce(
      (sum, item) => sum + item.product.price * item.quantity,
      0
    );
    const newOrder: Order = {
      id: newOrderId,
      date: 'Today, Oct 1, 2026',
      status: 'Confirmed',
      estimatedDelivery: 'Oct 5, 2026 (Free Delivery)',
      trackingNumber: `BD-${Math.floor(10000000 + Math.random() * 90000000)}IN`,
      carrier: 'BlueDart Air Express',
      items: cartItems.map((ci) => ({
        product: ci.product,
        selectedSize: ci.selectedSize,
        quantity: ci.quantity,
        pricePaid: ci.product.price,
      })),
      subtotal,
      shippingFee: 0,
      total: subtotal,
      paymentMethod: 'UPI Verified (Google Pay)',
      shippingAddress: '12B, Green Glen Layout, Bellandur, Bengaluru, Karnataka 560103',
    };

    setOrders((prev) => [newOrder, ...prev]);
    setCartItems([]);
    setIsCartOpen(false);
    setIsOrdersOpen(true);
    setToastMessage(`Order #${newOrderId} confirmed! Thank you for shopping with Nike.`);
  };

  const handleBuyAgain = (product: Product, size: string) => {
    handleAddToCart(product, size);
    setIsOrdersOpen(false);
    setIsCartOpen(true);
  };

  const handleDownloadInvoice = (orderId: string) => {
    setToastMessage(`Tax Invoice for Order #${orderId} downloaded (PDF)`);
  };

  const handleShopHeroClick = (gender?: 'Men' | 'Women') => {
    if (gender === 'Women') {
      setSelectedGender('Women');
      setSelectedCategory('Road Running');
    } else {
      setSelectedGender('Men');
      setSelectedCategory('Road Running');
    }
    const target = document.getElementById('shop-all');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleNavCategorySelect = (navType: string) => {
    if (navType === 'SALE') {
      setOnlySale(true);
      setSelectedCategory('All');
      setSelectedGender('All');
    } else if (navType === 'NEW') {
      setSelectedCategory('All');
      setSelectedGender('All');
      setOnlySale(false);
    } else if (navType === 'MEN') {
      setSelectedGender('Men');
      setSelectedCategory('All');
    } else if (navType === 'WOMEN') {
      setSelectedGender('Women');
      setSelectedCategory('All');
    } else if (navType === 'KIDS') {
      setSelectedCategory('Lifestyle & Sneakers');
      setSelectedGender('All');
    }
    const target = document.getElementById('shop-all');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#0b0b0e] text-neutral-100 flex flex-col font-sans selection:bg-[#ff461e] selection:text-white">
      {/* 1. STICKY NAVBAR */}
      <Navbar
        cartCount={cartItems.reduce((sum, item) => sum + item.quantity, 0)}
        wishlistCount={wishlistIds.length}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenWishlist={() => setIsWishlistOpen(true)}
        onOpenOrders={() => setIsOrdersOpen(true)}
        onSelectNavCategory={handleNavCategorySelect}
        onOpenSearch={() => setIsSearchOpen(true)}
      />

      {/* 2. HERO SECTION */}
      <Hero onShopClick={handleShopHeroClick} />

      {/* 3. EXPLORE THE COLLECTION HORIZONTAL SLIDER */}
      <ProductSlider
        products={PRODUCTS}
        onViewProduct={(product) => setQuickViewProduct(product)}
        onQuickAdd={handleAddToCart}
        wishlistIds={wishlistIds}
        onToggleWishlist={handleToggleWishlist}
      />

      {/* 4. PRICE-BASED FEATURE EXPLANATION SECTION */}
      <PriceFeatureSection
        selectedPrice={selectedPrice}
        onSelectPriceTier={(tier) => setSelectedPrice(tier)}
      />

      {/* 5. INTERACTIVE FILTERING & FULL CATALOG WITH EXPANDED OPTIONS */}
      <FilterSection
        products={filteredProducts}
        totalProductsCount={PRODUCTS.length}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        selectedGender={selectedGender}
        setSelectedGender={setSelectedGender}
        selectedSilhouette={selectedSilhouette}
        setSelectedSilhouette={setSelectedSilhouette}
        selectedColor={selectedColor}
        setSelectedColor={setSelectedColor}
        selectedPrice={selectedPrice}
        setSelectedPrice={setSelectedPrice}
        selectedSize={selectedSize}
        setSelectedSize={setSelectedSize}
        onlySale={onlySale}
        setOnlySale={setOnlySale}
        sortBy={sortBy}
        setSortBy={setSortBy}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onViewProduct={(product) => setQuickViewProduct(product)}
        onQuickAdd={handleAddToCart}
        wishlistIds={wishlistIds}
        onToggleWishlist={handleToggleWishlist}
        onResetFilters={handleResetFilters}
      />

      {/* 6. LARGE FEATURED SNEAKER SPOTLIGHT SECTION */}
      <FeaturedSpotlight
        products={PRODUCTS}
        onAddToCart={handleAddToCart}
        isWishlisted={wishlistIds.includes(PRODUCTS[0].id)}
        onToggleWishlist={handleToggleWishlist}
        onOpenSizeGuide={() => setIsSizeGuideOpen(true)}
      />

      {/* 7. DISCIPLINES CATEGORY SECTIONS (ROAD RUNNING, TRAINING, COURT, BASKETBALL) */}
      <CategorySections
        onSelectCategory={(category) => {
          setSelectedCategory(category);
        }}
      />

      {/* 8. FOOTER */}
      <Footer onOpenOrders={() => setIsOrdersOpen(true)} />

      {/* 9. MODALS & DRAWERS */}
      <ProductQuickViewModal
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
        onAddToCart={handleAddToCart}
        isWishlisted={quickViewProduct ? wishlistIds.includes(quickViewProduct.id) : false}
        onToggleWishlist={handleToggleWishlist}
        onOpenSizeGuide={() => setIsSizeGuideOpen(true)}
      />

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onCheckout={handleCheckout}
      />

      <WishlistDrawer
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        wishlistProducts={wishlistProducts}
        onRemoveWishlist={handleToggleWishlist}
        onViewProduct={(product) => setQuickViewProduct(product)}
        onQuickAdd={handleAddToCart}
      />

      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        products={PRODUCTS}
        onSelectProduct={(product) => setQuickViewProduct(product)}
      />

      <SizeGuideModal
        isOpen={isSizeGuideOpen}
        onClose={() => setIsSizeGuideOpen(false)}
      />

      <OrdersModal
        isOpen={isOrdersOpen}
        onClose={() => setIsOrdersOpen(false)}
        orders={orders}
        onBuyAgain={handleBuyAgain}
        onViewProduct={(product) => setQuickViewProduct(product)}
        onDownloadInvoice={handleDownloadInvoice}
      />

      <Toast message={toastMessage} onClose={() => setToastMessage(null)} />
    </div>
  );
}
