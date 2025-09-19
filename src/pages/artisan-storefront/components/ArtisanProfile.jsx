import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const ArtisanProfile = ({ artisan }) => {
  return (
    <div className="bg-card rounded-xl p-6 lg:p-8 shadow-warm-md">
      <div className="flex flex-col lg:flex-row lg:items-start gap-6">
        {/* Profile Image */}
        <div className="flex-shrink-0">
          <div className="relative">
            <Image
              src={artisan?.profileImage}
              alt={artisan?.name}
              className="w-32 h-32 lg:w-40 lg:h-40 rounded-full object-cover border-4 border-primary/20"
            />
            {artisan?.isVerified && (
              <div className="absolute -bottom-2 -right-2 bg-success text-success-foreground rounded-full p-2">
                <Icon name="CheckCircle" size={20} />
              </div>
            )}
          </div>
        </div>

        {/* Profile Info */}
        <div className="flex-1 min-w-0">
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
            <div className="flex-1">
              <h1 className="text-2xl lg:text-3xl font-heading font-bold text-foreground mb-2">
                {artisan?.name}
              </h1>
              
              <div className="flex items-center gap-2 text-muted-foreground mb-3">
                <Icon name="MapPin" size={16} />
                <span className="text-sm">{artisan?.location}</span>
              </div>

              <div className="flex items-center gap-2 mb-4">
                <Icon name="Palette" size={16} className="text-primary" />
                <span className="text-sm font-medium text-primary">{artisan?.craftSpecialization}</span>
              </div>

              <p className="text-muted-foreground text-sm lg:text-base leading-relaxed">
                {artisan?.bio}
              </p>
            </div>

            {/* Trust Score & Stats */}
            <div className="flex-shrink-0">
              <div className="bg-background rounded-lg p-4 border border-border">
                <div className="text-center mb-4">
                  <div className="text-2xl font-bold text-primary mb-1">
                    {artisan?.trustScore}%
                  </div>
                  <div className="text-xs text-muted-foreground">Trust Score</div>
                </div>

                <div className="space-y-2 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Experience</span>
                    <span className="font-medium">{artisan?.yearsExperience} years</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Products</span>
                    <span className="font-medium">{artisan?.totalProducts}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Reviews</span>
                    <span className="font-medium">{artisan?.totalReviews}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Verification Badges */}
          <div className="flex flex-wrap gap-2 mt-4">
            {artisan?.verificationBadges?.map((badge, index) => (
              <div
                key={index}
                className="flex items-center gap-1 bg-success/10 text-success px-2 py-1 rounded-full text-xs font-medium"
              >
                <Icon name="Shield" size={12} />
                <span>{badge}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArtisanProfile;