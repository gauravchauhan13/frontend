import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Input } from "./ui/input";
import { DashboardLayout } from "./DashboardLayout";
import { Chatbot } from "./Chatbot";
import { 
  Home,
  Users, 
  Calendar, 
  DollarSign, 
  Search,
  UserPlus,
  FileText,
  Heart,
  AlertTriangle,
  BarChart3,
  Settings,
  Edit,
  Trash2,
  Eye,
  Download,
  Shield,
  TrendingUp
} from "lucide-react";

interface AdminDashboardProps {
  userData: any;
  onLogout: () => void;
}

export function AdminDashboard({ userData, onLogout }: AdminDashboardProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("overview");

  const navigation = [
    { id: "overview", label: "Home", icon: Home },
    { id: "students", label: "Student Records", icon: Users },
    { id: "parents", label: "Parent Records", icon: Users },
    { id: "attendance", label: "Attendance", icon: Calendar },
    { id: "finance", label: "Finance", icon: DollarSign },
    { id: "medical", label: "Medical Records", icon: Heart },
    { id: "disciplinary", label: "Disciplinary Actions", icon: AlertTriangle },
    { id: "analytics", label: "Reports & Analytics", icon: BarChart3 },
  ];

  const mockData = {
    stats: {
      totalStudents: 1248,
      totalParents: 892,
      activeTeachers: 67,
      pendingApplications: 23
    },
    students: [
      { id: "UPES2024001", name: "John Doe", program: "B.Tech CSE", semester: "6th", attendance: 85, status: "Active" },
      { id: "UPES2024002", name: "Jane Smith", program: "B.Tech ME", semester: "4th", attendance: 92, status: "Active" },
      { id: "UPES2024003", name: "Mike Johnson", program: "B.Tech EE", semester: "8th", attendance: 78, status: "Warning" },
      { id: "UPES2024004", name: "Sarah Wilson", program: "B.Tech CSE", semester: "2nd", attendance: 95, status: "Active" }
    ],
    parents: [
      { id: "P001", name: "Robert Doe", email: "robert.doe@email.com", student: "John Doe", status: "Active" },
      { id: "P002", name: "Mary Smith", email: "mary.smith@email.com", student: "Jane Smith", status: "Active" },
      { id: "P003", name: "David Johnson", email: "david.johnson@email.com", student: "Mike Johnson", status: "Active" },
      { id: "P004", name: "Lisa Wilson", email: "lisa.wilson@email.com", student: "Sarah Wilson", status: "Active" }
    ],
    finance: {
      totalCollected: 15750000,
      pending: 2340000,
      overdue: 450000,
      recentTransactions: [
        { student: "John Doe", amount: 62500, date: "2024-11-15", status: "Completed" },
        { student: "Jane Smith", amount: 62500, date: "2024-11-14", status: "Completed" },
        { student: "Mike Johnson", amount: 62500, date: "2024-11-13", status: "Pending" },
        { student: "Sarah Wilson", amount: 62500, date: "2024-11-12", status: "Completed" }
      ]
    },
    medical: [
      { student: "John Doe", condition: "Allergies", lastCheckup: "2024-10-15", status: "Monitored" },
      { student: "Mike Johnson", condition: "Asthma", lastCheckup: "2024-11-01", status: "Active" },
      { student: "Sarah Wilson", condition: "None", lastCheckup: "2024-09-20", status: "Healthy" }
    ],
    disciplinary: [
      { student: "Mike Johnson", incident: "Late submission", date: "2024-11-10", action: "Warning", status: "Resolved" },
      { student: "John Doe", incident: "Attendance shortage", date: "2024-10-25", action: "Counseling", status: "In Progress" }
    ]
  };

  const filteredStudents = mockData.students.filter(student =>
    student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    student.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderContent = () => {
    switch (activeTab) {
      case "overview":
        return (
          <div className="space-y-6">
            {/* Global Search */}
            <Card className="glow">
              <CardContent className="p-4">
                <div className="relative max-w-md">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Global search - students, parents, records..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 h-10 border-border/50 bg-input/50"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card className="bg-gradient-to-br from-blue-500/10 to-blue-600/10 border-blue-500/20 glow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Total Students</p>
                      <p className="text-3xl font-bold text-blue-400">{mockData.stats.totalStudents}</p>
                    </div>
                    <Users className="h-8 w-8 text-blue-400" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-green-500/10 to-green-600/10 border-green-500/20 glow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Total Parents</p>
                      <p className="text-3xl font-bold text-green-400">{mockData.stats.totalParents}</p>
                    </div>
                    <Users className="h-8 w-8 text-green-400" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-purple-500/10 to-purple-600/10 border-purple-500/20 glow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Active Teachers</p>
                      <p className="text-3xl font-bold text-purple-400">{mockData.stats.activeTeachers}</p>
                    </div>
                    <Users className="h-8 w-8 text-purple-400" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-orange-500/10 to-orange-600/10 border-orange-500/20 glow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Pending Applications</p>
                      <p className="text-3xl font-bold text-orange-400">{mockData.stats.pendingApplications}</p>
                    </div>
                    <FileText className="h-8 w-8 text-orange-400" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Recent Activities */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="glow">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5" />
                    Recent Financial Transactions
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {mockData.finance.recentTransactions.slice(0, 4).map((transaction, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-secondary/20 rounded-lg">
                        <div>
                          <p className="text-sm font-medium">{transaction.student}</p>
                          <p className="text-xs text-muted-foreground">{transaction.date}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium">₹{transaction.amount.toLocaleString()}</p>
                          <Badge 
                            variant={transaction.status === "Completed" ? "default" : "destructive"} 
                            className={transaction.status === "Completed" ? "bg-green-500/20 text-green-400 border-green-500/50 text-xs" : "text-xs"}
                          >
                            {transaction.status}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="glow">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Settings className="h-5 w-5" />
                    Quick Actions
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button className="w-full justify-start bg-gradient-primary hover:bg-gradient-primary-hover">
                    <UserPlus className="h-4 w-4 mr-2" />
                    Add New Student
                  </Button>
                  <Button 
                    className="w-full justify-start" 
                    variant="outline"
                    onClick={() => {
                      const report = `SYSTEM REPORT\n\nGenerated: ${new Date().toLocaleString()}\nTotal Students: ${mockData.stats.totalStudents}\nTotal Parents: ${mockData.stats.totalParents}\nActive Teachers: ${mockData.stats.activeTeachers}\n\nThis is a demo system report.`;
                      const blob = new Blob([report], { type: "text/plain;charset=utf-8" });
                      const url = URL.createObjectURL(blob);
                      const a = document.createElement("a");
                      a.href = url;
                      a.download = "system_report.txt";
                      a.click();
                      URL.revokeObjectURL(url);
                    }}
                  >
                    <FileText className="h-4 w-4 mr-2" />
                    Generate Reports
                  </Button>
                  <Button 
                    className="w-full justify-start" 
                    variant="outline"
                    onClick={() => alert("System Settings opened - This would open admin settings in a real app")}
                  >
                    <Settings className="h-4 w-4 mr-2" />
                    System Settings
                  </Button>
                  <Button 
                    className="w-full justify-start" 
                    variant="outline"
                    onClick={() => {
                      const exportData = `STUDENT DATA EXPORT\n\nGenerated: ${new Date().toLocaleString()}\n\n${mockData.students.map(s => `${s.name} (${s.id}) - ${s.program} - ${s.attendance}%`).join('\n')}\n\nThis is a demo data export.`;
                      const blob = new Blob([exportData], { type: "text/plain;charset=utf-8" });
                      const url = URL.createObjectURL(blob);
                      const a = document.createElement("a");
                      a.href = url;
                      a.download = "student_data_export.txt";
                      a.click();
                      URL.revokeObjectURL(url);
                    }}
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Export Data
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        );

      case "students":
        return (
          <div className="space-y-6">
            <Card className="glow">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <Users className="h-5 w-5" />
                      Student Management
                    </CardTitle>
                    <CardDescription>Manage student records and information</CardDescription>
                  </div>
                  <Button className="bg-gradient-primary hover:bg-gradient-primary-hover">
                    <UserPlus className="h-4 w-4 mr-2" />
                    Add Student
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {filteredStudents.map((student, index) => (
                    <div key={index} className="p-4 bg-secondary/20 rounded-lg">
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
                        <div>
                          <p className="font-medium">{student.name}</p>
                          <p className="text-sm text-muted-foreground">{student.id}</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium">{student.program}</p>
                          <p className="text-sm text-muted-foreground">{student.semester}</p>
                        </div>
                        <div>
                          <p className="text-sm">Attendance: {student.attendance}%</p>
                          <Badge 
                            variant={student.status === "Active" ? "default" : "destructive"} 
                            className={student.status === "Active" ? "bg-green-500/20 text-green-400 border-green-500/50 text-xs" : "text-xs"}
                          >
                            {student.status}
                          </Badge>
                        </div>
                        <div className="flex gap-2">
                          <Button 
                            size="sm" 
                            variant="outline" 
                            className="border-border/50 hover:bg-accent/50"
                            onClick={() => alert(`Viewing student: ${student.name}\nID: ${student.id}\nProgram: ${student.program}\nAttendance: ${student.attendance}%`)}
                          >
                            <Eye className="h-3 w-3 mr-1" />
                            View
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline" 
                            className="border-border/50 hover:bg-accent/50"
                            onClick={() => alert(`Editing student: ${student.name} - This would open an edit form in a real app`)}
                          >
                            <Edit className="h-3 w-3 mr-1" />
                            Edit
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline" 
                            className="border-red-500/50 text-red-400 hover:bg-red-500/10"
                            onClick={() => {
                              if (confirm(`Are you sure you want to delete student ${student.name}?`)) {
                                alert(`Student ${student.name} deleted (demo only)`);
                              }
                            }}
                          >
                            <Trash2 className="h-3 w-3 mr-1" />
                            Delete
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

      default:
        return (
          <div className="space-y-6">
            <Card className="glow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5" />
                  {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Management
                </CardTitle>
                <CardDescription>Manage {activeTab} records and operations</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <BarChart3 className="h-8 w-8 text-blue-400" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">Coming Soon</h3>
                  <p className="text-muted-foreground mb-6">This section is under development and will be available soon.</p>
                  <div className="flex justify-center gap-2">
                    <Button 
                      variant="outline"
                      onClick={() => setActiveTab("overview")}
                    >
                      Back to Overview
                    </Button>
                    <Button 
                      className="bg-gradient-primary hover:bg-gradient-primary-hover"
                      onClick={() => {
                        const placeholder = `${activeTab.toUpperCase()} SECTION\n\nThis section will include:\n- Data management for ${activeTab}\n- Advanced analytics\n- Reporting features\n- Real-time updates\n\nGenerated: ${new Date().toLocaleString()}\n\nThis is a placeholder document.`;
                        const blob = new Blob([placeholder], { type: "text/plain;charset=utf-8" });
                        const url = URL.createObjectURL(blob);
                        const a = document.createElement("a");
                        a.href = url;
                        a.download = `${activeTab}_placeholder.txt`;
                        a.click();
                        URL.revokeObjectURL(url);
                      }}
                    >
                      <Download className="h-4 w-4 mr-2" />
                      Download Info
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        );
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
        title="Admin Portal"
      >
        {renderContent()}
      </DashboardLayout>
      <Chatbot userRole="admin" userData={userData} />
    </>
  );
}