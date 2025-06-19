import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import DynamicForm from '@/components/DynamicForm'
import { applicationFormSteps } from '@/data/formSteps'
import { Application } from '@/types'
import { CheckCircle } from 'lucide-react'

export default function ApplicationForm() {
  const navigate = useNavigate()
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [applicationId, setApplicationId] = useState<string>('')

  const calculatePayments = (data: any) => {
    const area = parseFloat(data.landArea) || 0
    const isLowSensitivity = data.inProtectedArea === 'no' && 
                            data.hasRareSpecies === 'no' && 
                            data.hasArchaeology === 'no'
    
    const standardCapital = Math.min(area * 10200, area * 10200) // Up to £10,200/ha
    const annualMaintenance = area * 400 * 15 // £400/ha for 15 years
    const lowSensitivityPayment = isLowSensitivity ? area * 1100 : 0 // £1,100/ha for low sensitivity
    
    let additionalContributions = 0
    let natureRecoveryPremium = 0
    
    // Calculate additional contributions based on benefits
    if (data.additionalBenefits && data.additionalBenefits !== 'none') {
      additionalContributions = area * 5000 // Example: £5,000/ha for additional benefits
    }
    
    if (data.additionalBenefits === 'biodiversity' || data.additionalBenefits === 'multiple') {
      natureRecoveryPremium = area * 3300 // £3,300/ha for nature recovery
    }
    
    const total = standardCapital + annualMaintenance + additionalContributions + 
                  lowSensitivityPayment + natureRecoveryPremium
    
    return {
      standardCapital,
      annualMaintenance,
      additionalContributions,
      lowSensitivityPayment,
      natureRecoveryPremium,
      total
    }
  }

  const handleSubmit = (formData: any) => {
    // Generate application ID
    const newApplicationId = `EWCO-${new Date().getFullYear()}-${String(Math.floor(Math.random() * 1000)).padStart(3, '0')}`
    
    // Calculate payments
    const paymentCalculation = calculatePayments(formData)
    
    // Determine if Fast Track eligible
    const fastTrackEligible = formData.inProtectedArea === 'no' && 
                             formData.hasRareSpecies === 'no' && 
                             formData.hasArchaeology === 'no' &&
                             parseFloat(formData.landArea) <= 50
    
    const application: Partial<Application> = {
      id: newApplicationId,
      applicantName: formData.applicantName,
      applicantEmail: formData.applicantEmail,
      proposedArea: parseFloat(formData.landArea),
      fastTrackEligible,
      paymentCalculation,
      status: 'submitted',
      submittedAt: new Date(),
      landParcel: {
        id: `land-${newApplicationId}`,
        area: parseFloat(formData.landArea),
        sensitivity: formData.inProtectedArea === 'no' ? 'low' : 'high',
        location: {
          county: formData.county,
          coordinates: [0, 0] // Would be populated from map integration
        },
        soilType: formData.soilType,
        currentLandUse: formData.currentLandUse
      },
      woodlandType: {
        id: formData.woodlandType,
        name: formData.woodlandType,
        species: [formData.species],
        minArea: 1,
        maxArea: 1000,
        carbonRate: 5, // Example rate
        biodiversityScore: 8 // Example score
      },
      environmentalImpactRequired: formData.eiaRequired === 'accept',
      documents: [] // Would be populated with uploaded files
    }
    
    // In a real app, this would be sent to an API
    console.log('Application submitted:', application)
    
    setApplicationId(newApplicationId)
    setIsSubmitted(true)
  }

  if (isSubmitted) {
    return (
      <div className="max-w-2xl mx-auto text-center">
        <div className="bg-white rounded-lg shadow-sm border p-8">
          <CheckCircle className="mx-auto h-16 w-16 text-govuk-green mb-6" />
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Application Submitted Successfully
          </h1>
          <p className="text-gray-600 mb-6">
            Your EWCO application has been submitted and assigned reference number:
          </p>
          <div className="bg-govuk-grey-1 rounded-lg p-4 mb-6">
            <p className="text-2xl font-bold text-govuk-blue">{applicationId}</p>
          </div>
          <div className="space-y-4 text-left bg-blue-50 rounded-lg p-6 mb-6">
            <h3 className="font-semibold text-gray-900">What happens next?</h3>
            <ul className="space-y-2 text-sm text-gray-700">
              <li>• You will receive an email confirmation within 24 hours</li>
              <li>• Your application will be reviewed by our team</li>
              <li>• We will contact you if we need any additional information</li>
              <li>• You will receive a decision within 12 weeks (Fast Track applications within 6 weeks)</li>
            </ul>
          </div>
          <div className="flex space-x-4 justify-center">
            <button
              onClick={() => navigate('/applications')}
              className="govuk-button"
            >
              View My Applications
            </button>
            <button
              onClick={() => navigate('/')}
              className="govuk-button govuk-button--secondary"
            >
              Return to Dashboard
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
          New EWCO Grant Application
        </h1>
        <p className="mt-2 text-gray-600">
          Apply for funding to create new woodland under the England Woodland Creation Offer
        </p>
      </div>

      <DynamicForm
        steps={applicationFormSteps}
        onSubmit={handleSubmit}
      />
    </div>
  )
}