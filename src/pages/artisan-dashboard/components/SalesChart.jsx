import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import Icon from '../../../components/AppIcon';


const SalesChart = () => {
  const [chartType, setChartType] = useState('line');
  const [timeRange, setTimeRange] = useState('7d');

  const salesData = [
    { name: 'Mon', sales: 4200, orders: 12 },
    { name: 'Tue', sales: 3800, orders: 10 },
    { name: 'Wed', sales: 5200, orders: 15 },
    { name: 'Thu', sales: 4600, orders: 13 },
    { name: 'Fri', sales: 6800, orders: 18 },
    { name: 'Sat', sales: 8200, orders: 22 },
    { name: 'Sun', sales: 7400, orders: 20 }
  ];

  const monthlyData = [
    { name: 'Jan', sales: 45000, orders: 120 },
    { name: 'Feb', sales: 52000, orders: 140 },
    { name: 'Mar', sales: 48000, orders: 130 },
    { name: 'Apr', sales: 61000, orders: 165 },
    { name: 'May', sales: 55000, orders: 150 },
    { name: 'Jun', sales: 67000, orders: 180 }
  ];

  const getCurrentData = () => {
    return timeRange === '7d' ? salesData : monthlyData;
  };

  const timeRangeOptions = [
    { value: '7d', label: '7 Days' },
    { value: '30d', label: '30 Days' },
    { value: '6m', label: '6 Months' }
  ];

  return (
    <div className="bg-card border border-border rounded-lg shadow-warm-sm">
      <div className="p-6 border-b border-border">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
          <h3 className="text-lg font-heading font-semibold text-foreground">
            Sales Analytics
          </h3>
          <div className="flex items-center space-x-3">
            {/* Time Range Selector */}
            <div className="flex items-center space-x-1 bg-muted rounded-lg p-1">
              {timeRangeOptions?.map((option) => (
                <button
                  key={option?.value}
                  onClick={() => setTimeRange(option?.value)}
                  className={`px-3 py-1 text-sm font-medium rounded-md transition-colors duration-200 ${
                    timeRange === option?.value
                      ? 'bg-background text-foreground shadow-warm-sm'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {option?.label}
                </button>
              ))}
            </div>
            
            {/* Chart Type Toggle */}
            <div className="flex items-center space-x-1 bg-muted rounded-lg p-1">
              <button
                onClick={() => setChartType('line')}
                className={`p-2 rounded-md transition-colors duration-200 ${
                  chartType === 'line' ?'bg-background text-foreground shadow-warm-sm' :'text-muted-foreground hover:text-foreground'
                }`}
              >
                <Icon name="TrendingUp" size={16} />
              </button>
              <button
                onClick={() => setChartType('bar')}
                className={`p-2 rounded-md transition-colors duration-200 ${
                  chartType === 'bar' ?'bg-background text-foreground shadow-warm-sm' :'text-muted-foreground hover:text-foreground'
                }`}
              >
                <Icon name="BarChart3" size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="p-6">
        <div className="h-80 w-full">
          <ResponsiveContainer width="100%" height="100%">
            {chartType === 'line' ? (
              <LineChart data={getCurrentData()}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                <XAxis 
                  dataKey="name" 
                  stroke="var(--color-muted-foreground)"
                  fontSize={12}
                />
                <YAxis 
                  stroke="var(--color-muted-foreground)"
                  fontSize={12}
                />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: 'var(--color-popover)',
                    border: '1px solid var(--color-border)',
                    borderRadius: '8px',
                    color: 'var(--color-foreground)'
                  }}
                  formatter={(value, name) => [
                    name === 'sales' ? `₹${value}` : value,
                    name === 'sales' ? 'Sales' : 'Orders'
                  ]}
                />
                <Line 
                  type="monotone" 
                  dataKey="sales" 
                  stroke="var(--color-primary)" 
                  strokeWidth={3}
                  dot={{ fill: 'var(--color-primary)', strokeWidth: 2, r: 4 }}
                  activeDot={{ r: 6, stroke: 'var(--color-primary)', strokeWidth: 2 }}
                />
                <Line 
                  type="monotone" 
                  dataKey="orders" 
                  stroke="var(--color-accent)" 
                  strokeWidth={2}
                  dot={{ fill: 'var(--color-accent)', strokeWidth: 2, r: 3 }}
                />
              </LineChart>
            ) : (
              <BarChart data={getCurrentData()}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                <XAxis 
                  dataKey="name" 
                  stroke="var(--color-muted-foreground)"
                  fontSize={12}
                />
                <YAxis 
                  stroke="var(--color-muted-foreground)"
                  fontSize={12}
                />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: 'var(--color-popover)',
                    border: '1px solid var(--color-border)',
                    borderRadius: '8px',
                    color: 'var(--color-foreground)'
                  }}
                  formatter={(value, name) => [
                    name === 'sales' ? `₹${value}` : value,
                    name === 'sales' ? 'Sales' : 'Orders'
                  ]}
                />
                <Bar 
                  dataKey="sales" 
                  fill="var(--color-primary)" 
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            )}
          </ResponsiveContainer>
        </div>

        {/* Chart Legend */}
        <div className="flex items-center justify-center space-x-6 mt-4 pt-4 border-t border-border">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-primary rounded-full"></div>
            <span className="text-sm text-muted-foreground">Sales Revenue</span>
          </div>
          {chartType === 'line' && (
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-accent rounded-full"></div>
              <span className="text-sm text-muted-foreground">Order Count</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SalesChart;