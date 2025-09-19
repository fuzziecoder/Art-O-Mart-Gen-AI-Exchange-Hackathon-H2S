import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import MetricsCard from './components/MetricsCard';
import ProductTable from './components/ProductTable';
import SalesChart from './components/SalesChart';
import OrderManagement from './components/OrderManagement';
import AIContentGenerator from './components/AIContentGenerator';
import QuickActions from './components/QuickActions';

const ArtisanDashboard = () => {
  const [dashboardData, setDashboardData] = useState({
    metrics: {
      totalSales: 45200,
      salesChange: '+12.5%',
      totalOrders: 156,
      ordersChange: '+8.3%',
      activeProducts: 24,
      productsChange: '+2',
      trustScore: 4.8,
      trustChange: '+0.2'
    },
    products: []
  });

  useEffect(() => {
    // Mock data for products
    const mockProducts = [
      {
        id: 1,
        name: 'Handwoven Silk Saree',
        sku: 'HSS-001',
        category: 'Textiles',
        price: 8500,
        stock: 5,
        status: 'active',
        image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=150'
      },
      {
        id: 2,
        name: 'Wooden Jewelry Box',
        sku: 'WJB-002',
        category: 'Woodwork',
        price: 1200,
        stock: 12,
        status: 'active',
        image: 'https://images.unsplash.com/photo-1586339949916-3e9457bef6d3?w=150'
      },
      {
        id: 3,
        name: 'Ceramic Tea Set',
        sku: 'CTS-003',
        category: 'Pottery',
        price: 3200,
        stock: 0,
        status: 'out_of_stock',
        image: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=150'
      },
      {
        id: 4,
        name: 'Brass Wall Hanging',
        sku: 'BWH-004',
        category: 'Metalwork',
        price: 2800,
        stock: 8,
        status: 'active',
        image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=150'
      },
      {
        id: 5,
        name: 'Embroidered Cushion Cover',
        sku: 'ECC-005',
        category: 'Textiles',
        price: 450,
        stock: 25,
        status: 'active',
        image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=150'
      },
      {
        id: 6,
        name: 'Bamboo Wind Chimes',
        sku: 'BWC-006',
        category: 'Bamboo Craft',
        price: 680,
        stock: 15,
        status: 'inactive',
        image: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=150'
      }
    ];

    setDashboardData(prev => ({
      ...prev,
      products: mockProducts
    }));
  }, []);

  const handleUpdateProduct = (productId, updateData) => {
    setDashboardData(prev => ({
      ...prev,
      products: prev?.products?.map(product =>
        product?.id === productId
          ? { ...product, ...updateData }
          : product
      )
    }));
  };

  const handleDeleteProduct = (productId) => {
    setDashboardData(prev => ({
      ...prev,
      products: prev?.products?.filter(product => product?.id !== productId)
    }));
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-8">
          {/* Page Header */}
          <div className="mb-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
              <div>
                <h1 className="text-3xl font-heading font-bold text-foreground">
                  Artisan Dashboard
                </h1>
                <p className="text-muted-foreground mt-2">
                  Manage your crafts, track sales, and grow your business
                </p>
              </div>
              <div className="text-sm text-muted-foreground">
                Last updated: {new Date()?.toLocaleDateString('en-US', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </div>
            </div>
          </div>

          {/* Metrics Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <MetricsCard
              title="Total Sales"
              value={`₹${dashboardData?.metrics?.totalSales?.toLocaleString()}`}
              change={dashboardData?.metrics?.salesChange}
              changeType="positive"
              icon="TrendingUp"
              color="primary"
            />
            <MetricsCard
              title="Total Orders"
              value={dashboardData?.metrics?.totalOrders}
              change={dashboardData?.metrics?.ordersChange}
              changeType="positive"
              icon="ShoppingBag"
              color="success"
            />
            <MetricsCard
              title="Active Products"
              value={dashboardData?.metrics?.activeProducts}
              change={dashboardData?.metrics?.productsChange}
              changeType="positive"
              icon="Package"
              color="accent"
            />
            <MetricsCard
              title="Trust Score"
              value={dashboardData?.metrics?.trustScore}
              change={dashboardData?.metrics?.trustChange}
              changeType="positive"
              icon="Shield"
              color="warning"
            />
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 mb-8">
            {/* Sales Chart - Takes 2 columns */}
            <div className="xl:col-span-2">
              <SalesChart />
            </div>
            
            {/* Quick Actions - Takes 1 column */}
            <div>
              <QuickActions />
            </div>
          </div>

          {/* Product Management */}
          <div className="mb-8">
            <ProductTable
              products={dashboardData?.products}
              onUpdateProduct={handleUpdateProduct}
              onDeleteProduct={handleDeleteProduct}
            />
          </div>

          {/* Bottom Section Grid */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
            {/* Order Management */}
            <div>
              <OrderManagement />
            </div>
            
            {/* AI Content Generator */}
            <div>
              <AIContentGenerator />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ArtisanDashboard;