import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Briefcase,
  Users,
  Calendar,
  Clock,
  MapPin,
  Building2,
  FileText,
  Eye,
  Edit,
  Trash2,
  MoreVertical,
  TrendingUp,
  ChevronRight,
  Plus,
  Filter,
  Search,
  Download,
  UserCheck,
  XCircle,
  AlertCircle,
  CheckCircle
} from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { Card } from '../../components/ui'

interface JobPosting {
  id: string
  title: string
  department: string
  location: string
  type: 'Full-time' | 'Part-time' | 'Internship' | 'Contract'
  postedOn: string
  deadline: string
  status: 'Active' | 'Closed' | 'Draft'
  applicants: number
  shortlisted: number
  interviewed: number
  salary?: string
  experience: string
}

interface RecentActivity {
  id: string
  type: 'application' | 'interview' | 'hire' | 'rejection'
  message: string
  time: string
  icon: React.ReactNode
}

const CompanyDashboardHome: React.FC = () => {
  const navigate = useNavigate()
  const [selectedJob, setSelectedJob] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState<'All' | 'Active' | 'Closed' | 'Draft'>('All')

  const jobPostings: JobPosting[] = [
    {
      id: '1',
      title: 'Senior Software Engineer',
      department: 'Engineering',
      location: 'Chennai, India',
      type: 'Full-time',
      postedOn: '2024-01-15',
      deadline: '2024-02-15',
      status: 'Active',
      applicants: 127,
      shortlisted: 23,
      interviewed: 8,
      salary: '₹12-18 LPA',
      experience: '3-5 years'
    },
    {
      id: '2',
      title: 'Product Designer',
      department: 'Design',
      location: 'Remote',
      type: 'Full-time',
      postedOn: '2024-01-10',
      deadline: '2024-02-10',
      status: 'Active',
      applicants: 89,
      shortlisted: 15,
      interviewed: 5,
      salary: '₹8-12 LPA',
      experience: '2-4 years'
    },
    {
      id: '3',
      title: 'Marketing Intern',
      department: 'Marketing',
      location: 'Bangalore, India',
      type: 'Internship',
      postedOn: '2024-01-05',
      deadline: '2024-01-30',
      status: 'Active',
      applicants: 156,
      shortlisted: 30,
      interviewed: 12,
      salary: '₹25,000/month',
      experience: 'Fresher'
    },
    {
      id: '4',
      title: 'Data Analyst',
      department: 'Analytics',
      location: 'Chennai, India',
      type: 'Full-time',
      postedOn: '2023-12-20',
      deadline: '2024-01-20',
      status: 'Closed',
      applicants: 98,
      shortlisted: 18,
      interviewed: 10,
      salary: '₹6-10 LPA',
      experience: '1-3 years'
    },
    {
      id: '5',
      title: 'DevOps Engineer',
      department: 'Engineering',
      location: 'Hybrid',
      type: 'Contract',
      postedOn: '2024-01-18',
      deadline: '2024-02-28',
      status: 'Draft',
      applicants: 0,
      shortlisted: 0,
      interviewed: 0,
      salary: '₹15-20 LPA',
      experience: '4-6 years'
    }
  ]

  const recentActivities: RecentActivity[] = [
    {
      id: '1',
      type: 'application',
      message: 'New application received for Senior Software Engineer',
      time: '5 minutes ago',
      icon: <FileText className="w-4 h-4 text-blue-600" />
    },
    {
      id: '2',
      type: 'interview',
      message: 'Interview scheduled with Rahul Kumar for Product Designer',
      time: '1 hour ago',
      icon: <Calendar className="w-4 h-4 text-green-600" />
    },
    {
      id: '3',
      type: 'hire',
      message: 'Priya Sharma accepted offer for Data Analyst position',
      time: '3 hours ago',
      icon: <CheckCircle className="w-4 h-4 text-emerald-600" />
    },
    {
      id: '4',
      type: 'rejection',
      message: '5 candidates moved to rejected status for Marketing Intern',
      time: '5 hours ago',
      icon: <XCircle className="w-4 h-4 text-red-600" />
    },
    {
      id: '5',
      type: 'application',
      message: '12 new applications for Marketing Intern position',
      time: '1 day ago',
      icon: <FileText className="w-4 h-4 text-blue-600" />
    }
  ]

  const filteredJobs = jobPostings.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          job.department.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filterStatus === 'All' || job.status === filterStatus
    return matchesSearch && matchesFilter
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active':
        return 'bg-green-100 text-green-800'
      case 'Closed':
        return 'bg-red-100 text-red-800'
      case 'Draft':
        return 'bg-gray-100 text-gray-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getDeadlineStatus = (deadline: string) => {
    const deadlineDate = new Date(deadline)
    const today = new Date()
    const daysLeft = Math.ceil((deadlineDate.getTime() - today.getTime()) / (1000 * 3600 * 24))
    
    if (daysLeft < 0) return { text: 'Expired', color: 'text-red-600' }
    if (daysLeft <= 7) return { text: `${daysLeft} days left`, color: 'text-orange-600' }
    return { text: `${daysLeft} days left`, color: 'text-gray-600' }
  }

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-8 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold mb-2">Recruitment Dashboard</h2>
            <p className="text-blue-100">
              Manage your hiring pipeline and track recruitment progress
            </p>
          </div>
          <button
            onClick={() => navigate('/company/post-job')}
            className="flex items-center space-x-2 px-6 py-3 bg-white text-blue-600 rounded-lg hover:bg-blue-50 transition-colors"
          >
            <Plus className="w-5 h-5" />
            <span className="font-medium">Post New Job</span>
          </button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Applicants</p>
              <p className="text-2xl font-bold text-gray-900">470</p>
              <p className="text-xs text-green-600 flex items-center mt-1">
                <TrendingUp className="w-3 h-3 mr-1" />
                +23% this week
              </p>
            </div>
            <Users className="w-8 h-8 text-blue-600" />
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Interviews Scheduled</p>
              <p className="text-2xl font-bold text-gray-900">35</p>
              <p className="text-xs text-gray-500 mt-1">8 today</p>
            </div>
            <Calendar className="w-8 h-8 text-green-600" />
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Offers Sent</p>
              <p className="text-2xl font-bold text-gray-900">12</p>
              <p className="text-xs text-gray-500 mt-1">3 accepted</p>
            </div>
            <CheckCircle className="w-8 h-8 text-emerald-600" />
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Avg. Time to Hire</p>
              <p className="text-2xl font-bold text-gray-900">18 days</p>
              <p className="text-xs text-orange-600 flex items-center mt-1">
                <AlertCircle className="w-3 h-3 mr-1" />
                -2 days improvement
              </p>
            </div>
            <Clock className="w-8 h-8 text-orange-600" />
          </div>
        </Card>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Job Postings Section - 2 columns */}
        <div className="lg:col-span-2">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Active Job Postings</h3>
              <div className="flex items-center space-x-2">
                {/* Search */}
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search jobs..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {/* Filter */}
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value as any)}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="All">All Status</option>
                  <option value="Active">Active</option>
                  <option value="Closed">Closed</option>
                  <option value="Draft">Draft</option>
                </select>
              </div>
            </div>

            {/* Job Cards */}
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {filteredJobs.map((job) => (
                <motion.div
                  key={job.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`border rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer ${
                    selectedJob === job.id ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
                  }`}
                  onClick={() => setSelectedJob(job.id)}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h4 className="font-semibold text-gray-900">{job.title}</h4>
                        <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(job.status)}`}>
                          {job.status}
                        </span>
                      </div>

                      <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-3">
                        <span className="flex items-center">
                          <Building2 className="w-4 h-4 mr-1" />
                          {job.department}
                        </span>
                        <span className="flex items-center">
                          <MapPin className="w-4 h-4 mr-1" />
                          {job.location}
                        </span>
                        <span className="flex items-center">
                          <Briefcase className="w-4 h-4 mr-1" />
                          {job.type}
                        </span>
                        <span className="flex items-center">
                          <Clock className="w-4 h-4 mr-1" />
                          {getDeadlineStatus(job.deadline).text}
                        </span>
                      </div>

                      <div className="flex items-center space-x-6 text-sm">
                        <span className="flex items-center text-gray-700">
                          <Users className="w-4 h-4 mr-1 text-blue-600" />
                          {job.applicants} applicants
                        </span>
                        <span className="flex items-center text-gray-700">
                          <UserCheck className="w-4 h-4 mr-1 text-green-600" />
                          {job.shortlisted} shortlisted
                        </span>
                        <span className="flex items-center text-gray-700">
                          <Calendar className="w-4 h-4 mr-1 text-purple-600" />
                          {job.interviewed} interviewed
                        </span>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          navigate(`/company/jobs/${job.id}/applications`)
                        }}
                        className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                        title="View Applications"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          navigate(`/company/jobs/${job.id}/edit`)
                        }}
                        className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                        title="Edit Job"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          // Handle delete
                        }}
                        className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                        title="More Options"
                      >
                        <MoreVertical className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* View All Button */}
            <div className="mt-4 pt-4 border-t border-gray-200">
              <button
                onClick={() => navigate('/company/jobs')}
                className="w-full flex items-center justify-center space-x-2 py-2 text-blue-600 hover:text-blue-700 transition-colors"
              >
                <span>View All Job Postings</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </Card>
        </div>

        {/* Recent Activities - 1 column */}
        <div className="lg:col-span-1">
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activities</h3>
            
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-start space-x-3 pb-3 border-b border-gray-100 last:border-0">
                  <div className="p-2 bg-gray-50 rounded-lg">
                    {activity.icon}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-800">{activity.message}</p>
                    <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4 pt-4 border-t border-gray-200">
              <button className="w-full text-center text-sm text-blue-600 hover:text-blue-700 transition-colors">
                View All Activities
              </button>
            </div>
          </Card>

          {/* Quick Actions Card */}
          <Card className="p-6 mt-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
            
            <div className="space-y-3">
              <button
                onClick={() => navigate('/company/post-job')}
                className="w-full flex items-center justify-between p-3 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors"
              >
                <span className="flex items-center">
                  <Plus className="w-4 h-4 mr-2" />
                  Post New Job
                </span>
                <ChevronRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => navigate('/company/applicants')}
                className="w-full flex items-center justify-between p-3 bg-gray-50 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <span className="flex items-center">
                  <Users className="w-4 h-4 mr-2" />
                  Review Applications
                </span>
                <ChevronRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => navigate('/company/interviews')}
                className="w-full flex items-center justify-between p-3 bg-gray-50 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <span className="flex items-center">
                  <Calendar className="w-4 h-4 mr-2" />
                  Schedule Interview
                </span>
                <ChevronRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => navigate('/company/analytics')}
                className="w-full flex items-center justify-between p-3 bg-gray-50 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <span className="flex items-center">
                  <Download className="w-4 h-4 mr-2" />
                  Download Report
                </span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default CompanyDashboardHome