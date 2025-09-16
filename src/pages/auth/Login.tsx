import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Eye, EyeOff, Mail, Lock, ArrowRight, GraduationCap } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../store'
import { loginUser, clearError } from '../../store/slices/authSlice'
import { Button, Card, Input } from '../../components/ui'

const Login: React.FC = () => {
  const dispatch = useAppDispatch()
  const { loading, error } = useAppSelector((state) => state.auth)
  
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    remember: false
  })
  
  const [_showPassword, _setShowPassword] = useState(false)

  const handleChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    if (error) {
      dispatch(clearError())
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    dispatch(loginUser({
      email: formData.email,
      password: formData.password,
      remember: formData.remember
    }))
  }

  const fillDummyCredentials = (email: string, password: string) => {
    setFormData({
      email,
      password,
      remember: false
    })
    if (error) {
      dispatch(clearError())
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-emerald-50 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl grid lg:grid-cols-2 gap-12 items-center">
        
        {/* Left Column - Illustration */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="hidden lg:flex flex-col items-center justify-center space-y-8"
        >
          <div className="relative">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 border-4 border-blue-200 rounded-full"
            />
            <div className="w-32 h-32 bg-gradient-to-br from-blue-600 to-emerald-600 rounded-full flex items-center justify-center">
              <GraduationCap className="w-16 h-16 text-white" />
            </div>
          </div>
          
          <div className="text-center space-y-4">
            <h2 className="text-3xl font-bold text-gray-900">
              Welcome Back to
            </h2>
            <h3 className="text-2xl font-bold text-gradient-hero">
              Panimalar Engineering College
            </h3>
            <p className="text-lg text-gray-600 max-w-md">
              Connect with opportunities, grow your career, and shape your future in the tech industry.
            </p>
          </div>
          
          {/* Floating Stats */}
          <div className="grid grid-cols-3 gap-6 w-full max-w-md">
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-center"
            >
              <div className="text-2xl font-bold text-blue-600">5K+</div>
              <div className="text-sm text-gray-600">Students</div>
            </motion.div>
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="text-center"
            >
              <div className="text-2xl font-bold text-emerald-600">200+</div>
              <div className="text-sm text-gray-600">Companies</div>
            </motion.div>
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.9 }}
              className="text-center"
            >
              <div className="text-2xl font-bold text-amber-500">95%</div>
              <div className="text-sm text-gray-600">Success</div>
            </motion.div>
          </div>
        </motion.div>

        {/* Right Column - Login Form */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <Card className="p-8 max-w-md mx-auto">
            <div className="space-y-6">
              {/* Header */}
              <div className="text-center space-y-2">
                <h1 className="text-3xl font-bold text-gray-900">Sign In</h1>
                <p className="text-gray-600">
                  Access your placement portal account
                </p>
              </div>

              {/* Error Message */}
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm"
                >
                  {error}
                </motion.div>
              )}

              {/* Login Form */}
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-4">
                  <Input
                    label="Email Address"
                    type="email"
                    placeholder="your.email@pec.edu"
                    value={formData.email}
                    onChange={(value) => handleChange('email', value)}
                    leftIcon={<Mail className="w-5 h-5" />}
                    required
                  />

                  <Input
                    label="Password"
                    type="password"
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={(value) => handleChange('password', value)}
                    leftIcon={<Lock className="w-5 h-5" />}
                    required
                  />
                </div>

                {/* Remember & Forgot */}
                <div className="flex items-center justify-between">
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.remember}
                      onChange={(e) => handleChange('remember', e.target.checked)}
                      className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <span className="text-sm text-gray-600">Remember me</span>
                  </label>
                  
                  <Link
                    to="/auth/forgot-password"
                    className="text-sm text-blue-600 hover:text-blue-700 transition-colors"
                  >
                    Forgot password?
                  </Link>
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  fullWidth
                  loading={loading}
                  rightIcon={<ArrowRight className="w-5 h-5" />}
                  className="shadow-lg hover:shadow-xl"
                >
                  Sign In
                </Button>
              </form>

              {/* Social Login */}
              <div className="space-y-4">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-200" />
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-4 bg-white text-gray-500">Or continue with</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <Button variant="outline" size="md" fullWidth>
                    <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                      <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                      <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                      <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                      <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                    </svg>
                    Google
                  </Button>
                  
                  <Button variant="outline" size="md" fullWidth>
                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                    </svg>
                    Twitter
                  </Button>
                </div>
              </div>

              {/* Dummy Credentials Info */}
              <div className="bg-gradient-to-r from-blue-50 to-emerald-50 p-4 rounded-xl border border-blue-100">
                <h4 className="text-sm font-semibold text-gray-700 mb-3 text-center">Demo Login Credentials</h4>
                <div className="space-y-3 text-xs">
                  <div 
                    className="flex justify-between items-center p-2 bg-white rounded-lg cursor-pointer hover:bg-blue-50 transition-colors"
                    onClick={() => fillDummyCredentials('student@pec.edu', 'student123')}
                  >
                    <div>
                      <div className="font-medium text-blue-600">👨‍🎓 Student</div>
                      <div className="text-gray-500">student@pec.edu</div>
                    </div>
                    <div className="text-right">
                      <div className="font-mono bg-gray-100 px-2 py-1 rounded text-gray-700">student123</div>
                    </div>
                  </div>
                  
                  <div 
                    className="flex justify-between items-center p-2 bg-white rounded-lg cursor-pointer hover:bg-emerald-50 transition-colors"
                    onClick={() => fillDummyCredentials('company@pec.edu', 'company123')}
                  >
                    <div>
                      <div className="font-medium text-emerald-600">🏢 Company</div>
                      <div className="text-gray-500">company@pec.edu</div>
                    </div>
                    <div className="text-right">
                      <div className="font-mono bg-gray-100 px-2 py-1 rounded text-gray-700">company123</div>
                    </div>
                  </div>
                  
                  <div 
                    className="flex justify-between items-center p-2 bg-white rounded-lg cursor-pointer hover:bg-amber-50 transition-colors"
                    onClick={() => fillDummyCredentials('officer@pec.edu', 'officer123')}
                  >
                    <div>
                      <div className="font-medium text-amber-600">👩‍💼 Officer</div>
                      <div className="text-gray-500">officer@pec.edu</div>
                    </div>
                    <div className="text-right">
                      <div className="font-mono bg-gray-100 px-2 py-1 rounded text-gray-700">officer123</div>
                    </div>
                  </div>
                </div>
                <p className="text-xs text-gray-500 text-center mt-3">
                  Click on any credential to auto-fill the form
                </p>
              </div>

              {/* Sign Up Link */}
              <div className="text-center">
                <p className="text-sm text-gray-600">
                  Don't have an account?{' '}
                  <Link
                    to="/auth/register"
                    className="font-medium text-blue-600 hover:text-blue-700 transition-colors"
                  >
                    Create account
                  </Link>
                </p>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}

export default Login