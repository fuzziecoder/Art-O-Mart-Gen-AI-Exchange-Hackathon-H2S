import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const CartItem = ({ item, onUpdateQuantity, onRemove, onMoveToWishlist }) => {
  const [quantity, setQuantity] = useState(item?.quantity);
  const [isUpdating, setIsUpdating] = useState(false);

  const handleQuantityChange = async (newQuantity) => {
    if (newQuantity < 1 || newQuantity > item?.stock) return;
    
    setIsUpdating(true);
    setQuantity(newQuantity);
    await onUpdateQuantity(item?.id, newQuantity);
    setIsUpdating(false);
  };

  const handleRemove = () => {
    onRemove(item?.id);
  };

  const handleMoveToWishlist = () => {
    onMoveToWishlist(item?.id);
  };

  const getTrustScoreColor = (score) => {
    if (score >= 4.5) return 'text-success';
    if (score >= 4.0) return 'text-warning';
    return 'text-muted-foreground';
  };

  const formatPrice = (price, currency = '₹') => {
    return `${currency}${price?.toLocaleString()}`;
  };

  return (
    <div className="bg-card border border-border rounded-lg p-4 lg:p-6 shadow-warm-sm">
      <div className="flex flex-col lg:flex-row gap-4">
        {/* Product Image */}
        <div className="flex-shrink-0">
          <div className="w-full lg:w-24 h-48 lg:h-24 rounded-lg overflow-hidden bg-muted">
            <Image
              src={item?.image}
              alt={item?.title}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Product Details */}
        <div className="flex-grow space-y-3">
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-2">
            <div className="space-y-2">
              <h3 className="font-heading font-semibold text-lg text-foreground line-clamp-2">
                {item?.title}
              </h3>
              
              {/* Artisan Info */}
              <Link 
                to={`/artisan-storefront?id=${item?.artisan?.id}`}
                className="flex items-center space-x-2 text-sm hover:text-primary transition-colors duration-200"
              >
                <div className="w-6 h-6 rounded-full overflow-hidden bg-muted">
                  <Image
                    src={item?.artisan?.avatar}
                    alt={item?.artisan?.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <span className="font-medium text-foreground">{item?.artisan?.name}</span>
                <div className="flex items-center space-x-1">
                  <Icon name="Star" size={14} className={getTrustScoreColor(item?.artisan?.trustScore)} />
                  <span className={`text-xs font-medium ${getTrustScoreColor(item?.artisan?.trustScore)}`}>
                    {item?.artisan?.trustScore}
                  </span>
                </div>
              </Link>

              {/* Cultural Context */}
              <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                <Icon name="MapPin" size={12} />
                <span>{item?.artisan?.location}</span>
                <span>•</span>
                <span>{item?.category}</span>
              </div>

              {/* Stock Status */}
              <div className="flex items-center space-x-2">
                {item?.stock > 10 ? (
                  <span className="text-xs text-success font-medium">In Stock</span>
                ) : item?.stock > 0 ? (
                  <span className="text-xs text-warning font-medium">Only {item?.stock} left</span>
                ) : (
                  <span className="text-xs text-error font-medium">Out of Stock</span>
                )}
              </div>
            </div>

            {/* Price */}
            <div className="text-right">
              <div className="text-xl font-semibold text-foreground">
                {formatPrice(item?.price)}
              </div>
              {item?.originalPrice && item?.originalPrice > item?.price && (
                <div className="text-sm text-muted-foreground line-through">
                  {formatPrice(item?.originalPrice)}
                </div>
              )}
            </div>
          </div>

          {/* Quantity and Actions */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            {/* Quantity Selector */}
            <div className="flex items-center space-x-3">
              <span className="text-sm font-medium text-foreground">Quantity:</span>
              <div className="flex items-center border border-border rounded-lg">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleQuantityChange(quantity - 1)}
                  disabled={quantity <= 1 || isUpdating}
                  className="px-3 py-1 rounded-r-none border-r border-border"
                >
                  <Icon name="Minus" size={16} />
                </Button>
                <span className="px-4 py-1 text-sm font-medium bg-background min-w-[3rem] text-center">
                  {isUpdating ? '...' : quantity}
                </span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleQuantityChange(quantity + 1)}
                  disabled={quantity >= item?.stock || isUpdating}
                  className="px-3 py-1 rounded-l-none border-l border-border"
                >
                  <Icon name="Plus" size={16} />
                </Button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleMoveToWishlist}
                className="text-muted-foreground hover:text-foreground"
              >
                <Icon name="Heart" size={16} />
                <span className="ml-1 hidden lg:inline">Save for Later</span>
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleRemove}
                className="text-muted-foreground hover:text-destructive"
              >
                <Icon name="Trash2" size={16} />
                <span className="ml-1 hidden lg:inline">Remove</span>
              </Button>
            </div>
          </div>

          {/* Item Total */}
          <div className="flex justify-between items-center pt-2 border-t border-border">
            <span className="text-sm text-muted-foreground">Item Total:</span>
            <span className="text-lg font-semibold text-foreground">
              {formatPrice(item?.price * quantity)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;