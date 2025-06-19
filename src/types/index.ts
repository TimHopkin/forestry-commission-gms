export interface LandParcel {
  id: string
  area: number // hectares
  sensitivity: 'high' | 'low'
  location: {
    county: string
    coordinates: [number, number]
  }
  soilType: string
  currentLandUse: string
}

export interface WoodlandType {
  id: string
  name: string
  species: string[]
  minArea: number
  maxArea: number
  carbonRate: number // tonnes CO2/ha/year
  biodiversityScore: number
}

export interface PaymentCalculation {
  standardCapital: number // up to £10,200/ha
  annualMaintenance: number // £400/ha for 15 years
  additionalContributions: number // up to £12,700/ha
  lowSensitivityPayment: number // £1,100/ha
  natureRecoveryPremium: number // £3,300/ha
  total: number
}

export interface Application {
  id: string
  applicantName: string
  applicantEmail: string
  landParcel: LandParcel
  woodlandType: WoodlandType
  proposedArea: number
  environmentalImpactRequired: boolean
  fastTrackEligible: boolean
  paymentCalculation: PaymentCalculation
  status: 'draft' | 'submitted' | 'under-review' | 'approved' | 'rejected'
  submittedAt?: Date
  reviewedAt?: Date
  documents: Document[]
}

export interface Document {
  id: string
  name: string
  type: 'wcp' | 'map' | 'environmental-survey' | 'other'
  url: string
  uploadedAt: Date
  version: number
}

export interface FormStep {
  id: string
  title: string
  description: string
  fields: FormField[]
  validation: (data: any) => boolean
  nextStep: (data: any) => string | null
}

export interface FormField {
  id: string
  type: 'text' | 'number' | 'select' | 'multiselect' | 'file' | 'radio' | 'checkbox'
  label: string
  hint?: string
  required: boolean
  options?: { value: string; label: string }[]
  validation?: (value: any) => string | null
  conditional?: {
    dependsOn: string
    values: any[]
  }
}