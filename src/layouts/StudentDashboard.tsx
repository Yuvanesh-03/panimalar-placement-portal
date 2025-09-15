import React from 'react'
import { Outlet, useNavigate, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { 
  User, 
  Search, 
  FileText, 
  BarChart3, 
  Bell, 
  Settings, 
  LogOut,
  Menu,
  GraduationCap,
  MessageSquare
} from 'lucide-react'
import { useAppDispatch, useAppSelector } from '../store'
import { logoutUser } from '../store/slices/authSlice'

const StudentDashboard: React.FC = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const dispatch = useAppDispatch()
  const { user } = useAppSelector((state) => state.auth)

  const navigationItems = [
    { id: 'dashboard', label: 'Dashboard', icon: <BarChart3 className="w-5 h-5" />, path: '/dashboard' },
    { id: 'profile', label: 'Profile', icon: <User className="w-5 h-5" />, path: '/dashboard/profile' },
    { id: 'jobs', label: 'Jobs', icon: <Search className="w-5 h-5" />, path: '/dashboard/jobs' },
    { id: 'applications', label: 'Applications', icon: <FileText className="w-5 h-5" />, path: '/dashboard/applications' },
    { id: 'analytics', label: 'Analytics', icon: <BarChart3 className="w-5 h-5" />, path: '/dashboard/analytics' },
    { id: 'messages', label: 'Messages', icon: <MessageSquare className="w-5 h-5" />, path: '/dashboard/messages' },
  ]

  const handleLogout = () => {
    dispatch(logoutUser())
    navigate('/auth/login')
  }

  const isActive = (path: string) => {
    if (path === '/dashboard') {
      return location.pathname === '/dashboard'
    }
    return location.pathname.startsWith(path)
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Main Content - Full width, no sidebar */}
      <div className="w-full flex flex-col h-full">
        {/* Top Bar with Navigation */}
        <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-30">
          <div className="flex items-center justify-between px-4 py-3 lg:px-6">
            <div className="flex items-center space-x-6">
              {/* Logo */}
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-emerald-600 rounded-lg flex items-center justify-center">
                  <GraduationCap className="w-5 h-5 text-white" />
                </div>
                <span className="text-lg font-semibold text-gray-900">PEC Portal</span>
              </div>
              
              {/* Navigation Links */}
              <nav className="hidden md:flex items-center space-x-1">
                {navigationItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => navigate(item.path)}
                    className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                      isActive(item.path)
                        ? 'bg-blue-50 text-blue-700'
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    }`}
                  >
                    {item.icon}
                    <span>{item.label}</span>
                  </button>
                ))}
              </nav>
            </div>

            <div className="flex items-center space-x-4">
              {/* Global Search */}
              <div className="hidden md:block relative">
                <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 w-3 h-3 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search jobs, companies, students..."
                  className="w-48 pl-8 pr-3 py-1.5 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* Notifications */}
              <button className="relative p-2 rounded-lg hover:bg-gray-100 transition-colors">
                <Bell className="w-5 h-5 text-gray-600" />
                <div className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></div>
              </button>

              {/* Settings */}
              <button 
                onClick={() => navigate('/dashboard/settings')}
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <Settings className="w-5 h-5 text-gray-600" />
              </button>

              {/* Profile Menu with Logout */}
              <div className="relative group">
                <button className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 transition-colors">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <User className="w-4 h-4 text-blue-600" />
                  </div>
                  <span className="hidden sm:block text-sm font-medium text-gray-700">
                    {user?.name?.split(' ')[0] || 'Student'}
                  </span>
                </button>
                
                {/* Dropdown Menu */}
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                  <button
                    onClick={() => navigate('/dashboard/profile')}
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-t-lg"
                  >
                    View Profile
                  </button>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 rounded-b-lg flex items-center space-x-2"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Logout</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          {/* Mobile Navigation Menu */}
          <div className="md:hidden border-t border-gray-200">
            <nav className="flex items-center justify-around py-2">
              {navigationItems.slice(0, 4).map((item) => (
                <button
                  key={item.id}
                  onClick={() => navigate(item.path)}
                  className={`flex flex-col items-center space-y-1 p-2 rounded-lg ${
                    isActive(item.path)
                      ? 'text-blue-600'
                      : 'text-gray-600'
                  }`}
                >
                  {item.icon}
                  <span className="text-xs">{item.label}</span>
                </button>
              ))}
              <button
                className="flex flex-col items-center space-y-1 p-2 rounded-lg text-gray-600"
                onClick={() => navigate('/dashboard/menu')}
              >
                <Menu className="w-5 h-5" />
                <span className="text-xs">More</span>
              </button>
            </nav>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto">
          <div className="px-4 lg:px-8 py-6 max-w-7xl mx-auto">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Outlet />
            </motion.div>
          </div>
        </main>
      </div>
    </div>
  )
}

export default StudentDashboard