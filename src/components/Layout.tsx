import { ReactNode } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Trees, FileText, Home, Map, Network, HelpCircle } from 'lucide-react'

interface LayoutProps {
  children: ReactNode
}

export default function Layout({ children }: LayoutProps) {
  const location = useLocation()

  const navigation = [
    { name: 'Dashboard', href: '/', icon: Home },
    { name: 'Applications', href: '/applications', icon: FileText },
    { name: 'Map View', href: '/applications-map', icon: Map },
    { name: 'System Overview', href: '/system-diagram', icon: Network },
    { name: 'Help & Guidance', href: '/help', icon: HelpCircle },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Government Header */}
      <div className="bg-black text-white py-2">
        <div className="max-w-7xl mx-auto px-4 text-sm">
          GOV.UK
        </div>
      </div>
      
      {/* Main Header */}
      <header className="bg-govuk-blue text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <Trees className="h-8 w-8" />
              <div>
                <h1 className="text-xl font-bold text-white mb-0">Forestry Commission</h1>
                <p className="text-blue-100 text-sm mb-0">England Woodland Creation Offer</p>
              </div>
            </div>
            
            <nav className="hidden md:flex space-x-8">
              {navigation.map((item) => {
                const Icon = item.icon
                const isActive = location.pathname === item.href
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      isActive
                        ? 'bg-blue-700 text-white'
                        : 'text-blue-100 hover:bg-blue-700 hover:text-white'
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    <span>{item.name}</span>
                  </Link>
                )
              })}
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4 text-white">Forestry Commission</h3>
              <p className="text-gray-300">
                Supporting woodland creation and management across England
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4 text-white">Quick Links</h3>
              <ul className="space-y-2">
                <li><Link to="/brand" className="text-gray-300 hover:text-white">Brand Guidelines</Link></li>
                <li><a href="#" className="text-gray-300 hover:text-white">Help & Support</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white">Privacy Policy</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white">Terms of Service</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4 text-white">Contact</h3>
              <p className="text-gray-300">
                For technical support:<br />
                support@forestrycommission.gov.uk
              </p>
            </div>
          </div>
          
          {/* Collaboration Footer */}
          <div className="border-t border-gray-700 mt-8 pt-6">
            <div className="text-center">
              <p className="text-gray-400 text-sm">
                A Digital Land Solutions Ltd & Forestry Commission collaboration
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}