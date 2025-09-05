import { ArrowRight, BookOpen, Users, TrendingUp, Shield, Play, Pause } from "lucide-react";
import { Button } from "./ui/button";
import { useState } from "react";

interface LandingPageProps {
  onGetStarted: () => void;
}

export function LandingPage({ onGetStarted }: LandingPageProps) {
  const [isPlaying, setIsPlaying] = useState(true);

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
                <button className="text-muted-foreground hover:text-foreground transition-colors">
                  Home
                </button>
                <button className="text-muted-foreground hover:text-foreground transition-colors">
                  Features
                </button>
                <button className="text-muted-foreground hover:text-foreground transition-colors">
                  Solutions
                </button>
                <button className="text-muted-foreground hover:text-foreground transition-colors">
                  Pricing
                </button>
                <button className="text-muted-foreground hover:text-foreground transition-colors">
                  Support
                </button>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <Button variant="ghost" className="hidden sm:inline-flex text-muted-foreground hover:text-foreground">
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
                  <span className="block text-gradient animate-gradient">
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
                    className="border-border/50 text-foreground hover:bg-accent/10"
                  >
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
                  <div className="text-gradient animate-gradient opacity-90">
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
        
        {/* Background Decorations */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl"></div>
        </div>
      </main>
    </div>
  );
}