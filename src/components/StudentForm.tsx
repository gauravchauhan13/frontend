import React, { useState } from "react";
import { X, User, BookOpen, FileText, Save, Eye, Edit, GraduationCap, MapPin, Phone, Mail, Calendar, Award, TrendingUp, AlertTriangle } from "lucide-react";

// Self-contained UI Components with modern design
const Card = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <div className={`bg-card border border-border/10 rounded-xl shadow-lg backdrop-blur-sm ${className}`}>
    {children}
  </div>
);

const CardHeader = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <div className={`p-6 pb-3 ${className}`}>
    {children}
  </div>
);

const CardContent = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <div className={`p-6 pt-3 ${className}`}>
    {children}
  </div>
);

const CardTitle = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <h3 className={`text-lg font-semibold text-foreground ${className}`}>
    {children}
  </h3>
);

const Button = ({ 
  onClick, 
  children, 
  variant = "default", 
  size = "default", 
  className = "",
  type = "button"
}: { 
  onClick?: () => void; 
  children: React.ReactNode; 
  variant?: "default" | "ghost" | "outline"; 
  size?: "default" | "sm" | "lg";
  className?: string;
  type?: "button" | "submit";
}) => {
  const baseClasses = "inline-flex items-center justify-center rounded-lg font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50";
  
  const variants = {
    default: "bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl",
    ghost: "hover:bg-accent hover:text-accent-foreground",
    outline: "border border-input bg-background/50 hover:bg-accent hover:text-accent-foreground"
  };
  
  const sizes = {
    default: "h-10 px-4 py-2",
    sm: "h-9 rounded-md px-3",
    lg: "h-11 rounded-md px-8"
  };

  return (
    <button
      type={type}
      onClick={onClick}
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`}
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
  disabled = false,
  className = "",
  step,
  min,
  max,
  error
}: { 
  id?: string; 
  type?: string; 
  placeholder?: string; 
  value: string; 
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; 
  required?: boolean;
  disabled?: boolean;
  className?: string;
  step?: string;
  min?: string;
  max?: string;
  error?: string;
}) => (
  <div>
    <input
      id={id}
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      required={required}
      disabled={disabled}
      step={step}
      min={min}
      max={max}
      className={`flex h-11 w-full rounded-lg border ${error ? 'border-red-500 focus-visible:ring-red-500' : 'border-gray-300 dark:border-gray-600 focus-visible:ring-blue-500'} bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm px-4 py-2 text-sm text-gray-900 dark:text-gray-100 placeholder:text-gray-500 dark:placeholder:text-gray-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:border-blue-500 disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-200 hover:border-gray-400 dark:hover:border-gray-500 ${className}`}
    />
    {error && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{error}</p>}
  </div>
);

const Textarea = ({ 
  id, 
  placeholder, 
  value, 
  onChange, 
  required = false,
  disabled = false,
  rows = 4,
  className = "",
  error
}: { 
  id?: string; 
  placeholder?: string; 
  value: string; 
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void; 
  required?: boolean;
  disabled?: boolean;
  rows?: number;
  className?: string;
  error?: string;
}) => (
  <div>
    <textarea
      id={id}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      required={required}
      disabled={disabled}
      rows={rows}
      className={`flex min-h-[80px] w-full rounded-lg border ${error ? 'border-red-500 focus-visible:ring-red-500' : 'border-gray-300 dark:border-gray-600 focus-visible:ring-blue-500'} bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm px-4 py-3 text-sm text-gray-900 dark:text-gray-100 placeholder:text-gray-500 dark:placeholder:text-gray-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:border-blue-500 disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-200 hover:border-gray-400 dark:hover:border-gray-500 resize-vertical ${className}`}
    />
    {error && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{error}</p>}
  </div>
);

const Select = ({ 
  id, 
  value, 
  onChange, 
  children, 
  required = false,
  disabled = false,
  className = "",
  error
}: { 
  id?: string; 
  value: string; 
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void; 
  children: React.ReactNode; 
  required?: boolean;
  disabled?: boolean;
  className?: string;
  error?: string;
}) => (
  <div>
    <select
      id={id}
      value={value}
      onChange={onChange}
      required={required}
      disabled={disabled}
      className={`flex h-11 w-full rounded-lg border ${error ? 'border-red-500 focus-visible:ring-red-500' : 'border-gray-300 dark:border-gray-600 focus-visible:ring-blue-500'} bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm px-4 py-2 text-sm text-gray-900 dark:text-gray-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:border-blue-500 disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-200 hover:border-gray-400 dark:hover:border-gray-500 ${className}`}
    >
      {children}
    </select>
    {error && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{error}</p>}
  </div>
);

const Label = ({ htmlFor, children, className = "", required = false }: { 
  htmlFor?: string; 
  children: React.ReactNode; 
  className?: string;
  required?: boolean;
}) => (
  <label htmlFor={htmlFor} className={`text-sm font-medium leading-none text-gray-700 dark:text-gray-300 ${className}`}>
    {children}
    {required && <span className="text-red-500 ml-1">*</span>}
  </label>
);

const Tabs = ({ value, onValueChange, children, className = "" }: { 
  value: string; 
  onValueChange: (value: string) => void; 
  children: React.ReactNode; 
  className?: string; 
}) => (
  <div className={className}>
    {React.Children.map(children, child =>
      React.isValidElement(child) ? React.cloneElement(child as React.ReactElement<any>, { currentValue: value, onValueChange }) : child
    )}
  </div>
);

const TabsList = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <div className={`inline-flex h-12 items-center justify-center rounded-xl bg-muted/30 backdrop-blur-sm p-1.5 text-muted-foreground border border-border/10 ${className}`}>
    {children}
  </div>
);

const TabsTrigger = ({ value: triggerValue, children, currentValue, onValueChange, className = "" }: { 
  value: string; 
  children: React.ReactNode; 
  currentValue?: string; 
  onValueChange?: (value: string) => void; 
  className?: string;
}) => (
  <button
    type="button"
    onClick={() => onValueChange?.(triggerValue)}
    className={`inline-flex items-center justify-center whitespace-nowrap rounded-lg px-4 py-2.5 text-sm font-medium ring-offset-background transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 ${
      currentValue === triggerValue ? 
        "bg-background text-foreground shadow-sm border border-border/20" : 
        "hover:bg-background/50 hover:text-foreground/80"
    } ${className}`}
  >
    {children}
  </button>
);

const TabsContent = ({ value: contentValue, children, currentValue }: { 
  value: string; 
  children: React.ReactNode; 
  currentValue?: string; 
}) => (
  currentValue === contentValue ? <div className="mt-6 animate-in fade-in-50 duration-200">{children}</div> : null
);

interface StudentFormData {
  // Personal Information
  studentId: string;
  fullName: string;
  dateOfBirth: string;
  gender: string;
  studentEmail: string;
  phoneNumber: string;
  address: string;
  fatherName: string;
  motherName: string;
  guardianName: string;
  guardianPhoneNumber: string;
  emergencyContactName: string;
  emergencyContactNumber: string;
  nationality: string;
  religion: string;
  caste: string;
  category: string;
  aadharNumber: string;
  panNumber: string;
  
  // Academic Information
  currentCGPA: string;
  previousSemesterCGPA: string;
  semester: string;
  batch: string;
  department: string;
  internalAssessmentMarks: string;
  midSemResults: string;
  backlogs: string;
  attendancePercentage: string;
  subjectWiseAttendance: string;
  
  // Other Information
  extracurricularParticipation: string;
  academicRiskScore: string;
  financialRiskScore: string;
  psychologicalRiskScore: string;
  disciplinaryActions: string;
}

interface StudentFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: StudentFormData) => void;
  userRole: "student" | "parent" | "faculty";
  initialData?: Partial<StudentFormData>;
}

export function StudentForm({ isOpen, onClose, onSubmit, userRole, initialData }: StudentFormProps) {
  const [activeTab, setActiveTab] = useState("personal");
  const [isViewMode, setIsViewMode] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<keyof StudentFormData, string>>>({});
  const [formData, setFormData] = useState<StudentFormData>({
    // Personal Information
    studentId: initialData?.studentId || "",
    fullName: initialData?.fullName || "",
    dateOfBirth: initialData?.dateOfBirth || "",
    gender: initialData?.gender || "",
    studentEmail: initialData?.studentEmail || "",
    phoneNumber: initialData?.phoneNumber || "",
    address: initialData?.address || "",
    fatherName: initialData?.fatherName || "",
    motherName: initialData?.motherName || "",
    guardianName: initialData?.guardianName || "",
    guardianPhoneNumber: initialData?.guardianPhoneNumber || "",
    emergencyContactName: initialData?.emergencyContactName || "",
    emergencyContactNumber: initialData?.emergencyContactNumber || "",
    nationality: initialData?.nationality || "Indian",
    religion: initialData?.religion || "",
    caste: initialData?.caste || "",
    category: initialData?.category || "",
    aadharNumber: initialData?.aadharNumber || "",
    panNumber: initialData?.panNumber || "",
    
    // Academic Information
    currentCGPA: initialData?.currentCGPA || "",
    previousSemesterCGPA: initialData?.previousSemesterCGPA || "",
    semester: initialData?.semester || "",
    batch: initialData?.batch || "",
    department: initialData?.department || "",
    internalAssessmentMarks: initialData?.internalAssessmentMarks || "",
    midSemResults: initialData?.midSemResults || "",
    backlogs: initialData?.backlogs || "0",
    attendancePercentage: initialData?.attendancePercentage || "",
    subjectWiseAttendance: initialData?.subjectWiseAttendance || "",
    
    // Other Information
    extracurricularParticipation: initialData?.extracurricularParticipation || "",
    academicRiskScore: initialData?.academicRiskScore || "",
    financialRiskScore: initialData?.financialRiskScore || "",
    psychologicalRiskScore: initialData?.psychologicalRiskScore || "",
    disciplinaryActions: initialData?.disciplinaryActions || "",
  });

  const validateField = (field: keyof StudentFormData, value: string): string => {
    switch (field) {
      case 'studentEmail':
        if (value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          return 'Please enter a valid email address';
        }
        break;
      case 'phoneNumber':
      case 'guardianPhoneNumber':
      case 'emergencyContactNumber':
        if (value && !/^[+]?[\d\s-()]{10,}$/.test(value)) {
          return 'Please enter a valid phone number (minimum 10 digits)';
        }
        break;
      case 'currentCGPA':
      case 'previousSemesterCGPA':
        if (value && (parseFloat(value) < 0 || parseFloat(value) > 10)) {
          return 'CGPA must be between 0 and 10';
        }
        break;
      case 'attendancePercentage':
        if (value && (parseFloat(value) < 0 || parseFloat(value) > 100)) {
          return 'Attendance must be between 0 and 100%';
        }
        break;
      case 'aadharNumber':
        if (value && !/^\d{12}$/.test(value.replace(/\s/g, ''))) {
          return 'Aadhar number must be 12 digits';
        }
        break;
      case 'academicRiskScore':
      case 'financialRiskScore':
      case 'psychologicalRiskScore':
        if (value && (parseInt(value) < 1 || parseInt(value) > 10)) {
          return 'Risk score must be between 1 and 10';
        }
        break;
    }
    return '';
  };

  const handleInputChange = (field: keyof StudentFormData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
    
    // Validate field
    const error = validateField(field, value);
    if (error) {
      setErrors(prev => ({
        ...prev,
        [field]: error
      }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof StudentFormData, string>> = {};
    
    // Required fields validation
    const requiredFields = [
      'studentId', 'fullName', 'dateOfBirth', 'gender', 'studentEmail', 
      'phoneNumber', 'address', 'fatherName', 'motherName', 
      'emergencyContactName', 'emergencyContactNumber', 'nationality'
    ];
    
    requiredFields.forEach(field => {
      if (!formData[field as keyof StudentFormData]) {
        newErrors[field as keyof StudentFormData] = 'This field is required';
      }
    });
    
    // Field-specific validation
    Object.keys(formData).forEach(key => {
      const field = key as keyof StudentFormData;
      const error = validateField(field, formData[field]);
      if (error) {
        newErrors[field] = error;
      }
    });
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      // Focus on first error field
      const firstErrorField = Object.keys(errors)[0];
      if (firstErrorField) {
        const element = document.getElementById(firstErrorField);
        element?.focus();
      }
      return;
    }
    
    onSubmit(formData);
    onClose();
  };

  const isReadOnly = userRole === "parent" || (userRole === "faculty" && activeTab !== "academics");

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50 overflow-y-auto">
      <div className="bg-background/95 backdrop-blur-md rounded-2xl shadow-2xl w-full max-w-5xl max-h-[90vh] overflow-hidden border border-border/20">
        {/* Modern Header with Gradient */}
        <div className="relative bg-gradient-to-r from-blue-600/10 via-purple-600/10 to-pink-600/10 border-b border-border/20">
          <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
          <div className="relative flex items-center justify-between p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                <GraduationCap className="h-6 w-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Student Information Form
                </h2>
                <p className="text-muted-foreground text-sm">
                  {userRole === "student" ? "Update your information and track your progress" : 
                   userRole === "parent" ? "View your child's academic information" :
                   "Manage student academic records and assessments"}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              {(userRole === "parent" || userRole === "faculty") && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsViewMode(!isViewMode)}
                  className="gap-2"
                >
                  {isViewMode ? <Edit className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  {isViewMode ? "Edit" : "View"}
                </Button>
              )}
              <Button variant="ghost" size="sm" onClick={onClose} className="hover:bg-red-50 hover:text-red-600">
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        <div className="p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Modern Tab Navigation */}
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-3 mb-8">
                <TabsTrigger value="personal" className="gap-2">
                  <User className="h-4 w-4" />
                  Personal Details
                </TabsTrigger>
                <TabsTrigger value="academics" className="gap-2">
                  <BookOpen className="h-4 w-4" />
                  Academic Records
                </TabsTrigger>
                <TabsTrigger value="other" className="gap-2">
                  <FileText className="h-4 w-4" />
                  Additional Info
                </TabsTrigger>
              </TabsList>

              {/* Personal Information Tab */}
              <TabsContent value="personal">
                <div className="space-y-6">
                  {/* Basic Information Section */}
                  <Card className="bg-gradient-to-br from-blue-50/50 to-indigo-50/50 dark:from-blue-950/20 dark:to-indigo-950/20">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-blue-700 dark:text-blue-300">
                        <User className="h-5 w-5" />
                        Basic Information
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="studentId" className="flex items-center gap-2" required>
                            <GraduationCap className="h-4 w-4" />
                            Student ID
                          </Label>
                          <Input
                            id="studentId"
                            value={formData.studentId}
                            onChange={(e) => handleInputChange("studentId", e.target.value)}
                            disabled={isReadOnly || isViewMode}
                            placeholder="e.g., UPES2024001"
                            required
                            error={errors.studentId}
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="fullName" required>Full Name</Label>
                          <Input
                            id="fullName"
                            value={formData.fullName}
                            onChange={(e) => handleInputChange("fullName", e.target.value)}
                            disabled={isReadOnly || isViewMode}
                            placeholder="Enter your full name"
                            required
                            error={errors.fullName}
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="dateOfBirth" className="flex items-center gap-2" required>
                            <Calendar className="h-4 w-4" />
                            Date of Birth
                          </Label>
                          <Input
                            id="dateOfBirth"
                            type="date"
                            value={formData.dateOfBirth}
                            onChange={(e) => handleInputChange("dateOfBirth", e.target.value)}
                            disabled={isReadOnly || isViewMode}
                            required
                            error={errors.dateOfBirth}
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="gender" required>Gender</Label>
                          <Select
                            id="gender"
                            value={formData.gender}
                            onChange={(e) => handleInputChange("gender", e.target.value)}
                            disabled={isReadOnly || isViewMode}
                            required
                            error={errors.gender}
                          >
                            <option value="">Select Gender</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="other">Other</option>
                            <option value="prefer-not-to-say">Prefer not to say</option>
                          </Select>
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="nationality" required>Nationality</Label>
                          <Input
                            id="nationality"
                            value={formData.nationality}
                            onChange={(e) => handleInputChange("nationality", e.target.value)}
                            disabled={isReadOnly || isViewMode}
                            placeholder="e.g., Indian"
                            required
                            error={errors.nationality}
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="category">Category</Label>
                          <Select
                            id="category"
                            value={formData.category}
                            onChange={(e) => handleInputChange("category", e.target.value)}
                            disabled={isReadOnly || isViewMode}
                            error={errors.category}
                          >
                            <option value="">Select Category</option>
                            <option value="general">General</option>
                            <option value="obc">OBC (Other Backward Class)</option>
                            <option value="sc">SC (Scheduled Caste)</option>
                            <option value="st">ST (Scheduled Tribe)</option>
                            <option value="ews">EWS (Economically Weaker Section)</option>
                          </Select>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Contact Information Section */}
                  <Card className="bg-gradient-to-br from-green-50/50 to-emerald-50/50 dark:from-green-950/20 dark:to-emerald-950/20">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-green-700 dark:text-green-300">
                        <Phone className="h-5 w-5" />
                        Contact Information
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="studentEmail" className="flex items-center gap-2" required>
                            <Mail className="h-4 w-4" />
                            Student Email
                          </Label>
                          <Input
                            id="studentEmail"
                            type="email"
                            value={formData.studentEmail}
                            onChange={(e) => handleInputChange("studentEmail", e.target.value)}
                            disabled={isReadOnly || isViewMode}
                            placeholder="your.email@college.edu"
                            required
                            error={errors.studentEmail}
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="phoneNumber" className="flex items-center gap-2" required>
                            <Phone className="h-4 w-4" />
                            Phone Number
                          </Label>
                          <Input
                            id="phoneNumber"
                            type="tel"
                            value={formData.phoneNumber}
                            onChange={(e) => handleInputChange("phoneNumber", e.target.value)}
                            disabled={isReadOnly || isViewMode}
                            placeholder="+91 98765 43210"
                            required
                            error={errors.phoneNumber}
                          />
                        </div>
                      </div>

                      <div className="mt-6 space-y-2">
                        <Label htmlFor="address" className="flex items-center gap-2" required>
                          <MapPin className="h-4 w-4" />
                          Complete Address
                        </Label>
                        <Textarea
                          id="address"
                          value={formData.address}
                          onChange={(e) => handleInputChange("address", e.target.value)}
                          disabled={isReadOnly || isViewMode}
                          placeholder="House/Flat No., Street, City, State, PIN Code"
                          rows={3}
                          required
                          error={errors.address}
                        />
                      </div>
                    </CardContent>
                  </Card>

                  {/* Family Information Section */}
                  <Card className="bg-gradient-to-br from-purple-50/50 to-pink-50/50 dark:from-purple-950/20 dark:to-pink-950/20">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-purple-700 dark:text-purple-300">
                        <User className="h-5 w-5" />
                        Family & Emergency Contacts
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="fatherName" required>Father's Name</Label>
                          <Input
                            id="fatherName"
                            value={formData.fatherName}
                            onChange={(e) => handleInputChange("fatherName", e.target.value)}
                            disabled={isReadOnly || isViewMode}
                            placeholder="Enter father's full name"
                            required
                            error={errors.fatherName}
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="motherName" required>Mother's Name</Label>
                          <Input
                            id="motherName"
                            value={formData.motherName}
                            onChange={(e) => handleInputChange("motherName", e.target.value)}
                            disabled={isReadOnly || isViewMode}
                            placeholder="Enter mother's full name"
                            required
                            error={errors.motherName}
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="guardianName">Guardian's Name</Label>
                          <Input
                            id="guardianName"
                            value={formData.guardianName}
                            onChange={(e) => handleInputChange("guardianName", e.target.value)}
                            disabled={isReadOnly || isViewMode}
                            placeholder="If different from parents"
                            error={errors.guardianName}
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="guardianPhoneNumber">Guardian's Phone</Label>
                          <Input
                            id="guardianPhoneNumber"
                            type="tel"
                            value={formData.guardianPhoneNumber}
                            onChange={(e) => handleInputChange("guardianPhoneNumber", e.target.value)}
                            disabled={isReadOnly || isViewMode}
                            placeholder="+91 98765 43210"
                            error={errors.guardianPhoneNumber}
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="emergencyContactName" required>Emergency Contact Name</Label>
                          <Input
                            id="emergencyContactName"
                            value={formData.emergencyContactName}
                            onChange={(e) => handleInputChange("emergencyContactName", e.target.value)}
                            disabled={isReadOnly || isViewMode}
                            placeholder="Person to contact in emergency"
                            required
                            error={errors.emergencyContactName}
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="emergencyContactNumber" required>Emergency Contact Number</Label>
                          <Input
                            id="emergencyContactNumber"
                            type="tel"
                            value={formData.emergencyContactNumber}
                            onChange={(e) => handleInputChange("emergencyContactNumber", e.target.value)}
                            disabled={isReadOnly || isViewMode}
                            placeholder="+91 98765 43210"
                            required
                            error={errors.emergencyContactNumber}
                          />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              {/* Academic Information Tab */}
              <TabsContent value="academics">
                <div className="space-y-6">
                  {/* Academic Performance Section */}
                  <Card className="bg-gradient-to-br from-amber-50/50 to-orange-50/50 dark:from-amber-950/20 dark:to-orange-950/20">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-amber-700 dark:text-amber-300">
                        <Award className="h-5 w-5" />
                        Academic Performance
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="currentCGPA" className="flex items-center gap-2">
                            <TrendingUp className="h-4 w-4" />
                            Current CGPA
                          </Label>
                          <Input
                            id="currentCGPA"
                            type="number"
                            step="0.01"
                            min="0"
                            max="10"
                            value={formData.currentCGPA}
                            onChange={(e) => handleInputChange("currentCGPA", e.target.value)}
                            disabled={userRole === "parent" || (userRole === "faculty" && isViewMode)}
                            placeholder="e.g., 8.75"
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="previousSemesterCGPA">Previous Semester CGPA</Label>
                          <Input
                            id="previousSemesterCGPA"
                            type="number"
                            step="0.01"
                            min="0"
                            max="10"
                            value={formData.previousSemesterCGPA}
                            onChange={(e) => handleInputChange("previousSemesterCGPA", e.target.value)}
                            disabled={userRole === "parent" || (userRole === "faculty" && isViewMode)}
                            placeholder="e.g., 8.50"
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="semester">Current Semester</Label>
                          <Select
                            id="semester"
                            value={formData.semester}
                            onChange={(e) => handleInputChange("semester", e.target.value)}
                            disabled={userRole === "parent" || (userRole === "faculty" && isViewMode)}
                          >
                            <option value="">Select Semester</option>
                            <option value="1">1st Semester</option>
                            <option value="2">2nd Semester</option>
                            <option value="3">3rd Semester</option>
                            <option value="4">4th Semester</option>
                            <option value="5">5th Semester</option>
                            <option value="6">6th Semester</option>
                            <option value="7">7th Semester</option>
                            <option value="8">8th Semester</option>
                          </Select>
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="batch">Batch</Label>
                          <Input
                            id="batch"
                            value={formData.batch}
                            onChange={(e) => handleInputChange("batch", e.target.value)}
                            disabled={userRole === "parent" || (userRole === "faculty" && isViewMode)}
                            placeholder="e.g., 2022-2026"
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="department">Department</Label>
                          <Input
                            id="department"
                            value={formData.department}
                            onChange={(e) => handleInputChange("department", e.target.value)}
                            disabled={userRole === "parent" || (userRole === "faculty" && isViewMode)}
                            placeholder="e.g., Computer Science Engineering"
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="backlogs">Number of Backlogs</Label>
                          <Input
                            id="backlogs"
                            type="number"
                            min="0"
                            value={formData.backlogs}
                            onChange={(e) => handleInputChange("backlogs", e.target.value)}
                            disabled={userRole === "parent" || (userRole === "faculty" && isViewMode)}
                            placeholder="0"
                          />
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Attendance Section */}
                  <Card className="bg-gradient-to-br from-cyan-50/50 to-blue-50/50 dark:from-cyan-950/20 dark:to-blue-950/20">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-cyan-700 dark:text-cyan-300">
                        <Calendar className="h-5 w-5" />
                        Attendance Records
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="attendancePercentage">Overall Attendance %</Label>
                          <Input
                            id="attendancePercentage"
                            type="number"
                            min="0"
                            max="100"
                            value={formData.attendancePercentage}
                            onChange={(e) => handleInputChange("attendancePercentage", e.target.value)}
                            disabled={userRole === "parent" || (userRole === "faculty" && isViewMode)}
                            placeholder="e.g., 85"
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="subjectWiseAttendance">Subject-wise Attendance</Label>
                          <Textarea
                            id="subjectWiseAttendance"
                            value={formData.subjectWiseAttendance}
                            onChange={(e) => handleInputChange("subjectWiseAttendance", e.target.value)}
                            disabled={userRole === "parent" || (userRole === "faculty" && isViewMode)}
                            placeholder="Math: 90%, Physics: 85%, Chemistry: 80%"
                            rows={3}
                          />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              {/* Other Information Tab */}
              <TabsContent value="other">
                <div className="space-y-6">
                  {/* Risk Assessment Section */}
                  <Card className="bg-gradient-to-br from-red-50/50 to-pink-50/50 dark:from-red-950/20 dark:to-pink-950/20">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-red-700 dark:text-red-300">
                        <AlertTriangle className="h-5 w-5" />
                        Risk Assessment
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="academicRiskScore">Academic Risk Score (1-10)</Label>
                          <Input
                            id="academicRiskScore"
                            type="number"
                            min="1"
                            max="10"
                            value={formData.academicRiskScore}
                            onChange={(e) => handleInputChange("academicRiskScore", e.target.value)}
                            disabled={userRole !== "faculty" || isViewMode}
                            placeholder="1-10"
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="financialRiskScore">Financial Risk Score (1-10)</Label>
                          <Input
                            id="financialRiskScore"
                            type="number"
                            min="1"
                            max="10"
                            value={formData.financialRiskScore}
                            onChange={(e) => handleInputChange("financialRiskScore", e.target.value)}
                            disabled={userRole !== "faculty" || isViewMode}
                            placeholder="1-10"
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="psychologicalRiskScore">Psychological Risk Score (1-10)</Label>
                          <Input
                            id="psychologicalRiskScore"
                            type="number"
                            min="1"
                            max="10"
                            value={formData.psychologicalRiskScore}
                            onChange={(e) => handleInputChange("psychologicalRiskScore", e.target.value)}
                            disabled={userRole !== "faculty" || isViewMode}
                            placeholder="1-10"
                          />
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Additional Information Section */}
                  <Card className="bg-gradient-to-br from-indigo-50/50 to-purple-50/50 dark:from-indigo-950/20 dark:to-purple-950/20">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-indigo-700 dark:text-indigo-300">
                        <FileText className="h-5 w-5" />
                        Additional Information
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-6">
                        <div className="space-y-2">
                          <Label htmlFor="extracurricularParticipation">Extracurricular Activities</Label>
                          <Textarea
                            id="extracurricularParticipation"
                            value={formData.extracurricularParticipation}
                            onChange={(e) => handleInputChange("extracurricularParticipation", e.target.value)}
                            disabled={isReadOnly || isViewMode}
                            placeholder="List your extracurricular activities, achievements, and participation"
                            rows={4}
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="disciplinaryActions">Disciplinary Actions (if any)</Label>
                          <Textarea
                            id="disciplinaryActions"
                            value={formData.disciplinaryActions}
                            onChange={(e) => handleInputChange("disciplinaryActions", e.target.value)}
                            disabled={userRole !== "faculty" || isViewMode}
                            placeholder="Record any disciplinary actions or warnings"
                            rows={3}
                          />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>

            {/* Enhanced Action Buttons */}
            <div className="flex items-center justify-between pt-6 border-t border-gray-200/30 dark:border-gray-700/30">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                className="gap-2"
              >
                <X className="h-4 w-4" />
                Cancel
              </Button>
              
              <div className="flex gap-3">
                {activeTab !== "personal" && (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      if (activeTab === "academics") setActiveTab("personal");
                      if (activeTab === "other") setActiveTab("academics");
                    }}
                  >
                    Previous
                  </Button>
                )}
                
                {activeTab !== "other" && (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      if (activeTab === "personal") setActiveTab("academics");
                      if (activeTab === "academics") setActiveTab("other");
                    }}
                  >
                    Next
                  </Button>
                )}
                
                {(!isViewMode && userRole !== "parent") && (
                  <Button
                    type="submit"
                    size="lg"
                    className="gap-2 min-w-[140px] bg-green-600 hover:bg-green-700"
                  >
                    <Save className="h-4 w-4" />
                    Save Information
                  </Button>
                )}
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
