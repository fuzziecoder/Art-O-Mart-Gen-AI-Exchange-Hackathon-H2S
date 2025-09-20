import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';
import { useAuth } from '../../contexts/AuthContext';
import './Header.css';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [cartItemCount, setCartItemCount] = useState(3);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, isAuthenticated, signOut, userProfile } = useAuth();
  
  // Determine user role from profile or default to buyer
  const userRole = userProfile?.role || 'buyer';

  // Handle logout
  const handleLogout = async () => {
    try {
      await signOut();
      navigate('/marketplace-homepage');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const isActivePath = (path) => {
    return location?.pathname === path;
  };

  const navigationItems = [
    {
      label: 'Discover',
      path: '/marketplace-homepage',
      icon: 'Compass',
      roles: ['buyer', 'artisan']
    },
    {
      label: 'AI Assistant',
      path: '/ai-shopping-assistant',
      icon: 'Bot',
      roles: ['buyer', 'artisan']
    },
    {
      label: 'Dashboard',
      path: '/artisan-dashboard',
      icon: 'BarChart3',
      roles: ['artisan']
    },
    {
      label: 'My Storefront',
      path: '/artisan-storefront',
      icon: 'Store',
      roles: ['artisan']
    }
  ];

  const filteredNavItems = navigationItems?.filter(item => 
    item?.roles?.includes(userRole)
  );

  return (
    <header className="fixed top-0 left-0 right-0 z-[1000] bg-background border-b border-border shadow-warm-sm">
      <div className="flex items-center justify-between h-20 px-6 lg:px-8">
        {/* Logo */}
        <Link to="/marketplace-homepage" className="flex items-center space-x-3">
          <div className="relative">
            {/* Custom logo with fallback */}
            <img 
              src="/artomart-logo.png" 
              alt="Art O Mart Logo" 
              className="logo w-10 h-10 rounded-full object-cover"
              onError={(e) => {
                // Fallback to icon-based logo if image doesn't exist
                e.target.style.display = 'none'
                e.target.nextSibling.style.display = 'flex'
              }}
            />
            <div className="hidden w-10 h-10 bg-primary rounded-lg items-center justify-center">
              <Icon name="Palette" size={24} color="var(--color-primary-foreground)" />
            </div>
          </div>
          <div className="relative">
            {/* Custom brand name with fallback */}
            <img 
              src="/artomart-name.png" 
              alt="Art O Mart" 
              className="brand-name h-8 object-contain"
              onError={(e) => {
                // Fallback to text-based brand if image doesn't exist
                e.target.style.display = 'none'
                e.target.nextSibling.style.display = 'flex'
              }}
            />
            <div className="hidden flex-col">
              <span className="text-xl font-heading font-semibold text-foreground">Art O Mart</span>
              <span className="text-xs font-caption text-muted-foreground">Artisan Marketplace</span>
            </div>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-8">
          {filteredNavItems?.map((item) => (
            <Link
              key={item?.path}
              to={item?.path}
              className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
                isActivePath(item?.path)
                  ? 'bg-primary text-primary-foreground'
                  : 'text-foreground hover:bg-muted hover:text-foreground'
              }`}
            >
              <Icon name={item?.icon} size={18} />
              <span>{item?.label}</span>
            </Link>
          ))}
        </nav>

        {/* Right Section */}
        <div className="flex items-center space-x-4">
          {/* Cart Indicator */}
          <Link
            to="/shopping-cart"
            className="relative p-2 rounded-lg hover:bg-muted transition-colors duration-200"
          >
            <Icon name="ShoppingCart" size={20} />
            {cartItemCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-accent text-accent-foreground text-xs font-medium rounded-full w-5 h-5 flex items-center justify-center">
                {cartItemCount}
              </span>
            )}
          </Link>

          {/* User Account Menu */}
          {isAuthenticated ? (
            <div className="relative group">
              <button className="flex items-center space-x-2 p-2 rounded-lg hover:bg-muted transition-colors duration-200">
                <div className="w-8 h-8 bg-secondary rounded-full flex items-center justify-center">
                  <Icon name="User" size={16} color="var(--color-secondary-foreground)" />
                </div>
                <Icon name="ChevronDown" size={16} className="hidden lg:block" />
              </button>
              
              {/* Dropdown Menu */}
              <div className="absolute right-0 top-full mt-2 w-48 bg-popover border border-border rounded-lg shadow-warm-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-[1200]">
                <div className="p-2">
                  <div className="px-3 py-2 text-sm text-muted-foreground border-b border-border mb-2">
                    {userRole === 'artisan' ? 'Artisan Account' : 'Buyer Account'}
                  </div>
                  <Link
                    to="/settings"
                    className="flex items-center space-x-2 px-3 py-2 text-sm rounded-md hover:bg-muted transition-colors duration-200"
                  >
                    <Icon name="Settings" size={16} />
                    <span>Settings</span>
                  </Link>
                  <Link
                    to="/help"
                    className="flex items-center space-x-2 px-3 py-2 text-sm rounded-md hover:bg-muted transition-colors duration-200"
                  >
                    <Icon name="HelpCircle" size={16} />
                    <span>Help</span>
                  </Link>
                  <button 
                    onClick={handleLogout}
                    className="flex items-center space-x-2 px-3 py-2 text-sm rounded-md hover:bg-muted transition-colors duration-200 w-full text-left"
                  >
                    <Icon name="LogOut" size={16} />
                    <span>Sign Out</span>
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex items-center space-x-2">
              <Link to="/login">
                <Button variant="outline" size="sm">
                  Sign In
                </Button>
              </Link>
              <Link to="/simple-register">
                <Button variant="default" size="sm">
                  Sign Up
                </Button>
              </Link>
            </div>
          )}

          {/* Mobile Menu Toggle */}
          <button
            onClick={toggleMobileMenu}
            className="lg:hidden p-2 rounded-lg hover:bg-muted transition-colors duration-200"
          >
            <Icon name={isMobileMenuOpen ? "X" : "Menu"} size={20} />
          </button>
        </div>
      </div>
      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-background border-t border-border shadow-warm-md z-[1100]">
          <nav className="p-4 space-y-2">
            {filteredNavItems?.map((item) => (
              <Link
                key={item?.path}
                to={item?.path}
                onClick={closeMobileMenu}
                className={`flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors duration-200 ${
                  isActivePath(item?.path)
                    ? 'bg-primary text-primary-foreground'
                    : 'text-foreground hover:bg-muted'
                }`}
              >
                <Icon name={item?.icon} size={20} />
                <span>{item?.label}</span>
              </Link>
            ))}
            
            {/* Mobile-specific items */}
            <div className="pt-4 border-t border-border">
              <Link
                to="/settings"
                onClick={closeMobileMenu}
                className="flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium text-foreground hover:bg-muted transition-colors duration-200"
              >
                <Icon name="Settings" size={20} />
                <span>Settings</span>
              </Link>
              <Link
                to="/help"
                onClick={closeMobileMenu}
                className="flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium text-foreground hover:bg-muted transition-colors duration-200"
              >
                <Icon name="HelpCircle" size={20} />
                <span>Help</span>
              </Link>
            </div>
          </nav>
        </div>
      )}
      {/* AI Assistant Floating Button (Mobile) */}
      <Link
        to="/ai-shopping-assistant"
        className="lg:hidden fixed bottom-6 right-6 z-[1000] w-14 h-14 bg-accent text-accent-foreground rounded-full shadow-warm-lg flex items-center justify-center hover:scale-105 transition-transform duration-200 overflow-hidden"
      >
        <img 
          src="/chatbot-logo.jpg"
          alt="AI Assistant" 
          className="w-10 h-10 rounded-full object-cover"
          onError={(e) => {
            // Fallback to Bot icon if logo doesn't load
            e.target.style.display = 'none'
            e.target.nextSibling.style.display = 'flex'
          }}
        />
        <Icon name="Bot" size={24} className="hidden" />
      </Link>
    </header>
  );
};

export default Header;