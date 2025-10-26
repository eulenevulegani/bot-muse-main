import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import AIAssistant from "@/components/AIAssistant";
import { 
  ArrowLeft, 
  Plus, 
  Play, 
  Pause, 
  Edit, 
  Trash2, 
  Users, 
  MessageSquare, 
  Calendar,
  TrendingUp,
  Clock,
  Target,
  Zap,
  Bot,
  Mail,
  Phone,
  ShoppingCart,
  Heart,
  Star
} from "lucide-react";

const Automation = () => {
  const [campaigns, setCampaigns] = useState<any[]>([]);
  const [workflows, setWorkflows] = useState<any[]>([]);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    // Mock data for demo
    const mockCampaigns = [
      {
        id: "CAMP-001",
        name: "Welcome Series",
        type: "Email",
        status: "active",
        recipients: 1250,
        open_rate: 78.5,
        click_rate: 12.3,
        created_at: "2024-01-10T10:00:00Z",
        description: "Welcome new customers with a series of onboarding emails"
      },
      {
        id: "CAMP-002", 
        name: "Abandoned Cart Recovery",
        type: "WhatsApp",
        status: "paused",
        recipients: 89,
        open_rate: 92.1,
        click_rate: 18.7,
        created_at: "2024-01-08T14:30:00Z",
        description: "Remind customers about items left in their cart"
      },
      {
        id: "CAMP-003",
        name: "Product Recommendations",
        type: "Email",
        status: "active",
        recipients: 2100,
        open_rate: 65.2,
        click_rate: 8.9,
        created_at: "2024-01-05T09:15:00Z",
        description: "Send personalized product recommendations based on purchase history"
      }
    ];

    const mockWorkflows = [
      {
        id: "WF-001",
        name: "New Customer Onboarding",
        trigger: "Customer Registration",
        status: "active",
        steps: 5,
        last_run: "2024-01-15T16:45:00Z",
        description: "Automated workflow for new customer onboarding"
      },
      {
        id: "WF-002",
        name: "Order Follow-up",
        trigger: "Order Completed",
        status: "active", 
        steps: 3,
        last_run: "2024-01-15T14:20:00Z",
        description: "Follow up with customers after order completion"
      },
      {
        id: "WF-003",
        name: "Customer Support",
        trigger: "Support Ticket Created",
        status: "paused",
        steps: 4,
        last_run: "2024-01-12T11:30:00Z",
        description: "Automated customer support workflow"
      }
    ];

    setCampaigns(mockCampaigns);
    setWorkflows(mockWorkflows);
  };

  const handleToggleCampaign = async (campaignId: string) => {
    setCampaigns(prev => prev.map(campaign => 
      campaign.id === campaignId 
        ? { ...campaign, status: campaign.status === "active" ? "paused" : "active" }
        : campaign
    ));
    toast({
      title: "Campaign updated",
      description: "Campaign status has been changed.",
    });
  };

  const handleToggleWorkflow = async (workflowId: string) => {
    setWorkflows(prev => prev.map(workflow => 
      workflow.id === workflowId 
        ? { ...workflow, status: workflow.status === "active" ? "paused" : "active" }
        : workflow
    ));
    toast({
      title: "Workflow updated", 
      description: "Workflow status has been changed.",
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "bg-green-100 text-green-800";
      case "paused": return "bg-yellow-100 text-yellow-800";
      case "draft": return "bg-gray-100 text-gray-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "Email": return Mail;
      case "WhatsApp": return MessageSquare;
      case "SMS": return Phone;
      default: return MessageSquare;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Sidebar user={{ name: "John Doe", email: "john@example.com" }} business={{ name: "Bot Muse" }} onLogout={() => navigate("/")} />
      
      <div className="lg:ml-64">
        <Header 
          title="Automation" 
          subtitle="Manage your marketing campaigns and workflows"
          actions={
            <div className="flex space-x-2">
              <Button variant="outline">
                <Bot className="h-4 w-4 mr-2" />
                Create Workflow
              </Button>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                New Campaign
              </Button>
            </div>
          }
        />
        
        <main className="container mx-auto px-6 py-8">

        <Tabs defaultValue="campaigns" className="space-y-6">
          <TabsList>
            <TabsTrigger value="campaigns">Campaigns</TabsTrigger>
            <TabsTrigger value="workflows">Workflows</TabsTrigger>
          </TabsList>

          <TabsContent value="campaigns" className="space-y-6">
            {/* AI Assistant Section */}
            <AIAssistant 
              businessType="E-commerce"
              industry="Retail"
              onCampaignGenerated={(campaign) => {
                setCampaigns(prev => [...prev, campaign]);
                toast({
                  title: "Campaign Added!",
                  description: "Your AI-generated campaign has been added to your automation.",
                });
              }}
            />
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {campaigns.map((campaign) => {
                const TypeIcon = getTypeIcon(campaign.type);
                return (
                  <Card key={campaign.id} className="hover:shadow-md transition-shadow">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <TypeIcon className="h-5 w-5 text-primary" />
                          <CardTitle className="text-lg">{campaign.name}</CardTitle>
                        </div>
                        <Badge className={getStatusColor(campaign.status)}>
                          {campaign.status}
                        </Badge>
                      </div>
                      <CardDescription>{campaign.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <p className="text-sm text-muted-foreground">Recipients</p>
                            <p className="text-lg font-semibold">{campaign.recipients.toLocaleString()}</p>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">Open Rate</p>
                            <p className="text-lg font-semibold">{campaign.open_rate}%</p>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>Click Rate</span>
                            <span>{campaign.click_rate}%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-primary h-2 rounded-full" 
                              style={{ width: `${campaign.click_rate}%` }}
                            ></div>
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleToggleCampaign(campaign.id)}
                          >
                            {campaign.status === "active" ? (
                              <>
                                <Pause className="h-4 w-4 mr-1" />
                                Pause
                              </>
                            ) : (
                              <>
                                <Play className="h-4 w-4 mr-1" />
                                Resume
                              </>
                            )}
                          </Button>
                          <Button variant="outline" size="sm">
                            <Edit className="h-4 w-4 mr-1" />
                            Edit
                          </Button>
                          <Button variant="outline" size="sm" className="text-red-600">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </TabsContent>

          <TabsContent value="workflows" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {workflows.map((workflow) => (
                <Card key={workflow.id} className="hover:shadow-md transition-shadow">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Zap className="h-5 w-5 text-primary" />
                        <CardTitle className="text-lg">{workflow.name}</CardTitle>
                      </div>
                      <Badge className={getStatusColor(workflow.status)}>
                        {workflow.status}
                      </Badge>
                    </div>
                    <CardDescription>{workflow.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-muted-foreground">Trigger</p>
                          <p className="text-sm font-medium">{workflow.trigger}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Steps</p>
                          <p className="text-sm font-medium">{workflow.steps}</p>
                        </div>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Last Run</p>
                        <p className="text-sm">{new Date(workflow.last_run).toLocaleString()}</p>
                      </div>
                      <div className="flex space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleToggleWorkflow(workflow.id)}
                        >
                          {workflow.status === "active" ? (
                            <>
                              <Pause className="h-4 w-4 mr-1" />
                              Pause
                            </>
                          ) : (
                            <>
                              <Play className="h-4 w-4 mr-1" />
                              Resume
                            </>
                          )}
                        </Button>
                        <Button variant="outline" size="sm">
                          <Edit className="h-4 w-4 mr-1" />
                          Edit
                        </Button>
                        <Button variant="outline" size="sm" className="text-red-600">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {(campaigns.length === 0 && workflows.length === 0) && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
              <Zap className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold mb-2">No automation yet</h3>
            <p className="text-muted-foreground mb-4">
              Get started by creating your first campaign or workflow.
            </p>
            <div className="flex space-x-2 justify-center">
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Create Campaign
              </Button>
              <Button variant="outline">
                <Bot className="h-4 w-4 mr-2" />
                Create Workflow
              </Button>
            </div>
          </div>
        )}
        </main>
      </div>
    </div>
  );
};

export default Automation;