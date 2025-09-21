import React, { useState, useEffect } from 'react';
import { generateCulturalFootnote } from '../lib/gemini';
import { speechUtils } from '../lib/multimodalRag';
import Icon from './AppIcon';

const CulturalFootnote = ({ 
  productData, 
  userLanguage = 'english',
  className = "",
  compact = false 
}) => {
  const [footnote, setFootnote] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadFootnote = async () => {
      if (!productData) return;
      
      try {
        setIsLoading(true);
        setError(null);
        const result = await generateCulturalFootnote(productData, userLanguage);
        setFootnote(result);
      } catch (err) {
        console.error('Error loading cultural footnote:', err);
        setError('Unable to load cultural context');
        // Fallback footnote
        setFootnote({
          culturalNote: 'This handcrafted item represents traditional artistry and cultural heritage.',
          audioScript: 'This beautiful handcraft carries the essence of traditional artistry passed down through generations.',
          culturalTags: ['handmade', 'traditional', 'heritage'],
          historicalPeriod: 'Traditional era',
          regionalSignificance: 'Part of local cultural heritage'
        });
      } finally {
        setIsLoading(false);
      }
    };

    loadFootnote();
  }, [productData, userLanguage]);

  const playAudio = () => {
    if (!footnote?.audioScript) return;
    
    setIsPlaying(true);
    const languageCode = speechUtils.languageCodes[userLanguage] || 'en-US';
    
    try {
      speechUtils.textToSpeech(footnote.audioScript, languageCode);
      
      // Stop playing indicator after estimated speech time
      const estimatedDuration = footnote.audioScript.length * 100; // ~100ms per character
      setTimeout(() => {
        setIsPlaying(false);
      }, estimatedDuration);
      
    } catch (err) {
      console.error('Error playing audio:', err);
      setIsPlaying(false);
    }
  };

  const stopAudio = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    setIsPlaying(false);
  };

  const getLanguageIcon = (language) => {
    const icons = {
      hindi: 'Globe',
      tamil: 'Globe',
      bengali: 'Globe',
      english: 'Globe',
      marathi: 'Globe',
      gujarati: 'Globe'
    };
    return icons[language] || 'Globe';
  };

  if (isLoading) {
    return (
      <div className={`cultural-footnote-loading border rounded-lg p-3 bg-orange-50 border-orange-200 ${className}`}>
        <div className="flex items-center space-x-2">
          <div className="animate-spin w-4 h-4 border border-orange-500 border-t-transparent rounded-full"></div>
          <span className="text-sm text-orange-700">Loading cultural context...</span>
        </div>
      </div>
    );
  }

  if (error && !footnote) {
    return (
      <div className={`cultural-footnote-error border rounded-lg p-3 bg-red-50 border-red-200 ${className}`}>
        <div className="flex items-center space-x-2">
          <Icon name="AlertCircle" size={16} className="text-red-600" />
          <span className="text-sm text-red-700">{error}</span>
        </div>
      </div>
    );
  }

  if (!footnote) return null;

  if (compact) {
    return (
      <div className={`cultural-footnote-compact bg-gradient-to-r from-orange-50 to-amber-50 border border-orange-200 rounded-lg p-3 ${className}`}>
        <div className="flex items-start justify-between">
          <div className="flex-1 min-w-0">
            <div className="flex items-center space-x-2 mb-1">
              <Icon name="BookOpen" size={14} className="text-orange-600 flex-shrink-0" />
              <span className="text-xs font-medium text-orange-800 uppercase tracking-wide">
                Cultural Context
              </span>
            </div>
            <p className="text-sm text-gray-700 leading-relaxed">{footnote.culturalNote}</p>
          </div>
          
          <div className="flex items-center space-x-2 ml-3">
            <button
              onClick={playAudio}
              disabled={isPlaying}
              className={`p-2 rounded-full transition-all duration-200 ${
                isPlaying 
                  ? 'bg-orange-200 text-orange-700' 
                  : 'bg-orange-100 text-orange-600 hover:bg-orange-200 hover:scale-105'
              }`}
              title="Listen to cultural story"
            >
              <Icon 
                name={isPlaying ? "Pause" : "Volume2"} 
                size={14} 
                className={isPlaying ? "animate-pulse" : ""}
              />
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`cultural-footnote bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 border border-orange-200 rounded-lg overflow-hidden ${className}`}>
      <div className="p-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            <div className="p-1 bg-orange-100 rounded-full">
              <Icon name="BookOpen" size={16} className="text-orange-600" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-gray-900">Cultural Footnote</h4>
              <div className="flex items-center space-x-1 text-xs text-gray-500">
                <Icon name={getLanguageIcon(userLanguage)} size={12} />
                <span className="capitalize">{userLanguage}</span>
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            {footnote.audioScript && (
              <button
                onClick={isPlaying ? stopAudio : playAudio}
                className={`flex items-center space-x-1 px-3 py-1 rounded-full text-xs font-medium transition-all duration-200 ${
                  isPlaying 
                    ? 'bg-orange-200 text-orange-800' 
                    : 'bg-orange-100 text-orange-700 hover:bg-orange-200'
                }`}
                title={isPlaying ? "Stop audio" : "Play cultural story"}
              >
                <Icon 
                  name={isPlaying ? "Square" : "Play"} 
                  size={12} 
                  className={isPlaying ? "animate-pulse" : ""}
                />
                <span>{isPlaying ? "Playing..." : "Listen"}</span>
              </button>
            )}
            
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="p-1 hover:bg-orange-100 rounded transition-colors"
              title={isExpanded ? "Show less" : "Show more"}
            >
              <Icon 
                name={isExpanded ? "ChevronUp" : "ChevronDown"} 
                size={16} 
                className="text-gray-500"
              />
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="space-y-3">
          <p className="text-gray-700 leading-relaxed font-medium">
            {footnote.culturalNote}
          </p>

          {/* Cultural Tags */}
          {footnote.culturalTags && footnote.culturalTags.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {footnote.culturalTags.slice(0, isExpanded ? undefined : 4).map((tag, index) => (
                <span
                  key={index}
                  className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-white bg-opacity-70 text-gray-600 border border-orange-200"
                >
                  {tag}
                </span>
              ))}
              {!isExpanded && footnote.culturalTags.length > 4 && (
                <span className="text-xs text-gray-500 px-2 py-1">
                  +{footnote.culturalTags.length - 4} more
                </span>
              )}
            </div>
          )}

          {/* Expanded Content */}
          {isExpanded && (
            <div className="pt-3 border-t border-orange-200 border-opacity-60 space-y-3">
              {footnote.historicalPeriod && (
                <div>
                  <h5 className="text-xs font-semibold text-gray-800 mb-1 flex items-center">
                    <Icon name="Clock" size={12} className="mr-1" />
                    Historical Period
                  </h5>
                  <p className="text-sm text-gray-600">{footnote.historicalPeriod}</p>
                </div>
              )}

              {footnote.regionalSignificance && (
                <div>
                  <h5 className="text-xs font-semibold text-gray-800 mb-1 flex items-center">
                    <Icon name="MapPin" size={12} className="mr-1" />
                    Regional Significance
                  </h5>
                  <p className="text-sm text-gray-600">{footnote.regionalSignificance}</p>
                </div>
              )}

              {/* Audio Script Preview */}
              {footnote.audioScript && footnote.audioScript !== footnote.culturalNote && (
                <div>
                  <h5 className="text-xs font-semibold text-gray-800 mb-1 flex items-center">
                    <Icon name="Headphones" size={12} className="mr-1" />
                    Audio Narration
                  </h5>
                  <p className="text-sm text-gray-600 italic">"{footnote.audioScript}"</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Audio Visualization */}
      {isPlaying && (
        <div className="px-4 pb-3">
          <div className="flex items-center space-x-1 bg-orange-100 rounded-full px-3 py-2">
            <div className="flex space-x-1">
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className="w-1 bg-orange-500 rounded-full animate-pulse"
                  style={{
                    height: Math.random() * 12 + 8,
                    animationDelay: `${i * 100}ms`,
                    animationDuration: '600ms'
                  }}
                />
              ))}
            </div>
            <span className="text-xs text-orange-700 ml-2">Playing cultural story...</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default CulturalFootnote;
