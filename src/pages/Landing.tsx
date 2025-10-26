import { Button } from "@/components/ui/button";
import { ArrowRight, Building2, MessageSquare, Zap, Sparkles, Users, BarChart3, ShoppingCart, Target, Clock, Heart, TrendingUp, Bot, Mail, Phone } from "lucide-react";
import { Link } from "react-router-dom";
import Logo from "@/components/Logo";

const Landing = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="glass-nav">
        <nav className="container mx-auto px-6 py-4 flex items-center justify-between">
          <Logo />
          <div className="flex items-center gap-3">
            <Link to="/login">
              <Button variant="ghost" className="text-foreground hover:text-primary glass">
                Log in
              </Button>
            </Link>
            <Link to="/signup">
              <Button className="glass-primary hover:glass-primary/90 text-white">
                Get Started
              </Button>
            </Link>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-6 py-20 md:py-28">
        <div className="max-w-4xl mx-auto text-center">
          <div className="glass-card rounded-3xl p-12 md:p-16 mb-8">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Turn Whatsapp into your 24/7 
              <br />
              <span className="text-primary">Sales Team.</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
              Bot Muse handles conversations, payments and follow ups while you focus on growing your business
            </p>
            <div className="flex flex-wrap justify-center gap-4 mb-8 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                <span>Check out in Chat</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                <span>Instant customer responses</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                <span>95%+ message open rates</span>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/dashboard">
                <Button size="lg" className="text-base px-8 py-3 group glass-primary hover:glass-primary/90 text-white">
                  Start Free Trial
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Button size="lg" variant="outline" className="text-base px-8 py-3 glass">
                Book a Demo
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="container mx-auto px-6 py-16">
        <div className="glass-card rounded-2xl p-8 text-center">
          <h2 className="text-2xl font-bold mb-8 text-futuristic">
            Sell in the app your customers open 50 times a day
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="glass-feature rounded-xl p-6">
              <div className="text-3xl font-bold text-primary mb-2">95%</div>
              <div className="text-sm text-muted-foreground">Open Rate</div>
            </div>
            <div className="glass-feature rounded-xl p-6">
              <div className="text-3xl font-bold text-primary mb-2">3B</div>
              <div className="text-sm text-muted-foreground">Monthly Users</div>
            </div>
            <div className="glass-feature rounded-xl p-6">
              <div className="text-3xl font-bold text-primary mb-2">3 Min</div>
              <div className="text-sm text-muted-foreground">Average Open Time</div>
            </div>
            <div className="glass-feature rounded-xl p-6">
              <div className="text-3xl font-bold text-primary mb-2">40%</div>
              <div className="text-sm text-muted-foreground">Conversion Rate</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-6 py-20">
        <div className="max-w-5xl mx-auto">
          <div className="glass-card rounded-2xl p-8 mb-16 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Bot Muse handles it all instantly inside WhatsApp
            </h2>
            <p className="text-muted-foreground text-lg">
              The complete WhatsApp commerce solution that converts conversations into sales
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="glass-feature p-8 rounded-2xl hover:shadow-futuristic transition-all duration-300 hover:scale-105 group">
              <div className="h-16 w-16 rounded-2xl glass-primary flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <MessageSquare className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-4 text-futuristic">In-Chat Checkout</h3>
              <p className="text-muted-foreground leading-relaxed">
                Skip the redirects and convert faster with in-chat payments. Complete transactions without leaving WhatsApp.
              </p>
            </div>

            <div className="glass-feature p-8 rounded-2xl hover:shadow-futuristic transition-all duration-300 hover:scale-105 group">
              <div className="h-16 w-16 rounded-2xl glass-primary flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Bot className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-4 text-futuristic">AI-Generated Carts</h3>
              <p className="text-muted-foreground leading-relaxed">
                Delight buyers with ready-to-checkout carts automatically tailored to their intent. No manual work required.
              </p>
            </div>

            <div className="glass-feature p-8 rounded-2xl hover:shadow-futuristic transition-all duration-300 hover:scale-105 group">
              <div className="h-16 w-16 rounded-2xl glass-primary flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <BarChart3 className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-4 text-futuristic">Abandoned Cart Recovery</h3>
              <p className="text-muted-foreground leading-relaxed">
                Win back lost revenue with perfectly-timed WhatsApp nudges and pre-filled carts. Recover 80% of lost sales.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Problem/Solution Section */}
      <section className="container mx-auto px-6 py-20">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="glass-card rounded-2xl p-8">
              <h3 className="text-2xl font-bold mb-6 text-futuristic">How It's Usually Done</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-red-500 rounded-full mt-2"></div>
                  <p className="text-muted-foreground">Multiple platforms: website, email, social media, phone calls</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-red-500 rounded-full mt-2"></div>
                  <p className="text-muted-foreground">Customers bounce between apps and lose interest</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-red-500 rounded-full mt-2"></div>
                  <p className="text-muted-foreground">Manual follow-ups that get lost in busy schedules</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-red-500 rounded-full mt-2"></div>
                  <p className="text-muted-foreground">Complex checkout processes with high abandonment rates</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-red-500 rounded-full mt-2"></div>
                  <p className="text-muted-foreground">Staff needed 24/7 to handle customer inquiries</p>
                </div>
              </div>
            </div>
            <div className="glass-feature rounded-2xl p-8">
              <h3 className="text-2xl font-bold mb-6 text-futuristic">How Bot Muse Does It</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                  <p className="text-muted-foreground">Everything happens in one place: WhatsApp</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                  <p className="text-muted-foreground">AI responds instantly, keeping customers engaged</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                  <p className="text-muted-foreground">Automated follow-ups that never miss a beat</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                  <p className="text-muted-foreground">In-chat checkout with zero redirects</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                  <p className="text-muted-foreground">AI handles everything 24/7 while you sleep</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-6 py-24">
        <div className="max-w-4xl mx-auto text-center glass-cta text-white rounded-3xl p-12 md:p-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-futuristic">
            Convert customer queries into revenue 24/7!
          </h2>
          <p className="text-xl mb-8 opacity-90">
            AI-built to Sell, Not Just Support. Join businesses already scaling with Bot Muse.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/dashboard">
              <Button size="lg" className="text-lg px-8 py-6 glass-dark hover:glass-dark/90 text-white border border-white/20">
                Start Free Trial
              </Button>
            </Link>
            <Button size="lg" className="text-lg px-8 py-6 glass hover:glass-primary text-white border border-white/20">
              Book a Demo
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="glass-nav py-12">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <Logo className="text-lg" />
            <p className="text-sm text-muted-foreground">
              © 2024 Bot Muse. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
