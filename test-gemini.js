import { GoogleGenerativeAI } from "@google/generative-ai";

// Test the Gemini API integration
const apiKey = "AIzaSyDTu8IaGapCslkIuWwkkuVg-03_sxJU0Ak";

async function testGeminiAPI() {
  try {
    console.log("Testing Gemini API connection...");
    
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    
    const prompt = "Hello! Just say 'API working' to confirm the connection.";
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    console.log("✅ API Response:", text);
    console.log("✅ Gemini API is working correctly!");
    
  } catch (error) {
    console.error("❌ API Error:", error);
    console.error("Full error details:", JSON.stringify(error, null, 2));
  }
}

testGeminiAPI();
