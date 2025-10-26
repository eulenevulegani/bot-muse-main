import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import Onboarding from "@/components/Onboarding";
import { 
  MetricWidget,
  ChartWidget,
  ActivityWidget,
  QuickActionsWidget,
  PerformanceWidget,
  RecentOrdersWidget
} from "@/components/DashboardWidgets";
import WhatsAppPreview from "@/components/WhatsAppPreview";
import { 
  TrendingUp, 
  Users, 
  ShoppingCart, 
  DollarSign,
  MessageSquare,
  Zap,
  Target,
  Clock,
  CheckCircle,
  AlertCircle
} from "lucide-react";

const Dashboard = () => {
  const [showOnboarding, setShowOnboarding] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  // Mock user and business data for demo
  const user = { email: "demo@botmuse.com", name: "Demo User" };
  const business = { 
    name: "Demo Business", 
    industry: "E-commerce",
    id: "demo-business-1"
  };

  // Show onboarding for demo users
  useState(() => {
    const hasSeenOnboarding = localStorage.getItem('hasSeenOnboarding');
    if (!hasSeenOnboarding) {
      setShowOnboarding(true);
    }
  });

  const handleOnboardingClose = () => {
    setShowOnboarding(false);
    localStorage.setItem('hasSeenOnboarding', 'true');
  };

  // Mock data for widgets
  const mockMetrics = {
    revenue: { value: "$4,250", change: 12.5, type: "increase" as const },
    customers: { value: "1,247", change: 8.3, type: "increase" as const },
    orders: { value: "89", change: -2.1, type: "decrease" as const },
    conversion: { value: "12.5%", change: 5.7, type: "increase" as const }
  };

  const mockActivities = [
    { icon: ShoppingCart, title: "New order received", description: "Order #1234 from John Doe", time: "2 minutes ago", badge: "New" },
    { icon: Users, title: "New customer registered", description: "Sarah Wilson joined", time: "15 minutes ago", badge: null },
    { icon: MessageSquare, title: "Campaign sent", description: "Welcome series to 25 customers", time: "1 hour ago", badge: null },
    { icon: CheckCircle, title: "Order completed", description: "Order #1230 delivered", time: "2 hours ago", badge: null }
  ];

  const mockRecentOrders = [
    { id: "1234", customer: "John Doe", items: 3, total: "$89.50", status: "pending" },
    { id: "1233", customer: "Jane Smith", items: 1, total: "$45.00", status: "processing" },
    { id: "1232", customer: "Mike Johnson", items: 2, total: "$67.50", status: "completed" }
  ];

  const mockPerformance = [
    { label: "Message Delivery Rate", value: "98.5%", percentage: 98.5 },
    { label: "Customer Satisfaction", value: "4.7/5", percentage: 94 },
    { label: "Response Time", value: "2.3 min", percentage: 85 },
    { label: "Conversion Rate", value: "12.5%", percentage: 75 }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Sidebar user={user} business={business} onLogout={() => navigate("/")} />
      
      <div className="lg:ml-64">
        <Header 
          title="Dashboard" 
          subtitle={business ? `Welcome back to ${business.name}` : "Welcome to Bot Muse"}
          showBreadcrumb={false}
          showBackButton={false}
          actions={
            <Button onClick={() => setShowOnboarding(true)} variant="outline" size="sm">
              Take Tour
            </Button>
          }
        />
        
        <main className="container mx-auto px-6 py-8">
          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <MetricWidget
              title="Total Revenue"
              value={mockMetrics.revenue.value}
              change={mockMetrics.revenue.change}
              changeType={mockMetrics.revenue.type}
              icon={DollarSign}
              description="This month"
              action={{ label: "View Details", onClick: () => navigate("/analytics") }}
            />
            <MetricWidget
              title="Total Customers"
              value={mockMetrics.customers.value}
              change={mockMetrics.customers.change}
              changeType={mockMetrics.customers.type}
              icon={Users}
              description="Active customers"
              action={{ label: "View All", onClick: () => navigate("/customers") }}
            />
            <MetricWidget
              title="Orders Today"
              value={mockMetrics.orders.value}
              change={mockMetrics.orders.change}
              changeType={mockMetrics.orders.type}
              icon={ShoppingCart}
              description="Pending: 12"
              action={{ label: "View Orders", onClick: () => navigate("/orders") }}
            />
            <MetricWidget
              title="Conversion Rate"
              value={mockMetrics.conversion.value}
              change={mockMetrics.conversion.change}
              changeType={mockMetrics.conversion.type}
              icon={Target}
              description="Last 30 days"
              action={{ label: "View Analytics", onClick: () => navigate("/analytics") }}
            />
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            {/* Revenue Chart */}
            <div className="lg:col-span-2">
              <ChartWidget title="Revenue Overview" data={[]} />
            </div>
            
            {/* Quick Actions */}
            <QuickActionsWidget />
          </div>

          {/* WhatsApp Preview Section */}
          <div className="mb-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="h-5 w-5 text-green-600" />
                  Live WhatsApp Commerce Preview
                </CardTitle>
                <CardDescription>
                  See how your customers experience end-to-end shopping in WhatsApp
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <WhatsAppPreview 
                    customerName="John Doe"
                    showCheckout={true}
                    showTracking={true}
                  />
                  <div className="space-y-4">
                    <div className="p-4 border rounded-lg">
                      <h4 className="font-semibold mb-2">AI-Powered Features</h4>
                      <ul className="text-sm space-y-1 text-muted-foreground">
                        <li>• Instant product recommendations</li>
                        <li>• Smart cart suggestions</li>
                        <li>• Local payment integration</li>
                        <li>• Real-time order tracking</li>
                      </ul>
                    </div>
                    <div className="p-4 border rounded-lg">
                      <h4 className="font-semibold mb-2">Local Payment Methods</h4>
                      <div className="flex flex-wrap gap-2">
                        <Badge variant="outline">M-Pesa</Badge>
                        <Badge variant="outline">Airtel Money</Badge>
                        <Badge variant="outline">TigoPesa</Badge>
                        <Badge variant="outline">Card</Badge>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Bottom Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Recent Activity */}
            <ActivityWidget title="Recent Activity" activities={mockActivities} />
            
            {/* Performance Metrics */}
            <PerformanceWidget title="Performance" metrics={mockPerformance} />
            
            {/* Recent Orders */}
            <RecentOrdersWidget orders={mockRecentOrders} />
          </div>
        </main>
      </div>

      {/* Onboarding Modal */}
      <Onboarding 
        isOpen={showOnboarding}
        onClose={handleOnboardingClose}
        user={user}
        business={business}
      />
    </div>
  );
};

export default Dashboard;
