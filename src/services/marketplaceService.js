import { supabase } from '../lib/supabase';

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

  // Products
  async getProducts(filters = {}) {
    try {
      let query = supabase
        ?.from('products')
        ?.select(`
          *,
          artisan_profiles!inner (
            id,
            business_name,
            trust_score,
            is_verified,
            user_profiles!inner (
              full_name,
              avatar_url
            )
          ),
          categories!inner (
            name,
            slug
          ),
          product_reviews (
            rating
          )
        `)
        ?.eq('status', 'active');

      // Apply filters
      if (filters?.category && filters?.category !== 'all') {
        query = query?.eq('categories.slug', filters?.category);
      }

      if (filters?.region && filters?.region !== 'all') {
        query = query?.eq('artisan_profiles.region', filters?.region);
      }

      if (filters?.priceRange && filters?.priceRange !== 'all') {
        const ranges = {
          'under-1000': [0, 999],
          '1000-3000': [1000, 3000],
          '3000-5000': [3000, 5000],
          '5000-10000': [5000, 10000],
          'above-10000': [10000, 999999]
        };
        const [min, max] = ranges?.[filters?.priceRange] || [0, 999999];
        query = query?.gte('price', min)?.lte('price', max);
      }

      if (filters?.searchQuery) {
        const searchTerm = `%${filters?.searchQuery?.toLowerCase()}%`;
        query = query?.or(`title.ilike.${searchTerm},description.ilike.${searchTerm},tags.cs.{${filters?.searchQuery?.toLowerCase()}}`);
      }

      // Apply sorting
      const sortOptions = {
        'price-low': [{ column: 'price', ascending: true }],
        'price-high': [{ column: 'price', ascending: false }],
        'rating': [{ column: 'created_at', ascending: false }], // Placeholder for rating
        'newest': [{ column: 'created_at', ascending: false }],
        'recommended': [{ column: 'is_featured', ascending: false }, { column: 'created_at', ascending: false }]
      };
      
      const sortBy = sortOptions?.[filters?.sortBy || 'recommended'] || sortOptions?.recommended;
      sortBy?.forEach(sort => {
        query = query?.order(sort?.column, { ascending: sort?.ascending });
      });

      // Apply pagination
      const limit = filters?.limit || 12;
      const offset = (filters?.page || 1 - 1) * limit;
      query = query?.range(offset, offset + limit - 1);

      const { data, error } = await query;
      
      if (error) {
        return { data: [], error: error?.message };
      }

      // Calculate average ratings
      const productsWithRatings = data?.map(product => {
        const reviews = product?.product_reviews || [];
        const avgRating = reviews?.length > 0 
          ? reviews?.reduce((sum, review) => sum + review?.rating, 0) / reviews?.length 
          : 0;
        
        return {
          ...product,
          rating: Math.round(avgRating * 10) / 10,
          reviewCount: reviews?.length,
          artisan: {
            name: product?.artisan_profiles?.user_profiles?.full_name,
            businessName: product?.artisan_profiles?.business_name,
            image: product?.artisan_profiles?.user_profiles?.avatar_url,
            trustScore: product?.artisan_profiles?.trust_score,
            verified: product?.artisan_profiles?.is_verified
          },
          category: product?.categories?.name
        };
      });
      
      return { data: productsWithRatings || [], error: null };
    } catch (error) {
      return { data: [], error: 'Failed to fetch products' };
    }
  },

  async getFeaturedProducts(limit = 8) {
    try {
      const { data, error } = await supabase
        ?.from('products')
        ?.select(`
          *,
          artisan_profiles!inner (
            business_name,
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
            rating
          )
        `)
        ?.eq('status', 'active')
        ?.eq('is_featured', true)
        ?.limit(limit);
      
      if (error) {
        return { data: [], error: error?.message };
      }
      
      // Transform data similar to getProducts
      const featuredProducts = data?.map(product => {
        const reviews = product?.product_reviews || [];
        const avgRating = reviews?.length > 0 
          ? reviews?.reduce((sum, review) => sum + review?.rating, 0) / reviews?.length 
          : 0;
        
        return {
          ...product,
          rating: Math.round(avgRating * 10) / 10,
          reviewCount: reviews?.length,
          artisan: {
            name: product?.artisan_profiles?.user_profiles?.full_name,
            businessName: product?.artisan_profiles?.business_name,
            image: product?.artisan_profiles?.user_profiles?.avatar_url,
            trustScore: product?.artisan_profiles?.trust_score,
            verified: product?.artisan_profiles?.is_verified
          },
          category: product?.categories?.name
        };
      });
      
      return { data: featuredProducts || [], error: null };
    } catch (error) {
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