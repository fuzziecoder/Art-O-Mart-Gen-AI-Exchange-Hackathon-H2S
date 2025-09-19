import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const CustomerReviews = ({ reviews, averageRating, totalReviews }) => {
  const [selectedRating, setSelectedRating] = useState('all');
  const [showAll, setShowAll] = useState(false);

  const ratingFilters = [
    { value: 'all', label: 'All Reviews' },
    { value: '5', label: '5 Stars' },
    { value: '4', label: '4 Stars' },
    { value: '3', label: '3 Stars' },
    { value: '2', label: '2 Stars' },
    { value: '1', label: '1 Star' }
  ];

  const filteredReviews = reviews?.filter(review => {
    if (selectedRating === 'all') return true;
    return review?.rating === parseInt(selectedRating);
  });

  const displayedReviews = showAll ? filteredReviews : filteredReviews?.slice(0, 6);

  const getRatingDistribution = () => {
    const distribution = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
    reviews?.forEach(review => {
      distribution[review.rating]++;
    });
    return distribution;
  };

  const ratingDistribution = getRatingDistribution();

  const formatDate = (dateString) => {
    return new Date(dateString)?.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Icon
        key={index}
        name="Star"
        size={14}
        className={`${
          index < rating ? 'text-warning fill-current' : 'text-muted-foreground'
        }`}
      />
    ));
  };

  return (
    <div className="bg-card rounded-xl p-6 lg:p-8 shadow-warm-md">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl lg:text-2xl font-heading font-semibold text-foreground">
          Customer Reviews
        </h2>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1">
            {renderStars(Math.round(averageRating))}
          </div>
          <span className="text-sm text-muted-foreground">
            {averageRating?.toFixed(1)} ({totalReviews} reviews)
          </span>
        </div>
      </div>
      {/* Rating Overview */}
      <div className="grid lg:grid-cols-2 gap-6 mb-8">
        {/* Average Rating */}
        <div className="text-center lg:text-left">
          <div className="text-4xl font-bold text-foreground mb-2">
            {averageRating?.toFixed(1)}
          </div>
          <div className="flex items-center justify-center lg:justify-start gap-1 mb-2">
            {renderStars(Math.round(averageRating))}
          </div>
          <p className="text-sm text-muted-foreground">
            Based on {totalReviews} reviews
          </p>
        </div>

        {/* Rating Distribution */}
        <div className="space-y-2">
          {[5, 4, 3, 2, 1]?.map(rating => {
            const count = ratingDistribution?.[rating];
            const percentage = totalReviews > 0 ? (count / totalReviews) * 100 : 0;
            
            return (
              <div key={rating} className="flex items-center gap-3">
                <span className="text-sm text-muted-foreground w-8">
                  {rating}★
                </span>
                <div className="flex-1 bg-muted rounded-full h-2">
                  <div
                    className="bg-warning rounded-full h-2 transition-all duration-300"
                    style={{ width: `${percentage}%` }}
                  />
                </div>
                <span className="text-sm text-muted-foreground w-8">
                  {count}
                </span>
              </div>
            );
          })}
        </div>
      </div>
      {/* Filter */}
      <div className="mb-6">
        <div className="flex flex-wrap gap-2">
          {ratingFilters?.map(filter => (
            <button
              key={filter?.value}
              onClick={() => setSelectedRating(filter?.value)}
              className={`px-3 py-1 rounded-full text-sm font-medium transition-colors duration-200 ${
                selectedRating === filter?.value
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted text-muted-foreground hover:bg-muted/80'
              }`}
            >
              {filter?.label}
            </button>
          ))}
        </div>
      </div>
      {/* Reviews List */}
      <div className="space-y-6">
        {displayedReviews?.map((review) => (
          <div key={review?.id} className="border-b border-border pb-6 last:border-b-0 last:pb-0">
            <div className="flex items-start gap-4">
              <Image
                src={review?.customerAvatar}
                alt={review?.customerName}
                className="w-10 h-10 rounded-full object-cover flex-shrink-0"
              />
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <h4 className="font-medium text-foreground">
                      {review?.customerName}
                    </h4>
                    {review?.isVerifiedPurchase && (
                      <div className="flex items-center gap-1 bg-success/10 text-success px-2 py-1 rounded-full text-xs font-medium">
                        <Icon name="CheckCircle" size={12} />
                        <span>Verified Purchase</span>
                      </div>
                    )}
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {formatDate(review?.date)}
                  </span>
                </div>

                <div className="flex items-center gap-2 mb-3">
                  <div className="flex items-center gap-1">
                    {renderStars(review?.rating)}
                  </div>
                  {review?.productName && (
                    <span className="text-sm text-muted-foreground">
                      • {review?.productName}
                    </span>
                  )}
                </div>

                <p className="text-muted-foreground text-sm leading-relaxed mb-3">
                  {review?.comment}
                </p>

                {review?.images && review?.images?.length > 0 && (
                  <div className="flex gap-2 mb-3">
                    {review?.images?.map((image, index) => (
                      <Image
                        key={index}
                        src={image}
                        alt={`Review image ${index + 1}`}
                        className="w-16 h-16 rounded-lg object-cover"
                      />
                    ))}
                  </div>
                )}

                {review?.artisanReply && (
                  <div className="mt-4 p-3 bg-muted rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Icon name="MessageCircle" size={14} className="text-primary" />
                      <span className="text-sm font-medium text-primary">
                        Artisan Reply
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {review?.artisanReply}
                    </p>
                  </div>
                )}

                <div className="flex items-center gap-4 mt-3">
                  <button className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors duration-200">
                    <Icon name="ThumbsUp" size={14} />
                    <span>Helpful ({review?.helpfulCount})</span>
                  </button>
                  <button className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200">
                    Report
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      {filteredReviews?.length > 6 && !showAll && (
        <div className="text-center mt-6">
          <Button
            variant="outline"
            onClick={() => setShowAll(true)}
            iconName="ChevronDown"
            iconPosition="right"
          >
            Show All Reviews ({filteredReviews?.length})
          </Button>
        </div>
      )}
      {filteredReviews?.length === 0 && (
        <div className="text-center py-8">
          <Icon name="MessageSquare" size={48} className="text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium text-foreground mb-2">
            No reviews found
          </h3>
          <p className="text-muted-foreground">
            {selectedRating === 'all' ?'This artisan hasn\'t received any reviews yet.'
              : `No ${selectedRating}-star reviews found.`
            }
          </p>
        </div>
      )}
    </div>
  );
};

export default CustomerReviews;