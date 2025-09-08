import React, { useState, useEffect } from 'react';
import { ArrowLeft, BarChart3, Clock, Users, Star, Shield, Zap, CheckCircle, BookOpen, Brain, Target, Sparkles } from 'lucide-react';

interface FeaturesPageProps {
  onBack: () => void;
}

// Self-contained UI Components with Advanced CSS
const Card = ({ children, className = "", delay = 0, ...props }: { children: React.ReactNode; className?: string; delay?: number; [key: string]: any }) => (
  <div 
    className={`bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-105 hover:rotate-1 hover:border-white/40 relative overflow-hidden group ${className}`} 
    style={{ animationDelay: `${delay}ms` }}
    {...props}
  >
    {/* Animated gradient overlay */}
    <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 via-purple-500/10 to-pink-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
    
    {/* Shimmer effect */}
    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
    
    <div className="relative z-10">
      {children}
    </div>
  </div>
);

const CardHeader = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <div className={`p-6 pb-3 ${className}`}>
    {children}
  </div>
);

const CardContent = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <div className={`p-6 pt-3 ${className}`}>
    {children}
  </div>
);

const CardTitle = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <h3 className={`text-xl font-semibold text-white mb-2 ${className}`}>
    {children}
  </h3>
);

const CardDescription = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <p className={`text-white/70 leading-relaxed ${className}`}>
    {children}
  </p>
);

const Button = ({ 
  onClick, 
  children, 
  variant = "default", 
  size = "default", 
  className = ""
}: { 
  onClick?: () => void; 
  children: React.ReactNode; 
  variant?: "default" | "outline"; 
  size?: "default" | "lg";
  className?: string;
}) => {
  const baseClasses = "inline-flex items-center justify-center rounded-xl font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 relative overflow-hidden group";
  
  const variants = {
    default: "bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white hover:from-blue-700 hover:via-purple-700 hover:to-pink-700 shadow-lg hover:shadow-2xl hover:scale-110 hover:-translate-y-1",
    outline: "border border-white/30 text-white hover:bg-white/10 backdrop-blur-sm hover:border-white/50 hover:scale-105"
  };
  
  const sizes = {
    default: "h-10 px-4 py-2",
    lg: "h-12 px-6 py-3"
  };

  return (
    <button
      onClick={onClick}
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`}
    >
      {/* Button shimmer effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
      <span className="relative z-10">{children}</span>
    </button>
  );
};

export function FeaturesPage({ onBack }: FeaturesPageProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    setIsVisible(true);
    
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);
  const features = [
    {
      icon: BarChart3,
      title: "Advanced Analytics",
      description: "Transform raw data into actionable insights with comprehensive dashboards and intelligent reporting tools.",
      highlights: ["Real-time data visualization", "Predictive analytics", "Custom report generation"],
      color: "from-purple-500 to-pink-500",
      glowColor: "shadow-purple-500/25"
    },
    {
      icon: Clock,
      title: "Real-time Monitoring",
      description: "Stay connected with live updates on attendance, performance, and student engagement metrics.",
      highlights: ["Live attendance tracking", "Performance alerts", "Instant notifications"],
      color: "from-blue-500 to-cyan-500",
      glowColor: "shadow-blue-500/25"
    },
    {
      icon: Users,
      title: "Collaborative Learning",
      description: "Foster meaningful connections with integrated communication and project management tools.",
      highlights: ["Team collaboration", "Discussion forums", "Peer-to-peer learning"],
      color: "from-green-500 to-emerald-500",
      glowColor: "shadow-green-500/25"
    },
    {
      icon: Brain,
      title: "AI-Powered Insights",
      description: "Leverage machine learning to provide personalized learning paths and intelligent recommendations.",
      highlights: ["Personalized recommendations", "Learning pattern analysis", "Smart content delivery"],
      color: "from-orange-500 to-red-500",
      glowColor: "shadow-orange-500/25"
    },
    {
      icon: Shield,
      title: "Enterprise Security",
      description: "Bank-level encryption and compliance standards to protect your sensitive educational data.",
      highlights: ["End-to-end encryption", "FERPA compliance", "Multi-factor authentication"],
      color: "from-red-500 to-pink-500",
      glowColor: "shadow-red-500/25"
    },
    {
      icon: Zap,
      title: "Lightning Performance",
      description: "Experience blazing-fast load times with our optimized cloud infrastructure and caching.",
      highlights: ["Sub-second response times", "99.9% uptime guarantee", "Global CDN delivery"],
      color: "from-yellow-500 to-orange-500",
      glowColor: "shadow-yellow-500/25"
    }
  ];

  const benefits = [
    {
      icon: Target,
      title: "Improved Outcomes",
      description: "Boost student success rates by up to 40% with data-driven insights"
    },
    {
      icon: BookOpen,
      title: "Enhanced Learning",
      description: "Personalized learning experiences that adapt to each student's needs"
    },
    {
      icon: CheckCircle,
      title: "Streamlined Operations",
      description: "Reduce administrative workload by 60% with automated processes"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500/30 rounded-full mix-blend-multiply filter blur-xl animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500/30 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000"></div>
        <div className="absolute top-40 left-40 w-80 h-80 bg-pink-500/30 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000"></div>
      </div>

      {/* Mouse follower effect */}
      <div 
        className="fixed w-96 h-96 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full pointer-events-none z-0 transition-all duration-300 ease-out"
        style={{
          left: mousePosition.x - 192,
          top: mousePosition.y - 192,
          filter: 'blur(40px)'
        }}
      ></div>

      {/* Header */}
      <div className={`relative z-10 transition-all duration-1000 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
        <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
        <div className="relative container mx-auto px-6 py-8">
          <Button
            variant="outline"
            onClick={onBack}
            className="gap-2 mb-8 hover:scale-110"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Button>
          
          <div className="text-center mb-16">
            <div className="flex items-center justify-center mb-6">
              <Sparkles className="h-8 w-8 text-yellow-400 mr-3 animate-pulse" />
              <span className="text-yellow-400 font-medium">ADVANCED FEATURES</span>
              <Sparkles className="h-8 w-8 text-yellow-400 ml-3 animate-pulse" />
            </div>
            
            <h1 className={`text-4xl md:text-6xl font-bold text-white mb-6 transition-all duration-1000 delay-300 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
              Powerful Features for
              <span className="block bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-gradient">
                Modern Education
              </span>
            </h1>
            <p className={`text-xl text-white/70 max-w-3xl mx-auto leading-relaxed transition-all duration-1000 delay-500 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
              Discover the comprehensive suite of tools designed to enhance learning, 
              streamline administration, and drive educational excellence.
            </p>
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="container mx-auto px-6 pb-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {features.map((feature, index) => (
            <Card 
              key={index} 
              delay={index * 200}
              className={`group hover:${feature.glowColor} hover:shadow-2xl hover:border-gradient transition-all duration-500 ${isVisible ? 'animate-fadeInUp' : 'opacity-0'}`}
              style={{ animationDelay: `${600 + index * 200}ms` }}
            >
              <CardHeader>
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${feature.color} flex items-center justify-center mb-4 group-hover:scale-125 group-hover:rotate-12 transition-all duration-500 relative`}>
                  <feature.icon className="h-8 w-8 text-white" />
                  {/* Glow effect */}
                  <div className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${feature.color} opacity-0 group-hover:opacity-50 blur-lg transition-opacity duration-500`}></div>
                </div>
                <CardTitle className="group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-blue-200 group-hover:bg-clip-text transition-all duration-300">
                  {feature.title}
                </CardTitle>
                <CardDescription>{feature.description}</CardDescription>
              </CardHeader>
              
              <CardContent>
                <div className="space-y-3">
                  <h4 className="text-white font-medium mb-3 flex items-center gap-2">
                    <Star className="h-4 w-4 text-yellow-400" />
                    Key Highlights:
                  </h4>
                  {feature.highlights.map((highlight, highlightIndex) => (
                    <div 
                      key={highlightIndex} 
                      className="flex items-start gap-3 group-hover:translate-x-2 transition-transform duration-300"
                      style={{ transitionDelay: `${highlightIndex * 100}ms` }}
                    >
                      <CheckCircle className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0 group-hover:scale-110 transition-transform duration-300" />
                      <span className="text-white/80 text-sm group-hover:text-white transition-colors duration-300">{highlight}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Benefits Section */}
        <div className={`text-center mb-12 transition-all duration-1000 delay-1000 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Measurable Impact
          </h2>
          <p className="text-white/70 text-lg max-w-2xl mx-auto">
            Our features deliver real results that transform educational outcomes
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {benefits.map((benefit, index) => (
            <Card 
              key={index} 
              delay={1200 + index * 150}
              className={`text-center group hover:scale-110 hover:rotate-1 hover:shadow-2xl transition-all duration-500 ${isVisible ? 'animate-fadeInUp' : 'opacity-0'}`}
              style={{ animationDelay: `${1200 + index * 150}ms` }}
            >
              <CardContent className="pt-8">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center mx-auto mb-4 group-hover:scale-125 group-hover:rotate-180 transition-all duration-700 relative">
                  <benefit.icon className="h-7 w-7 text-white" />
                  {/* Pulsing glow */}
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 opacity-0 group-hover:opacity-30 blur-md animate-pulse"></div>
                </div>
                <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-purple-400 group-hover:bg-clip-text transition-all duration-300">
                  {benefit.title}
                </h3>
                <p className="text-white/70 group-hover:text-white/90 transition-colors duration-300">{benefit.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA Section */}
        <Card className={`text-center bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-pink-600/20 border-blue-500/30 hover:border-purple-500/50 hover:scale-105 transition-all duration-700 relative overflow-hidden ${isVisible ? 'animate-fadeInUp' : 'opacity-0'}`} style={{ animationDelay: '1800ms' }}>
          {/* Animated background particles */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-10 left-10 w-2 h-2 bg-blue-400 rounded-full animate-ping"></div>
            <div className="absolute top-20 right-20 w-1 h-1 bg-purple-400 rounded-full animate-pulse"></div>
            <div className="absolute bottom-10 left-20 w-1.5 h-1.5 bg-pink-400 rounded-full animate-bounce"></div>
            <div className="absolute bottom-20 right-10 w-1 h-1 bg-yellow-400 rounded-full animate-ping animation-delay-1000"></div>
          </div>
          
          <CardContent className="py-12 relative z-10">
            <div className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 flex items-center justify-center mx-auto mb-6 animate-bounce">
              <Star className="h-8 w-8 text-white" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Experience These Features Today
            </h2>
            <p className="text-white/70 mb-8 max-w-2xl mx-auto">
              Join thousands of educators and students already benefiting from our comprehensive platform.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="gap-2 hover:scale-110 hover:-translate-y-2">
                <Sparkles className="h-5 w-5" />
                Start Free Trial
              </Button>
              <Button variant="outline" size="lg" className="hover:scale-110 hover:-translate-y-2">
                View Demo
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <style jsx>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(50px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes gradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        
        .animate-blob {
          animation: blob 7s infinite;
        }
        
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        
        .animation-delay-1000 {
          animation-delay: 1s;
        }
        
        .animate-fadeInUp {
          animation: fadeInUp 0.8s ease-out forwards;
        }
        
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 3s ease infinite;
        }
      `}</style>
    </div>
  );
}