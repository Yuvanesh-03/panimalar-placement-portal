import React, { useState } from 'react'
import { Outlet, useNavigate, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  LayoutDashboard,
  Briefcase,
  Users,
  Calendar,
  BarChart3,
  Building2,
  Bell,
  Settings,
  Menu,
  X,
  ChevronLeft,
  FileText,
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
  Target
} from 'lucide-react'
import { useAppDispatch, useAppSelector } from '../store'
import { logoutUser } from '../store/slices/authSlice'

interface MetricCardProps {
  title: string
  value: string | number
  change?: number
  icon: React.ReactNode
  color: string
}

const MetricCard: React.FC<MetricCardProps> = ({ title, value, change, icon, color }) => {
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
              change > 0 ? 'text-green-600' : 'text-red-600'
            }`}>
              <TrendingUp className="w-3 h-3 mr-1" />
              {change > 0 ? '+' : ''}{change}% from last month
            </p>
          )}
        </div>
        <div className={`w-12 h-12 rounded-lg ${color} flex items-center justify-center`}>
          {icon}
        </div>
      </div>
    </motion.div>
  )
}

const CompanyDashboard: React.FC = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const dispatch = useAppDispatch()
  const { user } = useAppSelector((state) => state.auth)
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [notifications, _setNotifications] = useState([
    { id: 1, type: 'application', message: '20 new applications for Software Engineer', time: '5 min ago', unread: true },
    { id: 2, type: 'interview', message: 'Interview with John Doe scheduled tomorrow at 11 AM', time: '1 hour ago', unread: true },
    { id: 3, type: 'system', message: 'Monthly recruitment report is ready', time: '3 hours ago', unread: false },
  ])
  const [showNotifications, setShowNotifications] = useState(false)

  const navigationItems = [
    { 
      id: 'dashboard', 
      label: 'Dashboard', 
      icon: <LayoutDashboard className="w-5 h-5" />, 
      path: '/company',
      badge: null 
    },
    { 
      id: 'post-job', 
      label: 'Post a Job', 
      icon: <Plus className="w-5 h-5" />, 
      path: '/company/post-job',
      badge: null 
    },
    { 
      id: 'jobs', 
      label: 'Manage Jobs', 
      icon: <Briefcase className="w-5 h-5" />, 
      path: '/company/jobs',
      badge: '5 Active' 
    },
    { 
      id: 'applications', 
      label: 'Applications', 
      icon: <FileText className="w-5 h-5" />, 
      path: '/company/applicants',
      badge: '127 New' 
    },
    { 
      id: 'shortlisted', 
      label: 'Shortlisted', 
      icon: <UserCheck className="w-5 h-5" />, 
      path: '/company/shortlisted',
      badge: '23' 
    },
    { 
      id: 'interviews', 
      label: 'Interview Schedule', 
      icon: <Calendar className="w-5 h-5" />, 
      path: '/company/interviews',
      badge: '8 Today' 
    },
    { 
      id: 'analytics', 
      label: 'Analytics & Reports', 
      icon: <BarChart3 className="w-5 h-5" />, 
      path: '/company/analytics',
      badge: null 
    },
    { 
      id: 'profile', 
      label: 'Company Profile', 
      icon: <Building2 className="w-5 h-5" />, 
      path: '/company/profile',
      badge: null 
    },
    { 
      id: 'messages', 
      label: 'Messages', 
      icon: <MessageSquare className="w-5 h-5" />, 
      path: '/company/messages',
      badge: '12' 
    },
  ]

  const metrics = [
    {
      title: 'Active Job Postings',
      value: '12',
      change: 20,
      icon: <Briefcase className="w-6 h-6 text-blue-600" />,
      color: 'bg-blue-50'
    },
    {
      title: 'Total Applications',
      value: '486',
      change: 35,
      icon: <FileText className="w-6 h-6 text-emerald-600" />,
      color: 'bg-emerald-50'
    },
    {
      title: 'Shortlisted Candidates',
      value: '73',
      change: -5,
      icon: <UserCheck className="w-6 h-6 text-purple-600" />,
      color: 'bg-purple-50'
    },
    {
      title: 'Interviews Today',
      value: '8',
      change: 0,
      icon: <Calendar className="w-6 h-6 text-orange-600" />,
      color: 'bg-orange-50'
    },
  ]

  const handleLogout = () => {
    dispatch(logoutUser())
    navigate('/auth/login')
  }

  const isActive = (path: string) => {
    if (path === '/company' && location.pathname === '/company') {
      return true
    }
    return location.pathname.startsWith(path) && path !== '/company'
  }

  return (
    <div className="min-h-screen bg-gray-50">
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

      <div className="flex h-screen overflow-hidden">
        {/* Sidebar */}
        <motion.aside
          initial={false}
          animate={{ 
            width: sidebarCollapsed ? 80 : 280,
            x: mobileMenuOpen ? 0 : -280
          }}
          className={`fixed lg:static inset-y-0 left-0 z-50 bg-white border-r border-gray-200 flex flex-col transition-all duration-300 ${
            mobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
          }`}
        >
          {/* Sidebar Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center">
                <Building2 className="w-6 h-6 text-white" />
              </div>
              {!sidebarCollapsed && (
                <div>
                  <h2 className="text-lg font-semibold text-gray-900">Company Portal</h2>
                  <p className="text-xs text-gray-500">Recruitment Hub</p>
                </div>
              )}
            </div>
            <button
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className="hidden lg:block p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              {sidebarCollapsed ? 
                <Menu className="w-5 h-5 text-gray-600" /> : 
                <ChevronLeft className="w-5 h-5 text-gray-600" />
              }
            </button>
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <X className="w-5 h-5 text-gray-600" />
            </button>
          </div>

          {/* Company Info */}
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-100 to-blue-100 rounded-full flex items-center justify-center">
                <span className="text-lg font-bold text-blue-700">
                  {user?.companyName?.charAt(0) || 'C'}
                </span>
              </div>
              {!sidebarCollapsed && (
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {user?.companyName || 'Tech Corp'}
                  </p>
                  <p className="text-xs text-gray-500 truncate">
                    {user?.email || 'hr@techcorp.com'}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto py-4">
            <div className="px-3 space-y-1">
              {navigationItems.map((item) => (
                <motion.button
                  key={item.id}
                  onClick={() => {
                    navigate(item.path)
                    setMobileMenuOpen(false)
                  }}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 group ${
                    isActive(item.path)
                      ? 'bg-blue-50 text-blue-700'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                  whileHover={{ x: sidebarCollapsed ? 0 : 4 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex items-center space-x-3">
                    <span className={isActive(item.path) ? 'text-blue-600' : 'text-gray-400 group-hover:text-gray-600'}>
                      {item.icon}
                    </span>
                    {!sidebarCollapsed && (
                      <span className="truncate">{item.label}</span>
                    )}
                  </div>
                  {!sidebarCollapsed && item.badge && (
                    <span className={`px-2 py-0.5 text-xs rounded-full ${
                      isActive(item.path)
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-600'
                    }`}>
                      {item.badge}
                    </span>
                  )}
                </motion.button>
              ))}
            </div>
          </nav>

          {/* Sidebar Footer */}
          <div className="p-4 border-t border-gray-200 space-y-2">
            <button
              onClick={() => navigate('/company/settings')}
              className="w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors"
            >
              <Settings className="w-5 h-5" />
              {!sidebarCollapsed && <span>Settings</span>}
            </button>
            
            <button
              onClick={handleLogout}
              className="w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 transition-colors"
            >
              <LogOut className="w-5 h-5" />
              {!sidebarCollapsed && <span>Logout</span>}
            </button>
          </div>
        </motion.aside>

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Top Header */}
          <header className="bg-white border-b border-gray-200 px-4 lg:px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => setMobileMenuOpen(true)}
                  className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <Menu className="w-5 h-5 text-gray-600" />
                </button>
                
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">
                    Welcome back, {user?.companyName || 'Tech Corp'} HR Team
                  </h1>
                  <p className="text-sm text-gray-500 mt-1">
                    Manage your recruitment process efficiently
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                {/* Search */}
                <div className="hidden md:block relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search candidates, jobs..."
                    className="w-64 pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                {/* Notifications */}
                <div className="relative">
                  <button
                    onClick={() => setShowNotifications(!showNotifications)}
                    className="relative p-2 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <Bell className="w-5 h-5 text-gray-600" />
                    {notifications.filter(n => n.unread).length > 0 && (
                      <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
                    )}
                  </button>

                  {/* Notifications Dropdown */}
                  <AnimatePresence>
                    {showNotifications && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 z-50"
                      >
                        <div className="p-4 border-b border-gray-200">
                          <div className="flex items-center justify-between">
                            <h3 className="text-sm font-semibold text-gray-900">Notifications</h3>
                            <button className="text-xs text-blue-600 hover:text-blue-700">
                              Mark all as read
                            </button>
                          </div>
                        </div>
                        <div className="max-h-96 overflow-y-auto">
                          {notifications.map((notification) => (
                            <div
                              key={notification.id}
                              className={`p-4 border-b border-gray-100 hover:bg-gray-50 cursor-pointer ${
                                notification.unread ? 'bg-blue-50' : ''
                              }`}
                            >
                              <div className="flex items-start space-x-3">
                                <div className={`w-2 h-2 rounded-full mt-2 ${
                                  notification.type === 'application' ? 'bg-blue-500' :
                                  notification.type === 'interview' ? 'bg-green-500' :
                                  'bg-gray-400'
                                }`}></div>
                                <div className="flex-1">
                                  <p className="text-sm text-gray-800">{notification.message}</p>
                                  <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                        <div className="p-4 border-t border-gray-200">
                          <button className="w-full text-center text-sm text-blue-600 hover:text-blue-700 font-medium">
                            View all notifications
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Quick Actions */}
                <button 
                  onClick={() => navigate('/company/post-job')}
                  className="hidden md:flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  <span className="text-sm font-medium">Post New Job</span>
                </button>
              </div>
            </div>
          </header>

          {/* Metrics Overview */}
          <div className="px-4 lg:px-6 py-6 bg-gradient-to-r from-blue-50 to-indigo-50">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {metrics.map((metric, index) => (
                <MetricCard key={index} {...metric} />
              ))}
            </div>
          </div>

          {/* Main Content */}
          <main className="flex-1 overflow-y-auto px-4 lg:px-6 py-6">
            <Outlet />
          </main>

          {/* Quick Actions Toolbar */}
          <div className="bg-white border-t border-gray-200 px-4 lg:px-6 py-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Clock className="w-4 h-4" />
                <span>Last updated: {new Date().toLocaleTimeString()}</span>
              </div>
              <div className="flex items-center space-x-2">
                <button className="px-3 py-1.5 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors">
                  <Download className="w-4 h-4 inline mr-2" />
                  Export Report
                </button>
                <button className="px-3 py-1.5 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors">
                  <Filter className="w-4 h-4 inline mr-2" />
                  Filter
                </button>
                <button 
                  onClick={() => navigate('/company/interviews')}
                  className="px-3 py-1.5 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <Calendar className="w-4 h-4 inline mr-2" />
                  Schedule Interview
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CompanyDashboard
