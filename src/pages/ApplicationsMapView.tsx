import { useState } from 'react'
import { MapContainer, TileLayer, Marker, Popup, LayersControl } from 'react-leaflet'
import { Link } from 'react-router-dom'
import { MapPin, Eye, Filter, Calendar, Banknote } from 'lucide-react'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

// Application interface
interface MapApplication {
  id: string
  applicantName: string
  status: 'draft' | 'submitted' | 'under-review' | 'approved' | 'rejected'
  totalGrantValue: number
  proposedArea: number
  county: string
  submittedAt: Date
  coordinates: [number, number] // [lat, lng]
  woodlandType: string
}

// Mock applications data with geographic coordinates (matches ApplicationsList.tsx)
const mockApplications: MapApplication[] = [
  {
    id: 'EWCO-2024-001',
    applicantName: 'John Smith',
    status: 'under-review',
    totalGrantValue: 125000,
    proposedArea: 15.5,
    county: 'Devon',
    submittedAt: new Date('2024-01-15'),
    coordinates: [50.7250, -2.3470],
    woodlandType: 'Broadleaf'
  },
  {
    id: 'EWCO-2024-002',
    applicantName: 'Green Valley Farms Ltd',
    status: 'approved',
    totalGrantValue: 285000,
    proposedArea: 32.0,
    county: 'Yorkshire',
    submittedAt: new Date('2024-01-12'),
    coordinates: [53.8, -1.5],
    woodlandType: 'Mixed'
  },
  {
    id: 'EWCO-2024-003',
    applicantName: 'Sarah Johnson',
    status: 'draft',
    totalGrantValue: 95000,
    proposedArea: 8.3,
    county: 'Cornwall',
    submittedAt: new Date('2024-01-10'),
    coordinates: [50.2660, -5.0520],
    woodlandType: 'Conifer'
  },
  {
    id: 'EWCO-2024-004',
    applicantName: 'Woodland Trust',
    status: 'rejected',
    totalGrantValue: 0,
    proposedArea: 75.2,
    county: 'Sussex',
    submittedAt: new Date('2024-01-08'),
    coordinates: [50.9, -0.1],
    woodlandType: 'Broadleaf'
  },
  {
    id: 'EWCO-2024-005',
    applicantName: 'Michael Brown',
    status: 'submitted',
    totalGrantValue: 189000,
    proposedArea: 22.1,
    county: 'Gloucestershire',
    submittedAt: new Date('2024-01-20'),
    coordinates: [51.8, -2.2],
    woodlandType: 'Agroforestry'
  },
  {
    id: 'EWCO-2024-006',
    applicantName: 'Emma Wilson',
    status: 'approved',
    totalGrantValue: 367000,
    proposedArea: 45.3,
    county: 'Cumbria',
    submittedAt: new Date('2024-01-25'),
    coordinates: [54.4, -2.8],
    woodlandType: 'Mixed'
  },
  {
    id: 'EWCO-2024-007',
    applicantName: 'Robert Clark',
    status: 'under-review',
    totalGrantValue: 98000,
    proposedArea: 12.8,
    county: 'Norfolk',
    submittedAt: new Date('2024-02-01'),
    coordinates: [52.6, 1.2],
    woodlandType: 'Broadleaf'
  },
  {
    id: 'EWCO-2024-008',
    applicantName: 'Highlands Estate Ltd',
    status: 'submitted',
    totalGrantValue: 654000,
    proposedArea: 87.6,
    county: 'Northumberland',
    submittedAt: new Date('2024-02-03'),
    coordinates: [55.1, -2.1],
    woodlandType: 'Conifer'
  },
  {
    id: 'EWCO-2024-009',
    applicantName: 'Lisa Thompson',
    status: 'approved',
    totalGrantValue: 156000,
    proposedArea: 18.2,
    county: 'Dorset',
    submittedAt: new Date('2024-01-28'),
    coordinates: [50.6, -2.4],
    woodlandType: 'Agroforestry'
  },
  {
    id: 'EWCO-2024-010',
    applicantName: 'Greenfield Cooperative',
    status: 'under-review',
    totalGrantValue: 289000,
    proposedArea: 34.7,
    county: 'Hertfordshire',
    submittedAt: new Date('2024-02-05'),
    coordinates: [51.8, -0.2],
    woodlandType: 'Mixed'
  },
  {
    id: 'EWCO-2024-011',
    applicantName: 'David Martinez',
    status: 'rejected',
    totalGrantValue: 0,
    proposedArea: 9.4,
    county: 'Shropshire',
    submittedAt: new Date('2024-01-30'),
    coordinates: [52.7, -2.7],
    woodlandType: 'Broadleaf'
  },
  {
    id: 'EWCO-2024-012',
    applicantName: 'Vale Forestry Group',
    status: 'approved',
    totalGrantValue: 445000,
    proposedArea: 56.1,
    county: 'Oxfordshire',
    submittedAt: new Date('2024-01-18'),
    coordinates: [51.7, -1.2],
    woodlandType: 'Broadleaf'
  },
  {
    id: 'EWCO-2024-013',
    applicantName: 'Catherine Foster',
    status: 'submitted',
    totalGrantValue: 67000,
    proposedArea: 7.9,
    county: 'Somerset',
    submittedAt: new Date('2024-02-08'),
    coordinates: [51.1, -2.9],
    woodlandType: 'Broadleaf'
  },
  {
    id: 'EWCO-2024-014',
    applicantName: 'Northern Woodlands Initiative',
    status: 'under-review',
    totalGrantValue: 823000,
    proposedArea: 102.3,
    county: 'Lancashire',
    submittedAt: new Date('2024-02-10'),
    coordinates: [53.9, -2.5],
    woodlandType: 'Mixed'
  },
  {
    id: 'EWCO-2024-015',
    applicantName: 'James Patterson',
    status: 'approved',
    totalGrantValue: 212000,
    proposedArea: 26.5,
    county: 'Warwickshire',
    submittedAt: new Date('2024-01-22'),
    coordinates: [52.3, -1.5],
    woodlandType: 'Agroforestry'
  }
]

export default function ApplicationsMapView() {
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [selectedCounty, setSelectedCounty] = useState<string>('all')

  // Filter applications based on status and county
  const filteredApplications = mockApplications.filter(app => {
    const statusMatch = statusFilter === 'all' || app.status === statusFilter
    const countyMatch = selectedCounty === 'all' || app.county === selectedCounty
    return statusMatch && countyMatch
  })

  // Get unique counties for filter
  const counties = [...new Set(mockApplications.map(app => app.county))].sort()

  // Status configuration for badges and markers
  const getStatusConfig = (status: string) => {
    const configs = {
      'draft': { 
        label: 'Draft', 
        color: '#626a6e', 
        bgClass: 'bg-gray-100', 
        textClass: 'text-gray-800' 
      },
      'submitted': { 
        label: 'Submitted', 
        color: '#1d70b8', 
        bgClass: 'bg-blue-100', 
        textClass: 'text-blue-800' 
      },
      'under-review': { 
        label: 'Under Review', 
        color: '#f47738', 
        bgClass: 'bg-yellow-100', 
        textClass: 'text-yellow-800' 
      },
      'approved': { 
        label: 'Approved', 
        color: '#00703c', 
        bgClass: 'bg-green-100', 
        textClass: 'text-green-800' 
      },
      'rejected': { 
        label: 'Rejected', 
        color: '#d4351c', 
        bgClass: 'bg-red-100', 
        textClass: 'text-red-800' 
      }
    }
    return configs[status as keyof typeof configs] || configs.draft
  }

  // Create custom markers for each status
  const createStatusIcon = (status: string) => {
    const config = getStatusConfig(status)
    return L.divIcon({
      html: `
        <div class="flex items-center justify-center w-8 h-8 rounded-full border-2 border-white shadow-lg text-white font-bold text-xs" 
             style="background-color: ${config.color}">
          ${status === 'approved' ? '✓' : status === 'rejected' ? '✗' : status === 'under-review' ? '?' : status === 'submitted' ? 'S' : 'D'}
        </div>
      `,
      iconSize: [32, 32],
      iconAnchor: [16, 16],
      popupAnchor: [0, -16],
      className: ''
    })
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-GB', {
      style: 'currency',
      currency: 'GBP',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Applications Map View</h1>
          <p className="text-gray-600">Spatial overview of all EWCO grant applications</p>
        </div>
        
        {/* Filter Controls */}
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Filter className="h-4 w-4 text-gray-500" />
            <select 
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="govuk-input text-sm"
            >
              <option value="all">All Status</option>
              <option value="draft">Draft</option>
              <option value="submitted">Submitted</option>
              <option value="under-review">Under Review</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>
          
          <div>
            <select 
              value={selectedCounty}
              onChange={(e) => setSelectedCounty(e.target.value)}
              className="govuk-input text-sm"
            >
              <option value="all">All Counties</option>
              {counties.map(county => (
                <option key={county} value={county}>{county}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Statistics Summary */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        {['draft', 'submitted', 'under-review', 'approved', 'rejected'].map(status => {
          const count = filteredApplications.filter(app => app.status === status).length
          const config = getStatusConfig(status)
          return (
            <div key={status} className="bg-white p-4 rounded-lg shadow border">
              <div className="flex items-center">
                <div 
                  className="w-3 h-3 rounded-full mr-2"
                  style={{ backgroundColor: config.color }}
                />
                <div>
                  <p className="text-2xl font-bold text-gray-900">{count}</p>
                  <p className="text-sm text-gray-600">{config.label}</p>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Map Container */}
      <div className="bg-white rounded-lg shadow border overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-medium text-gray-900 flex items-center">
              <MapPin className="h-5 w-5 mr-2" />
              Application Locations
            </h2>
            <span className="text-sm text-gray-500">
              Showing {filteredApplications.length} of {mockApplications.length} applications
            </span>
          </div>
        </div>

        <div style={{ height: '600px' }}>
          <MapContainer
            center={[52.5, -1.5]} // Centre on England
            zoom={6}
            style={{ height: '100%', width: '100%' }}
          >
            <LayersControl position="topright">
              <LayersControl.BaseLayer checked name="OpenStreetMap">
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
              </LayersControl.BaseLayer>
              
              <LayersControl.BaseLayer name="Satellite">
                <TileLayer
                  attribution='&copy; <a href="https://www.esri.com/">Esri</a>'
                  url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
                />
              </LayersControl.BaseLayer>
            </LayersControl>

            {/* Application Markers */}
            {filteredApplications.map(application => (
              <Marker
                key={application.id}
                position={application.coordinates}
                icon={createStatusIcon(application.status)}
              >
                <Popup maxWidth={350} className="application-popup">
                  <div className="p-3 min-w-[300px]">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-lg font-semibold text-gray-900">
                        {application.id}
                      </h3>
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusConfig(application.status).bgClass} ${getStatusConfig(application.status).textClass}`}>
                        {getStatusConfig(application.status).label}
                      </span>
                    </div>

                    <div className="space-y-2 text-sm">
                      <div className="flex items-center">
                        <span className="font-medium text-gray-700 w-20">Applicant:</span>
                        <span className="text-gray-900">{application.applicantName}</span>
                      </div>
                      
                      <div className="flex items-center">
                        <span className="font-medium text-gray-700 w-20">County:</span>
                        <span className="text-gray-900">{application.county}</span>
                      </div>
                      
                      <div className="flex items-center">
                        <span className="font-medium text-gray-700 w-20">Area:</span>
                        <span className="text-gray-900">{application.proposedArea} hectares</span>
                      </div>
                      
                      <div className="flex items-center">
                        <span className="font-medium text-gray-700 w-20">Type:</span>
                        <span className="text-gray-900">{application.woodlandType}</span>
                      </div>
                      
                      <div className="flex items-center">
                        <Banknote className="h-4 w-4 text-gray-500 mr-1" />
                        <span className="font-medium text-gray-700 w-19">Grant Value:</span>
                        <span className="text-gray-900 font-semibold">
                          {formatCurrency(application.totalGrantValue)}
                        </span>
                      </div>
                      
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 text-gray-500 mr-1" />
                        <span className="font-medium text-gray-700 w-19">Submitted:</span>
                        <span className="text-gray-900">
                          {application.submittedAt.toLocaleDateString()}
                        </span>
                      </div>
                    </div>

                    <div className="mt-4 pt-3 border-t border-gray-200">
                      <Link
                        to={`/applications/${application.id}`}
                        className="inline-flex items-center px-3 py-2 text-sm font-medium text-white bg-govuk-blue hover:bg-blue-700 rounded-lg transition-colors"
                      >
                        <Eye className="h-4 w-4 mr-2" />
                        View Application
                      </Link>
                    </div>
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>

        {/* Map Legend */}
        <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
          <h4 className="text-sm font-medium text-gray-900 mb-3">Status Legend</h4>
          <div className="flex flex-wrap gap-4">
            {['draft', 'submitted', 'under-review', 'approved', 'rejected'].map(status => {
              const config = getStatusConfig(status)
              return (
                <div key={status} className="flex items-center text-sm">
                  <div 
                    className="w-6 h-6 rounded-full border-2 border-white shadow-sm mr-2 flex items-center justify-center text-white text-xs font-bold"
                    style={{ backgroundColor: config.color }}
                  >
                    {status === 'approved' ? '✓' : status === 'rejected' ? '✗' : status === 'under-review' ? '?' : status === 'submitted' ? 'S' : 'D'}
                  </div>
                  <span className="text-gray-700">{config.label}</span>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}