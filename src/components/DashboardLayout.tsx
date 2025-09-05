import { ReactNode } from "react";
import { Button } from "./ui/button";
import { LogOut, GraduationCap } from "lucide-react";

interface NavigationItem {
  id: string;
  label: string;
  icon: any;
}

interface DashboardLayoutProps {
  children: ReactNode;
  userData: any;
  activeTab: string;
  onTabChange: (tab: string) => void;
  onLogout: () => void;
  navigation: NavigationItem[];
  title: string;
}

export function DashboardLayout({ 
  children, 
  userData, 
  activeTab, 
  onTabChange, 
  onLogout, 
  navigation, 
  title 
}: DashboardLayoutProps) {
  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <div className="w-64 bg-sidebar border-r border-sidebar-border flex flex-col glass">
        {/* Logo and Header */}
        <div className="p-6 border-b border-sidebar-border">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center pulse-glow">
              <GraduationCap className="h-5 w-5 text-white" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-sidebar-foreground">EvolvEd</h2>
              <p className="text-xs text-muted-foreground">{title}</p>
            </div>
          </div>
          <div className="text-sm">
            <p className="text-sidebar-foreground font-medium">{userData.name}</p>
            <p className="text-muted-foreground text-xs">{userData.college}</p>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex-1 p-4">
          <nav className="space-y-2">
            {navigation.map((item, index) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => onTabChange(item.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-all duration-300 btn-interactive slide-in-right ${
                    activeTab === item.id
                      ? "bg-sidebar-primary text-sidebar-primary-foreground glow"
                      : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground card-hover"
                  }`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <Icon className="h-5 w-5" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Logout Button */}
        <div className="p-4 border-t border-sidebar-border">
          <Button
            onClick={onLogout}
            variant="outline"
            className="w-full justify-start border-border/50 hover:bg-destructive hover:text-destructive-foreground hover:border-destructive btn-interactive"
          >
            <LogOut className="h-4 w-4 mr-3" />
            Logout
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header Bar */}
        <header className="bg-card border-b border-border p-6 glass">
          <div className="flex justify-between items-center">
            <div className="fade-in-up">
              <h1 className="text-2xl font-semibold text-foreground">
                {navigation.find(item => item.id === activeTab)?.label || 'Dashboard'}
              </h1>
              <p className="text-muted-foreground">{userData.college}</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-8 h-8 bg-gradient-primary rounded-full flex items-center justify-center card-hover">
                <span className="text-white text-sm font-medium">
                  {userData.name.split(' ').map((n: string) => n[0]).join('')}
                </span>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-6 overflow-auto">
          <div className="fade-in-up">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}