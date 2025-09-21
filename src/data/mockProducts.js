/**
 * Comprehensive Mock Product Database for Art O Mart
 * Realistic product data with proper categorization and images
 */

import { selectProductImage, getProductImages } from '../lib/productImages';

export const MOCK_PRODUCTS = [
  // Textiles - Rajasthan
  {
    id: 'tex_raj_001',
    title: 'Rajasthani Block Print Cotton Saree',
    description: 'Handwoven cotton saree featuring traditional Rajasthani block printing with intricate floral motifs. Made using natural dyes and time-honored techniques passed down through generations.',
    price: 2500,
    originalPrice: 3200,
    category: 'Textiles',
    subcategory: 'Sarees',
    region: 'Rajasthan',
    city: 'Jaipur',
    tags: ['block print', 'cotton', 'natural dyes', 'handwoven', 'traditional'],
    images: [
      "https://images.unsplash.com/photo-1590736969955-71cc94901144?w=400&h=400&fit=crop&crop=center&auto=format&q=80",
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400&h=400&fit=crop&crop=center&auto=format&q=80"
    ],
    artisan: {
      id: 'art_001',
      name: 'Ramesh Kumar',
      businessName: 'Kumar Block Prints',
      specialty: 'Traditional Block Printing',
      experience: '25 years',
      location: 'Jaipur, Rajasthan',
      trustScore: 9.2,
      verified: true,
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face&auto=format&q=80"
    },
    rating: 4.8,
    reviewCount: 124,
    stockQuantity: 15,
    isFeatured: true,
    isHandmade: true,
    shippingTime: '5-7 days',
    measurements: 'Length: 5.5m, Width: 1.2m',
    careInstructions: 'Hand wash in cold water, dry in shade'
  },

  // Textiles - Tamil Nadu
  {
    id: 'tex_tn_001',
    title: 'Kanchipuram Pure Silk Saree with Zari Work',
    description: 'Exquisite handwoven Kanchipuram silk saree with traditional gold zari border featuring temple motifs. A masterpiece of South Indian textile artistry.',
    price: 15000,
    originalPrice: 18000,
    category: 'Textiles',
    subcategory: 'Silk Sarees',
    region: 'Tamil Nadu',
    city: 'Kanchipuram',
    tags: ['silk', 'zari work', 'temple motifs', 'handwoven', 'kanchipuram'],
    images: [
      "https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=400&h=400&fit=crop&crop=center&auto=format&q=80",
      "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=400&h=400&fit=crop&crop=center&auto=format&q=80"
    ],
    artisan: {
      id: 'art_002',
      name: 'Meena Devi',
      businessName: 'Devi Silk Weavers',
      specialty: 'Kanchipuram Silk Weaving',
      experience: '30 years',
      location: 'Kanchipuram, Tamil Nadu',
      trustScore: 9.6,
      verified: true,
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b192?w=100&h=100&fit=crop&crop=face&auto=format&q=80"
    },
    rating: 4.9,
    reviewCount: 87,
    stockQuantity: 8,
    isFeatured: true,
    isHandmade: true,
    shippingTime: '7-10 days',
    measurements: 'Length: 6.5m, Width: 1.15m',
    careInstructions: 'Dry clean only, store with care'
  },

  // Pottery - Gujarat
  {
    id: 'pot_guj_001',
    title: 'Traditional Gujarati Terracotta Water Pot',
    description: 'Handcrafted terracotta water pot with intricate tribal patterns. Made using traditional techniques that naturally cool water while adding earthy flavor.',
    price: 800,
    originalPrice: 1000,
    category: 'Pottery',
    subcategory: 'Utility Items',
    region: 'Gujarat',
    city: 'Bhuj',
    tags: ['terracotta', 'water pot', 'tribal patterns', 'eco-friendly', 'utility'],
    images: [
      "https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?w=400&h=400&fit=crop&crop=center&auto=format&q=80",
      "https://images.unsplash.com/photo-1613745188972-0325bbac9a46?w=400&h=400&fit=crop&crop=center&auto=format&q=80"
    ],
    artisan: {
      id: 'art_003',
      name: 'Kiran Patel',
      businessName: 'Kutch Clay Works',
      specialty: 'Traditional Pottery',
      experience: '18 years',
      location: 'Bhuj, Gujarat',
      trustScore: 8.7,
      verified: true,
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face&auto=format&q=80"
    },
    rating: 4.6,
    reviewCount: 203,
    stockQuantity: 25,
    isFeatured: false,
    isHandmade: true,
    shippingTime: '3-5 days',
    measurements: 'Height: 25cm, Diameter: 20cm, Capacity: 3L',
    careInstructions: 'Rinse before first use, clean with mild soap'
  },

  // Jewelry - West Bengal
  {
    id: 'jew_wb_001',
    title: 'Traditional Bengali Filigree Silver Necklace',
    description: 'Delicate silver filigree necklace showcasing the fine craftsmanship of Bengali artisans. Features intricate wire work patterns inspired by nature.',
    price: 4500,
    originalPrice: 5500,
    category: 'Jewelry',
    subcategory: 'Necklaces',
    region: 'West Bengal',
    city: 'Kolkata',
    tags: ['silver', 'filigree', 'handcrafted', 'traditional', 'delicate'],
    images: [
      "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&h=400&fit=crop&crop=center&auto=format&q=80",
      "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=400&h=400&fit=crop&crop=center&auto=format&q=80"
    ],
    artisan: {
      id: 'art_004',
      name: 'Anita Ghosh',
      businessName: 'Heritage Silver Works',
      specialty: 'Silver Filigree Jewelry',
      experience: '22 years',
      location: 'Kolkata, West Bengal',
      trustScore: 9.1,
      verified: true,
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face&auto=format&q=80"
    },
    rating: 4.7,
    reviewCount: 156,
    stockQuantity: 12,
    isFeatured: true,
    isHandmade: true,
    shippingTime: '5-7 days',
    measurements: 'Length: 45cm, Weight: 25g',
    careInstructions: 'Store in dry place, clean with silver polish'
  },

  // Woodwork - Karnataka
  {
    id: 'wood_kar_001',
    title: 'Sandalwood Hand-carved Elephant Figurine',
    description: 'Intricately carved sandalwood elephant figurine representing prosperity and good fortune. Made from sustainably sourced sandalwood by master craftsmen.',
    price: 3200,
    originalPrice: 4000,
    category: 'Woodwork',
    subcategory: 'Figurines',
    region: 'Karnataka',
    city: 'Mysore',
    tags: ['sandalwood', 'hand-carved', 'elephant', 'figurine', 'prosperity'],
    images: [
      "https://images.unsplash.com/photo-1579952363873-27d3bfad9c0d?w=400&h=400&fit=crop&crop=center&auto=format&q=80",
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=400&fit=crop&crop=center&auto=format&q=80"
    ],
    artisan: {
      id: 'art_005',
      name: 'Ravi Chandrashekar',
      businessName: 'Mysore Wood Crafts',
      specialty: 'Sandalwood Carving',
      experience: '28 years',
      location: 'Mysore, Karnataka',
      trustScore: 9.4,
      verified: true,
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face&auto=format&q=80"
    },
    rating: 4.8,
    reviewCount: 98,
    stockQuantity: 18,
    isFeatured: true,
    isHandmade: true,
    shippingTime: '7-10 days',
    measurements: 'Height: 15cm, Width: 12cm, Depth: 8cm',
    careInstructions: 'Dust gently, avoid moisture, oil occasionally'
  },

  // Metalwork - Uttar Pradesh
  {
    id: 'met_up_001',
    title: 'Brass Decorative Diya Set (Set of 5)',
    description: 'Beautiful set of handcrafted brass diyas with intricate engravings. Perfect for festivals and daily prayers, each piece tells a story of devotion.',
    price: 1200,
    originalPrice: 1500,
    category: 'Metalwork',
    subcategory: 'Religious Items',
    region: 'Uttar Pradesh',
    city: 'Moradabad',
    tags: ['brass', 'diya', 'religious', 'handcrafted', 'festival'],
    images: [
      "https://images.unsplash.com/photo-1610736662877-86d7e2ebc9b8?w=400&h=400&fit=crop&crop=center&auto=format&q=80",
      "https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?w=400&h=400&fit=crop&crop=center&auto=format&q=80"
    ],
    artisan: {
      id: 'art_006',
      name: 'Mohammad Rashid',
      businessName: 'Moradabad Brass Works',
      specialty: 'Brass Handicrafts',
      experience: '20 years',
      location: 'Moradabad, Uttar Pradesh',
      trustScore: 8.9,
      verified: true,
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face&auto=format&q=80"
    },
    rating: 4.5,
    reviewCount: 275,
    stockQuantity: 35,
    isFeatured: false,
    isHandmade: true,
    shippingTime: '4-6 days',
    measurements: 'Diameter: 8cm each, Height: 3cm each',
    careInstructions: 'Clean with brass cleaner, avoid abrasive materials'
  }
];

// Generate additional products dynamically
const generateMoreProducts = () => {
  const categories = ['Textiles', 'Pottery', 'Jewelry', 'Woodwork', 'Metalwork', 'Leather Goods', 'Bamboo Crafts'];
  const regions = ['Rajasthan', 'Gujarat', 'Uttar Pradesh', 'West Bengal', 'Karnataka', 'Tamil Nadu'];
  const additionalProducts = [];

  categories.forEach((category, catIndex) => {
    regions.forEach((region, regIndex) => {
      for (let i = 0; i < Math.floor(Math.random() * 8) + 3; i++) {
        const productId = `${category.toLowerCase().substr(0,3)}_${region.toLowerCase().replace(/\s+/g, '')}_${String(i + 1).padStart(3, '0')}`;
        
        const basePrice = Math.floor(Math.random() * 8000) + 500;
        const product = {
          id: productId,
          title: generateProductTitle(category, region),
          description: generateProductDescription(category, region),
          price: basePrice,
          originalPrice: Math.floor(basePrice * 1.2),
          category,
          subcategory: generateSubcategory(category),
          region,
          city: getCityForRegion(region),
          tags: generateTags(category),
          images: getProductImages({ 
            title: generateProductTitle(category, region), 
            category: category.toLowerCase(), 
            region: region.toLowerCase() 
          }, 2),
          artisan: generateArtisan(region, category),
          rating: Math.round((Math.random() * 1.5 + 3.5) * 10) / 10,
          reviewCount: Math.floor(Math.random() * 200) + 10,
          stockQuantity: Math.floor(Math.random() * 30) + 5,
          isFeatured: Math.random() > 0.8,
          isHandmade: true,
          shippingTime: getShippingTime(),
          measurements: generateMeasurements(category),
          careInstructions: generateCareInstructions(category)
        };
        
        additionalProducts.push(product);
      }
    });
  });

  return additionalProducts;
};

const generateProductTitle = (category, region) => {
  const titles = {
    'Textiles': [
      `${region} Traditional Handloom Saree`,
      `Hand-woven ${region} Cotton Fabric`,
      `${region} Block Print Dupatta`,
      `Traditional ${region} Silk Stole`
    ],
    'Pottery': [
      `${region} Clay Water Pitcher`,
      `Hand-thrown ${region} Ceramic Bowl`,
      `Traditional ${region} Terracotta Vase`,
      `${region} Glazed Pottery Set`
    ],
    'Jewelry': [
      `${region} Traditional Silver Earrings`,
      `Hand-crafted ${region} Beaded Necklace`,
      `${region} Ethnic Brass Bangles`,
      `Traditional ${region} Stone Jewelry`
    ],
    'Woodwork': [
      `${region} Hand-carved Wooden Box`,
      `Traditional ${region} Wood Sculpture`,
      `${region} Decorative Wall Panel`,
      `Hand-crafted ${region} Furniture`
    ],
    'Metalwork': [
      `${region} Brass Decorative Item`,
      `Hand-forged ${region} Iron Craft`,
      `Traditional ${region} Copper Vessel`,
      `${region} Metal Wall Hanging`
    ],
    'Leather Goods': [
      `${region} Hand-stitched Leather Bag`,
      `Traditional ${region} Leather Footwear`,
      `${region} Embossed Leather Wallet`,
      `Hand-crafted ${region} Leather Belt`
    ],
    'Bamboo Crafts': [
      `${region} Woven Bamboo Basket`,
      `Traditional ${region} Bamboo Furniture`,
      `${region} Decorative Bamboo Item`,
      `Hand-crafted ${region} Bamboo Utility`
    ]
  };
  
  const categoryTitles = titles[category] || [`${region} Traditional ${category}`];
  return categoryTitles[Math.floor(Math.random() * categoryTitles.length)];
};

const generateProductDescription = (category, region) => {
  return `Beautiful handcrafted ${category.toLowerCase()} from ${region}, made using traditional techniques passed down through generations. Each piece showcases the rich cultural heritage and skilled craftsmanship of local artisans.`;
};

const generateSubcategory = (category) => {
  const subcategories = {
    'Textiles': ['Sarees', 'Fabrics', 'Stoles', 'Scarves'],
    'Pottery': ['Utility Items', 'Decorative', 'Planters', 'Dinnerware'],
    'Jewelry': ['Necklaces', 'Earrings', 'Bracelets', 'Rings'],
    'Woodwork': ['Figurines', 'Furniture', 'Decorative', 'Utility'],
    'Metalwork': ['Religious Items', 'Decorative', 'Utility', 'Sculptures'],
    'Leather Goods': ['Bags', 'Footwear', 'Accessories', 'Belts'],
    'Bamboo Crafts': ['Baskets', 'Furniture', 'Decorative', 'Utility']
  };
  
  const subs = subcategories[category] || ['Handmade'];
  return subs[Math.floor(Math.random() * subs.length)];
};

const generateTags = (category) => {
  const tagMap = {
    'Textiles': ['handloom', 'cotton', 'silk', 'traditional', 'natural'],
    'Pottery': ['clay', 'ceramic', 'handmade', 'traditional', 'eco-friendly'],
    'Jewelry': ['handcrafted', 'traditional', 'ethnic', 'silver', 'beaded'],
    'Woodwork': ['carved', 'wooden', 'handmade', 'traditional', 'decorative'],
    'Metalwork': ['brass', 'copper', 'handcrafted', 'traditional', 'decorative'],
    'Leather Goods': ['leather', 'handstitched', 'durable', 'traditional', 'natural'],
    'Bamboo Crafts': ['bamboo', 'eco-friendly', 'sustainable', 'handwoven', 'natural']
  };
  
  return tagMap[category] || ['handmade', 'traditional'];
};

const getCityForRegion = (region) => {
  const cities = {
    'Rajasthan': ['Jaipur', 'Jodhpur', 'Udaipur', 'Bikaner'],
    'Gujarat': ['Ahmedabad', 'Bhuj', 'Surat', 'Vadodara'],
    'Uttar Pradesh': ['Varanasi', 'Agra', 'Lucknow', 'Moradabad'],
    'West Bengal': ['Kolkata', 'Shantiniketan', 'Darjeeling', 'Bishnupur'],
    'Karnataka': ['Mysore', 'Bangalore', 'Channapatna', 'Hubli'],
    'Tamil Nadu': ['Chennai', 'Kanchipuram', 'Thanjavur', 'Madurai']
  };
  
  const regionCities = cities[region] || [region];
  return regionCities[Math.floor(Math.random() * regionCities.length)];
};

const generateArtisan = (region, category) => {
  const names = [
    'Rajesh Kumar', 'Anita Sharma', 'Mohan Das', 'Priya Patel', 
    'Suresh Reddy', 'Lakshmi Devi', 'Arjun Singh', 'Meera Joshi'
  ];
  
  const businessNames = [
    `${region} ${category} Works`, `Traditional ${category} House`, 
    `Heritage ${category} Crafts`, `${region} Artisan Co-op`
  ];
  
  const specialties = [
    `Traditional ${category}`, `Hand-crafted ${category}`, 
    `${region} ${category}`, `Heritage ${category}`
  ];

  return {
    id: `art_${Math.random().toString(36).substr(2, 9)}`,
    name: names[Math.floor(Math.random() * names.length)],
    businessName: businessNames[Math.floor(Math.random() * businessNames.length)],
    specialty: specialties[Math.floor(Math.random() * specialties.length)],
    experience: `${Math.floor(Math.random() * 20) + 5} years`,
    location: `${getCityForRegion(region)}, ${region}`,
    trustScore: Math.round((Math.random() * 2 + 7.5) * 10) / 10,
    verified: Math.random() > 0.3,
    image: `https://images.unsplash.com/photo-${Math.random() > 0.5 ? '1507003211169-0a1dd7228f2d' : '1494790108755-2616b612b192'}?w=100&h=100&fit=crop&crop=face&auto=format&q=80`
  };
};

const getShippingTime = () => {
  const times = ['3-5 days', '4-6 days', '5-7 days', '7-10 days', '10-14 days'];
  return times[Math.floor(Math.random() * times.length)];
};

const generateMeasurements = (category) => {
  const measurements = {
    'Textiles': 'Length: 5.5m, Width: 1.2m',
    'Pottery': 'Height: 20cm, Diameter: 15cm',
    'Jewelry': 'Length: 40cm, Weight: 20g',
    'Woodwork': 'Height: 15cm, Width: 10cm',
    'Metalwork': 'Diameter: 12cm, Height: 8cm',
    'Leather Goods': 'Length: 25cm, Width: 20cm',
    'Bamboo Crafts': 'Height: 30cm, Diameter: 25cm'
  };
  
  return measurements[category] || 'Standard size';
};

const generateCareInstructions = (category) => {
  const instructions = {
    'Textiles': 'Hand wash in cold water, dry in shade',
    'Pottery': 'Clean with mild soap, avoid harsh chemicals',
    'Jewelry': 'Store in dry place, clean with soft cloth',
    'Woodwork': 'Dust regularly, avoid moisture',
    'Metalwork': 'Clean with appropriate metal cleaner',
    'Leather Goods': 'Keep away from water, condition regularly',
    'Bamboo Crafts': 'Clean with damp cloth, air dry'
  };
  
  return instructions[category] || 'Handle with care';
};

// Combine base products with generated ones
export const ALL_PRODUCTS = [...MOCK_PRODUCTS, ...generateMoreProducts()];

// Featured artisans data
export const FEATURED_ARTISANS = [
  {
    id: 'art_001',
    name: 'Ramesh Kumar',
    businessName: 'Kumar Block Prints',
    specialty: 'Traditional Block Printing',
    experience: '25 years',
    location: 'Jaipur, Rajasthan',
    trustScore: 9.2,
    verified: true,
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face&auto=format&q=80",
    bio: 'Master craftsman specializing in traditional Rajasthani block printing techniques. His family has been in the textile business for over 100 years.',
    totalProducts: 45,
    totalSales: 1240,
    rating: 4.8,
    achievements: ['Master Craftsman Award 2022', 'Export Excellence Award'],
    socialCause: 'Supports local women artisans through skill development programs'
  },
  {
    id: 'art_002',
    name: 'Meena Devi',
    businessName: 'Devi Silk Weavers',
    specialty: 'Kanchipuram Silk Weaving',
    experience: '30 years',
    location: 'Kanchipuram, Tamil Nadu',
    trustScore: 9.6,
    verified: true,
    image: "https://images.unsplash.com/photo-1494790108755-2616b612b192?w=200&h=200&fit=crop&crop=face&auto=format&q=80",
    bio: 'Renowned silk weaver known for her exquisite Kanchipuram sarees. She has trained over 50 women in traditional weaving techniques.',
    totalProducts: 32,
    totalSales: 850,
    rating: 4.9,
    achievements: ['National Handicrafts Award', 'Women Entrepreneur of the Year 2023'],
    socialCause: 'Promotes sustainable silk production and fair wages for weavers'
  },
  {
    id: 'art_005',
    name: 'Ravi Chandrashekar',
    businessName: 'Mysore Wood Crafts',
    specialty: 'Sandalwood Carving',
    experience: '28 years',
    location: 'Mysore, Karnataka',
    trustScore: 9.4,
    verified: true,
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop&crop=face&auto=format&q=80",
    bio: 'Expert sandalwood carver creating intricate sculptures and decorative items. His work is displayed in museums across India.',
    totalProducts: 28,
    totalSales: 675,
    rating: 4.8,
    achievements: ['Karnataka State Award for Crafts', 'Heritage Craftsman Recognition'],
    socialCause: 'Advocates for sustainable sandalwood harvesting and forest conservation'
  }
];

export default {
  MOCK_PRODUCTS,
  ALL_PRODUCTS,
  FEATURED_ARTISANS
};
