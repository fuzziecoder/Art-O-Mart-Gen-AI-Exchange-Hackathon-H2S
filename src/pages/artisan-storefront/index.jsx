import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../../components/ui/Header';
import ArtisanProfile from './components/ArtisanProfile';
import CulturalStory from './components/CulturalStory';
import ProductGrid from './components/ProductGrid';
import CustomerReviews from './components/CustomerReviews';
import ContactSection from './components/ContactSection';

const ArtisanStorefront = () => {
  const { artisanId } = useParams();
  const [loading, setLoading] = useState(true);

  // Mock artisan data
  const artisanData = {
    id: "artisan-001",
    name: "Priya Sharma",
    location: "Jaipur, Rajasthan, India",
    craftSpecialization: "Traditional Block Printing & Textiles",
    bio: "A third-generation artisan specializing in traditional Rajasthani block printing techniques passed down through my family. I create authentic handcrafted textiles using natural dyes and time-honored methods that celebrate our rich cultural heritage.",
    profileImage: "https://images.unsplash.com/photo-1494790108755-2616c9c0b8c3?w=400&h=400&fit=crop&crop=face",
    trustScore: 94,
    yearsExperience: 15,
    totalProducts: 47,
    totalReviews: 156,
    totalCustomers: 340,
    isVerified: true,
    verificationBadges: ["Identity Verified", "Craft Certified", "Quality Assured"],
    languages: ["Hindi", "English", "Rajasthani"],
    trustIndicators: [
      "Government certified artisan",
      "Secure payment processing",
      "Authentic handmade guarantee",
      "Fair trade practices"
    ]
  };

  const culturalStory = {
    title: "Heritage of Rajasthani Block Printing",
    excerpt: "My journey with block printing began in childhood, watching my grandmother create intricate patterns on fabric using wooden blocks carved by my grandfather. This ancient art form, dating back over 300 years in Rajasthan, represents not just a craft but a way of life that connects us to our ancestors.",
    fullContent: `My journey with block printing began in childhood, watching my grandmother create intricate patterns on fabric using wooden blocks carved by my grandfather. This ancient art form, dating back over 300 years in Rajasthan, represents not just a craft but a way of life that connects us to our ancestors.

Each block is hand-carved from teak wood, with designs inspired by nature, mythology, and geometric patterns that have been passed down through generations. The process requires patience and precision - from preparing the natural dyes using turmeric, indigo, and pomegranate to the rhythmic stamping that creates our signature patterns.

What makes our craft special is the use of traditional techniques that have remained unchanged for centuries. We still use natural dyes extracted from plants and minerals, and every piece tells a story of our cultural heritage. The slight imperfections in hand-block printing are not flaws but signatures of authenticity that machine printing can never replicate.

Today, I'm proud to continue this legacy while adapting to modern needs, creating contemporary designs that honor our traditional roots while appealing to global audiences who appreciate authentic craftsmanship.`,
    heritageTags: ["Block Printing", "Natural Dyes", "Rajasthani Heritage", "Handcrafted", "Traditional Art"],
    images: [
      {
        url: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600&h=400&fit=crop",
        caption: "Traditional wooden blocks used for printing"
      },
      {
        url: "https://images.unsplash.com/photo-1582639510494-c80b5de9f148?w=300&h=200&fit=crop",
        caption: "Natural dye preparation"
      },
      {
        url: "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?w=300&h=200&fit=crop",
        caption: "Hand-printing process"
      }
    ],
    timeline: [
      {
        year: "1700s",
        period: "Origins",
        description: "Block printing technique introduced to Rajasthan by craftsmen from Sindh"
      },
      {
        year: "1950s",
        period: "Family Legacy",
        description: "My grandfather established our family workshop in Jaipur"
      },
      {
        year: "1980s",
        period: "Second Generation",
        description: "My father expanded the craft, introducing new patterns while preserving traditions"
      },
      {
        year: "2009",
        period: "My Journey",
        description: "I began learning the craft and started creating contemporary designs"
      }
    ]
  };

  const products = [
    {
      id: "prod-001",
      title: "Handblock Printed Cotton Dupatta - Floral Motif",
      price: 1250,
      originalPrice: 1500,
      category: "textiles",
      images: ["https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?w=400&h=400&fit=crop"],
      rating: 4.8,
      reviewCount: 23,
      stock: 8,
      isNew: true,
      createdAt: "2024-09-10"
    },
    {
      id: "prod-002",
      title: "Traditional Block Print Bedsheet Set",
      price: 2800,
      category: "textiles",
      images: ["https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=400&fit=crop"],
      rating: 4.9,
      reviewCount: 31,
      stock: 5,
      isNew: false,
      createdAt: "2024-09-05"
    },
    {
      id: "prod-003",
      title: "Indigo Dyed Cotton Scarf",
      price: 850,
      category: "textiles",
      images: ["https://images.unsplash.com/photo-1582639510494-c80b5de9f148?w=400&h=400&fit=crop"],
      rating: 4.7,
      reviewCount: 18,
      stock: 12,
      isNew: false,
      createdAt: "2024-08-28"
    },
    {
      id: "prod-004",
      title: "Wooden Block Printing Stamps Set",
      price: 1800,
      category: "woodwork",
      images: ["https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=400&fit=crop"],
      rating: 4.6,
      reviewCount: 12,
      stock: 3,
      isNew: true,
      createdAt: "2024-09-12"
    },
    {
      id: "prod-005",
      title: "Natural Dye Block Print Cushion Covers",
      price: 650,
      category: "textiles",
      images: ["https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?w=400&h=400&fit=crop"],
      rating: 4.8,
      reviewCount: 27,
      stock: 15,
      isNew: false,
      createdAt: "2024-08-20"
    },
    {
      id: "prod-006",
      title: "Rajasthani Print Table Runner",
      price: 950,
      category: "textiles",
      images: ["https://images.unsplash.com/photo-1582639510494-c80b5de9f148?w=400&h=400&fit=crop"],
      rating: 4.5,
      reviewCount: 14,
      stock: 0,
      isNew: false,
      createdAt: "2024-08-15"
    }
  ];

  const reviews = [
    {
      id: "rev-001",
      customerName: "Anita Patel",
      customerAvatar: "https://randomuser.me/api/portraits/women/32.jpg",
      rating: 5,
      date: "2024-09-15",
      comment: "Absolutely beautiful work! The quality of the block printing is exceptional and you can see the care and skill that went into each piece. The colors are vibrant and the fabric feels wonderful. Will definitely order again!",
      productName: "Handblock Printed Cotton Dupatta",
      isVerifiedPurchase: true,
      helpfulCount: 8,
      images: ["https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?w=100&h=100&fit=crop"],
      artisanReply: "Thank you so much Anita! I\'m delighted that you appreciate the traditional techniques. Each piece is made with love and care."
    },
    {
      id: "rev-002",
      customerName: "Michael Johnson",
      customerAvatar: "https://randomuser.me/api/portraits/men/45.jpg",
      rating: 5,
      date: "2024-09-12",
      comment: "Purchased this as a gift for my wife who loves authentic handcrafted items. She was thrilled with the quality and the story behind the craft. Priya's work is truly exceptional.",
      productName: "Traditional Block Print Bedsheet Set",
      isVerifiedPurchase: true,
      helpfulCount: 5
    },
    {
      id: "rev-003",
      customerName: "Ravi Kumar",
      customerAvatar: "https://randomuser.me/api/portraits/men/28.jpg",
      rating: 4,
      date: "2024-09-08",
      comment: "Great quality and fast shipping. The indigo dye has a beautiful depth of color. Only minor issue was that it was slightly smaller than expected, but still very happy with the purchase.",
      productName: "Indigo Dyed Cotton Scarf",
      isVerifiedPurchase: true,
      helpfulCount: 3
    },
    {
      id: "rev-004",
      customerName: "Sarah Williams",
      customerAvatar: "https://randomuser.me/api/portraits/women/22.jpg",
      rating: 5,
      date: "2024-09-05",
      comment: "I'm a textile design student and was fascinated by the traditional techniques. Priya was very helpful in explaining the process and the historical significance. The cushion covers are beautiful!",
      productName: "Natural Dye Block Print Cushion Covers",
      isVerifiedPurchase: true,
      helpfulCount: 12
    },
    {
      id: "rev-005",
      customerName: "Deepika Sharma",
      customerAvatar: "https://randomuser.me/api/portraits/women/35.jpg",
      rating: 5,
      date: "2024-08-30",
      comment: "As someone from Rajasthan, I can appreciate the authenticity of Priya's work. It reminds me of my grandmother's textiles. Excellent craftsmanship and fair pricing.",
      productName: "Rajasthani Print Table Runner",
      isVerifiedPurchase: true,
      helpfulCount: 7
    },
    {
      id: "rev-006",
      customerName: "James Chen",
      customerAvatar: "https://randomuser.me/api/portraits/men/33.jpg",
      rating: 4,
      date: "2024-08-25",
      comment: "Beautiful work and great communication from the artisan. The wooden blocks are well-crafted and perfect for my art projects. Shipping took a bit longer than expected but worth the wait.",
      productName: "Wooden Block Printing Stamps Set",
      isVerifiedPurchase: true,
      helpfulCount: 4
    }
  ];

  const averageRating = 4.8;
  const totalReviews = 156;

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="pt-20 flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading artisan storefront...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-8">
          <div className="space-y-8">
            {/* Artisan Profile Section */}
            <ArtisanProfile artisan={artisanData} />

            {/* Cultural Story Section */}
            <CulturalStory story={culturalStory} />

            <div className="grid lg:grid-cols-3 gap-8">
              {/* Main Content */}
              <div className="lg:col-span-2 space-y-8">
                {/* Products Grid */}
                <ProductGrid products={products} />

                {/* Customer Reviews */}
                <CustomerReviews 
                  reviews={reviews}
                  averageRating={averageRating}
                  totalReviews={totalReviews}
                />
              </div>

              {/* Sidebar */}
              <div className="lg:col-span-1">
                <div className="sticky top-24">
                  <ContactSection artisan={artisanData} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ArtisanStorefront;