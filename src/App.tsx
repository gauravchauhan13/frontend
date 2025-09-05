import { useState } from "react";
import { LandingPage } from "./components/LandingPage";
import { CollegeSelection } from "./components/CollegeSelection";
import { Login, UserRole } from "./components/Login";
import { StudentDashboard } from "./components/StudentDashboard";
import { ParentDashboard } from "./components/ParentDashboard";
import { AdminDashboard } from "./components/AdminDashboard";

type ViewState = "landing" | "college-selection" | "login" | "dashboard";

interface UserData {
  email: string;
  role: UserRole;
  college: string;
  name: string;
  id: string;
}

export default function App() {
  const [currentView, setCurrentView] = useState<ViewState>("landing");
  const [selectedCollege, setSelectedCollege] = useState<string>("");
  const [userData, setUserData] = useState<UserData | null>(null);

  const handleGetStarted = () => {
    setCurrentView("college-selection");
  };

  const handleCollegeSelect = (college: string) => {
    setSelectedCollege(college);
    setCurrentView("login");
  };

  const handleLogin = (role: UserRole, user: UserData) => {
    setUserData(user);
    setCurrentView("dashboard");
  };

  const handleLogout = () => {
    setUserData(null);
    setSelectedCollege("");
    setCurrentView("landing");
  };

  const handleBack = () => {
    setCurrentView("college-selection");
  };

  const renderCurrentView = () => {
    switch (currentView) {
      case "landing":
        return <LandingPage onGetStarted={handleGetStarted} />;
        
      case "college-selection":
        return <CollegeSelection onCollegeSelect={handleCollegeSelect} />;
      
      case "login":
        return (
          <Login 
            college={selectedCollege} 
            onLogin={handleLogin} 
            onBack={handleBack}
          />
        );
      
      case "dashboard":
        if (!userData) return null;
        
        switch (userData.role) {
          case "student":
            return <StudentDashboard userData={userData} onLogout={handleLogout} />;
          case "parent":
            return <ParentDashboard userData={userData} onLogout={handleLogout} />;
          case "admin":
            return <AdminDashboard userData={userData} onLogout={handleLogout} />;
          default:
            return <LandingPage onGetStarted={handleGetStarted} />;
        }
      
      default:
        return <LandingPage onGetStarted={handleGetStarted} />;
    }
  };

  return (
    <div className="size-full">
      {renderCurrentView()}
    </div>
  );
}