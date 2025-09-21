import React, { useState, useEffect } from 'react';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';
import { multimodalRAG } from '../lib/multimodalRag';
import Icon from './AppIcon';

const MarketplaceAnalytics = ({ 
  className = "",
  showFullDashboard = true,
  userRole = 'buyer' // 'buyer', 'seller', 'admin'
}) => {
  const [analyticsData, setAnalyticsData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [timeRange, setTimeRange] = useState('7d');

  useEffect(() => {
    const loadAnalytics = async () => {
      setIsLoading(true);
      try {
        // Simulate analytics data - in production, this would come from your analytics service
        const mockAnalytics = {
          overview: {
            totalProducts: 1247,
            totalArtisans: 156,
            totalSales: 89234,
            avgRating: 4.7,
            regionDistribution: [
              { name: 'Rajasthan', value: 25, products: 312 },
              { name: 'West Bengal', value: 20, products: 249 },
              { name: 'Tamil Nadu', value: 18, products: 224 },
              { name: 'Uttarakhand', value: 12, products: 149 },
              { name: 'Kerala', value: 10, products: 125 },
              { name: 'Others', value: 15, products: 188 }
            ],
            categoryDistribution: [
              { name: 'Textiles', value: 35, sales: 31232 },
              { name: 'Pottery', value: 20, sales: 17847 },
              { name: 'Jewelry', value: 18, sales: 16062 },
              { name: 'Woodcraft', value: 15, sales: 13385 },
              { name: 'Metalwork', value: 12, sales: 10708 }
            ],
            salesTrend: [
              { date: '2024-01-01', sales: 12500, orders: 156 },
              { date: '2024-01-08', sales: 15230, orders: 198 },
              { date: '2024-01-15', sales: 18945, orders: 234 },
              { date: '2024-01-22', sales: 16780, orders: 203 },
              { date: '2024-01-29', sales: 21450, orders: 267 }
            ]
          },
          fairness: {
            exposureEquality: {
              score: 78,
              details: {
                smallArtisans: { exposure: 65, sales: 42 },
                mediumArtisans: { exposure: 82, sales: 71 },
                establishedSellers: { exposure: 95, sales: 89 }
              }
            },
            regionalBalance: {
              score: 85,
              underrepresented: ['Nagaland', 'Mizoram', 'Tripura'],
              overrepresented: ['Rajasthan', 'Gujarat']
            },
            priceEquity: {
              score: 72,
              avgPriceByRegion: [
                { region: 'Rajasthan', avgPrice: 2450, orders: 156 },
                { region: 'West Bengal', avgPrice: 1890, orders: 134 },
                { region: 'Tamil Nadu', avgPrice: 2100, orders: 142 },
                { region: 'Uttarakhand', avgPrice: 2850, orders: 98 }
              ]
            },
            conversionRates: [
              { artisanType: 'New Artisans', views: 1000, conversions: 45, rate: 4.5 },
              { artisanType: 'Established Sellers', views: 5000, conversions: 350, rate: 7.0 },
              { artisanType: 'Master Artisans', views: 3000, conversions: 270, rate: 9.0 }
            ]
          },
          cultural: {
            languageUsage: [
              { language: 'Hindi', users: 45, queries: 2341 },
              { language: 'English', users: 30, queries: 1567 },
              { language: 'Tamil', users: 12, queries: 623 },
              { language: 'Bengali', users: 8, queries: 412 },
              { language: 'Marathi', users: 5, queries: 267 }
            ],
            culturalAdaptation: {
              score: 88,
              adaptedDescriptions: 423,
              resonanceImprovement: 34,
              userSatisfaction: 4.6
            },
            crossRegionalInterest: [
              { sourceRegion: 'Delhi', targetRegion: 'Rajasthan', interest: 85 },
              { sourceRegion: 'Mumbai', targetRegion: 'West Bengal', interest: 72 },
              { sourceRegion: 'Chennai', targetRegion: 'Kerala', interest: 68 },
              { sourceRegion: 'Bangalore', targetRegion: 'Karnataka', interest: 91 }
            ]
          },
          searchAnalytics: multimodalRAG.getSearchAnalytics(),
          growth: {
            monthlyGrowth: [
              { month: 'Oct', newArtisans: 12, newProducts: 89, revenue: 45000 },
              { month: 'Nov', newArtisans: 18, newProducts: 134, revenue: 67000 },
              { month: 'Dec', newArtisans: 25, newProducts: 176, revenue: 89000 },
              { month: 'Jan', newArtisans: 31, newProducts: 203, revenue: 112000 }
            ],
            retentionRate: 85,
            customerSatisfaction: 4.7
          }
        };

        setAnalyticsData(mockAnalytics);
      } catch (error) {
        console.error('Error loading analytics:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadAnalytics();
  }, [timeRange]);

  const COLORS = ['#8B5CF6', '#06B6D4', '#10B981', '#F59E0B', '#EF4444', '#6366F1'];

  const renderMetricCard = (title, value, change, icon, color = 'blue') => (
    <div className="bg-white rounded-lg p-4 border border-gray-200 shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
          {change && (
            <p className={`text-sm flex items-center mt-1 ${
              change > 0 ? 'text-green-600' : 'text-red-600'
            }`}>
              <Icon 
                name={change > 0 ? 'TrendingUp' : 'TrendingDown'} 
                size={16} 
                className="mr-1" 
              />
              {Math.abs(change)}%
            </p>
          )}
        </div>
        <div className={`p-3 bg-${color}-100 rounded-full`}>
          <Icon name={icon} size={24} className={`text-${color}-600`} />
        </div>
      </div>
    </div>
  );

  const renderFairnessScore = (title, score, description) => (
    <div className="bg-white rounded-lg p-4 border border-gray-200">
      <div className="flex items-center justify-between mb-2">
        <h4 className="font-medium text-gray-900">{title}</h4>
        <div className="flex items-center space-x-2">
          <div className="w-12 h-2 bg-gray-200 rounded-full">
            <div 
              className={`h-2 rounded-full ${
                score >= 80 ? 'bg-green-500' : 
                score >= 60 ? 'bg-yellow-500' : 'bg-red-500'
              }`}
              style={{ width: `${score}%` }}
            />
          </div>
          <span className="text-sm font-medium text-gray-600">{score}%</span>
        </div>
      </div>
      <p className="text-sm text-gray-600">{description}</p>
    </div>
  );

  if (isLoading) {
    return (
      <div className={`analytics-loading border rounded-lg p-8 bg-gradient-to-r from-purple-50 to-blue-50 border-purple-200 ${className}`}>
        <div className="flex items-center justify-center space-x-3">
          <div className="animate-spin w-8 h-8 border-2 border-purple-500 border-t-transparent rounded-full"></div>
          <span className="text-purple-700 font-medium">Loading analytics...</span>
        </div>
      </div>
    );
  }

  if (!analyticsData) return null;

  return (
    <div className={`marketplace-analytics ${className}`}>
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Marketplace Analytics</h2>
            <p className="text-gray-600">Cultural marketplace insights and fairness metrics</p>
          </div>
          
          <div className="flex items-center space-x-4">
            <select 
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 text-sm"
            >
              <option value="7d">Last 7 days</option>
              <option value="30d">Last 30 days</option>
              <option value="90d">Last 90 days</option>
            </select>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200">
          <div className="flex space-x-0">
            {[
              { id: 'overview', label: 'Overview', icon: 'BarChart3' },
              { id: 'fairness', label: 'Fairness', icon: 'Scale' },
              { id: 'cultural', label: 'Cultural', icon: 'Globe' },
              { id: 'search', label: 'Search', icon: 'Search' },
              { id: 'growth', label: 'Growth', icon: 'TrendingUp' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === tab.id
                    ? 'border-purple-500 text-purple-600 bg-purple-50'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                }`}
              >
                <Icon name={tab.icon} size={14} />
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Tab Content */}
      <div className="space-y-6">
        {activeTab === 'overview' && (
          <>
            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {renderMetricCard('Total Products', analyticsData.overview.totalProducts.toLocaleString(), 12, 'Package', 'purple')}
              {renderMetricCard('Active Artisans', analyticsData.overview.totalArtisans, 8, 'Users', 'blue')}
              {renderMetricCard('Total Sales', `₹${(analyticsData.overview.totalSales / 1000).toFixed(0)}K`, 15, 'DollarSign', 'green')}
              {renderMetricCard('Avg Rating', analyticsData.overview.avgRating.toFixed(1), null, 'Star', 'yellow')}
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Regional Distribution */}
              <div className="bg-white rounded-lg p-6 border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Regional Distribution</h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={analyticsData.overview.regionDistribution}
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, value }) => `${name}: ${value}%`}
                      >
                        {analyticsData.overview.regionDistribution.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => [`${value}%`, 'Distribution']} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Sales Trend */}
              <div className="bg-white rounded-lg p-6 border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Sales Trend</h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={analyticsData.overview.salesTrend}>
                      <defs>
                        <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.3}/>
                          <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0.1}/>
                        </linearGradient>
                      </defs>
                      <XAxis dataKey="date" tick={false} />
                      <YAxis />
                      <CartesianGrid strokeDasharray="3 3" />
                      <Tooltip formatter={(value) => [`₹${value.toLocaleString()}`, 'Sales']} />
                      <Area 
                        type="monotone" 
                        dataKey="sales" 
                        stroke="#8B5CF6" 
                        fillOpacity={1} 
                        fill="url(#colorSales)" 
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </>
        )}

        {activeTab === 'fairness' && (
          <div className="space-y-6">
            {/* Fairness Scores */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {renderFairnessScore(
                'Exposure Equality', 
                analyticsData.fairness.exposureEquality.score,
                'How evenly product exposure is distributed across seller sizes'
              )}
              {renderFairnessScore(
                'Regional Balance', 
                analyticsData.fairness.regionalBalance.score,
                'Representation balance across different regions'
              )}
              {renderFairnessScore(
                'Price Equity', 
                analyticsData.fairness.priceEquity.score,
                'Fair pricing opportunities across regions'
              )}
            </div>

            {/* Detailed Fairness Metrics */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Seller Size Distribution */}
              <div className="bg-white rounded-lg p-6 border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Seller Size Equity</h3>
                <div className="space-y-4">
                  {Object.entries(analyticsData.fairness.exposureEquality.details).map(([type, data]) => (
                    <div key={type} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <span className="font-medium text-gray-900 capitalize">
                          {type.replace(/([A-Z])/g, ' $1').trim()}
                        </span>
                        <div className="flex space-x-4 text-sm text-gray-600 mt-1">
                          <span>Exposure: {data.exposure}%</span>
                          <span>Sales: {data.sales}%</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="w-16 h-2 bg-gray-200 rounded-full mb-1">
                          <div 
                            className="h-2 bg-purple-500 rounded-full" 
                            style={{ width: `${data.exposure}%` }}
                          />
                        </div>
                        <div className="w-16 h-2 bg-gray-200 rounded-full">
                          <div 
                            className="h-2 bg-green-500 rounded-full" 
                            style={{ width: `${data.sales}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Conversion Rates by Artisan Type */}
              <div className="bg-white rounded-lg p-6 border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Conversion Rates</h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={analyticsData.fairness.conversionRates}>
                      <XAxis dataKey="artisanType" />
                      <YAxis />
                      <CartesianGrid strokeDasharray="3 3" />
                      <Tooltip formatter={(value, name) => [
                        name === 'rate' ? `${value}%` : value, 
                        name === 'rate' ? 'Conversion Rate' : name === 'views' ? 'Views' : 'Conversions'
                      ]} />
                      <Bar dataKey="rate" fill="#8B5CF6" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

            {/* Regional Price Analysis */}
            <div className="bg-white rounded-lg p-6 border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Regional Price Equity</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={analyticsData.fairness.priceEquity.avgPriceByRegion}>
                    <XAxis dataKey="region" />
                    <YAxis />
                    <CartesianGrid strokeDasharray="3 3" />
                    <Tooltip formatter={(value) => [`₹${value}`, 'Average Price']} />
                    <Bar dataKey="avgPrice" fill="#06B6D4" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'cultural' && (
          <div className="space-y-6">
            {/* Cultural Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white rounded-lg p-4 border border-gray-200">
                <div className="flex items-center space-x-2 mb-2">
                  <Icon name="Globe" size={20} className="text-blue-600" />
                  <h3 className="font-semibold text-gray-900">Cultural Adaptation</h3>
                </div>
                <div className="text-2xl font-bold text-blue-600 mb-1">
                  {analyticsData.cultural.culturalAdaptation.score}%
                </div>
                <p className="text-sm text-gray-600">
                  {analyticsData.cultural.culturalAdaptation.adaptedDescriptions} descriptions adapted
                </p>
              </div>

              <div className="bg-white rounded-lg p-4 border border-gray-200">
                <div className="flex items-center space-x-2 mb-2">
                  <Icon name="Heart" size={20} className="text-green-600" />
                  <h3 className="font-semibold text-gray-900">User Satisfaction</h3>
                </div>
                <div className="text-2xl font-bold text-green-600 mb-1">
                  {analyticsData.cultural.culturalAdaptation.userSatisfaction}/5
                </div>
                <p className="text-sm text-gray-600">
                  +{analyticsData.cultural.culturalAdaptation.resonanceImprovement}% resonance improvement
                </p>
              </div>
            </div>

            {/* Language Usage */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white rounded-lg p-6 border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Language Usage</h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={analyticsData.cultural.languageUsage}
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="users"
                        label={({ language, users }) => `${language}: ${users}%`}
                      >
                        {analyticsData.cultural.languageUsage.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => [`${value}%`, 'Users']} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Cross-Regional Interest */}
              <div className="bg-white rounded-lg p-6 border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Cross-Regional Interest</h3>
                <div className="space-y-3">
                  {analyticsData.cultural.crossRegionalInterest.map((item, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="text-sm">
                        <span className="font-medium">{item.sourceRegion}</span>
                        <span className="text-gray-500"> → </span>
                        <span className="font-medium">{item.targetRegion}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-16 h-2 bg-gray-200 rounded-full">
                          <div 
                            className="h-2 bg-orange-500 rounded-full" 
                            style={{ width: `${item.interest}%` }}
                          />
                        </div>
                        <span className="text-sm font-medium text-gray-600">{item.interest}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'search' && (
          <div className="space-y-6">
            {/* Search Overview */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {renderMetricCard(
                'Total Searches', 
                analyticsData.searchAnalytics.totalSearches || 0, 
                18, 
                'Search', 
                'indigo'
              )}
              {renderMetricCard(
                'Avg Results', 
                (analyticsData.searchAnalytics.averageResults || 0).toFixed(1), 
                5, 
                'Target', 
                'cyan'
              )}
              {renderMetricCard(
                'Success Rate', 
                `${((analyticsData.searchAnalytics.searchEffectiveness || 0) * 100).toFixed(1)}%`, 
                8, 
                'CheckCircle', 
                'green'
              )}
              {renderMetricCard(
                'Recent Searches', 
                analyticsData.searchAnalytics.recentSearches || 0, 
                null, 
                'Clock', 
                'purple'
              )}
            </div>

            {/* Popular Queries */}
            <div className="bg-white rounded-lg p-6 border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Popular Search Queries</h3>
              <div className="space-y-3">
                {(analyticsData.searchAnalytics.popularQueries || []).map((query, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="text-gray-900">{query.query}</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-24 h-2 bg-gray-200 rounded-full">
                        <div 
                          className="h-2 bg-indigo-500 rounded-full" 
                          style={{ width: `${(query.count / Math.max(...analyticsData.searchAnalytics.popularQueries.map(q => q.count))) * 100}%` }}
                        />
                      </div>
                      <span className="text-sm font-medium text-gray-600">{query.count}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'growth' && (
          <div className="space-y-6">
            {/* Growth Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {renderMetricCard('Retention Rate', `${analyticsData.growth.retentionRate}%`, 3, 'Users', 'green')}
              {renderMetricCard('Customer Satisfaction', analyticsData.growth.customerSatisfaction.toFixed(1), null, 'Star', 'yellow')}
              {renderMetricCard('Monthly Revenue', '₹112K', 25, 'TrendingUp', 'purple')}
            </div>

            {/* Growth Trend */}
            <div className="bg-white rounded-lg p-6 border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Growth Trend</h3>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={analyticsData.growth.monthlyGrowth}>
                    <XAxis dataKey="month" />
                    <YAxis yAxisId="left" />
                    <YAxis yAxisId="right" orientation="right" />
                    <CartesianGrid strokeDasharray="3 3" />
                    <Tooltip />
                    <Bar yAxisId="left" dataKey="newArtisans" fill="#8B5CF6" name="New Artisans" />
                    <Line yAxisId="right" type="monotone" dataKey="revenue" stroke="#06B6D4" strokeWidth={3} name="Revenue" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MarketplaceAnalytics;
