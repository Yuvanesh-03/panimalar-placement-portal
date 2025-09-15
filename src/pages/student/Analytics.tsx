import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  TrendingUp, 
  Target, 
  Clock, 
  Award,
  Users,
  Building,
  Calendar,
  BarChart3,
  Briefcase,
  Eye,
  Star,
  ArrowUp,
  ArrowDown,
  ChevronRight,
  MapPin,
  DollarSign,
  MessageSquare,
  Bell,
  CheckCircle,
  XCircle,
  AlertCircle,
  Zap
} from 'lucide-react'
import { Card, Button } from '../../components/ui'
import { useAppSelector } from '../../store'

const StudentAnalytics: React.FC = () => {
  const { user } = useAppSelector((state) => state.auth)
  const [timeFilter, setTimeFilter] = useState('week')
  
  // Quick Stats Data
  const quickStats = [
    {
      title: 'Applications Sent',
      value: '12',
      change: '+3',
      changeType: 'positive',
      icon: <Target className="w-6 h-6" />,
      color: 'blue',
      subtitle: 'This week'
    },
    {
      title: 'Interview Calls',
      value: '4',
      change: '+1',
      changeType: 'positive',
      icon: <Users className="w-6 h-6" />,
      color: 'emerald',
      subtitle: 'Scheduled'
    },
    {
      title: 'Profile Views',
      value: '47',
      change: '+12',
      changeType: 'positive',
      icon: <Eye className="w-6 h-6" />,
      color: 'amber',
      subtitle: 'By companies'
    },
    {
      title: 'Placement Probability',
      value: '78%',
      change: '+5%',
      changeType: 'positive',
      icon: <TrendingUp className="w-6 h-6" />,
      color: 'purple',
      subtitle: 'AI Powered'
    }
  ]

  // Recommended Jobs Data
  const recommendedJobs = [
    {
      id: 1,
      title: 'Full Stack Developer',
      company: 'Tech Mahindra',
      logo: '/api/placeholder/40/40',
      location: 'Chennai, TN',
      salary: '6-8 LPA',
      deadline: '5 days left',
      matchScore: 92,
      skills: ['React', 'Node.js', 'MongoDB']
    },
    {
      id: 2,
      title: 'Software Engineer',
      company: 'Infosys',
      logo: '/api/placeholder/40/40',
      location: 'Bangalore, KA',
      salary: '5-7 LPA',
      deadline: '8 days left',
      matchScore: 88,
      skills: ['Java', 'Spring Boot', 'MySQL']
    },
    {
      id: 3,
      title: 'Frontend Developer',
      company: 'Wipro',
      logo: '/api/placeholder/40/40',
      location: 'Hyderabad, TG',
      salary: '4-6 LPA',
      deadline: '12 days left',
      matchScore: 85,
      skills: ['React', 'TypeScript', 'CSS']
    }
  ]

  // Recent Activity Data
  const recentActivity = [
    {
      id: 1,
      type: 'application',
      title: 'Applied to Software Engineer at TCS',
      description: 'Application submitted successfully',
      time: '2 hours ago',
      status: 'pending',
      icon: <Target className="w-5 h-5" />
    },
    {
      id: 2,
      type: 'interview',
      title: 'Interview scheduled with Infosys',
      description: 'Technical round on Dec 18, 2024',
      time: '1 day ago',
      status: 'scheduled',
      icon: <Users className="w-5 h-5" />
    },
    {
      id: 3,
      type: 'offer',
      title: 'Offer received from Wipro',
      description: 'Software Developer position - 6 LPA',
      time: '3 days ago',
      status: 'received',
      icon: <Award className="w-5 h-5" />
    },
    {
      id: 4,
      type: 'profile',
      title: 'Profile viewed by Accenture',
      description: 'HR team viewed your profile',
      time: '5 days ago',
      status: 'viewed',
      icon: <Eye className="w-5 h-5" />
    }
  ]

  // Upcoming Events Data
  const upcomingEvents = [
    {
      id: 1,
      title: 'Technical Interview - Google',
      date: 'Tomorrow',
      time: '10:00 AM',
      type: 'interview',
      location: 'Online',
      urgent: true
    },
    {
      id: 2,
      title: 'Campus Drive - Microsoft',
      date: 'Dec 20, 2024',
      time: '9:00 AM',
      type: 'drive',
      location: 'Main Auditorium',
      urgent: false
    },
    {
      id: 3,
      title: 'Resume Review Session',
      date: 'Dec 22, 2024',
      time: '2:00 PM',
      type: 'session',
      location: 'Placement Cell',
      urgent: false
    }
  ]

  // Application Status Data
  const applicationStatus = {
    total: 12,
    pending: 6,
    shortlisted: 3,
    rejected: 2,
    offers: 1
  }

  return (
    <div className="w-full space-y-4 min-h-0">
        {/* Welcome Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
      className="bg-gradient-to-r from-blue-600 via-blue-700 to-emerald-600 rounded-lg p-3 text-white shadow-md mt-0"
        >
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl lg:text-2xl font-bold mb-1">
                Hi {user?.name?.split(' ')[0] || 'John'} 👋
              </h1>
              <p className="text-blue-100 text-sm lg:text-base">
                Here are today's opportunities and your placement progress
              </p>
            </div>
            <div className="hidden lg:block">
              <div className="text-right">
                <div className="text-xl font-bold">78%</div>
                <div className="text-blue-200 text-xs">Placement Score</div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Quick Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-3 lg:gap-4">
        {quickStats.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Card className="p-3 hover:shadow-lg transition-all duration-300 group cursor-pointer">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                    <div className={`p-1.5 rounded-lg bg-${stat.color}-100 group-hover:scale-110 transition-transform`}>
                      <div className={`text-${stat.color}-600`}>
                        {stat.icon}
                      </div>
                    </div>
                  </div>
                  <p className="text-lg lg:text-xl font-bold text-gray-900 mb-1">{stat.value}</p>
                  <div className="flex items-center">
                    <span className={`text-sm font-medium flex items-center ${
                      stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {stat.changeType === 'positive' ? <ArrowUp className="w-3 h-3 mr-1" /> : <ArrowDown className="w-3 h-3 mr-1" />}
                      {stat.change}
                    </span>
                    <span className="text-xs text-gray-500 ml-2">{stat.subtitle}</span>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
        </div>

        {/* Main Dashboard Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
          {/* Recommended Jobs Carousel */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="xl:col-span-2"
          >
            <Card className="p-4">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Recommended Jobs</h3>
                  <p className="text-sm text-gray-500">Personalized based on your profile</p>
                </div>
                <Button variant="ghost" size="sm">
                  View All <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
              </div>
            
            <div className="space-y-3">
              {recommendedJobs.map((job) => (
                <div key={job.id} className="border border-gray-200 rounded-lg p-3 hover:shadow-md transition-all duration-300 group">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-3 flex-1">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-emerald-500 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Building className="w-5 h-5 text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <h4 className="text-base font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                            {job.title}
                          </h4>
                          <div className="flex items-center space-x-1 text-green-600">
                            <Star className="w-3 h-3 fill-current" />
                            <span className="text-xs font-medium">{job.matchScore}%</span>
                          </div>
                        </div>
                        <p className="text-gray-700 font-medium text-sm">{job.company}</p>
                        <div className="flex items-center space-x-3 mt-1 text-xs text-gray-500">
                          <div className="flex items-center">
                            <MapPin className="w-3 h-3 mr-1" />
                            {job.location}
                          </div>
                          <div className="flex items-center">
                            <DollarSign className="w-3 h-3 mr-1" />
                            {job.salary}
                          </div>
                          <div className="flex items-center text-amber-600">
                            <Clock className="w-3 h-3 mr-1" />
                            {job.deadline}
                          </div>
                        </div>
                        <div className="flex flex-wrap gap-1 mt-2">
                          {job.skills.map((skill) => (
                            <span key={skill} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                    <Button size="sm" className="ml-3 px-3 py-1 text-xs">
                      Apply Now
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </Card>
          </motion.div>

          {/* Upcoming Events & Quick Actions */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="space-y-4"
          >
            {/* Upcoming Events */}
            <Card className="p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Upcoming Events</h3>
                <Calendar className="w-5 h-5 text-gray-400" />
              </div>
              
              <div className="space-y-3">
                {upcomingEvents.map((event) => (
                  <div key={event.id} className={`p-3 rounded-xl transition-all ${
                    event.urgent ? 'bg-red-50 border border-red-200' : 'bg-gray-50 hover:bg-gray-100'
                  }`}>
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-3">
                        <div className={`p-2 rounded-lg ${
                          event.type === 'interview' ? 'bg-blue-100' :
                          event.type === 'drive' ? 'bg-emerald-100' : 'bg-amber-100'
                        }`}>
                          <Clock className={`w-4 h-4 ${
                            event.type === 'interview' ? 'text-blue-600' :
                            event.type === 'drive' ? 'text-emerald-600' : 'text-amber-600'
                          }`} />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium text-gray-900">{event.title}</p>
                          <p className="text-xs text-gray-500">{event.date} at {event.time}</p>
                          <p className="text-xs text-gray-500">{event.location}</p>
                        </div>
                      </div>
                      {event.urgent && (
                        <div className="flex items-center space-x-1 text-red-600">
                          <AlertCircle className="w-4 h-4" />
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Application Status Overview */}
            <Card className="p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Application Status</h3>
                <BarChart3 className="w-5 h-5 text-gray-400" />
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <Target className="w-4 h-4 text-blue-600" />
                    </div>
                    <span className="text-sm font-medium text-gray-700">Total Applications</span>
                  </div>
                  <span className="text-xl font-bold text-blue-600">{applicationStatus.total}</span>
                </div>
                
                <div className="grid grid-cols-2 gap-3">
                  <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                    <div className="text-center flex-1">
                      <div className="text-lg font-bold text-yellow-600">{applicationStatus.pending}</div>
                      <div className="text-xs text-yellow-600">Pending</div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-emerald-50 rounded-lg">
                    <div className="text-center flex-1">
                      <div className="text-lg font-bold text-emerald-600">{applicationStatus.shortlisted}</div>
                      <div className="text-xs text-emerald-600">Shortlisted</div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                    <div className="text-center flex-1">
                      <div className="text-lg font-bold text-red-600">{applicationStatus.rejected}</div>
                      <div className="text-xs text-red-600">Rejected</div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                    <div className="text-center flex-1">
                      <div className="text-lg font-bold text-green-600">{applicationStatus.offers}</div>
                      <div className="text-xs text-green-600">Offers</div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>

        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <Card className="p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Recent Activity</h3>
              <Button variant="ghost" size="sm">
                View All <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </div>
            
            <div className="space-y-3">
              {recentActivity.map((activity) => (
                <div key={activity.id} className="flex items-start space-x-3 p-3 rounded-lg border border-gray-100 hover:bg-gray-50 transition-colors">
                  <div className={`p-2 rounded-full flex-shrink-0 ${
                    activity.type === 'application' ? 'bg-blue-100' :
                    activity.type === 'interview' ? 'bg-emerald-100' :
                    activity.type === 'offer' ? 'bg-amber-100' : 'bg-purple-100'
                  }`}>
                    <div className={`${
                      activity.type === 'application' ? 'text-blue-600' :
                      activity.type === 'interview' ? 'text-emerald-600' :
                      activity.type === 'offer' ? 'text-amber-600' : 'text-purple-600'
                    }`}>
                      {activity.icon}
                    </div>
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900">{activity.title}</p>
                    <p className="text-sm text-gray-600">{activity.description}</p>
                    <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                  </div>
                  
                  <div className={`px-3 py-1 rounded-full text-xs font-medium flex-shrink-0 ${
                    activity.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                    activity.status === 'scheduled' ? 'bg-blue-100 text-blue-800' :
                    activity.status === 'received' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                  }`}>
                    {activity.status === 'pending' && <Clock className="w-3 h-3 mr-1 inline" />}
                    {activity.status === 'scheduled' && <Calendar className="w-3 h-3 mr-1 inline" />}
                    {activity.status === 'received' && <CheckCircle className="w-3 h-3 mr-1 inline" />}
                    {activity.status === 'viewed' && <Eye className="w-3 h-3 mr-1 inline" />}
                    {activity.status}
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </motion.div>

        {/* AI Insights & Tips */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <Card className="p-4 bg-gradient-to-r from-purple-50 to-blue-50 border border-purple-200">
            <div className="flex items-start space-x-4">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Zap className="w-5 h-5 text-purple-600" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">AI-Powered Insights</h3>
                <div className="grid md:grid-cols-2 gap-3">
                  <div className="bg-white p-3 rounded-lg">
                    <h4 className="font-medium text-gray-900 mb-2">💡 Profile Tip</h4>
                    <p className="text-sm text-gray-600">
                      Your chances increase by 23% if you add 2 more projects to your profile.
                    </p>
                  </div>
                  <div className="bg-white p-3 rounded-lg">
                    <h4 className="font-medium text-gray-900 mb-2">🎯 Best Match</h4>
                    <p className="text-sm text-gray-600">
                      You're 15% more likely to get hired than average students in your department.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>
    </div>
  )
}

export default StudentAnalytics