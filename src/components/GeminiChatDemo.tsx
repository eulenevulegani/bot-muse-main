import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Loader2, Send, Bot, User } from "lucide-react";
import { generateWhatsAppResponse, analyzeSentiment } from "@/lib/gemini";
import { useToast } from "@/hooks/use-toast";

const GeminiChatDemo = () => {
  const [messages, setMessages] = useState<Array<{ role: 'user' | 'ai'; content: string }>>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [sentiment, setSentiment] = useState<'positive' | 'neutral' | 'negative' | null>(null);
  const { toast } = useToast();

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = input.trim();
    setInput("");
    
    // Add user message
    const newMessages = [...messages, { role: 'user' as const, content: userMessage }];
    setMessages(newMessages);
    setIsLoading(true);

    try {
      // Analyze sentiment
      const messageSentiment = await analyzeSentiment(userMessage);
      setSentiment(messageSentiment);

      // Generate AI response
      const aiResponse = await generateWhatsAppResponse(userMessage, {
        businessName: "Bot Muse Demo Store",
        products: [
          { name: "Wireless Headphones", price: 99.99, description: "Premium noise-cancelling", category: "Electronics" },
          { name: "Smart Watch", price: 249.99, description: "Fitness tracking", category: "Electronics" },
          { name: "Backpack", price: 49.99, description: "Waterproof design", category: "Accessories" }
        ]
      });

      // Add AI response
      setMessages([...newMessages, { role: 'ai', content: aiResponse }]);
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to generate response",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const getSentimentColor = () => {
    switch (sentiment) {
      case 'positive': return 'bg-green-100 text-green-800 border-green-300';
      case 'negative': return 'bg-red-100 text-red-800 border-red-300';
      default: return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  return (
    <Card className="max-w-4xl mx-auto">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Bot className="h-5 w-5" />
              Gemini AI Chat Demo
            </CardTitle>
            <CardDescription>
              Test your WhatsApp AI assistant powered by Google Gemini
            </CardDescription>
          </div>
          {sentiment && (
            <Badge variant="outline" className={getSentimentColor()}>
              {sentiment}
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent>
        {/* Messages */}
        <div className="space-y-4 mb-4 max-h-96 overflow-y-auto pr-2">
          {messages.length === 0 && (
            <div className="text-center text-muted-foreground py-8">
              <Bot className="h-12 w-12 mx-auto mb-2 opacity-50" />
              <p>Start a conversation with the AI assistant</p>
              <p className="text-sm mt-1">Try: "What products do you have?" or "Tell me about headphones"</p>
            </div>
          )}
          
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex gap-3 ${
                message.role === 'user' ? 'justify-end' : 'justify-start'
              }`}
            >
              {message.role === 'ai' && (
                <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Bot className="h-4 w-4 text-primary" />
                </div>
              )}
              <div
                className={`max-w-[80%] rounded-lg p-3 ${
                  message.role === 'user'
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted'
                }`}
              >
                <p className="text-sm whitespace-pre-wrap">{message.content}</p>
              </div>
              {message.role === 'user' && (
                <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center flex-shrink-0">
                  <User className="h-4 w-4" />
                </div>
              )}
            </div>
          ))}

          {isLoading && (
            <div className="flex gap-3 justify-start">
              <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Bot className="h-4 w-4 text-primary" />
              </div>
              <div className="bg-muted rounded-lg p-3">
                <Loader2 className="h-4 w-4 animate-spin" />
              </div>
            </div>
          )}
        </div>

        {/* Input */}
        <div className="flex gap-2">
          <Input
            placeholder="Type your message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && !e.shiftKey && handleSend()}
            disabled={isLoading}
          />
          <Button onClick={handleSend} disabled={isLoading || !input.trim()}>
            {isLoading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Send className="h-4 w-4" />
            )}
          </Button>
        </div>

        <div className="mt-4 text-xs text-muted-foreground text-center">
          Powered by Google Gemini Pro • Free tier includes generous API limits
        </div>
      </CardContent>
    </Card>
  );
};

export default GeminiChatDemo;
