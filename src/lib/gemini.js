
import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
if (!apiKey) {
  throw new Error("VITE_GEMINI_API_KEY is not set in the environment variables");
}

const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({ model: "gemini-pro" });

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

// Function to get product recommendations based on query
export const getProductRecommendations = async (query, userPreferences = {}) => {
  try {
    const prompt = `${SYSTEM_CONTEXT}

User Query: "${query}"
User Preferences: ${JSON.stringify(userPreferences)}

Provide 3-5 specific product recommendations in this JSON format:
[
  {
    "name": "Product name",
    "category": "Category",
    "region": "Origin region",
    "priceRange": "₹X - ₹Y",
    "description": "Brief description",
    "culturalSignificance": "Cultural context",
    "artisanInfo": "Brief artisan background"
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
