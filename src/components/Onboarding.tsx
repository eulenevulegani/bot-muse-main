import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  CheckCircle, 
  ArrowRight, 
  ArrowLeft, 
  Bot, 
  MessageSquare, 
  Users, 
  BarChart3,
  Zap,
  Package,
  Target,
  Sparkles
} from "lucide-react";

interface OnboardingProps {
  isOpen: boolean;
  onClose: () => void;
  user?: any;
  business?: any;
}

const Onboarding = ({ isOpen, onClose, user, business }: OnboardingProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const navigate = useNavigate();

  const steps = [
    {
      id: 0,
      title: "Welcome to Bot Muse!",
      description: "Let's get your WhatsApp business automation set up in just a few steps.",
      icon: Sparkles,
      content: (
        <div className="text-center space-y-4">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
            <Sparkles className="h-8 w-8 text-primary" />
          </div>
          <h3 className="text-xl font-semibold">Welcome, {user?.email?.split('@')[0] || 'Demo User'}!</h3>
          <p className="text-muted-foreground">
            We'll help you set up your business profile, create your first automation, and start engaging customers on WhatsApp.
          </p>
          <div className="flex justify-center space-x-2">
            <Badge variant="outline">5 minutes</Badge>
            <Badge variant="outline">Easy setup</Badge>
            <Badge variant="outline">No coding required</Badge>
          </div>
        </div>
      )
    },
    {
      id: 1,
      title: "Complete Your Business Profile",
      description: "Add your business details to personalize customer interactions.",
      icon: Bot,
      content: (
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <Card>
              <CardContent className="p-4 text-center">
                <Bot className="h-8 w-8 text-primary mx-auto mb-2" />
                <h4 className="font-semibold">Business Info</h4>
                <p className="text-sm text-muted-foreground">Name, description, industry</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <MessageSquare className="h-8 w-8 text-primary mx-auto mb-2" />
                <h4 className="font-semibold">WhatsApp Number</h4>
                <p className="text-sm text-muted-foreground">Connect your business number</p>
              </CardContent>
            </Card>
          </div>
          <div className="text-center">
            <Button onClick={() => navigate("/business-setup")} className="w-full">
              Complete Business Setup
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      )
    },
    {
      id: 2,
      title: "Add Your Products",
      description: "Create your product catalog so customers can browse and order.",
      icon: Package,
      content: (
        <div className="space-y-4">
          <div className="grid grid-cols-3 gap-4">
            <Card>
              <CardContent className="p-4 text-center">
                <Package className="h-6 w-6 text-primary mx-auto mb-2" />
                <h4 className="font-semibold text-sm">Product Name</h4>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <Package className="h-6 w-6 text-primary mx-auto mb-2" />
                <h4 className="font-semibold text-sm">Price & Description</h4>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <Package className="h-6 w-6 text-primary mx-auto mb-2" />
                <h4 className="font-semibold text-sm">Inventory</h4>
              </CardContent>
            </Card>
          </div>
          <div className="text-center">
            <Button onClick={() => navigate("/products")} className="w-full">
              Add Your First Product
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      )
    },
    {
      id: 3,
      title: "Create Message Templates",
      description: "Set up automated messages for common customer interactions.",
      icon: MessageSquare,
      content: (
        <div className="space-y-4">
          <div className="space-y-3">
            <div className="flex items-center space-x-3 p-3 border rounded-lg">
              <MessageSquare className="h-5 w-5 text-green-500" />
              <div>
                <h4 className="font-semibold">Welcome Message</h4>
                <p className="text-sm text-muted-foreground">Greet new customers</p>
              </div>
            </div>
            <div className="flex items-center space-x-3 p-3 border rounded-lg">
              <MessageSquare className="h-5 w-5 text-blue-500" />
              <div>
                <h4 className="font-semibold">Order Confirmation</h4>
                <p className="text-sm text-muted-foreground">Confirm customer orders</p>
              </div>
            </div>
            <div className="flex items-center space-x-3 p-3 border rounded-lg">
              <MessageSquare className="h-5 w-5 text-purple-500" />
              <div>
                <h4 className="font-semibold">Follow-up Messages</h4>
                <p className="text-sm text-muted-foreground">Engage after purchase</p>
              </div>
            </div>
          </div>
          <div className="text-center">
            <Button onClick={() => navigate("/templates")} className="w-full">
              Create Templates
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      )
    },
    {
      id: 4,
      title: "Set Up Your First Campaign",
      description: "Launch your first marketing campaign to engage customers.",
      icon: Zap,
      content: (
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <Card>
              <CardContent className="p-4 text-center">
                <Target className="h-6 w-6 text-primary mx-auto mb-2" />
                <h4 className="font-semibold text-sm">Choose Audience</h4>
                <p className="text-xs text-muted-foreground">Select customer segments</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <Zap className="h-6 w-6 text-primary mx-auto mb-2" />
                <h4 className="font-semibold text-sm">Schedule Messages</h4>
                <p className="text-xs text-muted-foreground">Set timing and frequency</p>
              </CardContent>
            </Card>
          </div>
          <div className="text-center">
            <Button onClick={() => navigate("/automation")} className="w-full">
              Create Campaign
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      )
    },
    {
      id: 5,
      title: "You're All Set!",
      description: "Your WhatsApp business automation is ready to go.",
      icon: CheckCircle,
      content: (
        <div className="text-center space-y-4">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
            <CheckCircle className="h-8 w-8 text-green-600" />
          </div>
          <h3 className="text-xl font-semibold">Congratulations!</h3>
          <p className="text-muted-foreground">
            Your Bot Muse setup is complete. You can now start engaging customers and growing your business through WhatsApp.
          </p>
          <div className="space-y-2">
            <Button onClick={() => navigate("/dashboard")} className="w-full">
              Go to Dashboard
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button variant="outline" onClick={() => navigate("/analytics")} className="w-full">
              View Analytics
            </Button>
          </div>
        </div>
      )
    }
  ];

  const currentStepData = steps[currentStep];
  const progress = ((currentStep + 1) / steps.length) * 100;

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCompletedSteps([...completedSteps, currentStep]);
      setCurrentStep(currentStep + 1);
    } else {
      onClose();
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSkip = () => {
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-xl">{currentStepData.title}</CardTitle>
              <CardDescription>{currentStepData.description}</CardDescription>
            </div>
            <Button variant="ghost" size="sm" onClick={handleSkip}>
              Skip Tour
            </Button>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>Step {currentStep + 1} of {steps.length}</span>
              <span>{Math.round(progress)}% complete</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {currentStepData.content}
          
          <div className="flex justify-between">
            <Button 
              variant="outline" 
              onClick={handlePrevious}
              disabled={currentStep === 0}
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Previous
            </Button>
            
            <div className="flex space-x-2">
              {steps.map((_, index) => (
                <div
                  key={index}
                  className={`w-2 h-2 rounded-full ${
                    index === currentStep 
                      ? "bg-primary" 
                      : completedSteps.includes(index) 
                        ? "bg-green-500" 
                        : "bg-muted"
                  }`}
                />
              ))}
            </div>
            
            <Button onClick={handleNext}>
              {currentStep === steps.length - 1 ? "Finish" : "Next"}
              {currentStep < steps.length - 1 && <ArrowRight className="ml-2 h-4 w-4" />}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Onboarding;
