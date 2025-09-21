import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Icon from './AppIcon';
import { FEATURED_ARTISANS } from '../data/mockProducts';

const FeaturedArtisans = ({ className = "" }) => {
  const [artisans, setArtisans] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading
    setTimeout(() => {
      setArtisans(FEATURED_ARTISANS);
      setIsLoading(false);
    }, 500);
  }, []);

  if (isLoading) {
    return (
      <div className={`featured-artisans ${className}`}>
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Featured Artisans</h2>
          <p className="text-gray-600">Discover the stories behind authentic handcrafted products</p>
        </div>
        
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6">
            <div className="animate-pulse">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gray-300 rounded-full mx-auto mb-4"></div>
              <div className="h-4 bg-gray-300 rounded mb-2"></div>
              <div className="h-3 bg-gray-300 rounded w-3/4 mx-auto mb-4"></div>
              <div className="space-y-2">
                <div className="h-2 bg-gray-300 rounded"></div>
                <div className="h-2 bg-gray-300 rounded w-5/6"></div>
              </div>
            </div>
          </div>
        ))}
        </div>
      </div>
    );
  }

  return (
    <div className={`featured-artisans ${className}`}>
      <div className="mb-6 sm:mb-8 text-center sm:text-left">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">Featured Artisans</h2>
        <p className="text-sm sm:text-base text-gray-600">Discover the stories behind authentic handcrafted products</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {artisans.map((artisan, index) => (
          <motion.div
            key={artisan.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-300 overflow-hidden"
          >
            {/* Header */}
            <div className="relative p-4 sm:p-6 pb-0">
              <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-3 sm:space-y-0 sm:space-x-4">
                <div className="relative flex-shrink-0">
                  <img
                    src={artisan.image}
                    alt={artisan.name}
                    className="w-16 h-16 sm:w-20 sm:h-20 rounded-full object-cover border-4 border-white shadow-lg"
                  />
                  {artisan.verified && (
                    <div className="absolute -top-1 -right-1 w-5 h-5 sm:w-6 sm:h-6 bg-blue-600 rounded-full flex items-center justify-center">
                      <Icon name="CheckCircle" size={12} className="text-white" />
                    </div>
                  )}
                </div>
                
                <div className="flex-1 min-w-0 text-center sm:text-left">
                  <h3 className="font-semibold text-gray-900 truncate text-lg sm:text-base">{artisan.name}</h3>
                  <p className="text-sm text-gray-600 mb-2">{artisan.businessName}</p>
                  <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-1 sm:space-y-0 sm:space-x-3 text-sm text-gray-500">
                    <span className="flex items-center">
                      <Icon name="MapPin" size={12} className="mr-1" />
                      {artisan.location}
                    </span>
                    <span className="flex items-center">
                      <Icon name="Award" size={12} className="mr-1" />
                      {artisan.experience}
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="mt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0">
                <div className="flex items-center justify-center sm:justify-start space-x-4">
                  <div className="text-center">
                    <div className="text-lg font-bold text-blue-600">{artisan.trustScore}</div>
                    <div className="text-xs text-gray-500">Trust Score</div>
                  </div>
                  
                  <div className="text-center">
                    <div className="text-lg font-bold text-green-600">{artisan.totalProducts}</div>
                    <div className="text-xs text-gray-500">Products</div>
                  </div>
                  
                  <div className="text-center">
                    <div className="text-lg font-bold text-orange-600">{artisan.totalSales}</div>
                    <div className="text-xs text-gray-500">Sales</div>
                  </div>
                </div>
                
                <div className="flex items-center justify-center sm:justify-start space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Icon
                      key={i}
                      name="Star"
                      size={12}
                      className={i < Math.floor(artisan.rating) 
                        ? "text-yellow-400 fill-current" 
                        : "text-gray-300"
                      }
                    />
                  ))}
                  <span className="text-sm text-gray-600 ml-1">{artisan.rating}</span>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="p-4 sm:p-6">
              <div className="mb-4 text-center sm:text-left">
                <h4 className="text-sm font-medium text-gray-900 mb-1">Specialty</h4>
                <p className="text-sm text-blue-600 bg-blue-50 px-3 py-1 rounded-full inline-block">
                  {artisan.specialty}
                </p>
              </div>
              
              <div className="mb-4">
                <h4 className="text-sm font-medium text-gray-900 mb-2">About</h4>
                <p className="text-sm text-gray-600 leading-relaxed line-clamp-4 sm:line-clamp-3">
                  {artisan.bio}
                </p>
              </div>

              {/* Achievements */}
              {artisan.achievements && artisan.achievements.length > 0 && (
                <div className="mb-4">
                  <h4 className="text-sm font-medium text-gray-900 mb-2 flex items-center">
                    <Icon name="Trophy" size={14} className="text-yellow-600 mr-1" />
                    Achievements
                  </h4>
                  <div className="space-y-1">
                    {artisan.achievements.slice(0, 2).map((achievement, idx) => (
                      <div key={idx} className="text-xs text-gray-600 flex items-center">
                        <Icon name="Medal" size={10} className="text-yellow-500 mr-2" />
                        {achievement}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Social Cause */}
              {artisan.socialCause && (
                <div className="mb-4">
                  <h4 className="text-sm font-medium text-gray-900 mb-1 flex items-center">
                    <Icon name="Heart" size={14} className="text-red-500 mr-1" />
                    Social Impact
                  </h4>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    {artisan.socialCause}
                  </p>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="px-4 sm:px-6 py-4 bg-gray-50 border-t border-gray-100">
              <div className="flex flex-col sm:flex-row items-center justify-between space-y-2 sm:space-y-0">
                <button className="text-sm text-blue-600 hover:text-blue-800 font-medium flex items-center w-full sm:w-auto justify-center sm:justify-start">
                  <Icon name="User" size={14} className="mr-1" />
                  View Profile
                </button>
                
                <button className="text-sm bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center w-full sm:w-auto justify-center">
                  <Icon name="ShoppingBag" size={14} className="mr-1" />
                  View Products
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* View All Button */}
      <div className="text-center mt-8">
        <button className="inline-flex items-center px-6 py-3 border border-gray-300 rounded-lg text-gray-700 bg-white hover:bg-gray-50 transition-colors">
          <span>Discover More Artisans</span>
          <Icon name="ArrowRight" size={16} className="ml-2" />
        </button>
      </div>
    </div>
  );
};

export default FeaturedArtisans;
