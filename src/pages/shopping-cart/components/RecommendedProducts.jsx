import React from 'react';
import { Link } from 'react-router-dom';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const RecommendedProducts = ({ products, onAddToCart }) => {
  const formatPrice = (price, currency = '₹') => {
    return `${currency}${price?.toLocaleString()}`;
  };

  const getTrustScoreColor = (score) => {
    if (score >= 4.5) return 'text-success';
    if (score >= 4.0) return 'text-warning';
    return 'text-muted-foreground';
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 shadow-warm-sm">
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-heading font-semibold text-xl text-foreground">
          You might also like
        </h2>
        <Link 
          to="/marketplace-homepage"
          className="text-sm text-primary hover:text-primary/80 transition-colors duration-200"
        >
          View all
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products?.map((product) => (
          <div key={product?.id} className="group">
            <div className="bg-background border border-border rounded-lg overflow-hidden hover:shadow-warm-md transition-all duration-300">
              {/* Product Image */}
              <div className="relative aspect-square overflow-hidden">
                <Image
                  src={product?.image}
                  alt={product?.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                {product?.isNew && (
                  <div className="absolute top-2 left-2 bg-accent text-accent-foreground text-xs font-medium px-2 py-1 rounded-full">
                    New
                  </div>
                )}
                {product?.discount && (
                  <div className="absolute top-2 right-2 bg-success text-success-foreground text-xs font-medium px-2 py-1 rounded-full">
                    -{product?.discount}%
                  </div>
                )}
              </div>

              {/* Product Details */}
              <div className="p-4 space-y-3">
                <div className="space-y-2">
                  <h3 className="font-medium text-foreground line-clamp-2 group-hover:text-primary transition-colors duration-200">
                    {product?.title}
                  </h3>
                  
                  {/* Artisan Info */}
                  <Link 
                    to={`/artisan-storefront?id=${product?.artisan?.id}`}
                    className="flex items-center space-x-2 text-sm hover:text-primary transition-colors duration-200"
                  >
                    <div className="w-5 h-5 rounded-full overflow-hidden bg-muted">
                      <Image
                        src={product?.artisan?.avatar}
                        alt={product?.artisan?.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <span className="text-muted-foreground">{product?.artisan?.name}</span>
                    <div className="flex items-center space-x-1">
                      <Icon name="Star" size={12} className={getTrustScoreColor(product?.artisan?.trustScore)} />
                      <span className={`text-xs ${getTrustScoreColor(product?.artisan?.trustScore)}`}>
                        {product?.artisan?.trustScore}
                      </span>
                    </div>
                  </Link>

                  {/* Location and Category */}
                  <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                    <Icon name="MapPin" size={10} />
                    <span>{product?.artisan?.location}</span>
                    <span>•</span>
                    <span>{product?.category}</span>
                  </div>
                </div>

                {/* Price and Actions */}
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <div className="font-semibold text-foreground">
                      {formatPrice(product?.price)}
                    </div>
                    {product?.originalPrice && product?.originalPrice > product?.price && (
                      <div className="text-xs text-muted-foreground line-through">
                        {formatPrice(product?.originalPrice)}
                      </div>
                    )}
                  </div>
                  
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onAddToCart(product)}
                    iconName="Plus"
                    iconPosition="left"
                    className="opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                  >
                    Add
                  </Button>
                </div>

                {/* Cultural Context */}
                {product?.culturalStory && (
                  <div className="pt-2 border-t border-border">
                    <p className="text-xs text-muted-foreground line-clamp-2">
                      {product?.culturalStory}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* AI Recommendation Note */}
      <div className="mt-6 p-4 bg-muted rounded-lg">
        <div className="flex items-start space-x-3">
          <Icon name="Bot" size={20} className="text-primary flex-shrink-0 mt-0.5" />
          <div className="space-y-1">
            <div className="font-medium text-foreground text-sm">AI Curated for You</div>
            <div className="text-xs text-muted-foreground">
              These products are recommended based on your cart items, browsing history, and preferences for authentic handmade crafts.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecommendedProducts;