import { configureStore } from '@reduxjs/toolkit'
import { useDispatch, useSelector } from 'react-redux'
import type { TypedUseSelectorHook } from 'react-redux'

import authSlice from './slices/authSlice'
import uiSlice from './slices/uiSlice'
import jobsSlice from './slices/jobsSlice'
import applicationsSlice from './slices/applicationsSlice'

export const store = configureStore({
  reducer: {
    auth: authSlice,
    ui: uiSlice,
    jobs: jobsSlice,
    applications: applicationsSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST'],
      },
    }),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector