import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const HeroCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const featuredArtisans = [
    {
      id: 1,
      name: "Priya Sharma",
      craft: "Handwoven Textiles",
      location: "Rajasthan, India",
      image: "https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?w=800&h=600&fit=crop",
      productImage: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop",
      story: `Priya has been weaving traditional Rajasthani textiles for over 15 years, carrying forward her grandmother's legacy.\nHer intricate patterns tell stories of desert life and ancient traditions.`,
      trustScore: 4.8,
      verifiedBadge: true,
      featuredProduct: "Royal Bandhani Dupatta",
      price: "₹2,850"
    },
    {
      id: 2,
      name: "Arjun Patel",
      craft: "Wooden Sculptures",
      location: "Gujarat, India",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=600&fit=crop",
      productImage: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop",
      story: `Master craftsman Arjun creates stunning wooden sculptures using traditional Gujarati techniques.\nEach piece reflects the rich cultural heritage of his ancestral village.`,
      trustScore: 4.9,
      verifiedBadge: true,
      featuredProduct: "Ganesha Wooden Sculpture",
      price: "₹4,200"
    },
    {
      id: 3,
      name: "Meera Devi",
      craft: "Pottery & Ceramics",
      location: "Uttar Pradesh, India",
      image: "https://images.pexels.com/photos/3785079/pexels-photo-3785079.jpeg?w=800&h=600&fit=crop",
      productImage: "https://images.pexels.com/photos/1094767/pexels-photo-1094767.jpeg?w=800&h=600&fit=crop",
      story: `Meera's pottery reflects the ancient traditions of Khurja ceramics.\nHer hand-painted designs capture the essence of Indian folklore and mythology.`,
      trustScore: 4.7,
      verifiedBadge: true,
      featuredProduct: "Hand-painted Ceramic Vase",
      price: "₹1,650"
    }
  ];

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % featuredArtisans?.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, featuredArtisans?.length]);

  const goToSlide = (index) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % featuredArtisans?.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + featuredArtisans?.length) % featuredArtisans?.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  return (
    <div className="relative w-full h-[500px] lg:h-[600px] overflow-hidden rounded-2xl bg-gradient-to-br from-primary/10 to-secondary/10">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0, x: 300 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -300 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          <div className="grid lg:grid-cols-2 h-full">
            {/* Content Section */}
            <div className="flex flex-col justify-center p-8 lg:p-12 bg-background/95 backdrop-blur-sm">
              <div className="space-y-6">
                {/* Artisan Info */}
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <Image
                      src={featuredArtisans?.[currentSlide]?.image}
                      alt={featuredArtisans?.[currentSlide]?.name}
                      className="w-16 h-16 rounded-full object-cover border-2 border-primary"
                    />
                    {featuredArtisans?.[currentSlide]?.verifiedBadge && (
                      <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-success rounded-full flex items-center justify-center">
                        <Icon name="Check" size={12} color="var(--color-success-foreground)" />
                      </div>
                    )}
                  </div>
                  <div>
                    <h3 className="text-lg font-heading font-semibold text-foreground">
                      {featuredArtisans?.[currentSlide]?.name}
                    </h3>
                    <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                      <Icon name="MapPin" size={14} />
                      <span>{featuredArtisans?.[currentSlide]?.location}</span>
                    </div>
                  </div>
                </div>

                {/* Craft Type */}
                <div className="inline-flex items-center px-3 py-1 bg-accent/10 text-accent rounded-full text-sm font-medium">
                  <Icon name="Palette" size={14} className="mr-2" />
                  {featuredArtisans?.[currentSlide]?.craft}
                </div>

                {/* Story */}
                <div className="space-y-2">
                  <h4 className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
                    Artisan Story
                  </h4>
                  <p className="text-foreground leading-relaxed whitespace-pre-line">
                    {featuredArtisans?.[currentSlide]?.story}
                  </p>
                </div>

                {/* Trust Score */}
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-1">
                    <Icon name="Star" size={16} className="text-warning fill-current" />
                    <span className="text-sm font-medium text-foreground">
                      {featuredArtisans?.[currentSlide]?.trustScore}
                    </span>
                    <span className="text-sm text-muted-foreground">Trust Score</span>
                  </div>
                </div>

                {/* Featured Product */}
                <div className="space-y-3">
                  <h4 className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
                    Featured Product
                  </h4>
                  <div className="flex items-center justify-between">
                    <div>
                      <h5 className="font-heading font-semibold text-foreground">
                        {featuredArtisans?.[currentSlide]?.featuredProduct}
                      </h5>
                      <p className="text-lg font-bold text-primary">
                        {featuredArtisans?.[currentSlide]?.price}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <Link to="/artisan-storefront" className="flex-1">
                    <Button variant="default" fullWidth>
                      Visit Storefront
                    </Button>
                  </Link>
                  <Button variant="outline" iconName="Heart" className="sm:w-auto">
                    Add to Wishlist
                  </Button>
                </div>
              </div>
            </div>

            {/* Image Section */}
            <div className="relative hidden lg:block">
              <Image
                src={featuredArtisans?.[currentSlide]?.productImage}
                alt={featuredArtisans?.[currentSlide]?.featuredProduct}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
      {/* Navigation Controls */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-background/80 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-background transition-colors duration-200 z-10"
      >
        <Icon name="ChevronLeft" size={20} />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-background/80 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-background transition-colors duration-200 z-10"
      >
        <Icon name="ChevronRight" size={20} />
      </button>
      {/* Slide Indicators */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex space-x-2">
        {featuredArtisans?.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-colors duration-200 ${
              index === currentSlide ? 'bg-primary' : 'bg-background/50'
            }`}
          />
        ))}
      </div>
      {/* Auto-play Indicator */}
      <div className="absolute top-4 right-4">
        <button
          onClick={() => setIsAutoPlaying(!isAutoPlaying)}
          className="w-10 h-10 bg-background/80 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-background transition-colors duration-200"
        >
          <Icon name={isAutoPlaying ? "Pause" : "Play"} size={16} />
        </button>
      </div>
    </div>
  );
};

export default HeroCarousel;