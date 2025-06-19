export interface LandAppGeoJSON {
  type: 'FeatureCollection'
  name: string
  features: LandAppFeature[]
}

export interface LandAppFeature {
  type: 'Feature'
  properties: {
    id: string
    name: string
    area_hectares: number
    suitability: 'High' | 'Medium' | 'Low'
    land_use: string
    soil_type: string
    slope: string
    access: string
    constraints: string[]
    carbon_potential: number
    biodiversity_score: number
    flood_risk: string
    archaeology: boolean
    protected_species: boolean
    land_app_id: string
    ewco_eligible: boolean
    fast_track_eligible: boolean
    estimated_cost_per_ha: number
    maintenance_requirements: string
    created_date: string
    last_updated: string
  }
  geometry: {
    type: 'Polygon' | 'MultiPolygon'
    coordinates: number[][][] | number[][][][]
  }
}

// Mock GeoJSON data for NaturalColonisation_EWCO_EWCO__667e7
export const naturalColonisationData: LandAppGeoJSON = {
  type: 'FeatureCollection',
  name: 'NaturalColonisation_EWCO_EWCO__667e7',
  features: [
    {
      type: 'Feature',
      properties: {
        id: 'NC_001',
        name: 'Lower Field Natural Regeneration Area',
        area_hectares: 8.5,
        suitability: 'High',
        land_use: 'Agricultural grassland',
        soil_type: 'Clay loam',
        slope: '0-5 degrees',
        access: 'Good - existing farm track',
        constraints: ['Overhead power lines (northern boundary)', 'Seasonal flooding (winter)'],
        carbon_potential: 125, // tonnes CO2 over 30 years
        biodiversity_score: 85,
        flood_risk: 'Low',
        archaeology: false,
        protected_species: true,
        land_app_id: 'LA_667e7_001',
        ewco_eligible: true,
        fast_track_eligible: true,
        estimated_cost_per_ha: 8750,
        maintenance_requirements: 'Annual weed control for 3 years, rabbit protection',
        created_date: '2024-01-10T10:30:00Z',
        last_updated: '2024-01-15T14:22:00Z'
      },
      geometry: {
        type: 'Polygon',
        coordinates: [[
          [-2.3456, 50.7234],
          [-2.3445, 50.7234],
          [-2.3445, 50.7245],
          [-2.3456, 50.7245],
          [-2.3456, 50.7234]
        ]]
      }
    },
    {
      type: 'Feature',
      properties: {
        id: 'NC_002',
        name: 'Hillside Mixed Woodland',
        area_hectares: 12.3,
        suitability: 'Medium',
        land_use: 'Improved grassland',
        soil_type: 'Sandy clay',
        slope: '5-15 degrees',
        access: 'Moderate - requires new access track',
        constraints: ['Ancient field boundary', 'Badger sett (50m buffer required)'],
        carbon_potential: 185,
        biodiversity_score: 92,
        flood_risk: 'Very Low',
        archaeology: true,
        protected_species: true,
        land_app_id: 'LA_667e7_002',
        ewco_eligible: true,
        fast_track_eligible: false,
        estimated_cost_per_ha: 9200,
        maintenance_requirements: 'Deer protection, selective thinning at year 15',
        created_date: '2024-01-10T10:30:00Z',
        last_updated: '2024-01-15T14:22:00Z'
      },
      geometry: {
        type: 'Polygon',
        coordinates: [[
          [-2.3470, 50.7250],
          [-2.3455, 50.7250],
          [-2.3455, 50.7265],
          [-2.3470, 50.7265],
          [-2.3470, 50.7250]
        ]]
      }
    },
    {
      type: 'Feature',
      properties: {
        id: 'NC_003',
        name: 'Riparian Buffer Zone',
        area_hectares: 3.2,
        suitability: 'High',
        land_use: 'Wet grassland',
        soil_type: 'Alluvial clay',
        slope: '0-2 degrees',
        access: 'Limited - seasonal access only',
        constraints: ['Watercourse buffer requirements', 'Seasonal flooding'],
        carbon_potential: 95,
        biodiversity_score: 96,
        flood_risk: 'High',
        archaeology: false,
        protected_species: true,
        land_app_id: 'LA_667e7_003',
        ewco_eligible: true,
        fast_track_eligible: true,
        estimated_cost_per_ha: 7800,
        maintenance_requirements: 'Natural regeneration monitoring, invasive species control',
        created_date: '2024-01-10T10:30:00Z',
        last_updated: '2024-01-15T14:22:00Z'
      },
      geometry: {
        type: 'Polygon',
        coordinates: [[
          [-2.3460, 50.7220],
          [-2.3450, 50.7220],
          [-2.3450, 50.7230],
          [-2.3460, 50.7230],
          [-2.3460, 50.7220]
        ]]
      }
    },
    {
      type: 'Feature',
      properties: {
        id: 'NC_004',
        name: 'Upper Pasture Agroforestry',
        area_hectares: 15.8,
        suitability: 'Medium',
        land_use: 'Permanent pasture',
        soil_type: 'Loam',
        slope: '2-8 degrees',
        access: 'Excellent - road frontage',
        constraints: ['Existing mature oak trees', 'Rights of way crossing'],
        carbon_potential: 220,
        biodiversity_score: 78,
        flood_risk: 'Low',
        archaeology: false,
        protected_species: false,
        land_app_id: 'LA_667e7_004',
        ewco_eligible: true,
        fast_track_eligible: true,
        estimated_cost_per_ha: 6500,
        maintenance_requirements: 'Livestock protection, pruning established trees',
        created_date: '2024-01-10T10:30:00Z',
        last_updated: '2024-01-15T14:22:00Z'
      },
      geometry: {
        type: 'Polygon',
        coordinates: [[
          [-2.3485, 50.7270],
          [-2.3465, 50.7270],
          [-2.3465, 50.7285],
          [-2.3485, 50.7285],
          [-2.3485, 50.7270]
        ]]
      }
    },
    {
      type: 'Feature',
      properties: {
        id: 'NC_005',
        name: 'Boundary Shelter Belt',
        area_hectares: 2.1,
        suitability: 'High',
        land_use: 'Field margin',
        soil_type: 'Sandy loam',
        slope: '0-3 degrees',
        access: 'Good - adjacent to existing track',
        constraints: ['Utility easement', 'Wind exposure'],
        carbon_potential: 48,
        biodiversity_score: 82,
        flood_risk: 'Very Low',
        archaeology: false,
        protected_species: false,
        land_app_id: 'LA_667e7_005',
        ewco_eligible: true,
        fast_track_eligible: true,
        estimated_cost_per_ha: 9500,
        maintenance_requirements: 'Wind protection for first 5 years, formative pruning',
        created_date: '2024-01-10T10:30:00Z',
        last_updated: '2024-01-15T14:22:00Z'
      },
      geometry: {
        type: 'Polygon',
        coordinates: [[
          [-2.3490, 50.7235],
          [-2.3485, 50.7235],
          [-2.3485, 50.7245],
          [-2.3490, 50.7245],
          [-2.3490, 50.7235]
        ]]
      }
    }
  ]
}

// Land App API response simulation
export const landAppApiResponse = {
  project_id: 'EWCO-2024-001',
  land_app_reference: 'LA_667e7',
  submission_date: '2024-01-15T14:22:00Z',
  status: 'Submitted to Forestry Commission',
  total_area: 42.0,
  eligible_area: 41.9,
  estimated_total_cost: 356750,
  estimated_grant_value: 412800,
  data_sources: [
    'OS MasterMap',
    'Natural England Magic',
    'Environment Agency Flood Risk',
    'Historic England Heritage Gateway',
    'Forestry Commission Forest Research',
    'Field survey data'
  ],
  quality_checks: {
    boundary_accuracy: 'High (GPS surveyed)',
    land_use_verification: 'Verified against satellite imagery',
    constraints_assessment: 'Comprehensive desktop and field survey',
    species_survey: 'Ecological survey completed'
  },
  recommendations: [
    'Fast track processing recommended for parcels NC_001, NC_003, NC_004, NC_005',
    'Environmental Impact Assessment required for parcel NC_002 due to archaeological features',
    'Consider phased implementation starting with riparian areas',
    'Coordinate with local badger group for NC_002 management plan'
  ]
}