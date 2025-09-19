import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const EmptyCart = () => {
  const suggestedActions = [
    {
      title: "Explore Marketplace",
      description: "Discover authentic handmade products from local artisans",
      icon: "Compass",
      link: "/marketplace-homepage",
      variant: "default"
    },
    {
      title: "Get AI Recommendations",
      description: "Let our AI assistant help you find perfect products",
      icon: "Bot",
      link: "/ai-shopping-assistant",
      variant: "outline"
    },
    {
      title: "Browse Artisan Stories",
      description: "Learn about talented artisans and their crafts",
      icon: "Users",
      link: "/artisan-storefront",
      variant: "ghost"
    }
  ];

  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="text-center max-w-md mx-auto px-4">
        {/* Empty Cart Icon */}
        <div className="w-24 h-24 mx-auto mb-6 bg-muted rounded-full flex items-center justify-center">
          <Icon name="ShoppingCart" size={48} className="text-muted-foreground" />
        </div>

        {/* Main Message */}
        <h2 className="font-heading font-semibold text-2xl text-foreground mb-3">
          Your cart is empty
        </h2>
        <p className="text-muted-foreground mb-8">
          Looks like you haven't added any authentic handmade products to your cart yet. 
          Discover amazing crafts from talented artisans!
        </p>

        {/* Suggested Actions */}
        <div className="space-y-3 mb-8">
          {suggestedActions?.map((action, index) => (
            <Link key={index} to={action?.link} className="block">
              <Button
                variant={action?.variant}
                size="lg"
                fullWidth
                iconName={action?.icon}
                iconPosition="left"
                className="justify-start text-left"
              >
                <div className="flex flex-col items-start ml-2">
                  <span className="font-medium">{action?.title}</span>
                  <span className="text-xs opacity-75">{action?.description}</span>
                </div>
              </Button>
            </Link>
          ))}
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-4 text-center text-sm">
          <div className="space-y-1">
            <div className="font-semibold text-primary">500+</div>
            <div className="text-muted-foreground">Artisans</div>
          </div>
          <div className="space-y-1">
            <div className="font-semibold text-primary">2000+</div>
            <div className="text-muted-foreground">Products</div>
          </div>
          <div className="space-y-1">
            <div className="font-semibold text-primary">4.8★</div>
            <div className="text-muted-foreground">Rating</div>
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="mt-8 pt-6 border-t border-border">
          <div className="flex items-center justify-center space-x-6 text-xs text-muted-foreground">
            <div className="flex items-center space-x-1">
              <Icon name="Shield" size={14} className="text-success" />
              <span>Secure Shopping</span>
            </div>
            <div className="flex items-center space-x-1">
              <Icon name="Truck" size={14} className="text-primary" />
              <span>Free Shipping</span>
            </div>
            <div className="flex items-center space-x-1">
              <Icon name="RotateCcw" size={14} className="text-primary" />
              <span>Easy Returns</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmptyCart;