import React from 'react';
import Icon from '../../../components/AppIcon';

const RoleSelection = ({ selectedRole, onRoleSelect }) => {
  const roles = [
    {
      id: 'buyer',
      title: 'Buyer',
      description: 'Discover authentic handmade products from local artisans',
      icon: 'ShoppingBag',
      features: [
        'Browse unique handcrafted items',
        'Connect with local artisans',
        'AI-powered shopping assistant',
        'Secure payment options'
      ]
    },
    {
      id: 'artisan',
      title: 'Artisan',
      description: 'Showcase your crafts and connect with buyers worldwide',
      icon: 'Palette',
      features: [
        'Create your digital storefront',
        'AI-generated product stories',
        'Inventory management tools',
        'Analytics and insights'
      ]
    }
  ];

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-heading font-semibold text-foreground mb-2">
          Choose Your Account Type
        </h2>
        <p className="text-muted-foreground">
          Select how you'd like to use Art O Mart
        </p>
      </div>
      <div className="grid md:grid-cols-2 gap-6">
        {roles?.map((role) => (
          <div
            key={role?.id}
            onClick={() => onRoleSelect(role?.id)}
            className={`relative p-6 rounded-xl border-2 cursor-pointer transition-all duration-200 hover:shadow-warm-md ${
              selectedRole === role?.id
                ? 'border-primary bg-primary/5 shadow-warm-md'
                : 'border-border bg-card hover:border-primary/50'
            }`}
          >
            {selectedRole === role?.id && (
              <div className="absolute top-4 right-4 w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                <Icon name="Check" size={16} color="var(--color-primary-foreground)" />
              </div>
            )}

            <div className="flex items-center space-x-4 mb-4">
              <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                selectedRole === role?.id ? 'bg-primary' : 'bg-muted'
              }`}>
                <Icon 
                  name={role?.icon} 
                  size={24} 
                  color={selectedRole === role?.id ? 'var(--color-primary-foreground)' : 'var(--color-muted-foreground)'}
                />
              </div>
              <div>
                <h3 className="text-lg font-heading font-semibold text-foreground">
                  {role?.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {role?.description}
                </p>
              </div>
            </div>

            <ul className="space-y-2">
              {role?.features?.map((feature, index) => (
                <li key={index} className="flex items-center space-x-2 text-sm text-foreground">
                  <Icon name="Check" size={16} className="text-success flex-shrink-0" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RoleSelection;