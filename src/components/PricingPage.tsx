import React, { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Switch } from './ui/switch';
import { 
  ArrowLeft, 
  CheckCircle, 
  X,
  BookOpen,
  Crown,
  Star,
  Users,
  Building2,
  Zap,
  Phone,
  Mail,
  MessageSquare
} from 'lucide-react';

interface PricingPageProps {
  onBack: () => void;
}

export function PricingPage({ onBack }: PricingPageProps) {
  const [isAnnual, setIsAnnual] = useState(false);

  const plans = [
    {
      name: "Starter",
      description: "Perfect for small schools and institutions",
      icon: BookOpen,
      price: {
        monthly: 29,
        annual: 290
      },
      features: [
        "Up to 100 students",
        "Basic analytics",
        "Parent-teacher messaging",
        "Attendance tracking",
        "Grade management",
        "Email support"
      ],
      limitations: [
        "Limited storage (5GB)",
        "Basic reports only",
        "No API access"
      ],
      color: "blue",
      popular: false,
      cta: "Start Free Trial"
    },
    {
      name: "Professional",
      description: "Ideal for growing educational institutions",
      icon: Crown,
      price: {
        monthly: 99,
        annual: 990
      },
      features: [
        "Up to 500 students",
        "Advanced analytics",
        "Custom reports",
        "Bulk communications",
        "Fee management",
        "Mobile app access",
        "Priority support",
        "Data export/import"
      ],
      limitations: [
        "Limited API calls",
        "Basic customization"
      ],
      color: "purple",
      popular: true,
      cta: "Get Started"
    },
    {
      name: "Enterprise",
      description: "Complete solution for large institutions",
      icon: Building2,
      price: {
        monthly: 299,
        annual: 2990
      },
      features: [
        "Unlimited students",
        "Full analytics suite",
        "Custom dashboards",
        "Advanced reporting",
        "Multi-campus support",
        "API access",
        "Custom integrations",
        "24/7 phone support",
        "Dedicated account manager",
        "Custom training"
      ],
      limitations: [],
      color: "green",
      popular: false,
      cta: "Contact Sales"
    }
  ];

  const addOns = [
    {
      name: "Advanced Analytics",
      description: "Detailed insights and predictive analytics",
      price: { monthly: 19, annual: 190 }
    },
    {
      name: "SMS Notifications",
      description: "Send SMS alerts to parents and students",
      price: { monthly: 9, annual: 90 }
    },
    {
      name: "Mobile App",
      description: "Branded mobile app for your institution",
      price: { monthly: 49, annual: 490 }
    },
    {
      name: "LMS Integration",
      description: "Connect with popular learning management systems",
      price: { monthly: 29, annual: 290 }
    }
  ];

  const getColorClasses = (color: string) => {
    const colorMap = {
      blue: {
        bg: "from-blue-500/20 to-blue-600/10",
        border: "border-blue-500/30",
        icon: "bg-blue-500/20 text-blue-400"
      },
      purple: {
        bg: "from-purple-500/20 to-purple-600/10",
        border: "border-purple-500/30",
        icon: "bg-purple-500/20 text-purple-400"
      },
      green: {
        bg: "from-green-500/20 to-green-600/10",
        border: "border-green-500/30",
        icon: "bg-green-500/20 text-green-400"
      }
    };
    return colorMap[color as keyof typeof colorMap] || colorMap.blue;
  };

  const getPrice = (plan: typeof plans[0]) => {
    return isAnnual ? plan.price.annual : plan.price.monthly;
  };

  const getMonthlyEquivalent = (plan: typeof plans[0]) => {
    return isAnnual ? Math.round(plan.price.annual / 12) : plan.price.monthly;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-slate-900 to-background">
      {/* Header */}
      <header className="border-b border-border/50 bg-background/80 backdrop-blur-sm">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" onClick={onBack} className="text-muted-foreground hover:text-foreground">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Home
              </Button>
            </div>
            <div className="flex items-center space-x-2">
              <BookOpen className="h-6 w-6 text-primary" />
              <span className="text-xl font-semibold text-foreground">EvolvEd Pricing</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <Badge className="mb-6 bg-primary/10 text-primary border-primary/20">
              💰 Transparent Pricing
            </Badge>
            <h1 className="text-4xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
              Simple, Transparent
              <span className="block text-gradient animate-gradient">Pricing Plans</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed mb-8">
              Choose the perfect plan for your institution. All plans include core features 
              with no setup fees or hidden costs.
            </p>
            
            {/* Billing Toggle */}
            <div className="flex items-center justify-center space-x-4 mb-4">
              <span className={`text-sm ${!isAnnual ? 'text-foreground' : 'text-muted-foreground'}`}>
                Monthly
              </span>
              <Switch
                checked={isAnnual}
                onCheckedChange={setIsAnnual}
                className="data-[state=checked]:bg-primary"
              />
              <span className={`text-sm ${isAnnual ? 'text-foreground' : 'text-muted-foreground'}`}>
                Annual
              </span>
              {isAnnual && (
                <Badge className="bg-green-500/20 text-green-300 border-green-500/30">
                  Save 17%
                </Badge>
              )}
            </div>
          </div>

          {/* Pricing Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-20">
            {plans.map((plan, index) => {
              const Icon = plan.icon;
              const colors = getColorClasses(plan.color);
              const price = getPrice(plan);
              const monthlyPrice = getMonthlyEquivalent(plan);
              
              return (
                <Card 
                  key={index} 
                  className={`glass ${colors.border} bg-gradient-to-br ${colors.bg} hover:shadow-2xl transition-all duration-500 group transform hover:-translate-y-2 relative ${plan.popular ? 'ring-2 ring-primary/50 scale-105' : ''}`}
                >
                  {plan.popular && (
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                      <Badge className="bg-gradient-primary text-white border-0 flex items-center space-x-1">
                        <Star className="h-3 w-3" />
                        <span>Most Popular</span>
                      </Badge>
                    </div>
                  )}
                  
                  <CardHeader className="text-center pb-4">
                    <div className={`w-16 h-16 rounded-full ${colors.icon} flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className="h-8 w-8" />
                    </div>
                    <CardTitle className="text-2xl text-white font-semibold mb-2">{plan.name}</CardTitle>
                    <CardDescription className="text-white/80">
                      {plan.description}
                    </CardDescription>
                  </CardHeader>
                  
                  <CardContent className="px-8">
                    {/* Price */}
                    <div className="text-center mb-8">
                      <div className="text-4xl font-bold text-white mb-2">
                        ${price}
                        <span className="text-lg font-normal text-white/60">
                          /{isAnnual ? 'year' : 'month'}
                        </span>
                      </div>
                      {isAnnual && (
                        <div className="text-sm text-white/60">
                          ${monthlyPrice}/month billed annually
                        </div>
                      )}
                    </div>

                    {/* Features */}
                    <div className="space-y-3 mb-8">
                      {plan.features.map((feature, featureIndex) => (
                        <div key={featureIndex} className="flex items-center space-x-3">
                          <CheckCircle className="h-4 w-4 text-green-400 flex-shrink-0" />
                          <span className="text-white/90 text-sm">{feature}</span>
                        </div>
                      ))}
                      {plan.limitations.map((limitation, limitIndex) => (
                        <div key={limitIndex} className="flex items-center space-x-3">
                          <X className="h-4 w-4 text-red-400 flex-shrink-0" />
                          <span className="text-white/60 text-sm">{limitation}</span>
                        </div>
                      ))}
                    </div>

                    {/* CTA */}
                    <Button 
                      className={`w-full ${plan.popular ? 'bg-gradient-primary hover:bg-gradient-primary-hover text-white' : 'bg-white/10 hover:bg-white/20 text-white border border-white/20'}`}
                    >
                      {plan.cta}
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Add-ons */}
          <div className="mb-20">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
                Optional Add-ons
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Enhance your plan with additional features tailored to your needs
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {addOns.map((addon, index) => (
                <Card key={index} className="glass border-border/30 bg-background/20 hover:bg-background/30 transition-all duration-300">
                  <CardHeader className="pb-4">
                    <CardTitle className="text-lg text-white">{addon.name}</CardTitle>
                    <CardDescription className="text-white/70">
                      {addon.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-primary mb-2">
                        ${isAnnual ? addon.price.annual : addon.price.monthly}
                        <span className="text-sm font-normal text-white/60">
                          /{isAnnual ? 'year' : 'month'}
                        </span>
                      </div>
                      <Button size="sm" variant="outline" className="w-full border-border/50 text-foreground hover:bg-accent/10">
                        Add to Plan
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* FAQ Preview */}
          <div className="mb-20">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-foreground mb-4">
                Frequently Asked Questions
              </h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-2">Can I change plans anytime?</h3>
                <p className="text-muted-foreground">Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately.</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-2">Is there a free trial?</h3>
                <p className="text-muted-foreground">Yes, we offer a 14-day free trial with full access to all features.</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-2">What payment methods do you accept?</h3>
                <p className="text-muted-foreground">We accept all major credit cards, PayPal, and bank transfers for annual plans.</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-2">Do you offer discounts for non-profits?</h3>
                <p className="text-muted-foreground">Yes, we provide special pricing for non-profit educational institutions. Contact us for details.</p>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="text-center">
            <Card className="glass border-border/30 bg-gradient-to-br from-background/80 to-slate-900/40 max-w-4xl mx-auto">
              <CardContent className="p-12">
                <h3 className="text-3xl font-bold text-foreground mb-6">
                  Ready to Get Started?
                </h3>
                <p className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto">
                  Join thousands of educational institutions that trust EvolvEd for their 
                  management needs. Start your free trial today.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
                  <Button size="lg" className="bg-gradient-primary hover:bg-gradient-primary-hover text-white">
                    Start 14-Day Free Trial
                  </Button>
                  <Button variant="outline" size="lg" className="border-border/50 text-foreground hover:bg-accent/10">
                    Schedule Demo
                  </Button>
                </div>
                
                {/* Contact Options */}
                <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-8 text-sm text-muted-foreground">
                  <div className="flex items-center space-x-2">
                    <Phone className="h-4 w-4" />
                    <span>+1 (555) 123-4567</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Mail className="h-4 w-4" />
                    <span>sales@evolved.edu</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <MessageSquare className="h-4 w-4" />
                    <span>Live Chat Available</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
