import React from 'react';
import { motion } from 'framer-motion';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './ui/accordion';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { 
  BarChart3, Clock, Users, Star, ArrowLeft, CheckCircle, Shield, Zap, BookOpen, MoveRight, Sparkles
} from 'lucide-react';

interface FeaturesPageProps {
  onBack: () => void;
}

export function FeaturesPage({ onBack }: FeaturesPageProps) {
  const features = [
    { icon: BarChart3, title: "Advanced Analytics", description: "Transform raw data into actionable insights with our AI-powered analytics dashboard.", color: "from-purple-500 to-pink-500", textColor: "text-purple-400" },
    { icon: Clock, title: "Real-time Monitoring", description: "Stay connected with live updates on attendance, performance, and engagement metrics.", color: "from-blue-500 to-cyan-500", textColor: "text-blue-400" },
    { icon: Users, title: "Collaborative Learning", description: "Foster meaningful connections with integrated communication and project management tools.", color: "from-green-500 to-emerald-500", textColor: "text-green-400" },
    { icon: Star, title: "Smart Recommendations", description: "Leverage machine learning to provide personalized learning paths and insights.", color: "from-orange-500 to-red-500", textColor: "text-orange-400" },
    { icon: Shield, title: "Enterprise Security", description: "Bank-level encryption and compliance standards to protect your sensitive data.", color: "from-red-500 to-pink-500", textColor: "text-red-400" },
    { icon: Zap, title: "Lightning Performance", description: "Experience blazing-fast load times with our optimized cloud infrastructure.", color: "from-yellow-500 to-orange-500", textColor: "text-yellow-400" },
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
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full blur-3xl"
        />
        <motion.div 
          animate={{ 
            rotate: -360,
            scale: [1, 1.2, 1],
          }}
          transition={{ 
            duration: 25,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-full blur-3xl"
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
                <BookOpen className="h-8 w-8 text-primary" />
                <Sparkles className="h-4 w-4 text-yellow-400 absolute -top-1 -right-1 animate-pulse" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-primary to-purple-400 bg-clip-text text-transparent">
                EvolvEd Features
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
                  Revolutionary
                </span>
                <br />
                <span className="text-foreground">Education Technology</span>
              </h1>
            </motion.div>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-xl text-muted-foreground mx-auto leading-relaxed mb-12 max-w-3xl"
            >
              Transform your educational institution with cutting-edge features designed for the modern learning environment.
            </motion.p>
            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="flex gap-6 justify-center flex-wrap"
            >
              <Button size="lg" className="bg-gradient-to-r from-primary to-purple-500 hover:from-primary/90 hover:to-purple-500/90 text-white shadow-lg shadow-primary/25 px-8">
                Explore Features
              </Button>
              <Button size="lg" variant="outline" className="border-border/50 hover:bg-accent/50 backdrop-blur-sm px-8">
                Watch Demo
              </Button>
            </motion.div>
          </div>
        </motion.section>
        
        {/* Features Grid Section */}
        <motion.section 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="py-24 sm:py-32 relative"
        >
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <motion.div 
              variants={itemVariants}
              className="text-center max-w-3xl mx-auto mb-20"
            >
              <h2 className="text-3xl lg:text-5xl font-bold mb-6 bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
                Powerful Features for Modern Education
              </h2>
              <p className="text-muted-foreground text-xl leading-relaxed">
                Discover how our comprehensive suite of tools can revolutionize your educational experience.
              </p>
            </motion.div>
            
            <motion.div 
              variants={containerVariants}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <motion.div
                    key={feature.title}
                    variants={itemVariants}
                    whileHover={{ y: -10, scale: 1.02 }}
                    className="group"
                  >
                    <Card className="relative bg-card/50 backdrop-blur-xl border-border/20 p-8 text-center transition-all duration-500 group-hover:border-border/40 group-hover:shadow-2xl group-hover:shadow-primary/10 overflow-hidden h-full">
                      {/* Gradient Background */}
                      <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />
                      
                      {/* Icon Container */}
                      <motion.div 
                        whileHover={{ rotate: 5, scale: 1.1 }}
                        className="relative w-20 h-20 rounded-2xl bg-gradient-to-br from-background to-muted/50 flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:shadow-xl transition-shadow duration-300"
                      >
                        <Icon className={`h-10 w-10 ${feature.textColor} transition-colors group-hover:scale-110`} />
                        <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-10 rounded-2xl`} />
                      </motion.div>
                      
                      <h3 className="text-xl font-bold mb-4 text-foreground group-hover:text-foreground transition-colors">
                        {feature.title}
                      </h3>
                      <p className="text-muted-foreground leading-relaxed mb-6 group-hover:text-muted-foreground/80 transition-colors">
                        {feature.description}
                      </p>
                      
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        whileHover={{ opacity: 1, y: 0 }}
                        className="opacity-0 group-hover:opacity-100 transition-all duration-300"
                      >
                        <Button variant="ghost" size="sm" className={`${feature.textColor} hover:bg-accent/50`}>
                          Learn More
                          <MoveRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                        </Button>
                      </motion.div>
                    </Card>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </motion.section>

        {/* Central Feature Showcase with Gradient Background */}
        <motion.section 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="relative py-24 sm:py-32"
        >
          {/* Glowing Gradient Background */}
          <div className="absolute inset-0 -z-10 overflow-hidden">
            <div className="absolute left-1/2 top-0 h-[40rem] w-[80rem] -translate-x-1/2 bg-[radial-gradient(50%_50%_at_50%_50%,#7c3aed33_0%,#0f172a_100%)]"></div>
          </div>
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div className="text-left">
                <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">✨ Key Feature</Badge>
                <h2 className="text-3xl lg:text-4xl font-bold mb-6">All-in-One Analytics Dashboard</h2>
                <p className="text-muted-foreground text-lg mb-8">
                  Our centralized dashboard brings all your critical data into one place. Monitor student progress, track resource allocation, and generate insightful reports with just a few clicks. Make data-driven decisions faster and more effectively.
                </p>
                <div className="space-y-4">
                  <div className="flex items-center gap-3"><CheckCircle className="h-5 w-5 text-green-400" /><span>Real-time performance metrics.</span></div>
                  <div className="flex items-center gap-3"><CheckCircle className="h-5 w-5 text-green-400" /><span>Customizable report generation.</span></div>
                  <div className="flex items-center gap-3"><CheckCircle className="h-5 w-5 text-green-400" /><span>Predictive insights for student outcomes.</span></div>
                </div>
              </div>
              <div className="bg-slate-900/50 p-4 rounded-2xl border border-border/30 shadow-2xl">
                <img src="https://placehold.co/600x400/1e293b/a78bfa?text=Dashboard+UI" alt="Analytics Dashboard" className="rounded-lg" />
              </div>
            </div>
          </div>
        </motion.section>

        {/* FAQ Section */}
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="py-24 sm:py-32"
        >
            <div className="mx-auto max-w-4xl px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-3xl lg:text-4xl font-bold mb-4">Frequently Asked Questions</h2>
                    <p className="text-muted-foreground text-lg">Have questions? We've got answers. If you have other questions, feel free to reach out.</p>
                </div>
                <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="item-1">
                        <AccordionTrigger>Is EvolvEd suitable for small schools and large universities?</AccordionTrigger>
                        <AccordionContent>
                        Yes! Our platform is designed to be fully scalable. It offers flexible pricing and feature tiers that cater to the unique needs of institutions of all sizes, from small local schools to large multi-campus universities.
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-2">
                        <AccordionTrigger>What kind of support do you offer during onboarding?</AccordionTrigger>
                        <AccordionContent>
                        We provide comprehensive onboarding support, including dedicated account managers, live training sessions for your staff, step-by-step video tutorials, and a complete knowledge base to ensure a smooth transition.
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-3">
                        <AccordionTrigger>How is our data protected?</AccordionTrigger>
                        <AccordionContent>
                        Data security is our top priority. We use end-to-end encryption for all data, are fully compliant with GDPR and other privacy regulations, and our infrastructure is hosted on secure, enterprise-grade cloud servers with regular backups.
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </div>
        </motion.section>

        {/* Final CTA Section */}
        <motion.section 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="py-24 sm:py-32"
        >
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="relative isolate overflow-hidden bg-slate-900 px-6 py-24 text-center shadow-2xl sm:rounded-3xl sm:px-16">
                    <h2 className="mx-auto max-w-2xl text-3xl font-bold tracking-tight text-white sm:text-4xl">
                        Ready to Transform Your Institution?
                    </h2>
                    <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-gray-300">
                        Join hundreds of innovative schools and universities who are building the future of education with EvolvEd.
                    </p>
                    <div className="mt-10 flex items-center justify-center gap-x-6">
                        <Button size="lg" className="bg-white text-slate-900 hover:bg-white/90">Start Your Free Trial</Button>
                        <Button size="lg" variant="link" className="text-white">Contact Sales <span aria-hidden="true">→</span></Button>
                    </div>
                     {/* Gradient Blob */}
                    <svg
                        viewBox="0 0 1024 1024"
                        className="absolute left-1/2 top-1/2 -z-10 h-[64rem] w-[64rem] -translate-x-1/2 [mask-image:radial-gradient(closest-side,white,transparent)]"
                        aria-hidden="true"
                    >
                        <circle cx={512} cy={512} r={512} fill="url(#8d958450-c69f-4251-94bc-4e091a323369)" fillOpacity="0.7" />
                        <defs>
                        <radialGradient id="8d958450-c69f-4251-94bc-4e091a323369">
                            <stop stopColor="#7775D6" />
                            <stop offset={1} stopColor="#E935C1" />
                        </radialGradient>
                        </defs>
                    </svg>
                </div>
            </div>
        </motion.section>

      </main>
    </div>
  );
}