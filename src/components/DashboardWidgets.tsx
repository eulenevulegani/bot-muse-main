import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  TrendingUp, 
  TrendingDown, 
  Users, 
  ShoppingCart, 
  DollarSign, 
  MessageSquare, 
  Zap, 
  Target,
  ArrowUpRight,
  ArrowDownRight,
  MoreHorizontal,
  Eye,
  Calendar,
  Clock
} from "lucide-react";

interface WidgetProps {
  title: string;
  value: string | number;
  change?: number;
  changeType?: "increase" | "decrease";
  icon: React.ComponentType<any>;
  description?: string;
  trend?: number[];
  action?: {
    label: string;
    onClick: () => void;
  };
}

const MetricWidget = ({ title, value, change, changeType, icon: Icon, description, action }: WidgetProps) => {
  const isPositive = changeType === "increase";
  const ChangeIcon = isPositive ? ArrowUpRight : ArrowDownRight;
  
  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <p className="text-2xl font-bold">{value}</p>
            {change !== undefined && (
              <div className={`flex items-center mt-1 ${isPositive ? "text-green-600" : "text-red-600"}`}>
                <ChangeIcon className="h-3 w-3 mr-1" />
                <span className="text-sm font-medium">{Math.abs(change)}%</span>
                <span className="text-sm text-muted-foreground ml-1">vs last month</span>
              </div>
            )}
            {description && (
              <p className="text-xs text-muted-foreground mt-1">{description}</p>
            )}
          </div>
          <div className="flex flex-col items-end space-y-2">
            <div className="p-2 rounded-lg bg-primary/10">
              <Icon className="h-5 w-5 text-primary" />
            </div>
            {action && (
              <Button variant="ghost" size="sm" onClick={action.onClick}>
                {action.label}
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const ChartWidget = ({ title, data, type = "line" }: { title: string; data: any[]; type?: string }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-64 flex items-center justify-center bg-muted/20 rounded-lg">
          <div className="text-center">
            <TrendingUp className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
            <p className="text-muted-foreground">Chart visualization would be displayed here</p>
            <p className="text-sm text-muted-foreground mt-1">Interactive charts with real-time data</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const ActivityWidget = ({ title, activities }: { title: string; activities: any[] }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">{title}</CardTitle>
        <CardDescription>Recent activity across your business</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity, index) => (
            <div key={index} className="flex items-start space-x-3">
              <div className="p-1 rounded-full bg-primary/10">
                <activity.icon className="h-3 w-3 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium">{activity.title}</p>
                <p className="text-xs text-muted-foreground">{activity.description}</p>
                <p className="text-xs text-muted-foreground mt-1">{activity.time}</p>
              </div>
              {activity.badge && (
                <Badge variant="outline" className="text-xs">
                  {activity.badge}
                </Badge>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

const QuickActionsWidget = () => {
  const actions = [
    { label: "New Campaign", icon: Zap, color: "bg-blue-500" },
    { label: "Add Product", icon: ShoppingCart, color: "bg-green-500" },
    { label: "Create Template", icon: MessageSquare, color: "bg-purple-500" },
    { label: "View Analytics", icon: Target, color: "bg-orange-500" }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Quick Actions</CardTitle>
        <CardDescription>Common tasks to get you started</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-3">
          {actions.map((action, index) => (
            <Button
              key={index}
              variant="outline"
              className="h-auto p-4 flex flex-col items-center space-y-2"
            >
              <div className={`p-2 rounded-lg ${action.color} text-white`}>
                <action.icon className="h-4 w-4" />
              </div>
              <span className="text-sm font-medium">{action.label}</span>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

const PerformanceWidget = ({ title, metrics }: { title: string; metrics: any[] }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">{title}</CardTitle>
        <CardDescription>Key performance indicators</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {metrics.map((metric, index) => (
            <div key={index}>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">{metric.label}</span>
                <span className="text-sm text-muted-foreground">{metric.value}</span>
              </div>
              <Progress value={metric.percentage} className="h-2" />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

const RecentOrdersWidget = ({ orders }: { orders: any[] }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Recent Orders</CardTitle>
        <CardDescription>Latest customer orders</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {orders.map((order, index) => (
            <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-sm font-semibold text-primary">#{order.id}</span>
                </div>
                <div>
                  <p className="text-sm font-medium">{order.customer}</p>
                  <p className="text-xs text-muted-foreground">{order.items} items</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium">{order.total}</p>
                <Badge variant={order.status === "completed" ? "default" : "secondary"}>
                  {order.status}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export {
  MetricWidget,
  ChartWidget,
  ActivityWidget,
  QuickActionsWidget,
  PerformanceWidget,
  RecentOrdersWidget
};
