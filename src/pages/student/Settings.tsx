import React, { useState } from 'react'
import { motion } from 'framer-motion'
import {
  User,
  Shield,
  Bell,
  Palette,
  Moon,
  Sun,
  Globe,
  Lock,
  Mail,
  Phone,
  Eye,
  EyeOff,
  Save,
  Check
} from 'lucide-react'
import { Card, Button, Input } from '../../components/ui'
import { useAppSelector } from '../../store'

const Settings: React.FC = () => {
  const { user } = useAppSelector((state) => state.auth)
  const [activeTab, setActiveTab] = useState('account')
  const [darkMode, setDarkMode] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)

  const [accountData, setAccountData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.profile?.phone || '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  })

  const [notifications, setNotifications] = useState({
    emailApplications: true,
    emailInterviews: true,
    emailOffers: true,
    pushApplications: true,
    pushInterviews: true,
    pushMessages: true,
    weeklyReports: false
  })

  const [privacy, setPrivacy] = useState({
    profileVisible: true,
    resumeVisible: true,
    contactVisible: false,
    skillsVisible: true
  })

  const tabs = [
    { id: 'account', label: 'Account Information', icon: <User className="w-4 h-4" /> },
    { id: 'security', label: 'Security', icon: <Shield className="w-4 h-4" /> },
    { id: 'notifications', label: 'Notifications', icon: <Bell className="w-4 h-4" /> },
    { id: 'preferences', label: 'Preferences', icon: <Palette className="w-4 h-4" /> },
  ]

  const handleSave = (section: string) => {
    // Here you would typically send the updated data to your backend
    console.log(`Saving ${section} settings`)
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Settings</h1>
        <p className="text-gray-600">Manage your account settings and preferences</p>
      </div>

      <div className="grid lg:grid-cols-4 gap-6">
        {/* Tabs Sidebar */}
        <div className="lg:col-span-1">
          <Card className="p-4">
            <nav className="space-y-2">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                    activeTab === tab.id
                      ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-600'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <span className={activeTab === tab.id ? 'text-blue-600' : 'text-gray-400'}>
                    {tab.icon}
                  </span>
                  <span className="font-medium text-sm">{tab.label}</span>
                </button>
              ))}
            </nav>
          </Card>
        </div>

        {/* Content Area */}
        <div className="lg:col-span-3">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Account Information Tab */}
            {activeTab === 'account' && (
              <Card className="p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-6">Account Information</h2>
                
                <div className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Full Name
                      </label>
                      <input
                        type="text"
                        value={accountData.name}
                        onChange={(e) => setAccountData({...accountData, name: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        value={accountData.phone}
                        onChange={(e) => setAccountData({...accountData, phone: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={accountData.email}
                      onChange={(e) => setAccountData({...accountData, email: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div className="flex justify-end">
                    <Button onClick={() => handleSave('account')} className="flex items-center space-x-2">
                      <Save className="w-4 h-4" />
                      <span>Save Changes</span>
                    </Button>
                  </div>
                </div>
              </Card>
            )}

            {/* Security Tab */}
            {activeTab === 'security' && (
              <Card className="p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-6">Security Settings</h2>
                
                <div className="space-y-6">
                  <div>
                    <h3 className="text-md font-medium text-gray-900 mb-4">Change Password</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Current Password
                        </label>
                        <div className="relative">
                          <input
                            type={showPassword ? 'text' : 'password'}
                            value={accountData.currentPassword}
                            onChange={(e) => setAccountData({...accountData, currentPassword: e.target.value})}
                            className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                          >
                            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                          </button>
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            New Password
                          </label>
                          <div className="relative">
                            <input
                              type={showNewPassword ? 'text' : 'password'}
                              value={accountData.newPassword}
                              onChange={(e) => setAccountData({...accountData, newPassword: e.target.value})}
                              className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                            <button
                              type="button"
                              onClick={() => setShowNewPassword(!showNewPassword)}
                              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                            >
                              {showNewPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                            </button>
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Confirm New Password
                          </label>
                          <input
                            type="password"
                            value={accountData.confirmPassword}
                            onChange={(e) => setAccountData({...accountData, confirmPassword: e.target.value})}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="border-t pt-6">
                    <h3 className="text-md font-medium text-gray-900 mb-4">Privacy Settings</h3>
                    <div className="space-y-3">
                      {Object.entries(privacy).map(([key, value]) => (
                        <div key={key} className="flex items-center justify-between">
                          <span className="text-sm text-gray-700">
                            {key === 'profileVisible' && 'Profile visible to companies'}
                            {key === 'resumeVisible' && 'Resume visible to recruiters'}
                            {key === 'contactVisible' && 'Contact information visible'}
                            {key === 'skillsVisible' && 'Skills visible in search'}
                          </span>
                          <button
                            onClick={() => setPrivacy({...privacy, [key]: !value})}
                            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                              value ? 'bg-blue-600' : 'bg-gray-200'
                            }`}
                          >
                            <span
                              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                                value ? 'translate-x-6' : 'translate-x-1'
                              }`}
                            />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <Button onClick={() => handleSave('security')} className="flex items-center space-x-2">
                      <Save className="w-4 h-4" />
                      <span>Update Security</span>
                    </Button>
                  </div>
                </div>
              </Card>
            )}

            {/* Notifications Tab */}
            {activeTab === 'notifications' && (
              <Card className="p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-6">Notification Preferences</h2>
                
                <div className="space-y-6">
                  <div>
                    <h3 className="text-md font-medium text-gray-900 mb-4">Email Notifications</h3>
                    <div className="space-y-3">
                      {[
                        { key: 'emailApplications', label: 'Application status updates' },
                        { key: 'emailInterviews', label: 'Interview reminders' },
                        { key: 'emailOffers', label: 'Job offer notifications' },
                        { key: 'weeklyReports', label: 'Weekly placement reports' },
                      ].map((item) => (
                        <div key={item.key} className="flex items-center justify-between">
                          <span className="text-sm text-gray-700">{item.label}</span>
                          <button
                            onClick={() => setNotifications({...notifications, [item.key]: !notifications[item.key as keyof typeof notifications]})}
                            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                              notifications[item.key as keyof typeof notifications] ? 'bg-blue-600' : 'bg-gray-200'
                            }`}
                          >
                            <span
                              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                                notifications[item.key as keyof typeof notifications] ? 'translate-x-6' : 'translate-x-1'
                              }`}
                            />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-md font-medium text-gray-900 mb-4">Push Notifications</h3>
                    <div className="space-y-3">
                      {[
                        { key: 'pushApplications', label: 'New job applications' },
                        { key: 'pushInterviews', label: 'Interview schedules' },
                        { key: 'pushMessages', label: 'New messages' },
                      ].map((item) => (
                        <div key={item.key} className="flex items-center justify-between">
                          <span className="text-sm text-gray-700">{item.label}</span>
                          <button
                            onClick={() => setNotifications({...notifications, [item.key]: !notifications[item.key as keyof typeof notifications]})}
                            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                              notifications[item.key as keyof typeof notifications] ? 'bg-blue-600' : 'bg-gray-200'
                            }`}
                          >
                            <span
                              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                                notifications[item.key as keyof typeof notifications] ? 'translate-x-6' : 'translate-x-1'
                              }`}
                            />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <Button onClick={() => handleSave('notifications')} className="flex items-center space-x-2">
                      <Save className="w-4 h-4" />
                      <span>Save Preferences</span>
                    </Button>
                  </div>
                </div>
              </Card>
            )}

            {/* Preferences Tab */}
            {activeTab === 'preferences' && (
              <Card className="p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-6">Preferences</h2>
                
                <div className="space-y-6">
                  <div>
                    <h3 className="text-md font-medium text-gray-900 mb-4">Appearance</h3>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        {darkMode ? <Moon className="w-5 h-5 text-gray-600" /> : <Sun className="w-5 h-5 text-gray-600" />}
                        <span className="text-sm text-gray-700">Dark mode</span>
                      </div>
                      <button
                        onClick={() => setDarkMode(!darkMode)}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                          darkMode ? 'bg-blue-600' : 'bg-gray-200'
                        }`}
                      >
                        <span
                          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                            darkMode ? 'translate-x-6' : 'translate-x-1'
                          }`}
                        />
                      </button>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-md font-medium text-gray-900 mb-4">Language</h3>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                      <option value="en">English</option>
                      <option value="hi">Hindi</option>
                      <option value="ta">Tamil</option>
                    </select>
                  </div>

                  <div className="flex justify-end">
                    <Button onClick={() => handleSave('preferences')} className="flex items-center space-x-2">
                      <Save className="w-4 h-4" />
                      <span>Save Preferences</span>
                    </Button>
                  </div>
                </div>
              </Card>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default Settings