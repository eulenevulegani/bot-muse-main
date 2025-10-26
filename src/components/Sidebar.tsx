import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  LayoutDashboard, 
  Package, 
  ShoppingCart, 
  Zap, 
  BarChart3, 
  Users, 
  MessageSquare, 
  FileText,
  Settings,
  LogOut,
  Menu,
  X,
  Bell,
  Search,
  Plus,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import Logo from "@/components/Logo";

interface SidebarProps {
  user?: any;
  business?: any;
  onLogout?: () => void;
}

const Sidebar = ({ user, business, onLogout }: SidebarProps) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const navigationItems = [
    {
      name: "Dashboard",
      href: "/dashboard",
      icon: LayoutDashboard,
      badge: null
    },
    {
      name: "Products",
      href: "/products",
      icon: Package,
      badge: null
    },
    {
      name: "Orders",
      href: "/orders",
      icon: ShoppingCart,
      badge: "3" // Mock notification count
    },
    {
      name: "Customers",
      href: "/customers",
      icon: Users,
      badge: "12" // Mock new customers
    },
    {
      name: "Automation",
      href: "/automation",
      icon: Zap,
      badge: null
    },
    {
      name: "Analytics",
      href: "/analytics",
      icon: BarChart3,
      badge: null
    },
    {
      name: "Documents",
      href: "/documents",
      icon: FileText,
      badge: null
    }
  ];

  const isActive = (href: string) => location.pathname === href;

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        {!isCollapsed && <Logo className="text-lg" />}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="hidden lg:flex"
        >
          {isCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsMobileOpen(false)}
          className="lg:hidden"
        >
          <X className="h-4 w-4" />
        </Button>
      </div>

      {/* Quick Actions */}
      {!isCollapsed && (
        <div className="p-4 border-b border-border">
          <Button className="w-full mb-2" onClick={() => navigate("/automation")}>
            <Plus className="h-4 w-4 mr-2" />
            New Campaign
          </Button>
          <Button variant="outline" className="w-full" onClick={() => navigate("/templates")}>
            <MessageSquare className="h-4 w-4 mr-2" />
            Create Template
          </Button>
        </div>
      )}

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {navigationItems.map((item) => {
          const Icon = item.icon;
          return (
            <Button
              key={item.name}
              variant={isActive(item.href) ? "default" : "ghost"}
              className={`w-full justify-start ${isCollapsed ? "px-2" : ""}`}
              onClick={() => {
                navigate(item.href);
                setIsMobileOpen(false);
              }}
            >
              <Icon className={`h-4 w-4 ${isCollapsed ? "" : "mr-3"}`} />
              {!isCollapsed && (
                <>
                  <span className="flex-1 text-left">{item.name}</span>
                  {item.badge && (
                    <Badge variant="secondary" className="ml-2">
                      {item.badge}
                    </Badge>
                  )}
                </>
              )}
            </Button>
          );
        })}
      </nav>

      {/* Business Info */}
      {!isCollapsed && business && (
        <div className="p-4 border-t border-border">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-semibold">
              {business.name.charAt(0).toUpperCase()}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">{business.name}</p>
              <p className="text-xs text-muted-foreground truncate">{business.industry}</p>
            </div>
          </div>
        </div>
      )}

      {/* Settings & Demo Info */}
      <div className="p-4 border-t border-border space-y-2">
        <Button
          variant="ghost"
          className={`w-full justify-start ${isCollapsed ? "px-2" : ""}`}
          onClick={() => navigate("/settings")}
        >
          <Settings className={`h-4 w-4 ${isCollapsed ? "" : "mr-3"}`} />
          {!isCollapsed && <span>Settings</span>}
        </Button>
        {onLogout && (
          <Button
            variant="ghost"
            className={`w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50 ${isCollapsed ? "px-2" : ""}`}
            onClick={onLogout}
          >
            <LogOut className={`h-4 w-4 ${isCollapsed ? "" : "mr-3"}`} />
            {!isCollapsed && <span>Logout</span>}
          </Button>
        )}
        {!onLogout && !isCollapsed && (
          <div className="text-xs text-muted-foreground text-center p-2">
            Demo Mode
          </div>
        )}
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile Menu Button */}
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setIsMobileOpen(true)}
        className="lg:hidden fixed top-4 left-4 z-50"
      >
        <Menu className="h-4 w-4" />
      </Button>

      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed top-0 left-0 h-full bg-background border-r border-border z-50 transition-all duration-300
        ${isCollapsed ? "w-16" : "w-64"}
        ${isMobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
      `}>
        <SidebarContent />
      </div>

      {/* Main Content Spacer */}
      <div className={`transition-all duration-300 ${isCollapsed ? "lg:ml-16" : "lg:ml-64"}`} />
    </>
  );
};

export default Sidebar;
