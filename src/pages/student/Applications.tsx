import React from 'react'
import { Card } from '../../components/ui'

const Applications: React.FC = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">My Applications</h1>
      <Card className="p-8">
        <div className="text-center">
          <p className="text-gray-600">Applications tracking coming soon...</p>
          <p className="text-sm text-gray-500 mt-2">View and manage your job applications</p>
        </div>
      </Card>
    </div>
  )
}

export default Applications