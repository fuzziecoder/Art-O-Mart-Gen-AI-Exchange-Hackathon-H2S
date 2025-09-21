import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Icon from './AppIcon';
import SmartProductImage from './SmartProductImage';
import { 
  conversationAgent, 
  recommendationAgent, 
  culturalAdaptationAgent,
  trustEngineAgent,
  imageFallbackAgent 
} from '../lib/aiAgents';
import { speechUtils } from '../lib/multimodalRag';

const AIChatAssistant = ({ 
  className = "",
  initialMessage = "Hello! I'm your AI assistant for Art O Mart. How can I help you discover amazing handcrafted products today?",
  userContext = {},
  onProductClick = () => {}
}) => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'ai',
      content: initialMessage,
      timestamp: new Date(),
      agent: 'conversation'
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [currentAgent, setCurrentAgent] = useState('conversation');
  const [suggestions, setSuggestions] = useState([]);
  const messagesEndRef = useRef(null);

  const agentInfo = {
    conversation: { name: 'Maya', color: 'blue', icon: 'MessageCircle' },
    cultural: { name: 'Cultural Expert', color: 'orange', icon: 'Globe' },
    trust: { name: 'Trust Analyzer', color: 'purple', icon: 'Shield' },
    recommendation: { name: 'Product Finder', color: 'green', icon: 'Search' },
    image: { name: 'Visual Assistant', color: 'pink', icon: 'Image' }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    // Load initial product suggestions
    loadSuggestions();
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const loadSuggestions = async () => {
    try {
      const mockPreferences = {
        region: userContext.region || 'general',
        interests: ['textiles', 'traditional'],
        priceRange: 'medium'
      };
      
      const recommendations = await recommendationAgent(mockPreferences, [], userContext);
      setSuggestions(recommendations.recommendations || []);
    } catch (error) {
      console.error('Error loading suggestions:', error);
    }
  };

  const detectIntent = (message) => {
    const lowerMessage = message.toLowerCase();
    
    if (lowerMessage.includes('trust') || lowerMessage.includes('authentic') || lowerMessage.includes('verify')) {
      return 'trust';
    }
    if (lowerMessage.includes('cultural') || lowerMessage.includes('tradition') || lowerMessage.includes('heritage')) {
      return 'cultural';
    }
    if (lowerMessage.includes('recommend') || lowerMessage.includes('suggest') || lowerMessage.includes('find')) {
      return 'recommendation';
    }
    if (lowerMessage.includes('image') || lowerMessage.includes('photo') || lowerMessage.includes('picture')) {
      return 'image';
    }
    
    return 'conversation';
  };

  const handleSendMessage = async (message = inputMessage) => {
    if (!message.trim() || isLoading) return;

    const userMessage = {
      id: Date.now(),
      type: 'user',
      content: message.trim(),
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    try {
      const intent = detectIntent(message);
      setCurrentAgent(intent);
      
      let response;
      let agent = intent;

      switch (intent) {
        case 'trust':
          // Analyze trust for a sample product
          const sampleProduct = {
            title: "Handwoven Banarasi Silk Saree",
            description: "Traditional silk saree with gold zari work",
            region: "Uttar Pradesh",
            artisan: { name: "Master Weaver", verified: true }
          };
          response = await trustEngineAgent(sampleProduct, {});
          response = {
            response: `Based on AI analysis, this product has a trust score of ${response.trustScore}/100 with badge: ${response.badge}. Key authenticity indicators: ${response.reasons?.join(', ')}.`,
            trustData: response
          };
          break;

        case 'cultural':
          response = await culturalAdaptationAgent(
            "Traditional handwoven textiles with intricate patterns",
            userContext.region || 'general',
            'rajasthan',
            'textiles'
          );
          response = {
            response: `Here's how we can adapt this culturally: ${response.adaptedDescription}. Cultural bridge: ${response.culturalBridge}`,
            culturalData: response
          };
          break;

        case 'recommendation':
          response = await recommendationAgent(
            { region: userContext.region, query: message },
            [],
            userContext
          );
          response = {
            response: `Based on your preferences, I recommend these products: ${response.recommendations?.map(r => r.title).join(', ')}`,
            recommendations: response.recommendations || []
          };
          break;

        case 'image':
          const imageData = {
            title: "Traditional Handicraft",
            category: "textiles",
            region: "rajasthan"
          };
          response = await imageFallbackAgent(imageData, {});
          response = {
            response: `Here's an AI-generated image description: ${response.imagePrompt}`,
            imageData: response
          };
          break;

        default:
          response = await conversationAgent(message, messages.slice(-3), userContext);
          break;
      }

      const aiMessage = {
        id: Date.now() + 1,
        type: 'ai',
        content: response.response || response,
        timestamp: new Date(),
        agent: agent,
        data: response.trustData || response.culturalData || response.recommendations || response.imageData
      };

      setMessages(prev => [...prev, aiMessage]);

      // Update suggestions if we got recommendations
      if (response.recommendations) {
        setSuggestions(response.recommendations);
      }

    } catch (error) {
      console.error('Error processing message:', error);
      const errorMessage = {
        id: Date.now() + 1,
        type: 'ai',
        content: "I apologize, but I'm having trouble processing your request right now. Please try again.",
        timestamp: new Date(),
        agent: 'conversation'
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const startVoiceInput = () => {
    setIsListening(true);
    const recognition = speechUtils.speechToText((transcript) => {
      setInputMessage(transcript);
      setIsListening(false);
    }, speechUtils.languageCodes[userContext.language] || 'en-US');

    if (!recognition) {
      setIsListening(false);
      alert('Speech recognition not supported in your browser');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleSuggestionClick = (suggestion) => {
    handleSendMessage(`Tell me more about ${suggestion.title || suggestion}`);
  };

  const playMessageAudio = (message) => {
    const language = speechUtils.languageCodes[userContext.language] || 'en-US';
    speechUtils.textToSpeech(message.content, language);
  };

  return (
    <div className={`ai-chat-assistant flex flex-col h-full bg-white rounded-lg shadow-lg ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-t-lg">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
            <Icon name={agentInfo[currentAgent].icon} size={20} />
          </div>
          <div>
            <h3 className="font-semibold">{agentInfo[currentAgent].name}</h3>
            <p className="text-sm text-blue-100">AI Assistant for Art O Mart</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-green-400 rounded-full"></div>
          <span className="text-sm">Online</span>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 max-h-96">
        <AnimatePresence>
          {messages.map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                message.type === 'user'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-900'
              }`}>
                {message.type === 'ai' && (
                  <div className="flex items-center space-x-2 mb-1">
                    <Icon 
                      name={agentInfo[message.agent]?.icon || 'MessageCircle'} 
                      size={12} 
                      className={`text-${agentInfo[message.agent]?.color || 'blue'}-600`}
                    />
                    <span className="text-xs text-gray-500">
                      {agentInfo[message.agent]?.name || 'AI Assistant'}
                    </span>
                  </div>
                )}
                
                <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                
                {/* Special data displays */}
                {message.data && message.agent === 'trust' && (
                  <div className="mt-2 p-2 bg-purple-50 rounded text-xs">
                    <div className="font-medium">Trust Score: {message.data.trustScore}/100</div>
                    <div className="text-purple-700">Badge: {message.data.badge}</div>
                  </div>
                )}
                
                {message.data && message.agent === 'recommendation' && (
                  <div className="mt-2 space-y-1">
                    {message.data.slice(0, 2).map((rec, idx) => (
                      <div key={idx} className="p-2 bg-green-50 rounded text-xs cursor-pointer hover:bg-green-100"
                           onClick={() => onProductClick(rec)}>
                        <div className="font-medium">{rec.title}</div>
                        <div className="text-green-700">{rec.reason}</div>
                      </div>
                    ))}
                  </div>
                )}

                <div className="flex items-center justify-between mt-2">
                  <span className="text-xs opacity-70">
                    {message.timestamp.toLocaleTimeString()}
                  </span>
                  {message.type === 'ai' && (
                    <button
                      onClick={() => playMessageAudio(message)}
                      className="text-xs opacity-70 hover:opacity-100"
                      title="Play audio"
                    >
                      <Icon name="Volume2" size={12} />
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-gray-100 rounded-lg px-4 py-2">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                <span className="text-sm text-gray-600 ml-2">AI thinking...</span>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Suggestions */}
      {suggestions.length > 0 && (
        <div className="px-4 py-2 border-t border-gray-200">
          <div className="flex space-x-2 overflow-x-auto">
            {suggestions.slice(0, 3).map((suggestion, index) => (
              <button
                key={index}
                onClick={() => handleSuggestionClick(suggestion)}
                className="flex-shrink-0 px-3 py-1 text-xs bg-blue-100 text-blue-700 rounded-full hover:bg-blue-200 transition-colors"
              >
                {suggestion.title || suggestion}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input */}
      <div className="p-4 border-t border-gray-200">
        <div className="flex items-end space-x-2">
          <div className="flex-1 relative">
            <textarea
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask about products, cultural context, trust verification..."
              className="w-full p-3 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={1}
              style={{ minHeight: '44px', maxHeight: '120px' }}
            />
          </div>
          
          <button
            onClick={startVoiceInput}
            disabled={isListening}
            className={`p-3 rounded-lg transition-colors ${
              isListening 
                ? 'bg-red-500 text-white animate-pulse' 
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
            title={isListening ? "Listening..." : "Voice input"}
          >
            <Icon name={isListening ? "Square" : "Mic"} size={16} />
          </button>
          
          <button
            onClick={() => handleSendMessage()}
            disabled={!inputMessage.trim() || isLoading}
            className="p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            title="Send message"
          >
            <Icon name="Send" size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AIChatAssistant;
