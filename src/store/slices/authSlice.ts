import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import type { User, LoginForm, RegisterForm } from '../../types'

interface AuthState {
  user: User | null
  token: string | null
  isAuthenticated: boolean
  loading: boolean
  error: string | null
}

const initialState: AuthState = {
  user: null,
  token: localStorage.getItem('token'),
  isAuthenticated: !!localStorage.getItem('token'),
  loading: false,
  error: null,
}

// Dummy user credentials for easy testing
const DUMMY_USERS = {
  // Student dummy login
  'student@pec.edu': {
    password: 'student123',
    user: {
      id: 'student-1',
      email: 'student@pec.edu',
      name: 'John Doe',
      role: 'student' as const,
      profile: {
        rollNumber: 'PEC2021001',
        department: 'Computer Science',
        year: 4,
        phone: '+91 9876543210',
        resume: null,
        skills: ['JavaScript', 'React', 'Node.js'],
        gpa: 8.5
      }
    },
    token: 'dummy-student-token'
  },
  // Company dummy login
  'company@pec.edu': {
    password: 'company123',
    user: {
      id: 'company-1',
      email: 'company@pec.edu',
      name: 'Tech Corp HR',
      role: 'company' as const,
      profile: {
        companyName: 'Tech Corp Solutions',
        industry: 'Information Technology',
        website: 'https://techcorp.com',
        location: 'Chennai, Tamil Nadu',
        phone: '+91 9876543211',
        companySize: '500-1000',
        description: 'Leading IT solutions provider specializing in web and mobile development.'
      }
    },
    token: 'dummy-company-token'
  },
  // Placement Officer dummy login
  'officer@pec.edu': {
    password: 'officer123',
    user: {
      id: 'officer-1',
      email: 'officer@pec.edu',
      name: 'Prof. Sarah Wilson',
      role: 'officer' as const,
      profile: {
        employeeId: 'PEC2020001',
        department: 'Placement Cell',
        phone: '+91 9876543212',
        designation: 'Senior Placement Officer',
        experience: '5+ years'
      }
    },
    token: 'dummy-officer-token'
  }
}

// Async thunks for API calls
export const loginUser = createAsyncThunk(
  'auth/login',
  async (credentials: LoginForm, { rejectWithValue }) => {
    try {
      // Check dummy credentials first
      const dummyUser = DUMMY_USERS[credentials.email as keyof typeof DUMMY_USERS]
      
      if (dummyUser && dummyUser.password === credentials.password) {
        // Mock delay to simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000))
        
        // Store token in localStorage
        localStorage.setItem('token', dummyUser.token)
        
        return {
          user: dummyUser.user,
          token: dummyUser.token
        }
      }
      
      // Fallback to actual API call for real users
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      })
      
      if (!response.ok) {
        throw new Error('Invalid credentials')
      }
      
      const data = await response.json()
      
      // Store token in localStorage
      localStorage.setItem('token', data.token)
      
      return data
    } catch (error: any) {
      return rejectWithValue(error.message || 'Invalid credentials')
    }
  }
)

export const registerUser = createAsyncThunk(
  'auth/register',
  async (userData: RegisterForm, { rejectWithValue }) => {
    try {
      // Mock API call - replace with actual API
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      })
      
      if (!response.ok) {
        throw new Error('Registration failed')
      }
      
      const data = await response.json()
      
      // Store token in localStorage
      localStorage.setItem('token', data.token)
      
      return data
    } catch (error: any) {
      return rejectWithValue(error.message)
    }
  }
)

export const logoutUser = createAsyncThunk(
  'auth/logout',
  async () => {
    // Clear token from localStorage
    localStorage.removeItem('token')
    
    // Mock API call for logout
    try {
      await fetch('/api/auth/logout', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      })
    } catch (error) {
      // Logout locally even if API fails
      console.error('Logout API failed:', error)
    }
  }
)

export const getCurrentUser = createAsyncThunk(
  'auth/getCurrentUser',
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token')
      if (!token) {
        throw new Error('No token found')
      }
      
      // Check if it's a dummy token
      const dummyUser = Object.values(DUMMY_USERS).find(user => user.token === token)
      if (dummyUser) {
        return dummyUser.user
      }
      
      // Fallback to actual API call
      const response = await fetch('/api/auth/me', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      })
      
      if (!response.ok) {
        throw new Error('Failed to fetch user')
      }
      
      const user = await response.json()
      return user
    } catch (error: any) {
      localStorage.removeItem('token')
      return rejectWithValue(error.message)
    }
  }
)

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null
    },
    updateUser: (state, action: PayloadAction<Partial<User>>) => {
      if (state.user) {
        state.user = { ...state.user, ...action.payload }
      }
    },
    clearAuth: (state) => {
      state.user = null
      state.token = null
      state.isAuthenticated = false
      localStorage.removeItem('token')
    },
  },
  extraReducers: (builder) => {
    // Login cases
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false
        state.user = action.payload.user
        state.token = action.payload.token
        state.isAuthenticated = true
        state.error = null
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
        state.isAuthenticated = false
      })
      
      // Register cases
      .addCase(registerUser.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false
        state.user = action.payload.user
        state.token = action.payload.token
        state.isAuthenticated = true
        state.error = null
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
        state.isAuthenticated = false
      })
      
      // Logout cases
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null
        state.token = null
        state.isAuthenticated = false
        state.loading = false
        state.error = null
      })
      
      // Get current user cases
      .addCase(getCurrentUser.pending, (state) => {
        state.loading = true
      })
      .addCase(getCurrentUser.fulfilled, (state, action) => {
        state.loading = false
        state.user = action.payload
        state.isAuthenticated = true
        state.error = null
      })
      .addCase(getCurrentUser.rejected, (state, action) => {
        state.loading = false
        state.user = null
        state.token = null
        state.isAuthenticated = false
        state.error = action.payload as string
      })
  },
})

export const { clearError, updateUser, clearAuth } = authSlice.actions
export default authSlice.reducer