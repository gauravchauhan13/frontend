import React from 'react';
import { motion } from 'framer-motion';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { 
  ArrowLeft, 
  CheckCircle, 
  Building2, 
  GraduationCap, 
  Users, 
  Target,
  Sparkles,
  Star
} from 'lucide-react';

interface SolutionsPageProps {
  onBack: () => void;
}

export function SolutionsPage({ onBack }: SolutionsPageProps) {
  const solutions = [
    {
      icon: Building2,
      title: "K-12 Schools",
      description: "Comprehensive management for primary and secondary education",
      features: [
        "Student information management",
        "Parent-teacher communication", 
        "Grade book and assessments",
        "Attendance tracking",
        "Report card generation",
        "Fee management"
      ],
      gradient: "from-blue-500 to-cyan-500",
      textColor: "text-blue-400",
      popular: false
    },
    {
      icon: GraduationCap,
      title: "Higher Education",
      description: "Advanced solutions for colleges and universities",
      features: [
        "Course management system",
        "Student enrollment",
        "Faculty management", 
        "Research project tracking",
        "Alumni management",
        "Library integration"
      ],
      gradient: "from-purple-500 to-pink-500",
      textColor: "text-purple-400",
      popular: true
    },
    {
      icon: Users,
      title: "Corporate Training", 
      description: "Professional development and corporate learning",
      features: [
        "Employee skill tracking",
        "Training module creation",
        "Performance analytics",
        "Certification management",
        "Progress monitoring",
        "Integration with HR systems"
      ],
      gradient: "from-green-500 to-emerald-500", 
      textColor: "text-green-400",
      popular: false
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
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
            duration: 30,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute top-1/3 left-1/5 w-96 h-96 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full blur-3xl"
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
          className="absolute bottom-1/3 right-1/5 w-80 h-80 bg-gradient-to-r from-green-500/10 to-cyan-500/10 rounded-full blur-3xl"
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
                <Target className="h-8 w-8 text-primary" />
                <Sparkles className="h-4 w-4 text-yellow-400 absolute -top-1 -right-1 animate-pulse" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-primary to-purple-400 bg-clip-text text-transparent">
                EvolvEd Solutions
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
                  Tailored Solutions
                </span>
                <br />
                <span className="text-foreground">for Every Institution</span>
              </h1>
            </motion.div>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-xl text-muted-foreground mx-auto leading-relaxed mb-12 max-w-3xl"
            >
              From K-12 schools to universities and corporate training centers, we provide specialized solutions that adapt to your unique needs.
            </motion.p>
          </div>
        </motion.section>

        {/* Solutions Grid */}
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
                Solutions for Every Educational Need
              </h2>
              <p className="text-muted-foreground text-xl leading-relaxed">
                Choose the perfect solution designed specifically for your type of institution.
              </p>
            </motion.div>

            <motion.div 
              variants={containerVariants}
              className="grid grid-cols-1 lg:grid-cols-3 gap-8"
            >
              {solutions.map((solution, index) => {
                const Icon = solution.icon;
                return (
                  <motion.div
                    key={solution.title}
                    variants={itemVariants}
                    whileHover={{ y: -10, scale: 1.02 }}
                    className="group relative"
                  >
                    <Card className="relative bg-card/50 backdrop-blur-xl border-border/20 p-8 h-full transition-all duration-500 group-hover:border-border/40 group-hover:shadow-2xl group-hover:shadow-primary/10 overflow-hidden">
                      {/* Popular Badge */}
                      {solution.popular && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="absolute -top-3 -right-3 z-10"
                        >
                          <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black px-3 py-1 rounded-full">
                            <Star className="h-3 w-3 mr-1" />
                            Most Popular
                          </Badge>
                        </motion.div>
                      )}

                      {/* Gradient Background */}
                      <div className={`absolute inset-0 bg-gradient-to-br ${solution.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />
                      
                      <CardHeader className="text-center pb-6">
                        {/* Icon Container */}
                        <motion.div 
                          whileHover={{ rotate: 5, scale: 1.1 }}
                          className="relative w-20 h-20 rounded-2xl bg-gradient-to-br from-background to-muted/50 flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:shadow-xl transition-shadow duration-300"
                        >
                          <Icon className={`h-10 w-10 ${solution.textColor} transition-colors group-hover:scale-110`} />
                          <div className={`absolute inset-0 bg-gradient-to-br ${solution.gradient} opacity-10 rounded-2xl`} />
                        </motion.div>
                        
                        <CardTitle className="text-2xl font-bold mb-2 group-hover:text-foreground transition-colors">
                          {solution.title}
                        </CardTitle>
                        <CardDescription className="text-base text-muted-foreground">
                          {solution.description}
                        </CardDescription>
                      </CardHeader>
                      
                      <CardContent>
                        <ul className="space-y-3 mb-8">
                          {solution.features.map((feature, idx) => (
                            <motion.li
                              key={idx}
                              initial={{ opacity: 0, x: -10 }}
                              whileInView={{ opacity: 1, x: 0 }}
                              transition={{ delay: idx * 0.1 }}
                              className="flex items-center gap-3"
                            >
                              <CheckCircle className={`h-4 w-4 ${solution.textColor} flex-shrink-0`} />
                              <span className="text-sm text-muted-foreground">{feature}</span>
                            </motion.li>
                          ))}
                        </ul>
                        
                        <Button 
                          className={`w-full bg-gradient-to-r ${solution.gradient} hover:opacity-90 text-white shadow-lg transition-all duration-300`}
                          size="lg"
                        >
                          Choose {solution.title}
                        </Button>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </motion.section>

        {/* CTA Section */}
        <motion.section 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="py-24 sm:py-32"
        >
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="relative isolate overflow-hidden bg-gradient-to-br from-primary/20 to-purple-500/20 backdrop-blur-xl px-6 py-24 text-center shadow-2xl sm:rounded-3xl sm:px-16 border border-border/20">
              <h2 className="mx-auto max-w-2xl text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                Ready to Transform Your Institution?
              </h2>
              <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-muted-foreground">
                Join thousands of educational institutions worldwide that have revolutionized their operations with EvolvEd.
              </p>
              <div className="mt-10 flex items-center justify-center gap-x-6">
                <Button size="lg" className="bg-gradient-to-r from-primary to-purple-500 hover:from-primary/90 hover:to-purple-500/90 text-white shadow-lg px-8">
                  Start Free Trial
                </Button>
                <Button size="lg" variant="outline" className="border-border/50 hover:bg-accent/50 px-8">
                  Schedule Demo
                </Button>
              </div>
              
              {/* Background decoration */}
              <div className="absolute left-1/2 top-1/2 -z-10 h-[40rem] w-[80rem] -translate-x-1/2 -translate-y-1/2 bg-gradient-radial from-primary/20 to-transparent opacity-20" />
            </div>
          </div>
        </motion.section>
      </main>
    </div>
  );
}
