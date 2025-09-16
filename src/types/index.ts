import React from 'react'

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  avatar?: string;
  profile?: any; // Profile data specific to each role
  createdAt?: string;
  updatedAt?: string;
}

export type UserRole = 'student' | 'company' | 'officer';

export interface Student extends User {
  role: 'student';
  studentId: string;
  college: string;
  department: string;
  batch: string;
  cgpa: number;
  phone: string;
  skills: string[];
  resume?: string;
  projects: Project[];
  achievements: Achievement[];
  profileComplete: boolean;
}

export interface Company extends User {
  role: 'company';
  companyName: string;
  industry: string;
  description: string;
  website?: string;
  logo?: string;
  verified: boolean;
  recruiters: Recruiter[];
}

export interface PlacementOfficer extends User {
  role: 'officer';
  college: string;
  designation: string;
  department?: string;
  permissions: Permission[];
}

export interface Recruiter {
  id: string;
  name: string;
  email: string;
  designation: string;
  companyId: string;
}

export interface Job {
  id: string;
  title: string;
  companyId: string;
  company: Company;
  description: string;
  requirements: string[];
  location: string;
  type: JobType;
  salaryMin: number;
  salaryMax: number;
  skillsRequired: string[];
  experience: string;
  deadline: string;
  status: JobStatus;
  applicationsCount: number;
  createdAt: string;
  updatedAt: string;
}

export type JobType = 'full-time' | 'part-time' | 'internship' | 'contract';
export type JobStatus = 'active' | 'closed' | 'draft';

export interface Application {
  id: string;
  jobId: string;
  studentId: string;
  job: Job;
  student: Student;
  status: ApplicationStatus;
  appliedAt: string;
  updatedAt: string;
  notes?: string;
  interviewDate?: string;
  feedback?: string;
}

export type ApplicationStatus = 
  | 'pending' 
  | 'shortlisted' 
  | 'interviewed' 
  | 'selected' 
  | 'rejected' 
  | 'offer-made' 
  | 'offer-accepted' 
  | 'offer-declined';

export interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
  startDate: string;
  endDate?: string;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  date: string;
  category: 'academic' | 'extracurricular' | 'certification' | 'competition';
  certificateUrl?: string;
}

export interface PlacementDrive {
  id: string;
  title: string;
  companyId: string;
  company: Company;
  description: string;
  date: string;
  time: string;
  venue: string;
  eligibilityCriteria: {
    minCGPA: number;
    departments: string[];
    batches: string[];
    skills?: string[];
  };
  registrationDeadline: string;
  maxApplicants?: number;
  status: DriveStatus;
  registeredStudents: string[];
  selectedStudents: string[];
  createdAt: string;
}

export type DriveStatus = 'upcoming' | 'ongoing' | 'completed' | 'cancelled';

export interface Permission {
  id: string;
  name: string;
  resource: string;
  actions: string[];
}

export interface Analytics {
  totalStudents: number;
  totalCompanies: number;
  totalJobs: number;
  totalApplications: number;
  placementRate: number;
  avgSalary: number;
  topSkills: SkillDemand[];
  departmentStats: DepartmentStats[];
  monthlyPlacements: MonthlyStats[];
}

export interface SkillDemand {
  skill: string;
  demand: number;
  trend: 'up' | 'down' | 'stable';
}

export interface DepartmentStats {
  department: string;
  totalStudents: number;
  placedStudents: number;
  placementRate: number;
  avgSalary: number;
}

export interface MonthlyStats {
  month: string;
  placements: number;
  applications: number;
  companies: number;
}

export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: NotificationType;
  read: boolean;
  data?: any;
  createdAt: string;
}

export type NotificationType = 
  | 'application_status' 
  | 'new_job' 
  | 'interview_scheduled' 
  | 'placement_drive' 
  | 'system' 
  | 'reminder';

export interface Message {
  id: string;
  conversationId: string;
  senderId: string;
  receiverId: string;
  content: string;
  type: MessageType;
  attachments?: Attachment[];
  read: boolean;
  createdAt: string;
}

export type MessageType = 'text' | 'file' | 'system';

export interface Attachment {
  id: string;
  name: string;
  url: string;
  type: string;
  size: number;
}

export interface Conversation {
  id: string;
  participants: string[];
  lastMessage?: Message;
  updatedAt: string;
}

// API Response Types
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    pages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}

// Form Types
export interface LoginForm {
  email: string;
  password: string;
  remember: boolean;
}

export interface RegisterForm {
  role: UserRole;
  email: string;
  password: string;
  confirmPassword: string;
  name: string;
  // Role-specific fields will be added based on role selection
  studentId?: string;
  college?: string;
  department?: string;
  batch?: string;
  companyName?: string;
  industry?: string;
  designation?: string;
}

export interface JobForm {
  title: string;
  description: string;
  requirements: string[];
  location: string;
  type: JobType;
  salaryMin: number;
  salaryMax: number;
  skillsRequired: string[];
  experience: string;
  deadline: string;
}

export interface StudentProfileForm {
  name: string;
  email: string;
  phone: string;
  college: string;
  department: string;
  batch: string;
  cgpa: number;
  skills: string[];
  projects: Project[];
  achievements: Achievement[];
}

// Component Props
export interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'accent' | 'outline' | 'ghost' | 'danger' | 'success';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  disabled?: boolean;
  fullWidth?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  children: React.ReactNode;
  className?: string;
}

export interface CardProps {
  variant?: 'default' | 'outlined' | 'elevated';
  hover?: boolean;
  padding?: 'none' | 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export interface InputProps {
  label?: string;
  placeholder?: string;
  type?: string;
  value?: string;
  error?: string;
  helperText?: string;
  required?: boolean;
  disabled?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  onChange?: (value: string) => void;
  className?: string;
}

// Theme Types
export interface Theme {
  mode: 'light' | 'dark';
  primary: string;
  secondary: string;
  accent: string;
}

// Navigation Types
export interface NavItem {
  id: string;
  label: string;
  path: string;
  icon?: React.ReactNode;
  children?: NavItem[];
  permissions?: string[];
}