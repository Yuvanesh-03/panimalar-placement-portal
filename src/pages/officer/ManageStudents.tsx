import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Search,
  Filter,
  Download,
  Upload,
  Plus,
  Edit3,
  Eye,
  CheckCircle,
  XCircle,
  AlertCircle,
  Users,
  GraduationCap,
  Briefcase,
  FileText,
  Phone,
  Mail,
  MapPin,
  Calendar,
  Award,
  ExternalLink,
  MoreVertical,
  BookOpen,
  Star
} from 'lucide-react'
import { Card, Button, Input } from '../../components/ui'

interface Student {
  id: string
  rollNumber: string
  name: string
  email: string
  phone: string
  department: string
  degree: string
  year: number
  batch: string
  cgpa: number
  resumeStatus: 'uploaded' | 'pending' | 'approved' | 'rejected'
  applicationCount: number
  placementStatus: 'unplaced' | 'shortlisted' | 'placed' | 'offer-pending'
  skills: string[]
  avatar: string
  lastActive: string
  profileCompletion: number
  offers?: {
    company: string
    package: string
    status: 'pending' | 'accepted' | 'declined'
  }[]
}

const ManageStudents: React.FC = () => {
  const [students, _setStudents] = useState<Student[]>([
    {
      id: '1',
      rollNumber: 'PEC2021001',
      name: 'Rahul Kumar',
      email: 'rahul.kumar@pec.edu',
      phone: '+91 9876543210',
      department: 'Computer Science',
      degree: 'B.Tech',
      year: 4,
      batch: '2025',
      cgpa: 8.7,
      resumeStatus: 'approved',
      applicationCount: 12,
      placementStatus: 'placed',
      skills: ['React', 'Node.js', 'Python', 'MongoDB'],
      avatar: '/api/placeholder/40/40',
      lastActive: '2 hours ago',
      profileCompletion: 95,
      offers: [
        { company: 'TCS', package: '₹7.2L', status: 'accepted' },
        { company: 'Infosys', package: '₹6.8L', status: 'declined' }
      ]
    },
    {
      id: '2',
      rollNumber: 'PEC2021002',
      name: 'Priya Sharma',
      email: 'priya.sharma@pec.edu',
      phone: '+91 9876543211',
      department: 'Information Technology',
      degree: 'B.Tech',
      year: 4,
      batch: '2025',
      cgpa: 9.1,
      resumeStatus: 'approved',
      applicationCount: 8,
      placementStatus: 'shortlisted',
      skills: ['Java', 'Spring Boot', 'Angular', 'MySQL'],
      avatar: '/api/placeholder/40/40',
      lastActive: '1 hour ago',
      profileCompletion: 88
    },
    {
      id: '3',
      rollNumber: 'PEC2021003',
      name: 'Amit Patel',
      email: 'amit.patel@pec.edu',
      phone: '+91 9876543212',
      department: 'Electronics & Communication',
      degree: 'B.Tech',
      year: 4,
      batch: '2025',
      cgpa: 8.2,
      resumeStatus: 'pending',
      applicationCount: 5,
      placementStatus: 'unplaced',
      skills: ['C++', 'VLSI', 'Embedded Systems'],
      avatar: '/api/placeholder/40/40',
      lastActive: '5 hours ago',
      profileCompletion: 65
    },
    {
      id: '4',
      rollNumber: 'PEC2021004',
      name: 'Sneha Reddy',
      email: 'sneha.reddy@pec.edu',
      phone: '+91 9876543213',
      department: 'Mechanical Engineering',
      degree: 'B.Tech',
      year: 4,
      batch: '2025',
      cgpa: 7.9,
      resumeStatus: 'rejected',
      applicationCount: 3,
      placementStatus: 'unplaced',
      skills: ['CAD', 'SolidWorks', 'ANSYS'],
      avatar: '/api/placeholder/40/40',
      lastActive: '1 day ago',
      profileCompletion: 72
    },
    {
      id: '5',
      rollNumber: 'PEC2021005',
      name: 'Karthik Nair',
      email: 'karthik.nair@pec.edu',
      phone: '+91 9876543214',
      department: 'Computer Science',
      degree: 'B.Tech',
      year: 4,
      batch: '2025',
      cgpa: 8.5,
      resumeStatus: 'approved',
      applicationCount: 15,
      placementStatus: 'offer-pending',
      skills: ['Python', 'Machine Learning', 'TensorFlow'],
      avatar: '/api/placeholder/40/40',
      lastActive: '30 min ago',
      profileCompletion: 92,
      offers: [
        { company: 'Google', package: '₹42L', status: 'pending' }
      ]
    }
  ])

  const [searchTerm, setSearchTerm] = useState('')
  const [selectedDepartment, setSelectedDepartment] = useState('All')
  const [selectedStatus, setSelectedStatus] = useState('All')
  const [selectedYear, setSelectedYear] = useState('All')
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null)
  const [showFilters, setShowFilters] = useState(false)
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('table')

  const departments = ['All', 'Computer Science', 'Information Technology', 'Electronics & Communication', 'Mechanical Engineering', 'Civil Engineering']
  const placementStatuses = ['All', 'unplaced', 'shortlisted', 'placed', 'offer-pending']
  const years = ['All', '3', '4']

  const filteredStudents = students.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.rollNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesDepartment = selectedDepartment === 'All' || student.department === selectedDepartment
    const matchesStatus = selectedStatus === 'All' || student.placementStatus === selectedStatus
    const matchesYear = selectedYear === 'All' || student.year.toString() === selectedYear
    return matchesSearch && matchesDepartment && matchesStatus && matchesYear
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'placed': return 'bg-green-100 text-green-800'
      case 'shortlisted': return 'bg-blue-100 text-blue-800'
      case 'offer-pending': return 'bg-purple-100 text-purple-800'
      case 'unplaced': return 'bg-gray-100 text-gray-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getResumeStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'bg-green-100 text-green-800'
      case 'pending': return 'bg-yellow-100 text-yellow-800'
      case 'rejected': return 'bg-red-100 text-red-800'
      case 'uploaded': return 'bg-blue-100 text-blue-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const stats = {
    total: students.length,
    placed: students.filter(s => s.placementStatus === 'placed').length,
    shortlisted: students.filter(s => s.placementStatus === 'shortlisted').length,
    unplaced: students.filter(s => s.placementStatus === 'unplaced').length,
    avgCGPA: (students.reduce((acc, s) => acc + s.cgpa, 0) / students.length).toFixed(1),
    resumePending: students.filter(s => s.resumeStatus === 'pending').length
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Student Management</h1>
            <p className="text-gray-600 mt-1">Manage student profiles, resumes, and placement status</p>
          </div>
          
          <div className="flex items-center gap-3">
            <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors flex items-center gap-2">
              <Upload className="w-4 h-4" />
              Bulk Upload
            </button>
            <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors flex items-center gap-2">
              <Download className="w-4 h-4" />
              Export Data
            </button>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2">
              <Plus className="w-4 h-4" />
              Add Student
            </button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-6 gap-4 mt-6">
          <div className="bg-blue-50 rounded-lg p-4">
            <p className="text-sm text-blue-600">Total Students</p>
            <p className="text-2xl font-bold text-blue-900">{stats.total}</p>
          </div>
          <div className="bg-green-50 rounded-lg p-4">
            <p className="text-sm text-green-600">Placed</p>
            <p className="text-2xl font-bold text-green-900">{stats.placed}</p>
          </div>
          <div className="bg-purple-50 rounded-lg p-4">
            <p className="text-sm text-purple-600">Shortlisted</p>
            <p className="text-2xl font-bold text-purple-900">{stats.shortlisted}</p>
          </div>
          <div className="bg-gray-50 rounded-lg p-4">
            <p className="text-sm text-gray-600">Unplaced</p>
            <p className="text-2xl font-bold text-gray-900">{stats.unplaced}</p>
          </div>
          <div className="bg-amber-50 rounded-lg p-4">
            <p className="text-sm text-amber-600">Avg CGPA</p>
            <p className="text-2xl font-bold text-amber-900">{stats.avgCGPA}</p>
          </div>
          <div className="bg-red-50 rounded-lg p-4">
            <p className="text-sm text-red-600">Resume Pending</p>
            <p className="text-2xl font-bold text-red-900">{stats.resumePending}</p>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search students by name, roll number, or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="px-4 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors flex items-center gap-2"
            >
              <Filter className="w-4 h-4" />
              Filters
            </button>
            
            <div className="flex bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setViewMode('table')}
                className={`px-3 py-2 rounded transition-colors ${viewMode === 'table' ? 'bg-white shadow-sm' : ''}`}
              >
                Table
              </button>
              <button
                onClick={() => setViewMode('grid')}
                className={`px-3 py-2 rounded transition-colors ${viewMode === 'grid' ? 'bg-white shadow-sm' : ''}`}
              >
                Grid
              </button>
            </div>
          </div>
        </div>

        {/* Filter Options */}
        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="mt-4 pt-4 border-t border-gray-200"
            >
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Department</label>
                  <select
                    value={selectedDepartment}
                    onChange={(e) => setSelectedDepartment(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {departments.map(dept => (
                      <option key={dept} value={dept}>{dept}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Placement Status</label>
                  <select
                    value={selectedStatus}
                    onChange={(e) => setSelectedStatus(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {placementStatuses.map(status => (
                      <option key={status} value={status}>{status}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Year</label>
                  <select
                    value={selectedYear}
                    onChange={(e) => setSelectedYear(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {years.map(year => (
                      <option key={year} value={year}>{year === 'All' ? 'All Years' : `Year ${year}`}</option>
                    ))}
                  </select>
                </div>
                <div className="flex items-end">
                  <button
                    onClick={() => {
                      setSelectedDepartment('All')
                      setSelectedStatus('All')
                      setSelectedYear('All')
                    }}
                    className="w-full px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
                  >
                    Clear Filters
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Students List */}
      {viewMode === 'table' ? (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="text-left p-4 font-medium text-gray-900">Student</th>
                  <th className="text-left p-4 font-medium text-gray-900">Roll Number</th>
                  <th className="text-left p-4 font-medium text-gray-900">Department</th>
                  <th className="text-center p-4 font-medium text-gray-900">CGPA</th>
                  <th className="text-center p-4 font-medium text-gray-900">Resume</th>
                  <th className="text-center p-4 font-medium text-gray-900">Applications</th>
                  <th className="text-center p-4 font-medium text-gray-900">Status</th>
                  <th className="text-center p-4 font-medium text-gray-900">Profile</th>
                  <th className="text-center p-4 font-medium text-gray-900">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredStudents.map((student) => (
                  <tr key={student.id} className="border-b border-gray-50 hover:bg-gray-50">
                    <td className="p-4">
                      <div className="flex items-center space-x-3">
                        <img
                          src={student.avatar}
                          alt={student.name}
                          className="w-10 h-10 rounded-full bg-gray-200"
                        />
                        <div>
                          <p className="font-medium text-gray-900">{student.name}</p>
                          <p className="text-sm text-gray-500">{student.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-4 font-medium text-gray-900">{student.rollNumber}</td>
                    <td className="p-4">
                      <div>
                        <p className="font-medium text-gray-900">{student.department}</p>
                        <p className="text-sm text-gray-500">{student.degree} - {student.batch}</p>
                      </div>
                    </td>
                    <td className="p-4 text-center">
                      <span className={`px-2 py-1 rounded-full text-sm font-medium ${
                        student.cgpa >= 8.5 ? 'bg-green-100 text-green-800' :
                        student.cgpa >= 7.5 ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {student.cgpa}
                      </span>
                    </td>
                    <td className="p-4 text-center">
                      <span className={`px-2 py-1 rounded-full text-xs ${getResumeStatusColor(student.resumeStatus)}`}>
                        {student.resumeStatus}
                      </span>
                    </td>
                    <td className="p-4 text-center font-medium text-gray-900">{student.applicationCount}</td>
                    <td className="p-4 text-center">
                      <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(student.placementStatus)}`}>
                        {student.placementStatus}
                      </span>
                    </td>
                    <td className="p-4 text-center">
                      <div className="flex items-center justify-center">
                        <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                          <span className="text-xs font-medium text-gray-600">{student.profileCompletion}%</span>
                        </div>
                      </div>
                    </td>
                    <td className="p-4 text-center">
                      <div className="flex items-center justify-center space-x-2">
                        <button
                          onClick={() => setSelectedStudent(student)}
                          className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-blue-100 transition-colors"
                          title="View Details"
                        >
                          <Eye className="w-4 h-4 text-blue-600" />
                        </button>
                        <button className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors" title="Edit">
                          <Edit3 className="w-4 h-4 text-gray-600" />
                        </button>
                        <button className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors" title="More Options">
                          <MoreVertical className="w-4 h-4 text-gray-600" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {filteredStudents.length === 0 && (
            <div className="text-center py-12">
              <Users className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">No students found matching your criteria</p>
            </div>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredStudents.map((student) => (
            <Card key={student.id} className="p-6 hover:shadow-lg transition-all cursor-pointer" onClick={() => setSelectedStudent(student)}>
              <div className="flex items-center space-x-4 mb-4">
                <img
                  src={student.avatar}
                  alt={student.name}
                  className="w-12 h-12 rounded-full bg-gray-200"
                />
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900">{student.name}</h3>
                  <p className="text-sm text-gray-500">{student.rollNumber}</p>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(student.placementStatus)}`}>
                  {student.placementStatus}
                </span>
              </div>
              
              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Department:</span>
                  <span className="font-medium">{student.department}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">CGPA:</span>
                  <span className="font-medium">{student.cgpa}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Applications:</span>
                  <span className="font-medium">{student.applicationCount}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Profile:</span>
                  <span className="font-medium">{student.profileCompletion}%</span>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-1">
                {student.skills.slice(0, 3).map((skill, index) => (
                  <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">
                    {skill}
                  </span>
                ))}
                {student.skills.length > 3 && (
                  <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">
                    +{student.skills.length - 3} more
                  </span>
                )}
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Student Detail Modal */}
      <AnimatePresence>
        {selectedStudent && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedStudent(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold text-gray-900">Student Profile</h2>
                  <button
                    onClick={() => setSelectedStudent(null)}
                    className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    ×
                  </button>
                </div>
              </div>
              
              <div className="p-6">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Profile Info */}
                  <div className="lg:col-span-2 space-y-6">
                    <div className="flex items-center space-x-6">
                      <img
                        src={selectedStudent.avatar}
                        alt={selectedStudent.name}
                        className="w-20 h-20 rounded-full bg-gray-200"
                      />
                      <div className="flex-1">
                        <h3 className="text-2xl font-bold text-gray-900">{selectedStudent.name}</h3>
                        <p className="text-gray-600 mb-2">{selectedStudent.rollNumber}</p>
                        <div className="flex items-center space-x-4">
                          <span className={`px-3 py-1 rounded-full text-sm ${getStatusColor(selectedStudent.placementStatus)}`}>
                            {selectedStudent.placementStatus}
                          </span>
                          <span className={`px-3 py-1 rounded-full text-sm ${getResumeStatusColor(selectedStudent.resumeStatus)}`}>
                            Resume: {selectedStudent.resumeStatus}
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="text-lg font-semibold text-gray-900 mb-3">Contact Information</h4>
                        <div className="space-y-3">
                          <div className="flex items-center space-x-3">
                            <Mail className="w-5 h-5 text-gray-400" />
                            <span className="text-gray-600">{selectedStudent.email}</span>
                          </div>
                          <div className="flex items-center space-x-3">
                            <Phone className="w-5 h-5 text-gray-400" />
                            <span className="text-gray-600">{selectedStudent.phone}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="text-lg font-semibold text-gray-900 mb-3">Academic Details</h4>
                        <div className="space-y-3">
                          <div className="flex justify-between">
                            <span className="text-gray-600">Department:</span>
                            <span className="font-medium">{selectedStudent.department}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Degree:</span>
                            <span className="font-medium">{selectedStudent.degree}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Batch:</span>
                            <span className="font-medium">{selectedStudent.batch}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">CGPA:</span>
                            <span className="font-bold text-lg">{selectedStudent.cgpa}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900 mb-3">Skills</h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedStudent.skills.map((skill, index) => (
                          <span key={index} className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-lg">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    {selectedStudent.offers && selectedStudent.offers.length > 0 && (
                      <div>
                        <h4 className="text-lg font-semibold text-gray-900 mb-3">Job Offers</h4>
                        <div className="space-y-3">
                          {selectedStudent.offers.map((offer, index) => (
                            <div key={index} className="p-4 border border-gray-200 rounded-lg">
                              <div className="flex items-center justify-between">
                                <div>
                                  <p className="font-medium text-gray-900">{offer.company}</p>
                                  <p className="text-sm text-gray-600">Package: {offer.package}</p>
                                </div>
                                <span className={`px-2 py-1 rounded-full text-xs ${
                                  offer.status === 'accepted' ? 'bg-green-100 text-green-800' :
                                  offer.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                                  'bg-red-100 text-red-800'
                                }`}>
                                  {offer.status}
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                  
                  {/* Quick Stats */}
                  <div className="space-y-4">
                    <div className="bg-gray-50 rounded-lg p-4">
                      <h4 className="text-sm font-medium text-gray-700 mb-3">Profile Completion</h4>
                      <div className="flex items-center space-x-3">
                        <div className="flex-1 bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-blue-600 h-2 rounded-full transition-all duration-500"
                            style={{ width: `${selectedStudent.profileCompletion}%` }}
                          />
                        </div>
                        <span className="text-sm font-medium">{selectedStudent.profileCompletion}%</span>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 gap-4">
                      <div className="bg-blue-50 rounded-lg p-4 text-center">
                        <div className="text-2xl font-bold text-blue-600">{selectedStudent.applicationCount}</div>
                        <div className="text-sm text-gray-600">Applications Sent</div>
                      </div>
                      
                      <div className="bg-emerald-50 rounded-lg p-4 text-center">
                        <div className="text-2xl font-bold text-emerald-600">{selectedStudent.offers?.length || 0}</div>
                        <div className="text-sm text-gray-600">Job Offers</div>
                      </div>
                      
                      <div className="bg-purple-50 rounded-lg p-4 text-center">
                        <div className="text-2xl font-bold text-purple-600">{selectedStudent.skills.length}</div>
                        <div className="text-sm text-gray-600">Skills Listed</div>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <button className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2">
                        <Edit3 className="w-4 h-4" />
                        Edit Profile
                      </button>
                      <button className="w-full px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors flex items-center justify-center gap-2">
                        <FileText className="w-4 h-4" />
                        View Resume
                      </button>
                      <button className="w-full px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors flex items-center justify-center gap-2">
                        <ExternalLink className="w-4 h-4" />
                        View Applications
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default ManageStudents
