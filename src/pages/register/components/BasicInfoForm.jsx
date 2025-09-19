import React from 'react';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const BasicInfoForm = ({ formData, onFormChange, errors, selectedRole }) => {
  const countryOptions = [
    { value: 'IN', label: 'India' },
    { value: 'US', label: 'United States' },
    { value: 'UK', label: 'United Kingdom' },
    { value: 'CA', label: 'Canada' },
    { value: 'AU', label: 'Australia' },
    { value: 'DE', label: 'Germany' },
    { value: 'FR', label: 'France' },
    { value: 'JP', label: 'Japan' },
    { value: 'BR', label: 'Brazil' },
    { value: 'MX', label: 'Mexico' }
  ];

  const stateOptions = {
    IN: [
      { value: 'MH', label: 'Maharashtra' },
      { value: 'KA', label: 'Karnataka' },
      { value: 'TN', label: 'Tamil Nadu' },
      { value: 'DL', label: 'Delhi' },
      { value: 'UP', label: 'Uttar Pradesh' },
      { value: 'WB', label: 'West Bengal' },
      { value: 'RJ', label: 'Rajasthan' },
      { value: 'GJ', label: 'Gujarat' }
    ],
    US: [
      { value: 'CA', label: 'California' },
      { value: 'NY', label: 'New York' },
      { value: 'TX', label: 'Texas' },
      { value: 'FL', label: 'Florida' },
      { value: 'IL', label: 'Illinois' }
    ]
  };

  const getPasswordStrength = (password) => {
    if (!password) return { strength: 0, label: '', color: '' };
    
    let score = 0;
    if (password?.length >= 8) score++;
    if (/[A-Z]/?.test(password)) score++;
    if (/[a-z]/?.test(password)) score++;
    if (/[0-9]/?.test(password)) score++;
    if (/[^A-Za-z0-9]/?.test(password)) score++;

    const levels = [
      { strength: 0, label: '', color: '' },
      { strength: 1, label: 'Very Weak', color: 'bg-error' },
      { strength: 2, label: 'Weak', color: 'bg-warning' },
      { strength: 3, label: 'Fair', color: 'bg-warning' },
      { strength: 4, label: 'Good', color: 'bg-success' },
      { strength: 5, label: 'Strong', color: 'bg-success' }
    ];

    return levels?.[score];
  };

  const passwordStrength = getPasswordStrength(formData?.password);

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-heading font-semibold text-foreground mb-2">
          Basic Information
        </h2>
        <p className="text-muted-foreground">
          Tell us about yourself to get started
        </p>
      </div>
      <div className="space-y-4">
        <div className="grid md:grid-cols-2 gap-4">
          <Input
            label="First Name"
            type="text"
            placeholder="Enter your first name"
            value={formData?.firstName}
            onChange={(e) => onFormChange('firstName', e?.target?.value)}
            error={errors?.firstName}
            required
          />
          <Input
            label="Last Name"
            type="text"
            placeholder="Enter your last name"
            value={formData?.lastName}
            onChange={(e) => onFormChange('lastName', e?.target?.value)}
            error={errors?.lastName}
            required
          />
        </div>

        <Input
          label="Email Address"
          type="email"
          placeholder="Enter your email address"
          value={formData?.email}
          onChange={(e) => onFormChange('email', e?.target?.value)}
          error={errors?.email}
          description="We'll use this for account verification and updates"
          required
        />

        <Input
          label="Phone Number"
          type="tel"
          placeholder="Enter your phone number"
          value={formData?.phone}
          onChange={(e) => onFormChange('phone', e?.target?.value)}
          error={errors?.phone}
          required
        />

        <div>
          <Input
            label="Password"
            type="password"
            placeholder="Create a strong password"
            value={formData?.password}
            onChange={(e) => onFormChange('password', e?.target?.value)}
            error={errors?.password}
            required
          />
          {formData?.password && (
            <div className="mt-2">
              <div className="flex items-center space-x-2 mb-1">
                <div className="flex-1 bg-muted rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full transition-all duration-300 ${passwordStrength?.color}`}
                    style={{ width: `${(passwordStrength?.strength / 5) * 100}%` }}
                  />
                </div>
                <span className="text-xs font-medium text-muted-foreground">
                  {passwordStrength?.label}
                </span>
              </div>
              <p className="text-xs text-muted-foreground">
                Use 8+ characters with uppercase, lowercase, numbers, and symbols
              </p>
            </div>
          )}
        </div>

        <Input
          label="Confirm Password"
          type="password"
          placeholder="Confirm your password"
          value={formData?.confirmPassword}
          onChange={(e) => onFormChange('confirmPassword', e?.target?.value)}
          error={errors?.confirmPassword}
          required
        />

        <div className="grid md:grid-cols-2 gap-4">
          <Select
            label="Country"
            placeholder="Select your country"
            options={countryOptions}
            value={formData?.country}
            onChange={(value) => {
              onFormChange('country', value);
              onFormChange('state', ''); // Reset state when country changes
            }}
            error={errors?.country}
            required
          />

          {formData?.country && stateOptions?.[formData?.country] && (
            <Select
              label="State/Province"
              placeholder="Select your state"
              options={stateOptions?.[formData?.country]}
              value={formData?.state}
              onChange={(value) => onFormChange('state', value)}
              error={errors?.state}
              required
            />
          )}
        </div>

        <Input
          label="City"
          type="text"
          placeholder="Enter your city"
          value={formData?.city}
          onChange={(e) => onFormChange('city', e?.target?.value)}
          error={errors?.city}
          required
        />
      </div>
    </div>
  );
};

export default BasicInfoForm;