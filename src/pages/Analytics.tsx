import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import { 
  ArrowLeft, 
  TrendingUp, 
  TrendingDown,
  Users, 
  MessageSquare, 
  ShoppingCart,
  DollarSign,
  Target,
  Clock,
  Heart,
  Star,
  Eye,
  MousePointer,
  Calendar,
  Download,
  Filter,
  RefreshCw,
  Brain,
  Lightbulb
} from "lucide-react";

const Analytics = () => {
  const [timeRange, setTimeRange] = useState("30d");
  const navigate = useNavigate();
  const { toast } = useToast();

  // Mock analytics data
  const analyticsData = {
    overview: {
      totalRevenue: 12500.00,
      revenueChange: 12.5,
      totalOrders: 89,
      ordersChange: 8.3,
      totalCustomers: 1247,
      customersChange: 15.2,
      conversionRate: 12.5,
      conversionChange: 5.7
    },
    metrics: [
      {
        title: "Message Delivery Rate",
        value: "98.5%",
        change: 2.1,
        trend: "up",
        icon: MessageSquare,
        color: "text-green-600"
      },
      {
        title: "Response Time",
        value: "2.3 min",
        change: -15.2,
        trend: "down",
        icon: Clock,
        color: "text-blue-600"
      },
      {
        title: "Customer Satisfaction",
        value: "4.7/5",
        change: 8.5,
        trend: "up",
        icon: Star,
        color: "text-yellow-600"
      },
      {
        title: "Click-Through Rate",
        value: "15.8%",
        change: 3.2,
        trend: "up",
        icon: MousePointer,
        color: "text-purple-600"
      }
    ],
    topProducts: [
      { name: "Premium T-Shirt", orders: 45, revenue: 1349.55 },
      { name: "Wireless Headphones", orders: 23, revenue: 4599.77 },
      { name: "Smart Watch", orders: 18, revenue: 3599.82 },
      { name: "Laptop Stand", orders: 12, revenue: 359.88 }
    ],
    recentActivity: [
      { action: "New order received", customer: "John Doe", time: "2 minutes ago", type: "order" },
      { action: "Customer message sent", customer: "Jane Smith", time: "5 minutes ago", type: "message" },
      { action: "Campaign delivered", customer: "Mike Johnson", time: "15 minutes ago", type: "campaign" },
      { action: "Product viewed", customer: "Sarah Wilson", time: "1 hour ago", type: "view" }
    ]
  };

  const getTrendIcon = (trend: string) => {
    return trend === "up" ? TrendingUp : TrendingDown;
  };

  const getTrendColor = (trend: string) => {
    return trend === "up" ? "text-green-600" : "text-red-600";
  };

  return (
    <div className="min-h-screen bg-background">
      <Sidebar user={{ name: "John Doe", email: "john@example.com" }} business={{ name: "Bot Muse" }} onLogout={() => navigate("/")} />
      
      <div className="lg:ml-64">
        <Header 
          title="Analytics" 
          subtitle="Track your business performance"
          actions={
            <div className="flex space-x-2">
              <Button variant="outline">
                <Download className="h-4 w-4 mr-2" />
                Export Report
              </Button>
              <Button variant="outline">
                <RefreshCw className="h-4 w-4 mr-2" />
                Refresh
              </Button>
            </div>
          }
        />
        
        <main className="container mx-auto px-6 py-8">

        {/* Time Range Selector */}
        <div className="flex space-x-2 mb-8">
          {["7d", "30d", "90d", "1y"].map((range) => (
            <Button
              key={range}
              variant={timeRange === range ? "default" : "outline"}
              onClick={() => setTimeRange(range)}
            >
              {range === "7d" ? "Last 7 days" : 
               range === "30d" ? "Last 30 days" :
               range === "90d" ? "Last 90 days" : "Last year"}
            </Button>
          ))}
        </div>

        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${analyticsData.overview.totalRevenue.toLocaleString()}</div>
              <div className="flex items-center text-xs text-muted-foreground">
                <TrendingUp className="h-3 w-3 mr-1 text-green-600" />
                <span className="text-green-600">+{analyticsData.overview.revenueChange}%</span>
                <span className="ml-1">from last month</span>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
              <ShoppingCart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{analyticsData.overview.totalOrders}</div>
              <div className="flex items-center text-xs text-muted-foreground">
                <TrendingUp className="h-3 w-3 mr-1 text-green-600" />
                <span className="text-green-600">+{analyticsData.overview.ordersChange}%</span>
                <span className="ml-1">from last month</span>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Customers</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{analyticsData.overview.totalCustomers.toLocaleString()}</div>
              <div className="flex items-center text-xs text-muted-foreground">
                <TrendingUp className="h-3 w-3 mr-1 text-green-600" />
                <span className="text-green-600">+{analyticsData.overview.customersChange}%</span>
                <span className="ml-1">from last month</span>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
              <Target className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{analyticsData.overview.conversionRate}%</div>
              <div className="flex items-center text-xs text-muted-foreground">
                <TrendingUp className="h-3 w-3 mr-1 text-green-600" />
                <span className="text-green-600">+{analyticsData.overview.conversionChange}%</span>
                <span className="ml-1">from last month</span>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Performance Metrics */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Performance Metrics</CardTitle>
                <CardDescription>Key performance indicators for your business</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {analyticsData.metrics.map((metric, index) => {
                    const TrendIcon = getTrendIcon(metric.trend);
                    return (
                      <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center space-x-3">
                          <div className={`p-2 rounded-full bg-gray-100 ${metric.color}`}>
                            <metric.icon className="h-4 w-4" />
                          </div>
                          <div>
                            <h4 className="font-semibold">{metric.title}</h4>
                            <p className="text-sm text-muted-foreground">Current performance</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold">{metric.value}</div>
                          <div className={`flex items-center text-sm ${getTrendColor(metric.trend)}`}>
                            <TrendIcon className="h-3 w-3 mr-1" />
                            {metric.change > 0 ? "+" : ""}{metric.change}%
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Latest customer interactions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {analyticsData.recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">{activity.action}</p>
                      <p className="text-xs text-muted-foreground">{activity.customer}</p>
                      <p className="text-xs text-muted-foreground">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Top Products */}
        <Card>
          <CardHeader>
            <CardTitle>Top Performing Products</CardTitle>
            <CardDescription>Your best-selling products this period</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {analyticsData.topProducts.map((product, index) => (
                <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-semibold">
                      {index + 1}
                    </div>
                    <div>
                      <h4 className="font-semibold">{product.name}</h4>
                      <p className="text-sm text-muted-foreground">{product.orders} orders</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold">${product.revenue.toFixed(2)}</div>
                    <p className="text-sm text-muted-foreground">Revenue</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        </main>
      </div>
    </div>
  );
};

export default Analytics;