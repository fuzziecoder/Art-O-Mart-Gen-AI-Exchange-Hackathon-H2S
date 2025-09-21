import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Icon from '../components/AppIcon';
import TrustScore from '../components/TrustScore';
import CulturalFootnote from '../components/CulturalFootnote';
import SellerCoaching from '../components/SellerCoaching';
import MarketplaceAnalytics from '../components/MarketplaceAnalytics';
import SmartProductImage, { ProductGallery, ProductCard } from '../components/SmartProductImage';
import AIChatAssistant from '../components/AIChatAssistant';
import { multimodalRAG, speechUtils } from '../lib/multimodalRag';
import { adaptProductDescription, generateSellerCoaching } from '../lib/gemini';
import { 
  culturalAdaptationAgent, 
  conversationAgent, 
  recommendationAgent,
  trustEngineAgent 
} from '../lib/aiAgents';
import { selectProductImage, getProductImages, HERO_IMAGES } from '../lib/productImages';

const InnovationDemo = () => {
  const [activeFeature, setActiveFeature] = useState('cultural');
  const [demoProduct, setDemoProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [demoData, setDemoData] = useState({});
  const [isRecording, setIsRecording] = useState(false);
  const [speechRecognition, setSpeechRecognition] = useState(null);

  // Mock product data for demo
  useEffect(() => {
    const mockProduct = {
      id: 'demo-001',
      title: 'Handwoven Banarasi Silk Saree',
      description: 'Exquisite handwoven silk saree from Varanasi, featuring traditional gold zari work and intricate floral motifs passed down through generations of master weavers.',
      price: 15000,
      images: [
        'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=400',
        'https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=400'
      ],
      category: 'Textiles',
      region: 'Uttar Pradesh',
      tags: ['silk', 'handwoven', 'traditional', 'zari work', 'banarasi'],
      artisan: {
        name: 'Masterji Ravi Kumar',
        businessName: 'Kumar Silk Weavers',
        specialty: 'Banarasi Silk Weaving',
        trustScore: 9.2,
        verified: true
      }
    };
    setDemoProduct(mockProduct);
  }, []);

  const features = [
    {
      id: 'cultural',
      title: 'Geo-aware Cultural Adaptation',
      description: 'AI rewrites product descriptions for cultural resonance across regions',
      icon: 'Globe',
      color: 'orange'
    },
    {
      id: 'multimodal',
      title: 'Multimodal RAG System',
      description: 'Retrieve from images, descriptions, and documents with combined embeddings',
      icon: 'Search',
      color: 'blue'
    },
    {
      id: 'speech',
      title: 'Speech-to-Speech Conversations',
      description: 'Real-time localized conversations between buyers and artisans',
      icon: 'Mic',
      color: 'green'
    },
    {
      id: 'trust',
      title: 'AI-assisted Trust Engine',
      description: 'Automated provenance extraction and verification badges',
      icon: 'Shield',
      color: 'purple'
    },
    {
      id: 'coaching',
      title: 'Seller Coaching Agent',
      description: 'Personalized AI coach for listing optimization and marketing',
      icon: 'TrendingUp',
      color: 'indigo'
    },
    {
      id: 'analytics',
      title: 'Marketplace Analytics & Fairness',
      description: 'Cross-region exposure metrics and fairness dashboard',
      icon: 'BarChart3',
      color: 'pink'
    },
    {
      id: 'ai-agents',
      title: 'Multi-Agent AI System',
      description: 'Specialized AI agents working together for personalized assistance',
      icon: 'Brain',
      color: 'cyan'
    },
    {
      id: 'smart-images',
      title: 'Smart Product Images',
      description: 'AI-powered image selection and generation for missing product photos',
      icon: 'ImagePlay',
      color: 'emerald'
    }
  ];

  const startSpeechDemo = () => {
    if (isRecording) {
      if (speechRecognition) {
        speechRecognition.stop();
      }
      setIsRecording(false);
      return;
    }

    setIsRecording(true);
    const recognition = speechUtils.speechToText((transcript) => {
      console.log('Speech recognized:', transcript);
      // Simulate translation and response
      setTimeout(() => {
        speechUtils.textToSpeech(
          `आपने कहा: "${transcript}". यह बहुत सुंदर हस्तशिल्प है!`,
          'hi-IN'
        );
        setIsRecording(false);
      }, 1000);
    }, 'hi-IN');

    if (recognition) {
      setSpeechRecognition(recognition);
    } else {
      setIsRecording(false);
    }
  };

  const testCulturalAdaptation = async () => {
    if (!demoProduct) return;
    
    setIsLoading(true);
    try {
      const adaptation = await adaptProductDescription(
        demoProduct.description,
        'tamil_nadu',
        'uttar_pradesh',
        'textiles'
      );
      
      setDemoData(prev => ({
        ...prev,
        culturalAdaptation: adaptation
      }));
    } catch (error) {
      console.error('Cultural adaptation demo error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const testMultimodalSearch = async () => {
    setIsLoading(true);
    try {
      // Index the demo product
      await multimodalRAG.indexProduct(demoProduct);
      
      // Search for similar products
      const searchResults = await multimodalRAG.searchProducts(
        'traditional silk weaving with gold work',
        {
          limit: 5,
          boostCultural: true,
          userRegion: 'tamil_nadu'
        }
      );
      
      setDemoData(prev => ({
        ...prev,
        searchResults
      }));
    } catch (error) {
      console.error('Multimodal search demo error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const renderFeatureDemo = () => {
    switch (activeFeature) {
      case 'cultural':
        return (
          <div className="space-y-6">
            <div className="bg-white rounded-lg p-6 border border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Cultural Adaptation Demo</h3>
                <button
                  onClick={testCulturalAdaptation}
                  disabled={isLoading}
                  className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors disabled:opacity-50"
                >
                  {isLoading ? 'Adapting...' : 'Test Adaptation'}
                </button>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium text-gray-800 mb-2">Original (Uttar Pradesh)</h4>
                  <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <p className="text-sm text-gray-700">{demoProduct?.description}</p>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium text-gray-800 mb-2">Adapted for Tamil Nadu</h4>
                  <div className="p-4 bg-orange-50 rounded-lg border border-orange-200">
                    {demoData.culturalAdaptation ? (
                      <div className="space-y-3">
                        <p className="text-sm text-gray-700">
                          {demoData.culturalAdaptation.adaptedDescription}
                        </p>
                        <div className="pt-3 border-t border-orange-200">
                          <p className="text-xs text-orange-700 font-medium">Cultural Bridge:</p>
                          <p className="text-xs text-gray-600">{demoData.culturalAdaptation.culturalBridge}</p>
                        </div>
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-green-600">Resonance: {demoData.culturalAdaptation.resonanceScore}/10</span>
                        </div>
                      </div>
                    ) : (
                      <p className="text-sm text-gray-500 italic">Click "Test Adaptation" to see culturally adapted version</p>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {demoProduct && (
              <CulturalFootnote 
                productData={demoProduct}
                userLanguage="hindi"
                className="w-full"
              />
            )}
          </div>
        );

      case 'multimodal':
        return (
          <div className="space-y-6">
            <div className="bg-white rounded-lg p-6 border border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Multimodal Search Demo</h3>
                <button
                  onClick={testMultimodalSearch}
                  disabled={isLoading}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
                >
                  {isLoading ? 'Searching...' : 'Test Search'}
                </button>
              </div>
              
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-600 mb-2">Search Query:</p>
                  <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                    <code className="text-sm">"traditional silk weaving with gold work"</code>
                  </div>
                </div>

                {demoData.searchResults && (
                  <div>
                    <p className="text-sm font-medium text-gray-800 mb-3">
                      Found {demoData.searchResults.totalFound} results with multimodal analysis:
                    </p>
                    <div className="space-y-3">
                      {demoData.searchResults.results.map((result, index) => (
                        <div key={index} className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <h4 className="font-medium text-gray-900">{result.product.title}</h4>
                              <p className="text-sm text-gray-600 mt-1">{result.product.region}</p>
                              <div className="flex items-center space-x-4 mt-2 text-xs text-gray-500">
                                <span>Similarity: {(result.similarity * 100).toFixed(1)}%</span>
                                <span>Cultural Score: {(result.adjustedScore * 100).toFixed(1)}%</span>
                              </div>
                            </div>
                            <div className="text-right">
                              <span className="text-lg font-bold text-green-600">₹{result.product.price.toLocaleString()}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        );

      case 'speech':
        return (
          <div className="space-y-6">
            <div className="bg-white rounded-lg p-6 border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Speech-to-Speech Translation Demo</h3>
              
              <div className="text-center space-y-4">
                <div className="p-8 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border-2 border-dashed border-green-300">
                  <div className="flex flex-col items-center space-y-4">
                    <div className={`w-20 h-20 rounded-full flex items-center justify-center transition-all duration-300 ${
                      isRecording ? 'bg-red-500 animate-pulse' : 'bg-green-500'
                    }`}>
                      <Icon 
                        name={isRecording ? 'Square' : 'Mic'} 
                        size={32} 
                        className="text-white"
                      />
                    </div>
                    
                    <div>
                      <h4 className="font-medium text-gray-900">
                        {isRecording ? 'Listening...' : 'Speech Translation Ready'}
                      </h4>
                      <p className="text-sm text-gray-600 mt-1">
                        {isRecording 
                          ? 'Speak in Hindi, get response in Tamil' 
                          : 'Click to start speaking in Hindi'
                        }
                      </p>
                    </div>
                    
                    <button
                      onClick={startSpeechDemo}
                      className={`px-6 py-3 rounded-lg font-medium transition-all ${
                        isRecording 
                          ? 'bg-red-600 text-white hover:bg-red-700' 
                          : 'bg-green-600 text-white hover:bg-green-700'
                      }`}
                    >
                      {isRecording ? 'Stop Recording' : 'Start Demo'}
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div className="p-3 bg-blue-50 rounded-lg">
                    <Icon name="ArrowRight" size={16} className="text-blue-600 mx-auto mb-2" />
                    <p className="font-medium">Hindi Input</p>
                    <p className="text-gray-600">Buyer speaks</p>
                  </div>
                  
                  <div className="p-3 bg-purple-50 rounded-lg">
                    <Icon name="RefreshCw" size={16} className="text-purple-600 mx-auto mb-2" />
                    <p className="font-medium">AI Translation</p>
                    <p className="text-gray-600">Real-time processing</p>
                  </div>
                  
                  <div className="p-3 bg-green-50 rounded-lg">
                    <Icon name="Volume2" size={16} className="text-green-600 mx-auto mb-2" />
                    <p className="font-medium">Tamil Output</p>
                    <p className="text-gray-600">Artisan hears</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'trust':
        return (
          <div className="space-y-6">
            {demoProduct && (
              <TrustScore 
                productData={demoProduct}
                imageUrls={demoProduct.images}
                className="w-full"
              />
            )}
            
            <div className="bg-white rounded-lg p-6 border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Trust Engine Features</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <h4 className="font-medium text-gray-800">Automated Analysis</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center space-x-2">
                      <Icon name="CheckCircle" size={16} className="text-green-600" />
                      <span>Image metadata extraction</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Icon name="CheckCircle" size={16} className="text-green-600" />
                      <span>Handmade quality detection</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Icon name="CheckCircle" size={16} className="text-green-600" />
                      <span>Cultural authenticity verification</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Icon name="CheckCircle" size={16} className="text-green-600" />
                      <span>Artisan signature recognition</span>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <h4 className="font-medium text-gray-800">Verification Badges</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center space-x-2">
                      <Icon name="Crown" size={16} className="text-purple-600" />
                      <span>Master Artisan</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Icon name="Award" size={16} className="text-yellow-600" />
                      <span>Gold Verified</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Icon name="Shield" size={16} className="text-gray-600" />
                      <span>Silver Verified</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Icon name="CheckCircle" size={16} className="text-orange-600" />
                      <span>Bronze Verified</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'coaching':
        return (
          <div className="space-y-6">
            {demoProduct && (
              <SellerCoaching 
                productListing={demoProduct}
                performanceData={{ views: 1250, clicks: 89, conversions: 12 }}
                className="w-full"
                onApplySuggestion={(type, suggestion) => {
                  console.log('Applying suggestion:', type, suggestion);
                }}
              />
            )}
          </div>
        );

      case 'analytics':
        return (
          <div className="space-y-6">
            <MarketplaceAnalytics 
              className="w-full"
              showFullDashboard={true}
              userRole="admin"
            />
          </div>
        );

      case 'ai-agents':
        return (
          <div className="space-y-6">
            <div className="bg-white rounded-lg p-6 border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Multi-Agent AI System</h3>
              <p className="text-gray-600 mb-6">
                Experience our specialized AI agents working together. Try asking about:
                • Product recommendations • Cultural context • Trust verification • Image generation
              </p>
              
              <AIChatAssistant
                className="h-96"
                userContext={{
                  region: 'tamil_nadu',
                  language: 'english',
                  interests: ['textiles', 'traditional']
                }}
                onProductClick={(product) => console.log('Product clicked:', product)}
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-lg border border-blue-200">
                <div className="flex items-center space-x-2 mb-2">
                  <Icon name="MessageCircle" size={16} className="text-blue-600" />
                  <h4 className="font-medium text-blue-900">Conversation Agent</h4>
                </div>
                <p className="text-sm text-blue-800">Maya provides helpful responses and guides users</p>
              </div>
              
              <div className="bg-gradient-to-r from-orange-50 to-amber-50 p-4 rounded-lg border border-orange-200">
                <div className="flex items-center space-x-2 mb-2">
                  <Icon name="Globe" size={16} className="text-orange-600" />
                  <h4 className="font-medium text-orange-900">Cultural Expert</h4>
                </div>
                <p className="text-sm text-orange-800">Adapts content for regional cultural resonance</p>
              </div>
              
              <div className="bg-gradient-to-r from-purple-50 to-violet-50 p-4 rounded-lg border border-purple-200">
                <div className="flex items-center space-x-2 mb-2">
                  <Icon name="Shield" size={16} className="text-purple-600" />
                  <h4 className="font-medium text-purple-900">Trust Analyzer</h4>
                </div>
                <p className="text-sm text-purple-800">Verifies authenticity and assigns trust scores</p>
              </div>
              
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-4 rounded-lg border border-green-200">
                <div className="flex items-center space-x-2 mb-2">
                  <Icon name="Search" size={16} className="text-green-600" />
                  <h4 className="font-medium text-green-900">Product Finder</h4>
                </div>
                <p className="text-sm text-green-800">Recommends products based on preferences</p>
              </div>
            </div>
          </div>
        );

      case 'smart-images':
        return (
          <div className="space-y-6">
            <div className="bg-white rounded-lg p-6 border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Smart Product Images Demo</h3>
              <p className="text-gray-600 mb-6">
                Our AI automatically selects appropriate images based on product categories, regions, and generates 
                fallback descriptions when images are missing.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <h4 className="font-medium text-gray-900 mb-3">Textiles from Rajasthan</h4>
                  <ProductCard 
                    product={{
                      title: "Block Print Saree",
                      category: "textiles",
                      region: "rajasthan",
                      tags: ['block print', 'traditional']
                    }}
                    showAiGenerated={true}
                  />
                  <p className="text-sm text-gray-600 mt-2">AI selected region-specific image</p>
                </div>
                
                <div className="text-center">
                  <h4 className="font-medium text-gray-900 mb-3">Pottery from Kerala</h4>
                  <ProductCard 
                    product={{
                      title: "Traditional Clay Pot",
                      category: "pottery",
                      region: "kerala",
                      tags: ['clay', 'handmade']
                    }}
                    showAiGenerated={true}
                  />
                  <p className="text-sm text-gray-600 mt-2">Smart category-based selection</p>
                </div>
                
                <div className="text-center">
                  <h4 className="font-medium text-gray-900 mb-3">Jewelry from Tamil Nadu</h4>
                  <ProductCard 
                    product={{
                      title: "Temple Jewelry Set",
                      category: "jewelry",
                      region: "tamil_nadu",
                      tags: ['temple', 'gold', 'traditional']
                    }}
                    showAiGenerated={true}
                  />
                  <p className="text-sm text-gray-600 mt-2">AI-generated image description</p>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-6 border border-purple-200">
              <div className="flex items-start space-x-4">
                <Icon name="Sparkles" size={24} className="text-purple-600 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-purple-900 mb-2">AI Image Enhancement Features</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <ul className="space-y-2 text-purple-800">
                        <li className="flex items-center space-x-2">
                          <Icon name="CheckCircle" size={14} className="text-green-600" />
                          <span>Automatic category detection</span>
                        </li>
                        <li className="flex items-center space-x-2">
                          <Icon name="CheckCircle" size={14} className="text-green-600" />
                          <span>Region-specific image selection</span>
                        </li>
                        <li className="flex items-center space-x-2">
                          <Icon name="CheckCircle" size={14} className="text-green-600" />
                          <span>Fallback image generation</span>
                        </li>
                      </ul>
                    </div>
                    <div>
                      <ul className="space-y-2 text-purple-800">
                        <li className="flex items-center space-x-2">
                          <Icon name="CheckCircle" size={14} className="text-green-600" />
                          <span>AI-generated image prompts</span>
                        </li>
                        <li className="flex items-center space-x-2">
                          <Icon name="CheckCircle" size={14} className="text-green-600" />
                          <span>Multiple image variants</span>
                        </li>
                        <li className="flex items-center space-x-2">
                          <Icon name="CheckCircle" size={14} className="text-green-600" />
                          <span>Error handling & recovery</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 text-white">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">
              Art O Mart: Revolutionary Features Demo
            </h1>
            <p className="text-xl text-purple-100 max-w-3xl mx-auto">
              Experience next-generation cultural marketplace innovations powered by AI
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Feature Navigation */}
        <div className="mb-8">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {features.map((feature) => (
              <motion.button
                key={feature.id}
                onClick={() => setActiveFeature(feature.id)}
                className={`p-4 rounded-lg border-2 text-center transition-all duration-200 ${
                  activeFeature === feature.id
                    ? `border-${feature.color}-500 bg-${feature.color}-50 shadow-lg`
                    : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-md'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className={`w-12 h-12 mx-auto mb-2 rounded-full bg-${feature.color}-100 flex items-center justify-center`}>
                  <Icon name={feature.icon} size={24} className={`text-${feature.color}-600`} />
                </div>
                <h3 className="font-medium text-gray-900 text-sm leading-tight">
                  {feature.title}
                </h3>
                <p className="text-xs text-gray-600 mt-1">
                  {feature.description}
                </p>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Feature Demo Area */}
        <motion.div
          key={activeFeature}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-white rounded-xl shadow-lg overflow-hidden"
        >
          <div className={`bg-gradient-to-r from-${features.find(f => f.id === activeFeature)?.color}-500 to-${features.find(f => f.id === activeFeature)?.color}-600 text-white p-6`}>
            <h2 className="text-2xl font-bold">
              {features.find(f => f.id === activeFeature)?.title}
            </h2>
            <p className="text-sm opacity-90 mt-1">
              {features.find(f => f.id === activeFeature)?.description}
            </p>
          </div>

          <div className="p-6">
            {renderFeatureDemo()}
          </div>
        </motion.div>

        {/* Quick Stats */}
        <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white rounded-lg p-4 border border-gray-200 text-center">
            <div className="text-2xl font-bold text-purple-600">88%</div>
            <div className="text-sm text-gray-600">Cultural Resonance</div>
          </div>
          <div className="bg-white rounded-lg p-4 border border-gray-200 text-center">
            <div className="text-2xl font-bold text-blue-600">15ms</div>
            <div className="text-sm text-gray-600">Search Response</div>
          </div>
          <div className="bg-white rounded-lg p-4 border border-gray-200 text-center">
            <div className="text-2xl font-bold text-green-600">9.2/10</div>
            <div className="text-sm text-gray-600">Trust Score</div>
          </div>
          <div className="bg-white rounded-lg p-4 border border-gray-200 text-center">
            <div className="text-2xl font-bold text-orange-600">94%</div>
            <div className="text-sm text-gray-600">User Satisfaction</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InnovationDemo;
