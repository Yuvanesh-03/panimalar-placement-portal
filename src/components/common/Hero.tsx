import React from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Users, Building, TrendingUp } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { Button, Card } from '../ui'

const Hero: React.FC = () => {
  const navigate = useNavigate()
  
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-emerald-50 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-pattern-dots opacity-30" />
      
      {/* Floating Elements */}
      <motion.div 
        className="absolute top-20 left-10 w-20 h-20 bg-blue-200 rounded-full opacity-20"
        animate={{ y: [-20, 20], rotate: 360 }}
        transition={{ duration: 6, repeat: Infinity, repeatType: 'reverse' }}
      />
      <motion.div 
        className="absolute bottom-20 right-10 w-16 h-16 bg-emerald-200 rounded-full opacity-20"
        animate={{ y: [20, -20], rotate: -360 }}
        transition={{ duration: 8, repeat: Infinity, repeatType: 'reverse' }}
      />
      <motion.div 
        className="absolute top-1/2 right-20 w-12 h-12 bg-amber-200 rounded-full opacity-20"
        animate={{ x: [-10, 10], y: [-10, 10] }}
        transition={{ duration: 4, repeat: Infinity, repeatType: 'reverse' }}
      />
      
      <div className="container mx-auto px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            {/* College Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium"
            >
              🎓 Panimalar Engineering College
            </motion.div>
            
            {/* Main Heading */}
            <div className="space-y-4">
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="text-5xl lg:text-6xl font-heading font-bold leading-tight"
              >
                Launch Your{' '}
                <span className="text-gradient-hero">Career</span>{' '}
                with the Right{' '}
                <span className="text-gradient-hero">Opportunity</span>
              </motion.h1>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="text-lg lg:text-xl text-gray-600 max-w-lg leading-relaxed"
              >
                Students connect with companies. Companies hire the best talent. 
                Placement officers bring it together seamlessly.
              </motion.p>
            </div>
            
            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Button 
                variant="accent" 
                size="lg" 
                rightIcon={<ArrowRight className="w-5 h-5" />}
                className="shadow-glow-amber transform hover:scale-105"
                onClick={() => navigate('/auth/register')}
              >
                Register Now
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                className="group"
                onClick={() => navigate('/auth/login')}
              >
                Explore Jobs
                <ArrowRight className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform" />
              </Button>
            </motion.div>
            
            {/* Quick Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.9 }}
              className="grid grid-cols-3 gap-6 pt-8"
            >
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-900">5000+</div>
                <div className="text-sm text-gray-600">Students Placed</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-emerald-600">200+</div>
                <div className="text-sm text-gray-600">Companies</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-amber-500">95%</div>
                <div className="text-sm text-gray-600">Success Rate</div>
              </div>
            </motion.div>
          </motion.div>
          
          {/* Right Column - Illustration/Cards */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative"
          >
            {/* Main Illustration Card */}
            <Card className="p-8 bg-gradient-to-br from-white to-gray-50 border-2 border-white shadow-strong">
              <div className="space-y-6">
                <div className="flex items-center justify-center w-16 h-16 bg-blue-100 rounded-2xl mx-auto">
                  <TrendingUp className="w-8 h-8 text-blue-600" />
                </div>
                
                <div className="text-center space-y-2">
                  <h3 className="text-xl font-semibold text-gray-900">
                    Smart Placement Portal
                  </h3>
                  <p className="text-gray-600">
                    AI-powered matching system connecting students with their dream jobs
                  </p>
                </div>
                
                {/* Feature Pills */}
                <div className="flex flex-wrap gap-2 justify-center">
                  <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
                    Profile Matching
                  </span>
                  <span className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-xs font-medium">
                    Real-time Updates
                  </span>
                  <span className="px-3 py-1 bg-amber-100 text-amber-700 rounded-full text-xs font-medium">
                    Analytics
                  </span>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Hero
