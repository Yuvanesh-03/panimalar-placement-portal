import React, { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../store'
import { getCurrentUser } from '../../store/slices/authSlice'

// Public Pages
import LandingPage from '../../pages/LandingPage'
import Login from '../../pages/auth/Login'
import Register from '../../pages/auth/Register'

// Dashboard Layouts
import StudentDashboard from '../../layouts/StudentDashboard'
import CompanyDashboard from '../../layouts/CompanyDashboard'
import OfficerDashboard from '../../layouts/OfficerDashboard'

// Student Pages
import StudentProfile from '../../pages/student/Profile'
import JobSearch from '../../pages/student/JobSearch'
import Applications from '../../pages/student/Applications'
import StudentAnalytics from '../../pages/student/Analytics'
import Messages from '../../pages/student/Messages'

// Company Pages
import CompanyDashboardHome from '../../pages/company/Dashboard'
import CompanyProfile from '../../pages/company/Profile'
import PostJob from '../../pages/company/PostJob'
import Applicants from '../../pages/company/Applicants'
import CompanyAnalytics from '../../pages/company/Analytics'

// Officer Pages
import OfficerProfile from '../../pages/officer/Profile'
import ManageStudents from '../../pages/officer/ManageStudents'
import ManageCompanies from '../../pages/officer/ManageCompanies'
import PlacementDrives from '../../pages/officer/PlacementDrives'
import Reports from '../../pages/officer/Reports'

// Loading Component
const LoadingSpinner: React.FC = () => (
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-emerald-50">
    <div className="text-center space-y-4">
      <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
      <p className="text-gray-600">Loading your account...</p>
    </div>
  </div>
)

// Protected Route Component
interface ProtectedRouteProps {
  children: React.ReactNode
  allowedRoles?: string[]
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, allowedRoles }) => {
  const { isAuthenticated, user, loading } = useAppSelector((state) => state.auth)
  
  if (loading) {
    return <LoadingSpinner />
  }
  
  if (!isAuthenticated || !user) {
    return <Navigate to="/auth/login" replace />
  }
  
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    // Redirect to appropriate dashboard based on user role
    const dashboardRoute = user.role === 'student' ? '/dashboard' : 
                          user.role === 'company' ? '/company' : '/officer'
    return <Navigate to={dashboardRoute} replace />
  }
  
  return <>{children}</>
}

// Public Route Component (redirect if authenticated)
interface PublicRouteProps {
  children: React.ReactNode
}

const PublicRoute: React.FC<PublicRouteProps> = ({ children }) => {
  const { isAuthenticated, user } = useAppSelector((state) => state.auth)
  
  if (isAuthenticated && user) {
    // Redirect to appropriate dashboard based on user role
    const dashboardRoute = user.role === 'student' ? '/dashboard' : 
                          user.role === 'company' ? '/company' : '/officer'
    return <Navigate to={dashboardRoute} replace />
  }
  
  return <>{children}</>
}

const AppRouter: React.FC = () => {
  const dispatch = useAppDispatch()
  const { isAuthenticated, loading } = useAppSelector((state) => state.auth)
  
  // Check for existing session on app load
  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token && !isAuthenticated) {
      dispatch(getCurrentUser())
    }
  }, [dispatch, isAuthenticated])
  
  if (loading) {
    return <LoadingSpinner />
  }
  
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route 
          path="/" 
          element={
            <PublicRoute>
              <LandingPage />
            </PublicRoute>
          } 
        />
        
        <Route 
          path="/auth/login" 
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          } 
        />
        
        <Route 
          path="/auth/register" 
          element={
            <PublicRoute>
              <Register />
            </PublicRoute>
          } 
        />
        
        {/* Student Routes */}
        <Route 
          path="/dashboard/*" 
          element={
            <ProtectedRoute allowedRoles={['student']}>
              <StudentDashboard />
            </ProtectedRoute>
          }
        >
          <Route index element={<StudentAnalytics />} />
          <Route path="profile" element={<StudentProfile />} />
          <Route path="jobs" element={<JobSearch />} />
          <Route path="applications" element={<Applications />} />
          <Route path="analytics" element={<StudentAnalytics />} />
          <Route path="messages" element={<Messages />} />
        </Route>
        
        {/* Company Routes */}
        <Route 
          path="/company/*" 
          element={
            <ProtectedRoute allowedRoles={['company']}>
              <CompanyDashboard />
            </ProtectedRoute>
          }
        >
          <Route index element={<CompanyDashboardHome />} />
          <Route path="profile" element={<CompanyProfile />} />
          <Route path="post-job" element={<PostJob />} />
          <Route path="applicants" element={<Applicants />} />
          <Route path="analytics" element={<CompanyAnalytics />} />
        </Route>
        
        {/* Officer Routes */}
        <Route 
          path="/officer/*" 
          element={
            <ProtectedRoute allowedRoles={['officer']}>
              <OfficerDashboard />
            </ProtectedRoute>
          }
        >
          <Route index element={<Reports />} />
          <Route path="profile" element={<OfficerProfile />} />
          <Route path="students" element={<ManageStudents />} />
          <Route path="companies" element={<ManageCompanies />} />
          <Route path="drives" element={<PlacementDrives />} />
          <Route path="reports" element={<Reports />} />
        </Route>
        
        {/* Fallback Routes */}
        <Route 
          path="*" 
          element={
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-emerald-50">
              <div className="text-center space-y-4">
                <h1 className="text-4xl font-bold text-gray-900">404</h1>
                <p className="text-gray-600">Page not found</p>
                <button 
                  onClick={() => window.history.back()}
                  className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors"
                >
                  Go Back
                </button>
              </div>
            </div>
          } 
        />
      </Routes>
    </Router>
  )
}

export default AppRouter