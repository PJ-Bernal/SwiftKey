import { ReactNode } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import TypeWriter from './components/TypeWritter'
import Login from './components/Landing'
import SelectMode from './components/SelectMode'
import Test from './components/test'
import { CodeTypeWriter } from './components/CodeLearnTypeWriter'
import { CodeLearnerWriter } from './hooks/useCodeLearner'
import Features from './components/Features'

interface Props {
  children: ReactNode
}

export const AppRouter = ({ children }: Props) => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/index" element={<Login />} />
        <Route path="classicmode" element={<TypeWriter />} />
        <Route path="/mode" element={<SelectMode />} />
        <Route path="/features" element={<Features />} />
      </Routes>
    </BrowserRouter>
  )
}
