import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const WelcomeScreen = ({ onStartConversation }) => {
  const features = [
    {
      icon: 'Search',
      title: 'Smart Product Discovery',
      description: 'Find unique handcrafted items using natural language queries'
    },
    {
      icon: 'Heart',
      title: 'Cultural Insights',
      description: 'Learn about the rich heritage and stories behind each craft'
    },
    {
      icon: 'Users',
      title: 'Artisan Connections',
      description: 'Discover talented artisans and their authentic creations'
    },
    {
      icon: 'Sparkles',
      title: 'Personalized Recommendations',
      description: 'Get curated suggestions based on your preferences and interests'
    }
  ];

  const sampleQueries = [
    "Show me traditional pottery from Rajasthan under ₹3000",
    "I'm looking for handwoven textiles with cultural significance",
    "Find jewelry pieces that tell a story",
    "What are the most popular crafts from South India?"
  ];

  return (
    <div className="flex-1 flex items-center justify-center p-6">
      <div className="max-w-2xl mx-auto text-center">
        {/* Welcome Header */}
        <div className="mb-8">
          <div className="w-20 h-20 bg-accent rounded-full flex items-center justify-center mx-auto mb-4">
            <Icon name="Bot" size={32} color="var(--color-accent-foreground)" />
          </div>
          
          <h1 className="text-3xl font-heading font-bold text-foreground mb-2">
            AI Shopping Assistant
          </h1>
          
          <p className="text-lg text-muted-foreground mb-6">
            Discover authentic handcrafted treasures with intelligent recommendations and cultural insights
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {features?.map((feature, index) => (
            <div key={index} className="p-6 bg-card border border-border rounded-xl">
              <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center mx-auto mb-4">
                <Icon name={feature?.icon} size={24} color="var(--color-primary-foreground)" />
              </div>
              
              <h3 className="text-lg font-semibold text-foreground mb-2">
                {feature?.title}
              </h3>
              
              <p className="text-sm text-muted-foreground">
                {feature?.description}
              </p>
            </div>
          ))}
        </div>

        {/* Sample Queries */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-foreground mb-4">
            Try asking me about:
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {sampleQueries?.map((query, index) => (
              <button
                key={index}
                onClick={() => onStartConversation(query)}
                className="p-4 text-left bg-muted hover:bg-muted/80 rounded-lg transition-colors duration-200 group"
              >
                <div className="flex items-start space-x-3">
                  <Icon 
                    name="MessageCircle" 
                    size={16} 
                    className="text-primary mt-1 group-hover:scale-110 transition-transform duration-200" 
                  />
                  <p className="text-sm text-foreground group-hover:text-primary transition-colors duration-200">
                    "{query}"
                  </p>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Start Button */}
        <div className="space-y-4">
          <Button
            variant="default"
            size="lg"
            onClick={() => onStartConversation()}
            iconName="MessageCircle"
            iconPosition="left"
            className="px-8"
          >
            Start Conversation
          </Button>
          
          <p className="text-xs text-muted-foreground">
            Powered by AI • Available 24/7 • Multilingual Support
          </p>
        </div>

        {/* Trust Indicators */}
        <div className="mt-12 pt-8 border-t border-border">
          <div className="flex items-center justify-center space-x-8 text-muted-foreground">
            <div className="flex items-center space-x-2">
              <Icon name="Shield" size={16} />
              <span className="text-sm">Secure & Private</span>
            </div>
            
            <div className="flex items-center space-x-2">
              <Icon name="Zap" size={16} />
              <span className="text-sm">Instant Responses</span>
            </div>
            
            <div className="flex items-center space-x-2">
              <Icon name="Globe" size={16} />
              <span className="text-sm">Cultural Expertise</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomeScreen;