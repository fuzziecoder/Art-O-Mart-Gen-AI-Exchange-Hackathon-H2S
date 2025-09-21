import { supabase } from '../lib/supabase';
import { ALL_PRODUCTS, FEATURED_ARTISANS } from '../data/mockProducts';

export const marketplaceService = {
  // Categories
  async getCategories() {
    try {
      const { data, error } = await supabase
        ?.from('categories')
        ?.select('*')
        ?.eq('is_active', true)
        ?.order('name');
      
      if (error) {
        return { data: [], error: error?.message };
      }
      
      return { data: data || [], error: null };
    } catch (error) {
      return { data: [], error: 'Failed to fetch categories' };
    }
  },

  // Products - Using mock data for demo
  async getProducts(filters = {}) {
    try {
      let filteredProducts = [...ALL_PRODUCTS];

      // Apply category filter
      if (filters?.category && filters?.category !== 'all') {
        filteredProducts = filteredProducts.filter(product => 
          product.category.toLowerCase() === filters.category.toLowerCase()
        );
      }

      // Apply region filter
      if (filters?.region && filters?.region !== 'all') {
        filteredProducts = filteredProducts.filter(product => 
          product.region.toLowerCase() === filters.region.toLowerCase()
        );
      }

      // Apply price range filter
      if (filters?.priceRange && filters?.priceRange !== 'all') {
        const ranges = {
          'under-1000': [0, 999],
          '1000-3000': [1000, 3000],
          '3000-5000': [3000, 5000],
          '5000-10000': [5000, 10000],
          'above-10000': [10000, 999999]
        };
        const [min, max] = ranges?.[filters?.priceRange] || [0, 999999];
        filteredProducts = filteredProducts.filter(product => 
          product.price >= min && product.price <= max
        );
      }

      // Apply search query
      if (filters?.searchQuery) {
        const searchTerm = filters.searchQuery.toLowerCase();
        filteredProducts = filteredProducts.filter(product =>
          product.title.toLowerCase().includes(searchTerm) ||
          product.description.toLowerCase().includes(searchTerm) ||
          product.tags.some(tag => tag.toLowerCase().includes(searchTerm)) ||
          product.region.toLowerCase().includes(searchTerm) ||
          product.category.toLowerCase().includes(searchTerm)
        );
      }

      // Apply sorting
      const sortBy = filters?.sortBy || 'recommended';
      switch (sortBy) {
        case 'price-low':
          filteredProducts.sort((a, b) => a.price - b.price);
          break;
        case 'price-high':
          filteredProducts.sort((a, b) => b.price - a.price);
          break;
        case 'rating':
          filteredProducts.sort((a, b) => b.rating - a.rating);
          break;
        case 'newest':
          // Assume products are already in newest order
          break;
        case 'recommended':
        default:
          filteredProducts.sort((a, b) => {
            if (a.isFeatured && !b.isFeatured) return -1;
            if (!a.isFeatured && b.isFeatured) return 1;
            return b.rating - a.rating;
          });
          break;
      }

      // Apply pagination
      const limit = filters?.limit || 12;
      const page = filters?.page || 1;
      const offset = (page - 1) * limit;
      const paginatedProducts = filteredProducts.slice(offset, offset + limit);
      
      return { 
        data: paginatedProducts, 
        error: null,
        totalCount: filteredProducts.length,
        hasMore: offset + limit < filteredProducts.length
      };
    } catch (error) {
      console.error('Error fetching products:', error);
      return { data: [], error: 'Failed to fetch products' };
    }
  },

  async getFeaturedProducts(limit = 8) {
    try {
      const featuredProducts = ALL_PRODUCTS
        .filter(product => product.isFeatured)
        .slice(0, limit);
      
      return { data: featuredProducts, error: null };
    } catch (error) {
      console.error('Error fetching featured products:', error);
      return { data: [], error: 'Failed to fetch featured products' };
    }
  },

  async getProduct(productId) {
    try {
      const { data, error } = await supabase
        ?.from('products')
        ?.select(`
          *,
          artisan_profiles!inner (
            id,
            business_name,
            craft_specialty,
            bio,
            trust_score,
            is_verified,
            user_profiles!inner (
              full_name,
              avatar_url
            )
          ),
          categories (
            name,
            slug
          ),
          product_reviews (
            *,
            user_profiles (
              full_name,
              avatar_url
            )
          )
        `)
        ?.eq('id', productId)
        ?.eq('status', 'active')
        ?.single();
      
      if (error) {
        return { data: null, error: error?.message };
      }
      
      const reviews = data?.product_reviews || [];
      const avgRating = reviews?.length > 0 
        ? reviews?.reduce((sum, review) => sum + review?.rating, 0) / reviews?.length 
        : 0;
      
      const transformedProduct = {
        ...data,
        rating: Math.round(avgRating * 10) / 10,
        reviewCount: reviews?.length,
        artisan: {
          id: data?.artisan_profiles?.id,
          name: data?.artisan_profiles?.user_profiles?.full_name,
          businessName: data?.artisan_profiles?.business_name,
          specialty: data?.artisan_profiles?.craft_specialty,
          bio: data?.artisan_profiles?.bio,
          image: data?.artisan_profiles?.user_profiles?.avatar_url,
          trustScore: data?.artisan_profiles?.trust_score,
          verified: data?.artisan_profiles?.is_verified
        },
        category: data?.categories?.name,
        reviews: reviews?.map(review => ({
          ...review,
          reviewerName: review?.user_profiles?.full_name,
          reviewerAvatar: review?.user_profiles?.avatar_url
        }))
      };
      
      return { data: transformedProduct, error: null };
    } catch (error) {
      return { data: null, error: 'Failed to fetch product details' };
    }
  },

  // Cart operations
  async addToCart(userId, productId, quantity = 1) {
    try {
      const { data, error } = await supabase
        ?.from('carts')
        ?.upsert({
          user_id: userId,
          product_id: productId,
          quantity
        }, { 
          onConflict: 'user_id,product_id' 
        })
        ?.select()
        ?.single();
      
      if (error) {
        return { data: null, error: error?.message };
      }
      
      return { data, error: null };
    } catch (error) {
      return { data: null, error: 'Failed to add item to cart' };
    }
  },

  async getCartItems(userId) {
    try {
      const { data, error } = await supabase
        ?.from('carts')
        ?.select(`
          *,
          products!inner (
            id,
            title,
            price,
            images,
            stock_quantity,
            artisan_profiles (
              business_name,
              user_profiles (
                full_name
              )
            )
          )
        `)
        ?.eq('user_id', userId);
      
      if (error) {
        return { data: [], error: error?.message };
      }
      
      const cartItems = data?.map(item => ({
        ...item,
        product: {
          ...item?.products,
          artisanName: item?.products?.artisan_profiles?.user_profiles?.full_name,
          businessName: item?.products?.artisan_profiles?.business_name
        }
      }));
      
      return { data: cartItems || [], error: null };
    } catch (error) {
      return { data: [], error: 'Failed to fetch cart items' };
    }
  },

  async updateCartQuantity(userId, productId, quantity) {
    try {
      if (quantity <= 0) {
        return this.removeFromCart(userId, productId);
      }
      
      const { data, error } = await supabase
        ?.from('carts')
        ?.update({ quantity })
        ?.eq('user_id', userId)
        ?.eq('product_id', productId)
        ?.select()
        ?.single();
      
      if (error) {
        return { data: null, error: error?.message };
      }
      
      return { data, error: null };
    } catch (error) {
      return { data: null, error: 'Failed to update cart quantity' };
    }
  },

  async removeFromCart(userId, productId) {
    try {
      const { error } = await supabase
        ?.from('carts')
        ?.delete()
        ?.eq('user_id', userId)
        ?.eq('product_id', productId);
      
      if (error) {
        return { data: null, error: error?.message };
      }
      
      return { data: true, error: null };
    } catch (error) {
      return { data: null, error: 'Failed to remove item from cart' };
    }
  },

  // Wishlist operations
  async addToWishlist(userId, productId) {
    try {
      const { data, error } = await supabase
        ?.from('wishlists')
        ?.insert({
          user_id: userId,
          product_id: productId
        })
        ?.select()
        ?.single();
      
      if (error) {
        return { data: null, error: error?.message };
      }
      
      return { data, error: null };
    } catch (error) {
      return { data: null, error: 'Failed to add to wishlist' };
    }
  },

  async removeFromWishlist(userId, productId) {
    try {
      const { error } = await supabase
        ?.from('wishlists')
        ?.delete()
        ?.eq('user_id', userId)
        ?.eq('product_id', productId);
      
      if (error) {
        return { data: null, error: error?.message };
      }
      
      return { data: true, error: null };
    } catch (error) {
      return { data: null, error: 'Failed to remove from wishlist' };
    }
  }
};