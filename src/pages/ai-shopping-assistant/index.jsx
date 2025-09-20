import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import ChatMessage from './components/ChatMessage';
import ChatInput from './components/ChatInput';
import ConversationSidebar from './components/ConversationSidebar';
import WelcomeScreen from './components/WelcomeScreen';
import { sendMessageToAI, getProductRecommendations } from '../../lib/gemini';

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

  

  const scrollToBottom = () => {
    messagesEndRef?.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [conversationHistory]);

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
      // Use enhanced AI with conversation history
      const aiTextResponse = await sendMessageToAI(message, conversationHistory);
      
      // Try to get product recommendations if the message seems product-related
      let products = [];
      const productKeywords = ['show', 'find', 'looking for', 'want', 'need', 'buy', 'purchase', 'recommend'];
      const isProductQuery = productKeywords.some(keyword => 
        message.toLowerCase().includes(keyword)
      );
      
      if (isProductQuery) {
        try {
          products = await getProductRecommendations(message, userPreferences);
        } catch (error) {
          console.warn('Could not get product recommendations:', error);
        }
      }

      const aiResponse = {
        id: Date.now() + 1, // Ensure unique ID
        sender: 'ai',
        text: aiTextResponse,
        timestamp: new Date(),
        products: products || [],
        culturalInsight: null // Can be enhanced with cultural insights extraction
      };

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
              <div className="w-10 h-10 rounded-full overflow-hidden bg-accent flex items-center justify-center">
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
                <Icon name="Bot" size={20} color="var(--color-accent-foreground)" className="hidden" />
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