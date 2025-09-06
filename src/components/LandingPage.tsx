import { ArrowRight, BookOpen, Users, TrendingUp, Shield, Play, Pause, BarChart3, Clock, Star, CheckCircle, ArrowDown } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { useState, useEffect } from "react";

interface LandingPageProps {
  onGetStarted: () => void;
}

export function LandingPage({ onGetStarted }: LandingPageProps) {
  const [isPlaying, setIsPlaying] = useState(true);
  const [activeFeature, setActiveFeature] = useState(0);
  const [showDemo, setShowDemo] = useState(false);

  // Auto-rotate features
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveFeature(prev => (prev + 1) % 4);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const scrollToFeatures = () => {
    document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleWatchDemo = () => {
    setShowDemo(true);
    // You can replace this with actual video functionality
    alert('Demo video would play here. Integration with video player needed.');
  };

  const handleSignIn = () => {
    // Navigate to sign in page
    alert('Sign in functionality - integrate with authentication system');
  };

  const handleNavigation = (section: string) => {
    alert(`Navigate to ${section} page - implement routing`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-slate-900 to-background">
      {/* Navigation Bar */}
      <nav className="relative z-50 border-b border-border/50 bg-background/80 backdrop-blur-sm">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center space-x-8">
              <div className="flex items-center space-x-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-primary">
                  <BookOpen className="h-5 w-5 text-white" />
                </div>
                <span className="text-xl font-semibold text-foreground">EvolvEd</span>
              </div>
              
              <div className="hidden md:flex items-center space-x-6">
                <button 
                  onClick={() => handleNavigation('home')}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Home
                </button>
                <button 
                  onClick={scrollToFeatures}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Features
                </button>
                <button 
                  onClick={() => handleNavigation('solutions')}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Solutions
                </button>
                <button 
                  onClick={() => handleNavigation('pricing')}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Pricing
                </button>
                <button 
                  onClick={() => handleNavigation('support')}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Support
                </button>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <Button 
                variant="ghost" 
                onClick={handleSignIn}
                className="hidden sm:inline-flex text-muted-foreground hover:text-foreground"
              >
                Sign in
              </Button>
              <Button 
                onClick={onGetStarted}
                className="bg-gradient-primary hover:bg-gradient-primary-hover text-white"
              >
                Get Started
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="relative">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 py-20 lg:py-28">
            {/* Left Content */}
            <div className="flex flex-col justify-center space-y-8">
              <div className="space-y-4">
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <div className="h-1 w-12 bg-gradient-primary rounded-full"></div>
                  <span>EvolvEd - The Educational Revolution</span>
                </div>
                
                <h1 className="text-4xl lg:text-6xl font-bold text-foreground leading-tight">
                  Transform your
                  <span 
                    className="block font-bold"
                    style={{
                      background: 'linear-gradient(135deg, #a855f7, #c084fc, #8b5cf6)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                      color: 'transparent'
                    }}
                  >
                    educational journey
                  </span>
                  with intelligent management.
                </h1>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center space-x-2">
                    <div className="h-2 w-2 rounded-full bg-primary"></div>
                    <span>Comprehensive Analytics</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="h-2 w-2 rounded-full bg-primary"></div>
                    <span>Role-Based Access</span>
                  </div>
                </div>
                
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Experience the next generation of educational management with seamless 
                  integration, powerful analytics, and intuitive design. Built for students, 
                  parents, and administrators.
                </p>
              </div>
              
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  Join thousands of institutions already using EvolvEd. 
                  Start your free trial today and see the difference.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button 
                    onClick={onGetStarted}
                    size="lg"
                    className="bg-gradient-primary hover:bg-gradient-primary-hover text-white glow-hover group"
                  >
                    Start Your Journey
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    size="lg"
                    onClick={handleWatchDemo}
                    className="border-border/50 text-foreground hover:bg-accent/10 group"
                  >
                    <Play className="mr-2 h-4 w-4 group-hover:scale-110 transition-transform" />
                    Watch Demo
                  </Button>
                </div>
              </div>
            </div>

            {/* Right Content - Large EvolvEd Text */}
            <div className="relative flex items-center justify-center lg:justify-end">
              <div className="relative">
                {/* Large Text */}
                <div className="text-8xl lg:text-9xl xl:text-[12rem] font-bold leading-none">
                  <div 
                    className="opacity-90"
                    style={{
                      background: 'linear-gradient(135deg, #a855f7, #c084fc, #8b5cf6)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                      color: 'transparent'
                    }}
                  >
                    Evolv
                  </div>
                  <div className="text-white/20 -mt-4 lg:-mt-8">
                    Ed
                  </div>
                </div>
                
                {/* Floating Elements */}
                <div className="absolute top-8 -left-4 lg:top-12 lg:-left-8">
                  <div className="flex items-center justify-center w-12 h-12 lg:w-16 lg:h-16 rounded-full bg-primary/20 backdrop-blur-sm border border-primary/30">
                    <Users className="h-6 w-6 lg:h-8 lg:w-8 text-primary" />
                  </div>
                </div>
                
                <div className="absolute bottom-8 right-4 lg:bottom-12 lg:right-8">
                  <div className="flex items-center justify-center w-12 h-12 lg:w-16 lg:h-16 rounded-full bg-accent/20 backdrop-blur-sm border border-accent/30">
                    <TrendingUp className="h-6 w-6 lg:h-8 lg:w-8 text-accent" />
                  </div>
                </div>
                
                <div className="absolute top-1/2 -right-4 lg:-right-8 transform -translate-y-1/2">
                  <div className="flex items-center justify-center w-12 h-12 lg:w-16 lg:h-16 rounded-full bg-chart-3/20 backdrop-blur-sm border border-chart-3/30">
                    <Shield className="h-6 w-6 lg:h-8 lg:w-8 text-chart-3" />
                  </div>
                </div>
                
                {/* Video Controls */}
                <div className="absolute bottom-0 right-0">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="w-12 h-12 rounded-full bg-background/80 backdrop-blur-sm border border-border/50 hover:bg-background/90"
                  >
                    {isPlaying ? (
                      <Pause className="h-4 w-4" />
                    ) : (
                      <Play className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
          <Button
            variant="ghost"
            onClick={scrollToFeatures}
            className="p-2 rounded-full animate-bounce hover:animate-none"
          >
            <ArrowDown className="h-5 w-5 text-muted-foreground" />
          </Button>
        </div>
        
        {/* Background Decorations */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl"></div>
        </div>
      </main>

      {/* Features Section */}
      <section id="features" className="py-20 lg:py-32 bg-gradient-to-b from-background to-slate-900/50">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              Powerful Features for Modern Education
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Discover how EvolvEd transforms educational management with intelligent tools and insights
            </p>
          </div>

          {/* Feature Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {/* Student Analytics Card */}
            <Card className={`glass border-purple-500/30 bg-gradient-to-br from-purple-500/20 to-purple-600/10 hover:from-purple-500/30 hover:to-purple-600/20 transition-all duration-300 group cursor-pointer ${activeFeature === 0 ? 'ring-2 ring-purple-500/50' : ''}`}>
              <CardHeader className="text-center pb-3">
                <div className="w-12 h-12 rounded-full bg-purple-500/20 flex items-center justify-center mx-auto mb-3 group-hover:bg-purple-500/30 transition-colors">
                  <BarChart3 className="h-6 w-6 text-purple-400" />
                </div>
                <CardTitle className="text-lg text-white">Student Analytics</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <CardDescription className="text-purple-100/80">
                  Comprehensive performance tracking with detailed insights and progress monitoring for every student
                </CardDescription>
                <div className="mt-4 flex justify-center">
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => setActiveFeature(0)}
                    className="border-purple-400/50 text-purple-200 hover:bg-purple-500/20"
                  >
                    Learn More
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Real-time Monitoring Card */}
            <Card className={`glass border-blue-500/30 bg-gradient-to-br from-blue-500/20 to-blue-600/10 hover:from-blue-500/30 hover:to-blue-600/20 transition-all duration-300 group cursor-pointer ${activeFeature === 1 ? 'ring-2 ring-blue-500/50' : ''}`}>
              <CardHeader className="text-center pb-3">
                <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center mx-auto mb-3 group-hover:bg-blue-500/30 transition-colors">
                  <Clock className="h-6 w-6 text-blue-400" />
                </div>
                <CardTitle className="text-lg text-white">Real-time Monitoring</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <CardDescription className="text-blue-100/80">
                  Live attendance tracking, instant notifications, and real-time updates for all stakeholders
                </CardDescription>
                <div className="mt-4 flex justify-center">
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => setActiveFeature(1)}
                    className="border-blue-400/50 text-blue-200 hover:bg-blue-500/20"
                  >
                    Explore
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Collaborative Tools Card */}
            <Card className={`glass border-green-500/30 bg-gradient-to-br from-green-500/20 to-green-600/10 hover:from-green-500/30 hover:to-green-600/20 transition-all duration-300 group cursor-pointer ${activeFeature === 2 ? 'ring-2 ring-green-500/50' : ''}`}>
              <CardHeader className="text-center pb-3">
                <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-3 group-hover:bg-green-500/30 transition-colors">
                  <Users className="h-6 w-6 text-green-400" />
                </div>
                <CardTitle className="text-lg text-white">Collaborative Tools</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <CardDescription className="text-green-100/80">
                  Seamless communication between students, parents, and teachers with integrated messaging
                </CardDescription>
                <div className="mt-4 flex justify-center">
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => setActiveFeature(2)}
                    className="border-green-400/50 text-green-200 hover:bg-green-500/20"
                  >
                    Discover
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Smart Insights Card */}
            <Card className={`glass border-orange-500/30 bg-gradient-to-br from-orange-500/20 to-orange-600/10 hover:from-orange-500/30 hover:to-orange-600/20 transition-all duration-300 group cursor-pointer ${activeFeature === 3 ? 'ring-2 ring-orange-500/50' : ''}`}>
              <CardHeader className="text-center pb-3">
                <div className="w-12 h-12 rounded-full bg-orange-500/20 flex items-center justify-center mx-auto mb-3 group-hover:bg-orange-500/30 transition-colors">
                  <Star className="h-6 w-6 text-orange-400" />
                </div>
                <CardTitle className="text-lg text-white">Smart Insights</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <CardDescription className="text-orange-100/80">
                  AI-powered recommendations and predictive analytics for improved educational outcomes
                </CardDescription>
                <div className="mt-4 flex justify-center">
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => setActiveFeature(3)}
                    className="border-orange-400/50 text-orange-200 hover:bg-orange-500/20"
                  >
                    See More
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Feature Details */}
          <div className="text-center">
            <Card className="glass border-border/30 bg-background/50 max-w-3xl mx-auto">
              <CardContent className="p-8">
                {activeFeature === 0 && (
                  <div className="space-y-4">
                    <h3 className="text-2xl font-semibold text-foreground">Advanced Student Analytics</h3>
                    <p className="text-muted-foreground">
                      Get deep insights into student performance with comprehensive analytics, grade tracking, 
                      attendance patterns, and personalized recommendations for academic improvement.
                    </p>
                    <div className="flex justify-center space-x-4 pt-4">
                      <CheckCircle className="h-5 w-5 text-green-500" />
                      <span className="text-sm text-muted-foreground">Performance Tracking</span>
                      <CheckCircle className="h-5 w-5 text-green-500" />
                      <span className="text-sm text-muted-foreground">Progress Reports</span>
                      <CheckCircle className="h-5 w-5 text-green-500" />
                      <span className="text-sm text-muted-foreground">Predictive Analysis</span>
                    </div>
                  </div>
                )}
                {activeFeature === 1 && (
                  <div className="space-y-4">
                    <h3 className="text-2xl font-semibold text-foreground">Real-time Monitoring</h3>
                    <p className="text-muted-foreground">
                      Monitor attendance, activities, and progress in real-time. Get instant notifications 
                      and updates to stay connected with educational activities as they happen.
                    </p>
                    <div className="flex justify-center space-x-4 pt-4">
                      <CheckCircle className="h-5 w-5 text-blue-500" />
                      <span className="text-sm text-muted-foreground">Live Attendance</span>
                      <CheckCircle className="h-5 w-5 text-blue-500" />
                      <span className="text-sm text-muted-foreground">Instant Alerts</span>
                      <CheckCircle className="h-5 w-5 text-blue-500" />
                      <span className="text-sm text-muted-foreground">Activity Tracking</span>
                    </div>
                  </div>
                )}
                {activeFeature === 2 && (
                  <div className="space-y-4">
                    <h3 className="text-2xl font-semibold text-foreground">Collaborative Tools</h3>
                    <p className="text-muted-foreground">
                      Foster better communication with integrated messaging, discussion forums, 
                      and collaborative workspaces for students, parents, and educators.
                    </p>
                    <div className="flex justify-center space-x-4 pt-4">
                      <CheckCircle className="h-5 w-5 text-green-500" />
                      <span className="text-sm text-muted-foreground">Group Messaging</span>
                      <CheckCircle className="h-5 w-5 text-green-500" />
                      <span className="text-sm text-muted-foreground">Discussion Forums</span>
                      <CheckCircle className="h-5 w-5 text-green-500" />
                      <span className="text-sm text-muted-foreground">File Sharing</span>
                    </div>
                  </div>
                )}
                {activeFeature === 3 && (
                  <div className="space-y-4">
                    <h3 className="text-2xl font-semibold text-foreground">Smart Insights</h3>
                    <p className="text-muted-foreground">
                      Leverage AI-powered analytics to get actionable insights, identify learning patterns, 
                      and receive personalized recommendations for academic success.
                    </p>
                    <div className="flex justify-center space-x-4 pt-4">
                      <CheckCircle className="h-5 w-5 text-orange-500" />
                      <span className="text-sm text-muted-foreground">AI Recommendations</span>
                      <CheckCircle className="h-5 w-5 text-orange-500" />
                      <span className="text-sm text-muted-foreground">Pattern Recognition</span>
                      <CheckCircle className="h-5 w-5 text-orange-500" />
                      <span className="text-sm text-muted-foreground">Success Metrics</span>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* CTA Section */}
          <div className="text-center mt-16">
            <h3 className="text-2xl font-semibold text-foreground mb-4">
              Ready to Transform Your Educational Experience?
            </h3>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join thousands of institutions already using EvolvEd to enhance their educational management and outcomes.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                onClick={onGetStarted}
                size="lg"
                className="bg-gradient-primary hover:bg-gradient-primary-hover text-white glow-hover group"
              >
                Start Free Trial
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                onClick={() => handleNavigation('contact')}
                className="border-border/50 text-foreground hover:bg-accent/10"
              >
                Contact Sales
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}