import { useMemo, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { DashboardLayout } from "./DashboardLayout";
import { Chatbot } from "./Chatbot";
import { StudentForm } from "./StudentForm";
import { 
  Home,
  User, 
  Calendar, 
  DollarSign, 
  MessageCircle, 
  FileText,
  Clock,
  CheckCircle,
  AlertCircle,
  BookOpen,
  TrendingUp,
  Download,
  Eye,
  Edit,
  Bell,
  CreditCard,
  Receipt,
  Star,
  Target,
  Trophy,
  Award,
  GraduationCap,
  Plus,
  X
} from "lucide-react";

interface StudentDashboardProps {
  userData: any;
  onLogout: () => void;
}

export function StudentDashboard({ userData, onLogout }: StudentDashboardProps) {
  const [activeTab, setActiveTab] = useState("overview");
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [showStudentForm, setShowStudentForm] = useState(false);
  const [scheduleType, setScheduleType] = useState<null | "academic" | "career">(null);
  const [scheduleDate, setScheduleDate] = useState("");
  const [scheduleTime, setScheduleTime] = useState("");
  const [downloadMessage, setDownloadMessage] = useState<string | null>(null);
  const [notifications, setNotifications] = useState(true);
  const [showAchievements, setShowAchievements] = useState(false);
  const [achievements, setAchievements] = useState([
    {
      id: 1,
      title: "Dean's List",
      description: "Achieved Dean's List for exceptional academic performance in Fall 2023",
      category: "Academic",
      date: "Dec 2023"
    },
    {
      id: 2,
      title: "Best Project Award",
      description: "Won first place in Computer Science project competition",
      category: "Project",
      date: "Nov 2023"
    },
    {
      id: 3,
      title: "Perfect Attendance",
      description: "Maintained 100% attendance for the entire semester",
      category: "Attendance",
      date: "Dec 2023"
    }
  ]);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editingAchievement, setEditingAchievement] = useState<any>(null);

  const navigation = [
    { id: "overview", label: "Home", icon: Home },
    { id: "profile", label: "Profile", icon: User },
    { id: "student-form", label: "Student Information", icon: FileText },
    { id: "attendance", label: "Attendance", icon: Calendar },
    { id: "grades", label: "Grades", icon: BookOpen },
    { id: "reports", label: "Reports", icon: FileText },
    { id: "counselling", label: "Counselling", icon: MessageCircle },
    { id: "finance", label: "Finance", icon: DollarSign },
  ];
  const mockData = {
    profile: {
      name: "John Doe",
      studentId: "UPES2024001",
      program: "B.Tech Computer Science Engineering",
      semester: "6th Semester",
      year: "3rd Year",
      cgpa: "8.7",
      email: userData.email,
      phone: "+91 9876543210",
      address: "123 Student Hostel, UPES Campus",
      enrollmentDate: "2022-08-15"
    },
    attendance: {
      overall: 85,
      subjects: [
        { name: "Data Structures", attendance: 92, classes: 25, attended: 23, status: "Good" },
        { name: "Database Systems", attendance: 88, classes: 22, attended: 19, status: "Good" },
        { name: "Web Development", attendance: 78, classes: 24, attended: 19, status: "Warning" },
        { name: "Software Engineering", attendance: 85, classes: 20, attended: 17, status: "Good" }
      ]
    },
    grades: {
      currentSemester: [
        { subject: "Data Structures", midterm: 85, assignments: 92, project: 88, total: 89 },
        { subject: "Database Systems", midterm: 78, assignments: 85, project: 90, total: 84 },
        { subject: "Web Development", midterm: 92, assignments: 88, project: 95, total: 92 },
        { subject: "Software Engineering", midterm: 80, assignments: 86, project: 82, total: 83 }
      ],
      semesterHistory: [
        { semester: "5th Semester", sgpa: "8.9", year: "2024" },
        { semester: "4th Semester", sgpa: "8.5", year: "2023" },
        { semester: "3rd Semester", sgpa: "8.8", year: "2023" },
        { semester: "2nd Semester", sgpa: "8.6", year: "2023" }
      ]
    },
    reports: [
      { name: "Mid-Term Report", date: "2024-10-15", status: "Available", type: "Academic" },
      { name: "Assignment Grades", date: "2024-11-01", status: "Available", type: "Academic" },
      { name: "Attendance Report", date: "2024-11-15", status: "Available", type: "Attendance" },
      { name: "Performance Analytics", date: "2024-11-10", status: "Available", type: "Analytics" }
    ],
    finance: {
      totalDue: 62500,
      paid: 50000,
      pending: 12500,
      nextDueDate: "2025-10-15",
      history: [
        { amount: 25000, date: "2025-04-15", status: "Completed" },
        { amount: 25000, date: "2025-07-15", status: "Completed" },
        { amount: 12500, date: "2025-10-15", status: "Pending" },
      ]
    },
    achievements: [
      { title: "Dean's List", semester: "5th Semester", icon: "trophy" },
      { title: "Perfect Attendance", month: "October 2024", icon: "award" },
      { title: "Top Performer", subject: "Data Structures", icon: "star" }
    ],
    recentActivity: [
      { activity: "Assignment submitted - Database Systems", date: "2024-11-15", type: "academic" },
      { activity: "Attendance marked - Web Development", date: "2024-11-15", type: "attendance" },
      { activity: "Grade updated - Data Structures", date: "2024-11-14", type: "grades" },
      { activity: "Counseling session scheduled", date: "2024-11-13", type: "counseling" }
    ]
  };

  // Local editable profile state
  const [profileData, setProfileData] = useState(mockData.profile);

  const overallDuePercent = useMemo(() => {
    const { paid, totalDue } = mockData.finance;
    return Math.min(100, Math.round((paid / totalDue) * 100));
  }, [mockData.finance]);

  const handleDownloadReport = (name: string) => {
    const content = `Report: ${name}\nStudent: ${profileData.name} (${profileData.studentId})\nGenerated: ${new Date().toLocaleString()}\n\nThis is a sample report file for demo purposes.`;
    const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${name.replace(/\s+/g, "_")}.txt`;
    a.click();
    URL.revokeObjectURL(url);
    setDownloadMessage(`${name} is downloading...`);
    setTimeout(() => setDownloadMessage(null), 2000);
  };

  const renderContent = () => {
    switch (activeTab) {
      case "overview":
        return (
          <div className="space-y-8">
            {/* Smart Hero Section with Proactive Insights */}
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10 border border-blue-500/20">
              <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
              <div className="relative p-8">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-16 h-16 bg-gradient-primary rounded-2xl flex items-center justify-center shadow-lg">
                        <GraduationCap className="h-8 w-8 text-white" />
                      </div>
                      <div>
                        <h1 className="text-2xl font-bold text-foreground">Welcome back, {profileData.name.split(' ')[0]}!</h1>
                        <p className="text-muted-foreground">You're on track to exceed your semester goals 🎯</p>
                      </div>
                    </div>
                    
                    {/* Smart Status Indicators */}
                    <div className="flex items-center gap-6">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                        <span className="text-sm text-green-400 font-medium">Active Semester</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Trophy className="h-4 w-4 text-amber-400" />
                        <span className="text-sm text-amber-400 font-medium">Top Performer</span>
                      </div>
                      <div className="flex items-center gap-2 px-3 py-1 bg-red-500/20 rounded-full">
                        <AlertCircle className="h-3 w-3 text-red-400" />
                        <span className="text-xs text-red-400 font-medium">2 Deadlines This Week</span>
                      </div>
                    </div>
                    
                    {/* Proactive Insights Bar */}
                    <div className="mt-4 p-3 bg-blue-500/10 rounded-xl border border-blue-500/20">
                      <div className="flex items-center gap-2 mb-2">
                        <Target className="h-4 w-4 text-blue-400" />
                        <span className="text-sm font-medium text-blue-400">Today's Smart Insights</span>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        • You can miss 2 more Web Development classes and still maintain 75% attendance
                        • Your current trajectory suggests a 9.1 CGPA this semester (+0.4 from last)
                        • Database Systems assignment due in 3 days - start early to maintain your streak!
                      </p>
                    </div>
                  </div>
                  
                  <div className="hidden md:flex flex-col gap-3">
                    <Button 
                      onClick={() => setShowAchievements(true)}
                      className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white border-0 shadow-lg"
                    >
                      <Award className="h-4 w-4 mr-2" />
                      View Achievements
                    </Button>
                    
                    {/* Enhanced CGPA Display with Trend */}
                    <div className="text-right bg-slate-800/30 rounded-xl p-4 border border-slate-700/50">
                      <div className="flex items-center gap-2 mb-1">
                        <TrendingUp className="h-3 w-3 text-green-400" />
                        <p className="text-xs text-green-400">↗ +0.2 this sem</p>
                      </div>
                      <p className="text-xs text-muted-foreground">Current CGPA</p>
                      <p className="text-2xl font-bold text-blue-400">{profileData.cgpa}</p>
                      <div className="w-full bg-slate-700 rounded-full h-1 mt-2">
                        <div className="bg-blue-400 h-1 rounded-full" style={{width: '87%'}}></div>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">Target: 9.0</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>            {/* Enhanced Interactive Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Interactive CGPA Card with Trend Analysis */}
              <div 
                className="group relative cursor-pointer"
                onClick={() => setActiveTab("grades")}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-blue-600/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                <Card className="relative bg-gradient-to-br from-blue-500/5 to-blue-600/5 border-blue-500/20 hover:border-blue-400/40 transition-all duration-300 transform group-hover:scale-105 backdrop-blur-sm">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                        <TrendingUp className="h-6 w-6 text-white" />
                      </div>
                      <div className="flex items-center gap-1 px-2 py-1 bg-green-500/20 rounded-full">
                        <TrendingUp className="h-3 w-3 text-green-400" />
                        <span className="text-xs text-green-400 font-medium">+0.2</span>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground font-medium">Current CGPA</p>
                      <p className="text-3xl font-bold text-blue-400 mb-1">{profileData.cgpa}</p>
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-green-400">Above average</span>
                        <span className="text-muted-foreground">Target: 9.0</span>
                      </div>
                      <div className="w-full bg-slate-700 rounded-full h-1 mt-2">
                        <div className="bg-blue-400 h-1 rounded-full transition-all duration-1000" style={{width: '87%'}}></div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Smart Attendance Card with Predictive Insights */}
              <div 
                className="group relative cursor-pointer"
                onClick={() => setActiveTab("attendance")}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-green-500/20 to-green-600/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                <Card className="relative bg-gradient-to-br from-green-500/5 to-green-600/5 border-green-500/20 hover:border-green-400/40 transition-all duration-300 transform group-hover:scale-105 backdrop-blur-sm">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center shadow-lg">
                        <Calendar className="h-6 w-6 text-white" />
                      </div>
                      <div className="flex items-center gap-1 px-2 py-1 bg-amber-500/20 rounded-full">
                        <AlertCircle className="h-3 w-3 text-amber-400" />
                        <span className="text-xs text-amber-400 font-medium">Watch</span>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground font-medium">Attendance</p>
                      <p className="text-3xl font-bold text-green-400 mb-1">{mockData.attendance.overall}%</p>
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-blue-400">Target: 75% ✓</span>
                        <span className="text-amber-400">Can miss: 3</span>
                      </div>
                      <div className="w-full bg-slate-700 rounded-full h-1 mt-2">
                        <div className="bg-green-400 h-1 rounded-full transition-all duration-1000" style={{width: '85%'}}></div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Enhanced Semester Progress Card */}
              <div 
                className="group relative cursor-pointer"
                onClick={() => setActiveTab("finance")}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-purple-600/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                <Card className="relative bg-gradient-to-br from-purple-500/5 to-purple-600/5 border-purple-500/20 hover:border-purple-400/40 transition-all duration-300 transform group-hover:scale-105 backdrop-blur-sm">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                        <BookOpen className="h-6 w-6 text-white" />
                      </div>
                      <div className="flex items-center gap-1 px-2 py-1 bg-green-500/20 rounded-full">
                        <CheckCircle className="h-3 w-3 text-green-400" />
                        <span className="text-xs text-green-400 font-medium">65%</span>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground font-medium">Semester Progress</p>
                      <p className="text-2xl font-bold text-purple-400 mb-1">Week 11/16</p>
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-green-400">On track</span>
                        <span className="text-muted-foreground">5 weeks left</span>
                      </div>
                      <div className="w-full bg-slate-700 rounded-full h-1 mt-2">
                        <div className="bg-purple-400 h-1 rounded-full transition-all duration-1000" style={{width: '65%'}}></div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Smart Academic Health Score */}
              <div 
                className="group relative cursor-pointer"
                onClick={() => setActiveTab("reports")}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-orange-500/20 to-orange-600/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                <Card className="relative bg-gradient-to-br from-orange-500/5 to-orange-600/5 border-orange-500/20 hover:border-orange-400/40 transition-all duration-300 transform group-hover:scale-105 backdrop-blur-sm">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center shadow-lg">
                        <Target className="h-6 w-6 text-white" />
                      </div>
                      <div className="flex items-center gap-1 px-2 py-1 bg-green-500/20 rounded-full">
                        <Star className="h-3 w-3 text-green-400" />
                        <span className="text-xs text-green-400 font-medium">A+</span>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground font-medium">Academic Health</p>
                      <p className="text-3xl font-bold text-orange-400 mb-1">92/100</p>
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-green-400">Excellent</span>
                        <span className="text-blue-400">Top 5%</span>
                      </div>
                      <div className="w-full bg-slate-700 rounded-full h-1 mt-2">
                        <div className="bg-orange-400 h-1 rounded-full transition-all duration-1000" style={{width: '92%'}}></div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Modern Dashboard Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Quick Actions - Redesigned */}
              <div className="lg:col-span-1">
                <Card className="h-full bg-gradient-to-br from-slate-800/50 to-slate-900/50 border-slate-700/50 backdrop-blur-sm">
                  <CardHeader className="pb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                        <Bell className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <CardTitle className="text-lg">Quick Actions</CardTitle>
                        <CardDescription className="text-xs">Manage your academic tasks</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Button 
                      onClick={() => setActiveTab("reports")}
                      className="w-full h-12 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white border-0 rounded-xl shadow-lg justify-start group"
                    >
                      <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center mr-3 group-hover:scale-110 transition-transform">
                        <Download className="h-4 w-4" />
                      </div>
                      <div className="text-left">
                        <p className="font-medium">Download Reports</p>
                        <p className="text-xs opacity-80">Academic & Performance</p>
                      </div>
                    </Button>
                    
                    <Button 
                      onClick={() => setActiveTab("counselling")}
                      className="w-full h-12 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white border-0 rounded-xl shadow-lg justify-start group"
                    >
                      <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center mr-3 group-hover:scale-110 transition-transform">
                        <MessageCircle className="h-4 w-4" />
                      </div>
                      <div className="text-left">
                        <p className="font-medium">Book Counseling</p>
                        <p className="text-xs opacity-80">Academic & Career</p>
                      </div>
                    </Button>
                    
                    <Button 
                      onClick={() => setNotifications(!notifications)}
                      variant="outline"
                      className="w-full h-12 border-slate-600 hover:bg-slate-700/50 rounded-xl justify-start group"
                    >
                      <div className="w-8 h-8 bg-slate-700 rounded-lg flex items-center justify-center mr-3 group-hover:scale-110 transition-transform">
                        <Bell className="h-4 w-4" />
                      </div>
                      <div className="text-left">
                        <p className="font-medium">{notifications ? 'Disable' : 'Enable'} Notifications</p>
                        <p className="text-xs opacity-80">System alerts</p>
                      </div>
                    </Button>

                    {/* Weekly Progress */}
                    <div className="pt-4 border-t border-slate-700">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-medium text-sm">This Week</h4>
                        <span className="text-xs text-green-400">On track</span>
                      </div>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Assignments</span>
                          <span className="font-medium">3/4 completed</span>
                        </div>
                        <Progress value={75} className="h-2 bg-slate-700" />
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Classes attended</span>
                          <span className="font-medium">12/15</span>
                        </div>
                        <Progress value={80} className="h-2 bg-slate-700" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Activity & Performance Grid */}
              <div className="lg:col-span-2 space-y-6">
                {/* Recent Activity - Modern Design */}
                <Card className="bg-gradient-to-br from-slate-800/30 to-slate-900/30 border-slate-700/50 backdrop-blur-sm">
                  <CardHeader className="pb-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center">
                          <Clock className="h-5 w-5 text-white" />
                        </div>
                        <div>
                          <CardTitle className="text-lg">Recent Activity</CardTitle>
                          <CardDescription className="text-xs">Latest academic updates</CardDescription>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm" className="text-xs">View All</Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {mockData.recentActivity.map((activity, index) => (
                        <div key={index} className="group flex items-center gap-4 p-4 rounded-xl hover:bg-slate-700/30 transition-all duration-200 cursor-pointer">
                          <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-gradient-to-br from-slate-700 to-slate-800 group-hover:scale-110 transition-transform">
                            {activity.type === "academic" && <BookOpen className="h-5 w-5 text-blue-400" />}
                            {activity.type === "attendance" && <Calendar className="h-5 w-5 text-green-400" />}
                            {activity.type === "grades" && <TrendingUp className="h-5 w-5 text-purple-400" />}
                            {activity.type === "counseling" && <MessageCircle className="h-5 w-5 text-orange-400" />}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-medium text-sm truncate">{activity.activity}</p>
                            <p className="text-xs text-muted-foreground">{activity.date}</p>
                          </div>
                          <Button size="sm" variant="ghost" className="opacity-0 group-hover:opacity-100 transition-opacity">
                            <Eye className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        );

      case "profile":
        return (
          <div className="space-y-6">
            {/* Enhanced Profile Header */}
            <Card className="glow bg-gradient-to-br from-slate-800/50 to-slate-900/50 border-slate-700/50">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-20 h-20 bg-gradient-primary rounded-2xl flex items-center justify-center shadow-lg">
                      <User className="h-10 w-10 text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-2xl">{profileData.name}</CardTitle>
                      <CardDescription className="text-lg">{profileData.program}</CardDescription>
                      <div className="flex items-center gap-4 mt-2">
                        <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/50">
                          {profileData.studentId}
                        </Badge>
                        <Badge className="bg-green-500/20 text-green-400 border-green-500/50">
                          {profileData.year}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  <Button onClick={() => setIsEditOpen(true)} className="bg-gradient-primary hover:bg-gradient-primary-hover">
                    <Edit className="h-4 w-4 mr-2" />
                    Edit Profile
                  </Button>
                </div>
              </CardHeader>
            </Card>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Personal Information */}
              <div className="lg:col-span-2 space-y-6">
                <Card className="bg-gradient-to-br from-slate-800/30 to-slate-900/30 border-slate-700/50">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <User className="h-5 w-5" />
                      Personal Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div className="p-4 bg-slate-700/30 rounded-lg">
                          <label className="text-sm font-medium text-muted-foreground">Full Name</label>
                          <p className="text-lg font-medium mt-1">{profileData.name}</p>
                        </div>
                        <div className="p-4 bg-slate-700/30 rounded-lg">
                          <label className="text-sm font-medium text-muted-foreground">Student ID</label>
                          <p className="text-lg font-medium mt-1">{profileData.studentId}</p>
                        </div>
                        <div className="p-4 bg-slate-700/30 rounded-lg">
                          <label className="text-sm font-medium text-muted-foreground">Email</label>
                          <p className="text-lg font-medium mt-1">{profileData.email}</p>
                        </div>
                        <div className="p-4 bg-slate-700/30 rounded-lg">
                          <label className="text-sm font-medium text-muted-foreground">Phone</label>
                          <p className="text-lg font-medium mt-1">{profileData.phone}</p>
                        </div>
                      </div>
                      <div className="space-y-4">
                        <div className="p-4 bg-slate-700/30 rounded-lg">
                          <label className="text-sm font-medium text-muted-foreground">Program</label>
                          <p className="text-lg font-medium mt-1">{profileData.program}</p>
                        </div>
                        <div className="p-4 bg-slate-700/30 rounded-lg">
                          <label className="text-sm font-medium text-muted-foreground">Current Semester</label>
                          <p className="text-lg font-medium mt-1">{profileData.semester}</p>
                        </div>
                        <div className="p-4 bg-slate-700/30 rounded-lg">
                          <label className="text-sm font-medium text-muted-foreground">Academic Year</label>
                          <p className="text-lg font-medium mt-1">{profileData.year}</p>
                        </div>
                        <div className="p-4 bg-slate-700/30 rounded-lg">
                          <label className="text-sm font-medium text-muted-foreground">Enrollment Date</label>
                          <p className="text-lg font-medium mt-1">{profileData.enrollmentDate}</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Academic Timeline */}
                <Card className="bg-gradient-to-br from-blue-500/5 to-purple-500/5 border-blue-500/20">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Clock className="h-5 w-5" />
                      Academic Timeline
                    </CardTitle>
                    <CardDescription>Your journey at UPES</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {[
                        { year: "2022", event: "Enrolled in B.Tech CSE", status: "completed", cgpa: "8.5" },
                        { year: "2023", event: "Completed 2nd Year", status: "completed", cgpa: "8.6" },
                        { year: "2024", event: "Started Final Year", status: "completed", cgpa: "8.7" },
                        { year: "2025", event: "Final Semester", status: "current", cgpa: "Est. 9.0" },
                        { year: "2025", event: "Graduation", status: "upcoming", cgpa: "Est. 8.8" }
                      ].map((item, index) => (
                        <div key={index} className="flex items-center gap-4 p-3 rounded-lg hover:bg-slate-700/20 transition-colors">
                          <div className={`w-4 h-4 rounded-full ${item.status === 'completed' ? 'bg-green-400' : item.status === 'current' ? 'bg-blue-400 animate-pulse' : 'bg-slate-600'}`}></div>
                          <div className="flex-1">
                            <p className="font-medium">{item.event}</p>
                            <p className="text-sm text-muted-foreground">{item.year}</p>
                          </div>
                          <Badge variant="outline" className="text-xs">
                            CGPA: {item.cgpa}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Right Sidebar */}
              <div className="space-y-6">
                {/* Academic Stats */}
                <Card className="bg-gradient-to-br from-green-500/5 to-blue-500/5 border-green-500/20">
                  <CardHeader>
                    <CardTitle className="text-lg">Academic Stats</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="text-center p-4 bg-gradient-to-br from-blue-500/10 to-blue-600/10 rounded-lg">
                      <p className="text-sm text-muted-foreground">Current CGPA</p>
                      <p className="text-3xl font-bold text-blue-400">{profileData.cgpa}</p>
                      <div className="w-full bg-slate-700 rounded-full h-2 mt-2">
                        <div className="bg-blue-400 h-2 rounded-full" style={{width: '87%'}}></div>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-3">
                      <div className="p-3 bg-slate-700/30 rounded-lg text-center">
                        <p className="text-xs text-muted-foreground">Semester Rank</p>
                        <p className="text-lg font-bold text-amber-400">#12</p>
                      </div>
                      <div className="p-3 bg-slate-700/30 rounded-lg text-center">
                        <p className="text-xs text-muted-foreground">Class Rank</p>
                        <p className="text-lg font-bold text-purple-400">#8</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Skills & Interests */}
                <Card className="bg-gradient-to-br from-purple-500/5 to-pink-500/5 border-purple-500/20">
                  <CardHeader>
                    <CardTitle className="text-lg">Skills & Interests</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div>
                        <p className="text-sm font-medium mb-2">Technical Skills</p>
                        <div className="flex flex-wrap gap-2">
                          {["Python", "JavaScript", "React", "Node.js", "SQL"].map((skill, idx) => (
                            <Badge key={idx} variant="outline" className="text-xs bg-blue-500/10 border-blue-500/30">
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div>
                        <p className="text-sm font-medium mb-2">Interests</p>
                        <div className="flex flex-wrap gap-2">
                          {["AI/ML", "Web Dev", "Mobile Apps", "Cybersecurity"].map((interest, idx) => (
                            <Badge key={idx} variant="outline" className="text-xs bg-purple-500/10 border-purple-500/30">
                              {interest}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Career Preparation */}
                <Card className="bg-gradient-to-br from-orange-500/5 to-red-500/5 border-orange-500/20">
                  <CardHeader>
                    <CardTitle className="text-lg">Career Readiness</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Resume</span>
                        <Badge className="bg-green-500/20 text-green-400 border-green-500/50">Updated</Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">LinkedIn Profile</span>
                        <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/50">Complete</Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Portfolio</span>
                        <Badge className="bg-amber-500/20 text-amber-400 border-amber-500/50">In Progress</Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Interview Prep</span>
                        <Badge variant="outline">Not Started</Badge>
                      </div>
                    </div>
                    <Button 
                      variant="outline" 
                      className="w-full mt-4 border-orange-500/50 hover:bg-orange-500/10"
                      onClick={() => setActiveTab("counselling")}
                    >
                      Schedule Career Guidance
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        );

      case "student-form":
        return (
          <div className="space-y-6">
            <StudentForm 
              isOpen={true}
              onClose={() => setActiveTab("overview")}
              onSubmit={(data) => {
                console.log("Student form submitted:", data);
                setActiveTab("overview");
              }}
              userRole="student"
            />
          </div>
        );

      case "attendance":
        return (
          <div className="space-y-6">
            {/* Redesigned Attendance Dashboard */}
            <div className="relative mb-8">
              {/* Main Dashboard Card */}
              <Card className="relative overflow-hidden bg-gradient-to-br from-slate-800/80 via-slate-900/90 to-black/95 border border-slate-700/50 shadow-2xl">
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-5">
                  <div className="absolute inset-0" style={{
                    backgroundImage: `radial-gradient(circle at 25% 25%, rgba(34, 197, 94, 0.3) 0%, transparent 50%), 
                                     radial-gradient(circle at 75% 75%, rgba(59, 130, 246, 0.3) 0%, transparent 50%)`
                  }}></div>
                </div>
                
                <CardContent className="relative p-8">
                  {/* Header Section */}
                  <div className="flex items-center justify-between mb-8">
                    <div>
                      <h2 className="text-3xl font-bold bg-gradient-to-r from-green-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent">
                        Attendance Tracker
                      </h2>
                      <p className="text-muted-foreground mt-2">Monitor your class attendance and maintain academic standards</p>
                    </div>
                    <div className="hidden md:flex items-center gap-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg">
                        <Calendar className="h-6 w-6 text-white" />
                      </div>
                    </div>
                  </div>

                  {/* Interactive Stats Grid */}
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    {/* Overall Attendance */}
                    <div className="group relative lg:col-span-1">
                      <div className="absolute inset-0 bg-gradient-to-br from-green-500/20 to-green-600/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                      <div className="relative p-6 bg-gradient-to-br from-green-500/10 to-green-600/5 rounded-2xl border border-green-500/20 hover:border-green-400/40 transition-all duration-300 hover:scale-105">
                        <div className="flex items-center justify-between mb-4">
                          <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center shadow-lg">
                            <CheckCircle className="h-6 w-6 text-white" />
                          </div>
                          <div className="flex items-center gap-1 px-2 py-1 bg-green-500/20 rounded-full">
                            <TrendingUp className="h-3 w-3 text-green-400" />
                          </div>
                        </div>
                        <div className="space-y-1">
                          <p className="text-sm text-muted-foreground font-medium">Overall Attendance</p>
                          <p className="text-3xl font-bold text-green-400">{mockData.attendance.overall}%</p>
                          <p className="text-xs text-blue-400">Above target 75%</p>
                        </div>
                      </div>
                    </div>

                    {/* Safe to Miss */}
                    <div className="group relative">
                      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-blue-600/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                      <div className="relative p-6 bg-gradient-to-br from-blue-500/10 to-blue-600/5 rounded-2xl border border-blue-500/20 hover:border-blue-400/40 transition-all duration-300 hover:scale-105">
                        <div className="flex items-center justify-between mb-4">
                          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                            <Calendar className="h-6 w-6 text-white" />
                          </div>
                          <div className="flex items-center gap-1 px-2 py-1 bg-blue-500/20 rounded-full">
                            <CheckCircle className="h-3 w-3 text-blue-400" />
                          </div>
                        </div>
                        <div className="space-y-1">
                          <p className="text-sm text-muted-foreground font-medium">Safe to Miss</p>
                          <p className="text-3xl font-bold text-blue-400">3</p>
                          <p className="text-xs text-green-400">more classes</p>
                        </div>
                      </div>
                    </div>

                    {/* Current Streak */}
                    <div className="group relative">
                      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-purple-600/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                      <div className="relative p-6 bg-gradient-to-br from-purple-500/10 to-purple-600/5 rounded-2xl border border-purple-500/20 hover:border-purple-400/40 transition-all duration-300 hover:scale-105">
                        <div className="flex items-center justify-between mb-4">
                          <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                            <Trophy className="h-6 w-6 text-white" />
                          </div>
                          <div className="flex items-center gap-1 px-2 py-1 bg-purple-500/20 rounded-full">
                            <Star className="h-3 w-3 text-purple-400" />
                          </div>
                        </div>
                        <div className="space-y-1">
                          <p className="text-sm text-muted-foreground font-medium">Current Streak</p>
                          <p className="text-3xl font-bold text-purple-400">5</p>
                          <p className="text-xs text-purple-400">days present</p>
                        </div>
                      </div>
                    </div>

                    {/* This Week */}
                    <div className="group relative">
                      <div className="absolute inset-0 bg-gradient-to-br from-amber-500/20 to-amber-600/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                      <div className="relative p-6 bg-gradient-to-br from-amber-500/10 to-amber-600/5 rounded-2xl border border-amber-500/20 hover:border-amber-400/40 transition-all duration-300 hover:scale-105">
                        <div className="flex items-center justify-between mb-4">
                          <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-amber-600 rounded-xl flex items-center justify-center shadow-lg">
                            <Clock className="h-6 w-6 text-white" />
                          </div>
                          <div className="flex items-center gap-1 px-2 py-1 bg-amber-500/20 rounded-full">
                            <CheckCircle className="h-3 w-3 text-amber-400" />
                          </div>
                        </div>
                        <div className="space-y-1">
                          <p className="text-sm text-muted-foreground font-medium">This Week</p>
                          <p className="text-3xl font-bold text-amber-400">8/10</p>
                          <p className="text-xs text-green-400">classes attended</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Attendance Health Indicator */}
                  <div className="bg-gradient-to-r from-slate-800/50 to-slate-700/50 rounded-2xl p-6 border border-slate-600/30">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h3 className="text-lg font-semibold text-foreground">Attendance Health</h3>
                        <p className="text-sm text-muted-foreground">You're maintaining excellent attendance!</p>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center gap-2 mb-1">
                          <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                          <span className="text-lg font-bold text-green-400">Excellent</span>
                        </div>
                        <p className="text-xs text-muted-foreground">Well above minimum</p>
                      </div>
                    </div>
                    <div className="relative">
                      <Progress value={85} className="h-3 bg-slate-700" />
                      <div className="absolute top-0 left-0 w-full h-3 bg-gradient-to-r from-green-400/20 to-blue-400/20 rounded-full"></div>
                    </div>
                    <div className="flex justify-between text-xs text-muted-foreground mt-2">
                      <span>Target: 75% ✓ Achieved</span>
                      <span>Perfect month possible</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Enhanced Attendance Overview */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <Card className="glow bg-gradient-to-br from-green-500/5 to-blue-500/5 border-green-500/20">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="flex items-center gap-2">
                          <Calendar className="h-5 w-5" />
                          Attendance Overview
                        </CardTitle>
                        <CardDescription>Your attendance across all subjects this semester</CardDescription>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-muted-foreground">Target: 75%</p>
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                          <span className="text-sm font-medium text-green-400">On Track</span>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Overall Attendance with Smart Insights */}
                    <div className="text-center p-6 bg-gradient-to-br from-green-500/10 to-green-600/10 rounded-xl border border-green-500/20">
                      <div className="flex items-center justify-center gap-4 mb-4">
                        <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center shadow-lg">
                          <CheckCircle className="h-8 w-8 text-white" />
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground mb-1">Overall Attendance</p>
                          <p className="text-4xl font-bold text-green-400">{mockData.attendance.overall}%</p>
                        </div>
                      </div>
                      
                      {/* Smart Attendance Insights */}
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                        <div className="p-4 bg-blue-500/10 rounded-lg border border-blue-500/20">
                          <p className="text-xs text-blue-400 font-medium mb-1">Safe to Miss</p>
                          <p className="text-2xl font-bold text-blue-400">3</p>
                          <p className="text-xs text-muted-foreground">more classes</p>
                        </div>
                        <div className="p-4 bg-amber-500/10 rounded-lg border border-amber-500/20">
                          <p className="text-xs text-amber-400 font-medium mb-1">Need to Attend</p>
                          <p className="text-2xl font-bold text-amber-400">12</p>
                          <p className="text-xs text-muted-foreground">next classes</p>
                        </div>
                        <div className="p-4 bg-purple-500/10 rounded-lg border border-purple-500/20">
                          <p className="text-xs text-purple-400 font-medium mb-1">Streak</p>
                          <p className="text-2xl font-bold text-purple-400">5</p>
                          <p className="text-xs text-muted-foreground">days present</p>
                        </div>
                      </div>
                    </div>
                    
                    {/* Subject-wise Attendance with Enhanced Details */}
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h4 className="text-lg font-semibold">Subject Breakdown</h4>
                        <Button variant="outline" size="sm">
                          <Clock className="h-4 w-4 mr-2" />
                          View Schedule
                        </Button>
                      </div>
                      
                      {mockData.attendance.subjects.map((subject, index) => (
                        <div key={index} className="p-4 bg-secondary/20 rounded-xl space-y-3 hover:bg-secondary/30 transition-colors">
                          <div className="flex justify-between items-center">
                            <div className="flex items-center gap-3">
                              <div className={`w-4 h-4 rounded-full ${
                                subject.status === "Good" ? "bg-green-400" : 
                                subject.status === "Warning" ? "bg-amber-400" : "bg-red-400"
                              }`}></div>
                              <div>
                                <h4 className="font-medium">{subject.name}</h4>
                                <p className="text-xs text-muted-foreground">
                                  Next class: Today 2:00 PM
                                </p>
                              </div>
                            </div>
                            <div className="text-right">
                              <Badge 
                                variant={subject.status === "Good" ? "default" : "destructive"}
                                className={subject.status === "Good" ? "bg-green-500/20 text-green-400 border-green-500/50" : ""}
                              >
                                {subject.attendance}%
                              </Badge>
                              <p className="text-xs text-muted-foreground mt-1">
                                Can miss: {subject.status === "Good" ? "2 more" : "0 more"}
                              </p>
                            </div>
                          </div>
                          
                          <Progress value={subject.attendance} className="h-3" />
                          
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">{subject.attended}/{subject.classes} classes</span>
                            <span className={`font-medium ${
                              subject.status === "Good" ? "text-green-400" : 
                              subject.status === "Warning" ? "text-amber-400" : "text-red-400"
                            }`}>
                              {subject.status === "Good" ? "✓ Safe" : 
                               subject.status === "Warning" ? "⚠ Watch" : "⚠ Critical"}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Right Sidebar - Attendance Tools */}
              <div className="space-y-6">
                {/* Quick Actions */}
                <Card className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 border-slate-700/50">
                  <CardHeader>
                    <CardTitle className="text-lg">Quick Actions</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Button className="w-full justify-start bg-green-600 hover:bg-green-700">
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Mark Today Present
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <AlertCircle className="h-4 w-4 mr-2" />
                      Request Leave
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <Download className="h-4 w-4 mr-2" />
                      Download Report
                    </Button>
                  </CardContent>
                </Card>

                {/* Attendance Calculator */}
                <Card className="bg-gradient-to-br from-blue-500/5 to-purple-500/5 border-blue-500/20">
                  <CardHeader>
                    <CardTitle className="text-lg">What-If Calculator</CardTitle>
                    <CardDescription>Plan your attendance strategy</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="missClasses" className="text-sm">Classes to miss:</Label>
                      <Input id="missClasses" type="number" placeholder="0" className="mt-1" />
                    </div>
                    <div className="p-3 bg-slate-700/30 rounded-lg">
                      <p className="text-sm text-muted-foreground">New attendance:</p>
                      <p className="text-lg font-bold text-blue-400">82%</p>
                      <p className="text-xs text-green-400">✓ Above minimum</p>
                    </div>
                    <Button variant="outline" className="w-full">
                      Calculate
                    </Button>
                  </CardContent>
                </Card>

                {/* Attendance Goals */}
                <Card className="bg-gradient-to-br from-purple-500/5 to-pink-500/5 border-purple-500/20">
                  <CardHeader>
                    <CardTitle className="text-lg">Goals & Targets</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">University Min (75%)</span>
                      <CheckCircle className="h-4 w-4 text-green-400" />
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Personal Goal (90%)</span>
                      <X className="h-4 w-4 text-red-400" />
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Perfect Month</span>
                      <Clock className="h-4 w-4 text-amber-400" />
                    </div>
                    <Progress value={85} className="h-2 mt-3" />
                    <p className="text-xs text-muted-foreground">85% towards 90% goal</p>
                  </CardContent>
                </Card>

                {/* Weekly Schedule */}
                <Card className="bg-gradient-to-br from-orange-500/5 to-red-500/5 border-orange-500/20">
                  <CardHeader>
                    <CardTitle className="text-lg">This Week</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {[
                        { day: "Mon", classes: 3, attended: 3, status: "complete" },
                        { day: "Tue", classes: 2, attended: 2, status: "complete" },
                        { day: "Wed", classes: 4, attended: 3, status: "partial" },
                        { day: "Thu", classes: 3, attended: 0, status: "upcoming" },
                        { day: "Fri", classes: 2, attended: 0, status: "upcoming" }
                      ].map((day, idx) => (
                        <div key={idx} className="flex items-center justify-between">
                          <span className="text-sm font-medium">{day.day}</span>
                          <div className="flex items-center gap-2">
                            <span className="text-xs text-muted-foreground">
                              {day.attended}/{day.classes}
                            </span>
                            <div className={`w-3 h-3 rounded-full ${
                              day.status === "complete" ? "bg-green-400" :
                              day.status === "partial" ? "bg-amber-400" :
                              "bg-slate-600"
                            }`}></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        );

      case "grades":
        return (
          <div className="space-y-6">
            {/* Redesigned Grades Dashboard */}
            <div className="relative mb-8">
              {/* Main Dashboard Card */}
              <Card className="relative overflow-hidden bg-gradient-to-br from-slate-800/80 via-slate-900/90 to-black/95 border border-slate-700/50 shadow-2xl">
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-5">
                  <div className="absolute inset-0" style={{
                    backgroundImage: `radial-gradient(circle at 20% 30%, rgba(59, 130, 246, 0.3) 0%, transparent 50%), 
                                     radial-gradient(circle at 80% 70%, rgba(34, 197, 94, 0.3) 0%, transparent 50%)`
                  }}></div>
                </div>
                
                <CardContent className="relative p-8">
                  {/* Header Section */}
                  <div className="flex items-center justify-between mb-8">
                    <div>
                      <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-400 via-green-400 to-purple-400 bg-clip-text text-transparent">
                        Academic Performance
                      </h2>
                      <p className="text-muted-foreground mt-2">Track your grades and academic progress</p>
                    </div>
                    <div className="hidden md:flex items-center gap-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-green-600 rounded-2xl flex items-center justify-center shadow-lg">
                        <TrendingUp className="h-6 w-6 text-white" />
                      </div>
                    </div>
                  </div>

                  {/* Interactive Stats Grid */}
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    {/* Current CGPA */}
                    <div className="group relative">
                      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-blue-600/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                      <div className="relative p-6 bg-gradient-to-br from-blue-500/10 to-blue-600/5 rounded-2xl border border-blue-500/20 hover:border-blue-400/40 transition-all duration-300 hover:scale-105">
                        <div className="flex items-center justify-between mb-4">
                          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                            <TrendingUp className="h-6 w-6 text-white" />
                          </div>
                          <div className="flex items-center gap-1 px-2 py-1 bg-green-500/20 rounded-full">
                            <TrendingUp className="h-3 w-3 text-green-400" />
                            <span className="text-xs text-green-400 font-medium">+0.2</span>
                          </div>
                        </div>
                        <div className="space-y-1">
                          <p className="text-sm text-muted-foreground font-medium">Current CGPA</p>
                          <p className="text-3xl font-bold text-blue-400">{profileData.cgpa}</p>
                          <p className="text-xs text-green-400">Above average</p>
                        </div>
                      </div>
                    </div>

                    {/* Predicted SGPA */}
                    <div className="group relative">
                      <div className="absolute inset-0 bg-gradient-to-br from-green-500/20 to-green-600/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                      <div className="relative p-6 bg-gradient-to-br from-green-500/10 to-green-600/5 rounded-2xl border border-green-500/20 hover:border-green-400/40 transition-all duration-300 hover:scale-105">
                        <div className="flex items-center justify-between mb-4">
                          <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center shadow-lg">
                            <Target className="h-6 w-6 text-white" />
                          </div>
                          <div className="flex items-center gap-1 px-2 py-1 bg-blue-500/20 rounded-full">
                            <Target className="h-3 w-3 text-blue-400" />
                          </div>
                        </div>
                        <div className="space-y-1">
                          <p className="text-sm text-muted-foreground font-medium">Predicted SGPA</p>
                          <p className="text-3xl font-bold text-green-400">9.1</p>
                          <p className="text-xs text-blue-400">On track</p>
                        </div>
                      </div>
                    </div>

                    {/* Class Rank */}
                    <div className="group relative">
                      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-purple-600/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                      <div className="relative p-6 bg-gradient-to-br from-purple-500/10 to-purple-600/5 rounded-2xl border border-purple-500/20 hover:border-purple-400/40 transition-all duration-300 hover:scale-105">
                        <div className="flex items-center justify-between mb-4">
                          <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                            <Trophy className="h-6 w-6 text-white" />
                          </div>
                          <div className="flex items-center gap-1 px-2 py-1 bg-amber-500/20 rounded-full">
                            <Trophy className="h-3 w-3 text-amber-400" />
                          </div>
                        </div>
                        <div className="space-y-1">
                          <p className="text-sm text-muted-foreground font-medium">Class Rank</p>
                          <p className="text-3xl font-bold text-purple-400">#8</p>
                          <p className="text-xs text-amber-400">Top 12%</p>
                        </div>
                      </div>
                    </div>

                    {/* Credits Earned */}
                    <div className="group relative">
                      <div className="absolute inset-0 bg-gradient-to-br from-amber-500/20 to-amber-600/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                      <div className="relative p-6 bg-gradient-to-br from-amber-500/10 to-amber-600/5 rounded-2xl border border-amber-500/20 hover:border-amber-400/40 transition-all duration-300 hover:scale-105">
                        <div className="flex items-center justify-between mb-4">
                          <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-amber-600 rounded-xl flex items-center justify-center shadow-lg">
                            <CheckCircle className="h-6 w-6 text-white" />
                          </div>
                          <div className="flex items-center gap-1 px-2 py-1 bg-green-500/20 rounded-full">
                            <CheckCircle className="h-3 w-3 text-green-400" />
                          </div>
                        </div>
                        <div className="space-y-1">
                          <p className="text-sm text-muted-foreground font-medium">Credits Earned</p>
                          <p className="text-3xl font-bold text-amber-400">142</p>
                          <p className="text-xs text-green-400">18 remaining</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Academic Progress Indicator */}
                  <div className="bg-gradient-to-r from-slate-800/50 to-slate-700/50 rounded-2xl p-6 border border-slate-600/30">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h3 className="text-lg font-semibold text-foreground">Academic Health Score</h3>
                        <p className="text-sm text-muted-foreground">Excellent performance across all metrics</p>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-green-400">92/100</p>
                        <p className="text-xs text-muted-foreground">A+ Grade</p>
                      </div>
                    </div>
                    <div className="relative">
                      <Progress value={92} className="h-3 bg-slate-700" />
                      <div className="absolute top-0 left-0 w-full h-3 bg-gradient-to-r from-blue-400/20 to-green-400/20 rounded-full"></div>
                    </div>
                    <div className="flex justify-between text-xs text-muted-foreground mt-2">
                      <span>Exceeding expectations</span>
                      <span>Top 5% in class</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Current Semester Grades - Enhanced */}
              <div className="lg:col-span-2">
                <Card className="glow bg-gradient-to-br from-slate-800/50 to-slate-900/50 border-slate-700/50">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="flex items-center gap-2">
                          <BookOpen className="h-5 w-5" />
                          Current Semester Performance
                        </CardTitle>
                        <CardDescription>Detailed breakdown with predictions</CardDescription>
                      </div>
                      <Button variant="outline" size="sm">
                        <Download className="h-4 w-4 mr-2" />
                        Export Grades
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      {mockData.grades.currentSemester.map((subject, index) => (
                        <div key={index} className="p-6 bg-secondary/20 rounded-xl hover:bg-secondary/30 transition-colors">
                          <div className="flex justify-between items-start mb-4">
                            <div>
                              <h4 className="font-semibold text-lg">{subject.subject}</h4>
                              <p className="text-sm text-muted-foreground">Credits: 4 | Weight: 25%</p>
                            </div>
                            <div className="text-right">
                              <Badge className="bg-gradient-primary text-primary-foreground text-lg px-3 py-1">
                                {subject.total}%
                              </Badge>
                              <p className="text-xs text-muted-foreground mt-1">
                                Grade: {subject.total >= 90 ? 'A+' : subject.total >= 80 ? 'A' : subject.total >= 70 ? 'B+' : 'B'}
                              </p>
                            </div>
                          </div>
                          
                          {/* Enhanced Grade Breakdown */}
                          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                            <div className="p-3 bg-blue-500/10 rounded-lg border border-blue-500/20">
                              <p className="text-xs text-blue-400 font-medium">Midterm (30%)</p>
                              <p className="text-lg font-bold text-blue-400">{subject.midterm}%</p>
                            </div>
                            <div className="p-3 bg-green-500/10 rounded-lg border border-green-500/20">
                              <p className="text-xs text-green-400 font-medium">Assignments (40%)</p>
                              <p className="text-lg font-bold text-green-400">{subject.assignments}%</p>
                            </div>
                            <div className="p-3 bg-purple-500/10 rounded-lg border border-purple-500/20">
                              <p className="text-xs text-purple-400 font-medium">Project (30%)</p>
                              <p className="text-lg font-bold text-purple-400">{subject.project}%</p>
                            </div>
                            <div className="p-3 bg-amber-500/10 rounded-lg border border-amber-500/20">
                              <p className="text-xs text-amber-400 font-medium">Final Exam</p>
                              <p className="text-lg font-bold text-amber-400">Pending</p>
                            </div>
                          </div>
                          
                          {/* Grade Prediction */}
                          <div className="p-4 bg-slate-700/30 rounded-lg">
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-sm font-medium">Final Grade Prediction</span>
                              <Badge variant="outline" className="text-xs">
                                Need 75% in final for A+
                              </Badge>
                            </div>
                            <Progress value={subject.total} className="h-2" />
                            <div className="flex justify-between text-xs text-muted-foreground mt-1">
                              <span>Current: {subject.total}%</span>
                              <span>Target: 90%</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Grade Trends & Analytics */}
                <Card className="mt-6 bg-gradient-to-br from-blue-500/5 to-purple-500/5 border-blue-500/20">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <TrendingUp className="h-5 w-5" />
                      Performance Analytics
                    </CardTitle>
                    <CardDescription>Your academic journey insights</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* CGPA Trend */}
                      <div className="p-4 bg-slate-700/30 rounded-lg">
                        <h4 className="font-medium mb-3">CGPA Progression</h4>
                        <div className="space-y-2">
                          {mockData.grades.semesterHistory.map((sem, index) => (
                            <div key={index} className="flex items-center justify-between">
                              <span className="text-sm text-muted-foreground">{sem.semester}</span>
                              <div className="flex items-center gap-2">
                                <span className="text-sm font-medium">{sem.sgpa}</span>
                                <div className="w-16 bg-slate-600 rounded-full h-1">
                                  <div 
                                    className="bg-blue-400 h-1 rounded-full" 
                                    style={{width: `${(parseFloat(sem.sgpa) / 10) * 100}%`}}
                                  ></div>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      {/* Subject Performance */}
                      <div className="p-4 bg-slate-700/30 rounded-lg">
                        <h4 className="font-medium mb-3">Subject Strengths</h4>
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <span className="text-sm">Web Development</span>
                            <Badge className="bg-green-500/20 text-green-400 border-green-500/50">Strength</Badge>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm">Data Structures</span>
                            <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/50">Strong</Badge>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm">Database Systems</span>
                            <Badge className="bg-amber-500/20 text-amber-400 border-amber-500/50">Improve</Badge>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm">Software Engineering</span>
                            <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/50">Good</Badge>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Right Sidebar - Tools & Insights */}
              <div className="space-y-6">
                {/* Grade Calculator */}
                <Card className="bg-gradient-to-br from-green-500/5 to-blue-500/5 border-green-500/20">
                  <CardHeader>
                    <CardTitle className="text-lg">Grade Calculator</CardTitle>
                    <CardDescription>Plan your final exam strategy</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="targetGrade">Target Grade:</Label>
                      <Input id="targetGrade" placeholder="90%" className="mt-1" />
                    </div>
                    <div>
                      <Label htmlFor="subject">Subject:</Label>
                      <select className="w-full p-2 bg-slate-700 rounded-lg border border-slate-600 mt-1">
                        <option>Data Structures</option>
                        <option>Database Systems</option>
                        <option>Web Development</option>
                        <option>Software Engineering</option>
                      </select>
                    </div>
                    <div className="p-3 bg-blue-500/10 rounded-lg border border-blue-500/20">
                      <p className="text-sm text-blue-400 font-medium">Required Final Score:</p>
                      <p className="text-2xl font-bold text-blue-400">82%</p>
                    </div>
                    <Button className="w-full bg-green-600 hover:bg-green-700">
                      Calculate
                    </Button>
                  </CardContent>
                </Card>

                {/* Quick Stats */}
                <Card className="bg-gradient-to-br from-purple-500/5 to-pink-500/5 border-purple-500/20">
                  <CardHeader>
                    <CardTitle className="text-lg">Quick Stats</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Highest Grade</span>
                      <span className="font-bold text-green-400">92%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Average Grade</span>
                      <span className="font-bold text-blue-400">87%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Improvement</span>
                      <span className="font-bold text-purple-400">+5.2%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Consistency</span>
                      <Badge className="bg-green-500/20 text-green-400 border-green-500/50">High</Badge>
                    </div>
                  </CardContent>
                </Card>

                {/* Study Recommendations */}
                <Card className="bg-gradient-to-br from-orange-500/5 to-red-500/5 border-orange-500/20">
                  <CardHeader>
                    <CardTitle className="text-lg">Study Focus</CardTitle>
                    <CardDescription>AI-powered recommendations</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="p-3 bg-amber-500/10 rounded-lg border border-amber-500/20">
                      <p className="text-sm font-medium text-amber-400">Priority Subject</p>
                      <p className="text-lg font-bold">Database Systems</p>
                      <p className="text-xs text-muted-foreground">Focus on SQL optimization</p>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-400" />
                        <span className="text-sm">Review JOIN operations</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-400" />
                        <span className="text-sm">Practice normalization</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-amber-400" />
                        <span className="text-sm">Schedule study group</span>
                      </div>
                    </div>
                    <Button variant="outline" className="w-full">
                      <MessageCircle className="h-4 w-4 mr-2" />
                      Get Tutor Help
                    </Button>
                  </CardContent>
                </Card>

                {/* Academic Goals */}
                <Card className="bg-gradient-to-br from-indigo-500/5 to-blue-500/5 border-indigo-500/20">
                  <CardHeader>
                    <CardTitle className="text-lg">Academic Goals</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Dean's List (9.0+)</span>
                      <CheckCircle className="h-4 w-4 text-green-400" />
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Magna Cum Laude</span>
                      <Clock className="h-4 w-4 text-amber-400" />
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Perfect Semester</span>
                      <Target className="h-4 w-4 text-blue-400" />
                    </div>
                    <Progress value={87} className="h-2 mt-3" />
                    <p className="text-xs text-muted-foreground">87% towards perfect semester</p>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Semester History */}
            <Card className="bg-gradient-to-br from-slate-800/30 to-slate-900/30 border-slate-700/50 backdrop-blur-sm mt-6">
              <CardHeader>
                <CardTitle>Semester History</CardTitle>
                <CardDescription>Your academic performance over time</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {mockData.grades.semesterHistory.map((sem, index) => (
                    <div key={index} className="flex justify-between items-center p-3 bg-secondary/20 rounded-lg">
                      <div>
                        <p className="font-medium">{sem.semester}</p>
                        <p className="text-sm text-muted-foreground">{sem.year}</p>
                      </div>
                      <Badge variant="secondary" className="bg-blue-500/20 text-blue-400 border-blue-500/50">
                        SGPA: {sem.sgpa}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case "reports":
        return (
          <div className="space-y-6">
            {/* Redesigned Reports Dashboard */}
            <div className="relative mb-8">
              {/* Main Dashboard Card */}
              <Card className="relative overflow-hidden bg-gradient-to-br from-slate-800/80 via-slate-900/90 to-black/95 border border-slate-700/50 shadow-2xl">
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-5">
                  <div className="absolute inset-0" style={{
                    backgroundImage: `radial-gradient(circle at 30% 20%, rgba(34, 197, 94, 0.3) 0%, transparent 50%), 
                                     radial-gradient(circle at 70% 80%, rgba(168, 85, 247, 0.3) 0%, transparent 50%)`
                  }}></div>
                </div>
                
                <CardContent className="relative p-8">
                  {/* Header Section */}
                  <div className="flex items-center justify-between mb-8">
                    <div>
                      <h2 className="text-3xl font-bold bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                        Document Hub
                      </h2>
                      <p className="text-muted-foreground mt-2">Access, download, and manage your academic reports</p>
                    </div>
                    <div className="hidden md:flex items-center gap-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
                        <FileText className="h-6 w-6 text-white" />
                      </div>
                    </div>
                  </div>

                  {/* Interactive Stats Grid */}
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    {/* Academic Reports */}
                    <div className="group relative">
                      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-blue-600/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                      <div className="relative p-6 bg-gradient-to-br from-blue-500/10 to-blue-600/5 rounded-2xl border border-blue-500/20 hover:border-blue-400/40 transition-all duration-300 hover:scale-105">
                        <div className="flex items-center justify-between mb-4">
                          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                            <FileText className="h-6 w-6 text-white" />
                          </div>
                          <div className="flex items-center gap-1 px-2 py-1 bg-green-500/20 rounded-full">
                            <CheckCircle className="h-3 w-3 text-green-400" />
                          </div>
                        </div>
                        <div className="space-y-1">
                          <p className="text-sm text-muted-foreground font-medium">Academic Reports</p>
                          <p className="text-3xl font-bold text-blue-400">8</p>
                          <p className="text-xs text-green-400">All available</p>
                        </div>
                      </div>
                    </div>

                    {/* Downloads */}
                    <div className="group relative">
                      <div className="absolute inset-0 bg-gradient-to-br from-green-500/20 to-green-600/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                      <div className="relative p-6 bg-gradient-to-br from-green-500/10 to-green-600/5 rounded-2xl border border-green-500/20 hover:border-green-400/40 transition-all duration-300 hover:scale-105">
                        <div className="flex items-center justify-between mb-4">
                          <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center shadow-lg">
                            <Download className="h-6 w-6 text-white" />
                          </div>
                          <div className="flex items-center gap-1 px-2 py-1 bg-blue-500/20 rounded-full">
                            <TrendingUp className="h-3 w-3 text-blue-400" />
                          </div>
                        </div>
                        <div className="space-y-1">
                          <p className="text-sm text-muted-foreground font-medium">Total Downloads</p>
                          <p className="text-3xl font-bold text-green-400">24</p>
                          <p className="text-xs text-blue-400">5 this month</p>
                        </div>
                      </div>
                    </div>

                    {/* Previews */}
                    <div className="group relative">
                      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-purple-600/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                      <div className="relative p-6 bg-gradient-to-br from-purple-500/10 to-purple-600/5 rounded-2xl border border-purple-500/20 hover:border-purple-400/40 transition-all duration-300 hover:scale-105">
                        <div className="flex items-center justify-between mb-4">
                          <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                            <Eye className="h-6 w-6 text-white" />
                          </div>
                          <div className="flex items-center gap-1 px-2 py-1 bg-amber-500/20 rounded-full">
                            <Star className="h-3 w-3 text-amber-400" />
                          </div>
                        </div>
                        <div className="space-y-1">
                          <p className="text-sm text-muted-foreground font-medium">Quick Previews</p>
                          <p className="text-3xl font-bold text-purple-400">12</p>
                          <p className="text-xs text-amber-400">Fast access</p>
                        </div>
                      </div>
                    </div>

                    {/* Recent Activity */}
                    <div className="group relative">
                      <div className="absolute inset-0 bg-gradient-to-br from-amber-500/20 to-amber-600/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                      <div className="relative p-6 bg-gradient-to-br from-amber-500/10 to-amber-600/5 rounded-2xl border border-amber-500/20 hover:border-amber-400/40 transition-all duration-300 hover:scale-105">
                        <div className="flex items-center justify-between mb-4">
                          <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-amber-600 rounded-xl flex items-center justify-center shadow-lg">
                            <Clock className="h-6 w-6 text-white" />
                          </div>
                          <div className="flex items-center gap-1 px-2 py-1 bg-green-500/20 rounded-full">
                            <CheckCircle className="h-3 w-3 text-green-400" />
                          </div>
                        </div>
                        <div className="space-y-1">
                          <p className="text-sm text-muted-foreground font-medium">Generated</p>
                          <p className="text-3xl font-bold text-amber-400">3</p>
                          <p className="text-xs text-green-400">This week</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Activity Overview */}
                  <div className="bg-gradient-to-r from-slate-800/50 to-slate-700/50 rounded-2xl p-6 border border-slate-600/30">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h3 className="text-lg font-semibold text-foreground">Document Activity</h3>
                        <p className="text-sm text-muted-foreground">Your recent document interactions</p>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-blue-400">85%</p>
                        <p className="text-xs text-muted-foreground">Access rate</p>
                      </div>
                    </div>
                    <div className="relative">
                      <Progress value={85} className="h-3 bg-slate-700" />
                      <div className="absolute top-0 left-0 w-full h-3 bg-gradient-to-r from-green-400/20 to-purple-400/20 rounded-full"></div>
                    </div>
                    <div className="flex justify-between text-xs text-muted-foreground mt-2">
                      <span>Most active: Academic reports</span>
                      <span>Last download: 2 hours ago</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Main Reports Section */}
              <div className="lg:col-span-2">
                <Card className="glow bg-gradient-to-br from-slate-800/50 to-slate-900/50 border-slate-700/50">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="flex items-center gap-2">
                          <FileText className="h-5 w-5" />
                          Academic Reports
                        </CardTitle>
                        <CardDescription>Download, preview, and share your academic documents</CardDescription>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Plus className="h-4 w-4 mr-2" />
                          Request Report
                        </Button>
                        <Button variant="outline" size="sm">
                          Filter
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    {downloadMessage && (
                      <div className="mb-4 p-3 text-sm rounded-lg border border-green-500/50 bg-green-500/10">
                        <div className="flex items-center gap-2">
                          <Download className="h-4 w-4 text-green-400" />
                          <span className="text-green-400">{downloadMessage}</span>
                        </div>
                      </div>
                    )}
                    
                    <div className="space-y-4">
                      {[
                        { ...mockData.reports[0], premium: false },
                        { ...mockData.reports[1], premium: false },
                        { ...mockData.reports[2], premium: false },
                        { ...mockData.reports[3], premium: false },
                        { name: "Transcript (Official)", date: "2024-11-20", status: "Available", type: "Official", premium: true },
                        { name: "Recommendation Letter", date: "2024-11-18", status: "Pending", type: "Academic", premium: false },
                        { name: "Scholarship Report", date: "2024-11-16", status: "Available", type: "Financial", premium: false }
                      ].map((report, index) => (
                        <div key={index} className="group p-6 bg-secondary/20 rounded-xl hover:bg-secondary/30 transition-all duration-200 border border-transparent hover:border-slate-600/50">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4 flex-1">
                              <div className="w-12 h-12 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-xl flex items-center justify-center border border-blue-500/30">
                                <FileText className="h-6 w-6 text-blue-400" />
                              </div>
                              <div className="flex-1">
                                <div className="flex items-center gap-3 mb-2">
                                  <h4 className="font-semibold text-lg">{report.name}</h4>
                                  {report.premium && (
                                    <Badge className="bg-amber-500/20 text-amber-400 border-amber-500/50">
                                      <Star className="h-3 w-3 mr-1" />
                                      Premium
                                    </Badge>
                                  )}
                                </div>
                                <div className="flex items-center gap-4">
                                  <div className="flex items-center gap-2">
                                    <Clock className="h-4 w-4 text-muted-foreground" />
                                    <span className="text-sm text-muted-foreground">{report.date}</span>
                                  </div>
                                  <Badge 
                                    variant="outline" 
                                    className={`text-xs ${
                                      report.type === "Academic" ? "bg-blue-500/10 border-blue-500/30 text-blue-400" :
                                      report.type === "Official" ? "bg-purple-500/10 border-purple-500/30 text-purple-400" :
                                      report.type === "Financial" ? "bg-green-500/10 border-green-500/30 text-green-400" :
                                      "bg-amber-500/10 border-amber-500/30 text-amber-400"
                                    }`}
                                  >
                                    {report.type}
                                  </Badge>
                                  <Badge 
                                    className={`text-xs ${
                                      report.status === "Available" ? "bg-green-500/20 text-green-400 border-green-500/50" :
                                      report.status === "Pending" ? "bg-amber-500/20 text-amber-400 border-amber-500/50" :
                                      "bg-slate-500/20 text-slate-400 border-slate-500/50"
                                    }`}
                                  >
                                    {report.status}
                                  </Badge>
                                </div>
                              </div>
                            </div>
                            
                            <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                              <Button 
                                size="sm" 
                                variant="outline"
                                onClick={() => alert(`Previewing ${report.name}`)}
                                disabled={report.status !== "Available"}
                                className="border-slate-600 hover:bg-slate-700"
                              >
                                <Eye className="h-4 w-4 mr-1" />
                                Preview
                              </Button>
                              <Button 
                                size="sm" 
                                onClick={() => handleDownloadReport(report.name)}
                                disabled={report.status !== "Available"}
                                className="bg-gradient-primary hover:bg-gradient-primary-hover"
                              >
                                <Download className="h-4 w-4 mr-1" />
                                Download
                              </Button>
                            </div>
                          </div>
                          
                          {/* Additional Report Details */}
                          <div className="mt-4 pt-4 border-t border-slate-700/50 opacity-0 group-hover:opacity-100 transition-opacity">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                              <div>
                                <span className="text-muted-foreground">File Size:</span>
                                <p className="font-medium">2.4 MB</p>
                              </div>
                              <div>
                                <span className="text-muted-foreground">Generated:</span>
                                <p className="font-medium">{report.date}</p>
                              </div>
                              <div>
                                <span className="text-muted-foreground">Downloads:</span>
                                <p className="font-medium">{Math.floor(Math.random() * 10) + 1}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Right Sidebar - Tools & Analytics */}
              <div className="space-y-6">
                {/* Quick Actions */}
                <Card className="bg-gradient-to-br from-blue-500/5 to-purple-500/5 border-blue-500/20">
                  <CardHeader>
                    <CardTitle className="text-lg">Quick Actions</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Button className="w-full justify-start bg-blue-600 hover:bg-blue-700">
                      <FileText className="h-4 w-4 mr-2" />
                      Generate Transcript
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <Receipt className="h-4 w-4 mr-2" />
                      Fee Receipt
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <Award className="h-4 w-4 mr-2" />
                      Achievement Certificate
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <Download className="h-4 w-4 mr-2" />
                      Bulk Download
                    </Button>
                  </CardContent>
                </Card>

                {/* Report Analytics */}
                <Card className="bg-gradient-to-br from-green-500/5 to-blue-500/5 border-green-500/20">
                  <CardHeader>
                    <CardTitle className="text-lg">Report Analytics</CardTitle>
                    <CardDescription>Your document activity</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-3">
                      <div className="p-3 bg-slate-700/30 rounded-lg text-center">
                        <p className="text-xs text-muted-foreground">This Month</p>
                        <p className="text-lg font-bold text-blue-400">8</p>
                        <p className="text-xs text-muted-foreground">Downloads</p>
                      </div>
                      <div className="p-3 bg-slate-700/30 rounded-lg text-center">
                        <p className="text-xs text-muted-foreground">Last Access</p>
                        <p className="text-lg font-bold text-green-400">2h</p>
                        <p className="text-xs text-muted-foreground">ago</p>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Academic Reports</span>
                        <span className="font-medium">75%</span>
                      </div>
                      <Progress value={75} className="h-2" />
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Official Documents</span>
                        <span className="font-medium">60%</span>
                      </div>
                      <Progress value={60} className="h-2" />
                    </div>
                  </CardContent>
                </Card>

                {/* Frequently Accessed */}
                <Card className="bg-gradient-to-br from-purple-500/5 to-pink-500/5 border-purple-500/20">
                  <CardHeader>
                    <CardTitle className="text-lg">Recent Activity</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {[
                      { doc: "Mid-Term Report", action: "Downloaded", time: "2h ago" },
                      { doc: "Attendance Report", action: "Viewed", time: "1d ago" },
                      { doc: "Grade Report", action: "Shared", time: "2d ago" }
                    ].map((item, idx) => (
                      <div key={idx} className="flex items-center justify-between p-2 bg-slate-700/20 rounded-lg">
                        <div>
                          <p className="text-sm font-medium">{item.doc}</p>
                          <p className="text-xs text-muted-foreground">{item.action} • {item.time}</p>
                        </div>
                        <Button size="sm" variant="ghost">
                          <Eye className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                {/* Document Sharing */}
                <Card className="bg-gradient-to-br from-orange-500/5 to-red-500/5 border-orange-500/20">
                  <CardHeader>
                    <CardTitle className="text-lg">Share Reports</CardTitle>
                    <CardDescription>Send documents securely</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div>
                      <Label htmlFor="shareEmail">Email Address:</Label>
                      <Input id="shareEmail" placeholder="parent@email.com" className="mt-1" />
                    </div>
                    <div>
                      <Label htmlFor="shareReport">Select Report:</Label>
                      <select className="w-full p-2 bg-slate-700 rounded-lg border border-slate-600 mt-1">
                        <option>Mid-Term Report</option>
                        <option>Attendance Report</option>
                        <option>Grade Summary</option>
                      </select>
                    </div>
                    <Button className="w-full bg-orange-600 hover:bg-orange-700">
                      <Download className="h-4 w-4 mr-2" />
                      Share Securely
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        );

      case "counselling":
        return (
          <div className="space-y-6">
            {/* Redesigned Counseling Overview */}
            <div className="relative mb-8">
              {/* Main Dashboard Card */}
              <Card className="relative overflow-hidden bg-gradient-to-br from-slate-800/80 via-slate-900/90 to-black/95 border border-slate-700/50 shadow-2xl">
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-5">
                  <div className="absolute inset-0" style={{
                    backgroundImage: `radial-gradient(circle at 25% 25%, rgba(59, 130, 246, 0.3) 0%, transparent 50%), 
                                     radial-gradient(circle at 75% 75%, rgba(168, 85, 247, 0.3) 0%, transparent 50%)`
                  }}></div>
                </div>
                
                <CardContent className="relative p-8">
                  {/* Header Section */}
                  <div className="flex items-center justify-between mb-8">
                    <div>
                      <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                        Counseling Dashboard
                      </h2>
                      <p className="text-muted-foreground mt-2">Your personalized support and guidance hub</p>
                    </div>
                    <div className="hidden md:flex items-center gap-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
                        <MessageCircle className="h-6 w-6 text-white" />
                      </div>
                    </div>
                  </div>

                  {/* Interactive Stats Grid */}
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    {/* Sessions Booked */}
                    <div className="group relative">
                      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-blue-600/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                      <div className="relative p-6 bg-gradient-to-br from-blue-500/10 to-blue-600/5 rounded-2xl border border-blue-500/20 hover:border-blue-400/40 transition-all duration-300 hover:scale-105">
                        <div className="flex items-center justify-between mb-4">
                          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                            <MessageCircle className="h-6 w-6 text-white" />
                          </div>
                          <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                        </div>
                        <div className="space-y-1">
                          <p className="text-sm text-muted-foreground font-medium">Sessions Booked</p>
                          <p className="text-3xl font-bold text-blue-400">3</p>
                          <p className="text-xs text-green-400">+1 this month</p>
                        </div>
                      </div>
                    </div>

                    {/* Hours Completed */}
                    <div className="group relative">
                      <div className="absolute inset-0 bg-gradient-to-br from-green-500/20 to-green-600/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                      <div className="relative p-6 bg-gradient-to-br from-green-500/10 to-green-600/5 rounded-2xl border border-green-500/20 hover:border-green-400/40 transition-all duration-300 hover:scale-105">
                        <div className="flex items-center justify-between mb-4">
                          <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center shadow-lg">
                            <Clock className="h-6 w-6 text-white" />
                          </div>
                          <div className="flex items-center gap-1 px-2 py-1 bg-green-500/20 rounded-full">
                            <TrendingUp className="h-3 w-3 text-green-400" />
                          </div>
                        </div>
                        <div className="space-y-1">
                          <p className="text-sm text-muted-foreground font-medium">Hours Completed</p>
                          <p className="text-3xl font-bold text-green-400">12</p>
                          <p className="text-xs text-blue-400">4 hrs this month</p>
                        </div>
                      </div>
                    </div>

                    {/* Goals Set */}
                    <div className="group relative">
                      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-purple-600/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                      <div className="relative p-6 bg-gradient-to-br from-purple-500/10 to-purple-600/5 rounded-2xl border border-purple-500/20 hover:border-purple-400/40 transition-all duration-300 hover:scale-105">
                        <div className="flex items-center justify-between mb-4">
                          <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                            <Target className="h-6 w-6 text-white" />
                          </div>
                          <div className="flex items-center gap-1 px-2 py-1 bg-purple-500/20 rounded-full">
                            <Plus className="h-3 w-3 text-purple-400" />
                          </div>
                        </div>
                        <div className="space-y-1">
                          <p className="text-sm text-muted-foreground font-medium">Goals Set</p>
                          <p className="text-3xl font-bold text-purple-400">5</p>
                          <p className="text-xs text-purple-400">2 new goals</p>
                        </div>
                      </div>
                    </div>

                    {/* Goals Achieved */}
                    <div className="group relative">
                      <div className="absolute inset-0 bg-gradient-to-br from-amber-500/20 to-amber-600/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                      <div className="relative p-6 bg-gradient-to-br from-amber-500/10 to-amber-600/5 rounded-2xl border border-amber-500/20 hover:border-amber-400/40 transition-all duration-300 hover:scale-105">
                        <div className="flex items-center justify-between mb-4">
                          <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-amber-600 rounded-xl flex items-center justify-center shadow-lg">
                            <CheckCircle className="h-6 w-6 text-white" />
                          </div>
                          <div className="flex items-center gap-1 px-2 py-1 bg-amber-500/20 rounded-full">
                            <Trophy className="h-3 w-3 text-amber-400" />
                          </div>
                        </div>
                        <div className="space-y-1">
                          <p className="text-sm text-muted-foreground font-medium">Goals Achieved</p>
                          <p className="text-3xl font-bold text-amber-400">3</p>
                          <p className="text-xs text-green-400">60% success rate</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Progress Indicator */}
                  <div className="bg-gradient-to-r from-slate-800/50 to-slate-700/50 rounded-2xl p-6 border border-slate-600/30">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h3 className="text-lg font-semibold text-foreground">Goal Progress</h3>
                        <p className="text-sm text-muted-foreground">You're making excellent progress!</p>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-green-400">60%</p>
                        <p className="text-xs text-muted-foreground">Overall completion</p>
                      </div>
                    </div>
                    <div className="relative">
                      <Progress value={60} className="h-3 bg-slate-700" />
                      <div className="absolute top-0 left-0 w-full h-3 bg-gradient-to-r from-green-400/20 to-blue-400/20 rounded-full"></div>
                    </div>
                    <div className="flex justify-between text-xs text-muted-foreground mt-2">
                      <span>3 goals completed</span>
                      <span>2 goals in progress</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Main Counseling Section */}
              <div className="lg:col-span-2 space-y-6">
                {/* Counselor Cards - Enhanced */}
                <Card className="glow bg-gradient-to-br from-slate-800/50 to-slate-900/50 border-slate-700/50">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <MessageCircle className="h-5 w-5" />
                      Your Counseling Team
                    </CardTitle>
                    <CardDescription>Connect with your dedicated support specialists</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Academic Counselor - Enhanced */}
                      <div className="p-6 bg-gradient-to-br from-blue-500/10 to-blue-600/10 rounded-xl border border-blue-500/20 hover:border-blue-400/40 transition-all duration-300">
                        <div className="flex items-center gap-4 mb-4">
                          <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg">
                            <User className="h-8 w-8 text-white" />
                          </div>
                          <div>
                            <h4 className="font-semibold text-blue-400 text-lg">Dr. Sarah Johnson</h4>
                            <p className="text-sm text-muted-foreground">Academic Counselor</p>
                            <div className="flex items-center gap-2 mt-1">
                              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                              <span className="text-xs text-green-400">Available</span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="space-y-3 mb-4">
                          <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm">Mon-Fri, 10 AM - 4 PM</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Star className="h-4 w-4 text-amber-400" />
                            <span className="text-sm">4.9/5 rating • 15+ years exp</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Trophy className="h-4 w-4 text-purple-400" />
                            <span className="text-sm">Specializes in CS programs</span>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Button 
                            onClick={() => setScheduleType("academic")} 
                            className="w-full bg-blue-500 hover:bg-blue-600"
                          >
                            <MessageCircle className="h-4 w-4 mr-2" />
                            Schedule Meeting
                          </Button>
                          <div className="grid grid-cols-2 gap-2">
                            <Button variant="outline" size="sm" className="text-xs">
                              <MessageCircle className="h-3 w-3 mr-1" />
                              Quick Chat
                            </Button>
                            <Button variant="outline" size="sm" className="text-xs">
                              <FileText className="h-3 w-3 mr-1" />
                              View Notes
                            </Button>
                          </div>
                        </div>
                      </div>

                      {/* Career Counselor - Enhanced */}
                      <div className="p-6 bg-gradient-to-br from-green-500/10 to-green-600/10 rounded-xl border border-green-500/20 hover:border-green-400/40 transition-all duration-300">
                        <div className="flex items-center gap-4 mb-4">
                          <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center shadow-lg">
                            <User className="h-8 w-8 text-white" />
                          </div>
                          <div>
                            <h4 className="font-semibold text-green-400 text-lg">Prof. Michael Chen</h4>
                            <p className="text-sm text-muted-foreground">Career Counselor</p>
                            <div className="flex items-center gap-2 mt-1">
                              <div className="w-2 h-2 bg-amber-400 rounded-full"></div>
                              <span className="text-xs text-amber-400">Busy until 3 PM</span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="space-y-3 mb-4">
                          <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm">Tue-Thu, 2 PM - 6 PM</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Star className="h-4 w-4 text-amber-400" />
                            <span className="text-sm">4.8/5 rating • Industry expert</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Trophy className="h-4 w-4 text-purple-400" />
                            <span className="text-sm">Tech industry placement</span>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Button 
                            onClick={() => setScheduleType("career")} 
                            className="w-full bg-green-500 hover:bg-green-600"
                          >
                            <MessageCircle className="h-4 w-4 mr-2" />
                            Schedule Meeting
                          </Button>
                          <div className="grid grid-cols-2 gap-2">
                            <Button variant="outline" size="sm" className="text-xs">
                              <FileText className="h-3 w-3 mr-1" />
                              Career Plan
                            </Button>
                            <Button variant="outline" size="sm" className="text-xs">
                              <Target className="h-3 w-3 mr-1" />
                              Job Match
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Appointment History & Upcoming */}
                <Card className="bg-gradient-to-br from-purple-500/5 to-pink-500/5 border-purple-500/20">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Calendar className="h-5 w-5" />
                      Your Sessions
                    </CardTitle>
                    <CardDescription>Upcoming and recent counseling sessions</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {/* Upcoming Sessions */}
                      <div>
                        <h4 className="font-medium mb-3 text-green-400">Upcoming Sessions</h4>
                        <div className="space-y-3">
                          <div className="p-4 bg-green-500/10 rounded-lg border border-green-500/20">
                            <div className="flex items-center justify-between">
                              <div>
                                <p className="font-medium">Career Planning Discussion</p>
                                <p className="text-sm text-muted-foreground">with Prof. Michael Chen</p>
                                <div className="flex items-center gap-4 mt-2">
                                  <div className="flex items-center gap-1">
                                    <Calendar className="h-4 w-4 text-muted-foreground" />
                                    <span className="text-sm">Tomorrow, 3:00 PM</span>
                                  </div>
                                  <div className="flex items-center gap-1">
                                    <Clock className="h-4 w-4 text-muted-foreground" />
                                    <span className="text-sm">60 minutes</span>
                                  </div>
                                </div>
                              </div>
                              <div className="flex gap-2">
                                <Button size="sm" variant="outline">Reschedule</Button>
                                <Button size="sm" className="bg-green-600 hover:bg-green-700">Join</Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Recent Sessions */}
                      <div>
                        <h4 className="font-medium mb-3 text-blue-400">Recent Sessions</h4>
                        <div className="space-y-3">
                          {[
                            { title: "Academic Goal Setting", counselor: "Dr. Sarah Johnson", date: "Nov 10, 2024", rating: 5 },
                            { title: "Resume Review", counselor: "Prof. Michael Chen", date: "Oct 28, 2024", rating: 5 },
                            { title: "Study Strategies", counselor: "Dr. Sarah Johnson", date: "Oct 15, 2024", rating: 4 }
                          ].map((session, idx) => (
                            <div key={idx} className="p-4 bg-slate-700/20 rounded-lg">
                              <div className="flex items-center justify-between">
                                <div>
                                  <p className="font-medium">{session.title}</p>
                                  <p className="text-sm text-muted-foreground">with {session.counselor}</p>
                                  <p className="text-xs text-muted-foreground mt-1">{session.date}</p>
                                </div>
                                <div className="text-right">
                                  <div className="flex items-center gap-1 mb-2">
                                    {[...Array(5)].map((_, i) => (
                                      <Star 
                                        key={i} 
                                        className={`h-3 w-3 ${i < session.rating ? 'text-amber-400 fill-current' : 'text-slate-500'}`} 
                                      />
                                    ))}
                                  </div>
                                  <Button size="sm" variant="outline" className="text-xs">
                                    View Notes
                                  </Button>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Emergency Support */}
                <Card className="bg-gradient-to-br from-red-500/5 to-orange-500/5 border-red-500/20">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <AlertCircle className="h-5 w-5" />
                      Emergency & Crisis Support
                    </CardTitle>
                    <CardDescription>24/7 support for urgent matters</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="p-4 bg-red-500/10 rounded-lg border border-red-500/20">
                        <h4 className="font-semibold text-red-400 mb-2">Academic Emergency</h4>
                        <p className="text-sm text-muted-foreground mb-3">Urgent academic issues, deadline extensions</p>
                        <Button variant="outline" className="w-full border-red-500 text-red-400 hover:bg-red-500/10">
                          <AlertCircle className="h-4 w-4 mr-2" />
                          Contact Dean's Office
                        </Button>
                      </div>
                      <div className="p-4 bg-orange-500/10 rounded-lg border border-orange-500/20">
                        <h4 className="font-semibold text-orange-400 mb-2">Mental Health Support</h4>
                        <p className="text-sm text-muted-foreground mb-3">24/7 counseling and crisis intervention</p>
                        <Button variant="outline" className="w-full border-orange-500 text-orange-400 hover:bg-orange-500/10">
                          <MessageCircle className="h-4 w-4 mr-2" />
                          Crisis Helpline
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Right Sidebar - Resources & Tools */}
              <div className="space-y-6">
                {/* Quick Resources */}
                <Card className="bg-gradient-to-br from-indigo-500/5 to-blue-500/5 border-indigo-500/20">
                  <CardHeader>
                    <CardTitle className="text-lg">Self-Help Resources</CardTitle>
                    <CardDescription>Tools for personal development</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Button variant="outline" className="w-full justify-start">
                      <BookOpen className="h-4 w-4 mr-2" />
                      Study Skills Guide
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <Target className="h-4 w-4 mr-2" />
                      Goal Setting Toolkit
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <FileText className="h-4 w-4 mr-2" />
                      Career Assessment
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Stress Management
                    </Button>
                  </CardContent>
                </Card>

                {/* Goal Tracking */}
                <Card className="bg-gradient-to-br from-purple-500/5 to-pink-500/5 border-purple-500/20">
                  <CardHeader>
                    <CardTitle className="text-lg">Current Goals</CardTitle>
                    <CardDescription>Track your progress</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {[
                      { goal: "Improve CGPA to 9.0", progress: 75, status: "On track" },
                      { goal: "Complete internship", progress: 40, status: "In progress" },
                      { goal: "Build portfolio", progress: 90, status: "Almost done" }
                    ].map((item, idx) => (
                      <div key={idx} className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="font-medium">{item.goal}</span>
                          <span className="text-muted-foreground">{item.progress}%</span>
                        </div>
                        <Progress value={item.progress} className="h-2" />
                        <p className="text-xs text-muted-foreground">{item.status}</p>
                      </div>
                    ))}
                    <Button variant="outline" className="w-full mt-4">
                      <Plus className="h-4 w-4 mr-2" />
                      Add New Goal
                    </Button>
                  </CardContent>
                </Card>

                {/* Peer Support */}
                <Card className="bg-gradient-to-br from-green-500/5 to-teal-500/5 border-green-500/20">
                  <CardHeader>
                    <CardTitle className="text-lg">Peer Support</CardTitle>
                    <CardDescription>Connect with fellow students</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="p-3 bg-green-500/10 rounded-lg border border-green-500/20">
                      <p className="text-sm font-medium text-green-400">Study Groups</p>
                      <p className="text-xs text-muted-foreground">3 active groups in your subjects</p>
                    </div>
                    <div className="p-3 bg-blue-500/10 rounded-lg border border-blue-500/20">
                      <p className="text-sm font-medium text-blue-400">Peer Mentoring</p>
                      <p className="text-xs text-muted-foreground">Connect with senior students</p>
                    </div>
                    <Button variant="outline" className="w-full">
                      <MessageCircle className="h-4 w-4 mr-2" />
                      Join Discussion
                    </Button>
                  </CardContent>
                </Card>

                {/* Feedback & Ratings */}
                <Card className="bg-gradient-to-br from-amber-500/5 to-orange-500/5 border-amber-500/20">
                  <CardHeader>
                    <CardTitle className="text-lg">Session Feedback</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="text-center">
                      <p className="text-sm text-muted-foreground">Your average rating</p>
                      <div className="flex items-center justify-center gap-1 my-2">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="h-4 w-4 text-amber-400 fill-current" />
                        ))}
                      </div>
                      <p className="text-lg font-bold text-amber-400">4.9/5</p>
                    </div>
                    <Button variant="outline" className="w-full">
                      <Star className="h-4 w-4 mr-2" />
                      Rate Last Session
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        );

      case "finance":
        return (
          <div className="space-y-6">
            {/* Enhanced Finance Header */}
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 mb-6">
              <Card className="bg-gradient-to-br from-purple-500/10 to-purple-600/10 border-purple-500/20">
                <CardContent className="p-4 text-center">
                  <DollarSign className="h-8 w-8 mx-auto mb-2 text-purple-400" />
                  <p className="text-sm text-muted-foreground">Total Fees</p>
                  <p className="text-xl font-bold text-purple-400">₹{mockData.finance.totalDue.toLocaleString()}</p>
                </CardContent>
              </Card>
              <Card className="bg-gradient-to-br from-green-500/10 to-green-600/10 border-green-500/20">
                <CardContent className="p-4 text-center">
                  <CheckCircle className="h-8 w-8 mx-auto mb-2 text-green-400" />
                  <p className="text-sm text-muted-foreground">Paid</p>
                  <p className="text-xl font-bold text-green-400">₹{mockData.finance.paid.toLocaleString()}</p>
                </CardContent>
              </Card>
              <Card className="bg-gradient-to-br from-orange-500/10 to-orange-600/10 border-orange-500/20">
                <CardContent className="p-4 text-center">
                  <Clock className="h-8 w-8 mx-auto mb-2 text-orange-400" />
                  <p className="text-sm text-muted-foreground">Pending</p>
                  <p className="text-xl font-bold text-orange-400">₹{mockData.finance.pending.toLocaleString()}</p>
                </CardContent>
              </Card>
              <Card className="bg-gradient-to-br from-blue-500/10 to-blue-600/10 border-blue-500/20">
                <CardContent className="p-4 text-center">
                  <Calendar className="h-8 w-8 mx-auto mb-2 text-blue-400" />
                  <p className="text-sm text-muted-foreground">Next Due</p>
                  <p className="text-sm font-bold text-blue-400">{mockData.finance.nextDueDate}</p>
                </CardContent>
              </Card>
              <Card className="bg-gradient-to-br from-amber-500/10 to-amber-600/10 border-amber-500/20">
                <CardContent className="p-4 text-center">
                  <Award className="h-8 w-8 mx-auto mb-2 text-amber-400" />
                  <p className="text-sm text-muted-foreground">Scholarships</p>
                  <p className="text-xl font-bold text-amber-400">₹25,000</p>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Main Finance Section */}
              <div className="lg:col-span-2 space-y-6">
                {/* Enhanced Fee Status */}
                <Card className="glow bg-gradient-to-br from-slate-800/50 to-slate-900/50 border-slate-700/50">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="flex items-center gap-2">
                          <DollarSign className="h-5 w-5" />
                          Fee Management
                        </CardTitle>
                        <CardDescription>Current semester payment details and planning</CardDescription>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-muted-foreground">Payment Status</p>
                        <Badge className="bg-green-500/20 text-green-400 border-green-500/50">
                          Current
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Payment Progress with Enhanced Visualization */}
                    <div className="p-6 bg-gradient-to-br from-blue-500/5 to-purple-500/5 rounded-xl border border-blue-500/20">
                      <div className="flex items-center justify-between mb-4">
                        <h4 className="font-semibold">Payment Progress</h4>
                        <span className="text-lg font-bold text-blue-400">{overallDuePercent}%</span>
                      </div>
                      <Progress value={overallDuePercent} className="h-4 mb-4" />
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="text-center p-3 bg-green-500/10 rounded-lg border border-green-500/20">
                          <p className="text-xs text-green-400 font-medium">Completed</p>
                          <p className="text-lg font-bold text-green-400">₹{mockData.finance.paid.toLocaleString()}</p>
                        </div>
                        <div className="text-center p-3 bg-orange-500/10 rounded-lg border border-orange-500/20">
                          <p className="text-xs text-orange-400 font-medium">Remaining</p>
                          <p className="text-lg font-bold text-orange-400">₹{mockData.finance.pending.toLocaleString()}</p>
                        </div>
                        <div className="text-center p-3 bg-blue-500/10 rounded-lg border border-blue-500/20">
                          <p className="text-xs text-blue-400 font-medium">Days Until Due</p>
                          <p className="text-lg font-bold text-blue-400">23</p>
                        </div>
                      </div>
                    </div>

                    {/* Enhanced Payment Actions */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <Button 
                        onClick={() => {
                          const receipt = `PAYMENT RECEIPT\n\nStudent: ${profileData.name}\nID: ${profileData.studentId}\nAmount: ₹${mockData.finance.pending.toLocaleString()}\nDate: ${new Date().toLocaleDateString()}\nStatus: Processing\n\nThis is a demo payment.`;
                          const blob = new Blob([receipt], { type: "text/plain;charset=utf-8" });
                          const url = URL.createObjectURL(blob);
                          const a = document.createElement("a");
                          a.href = url;
                          a.download = "payment_confirmation.txt";
                          a.click();
                          URL.revokeObjectURL(url);
                        }}
                        className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white h-12"
                      >
                        <CreditCard className="h-4 w-4 mr-2" />
                        Pay Now
                      </Button>
                      <Button variant="outline" className="h-12">
                        <Calendar className="h-4 w-4 mr-2" />
                        Schedule Payment
                      </Button>
                      <Button 
                        variant="outline"
                        className="h-12"
                        onClick={() => {
                          const receipt = `FEE RECEIPT\n\nStudent: ${profileData.name}\nID: ${profileData.studentId}\nPaid: ₹${mockData.finance.paid.toLocaleString()}\nPending: ₹${mockData.finance.pending.toLocaleString()}\nGenerated: ${new Date().toLocaleString()}\n\nThis is a demo receipt.`;
                          const blob = new Blob([receipt], { type: "text/plain;charset=utf-8" });
                          const url = URL.createObjectURL(blob);
                          const a = document.createElement("a");
                          a.href = url;
                          a.download = "fee_receipt.txt";
                          a.click();
                          URL.revokeObjectURL(url);
                        }}
                      >
                        <Receipt className="h-4 w-4 mr-2" />
                        Download Receipt
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                {/* Payment History with Analytics */}
                <Card className="bg-gradient-to-br from-blue-500/5 to-purple-500/5 border-blue-500/20">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Clock className="h-5 w-5" />
                      Payment History & Analytics
                    </CardTitle>
                    <CardDescription>Track your payment timeline and patterns</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {mockData.finance.history.map((payment, idx) => (
                        <div key={idx} className="p-4 bg-slate-700/20 rounded-xl border hover:bg-slate-700/30 transition-colors">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                              <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                                payment.status === 'Completed' ? 'bg-green-500/20 border border-green-500/50' : 'bg-orange-500/20 border border-orange-500/50'
                              }`}>
                                {payment.status === 'Completed' ? 
                                  <CheckCircle className="h-6 w-6 text-green-400" /> : 
                                  <Clock className="h-6 w-6 text-orange-400" />
                                }
                              </div>
                              <div>
                                <p className="font-semibold text-lg">₹{payment.amount.toLocaleString()}</p>
                                <p className="text-sm text-muted-foreground">{payment.date}</p>
                                <p className="text-xs text-muted-foreground">
                                  {payment.status === 'Completed' ? 'Payment successful' : 'Payment pending'}
                                </p>
                              </div>
                            </div>
                            <div className="text-right">
                              <Badge 
                                className={`${payment.status === 'Completed' ? 
                                  'bg-green-500/20 text-green-400 border-green-500/50' : 
                                  'bg-orange-500/20 text-orange-400 border-orange-500/50'
                                }`}
                              >
                                {payment.status}
                              </Badge>
                              <div className="mt-2">
                                <Button size="sm" variant="outline" className="text-xs">
                                  View Details
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Financial Planning Tools */}
                <Card className="bg-gradient-to-br from-green-500/5 to-teal-500/5 border-green-500/20">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Target className="h-5 w-5" />
                      Financial Planning & Insights
                    </CardTitle>
                    <CardDescription>Smart recommendations for your financial journey</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Savings Tracker */}
                      <div className="p-4 bg-green-500/10 rounded-lg border border-green-500/20">
                        <h4 className="font-semibold text-green-400 mb-3">Monthly Savings Goal</h4>
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>Target: ₹5,000</span>
                            <span>Saved: ₹3,200</span>
                          </div>
                          <Progress value={64} className="h-2" />
                          <p className="text-xs text-muted-foreground">64% towards goal • ₹1,800 to go</p>
                        </div>
                      </div>

                      {/* Payment Forecast */}
                      <div className="p-4 bg-blue-500/10 rounded-lg border border-blue-500/20">
                        <h4 className="font-semibold text-blue-400 mb-3">Next Semester Forecast</h4>
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>Estimated Fees:</span>
                            <span className="font-medium">₹65,000</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span>Scholarship Credit:</span>
                            <span className="font-medium text-green-400">-₹25,000</span>
                          </div>
                          <div className="flex justify-between text-sm border-t border-slate-600 pt-2">
                            <span className="font-medium">Net Amount:</span>
                            <span className="font-bold text-blue-400">₹40,000</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Right Sidebar - Financial Tools & Insights */}
              <div className="space-y-6">
                {/* Payment Reminder */}
                <Card className="bg-gradient-to-br from-red-500/5 to-orange-500/5 border-red-500/20">
                  <CardHeader>
                    <CardTitle className="text-lg">Payment Reminder</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="p-3 bg-orange-500/10 rounded-lg border border-orange-500/20">
                      <div className="flex items-center gap-2 mb-2">
                        <AlertCircle className="h-4 w-4 text-orange-400" />
                        <span className="text-sm font-medium text-orange-400">Due Soon</span>
                      </div>
                      <p className="text-lg font-bold">₹{mockData.finance.pending.toLocaleString()}</p>
                      <p className="text-xs text-muted-foreground">Due in 23 days</p>
                    </div>
                    <Button className="w-full bg-orange-600 hover:bg-orange-700">
                      <Bell className="h-4 w-4 mr-2" />
                      Set Reminder
                    </Button>
                  </CardContent>
                </Card>

                {/* Scholarship Information */}
                <Card className="bg-gradient-to-br from-amber-500/5 to-yellow-500/5 border-amber-500/20">
                  <CardHeader>
                    <CardTitle className="text-lg">Scholarships & Aid</CardTitle>
                    <CardDescription>Financial assistance opportunities</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="p-3 bg-amber-500/10 rounded-lg border border-amber-500/20">
                      <p className="text-sm font-medium text-amber-400">Active Scholarship</p>
                      <p className="text-lg font-bold">Merit Scholarship</p>
                      <p className="text-xs text-muted-foreground">₹25,000 per semester</p>
                    </div>
                    
                    <div className="space-y-2">
                      <h4 className="text-sm font-medium">Available Opportunities</h4>
                      <div className="space-y-2">
                        <div className="p-2 bg-slate-700/20 rounded-lg">
                          <p className="text-sm font-medium">Sports Excellence</p>
                          <p className="text-xs text-muted-foreground">Up to ₹15,000</p>
                        </div>
                        <div className="p-2 bg-slate-700/20 rounded-lg">
                          <p className="text-sm font-medium">Research Grant</p>
                          <p className="text-xs text-muted-foreground">Up to ₹10,000</p>
                        </div>
                      </div>
                    </div>
                    
                    <Button variant="outline" className="w-full">
                      <Award className="h-4 w-4 mr-2" />
                      Explore More
                    </Button>
                  </CardContent>
                </Card>

                {/* Budget Tracker */}
                <Card className="bg-gradient-to-br from-green-500/5 to-emerald-500/5 border-green-500/20">
                  <CardHeader>
                    <CardTitle className="text-lg">Monthly Budget</CardTitle>
                    <CardDescription>Track your expenses</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Fees & Education</span>
                        <span className="text-sm font-medium">60%</span>
                      </div>
                      <Progress value={60} className="h-2" />
                      
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Accommodation</span>
                        <span className="text-sm font-medium">25%</span>
                      </div>
                      <Progress value={25} className="h-2" />
                      
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Personal</span>
                        <span className="text-sm font-medium">15%</span>
                      </div>
                      <Progress value={15} className="h-2" />
                    </div>
                    
                    <Button variant="outline" className="w-full">
                      <TrendingUp className="h-4 w-4 mr-2" />
                      View Detailed Budget
                    </Button>
                  </CardContent>
                </Card>

                {/* Payment Methods */}
                <Card className="bg-gradient-to-br from-purple-500/5 to-indigo-500/5 border-purple-500/20">
                  <CardHeader>
                    <CardTitle className="text-lg">Payment Methods</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="p-3 bg-slate-700/20 rounded-lg">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <CreditCard className="h-4 w-4 text-blue-400" />
                          <span className="text-sm">Bank Transfer</span>
                        </div>
                        <Badge variant="outline" className="text-xs">Primary</Badge>
                      </div>
                    </div>
                    
                    <div className="p-3 bg-slate-700/20 rounded-lg">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <DollarSign className="h-4 w-4 text-green-400" />
                          <span className="text-sm">UPI Payment</span>
                        </div>
                        <Badge variant="outline" className="text-xs">Available</Badge>
                      </div>
                    </div>
                    
                    <Button variant="outline" className="w-full">
                      <Plus className="h-4 w-4 mr-2" />
                      Add Payment Method
                    </Button>
                  </CardContent>
                </Card>

                {/* Financial Tips */}
                <Card className="bg-gradient-to-br from-blue-500/5 to-cyan-500/5 border-blue-500/20">
                  <CardHeader>
                    <CardTitle className="text-lg">Smart Tips</CardTitle>
                    <CardDescription>Financial wisdom for students</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="p-3 bg-blue-500/10 rounded-lg border border-blue-500/20">
                      <p className="text-sm font-medium text-blue-400">💡 Pro Tip</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        Pay fees early to avoid late charges and earn early payment discounts.
                      </p>
                    </div>
                    <div className="p-3 bg-green-500/10 rounded-lg border border-green-500/20">
                      <p className="text-sm font-medium text-green-400">💰 Save More</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        Check for scholarship opportunities every semester.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        );

      default:
        return <div>Page not found</div>;
    }
  };

  return (
    <>
      <DashboardLayout
        userData={userData}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        onLogout={onLogout}
        navigation={navigation}
        title="Student Portal"
      >
        {renderContent()}
      </DashboardLayout>
      {/* Edit Profile Dialog */}
      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Profile</DialogTitle>
            <DialogDescription>Update your contact details. These changes are local for demo.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" value={profileData.name} onChange={(e) => setProfileData({ ...profileData, name: e.target.value })} />
              </div>
              <div>
                <Label htmlFor="phone">Phone</Label>
                <Input id="phone" value={profileData.phone} onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })} />
              </div>
            </div>
            <div>
              <Label htmlFor="address">Address</Label>
              <Input id="address" value={profileData.address} onChange={(e) => setProfileData({ ...profileData, address: e.target.value })} />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditOpen(false)}>Cancel</Button>
            <Button className="bg-gradient-primary hover:bg-gradient-primary-hover" onClick={() => setIsEditOpen(false)}>Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Schedule Dialog */}
      <Dialog open={!!scheduleType} onOpenChange={(open) => !open && setScheduleType(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Schedule {scheduleType === 'career' ? 'Career' : 'Academic'} Counseling</DialogTitle>
            <DialogDescription>Select a date and time for your session.</DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="date">Date</Label>
              <Input id="date" type="date" value={scheduleDate} onChange={(e) => setScheduleDate(e.target.value)} />
            </div>
            <div>
              <Label htmlFor="time">Time</Label>
              <Input id="time" type="time" value={scheduleTime} onChange={(e) => setScheduleTime(e.target.value)} />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setScheduleType(null)}>Cancel</Button>
            <Button
              disabled={!scheduleDate || !scheduleTime}
              className="bg-gradient-primary hover:bg-gradient-primary-hover"
              onClick={() => {
                alert(`Session booked on ${scheduleDate} at ${scheduleTime}`);
                setScheduleType(null);
                setScheduleDate("");
                setScheduleTime("");
              }}
            >
              Confirm Booking
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Achievements Dialog */}
      <Dialog open={showAchievements} onOpenChange={setShowAchievements}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Trophy className="h-5 w-5 text-amber-500" />
              Your Achievements
            </DialogTitle>
            <DialogDescription>Recognition for your academic excellence and participation</DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {mockData.achievements.map((achievement, index) => (
              <div key={index} className="p-4 bg-gradient-to-br from-amber-500/10 to-orange-500/10 rounded-lg border border-amber-500/20">
                <div className="flex items-center gap-3 mb-2">
                  {achievement.icon === "trophy" && <Trophy className="h-6 w-6 text-amber-500" />}
                  {achievement.icon === "award" && <Award className="h-6 w-6 text-blue-500" />}
                  {achievement.icon === "star" && <Star className="h-6 w-6 text-purple-500" />}
                  <h4 className="font-semibold">{achievement.title}</h4>
                </div>
                <p className="text-sm text-muted-foreground">
                  {achievement.semester && `Achieved in ${achievement.semester}`}
                  {achievement.month && `Earned in ${achievement.month}`}
                  {achievement.subject && `Outstanding performance in ${achievement.subject}`}
                </p>
              </div>
            ))}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAchievements(false)}>Close</Button>
            <Button 
              className="bg-gradient-primary hover:bg-gradient-primary-hover"
              onClick={() => {
                const achievementDoc = `ACADEMIC ACHIEVEMENTS\n\nStudent: ${profileData.name}\nID: ${profileData.studentId}\n\n${mockData.achievements.map(a => `• ${a.title}`).join('\n')}\n\nGenerated: ${new Date().toLocaleString()}\n\nThis is a demo achievements certificate.`;
                const blob = new Blob([achievementDoc], { type: "text/plain;charset=utf-8" });
                const url = URL.createObjectURL(blob);
                const a = document.createElement("a");
                a.href = url;
                a.download = "achievements_certificate.txt";
                a.click();
                URL.revokeObjectURL(url);
                setShowAchievements(false);
              }}
            >
              <Download className="h-4 w-4 mr-2" />
              Download Certificate
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      <Chatbot userRole="student" userData={userData} />
    </>
  );
}