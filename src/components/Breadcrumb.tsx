import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ChevronRight, Home } from "lucide-react";

interface BreadcrumbItem {
  label: string;
  href?: string;
  icon?: React.ComponentType<{ className?: string }>;
}

const Breadcrumb = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const getBreadcrumbItems = (): BreadcrumbItem[] => {
    const pathSegments = location.pathname.split('/').filter(Boolean);
    const items: BreadcrumbItem[] = [
      { label: "Dashboard", href: "/dashboard", icon: Home }
    ];

    if (pathSegments.length === 0 || pathSegments[0] === 'dashboard') {
      return items;
    }

    // Add breadcrumb items based on current path
    pathSegments.forEach((segment, index) => {
      const href = '/' + pathSegments.slice(0, index + 1).join('/');
      let label = segment;

      // Convert segment to readable label
      switch (segment) {
        case 'products':
          label = 'Products';
          break;
        case 'orders':
          label = 'Orders';
          break;
        case 'customers':
          label = 'Customers';
          break;
        case 'automation':
          label = 'Automation';
          break;
        case 'analytics':
          label = 'Analytics';
          break;
        case 'templates':
          label = 'Templates';
          break;
        case 'business-setup':
          label = 'Business Setup';
          break;
        case 'gemini-demo':
          label = 'AI Demo';
          break;
        default:
          label = segment.charAt(0).toUpperCase() + segment.slice(1);
      }

      // Don't add href for current page
      const isLast = index === pathSegments.length - 1;
      items.push({
        label,
        href: isLast ? undefined : href
      });
    });

    return items;
  };

  const breadcrumbItems = getBreadcrumbItems();

  return (
    <div className="flex items-center space-x-2 text-sm">
      {/* Breadcrumb Items */}
      <div className="flex items-center space-x-1">
        {breadcrumbItems.map((item, index) => {
          const isLast = index === breadcrumbItems.length - 1;
          const Icon = item.icon;

          return (
            <div key={index} className="flex items-center">
              {index > 0 && (
                <ChevronRight className="h-4 w-4 text-muted-foreground mx-2" />
              )}
              
              {item.href && !isLast ? (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => navigate(item.href!)}
                  className="h-auto p-1 text-muted-foreground hover:text-foreground"
                >
                  {Icon && <Icon className="h-4 w-4 mr-1" />}
                  {item.label}
                </Button>
              ) : (
                <span className={`flex items-center ${isLast ? 'text-foreground font-medium' : 'text-muted-foreground'}`}>
                  {Icon && <Icon className="h-4 w-4 mr-1" />}
                  {item.label}
                </span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Breadcrumb;


