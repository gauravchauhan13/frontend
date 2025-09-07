import { Users, TrendingUp, Shield, Play, Pause, BookOpen } from "lucide-react";
import { Button } from "./ui/button";
import { useState } from "react";

interface LandingPageProps {
  onNavigate: (page: string) => void;
}

export function LandingPage({ onNavigate }: LandingPageProps) {
  const [isPlaying, setIsPlaying] = useState(true);

  const handleWatchDemo = () => {
    alert("Demo video would play here. Integration with video player needed.");
  };

  const handleSignIn = () => {
    onNavigate("college-selection");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-slate-900 to-background">
      {/* Navigation Bar */}
      <nav className="relative z-50 border-b border-border/50 bg-background/80 backdrop-blur-sm">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <div className="flex items-center space-x-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-primary">
                <BookOpen className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-semibold text-foreground">EvolvEd</span>
            </div>

            {/* Nav Links */}
            <div className="flex items-center space-x-8">
              <button
                onClick={() => onNavigate("features")}
                className="text-sm font-medium text-muted-foreground hover:text-white transition-colors"
              >
                Features
              </button>
              <button
                onClick={() => onNavigate("solution")}
                className="text-sm font-medium text-muted-foreground hover:text-white transition-colors"
              >
                Solutions
              </button>
              <button
                onClick={() => onNavigate("support")}
                className="text-sm font-medium text-muted-foreground hover:text-white transition-colors"
              >
                Support
              </button>

              {/* Sign In Button (modern pill design) */}
              <Button
                onClick={handleSignIn}
                className="ml-4 bg-gradient-to-r from-purple-500 via-violet-500 to-indigo-500
                           hover:from-indigo-500 hover:via-violet-600 hover:to-purple-600
                           text-white font-semibold px-6 py-2 rounded-full shadow-md
                           transition-all duration-300 ease-in-out transform hover:scale-110 hover:shadow-lg"
              >
                Sign in
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
                    <span>Predict. Protect. Persist.</span>
                </div>

                <h1 className="text-4xl lg:text-6xl font-bold text-foreground leading-tight">
                  Empower your
                  <span
                  className="block font-bold"
                  style={{
                    background: "linear-gradient(135deg, #a855f7, #c084fc, #8b5cf6)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                  >
                  Dropout Prediction
                  </span>
                  and Student Retention Strategies.
                </h1>

                <p className="text-lg text-muted-foreground leading-relaxed">
                  Harness intelligent analytics to identify at-risk students early and take action to improve retention. 
                  Our platform provides actionable insights for educators and administrators to reduce dropout rates and foster student success.
                </p>
                </div>

              <div className="flex flex-col sm:flex-row gap-4">
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

            {/* Right Content */}
            <div className="relative flex items-center justify-center lg:justify-end">
              <div className="relative">
                {/* Large Animated Text */}
                <div className="text-8xl lg:text-9xl xl:text-[12rem] font-bold leading-none">
                  <div
                    className="opacity-90 animate-gradient"
                    style={{
                      background: "linear-gradient(135deg, #a855f7, #c084fc, #8b5cf6)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      animation: "pulseText 3s infinite alternate",
                    }}
                  >
                    Evolv
                  </div>
                  <div className="text-white/20 -mt-4 lg:-mt-8 animate-fade">Ed</div>
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
                    {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
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

      {/* Animations */}
      <style>
        {`
          @keyframes pulseText {
            from { opacity: 0.7; transform: scale(1); }
            to { opacity: 1; transform: scale(1.05); }
          }
          @keyframes fade {
            from { opacity: 0; }
            to { opacity: 0.2; }
          }
          .animate-fade {
            animation: fade 3s ease-in-out infinite alternate;
          }
        `}
      </style>
    </div>
  );
}
