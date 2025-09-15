import React from 'react'
import { motion } from 'framer-motion'
import { 
  ArrowRight, 
  Users, 
  Building, 
  TrendingUp, 
  GraduationCap,
  Search,
  FileText,
  BarChart3,
  Check,
  Star,
  Mail,
  Phone,
  MapPin
} from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { Button, Card } from '../components/ui'

const LandingPage: React.FC = () => {
  const navigate = useNavigate()

  const features = [
    {
      icon: <Users className="w-12 h-12 text-blue-600" />,
      title: 'For Students',
      description: 'Build profile, apply to jobs, and track placement stats.',
      color: 'blue'
    },
    {
      icon: <Building className="w-12 h-12 text-emerald-600" />,
      title: 'For Companies',
      description: 'Post jobs, shortlist candidates, and schedule interviews.',
      color: 'emerald'
    },
    {
      icon: <BarChart3 className="w-12 h-12 text-amber-600" />,
      title: 'For Placement Officers',
      description: 'Manage placement drives and generate reports.',
      color: 'amber'
    }
  ]

  const howItWorks = [
    {
      step: 1,
      title: 'Register',
      description: 'Register as a student or company.',
      icon: <Users className="w-8 h-8" />
    },
    {
      step: 2,
      title: 'Build Profile',
      description: 'Build your profile or post a job.',
      icon: <FileText className="w-8 h-8" />
    },
    {
      step: 3,
      title: 'Get Matched',
      description: 'Get matched and hired.',
      icon: <TrendingUp className="w-8 h-8" />
    }
  ]

  const stats = [
    { number: '5000+', label: 'Students Placed' },
    { number: '200+', label: 'Companies Onboarded' },
    { number: '95%', label: 'Success Rate in Placements' }
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-emerald-600 rounded-lg flex items-center justify-center">
                <GraduationCap className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">Campus Placement Portal</span>
            </div>
            
            <div className="hidden md:flex items-center space-x-8">
              <a href="#home" className="nav-link">Home</a>
              <a href="#features" className="nav-link">Features</a>
              <a href="#how-it-works" className="nav-link">How It Works</a>
              <a href="#stats" className="nav-link">About</a>
              <a href="#contact" className="nav-link">Contact</a>
            </div>
            
            <div className="flex items-center space-x-4">
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => navigate('/auth/login')}
              >
                Login
              </Button>
              <Button 
                variant="accent" 
                size="sm"
                onClick={() => navigate('/auth/register')}
              >
                Register
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-emerald-50 overflow-hidden">
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
                  className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold leading-tight"
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

      {/* Features Section */}
      <section id="features" className="py-20 bg-white">
        <div className="container mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-gray-900 mb-4">
              Built for Everyone
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Our platform serves students, companies, and placement officers with tailored features
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
              >
                <Card className="p-8 text-center hover:shadow-lg transition-all duration-300 group">
                  <div className={`w-20 h-20 mx-auto mb-6 bg-${feature.color}-100 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 bg-gray-50">
        <div className="container mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Simple steps to connect students with their dream careers
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {howItWorks.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="text-center relative"
              >
                {/* Step Number */}
                <div className="w-16 h-16 mx-auto mb-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xl font-bold">
                  {step.step}
                </div>
                
                {/* Connector Line */}
                {index < howItWorks.length - 1 && (
                  <div className="hidden md:block absolute top-8 left-1/2 w-full h-0.5 bg-blue-200 -z-10" />
                )}
                
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section id="stats" className="py-20 bg-gradient-to-r from-blue-600 to-emerald-600 text-white">
        <div className="container mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
              Trusted by Thousands
            </h2>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto">
              Join the success story of Panimalar Engineering College
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="text-center"
              >
                <div className="text-4xl md:text-5xl font-bold mb-2">{stat.number}</div>
                <div className="text-lg text-blue-100">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-emerald-600 rounded-lg flex items-center justify-center">
                  <GraduationCap className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold">PEC Portal</span>
              </div>
              <p className="text-gray-400 mb-4">
                Connecting students with opportunities at Panimalar Engineering College
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#home" className="hover:text-white transition-colors">Home</a></li>
                <li><a href="#features" className="hover:text-white transition-colors">Features</a></li>
                <li><a href="#how-it-works" className="hover:text-white transition-colors">How It Works</a></li>
                <li><a href="#contact" className="hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">For Users</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="/auth/register" className="hover:text-white transition-colors">Students</a></li>
                <li><a href="/auth/register" className="hover:text-white transition-colors">Companies</a></li>
                <li><a href="/auth/register" className="hover:text-white transition-colors">Officers</a></li>
                <li><a href="/auth/login" className="hover:text-white transition-colors">Login</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Contact Info</h4>
              <div className="space-y-3 text-gray-400">
                <div className="flex items-center space-x-3">
                  <Mail className="w-4 h-4" />
                  <span>placement@pec.edu</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="w-4 h-4" />
                  <span>+91 44 1234 5678</span>
                </div>
                <div className="flex items-center space-x-3">
                  <MapPin className="w-4 h-4" />
                  <span>Chennai, Tamil Nadu</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Panimalar Engineering College. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default LandingPage