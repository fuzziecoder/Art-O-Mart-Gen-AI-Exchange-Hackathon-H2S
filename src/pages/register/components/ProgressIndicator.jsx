import React from 'react';
import Icon from '../../../components/AppIcon';

const ProgressIndicator = ({ currentStep, totalSteps, selectedRole }) => {
  const getStepTitle = (step) => {
    const stepTitles = {
      1: 'Account Type',
      2: 'Basic Info',
      3: selectedRole === 'artisan' ? 'Artisan Details' : 'Preferences',
      4: 'Terms & Privacy'
    };
    return stepTitles?.[step] || `Step ${step}`;
  };

  const getStepIcon = (step) => {
    const stepIcons = {
      1: 'UserCheck',
      2: 'User',
      3: selectedRole === 'artisan' ? 'Palette' : 'Settings',
      4: 'Shield'
    };
    return stepIcons?.[step] || 'Circle';
  };

  return (
    <div className="mb-8">
      {/* Progress Bar */}
      <div className="relative">
        <div className="flex items-center justify-between mb-4">
          {Array.from({ length: totalSteps }, (_, index) => {
            const step = index + 1;
            const isCompleted = step < currentStep;
            const isCurrent = step === currentStep;
            const isUpcoming = step > currentStep;

            return (
              <React.Fragment key={step}>
                <div className="flex flex-col items-center">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${
                      isCompleted
                        ? 'bg-success border-success text-success-foreground'
                        : isCurrent
                        ? 'bg-primary border-primary text-primary-foreground'
                        : 'bg-background border-border text-muted-foreground'
                    }`}
                  >
                    {isCompleted ? (
                      <Icon name="Check" size={18} />
                    ) : (
                      <Icon name={getStepIcon(step)} size={18} />
                    )}
                  </div>
                  <div className="mt-2 text-center">
                    <p
                      className={`text-xs font-medium ${
                        isCurrent
                          ? 'text-primary'
                          : isCompleted
                          ? 'text-success' :'text-muted-foreground'
                      }`}
                    >
                      {getStepTitle(step)}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Step {step}
                    </p>
                  </div>
                </div>
                {/* Connector Line */}
                {step < totalSteps && (
                  <div className="flex-1 mx-4">
                    <div
                      className={`h-0.5 transition-all duration-300 ${
                        step < currentStep ? 'bg-success' : 'bg-border'
                      }`}
                    />
                  </div>
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>
      {/* Current Step Info */}
      <div className="text-center">
        <div className="inline-flex items-center space-x-2 px-4 py-2 bg-primary/10 rounded-full">
          <Icon name={getStepIcon(currentStep)} size={16} className="text-primary" />
          <span className="text-sm font-medium text-primary">
            {getStepTitle(currentStep)} ({currentStep} of {totalSteps})
          </span>
        </div>
      </div>
      {/* Mobile Progress Bar */}
      <div className="lg:hidden mt-4">
        <div className="flex items-center justify-between text-sm text-muted-foreground mb-2">
          <span>Progress</span>
          <span>{Math.round((currentStep / totalSteps) * 100)}%</span>
        </div>
        <div className="w-full bg-muted rounded-full h-2">
          <div
            className="bg-primary h-2 rounded-full transition-all duration-300"
            style={{ width: `${(currentStep / totalSteps) * 100}%` }}
          />
        </div>
      </div>
    </div>
  );
};

export default ProgressIndicator;