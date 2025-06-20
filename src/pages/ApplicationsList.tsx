import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Search, Filter, Download, Eye, Plus } from 'lucide-react'

const mockApplications = [
  {
    id: 'EWCO-2024-001',
    applicantName: 'John Smith',
    applicantEmail: 'john.smith@email.com',
    proposedArea: 15.5,
    fastTrackEligible: true,
    status: 'under-review' as const,
    submittedAt: new Date('2024-01-15'),
    county: 'Devon',
    woodlandType: 'Broadleaf',
    paymentTotal: 125000
  },
  {
    id: 'EWCO-2024-002',
    applicantName: 'Green Valley Farms Ltd',
    applicantEmail: 'contact@greenvalley.co.uk',
    proposedArea: 32.0,
    fastTrackEligible: false,
    status: 'approved' as const,
    submittedAt: new Date('2024-01-12'),
    reviewedAt: new Date('2024-02-01'),
    county: 'Yorkshire',
    woodlandType: 'Mixed',
    paymentTotal: 285000
  },
  {
    id: 'EWCO-2024-003',
    applicantName: 'Sarah Johnson',
    applicantEmail: 'sarah.johnson@email.com',
    proposedArea: 8.3,
    fastTrackEligible: true,
    status: 'draft' as const,
    submittedAt: new Date('2024-01-10'),
    county: 'Cornwall',
    woodlandType: 'Conifer',
    paymentTotal: 95000
  },
  {
    id: 'EWCO-2024-004',
    applicantName: 'Woodland Trust',
    applicantEmail: 'grants@woodlandtrust.org.uk',
    proposedArea: 75.2,
    fastTrackEligible: false,
    status: 'rejected' as const,
    submittedAt: new Date('2024-01-08'),
    reviewedAt: new Date('2024-01-25'),
    county: 'Sussex',
    woodlandType: 'Broadleaf',
    paymentTotal: 0
  },
  {
    id: 'EWCO-2024-005',
    applicantName: 'Michael Brown',
    applicantEmail: 'mike.brown@farm.co.uk',
    proposedArea: 22.1,
    fastTrackEligible: true,
    status: 'submitted' as const,
    submittedAt: new Date('2024-01-20'),
    county: 'Gloucestershire',
    woodlandType: 'Agroforestry',
    paymentTotal: 189000
  },
  {
    id: 'EWCO-2024-006',
    applicantName: 'Emma Wilson',
    applicantEmail: 'emma.wilson@naturetrust.org',
    proposedArea: 45.3,
    fastTrackEligible: false,
    status: 'approved' as const,
    submittedAt: new Date('2024-01-25'),
    reviewedAt: new Date('2024-02-15'),
    county: 'Cumbria',
    woodlandType: 'Mixed',
    paymentTotal: 367000
  },
  {
    id: 'EWCO-2024-007',
    applicantName: 'Robert Clark',
    applicantEmail: 'rob.clark@countryside.co.uk',
    proposedArea: 12.8,
    fastTrackEligible: true,
    status: 'under-review' as const,
    submittedAt: new Date('2024-02-01'),
    county: 'Norfolk',
    woodlandType: 'Broadleaf',
    paymentTotal: 98000
  },
  {
    id: 'EWCO-2024-008',
    applicantName: 'Highlands Estate Ltd',
    applicantEmail: 'management@highlands-estate.com',
    proposedArea: 87.6,
    fastTrackEligible: false,
    status: 'submitted' as const,
    submittedAt: new Date('2024-02-03'),
    county: 'Northumberland',
    woodlandType: 'Conifer',
    paymentTotal: 654000
  },
  {
    id: 'EWCO-2024-009',
    applicantName: 'Lisa Thompson',
    applicantEmail: 'lisa.thompson@farmsteads.co.uk',
    proposedArea: 18.2,
    fastTrackEligible: true,
    status: 'approved' as const,
    submittedAt: new Date('2024-01-28'),
    reviewedAt: new Date('2024-02-12'),
    county: 'Dorset',
    woodlandType: 'Agroforestry',
    paymentTotal: 156000
  },
  {
    id: 'EWCO-2024-010',
    applicantName: 'Greenfield Cooperative',
    applicantEmail: 'info@greenfield-coop.org',
    proposedArea: 34.7,
    fastTrackEligible: false,
    status: 'under-review' as const,
    submittedAt: new Date('2024-02-05'),
    county: 'Hertfordshire',
    woodlandType: 'Mixed',
    paymentTotal: 289000
  },
  {
    id: 'EWCO-2024-011',
    applicantName: 'David Martinez',
    applicantEmail: 'david.martinez@rurallands.com',
    proposedArea: 9.4,
    fastTrackEligible: true,
    status: 'rejected' as const,
    submittedAt: new Date('2024-01-30'),
    reviewedAt: new Date('2024-02-10'),
    county: 'Shropshire',
    woodlandType: 'Broadleaf',
    paymentTotal: 0
  },
  {
    id: 'EWCO-2024-012',
    applicantName: 'Vale Forestry Group',
    applicantEmail: 'applications@valeforestry.co.uk',
    proposedArea: 56.1,
    fastTrackEligible: false,
    status: 'approved' as const,
    submittedAt: new Date('2024-01-18'),
    reviewedAt: new Date('2024-02-08'),
    county: 'Oxfordshire',
    woodlandType: 'Broadleaf',
    paymentTotal: 445000
  },
  {
    id: 'EWCO-2024-013',
    applicantName: 'Catherine Foster',
    applicantEmail: 'cath.foster@smallholdings.net',
    proposedArea: 7.9,
    fastTrackEligible: true,
    status: 'submitted' as const,
    submittedAt: new Date('2024-02-08'),
    county: 'Somerset',
    woodlandType: 'Broadleaf',
    paymentTotal: 67000
  },
  {
    id: 'EWCO-2024-014',
    applicantName: 'Northern Woodlands Initiative',
    applicantEmail: 'grants@northernwoodlands.org.uk',
    proposedArea: 102.3,
    fastTrackEligible: false,
    status: 'under-review' as const,
    submittedAt: new Date('2024-02-10'),
    county: 'Lancashire',
    woodlandType: 'Mixed',
    paymentTotal: 823000
  },
  {
    id: 'EWCO-2024-015',
    applicantName: 'James Patterson',
    applicantEmail: 'james.patterson@heritage-farms.co.uk',
    proposedArea: 26.5,
    fastTrackEligible: true,
    status: 'approved' as const,
    submittedAt: new Date('2024-01-22'),
    reviewedAt: new Date('2024-02-05'),
    county: 'Warwickshire',
    woodlandType: 'Agroforestry',
    paymentTotal: 212000
  }
]

export default function ApplicationsList() {
  const [applications] = useState(mockApplications)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [typeFilter, setTypeFilter] = useState('all')

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      'draft': { label: 'Draft', className: 'bg-gray-100 text-gray-800' },
      'submitted': { label: 'Submitted', className: 'bg-blue-100 text-blue-800' },
      'under-review': { label: 'Under Review', className: 'bg-yellow-100 text-yellow-800' },
      'approved': { label: 'Approved', className: 'bg-green-100 text-green-800' },
      'rejected': { label: 'Rejected', className: 'bg-red-100 text-red-800' }
    }
    
    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.draft
    
    return (
      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${config.className}`}>
        {config.label}
      </span>
    )
  }

  const filteredApplications = applications.filter(app => {
    const matchesSearch = app.applicantName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         app.id.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === 'all' || app.status === statusFilter
    const matchesType = typeFilter === 'all' || app.woodlandType.toLowerCase() === typeFilter.toLowerCase()
    
    return matchesSearch && matchesStatus && matchesType
  })

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="md:flex md:items-center md:justify-between">
        <div className="min-w-0 flex-1">
          <h1 className="text-3xl font-bold text-gray-900">EWCO Applications</h1>
          <p className="mt-2 text-gray-600">
            Manage and review England Woodland Creation Offer applications
          </p>
        </div>
        <div className="mt-4 flex space-x-3 md:ml-4 md:mt-0">
          <button className="flex items-center px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50">
            <Download className="h-4 w-4 mr-2" />
            Export
          </button>
          <Link
            to="/applications/new"
            className="govuk-button flex items-center space-x-2"
          >
            <Plus className="h-4 w-4" />
            <span>New Application</span>
          </Link>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="govuk-label" htmlFor="search">
              Search applications
            </label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="text"
                id="search"
                placeholder="Search by name or ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="govuk-input pl-10 w-full"
              />
            </div>
          </div>

          <div>
            <label className="govuk-label" htmlFor="status-filter">
              Status
            </label>
            <select
              id="status-filter"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="govuk-input w-full"
            >
              <option value="all">All statuses</option>
              <option value="draft">Draft</option>
              <option value="submitted">Submitted</option>
              <option value="under-review">Under Review</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>

          <div>
            <label className="govuk-label" htmlFor="type-filter">
              Woodland Type
            </label>
            <select
              id="type-filter"
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="govuk-input w-full"
            >
              <option value="all">All types</option>
              <option value="broadleaf">Broadleaf</option>
              <option value="conifer">Conifer</option>
              <option value="mixed">Mixed</option>
              <option value="agroforestry">Agroforestry</option>
            </select>
          </div>

          <div className="flex items-end">
            <button className="govuk-button govuk-button--secondary w-full flex items-center justify-center">
              <Filter className="h-4 w-4 mr-2" />
              Apply Filters
            </button>
          </div>
        </div>
      </div>

      {/* Applications Table */}
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">
            {filteredApplications.length} applications found
          </h3>
        </div>
        
        <div className="overflow-x-auto">
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
                  Area (ha)
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  County
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Fast Track
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Grant Value
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Submitted
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredApplications.map((application) => (
                <tr key={application.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-govuk-blue">
                    <Link to={`/applications/${application.id}`}>
                      {application.id}
                    </Link>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">
                        {application.applicantName}
                      </div>
                      <div className="text-sm text-gray-500">
                        {application.applicantEmail}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {application.proposedArea.toFixed(1)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {application.woodlandType}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {application.county}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {getStatusBadge(application.status)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {application.fastTrackEligible ? (
                      <span className="text-govuk-green font-medium">Yes</span>
                    ) : (
                      <span className="text-gray-500">No</span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    £{application.paymentTotal.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {application.submittedAt.toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <Link
                      to={`/applications/${application.id}`}
                      className="text-govuk-blue hover:text-blue-700 flex items-center"
                    >
                      <Eye className="h-4 w-4 mr-1" />
                      View
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredApplications.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No applications match your search criteria.</p>
          </div>
        )}
      </div>
    </div>
  )
}