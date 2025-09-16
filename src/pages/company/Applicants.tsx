import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Search,
  Filter,
  Download,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Clock,
  FileText,
  Eye,
  UserCheck,
  XCircle,
  Star,
  ChevronDown,
  ChevronRight,
  MoreVertical,
  Send,
  CheckCircle,
  AlertCircle,
  Briefcase,
  GraduationCap,
  Award,
  Link,
  X,
  Check,
  Trash2
} from 'lucide-react'
import { Card } from '../../components/ui'

interface Applicant {
  id: string
  name: string
  email: string
  phone: string
  location: string
  college: string
  degree: string
  cgpa: number
  skills: string[]
  experience: string
  appliedFor: string
  appliedOn: string
  status: 'Applied' | 'Screening' | 'Shortlisted' | 'Interview' | 'Selected' | 'Rejected'
  resume: string
  profileScore: number
  matchPercentage: number
  avatar?: string
  linkedin?: string
  github?: string
  portfolio?: string
  expectedSalary?: string
  noticePeriod?: string
  achievements?: string[]
}

const Applicants: React.FC = () => {
  const [applicants] = useState<Applicant[]>([
    {
      id: '1',
      name: 'Rahul Kumar',
      email: 'rahul.kumar@email.com',
      phone: '+91 98765 43210',
      location: 'Chennai, TN',
      college: 'Panimalar Engineering College',
      degree: 'B.Tech Computer Science',
      cgpa: 8.5,
      skills: ['React', 'Node.js', 'MongoDB', 'TypeScript', 'AWS'],
      experience: '1 year internship',
      appliedFor: 'Senior Software Engineer',
      appliedOn: '2024-01-15',
      status: 'Shortlisted',
      resume: 'resume_rahul.pdf',
      profileScore: 85,
      matchPercentage: 92,
      linkedin: 'linkedin.com/in/rahulkumar',
      github: 'github.com/rahulk',
      expectedSalary: '₹12 LPA',
      noticePeriod: 'Immediate',
      achievements: ['Winner - Smart India Hackathon 2023', 'Google Summer of Code 2023']
    },
    {
      id: '2',
      name: 'Priya Sharma',
      email: 'priya.sharma@email.com',
      phone: '+91 87654 32109',
      location: 'Bangalore, KA',
      college: 'Anna University',
      degree: 'B.E Information Technology',
      cgpa: 9.2,
      skills: ['Python', 'Django', 'PostgreSQL', 'Docker', 'Kubernetes'],
      experience: 'Fresher',
      appliedFor: 'Backend Developer',
      appliedOn: '2024-01-14',
      status: 'Interview',
      resume: 'resume_priya.pdf',
      profileScore: 90,
      matchPercentage: 88,
      portfolio: 'priyasharma.dev',
      expectedSalary: '₹8 LPA',
      noticePeriod: '15 days'
    },
    {
      id: '3',
      name: 'Amit Patel',
      email: 'amit.patel@email.com',
      phone: '+91 76543 21098',
      location: 'Mumbai, MH',
      college: 'IIT Madras',
      degree: 'B.Tech Computer Science',
      cgpa: 8.8,
      skills: ['Java', 'Spring Boot', 'MySQL', 'Redis', 'Microservices'],
      experience: '2 years',
      appliedFor: 'Senior Software Engineer',
      appliedOn: '2024-01-13',
      status: 'Screening',
      resume: 'resume_amit.pdf',
      profileScore: 78,
      matchPercentage: 85,
      linkedin: 'linkedin.com/in/amitpatel',
      expectedSalary: '₹15 LPA',
      noticePeriod: '30 days'
    },
    {
      id: '4',
      name: 'Sneha Reddy',
      email: 'sneha.reddy@email.com',
      phone: '+91 65432 10987',
      location: 'Hyderabad, TS',
      college: 'BITS Pilani',
      degree: 'B.E Computer Science',
      cgpa: 9.5,
      skills: ['React', 'Vue.js', 'CSS', 'Figma', 'UI/UX'],
      experience: '6 months internship',
      appliedFor: 'Frontend Developer',
      appliedOn: '2024-01-12',
      status: 'Selected',
      resume: 'resume_sneha.pdf',
      profileScore: 95,
      matchPercentage: 94,
      github: 'github.com/snehareddy',
      portfolio: 'snehareddy.design',
      expectedSalary: '₹10 LPA',
      noticePeriod: 'Immediate'
    },
    {
      id: '5',
      name: 'Karthik Nair',
      email: 'karthik.nair@email.com',
      phone: '+91 54321 09876',
      location: 'Kochi, KL',
      college: 'NIT Trichy',
      degree: 'B.Tech Information Technology',
      cgpa: 7.8,
      skills: ['Angular', 'Node.js', 'Express', 'MongoDB'],
      experience: 'Fresher',
      appliedFor: 'Full Stack Developer',
      appliedOn: '2024-01-11',
      status: 'Rejected',
      resume: 'resume_karthik.pdf',
      profileScore: 65,
      matchPercentage: 70,
      linkedin: 'linkedin.com/in/karthiknair',
      expectedSalary: '₹7 LPA',
      noticePeriod: '15 days'
    }
  ])

  const [selectedApplicants, setSelectedApplicants] = useState<string[]>([])
  const [selectedApplicant, setSelectedApplicant] = useState<Applicant | null>(null)
  const [filterStatus, setFilterStatus] = useState<string>('All')
  const [searchTerm, setSearchTerm] = useState('')
  const [sortBy, setSortBy] = useState<'name' | 'date' | 'score' | 'match'>('date')
  const [_showBulkActions, setShowBulkActions] = useState(false)
  const [showFilters, setShowFilters] = useState(false)

  const statusColors = {
    Applied: 'bg-gray-100 text-gray-800',
    Screening: 'bg-yellow-100 text-yellow-800',
    Shortlisted: 'bg-blue-100 text-blue-800',
    Interview: 'bg-purple-100 text-purple-800',
    Selected: 'bg-green-100 text-green-800',
    Rejected: 'bg-red-100 text-red-800'
  }

  const filteredApplicants = applicants.filter(applicant => {
    const matchesSearch = applicant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         applicant.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         applicant.college.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filterStatus === 'All' || applicant.status === filterStatus
    return matchesSearch && matchesFilter
  })

  const sortedApplicants = [...filteredApplicants].sort((a, b) => {
    switch (sortBy) {
      case 'name':
        return a.name.localeCompare(b.name)
      case 'score':
        return b.profileScore - a.profileScore
      case 'match':
        return b.matchPercentage - a.matchPercentage
      case 'date':
      default:
        return new Date(b.appliedOn).getTime() - new Date(a.appliedOn).getTime()
    }
  })

  const handleSelectAll = () => {
    if (selectedApplicants.length === sortedApplicants.length) {
      setSelectedApplicants([])
    } else {
      setSelectedApplicants(sortedApplicants.map(a => a.id))
    }
  }

  const handleSelectApplicant = (id: string) => {
    setSelectedApplicants(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    )
  }

  const handleBulkAction = (action: 'shortlist' | 'reject' | 'interview') => {
    console.log(`Performing ${action} on`, selectedApplicants)
    setSelectedApplicants([])
    setShowBulkActions(false)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Applications Management</h1>
            <p className="text-gray-600 mt-1">Review and manage candidate applications</p>
          </div>
          
          <div className="flex items-center gap-3">
            <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors flex items-center gap-2">
              <Download className="w-4 h-4" />
              Export
            </button>
            <button 
              onClick={() => setShowFilters(!showFilters)}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
            >
              <Filter className="w-4 h-4" />
              Filters
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
          <div className="bg-gray-50 rounded-lg p-4">
            <p className="text-sm text-gray-600">Total Applications</p>
            <p className="text-2xl font-bold text-gray-900">486</p>
          </div>
          <div className="bg-blue-50 rounded-lg p-4">
            <p className="text-sm text-blue-600">Shortlisted</p>
            <p className="text-2xl font-bold text-blue-900">73</p>
          </div>
          <div className="bg-purple-50 rounded-lg p-4">
            <p className="text-sm text-purple-600">In Interview</p>
            <p className="text-2xl font-bold text-purple-900">28</p>
          </div>
          <div className="bg-green-50 rounded-lg p-4">
            <p className="text-sm text-green-600">Selected</p>
            <p className="text-2xl font-bold text-green-900">12</p>
          </div>
        </div>
      </div>

      {/* Filters Section */}
      <AnimatePresence>
        {showFilters && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
          >
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                <select 
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="All">All Status</option>
                  <option value="Applied">Applied</option>
                  <option value="Screening">Screening</option>
                  <option value="Shortlisted">Shortlisted</option>
                  <option value="Interview">Interview</option>
                  <option value="Selected">Selected</option>
                  <option value="Rejected">Rejected</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Sort By</label>
                <select 
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="date">Application Date</option>
                  <option value="name">Name</option>
                  <option value="score">Profile Score</option>
                  <option value="match">Match Percentage</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Experience</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option>All Experience</option>
                  <option>Fresher</option>
                  <option>0-1 years</option>
                  <option>1-3 years</option>
                  <option>3+ years</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Skills</label>
                <input
                  type="text"
                  placeholder="e.g. React, Node.js"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Search and Bulk Actions */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex items-center gap-3 flex-1">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search by name, email, or college..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {selectedApplicants.length > 0 && (
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">
                  {selectedApplicants.length} selected
                </span>
                <button
                  onClick={() => handleBulkAction('shortlist')}
                  className="px-3 py-1.5 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700"
                >
                  Shortlist
                </button>
                <button
                  onClick={() => handleBulkAction('interview')}
                  className="px-3 py-1.5 bg-purple-600 text-white text-sm rounded-lg hover:bg-purple-700"
                >
                  Schedule Interview
                </button>
                <button
                  onClick={() => handleBulkAction('reject')}
                  className="px-3 py-1.5 bg-red-600 text-white text-sm rounded-lg hover:bg-red-700"
                >
                  Reject
                </button>
                <button
                  onClick={() => setSelectedApplicants([])}
                  className="px-3 py-1.5 bg-gray-200 text-gray-700 text-sm rounded-lg hover:bg-gray-300"
                >
                  Clear
                </button>
              </div>
            )}
          </div>

          <div className="text-sm text-gray-600">
            Showing {sortedApplicants.length} of {applicants.length} applicants
          </div>
        </div>
      </div>

      {/* Applicants Table */}
      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left">
                  <input
                    type="checkbox"
                    checked={selectedApplicants.length === sortedApplicants.length && sortedApplicants.length > 0}
                    onChange={handleSelectAll}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Candidate
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Applied For
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Education
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Match
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {sortedApplicants.map((applicant) => (
                <tr key={applicant.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <input
                      type="checkbox"
                      checked={selectedApplicants.includes(applicant.id)}
                      onChange={() => handleSelectApplicant(applicant.id)}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-medium">
                        {applicant.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-medium text-gray-900">{applicant.name}</p>
                        <p className="text-xs text-gray-500">{applicant.email}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="flex items-center text-xs text-gray-500">
                            <MapPin className="w-3 h-3 mr-1" />
                            {applicant.location}
                          </span>
                          <span className="flex items-center text-xs text-gray-500">
                            <Phone className="w-3 h-3 mr-1" />
                            {applicant.phone}
                          </span>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm text-gray-900">{applicant.appliedFor}</p>
                    <p className="text-xs text-gray-500">{applicant.appliedOn}</p>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm text-gray-900">{applicant.college}</p>
                    <p className="text-xs text-gray-500">{applicant.degree}</p>
                    <p className="text-xs font-medium text-gray-700">CGPA: {applicant.cgpa}</p>
                  </td>
                  <td className="px-6 py-4">
                    <div className="space-y-2">
                      <div>
                        <div className="flex items-center justify-between text-xs mb-1">
                          <span>Match</span>
                          <span className="font-medium">{applicant.matchPercentage}%</span>
                        </div>
                        <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full"
                            style={{ width: `${applicant.matchPercentage}%` }}
                          />
                        </div>
                      </div>
                      <div className="flex items-center gap-1">
                        {[1,2,3,4,5].map((star) => (
                          <Star 
                            key={star} 
                            className={`w-3 h-3 ${
                              star <= Math.ceil(applicant.profileScore / 20) 
                                ? 'text-yellow-400 fill-current' 
                                : 'text-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 text-xs rounded-full ${statusColors[applicant.status]}`}>
                      {applicant.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setSelectedApplicant(applicant)}
                        className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        title="View Profile"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        className="p-1.5 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                        title="Shortlist"
                      >
                        <UserCheck className="w-4 h-4" />
                      </button>
                      <button
                        className="p-1.5 text-purple-600 hover:bg-purple-50 rounded-lg transition-colors"
                        title="Schedule Interview"
                      >
                        <Calendar className="w-4 h-4" />
                      </button>
                      <button
                        className="p-1.5 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                        title="More Options"
                      >
                        <MoreVertical className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Candidate Profile Side Panel */}
      <AnimatePresence>
        {selectedApplicant && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-end"
            onClick={() => setSelectedApplicant(null)}
          >
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
              className="w-full max-w-2xl bg-white h-full overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Profile Header */}
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 text-white">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-4">
                    <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center text-2xl font-bold text-blue-600">
                      {selectedApplicant.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold">{selectedApplicant.name}</h2>
                      <p className="text-blue-100">{selectedApplicant.appliedFor}</p>
                      <div className="flex items-center gap-3 mt-2">
                        {selectedApplicant.linkedin && (
                          <a href="#" className="text-white hover:text-blue-200">
                            <Link className="w-4 h-4" />
                          </a>
                        )}
                        {selectedApplicant.github && (
                          <a href="#" className="text-white hover:text-blue-200">
                            <Award className="w-4 h-4" />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedApplicant(null)}
                    className="p-2 hover:bg-white hover:bg-opacity-20 rounded-lg transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-blue-100">Match Score</p>
                    <p className="text-2xl font-bold">{selectedApplicant.matchPercentage}%</p>
                  </div>
                  <div>
                    <p className="text-sm text-blue-100">Profile Score</p>
                    <p className="text-2xl font-bold">{selectedApplicant.profileScore}/100</p>
                  </div>
                </div>
              </div>

              {/* Profile Content */}
              <div className="p-6 space-y-6">
                {/* Contact Information */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Contact Information</h3>
                  <div className="space-y-2">
                    <div className="flex items-center gap-3 text-gray-600">
                      <Mail className="w-4 h-4" />
                      <span>{selectedApplicant.email}</span>
                    </div>
                    <div className="flex items-center gap-3 text-gray-600">
                      <Phone className="w-4 h-4" />
                      <span>{selectedApplicant.phone}</span>
                    </div>
                    <div className="flex items-center gap-3 text-gray-600">
                      <MapPin className="w-4 h-4" />
                      <span>{selectedApplicant.location}</span>
                    </div>
                  </div>
                </div>

                {/* Education */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Education</h3>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="font-medium text-gray-900">{selectedApplicant.degree}</p>
                    <p className="text-gray-600">{selectedApplicant.college}</p>
                    <p className="text-sm text-gray-500 mt-1">CGPA: {selectedApplicant.cgpa}/10</p>
                  </div>
                </div>

                {/* Skills */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Skills</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedApplicant.skills.map((skill) => (
                      <span key={skill} className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Experience */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Experience</h3>
                  <p className="text-gray-600">{selectedApplicant.experience}</p>
                </div>

                {/* Additional Info */}
                {(selectedApplicant.expectedSalary || selectedApplicant.noticePeriod) && (
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Additional Information</h3>
                    <div className="grid grid-cols-2 gap-4">
                      {selectedApplicant.expectedSalary && (
                        <div>
                          <p className="text-sm text-gray-500">Expected Salary</p>
                          <p className="font-medium text-gray-900">{selectedApplicant.expectedSalary}</p>
                        </div>
                      )}
                      {selectedApplicant.noticePeriod && (
                        <div>
                          <p className="text-sm text-gray-500">Notice Period</p>
                          <p className="font-medium text-gray-900">{selectedApplicant.noticePeriod}</p>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Achievements */}
                {selectedApplicant.achievements && selectedApplicant.achievements.length > 0 && (
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Achievements</h3>
                    <ul className="space-y-2">
                      {selectedApplicant.achievements.map((achievement, index) => (
                        <li key={index} className="flex items-start gap-2 text-gray-600">
                          <Award className="w-4 h-4 text-yellow-500 mt-0.5" />
                          <span>{achievement}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Actions */}
                <div className="flex gap-3 pt-4 border-t border-gray-200">
                  <button className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2">
                    <UserCheck className="w-4 h-4" />
                    Shortlist
                  </button>
                  <button className="flex-1 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors flex items-center justify-center gap-2">
                    <Calendar className="w-4 h-4" />
                    Schedule Interview
                  </button>
                  <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors">
                    <XCircle className="w-4 h-4" />
                  </button>
                </div>

                {/* Resume Download */}
                <button className="w-full px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center gap-2">
                  <FileText className="w-4 h-4" />
                  Download Resume
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default Applicants
