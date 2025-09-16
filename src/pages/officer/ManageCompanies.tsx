import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Search,
  Filter,
  Download,
  Plus,
  Edit3,
  Eye,
  CheckCircle,
  XCircle,
  AlertCircle,
  Building2,
  Users,
  Briefcase,
  FileText,
  Phone,
  Mail,
  MapPin,
  Calendar,
  Globe,
  Star,
  TrendingUp,
  MoreVertical,
  ExternalLink,
  Award,
  Target,
  Clock,
  Shield
} from 'lucide-react'
import { Card, Button } from '../../components/ui'

interface Company {
  id: string
  name: string
  logo: string
  industry: string
  location: string
  website: string
  email: string
  phone: string
  contactPerson: string
  designation: string
  employeeCount: string
  establishedYear: number
  description: string
  activeJobs: number
  totalApplications: number
  selectedCandidates: number
  averagePackage: string
  status: 'active' | 'inactive' | 'pending' | 'verified'
  lastActive: string
  placementHistory: {
    year: string
    hired: number
    package: string
  }[]
  requirements?: {
    minCGPA: number
    departments: string[]
    skills: string[]
  }
}

const ManageCompanies: React.FC = () => {
  const [companies, _setCompanies] = useState<Company[]>([
    {
      id: '1',
      name: 'Tata Consultancy Services',
      logo: '/api/placeholder/60/60',
      industry: 'Information Technology',
      location: 'Mumbai, Maharashtra',
      website: 'https://tcs.com',
      email: 'recruitment@tcs.com',
      phone: '+91 22 6778 9999',
      contactPerson: 'Rajesh Kumar',
      designation: 'Senior Recruitment Manager',
      employeeCount: '500,000+',
      establishedYear: 1968,
      description: 'Leading global IT services, consulting and business solutions organization.',
      activeJobs: 8,
      totalApplications: 450,
      selectedCandidates: 67,
      averagePackage: '₹7.2L',
      status: 'verified',
      lastActive: '2 hours ago',
      placementHistory: [
        { year: '2024', hired: 78, package: '₹7.5L' },
        { year: '2023', hired: 65, package: '₹7.0L' },
        { year: '2022', hired: 52, package: '₹6.8L' }
      ],
      requirements: {
        minCGPA: 7.0,
        departments: ['Computer Science', 'Information Technology', 'Electronics & Communication'],
        skills: ['Java', 'Python', 'React', 'Node.js', 'SQL']
      }
    },
    {
      id: '2',
      name: 'Infosys Limited',
      logo: '/api/placeholder/60/60',
      industry: 'Information Technology',
      location: 'Bengaluru, Karnataka',
      website: 'https://infosys.com',
      email: 'careers@infosys.com',
      phone: '+91 80 2852 0261',
      contactPerson: 'Priya Sharma',
      designation: 'Campus Recruitment Lead',
      employeeCount: '250,000+',
      establishedYear: 1981,
      description: 'Global leader in next-generation digital services and consulting.',
      activeJobs: 5,
      totalApplications: 320,
      selectedCandidates: 42,
      averagePackage: '₹6.8L',
      status: 'active',
      lastActive: '1 day ago',
      placementHistory: [
        { year: '2024', hired: 45, package: '₹7.0L' },
        { year: '2023', hired: 38, package: '₹6.5L' },
        { year: '2022', hired: 41, package: '₹6.2L' }
      ],
      requirements: {
        minCGPA: 6.5,
        departments: ['Computer Science', 'Information Technology', 'Mechanical Engineering'],
        skills: ['Java', 'C++', 'Angular', 'Spring Boot']
      }
    },
    {
      id: '3',
      name: 'Wipro Technologies',
      logo: '/api/placeholder/60/60',
      industry: 'Information Technology',
      location: 'Bengaluru, Karnataka',
      website: 'https://wipro.com',
      email: 'campus@wipro.com',
      phone: '+91 80 2844 0011',
      contactPerson: 'Amit Patel',
      designation: 'Talent Acquisition Manager',
      employeeCount: '200,000+',
      establishedYear: 1945,
      description: 'Leading technology services and consulting company.',
      activeJobs: 6,
      totalApplications: 280,
      selectedCandidates: 35,
      averagePackage: '₹6.2L',
      status: 'active',
      lastActive: '3 hours ago',
      placementHistory: [
        { year: '2024', hired: 38, package: '₹6.5L' },
        { year: '2023', hired: 33, package: '₹6.0L' },
        { year: '2022', hired: 29, package: '₹5.8L' }
      ]
    },
    {
      id: '4',
      name: 'Tech Mahindra',
      logo: '/api/placeholder/60/60',
      industry: 'Information Technology',
      location: 'Pune, Maharashtra',
      website: 'https://techmahindra.com',
      email: 'hr@techmahindra.com',
      phone: '+91 20 6601 4040',
      contactPerson: 'Sneha Reddy',
      designation: 'HR Business Partner',
      employeeCount: '150,000+',
      establishedYear: 1986,
      description: 'Digital transformation, consulting and business re-engineering services.',
      activeJobs: 4,
      totalApplications: 195,
      selectedCandidates: 28,
      averagePackage: '₹5.8L',
      status: 'pending',
      lastActive: '1 week ago',
      placementHistory: [
        { year: '2024', hired: 32, package: '₹6.0L' },
        { year: '2023', hired: 25, package: '₹5.5L' }
      ]
    },
    {
      id: '5',
      name: 'L&T Infotech',
      logo: '/api/placeholder/60/60',
      industry: 'Information Technology',
      location: 'Mumbai, Maharashtra',
      website: 'https://lntinfotech.com',
      email: 'recruitment@lntinfotech.com',
      phone: '+91 22 6776 7676',
      contactPerson: 'Karthik Nair',
      designation: 'Campus Relations Manager',
      employeeCount: '50,000+',
      establishedYear: 1997,
      description: 'Global technology consulting and digital solutions company.',
      activeJobs: 3,
      totalApplications: 150,
      selectedCandidates: 18,
      averagePackage: '₹6.5L',
      status: 'inactive',
      lastActive: '2 weeks ago',
      placementHistory: [
        { year: '2024', hired: 22, package: '₹6.8L' },
        { year: '2023', hired: 19, package: '₹6.2L' }
      ]
    }
  ])

  const [searchTerm, setSearchTerm] = useState('')
  const [selectedIndustry, setSelectedIndustry] = useState('All')
  const [selectedStatus, setSelectedStatus] = useState('All')
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null)
  const [showFilters, setShowFilters] = useState(false)
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid')

  const industries = ['All', 'Information Technology', 'Finance & Banking', 'Manufacturing', 'Healthcare', 'E-commerce']
  const statuses = ['All', 'active', 'inactive', 'pending', 'verified']

  const filteredCompanies = companies.filter(company => {
    const matchesSearch = company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         company.industry.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         company.location.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesIndustry = selectedIndustry === 'All' || company.industry === selectedIndustry
    const matchesStatus = selectedStatus === 'All' || company.status === selectedStatus
    return matchesSearch && matchesIndustry && matchesStatus
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'verified': return 'bg-green-100 text-green-800'
      case 'active': return 'bg-blue-100 text-blue-800'
      case 'pending': return 'bg-yellow-100 text-yellow-800'
      case 'inactive': return 'bg-gray-100 text-gray-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const stats = {
    total: companies.length,
    active: companies.filter(c => c.status === 'active' || c.status === 'verified').length,
    totalJobs: companies.reduce((acc, c) => acc + c.activeJobs, 0),
    totalApplications: companies.reduce((acc, c) => acc + c.totalApplications, 0),
    avgPackage: '₹6.5L'
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Company Management</h1>
            <p className="text-gray-600 mt-1">Manage company partnerships and recruitment activities</p>
          </div>
          
          <div className="flex items-center gap-3">
            <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors flex items-center gap-2">
              <Download className="w-4 h-4" />
              Export Report
            </button>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2">
              <Plus className="w-4 h-4" />
              Add Company
            </button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-6">
          <div className="bg-blue-50 rounded-lg p-4">
            <p className="text-sm text-blue-600">Total Companies</p>
            <p className="text-2xl font-bold text-blue-900">{stats.total}</p>
          </div>
          <div className="bg-emerald-50 rounded-lg p-4">
            <p className="text-sm text-emerald-600">Active Companies</p>
            <p className="text-2xl font-bold text-emerald-900">{stats.active}</p>
          </div>
          <div className="bg-purple-50 rounded-lg p-4">
            <p className="text-sm text-purple-600">Active Jobs</p>
            <p className="text-2xl font-bold text-purple-900">{stats.totalJobs}</p>
          </div>
          <div className="bg-amber-50 rounded-lg p-4">
            <p className="text-sm text-amber-600">Total Applications</p>
            <p className="text-2xl font-bold text-amber-900">{stats.totalApplications.toLocaleString()}</p>
          </div>
          <div className="bg-rose-50 rounded-lg p-4">
            <p className="text-sm text-rose-600">Avg Package</p>
            <p className="text-2xl font-bold text-rose-900">{stats.avgPackage}</p>
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
                placeholder="Search companies by name, industry, or location..."
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
                onClick={() => setViewMode('grid')}
                className={`px-3 py-2 rounded transition-colors ${viewMode === 'grid' ? 'bg-white shadow-sm' : ''}`}
              >
                Grid
              </button>
              <button
                onClick={() => setViewMode('table')}
                className={`px-3 py-2 rounded transition-colors ${viewMode === 'table' ? 'bg-white shadow-sm' : ''}`}
              >
                Table
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
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Industry</label>
                  <select
                    value={selectedIndustry}
                    onChange={(e) => setSelectedIndustry(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {industries.map(industry => (
                      <option key={industry} value={industry}>{industry}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                  <select
                    value={selectedStatus}
                    onChange={(e) => setSelectedStatus(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {statuses.map(status => (
                      <option key={status} value={status}>{status}</option>
                    ))}
                  </select>
                </div>
                <div className="flex items-end">
                  <button
                    onClick={() => {
                      setSelectedIndustry('All')
                      setSelectedStatus('All')
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

      {/* Companies List */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCompanies.map((company) => (
            <Card key={company.id} className="p-6 hover:shadow-lg transition-all cursor-pointer" onClick={() => setSelectedCompany(company)}>
              <div className="flex items-center space-x-4 mb-4">
                <img
                  src={company.logo}
                  alt={company.name}
                  className="w-12 h-12 rounded-lg bg-gray-200 object-cover"
                />
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 text-lg">{company.name}</h3>
                  <p className="text-sm text-gray-500">{company.industry}</p>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(company.status)}`}>
                  {company.status}
                </span>
              </div>
              
              <div className="space-y-2 mb-4">
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <MapPin className="w-4 h-4" />
                  <span>{company.location}</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <Users className="w-4 h-4" />
                  <span>{company.employeeCount} employees</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <Briefcase className="w-4 h-4" />
                  <span>{company.activeJobs} active jobs</span>
                </div>
              </div>
              
              <div className="grid grid-cols-3 gap-4 pt-4 border-t border-gray-100">
                <div className="text-center">
                  <div className="text-lg font-bold text-gray-900">{company.totalApplications}</div>
                  <div className="text-xs text-gray-500">Applications</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold text-gray-900">{company.selectedCandidates}</div>
                  <div className="text-xs text-gray-500">Selected</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold text-gray-900">{company.averagePackage}</div>
                  <div className="text-xs text-gray-500">Avg Package</div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="text-left p-4 font-medium text-gray-900">Company</th>
                  <th className="text-left p-4 font-medium text-gray-900">Industry</th>
                  <th className="text-left p-4 font-medium text-gray-900">Location</th>
                  <th className="text-center p-4 font-medium text-gray-900">Active Jobs</th>
                  <th className="text-center p-4 font-medium text-gray-900">Applications</th>
                  <th className="text-center p-4 font-medium text-gray-900">Selected</th>
                  <th className="text-center p-4 font-medium text-gray-900">Avg Package</th>
                  <th className="text-center p-4 font-medium text-gray-900">Status</th>
                  <th className="text-center p-4 font-medium text-gray-900">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredCompanies.map((company) => (
                  <tr key={company.id} className="border-b border-gray-50 hover:bg-gray-50">
                    <td className="p-4">
                      <div className="flex items-center space-x-3">
                        <img
                          src={company.logo}
                          alt={company.name}
                          className="w-10 h-10 rounded-lg bg-gray-200 object-cover"
                        />
                        <div>
                          <p className="font-medium text-gray-900">{company.name}</p>
                          <p className="text-sm text-gray-500">{company.contactPerson}</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-4 text-gray-600">{company.industry}</td>
                    <td className="p-4 text-gray-600">{company.location}</td>
                    <td className="p-4 text-center font-medium text-gray-900">{company.activeJobs}</td>
                    <td className="p-4 text-center font-medium text-gray-900">{company.totalApplications}</td>
                    <td className="p-4 text-center font-medium text-gray-900">{company.selectedCandidates}</td>
                    <td className="p-4 text-center font-medium text-emerald-600">{company.averagePackage}</td>
                    <td className="p-4 text-center">
                      <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(company.status)}`}>
                        {company.status}
                      </span>
                    </td>
                    <td className="p-4 text-center">
                      <div className="flex items-center justify-center space-x-2">
                        <button
                          onClick={() => setSelectedCompany(company)}
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
          
          {filteredCompanies.length === 0 && (
            <div className="text-center py-12">
              <Building2 className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">No companies found matching your criteria</p>
            </div>
          )}
        </div>
      )}

      {/* Company Detail Modal */}
      <AnimatePresence>
        {selectedCompany && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedCompany(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-xl max-w-5xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold text-gray-900">Company Profile</h2>
                  <button
                    onClick={() => setSelectedCompany(null)}
                    className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    ×
                  </button>
                </div>
              </div>
              
              <div className="p-6">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Company Info */}
                  <div className="lg:col-span-2 space-y-6">
                    <div className="flex items-center space-x-6">
                      <img
                        src={selectedCompany.logo}
                        alt={selectedCompany.name}
                        className="w-20 h-20 rounded-xl bg-gray-200 object-cover"
                      />
                      <div className="flex-1">
                        <h3 className="text-2xl font-bold text-gray-900">{selectedCompany.name}</h3>
                        <p className="text-gray-600 mb-2">{selectedCompany.industry}</p>
                        <div className="flex items-center space-x-4">
                          <span className={`px-3 py-1 rounded-full text-sm ${getStatusColor(selectedCompany.status)}`}>
                            {selectedCompany.status}
                          </span>
                          <span className="text-sm text-gray-500">Est. {selectedCompany.establishedYear}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="text-lg font-semibold text-gray-900 mb-3">Contact Information</h4>
                        <div className="space-y-3">
                          <div className="flex items-center space-x-3">
                            <Mail className="w-5 h-5 text-gray-400" />
                            <span className="text-gray-600">{selectedCompany.email}</span>
                          </div>
                          <div className="flex items-center space-x-3">
                            <Phone className="w-5 h-5 text-gray-400" />
                            <span className="text-gray-600">{selectedCompany.phone}</span>
                          </div>
                          <div className="flex items-center space-x-3">
                            <Globe className="w-5 h-5 text-gray-400" />
                            <a href={selectedCompany.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-700">
                              {selectedCompany.website}
                            </a>
                          </div>
                          <div className="flex items-center space-x-3">
                            <MapPin className="w-5 h-5 text-gray-400" />
                            <span className="text-gray-600">{selectedCompany.location}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="text-lg font-semibold text-gray-900 mb-3">Company Details</h4>
                        <div className="space-y-3">
                          <div className="flex justify-between">
                            <span className="text-gray-600">Contact Person:</span>
                            <span className="font-medium">{selectedCompany.contactPerson}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Designation:</span>
                            <span className="font-medium">{selectedCompany.designation}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Employee Count:</span>
                            <span className="font-medium">{selectedCompany.employeeCount}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Last Active:</span>
                            <span className="font-medium">{selectedCompany.lastActive}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900 mb-3">About Company</h4>
                      <p className="text-gray-600 leading-relaxed">{selectedCompany.description}</p>
                    </div>
                    
                    {selectedCompany.requirements && (
                      <div>
                        <h4 className="text-lg font-semibold text-gray-900 mb-3">General Requirements</h4>
                        <div className="space-y-3">
                          <div>
                            <span className="text-sm font-medium text-gray-700">Minimum CGPA: </span>
                            <span className="text-sm text-gray-600">{selectedCompany.requirements.minCGPA}</span>
                          </div>
                          <div>
                            <span className="text-sm font-medium text-gray-700">Preferred Departments: </span>
                            <div className="flex flex-wrap gap-1 mt-1">
                              {selectedCompany.requirements.departments.map((dept, index) => (
                                <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">
                                  {dept}
                                </span>
                              ))}
                            </div>
                          </div>
                          {selectedCompany.requirements.skills && (
                            <div>
                              <span className="text-sm font-medium text-gray-700">Required Skills: </span>
                              <div className="flex flex-wrap gap-1 mt-1">
                                {selectedCompany.requirements.skills.map((skill, index) => (
                                  <span key={index} className="px-2 py-1 bg-emerald-100 text-emerald-800 text-xs rounded">
                                    {skill}
                                  </span>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                    
                    {selectedCompany.placementHistory && selectedCompany.placementHistory.length > 0 && (
                      <div>
                        <h4 className="text-lg font-semibold text-gray-900 mb-3">Placement History</h4>
                        <div className="overflow-x-auto">
                          <table className="w-full">
                            <thead>
                              <tr className="border-b border-gray-200">
                                <th className="text-left py-2 font-medium text-gray-700">Year</th>
                                <th className="text-center py-2 font-medium text-gray-700">Students Hired</th>
                                <th className="text-center py-2 font-medium text-gray-700">Average Package</th>
                              </tr>
                            </thead>
                            <tbody>
                              {selectedCompany.placementHistory.map((history, index) => (
                                <tr key={index} className="border-b border-gray-50">
                                  <td className="py-2 font-medium">{history.year}</td>
                                  <td className="py-2 text-center">{history.hired}</td>
                                  <td className="py-2 text-center font-medium text-emerald-600">{history.package}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    )}
                  </div>
                  
                  {/* Quick Stats */}
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 gap-4">
                      <div className="bg-blue-50 rounded-lg p-4 text-center">
                        <div className="text-2xl font-bold text-blue-600">{selectedCompany.activeJobs}</div>
                        <div className="text-sm text-gray-600">Active Jobs</div>
                      </div>
                      
                      <div className="bg-emerald-50 rounded-lg p-4 text-center">
                        <div className="text-2xl font-bold text-emerald-600">{selectedCompany.totalApplications}</div>
                        <div className="text-sm text-gray-600">Total Applications</div>
                      </div>
                      
                      <div className="bg-purple-50 rounded-lg p-4 text-center">
                        <div className="text-2xl font-bold text-purple-600">{selectedCompany.selectedCandidates}</div>
                        <div className="text-sm text-gray-600">Selected Candidates</div>
                      </div>
                      
                      <div className="bg-amber-50 rounded-lg p-4 text-center">
                        <div className="text-2xl font-bold text-amber-600">{selectedCompany.averagePackage}</div>
                        <div className="text-sm text-gray-600">Average Package</div>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <button className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2">
                        <Edit3 className="w-4 h-4" />
                        Edit Company
                      </button>
                      <button className="w-full px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors flex items-center justify-center gap-2">
                        <Briefcase className="w-4 h-4" />
                        View Jobs
                      </button>
                      <button className="w-full px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors flex items-center justify-center gap-2">
                        <FileText className="w-4 h-4" />
                        View Applications
                      </button>
                      <button className="w-full px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors flex items-center justify-center gap-2">
                        <ExternalLink className="w-4 h-4" />
                        Company Portal
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

export default ManageCompanies
