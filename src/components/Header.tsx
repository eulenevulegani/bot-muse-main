import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import Breadcrumb from "@/components/Breadcrumb";
import { 
  Search, 
  Bell, 
  Settings, 
  User,
  Moon,
  Sun,
  HelpCircle,
  Command,
  ArrowLeft,
  Home
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface HeaderProps {
  title: string;
  subtitle?: string;
  showSearch?: boolean;
  showBreadcrumb?: boolean;
  showBackButton?: boolean;
  actions?: React.ReactNode;
}

const Header = ({ 
  title, 
  subtitle, 
  showSearch = true, 
  showBreadcrumb = true, 
  showBackButton = true, 
  actions 
}: HeaderProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isDarkMode, setIsDarkMode] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ctrl/Cmd + number keys for navigation
      if ((e.ctrlKey || e.metaKey) && !e.shiftKey && !e.altKey) {
        switch (e.key) {
          case '1':
            e.preventDefault();
            navigate('/dashboard');
            break;
          case '2':
            e.preventDefault();
            navigate('/products');
            break;
          case '3':
            e.preventDefault();
            navigate('/orders');
            break;
          case '4':
            e.preventDefault();
            navigate('/customers');
            break;
          case '5':
            e.preventDefault();
            navigate('/automation');
            break;
          case '6':
            e.preventDefault();
            navigate('/analytics');
            break;
          case '7':
            e.preventDefault();
            navigate('/documents');
            break;
        }
      }
      
      // Escape key to go back
      if (e.key === 'Escape' && location.pathname !== '/dashboard') {
        navigate(-1);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [navigate, location.pathname]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // In a real app, this would trigger global search
      toast({
        title: "Search",
        description: `Searching for "${searchQuery}"...`,
      });
    }
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    // In a real app, this would toggle the theme
    toast({
      title: "Theme",
      description: `Switched to ${isDarkMode ? "light" : "dark"} mode`,
    });
  };

  return (
    <header className="sticky top-0 z-30 glass-nav">
      <div className="container mx-auto px-6 py-4">
        {/* Breadcrumb Navigation */}
        {showBreadcrumb && (
          <div className="mb-4">
            <Breadcrumb />
          </div>
        )}
        
        <div className="flex items-center justify-between">
          {/* Left Section */}
          <div className="flex items-center space-x-4">
            {/* Back Button */}
            {showBackButton && location.pathname !== '/dashboard' && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate(-1)}
                className="mr-2"
              >
                <ArrowLeft className="h-4 w-4 mr-1" />
                Back
              </Button>
            )}
            
            <div className="glass-card rounded-xl p-4">
              <h1 className="text-2xl font-bold text-futuristic">{title}</h1>
              {subtitle && (
                <p className="text-sm text-muted-foreground">{subtitle}</p>
              )}
            </div>
          </div>

          {/* Center Section - Search */}
          {showSearch && (
            <div className="flex-1 max-w-md mx-8">
              <form onSubmit={handleSearch} className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search customers, orders, templates... (Ctrl+K)"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-10 glass"
                />
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                  <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border glass px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
                    <Command className="h-3 w-3" />
                    K
                  </kbd>
                </div>
              </form>
            </div>
          )}

          {/* Right Section */}
          <div className="flex items-center space-x-2">
            {/* Custom Actions */}
            {actions}

            {/* Notifications */}
            <Button variant="ghost" size="sm" className="relative glass hover:glass-primary">
              <Bell className="h-4 w-4" />
              <Badge 
                variant="destructive" 
                className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs"
              >
                3
              </Badge>
            </Button>

            {/* Keyboard Shortcuts Help */}
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => {
                toast({
                  title: "Keyboard Shortcuts",
                  description: "Ctrl+1: Dashboard, Ctrl+2: Products, Ctrl+3: Orders, Ctrl+4: Customers, Ctrl+5: Automation, Ctrl+6: Analytics, Ctrl+7: Documents, Esc: Go Back",
                });
              }} 
              className="glass hover:glass-primary"
              title="Keyboard Shortcuts"
            >
              <HelpCircle className="h-4 w-4" />
            </Button>

            {/* Theme Toggle */}
            <Button variant="ghost" size="sm" onClick={toggleDarkMode} className="glass hover:glass-primary">
              {isDarkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </Button>

            {/* Settings */}
            <Button variant="ghost" size="sm" onClick={() => navigate("/settings")} className="glass hover:glass-primary">
              <Settings className="h-4 w-4" />
            </Button>

            {/* User Profile */}
            <Button variant="ghost" size="sm" className="relative glass hover:glass-primary">
              <User className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
