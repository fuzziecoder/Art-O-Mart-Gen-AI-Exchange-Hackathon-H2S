import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const ContactSection = ({ artisan }) => {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [message, setMessage] = useState('');
  const [showMessageForm, setShowMessageForm] = useState(false);

  const handleWishlistToggle = () => {
    setIsWishlisted(!isWishlisted);
  };

  const handleSendMessage = () => {
    if (message?.trim()) {
      // Handle message sending logic here
      console.log('Sending message:', message);
      setMessage('');
      setShowMessageForm(false);
    }
  };

  return (
    <div className="bg-card rounded-xl p-6 lg:p-8 shadow-warm-md">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-primary/10 rounded-lg">
          <Icon name="MessageCircle" size={24} className="text-primary" />
        </div>
        <h2 className="text-xl lg:text-2xl font-heading font-semibold text-foreground">
          Connect with Artisan
        </h2>
      </div>
      {/* Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
        <Button
          variant="default"
          fullWidth
          iconName="MessageSquare"
          iconPosition="left"
          onClick={() => setShowMessageForm(!showMessageForm)}
        >
          Send Message
        </Button>

        <Button
          variant={isWishlisted ? "default" : "outline"}
          fullWidth
          iconName={isWishlisted ? "Heart" : "Heart"}
          iconPosition="left"
          onClick={handleWishlistToggle}
        >
          {isWishlisted ? 'Following' : 'Follow Artisan'}
        </Button>
      </div>
      {/* Message Form */}
      {showMessageForm && (
        <div className="mb-6 p-4 bg-background rounded-lg border border-border">
          <h3 className="font-medium text-foreground mb-3">
            Send a message to {artisan?.name}
          </h3>
          <div className="space-y-3">
            <Input
              type="text"
              placeholder="Type your message here..."
              value={message}
              onChange={(e) => setMessage(e?.target?.value)}
              className="min-h-[80px]"
            />
            <div className="flex gap-2">
              <Button
                variant="default"
                size="sm"
                onClick={handleSendMessage}
                disabled={!message?.trim()}
              >
                Send
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowMessageForm(false)}
              >
                Cancel
              </Button>
            </div>
          </div>
        </div>
      )}
      {/* AI Assistant */}
      <div className="mb-6 p-4 bg-accent/5 rounded-lg border border-accent/20">
        <div className="flex items-start gap-3">
          <div className="p-2 bg-accent/10 rounded-lg flex-shrink-0 overflow-hidden">
            <img 
              src="/chatbot-logo.jpg"
              alt="AI Assistant" 
              className="w-5 h-5 rounded object-cover"
              onError={(e) => {
                // Fallback to Bot icon if logo doesn't load
                e.target.style.display = 'none'
                e.target.nextSibling.style.display = 'block'
              }}
            />
            <Icon name="Bot" size={20} className="text-accent hidden" />
          </div>
          <div className="flex-1">
            <h3 className="font-medium text-foreground mb-2">
              AI Shopping Assistant
            </h3>
            <p className="text-sm text-muted-foreground mb-3">
              Get personalized recommendations and learn more about {artisan?.name}'s crafts through our AI assistant.
            </p>
            <Link to="/ai-shopping-assistant">
              <Button
                variant="outline"
                size="sm"
                iconName="ArrowRight"
                iconPosition="right"
              >
                Chat with AI
              </Button>
            </Link>
          </div>
        </div>
      </div>
      {/* Contact Information */}
      <div className="space-y-4">
        <h3 className="font-medium text-foreground">Contact Information</h3>
        
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <Icon name="MapPin" size={16} className="text-muted-foreground" />
            <span className="text-sm text-muted-foreground">
              {artisan?.location}
            </span>
          </div>
          
          <div className="flex items-center gap-3">
            <Icon name="Clock" size={16} className="text-muted-foreground" />
            <span className="text-sm text-muted-foreground">
              Usually responds within 2-4 hours
            </span>
          </div>
          
          <div className="flex items-center gap-3">
            <Icon name="Languages" size={16} className="text-muted-foreground" />
            <span className="text-sm text-muted-foreground">
              {artisan?.languages?.join(', ')}
            </span>
          </div>
        </div>
      </div>
      {/* Social Proof */}
      <div className="mt-6 pt-6 border-t border-border">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-lg font-semibold text-foreground">
              {artisan?.totalCustomers}+
            </div>
            <div className="text-xs text-muted-foreground">
              Happy Customers
            </div>
          </div>
          <div>
            <div className="text-lg font-semibold text-foreground">
              {artisan?.yearsExperience}
            </div>
            <div className="text-xs text-muted-foreground">
              Years Experience
            </div>
          </div>
          <div>
            <div className="text-lg font-semibold text-foreground">
              {artisan?.totalProducts}
            </div>
            <div className="text-xs text-muted-foreground">
              Products
            </div>
          </div>
        </div>
      </div>
      {/* Trust Indicators */}
      <div className="mt-6 pt-6 border-t border-border">
        <h4 className="font-medium text-foreground mb-3">Trust & Safety</h4>
        <div className="space-y-2">
          {artisan?.trustIndicators?.map((indicator, index) => (
            <div key={index} className="flex items-center gap-2">
              <Icon name="Shield" size={14} className="text-success" />
              <span className="text-sm text-muted-foreground">
                {indicator}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ContactSection;