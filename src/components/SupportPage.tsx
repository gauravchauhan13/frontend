import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Badge } from './ui/badge';
import { 
  ArrowLeft, 
  Phone,
  Mail,
  MessageSquare,
  Clock,
  Send,
  CheckCircle,
  FileText,
  Video,
  Users,
  Headphones,
  Sparkles,
  HelpCircle
} from 'lucide-react';

interface SupportPageProps {
  onBack: () => void;
}

export function SupportPage({ onBack }: SupportPageProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    priority: 'medium'
  });

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
      icon: MessageSquare,
      title: "Live Chat",
      description: "Get instant help from our support team",
      availability: "24/7 Available",
      gradient: "from-blue-500 to-cyan-500",
      textColor: "text-blue-400"
    },
    {
      icon: Phone,
      title: "Phone Support",
      description: "Speak directly with our experts",
      availability: "Mon-Fri 9AM-6PM",
      gradient: "from-green-500 to-emerald-500",
      textColor: "text-green-400"
    },
    {
      icon: Mail,
      title: "Email Support",
      description: "Send us detailed questions and feedback",
      availability: "Response within 4 hours",
      gradient: "from-purple-500 to-pink-500",
      textColor: "text-purple-400"
    },
    {
      icon: Video,
      title: "Screen Share",
      description: "Get personalized assistance with screen sharing",
      availability: "By appointment",
      gradient: "from-orange-500 to-red-500",
      textColor: "text-orange-400"
    }
  ];

  const resources = [
    {
      icon: FileText,
      title: "Documentation",
      description: "Comprehensive guides and tutorials",
      count: "200+ Articles"
    },
    {
      icon: Video,
      title: "Video Tutorials",
      description: "Step-by-step video walkthroughs",
      count: "50+ Videos"
    },
    {
      icon: Users,
      title: "Community Forum",
      description: "Connect with other users and experts",
      count: "10K+ Members"
    },
    {
      icon: HelpCircle,
      title: "FAQ",
      description: "Quick answers to common questions",
      count: "100+ Questions"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      {/* Floating Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <motion.div 
          animate={{ 
            rotate: 360,
            scale: [1, 1.1, 1],
          }}
          transition={{ 
            duration: 25,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute top-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full blur-3xl"
        />
        <motion.div 
          animate={{ 
            rotate: -360,
            scale: [1, 1.2, 1],
          }}
          transition={{ 
            duration: 30,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-full blur-3xl"
        />
      </div>

      {/* Header */}
      <motion.header 
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="sticky top-0 z-50 border-b border-border/20 bg-background/80 backdrop-blur-xl"
      >
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <motion.div 
              className="flex items-center space-x-3"
              whileHover={{ scale: 1.05 }}
            >
              <div className="relative">
                <Headphones className="h-8 w-8 text-primary" />
                <Sparkles className="h-4 w-4 text-yellow-400 absolute -top-1 -right-1 animate-pulse" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-primary to-purple-400 bg-clip-text text-transparent">
                EvolvEd Support
              </span>
            </motion.div>
            <Button 
              variant="ghost" 
              onClick={onBack} 
              className="text-muted-foreground hover:text-foreground hover:bg-accent/50 transition-all duration-200"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Button>
          </div>
        </div>
      </motion.header>

      {/* Main Content */}
      <main className="relative">
        {/* Hero Section */}
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="py-24 sm:py-32 text-center relative"
        >
          <div className="mx-auto max-w-4xl px-6 lg:px-8">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h1 className="text-4xl lg:text-7xl font-bold mb-8 leading-tight">
                <span className="bg-gradient-to-r from-foreground via-primary to-purple-400 bg-clip-text text-transparent">
                  We're Here
                </span>
                <br />
                <span className="text-foreground">to Help You Succeed</span>
              </h1>
            </motion.div>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-xl text-muted-foreground mx-auto leading-relaxed mb-12 max-w-3xl"
            >
              Get the support you need, when you need it. Our dedicated team is ready to help you make the most of EvolvEd.
            </motion.p>
          </div>
        </motion.section>

        {/* Support Channels */}
        <motion.section 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="py-24 sm:py-32"
        >
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <motion.div 
              variants={itemVariants}
              className="text-center max-w-3xl mx-auto mb-20"
            >
              <h2 className="text-3xl lg:text-5xl font-bold mb-6 bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
                Multiple Ways to Get Support
              </h2>
              <p className="text-muted-foreground text-xl leading-relaxed">
                Choose the support channel that works best for you and your schedule.
              </p>
            </motion.div>

            <motion.div 
              variants={containerVariants}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
            >
              {supportChannels.map((channel, index) => {
                const Icon = channel.icon;
                return (
                  <motion.div
                    key={channel.title}
                    variants={itemVariants}
                    whileHover={{ y: -10, scale: 1.02 }}
                    className="group"
                  >
                    <Card className="relative bg-card/50 backdrop-blur-xl border-border/20 p-6 text-center transition-all duration-500 group-hover:border-border/40 group-hover:shadow-2xl group-hover:shadow-primary/10 overflow-hidden h-full">
                      {/* Gradient Background */}
                      <div className={`absolute inset-0 bg-gradient-to-br ${channel.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />
                      
                      {/* Icon Container */}
                      <motion.div 
                        whileHover={{ rotate: 5, scale: 1.1 }}
                        className="relative w-16 h-16 rounded-2xl bg-gradient-to-br from-background to-muted/50 flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:shadow-xl transition-shadow duration-300"
                      >
                        <Icon className={`h-8 w-8 ${channel.textColor} transition-colors group-hover:scale-110`} />
                        <div className={`absolute inset-0 bg-gradient-to-br ${channel.gradient} opacity-10 rounded-2xl`} />
                      </motion.div>
                      
                      <h3 className="text-lg font-bold mb-2 text-foreground group-hover:text-foreground transition-colors">
                        {channel.title}
                      </h3>
                      <p className="text-sm text-muted-foreground mb-3 leading-relaxed">
                        {channel.description}
                      </p>
                      
                      <Badge variant="secondary" className="text-xs mb-4">
                        {channel.availability}
                      </Badge>

                      <Button 
                        className={`w-full bg-gradient-to-r ${channel.gradient} hover:opacity-90 text-white shadow-lg transition-all duration-300`}
                        size="sm"
                      >
                        Contact Now
                      </Button>
                    </Card>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </motion.section>

        {/* Contact Form & Resources */}
        <motion.section 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="py-24 sm:py-32"
        >
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Contact Form */}
              <motion.div
                initial={{ x: -50, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                viewport={{ once: true }}
              >
                <Card className="bg-card/50 backdrop-blur-xl border-border/20 p-8 shadow-xl">
                  <CardHeader className="text-center pb-6">
                    <CardTitle className="text-2xl font-bold mb-2">Send us a Message</CardTitle>
                    <CardDescription className="text-base">
                      Can't find what you're looking for? Send us a detailed message and we'll get back to you.
                    </CardDescription>
                  </CardHeader>
                  
                  <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="name" className="block text-sm font-medium mb-2">
                            Name
                          </label>
                          <Input
                            id="name"
                            value={formData.name}
                            onChange={(e) => setFormData({...formData, name: e.target.value})}
                            placeholder="Your full name"
                            required
                            className="bg-background/50 border-border/50"
                          />
                        </div>
                        <div>
                          <label htmlFor="email" className="block text-sm font-medium mb-2">
                            Email
                          </label>
                          <Input
                            id="email"
                            type="email"
                            value={formData.email}
                            onChange={(e) => setFormData({...formData, email: e.target.value})}
                            placeholder="your.email@example.com"
                            required
                            className="bg-background/50 border-border/50"
                          />
                        </div>
                      </div>
                      
                      <div>
                        <label htmlFor="subject" className="block text-sm font-medium mb-2">
                          Subject
                        </label>
                        <Input
                          id="subject"
                          value={formData.subject}
                          onChange={(e) => setFormData({...formData, subject: e.target.value})}
                          placeholder="Brief description of your issue"
                          required
                          className="bg-background/50 border-border/50"
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="message" className="block text-sm font-medium mb-2">
                          Message
                        </label>
                        <Textarea
                          id="message"
                          value={formData.message}
                          onChange={(e) => setFormData({...formData, message: e.target.value})}
                          placeholder="Please provide as much detail as possible..."
                          required
                          className="bg-background/50 border-border/50 min-h-[120px]"
                        />
                      </div>
                      
                      <Button 
                        type="submit" 
                        className="w-full bg-gradient-to-r from-primary to-purple-500 hover:from-primary/90 hover:to-purple-500/90 text-white shadow-lg"
                        size="lg"
                      >
                        <Send className="h-4 w-4 mr-2" />
                        Send Message
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Resources */}
              <motion.div
                initial={{ x: 50, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                viewport={{ once: true }}
                className="space-y-6"
              >
                <div>
                  <h3 className="text-2xl font-bold mb-4">Self-Service Resources</h3>
                  <p className="text-muted-foreground mb-8">
                    Find answers quickly with our comprehensive knowledge base.
                  </p>
                </div>

                <motion.div 
                  variants={containerVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  className="grid grid-cols-1 sm:grid-cols-2 gap-4"
                >
                  {resources.map((resource, index) => {
                    const Icon = resource.icon;
                    return (
                      <motion.div
                        key={resource.title}
                        variants={itemVariants}
                        whileHover={{ scale: 1.05 }}
                        className="group"
                      >
                        <Card className="bg-card/30 backdrop-blur-xl border-border/20 p-6 transition-all duration-300 group-hover:border-border/40 group-hover:shadow-lg cursor-pointer">
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-purple-500/20 flex items-center justify-center">
                              <Icon className="h-6 w-6 text-primary" />
                            </div>
                            <div className="flex-1">
                              <h4 className="font-semibold text-foreground mb-1">
                                {resource.title}
                              </h4>
                              <p className="text-sm text-muted-foreground mb-2">
                                {resource.description}
                              </p>
                              <Badge variant="outline" className="text-xs">
                                {resource.count}
                              </Badge>
                            </div>
                          </div>
                        </Card>
                      </motion.div>
                    );
                  })}
                </motion.div>

                {/* Contact Info */}
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  className="mt-8"
                >
                  <Card className="bg-gradient-to-br from-primary/10 to-purple-500/10 backdrop-blur-xl border-border/20 p-6">
                    <h4 className="font-bold text-lg mb-4">Get in Touch</h4>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <Mail className="h-4 w-4 text-primary" />
                        <span className="text-sm">support@evolved.com</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Phone className="h-4 w-4 text-primary" />
                        <span className="text-sm">+1 (555) 123-4567</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Clock className="h-4 w-4 text-primary" />
                        <span className="text-sm">Monday - Friday, 9AM - 6PM EST</span>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </motion.section>
      </main>
    </div>
  );
}
