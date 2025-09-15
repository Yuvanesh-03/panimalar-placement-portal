import React from 'react'
import { Card } from '../components/ui'

const OfficerDashboard: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <Card className="p-12 max-w-2xl w-full text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Placement Officer Dashboard</h1>
        <p className="text-gray-600 mb-6">Officer dashboard layout coming soon...</p>
        <p className="text-sm text-gray-500">Manage students, companies, placement drives, and generate reports</p>
      </Card>
    </div>
  )
}

export default OfficerDashboard