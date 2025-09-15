import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface UIState {
  theme: 'light' | 'dark'
  sidebarCollapsed: boolean
  notifications: {
    show: boolean
    message: string
    type: 'success' | 'error' | 'warning' | 'info'
  }
  loading: {
    global: boolean
    overlay: boolean
  }
  modals: {
    [key: string]: boolean
  }
}

const initialState: UIState = {
  theme: (localStorage.getItem('theme') as 'light' | 'dark') || 'light',
  sidebarCollapsed: localStorage.getItem('sidebarCollapsed') === 'true',
  notifications: {
    show: false,
    message: '',
    type: 'info',
  },
  loading: {
    global: false,
    overlay: false,
  },
  modals: {},
}

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.theme = state.theme === 'light' ? 'dark' : 'light'
      localStorage.setItem('theme', state.theme)
    },
    setTheme: (state, action: PayloadAction<'light' | 'dark'>) => {
      state.theme = action.payload
      localStorage.setItem('theme', state.theme)
    },
    toggleSidebar: (state) => {
      state.sidebarCollapsed = !state.sidebarCollapsed
      localStorage.setItem('sidebarCollapsed', state.sidebarCollapsed.toString())
    },
    setSidebarCollapsed: (state, action: PayloadAction<boolean>) => {
      state.sidebarCollapsed = action.payload
      localStorage.setItem('sidebarCollapsed', state.sidebarCollapsed.toString())
    },
    showNotification: (state, action: PayloadAction<{
      message: string
      type?: 'success' | 'error' | 'warning' | 'info'
    }>) => {
      state.notifications.show = true
      state.notifications.message = action.payload.message
      state.notifications.type = action.payload.type || 'info'
    },
    hideNotification: (state) => {
      state.notifications.show = false
      state.notifications.message = ''
    },
    setGlobalLoading: (state, action: PayloadAction<boolean>) => {
      state.loading.global = action.payload
    },
    setOverlayLoading: (state, action: PayloadAction<boolean>) => {
      state.loading.overlay = action.payload
    },
    openModal: (state, action: PayloadAction<string>) => {
      state.modals[action.payload] = true
    },
    closeModal: (state, action: PayloadAction<string>) => {
      state.modals[action.payload] = false
    },
    toggleModal: (state, action: PayloadAction<string>) => {
      state.modals[action.payload] = !state.modals[action.payload]
    },
  },
})

export const {
  toggleTheme,
  setTheme,
  toggleSidebar,
  setSidebarCollapsed,
  showNotification,
  hideNotification,
  setGlobalLoading,
  setOverlayLoading,
  openModal,
  closeModal,
  toggleModal,
} = uiSlice.actions

export default uiSlice.reducer