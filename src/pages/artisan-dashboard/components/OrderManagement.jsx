import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const OrderManagement = () => {
  const [activeTab, setActiveTab] = useState('pending');
  const [selectedOrders, setSelectedOrders] = useState([]);

  const orders = [
    {
      id: 'ORD-2024-001',
      customer: 'Priya Sharma',
      customerAvatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150',
      products: [
        {
          name: 'Handwoven Silk Saree',
          image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=150',
          quantity: 1,
          price: 8500
        }
      ],
      total: 8500,
      status: 'pending',
      orderDate: '2024-09-15',
      shippingAddress: 'Mumbai, Maharashtra',
      paymentMethod: 'UPI'
    },
    {
      id: 'ORD-2024-002',
      customer: 'Rajesh Kumar',
      customerAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150',
      products: [
        {
          name: 'Wooden Jewelry Box',
          image: 'https://images.unsplash.com/photo-1586339949916-3e9457bef6d3?w=150',
          quantity: 2,
          price: 1200
        }
      ],
      total: 2400,
      status: 'processing',
      orderDate: '2024-09-14',
      shippingAddress: 'Delhi, India',
      paymentMethod: 'Credit Card'
    },
    {
      id: 'ORD-2024-003',
      customer: 'Anita Desai',
      customerAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150',
      products: [
        {
          name: 'Ceramic Tea Set',
          image: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=150',
          quantity: 1,
          price: 3200
        }
      ],
      total: 3200,
      status: 'completed',
      orderDate: '2024-09-12',
      shippingAddress: 'Bangalore, Karnataka',
      paymentMethod: 'Net Banking'
    }
  ];

  const tabs = [
    { id: 'pending', label: 'Pending', count: orders?.filter(o => o?.status === 'pending')?.length },
    { id: 'processing', label: 'Processing', count: orders?.filter(o => o?.status === 'processing')?.length },
    { id: 'completed', label: 'Completed', count: orders?.filter(o => o?.status === 'completed')?.length }
  ];

  const filteredOrders = orders?.filter(order => order?.status === activeTab);

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return 'bg-warning text-warning-foreground';
      case 'processing':
        return 'bg-accent text-accent-foreground';
      case 'completed':
        return 'bg-success text-success-foreground';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const handleSelectOrder = (orderId) => {
    setSelectedOrders(prev => 
      prev?.includes(orderId) 
        ? prev?.filter(id => id !== orderId)
        : [...prev, orderId]
    );
  };

  const handleStatusUpdate = (orderId, newStatus) => {
    // Handle status update logic here
    console.log(`Updating order ${orderId} to ${newStatus}`);
  };

  return (
    <div className="bg-card border border-border rounded-lg shadow-warm-sm">
      <div className="p-6 border-b border-border">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
          <h3 className="text-lg font-heading font-semibold text-foreground">
            Order Management
          </h3>
          {selectedOrders?.length > 0 && (
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm">
                <Icon name="MessageCircle" size={16} className="mr-2" />
                Message ({selectedOrders?.length})
              </Button>
              <Button variant="default" size="sm">
                <Icon name="Package" size={16} className="mr-2" />
                Update Status
              </Button>
            </div>
          )}
        </div>

        {/* Tabs */}
        <div className="flex items-center space-x-1 mt-4 bg-muted rounded-lg p-1">
          {tabs?.map((tab) => (
            <button
              key={tab?.id}
              onClick={() => setActiveTab(tab?.id)}
              className={`flex items-center space-x-2 px-4 py-2 text-sm font-medium rounded-md transition-colors duration-200 ${
                activeTab === tab?.id
                  ? 'bg-background text-foreground shadow-warm-sm'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <span>{tab?.label}</span>
              <span className="bg-primary text-primary-foreground text-xs px-2 py-1 rounded-full">
                {tab?.count}
              </span>
            </button>
          ))}
        </div>
      </div>
      <div className="p-6">
        {filteredOrders?.length === 0 ? (
          <div className="text-center py-12">
            <Icon name="Package" size={48} className="mx-auto text-muted-foreground mb-4" />
            <h4 className="text-lg font-medium text-foreground mb-2">
              No {activeTab} orders
            </h4>
            <p className="text-muted-foreground">
              Orders with {activeTab} status will appear here.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredOrders?.map((order) => (
              <div key={order?.id} className="bg-background border border-border rounded-lg p-4 hover:shadow-warm-sm transition-shadow duration-200">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start space-x-3">
                    <input
                      type="checkbox"
                      checked={selectedOrders?.includes(order?.id)}
                      onChange={() => handleSelectOrder(order?.id)}
                      className="mt-1 rounded border-border"
                    />
                    <div className="w-10 h-10 rounded-full overflow-hidden">
                      <Image
                        src={order?.customerAvatar}
                        alt={order?.customer}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h4 className="font-medium text-foreground">{order?.id}</h4>
                      <p className="text-sm text-muted-foreground">{order?.customer}</p>
                      <p className="text-xs text-muted-foreground">{order?.orderDate}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(order?.status)}`}>
                      {order?.status}
                    </span>
                    <p className="text-lg font-semibold text-foreground mt-1">₹{order?.total}</p>
                  </div>
                </div>

                {/* Products */}
                <div className="space-y-2 mb-4">
                  {order?.products?.map((product, index) => (
                    <div key={index} className="flex items-center space-x-3 p-2 bg-muted rounded-lg">
                      <div className="w-12 h-12 rounded-lg overflow-hidden">
                        <Image
                          src={product?.image}
                          alt={product?.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-foreground text-sm">{product?.name}</p>
                        <p className="text-xs text-muted-foreground">
                          Qty: {product?.quantity} × ₹{product?.price}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Order Details */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 text-sm">
                  <div>
                    <p className="text-muted-foreground">Shipping Address</p>
                    <p className="text-foreground">{order?.shippingAddress}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Payment Method</p>
                    <p className="text-foreground">{order?.paymentMethod}</p>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center justify-end space-x-2 pt-4 border-t border-border">
                  <Button variant="ghost" size="sm">
                    <Icon name="MessageCircle" size={16} className="mr-2" />
                    Message
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Icon name="Eye" size={16} className="mr-2" />
                    View Details
                  </Button>
                  {order?.status === 'pending' && (
                    <Button 
                      variant="default" 
                      size="sm"
                      onClick={() => handleStatusUpdate(order?.id, 'processing')}
                    >
                      <Icon name="Package" size={16} className="mr-2" />
                      Process Order
                    </Button>
                  )}
                  {order?.status === 'processing' && (
                    <Button 
                      variant="default" 
                      size="sm"
                      onClick={() => handleStatusUpdate(order?.id, 'completed')}
                    >
                      <Icon name="Check" size={16} className="mr-2" />
                      Mark Complete
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderManagement;