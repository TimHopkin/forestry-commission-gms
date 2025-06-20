import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Dashboard from './pages/Dashboard'
import ApplicationForm from './pages/ApplicationForm'
import ApplicationsList from './pages/ApplicationsList'
import ApplicationDetail from './pages/ApplicationDetail'
import ApplicationsMapView from './pages/ApplicationsMapView'
import SystemDiagram from './pages/SystemDiagram'
import HelpGuidance from './pages/HelpGuidance'
import LinkPreviewDemo from './pages/LinkPreviewDemo'
import Brand from './pages/Brand'

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/applications" element={<ApplicationsList />} />
        <Route path="/applications/new" element={<ApplicationForm />} />
        <Route path="/applications/:id" element={<ApplicationDetail />} />
        <Route path="/applications-map" element={<ApplicationsMapView />} />
        <Route path="/system-diagram" element={<SystemDiagram />} />
        <Route path="/help" element={<HelpGuidance />} />
        <Route path="/link-preview" element={<LinkPreviewDemo />} />
        <Route path="/brand" element={<Brand />} />
      </Routes>
    </Layout>
  )
}

export default App