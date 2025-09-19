import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const ChatMessage = ({ message, onAddToCart, onViewProduct }) => {
  const isUser = message?.sender === 'user';
  
  const formatTime = (timestamp) => {
    return new Date(timestamp)?.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-6`}>
      <div className={`flex max-w-4xl ${isUser ? 'flex-row-reverse' : 'flex-row'} items-start space-x-3`}>
        {/* Avatar */}
        <div className={`flex-shrink-0 ${isUser ? 'ml-3' : 'mr-3'}`}>
          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
            isUser ? 'bg-primary' : 'bg-accent'
          }`}>
            <Icon 
              name={isUser ? 'User' : 'Bot'} 
              size={20} 
              color={isUser ? 'var(--color-primary-foreground)' : 'var(--color-accent-foreground)'} 
            />
          </div>
        </div>

        {/* Message Content */}
        <div className={`flex flex-col ${isUser ? 'items-end' : 'items-start'}`}>
          <div className={`rounded-2xl px-4 py-3 max-w-2xl ${
            isUser 
              ? 'bg-primary text-primary-foreground' 
              : 'bg-card text-card-foreground border border-border'
          }`}>
            {/* Text Content */}
            {message?.text && (
              <p className="text-sm leading-relaxed whitespace-pre-wrap">
                {message?.text}
              </p>
            )}

            {/* Product Recommendations */}
            {message?.products && message?.products?.length > 0 && (
              <div className="mt-4 space-y-3">
                {message?.products?.map((product) => (
                  <div key={product?.id} className="bg-background rounded-lg border border-border p-4">
                    <div className="flex space-x-4">
                      <div className="flex-shrink-0">
                        <div className="w-20 h-20 rounded-lg overflow-hidden">
                          <Image
                            src={product?.image}
                            alt={product?.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-semibold text-foreground mb-1">
                          {product?.name}
                        </h4>
                        <p className="text-xs text-muted-foreground mb-2">
                          by {product?.artisan}
                        </p>
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-semibold text-primary">
                            ₹{product?.price?.toLocaleString()}
                          </span>
                          <div className="flex items-center space-x-1">
                            <Icon name="Star" size={12} className="text-warning fill-current" />
                            <span className="text-xs text-muted-foreground">
                              {product?.rating}
                            </span>
                          </div>
                        </div>
                        
                        <div className="flex space-x-2 mt-3">
                          <Button
                            variant="outline"
                            size="xs"
                            onClick={() => onViewProduct(product?.id)}
                            className="text-xs"
                          >
                            View Details
                          </Button>
                          <Button
                            variant="default"
                            size="xs"
                            iconName="ShoppingCart"
                            iconPosition="left"
                            iconSize={12}
                            onClick={() => onAddToCart(product?.id)}
                            className="text-xs"
                          >
                            Add to Cart
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Cultural Insights */}
            {message?.culturalInsight && (
              <div className="mt-4 p-3 bg-muted rounded-lg border-l-4 border-accent">
                <div className="flex items-start space-x-2">
                  <Icon name="Lightbulb" size={16} className="text-accent mt-0.5" />
                  <div>
                    <h5 className="text-xs font-semibold text-foreground mb-1">
                      Cultural Insight
                    </h5>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {message?.culturalInsight}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Timestamp */}
          <span className="text-xs text-muted-foreground mt-1 px-2">
            {formatTime(message?.timestamp)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;