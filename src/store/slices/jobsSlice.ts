import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import type { Job, JobForm } from '../../types'

interface JobsState {
  jobs: Job[]
  currentJob: Job | null
  loading: boolean
  error: string | null
  filters: {
    search: string
    location: string[]
    type: string[]
    skills: string[]
    salaryMin: number
    salaryMax: number
  }
  pagination: {
    page: number
    limit: number
    total: number
    hasMore: boolean
  }
}

const initialState: JobsState = {
  jobs: [],
  currentJob: null,
  loading: false,
  error: null,
  filters: {
    search: '',
    location: [],
    type: [],
    skills: [],
    salaryMin: 0,
    salaryMax: 0,
  },
  pagination: {
    page: 1,
    limit: 10,
    total: 0,
    hasMore: false,
  },
}

// Async thunks
export const fetchJobs = createAsyncThunk(
  'jobs/fetchJobs',
  async (params: {
    page?: number
    limit?: number
    search?: string
    filters?: any
  } = {}, { rejectWithValue }) => {
    try {
      const queryParams = new URLSearchParams({
        page: (params.page || 1).toString(),
        limit: (params.limit || 10).toString(),
        ...(params.search && { search: params.search }),
        ...params.filters,
      })

      const response = await fetch(`/api/jobs?${queryParams}`)
      
      if (!response.ok) {
        throw new Error('Failed to fetch jobs')
      }
      
      return await response.json()
    } catch (error: any) {
      return rejectWithValue(error.message)
    }
  }
)

export const fetchJobById = createAsyncThunk(
  'jobs/fetchJobById',
  async (jobId: string, { rejectWithValue }) => {
    try {
      const response = await fetch(`/api/jobs/${jobId}`)
      
      if (!response.ok) {
        throw new Error('Failed to fetch job')
      }
      
      return await response.json()
    } catch (error: any) {
      return rejectWithValue(error.message)
    }
  }
)

export const createJob = createAsyncThunk(
  'jobs/createJob',
  async (jobData: JobForm, { rejectWithValue }) => {
    try {
      const response = await fetch('/api/jobs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(jobData),
      })
      
      if (!response.ok) {
        throw new Error('Failed to create job')
      }
      
      return await response.json()
    } catch (error: any) {
      return rejectWithValue(error.message)
    }
  }
)

export const updateJob = createAsyncThunk(
  'jobs/updateJob',
  async ({ jobId, jobData }: { jobId: string; jobData: Partial<JobForm> }, { rejectWithValue }) => {
    try {
      const response = await fetch(`/api/jobs/${jobId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(jobData),
      })
      
      if (!response.ok) {
        throw new Error('Failed to update job')
      }
      
      return await response.json()
    } catch (error: any) {
      return rejectWithValue(error.message)
    }
  }
)

export const deleteJob = createAsyncThunk(
  'jobs/deleteJob',
  async (jobId: string, { rejectWithValue }) => {
    try {
      const response = await fetch(`/api/jobs/${jobId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      })
      
      if (!response.ok) {
        throw new Error('Failed to delete job')
      }
      
      return jobId
    } catch (error: any) {
      return rejectWithValue(error.message)
    }
  }
)

const jobsSlice = createSlice({
  name: 'jobs',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null
    },
    setCurrentJob: (state, action: PayloadAction<Job | null>) => {
      state.currentJob = action.payload
    },
    updateFilters: (state, action: PayloadAction<Partial<JobsState['filters']>>) => {
      state.filters = { ...state.filters, ...action.payload }
    },
    clearFilters: (state) => {
      state.filters = initialState.filters
    },
    resetPagination: (state) => {
      state.pagination = initialState.pagination
    },
  },
  extraReducers: (builder) => {
    // Fetch jobs
    builder
      .addCase(fetchJobs.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchJobs.fulfilled, (state, action) => {
        state.loading = false
        state.jobs = action.payload.data
        state.pagination = {
          ...state.pagination,
          ...action.payload.pagination,
        }
        state.error = null
      })
      .addCase(fetchJobs.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })

    // Fetch job by ID
    builder
      .addCase(fetchJobById.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchJobById.fulfilled, (state, action) => {
        state.loading = false
        state.currentJob = action.payload
        state.error = null
      })
      .addCase(fetchJobById.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })

    // Create job
    builder
      .addCase(createJob.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(createJob.fulfilled, (state, action) => {
        state.loading = false
        state.jobs.unshift(action.payload)
        state.error = null
      })
      .addCase(createJob.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })

    // Update job
    builder
      .addCase(updateJob.fulfilled, (state, action) => {
        const index = state.jobs.findIndex(job => job.id === action.payload.id)
        if (index !== -1) {
          state.jobs[index] = action.payload
        }
        if (state.currentJob?.id === action.payload.id) {
          state.currentJob = action.payload
        }
      })

    // Delete job
    builder
      .addCase(deleteJob.fulfilled, (state, action) => {
        state.jobs = state.jobs.filter(job => job.id !== action.payload)
        if (state.currentJob?.id === action.payload) {
          state.currentJob = null
        }
      })
  },
})

export const {
  clearError,
  setCurrentJob,
  updateFilters,
  clearFilters,
  resetPagination,
} = jobsSlice.actions

export default jobsSlice.reducer