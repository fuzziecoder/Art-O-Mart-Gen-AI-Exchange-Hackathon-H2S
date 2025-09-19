import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const RegistrationSuccess = ({ selectedRole, userEmail }) => {
  const getWelcomeMessage = () => {
    if (selectedRole === 'artisan') {
      return {
        title: 'Welcome to Art O Mart, Artisan!',
        subtitle: 'Your creative journey begins now',
        description: `Your artisan account has been successfully created. We've sent a verification email to ${userEmail}. Once verified, you can start building your digital storefront and showcase your beautiful crafts to buyers worldwide.`,
        nextSteps: [
          {
            icon: 'Mail',
            title: 'Verify Your Email',
            description: 'Check your inbox and click the verification link'
          },
          {
            icon: 'Store',
            title: 'Set Up Your Storefront',
            description: 'Create your digital showcase and add your first products'
          },
          {
            icon: 'Palette',
            title: 'Upload Your Crafts',
            description: 'Let AI help you create compelling product stories'
          },
          {
            icon: 'TrendingUp',
            title: 'Start Selling',
            description: 'Connect with buyers and grow your craft business'
          }
        ],
        primaryAction: {
          text: 'Go to Dashboard',
          link: '/artisan-dashboard'
        },
        secondaryAction: {
          text: 'Set Up Storefront',
          link: '/artisan-storefront'
        }
      };
    } else {
      return {
        title: 'Welcome to Art O Mart!',
        subtitle: 'Discover authentic handmade treasures',
        description: `Your buyer account has been successfully created. We've sent a verification email to ${userEmail}. Start exploring unique handcrafted items from talented artisans around the world.`,
        nextSteps: [
          {
            icon: 'Mail',
            title: 'Verify Your Email',
            description: 'Check your inbox and click the verification link'
          },
          {
            icon: 'Compass',
            title: 'Explore Marketplace',
            description: 'Discover unique handcrafted items from local artisans'
          },
          {
            icon: 'Bot',
            title: 'Try AI Assistant',
            description: 'Get personalized recommendations for your interests'
          },
          {
            icon: 'Heart',
            title: 'Build Your Wishlist',
            description: 'Save your favorite artisans and products'
          }
        ],
        primaryAction: {
          text: 'Start Shopping',
          link: '/marketplace-homepage'
        },
        secondaryAction: {
          text: 'Try AI Assistant',
          link: '/ai-shopping-assistant'
        }
      };
    }
  };

  const welcomeData = getWelcomeMessage();

  return (
    <div className="max-w-2xl mx-auto text-center space-y-8">
      {/* Success Animation */}
      <div className="relative">
        <div className="w-24 h-24 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-6">
          <div className="w-16 h-16 bg-success rounded-full flex items-center justify-center">
            <Icon name="Check" size={32} color="var(--color-success-foreground)" />
          </div>
        </div>
        
        {/* Celebration Icons */}
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-4">
          <div className="flex space-x-2">
            <Icon name="Sparkles" size={20} className="text-accent animate-pulse" />
            <Icon name="Star" size={16} className="text-warning animate-pulse delay-100" />
            <Icon name="Sparkles" size={18} className="text-accent animate-pulse delay-200" />
          </div>
        </div>
      </div>
      {/* Welcome Message */}
      <div className="space-y-4">
        <h1 className="text-3xl font-heading font-bold text-foreground">
          {welcomeData?.title}
        </h1>
        <p className="text-lg text-primary font-medium">
          {welcomeData?.subtitle}
        </p>
        <p className="text-muted-foreground leading-relaxed">
          {welcomeData?.description}
        </p>
      </div>
      {/* Next Steps */}
      <div className="bg-card border border-border rounded-xl p-6">
        <h2 className="text-xl font-heading font-semibold text-foreground mb-6">
          What's Next?
        </h2>
        <div className="grid md:grid-cols-2 gap-4">
          {welcomeData?.nextSteps?.map((step, index) => (
            <div
              key={index}
              className="flex items-start space-x-3 p-4 bg-muted/30 rounded-lg"
            >
              <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <Icon name={step?.icon} size={18} className="text-primary" />
              </div>
              <div className="text-left">
                <h3 className="font-medium text-foreground text-sm">
                  {step?.title}
                </h3>
                <p className="text-xs text-muted-foreground mt-1">
                  {step?.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Link to={welcomeData?.primaryAction?.link}>
          <Button variant="default" size="lg" className="w-full sm:w-auto">
            {welcomeData?.primaryAction?.text}
          </Button>
        </Link>
        <Link to={welcomeData?.secondaryAction?.link}>
          <Button variant="outline" size="lg" className="w-full sm:w-auto">
            {welcomeData?.secondaryAction?.text}
          </Button>
        </Link>
      </div>
      {/* Additional Info */}
      <div className="bg-muted/30 border border-border rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <Icon name="Info" size={18} className="text-primary flex-shrink-0 mt-0.5" />
          <div className="text-left text-sm">
            <p className="font-medium text-foreground mb-1">
              Need Help Getting Started?
            </p>
            <p className="text-muted-foreground">
              Our support team is here to help you make the most of Art O Mart. 
              Check out our{' '}
              <button className="text-primary hover:text-primary/80 underline">
                getting started guide
              </button>{' '}
              or{' '}
              <button className="text-primary hover:text-primary/80 underline">
                contact support
              </button>.
            </p>
          </div>
        </div>
      </div>
      {/* Footer Links */}
      <div className="flex flex-wrap gap-6 justify-center text-sm text-muted-foreground">
        <Link to="/help" className="hover:text-primary transition-colors duration-200">
          Help Center
        </Link>
        <Link to="/community" className="hover:text-primary transition-colors duration-200">
          Community Guidelines
        </Link>
        <Link to="/contact" className="hover:text-primary transition-colors duration-200">
          Contact Support
        </Link>
      </div>
    </div>
  );
};

export default RegistrationSuccess;