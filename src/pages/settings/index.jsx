import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Header from '../../components/ui/Header';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Select from '../../components/ui/Select';
import { useAuth } from '../../contexts/AuthContext';
import Icon from '../../components/AppIcon';

const Settings = () => {
  const { user, userProfile, updateProfile, signOut } = useAuth();
  const [activeTab, setActiveTab] = useState('profile');
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', content: '' });

  const [profileData, setProfileData] = useState({
    name: '',
    email: '',
    phone: '',
    role: 'buyer',
    address: '',
    city: '',
    state: '',
    country: '',
    preferences: {
      newsletter: true,
      notifications: true,
      marketing: false
    }
  });

  useEffect(() => {
    if (user && userProfile) {
      setProfileData({
        name: userProfile.name || user.user_metadata?.name || '',
        email: user.email || '',
        phone: userProfile.phone || '',
        role: userProfile.role || 'buyer',
        address: userProfile.address || '',
        city: userProfile.city || '',
        state: userProfile.state || '',
        country: userProfile.country || '',
        preferences: {
          newsletter: userProfile.preferences?.newsletter ?? true,
          notifications: userProfile.preferences?.notifications ?? true,
          marketing: userProfile.preferences?.marketing ?? false
        }
      });
    }
  }, [user, userProfile]);

  const handleInputChange = (field, value) => {
    if (field.includes('.')) {
      const [parent, child] = field.split('.');
      setProfileData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value
        }
      }));
    } else {
      setProfileData(prev => ({
        ...prev,
        [field]: value
      }));
    }
  };

  const handleSave = async () => {
    setLoading(true);
    setMessage({ type: '', content: '' });

    try {
      const { error } = await updateProfile({
        name: profileData.name,
        phone: profileData.phone,
        role: profileData.role,
        address: profileData.address,
        city: profileData.city,
        state: profileData.state,
        country: profileData.country,
        preferences: profileData.preferences
      });

      if (error) {
        setMessage({ type: 'error', content: error.message });
      } else {
        setMessage({ type: 'success', content: 'Profile updated successfully!' });
        setIsEditing(false);
      }
    } catch (error) {
      setMessage({ type: 'error', content: 'Failed to update profile. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  const tabs = [
    { id: 'profile', label: 'Profile', icon: 'User' },
    { id: 'preferences', label: 'Preferences', icon: 'Settings' },
    { id: 'security', label: 'Security', icon: 'Shield' },
    { id: 'billing', label: 'Billing', icon: 'CreditCard' }
  ];

  const roleOptions = [
    { value: 'buyer', label: 'Buyer - Shop for handcrafted products' },
    { value: 'artisan', label: 'Artisan - Sell your handcrafted products' }
  ];

  const renderProfileTab = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-foreground">Profile Information</h3>
        <Button
          variant={isEditing ? "outline" : "default"}
          size="sm"
          onClick={() => setIsEditing(!isEditing)}
          iconName={isEditing ? "X" : "Edit"}
        >
          {isEditing ? 'Cancel' : 'Edit'}
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input
          label="Full Name"
          value={profileData.name}
          onChange={(e) => handleInputChange('name', e.target.value)}
          disabled={!isEditing}
        />
        <Input
          label="Email"
          type="email"
          value={profileData.email}
          disabled={true}
          description="Contact support to change your email address"
        />
        <Input
          label="Phone"
          type="tel"
          value={profileData.phone}
          onChange={(e) => handleInputChange('phone', e.target.value)}
          disabled={!isEditing}
        />
        <Select
          label="Account Type"
          options={roleOptions}
          value={profileData.role}
          onChange={(value) => handleInputChange('role', value)}
          disabled={!isEditing}
        />
      </div>

      <div className="space-y-4">
        <h4 className="font-medium text-foreground">Address Information</h4>
        <div className="grid grid-cols-1 gap-4">
          <Input
            label="Address"
            value={profileData.address}
            onChange={(e) => handleInputChange('address', e.target.value)}
            disabled={!isEditing}
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Input
              label="City"
              value={profileData.city}
              onChange={(e) => handleInputChange('city', e.target.value)}
              disabled={!isEditing}
            />
            <Input
              label="State"
              value={profileData.state}
              onChange={(e) => handleInputChange('state', e.target.value)}
              disabled={!isEditing}
            />
            <Input
              label="Country"
              value={profileData.country}
              onChange={(e) => handleInputChange('country', e.target.value)}
              disabled={!isEditing}
            />
          </div>
        </div>
      </div>

      {isEditing && (
        <div className="flex justify-end space-x-3">
          <Button
            variant="outline"
            onClick={() => setIsEditing(false)}
          >
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            loading={loading}
            iconName="Save"
          >
            Save Changes
          </Button>
        </div>
      )}
    </div>
  );

  const renderPreferencesTab = () => (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-foreground">Notification Preferences</h3>
      
      <div className="space-y-4">
        <div className="flex items-center justify-between p-4 bg-card border border-border rounded-lg">
          <div>
            <h4 className="font-medium text-foreground">Newsletter</h4>
            <p className="text-sm text-muted-foreground">Receive weekly updates about new artisans and products</p>
          </div>
          <input
            type="checkbox"
            checked={profileData.preferences.newsletter}
            onChange={(e) => handleInputChange('preferences.newsletter', e.target.checked)}
            className="h-4 w-4 text-primary bg-background border-border rounded focus:ring-primary focus:ring-2"
          />
        </div>

        <div className="flex items-center justify-between p-4 bg-card border border-border rounded-lg">
          <div>
            <h4 className="font-medium text-foreground">Order Notifications</h4>
            <p className="text-sm text-muted-foreground">Get notified about order updates and shipping</p>
          </div>
          <input
            type="checkbox"
            checked={profileData.preferences.notifications}
            onChange={(e) => handleInputChange('preferences.notifications', e.target.checked)}
            className="h-4 w-4 text-primary bg-background border-border rounded focus:ring-primary focus:ring-2"
          />
        </div>

        <div className="flex items-center justify-between p-4 bg-card border border-border rounded-lg">
          <div>
            <h4 className="font-medium text-foreground">Marketing Communications</h4>
            <p className="text-sm text-muted-foreground">Receive promotional offers and special deals</p>
          </div>
          <input
            type="checkbox"
            checked={profileData.preferences.marketing}
            onChange={(e) => handleInputChange('preferences.marketing', e.target.checked)}
            className="h-4 w-4 text-primary bg-background border-border rounded focus:ring-primary focus:ring-2"
          />
        </div>
      </div>

      <Button
        onClick={handleSave}
        loading={loading}
        iconName="Save"
      >
        Save Preferences
      </Button>
    </div>
  );

  const renderSecurityTab = () => (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-foreground">Security Settings</h3>
      
      <div className="space-y-4">
        <div className="p-4 bg-card border border-border rounded-lg">
          <h4 className="font-medium text-foreground mb-2">Change Password</h4>
          <p className="text-sm text-muted-foreground mb-4">Update your password to keep your account secure</p>
          <Button variant="outline" iconName="Lock">
            Change Password
          </Button>
        </div>

        <div className="p-4 bg-card border border-border rounded-lg">
          <h4 className="font-medium text-foreground mb-2">Two-Factor Authentication</h4>
          <p className="text-sm text-muted-foreground mb-4">Add an extra layer of security to your account</p>
          <Button variant="outline" iconName="Shield">
            Enable 2FA
          </Button>
        </div>
      </div>
    </div>
  );

  const renderBillingTab = () => (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-foreground">Billing Information</h3>
      
      <div className="space-y-4">
        <div className="p-4 bg-card border border-border rounded-lg">
          <h4 className="font-medium text-foreground mb-2">Payment Methods</h4>
          <p className="text-sm text-muted-foreground mb-4">Manage your saved payment methods</p>
          <Button variant="outline" iconName="CreditCard">
            Add Payment Method
          </Button>
        </div>

        <div className="p-4 bg-card border border-border rounded-lg">
          <h4 className="font-medium text-foreground mb-2">Order History</h4>
          <p className="text-sm text-muted-foreground mb-4">View your past orders and receipts</p>
          <Button variant="outline" iconName="History">
            View Orders
          </Button>
        </div>
      </div>
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'profile':
        return renderProfileTab();
      case 'preferences':
        return renderPreferencesTab();
      case 'security':
        return renderSecurityTab();
      case 'billing':
        return renderBillingTab();
      default:
        return renderProfileTab();
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-foreground mb-4">Please Sign In</h2>
          <p className="text-muted-foreground mb-6">You need to be logged in to access settings.</p>
          <Link to="/login">
            <Button iconName="LogIn">
              Sign In
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20 pb-12">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <div className="flex items-center space-x-4 mb-2">
              <Link 
                to="/marketplace-homepage" 
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <Icon name="ArrowLeft" size={20} />
              </Link>
              <h1 className="text-3xl font-heading font-bold text-foreground">Settings</h1>
            </div>
            <p className="text-muted-foreground">Manage your account settings and preferences</p>
          </motion.div>

          {/* Message */}
          {message.content && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`mb-6 p-4 rounded-lg border ${
                message.type === 'success' 
                  ? 'bg-green-50 border-green-200 text-green-800' 
                  : 'bg-red-50 border-red-200 text-red-800'
              }`}
            >
              {message.content}
            </motion.div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-1"
            >
              <div className="bg-card border border-border rounded-lg p-4">
                <nav className="space-y-2">
                  {tabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center space-x-3 px-3 py-2 rounded-md text-left transition-colors ${
                        activeTab === tab.id
                          ? 'bg-primary text-primary-foreground'
                          : 'text-foreground hover:bg-muted'
                      }`}
                    >
                      <Icon name={tab.icon} size={18} />
                      <span>{tab.label}</span>
                    </button>
                  ))}
                </nav>
              </div>
            </motion.div>

            {/* Content */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-3"
            >
              <div className="bg-card border border-border rounded-lg p-6">
                {renderTabContent()}
              </div>
            </motion.div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Settings;
