import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ConversationSidebar = ({ 
  isOpen, 
  onClose, 
  conversationHistory, 
  userPreferences, 
  onResetConversation,
  onUpdatePreferences 
}) => {
  const recentTopics = [
    { id: 1, topic: "Rajasthani Textiles", count: 5, timestamp: new Date(Date.now() - 3600000) },
    { id: 2, topic: "Kerala Pottery", count: 3, timestamp: new Date(Date.now() - 7200000) },
    { id: 3, topic: "Kashmiri Carpets", count: 8, timestamp: new Date(Date.now() - 86400000) },
    { id: 4, topic: "Bengali Jewelry", count: 2, timestamp: new Date(Date.now() - 172800000) }
  ];

  const formatRelativeTime = (timestamp) => {
    const now = new Date();
    const diff = now - timestamp;
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(hours / 24);
    
    if (days > 0) return `${days}d ago`;
    if (hours > 0) return `${hours}h ago`;
    return 'Just now';
  };

  const handlePreferenceToggle = (key, value) => {
    onUpdatePreferences({
      ...userPreferences,
      [key]: value
    });
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black/50 z-40"
          onClick={onClose}
        />
      )}
      {/* Sidebar */}
      <div className={`
        fixed lg:relative top-0 right-0 h-full w-80 bg-card border-l border-border z-50 transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : 'translate-x-full lg:translate-x-0'}
      `}>
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-border">
            <h3 className="text-lg font-heading font-semibold text-foreground">
              Conversation
            </h3>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="lg:hidden"
            >
              <Icon name="X" size={20} />
            </Button>
          </div>

          <div className="flex-1 overflow-y-auto">
            {/* User Preferences */}
            <div className="p-4 border-b border-border">
              <h4 className="text-sm font-semibold text-foreground mb-3">
                Your Preferences
              </h4>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Budget Range</span>
                  <span className="text-sm font-medium text-foreground">
                    ₹{userPreferences?.budgetMin?.toLocaleString()} - ₹{userPreferences?.budgetMax?.toLocaleString()}
                  </span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Preferred Regions</span>
                  <div className="flex flex-wrap gap-1">
                    {userPreferences?.regions?.slice(0, 2)?.map((region) => (
                      <span key={region} className="px-2 py-1 text-xs bg-muted text-muted-foreground rounded-full">
                        {region}
                      </span>
                    ))}
                    {userPreferences?.regions?.length > 2 && (
                      <span className="px-2 py-1 text-xs bg-muted text-muted-foreground rounded-full">
                        +{userPreferences?.regions?.length - 2}
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Cultural Stories</span>
                  <button
                    onClick={() => handlePreferenceToggle('culturalStories', !userPreferences?.culturalStories)}
                    className={`w-10 h-6 rounded-full transition-colors duration-200 ${
                      userPreferences?.culturalStories ? 'bg-primary' : 'bg-muted'
                    }`}
                  >
                    <div className={`w-4 h-4 bg-white rounded-full transition-transform duration-200 ${
                      userPreferences?.culturalStories ? 'translate-x-5' : 'translate-x-1'
                    }`} />
                  </button>
                </div>
              </div>
            </div>

            {/* Recent Topics */}
            <div className="p-4 border-b border-border">
              <h4 className="text-sm font-semibold text-foreground mb-3">
                Recent Topics
              </h4>
              
              <div className="space-y-2">
                {recentTopics?.map((topic) => (
                  <div key={topic?.id} className="flex items-center justify-between p-2 rounded-lg hover:bg-muted transition-colors duration-200 cursor-pointer">
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground truncate">
                        {topic?.topic}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {topic?.count} messages • {formatRelativeTime(topic?.timestamp)}
                      </p>
                    </div>
                    <Icon name="MessageCircle" size={16} className="text-muted-foreground" />
                  </div>
                ))}
              </div>
            </div>

            {/* Conversation Stats */}
            <div className="p-4 border-b border-border">
              <h4 className="text-sm font-semibold text-foreground mb-3">
                Session Stats
              </h4>
              
              <div className="grid grid-cols-2 gap-3">
                <div className="text-center p-3 bg-muted rounded-lg">
                  <div className="text-lg font-semibold text-foreground">
                    {conversationHistory?.length}
                  </div>
                  <div className="text-xs text-muted-foreground">Messages</div>
                </div>
                
                <div className="text-center p-3 bg-muted rounded-lg">
                  <div className="text-lg font-semibold text-foreground">
                    {conversationHistory?.filter(msg => msg?.products?.length > 0)?.length}
                  </div>
                  <div className="text-xs text-muted-foreground">Recommendations</div>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="p-4">
              <h4 className="text-sm font-semibold text-foreground mb-3">
                Quick Actions
              </h4>
              
              <div className="space-y-2">
                <Button
                  variant="outline"
                  size="sm"
                  fullWidth
                  iconName="RotateCcw"
                  iconPosition="left"
                  onClick={onResetConversation}
                >
                  Reset Conversation
                </Button>
                
                <Button
                  variant="outline"
                  size="sm"
                  fullWidth
                  iconName="Settings"
                  iconPosition="left"
                >
                  Update Preferences
                </Button>
                
                <Button
                  variant="outline"
                  size="sm"
                  fullWidth
                  iconName="Download"
                  iconPosition="left"
                >
                  Export Chat
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ConversationSidebar;