import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  MessageSquare, 
  Send, 
  ShoppingCart, 
  CreditCard, 
  Package, 
  Truck,
  CheckCircle,
  Clock,
  Star,
  Heart,
  Share2,
  Phone,
  Mail
} from "lucide-react";

interface WhatsAppPreviewProps {
  orderId?: string;
  customerName?: string;
  showCheckout?: boolean;
  showTracking?: boolean;
}

const WhatsAppPreview = ({ 
  orderId = "ORD-001", 
  customerName = "John Doe",
  showCheckout = false,
  showTracking = false 
}: WhatsAppPreviewProps) => {
  const [message, setMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const mockMessages = [
    {
      id: 1,
      sender: "customer",
      content: "Hi! I'm interested in your premium t-shirts. Do you have them in size L?",
      time: "2:30 PM",
      avatar: "👤"
    },
    {
      id: 2,
      sender: "business",
      content: "Hello! Yes, we have premium t-shirts in size L available. They're made from 100% organic cotton. Would you like to see our collection?",
      time: "2:31 PM",
      avatar: "🤖"
    },
    {
      id: 3,
      sender: "business",
      content: "Here are our best sellers:",
      time: "2:31 PM",
      avatar: "🤖",
      products: [
        { name: "Premium Cotton T-Shirt", price: "$29.99", image: "👕" },
        { name: "Organic Hoodie", price: "$59.99", image: "🧥" }
      ]
    },
    {
      id: 4,
      sender: "customer",
      content: "The cotton t-shirt looks great! How do I order?",
      time: "2:35 PM",
      avatar: "👤"
    }
  ];

  const handleSendMessage = () => {
    if (message.trim()) {
      // In a real app, this would send the message
      setMessage("");
    }
  };

  const getPaymentIcon = (method: string) => {
    switch (method) {
      case "mpesa": return "📱";
      case "airtel": return "📱";
      case "card": return "💳";
      case "cash": return "💰";
      default: return "💳";
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <Card className="overflow-hidden">
        <CardHeader className="bg-green-600 text-white">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
              <MessageSquare className="h-5 w-5" />
            </div>
            <div>
              <CardTitle className="text-lg">Bot Muse Store</CardTitle>
              <CardDescription className="text-green-100">
                AI-Powered WhatsApp Commerce
              </CardDescription>
            </div>
            <div className="ml-auto">
              <div className="w-3 h-3 bg-green-400 rounded-full"></div>
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="p-0">
          {/* Chat Messages */}
          <div className="h-96 overflow-y-auto p-4 space-y-4 bg-gray-50">
            {mockMessages.map((msg) => (
              <div key={msg.id} className={`flex gap-2 ${msg.sender === 'customer' ? 'justify-end' : 'justify-start'}`}>
                {msg.sender === 'business' && (
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center text-sm">
                    {msg.avatar}
                  </div>
                )}
                
                <div className={`max-w-xs ${msg.sender === 'customer' ? 'order-2' : 'order-1'}`}>
                  <div className={`p-3 rounded-lg ${
                    msg.sender === 'customer' 
                      ? 'bg-green-500 text-white' 
                      : 'bg-white border shadow-sm'
                  }`}>
                    <p className="text-sm">{msg.content}</p>
                    {msg.products && (
                      <div className="mt-2 space-y-2">
                        {msg.products.map((product, index) => (
                          <div key={index} className="flex items-center gap-2 p-2 bg-gray-50 rounded">
                            <span className="text-lg">{product.image}</span>
                            <div className="flex-1">
                              <p className="text-xs font-medium">{product.name}</p>
                              <p className="text-xs text-green-600 font-semibold">{product.price}</p>
                            </div>
                            <Button size="sm" className="text-xs">
                              Add to Cart
                            </Button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                  <p className="text-xs text-gray-500 mt-1">{msg.time}</p>
                </div>
                
                {msg.sender === 'customer' && (
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-sm order-1">
                    {msg.avatar}
                  </div>
                )}
              </div>
            ))}

            {/* Checkout Flow */}
            {showCheckout && (
              <div className="flex justify-start">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center text-sm">
                  🤖
                </div>
                <div className="max-w-xs order-1">
                  <div className="p-3 bg-white border shadow-sm rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <ShoppingCart className="h-4 w-4 text-green-600" />
                      <span className="text-sm font-medium">Your Order</span>
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Premium Cotton T-Shirt</span>
                        <span>$29.99</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Delivery</span>
                        <span>Free</span>
                      </div>
                      <div className="border-t pt-2 flex justify-between font-semibold">
                        <span>Total</span>
                        <span>$29.99</span>
                      </div>
                    </div>
                    <div className="mt-3 space-y-2">
                      <p className="text-xs text-gray-600">Choose payment method:</p>
                      <div className="grid grid-cols-2 gap-2">
                        <Button size="sm" variant="outline" className="text-xs">
                          {getPaymentIcon("mpesa")} M-Pesa
                        </Button>
                        <Button size="sm" variant="outline" className="text-xs">
                          {getPaymentIcon("airtel")} Airtel Money
                        </Button>
                        <Button size="sm" variant="outline" className="text-xs">
                          {getPaymentIcon("card")} Card
                        </Button>
                        <Button size="sm" variant="outline" className="text-xs">
                          {getPaymentIcon("cash")} Cash on Delivery
                        </Button>
                      </div>
                    </div>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">2:36 PM</p>
                </div>
              </div>
            )}

            {/* Order Tracking */}
            {showTracking && (
              <div className="flex justify-start">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center text-sm">
                  🤖
                </div>
                <div className="max-w-xs order-1">
                  <div className="p-3 bg-white border shadow-sm rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Package className="h-4 w-4 text-green-600" />
                      <span className="text-sm font-medium">Order #{orderId}</span>
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        <span>Order confirmed</span>
                        <span className="text-xs text-gray-500">2:40 PM</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-blue-600" />
                        <span>Preparing for dispatch</span>
                        <span className="text-xs text-gray-500">3:15 PM</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Truck className="h-4 w-4 text-orange-600" />
                        <span>Out for delivery</span>
                        <span className="text-xs text-gray-500">9:30 AM</span>
                      </div>
                    </div>
                    <div className="mt-3 p-2 bg-green-50 rounded text-xs">
                      <p className="font-medium">Estimated delivery: Today 2-4 PM</p>
                      <p className="text-gray-600">Your order will be delivered to your WhatsApp address</p>
                    </div>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">Just now</p>
                </div>
              </div>
            )}
          </div>

          {/* Message Input */}
          <div className="p-4 border-t bg-white">
            <div className="flex items-center gap-2">
              <Input
                placeholder="Type a message..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                className="flex-1"
              />
              <Button size="sm" onClick={handleSendMessage} disabled={!message.trim()}>
                <Send className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex items-center justify-between mt-2 text-xs text-gray-500">
              <span>AI-powered responses</span>
              <div className="flex items-center gap-1">
                <Star className="h-3 w-3" />
                <span>4.9/5 rating</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default WhatsAppPreview;