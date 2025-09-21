/**
 * Multimodal RAG System for Art O Mart
 * Combines image embeddings and text embeddings for enhanced product search
 */

import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);
const model = genAI.getGenerativeModel({ model: "gemini-pro-vision" });
const textModel = genAI.getGenerativeModel({ model: "gemini-pro" });

// Simulated embedding service (in production, use a proper embedding API)
class EmbeddingService {
  constructor() {
    this.textEmbeddings = new Map();
    this.imageEmbeddings = new Map();
    this.combinedIndex = new Map();
  }

  // Generate text embeddings using AI analysis
  async generateTextEmbedding(text) {
    try {
      const prompt = `Analyze this text and generate semantic tags and keywords for search indexing:
      
      Text: "${text}"
      
      Generate a comprehensive set of semantic tags covering:
      1. Material and techniques
      2. Cultural and regional aspects  
      3. Style and aesthetic
      4. Purpose and usage
      5. Emotional and symbolic meaning
      
      Return as JSON: {
        "primaryTags": ["main", "keywords"],
        "semanticFeatures": ["detailed", "descriptive", "features"],
        "culturalContext": ["cultural", "regional", "tags"],
        "searchTerms": ["all", "relevant", "search", "terms"]
      }`;

      const result = await textModel.generateContent(prompt);
      const response = await result.response;
      const text_response = response.text();
      
      try {
        const embedding = JSON.parse(text_response.replace(/```json\n|\n```/g, ''));
        return {
          vector: this.createVectorFromTags([
            ...embedding.primaryTags,
            ...embedding.semanticFeatures,
            ...embedding.culturalContext,
            ...embedding.searchTerms
          ]),
          tags: embedding
        };
      } catch {
        return {
          vector: this.createVectorFromTags([text]),
          tags: { primaryTags: [text], semanticFeatures: [], culturalContext: [], searchTerms: [text] }
        };
      }
    } catch (error) {
      console.error('Error generating text embedding:', error);
      return {
        vector: this.createVectorFromTags([text]),
        tags: { primaryTags: [text], semanticFeatures: [], culturalContext: [], searchTerms: [text] }
      };
    }
  }

  // Generate image embeddings using vision analysis
  async generateImageEmbedding(imageUrl, imageData = null) {
    try {
      const prompt = `Analyze this handicraft product image and extract detailed visual and cultural features:
      
      Analyze for:
      1. Visual elements (colors, patterns, textures, shapes)
      2. Craftsmanship techniques visible
      3. Cultural style and origin indicators
      4. Material identification
      5. Quality and authenticity markers
      6. Emotional and aesthetic impression
      
      Return as JSON: {
        "visualFeatures": ["colors", "patterns", "textures"],
        "techniques": ["visible", "crafting", "methods"],
        "culturalMarkers": ["style", "origin", "indicators"],
        "materials": ["identified", "materials"],
        "qualityIndicators": ["handmade", "quality", "signs"],
        "aestheticTags": ["beautiful", "elegant", "rustic"]
      }`;

      let result;
      if (imageData) {
        // If we have base64 image data
        result = await model.generateContent([prompt, { inlineData: imageData }]);
      } else if (imageUrl) {
        // If we have image URL, we'd need to fetch and convert to base64
        // For now, return a simulated analysis
        result = await this.simulateImageAnalysis(imageUrl, prompt);
      }

      const response = await result.response;
      const text_response = response.text();
      
      try {
        const analysis = JSON.parse(text_response.replace(/```json\n|\n```/g, ''));
        return {
          vector: this.createVectorFromTags([
            ...analysis.visualFeatures,
            ...analysis.techniques,
            ...analysis.culturalMarkers,
            ...analysis.materials,
            ...analysis.qualityIndicators,
            ...analysis.aestheticTags
          ]),
          analysis
        };
      } catch {
        return {
          vector: this.createVectorFromTags(['handcraft', 'traditional', 'artistic']),
          analysis: { 
            visualFeatures: ['handcrafted'],
            techniques: ['traditional'],
            culturalMarkers: ['artistic'],
            materials: ['traditional'],
            qualityIndicators: ['handmade'],
            aestheticTags: ['beautiful']
          }
        };
      }
    } catch (error) {
      console.error('Error generating image embedding:', error);
      return {
        vector: this.createVectorFromTags(['handcraft', 'traditional', 'artistic']),
        analysis: { 
          visualFeatures: ['handcrafted'],
          techniques: ['traditional'],
          culturalMarkers: ['artistic'],
          materials: ['traditional'],
          qualityIndicators: ['handmade'],
          aestheticTags: ['beautiful']
        }
      };
    }
  }

  async simulateImageAnalysis(imageUrl, prompt) {
    // Simulate image analysis when we can't directly process the image
    const mockAnalysis = {
      visualFeatures: ["vibrant colors", "intricate patterns", "textured surface"],
      techniques: ["hand weaving", "natural dyeing", "traditional crafting"],
      culturalMarkers: ["regional style", "cultural motifs", "heritage design"],
      materials: ["natural fibers", "organic materials", "traditional materials"],
      qualityIndicators: ["handmade quality", "artisan crafted", "unique details"],
      aestheticTags: ["beautiful", "elegant", "authentic", "cultural"]
    };

    return {
      response: {
        text: () => JSON.stringify(mockAnalysis)
      }
    };
  }

  // Create vector from tags (simplified embedding simulation)
  createVectorFromTags(tags) {
    const vector = new Array(100).fill(0);
    tags.forEach((tag, index) => {
      const hash = this.simpleHash(tag.toLowerCase());
      for (let i = 0; i < 10; i++) {
        vector[(hash + i) % 100] += 1 / (i + 1);
      }
    });
    return this.normalizeVector(vector);
  }

  simpleHash(str) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash;
    }
    return Math.abs(hash) % 100;
  }

  normalizeVector(vector) {
    const magnitude = Math.sqrt(vector.reduce((sum, val) => sum + val * val, 0));
    return magnitude > 0 ? vector.map(val => val / magnitude) : vector;
  }

  // Calculate cosine similarity between vectors
  cosineSimilarity(vecA, vecB) {
    if (vecA.length !== vecB.length) return 0;
    
    const dotProduct = vecA.reduce((sum, a, i) => sum + a * vecB[i], 0);
    const magnitudeA = Math.sqrt(vecA.reduce((sum, a) => sum + a * a, 0));
    const magnitudeB = Math.sqrt(vecB.reduce((sum, b) => sum + b * b, 0));
    
    return magnitudeA && magnitudeB ? dotProduct / (magnitudeA * magnitudeB) : 0;
  }
}

// Main Multimodal RAG class
export class MultimodalRAG {
  constructor() {
    this.embeddingService = new EmbeddingService();
    this.productIndex = new Map();
    this.searchHistory = [];
  }

  // Index a product with both text and image data
  async indexProduct(product) {
    try {
      const productId = product.id;
      
      // Generate text embedding from description, title, tags
      const textContent = [
        product.title,
        product.description,
        ...(product.tags || []),
        product.category,
        product.region,
        product.artisan?.specialty || ''
      ].join(' ');

      const textEmbedding = await this.embeddingService.generateTextEmbedding(textContent);
      
      // Generate image embeddings for product images
      const imageEmbeddings = [];
      if (product.images && product.images.length > 0) {
        for (const imageUrl of product.images.slice(0, 3)) { // Limit to first 3 images
          const imageEmbedding = await this.embeddingService.generateImageEmbedding(imageUrl);
          imageEmbeddings.push(imageEmbedding);
        }
      }

      // Combine embeddings
      const combinedEmbedding = this.combineEmbeddings(textEmbedding, imageEmbeddings);

      // Store in index
      this.productIndex.set(productId, {
        product,
        textEmbedding,
        imageEmbeddings,
        combinedEmbedding,
        indexedAt: new Date()
      });

      return true;
    } catch (error) {
      console.error('Error indexing product:', error);
      return false;
    }
  }

  // Combine text and image embeddings
  combineEmbeddings(textEmbedding, imageEmbeddings) {
    // Weight text embeddings more heavily (0.6) vs images (0.4)
    const textWeight = 0.6;
    const imageWeight = 0.4;

    let combinedVector = textEmbedding.vector.map(val => val * textWeight);

    if (imageEmbeddings.length > 0) {
      // Average image embeddings first
      const avgImageVector = new Array(100).fill(0);
      imageEmbeddings.forEach(imgEmb => {
        imgEmb.vector.forEach((val, i) => {
          avgImageVector[i] += val / imageEmbeddings.length;
        });
      });

      // Add weighted image vector to combined
      combinedVector = combinedVector.map((val, i) => val + (avgImageVector[i] * imageWeight));
    }

    return {
      vector: this.embeddingService.normalizeVector(combinedVector),
      textTags: textEmbedding.tags,
      imageAnalysis: imageEmbeddings.map(img => img.analysis),
      combinedScore: (textWeight + (imageEmbeddings.length > 0 ? imageWeight : 0))
    };
  }

  // Search products using multimodal query
  async searchProducts(query, options = {}) {
    try {
      const {
        limit = 10,
        threshold = 0.1,
        includeImageSearch = true,
        boostCultural = true,
        userRegion = null
      } = options;

      // Generate query embedding
      const queryEmbedding = await this.embeddingService.generateTextEmbedding(query);
      
      // Search through indexed products
      const results = [];
      
      for (const [productId, indexedItem] of this.productIndex) {
        const similarity = this.embeddingService.cosineSimilarity(
          queryEmbedding.vector,
          indexedItem.combinedEmbedding.vector
        );

        if (similarity >= threshold) {
          let score = similarity;

          // Boost score for cultural relevance
          if (boostCultural && userRegion) {
            const culturalBoost = this.calculateCulturalBoost(
              indexedItem.product,
              userRegion,
              queryEmbedding.tags
            );
            score *= culturalBoost;
          }

          results.push({
            product: indexedItem.product,
            similarity,
            adjustedScore: score,
            matchedTags: this.findMatchedTags(queryEmbedding.tags, indexedItem.combinedEmbedding.textTags),
            imageInsights: includeImageSearch ? indexedItem.combinedEmbedding.imageAnalysis : []
          });
        }
      }

      // Sort by adjusted score and limit results
      const sortedResults = results
        .sort((a, b) => b.adjustedScore - a.adjustedScore)
        .slice(0, limit);

      // Store search for analytics
      this.searchHistory.push({
        query,
        timestamp: new Date(),
        resultCount: sortedResults.length,
        topScore: sortedResults[0]?.adjustedScore || 0
      });

      return {
        results: sortedResults,
        totalFound: results.length,
        searchMetadata: {
          queryTags: queryEmbedding.tags,
          searchTime: new Date(),
          culturalBoostApplied: boostCultural && userRegion
        }
      };

    } catch (error) {
      console.error('Error searching products:', error);
      return {
        results: [],
        totalFound: 0,
        error: error.message
      };
    }
  }

  // Calculate cultural relevance boost
  calculateCulturalBoost(product, userRegion, queryTags) {
    let boost = 1.0;

    // Region match boost
    if (product.region === userRegion) {
      boost += 0.2;
    }

    // Cultural tag matches
    const culturalTags = queryTags.culturalContext || [];
    const productTags = [
      ...(product.tags || []),
      product.category,
      product.artisan?.specialty || ''
    ];

    const culturalMatches = culturalTags.filter(tag =>
      productTags.some(pTag => pTag.toLowerCase().includes(tag.toLowerCase()))
    );

    boost += culturalMatches.length * 0.1;

    return Math.min(boost, 1.5); // Cap at 1.5x boost
  }

  // Find matched tags between query and product
  findMatchedTags(queryTags, productTags) {
    const matches = [];
    const allQueryTags = [
      ...(queryTags.primaryTags || []),
      ...(queryTags.searchTerms || [])
    ];
    const allProductTags = [
      ...(productTags.primaryTags || []),
      ...(productTags.searchTerms || [])
    ];

    allQueryTags.forEach(qTag => {
      allProductTags.forEach(pTag => {
        if (qTag.toLowerCase().includes(pTag.toLowerCase()) ||
            pTag.toLowerCase().includes(qTag.toLowerCase())) {
          matches.push({ query: qTag, product: pTag });
        }
      });
    });

    return matches.slice(0, 5); // Limit matched tags
  }

  // Get search analytics
  getSearchAnalytics() {
    const recentSearches = this.searchHistory.slice(-100);
    
    return {
      totalSearches: this.searchHistory.length,
      recentSearches: recentSearches.length,
      averageResults: recentSearches.reduce((sum, search) => sum + search.resultCount, 0) / recentSearches.length,
      popularQueries: this.getPopularQueries(recentSearches),
      searchEffectiveness: recentSearches.filter(s => s.resultCount > 0).length / recentSearches.length
    };
  }

  getPopularQueries(searches) {
    const queryCount = {};
    searches.forEach(search => {
      queryCount[search.query] = (queryCount[search.query] || 0) + 1;
    });

    return Object.entries(queryCount)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 10)
      .map(([query, count]) => ({ query, count }));
  }

  // Clear index (useful for testing or resetting)
  clearIndex() {
    this.productIndex.clear();
    this.searchHistory = [];
  }

  // Get index statistics
  getIndexStats() {
    return {
      totalProducts: this.productIndex.size,
      indexSize: this.productIndex.size,
      searchHistory: this.searchHistory.length,
      lastIndexed: Array.from(this.productIndex.values())
        .map(item => item.indexedAt)
        .sort((a, b) => b - a)[0] || null
    };
  }
}

// Export singleton instance
export const multimodalRAG = new MultimodalRAG();

// Export utility functions for text-to-speech and speech-to-text
export const speechUtils = {
  // Convert text to speech (browser API)
  textToSpeech: (text, language = 'en-US') => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = language;
      utterance.rate = 0.8;
      utterance.pitch = 1.0;
      window.speechSynthesis.speak(utterance);
    }
  },

  // Start speech recognition (browser API)
  speechToText: (callback, language = 'en-US') => {
    if ('webkitSpeechRecognition' in window) {
      const recognition = new window.webkitSpeechRecognition();
      recognition.lang = language;
      recognition.continuous = false;
      recognition.interimResults = false;
      
      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        callback(transcript);
      };
      
      recognition.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
      };
      
      recognition.start();
      return recognition;
    }
    return null;
  },

  // Language codes for Indian languages
  languageCodes: {
    hindi: 'hi-IN',
    tamil: 'ta-IN',
    bengali: 'bn-IN',
    marathi: 'mr-IN',
    telugu: 'te-IN',
    gujarati: 'gu-IN',
    kannada: 'kn-IN',
    punjabi: 'pa-IN',
    english: 'en-US'
  }
};
