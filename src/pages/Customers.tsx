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
  MessageSquare,
  Phone,
  Mail,
  Star,
  TrendingUp,
  Users,
  Plus,
  RefreshCw,
  Eye,
  Edit,
  Tag,
  Calendar,
  DollarSign
} from "lucide-react";

const Customers = () => {
  const [customers, setCustomers] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [segmentFilter, setSegmentFilter] = useState("all");
  const [selectedCustomer, setSelectedCustomer] = useState<any>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    loadCustomers();
  }, []);

  const loadCustomers = async () => {
    // Mock data for demo
    const mockCustomers = [
      {
        id: "CUST-001",
        name: "John Doe",
        email: "john@example.com",
        phone: "+1 234 567 8900",
        segment: "VIP",
        total_orders: 5,
        total_spent: 1250.00,
        last_order: "2024-01-15T10:30:00Z",
        status: "active",
        tags: ["High Value", "Frequent Buyer"]
      },
      {
        id: "CUST-002",
        name: "Jane Smith",
        email: "jane@example.com",
        phone: "+1 234 567 8901",
        segment: "Regular",
        total_orders: 3,
        total_spent: 450.00,
        last_order: "2024-01-14T15:45:00Z",
        status: "active",
        tags: ["New Customer"]
      },
      {
        id: "CUST-003",
        name: "Mike Johnson",
        email: "mike@example.com",
        phone: "+1 234 567 8902",
        segment: "New",
        total_orders: 1,
        total_spent: 89.97,
        last_order: "2024-01-13T09:15:00Z",
        status: "active",
        tags: ["First Time Buyer"]
      },
      {
        id: "CUST-004",
        name: "Sarah Wilson",
        email: "sarah@example.com",
        phone: "+1 234 567 8903",
        segment: "VIP",
        total_orders: 8,
        total_spent: 2100.00,
        last_order: "2024-01-12T14:20:00Z",
        status: "active",
        tags: ["VIP", "Loyal Customer"]
      }
    ];
    setCustomers(mockCustomers);
  };

  const getSegmentColor = (segment: string) => {
    switch (segment) {
      case "VIP": return "bg-purple-100 text-purple-800";
      case "Regular": return "bg-blue-100 text-blue-800";
      case "New": return "bg-green-100 text-green-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const filteredCustomers = customers.filter(customer => {
    const matchesSearch = customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         customer.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSegment = segmentFilter === "all" || customer.segment === segmentFilter;
    return matchesSearch && matchesSegment;
  });

  const handleSendMessage = async (customerId: string) => {
    toast({
      title: "Message sent",
      description: "WhatsApp message has been sent to the customer.",
    });
  };

  const handleAddTag = async (customerId: string, tag: string) => {
    setCustomers(prev => prev.map(customer => 
      customer.id === customerId 
        ? { ...customer, tags: [...customer.tags, tag] }
        : customer
    ));
    toast({
      title: "Tag added",
      description: `Tag "${tag}" has been added to the customer.`,
    });
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
          title="Customers" 
          subtitle="Manage your customer relationships"
          actions={
            <div className="flex space-x-2">
              <Button variant="outline">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add Customer
              </Button>
            </div>
          }
        />
        
        <main className="container mx-auto px-6 py-8">

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Customers</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{customers.length}</div>
              <p className="text-xs text-muted-foreground">+12% from last month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">VIP Customers</CardTitle>
              <Star className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {customers.filter(c => c.segment === "VIP").length}
              </div>
              <p className="text-xs text-muted-foreground">High-value customers</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">New This Month</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {customers.filter(c => c.segment === "New").length}
              </div>
              <p className="text-xs text-muted-foreground">+3 from last month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                ${customers.reduce((sum, c) => sum + c.total_spent, 0).toFixed(2)}
              </div>
              <p className="text-xs text-muted-foreground">From all customers</p>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search customers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={segmentFilter} onValueChange={setSegmentFilter}>
            <SelectTrigger className="w-full sm:w-[200px]">
              <SelectValue placeholder="Filter by segment" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Customers</SelectItem>
              <SelectItem value="VIP">VIP</SelectItem>
              <SelectItem value="Regular">Regular</SelectItem>
              <SelectItem value="New">New</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Customers List */}
        <div className="space-y-4">
          {filteredCustomers.map((customer) => (
            <Card key={customer.id} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-lg">{customer.name}</CardTitle>
                    <CardDescription>
                      {customer.email} • {customer.phone}
                    </CardDescription>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge className={getSegmentColor(customer.segment)}>
                      {customer.segment}
                    </Badge>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setSelectedCustomer(customer)}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div>
                    <h4 className="font-semibold mb-2">Orders</h4>
                    <div className="text-2xl font-bold">{customer.total_orders}</div>
                    <p className="text-sm text-muted-foreground">
                      Last: {new Date(customer.last_order).toLocaleDateString()}
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Total Spent</h4>
                    <div className="text-2xl font-bold">${customer.total_spent.toFixed(2)}</div>
                    <p className="text-sm text-muted-foreground">Lifetime value</p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Tags</h4>
                    <div className="flex flex-wrap gap-1">
                      {customer.tags.map((tag: string, index: number) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Actions</h4>
                    <div className="flex space-x-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleSendMessage(customer.id)}
                      >
                        <MessageSquare className="h-4 w-4 mr-1" />
                        Message
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleAddTag(customer.id, "Follow Up")}
                      >
                        <Tag className="h-4 w-4 mr-1" />
                        Tag
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredCustomers.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold mb-2">No customers found</h3>
            <p className="text-muted-foreground">
              {searchTerm || segmentFilter !== "all" 
                ? "Try adjusting your search or filter criteria."
                : "Customers will appear here when they make purchases."
              }
            </p>
          </div>
        )}
        </main>
      </div>
    </div>
  );
};

export default Customers;