import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const CartSummary = ({ 
  subtotal, 
  tax, 
  shipping, 
  discount, 
  total, 
  currency = '₹',
  onApplyPromoCode,
  onProceedToCheckout,
  isLoading = false
}) => {
  const [promoCode, setPromoCode] = useState('');
  const [promoError, setPromoError] = useState('');
  const [promoSuccess, setPromoSuccess] = useState('');
  const [isApplyingPromo, setIsApplyingPromo] = useState(false);

  const formatPrice = (price) => {
    return `${currency}${price?.toLocaleString()}`;
  };

  const handleApplyPromoCode = async () => {
    if (!promoCode?.trim()) {
      setPromoError('Please enter a promo code');
      return;
    }

    setIsApplyingPromo(true);
    setPromoError('');
    setPromoSuccess('');

    try {
      const result = await onApplyPromoCode(promoCode);
      if (result?.success) {
        setPromoSuccess(`Promo code applied! You saved ${formatPrice(result?.discount)}`);
        setPromoCode('');
      } else {
        setPromoError(result?.message || 'Invalid promo code');
      }
    } catch (error) {
      setPromoError('Failed to apply promo code');
    } finally {
      setIsApplyingPromo(false);
    }
  };

  const conversionRate = currency === '$' ? 0.012 : 1;
  const showConversion = currency !== '₹';

  return (
    <div className="bg-card border border-border rounded-lg p-6 shadow-warm-sm sticky top-24">
      <h2 className="font-heading font-semibold text-xl text-foreground mb-6">
        Order Summary
      </h2>
      {/* Price Breakdown */}
      <div className="space-y-4 mb-6">
        <div className="flex justify-between items-center">
          <span className="text-foreground">Subtotal</span>
          <span className="font-medium text-foreground">{formatPrice(subtotal)}</span>
        </div>

        {discount > 0 && (
          <div className="flex justify-between items-center text-success">
            <span>Discount</span>
            <span className="font-medium">-{formatPrice(discount)}</span>
          </div>
        )}

        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-1">
            <span className="text-foreground">Shipping</span>
            <Icon name="Info" size={14} className="text-muted-foreground" />
          </div>
          <span className="font-medium text-foreground">
            {shipping === 0 ? 'Free' : formatPrice(shipping)}
          </span>
        </div>

        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-1">
            <span className="text-foreground">Tax</span>
            <Icon name="Info" size={14} className="text-muted-foreground" />
          </div>
          <span className="font-medium text-foreground">{formatPrice(tax)}</span>
        </div>

        <div className="border-t border-border pt-4">
          <div className="flex justify-between items-center">
            <span className="text-lg font-semibold text-foreground">Total</span>
            <div className="text-right">
              <span className="text-xl font-bold text-foreground">{formatPrice(total)}</span>
              {showConversion && (
                <div className="text-xs text-muted-foreground">
                  ≈ ₹{(total / conversionRate)?.toLocaleString()}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      {/* Promo Code Section */}
      <div className="mb-6">
        <div className="flex space-x-2">
          <div className="flex-grow">
            <Input
              type="text"
              placeholder="Enter promo code"
              value={promoCode}
              onChange={(e) => setPromoCode(e?.target?.value?.toUpperCase())}
              error={promoError}
              className="mb-0"
            />
          </div>
          <Button
            variant="outline"
            onClick={handleApplyPromoCode}
            disabled={isApplyingPromo || !promoCode?.trim()}
            loading={isApplyingPromo}
          >
            Apply
          </Button>
        </div>
        {promoSuccess && (
          <div className="mt-2 text-sm text-success flex items-center space-x-1">
            <Icon name="CheckCircle" size={14} />
            <span>{promoSuccess}</span>
          </div>
        )}
      </div>
      {/* Checkout Button */}
      <Button
        variant="default"
        size="lg"
        fullWidth
        onClick={onProceedToCheckout}
        disabled={isLoading}
        loading={isLoading}
        className="mb-4"
      >
        Proceed to Checkout
      </Button>
      {/* Security Indicators */}
      <div className="space-y-3 text-xs text-muted-foreground">
        <div className="flex items-center space-x-2">
          <Icon name="Shield" size={14} className="text-success" />
          <span>Secure SSL encrypted checkout</span>
        </div>
        <div className="flex items-center space-x-2">
          <Icon name="Truck" size={14} className="text-primary" />
          <span>Free shipping on orders over ₹1,000</span>
        </div>
        <div className="flex items-center space-x-2">
          <Icon name="RotateCcw" size={14} className="text-primary" />
          <span>30-day return policy</span>
        </div>
      </div>
      {/* Estimated Delivery */}
      <div className="mt-6 p-4 bg-muted rounded-lg">
        <div className="flex items-center space-x-2 mb-2">
          <Icon name="Calendar" size={16} className="text-primary" />
          <span className="font-medium text-foreground">Estimated Delivery</span>
        </div>
        <div className="text-sm text-muted-foreground">
          <div>Express: 3-5 business days</div>
          <div>Standard: 7-10 business days</div>
          <div className="mt-1 text-xs">
            * Delivery times may vary based on artisan locations
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartSummary;