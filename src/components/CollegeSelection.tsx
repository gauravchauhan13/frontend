import React, { useState } from "react";
import { Button } from "./ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { GraduationCap, Sparkles } from "lucide-react";

interface CollegeSelectionProps {
  onCollegeSelect: (college: string) => void;
}

export function CollegeSelection({ onCollegeSelect }: CollegeSelectionProps) {
  const colleges = [
    "UPES (University of Petroleum and Energy Studies)",
    "Delhi University",
    "Mumbai University", 
    "IIT Delhi",
    "IIT Mumbai",
    "Jawaharlal Nehru University",
    "Amity University",
    "Manipal Institute of Technology"
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const selectedCollege = formData.get("college") as string;
    if (selectedCollege) {
      onCollegeSelect(selectedCollege);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-gradient-primary opacity-10 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full bg-gradient-primary opacity-10 animate-pulse" style={{animationDelay: '1s'}}></div>
      </div>

      <div className="relative z-10 w-full max-w-lg">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center items-center mb-6">
            <div className="relative">
              <GraduationCap className="h-16 w-16 text-gradient" />
              <Sparkles className="h-6 w-6 text-purple-400 absolute -top-1 -right-1 animate-pulse" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-gradient mb-2">EvolvEd</h1>
          <p className="text-muted-foreground text-lg">Empowering Academic Excellence</p>
        </div>

        {/* Selection Card */}
        <Card className="backdrop-blur-sm bg-card/95 border-border/50 glow">
          <CardHeader className="text-center pb-6">
            <CardTitle className="text-2xl">Welcome Back</CardTitle>
            <CardDescription className="text-base">
              Select your educational institution to continue your journey
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-3">
                <label htmlFor="college" className="block text-foreground">
                  Choose Your College/University
                </label>
                <Select name="college" required>
                  <SelectTrigger className="h-12 border-border/50 bg-input/50 backdrop-blur-sm hover:border-primary/50 transition-colors">
                    <SelectValue placeholder="Select your institution" />
                  </SelectTrigger>
                  <SelectContent className="bg-card/95 backdrop-blur-sm border-border/50">
                    {colleges.map((college) => (
                      <SelectItem 
                        key={college} 
                        value={college}
                        className="hover:bg-accent/50 focus:bg-accent/50"
                      >
                        {college}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <Button 
                type="submit" 
                className="w-full h-12 bg-gradient-primary hover:bg-gradient-primary-hover text-primary-foreground glow-hover transition-all duration-300"
              >
                Proceed
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center mt-8">
          <p className="text-muted-foreground text-sm">
            Secure • Modern • Intuitive
          </p>
        </div>
      </div>
    </div>
  );
}