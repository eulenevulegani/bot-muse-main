import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import { 
  ArrowLeft, 
  Search,
  Filter,
  Download,
  Eye,
  MessageSquare,
  Phone,
  Package,
  Truck,
  CheckCircle,
  Clock,
  AlertCircle,
  XCircle,
  Plus,
  RefreshCw,
  CreditCard,
  Smartphone,
  Banknote
} from "lucide-react";

const Orders = () => {
  const [orders, setOrders] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedOrder, setSelectedOrder] = useState<any>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    // Mock data for demo
    const mockOrders = [
      {
        id: "ORD-001",
        customer: {
          name: "John Doe",
          email: "john@example.com",
          phone: "+1 234 567 8900"
        },
        items: [
          { name: "Premium T-Shirt", quantity: 2, price: 29.99 },
          { name: "Wireless Headphones", quantity: 1, price: 199.99 }
        ],
        total: 259.97,
        status: "pending",
        created_at: "2024-01-15T10:30:00Z",
        shipping_address: "123 Main St, New York, NY 10001"
      },
      {
        id: "ORD-002",
        customer: {
          name: "Jane Smith",
          email: "jane@example.com",
          phone: "+1 234 567 8901"
        },
        items: [
          { name: "Wireless Headphones", quantity: 1, price: 199.99 }
        ],
        total: 199.99,
        status: "processing",
        created_at: "2024-01-14T15:45:00Z",
        shipping_address: "456 Oak Ave, Los Angeles, CA 90210"
      },
      {
        id: "ORD-003",
        customer: {
          name: "Mike Johnson",
          email: "mike@example.com",
          phone: "+1 234 567 8902"
        },
        items: [
          { name: "Premium T-Shirt", quantity: 3, price: 29.99 }
        ],
        total: 89.97,
        status: "completed",
        created_at: "2024-01-13T09:15:00Z",
        shipping_address: "789 Pine St, Chicago, IL 60601"
      }
    ];
    setOrders(mockOrders);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending": return "bg-yellow-100 text-yellow-800";
      case "processing": return "bg-blue-100 text-blue-800";
      case "shipped": return "bg-purple-100 text-purple-800";
      case "completed": return "bg-green-100 text-green-800";
      case "cancelled": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending": return Clock;
      case "processing": return Package;
      case "shipped": return Truck;
      case "completed": return CheckCircle;
      case "cancelled": return XCircle;
      default: return AlertCircle;
    }
  };

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleStatusUpdate = async (orderId: string, newStatus: string) => {
    try {
      setOrders(prev => prev.map(order => 
        order.id === orderId ? { ...order, status: newStatus } : order
      ));
      toast({
        title: "Order updated",
        description: `Order status changed to ${newStatus}`,
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  // Mock user and business data for demo
  const user = { email: "demo@botmuse.com", name: "Demo User" };
  const business = { 
    name: "Demo Business", 
    industry: "E-commerce",
    id: "demo-business-1"
  };

  return (
    <div className="min-h-screen bg-background">
      <Sidebar user={user} business={business} onLogout={() => navigate("/")} />
      
      <div className="lg:ml-64">
        <Header 
          title="Orders" 
          subtitle="Manage your customer orders"
          actions={
            <div className="flex space-x-2">
              <Button variant="outline">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                New Order
              </Button>
            </div>
          }
        />
        
        <main className="container mx-auto px-6 py-8">

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search orders..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full sm:w-[200px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Orders</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="processing">Processing</SelectItem>
              <SelectItem value="shipped">Shipped</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="cancelled">Cancelled</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Orders List */}
        <div className="space-y-4">
          {filteredOrders.map((order) => {
            const StatusIcon = getStatusIcon(order.status);
            return (
              <Card key={order.id} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-lg">{order.id}</CardTitle>
                      <CardDescription>
                        {order.customer.name} • {new Date(order.created_at).toLocaleDateString()}
                      </CardDescription>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge className={getStatusColor(order.status)}>
                        <StatusIcon className="h-3 w-3 mr-1" />
                        {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                      </Badge>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setSelectedOrder(order)}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <h4 className="font-semibold mb-2">Items</h4>
                      <div className="space-y-1">
                        {order.items.map((item: any, index: number) => (
                          <div key={index} className="text-sm text-muted-foreground">
                            {item.quantity}x {item.name}
                          </div>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">Customer</h4>
                      <div className="text-sm text-muted-foreground">
                        <div>{order.customer.name}</div>
                        <div>{order.customer.email}</div>
                        <div>{order.customer.phone}</div>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">Total</h4>
                      <div className="text-2xl font-bold">${order.total.toFixed(2)}</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between mt-4 pt-4 border-t">
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">
                        <MessageSquare className="h-4 w-4 mr-2" />
                        Message
                      </Button>
                      <Button variant="outline" size="sm">
                        <Phone className="h-4 w-4 mr-2" />
                        Call
                      </Button>
                    </div>
                    <div className="flex space-x-2">
                      {order.status === "pending" && (
                        <Button 
                          size="sm" 
                          onClick={() => handleStatusUpdate(order.id, "processing")}
                        >
                          Process Order
                        </Button>
                      )}
                      {order.status === "processing" && (
                        <Button 
                          size="sm" 
                          onClick={() => handleStatusUpdate(order.id, "shipped")}
                        >
                          Mark Shipped
                        </Button>
                      )}
                      {order.status === "shipped" && (
                        <Button 
                          size="sm" 
                          onClick={() => handleStatusUpdate(order.id, "completed")}
                        >
                          Mark Complete
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {filteredOrders.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
              <Package className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold mb-2">No orders found</h3>
            <p className="text-muted-foreground">
              {searchTerm || statusFilter !== "all" 
                ? "Try adjusting your search or filter criteria."
                : "Orders will appear here when customers place them."
              }
            </p>
          </div>
        )}
        </main>
      </div>
    </div>
  );
};

export default Orders;