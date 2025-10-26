import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { 
  Bot, 
  Sparkles, 
  Lightbulb, 
  Target, 
  TrendingUp, 
  Users, 
  MessageSquare, 
  Zap,
  Copy,
  Send,
  Brain,
  Star,
  ArrowRight
} from "lucide-react";

interface Campaign {
  id: string;
  type: string;
  title: string;
  content: string;
  targetAudience: string;
  suggestedTiming: string;
  aiInsights: string[];
  estimatedReach: string;
  estimatedEngagement: string;
}

interface AIAssistantProps {
  businessType?: string;
  industry?: string;
  onCampaignGenerated?: (campaign: Campaign) => void;
}

const AIAssistant = ({ businessType = "E-commerce", industry = "Retail", onCampaignGenerated }: AIAssistantProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [prompt, setPrompt] = useState("");
  const [campaignType, setCampaignType] = useState("promotional");
  const [targetAudience, setTargetAudience] = useState("existing_customers");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedContent, setGeneratedContent] = useState<Campaign | null>(null);
  const { toast } = useToast();

  const businessInsights = [
    {
      title: "Customer Behavior Pattern",
      insight: "Your VIP customers (12% of base) generate 68% of revenue. They prefer weekend purchases.",
      action: "Create weekend-exclusive offers for VIP segment",
      impact: "High",
      icon: TrendingUp
    },
    {
      title: "Optimal Send Time",
      insight: "Messages sent at 7-9 PM have 3.2x higher open rates than morning sends.",
      action: "Schedule campaigns for evening hours",
      impact: "Medium",
      icon: Target
    },
    {
      title: "Content Performance",
      insight: "Product images with lifestyle context get 40% more engagement.",
      action: "Include lifestyle shots in product campaigns",
      impact: "High",
      icon: Star
    }
  ];

  const campaignTemplates = [
    {
      type: "abandoned_cart",
      title: "Abandoned Cart Recovery",
      description: "AI-powered follow-up for customers who didn't complete purchase",
      suggestedCopy: "Hi! I noticed you were interested in our [product]. Still thinking about it? Here's a special 10% off just for you! 🛒",
      timing: "2 hours after abandonment"
    },
    {
      type: "welcome_series",
      title: "New Customer Welcome",
      description: "Onboarding sequence for first-time buyers",
      suggestedCopy: "Welcome to [Business Name]! 🎉 Here's your exclusive new customer discount. What can we help you find today?",
      timing: "Immediately after first purchase"
    },
    {
      type: "upsell",
      title: "Smart Upsell",
      description: "AI suggests complementary products based on purchase history",
      suggestedCopy: "Since you loved [previous product], you might also enjoy [suggested product]. 15% off when you buy both!",
      timing: "3 days after purchase"
    },
    {
      type: "seasonal",
      title: "Seasonal Campaign",
      description: "AI-generated seasonal offers based on local trends",
      suggestedCopy: "🌧️ Rainy season essentials! Stay dry with our weather-proof collection. Free delivery today!",
      timing: "Weather-based triggers"
    }
  ];

  const generateCampaign = async () => {
    setIsGenerating(true);
    
    // Simulate AI processing
    setTimeout(() => {
      const template = campaignTemplates.find(t => t.type === campaignType) || campaignTemplates[0];
      const generatedCampaign = {
        id: `campaign_${Date.now()}`,
        type: campaignType,
        title: template.title,
        content: prompt || template.suggestedCopy,
        targetAudience: targetAudience,
        suggestedTiming: template.timing,
        aiInsights: [
          "High engagement expected based on past performance",
          "Optimal send time: 7-9 PM",
          "Personalization score: 85%"
        ],
        estimatedReach: targetAudience === "all_customers" ? "1,247 customers" : "312 customers",
        estimatedEngagement: "12.5% open rate, 3.2% click rate"
      };
      
      setGeneratedContent(generatedCampaign);
      setIsGenerating(false);
      
      toast({
        title: "Campaign Generated!",
        description: "AI has crafted a personalized campaign for your business.",
      });
    }, 2000);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied!",
      description: "Campaign content copied to clipboard.",
    });
  };

  return (
    <div className="space-y-6">
      {/* AI Insights Dashboard */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5 text-primary" />
            AI Business Insights
          </CardTitle>
          <CardDescription>
            Intelligent recommendations based on your business data
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {businessInsights.map((insight, index) => {
              const Icon = insight.icon;
              return (
                <div key={index} className="p-6 border rounded-xl hover:shadow-lg transition-all duration-200 bg-gradient-to-br from-background to-muted/20">
                  <div className="space-y-4">
                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-primary/10 rounded-xl">
                        <Icon className="h-5 w-5 text-primary" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-base mb-2">{insight.title}</h4>
                        <p className="text-sm text-muted-foreground leading-relaxed">{insight.insight}</p>
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <Badge 
                          variant={insight.impact === "High" ? "default" : "secondary"} 
                          className="text-xs px-2 py-1"
                        >
                          {insight.impact} Impact
                        </Badge>
                      </div>
                      
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="w-full text-xs h-8 hover:bg-primary/5"
                      >
                        {insight.action}
                      </Button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* AI Campaign Generator */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary" />
            AI Campaign Generator
          </CardTitle>
          <CardDescription>
            Let AI craft intelligent campaigns tailored to your business
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="campaign-type">Campaign Type</Label>
              <Select value={campaignType} onValueChange={setCampaignType}>
                <SelectTrigger>
                  <SelectValue placeholder="Select campaign type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="promotional">Promotional</SelectItem>
                  <SelectItem value="abandoned_cart">Abandoned Cart</SelectItem>
                  <SelectItem value="welcome_series">Welcome Series</SelectItem>
                  <SelectItem value="upsell">Upsell</SelectItem>
                  <SelectItem value="seasonal">Seasonal</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="target-audience">Target Audience</Label>
              <Select value={targetAudience} onValueChange={setTargetAudience}>
                <SelectTrigger>
                  <SelectValue placeholder="Select audience" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all_customers">All Customers</SelectItem>
                  <SelectItem value="existing_customers">Existing Customers</SelectItem>
                  <SelectItem value="vip_customers">VIP Customers</SelectItem>
                  <SelectItem value="new_customers">New Customers</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="prompt">Custom Prompt (Optional)</Label>
            <Textarea
              id="prompt"
              placeholder="Describe your campaign goals, tone, or specific requirements..."
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              rows={3}
            />
          </div>

          <Button 
            onClick={generateCampaign} 
            disabled={isGenerating}
            className="w-full"
          >
            {isGenerating ? (
              <>
                <Bot className="h-4 w-4 mr-2 animate-spin" />
                AI is thinking...
              </>
            ) : (
              <>
                <Sparkles className="h-4 w-4 mr-2" />
                Generate AI Campaign
              </>
            )}
          </Button>

          {/* Generated Campaign */}
          {generatedContent && (
            <Card className="mt-4">
              <CardHeader>
                <CardTitle className="text-lg">{generatedContent.title}</CardTitle>
                <CardDescription>
                  AI-generated campaign for {generatedContent.targetAudience.replace('_', ' ')}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 bg-muted rounded-lg">
                  <p className="text-sm font-medium mb-2">Campaign Message:</p>
                  <p className="text-sm">{generatedContent.content}</p>
                </div>
                
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="font-medium">Estimated Reach:</span>
                    <p className="text-muted-foreground">{generatedContent.estimatedReach}</p>
                  </div>
                  <div>
                    <span className="font-medium">Expected Engagement:</span>
                    <p className="text-muted-foreground">{generatedContent.estimatedEngagement}</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <p className="font-medium text-sm">AI Insights:</p>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    {generatedContent.aiInsights.map((insight: string, index: number) => (
                      <li key={index} className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                        {insight}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => copyToClipboard(generatedContent.content)}
                  >
                    <Copy className="h-4 w-4 mr-1" />
                    Copy Message
                  </Button>
                  <Button 
                    size="sm"
                    onClick={() => {
                      onCampaignGenerated?.(generatedContent);
                      toast({
                        title: "Campaign Created!",
                        description: "Your AI-generated campaign has been added to automation.",
                      });
                    }}
                  >
                    <Send className="h-4 w-4 mr-1" />
                    Use Campaign
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </CardContent>
      </Card>

      {/* Campaign Templates */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lightbulb className="h-5 w-5 text-primary" />
            Smart Campaign Templates
          </CardTitle>
          <CardDescription>
            AI-powered templates that adapt to your business context
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {campaignTemplates.map((template, index) => (
              <div key={index} className="p-6 border rounded-xl hover:shadow-lg transition-all duration-200 bg-gradient-to-br from-background to-muted/20">
                <div className="space-y-4">
                  <div className="flex items-start justify-between">
                    <h4 className="font-semibold text-lg">{template.title}</h4>
                    <Badge variant="outline" className="text-xs px-2 py-1">
                      {template.timing}
                    </Badge>
                  </div>
                  
                  <p className="text-sm text-muted-foreground leading-relaxed">{template.description}</p>
                  
                  <div className="p-4 bg-muted/50 rounded-lg border-l-4 border-primary/20">
                    <p className="text-sm italic text-foreground">
                      "{template.suggestedCopy}"
                    </p>
                  </div>
                  
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="w-full h-9 hover:bg-primary/5"
                    onClick={() => {
                      setCampaignType(template.type);
                      setPrompt(template.suggestedCopy);
                    }}
                  >
                    <ArrowRight className="h-4 w-4 mr-2" />
                    Use Template
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AIAssistant;
