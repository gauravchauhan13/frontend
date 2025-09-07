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
    "AIIMS (All India Institute of Medical Sciences)",
    "AMU (Aligarh Muslim University)",
    "AU (Andhra University)",
    "BHU (Banaras Hindu University)",
    "BITS Pilani (Birla Institute of Technology and Science, Pilani)",
    "CU (Calcutta University)",
    "CUK (Central University of Karnataka)",
    "CUO (Central University of Odisha)",
    "CU Punjab (Central University of Punjab)",
    "CU Rajasthan (Central University of Rajasthan)",
    "DAVV (Devi Ahilya Vishwavidyalaya)",
    "DU (Delhi University)",
    "DTU (Delhi Technological University)",
    "GGSIPU (Guru Gobind Singh Indraprastha University)",
    "GNDU (Guru Nanak Dev University)",
    "GTU (Gujarat Technological University)",
    "IIM Ahmedabad (Indian Institute of Management Ahmedabad)",
    "IIM Bangalore (Indian Institute of Management Bangalore)",
    "IIM Calcutta (Indian Institute of Management Calcutta)",
    "IIM Indore (Indian Institute of Management Indore)",
    "IIM Kozhikode (Indian Institute of Management Kozhikode)",
    "IIM Lucknow (Indian Institute of Management Lucknow)",
    "IISc (Indian Institute of Science)",
    "IIT BHU (Indian Institute of Technology BHU)",
    "IIT Bombay (Indian Institute of Technology Bombay)",
    "IIT Delhi (Indian Institute of Technology Delhi)",
    "IIT Gandhinagar (Indian Institute of Technology Gandhinagar)",
    "IIT Guwahati (Indian Institute of Technology Guwahati)",
    "IIT Hyderabad (Indian Institute of Technology Hyderabad)",
    "IIT Indore (Indian Institute of Technology Indore)",
    "IIT Kanpur (Indian Institute of Technology Kanpur)",
    "IIT Kharagpur (Indian Institute of Technology Kharagpur)",
    "IIT Madras (Indian Institute of Technology Madras)",
    "IIT Mandi (Indian Institute of Technology Mandi)",
    "IIT Patna (Indian Institute of Technology Patna)",
    "IIT Roorkee (Indian Institute of Technology Roorkee)",
    "IIT Ropar (Indian Institute of Technology Ropar)",
    "IIT Varanasi (Indian Institute of Technology Varanasi)",
    "IMT Ghaziabad (Institute of Management Technology Ghaziabad)",
    "IPU (Indraprastha University)",
    "ISB Hyderabad (Indian School of Business Hyderabad)",
    "ISI Kolkata (Indian Statistical Institute Kolkata)",
    "Jadavpur University (JU)",
    "JMI (Jamia Millia Islamia)",
    "JNU (Jawaharlal Nehru University)",
    "JUIT (Jaypee University of Information Technology)",
    "KIIT (Kalinga Institute of Industrial Technology)",
    "LPU (Lovely Professional University)",
    "LU (Lucknow University)",
    "Manipal (Manipal Institute of Technology)",
    "MDU (Maharshi Dayanand University)",
    "MIT Pune (Maharashtra Institute of Technology Pune)",
    "MU (Mumbai University)",
    "NALSAR (National Academy of Legal Studies and Research)",
    "NIT Calicut (National Institute of Technology Calicut)",
    "NIT Durgapur (National Institute of Technology Durgapur)",
    "NIT Jalandhar (National Institute of Technology Jalandhar)",
    "NIT Jaipur (Malaviya National Institute of Technology Jaipur)",
    "NIT Kurukshetra (National Institute of Technology Kurukshetra)",
    "NIT Nagpur (Visvesvaraya National Institute of Technology Nagpur)",
    "NIT Patna (National Institute of Technology Patna)",
    "NIT Raipur (National Institute of Technology Raipur)",
    "NIT Rourkela (National Institute of Technology Rourkela)",
    "NIT Silchar (National Institute of Technology Silchar)",
    "NIT Srinagar (National Institute of Technology Srinagar)",
    "NIT Surathkal (National Institute of Technology Karnataka Surathkal)",
    "NIT Trichy (National Institute of Technology Tiruchirappalli)",
    "NIT Warangal (National Institute of Technology Warangal)",
    "NSIT (Netaji Subhas Institute of Technology)",
    "Osmania University (OU)",
    "Panjab University (PU)",
    "Presidency University Kolkata (PUK)",
    "PSG Tech (PSG College of Technology)",
    "Pune University (Savitribai Phule Pune University)",
    "RGIPT (Rajiv Gandhi Institute of Petroleum Technology)",
    "SASTRA University (Shanmugha Arts, Science, Technology & Research Academy)",
    "SIT (Siddaganga Institute of Technology)",
    "SRMIST (SRM Institute of Science and Technology)",
    "SRM University (Sri Ramaswamy Memorial University)",
    "SVNIT Surat (Sardar Vallabhbhai National Institute of Technology Surat)",
    "TISS (Tata Institute of Social Sciences)",
    "Thapar University (TIET)",
    "University of Hyderabad (UoH)",
    "UPES (University of Petroleum and Energy Studies)",
    "VIT Vellore (Vellore Institute of Technology)",
    "VJTI Mumbai (Veermata Jijabai Technological Institute Mumbai)",
    "VNIT Nagpur (Visvesvaraya National Institute of Technology Nagpur)",
    "WBUT (West Bengal University of Technology)",
    "XIMB (Xavier Institute of Management Bhubaneswar)",
    "XLRI Jamshedpur (Xavier Labour Relations Institute Jamshedpur)",
    "YMCAUST (YMCA University of Science and Technology)",
    "Amity University (AU)",
    "Anna University (AU Chennai)",
    "BMSCE (BMS College of Engineering)",
    "Chandigarh University (CU)",
    "Christ University (CU Bangalore)",
    "GITAM (Gandhi Institute of Technology and Management)",
    "JSSATE (JSS Academy of Technical Education)",
    "KJ Somaiya College (KJSCE)",
    "MSRIT (Ramaiah Institute of Technology)",
    "Nirma University (NU)",
    "PES University (PESU)",
    "Shiv Nadar University (SNU)",
    "Symbiosis International University (SIU)",
    "VIT Bhopal (Vellore Institute of Technology Bhopal)",
    "VIT Chennai (Vellore Institute of Technology Chennai)"
].sort((a, b) => a.localeCompare(b));

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