import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import ChatMessage from './components/ChatMessage';
import ChatInput from './components/ChatInput';
import ConversationSidebar from './components/ConversationSidebar';
import WelcomeScreen from './components/WelcomeScreen';

const AIShoppingAssistant = () => {
  const navigate = useNavigate();
  const messagesEndRef = useRef(null);
  const [conversationHistory, setConversationHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [showWelcome, setShowWelcome] = useState(true);
  
  const [userPreferences, setUserPreferences] = useState({
    budgetMin: 500,
    budgetMax: 10000,
    regions: ['Rajasthan', 'Kerala', 'West Bengal'],
    culturalStories: true,
    craftTypes: ['Textiles', 'Pottery', 'Jewelry']
  });

  // Mock product data for recommendations
  const mockProducts = [
    {
      id: 1,
      name: "Handwoven Rajasthani Carpet",
      artisan: "Meera Sharma",
      price: 8500,
      rating: 4.8,
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=400&fit=crop"
    },
    {
      id: 2,
      name: "Kerala Traditional Pottery Set",
      artisan: "Ravi Kumar",
      price: 2200,
      rating: 4.6,
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=400&fit=crop"
    },
    {
      id: 3,
      name: "Bengali Silver Jewelry",
      artisan: "Anita Das",
      price: 4500,
      rating: 4.9,
      image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&h=400&fit=crop"
    },
    {
      id: 4,
      name: "Kashmiri Pashmina Shawl",
      artisan: "Abdul Rahman",
      price: 12000,
      rating: 4.7,
      image: "https://images.unsplash.com/photo-1544441893-675973e31985?w=400&h=400&fit=crop"
    }
  ];

  const scrollToBottom = () => {
    messagesEndRef?.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [conversationHistory]);

  const generateAIResponse = (userMessage) => {
    const lowerMessage = userMessage?.toLowerCase();
    
    // Simulate AI processing delay
    return new Promise((resolve) => {
      setTimeout(() => {
        let response = {
          id: Date.now(),
          sender: 'ai',
          timestamp: new Date(),
          text: '',
          products: [],
          culturalInsight: null
        };

        // Pattern matching for different types of queries
        if (lowerMessage.includes('rajasth') || lowerMessage.includes('carpet') || lowerMessage.includes('textile')) {
          response.text = `I found some beautiful Rajasthani crafts that match your interests! Rajasthan is renowned for its vibrant textiles and intricate carpet weaving traditions that date back centuries.`;
          response.products = [mockProducts[0], mockProducts[3]];
          response.culturalInsight = `Rajasthani carpets are traditionally woven using techniques passed down through generations. The intricate patterns often tell stories of desert life and royal heritage.`;
        } else if (lowerMessage.includes('pottery') || lowerMessage.includes('kerala')) {
          response.text = `Kerala's pottery tradition is truly remarkable! Here are some authentic pieces from skilled artisans who continue this ancient craft.`;
          response.products = [mockProducts[1]];
          response.culturalInsight = `Kerala pottery, known as 'Kalamezhuthu', uses locally sourced clay and traditional firing techniques that create unique textures and durability.`;
        } else if (lowerMessage.includes('jewelry') || lowerMessage.includes('bengal')) {
          response.text = `Bengali jewelry craftsmanship is exquisite! These pieces showcase the region's rich artistic heritage and attention to detail.`;
          response.products = [mockProducts[2]];
          response.culturalInsight = `Bengali silver jewelry often incorporates motifs from nature and mythology, reflecting the region's deep connection to art and literature.`;
        } else if (lowerMessage.includes('budget') || lowerMessage.includes('under') || lowerMessage.includes('₹')) {
          const budgetMatch = lowerMessage.match(/₹?(\d+)/);
          const budget = budgetMatch ? parseInt(budgetMatch[1]) : 5000;
          const affordableProducts = mockProducts.filter(p => p.price <= budget);
          
          response.text = `I found ${affordableProducts.length} beautiful handcrafted items within your budget of ₹${budget.toLocaleString()}. Each piece represents authentic craftsmanship and cultural heritage.`;
          response.products = affordableProducts.slice(0, 2);
        } else if (lowerMessage.includes('south india') || lowerMessage.includes('popular')) {
          response.text = `South India is famous for several traditional crafts! Here are some popular items that showcase the region's artistic excellence.`;
          response.products = [mockProducts[1], mockProducts[2]];
          response.culturalInsight = `South Indian crafts are deeply rooted in temple traditions and classical arts, with each region having its unique specialties like Tanjore paintings, Mysore silk, and Chettinad pottery.`;
        } else {
          response.text = `I'd be happy to help you discover authentic handcrafted treasures! Based on your query, here are some recommendations that might interest you. Each piece comes with a story of cultural heritage and skilled craftsmanship.`;
          response.products = mockProducts.slice(0, 2);
          response.culturalInsight = `Indian handicrafts represent thousands of years of cultural evolution, with each region developing unique techniques and artistic expressions that reflect local traditions and natural resources.`;
        }

        resolve(response);
      }, 1500);
    });
  };

  const handleSendMessage = async (message) => {
    if (showWelcome) {
      setShowWelcome(false);
    }

    // Add user message
    const userMessage = {
      id: Date.now(),
      sender: 'user',
      text: message,
      timestamp: new Date()
    };

    setConversationHistory(prev => [...prev, userMessage]);
    setIsLoading(true);

    try {
      const aiResponse = await generateAIResponse(message);
      setConversationHistory(prev => [...prev, aiResponse]);
    } catch (error) {
      console.error('Error generating AI response:', error);
      const errorResponse = {
        id: Date.now(),
        sender: 'ai',
        text: 'I apologize, but I encountered an issue processing your request. Please try again or rephrase your question.',
        timestamp: new Date()
      };
      setConversationHistory(prev => [...prev, errorResponse]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleStartConversation = (initialMessage = null) => {
    setShowWelcome(false);
    if (initialMessage) {
      handleSendMessage(initialMessage);
    }
  };

  const handleAddToCart = (productId) => {
    // Simulate adding to cart
    console.log('Adding product to cart:', productId);
    // In a real app, this would update cart state
  };

  const handleViewProduct = (productId) => {
    // Navigate to product details
    navigate(`/product/${productId}`);
  };

  const handleResetConversation = () => {
    setConversationHistory([]);
    setShowWelcome(true);
    setIsSidebarOpen(false);
  };

  const handleUpdatePreferences = (newPreferences) => {
    setUserPreferences(newPreferences);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="pt-20 h-screen flex">
        {/* Main Chat Area */}
        <div className="flex-1 flex flex-col">
          {/* Chat Header */}
          <div className="flex items-center justify-between p-4 border-b border-border bg-card">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-accent rounded-full flex items-center justify-center">
                <Icon name="Bot" size={20} color="var(--color-accent-foreground)" />
              </div>
              <div>
                <h2 className="text-lg font-heading font-semibold text-foreground">
                  AI Shopping Assistant
                </h2>
                <p className="text-sm text-muted-foreground">
                  {isLoading ? 'Thinking...' : 'Ready to help you discover amazing crafts'}
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                iconName="RotateCcw"
                iconPosition="left"
                onClick={handleResetConversation}
                disabled={conversationHistory?.length === 0}
              >
                Reset
              </Button>
              
              <Button
                variant="outline"
                size="icon"
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="lg:hidden"
              >
                <Icon name="Menu" size={20} />
              </Button>
            </div>
          </div>

          {/* Chat Messages or Welcome Screen */}
          <div className="flex-1 overflow-y-auto">
            {showWelcome ? (
              <WelcomeScreen onStartConversation={handleStartConversation} />
            ) : (
              <div className="p-4 space-y-4">
                {conversationHistory?.map((message) => (
                  <ChatMessage
                    key={message?.id}
                    message={message}
                    onAddToCart={handleAddToCart}
                    onViewProduct={handleViewProduct}
                  />
                ))}
                <div ref={messagesEndRef} />
              </div>
            )}
          </div>

          {/* Chat Input */}
          {!showWelcome && (
            <ChatInput
              onSendMessage={handleSendMessage}
              isLoading={isLoading}
            />
          )}
        </div>

        {/* Conversation Sidebar */}
        <ConversationSidebar
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
          conversationHistory={conversationHistory}
          userPreferences={userPreferences}
          onResetConversation={handleResetConversation}
          onUpdatePreferences={handleUpdatePreferences}
        />
      </div>
    </div>
  );
};

export default AIShoppingAssistant;