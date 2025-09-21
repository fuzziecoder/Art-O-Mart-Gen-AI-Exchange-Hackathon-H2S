import React, { useState, useEffect } from 'react';
import { generateSellerCoaching } from '../lib/gemini';
import Icon from './AppIcon';

const SellerCoaching = ({ 
  productListing, 
  performanceData = {},
  className = "",
  onApplySuggestion = () => {},
  showCompactView = false 
}) => {
  const [coaching, setCoaching] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [expandedSections, setExpandedSections] = useState(new Set(['photos']));

  useEffect(() => {
    const loadCoaching = async () => {
      if (!productListing) return;
      
      try {
        setIsLoading(true);
        const result = await generateSellerCoaching(productListing, performanceData);
        setCoaching(result);
      } catch (error) {
        console.error('Error loading seller coaching:', error);
        // Fallback coaching data
        setCoaching({
          overallScore: '7.0',
          photoSuggestions: {
            score: '6.5',
            improvements: ['Add lifestyle shots showing product in use', 'Improve lighting for detail photos'],
            examples: ['Show the product being worn or used', 'Close-up shots highlighting craftsmanship details']
          },
          pricingSuggestions: {
            analysis: 'Current pricing is competitive',
            recommendation: 'Consider slight increase based on quality',
            reasoning: 'Premium handcraft items can support higher pricing'
          },
          descriptionImprovements: {
            strengths: ['Good cultural context provided'],
            improvements: ['Add more technique details', 'Include care instructions', 'Mention time to create']
          },
          marketingReelIdeas: [
            {
              concept: 'Behind the scenes crafting',
              script: 'Show hands working on the craft with traditional tools',
              duration: '15-30 seconds'
            },
            {
              concept: 'Cultural significance story',
              script: 'Brief story about the cultural meaning and tradition',
              duration: '20-30 seconds'
            }
          ],
          localizedCaptions: {
            hindi: 'हस्तनिर्मित कला का जादू',
            english: 'Magic of handcrafted art'
          }
        });
      } finally {
        setIsLoading(false);
      }
    };

    loadCoaching();
  }, [productListing, performanceData]);

  const getScoreColor = (score) => {
    const numScore = parseFloat(score);
    if (numScore >= 8.5) return 'text-green-600 bg-green-100';
    if (numScore >= 7) return 'text-blue-600 bg-blue-100';
    if (numScore >= 5) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  const toggleSection = (section) => {
    const newExpanded = new Set(expandedSections);
    if (newExpanded.has(section)) {
      newExpanded.delete(section);
    } else {
      newExpanded.add(section);
    }
    setExpandedSections(newExpanded);
  };

  const applySuggestion = (type, suggestion) => {
    onApplySuggestion(type, suggestion);
  };

  if (isLoading) {
    return (
      <div className={`seller-coaching-loading border rounded-lg p-6 bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200 ${className}`}>
        <div className="flex items-center justify-center space-x-3">
          <div className="animate-spin w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full"></div>
          <span className="text-blue-700 font-medium">Analyzing your listing...</span>
        </div>
      </div>
    );
  }

  if (!coaching) return null;

  if (showCompactView) {
    return (
      <div className={`seller-coaching-compact bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-4 ${className}`}>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            <Icon name="TrendingUp" size={20} className="text-blue-600" />
            <div>
              <h3 className="font-semibold text-gray-900">AI Coach</h3>
              <span className={`text-sm px-2 py-1 rounded-full ${getScoreColor(coaching.overallScore)}`}>
                Score: {coaching.overallScore}/10
              </span>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div className="bg-white rounded-lg p-3 border border-blue-100">
            <div className="flex items-center space-x-1 mb-1">
              <Icon name="Camera" size={14} className="text-blue-600" />
              <span className="font-medium text-gray-700">Photos</span>
            </div>
            <span className={`text-xs px-2 py-1 rounded ${getScoreColor(coaching.photoSuggestions.score)}`}>
              {coaching.photoSuggestions.score}/10
            </span>
          </div>
          
          <div className="bg-white rounded-lg p-3 border border-blue-100">
            <div className="flex items-center space-x-1 mb-1">
              <Icon name="DollarSign" size={14} className="text-blue-600" />
              <span className="font-medium text-gray-700">Pricing</span>
            </div>
            <span className="text-xs text-gray-600">Optimized</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`seller-coaching bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 border border-blue-200 rounded-xl overflow-hidden ${className}`}>
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-white bg-opacity-20 rounded-lg">
              <Icon name="TrendingUp" size={24} className="text-white" />
            </div>
            <div>
              <h3 className="text-xl font-bold">AI Seller Coach</h3>
              <p className="text-blue-100">Personalized optimization suggestions</p>
            </div>
          </div>
          
          <div className="text-right">
            <div className="text-2xl font-bold">{coaching.overallScore}/10</div>
            <div className="text-sm text-blue-100">Overall Score</div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white border-b border-gray-200">
        <div className="flex space-x-0">
          {['overview', 'photos', 'pricing', 'content', 'marketing'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
                activeTab === tab
                  ? 'border-blue-500 text-blue-600 bg-blue-50'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50'
              }`}
            >
              <div className="flex items-center justify-center space-x-1">
                <Icon 
                  name={
                    tab === 'overview' ? 'BarChart3' :
                    tab === 'photos' ? 'Camera' :
                    tab === 'pricing' ? 'DollarSign' :
                    tab === 'content' ? 'FileText' : 'Video'
                  } 
                  size={14} 
                />
                <span className="capitalize">{tab}</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <div className="p-6">
        {activeTab === 'overview' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white rounded-lg p-4 border border-gray-200">
                <div className="flex items-center space-x-2 mb-2">
                  <Icon name="Camera" size={16} className="text-blue-600" />
                  <span className="font-medium">Photos</span>
                </div>
                <div className={`text-lg font-bold px-2 py-1 rounded ${getScoreColor(coaching.photoSuggestions.score)}`}>
                  {coaching.photoSuggestions.score}/10
                </div>
              </div>
              
              <div className="bg-white rounded-lg p-4 border border-gray-200">
                <div className="flex items-center space-x-2 mb-2">
                  <Icon name="FileText" size={16} className="text-green-600" />
                  <span className="font-medium">Description</span>
                </div>
                <div className="text-lg font-bold text-green-600">Good</div>
              </div>
              
              <div className="bg-white rounded-lg p-4 border border-gray-200">
                <div className="flex items-center space-x-2 mb-2">
                  <Icon name="DollarSign" size={16} className="text-purple-600" />
                  <span className="font-medium">Pricing</span>
                </div>
                <div className="text-lg font-bold text-purple-600">Optimal</div>
              </div>
            </div>

            <div className="bg-white rounded-lg p-4 border border-gray-200">
              <h4 className="font-semibold text-gray-900 mb-3">Quick Wins</h4>
              <div className="space-y-3">
                {coaching.photoSuggestions.improvements.slice(0, 2).map((improvement, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-yellow-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Icon name="Lightbulb" size={12} className="text-yellow-600" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-gray-700">{improvement}</p>
                      <button 
                        onClick={() => applySuggestion('photo', improvement)}
                        className="text-xs text-blue-600 hover:text-blue-800 mt-1"
                      >
                        Apply suggestion →
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'photos' && (
          <div className="space-y-4">
            <div className="bg-white rounded-lg p-4 border border-gray-200">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-semibold text-gray-900">Photo Analysis</h4>
                <span className={`px-3 py-1 rounded-full text-sm ${getScoreColor(coaching.photoSuggestions.score)}`}>
                  {coaching.photoSuggestions.score}/10
                </span>
              </div>
              
              <div className="space-y-4">
                <div>
                  <h5 className="font-medium text-gray-800 mb-2">Improvement Areas</h5>
                  <div className="space-y-2">
                    {coaching.photoSuggestions.improvements.map((improvement, index) => (
                      <div key={index} className="flex items-start space-x-3 p-3 bg-yellow-50 rounded-lg">
                        <Icon name="AlertCircle" size={16} className="text-yellow-600 mt-0.5 flex-shrink-0" />
                        <div className="flex-1">
                          <p className="text-sm text-gray-700">{improvement}</p>
                          <button 
                            onClick={() => applySuggestion('photo', improvement)}
                            className="text-xs text-blue-600 hover:text-blue-800 mt-1 font-medium"
                          >
                            Apply this suggestion
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h5 className="font-medium text-gray-800 mb-2">Photo Examples</h5>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {coaching.photoSuggestions.examples.map((example, index) => (
                      <div key={index} className="p-3 bg-green-50 rounded-lg border border-green-200">
                        <div className="flex items-start space-x-2">
                          <Icon name="CheckCircle" size={16} className="text-green-600 mt-0.5 flex-shrink-0" />
                          <p className="text-sm text-gray-700">{example}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'pricing' && (
          <div className="space-y-4">
            <div className="bg-white rounded-lg p-4 border border-gray-200">
              <h4 className="font-semibold text-gray-900 mb-3">Pricing Analysis</h4>
              
              <div className="space-y-4">
                <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <h5 className="font-medium text-blue-900 mb-2">Current Analysis</h5>
                  <p className="text-sm text-blue-800">{coaching.pricingSuggestions.analysis}</p>
                </div>

                <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                  <h5 className="font-medium text-green-900 mb-2">Recommendation</h5>
                  <p className="text-sm text-green-800">{coaching.pricingSuggestions.recommendation}</p>
                  <div className="mt-3">
                    <button 
                      onClick={() => applySuggestion('pricing', coaching.pricingSuggestions.recommendation)}
                      className="text-sm bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
                    >
                      Apply Pricing Change
                    </button>
                  </div>
                </div>

                <div className="p-4 bg-gray-50 rounded-lg">
                  <h5 className="font-medium text-gray-900 mb-2">Reasoning</h5>
                  <p className="text-sm text-gray-700">{coaching.pricingSuggestions.reasoning}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'content' && (
          <div className="space-y-4">
            <div className="bg-white rounded-lg p-4 border border-gray-200">
              <h4 className="font-semibold text-gray-900 mb-3">Content Optimization</h4>
              
              <div className="space-y-4">
                <div>
                  <h5 className="font-medium text-green-800 mb-2 flex items-center">
                    <Icon name="CheckCircle" size={16} className="text-green-600 mr-2" />
                    Current Strengths
                  </h5>
                  <div className="space-y-2">
                    {coaching.descriptionImprovements.strengths.map((strength, index) => (
                      <div key={index} className="p-3 bg-green-50 rounded-lg border border-green-200">
                        <p className="text-sm text-green-800">{strength}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h5 className="font-medium text-orange-800 mb-2 flex items-center">
                    <Icon name="TrendingUp" size={16} className="text-orange-600 mr-2" />
                    Improvement Areas
                  </h5>
                  <div className="space-y-2">
                    {coaching.descriptionImprovements.improvements.map((improvement, index) => (
                      <div key={index} className="flex items-start space-x-3 p-3 bg-orange-50 rounded-lg border border-orange-200">
                        <Icon name="Edit3" size={16} className="text-orange-600 mt-0.5 flex-shrink-0" />
                        <div className="flex-1">
                          <p className="text-sm text-gray-700">{improvement}</p>
                          <button 
                            onClick={() => applySuggestion('content', improvement)}
                            className="text-xs text-blue-600 hover:text-blue-800 mt-1 font-medium"
                          >
                            Implement this change
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'marketing' && (
          <div className="space-y-4">
            <div className="bg-white rounded-lg p-4 border border-gray-200">
              <h4 className="font-semibold text-gray-900 mb-3">Marketing Reel Ideas</h4>
              
              <div className="space-y-4">
                {coaching.marketingReelIdeas.map((reel, index) => (
                  <div key={index} className="p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg border border-purple-200">
                    <div className="flex items-start justify-between mb-2">
                      <h5 className="font-medium text-gray-900">{reel.concept}</h5>
                      <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded-full">
                        {reel.duration}
                      </span>
                    </div>
                    <p className="text-sm text-gray-700 mb-3">{reel.script}</p>
                    <button 
                      onClick={() => applySuggestion('marketing', reel)}
                      className="text-sm bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2 rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all"
                    >
                      Create This Reel
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-lg p-4 border border-gray-200">
              <h4 className="font-semibold text-gray-900 mb-3">Localized Captions</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {Object.entries(coaching.localizedCaptions).map(([language, caption]) => (
                  <div key={language} className="p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-medium text-gray-600 uppercase">{language}</span>
                      <button 
                        onClick={() => applySuggestion('caption', { language, caption })}
                        className="text-xs text-blue-600 hover:text-blue-800"
                      >
                        Copy
                      </button>
                    </div>
                    <p className="text-sm text-gray-800">{caption}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SellerCoaching;
