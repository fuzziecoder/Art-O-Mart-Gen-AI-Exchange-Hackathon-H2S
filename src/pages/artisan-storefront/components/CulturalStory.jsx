import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const CulturalStory = ({ story }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="bg-card rounded-xl p-6 lg:p-8 shadow-warm-md">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-primary/10 rounded-lg">
          <Icon name="BookOpen" size={24} className="text-primary" />
        </div>
        <h2 className="text-xl lg:text-2xl font-heading font-semibold text-foreground">
          Cultural Story
        </h2>
      </div>
      <div className="grid lg:grid-cols-2 gap-6 lg:gap-8">
        {/* Story Content */}
        <div className="order-2 lg:order-1">
          <h3 className="text-lg font-heading font-medium text-foreground mb-4">
            {story?.title}
          </h3>
          
          <div className="prose prose-sm lg:prose-base max-w-none">
            <p className="text-muted-foreground leading-relaxed mb-4">
              {isExpanded ? story?.fullContent : story?.excerpt}
            </p>
            
            {story?.fullContent?.length > story?.excerpt?.length && (
              <button
                onClick={toggleExpanded}
                className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-medium text-sm transition-colors duration-200"
              >
                <span>{isExpanded ? 'Read Less' : 'Read More'}</span>
                <Icon 
                  name={isExpanded ? "ChevronUp" : "ChevronDown"} 
                  size={16} 
                />
              </button>
            )}
          </div>

          {/* Heritage Tags */}
          <div className="flex flex-wrap gap-2 mt-6">
            {story?.heritageTags?.map((tag, index) => (
              <span
                key={index}
                className="bg-secondary/10 text-secondary px-3 py-1 rounded-full text-xs font-medium"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Story Images */}
        <div className="order-1 lg:order-2">
          <div className="grid grid-cols-2 gap-3">
            {story?.images?.map((image, index) => (
              <div
                key={index}
                className={`relative overflow-hidden rounded-lg ${
                  index === 0 ? 'col-span-2' : ''
                }`}
              >
                <Image
                  src={image?.url}
                  alt={image?.caption}
                  className={`w-full object-cover ${
                    index === 0 ? 'h-48 lg:h-56' : 'h-24 lg:h-32'
                  }`}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                <div className="absolute bottom-2 left-2 right-2">
                  <p className="text-white text-xs font-medium leading-tight">
                    {image?.caption}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Craft Tradition Timeline */}
      <div className="mt-8 pt-6 border-t border-border">
        <h4 className="text-base font-heading font-medium text-foreground mb-4">
          Craft Tradition Timeline
        </h4>
        <div className="space-y-3">
          {story?.timeline?.map((event, index) => (
            <div key={index} className="flex items-start gap-3">
              <div className="flex-shrink-0 w-2 h-2 bg-primary rounded-full mt-2" />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-sm font-medium text-foreground">
                    {event?.year}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {event?.period}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground">
                  {event?.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CulturalStory;