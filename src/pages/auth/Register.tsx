import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  ArrowRight, 
  ArrowLeft, 
  Check, 
  User, 
  Building, 
  Shield,
  Mail,
  Lock,
  Phone,
  GraduationCap,
  Briefcase,
  Upload
} from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../store'
import { registerUser, clearError } from '../../store/slices/authSlice'
import { Button, Card, Input } from '../../components/ui'
import type { UserRole } from '../../types'

const Register: React.FC = () => {
  const dispatch = useAppDispatch()
  const _navigate = useNavigate()
  const { loading, error } = useAppSelector((state) => state.auth)
  
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    role: '' as UserRole | '',
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    // Student specific
    studentId: '',
    college: 'Panimalar Engineering College',
    department: '',
    batch: '',
    // Company specific
    companyName: '',
    industry: '',
    website: '',
    // Officer specific
    designation: '',
    employeeId: ''
  })

  const steps = [
    { id: 1, title: 'Choose Role', description: 'Select your account type' },
    { id: 2, title: 'Basic Info', description: 'Enter your details' },
    { id: 3, title: 'Role Details', description: 'Complete your profile' },
    { id: 4, title: 'Verification', description: 'Verify your account' }
  ]

  const roleOptions = [
    {
      id: 'student',
      title: 'Student',
      description: 'Looking for placement opportunities and career growth',
      icon: <User className="w-8 h-8" />,
      color: 'blue',
      gradient: 'from-blue-500 to-blue-600'
    },
    {
      id: 'company',
      title: 'Company',
      description: 'Recruiting talented students for your organization',
      icon: <Building className="w-8 h-8" />,
      color: 'emerald',
      gradient: 'from-emerald-500 to-emerald-600'
    },
    {
      id: 'officer',
      title: 'Placement Officer',
      description: 'Managing placements and coordinating with companies',
      icon: <Shield className="w-8 h-8" />,
      color: 'amber',
      gradient: 'from-amber-500 to-amber-600'
    }
  ]

  const departments = [
    'Computer Science and Engineering',
    'Electronics and Communication Engineering',
    'Electrical and Electronics Engineering',
    'Mechanical Engineering',
    'Civil Engineering',
    'Information Technology',
    'Biotechnology',
    'Chemical Engineering'
  ]

  const industries = [
    'Information Technology',
    'Finance & Banking',
    'Healthcare',
    'Manufacturing',
    'Education',
    'E-commerce',
    'Telecommunications',
    'Consulting',
    'Automotive',
    'Aerospace'
  ]

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    if (error) {
      dispatch(clearError())
    }
  }

  const handleNext = () => {
    if (currentStep < steps.length) {
      setCurrentStep(prev => prev + 1)
    }
  }

  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1)
    }
  }

  const handleRoleSelect = (role: UserRole) => {
    setFormData(prev => ({ ...prev, role }))
    handleNext()
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (formData.password !== formData.confirmPassword) {
      // Handle password mismatch
      return
    }
    
    dispatch(registerUser(formData))
  }

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return formData.role !== ''
      case 2:
        return formData.name && formData.email && formData.password && formData.confirmPassword
      case 3:
        if (formData.role === 'student') {
          return formData.studentId && formData.department && formData.batch
        }
        if (formData.role === 'company') {
          return formData.companyName && formData.industry
        }
        if (formData.role === 'officer') {
          return formData.designation && formData.employeeId
        }
        return false
      default:
        return true
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-emerald-50 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex justify-center items-center space-x-4 mb-6">
            {steps.map((step, index) => (
              <React.Fragment key={step.id}>
                <motion.div
                  className={`flex items-center justify-center w-12 h-12 rounded-full border-2 transition-all duration-300 ${
                    currentStep >= step.id
                      ? 'bg-blue-600 border-blue-600 text-white'
                      : 'bg-white border-gray-300 text-gray-400'
                  }`}
                  initial={{ scale: 0.8 }}
                  animate={{ scale: currentStep === step.id ? 1.1 : 1 }}
                  transition={{ duration: 0.3 }}
                >
                  {currentStep > step.id ? (
                    <Check className="w-6 h-6" />
                  ) : (
                    <span className="font-semibold">{step.id}</span>
                  )}
                </motion.div>
                {index < steps.length - 1 && (
                  <div className={`w-16 h-1 transition-all duration-300 ${
                    currentStep > step.id ? 'bg-blue-600' : 'bg-gray-300'
                  }`} />
                )}
              </React.Fragment>
            ))}
          </div>
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900">{steps[currentStep - 1].title}</h2>
            <p className="text-gray-600">{steps[currentStep - 1].description}</p>
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="p-8">
              {/* Step 1: Role Selection */}
              {currentStep === 1 && (
                <div className="space-y-6">
                  <div className="text-center space-y-2">
                    <h3 className="text-xl font-semibold text-gray-900">Choose Your Role</h3>
                    <p className="text-gray-600">Select how you'll be using the placement portal</p>
                  </div>
                  
                  <div className="grid md:grid-cols-3 gap-4">
                    {roleOptions.map((option) => (
                      <motion.button
                        key={option.id}
                        onClick={() => handleRoleSelect(option.id as UserRole)}
                        className={`p-6 rounded-2xl border-2 transition-all duration-300 text-left hover:shadow-lg ${
                          formData.role === option.id
                            ? `border-${option.color}-500 bg-${option.color}-50`
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${option.gradient} text-white flex items-center justify-center mb-4`}>
                          {option.icon}
                        </div>
                        <h4 className="text-lg font-semibold text-gray-900 mb-2">{option.title}</h4>
                        <p className="text-sm text-gray-600">{option.description}</p>
                      </motion.button>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 2: Basic Information */}
              {currentStep === 2 && (
                <div className="space-y-6">
                  <div className="text-center space-y-2">
                    <h3 className="text-xl font-semibold text-gray-900">Basic Information</h3>
                    <p className="text-gray-600">Tell us about yourself</p>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <Input
                      label="Full Name"
                      placeholder="Enter your full name"
                      value={formData.name}
                      onChange={(value) => handleChange('name', value)}
                      leftIcon={<User className="w-5 h-5" />}
                      required
                    />

                    <Input
                      label="Email Address"
                      type="email"
                      placeholder="your.email@example.com"
                      value={formData.email}
                      onChange={(value) => handleChange('email', value)}
                      leftIcon={<Mail className="w-5 h-5" />}
                      required
                    />

                    <Input
                      label="Password"
                      type="password"
                      placeholder="Create a strong password"
                      value={formData.password}
                      onChange={(value) => handleChange('password', value)}
                      leftIcon={<Lock className="w-5 h-5" />}
                      required
                    />

                    <Input
                      label="Confirm Password"
                      type="password"
                      placeholder="Confirm your password"
                      value={formData.confirmPassword}
                      onChange={(value) => handleChange('confirmPassword', value)}
                      leftIcon={<Lock className="w-5 h-5" />}
                      required
                    />

                    <div className="md:col-span-2">
                      <Input
                        label="Phone Number"
                        type="tel"
                        placeholder="+91 XXXXX XXXXX"
                        value={formData.phone}
                        onChange={(value) => handleChange('phone', value)}
                        leftIcon={<Phone className="w-5 h-5" />}
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Step 3: Role-specific Information */}
              {currentStep === 3 && (
                <div className="space-y-6">
                  <div className="text-center space-y-2">
                    <h3 className="text-xl font-semibold text-gray-900">
                      {formData.role === 'student' ? 'Student Details' :
                       formData.role === 'company' ? 'Company Details' : 'Officer Details'}
                    </h3>
                    <p className="text-gray-600">Complete your profile information</p>
                  </div>

                  {/* Student Form */}
                  {formData.role === 'student' && (
                    <div className="grid md:grid-cols-2 gap-6">
                      <Input
                        label="Student ID"
                        placeholder="Enter your student ID"
                        value={formData.studentId}
                        onChange={(value) => handleChange('studentId', value)}
                        leftIcon={<GraduationCap className="w-5 h-5" />}
                        required
                      />

                      <Input
                        label="College"
                        value={formData.college}
                        onChange={(value) => handleChange('college', value)}
                        disabled
                        leftIcon={<Building className="w-5 h-5" />}
                      />

                      <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">
                          Department <span className="text-red-500">*</span>
                        </label>
                        <select
                          value={formData.department}
                          onChange={(e) => handleChange('department', e.target.value)}
                          className="w-full px-4 py-3 text-sm border border-gray-200 rounded-xl focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                          required
                        >
                          <option value="">Select Department</option>
                          {departments.map((dept) => (
                            <option key={dept} value={dept}>{dept}</option>
                          ))}
                        </select>
                      </div>

                      <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">
                          Batch Year <span className="text-red-500">*</span>
                        </label>
                        <select
                          value={formData.batch}
                          onChange={(e) => handleChange('batch', e.target.value)}
                          className="w-full px-4 py-3 text-sm border border-gray-200 rounded-xl focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                          required
                        >
                          <option value="">Select Batch</option>
                          <option value="2025">2025</option>
                          <option value="2024">2024</option>
                          <option value="2023">2023</option>
                          <option value="2022">2022</option>
                        </select>
                      </div>
                    </div>
                  )}

                  {/* Company Form */}
                  {formData.role === 'company' && (
                    <div className="grid md:grid-cols-2 gap-6">
                      <Input
                        label="Company Name"
                        placeholder="Enter company name"
                        value={formData.companyName}
                        onChange={(value) => handleChange('companyName', value)}
                        leftIcon={<Building className="w-5 h-5" />}
                        required
                      />

                      <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">
                          Industry <span className="text-red-500">*</span>
                        </label>
                        <select
                          value={formData.industry}
                          onChange={(e) => handleChange('industry', e.target.value)}
                          className="w-full px-4 py-3 text-sm border border-gray-200 rounded-xl focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                          required
                        >
                          <option value="">Select Industry</option>
                          {industries.map((industry) => (
                            <option key={industry} value={industry}>{industry}</option>
                          ))}
                        </select>
                      </div>

                      <div className="md:col-span-2">
                        <Input
                          label="Website (Optional)"
                          placeholder="https://company-website.com"
                          value={formData.website}
                          onChange={(value) => handleChange('website', value)}
                          leftIcon={<Briefcase className="w-5 h-5" />}
                        />
                      </div>
                    </div>
                  )}

                  {/* Officer Form */}
                  {formData.role === 'officer' && (
                    <div className="grid md:grid-cols-2 gap-6">
                      <Input
                        label="Designation"
                        placeholder="e.g., Placement Coordinator"
                        value={formData.designation}
                        onChange={(value) => handleChange('designation', value)}
                        leftIcon={<Shield className="w-5 h-5" />}
                        required
                      />

                      <Input
                        label="Employee ID"
                        placeholder="Enter your employee ID"
                        value={formData.employeeId}
                        onChange={(value) => handleChange('employeeId', value)}
                        leftIcon={<User className="w-5 h-5" />}
                        required
                      />

                      <div className="md:col-span-2">
                        <Input
                          label="College"
                          value={formData.college}
                          onChange={(value) => handleChange('college', value)}
                          disabled
                          leftIcon={<Building className="w-5 h-5" />}
                        />
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Step 4: Verification */}
              {currentStep === 4 && (
                <div className="text-center space-y-6">
                  <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                    <Check className="w-12 h-12 text-green-600" />
                  </div>
                  
                  <div>
                    <h3 className="text-2xl font-semibold text-gray-900 mb-2">Ready to Register!</h3>
                    <p className="text-gray-600">
                      Your account will be created as a <strong>{formData.role}</strong>. 
                      You can start using the platform immediately after registration.
                    </p>
                  </div>

                  {error && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-4 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm"
                    >
                      {error}
                    </motion.div>
                  )}

                  <Button
                    onClick={handleSubmit}
                    variant="primary"
                    size="lg"
                    loading={loading}
                    rightIcon={<ArrowRight className="w-5 h-5" />}
                    className="shadow-lg hover:shadow-xl"
                  >
                    Create Account
                  </Button>
                </div>
              )}

              {/* Navigation Buttons */}
              {currentStep < 4 && (
                <div className="flex justify-between mt-8">
                  <Button
                    onClick={handlePrev}
                    variant="outline"
                    disabled={currentStep === 1}
                    leftIcon={<ArrowLeft className="w-5 h-5" />}
                  >
                    Previous
                  </Button>

                  <Button
                    onClick={handleNext}
                    variant="primary"
                    disabled={!canProceed()}
                    rightIcon={<ArrowRight className="w-5 h-5" />}
                  >
                    Next Step
                  </Button>
                </div>
              )}

              {/* Sign In Link */}
              <div className="text-center mt-6">
                <p className="text-sm text-gray-600">
                  Already have an account?{' '}
                  <Link
                    to="/auth/login"
                    className="font-medium text-blue-600 hover:text-blue-700 transition-colors"
                  >
                    Sign in here
                  </Link>
                </p>
              </div>
            </Card>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}

export default Register