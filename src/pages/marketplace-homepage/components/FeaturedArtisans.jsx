import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const FeaturedArtisans = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const featuredArtisans = [
    {
      id: 1,
      name: "Priya Sharma",
      craft: "Handwoven Textiles",
      location: "Jaipur, Rajasthan",
      image: "https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?w=300&h=300&fit=crop",
      coverImage: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600&h=400&fit=crop",
      story: `Priya has been weaving traditional Rajasthani textiles for over 15 years, carrying forward her grandmother's legacy of creating exquisite Bandhani patterns.\n\nHer work represents the rich cultural heritage of Rajasthan, with each piece telling a unique story of desert life and ancient traditions.`,
      trustScore: 4.8,
      verified: true,
      totalProducts: 47,
      totalSales: 1250,
      yearsOfExperience: 15,
      specialties: ["Bandhani", "Block Printing", "Natural Dyes"],
      awards: ["Best Traditional Craft 2023", "Heritage Artisan Award"],
      customerReviews: 127,
      averageRating: 4.9
    },
    {
      id: 2,
      name: "Arjun Patel",
      craft: "Wooden Sculptures",
      location: "Ahmedabad, Gujarat",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop",
      coverImage: "https://images.pexels.com/photos/1094767/pexels-photo-1094767.jpeg?w=600&h=400&fit=crop",
      story: `Master craftsman Arjun creates stunning wooden sculptures using traditional Gujarati techniques passed down through four generations.\n\nHis intricate carvings reflect the spiritual and cultural essence of Gujarat, with each sculpture representing months of dedicated craftsmanship.`,
      trustScore: 4.9,
      verified: true,
      totalProducts: 32,
      totalSales: 890,
      yearsOfExperience: 22,
      specialties: ["Religious Sculptures", "Decorative Art", "Custom Carvings"],
      awards: ["Master Craftsman 2022", "Cultural Heritage Award"],
      customerReviews: 89,
      averageRating: 4.8
    },
    {
      id: 3,
      name: "Meera Devi",
      craft: "Pottery & Ceramics",
      location: "Khurja, Uttar Pradesh",
      image: "https://images.pexels.com/photos/3785079/pexels-photo-3785079.jpeg?w=300&h=300&fit=crop",
      coverImage: "https://images.pixabay.com/photo/2017/08/01/11/48/blue-2564660_1280.jpg?w=600&h=400&fit=crop",
      story: `Meera's pottery reflects the ancient traditions of Khurja ceramics, known for their distinctive blue and white patterns.\n\nHer hand-painted designs capture the essence of Indian folklore and mythology, creating functional art pieces that bridge tradition and modernity.`,
      trustScore: 4.7,
      verified: true,
      totalProducts: 68,
      totalSales: 1450,
      yearsOfExperience: 18,
      specialties: ["Blue Pottery", "Hand Painting", "Traditional Glazing"],
      awards: ["Excellence in Ceramics 2023"],
      customerReviews: 156,
      averageRating: 4.6
    },
    {
      id: 4,
      name: "Ravi Kumar",
      craft: "Silver Filigree",
      location: "Cuttack, Odisha",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop",
      coverImage: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=600&h=400&fit=crop",
      story: `Ravi is a master of the delicate art of silver filigree, a traditional craft of Odisha that requires exceptional skill and patience.\n\nHis intricate jewelry pieces showcase the finest details of this ancient metalworking technique, creating wearable art that celebrates Indian craftsmanship.`,
      trustScore: 4.9,
      verified: true,
      totalProducts: 25,
      totalSales: 650,
      yearsOfExperience: 20,
      specialties: ["Filigree Jewelry", "Silver Work", "Traditional Designs"],
      awards: ["Master Artisan 2022", "Silver Craft Excellence"],
      customerReviews: 203,
      averageRating: 4.9
    }
  ];

  const nextArtisan = () => {
    setCurrentIndex((prev) => (prev + 1) % featuredArtisans?.length);
  };

  const prevArtisan = () => {
    setCurrentIndex((prev) => (prev - 1 + featuredArtisans?.length) % featuredArtisans?.length);
  };

  const currentArtisan = featuredArtisans?.[currentIndex];

  return (
    <div className="space-y-8">
      {/* Section Header */}
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <h2 className="text-2xl lg:text-3xl font-heading font-bold text-foreground">
            Featured Artisans
          </h2>
          <p className="text-muted-foreground">
            Discover the stories behind authentic handcrafted products
          </p>
        </div>
        
        <div className="flex items-center space-x-2">
          <button
            onClick={prevArtisan}
            className="w-10 h-10 bg-background border border-border rounded-full flex items-center justify-center hover:bg-muted transition-colors duration-200"
          >
            <Icon name="ChevronLeft" size={18} />
          </button>
          <button
            onClick={nextArtisan}
            className="w-10 h-10 bg-background border border-border rounded-full flex items-center justify-center hover:bg-muted transition-colors duration-200"
          >
            <Icon name="ChevronRight" size={18} />
          </button>
        </div>
      </div>
      {/* Featured Artisan Card */}
      <motion.div
        key={currentArtisan?.id}
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-card rounded-2xl border border-border overflow-hidden shadow-warm-md"
      >
        <div className="grid lg:grid-cols-2 gap-0">
          {/* Image Section */}
          <div className="relative h-64 lg:h-auto">
            <Image
              src={currentArtisan?.coverImage}
              alt={`${currentArtisan?.name}'s work`}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
            
            {/* Craft Badge */}
            <div className="absolute top-4 left-4">
              <div className="flex items-center space-x-2 px-3 py-1 bg-background/90 backdrop-blur-sm rounded-full">
                <Icon name="Palette" size={14} className="text-primary" />
                <span className="text-sm font-medium text-foreground">
                  {currentArtisan?.craft}
                </span>
              </div>
            </div>

            {/* Trust Score */}
            <div className="absolute top-4 right-4">
              <div className="flex items-center space-x-1 px-3 py-1 bg-background/90 backdrop-blur-sm rounded-full">
                <Icon name="Shield" size={14} className="text-success" />
                <span className="text-sm font-medium text-foreground">
                  {currentArtisan?.trustScore}
                </span>
              </div>
            </div>
          </div>

          {/* Content Section */}
          <div className="p-6 lg:p-8 space-y-6">
            {/* Artisan Header */}
            <div className="flex items-start space-x-4">
              <div className="relative">
                <Image
                  src={currentArtisan?.image}
                  alt={currentArtisan?.name}
                  className="w-16 h-16 rounded-full object-cover border-2 border-primary"
                />
                {currentArtisan?.verified && (
                  <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-success rounded-full flex items-center justify-center">
                    <Icon name="Check" size={12} color="var(--color-success-foreground)" />
                  </div>
                )}
              </div>
              
              <div className="flex-1">
                <h3 className="text-xl font-heading font-bold text-foreground">
                  {currentArtisan?.name}
                </h3>
                <div className="flex items-center space-x-2 text-muted-foreground">
                  <Icon name="MapPin" size={14} />
                  <span className="text-sm">{currentArtisan?.location}</span>
                </div>
                <div className="flex items-center space-x-4 mt-2">
                  <div className="flex items-center space-x-1">
                    <Icon name="Star" size={14} className="text-warning fill-current" />
                    <span className="text-sm font-medium text-foreground">
                      {currentArtisan?.averageRating}
                    </span>
                    <span className="text-sm text-muted-foreground">
                      ({currentArtisan?.customerReviews})
                    </span>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {currentArtisan?.yearsOfExperience} years experience
                  </div>
                </div>
              </div>
            </div>

            {/* Story */}
            <div className="space-y-3">
              <h4 className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
                Artisan Story
              </h4>
              <p className="text-foreground leading-relaxed whitespace-pre-line text-sm">
                {currentArtisan?.story}
              </p>
            </div>

            {/* Specialties */}
            <div className="space-y-3">
              <h4 className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
                Specialties
              </h4>
              <div className="flex flex-wrap gap-2">
                {currentArtisan?.specialties?.map((specialty) => (
                  <span
                    key={specialty}
                    className="px-3 py-1 bg-accent/10 text-accent text-sm rounded-full"
                  >
                    {specialty}
                  </span>
                ))}
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 py-4 border-t border-border">
              <div className="text-center">
                <div className="text-lg font-bold text-foreground">
                  {currentArtisan?.totalProducts}
                </div>
                <div className="text-xs text-muted-foreground">Products</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-foreground">
                  {currentArtisan?.totalSales}
                </div>
                <div className="text-xs text-muted-foreground">Sales</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-foreground">
                  {currentArtisan?.awards?.length}
                </div>
                <div className="text-xs text-muted-foreground">Awards</div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-3">
              <Link to="/artisan-storefront" className="flex-1">
                <Button variant="default" fullWidth iconName="Store">
                  Visit Storefront
                </Button>
              </Link>
              <Button variant="outline" iconName="Heart">
                Follow Artisan
              </Button>
            </div>
          </div>
        </div>
      </motion.div>
      {/* Artisan Navigation Dots */}
      <div className="flex justify-center space-x-2">
        {featuredArtisans?.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-3 h-3 rounded-full transition-colors duration-200 ${
              index === currentIndex ? 'bg-primary' : 'bg-muted'
            }`}
          />
        ))}
      </div>
      {/* All Artisans Link */}
      <div className="text-center">
        <Link to="/artisans">
          <Button variant="outline" size="lg" iconName="Users">
            View All Artisans
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default FeaturedArtisans;