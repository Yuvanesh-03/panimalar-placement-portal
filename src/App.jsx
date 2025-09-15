import React from 'react'
import { Provider } from 'react-redux'
import { store } from './store'
import AppRouter from './components/common/AppRouter'

function App() {
  return (
    <Provider store={store}>
      <AppRouter />
    </Provider>
  )
}

export default App
