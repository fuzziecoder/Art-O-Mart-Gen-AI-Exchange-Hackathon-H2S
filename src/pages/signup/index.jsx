import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Select from '../../components/ui/Select';
import { useAuth } from '../../contexts/AuthContext';

const Signup = () => {
  const navigate = useNavigate();
  const { signUp, loading } = useAuth();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'customer',
    phone: '',
    agreeToTerms: false
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const roleOptions = [
    { value: 'customer', label: 'Customer - Browse and buy handcrafted items' },
    { value: 'artisan', label: 'Artisan - Sell your handcrafted products' }
  ];

  const handleChange = (e) => {
    const { name, value, type, checked } = e?.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    // Clear error when user starts typing
    if (errors?.[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSelectChange = (name, value) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors?.[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData?.fullName?.trim()) {
      newErrors.fullName = 'Full name is required';
    } else if (formData?.fullName?.trim()?.length < 2) {
      newErrors.fullName = 'Full name must be at least 2 characters';
    }

    if (!formData?.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/?.test(formData?.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData?.password) {
      newErrors.password = 'Password is required';
    } else if (formData?.password?.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (!formData?.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData?.password !== formData?.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (formData?.phone && !/^\+?[\d\s\-\(\)]+$/?.test(formData?.phone)) {
      newErrors.phone = 'Please enter a valid phone number';
    }

    if (!formData?.agreeToTerms) {
      newErrors.agreeToTerms = 'You must agree to the terms and conditions';
    }

    setErrors(newErrors);
    return Object?.keys(newErrors)?.length === 0;
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    
    if (!validateForm()) return;

    setIsSubmitting(true);
    
    try {
      const userData = {
        full_name: formData?.fullName?.trim(),
        role: formData?.role,
        phone: formData?.phone || null
      };

      const { data, error } = await signUp(
        formData?.email, 
        formData?.password, 
        userData
      );
      
      if (error) {
        if (error?.message?.includes('already registered')) {
          setErrors({ email: 'An account with this email already exists' });
        } else {
          setErrors({ submit: error?.message || 'Registration failed. Please try again.' });
        }
      } else if (data?.user) {
        // Registration successful
        navigate('/login', { 
          state: { 
            message: 'Registration successful! Please sign in to continue.',
            email: formData?.email 
          }
        });
      }
    } catch (error) {
      setErrors({ submit: 'An unexpected error occurred. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-pulse text-center">
          <div className="w-8 h-8 bg-primary rounded-full animate-bounce mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        {/* Header */}
        <div className="text-center mb-8">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center mx-auto mb-4"
          >
            <span className="text-2xl font-bold text-primary-foreground">A</span>
          </motion.div>
          <h1 className="text-2xl font-heading font-bold text-foreground mb-2">
            Join Art O Mart
          </h1>
          <p className="text-muted-foreground">
            Create your account and start your handcrafted journey
          </p>
        </div>

        {/* Signup Form */}
        <motion.form
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          onSubmit={handleSubmit}
          className="bg-card p-8 rounded-2xl border border-border shadow-lg space-y-6"
        >
          {errors?.submit && (
            <div className="bg-destructive/10 border border-destructive/20 text-destructive px-4 py-3 rounded-lg text-sm">
              {errors?.submit}
            </div>
          )}

          <div className="space-y-4">
            <Input
              label="Full Name"
              type="text"
              name="fullName"
              value={formData?.fullName}
              onChange={handleChange}
              placeholder="Enter your full name"
              error={errors?.fullName}
              disabled={isSubmitting}
            />

            <Input
              label="Email Address"
              type="email"
              name="email"
              value={formData?.email}
              onChange={handleChange}
              placeholder="Enter your email address"
              error={errors?.email}
              disabled={isSubmitting}
            />

            <Select
              label="Account Type"
              name="role"
              value={formData?.role}
              options={roleOptions}
              onChange={(value) => handleSelectChange('role', value)}
              error={errors?.role}
              disabled={isSubmitting}
            />

            <Input
              label="Phone Number (Optional)"
              type="tel"
              name="phone"
              value={formData?.phone}
              onChange={handleChange}
              placeholder="Enter your phone number"
              error={errors?.phone}
              disabled={isSubmitting}
            />

            <Input
              label="Password"
              type="password"
              name="password"
              value={formData?.password}
              onChange={handleChange}
              placeholder="Create a strong password"
              error={errors?.password}
              disabled={isSubmitting}
            />

            <Input
              label="Confirm Password"
              type="password"
              name="confirmPassword"
              value={formData?.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm your password"
              error={errors?.confirmPassword}
              disabled={isSubmitting}
            />
          </div>

          <div className="space-y-4">
            <label className="flex items-start space-x-3 cursor-pointer">
              <input
                type="checkbox"
                name="agreeToTerms"
                checked={formData?.agreeToTerms}
                onChange={handleChange}
                className="w-4 h-4 text-primary bg-background border-border rounded focus:ring-primary focus:ring-2 mt-0.5"
                disabled={isSubmitting}
              />
              <span className="text-sm text-muted-foreground">
                I agree to the{' '}
                <Link to="/terms" className="text-primary hover:text-primary/80 font-medium">
                  Terms of Service
                </Link>{' '}
                and{' '}
                <Link to="/privacy" className="text-primary hover:text-primary/80 font-medium">
                  Privacy Policy
                </Link>
              </span>
            </label>
            {errors?.agreeToTerms && (
              <p className="text-destructive text-sm">{errors?.agreeToTerms}</p>
            )}
          </div>

          <Button
            type="submit"
            size="lg"
            fullWidth
            loading={isSubmitting}
            disabled={isSubmitting || !formData?.agreeToTerms}
          >
            {isSubmitting ? 'Creating Account...' : 'Create Account'}
          </Button>

          <div className="text-center">
            <span className="text-muted-foreground">Already have an account? </span>
            <Link
              to="/login"
              className="text-primary hover:text-primary/80 font-medium"
            >
              Sign in
            </Link>
          </div>
        </motion.form>
      </motion.div>
    </div>
  );
};

export default Signup;