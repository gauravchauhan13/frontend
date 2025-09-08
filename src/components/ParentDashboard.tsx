import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress";
import { DashboardLayout } from "./DashboardLayout";
import { Chatbot } from "./Chatbot";
import { StudentForm } from "./StudentForm";
import { 
  Home,
  Users, 
  Calendar, 
  MessageCircle, 
  Phone,
  Mail,
  BookOpen,
  AlertTriangle,
  CheckCircle,
  Clock,
  FileText,
  TrendingUp,
  User,
  Download,
  Eye,
  Send,
  Bell
} from "lucide-react";

interface ParentDashboardProps {
  userData: any;
  onLogout: () => void;
}

export function ParentDashboard({ userData, onLogout }: ParentDashboardProps) {
  const [activeTab, setActiveTab] = useState("overview");
  const [notifications, setNotifications] = useState(true);

  const navigation = [
    { id: "overview", label: "Home", icon: Home },
    { id: "student-records", label: "Student Records", icon: Users },
    { id: "student-form", label: "Student Information", icon: FileText },
    { id: "attendance", label: "Attendance", icon: Calendar },
    { id: "reports", label: "Reports", icon: FileText },
    { id: "communications", label: "Communications", icon: MessageCircle },
    { id: "counselling", label: "Counselling", icon: Phone },
  ];
  const mockData = {
    children: [
      {
        name: "John Doe",
        studentId: "UPES2024001",
        program: "B.Tech Computer Science Engineering",
        semester: "6th Semester",
        cgpa: "8.7"
      }
    ],
    attendance: {
      overall: 85,
      subjects: [
        { name: "Data Structures", attendance: 92, status: "Good" },
        { name: "Database Systems", attendance: 88, status: "Good" },
        { name: "Web Development", attendance: 78, status: "Warning" },
        { name: "Software Engineering", attendance: 85, status: "Good" }
      ]
    },
    recentActivities: [
      { date: "2024-11-15", activity: "Assignment submitted - Database Systems", type: "academic" },
      { date: "2024-11-14", activity: "Attended counseling session", type: "counseling" },
      { date: "2024-11-13", activity: "Missed class - Web Development", type: "attendance" },
      { date: "2024-11-12", activity: "Fee payment reminder sent", type: "finance" }
    ],
    communications: [
      { date: "2024-11-10", from: "Dr. Sarah Johnson", subject: "Mid-term progress update", type: "teacher" },
      { date: "2024-11-08", from: "Finance Office", subject: "Fee payment reminder", type: "admin" },
      { date: "2024-11-05", from: "Class Teacher", subject: "Parent-teacher meeting schedule", type: "teacher" }
    ]
  };

  const renderContent = () => {
    switch (activeTab) {
      case "overview":
        return (
          <div className="space-y-6">
            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card className="bg-gradient-to-br from-blue-500/10 to-blue-600/10 border-blue-500/20 glow hover:shadow-lg transition-all duration-300 cursor-pointer group" onClick={() => setActiveTab("student-records")}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Child's CGPA</p>
                      <p className="text-3xl font-bold text-blue-400 group-hover:text-blue-300 transition-colors">8.7</p>
                      <div className="flex items-center gap-1 mt-1">
                        <TrendingUp className="h-3 w-3 text-green-400" />
                        <span className="text-xs text-green-400">Excellent</span>
                      </div>
                    </div>
                    <div className="relative">
                      <TrendingUp className="h-8 w-8 text-blue-400 group-hover:scale-110 transition-transform" />
                      <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-green-500/10 to-green-600/10 border-green-500/20 glow hover:shadow-lg transition-all duration-300 cursor-pointer group" onClick={() => setActiveTab("attendance")}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Attendance</p>
                      <p className="text-3xl font-bold text-green-400 group-hover:text-green-300 transition-colors">{mockData.attendance.overall}%</p>
                      <div className="flex items-center gap-1 mt-1">
                        <CheckCircle className="h-3 w-3 text-green-400" />
                        <span className="text-xs text-green-400">Good standing</span>
                      </div>
                    </div>
                    <div className="relative">
                      <Calendar className="h-8 w-8 text-green-400 group-hover:scale-110 transition-transform" />
                      {notifications && (
                        <div className="absolute -top-1 -right-1 w-3 h-3 bg-orange-400 rounded-full animate-pulse"></div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-orange-500/10 to-orange-600/10 border-orange-500/20 glow hover:shadow-lg transition-all duration-300 cursor-pointer group" onClick={() => setActiveTab("communications")}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Alerts</p>
                      <p className="text-3xl font-bold text-orange-400 group-hover:text-orange-300 transition-colors">2</p>
                      <div className="flex items-center gap-1 mt-1">
                        <Bell className="h-3 w-3 text-orange-400" />
                        <span className="text-xs text-orange-400">Needs attention</span>
                      </div>
                    </div>
                    <AlertTriangle className="h-8 w-8 text-orange-400 group-hover:scale-110 transition-transform" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-purple-500/10 to-purple-600/10 border-purple-500/20 glow hover:shadow-lg transition-all duration-300 cursor-pointer group" onClick={() => setActiveTab("communications")}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Messages</p>
                      <p className="text-3xl font-bold text-purple-400 group-hover:text-purple-300 transition-colors">5</p>
                      <div className="flex items-center gap-1 mt-1">
                        <Mail className="h-3 w-3 text-blue-400" />
                        <span className="text-xs text-blue-400">3 unread</span>
                      </div>
                    </div>
                    <MessageCircle className="h-8 w-8 text-purple-400 group-hover:scale-110 transition-transform" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Student Overview & Recent Activities */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="glow">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="h-5 w-5" />
                    Student Overview
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {mockData.children.map((child, index) => (
                    <div key={index} className="p-4 bg-secondary/20 rounded-lg">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-muted-foreground">Name</p>
                          <p className="font-medium">{child.name}</p>
                          <p className="text-sm text-muted-foreground mt-2">Student ID</p>
                          <p className="font-medium">{child.studentId}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Program</p>
                          <p className="font-medium text-sm">{child.program}</p>
                          <p className="text-sm text-muted-foreground mt-2">Current Semester</p>
                          <p className="font-medium">{child.semester}</p>
                        </div>
                      </div>
                      <div className="flex justify-between items-center mt-4 pt-3 border-t border-border/50">
                        <span className="text-sm">CGPA</span>
                        <Badge className="bg-gradient-primary text-primary-foreground">
                          {child.cgpa}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card className="glow">
                <CardHeader>
                  <CardTitle>Recent Activities</CardTitle>
                  <CardDescription>Latest updates about your child's academics</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {mockData.recentActivities.map((activity, index) => (
                      <div key={index} className="flex items-center gap-3 p-3 bg-secondary/20 rounded-lg">
                        {activity.type === "academic" && <BookOpen className="h-4 w-4 text-blue-400" />}
                        {activity.type === "counseling" && <MessageCircle className="h-4 w-4 text-green-400" />}
                        {activity.type === "attendance" && <AlertTriangle className="h-4 w-4 text-orange-400" />}
                        {activity.type === "finance" && <Clock className="h-4 w-4 text-purple-400" />}
                        <div className="flex-1">
                          <p className="text-sm font-medium">{activity.activity}</p>
                          <p className="text-xs text-muted-foreground">{activity.date}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Counselling Contact */}
            <Card className="glow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageCircle className="h-5 w-5" />
                  Counselling & Support
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="p-4 bg-gradient-to-br from-blue-500/10 to-blue-600/10 rounded-lg border border-blue-500/20">
                    <h4 className="font-semibold text-blue-400 mb-3">Academic Counselor</h4>
                    <div className="space-y-2 text-sm">
                      <p><strong>Dr. Sarah Johnson</strong></p>
                      <p className="flex items-center gap-2">
                        <Mail className="h-4 w-4" />
                        s.johnson@upes.ac.in
                      </p>
                      <p className="flex items-center gap-2">
                        <Phone className="h-4 w-4" />
                        +91 9876543210
                      </p>
                      <p>Office Hours: Mon-Fri, 10 AM - 4 PM</p>
                    </div>
                    <Button 
                      className="mt-4 bg-blue-500 hover:bg-blue-600 w-full"
                      onClick={() => alert("Meeting scheduled with Dr. Sarah Johnson for tomorrow at 2 PM")}
                    >
                      <MessageCircle className="h-4 w-4 mr-2" />
                      Schedule Meeting
                    </Button>
                  </div>

                  <div className="p-4 bg-gradient-to-br from-purple-500/10 to-purple-600/10 rounded-lg border border-purple-500/20">
                    <h4 className="font-semibold text-purple-400 mb-3">Emergency Contact</h4>
                    <div className="space-y-2 text-sm">
                      <p><strong>Dean's Office</strong></p>
                      <p className="flex items-center gap-2">
                        <Phone className="h-4 w-4" />
                        +91 1234567890
                      </p>
                      <p>Available 24/7 for urgent matters</p>
                    </div>
                    <Button 
                      className="mt-4 bg-red-500 hover:bg-red-600 w-full"
                      onClick={() => window.open("tel:+911234567890")}
                    >
                      <Phone className="h-4 w-4 mr-2" />
                      Call Now
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case "student-form":
        return (
          <div className="space-y-6">
            <StudentForm 
              isOpen={true}
              onClose={() => setActiveTab("overview")}
              onSubmit={(data) => {
                console.log("Student form submitted by parent:", data);
                setActiveTab("overview");
              }}
              userRole="parent"
            />
          </div>
        );

      case "student-records":
        return (
          <div className="space-y-6">
            <Card className="glow">
              <CardHeader>
                <CardTitle>Student Records</CardTitle>
                <CardDescription>Detailed information about your child's academic records</CardDescription>
              </CardHeader>
              <CardContent>
                {mockData.children.map((child, index) => (
                  <div key={index} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div>
                          <label className="text-sm font-medium text-muted-foreground">Full Name</label>
                          <p className="text-lg font-medium">{child.name}</p>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-muted-foreground">Student ID</label>
                          <p className="text-lg font-medium">{child.studentId}</p>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-muted-foreground">Program</label>
                          <p className="text-lg font-medium">{child.program}</p>
                        </div>
                      </div>
                      <div className="space-y-4">
                        <div>
                          <label className="text-sm font-medium text-muted-foreground">Current Semester</label>
                          <p className="text-lg font-medium">{child.semester}</p>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-muted-foreground">CGPA</label>
                          <Badge className="bg-gradient-primary text-primary-foreground text-lg p-2">
                            {child.cgpa}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
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
                <CardDescription>Your child's attendance across all subjects this semester</CardDescription>
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
                        <div className="flex items-center gap-2">
                          <Badge 
                            variant={subject.status === "Good" ? "default" : "destructive"}
                            className={subject.status === "Good" ? "bg-green-500/20 text-green-400 border-green-500/50" : ""}
                          >
                            {subject.attendance}%
                          </Badge>
                          {subject.status === "Good" ? (
                            <CheckCircle className="h-4 w-4 text-green-500" />
                          ) : (
                            <AlertTriangle className="h-4 w-4 text-orange-500" />
                          )}
                        </div>
                      </div>
                      <Progress value={subject.attendance} className="h-3" />
                      <p className="text-sm text-muted-foreground">Status: {subject.status}</p>
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
                <CardTitle>Academic Reports</CardTitle>
                <CardDescription>View and download your child's academic reports</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockData.communications.map((report, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-secondary/20 rounded-lg">
                      <div className="flex-1">
                        <div className="flex items-center gap-3">
                          <FileText className="h-5 w-5 text-muted-foreground" />
                          <div>
                            <p className="font-medium">{report.subject}</p>
                            <p className="text-sm text-muted-foreground">From: {report.from}</p>
                            <p className="text-sm text-muted-foreground">{report.date}</p>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Badge variant="outline" className="text-xs">
                          {report.type}
                        </Badge>
                      <div className="flex gap-2">
                        <Button 
                          size="sm" 
                          className="bg-gradient-primary hover:bg-gradient-primary-hover"
                          onClick={() => alert(`Viewing report: ${report.subject}`)}
                        >
                          <Eye className="h-4 w-4 mr-1" />
                          View
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => {
                            const reportContent = `PARENT REPORT\n\nFrom: ${report.from}\nSubject: ${report.subject}\nDate: ${report.date}\nType: ${report.type}\n\nThis is a demo report for parents.\n\nGenerated: ${new Date().toLocaleString()}`;
                            const blob = new Blob([reportContent], { type: "text/plain;charset=utf-8" });
                            const url = URL.createObjectURL(blob);
                            const a = document.createElement("a");
                            a.href = url;
                            a.download = `${report.subject.replace(/\s+/g, "_")}.txt`;
                            a.click();
                            URL.revokeObjectURL(url);
                          }}
                        >
                          <Download className="h-4 w-4 mr-1" />
                          Download
                        </Button>
                      </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case "communications":
        return (
          <div className="space-y-6">
            <Card className="glow">
              <CardHeader>
                <CardTitle>Communications</CardTitle>
                <CardDescription>Messages and updates from teachers and administration</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockData.communications.map((comm, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-secondary/20 rounded-lg">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <p className="font-medium">{comm.subject}</p>
                          <Badge variant="outline" className="text-xs">
                            {comm.type}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">From: {comm.from}</p>
                        <p className="text-sm text-muted-foreground">{comm.date}</p>
                      </div>
                      <div className="flex gap-2">
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => alert(`Reading message: ${comm.subject}`)}
                        >
                          <Eye className="h-4 w-4 mr-1" />
                          Read
                        </Button>
                        <Button 
                          size="sm" 
                          className="bg-gradient-primary hover:bg-gradient-primary-hover"
                          onClick={() => alert(`Replying to: ${comm.from}`)}
                        >
                          <Send className="h-4 w-4 mr-1" />
                          Reply
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
                <CardTitle>Counseling Services</CardTitle>
                <CardDescription>Access counseling support and schedule appointments</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="p-6 bg-gradient-to-br from-blue-500/10 to-blue-600/10 rounded-lg border border-blue-500/20">
                    <h4 className="font-semibold text-blue-400 mb-3">Academic Counselor</h4>
                    <div className="space-y-2 text-sm">
                      <p><strong>Dr. Sarah Johnson</strong></p>
                      <p className="text-muted-foreground">Academic Performance & Course Guidance</p>
                      <div className="flex items-center gap-2">
                        <Mail className="h-4 w-4" />
                        <span>s.johnson@upes.ac.in</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone className="h-4 w-4" />
                        <span>+91 9876543210</span>
                      </div>
                    </div>
                    <Button className="mt-4 bg-blue-500 hover:bg-blue-600 w-full">
                      <MessageCircle className="h-4 w-4 mr-2" />
                      Schedule Appointment
                    </Button>
                  </div>

                  <div className="p-6 bg-gradient-to-br from-green-500/10 to-green-600/10 rounded-lg border border-green-500/20">
                    <h4 className="font-semibold text-green-400 mb-3">Career Counselor</h4>
                    <div className="space-y-2 text-sm">
                      <p><strong>Prof. Michael Chen</strong></p>
                      <p className="text-muted-foreground">Career Planning & Industry Guidance</p>
                      <div className="flex items-center gap-2">
                        <Mail className="h-4 w-4" />
                        <span>m.chen@upes.ac.in</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone className="h-4 w-4" />
                        <span>+91 9876543211</span>
                      </div>
                    </div>
                    <Button className="mt-4 bg-green-500 hover:bg-green-600 w-full">
                      <MessageCircle className="h-4 w-4 mr-2" />
                      Schedule Appointment
                    </Button>
                  </div>
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Emergency Contact</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">
                      For urgent matters or emergencies, please contact:
                    </p>
                    <div className="flex items-center justify-between">
                      <span>Dean's Office: +91 1234567890</span>
                      <Button className="bg-red-500 hover:bg-red-600">
                        <Phone className="h-4 w-4 mr-2" />
                        Call Now
                      </Button>
                    </div>
                  </CardContent>
                </Card>
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
        title="Parent Portal"
      >
        {renderContent()}
      </DashboardLayout>
      <Chatbot userRole="parent" userData={userData} />
    </>
  );
}