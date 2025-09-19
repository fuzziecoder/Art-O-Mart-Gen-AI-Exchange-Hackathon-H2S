import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const QuickActions = () => {
  const actions = [
    {
      id: 'add-product',
      title: 'Add New Product',
      description: 'List a new handcrafted item',
      icon: 'Plus',
      color: 'primary',
      action: () => console.log('Add product')
    },
    {
      id: 'update-profile',
      title: 'Update Profile',
      description: 'Edit your artisan information',
      icon: 'User',
      color: 'secondary',
      link: '/profile'
    },
    {
      id: 'view-storefront',
      title: 'View Storefront',
      description: 'See your public store page',
      icon: 'Store',
      color: 'accent',
      link: '/artisan-storefront'
    },
    {
      id: 'verification',
      title: 'Verification Status',
      description: 'Check your trust score',
      icon: 'Shield',
      color: 'success',
      action: () => console.log('Check verification')
    },
    {
      id: 'analytics',
      title: 'Export Analytics',
      description: 'Download sales reports',
      icon: 'Download',
      color: 'warning',
      action: () => console.log('Export analytics')
    },
    {
      id: 'support',
      title: 'Get Support',
      description: 'Contact our help team',
      icon: 'HelpCircle',
      color: 'muted',
      action: () => console.log('Contact support')
    }
  ];

  const getColorClasses = (color) => {
    switch (color) {
      case 'primary':
        return 'bg-primary text-primary-foreground hover:bg-primary/90';
      case 'secondary':
        return 'bg-secondary text-secondary-foreground hover:bg-secondary/90';
      case 'accent':
        return 'bg-accent text-accent-foreground hover:bg-accent/90';
      case 'success':
        return 'bg-success text-success-foreground hover:bg-success/90';
      case 'warning':
        return 'bg-warning text-warning-foreground hover:bg-warning/90';
      default:
        return 'bg-muted text-muted-foreground hover:bg-muted/90';
    }
  };

  const handleAction = (action) => {
    if (action?.action) {
      action?.action();
    }
  };

  const ActionButton = ({ action }) => {
    const content = (
      <div className={`p-4 rounded-lg transition-all duration-200 cursor-pointer group ${getColorClasses(action?.color)}`}>
        <div className="flex items-start space-x-3">
          <div className="p-2 bg-white/20 rounded-lg group-hover:bg-white/30 transition-colors duration-200">
            <Icon name={action?.icon} size={20} />
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="font-medium text-sm mb-1 group-hover:scale-105 transition-transform duration-200">
              {action?.title}
            </h4>
            <p className="text-xs opacity-90 line-clamp-2">
              {action?.description}
            </p>
          </div>
        </div>
      </div>
    );

    if (action?.link) {
      return (
        <Link to={action?.link} className="block">
          {content}
        </Link>
      );
    }

    return (
      <button onClick={() => handleAction(action)} className="w-full text-left">
        {content}
      </button>
    );
  };

  return (
    <div className="bg-card border border-border rounded-lg shadow-warm-sm">
      <div className="p-6 border-b border-border">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-primary text-primary-foreground rounded-lg">
            <Icon name="Zap" size={20} />
          </div>
          <h3 className="text-lg font-heading font-semibold text-foreground">
            Quick Actions
          </h3>
        </div>
      </div>
      <div className="p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {actions?.map((action) => (
            <ActionButton key={action?.id} action={action} />
          ))}
        </div>

        {/* Featured Action */}
        <div className="mt-6 pt-6 border-t border-border">
          <div className="bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-primary text-primary-foreground rounded-lg">
                  <Icon name="TrendingUp" size={20} />
                </div>
                <div>
                  <h4 className="font-medium text-foreground">Boost Your Sales</h4>
                  <p className="text-sm text-muted-foreground">
                    Use AI to create promotional content and reach more customers
                  </p>
                </div>
              </div>
              <Button variant="default" size="sm">
                <Icon name="ArrowRight" size={16} className="ml-2" />
                Get Started
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickActions;