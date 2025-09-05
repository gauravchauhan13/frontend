import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { ArrowLeft, Lock, Mail, GraduationCap, Users, Shield } from "lucide-react";

export type UserRole = "student" | "parent" | "admin";

interface LoginProps {
  college: string;
  onLogin: (role: UserRole, userData: any) => void;
  onBack: () => void;
}

export function Login({ college, onLogin, onBack }: LoginProps) {
  const [selectedRole, setSelectedRole] = useState<UserRole>("student");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Mock authentication - in real app would validate against backend
    const mockUserData = {
      email,
      role: selectedRole,
      college,
      name: selectedRole === "student" ? "John Doe" : selectedRole === "parent" ? "Jane Smith" : "Admin User",
      id: "mock-user-id",
    };
    
    onLogin(selectedRole, mockUserData);
  };

  const roleOptions: { value: UserRole; label: string; icon: any }[] = [
    { value: "student", label: "Student", icon: GraduationCap },
    { value: "parent", label: "Parent", icon: Users },
    { value: "admin", label: "Admin", icon: Shield }
  ];

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-gradient-primary opacity-10 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full bg-gradient-primary opacity-10 animate-pulse" style={{animationDelay: '1s'}}></div>
      </div>

      <div className="relative z-10 w-full max-w-md">
        <Card className="backdrop-blur-sm bg-card/95 border-border/50 glow">
          <CardHeader className="pb-6">
            <div className="flex items-center gap-3 mb-4">
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={onBack}
                className="p-2 hover:bg-accent/50 rounded-full transition-colors"
              >
                <ArrowLeft className="h-4 w-4" />
              </Button>
              <div className="flex-1">
                <CardTitle className="text-2xl text-center">Welcome Back</CardTitle>
              </div>
            </div>
            <CardDescription className="text-center text-base">
              {college}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Role Selector - Enhanced pill with icons */}
              <div className="space-y-3">
                <label className="block text-foreground">Select Your Role</label>
                <div className="relative bg-secondary/50 rounded-2xl p-1.5 backdrop-blur-sm">
                  {/* Sliding indicator */}
                  <div 
                    className="absolute top-1.5 bottom-1.5 bg-gradient-primary rounded-xl transition-all duration-300 ease-out glow"
                    style={{
                      width: '33.333%',
                      left: selectedRole === 'student' ? '0%' : selectedRole === 'parent' ? '33.333%' : '66.666%'
                    }}
                  />
                  <div className="relative flex">
                    {roleOptions.map((role) => {
                      const Icon = role.icon;
                      return (
                        <button
                          key={role.value}
                          type="button"
                          onClick={() => setSelectedRole(role.value)}
                          className={`flex-1 py-3 px-4 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 ${
                            selectedRole === role.value
                              ? "text-white"
                              : "text-muted-foreground hover:text-foreground"
                          }`}
                        >
                          <Icon className="h-4 w-4" />
                          <span>{role.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="email" className="block text-foreground">Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground z-10" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-10 h-12 border-border/50 bg-input/50 backdrop-blur-sm hover:border-primary/50 focus:border-primary transition-colors"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="password" className="block text-foreground">Password</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground z-10" />
                    <Input
                      id="password"
                      type="password"
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="pl-10 h-12 border-border/50 bg-input/50 backdrop-blur-sm hover:border-primary/50 focus:border-primary transition-colors"
                      required
                    />
                  </div>
                </div>
              </div>

              <Button 
                type="submit" 
                className="w-full h-12 bg-gradient-primary hover:bg-gradient-primary-hover text-primary-foreground glow-hover transition-all duration-300 animate-gradient"
              >
                Sign In as {roleOptions.find(r => r.value === selectedRole)?.label}
              </Button>
            </form>

            <div className="flex justify-between items-center pt-4 border-t border-border/50">
              <Button variant="link" type="button" className="p-0 text-muted-foreground hover:text-primary">
                Forgot Password?
              </Button>
              <Button variant="link" type="button" className="p-0 text-muted-foreground hover:text-primary">
                Contact Support
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}