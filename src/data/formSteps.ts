import { FormStep } from '@/types'

export const applicationFormSteps: FormStep[] = [
  {
    id: 'applicant-details',
    title: 'Applicant Details',
    description: 'Tell us about yourself and your organization',
    fields: [
      {
        id: 'applicantName',
        type: 'text',
        label: 'Full name',
        hint: 'Enter your full name as it appears on official documents',
        required: true
      },
      {
        id: 'applicantEmail',
        type: 'text',
        label: 'Email address',
        hint: 'We will use this to contact you about your application',
        required: true
      },
      {
        id: 'organizationType',
        type: 'radio',
        label: 'Are you applying as an individual or organization?',
        required: true,
        options: [
          { value: 'individual', label: 'Individual landowner' },
          { value: 'organization', label: 'Organization or business' },
          { value: 'public-body', label: 'Public body' }
        ]
      },
      {
        id: 'organizationName',
        type: 'text',
        label: 'Organization name',
        required: true,
        conditional: {
          dependsOn: 'organizationType',
          values: ['organization', 'public-body']
        }
      }
    ],
    validation: () => true,
    nextStep: () => 'land-details'
  },
  {
    id: 'land-details',
    title: 'Land Details',
    description: 'Provide information about the land where you want to create woodland',
    fields: [
      {
        id: 'landArea',
        type: 'number',
        label: 'Total land area (hectares)',
        hint: 'Minimum 1 hectare required for EWCO',
        required: true
      },
      {
        id: 'county',
        type: 'select',
        label: 'County',
        required: true,
        options: [
          { value: 'bedfordshire', label: 'Bedfordshire' },
          { value: 'berkshire', label: 'Berkshire' },
          { value: 'buckinghamshire', label: 'Buckinghamshire' },
          { value: 'cambridgeshire', label: 'Cambridgeshire' },
          { value: 'cheshire', label: 'Cheshire' },
          { value: 'cornwall', label: 'Cornwall' },
          { value: 'cumbria', label: 'Cumbria' },
          { value: 'derbyshire', label: 'Derbyshire' },
          { value: 'devon', label: 'Devon' },
          { value: 'dorset', label: 'Dorset' },
          { value: 'durham', label: 'Durham' },
          { value: 'essex', label: 'Essex' },
          { value: 'gloucestershire', label: 'Gloucestershire' },
          { value: 'hampshire', label: 'Hampshire' },
          { value: 'hertfordshire', label: 'Hertfordshire' },
          { value: 'kent', label: 'Kent' },
          { value: 'lancashire', label: 'Lancashire' },
          { value: 'leicestershire', label: 'Leicestershire' },
          { value: 'lincolnshire', label: 'Lincolnshire' },
          { value: 'norfolk', label: 'Norfolk' },
          { value: 'northumberland', label: 'Northumberland' },
          { value: 'nottinghamshire', label: 'Nottinghamshire' },
          { value: 'oxfordshire', label: 'Oxfordshire' },
          { value: 'shropshire', label: 'Shropshire' },
          { value: 'somerset', label: 'Somerset' },
          { value: 'staffordshire', label: 'Staffordshire' },
          { value: 'suffolk', label: 'Suffolk' },
          { value: 'surrey', label: 'Surrey' },
          { value: 'sussex', label: 'Sussex' },
          { value: 'warwickshire', label: 'Warwickshire' },
          { value: 'wiltshire', label: 'Wiltshire' },
          { value: 'yorkshire', label: 'Yorkshire' }
        ]
      },
      {
        id: 'currentLandUse',
        type: 'select',
        label: 'Current land use',
        required: true,
        options: [
          { value: 'agricultural', label: 'Agricultural land' },
          { value: 'grassland', label: 'Grassland' },
          { value: 'scrubland', label: 'Scrubland' },
          { value: 'brownfield', label: 'Brownfield site' },
          { value: 'other', label: 'Other' }
        ]
      },
      {
        id: 'soilType',
        type: 'select',
        label: 'Predominant soil type',
        required: true,
        options: [
          { value: 'clay', label: 'Clay' },
          { value: 'loam', label: 'Loam' },
          { value: 'sand', label: 'Sand' },
          { value: 'chalk', label: 'Chalk' },
          { value: 'peat', label: 'Peat' },
          { value: 'mixed', label: 'Mixed' }
        ]
      }
    ],
    validation: () => true,
    nextStep: () => 'sensitivity-assessment'
  },
  {
    id: 'sensitivity-assessment',
    title: 'Land Sensitivity Assessment',
    description: 'We need to assess the environmental sensitivity of your land',
    fields: [
      {
        id: 'inProtectedArea',
        type: 'radio',
        label: 'Is the land in or near a protected environmental area?',
        hint: 'This includes Sites of Special Scientific Interest (SSSI), National Parks, Areas of Outstanding Natural Beauty, or other designated areas',
        required: true,
        options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' },
          { value: 'unsure', label: 'I\'m not sure' }
        ]
      },
      {
        id: 'protectedAreaType',
        type: 'select',
        label: 'Type of protected area',
        required: true,
        conditional: {
          dependsOn: 'inProtectedArea',
          values: ['yes']
        },
        options: [
          { value: 'sssi', label: 'Site of Special Scientific Interest (SSSI)' },
          { value: 'nationalpark', label: 'National Park' },
          { value: 'aonb', label: 'Area of Outstanding Natural Beauty' },
          { value: 'sac', label: 'Special Area of Conservation' },
          { value: 'spa', label: 'Special Protection Area' },
          { value: 'ramsar', label: 'Ramsar site' },
          { value: 'other', label: 'Other designated area' }
        ]
      },
      {
        id: 'hasRareSpecies',
        type: 'radio',
        label: 'Are there any rare or protected species on the land?',
        required: true,
        options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' },
          { value: 'unsure', label: 'I\'m not sure' }
        ]
      },
      {
        id: 'hasArchaeology',
        type: 'radio',
        label: 'Are there any archaeological features on the land?',
        required: true,
        options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' },
          { value: 'unsure', label: 'I\'m not sure' }
        ]
      }
    ],
    validation: () => true,
    nextStep: (data) => {
      // Determine if Environmental Impact Assessment is required
      const requiresEIA = data.inProtectedArea === 'yes' || 
                         data.hasRareSpecies === 'yes' || 
                         data.hasArchaeology === 'yes' ||
                         data.landArea > 50
      return requiresEIA ? 'environmental-assessment' : 'woodland-type'
    }
  },
  {
    id: 'environmental-assessment',
    title: 'Environmental Impact Assessment',
    description: 'Based on your land details, an Environmental Impact Assessment may be required',
    fields: [
      {
        id: 'eiaRequired',
        type: 'radio',
        label: 'Environmental Impact Assessment Required',
        hint: 'Due to the sensitivity of your land or the size of the proposed woodland, you will need to complete an Environmental Impact Assessment',
        required: true,
        options: [
          { value: 'accept', label: 'I understand and will complete the EIA' },
          { value: 'decline', label: 'I do not want to proceed with the EIA' }
        ]
      },
      {
        id: 'eiaConsultant',
        type: 'text',
        label: 'Environmental consultant name (optional)',
        hint: 'If you are using an environmental consultant, please provide their name and contact details',
        required: false,
        conditional: {
          dependsOn: 'eiaRequired',
          values: ['accept']
        }
      }
    ],
    validation: () => true,
    nextStep: () => 'woodland-type'
  },
  {
    id: 'woodland-type',
    title: 'Woodland Type Selection',
    description: 'Choose the type of woodland you want to create',
    fields: [
      {
        id: 'woodlandType',
        type: 'radio',
        label: 'Primary woodland type',
        required: true,
        options: [
          { value: 'broadleaf', label: 'Broadleaf woodland (native species)' },
          { value: 'conifer', label: 'Conifer woodland' },
          { value: 'mixed', label: 'Mixed woodland (broadleaf and conifer)' },
          { value: 'agroforestry', label: 'Agroforestry system' }
        ]
      },
      {
        id: 'species',
        type: 'select',
        label: 'Primary tree species',
        required: true,
        options: [
          { value: 'oak', label: 'English Oak' },
          { value: 'beech', label: 'Beech' },
          { value: 'ash', label: 'Ash' },
          { value: 'birch', label: 'Birch' },
          { value: 'alder', label: 'Alder' },
          { value: 'scots-pine', label: 'Scots Pine' },
          { value: 'norway-spruce', label: 'Norway Spruce' },
          { value: 'douglas-fir', label: 'Douglas Fir' },
          { value: 'mixed-native', label: 'Mixed native species' },
          { value: 'other', label: 'Other (please specify)' }
        ]
      },
      {
        id: 'plantingDensity',
        type: 'select',
        label: 'Planting density (trees per hectare)',
        required: true,
        options: [
          { value: '1100', label: '1,100 trees/ha (3m x 3m spacing)' },
          { value: '1600', label: '1,600 trees/ha (2.5m x 2.5m spacing)' },
          { value: '2500', label: '2,500 trees/ha (2m x 2m spacing)' },
          { value: 'natural', label: 'Natural regeneration' }
        ]
      },
      {
        id: 'additionalBenefits',
        type: 'radio',
        label: 'Will this woodland provide additional environmental benefits?',
        hint: 'Additional benefits may qualify for extra payments',
        required: true,
        options: [
          { value: 'carbon', label: 'Enhanced carbon sequestration' },
          { value: 'biodiversity', label: 'Biodiversity enhancement' },
          { value: 'water', label: 'Water quality improvement' },
          { value: 'flood', label: 'Flood risk reduction' },
          { value: 'access', label: 'Public access provision' },
          { value: 'multiple', label: 'Multiple benefits' },
          { value: 'none', label: 'No additional benefits' }
        ]
      }
    ],
    validation: () => true,
    nextStep: () => 'documents'
  },
  {
    id: 'documents',
    title: 'Supporting Documents',
    description: 'Upload the required documents for your application',
    fields: [
      {
        id: 'wcpDocument',
        type: 'file',
        label: 'Woodland Creation Plan (WCP)',
        hint: 'Upload your completed Woodland Creation Plan. Accepted formats: PDF, DOC, DOCX',
        required: true
      },
      {
        id: 'mapDocument',
        type: 'file',
        label: 'Site map and boundary files',
        hint: 'Upload detailed maps showing the proposed woodland area. Accepted formats: PDF, JPG, PNG, KML',
        required: true
      },
      {
        id: 'environmentalSurveys',
        type: 'file',
        label: 'Environmental surveys (if applicable)',
        hint: 'Upload any environmental or ecological surveys. Accepted formats: PDF, DOC, DOCX',
        required: false
      },
      {
        id: 'landOwnership',
        type: 'file',
        label: 'Proof of land ownership or management rights',
        hint: 'Upload documents proving you own or have rights to manage the land. Accepted formats: PDF, DOC, DOCX',
        required: true
      }
    ],
    validation: () => true,
    nextStep: () => null // Last step
  }
]