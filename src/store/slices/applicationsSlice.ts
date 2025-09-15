import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import type { Application, ApplicationStatus } from '../../types'

interface ApplicationsState {
  applications: Application[]
  currentApplication: Application | null
  loading: boolean
  error: string | null
  filters: {
    status: ApplicationStatus[]
    dateRange: {
      from: string
      to: string
    }
  }
}

const initialState: ApplicationsState = {
  applications: [],
  currentApplication: null,
  loading: false,
  error: null,
  filters: {
    status: [],
    dateRange: {
      from: '',
      to: '',
    },
  },
}

// Async thunks
export const fetchApplications = createAsyncThunk(
  'applications/fetchApplications',
  async (params: {
    studentId?: string
    jobId?: string
    status?: ApplicationStatus[]
  } = {}, { rejectWithValue }) => {
    try {
      const queryParams = new URLSearchParams()
      
      if (params.studentId) queryParams.append('studentId', params.studentId)
      if (params.jobId) queryParams.append('jobId', params.jobId)
      if (params.status?.length) {
        params.status.forEach(status => queryParams.append('status', status))
      }

      const response = await fetch(`/api/applications?${queryParams}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      })
      
      if (!response.ok) {
        throw new Error('Failed to fetch applications')
      }
      
      return await response.json()
    } catch (error: any) {
      return rejectWithValue(error.message)
    }
  }
)

export const applyToJob = createAsyncThunk(
  'applications/applyToJob',
  async (jobId: string, { rejectWithValue }) => {
    try {
      const response = await fetch('/api/applications', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({ jobId }),
      })
      
      if (!response.ok) {
        throw new Error('Failed to apply to job')
      }
      
      return await response.json()
    } catch (error: any) {
      return rejectWithValue(error.message)
    }
  }
)

export const updateApplicationStatus = createAsyncThunk(
  'applications/updateStatus',
  async ({ 
    applicationId, 
    status, 
    notes 
  }: { 
    applicationId: string
    status: ApplicationStatus
    notes?: string 
  }, { rejectWithValue }) => {
    try {
      const response = await fetch(`/api/applications/${applicationId}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({ status, notes }),
      })
      
      if (!response.ok) {
        throw new Error('Failed to update application status')
      }
      
      return await response.json()
    } catch (error: any) {
      return rejectWithValue(error.message)
    }
  }
)

export const scheduleInterview = createAsyncThunk(
  'applications/scheduleInterview',
  async ({ 
    applicationId, 
    interviewDate 
  }: { 
    applicationId: string
    interviewDate: string
  }, { rejectWithValue }) => {
    try {
      const response = await fetch(`/api/applications/${applicationId}/interview`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({ interviewDate }),
      })
      
      if (!response.ok) {
        throw new Error('Failed to schedule interview')
      }
      
      return await response.json()
    } catch (error: any) {
      return rejectWithValue(error.message)
    }
  }
)

export const withdrawApplication = createAsyncThunk(
  'applications/withdrawApplication',
  async (applicationId: string, { rejectWithValue }) => {
    try {
      const response = await fetch(`/api/applications/${applicationId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      })
      
      if (!response.ok) {
        throw new Error('Failed to withdraw application')
      }
      
      return applicationId
    } catch (error: any) {
      return rejectWithValue(error.message)
    }
  }
)

const applicationsSlice = createSlice({
  name: 'applications',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null
    },
    setCurrentApplication: (state, action: PayloadAction<Application | null>) => {
      state.currentApplication = action.payload
    },
    updateFilters: (state, action: PayloadAction<Partial<ApplicationsState['filters']>>) => {
      state.filters = { ...state.filters, ...action.payload }
    },
    clearFilters: (state) => {
      state.filters = initialState.filters
    },
  },
  extraReducers: (builder) => {
    // Fetch applications
    builder
      .addCase(fetchApplications.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchApplications.fulfilled, (state, action) => {
        state.loading = false
        state.applications = action.payload.data || action.payload
        state.error = null
      })
      .addCase(fetchApplications.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })

    // Apply to job
    builder
      .addCase(applyToJob.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(applyToJob.fulfilled, (state, action) => {
        state.loading = false
        state.applications.unshift(action.payload)
        state.error = null
      })
      .addCase(applyToJob.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })

    // Update application status
    builder
      .addCase(updateApplicationStatus.fulfilled, (state, action) => {
        const index = state.applications.findIndex(
          app => app.id === action.payload.id
        )
        if (index !== -1) {
          state.applications[index] = action.payload
        }
        if (state.currentApplication?.id === action.payload.id) {
          state.currentApplication = action.payload
        }
      })

    // Schedule interview
    builder
      .addCase(scheduleInterview.fulfilled, (state, action) => {
        const index = state.applications.findIndex(
          app => app.id === action.payload.id
        )
        if (index !== -1) {
          state.applications[index] = action.payload
        }
        if (state.currentApplication?.id === action.payload.id) {
          state.currentApplication = action.payload
        }
      })

    // Withdraw application
    builder
      .addCase(withdrawApplication.fulfilled, (state, action) => {
        state.applications = state.applications.filter(
          app => app.id !== action.payload
        )
        if (state.currentApplication?.id === action.payload) {
          state.currentApplication = null
        }
      })
  },
})

export const {
  clearError,
  setCurrentApplication,
  updateFilters,
  clearFilters,
} = applicationsSlice.actions

export default applicationsSlice.reducer