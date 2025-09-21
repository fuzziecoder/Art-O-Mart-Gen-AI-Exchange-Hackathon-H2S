import React, { useState, useEffect } from 'react';
import { selectProductImage, getProductImages } from '../lib/productImages';
import { imageFallbackAgent } from '../lib/aiAgents';
import Icon from './AppIcon';

const SmartProductImage = ({ 
  product, 
  className = "", 
  size = "medium",
  showMultiple = false,
  fallbackCount = 3,
  showAiGenerated = true,
  ...props 
}) => {
  const [imageSrc, setImageSrc] = useState(null);
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [aiGeneratedPrompt, setAiGeneratedPrompt] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const sizeClasses = {
    small: "w-16 h-16",
    medium: "w-32 h-32",
    large: "w-64 h-64",
    xl: "w-96 h-96",
    full: "w-full h-64"
  };

  useEffect(() => {
    loadImages();
  }, [product]);

  const loadImages = async () => {
    if (!product) return;

    setIsLoading(true);
    setError(null);

    try {
      // Check if product has existing images
      if (product.images && product.images.length > 0) {
        const validImages = product.images.filter(img => 
          img && img.trim() !== '' && !img.includes('placeholder')
        );
        
        if (validImages.length > 0) {
          setImages(validImages);
          setImageSrc(validImages[0]);
          return;
        }
      }

      // Use smart image selection for fallback
      if (showMultiple) {
        const smartImages = getProductImages(product, fallbackCount);
        setImages(smartImages);
        setImageSrc(smartImages[0]);
      } else {
        const smartImage = selectProductImage(product);
        setImageSrc(smartImage);
        setImages([smartImage]);
      }

      // Generate AI image prompt if enabled
      if (showAiGenerated) {
        try {
          const aiPrompt = await imageFallbackAgent(product, {
            preferredStyle: 'marketplace-professional',
            lighting: 'warm-natural'
          });
          setAiGeneratedPrompt(aiPrompt);
        } catch (aiError) {
          console.warn('AI image generation failed:', aiError);
        }
      }

    } catch (err) {
      console.error('Error loading images:', err);
      setError('Failed to load product images');
      
      // Fallback to a default image
      const fallbackImage = selectProductImage(product);
      setImageSrc(fallbackImage);
      setImages([fallbackImage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleImageError = (e, imageIndex = null) => {
    console.warn('Image failed to load:', e.target.src);
    
    // Try next image in the array
    if (images.length > 1) {
      const nextIndex = imageIndex !== null ? imageIndex + 1 : currentImageIndex + 1;
      if (nextIndex < images.length) {
        const nextImage = images[nextIndex];
        if (imageIndex === null) {
          setImageSrc(nextImage);
          setCurrentImageIndex(nextIndex);
        }
        return;
      }
    }

    // Use smart fallback image
    const fallbackImage = selectProductImage(product);
    if (imageIndex === null) {
      setImageSrc(fallbackImage);
    }
  };

  const handleImageClick = (index) => {
    if (images.length > index) {
      setImageSrc(images[index]);
      setCurrentImageIndex(index);
    }
  };

  if (isLoading) {
    return (
      <div className={`${sizeClasses[size]} ${className} bg-gray-100 rounded-lg flex items-center justify-center`}>
        <div className="flex flex-col items-center space-y-2">
          <div className="animate-spin w-6 h-6 border-2 border-gray-300 border-t-blue-600 rounded-full"></div>
          <span className="text-xs text-gray-500">Loading image...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`${sizeClasses[size]} ${className} bg-red-50 border border-red-200 rounded-lg flex items-center justify-center`}>
        <div className="text-center">
          <Icon name="ImageOff" size={24} className="text-red-400 mx-auto mb-1" />
          <span className="text-xs text-red-600">Image unavailable</span>
        </div>
      </div>
    );
  }

  return (
    <div className={`smart-product-image ${className}`}>
      {/* Main Image */}
      <div className="relative">
        <img
          src={imageSrc}
          alt={product?.title || 'Product image'}
          className={`${sizeClasses[size]} object-cover rounded-lg shadow-sm transition-opacity duration-300 hover:opacity-95`}
          onError={handleImageError}
          {...props}
        />
        
        {/* AI Generated Badge */}
        {aiGeneratedPrompt && showAiGenerated && (
          <div className="absolute top-2 right-2">
            <div className="bg-purple-100 text-purple-700 text-xs px-2 py-1 rounded-full flex items-center space-x-1">
              <Icon name="Sparkles" size={10} />
              <span>AI Enhanced</span>
            </div>
          </div>
        )}

        {/* Image Counter */}
        {images.length > 1 && (
          <div className="absolute bottom-2 right-2 bg-black bg-opacity-60 text-white text-xs px-2 py-1 rounded-full">
            {currentImageIndex + 1}/{images.length}
          </div>
        )}
      </div>

      {/* Multiple Images Navigation */}
      {showMultiple && images.length > 1 && (
        <div className="flex space-x-2 mt-3 overflow-x-auto pb-2">
          {images.map((img, index) => (
            <button
              key={index}
              onClick={() => handleImageClick(index)}
              className={`flex-shrink-0 w-12 h-12 rounded-md overflow-hidden border-2 transition-all ${
                index === currentImageIndex 
                  ? 'border-blue-500 shadow-md' 
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <img
                src={img}
                alt={`${product?.title || 'Product'} view ${index + 1}`}
                className="w-full h-full object-cover"
                onError={(e) => handleImageError(e, index)}
              />
            </button>
          ))}
        </div>
      )}

      {/* AI Image Prompt Display */}
      {aiGeneratedPrompt && showAiGenerated && (
        <div className="mt-3 p-3 bg-purple-50 border border-purple-200 rounded-lg">
          <div className="flex items-start space-x-2">
            <Icon name="Sparkles" size={14} className="text-purple-600 mt-0.5 flex-shrink-0" />
            <div className="flex-1">
              <h4 className="text-xs font-medium text-purple-800 mb-1">AI Image Suggestion</h4>
              <p className="text-xs text-purple-700 leading-relaxed">
                {aiGeneratedPrompt.imagePrompt}
              </p>
              {aiGeneratedPrompt.styleNotes && (
                <p className="text-xs text-purple-600 mt-1 italic">
                  Style: {aiGeneratedPrompt.styleNotes}
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Preset configurations for common use cases
export const ProductThumbnail = (props) => (
  <SmartProductImage size="small" showAiGenerated={false} {...props} />
);

export const ProductCard = (props) => (
  <SmartProductImage size="medium" {...props} />
);

export const ProductGallery = (props) => (
  <SmartProductImage 
    size="large" 
    showMultiple={true} 
    fallbackCount={5} 
    showAiGenerated={true} 
    {...props} 
  />
);

export const ProductHero = (props) => (
  <SmartProductImage 
    size="xl" 
    showMultiple={true} 
    fallbackCount={3} 
    showAiGenerated={true} 
    {...props} 
  />
);

export default SmartProductImage;
