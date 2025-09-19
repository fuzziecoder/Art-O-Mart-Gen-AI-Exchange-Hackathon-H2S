import React, { useState, useRef } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ChatInput = ({ onSendMessage, isLoading }) => {
  const [message, setMessage] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const textareaRef = useRef(null);

  const suggestedQueries = [
    "Show me handwoven textiles from Rajasthan",
    "I\'m looking for pottery under ₹2000",
    "Find jewelry with cultural significance",
    "What crafts are popular in South India?"
  ];

  const handleSubmit = (e) => {
    e?.preventDefault();
    if (message?.trim() && !isLoading) {
      onSendMessage(message?.trim());
      setMessage('');
      if (textareaRef?.current) {
        textareaRef.current.style.height = 'auto';
      }
    }
  };

  const handleKeyPress = (e) => {
    if (e?.key === 'Enter' && !e?.shiftKey) {
      e?.preventDefault();
      handleSubmit(e);
    }
  };

  const handleTextareaChange = (e) => {
    setMessage(e?.target?.value);
    
    // Auto-resize textarea
    if (textareaRef?.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef?.current?.scrollHeight, 120)}px`;
    }
  };

  const handleSuggestedQuery = (query) => {
    if (!isLoading) {
      onSendMessage(query);
    }
  };

  const toggleRecording = () => {
    setIsRecording(!isRecording);
    // In a real implementation, this would handle voice recording
    if (!isRecording) {
      // Start recording
      setTimeout(() => {
        setIsRecording(false);
        onSendMessage("Voice message: Show me traditional crafts from Kerala");
      }, 2000);
    }
  };

  return (
    <div className="border-t border-border bg-background p-4">
      {/* Suggested Queries */}
      <div className="mb-4">
        <div className="flex flex-wrap gap-2">
          {suggestedQueries?.map((query, index) => (
            <button
              key={index}
              onClick={() => handleSuggestedQuery(query)}
              disabled={isLoading}
              className="px-3 py-1.5 text-xs bg-muted hover:bg-muted/80 text-muted-foreground rounded-full transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {query}
            </button>
          ))}
        </div>
      </div>
      {/* Input Form */}
      <form onSubmit={handleSubmit} className="flex items-end space-x-3">
        {/* Voice Recording Button */}
        <Button
          type="button"
          variant={isRecording ? "destructive" : "outline"}
          size="icon"
          onClick={toggleRecording}
          disabled={isLoading}
          className="flex-shrink-0"
        >
          <Icon 
            name={isRecording ? "Square" : "Mic"} 
            size={18} 
            className={isRecording ? "animate-pulse" : ""} 
          />
        </Button>

        {/* Text Input */}
        <div className="flex-1 relative">
          <textarea
            ref={textareaRef}
            value={message}
            onChange={handleTextareaChange}
            onKeyPress={handleKeyPress}
            placeholder="Ask me about crafts, artisans, or specific products..."
            disabled={isLoading || isRecording}
            className="w-full px-4 py-3 pr-12 bg-input border border-border rounded-2xl resize-none focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent text-sm placeholder:text-muted-foreground disabled:opacity-50 disabled:cursor-not-allowed"
            rows="1"
            style={{ minHeight: '48px', maxHeight: '120px' }}
          />
          
          {/* Character Count */}
          <div className="absolute bottom-2 right-3 text-xs text-muted-foreground">
            {message?.length}/500
          </div>
        </div>

        {/* Send Button */}
        <Button
          type="submit"
          variant="default"
          size="icon"
          disabled={!message?.trim() || isLoading || isRecording}
          loading={isLoading}
          className="flex-shrink-0"
        >
          <Icon name="Send" size={18} />
        </Button>
      </form>
      {/* Recording Indicator */}
      {isRecording && (
        <div className="mt-3 flex items-center justify-center space-x-2 text-destructive">
          <div className="w-2 h-2 bg-destructive rounded-full animate-pulse"></div>
          <span className="text-sm font-medium">Recording... Tap to stop</span>
        </div>
      )}
      {/* Loading Indicator */}
      {isLoading && (
        <div className="mt-3 flex items-center justify-center space-x-2 text-muted-foreground">
          <div className="flex space-x-1">
            <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"></div>
            <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
            <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
          </div>
          <span className="text-sm">AI is thinking...</span>
        </div>
      )}
    </div>
  );
};

export default ChatInput;