import React from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';

const TrustIndicators = () => {
  const trustMetrics = [
    {
      id: 1,
      icon: "Shield",
      title: "Verified Artisans",
      value: "2,500+",
      description: "All artisans undergo identity and craft verification",
      color: "text-success"
    },
    {
      id: 2,
      icon: "Star",
      title: "Customer Rating",
      value: "4.8/5",
      description: "Average rating from 50,000+ verified reviews",
      color: "text-warning"
    },
    {
      id: 3,
      icon: "Package",
      title: "Products Sold",
      value: "100K+",
      description: "Authentic handcrafted products delivered",
      color: "text-primary"
    },
    {
      id: 4,
      icon: "Globe",
      title: "Regions Covered",
      value: "28 States",
      description: "Connecting artisans across India",
      color: "text-accent"
    }
  ];

  const certifications = [
    {
      id: 1,
      name: "Handicrafts Export Corporation",
      logo: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=100&h=100&fit=crop",
      description: "Official partner for authentic Indian handicrafts"
    },
    {
      id: 2,
      name: "Ministry of Textiles",
      logo: "https://images.pexels.com/photos/1181406/pexels-photo-1181406.jpeg?w=100&h=100&fit=crop",
      description: "Government recognized textile artisan platform"
    },
    {
      id: 3,
      name: "Fair Trade Certified",
      logo: "https://images.pixabay.com/photo/2017/08/01/11/48/blue-2564660_1280.jpg?w=100&h=100&fit=crop",
      description: "Ensuring fair wages and ethical practices"
    }
  ];

  const securityFeatures = [
    {
      id: 1,
      icon: "Lock",
      title: "Secure Payments",
      description: "256-bit SSL encryption for all transactions"
    },
    {
      id: 2,
      icon: "Truck",
      title: "Insured Shipping",
      description: "Full insurance coverage on all deliveries"
    },
    {
      id: 3,
      icon: "RotateCcw",
      title: "Easy Returns",
      description: "30-day hassle-free return policy"
    },
    {
      id: 4,
      icon: "Headphones",
      title: "24/7 Support",
      description: "Round-the-clock customer assistance"
    }
  ];

  return (
    <div className="space-y-12">
      {/* Trust Metrics */}
      <div className="space-y-6">
        <div className="text-center space-y-2">
          <h2 className="text-2xl lg:text-3xl font-heading font-bold text-foreground">
            Trusted by Thousands
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Building trust through transparency, quality, and authentic artisan partnerships
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {trustMetrics?.map((metric, index) => (
            <motion.div
              key={metric?.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="text-center space-y-3 p-6 bg-card rounded-xl border border-border hover:shadow-warm-md transition-all duration-300"
            >
              <div className={`w-12 h-12 mx-auto rounded-full bg-muted flex items-center justify-center ${metric?.color}`}>
                <Icon name={metric?.icon} size={24} />
              </div>
              <div className="space-y-1">
                <div className="text-2xl font-bold text-foreground">
                  {metric?.value}
                </div>
                <div className="text-sm font-medium text-foreground">
                  {metric?.title}
                </div>
                <div className="text-xs text-muted-foreground">
                  {metric?.description}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      {/* Certifications */}
      <div className="space-y-6">
        <div className="text-center space-y-2">
          <h3 className="text-xl font-heading font-semibold text-foreground">
            Official Certifications & Partnerships
          </h3>
          <p className="text-muted-foreground">
            Recognized by government bodies and international organizations
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {certifications?.map((cert, index) => (
            <motion.div
              key={cert?.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex items-center space-x-4 p-4 bg-card rounded-xl border border-border hover:shadow-warm-sm transition-all duration-300"
            >
              <div className="w-16 h-16 bg-muted rounded-lg flex items-center justify-center overflow-hidden">
                <img
                  src={cert?.logo}
                  alt={cert?.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.src = '/assets/images/no_image.png';
                  }}
                />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-medium text-foreground text-sm">
                  {cert?.name}
                </h4>
                <p className="text-xs text-muted-foreground mt-1">
                  {cert?.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      {/* Security Features */}
      <div className="space-y-6">
        <div className="text-center space-y-2">
          <h3 className="text-xl font-heading font-semibold text-foreground">
            Your Security is Our Priority
          </h3>
          <p className="text-muted-foreground">
            Shop with confidence knowing your data and purchases are protected
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {securityFeatures?.map((feature, index) => (
            <motion.div
              key={feature?.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="flex flex-col items-center text-center space-y-3 p-4 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors duration-300"
            >
              <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                <Icon name={feature?.icon} size={20} className="text-primary" />
              </div>
              <div className="space-y-1">
                <h4 className="text-sm font-medium text-foreground">
                  {feature?.title}
                </h4>
                <p className="text-xs text-muted-foreground">
                  {feature?.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      {/* Customer Testimonial */}
      <div className="bg-gradient-to-r from-primary/5 to-secondary/5 rounded-2xl p-8 text-center">
        <div className="max-w-3xl mx-auto space-y-6">
          <div className="flex justify-center">
            <div className="flex space-x-1">
              {[...Array(5)]?.map((_, i) => (
                <Icon key={i} name="Star" size={20} className="text-warning fill-current" />
              ))}
            </div>
          </div>
          
          <blockquote className="text-lg text-foreground italic">
            "Art O Mart has completely changed how I discover authentic handicrafts. The quality verification and artisan stories make every purchase meaningful. I've found unique pieces that I treasure, knowing they support traditional craftspeople."
          </blockquote>
          
          <div className="flex items-center justify-center space-x-4">
            <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center">
              <Icon name="User" size={20} className="text-muted-foreground" />
            </div>
            <div className="text-left">
              <div className="font-medium text-foreground">Anjali Mehta</div>
              <div className="text-sm text-muted-foreground">Verified Customer, Mumbai</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrustIndicators;