import React, { useState } from 'react'
import { Outlet, useNavigate, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  LayoutDashboard,
  Users,
  Building2,
  Briefcase,
  FileText,
  Calendar,
  BarChart3,
  Bell,
  Settings,
  Menu,
  X,
  ChevronLeft,
  GraduationCap,
  UserCheck,
  TrendingUp,
  Clock,
  Search,
  Filter,
  Download,
  Plus,
  LogOut,
  MessageSquare,
  Award,
  Target,
  CheckCircle,
  AlertCircle,
  Eye,
  BookOpen,
  Zap,
  Globe,
  Headphones,
  Shield,
  Database
} from 'lucide-react'
import { useAppDispatch, useAppSelector } from '../store'
import { logoutUser } from '../store/slices/authSlice'

interface MetricCardProps {
  title: string
  value: string | number
  change?: number
  icon: React.ReactNode
  color: string
  subtitle?: string
}

const MetricCard: React.FC<MetricCardProps> = ({ title, value, change, icon, color, subtitle }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="bg-white rounded-xl shadow-sm border border-gray-100 p-6"
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-600 mb-1">{title}</p>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
          {change !== undefined && (
            <p className={`text-xs mt-2 flex items-center ${
              change > 0 ? 'text-green-600' : change < 0 ? 'text-red-600' : 'text-gray-600'
            }`}>
              <TrendingUp className="w-3 h-3 mr-1" />
              {change > 0 ? '+' : ''}{change}% {subtitle || 'from last month'}
            </p>
          )}
          {subtitle && change === undefined && (
            <p className="text-xs mt-1 text-gray-500">{subtitle}</p>
          )}
        </div>
        <div className={`w-12 h-12 rounded-lg ${color} flex items-center justify-center`}>
          {icon}
        </div>
      </div>
    </motion.div>
  )
}

const OfficerDashboard: React.FC = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const dispatch = useAppDispatch()
  const { user } = useAppSelector((state) => state.auth)
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [notifications, _setNotifications] = useState([
    { id: 1, type: 'student', message: '25 students have incomplete resumes', time: '5 min ago', unread: true },
    { id: 2, type: 'company', message: 'TCS scheduled campus drive for next week', time: '1 hour ago', unread: true },
    { id: 3, type: 'system', message: 'Monthly placement report is ready', time: '2 hours ago', unread: false },
    { id: 4, type: 'application', message: '150 new applications received today', time: '3 hours ago', unread: true },
  ])
  const [showNotifications, setShowNotifications] = useState(false)

  const navigationItems = [
    { 
      id: 'dashboard', 
      label: 'Dashboard Overview', 
      icon: <LayoutDashboard className="w-5 h-5" />, 
      path: '/officer',
      badge: null 
    },
    { 
      id: 'students', 
      label: 'Student Management', 
      icon: <GraduationCap className="w-5 h-5" />, 
      path: '/officer/students',
      badge: '1,234' 
    },
    { 
      id: 'companies', 
      label: 'Company Management', 
      icon: <Building2 className="w-5 h-5" />, 
      path: '/officer/companies',
      badge: '67 Active' 
    },
    { 
      id: 'jobs', 
      label: 'Job Postings', 
      icon: <Briefcase className="w-5 h-5" />, 
      path: '/officer/jobs',
      badge: '45 Pending' 
    },
    { 
      id: 'applications', 
      label: 'Application Tracking', 
      icon: <FileText className="w-5 h-5" />, 
      path: '/officer/applications',
      badge: '2,456' 
    },
    { 
      id: 'interviews', 
      label: 'Interview Scheduler', 
      icon: <Calendar className="w-5 h-5" />, 
      path: '/officer/interviews',
      badge: '28 Today' 
    },
    { 
      id: 'drives', 
      label: 'Placement Drives', 
      icon: <Users className="w-5 h-5" />, 
      path: '/officer/drives',
      badge: '8 Upcoming' 
    },
    { 
      id: 'reports', 
      label: 'Placement Reports', 
      icon: <BarChart3 className="w-5 h-5" />, 
      path: '/officer/reports',
      badge: null 
    },
    { 
      id: 'analytics', 
      label: 'Analytics', 
      icon: <TrendingUp className="w-5 h-5" />, 
      path: '/officer/analytics',
      badge: null 
    },
    { 
      id: 'messages', 
      label: 'Communications', 
      icon: <MessageSquare className="w-5 h-5" />, 
      path: '/officer/messages',
      badge: '47' 
    },
    { 
      id: 'settings', 
      label: 'Settings', 
      icon: <Settings className="w-5 h-5" />, 
      path: '/officer/settings',
      badge: null 
    },
  ]

  // Key Metrics for Officer Dashboard
  const keyMetrics = [
    {
      title: 'Total Students',
      value: '1,234',
      change: 8,
      icon: <GraduationCap className="w-6 h-6 text-blue-600" />,
      color: 'bg-blue-50',
      subtitle: 'Registered'
    },
    {
      title: 'Active Companies',
      value: '67',
      change: 12,
      icon: <Building2 className="w-6 h-6 text-emerald-600" />,
      color: 'bg-emerald-50',
      subtitle: 'Recruiting'
    },
    {
      title: 'Job Postings',
      value: '156',
      change: 25,
      icon: <Briefcase className="w-6 h-6 text-purple-600" />,
      color: 'bg-purple-50',
      subtitle: 'This Season'
    },
    {
      title: 'Applications',
      value: '4,567',
      change: 35,
      icon: <FileText className="w-6 h-6 text-amber-600" />,
      color: 'bg-amber-50',
      subtitle: 'Submitted'
    },
    {
      title: 'Shortlisted',
      value: '892',
      change: 18,
      icon: <UserCheck className="w-6 h-6 text-indigo-600" />,
      color: 'bg-indigo-50',
      subtitle: 'Candidates'
    },
    {
      title: 'Offers Made',
      value: '234',
      change: 22,
      icon: <Award className="w-6 h-6 text-rose-600" />,
      color: 'bg-rose-50',
      subtitle: 'Total Offers'
    },
    {
      title: 'Placement Rate',
      value: '78%',
      change: 5,
      icon: <Target className="w-6 h-6 text-cyan-600" />,
      color: 'bg-cyan-50',
      subtitle: 'Overall Success'
    },
    {
      title: 'Avg. Package',
      value: '₹6.8L',
      change: 15,
      icon: <TrendingUp className="w-6 h-6 text-green-600" />,
      color: 'bg-green-50',
      subtitle: 'CTC'
    },
  ]

  const handleLogout = () => {
    dispatch(logoutUser())
    navigate('/auth/login')
  }

  const isActive = (path: string) => {
    if (path === '/officer' && location.pathname === '/officer') {
      return true
    }
    return location.pathname.startsWith(path) && path !== '/officer'
  }

  const unreadCount = notifications.filter(n => n.unread).length

  return (
    <div className="h-screen w-full bg-gray-50 flex overflow-hidden">
      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
            onClick={() => setMobileMenuOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.div
        initial={false}
        animate={{
          width: sidebarCollapsed ? 80 : 280,
          transition: { duration: 0.3, ease: "easeInOut" }
        }}
        className={`fixed left-0 top-0 h-full bg-white border-r border-gray-200 z-30 lg:relative lg:translate-x-0 flex-shrink-0 flex flex-col ${
          mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:flex transition-transform duration-300`}
      >
        {/* Sidebar Header */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            {!sidebarCollapsed && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex items-center space-x-3"
              >
                <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-emerald-600 rounded-xl flex items-center justify-center">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-gray-900">TPO Portal</h2>
                  <p className="text-sm text-gray-600">Officer Dashboard</p>
                </div>
              </motion.div>
            )}
            <button
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className="hidden lg:flex w-8 h-8 items-center justify-center rounded-lg hover:bg-gray-100 transition-colors"
            >
              <ChevronLeft className={`w-5 h-5 transition-transform duration-300 ${
                sidebarCollapsed ? 'rotate-180' : ''
              }`} />
            </button>
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="lg:hidden w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-2 flex-1 overflow-y-auto">
          {navigationItems.map((item) => (
            <motion.button
              key={item.id}
              onClick={() => {
                navigate(item.path)
                setMobileMenuOpen(false)
              }}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 text-left ${
                isActive(item.path)
                  ? 'bg-blue-50 text-blue-700 border-l-4 border-blue-600'
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
              whileHover={{ x: isActive(item.path) ? 0 : 4 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className={`flex-shrink-0 ${
                isActive(item.path) ? 'text-blue-600' : 'text-gray-500'
              }`}>
                {item.icon}
              </div>
              {!sidebarCollapsed && (
                <>
                  <span className="font-medium">{item.label}</span>
                  {item.badge && (
                    <span className={`ml-auto text-xs px-2 py-1 rounded-full ${
                      isActive(item.path)
                        ? 'bg-blue-100 text-blue-700'
                        : 'bg-gray-100 text-gray-600'
                    }`}>
                      {item.badge}
                    </span>
                  )}
                </>
              )}
            </motion.button>
          ))}
        </nav>

        {/* User Profile */}
        {!sidebarCollapsed && (
          <div className="p-4 border-t border-gray-200 mt-auto">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                <span className="text-white font-semibold text-sm">
                  {user?.name?.split(' ').map(n => n[0]).join('') || 'DA'}
                </span>
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">
                  {user?.name || 'Dr. Anil Sharma'}
                </p>
                <p className="text-xs text-gray-500">Placement Officer</p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="w-full flex items-center space-x-2 px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            >
              <LogOut className="w-4 h-4" />
              <span className="text-sm">Logout</span>
            </button>
          </div>
        )}
      </motion.div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top Header */}
        <div className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setMobileMenuOpen(true)}
                className="lg:hidden w-10 h-10 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors"
              >
                <Menu className="w-5 h-5" />
              </button>
              
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  Welcome, {user?.name || 'Dr. Anil Sharma'} (Placement Officer)
                </h1>
                <p className="text-gray-600 mt-1">
                  Monitor and manage the complete placement ecosystem
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              {/* Quick Actions */}
              <button className="hidden md:flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors">
                <Plus className="w-4 h-4" />
                <span>Quick Action</span>
              </button>

              {/* Notifications */}
              <div className="relative">
                <button
                  onClick={() => setShowNotifications(!showNotifications)}
                  className="relative w-10 h-10 flex items-center justify-center rounded-xl hover:bg-gray-100 transition-colors"
                >
                  <Bell className="w-5 h-5 text-gray-700" />
                  {unreadCount > 0 && (
                    <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                      {unreadCount > 9 ? '9+' : unreadCount}
                    </span>
                  )}
                </button>

                {/* Notifications Dropdown */}
                <AnimatePresence>
                  {showNotifications && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-lg border border-gray-200 z-50"
                    >
                      <div className="p-4 border-b border-gray-100">
                        <h3 className="font-semibold text-gray-900">Notifications</h3>
                      </div>
                      <div className="max-h-96 overflow-y-auto">
                        {notifications.map((notification) => (
                          <div
                            key={notification.id}
                            className={`p-4 border-b border-gray-50 hover:bg-gray-50 transition-colors ${
                              notification.unread ? 'bg-blue-50/30' : ''
                            }`}
                          >
                            <div className="flex items-start space-x-3">
                              <div className={`w-2 h-2 rounded-full mt-2 ${
                                notification.unread ? 'bg-blue-500' : 'bg-gray-300'
                              }`} />
                              <div className="flex-1">
                                <p className="text-sm text-gray-900">{notification.message}</p>
                                <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="p-4 border-t border-gray-100">
                        <button className="w-full text-center text-blue-600 hover:text-blue-700 text-sm font-medium">
                          View All Notifications
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-6">
          {location.pathname === '/officer' ? (
            <div className="space-y-6">
              {/* Placement Overview Metrics */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {keyMetrics.map((metric, index) => (
                  <MetricCard key={index} {...metric} />
                ))}
              </div>

              {/* Quick Stats Row */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Placement Overview */}
                <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-semibold text-gray-900">Placement Overview</h3>
                    <div className="flex space-x-2">
                      <button className="px-3 py-1 text-sm bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200">
                        This Month
                      </button>
                      <button className="px-3 py-1 text-sm bg-blue-100 text-blue-600 rounded-lg">
                        This Season
                      </button>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="text-center p-4 bg-blue-50 rounded-lg">
                      <div className="text-2xl font-bold text-blue-600">89%</div>
                      <div className="text-sm text-gray-600">Student Participation</div>
                    </div>
                    <div className="text-center p-4 bg-emerald-50 rounded-lg">
                      <div className="text-2xl font-bold text-emerald-600">78%</div>
                      <div className="text-sm text-gray-600">Placement Success</div>
                    </div>
                    <div className="text-center p-4 bg-amber-50 rounded-lg">
                      <div className="text-2xl font-bold text-amber-600">34%</div>
                      <div className="text-sm text-gray-600">Shortlist Conversion</div>
                    </div>
                    <div className="text-center p-4 bg-purple-50 rounded-lg">
                      <div className="text-2xl font-bold text-purple-600">₹6.8L</div>
                      <div className="text-sm text-gray-600">Avg Package</div>
                    </div>
                  </div>
                </div>

                {/* Recent Activity */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                        <CheckCircle className="w-4 h-4 text-green-600" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900">TCS offer accepted</p>
                        <p className="text-xs text-gray-500">2 min ago</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                        <FileText className="w-4 h-4 text-blue-600" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900">15 new applications</p>
                        <p className="text-xs text-gray-500">5 min ago</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center">
                        <AlertCircle className="w-4 h-4 text-amber-600" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900">Resume pending approval</p>
                        <p className="text-xs text-gray-500">10 min ago</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                        <Calendar className="w-4 h-4 text-purple-600" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900">Interview scheduled</p>
                        <p className="text-xs text-gray-500">15 min ago</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Department-wise Stats */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-gray-900">Department-wise Placement Statistics</h3>
                  <button className="flex items-center space-x-2 px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                    <Download className="w-4 h-4" />
                    <span>Export Report</span>
                  </button>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="text-left p-4 font-medium text-gray-900">Department</th>
                        <th className="text-center p-4 font-medium text-gray-900">Total Students</th>
                        <th className="text-center p-4 font-medium text-gray-900">Placed</th>
                        <th className="text-center p-4 font-medium text-gray-900">Placement %</th>
                        <th className="text-center p-4 font-medium text-gray-900">Avg Package</th>
                        <th className="text-center p-4 font-medium text-gray-900">Highest Package</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        { dept: 'Computer Science', total: 120, placed: 98, percentage: 82, avg: '₹7.2L', highest: '₹42L' },
                        { dept: 'Information Technology', total: 100, placed: 78, percentage: 78, avg: '₹6.8L', highest: '₹28L' },
                        { dept: 'Electronics & Communication', total: 90, placed: 68, percentage: 76, avg: '₹6.2L', highest: '₹22L' },
                        { dept: 'Mechanical Engineering', total: 110, placed: 79, percentage: 72, avg: '₹5.8L', highest: '₹18L' },
                        { dept: 'Civil Engineering', total: 85, placed: 58, percentage: 68, avg: '₹5.2L', highest: '₹15L' }
                      ].map((row, index) => (
                        <tr key={index} className="border-b border-gray-50 hover:bg-gray-50">
                          <td className="p-4 font-medium text-gray-900">{row.dept}</td>
                          <td className="p-4 text-center text-gray-600">{row.total}</td>
                          <td className="p-4 text-center text-gray-600">{row.placed}</td>
                          <td className="p-4 text-center">
                            <span className={`px-2 py-1 rounded-full text-sm ${
                              row.percentage >= 80 ? 'bg-green-100 text-green-800' :
                              row.percentage >= 70 ? 'bg-yellow-100 text-yellow-800' :
                              'bg-red-100 text-red-800'
                            }`}>
                              {row.percentage}%
                            </span>
                          </td>
                          <td className="p-4 text-center font-medium text-gray-900">{row.avg}</td>
                          <td className="p-4 text-center font-medium text-green-600">{row.highest}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          ) : (
            <Outlet />
          )}
        </div>
      </div>
    </div>
  )
}

export default OfficerDashboard
