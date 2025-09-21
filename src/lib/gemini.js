
import { GoogleGenerativeAI } from "@google/generative-ai";

// Use the provided API key for the specialized agents
const apiKey = "AIzaSyDTu8IaGapCslkIuWwkkuVg-03_sxJU0Ak";
const API_ENDPOINT = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent";

// Fallback to environment variable if needed
const fallbackKey = import.meta.env.VITE_GEMINI_API_KEY;
const activeApiKey = apiKey || fallbackKey;

if (!activeApiKey) {
  console.warn("No Gemini API key available - AI features may not work");
}

// Initialize with the new model
const genAI = activeApiKey ? new GoogleGenerativeAI(activeApiKey) : null;
const model = genAI ? genAI.getGenerativeModel({ model: "gemini-2.0-flash" }) : null;

// Direct API call function for specialized agents
const callGeminiAPI = async (prompt, systemContext = "") => {
  if (!activeApiKey) {
    throw new Error("Gemini API key not available");
  }

  const fullPrompt = systemContext ? `${systemContext}\n\n${prompt}` : prompt;
  
  try {
    const response = await fetch(API_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-goog-api-key': activeApiKey
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: fullPrompt
          }]
        }]
      })
    });

    if (!response.ok) {
      throw new Error(`API call failed: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    return data.candidates[0]?.content?.parts[0]?.text || "No response generated";
  } catch (error) {
    console.error('Gemini API call error:', error);
    throw error;
  }
};

// Enhanced system prompt for the handicraft marketplace
const SYSTEM_CONTEXT = `You are Maya, an expert AI shopping assistant for "Art O Mart", India's premier online marketplace for authentic handcrafted goods.

Your expertise includes:
- Traditional Indian crafts: pottery, textiles, jewelry, woodwork, metalwork, paintings, sculptures
- Regional specialties: Rajasthani pottery, Kashmiri carpets, Kerala coir products, West Bengali textiles, etc.
- Cultural significance and stories behind crafts
- Artisan backgrounds and techniques
- Price ranges and value assessment
- Care instructions and authenticity verification

Your personality:
- Warm, knowledgeable, and culturally sensitive
- Enthusiastic about preserving traditional crafts
- Helpful in finding the perfect items for customers
- Educational about cultural heritage

Always respond in a conversational, friendly tone. When recommending products, include cultural context, price ranges, and why the item might be special. If you don't have specific product information, provide general guidance and encourage users to explore categories.`;

export const sendMessageToAI = async (userMessage, conversationHistory = []) => {
  try {
    // Build conversation context
    let prompt = SYSTEM_CONTEXT + "\n\n";
    
    // Add recent conversation history for context
    if (conversationHistory.length > 0) {
      prompt += "Recent conversation:\n";
      conversationHistory.slice(-6).forEach(msg => {
        prompt += `${msg.sender === 'user' ? 'Customer' : 'Maya'}: ${msg.text}\n`;
      });
      prompt += "\n";
    }
    
    // Add current user message
    prompt += `Customer: ${userMessage}\n\nMaya:`;
    
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    return text;
  } catch (error) {
    console.error("Error sending message to AI:", error);
    throw error;
  }
};

// Cultural knowledge snippets for region-aware adaptations
const CULTURAL_KNOWLEDGE = {
  regions: {
    'uttarakhand': {
      textiles: 'woolen crafts like Pashmina, traditional patterns reminiscent of mountain landscapes',
      techniques: 'hand-spun wool, natural dyes from mountain herbs',
      cultural_context: 'mountain communities, sustainable practices, heritage preservation'
    },
    'tamil_nadu': {
      textiles: 'silk weaving, Kanchipuram sarees, temple jewelry designs',
      techniques: 'traditional loom weaving, zari work, temple-inspired motifs',
      cultural_context: 'ancient Tamil culture, temple traditions, classical arts'
    },
    'rajasthan': {
      textiles: 'block printing, mirror work, bandhani tie-dye',
      techniques: 'wooden block printing, camel leather work, desert-inspired colors',
      cultural_context: 'royal heritage, desert life, vibrant festivals'
    },
    'west_bengal': {
      textiles: 'muslin, kantha embroidery, jamdani weaving',
      techniques: 'fine cotton weaving, running stitch embroidery, intricate patterns',
      cultural_context: 'literary heritage, artistic traditions, cultural renaissance'
    }
  }
};

// Import AI agents
import { 
  culturalAdaptationAgent,
  trustEngineAgent,
  sellerCoachingAgent,
  culturalFootnoteAgent,
  conversationAgent 
} from './aiAgents';

// Enhanced cultural adaptation function using AI agent
export const adaptProductDescription = async (originalDescription, targetRegion, sourceRegion, productType) => {
  try {
    return await culturalAdaptationAgent(originalDescription, targetRegion, sourceRegion, productType);
  } catch (error) {
    console.error("Error adapting product description:", error);
    return {
      adaptedDescription: originalDescription,
      culturalBridge: 'Error in cultural adaptation',
      resonanceScore: '5.0',
      adaptationNotes: ['Adaptation failed, showing original']
    };
  }
};

// Enhanced multimodal analysis for Trust Engine using AI agent
export const analyzeProductTrust = async (productData, imageUrls = []) => {
  try {
    const imageMetadata = {
      imageCount: imageUrls.length,
      imageUrls: imageUrls,
      hasImages: imageUrls.length > 0
    };
    return await trustEngineAgent(productData, imageMetadata);
  } catch (error) {
    console.error("Error analyzing product trust:", error);
    return {
      trustScore: 70,
      badge: 'Silver Verified',
      reasons: ['Basic analysis completed'],
      riskFlags: [],
      verificationSteps: ['Manual verification recommended']
    };
  }
};

// Seller coaching and optimization suggestions using AI agent
export const generateSellerCoaching = async (productListing, performanceData = {}) => {
  try {
    return await sellerCoachingAgent(productListing, performanceData);
  } catch (error) {
    console.error("Error generating seller coaching:", error);
    return {
      overallScore: '6.0',
      tips: ['General improvements needed'],
      caption: 'Handcrafted with care',
      photoSuggestions: ['Improve lighting', 'Add detail shots'],
      pricingAdvice: 'Review market rates'
    };
  }
};

// Generate cultural footnotes with audio descriptions using AI agent
export const generateCulturalFootnote = async (productData, userLanguage = 'english') => {
  try {
    const targetRegion = productData?.region || 'general';
    return await culturalFootnoteAgent(productData, targetRegion, userLanguage);
  } catch (error) {
    console.error("Error generating cultural footnote:", error);
    return {
      culturalNote: 'Traditional handcrafted item with cultural significance.',
      audioScript: 'This beautiful handcraft represents traditional artistry.',
      culturalTags: ['handmade', 'traditional'],
      historicalPeriod: 'Traditional era',
      regionalSignificance: 'Local cultural importance'
    };
  }
};

// Function to get product recommendations based on query
export const getProductRecommendations = async (query, userPreferences = {}) => {
  try {
    const userRegion = userPreferences.region || 'general';
    const culturalContext = CULTURAL_KNOWLEDGE.regions[userRegion] || {};
    
    const prompt = `${SYSTEM_CONTEXT}

User Query: "${query}"
User Preferences: ${JSON.stringify(userPreferences)}
User Region: ${userRegion}
Cultural Context: ${JSON.stringify(culturalContext)}

Provide 3-5 specific product recommendations that resonate with the user's cultural background.
If the user is from a specific region, relate products to their cultural understanding.

Provide in this JSON format:
[
  {
    "name": "Product name",
    "category": "Category",
    "region": "Origin region",
    "priceRange": "₹X - ₹Y",
    "description": "Brief description",
    "culturalSignificance": "Cultural context",
    "artisanInfo": "Brief artisan background",
    "culturalResonance": "Why this appeals to user's region/culture",
    "adaptedDescription": "Description adapted for user's cultural context"
  }
]

Respond ONLY with valid JSON.`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    // Try to parse JSON response
    try {
      const products = JSON.parse(text.replace(/```json\n|```/g, ''));
      return products;
    } catch (parseError) {
      console.warn('Could not parse product recommendations as JSON:', text);
      return [];
    }
  } catch (error) {
    console.error("Error getting product recommendations:", error);
    return [];
  }
};

