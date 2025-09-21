/**
 * Art-O-Mart Specialized AI Agents
 * Multi-agent system for cultural marketplace assistance
 */

const API_KEY = "AIzaSyDTu8IaGapCslkIuWwkkuVg-03_sxJU0Ak";
const API_ENDPOINT = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent";

// Base system context for all agents
const BASE_SYSTEM_CONTEXT = `You are the AI backbone for Art-O-Mart, a multicultural artisan marketplace.
Your role is to act as multiple specialized agents, each assisting users (buyers and sellers) in different tasks.
All responses should be clear, short, and formatted as JSON objects where applicable so they can be directly parsed by the web app.

General Rules:
- Always respond in **structured JSON** unless asked for plain text.
- Never repeat the prompt, only give results.
- Be concise, culturally aware, and user-friendly.
- Use the provided input context (region, description, image notes, etc.) to tailor answers.`;

// Generic API call function
const callAI = async (prompt, systemContext = BASE_SYSTEM_CONTEXT) => {
  if (!API_KEY) {
    throw new Error("Gemini API key not available");
  }

  const fullPrompt = `${systemContext}\n\n${prompt}`;
  
  try {
    const response = await fetch(API_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-goog-api-key': API_KEY
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
    const responseText = data.candidates[0]?.content?.parts[0]?.text || "No response generated";
    
    // Try to parse JSON response
    try {
      return JSON.parse(responseText.replace(/```json\n?|\n?```/g, ''));
    } catch {
      return { result: responseText };
    }
  } catch (error) {
    console.error('AI Agent API call error:', error);
    throw error;
  }
};

// 1. Cultural Adaptation Agent
export const culturalAdaptationAgent = async (originalDescription, targetRegion, sourceRegion, productType) => {
  const prompt = `Act as Cultural Adaptation Agent.

Task: Rewrite product descriptions to resonate with a target buyer's region and culture.
Keep the tone respectful and localized, not literal translation.

Original Description: "${originalDescription}"
Source Region: ${sourceRegion}
Target Region: ${targetRegion}
Product Type: ${productType}

Cultural Context Guidelines:
- Tamil Nadu: Temple traditions, classical arts, silk weaving heritage
- Rajasthan: Royal heritage, desert colors, block printing traditions
- West Bengal: Literary culture, Durga Puja festivals, muslin weaving
- Uttarakhand: Mountain culture, spiritual traditions, woolen crafts
- Kerala: Spice trade history, boat races, coir products
- Gujarat: Business heritage, vibrant colors, mirror work

Output JSON format:
{
  "adaptedDescription": "Culturally adapted description that resonates with target region",
  "culturalBridge": "Brief explanation of cultural connection",
  "resonanceScore": "8.5"
}`;

  return await callAI(prompt);
};

// 2. Trust Engine Agent
export const trustEngineAgent = async (productData, imageMetadata = {}) => {
  const prompt = `Act as Trust Engine Agent.

Task: Analyze product description + uploaded image/video metadata.
Detect signs of authenticity (handmade, artisan signature, provenance clues).
Provide a trust score (0-100), badge suggestion, and reasons.

Product Data: ${JSON.stringify(productData)}
Image Metadata: ${JSON.stringify(imageMetadata)}

Analyze for:
1. Handmade quality indicators
2. Artisan signature or maker marks
3. Traditional technique evidence
4. Regional authenticity
5. Cultural accuracy

Badge Options: "Master Artisan", "Gold Verified", "Silver Verified", "Bronze Verified", "Authentic"

Output JSON format:
{
  "trustScore": 85,
  "badge": "Gold Verified",
  "reasons": ["Handmade signature detected", "Traditional technique evident", "Regional authenticity confirmed"],
  "riskFlags": ["Any concerns if found"],
  "verificationSteps": ["Suggested verification steps"]
}`;

  return await callAI(prompt);
};

// 3. Seller Coaching Agent
export const sellerCoachingAgent = async (listingData, performanceData = {}) => {
  const prompt = `Act as Seller Coaching Agent.

Task: Review seller's listing (photo, description, price).
Suggest 3 short, actionable improvements.
Optionally suggest a short marketing reel caption.

Listing Data: ${JSON.stringify(listingData)}
Performance Data: ${JSON.stringify(performanceData)}

Focus Areas:
1. Photo quality and composition
2. Description optimization
3. Pricing strategy
4. Cultural appeal
5. SEO and discoverability

Output JSON format:
{
  "overallScore": "7.5",
  "tips": ["Improve lighting in photo", "Add local cultural term", "Include care instructions"],
  "caption": "Handcrafted elegance for your home.",
  "photoSuggestions": ["Add lifestyle shots", "Show detail close-ups"],
  "pricingAdvice": "Consider 10% price increase based on quality indicators"
}`;

  return await callAI(prompt);
};

// 4. Cultural Footnote Agent
export const culturalFootnoteAgent = async (productData, targetRegion, userLanguage = 'english') => {
  const prompt = `Act as Cultural Footnote Agent.

Task: Generate one cultural background sentence for buyers in a given region.
Provide a short version + audio-friendly version (for TTS).

Product Data: ${JSON.stringify(productData)}
Target Region: ${targetRegion}
User Language: ${userLanguage}

Regional Cultural Context:
- Focus on connecting the product to the target region's cultural understanding
- Include historical or cultural significance
- Make it educational but concise
- Suitable for audio narration

Output JSON format:
{
  "footnote": "This weaving style is tied to Tamil Nadu's temple festivals.",
  "audioText": "This style is from Tamil Nadu's festivals.",
  "culturalTags": ["traditional", "heritage", "temple"],
  "historicalPeriod": "Ancient Tamil tradition",
  "regionalConnection": "Connection to user's region if applicable"
}`;

  return await callAI(prompt);
};

// 5. Image Fallback Agent
export const imageFallbackAgent = async (productData, contextInfo = {}) => {
  const prompt = `Act as Image Fallback Agent.

Task: When product has no image or a dark/blank placeholder, generate a vivid image prompt.
Style: realistic, marketplace-friendly, artisan-focused.

Product Data: ${JSON.stringify(productData)}
Context Info: ${JSON.stringify(contextInfo)}

Image Requirements:
- Realistic, professional marketplace quality
- Show the product in use or attractive setting
- Include cultural context elements
- Warm, inviting lighting
- Focus on craftsmanship details

Output JSON format:
{
  "imagePrompt": "Handwoven cotton saree with intricate temple border, warm lighting, displayed on wooden mannequin",
  "alternativePrompts": ["Alternative description 1", "Alternative description 2"],
  "styleNotes": "Traditional Indian marketplace styling",
  "lightingPreference": "Warm, natural lighting"
}`;

  return await callAI(prompt);
};

// 6. Analytics & Fairness Agent
export const analyticsAgent = async (analyticsData, fairnessMetrics = {}) => {
  const prompt = `Act as Analytics & Fairness Agent.

Task: Take mock data (clicks, conversions, region exposure) and summarize fairness insights.

Analytics Data: ${JSON.stringify(analyticsData)}
Fairness Metrics: ${JSON.stringify(fairnessMetrics)}

Analyze:
1. Small vs large seller exposure
2. Regional representation balance
3. Cultural diversity in recommendations
4. Conversion rate disparities
5. Market access fairness

Output JSON format:
{
  "summary": "Small artisans received 35% exposure compared to large sellers.",
  "metrics": {
    "exposureEquity": 65,
    "regionalBalance": 78,
    "conversionFairness": 72
  },
  "recommendations": ["Boost small artisan visibility", "Increase regional diversity"],
  "alerts": ["Any fairness concerns"]
}`;

  return await callAI(prompt);
};

// 7. Product Recommendation Agent
export const recommendationAgent = async (userPreferences, browsedProducts = [], culturalContext = {}) => {
  const prompt = `Act as Product Recommendation Agent.

Task: Generate personalized product recommendations based on user preferences and cultural context.

User Preferences: ${JSON.stringify(userPreferences)}
Browsed Products: ${JSON.stringify(browsedProducts.slice(-3))} 
Cultural Context: ${JSON.stringify(culturalContext)}

Recommendation Criteria:
1. Cultural resonance with user's region
2. Similar to browsed products
3. Price range compatibility
4. Seasonal relevance
5. Quality and trust indicators

Output JSON format:
{
  "recommendations": [
    {
      "productId": "recommended-001",
      "title": "Handwoven Kanchipuram Silk Saree",
      "reason": "Based on your interest in traditional textiles",
      "culturalRelevance": "Connects to your Tamil heritage",
      "confidenceScore": 8.5
    }
  ],
  "reasoning": "Recommendations based on cultural preferences and browsing history"
}`;

  return await callAI(prompt);
};

// 8. Conversation Agent (for chat assistance)
export const conversationAgent = async (userMessage, conversationHistory = [], userContext = {}) => {
  const prompt = `Act as Conversation Agent for Art-O-Mart marketplace assistance.

Task: Provide helpful, culturally aware responses to user queries about products, orders, or marketplace features.

User Message: "${userMessage}"
Conversation History: ${JSON.stringify(conversationHistory.slice(-3))}
User Context: ${JSON.stringify(userContext)}

Response Guidelines:
1. Be helpful and culturally sensitive
2. Provide specific product information when possible
3. Suggest relevant actions or products
4. Use appropriate cultural references
5. Keep responses concise but informative

Output JSON format:
{
  "response": "I'd be happy to help you find traditional textiles! Based on your location, I recommend checking out our Rajasthani block prints.",
  "suggestedActions": ["Browse Textiles", "View Regional Products", "Check Recommendations"],
  "productSuggestions": ["product-id-1", "product-id-2"],
  "followUpQuestions": ["Would you like to see items from a specific region?"]
}`;

  return await callAI(prompt);
};

// Utility function to get appropriate agent
export const getAgent = (agentType) => {
  const agents = {
    'cultural-adaptation': culturalAdaptationAgent,
    'trust-engine': trustEngineAgent,
    'seller-coaching': sellerCoachingAgent,
    'cultural-footnote': culturalFootnoteAgent,
    'image-fallback': imageFallbackAgent,
    'analytics': analyticsAgent,
    'recommendation': recommendationAgent,
    'conversation': conversationAgent
  };
  
  return agents[agentType] || conversationAgent;
};

// Export all agents
export default {
  culturalAdaptationAgent,
  trustEngineAgent,
  sellerCoachingAgent,
  culturalFootnoteAgent,
  imageFallbackAgent,
  analyticsAgent,
  recommendationAgent,
  conversationAgent,
  getAgent
};
