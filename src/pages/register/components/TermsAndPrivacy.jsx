import React from 'react';
import { Checkbox } from '../../../components/ui/Checkbox';
import Icon from '../../../components/AppIcon';

const TermsAndPrivacy = ({ formData, onFormChange, errors }) => {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-heading font-semibold text-foreground mb-2">
          Terms & Privacy
        </h2>
        <p className="text-muted-foreground">
          Please review and accept our terms to continue
        </p>
      </div>
      <div className="space-y-6">
        {/* Terms of Service */}
        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-start space-x-3 mb-4">
            <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
              <Icon name="FileText" size={18} className="text-primary" />
            </div>
            <div>
              <h3 className="text-lg font-heading font-semibold text-foreground mb-2">
                Terms of Service
              </h3>
              <div className="text-sm text-muted-foreground space-y-2">
                <p>
                  By creating an account, you agree to our terms of service which include:
                </p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>Respectful interaction with all community members</li>
                  <li>Accurate representation of products and services</li>
                  <li>Compliance with local laws and regulations</li>
                  <li>Protection of intellectual property rights</li>
                  <li>Responsible use of the platform features</li>
                </ul>
              </div>
            </div>
          </div>
          
          <Checkbox
            label="I agree to the Terms of Service"
            checked={formData?.acceptTerms}
            onChange={(e) => onFormChange('acceptTerms', e?.target?.checked)}
            error={errors?.acceptTerms}
            required
          />
        </div>

        {/* Privacy Policy */}
        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-start space-x-3 mb-4">
            <div className="w-8 h-8 bg-secondary/10 rounded-lg flex items-center justify-center flex-shrink-0">
              <Icon name="Shield" size={18} className="text-secondary" />
            </div>
            <div>
              <h3 className="text-lg font-heading font-semibold text-foreground mb-2">
                Privacy Policy
              </h3>
              <div className="text-sm text-muted-foreground space-y-2">
                <p>
                  We respect your privacy and are committed to protecting your personal data:
                </p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>Your personal information is encrypted and secure</li>
                  <li>We never share your data without explicit consent</li>
                  <li>You can request data deletion at any time</li>
                  <li>Cookies are used only for essential functionality</li>
                  <li>Third-party integrations follow strict privacy standards</li>
                </ul>
              </div>
            </div>
          </div>
          
          <Checkbox
            label="I have read and accept the Privacy Policy"
            checked={formData?.acceptPrivacy}
            onChange={(e) => onFormChange('acceptPrivacy', e?.target?.checked)}
            error={errors?.acceptPrivacy}
            required
          />
        </div>

        {/* Marketing Communications */}
        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-start space-x-3 mb-4">
            <div className="w-8 h-8 bg-accent/10 rounded-lg flex items-center justify-center flex-shrink-0">
              <Icon name="Mail" size={18} className="text-accent" />
            </div>
            <div>
              <h3 className="text-lg font-heading font-semibold text-foreground mb-2">
                Marketing Communications
              </h3>
              <p className="text-sm text-muted-foreground">
                Stay updated with new features, marketplace trends, and artisan spotlights. 
                You can unsubscribe at any time from your account settings.
              </p>
            </div>
          </div>
          
          <Checkbox
            label="I would like to receive marketing emails and updates"
            description="Optional - helps you stay informed about platform updates and opportunities"
            checked={formData?.acceptMarketing}
            onChange={(e) => onFormChange('acceptMarketing', e?.target?.checked)}
          />
        </div>

        {/* Data Processing Notice */}
        <div className="bg-muted/30 border border-border rounded-lg p-4">
          <div className="flex items-start space-x-3">
            <Icon name="Info" size={18} className="text-primary flex-shrink-0 mt-0.5" />
            <div className="text-sm text-muted-foreground">
              <p className="font-medium text-foreground mb-1">Data Processing Notice</p>
              <p>
                Your registration data will be processed to create your account, verify your identity 
                (for artisans), and provide personalized marketplace experiences. All processing 
                complies with applicable data protection regulations.
              </p>
            </div>
          </div>
        </div>

        {/* Quick Links */}
        <div className="flex flex-wrap gap-4 justify-center text-sm">
          <button
            type="button"
            className="text-primary hover:text-primary/80 transition-colors duration-200 underline"
          >
            View Full Terms of Service
          </button>
          <button
            type="button"
            className="text-primary hover:text-primary/80 transition-colors duration-200 underline"
          >
            Read Complete Privacy Policy
          </button>
          <button
            type="button"
            className="text-primary hover:text-primary/80 transition-colors duration-200 underline"
          >
            Contact Support
          </button>
        </div>
      </div>
    </div>
  );
};

export default TermsAndPrivacy;