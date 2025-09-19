import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import RoleSelection from './components/RoleSelection';
import BasicInfoForm from './components/BasicInfoForm';
import ArtisanDetailsForm from './components/ArtisanDetailsForm';
import TermsAndPrivacy from './components/TermsAndPrivacy';
import ProgressIndicator from './components/ProgressIndicator';
import RegistrationSuccess from './components/RegistrationSuccess';

const Register = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedRole, setSelectedRole] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errors, setErrors] = useState({});

  const [formData, setFormData] = useState({
    // Basic Info
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    country: '',
    state: '',
    city: '',
    
    // Artisan Details
    craftCategory: '',
    craftSpecialization: '',
    experienceLevel: '',
    craftBio: '',
    workshopLocation: '',
    verificationDocuments: [],
    
    // Terms & Privacy
    acceptTerms: false,
    acceptPrivacy: false,
    acceptMarketing: false
  });

  const totalSteps = 4;

  useEffect(() => {
    // Scroll to top when step changes
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentStep]);

  const handleFormChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear error when user starts typing
    if (errors?.[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const validateStep = (step) => {
    const newErrors = {};

    switch (step) {
      case 1:
        if (!selectedRole) {
          newErrors.role = 'Please select an account type';
        }
        break;

      case 2:
        if (!formData?.firstName?.trim()) {
          newErrors.firstName = 'First name is required';
        }
        if (!formData?.lastName?.trim()) {
          newErrors.lastName = 'Last name is required';
        }
        if (!formData?.email?.trim()) {
          newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/?.test(formData?.email)) {
          newErrors.email = 'Please enter a valid email address';
        }
        if (!formData?.phone?.trim()) {
          newErrors.phone = 'Phone number is required';
        }
        if (!formData?.password) {
          newErrors.password = 'Password is required';
        } else if (formData?.password?.length < 8) {
          newErrors.password = 'Password must be at least 8 characters';
        }
        if (formData?.password !== formData?.confirmPassword) {
          newErrors.confirmPassword = 'Passwords do not match';
        }
        if (!formData?.country) {
          newErrors.country = 'Country is required';
        }
        if (!formData?.city?.trim()) {
          newErrors.city = 'City is required';
        }
        break;

      case 3:
        if (selectedRole === 'artisan') {
          if (!formData?.craftCategory) {
            newErrors.craftCategory = 'Craft category is required';
          }
          if (!formData?.craftSpecialization?.trim()) {
            newErrors.craftSpecialization = 'Craft specialization is required';
          }
          if (!formData?.experienceLevel) {
            newErrors.experienceLevel = 'Experience level is required';
          }
          if (!formData?.craftBio?.trim()) {
            newErrors.craftBio = 'Please tell us about your craft';
          } else if (formData?.craftBio?.length < 50) {
            newErrors.craftBio = 'Please provide at least 50 characters';
          }
          if (!formData?.workshopLocation?.trim()) {
            newErrors.workshopLocation = 'Workshop location is required';
          }
        }
        break;

      case 4:
        if (!formData?.acceptTerms) {
          newErrors.acceptTerms = 'You must accept the Terms of Service';
        }
        if (!formData?.acceptPrivacy) {
          newErrors.acceptPrivacy = 'You must accept the Privacy Policy';
        }
        break;

      default:
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      if (currentStep < totalSteps) {
        setCurrentStep(currentStep + 1);
      } else {
        handleSubmit();
      }
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock successful registration
      console.log('Registration data:', { ...formData, role: selectedRole });
      setIsSuccess(true);
    } catch (error) {
      console.error('Registration failed:', error);
      setErrors({ submit: 'Registration failed. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <RoleSelection
            selectedRole={selectedRole}
            onRoleSelect={setSelectedRole}
          />
        );
      case 2:
        return (
          <BasicInfoForm
            formData={formData}
            onFormChange={handleFormChange}
            errors={errors}
            selectedRole={selectedRole}
          />
        );
      case 3:
        if (selectedRole === 'artisan') {
          return (
            <ArtisanDetailsForm
              formData={formData}
              onFormChange={handleFormChange}
              errors={errors}
            />
          );
        } else {
          // Skip artisan details for buyers
          setCurrentStep(4);
          return null;
        }
      case 4:
        return (
          <TermsAndPrivacy
            formData={formData}
            onFormChange={handleFormChange}
            errors={errors}
          />
        );
      default:
        return null;
    }
  };

  const getNextButtonText = () => {
    if (currentStep === totalSteps) {
      return isSubmitting ? 'Creating Account...' : 'Create Account';
    }
    if (currentStep === 3 && selectedRole === 'buyer') {
      return 'Review & Complete';
    }
    return 'Continue';
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-6 py-12">
          <RegistrationSuccess
            selectedRole={selectedRole}
            userEmail={formData?.email}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-card">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link to="/marketplace-homepage" className="flex items-center space-x-3">
              <div className="flex items-center justify-center w-8 h-8 bg-primary rounded-lg">
                <Icon name="Palette" size={20} color="var(--color-primary-foreground)" />
              </div>
              <div>
                <span className="text-lg font-heading font-semibold text-foreground">Art O Mart</span>
                <span className="text-xs text-muted-foreground ml-2">Registration</span>
              </div>
            </Link>
            
            <Link
              to="/marketplace-homepage"
              className="flex items-center space-x-2 text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
            >
              <Icon name="ArrowLeft" size={16} />
              <span>Back to Marketplace</span>
            </Link>
          </div>
        </div>
      </div>
      {/* Main Content */}
      <div className="container mx-auto px-6 py-8">
        <div className="max-w-4xl mx-auto">
          <ProgressIndicator
            currentStep={currentStep}
            totalSteps={totalSteps}
            selectedRole={selectedRole}
          />

          <div className="bg-card border border-border rounded-xl shadow-warm-md p-8">
            {renderStepContent()}

            {/* Error Message */}
            {errors?.submit && (
              <div className="mt-6 p-4 bg-error/10 border border-error/20 rounded-lg">
                <div className="flex items-center space-x-2">
                  <Icon name="AlertCircle" size={18} className="text-error" />
                  <span className="text-sm text-error font-medium">{errors?.submit}</span>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex items-center justify-between mt-8 pt-6 border-t border-border">
              <div>
                {currentStep > 1 && (
                  <Button
                    variant="outline"
                    onClick={handlePrevious}
                    iconName="ArrowLeft"
                    iconPosition="left"
                  >
                    Previous
                  </Button>
                )}
              </div>

              <div className="flex items-center space-x-4">
                {currentStep < totalSteps && (
                  <span className="text-sm text-muted-foreground">
                    Step {currentStep} of {totalSteps}
                  </span>
                )}
                
                <Button
                  variant="default"
                  onClick={handleNext}
                  loading={isSubmitting}
                  disabled={currentStep === 1 && !selectedRole}
                  iconName={currentStep === totalSteps ? "Check" : "ArrowRight"}
                  iconPosition="right"
                >
                  {getNextButtonText()}
                </Button>
              </div>
            </div>
          </div>

          {/* Additional Info */}
          <div className="mt-8 text-center">
            <p className="text-sm text-muted-foreground">
              Already have an account?{' '}
              <Link
                to="/login"
                className="text-primary hover:text-primary/80 font-medium transition-colors duration-200"
              >
                Sign in here
              </Link>
            </p>
          </div>

          {/* Help Section */}
          <div className="mt-6 bg-muted/30 border border-border rounded-lg p-4">
            <div className="flex items-center justify-center space-x-6 text-sm">
              <button className="flex items-center space-x-2 text-muted-foreground hover:text-primary transition-colors duration-200">
                <Icon name="HelpCircle" size={16} />
                <span>Need Help?</span>
              </button>
              <button className="flex items-center space-x-2 text-muted-foreground hover:text-primary transition-colors duration-200">
                <Icon name="MessageCircle" size={16} />
                <span>Contact Support</span>
              </button>
              <button className="flex items-center space-x-2 text-muted-foreground hover:text-primary transition-colors duration-200">
                <Icon name="FileText" size={16} />
                <span>Registration Guide</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;