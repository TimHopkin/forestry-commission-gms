import { Link } from 'react-router-dom'
import { Plus, FileText, Calculator, TrendingUp, Users, Clock } from 'lucide-react'

export default function Dashboard() {
  const stats = [
    {
      name: 'Total Applications',
      value: '156',
      change: '+12%',
      icon: FileText
    },
    {
      name: 'Approved This Month',
      value: '23',
      change: '+8%',
      icon: TrendingUp
    },
    {
      name: 'Average Processing Time',
      value: '8.2 weeks',
      change: '-15%',
      icon: Clock
    },
    {
      name: 'Total Hectares',
      value: '2,847',
      change: '+22%',
      icon: Users
    }
  ]

  const recentApplications = [
    {
      id: 'EWCO-2024-001',
      applicant: 'John Smith',
      area: '15.5 ha',
      status: 'Under Review',
      submitted: '2024-01-15',
      type: 'Broadleaf'
    },
    {
      id: 'EWCO-2024-002',
      applicant: 'Green Valley Farms Ltd',
      area: '32.0 ha',
      status: 'Approved',
      submitted: '2024-01-12',
      type: 'Mixed'
    },
    {
      id: 'EWCO-2024-003',
      applicant: 'Sarah Johnson',
      area: '8.3 ha',
      status: 'Documents Required',
      submitted: '2024-01-10',
      type: 'Conifer'
    }
  ]

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="md:flex md:items-center md:justify-between">
        <div className="min-w-0 flex-1">
          <h1 className="text-3xl font-bold text-gray-900">
            EWCO Grant Management Dashboard
          </h1>
          <p className="mt-2 text-gray-600">
            Welcome to the England Woodland Creation Offer management system
          </p>
        </div>
        <div className="mt-4 flex md:ml-4 md:mt-0">
          <Link
            to="/applications/new"
            className="govuk-button flex items-center space-x-2"
          >
            <Plus className="h-4 w-4" />
            <span>New Application</span>
          </Link>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <div
              key={stat.name}
              className="relative overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:px-6 sm:py-6"
            >
              <dt>
                <div className="absolute rounded-md bg-govuk-blue p-3">
                  <Icon className="h-6 w-6 text-white" />
                </div>
                <p className="ml-16 truncate text-sm font-medium text-gray-500">
                  {stat.name}
                </p>
              </dt>
              <dd className="ml-16 flex items-baseline">
                <p className="text-2xl font-semibold text-gray-900">
                  {stat.value}
                </p>
                <p className="ml-2 flex items-baseline text-sm font-semibold text-govuk-green">
                  {stat.change}
                </p>
              </dd>
            </div>
          )
        })}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="col-span-2">
          <div className="bg-white shadow rounded-lg">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">Recent Applications</h3>
            </div>
            <div className="overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Application ID
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Applicant
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Area
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Type
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {recentApplications.map((application) => (
                    <tr key={application.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-govuk-blue">
                        <Link to={`/applications/${application.id}`}>
                          {application.id}
                        </Link>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {application.applicant}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {application.area}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {application.type}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          application.status === 'Approved' 
                            ? 'bg-green-100 text-green-800'
                            : application.status === 'Under Review'
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {application.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="px-6 py-3 bg-gray-50">
              <Link 
                to="/applications" 
                className="text-sm font-medium text-govuk-blue hover:text-blue-700"
              >
                View all applications →
              </Link>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          {/* Quick Actions */}
          <div className="bg-white shadow rounded-lg p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <Link
                to="/applications/new"
                className="flex items-center w-full p-3 text-left border border-gray-200 rounded-lg hover:bg-gray-50"
              >
                <Plus className="h-5 w-5 text-govuk-blue mr-3" />
                <span className="text-sm font-medium">Create New Application</span>
              </Link>
              <Link
                to="/calculator"
                className="flex items-center w-full p-3 text-left border border-gray-200 rounded-lg hover:bg-gray-50"
              >
                <Calculator className="h-5 w-5 text-govuk-blue mr-3" />
                <span className="text-sm font-medium">Payment Calculator</span>
              </Link>
              <Link
                to="/applications"
                className="flex items-center w-full p-3 text-left border border-gray-200 rounded-lg hover:bg-gray-50"
              >
                <FileText className="h-5 w-5 text-govuk-blue mr-3" />
                <span className="text-sm font-medium">View All Applications</span>
              </Link>
            </div>
          </div>

          {/* Help & Support */}
          <div className="bg-govuk-blue rounded-lg p-6 text-white">
            <h3 className="text-lg font-medium mb-2">Need Help?</h3>
            <p className="text-blue-100 text-sm mb-4">
              Get support with your EWCO application or technical issues.
            </p>
            <a
              href="mailto:support@forestrycommission.gov.uk"
              className="inline-flex items-center text-sm font-medium text-white hover:text-blue-100"
            >
              Contact Support →
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}