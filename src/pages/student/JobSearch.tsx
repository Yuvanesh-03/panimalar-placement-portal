import React from 'react'
import { Card } from '../../components/ui'

const JobSearch: React.FC = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">Find Jobs</h1>
      <Card className="p-8">
        <div className="text-center">
          <p className="text-gray-600">Job search functionality coming soon...</p>
          <p className="text-sm text-gray-500 mt-2">Search and apply for placement opportunities</p>
        </div>
      </Card>
    </div>
  )
}

export default JobSearch