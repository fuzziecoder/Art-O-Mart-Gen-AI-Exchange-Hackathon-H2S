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
          <div className={`w-10 h-10 rounded-full flex items-center justify-center overflow-hidden ${
            isUser ? 'bg-primary' : 'bg-accent'
          }`}>
            {isUser ? (
              <Icon 
                name="User" 
                size={20} 
                color="var(--color-primary-foreground)"
              />
            ) : (
              <>
                <img 
                  src="/chatbot-logo.jpg"
                  alt="AI Assistant" 
                  className="w-8 h-8 rounded-full object-cover"
                  onError={(e) => {
                    // Fallback to Bot icon if logo doesn't load
                    e.target.style.display = 'none'
                    e.target.nextSibling.style.display = 'flex'
                  }}
                />
                <Icon 
                  name="Bot" 
                  size={20} 
                  color="var(--color-accent-foreground)" 
                  className="hidden"
                />
              </>
            )}
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
              <div className="mt-4">
                <h5 className="text-xs font-semibold text-card-foreground mb-3 flex items-center">
                  <Icon name="Package" size={14} className="mr-2" />
                  Recommended Products
                </h5>
                <div className="space-y-3">
                  {message?.products?.map((product, index) => (
                    <div key={index} className="bg-background rounded-lg border border-border p-4">
                      <div className="flex space-x-4">
                        {/* Product Icon/Category */}
                        <div className="flex-shrink-0">
                          <div className="w-16 h-16 rounded-lg bg-muted flex items-center justify-center">
                            <Icon 
                              name={product?.category === 'Pottery' ? 'Coffee' : 
                                   product?.category === 'Textiles' ? 'Shirt' : 
                                   product?.category === 'Jewelry' ? 'Diamond' : 
                                   'Package'} 
                              size={20} 
                              className="text-muted-foreground" 
                            />
                          </div>
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <h4 className="text-sm font-semibold text-foreground mb-1">
                            {product?.name}
                          </h4>
                          <div className="flex items-center space-x-2 mb-2">
                            <span className="text-xs px-2 py-1 bg-primary/10 text-primary rounded-full">
                              {product?.category}
                            </span>
                            <span className="text-xs text-muted-foreground flex items-center">
                              <Icon name="MapPin" size={10} className="mr-1" />
                              {product?.region}
                            </span>
                          </div>
                          
                          <p className="text-xs text-muted-foreground mb-2">
                            {product?.description}
                          </p>
                          
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-semibold text-primary">
                              {product?.priceRange}
                            </span>
                          </div>
                          
                          {/* Cultural Significance */}
                          {product?.culturalSignificance && (
                            <div className="mb-2 p-2 bg-accent/10 rounded border-l-2 border-accent">
                              <p className="text-xs text-foreground leading-relaxed">
                                <Icon name="Heart" size={10} className="inline mr-1 text-accent" />
                                {product?.culturalSignificance}
                              </p>
                            </div>
                          )}
                          
                          {/* Artisan Info */}
                          {product?.artisanInfo && (
                            <div className="mb-3 p-2 bg-muted rounded">
                              <p className="text-xs text-muted-foreground">
                                <Icon name="User" size={10} className="inline mr-1" />
                                {product?.artisanInfo}
                              </p>
                            </div>
                          )}
                          
                          <div className="flex space-x-2">
                            <Button
                              variant="outline"
                              size="xs"
                              onClick={() => onViewProduct(product?.name)}
                              className="text-xs"
                            >
                              Learn More
                            </Button>
                            <Button
                              variant="default"
                              size="xs"
                              iconName="ShoppingCart"
                              iconPosition="left"
                              iconSize={12}
                              onClick={() => onAddToCart(product?.name)}
                              className="text-xs"
                            >
                              Find Similar
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
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