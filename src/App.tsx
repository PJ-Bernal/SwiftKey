import { useState } from 'react'
import './App.css'
import TypeWritter from './components/TypeWritter'
import { AppRouter } from './AppRouter'

function App() {
  return (
    <AppRouter>
      <TypeWritter />
    </AppRouter>
  )
}

export default App
