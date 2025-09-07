import { useState, Suspense, lazy } from "react";
import { LandingPage } from "./components/LandingPage";
import { CollegeSelection } from "./components/CollegeSelection";
import { Login, UserRole } from "./components/Login";

// Lazy load dashboard components for code splitting
const StudentDashboard = lazy(() => import("./components/StudentDashboard").then(module => ({ default: module.StudentDashboard })));
const ParentDashboard = lazy(() => import("./components/ParentDashboard").then(module => ({ default: module.ParentDashboard })));
const FacultyDashboard = lazy(() => import("./components/FacultyDashboard").then(module => ({ default: module.FacultyDashboard })));
const AdminDashboard = lazy(() => import("./components/AdminDashboard").then(module => ({ default: module.AdminDashboard })));

// Lazy load feature pages
const FeaturesPage = lazy(() => import("./components/FeaturesPage").then(module => ({ default: module.FeaturesPage })));
const SolutionsPage = lazy(() => import("./components/SolutionsPage").then(module => ({ default: module.SolutionsPage })));
const PricingPage = lazy(() => import("./components/PricingPage").then(module => ({ default: module.PricingPage })));
const SupportPage = lazy(() => import("./components/SupportPage").then(module => ({ default: module.SupportPage })));

type ViewState = "landing" | "college-selection" | "login" | "dashboard" | "features" | "solutions" | "pricing" | "support";

interface UserData {
  email: string;
  role: UserRole;
  college: string;
  name: string;
  id: string;
}

// Loading component for Suspense fallback
const LoadingSpinner = () => (
  <div className="min-h-screen bg-background flex items-center justify-center">
    <div className="flex flex-col items-center gap-4">
      <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      <p className="text-muted-foreground">Loading...</p>
    </div>
  </div>
);

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
    setCurrentView("landing");
  };

  const handleBack = () => {
    setCurrentView("college-selection");
  };

  const handleBackToLanding = () => {
    setCurrentView("landing");
  };

  const handleNavigateToFeatures = () => {
    setCurrentView("features");
  };

  const handleNavigateToSolutions = () => {
    setCurrentView("solutions");
  };

  const handleNavigateToPricing = () => {
    setCurrentView("pricing");
  };

  const handleNavigateToSupport = () => {
    setCurrentView("support");
  };

  const handleNavigate = (page: string) => {
    switch (page) {
      case "college-selection":
        setCurrentView("college-selection");
        break;
      case "features":
        setCurrentView("features");
        break;
      case "solutions":
        setCurrentView("solutions");
        break;
      case "pricing":
        setCurrentView("pricing");
        break;
      case "support":
        setCurrentView("support");
        break;
      default:
        console.log(`Navigation to ${page} not implemented`);
    }
  };

  const renderCurrentView = () => {
    switch (currentView) {
      case "landing":
        return <LandingPage onNavigate={handleNavigate} />;
        
      case "features":
        return (
          <Suspense fallback={<LoadingSpinner />}>
            <FeaturesPage onBack={handleBackToLanding} />
          </Suspense>
        );
        
      case "solutions":
        return (
          <Suspense fallback={<LoadingSpinner />}>
            <SolutionsPage onBack={handleBackToLanding} />
          </Suspense>
        );
        
      case "pricing":
        return (
          <Suspense fallback={<LoadingSpinner />}>
            <PricingPage onBack={handleBackToLanding} />
          </Suspense>
        );
        
      case "support":
        return (
          <Suspense fallback={<LoadingSpinner />}>
            <SupportPage onBack={handleBackToLanding} />
          </Suspense>
        );
        
      case "college-selection":
        return <CollegeSelection onCollegeSelect={handleCollegeSelect} onBack={handleBackToLanding} />;
        
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
        
        return (
          <Suspense fallback={<LoadingSpinner />}>
            {(() => {
              switch (userData.role) {
                case "student":
                  return <StudentDashboard userData={userData} onLogout={handleLogout} />;
                case "parent":
                  return <ParentDashboard userData={userData} onLogout={handleLogout} />;
                case "faculty":
                  return <FacultyDashboard userData={userData} onLogout={handleLogout} />;
                case "admin":
                  return <AdminDashboard userData={userData} onLogout={handleLogout} />;
                default:
                  return <LandingPage onNavigate={handleNavigate} />;
              }
            })()}
          </Suspense>
        );
      
      default:
        return <LandingPage onNavigate={handleNavigate} />;
    }
  };

  return (
    <div className="size-full">
      {renderCurrentView()}
    </div>
  );
}