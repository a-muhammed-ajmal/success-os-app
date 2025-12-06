import { Route, Routes } from 'react-router-dom'
import Layout from './components/layout/Layout'
import Dashboard from './pages/Dashboard'
import Finance from './pages/Finance'
import Priorities from './pages/Priorities'
import Professional from './pages/Professional'
import Relationship from './pages/Relationship'
import Reviews from './pages/Reviews'
import Visions from './pages/Visions'
import Wellness from './pages/Wellness'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Dashboard />} />
        <Route path="priorities" element={<Priorities />} />
        <Route path="professional" element={<Professional />} />
        <Route path="finance" element={<Finance />} />
        <Route path="relationship" element={<Relationship />} />
        <Route path="reviews" element={<Reviews />} />
        <Route path="visions" element={<Visions />} />
        <Route path="wellness" element={<Wellness />} />
      </Route>
    </Routes>
  )
}