import { useState } from 'react'
import { 
  Users, 
  MapPin, 
  FileText, 
  Send, 
  CheckCircle, 
  Eye, 
  Database, 
  Shield, 
  ArrowRight, 
  ArrowDown,
  Building2,
  Landmark,
  UserCheck,
  Coins,
  TreePine,
  Info,
  X
} from 'lucide-react'

interface ProcessStep {
  id: string
  title: string
  description: string
  stakeholder: string
  system: string
  details: string[]
  dataFlow: string[]
  compliance: string[]
}

const processSteps: ProcessStep[] = [
  {
    id: 'farmer-planning',
    title: 'Farmers & Advisors Plan',
    description: 'Land owners work with forestry advisors to assess land and create woodland plans',
    stakeholder: 'Farmers & Advisors',
    system: 'Land App',
    details: [
      'Site assessment and geospatial analysis',
      'Species selection and planting design',
      'Cost estimation and grant calculation',
      'Environmental impact assessment',
      'Consultation with Land App advisors'
    ],
    dataFlow: [
      'Geospatial land boundaries (GeoJSON)',
      'Soil type and slope analysis',
      'Biodiversity and carbon assessments',
      'Constraint mapping (archaeology, species)',
      'Cost estimates and maintenance plans'
    ],
    compliance: [
      'GDPR compliance for farmer data',
      'Environmental regulations adherence',
      'Land ownership verification'
    ]
  },
  {
    id: 'land-app-submission',
    title: 'Land App Submission',
    description: 'Complete applications submitted from Land App to Forestry Commission GMS',
    stakeholder: 'Land App System',
    system: 'API Integration',
    details: [
      'Automated data validation and quality checks',
      'Digital document package creation',
      'Grant eligibility verification',
      'Fast-track assessment for suitable applications',
      'Submission confirmation and tracking'
    ],
    dataFlow: [
      'Structured application data (JSON/XML)',
      'Geospatial files and maps',
      'Supporting documents (PDFs)',
      'Advisor certifications',
      'Payment calculation details'
    ],
    compliance: [
      'Data integrity verification',
      'Secure API authentication',
      'Audit trail creation'
    ]
  },
  {
    id: 'fc-processing',
    title: 'Forestry Commission Processing',
    description: 'Applications reviewed, assessed, and decided by Forestry Commission staff',
    stakeholder: 'Forestry Commission',
    system: 'Grant Management System',
    details: [
      'Initial application triage and validation',
      'Technical review by forestry experts',
      'Environmental and archaeological assessment',
      'Site visits and field verification',
      'Grant approval or rejection decision'
    ],
    dataFlow: [
      'Application status updates',
      'Review comments and assessments',
      'Site visit reports',
      'Decision records and justifications',
      'Payment authorization details'
    ],
    compliance: [
      'Government grant regulations',
      'Public spending accountability',
      'Environmental protection standards',
      'Data retention policies'
    ]
  },
  {
    id: 'defra-reporting',
    title: 'Defra Policy Reporting',
    description: 'Aggregated data and policy insights shared with Department for Environment',
    stakeholder: 'Defra',
    system: 'Government Integration',
    details: [
      'Policy effectiveness analysis',
      'Environmental outcome tracking',
      'Regional woodland creation statistics',
      'Carbon sequestration reporting',
      'Biodiversity impact assessment'
    ],
    dataFlow: [
      'Aggregated application statistics',
      'Geospatial woodland coverage data',
      'Environmental impact metrics',
      'Policy performance indicators',
      'Funding allocation summaries'
    ],
    compliance: [
      'Government data sharing agreements',
      'Statistical disclosure control',
      'Policy transparency requirements'
    ]
  },
  {
    id: 'treasury-audit',
    title: 'HM Treasury Audit',
    description: 'Financial oversight and audit trail for public spending accountability',
    stakeholder: 'HM Treasury',
    system: 'Financial Integration',
    details: [
      'Grant payment verification',
      'Value for money assessments',
      'Fraud prevention checks',
      'Budget allocation tracking',
      'Public spending transparency'
    ],
    dataFlow: [
      'Payment transaction records',
      'Financial audit trails',
      'Cost-benefit analysis data',
      'Risk assessment reports',
      'Compliance verification records'
    ],
    compliance: [
      'Public spending transparency',
      'Treasury Green Book compliance',
      'Anti-fraud regulations',
      'Financial audit standards'
    ]
  }
]

export default function SystemDiagram() {
  const [selectedStep, setSelectedStep] = useState<string | null>(null)
  const [activeFlow, setActiveFlow] = useState<string | null>(null)

  const getStakeholderIcon = (stakeholder: string) => {
    switch (stakeholder) {
      case 'Farmers & Advisors': return <Users className="h-6 w-6" />
      case 'Land App System': return <MapPin className="h-6 w-6" />
      case 'Forestry Commission': return <TreePine className="h-6 w-6" />
      case 'Defra': return <Building2 className="h-6 w-6" />
      case 'HM Treasury': return <Landmark className="h-6 w-6" />
      default: return <FileText className="h-6 w-6" />
    }
  }

  const getStakeholderColor = (stakeholder: string) => {
    switch (stakeholder) {
      case 'Farmers & Advisors': return 'bg-green-500'
      case 'Land App System': return 'bg-blue-500'
      case 'Forestry Commission': return 'bg-govuk-blue'
      case 'Defra': return 'bg-purple-500'
      case 'HM Treasury': return 'bg-amber-500'
      default: return 'bg-gray-500'
    }
  }

  const selectedStepData = processSteps.find(step => step.id === selectedStep)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">System Architecture & Data Flow</h1>
        <p className="text-gray-600">Interactive diagram showing the end-to-end woodland creation grant process</p>
      </div>

      {/* System Overview */}
      <div className="bg-white rounded-lg shadow border p-6">
        <h2 className="text-lg font-medium text-gray-900 mb-4">Process Overview</h2>
        
        {/* Interactive Workflow Diagram */}
        <div className="relative">
          {/* Process Steps */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 lg:gap-4">
            {processSteps.map((step, index) => (
              <div key={step.id} className="relative">
                {/* Process Box */}
                <div 
                  className={`
                    relative p-4 rounded-lg border-2 cursor-pointer transition-all duration-200
                    ${selectedStep === step.id 
                      ? 'border-govuk-blue bg-blue-50 shadow-lg' 
                      : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-md'
                    }
                  `}
                  onClick={() => setSelectedStep(selectedStep === step.id ? null : step.id)}
                  onMouseEnter={() => setActiveFlow(step.id)}
                  onMouseLeave={() => setActiveFlow(null)}
                >
                  {/* Stakeholder Icon */}
                  <div className={`
                    inline-flex items-center justify-center w-12 h-12 rounded-full text-white mb-3
                    ${getStakeholderColor(step.stakeholder)}
                  `}>
                    {getStakeholderIcon(step.stakeholder)}
                  </div>
                  
                  <h3 className="font-semibold text-gray-900 text-sm mb-2">{step.title}</h3>
                  <p className="text-xs text-gray-600 mb-2">{step.description}</p>
                  
                  {/* System Badge */}
                  <div className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                    {step.system}
                  </div>

                  {/* Click indicator */}
                  <div className="absolute top-2 right-2">
                    <Info className="h-4 w-4 text-gray-400" />
                  </div>
                </div>

                {/* Arrow to next step */}
                {index < processSteps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-2 transform -translate-y-1/2 z-10">
                    <div className={`
                      p-1 rounded-full bg-white border-2 transition-colors duration-200
                      ${activeFlow === step.id || activeFlow === processSteps[index + 1].id
                        ? 'border-govuk-blue text-govuk-blue' 
                        : 'border-gray-300 text-gray-400'
                      }
                    `}>
                      <ArrowRight className="h-4 w-4" />
                    </div>
                  </div>
                )}

                {/* Mobile arrow */}
                {index < processSteps.length - 1 && (
                  <div className="lg:hidden flex justify-center mt-4">
                    <div className="p-1 rounded-full bg-gray-100 border border-gray-300 text-gray-400">
                      <ArrowDown className="h-4 w-4" />
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Data Flow Indicators */}
          <div className="mt-8 p-4 bg-gray-50 rounded-lg">
            <h3 className="font-medium text-gray-900 mb-3 flex items-center">
              <Database className="h-5 w-5 mr-2" />
              Key Data Flows
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                <span>Geospatial & Planning Data</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-blue-500 mr-2"></div>
                <span>Application & Review Data</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-amber-500 mr-2"></div>
                <span>Financial & Audit Data</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Detailed Step Information */}
      {selectedStepData && (
        <div className="bg-white rounded-lg shadow border overflow-hidden">
          <div className="px-6 py-4 bg-blue-50 border-b border-blue-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className={`
                  inline-flex items-center justify-center w-10 h-10 rounded-full text-white
                  ${getStakeholderColor(selectedStepData.stakeholder)}
                `}>
                  {getStakeholderIcon(selectedStepData.stakeholder)}
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{selectedStepData.title}</h3>
                  <p className="text-sm text-gray-600">{selectedStepData.stakeholder} • {selectedStepData.system}</p>
                </div>
              </div>
              <button 
                onClick={() => setSelectedStep(null)}
                className="p-1 rounded-full hover:bg-white transition-colors"
              >
                <X className="h-5 w-5 text-gray-500" />
              </button>
            </div>
          </div>

          <div className="p-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Process Details */}
              <div>
                <h4 className="font-medium text-gray-900 mb-3 flex items-center">
                  <CheckCircle className="h-5 w-5 mr-2 text-green-600" />
                  Process Details
                </h4>
                <ul className="space-y-2">
                  {selectedStepData.details.map((detail, index) => (
                    <li key={index} className="flex items-start text-sm">
                      <span className="w-2 h-2 rounded-full bg-govuk-blue mt-2 mr-3 flex-shrink-0"></span>
                      <span className="text-gray-700">{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Data Flow */}
              <div>
                <h4 className="font-medium text-gray-900 mb-3 flex items-center">
                  <Database className="h-5 w-5 mr-2 text-blue-600" />
                  Data Exchange
                </h4>
                <ul className="space-y-2">
                  {selectedStepData.dataFlow.map((data, index) => (
                    <li key={index} className="flex items-start text-sm">
                      <span className="w-2 h-2 rounded-full bg-blue-500 mt-2 mr-3 flex-shrink-0"></span>
                      <span className="text-gray-700">{data}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Compliance */}
              <div>
                <h4 className="font-medium text-gray-900 mb-3 flex items-center">
                  <Shield className="h-5 w-5 mr-2 text-amber-600" />
                  Compliance & Governance
                </h4>
                <ul className="space-y-2">
                  {selectedStepData.compliance.map((compliance, index) => (
                    <li key={index} className="flex items-start text-sm">
                      <span className="w-2 h-2 rounded-full bg-amber-500 mt-2 mr-3 flex-shrink-0"></span>
                      <span className="text-gray-700">{compliance}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* System Integration Points */}
      <div className="bg-white rounded-lg shadow border p-6">
        <h2 className="text-lg font-medium text-gray-900 mb-4">System Integration Architecture</h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Technical Integration */}
          <div>
            <h3 className="font-medium text-gray-900 mb-3">Technical Integration</h3>
            <div className="space-y-3">
              <div className="flex items-center p-3 bg-blue-50 rounded-lg">
                <div className="w-3 h-3 rounded-full bg-blue-500 mr-3"></div>
                <div>
                  <p className="font-medium text-sm">Land App API</p>
                  <p className="text-xs text-gray-600">RESTful API for application submission</p>
                </div>
              </div>
              <div className="flex items-center p-3 bg-green-50 rounded-lg">
                <div className="w-3 h-3 rounded-full bg-green-500 mr-3"></div>
                <div>
                  <p className="font-medium text-sm">Defra Data Hub</p>
                  <p className="text-xs text-gray-600">Policy data aggregation and reporting</p>
                </div>
              </div>
              <div className="flex items-center p-3 bg-amber-50 rounded-lg">
                <div className="w-3 h-3 rounded-full bg-amber-500 mr-3"></div>
                <div>
                  <p className="font-medium text-sm">Treasury OSCAR</p>
                  <p className="text-xs text-gray-600">Online System for Central Accounting</p>
                </div>
              </div>
            </div>
          </div>

          {/* Data Standards */}
          <div>
            <h3 className="font-medium text-gray-900 mb-3">Data Standards & Security</h3>
            <div className="space-y-3">
              <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                <Shield className="h-5 w-5 text-gray-600 mr-3" />
                <div>
                  <p className="font-medium text-sm">Government Security Classifications</p>
                  <p className="text-xs text-gray-600">OFFICIAL-SENSITIVE data handling</p>
                </div>
              </div>
              <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                <Database className="h-5 w-5 text-gray-600 mr-3" />
                <div>
                  <p className="font-medium text-sm">Open Standards</p>
                  <p className="text-xs text-gray-600">GeoJSON, JSON-LD, REST APIs</p>
                </div>
              </div>
              <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                <UserCheck className="h-5 w-5 text-gray-600 mr-3" />
                <div>
                  <p className="font-medium text-sm">GDPR Compliance</p>
                  <p className="text-xs text-gray-600">Data protection and privacy by design</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Instructions */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <Info className="h-5 w-5 text-govuk-blue mt-0.5" />
          <div>
            <h3 className="font-medium text-gray-900">How to Use This Diagram</h3>
            <p className="text-sm text-gray-700 mt-1">
              Click on any process step above to see detailed information about stakeholders, data flows, and compliance requirements. 
              Hover over steps to highlight the data flow connections between systems.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}