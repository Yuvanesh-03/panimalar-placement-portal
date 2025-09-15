import React from 'react'
import { Card } from '../../components/ui'

const StudentProfile: React.FC = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">Student Profile</h1>
      <Card className="p-8">
        <div className="text-center">
          <p className="text-gray-600">Profile management coming soon...</p>
          <p className="text-sm text-gray-500 mt-2">Edit your personal information, skills, and resume</p>
        </div>
      </Card>
    </div>
  )
}

export default StudentProfile