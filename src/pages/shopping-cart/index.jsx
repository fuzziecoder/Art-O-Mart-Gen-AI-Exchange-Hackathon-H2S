import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import CartItem from './components/CartItem';
import CartSummary from './components/CartSummary';
import EmptyCart from './components/EmptyCart';
import RecommendedProducts from './components/RecommendedProducts';

const ShoppingCart = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currency, setCurrency] = useState('₹');

  // Mock cart data
  const mockCartItems = [
    {
      id: 1,
      title: "Handwoven Kashmiri Pashmina Shawl",
      price: 8500,
      originalPrice: 10000,
      quantity: 1,
      stock: 5,
      category: "Textiles",
      image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400",
      artisan: {
        id: 1,
        name: "Rajesh Kumar",
        location: "Srinagar, Kashmir",
        avatar: "https://randomuser.me/api/portraits/men/32.jpg",
        trustScore: 4.8
      }
    },
    {
      id: 2,
      title: "Traditional Rajasthani Blue Pottery Vase",
      price: 2200,
      quantity: 2,
      stock: 12,
      category: "Ceramics",
      image: "https://images.pexels.com/photos/6195125/pexels-photo-6195125.jpeg?w=400",
      artisan: {
        id: 2,
        name: "Meera Sharma",
        location: "Jaipur, Rajasthan",
        avatar: "https://randomuser.me/api/portraits/women/45.jpg",
        trustScore: 4.6
      }
    },
    {
      id: 3,
      title: "Handcrafted Wooden Elephant Sculpture",
      price: 1800,
      quantity: 1,
      stock: 3,
      category: "Wood Craft",
      image: "https://images.pixabay.com/photo/2019/12/09/16/48/elephant-4684509_1280.jpg?w=400",
      artisan: {
        id: 3,
        name: "Arjun Patel",
        location: "Channapatna, Karnataka",
        avatar: "https://randomuser.me/api/portraits/men/28.jpg",
        trustScore: 4.9
      }
    }
  ];

  // Mock recommended products
  const mockRecommendedProducts = [
    {
      id: 4,
      title: "Handmade Brass Diya Set",
      price: 650,
      originalPrice: 800,
      discount: 19,
      category: "Metal Craft",
      isNew: true,
      image: "https://images.unsplash.com/photo-1605379399642-870262d3d051?w=400",
      culturalStory: "Traditional brass diyas crafted using ancient techniques passed down through generations.",
      artisan: {
        id: 4,
        name: "Lakshmi Devi",
        location: "Moradabad, UP",
        avatar: "https://randomuser.me/api/portraits/women/52.jpg",
        trustScore: 4.7
      }
    },
    {
      id: 5,
      title: "Madhubani Painting on Canvas",
      price: 3200,
      category: "Paintings",
      image: "https://images.pexels.com/photos/1070945/pexels-photo-1070945.jpeg?w=400",
      culturalStory: "Vibrant Madhubani art depicting traditional folk tales and mythology.",
      artisan: {
        id: 5,
        name: "Sunita Jha",
        location: "Madhubani, Bihar",
        avatar: "https://randomuser.me/api/portraits/women/38.jpg",
        trustScore: 4.5
      }
    },
    {
      id: 6,
      title: "Handwoven Bamboo Basket Set",
      price: 1200,
      category: "Bamboo Craft",
      image: "https://images.pixabay.com/photo/2019/07/02/05/54/basket-4311034_1280.jpg?w=400",
      culturalStory: "Eco-friendly bamboo baskets woven using traditional northeastern techniques.",
      artisan: {
        id: 6,
        name: "Bina Rai",
        location: "Shillong, Meghalaya",
        avatar: "https://randomuser.me/api/portraits/women/29.jpg",
        trustScore: 4.4
      }
    }
  ];

  useEffect(() => {
    // Load cart items from localStorage or API
    setCartItems(mockCartItems);
    
    // Load currency preference
    const savedCurrency = localStorage.getItem('preferredCurrency') || '₹';
    setCurrency(savedCurrency);
  }, []);

  const calculateSubtotal = () => {
    return cartItems?.reduce((sum, item) => sum + (item?.price * item?.quantity), 0);
  };

  const calculateTax = (subtotal) => {
    return Math.round(subtotal * 0.18); // 18% GST
  };

  const calculateShipping = (subtotal) => {
    return subtotal >= 1000 ? 0 : 150; // Free shipping over ₹1000
  };

  const calculateDiscount = () => {
    // Mock discount calculation
    return 0;
  };

  const subtotal = calculateSubtotal();
  const tax = calculateTax(subtotal);
  const shipping = calculateShipping(subtotal);
  const discount = calculateDiscount();
  const total = subtotal + tax + shipping - discount;

  const handleUpdateQuantity = async (itemId, newQuantity) => {
    setCartItems(prevItems =>
      prevItems?.map(item =>
        item?.id === itemId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const handleRemoveItem = (itemId) => {
    setCartItems(prevItems => prevItems?.filter(item => item?.id !== itemId));
  };

  const handleMoveToWishlist = (itemId) => {
    // Mock wishlist functionality
    const item = cartItems?.find(item => item?.id === itemId);
    if (item) {
      // Add to wishlist logic here
      handleRemoveItem(itemId);
      // Show success message
    }
  };

  const handleApplyPromoCode = async (promoCode) => {
    // Mock promo code validation
    const validCodes = {
      'WELCOME10': { discount: subtotal * 0.1, message: 'Welcome discount applied!' },
      'ARTISAN20': { discount: subtotal * 0.2, message: 'Artisan support discount applied!' },
      'FREESHIP': { discount: shipping, message: 'Free shipping applied!' }
    };

    if (validCodes?.[promoCode]) {
      return { success: true, ...validCodes?.[promoCode] };
    }

    return { success: false, message: 'Invalid promo code' };
  };

  const handleProceedToCheckout = () => {
    setIsLoading(true);
    // Mock checkout process
    setTimeout(() => {
      setIsLoading(false);
      // Navigate to checkout page (would be implemented)
      alert('Proceeding to secure checkout...');
    }, 2000);
  };

  const handleAddToCart = (product) => {
    const existingItem = cartItems?.find(item => item?.id === product?.id);
    if (existingItem) {
      handleUpdateQuantity(product?.id, existingItem?.quantity + 1);
    } else {
      setCartItems(prevItems => [...prevItems, { ...product, quantity: 1 }]);
    }
  };

  if (cartItems?.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="pt-20">
          <EmptyCart />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="pt-20 pb-12">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          {/* Page Header */}
          <div className="mb-8">
            <div className="flex items-center space-x-2 text-sm text-muted-foreground mb-2">
              <button onClick={() => navigate(-1)} className="hover:text-foreground transition-colors duration-200">
                <Icon name="ArrowLeft" size={16} />
              </button>
              <span>Back to Shopping</span>
            </div>
            <h1 className="font-heading font-bold text-3xl text-foreground">
              Shopping Cart
            </h1>
            <p className="text-muted-foreground mt-2">
              Review your selected authentic handmade products
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-6">
              {/* Cart Header */}
              <div className="flex items-center justify-between">
                <h2 className="font-heading font-semibold text-xl text-foreground">
                  Cart Items ({cartItems?.length})
                </h2>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-muted-foreground">Currency:</span>
                  <select
                    value={currency}
                    onChange={(e) => setCurrency(e?.target?.value)}
                    className="text-sm border border-border rounded px-2 py-1 bg-background text-foreground"
                  >
                    <option value="₹">₹ INR</option>
                    <option value="$">$ USD</option>
                  </select>
                </div>
              </div>

              {/* Cart Items List */}
              <div className="space-y-4">
                {cartItems?.map((item) => (
                  <CartItem
                    key={item?.id}
                    item={item}
                    onUpdateQuantity={handleUpdateQuantity}
                    onRemove={handleRemoveItem}
                    onMoveToWishlist={handleMoveToWishlist}
                  />
                ))}
              </div>

              {/* Continue Shopping */}
              <div className="pt-6 border-t border-border">
                <Button
                  variant="outline"
                  onClick={() => navigate('/marketplace-homepage')}
                  iconName="ArrowLeft"
                  iconPosition="left"
                >
                  Continue Shopping
                </Button>
              </div>
            </div>

            {/* Cart Summary */}
            <div className="lg:col-span-1">
              <CartSummary
                subtotal={subtotal}
                tax={tax}
                shipping={shipping}
                discount={discount}
                total={total}
                currency={currency}
                onApplyPromoCode={handleApplyPromoCode}
                onProceedToCheckout={handleProceedToCheckout}
                isLoading={isLoading}
              />
            </div>
          </div>

          {/* Recommended Products */}
          <div className="mt-12">
            <RecommendedProducts
              products={mockRecommendedProducts}
              onAddToCart={handleAddToCart}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShoppingCart;