import React, { useState, useEffect } from 'react';
import { ArrowLeft, Phone, Mail, MessageSquare, Clock, Send, CheckCircle, FileText, Video, Users, Headphones, HelpCircle, Sparkles, Star } from 'lucide-react';

interface SupportPageProps {
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
  className = "",
  type = "button"
}: { 
  onClick?: () => void; 
  children: React.ReactNode; 
  variant?: "default" | "outline"; 
  size?: "default" | "lg";
  className?: string;
  type?: "button" | "submit";
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
      type={type}
      onClick={onClick}
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`}
    >
      {/* Button shimmer effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
      <span className="relative z-10">{children}</span>
    </button>
  );
};

const Input = ({ 
  id, 
  type = "text", 
  placeholder, 
  value, 
  onChange, 
  required = false,
  className = ""
}: { 
  id?: string; 
  type?: string; 
  placeholder?: string; 
  value: string; 
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; 
  required?: boolean;
  className?: string;
}) => (
  <input
    id={id}
    type={type}
    placeholder={placeholder}
    value={value}
    onChange={onChange}
    required={required}
    className={`flex h-11 w-full rounded-lg border border-white/30 bg-white/10 backdrop-blur-sm px-4 py-2 text-sm text-white placeholder:text-white/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:border-blue-500 transition-all duration-200 hover:border-white/40 ${className}`}
  />
);

const Textarea = ({ 
  id, 
  placeholder, 
  value, 
  onChange, 
  required = false,
  rows = 4,
  className = ""
}: { 
  id?: string; 
  placeholder?: string; 
  value: string; 
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void; 
  required?: boolean;
  rows?: number;
  className?: string;
}) => (
  <textarea
    id={id}
    placeholder={placeholder}
    value={value}
    onChange={onChange}
    required={required}
    rows={rows}
    className={`flex min-h-[80px] w-full rounded-lg border border-white/30 bg-white/10 backdrop-blur-sm px-4 py-3 text-sm text-white placeholder:text-white/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:border-blue-500 transition-all duration-200 hover:border-white/40 resize-vertical ${className}`}
  />
);

const Select = ({ 
  id, 
  value, 
  onChange, 
  children, 
  required = false,
  className = ""
}: { 
  id?: string; 
  value: string; 
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void; 
  children: React.ReactNode; 
  required?: boolean;
  className?: string;
}) => (
  <select
    id={id}
    value={value}
    onChange={onChange}
    required={required}
    className={`flex h-11 w-full rounded-lg border border-white/30 bg-white/10 backdrop-blur-sm px-4 py-2 text-sm text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:border-blue-500 transition-all duration-200 hover:border-white/40 ${className}`}
  >
    {children}
  </select>
);

const Label = ({ htmlFor, children, className = "" }: { htmlFor?: string; children: React.ReactNode; className?: string }) => (
  <label htmlFor={htmlFor} className={`text-sm font-medium leading-none text-white ${className}`}>
    {children}
  </label>
);

export function SupportPage({ onBack }: SupportPageProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    priority: 'medium'
  });

  useEffect(() => {
    setIsVisible(true);
    
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Support ticket submitted successfully! We\'ll get back to you within 24 hours.');
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: '',
      priority: 'medium'
    });
  };

  const supportChannels = [
    {
      icon: Phone,
      title: "Phone Support",
      description: "Speak directly with our support team for urgent issues",
      contact: "+1 (555) 123-4567",
      availability: "24/7 Support",
      color: "from-blue-500 to-cyan-500",
      glowColor: "shadow-blue-500/25"
    },
    {
      icon: Mail,
      title: "Email Support",
      description: "Send us detailed questions and get comprehensive answers",
      contact: "support@evolved.edu",
      availability: "Response within 24hrs",
      color: "from-purple-500 to-pink-500",
      glowColor: "shadow-purple-500/25"
    },
    {
      icon: MessageSquare,
      title: "Live Chat",
      description: "Get instant help with our real-time chat support",
      contact: "Available on platform",
      availability: "Mon-Fri 9AM-6PM",
      color: "from-green-500 to-emerald-500",
      glowColor: "shadow-green-500/25"
    }
  ];

  const resources = [
    {
      icon: FileText,
      title: "Documentation",
      description: "Comprehensive guides and tutorials for all features"
    },
    {
      icon: Video,
      title: "Video Tutorials",
      description: "Step-by-step video guides for quick learning"
    },
    {
      icon: Users,
      title: "Community Forum",
      description: "Connect with other users and share experiences"
    },
    {
      icon: HelpCircle,
      title: "FAQ Section",
      description: "Find answers to frequently asked questions"
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
              <Headphones className="h-8 w-8 text-yellow-400 mr-3 animate-pulse" />
              <span className="text-yellow-400 font-medium">SUPPORT CENTER</span>
              <Headphones className="h-8 w-8 text-yellow-400 ml-3 animate-pulse" />
            </div>
            
            <h1 className={`text-4xl md:text-6xl font-bold text-white mb-6 transition-all duration-1000 delay-300 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
              We're Here to
              <span className="block bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-gradient">
                Help You Succeed
              </span>
            </h1>
            <p className={`text-xl text-white/70 max-w-3xl mx-auto leading-relaxed transition-all duration-1000 delay-500 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
              Get the support you need, when you need it. Our dedicated team is committed 
              to ensuring your success with our platform.
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 pb-16 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
          {/* Support Channels */}
          <div className={`transition-all duration-1000 delay-600 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <h2 className="text-2xl font-bold text-white mb-8 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Contact Support</h2>
            <div className="space-y-6">
              {supportChannels.map((channel, index) => (
                <Card 
                  key={index} 
                  delay={800 + index * 150}
                  className={`group hover:${channel.glowColor} hover:shadow-2xl transition-all duration-500 ${isVisible ? 'animate-fadeInUp' : 'opacity-0'}`}
                  style={{ animationDelay: `${800 + index * 150}ms` }}
                >
                  <CardContent className="flex items-start gap-4">
                    <div className={`w-14 h-14 rounded-xl bg-gradient-to-r ${channel.color} flex items-center justify-center group-hover:scale-125 group-hover:rotate-12 transition-all duration-500 relative`}>
                      <channel.icon className="h-7 w-7 text-white" />
                      <div className={`absolute inset-0 rounded-xl bg-gradient-to-r ${channel.color} opacity-0 group-hover:opacity-50 blur-lg transition-opacity duration-500`}></div>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-white mb-1 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-blue-200 group-hover:bg-clip-text transition-all duration-300">{channel.title}</h3>
                      <p className="text-white/70 text-sm mb-2 group-hover:text-white/90 transition-colors duration-300">{channel.description}</p>
                      <p className="text-blue-400 font-medium group-hover:text-blue-300 transition-colors duration-300">{channel.contact}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <Clock className="h-4 w-4 text-green-400 group-hover:scale-110 transition-transform duration-300" />
                        <span className="text-green-400 text-sm group-hover:text-green-300 transition-colors duration-300">{channel.availability}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Contact Form */}
          <div className={`transition-all duration-1000 delay-900 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <h2 className="text-2xl font-bold text-white mb-8 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Send us a Message</h2>
            <Card className="hover:scale-105 hover:shadow-2xl transition-all duration-500">
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        placeholder="Enter your full name"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        placeholder="your.email@example.com"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="priority">Priority Level</Label>
                    <Select
                      id="priority"
                      value={formData.priority}
                      onChange={(e) => handleInputChange('priority', e.target.value)}
                      required
                    >
                      <option value="low">Low - General inquiry</option>
                      <option value="medium">Medium - Standard support</option>
                      <option value="high">High - Urgent issue</option>
                      <option value="critical">Critical - System down</option>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject</Label>
                    <Input
                      id="subject"
                      value={formData.subject}
                      onChange={(e) => handleInputChange('subject', e.target.value)}
                      placeholder="Brief description of your issue"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea
                      id="message"
                      value={formData.message}
                      onChange={(e) => handleInputChange('message', e.target.value)}
                      placeholder="Please provide detailed information about your issue or question..."
                      rows={6}
                      required
                    />
                  </div>

                  <Button type="submit" size="lg" className="w-full gap-2">
                    <Send className="h-5 w-5" />
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Help Resources */}
        <div className={`text-center mb-12 transition-all duration-1000 delay-1200 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Self-Help Resources
          </h2>
          <p className="text-white/70 text-lg max-w-2xl mx-auto">
            Find answers quickly with our comprehensive help resources
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {resources.map((resource, index) => (
            <Card 
              key={index} 
              delay={1400 + index * 100}
              className={`text-center group hover:scale-110 hover:rotate-1 hover:shadow-2xl cursor-pointer transition-all duration-500 ${isVisible ? 'animate-fadeInUp' : 'opacity-0'}`}
              style={{ animationDelay: `${1400 + index * 100}ms` }}
            >
              <CardContent className="pt-8">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center mx-auto mb-4 group-hover:scale-125 group-hover:rotate-180 transition-all duration-700 relative">
                  <resource.icon className="h-7 w-7 text-white" />
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 opacity-0 group-hover:opacity-30 blur-md animate-pulse"></div>
                </div>
                <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-purple-400 group-hover:bg-clip-text transition-all duration-300">{resource.title}</h3>
                <p className="text-white/70 text-sm group-hover:text-white/90 transition-colors duration-300">{resource.description}</p>
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
              <Headphones className="h-8 w-8 text-white" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Need Immediate Assistance?
            </h2>
            <p className="text-white/70 mb-8 max-w-2xl mx-auto">
              Our support team is standing by to help you resolve any issues and get the most out of our platform.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="gap-2 hover:scale-110 hover:-translate-y-2">
                <Phone className="h-5 w-5" />
                Call Support Now
              </Button>
              <Button variant="outline" size="lg" className="hover:scale-110 hover:-translate-y-2">
                Start Live Chat
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
