import { ReactNode } from 'react'
import {
  BrowserRouter,
  HashRouter,
  Navigate,
  Route,
  Routes,
} from 'react-router-dom'
import TypeWriter from './components/TypeWritter'
import SelectMode from './components/SelectMode'
import { CodeTypeWriter } from './components/CodeLearnTypeWriter'
import Features from './components/Features'
import Landing from './components/landing'

interface Props {
  children: ReactNode
}

export const AppRouter = ({ children }: Props) => {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/index" element={<Landing />} />
        <Route path="classicmode" element={<TypeWriter />} />
        <Route path="/mode" element={<SelectMode />} />
        <Route path="/features" element={<Features />} />
        <Route path="/codemode" element={<CodeTypeWriter />} />
      </Routes>
    </HashRouter>
  )
}
