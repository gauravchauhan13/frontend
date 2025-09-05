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
            {/* Modern Hero Section */}
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
                        <p className="text-muted-foreground">Here's your academic overview for today</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-6">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                        <span className="text-sm text-green-400 font-medium">Active Semester</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Trophy className="h-4 w-4 text-amber-400" />
                        <span className="text-sm text-amber-400 font-medium">Top Performer</span>
                      </div>
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
                    <div className="text-right">
                      <p className="text-xs text-muted-foreground">Current CGPA</p>
                      <p className="text-2xl font-bold text-blue-400">{profileData.cgpa}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>            {/* Modern Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* CGPA Card */}
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
                      <p className="text-xs text-green-400">Above average performance</p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Attendance Card */}
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
                      {notifications && (
                        <div className="w-3 h-3 bg-red-400 rounded-full animate-pulse"></div>
                      )}
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground font-medium">Attendance</p>
                      <p className="text-3xl font-bold text-green-400 mb-1">{mockData.attendance.overall}%</p>
                      <p className="text-xs text-blue-400">Target: 75% ✓</p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Semester Card */}
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
                      <div className="flex items-center gap-1 px-2 py-1 bg-amber-500/20 rounded-full">
                        <GraduationCap className="h-3 w-3 text-amber-400" />
                        <span className="text-xs text-amber-400 font-medium">Final</span>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground font-medium">Current Semester</p>
                      <p className="text-2xl font-bold text-purple-400 mb-1">{profileData.semester}</p>
                      <p className="text-xs text-amber-400">Final year student</p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Subjects Card */}
              <div 
                className="group relative cursor-pointer"
                onClick={() => setActiveTab("reports")}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-orange-500/20 to-orange-600/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                <Card className="relative bg-gradient-to-br from-orange-500/5 to-orange-600/5 border-orange-500/20 hover:border-orange-400/40 transition-all duration-300 transform group-hover:scale-105 backdrop-blur-sm">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center shadow-lg">
                        <FileText className="h-6 w-6 text-white" />
                      </div>
                      <div className="flex items-center gap-1 px-2 py-1 bg-green-500/20 rounded-full">
                        <CheckCircle className="h-3 w-3 text-green-400" />
                        <span className="text-xs text-green-400 font-medium">All</span>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground font-medium">Active Subjects</p>
                      <p className="text-3xl font-bold text-orange-400 mb-1">{mockData.attendance.subjects.length}</p>
                      <p className="text-xs text-green-400">All enrolled</p>
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
            <Card className="glow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Student Profile
                </CardTitle>
                <CardDescription>Your academic and personal information</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">Full Name</label>
                      <p className="text-lg font-medium">{profileData.name}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">Student ID</label>
                      <p className="text-lg font-medium">{profileData.studentId}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">Email</label>
                      <p className="text-lg font-medium">{profileData.email}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">Phone</label>
                      <p className="text-lg font-medium">{profileData.phone}</p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">Program</label>
                      <p className="text-lg font-medium">{profileData.program}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">Current Semester</label>
                      <p className="text-lg font-medium">{profileData.semester}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">Academic Year</label>
                      <p className="text-lg font-medium">{profileData.year}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">Enrollment Date</label>
                      <p className="text-lg font-medium">{profileData.enrollmentDate}</p>
                    </div>
                  </div>
                </div>
                <div className="pt-4">
                  <Button onClick={() => setIsEditOpen(true)} className="bg-gradient-primary hover:bg-gradient-primary-hover">
                    Edit Profile
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case "attendance":
        return (
          <div className="space-y-6">
            <Card className="glow">
              <CardHeader>
                <CardTitle>Attendance Overview</CardTitle>
                <CardDescription>Your attendance across all subjects this semester</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="text-center p-6 bg-gradient-to-br from-green-500/10 to-green-600/10 rounded-lg border border-green-500/20">
                  <p className="text-sm text-muted-foreground mb-2">Overall Attendance</p>
                  <p className="text-4xl font-bold text-green-400">{mockData.attendance.overall}%</p>
                </div>
                
                <div className="space-y-4">
                  {mockData.attendance.subjects.map((subject, index) => (
                    <div key={index} className="p-4 bg-secondary/20 rounded-lg space-y-3">
                      <div className="flex justify-between items-center">
                        <h4 className="font-medium">{subject.name}</h4>
                        <Badge 
                          variant={subject.status === "Good" ? "default" : "destructive"}
                          className={subject.status === "Good" ? "bg-green-500/20 text-green-400 border-green-500/50" : ""}
                        >
                          {subject.attendance}%
                        </Badge>
                      </div>
                      <Progress value={subject.attendance} className="h-3" />
                      <div className="flex justify-between text-sm text-muted-foreground">
                        <span>{subject.attended} classes attended</span>
                        <span>{subject.classes} total classes</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case "grades":
        return (
          <div className="space-y-6">
            <Card className="glow">
              <CardHeader>
                <CardTitle>Current Semester Grades</CardTitle>
                <CardDescription>Your performance in current subjects</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockData.grades.currentSemester.map((subject, index) => (
                    <div key={index} className="p-4 bg-secondary/20 rounded-lg">
                      <div className="flex justify-between items-center mb-3">
                        <h4 className="font-medium">{subject.subject}</h4>
                        <Badge className="bg-gradient-primary text-primary-foreground">
                          {subject.total}%
                        </Badge>
                      </div>
                      <div className="grid grid-cols-3 gap-4 text-sm">
                        <div>
                          <span className="text-muted-foreground">Midterm:</span>
                          <p className="font-medium">{subject.midterm}%</p>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Assignments:</span>
                          <p className="font-medium">{subject.assignments}%</p>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Project:</span>
                          <p className="font-medium">{subject.project}%</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Semester History Card */}
            <Card className="bg-gradient-to-br from-slate-800/30 to-slate-900/30 border-slate-700/50 backdrop-blur-sm">
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
            <Card className="glow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Academic Reports
                </CardTitle>
                <CardDescription>Download and view your academic reports</CardDescription>
              </CardHeader>
              <CardContent>
                {downloadMessage && (
                  <div className="mb-4 p-2 text-xs rounded border border-border/50 bg-secondary/20">
                    {downloadMessage}
                  </div>
                )}
                <div className="space-y-4">
                  {mockData.reports.map((report, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-secondary/20 rounded-lg">
                      <div className="flex-1">
                        <div className="flex items-center gap-3">
                          <FileText className="h-5 w-5 text-muted-foreground" />
                          <div>
                            <p className="font-medium">{report.name}</p>
                            <div className="flex items-center gap-2">
                              <p className="text-sm text-muted-foreground">{report.date}</p>
                              <Badge variant="outline" className="text-xs">
                                {report.type}
                              </Badge>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Badge variant="secondary" className="bg-green-500/20 text-green-400 border-green-500/50">
                          {report.status}
                        </Badge>
                        <Button 
                          size="sm" 
                          onClick={() => handleDownloadReport(report.name)} 
                          className="bg-gradient-primary hover:bg-gradient-primary-hover"
                        >
                          <Download className="h-4 w-4 mr-1" />
                          Download
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => alert(`Viewing ${report.name} - This would open a preview in a real app`)}
                        >
                          <Eye className="h-4 w-4 mr-1" />
                          Preview
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case "counselling":
        return (
          <div className="space-y-6">
            <Card className="glow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageCircle className="h-5 w-5" />
                  Counselling & Support
                </CardTitle>
                <CardDescription>Connect with your academic and career counselors</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="p-6 bg-gradient-to-br from-blue-500/10 to-blue-600/10 rounded-lg border border-blue-500/20">
                    <h4 className="font-semibold text-blue-400 mb-3">Academic Counselor</h4>
                    <div className="space-y-2 text-sm">
                      <p><strong>Dr. Sarah Johnson</strong></p>
                      <p>Computer Science Department</p>
                      <p>s.johnson@upes.ac.in</p>
                      <p>Office Hours: Mon-Fri, 10 AM - 4 PM</p>
                    </div>
                    <Button onClick={() => setScheduleType("academic")} className="mt-4 bg-blue-500 hover:bg-blue-600">
                      <MessageCircle className="h-4 w-4 mr-2" />
                      Schedule Meeting
                    </Button>
                  </div>

                  <div className="p-6 bg-gradient-to-br from-green-500/10 to-green-600/10 rounded-lg border border-green-500/20">
                    <h4 className="font-semibold text-green-400 mb-3">Career Counselor</h4>
                    <div className="space-y-2 text-sm">
                      <p><strong>Prof. Michael Chen</strong></p>
                      <p>Career Services Department</p>
                      <p>m.chen@upes.ac.in</p>
                      <p>Office Hours: Tue-Thu, 2 PM - 6 PM</p>
                    </div>
                    <Button onClick={() => setScheduleType("career")} className="mt-4 bg-green-500 hover:bg-green-600">
                      <MessageCircle className="h-4 w-4 mr-2" />
                      Schedule Meeting
                    </Button>
                  </div>
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Emergency Support</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">
                      For urgent academic or personal matters, contact the Dean's office immediately.
                    </p>
                    <Button variant="outline" className="border-red-500 text-red-400 hover:bg-red-500/10">
                      <AlertCircle className="h-4 w-4 mr-2" />
                      Emergency Contact
                    </Button>
                  </CardContent>
                </Card>
              </CardContent>
            </Card>
          </div>
        );

      case "finance":
        return (
          <div className="space-y-6">
            <Card className="glow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="h-5 w-5" />
                  Fee Status
                </CardTitle>
                <CardDescription>Your current term's payment details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="p-4 rounded-lg bg-gradient-to-br from-purple-500/10 to-purple-600/10 border border-purple-500/20">
                    <p className="text-sm text-muted-foreground">Total Due</p>
                    <p className="text-2xl font-semibold text-purple-400">₹{mockData.finance.totalDue.toLocaleString()}</p>
                  </div>
                  <div className="p-4 rounded-lg bg-gradient-to-br from-green-500/10 to-green-600/10 border border-green-500/20">
                    <p className="text-sm text-muted-foreground">Paid</p>
                    <p className="text-2xl font-semibold text-green-400">₹{mockData.finance.paid.toLocaleString()}</p>
                  </div>
                  <div className="p-4 rounded-lg bg-gradient-to-br from-orange-500/10 to-orange-600/10 border border-orange-500/20">
                    <p className="text-sm text-muted-foreground">Pending</p>
                    <p className="text-2xl font-semibold text-orange-400">₹{mockData.finance.pending.toLocaleString()}</p>
                  </div>
                  <div className="p-4 rounded-lg bg-gradient-to-br from-blue-500/10 to-blue-600/10 border border-blue-500/20">
                    <p className="text-sm text-muted-foreground">Next Due Date</p>
                    <p className="text-2xl font-semibold text-blue-400">{mockData.finance.nextDueDate}</p>
                  </div>
                </div>

                <div>
                  <p className="text-sm mb-2 text-muted-foreground">Overall Completion</p>
                  <Progress value={overallDuePercent} className="h-3" />
                  <div className="flex justify-between text-xs text-muted-foreground mt-1">
                    <span>{overallDuePercent}% paid</span>
                    <span>₹{mockData.finance.pending.toLocaleString()} pending</span>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button 
                    onClick={() => {
                      const receipt = `PAYMENT RECEIPT\n\nStudent: ${profileData.name}\nID: ${profileData.studentId}\nAmount: ₹${mockData.finance.pending.toLocaleString()}\nDate: ${new Date().toLocaleDateString()}\nStatus: Pending\n\nThis is a demo receipt.`;
                      const blob = new Blob([receipt], { type: "text/plain;charset=utf-8" });
                      const url = URL.createObjectURL(blob);
                      const a = document.createElement("a");
                      a.href = url;
                      a.download = "payment_receipt.txt";
                      a.click();
                      URL.revokeObjectURL(url);
                    }}
                    className="bg-gradient-primary hover:bg-gradient-primary-hover"
                  >
                    <CreditCard className="h-4 w-4 mr-2" />
                    Pay Now
                  </Button>
                  <Button 
                    variant="outline"
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

                <div className="space-y-3">
                  <h4 className="font-medium">Payment History</h4>
                  {mockData.finance.history.map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between p-3 bg-secondary/20 rounded-lg">
                      <div>
                        <p className="text-sm font-medium">₹{item.amount.toLocaleString()}</p>
                        <p className="text-xs text-muted-foreground">{item.date}</p>
                      </div>
                      <Badge className={item.status === 'Completed' ? 'bg-green-500/20 text-green-400 border-green-500/50' : ''} variant={item.status === 'Completed' ? 'secondary' : 'outline'}>
                        {item.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
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