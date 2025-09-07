import React, { useState, useEffect } from "react";
import { ArrowLeft, Lock, Mail, GraduationCap, Users, Shield, UserCheck } from "lucide-react";

export type UserRole = "student" | "parent" | "faculty" | "admin";

interface LoginProps {
  college: string;
  onLogin: (role: UserRole, userData: any) => void;
  onBack: () => void;
}

// Basic UI Components to make component self-contained
const Card = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <div className={`rounded-lg border bg-card text-card-foreground shadow-sm ${className}`}>
    {children}
  </div>
);

const CardHeader = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <div className={`flex flex-col space-y-1.5 p-6 ${className}`}>
    {children}
  </div>
);

const CardContent = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <div className={`p-6 pt-0 ${className}`}>
    {children}
  </div>
);

const CardTitle = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <h3 className={`text-2xl font-semibold leading-none tracking-tight ${className}`}>
    {children}
  </h3>
);

const CardDescription = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <p className={`text-sm text-muted-foreground ${className}`}>
    {children}
  </p>
);

const Button = ({ 
  children, 
  onClick, 
  type = "button", 
  variant = "default", 
  size = "default", 
  disabled = false,
  className = "" 
}: { 
  children: React.ReactNode; 
  onClick?: () => void; 
  type?: "button" | "submit"; 
  variant?: "default" | "ghost" | "link"; 
  size?: "default" | "sm"; 
  disabled?: boolean;
  className?: string;
}) => {
  const baseStyles = "inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50";
  const variants = {
    default: "bg-primary text-primary-foreground hover:bg-primary/90",
    ghost: "hover:bg-accent hover:text-accent-foreground",
    link: "text-primary underline-offset-4 hover:underline"
  };
  const sizes = {
    default: "h-10 px-4 py-2",
    sm: "h-9 rounded-md px-3"
  };
  
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
    >
      {children}
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
    className={`flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
  />
);

export function Login({ college, onLogin, onBack }: LoginProps) {
  const [detectedRole, setDetectedRole] = useState<UserRole | null>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Function to detect role based on email domain
  const detectRoleFromEmail = (emailAddress: string): UserRole | null => {
    if (!emailAddress) return null;
    
    // Extract the domain part before the college domain
    const emailParts = emailAddress.split('@');
    if (emailParts.length !== 2) return null;
    
    const domainPart = emailParts[1];
    
    // Check for role-specific prefixes
    if (domainPart.startsWith('stu.')) return 'student';
    if (domainPart.startsWith('parent.')) return 'parent';
    if (domainPart.startsWith('faculty.')) return 'faculty';
    if (domainPart.startsWith('admin.')) return 'admin';
    
    return null;
  };

  // useEffect to detect role when email changes
  useEffect(() => {
    const role = detectRoleFromEmail(email);
    setDetectedRole(role);
  }, [email]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!detectedRole) return;
    
    // Mock authentication - in real app would validate against backend
    const mockUserData = {
      email,
      role: detectedRole,
      college,
      name: detectedRole === "student" ? "John Doe" : 
            detectedRole === "parent" ? "Jane Smith" : 
            detectedRole === "faculty" ? "Dr. Professor" : "Admin User",
      id: "mock-user-id",
    };
    
    onLogin(detectedRole, mockUserData);
  };

  const roleOptions: { value: UserRole; label: string; icon: any }[] = [
    { value: "student", label: "Student", icon: GraduationCap },
    { value: "parent", label: "Parent", icon: Users },
    { value: "faculty", label: "Faculty", icon: UserCheck },
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
                disabled={!detectedRole}
                className="w-full h-12 bg-gradient-primary hover:bg-gradient-primary-hover text-primary-foreground glow-hover transition-all duration-300 animate-gradient disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {detectedRole 
                  ? `Sign In as ${roleOptions.find(r => r.value === detectedRole)?.label}`
                  : "Enter valid email to continue"
                }
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