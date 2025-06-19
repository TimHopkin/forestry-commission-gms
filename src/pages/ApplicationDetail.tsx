import { useParams, Link } from 'react-router-dom'
import { ArrowLeft, Download, FileText, MapPin, Calendar, User, Banknote, Map, Database, CheckCircle, AlertTriangle } from 'lucide-react'
import LandAppMap from '@/components/LandAppMap'
import { naturalColonisationData, landAppApiResponse } from '@/data/landAppData'

export default function ApplicationDetail() {
  const { id } = useParams()

  // Mock application data - in real app would fetch from API
  const application = {
    id: id || 'EWCO-2024-001',
    applicantName: 'John Smith',
    applicantEmail: 'john.smith@email.com',
    proposedArea: 15.5,
    fastTrackEligible: true,
    status: 'under-review' as const,
    submittedAt: new Date('2024-01-15'),
    county: 'Devon',
    woodlandType: 'Broadleaf',
    species: 'English Oak',
    currentLandUse: 'Agricultural land',
    soilType: 'Clay',
    inProtectedArea: false,
    hasRareSpecies: false,
    hasArchaeology: false,
    environmentalImpactRequired: false,
    paymentCalculation: {
      standardCapital: 158100, // £10,200/ha * 15.5ha
      annualMaintenance: 93000, // £400/ha * 15 years * 15.5ha
      additionalContributions: 77500, // £5,000/ha * 15.5ha
      lowSensitivityPayment: 17050, // £1,100/ha * 15.5ha
      natureRecoveryPremium: 51150, // £3,300/ha * 15.5ha
      total: 396800
    },
    documents: [
      { id: '1', name: 'Woodland Creation Plan.pdf', type: 'wcp', uploadedAt: new Date('2024-01-15') },
      { id: '2', name: 'Site Map.pdf', type: 'map', uploadedAt: new Date('2024-01-15') },
      { id: '3', name: 'Land Ownership Certificate.pdf', type: 'other', uploadedAt: new Date('2024-01-15') }
    ],
    timeline: [
      { date: new Date('2024-01-15'), event: 'Application submitted', status: 'completed' },
      { date: new Date('2024-01-16'), event: 'Initial review completed', status: 'completed' },
      { date: new Date('2024-01-20'), event: 'Documents verified', status: 'completed' },
      { date: new Date('2024-01-25'), event: 'Field assessment scheduled', status: 'in-progress' },
      { date: new Date('2024-02-05'), event: 'Environmental review', status: 'pending' },
      { date: new Date('2024-02-15'), event: 'Final decision', status: 'pending' }
    ]
  }

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
      <span className={`inline-flex px-3 py-1 text-sm font-semibold rounded-full ${config.className}`}>
        {config.label}
      </span>
    )
  }

  const getTimelineStatus = (status: string) => {
    const statusConfig = {
      'completed': 'bg-govuk-green',
      'in-progress': 'bg-govuk-blue',
      'pending': 'bg-gray-300'
    }
    return statusConfig[status as keyof typeof statusConfig] || 'bg-gray-300'
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link
            to="/applications"
            className="flex items-center text-govuk-blue hover:text-blue-700"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to applications
          </Link>
        </div>
        <div className="flex space-x-3">
          <button className="flex items-center px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50">
            <Download className="h-4 w-4 mr-2" />
            Download PDF
          </button>
        </div>
      </div>

      <div className="bg-white shadow rounded-lg">
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{application.id}</h1>
              <p className="text-gray-600">EWCO Grant Application</p>
            </div>
            <div className="text-right">
              {getStatusBadge(application.status)}
              {application.fastTrackEligible && (
                <div className="mt-2">
                  <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                    Fast Track Eligible
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Information */}
            <div className="lg:col-span-2 space-y-8">
              {/* Applicant Details */}
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                  <User className="h-5 w-5 mr-2" />
                  Applicant Details
                </h3>
                <div className="bg-gray-50 rounded-lg p-4">
                  <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <dt className="text-sm font-medium text-gray-500">Name</dt>
                      <dd className="text-sm text-gray-900">{application.applicantName}</dd>
                    </div>
                    <div>
                      <dt className="text-sm font-medium text-gray-500">Email</dt>
                      <dd className="text-sm text-gray-900">{application.applicantEmail}</dd>
                    </div>
                  </dl>
                </div>
              </div>

              {/* Land Details */}
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                  <MapPin className="h-5 w-5 mr-2" />
                  Land Details
                </h3>
                <div className="bg-gray-50 rounded-lg p-4">
                  <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <dt className="text-sm font-medium text-gray-500">Proposed Area</dt>
                      <dd className="text-sm text-gray-900">{application.proposedArea} hectares</dd>
                    </div>
                    <div>
                      <dt className="text-sm font-medium text-gray-500">County</dt>
                      <dd className="text-sm text-gray-900">{application.county}</dd>
                    </div>
                    <div>
                      <dt className="text-sm font-medium text-gray-500">Current Land Use</dt>
                      <dd className="text-sm text-gray-900">{application.currentLandUse}</dd>
                    </div>
                    <div>
                      <dt className="text-sm font-medium text-gray-500">Soil Type</dt>
                      <dd className="text-sm text-gray-900">{application.soilType}</dd>
                    </div>
                    <div>
                      <dt className="text-sm font-medium text-gray-500">Woodland Type</dt>
                      <dd className="text-sm text-gray-900">{application.woodlandType}</dd>
                    </div>
                    <div>
                      <dt className="text-sm font-medium text-gray-500">Primary Species</dt>
                      <dd className="text-sm text-gray-900">{application.species}</dd>
                    </div>
                  </dl>
                </div>
              </div>

              {/* Environmental Assessment */}
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Environmental Assessment</h3>
                <div className="bg-gray-50 rounded-lg p-4">
                  <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <dt className="text-sm font-medium text-gray-500">Protected Area</dt>
                      <dd className="text-sm text-gray-900">
                        {application.inProtectedArea ? 'Yes' : 'No'}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-sm font-medium text-gray-500">Rare Species</dt>
                      <dd className="text-sm text-gray-900">
                        {application.hasRareSpecies ? 'Yes' : 'No'}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-sm font-medium text-gray-500">Archaeological Features</dt>
                      <dd className="text-sm text-gray-900">
                        {application.hasArchaeology ? 'Yes' : 'No'}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-sm font-medium text-gray-500">EIA Required</dt>
                      <dd className="text-sm text-gray-900">
                        {application.environmentalImpactRequired ? 'Yes' : 'No'}
                      </dd>
                    </div>
                  </dl>
                </div>
              </div>

              {/* Land App Map Review */}
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                  <Map className="h-5 w-5 mr-2" />
                  Land App Map Review
                </h3>
                
                {/* Land App Data Summary */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                  <div className="flex items-start space-x-3">
                    <Database className="h-5 w-5 text-govuk-blue mt-0.5" />
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900 mb-2">Land App Integration Data</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="font-medium text-gray-700">Land App Reference:</span>
                          <br />{landAppApiResponse.land_app_reference}
                        </div>
                        <div>
                          <span className="font-medium text-gray-700">Submission Date:</span>
                          <br />{new Date(landAppApiResponse.submission_date).toLocaleDateString()}
                        </div>
                        <div>
                          <span className="font-medium text-gray-700">Total Area:</span>
                          <br />{landAppApiResponse.total_area} hectares
                        </div>
                        <div>
                          <span className="font-medium text-gray-700">Eligible Area:</span>
                          <br />{landAppApiResponse.eligible_area} hectares
                        </div>
                        <div>
                          <span className="font-medium text-gray-700">Estimated Cost:</span>
                          <br />£{landAppApiResponse.estimated_total_cost.toLocaleString()}
                        </div>
                        <div>
                          <span className="font-medium text-gray-700">Estimated Grant:</span>
                          <br />£{landAppApiResponse.estimated_grant_value.toLocaleString()}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Interactive Map */}
                <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                  <div className="px-4 py-3 bg-gray-50 border-b border-gray-200">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium text-gray-900">Interactive Site Map</h4>
                      <span className="text-sm text-gray-500">
                        {naturalColonisationData.features.length} parcels identified
                      </span>
                    </div>
                  </div>
                  <LandAppMap 
                    data={naturalColonisationData} 
                    height="500px"
                    className="w-full"
                  />
                </div>

                {/* Land App Recommendations */}
                <div className="mt-6 bg-white border border-gray-200 rounded-lg p-4">
                  <h4 className="font-medium text-gray-900 mb-3 flex items-center">
                    <CheckCircle className="h-5 w-5 text-govuk-green mr-2" />
                    Land App Recommendations
                  </h4>
                  <ul className="space-y-2">
                    {landAppApiResponse.recommendations.map((recommendation, index) => (
                      <li key={index} className="flex items-start text-sm">
                        <span className="text-govuk-blue mr-2">•</span>
                        <span className="text-gray-700">{recommendation}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Data Quality Assessment */}
                <div className="mt-6 bg-white border border-gray-200 rounded-lg p-4">
                  <h4 className="font-medium text-gray-900 mb-3 flex items-center">
                    <AlertTriangle className="h-5 w-5 text-amber-500 mr-2" />
                    Data Quality Assessment
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    {Object.entries(landAppApiResponse.quality_checks).map(([key, value]) => (
                      <div key={key}>
                        <span className="font-medium text-gray-700 capitalize">
                          {key.replace('_', ' ')}:
                        </span>
                        <br />
                        <span className="text-gray-600">{value}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Data Sources */}
                <div className="mt-6 bg-gray-50 rounded-lg p-4">
                  <h4 className="font-medium text-gray-900 mb-3">Data Sources</h4>
                  <div className="flex flex-wrap gap-2">
                    {landAppApiResponse.data_sources.map((source, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                      >
                        {source}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Documents */}
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                  <FileText className="h-5 w-5 mr-2" />
                  Supporting Documents
                </h3>
                <div className="space-y-3">
                  {application.documents.map((doc) => (
                    <div
                      key={doc.id}
                      className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                    >
                      <div className="flex items-center space-x-3">
                        <FileText className="h-5 w-5 text-gray-400" />
                        <div>
                          <p className="text-sm font-medium text-gray-900">{doc.name}</p>
                          <p className="text-xs text-gray-500">
                            Uploaded {doc.uploadedAt.toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <button className="text-govuk-blue hover:text-blue-700 text-sm font-medium">
                        Download
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Payment Calculation */}
              <div className="bg-govuk-blue rounded-lg p-6 text-white">
                <h3 className="text-lg font-medium mb-4 flex items-center">
                  <Banknote className="h-5 w-5 mr-2" />
                  Grant Calculation
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-blue-100">Standard Capital:</span>
                    <span>£{application.paymentCalculation.standardCapital.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-blue-100">Annual Maintenance:</span>
                    <span>£{application.paymentCalculation.annualMaintenance.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-blue-100">Additional Contributions:</span>
                    <span>£{application.paymentCalculation.additionalContributions.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-blue-100">Low Sensitivity Payment:</span>
                    <span>£{application.paymentCalculation.lowSensitivityPayment.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-blue-100">Nature Recovery Premium:</span>
                    <span>£{application.paymentCalculation.natureRecoveryPremium.toLocaleString()}</span>
                  </div>
                  <div className="border-t border-blue-400 pt-3">
                    <div className="flex justify-between font-semibold">
                      <span>Total Grant Value:</span>
                      <span>£{application.paymentCalculation.total.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Application Timeline */}
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                  <Calendar className="h-5 w-5 mr-2" />
                  Application Timeline
                </h3>
                <div className="space-y-4">
                  {application.timeline.map((item, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <div className={`w-3 h-3 rounded-full mt-1 ${getTimelineStatus(item.status)}`} />
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900">{item.event}</p>
                        <p className="text-xs text-gray-500">{item.date.toLocaleDateString()}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="space-y-3">
                <button className="govuk-button w-full">
                  Approve Application
                </button>
                <button className="govuk-button govuk-button--warning w-full">
                  Request More Information
                </button>
                <button className="govuk-button govuk-button--secondary w-full">
                  Schedule Site Visit
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}