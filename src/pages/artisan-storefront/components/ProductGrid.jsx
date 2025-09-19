import React, { useState } from 'react';

import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const ProductGrid = ({ products }) => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('newest');
  const [priceRange, setPriceRange] = useState('all');

  const categories = [
    { value: 'all', label: 'All Products' },
    { value: 'pottery', label: 'Pottery' },
    { value: 'textiles', label: 'Textiles' },
    { value: 'jewelry', label: 'Jewelry' },
    { value: 'woodwork', label: 'Woodwork' }
  ];

  const sortOptions = [
    { value: 'newest', label: 'Newest First' },
    { value: 'price-low', label: 'Price: Low to High' },
    { value: 'price-high', label: 'Price: High to Low' },
    { value: 'popular', label: 'Most Popular' }
  ];

  const priceRanges = [
    { value: 'all', label: 'All Prices' },
    { value: '0-500', label: 'Under ₹500' },
    { value: '500-1000', label: '₹500 - ₹1000' },
    { value: '1000-2500', label: '₹1000 - ₹2500' },
    { value: '2500+', label: 'Above ₹2500' }
  ];

  const filteredProducts = products?.filter(product => {
    if (selectedCategory !== 'all' && product?.category !== selectedCategory) {
      return false;
    }
    
    if (priceRange !== 'all') {
      const price = product?.price;
      switch (priceRange) {
        case '0-500':
          return price < 500;
        case '500-1000':
          return price >= 500 && price <= 1000;
        case '1000-2500':
          return price >= 1000 && price <= 2500;
        case '2500+':
          return price > 2500;
        default:
          return true;
      }
    }
    
    return true;
  });

  const sortedProducts = [...filteredProducts]?.sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a?.price - b?.price;
      case 'price-high':
        return b?.price - a?.price;
      case 'popular':
        return b?.rating - a?.rating;
      case 'newest':
      default:
        return new Date(b.createdAt) - new Date(a.createdAt);
    }
  });

  return (
    <div className="bg-card rounded-xl p-6 lg:p-8 shadow-warm-md">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl lg:text-2xl font-heading font-semibold text-foreground">
          Products ({sortedProducts?.length})
        </h2>
        
        <div className="hidden lg:flex items-center gap-4">
          <Button
            variant="outline"
            size="sm"
            iconName="Filter"
            iconPosition="left"
          >
            Filters
          </Button>
        </div>
      </div>
      {/* Filters */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6 p-4 bg-background rounded-lg border border-border">
        {/* Category Filter */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Category
          </label>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e?.target?.value)}
            className="w-full px-3 py-2 bg-input border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring"
          >
            {categories?.map(category => (
              <option key={category?.value} value={category?.value}>
                {category?.label}
              </option>
            ))}
          </select>
        </div>

        {/* Sort Filter */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Sort By
          </label>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e?.target?.value)}
            className="w-full px-3 py-2 bg-input border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring"
          >
            {sortOptions?.map(option => (
              <option key={option?.value} value={option?.value}>
                {option?.label}
              </option>
            ))}
          </select>
        </div>

        {/* Price Filter */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Price Range
          </label>
          <select
            value={priceRange}
            onChange={(e) => setPriceRange(e?.target?.value)}
            className="w-full px-3 py-2 bg-input border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring"
          >
            {priceRanges?.map(range => (
              <option key={range?.value} value={range?.value}>
                {range?.label}
              </option>
            ))}
          </select>
        </div>
      </div>
      {/* Product Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sortedProducts?.map((product) => (
          <div
            key={product?.id}
            className="group bg-background rounded-lg border border-border overflow-hidden hover:shadow-warm-md transition-all duration-300"
          >
            <div className="relative overflow-hidden">
              <Image
                src={product?.images?.[0]}
                alt={product?.title}
                className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              
              {product?.isNew && (
                <div className="absolute top-3 left-3 bg-accent text-accent-foreground px-2 py-1 rounded-full text-xs font-medium">
                  New
                </div>
              )}
              
              {product?.stock === 0 && (
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                  <span className="text-white font-medium">Out of Stock</span>
                </div>
              )}

              <button className="absolute top-3 right-3 p-2 bg-white/90 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                <Icon name="Heart" size={16} />
              </button>
            </div>

            <div className="p-4">
              <h3 className="font-medium text-foreground mb-2 line-clamp-2">
                {product?.title}
              </h3>
              
              <div className="flex items-center gap-2 mb-2">
                <div className="flex items-center gap-1">
                  <Icon name="Star" size={14} className="text-warning fill-current" />
                  <span className="text-sm text-muted-foreground">
                    {product?.rating} ({product?.reviewCount})
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-lg font-semibold text-foreground">
                    ₹{product?.price?.toLocaleString()}
                  </span>
                  {product?.originalPrice && (
                    <span className="text-sm text-muted-foreground line-through">
                      ₹{product?.originalPrice?.toLocaleString()}
                    </span>
                  )}
                </div>
                
                <Button
                  variant="outline"
                  size="sm"
                  iconName="ShoppingCart"
                  disabled={product?.stock === 0}
                >
                  Add
                </Button>
              </div>

              <div className="mt-3 pt-3 border-t border-border">
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>Stock: {product?.stock}</span>
                  <span className="capitalize">{product?.category}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      {sortedProducts?.length === 0 && (
        <div className="text-center py-12">
          <Icon name="Package" size={48} className="text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium text-foreground mb-2">
            No products found
          </h3>
          <p className="text-muted-foreground">
            Try adjusting your filters to see more products.
          </p>
        </div>
      )}
    </div>
  );
};

export default ProductGrid;