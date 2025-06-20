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
    },
    {
      type: 'Feature',
      properties: {
        id: 'NC_006',
        name: 'Cumbria Mixed Woodland',
        area_hectares: 45.3,
        suitability: 'High',
        land_use: 'Rough grazing',
        soil_type: 'Peaty loam',
        slope: '8-20 degrees',
        access: 'Moderate - forestry track required',
        constraints: ['Steep terrain', 'Potential heritage features'],
        carbon_potential: 425,
        biodiversity_score: 94,
        flood_risk: 'Low',
        archaeology: true,
        protected_species: true,
        land_app_id: 'LA_006_001',
        ewco_eligible: true,
        fast_track_eligible: false,
        estimated_cost_per_ha: 8100,
        maintenance_requirements: 'Deer management, selective thinning at year 20',
        created_date: '2024-01-25T09:15:00Z',
        last_updated: '2024-02-15T11:30:00Z'
      },
      geometry: {
        type: 'Polygon',
        coordinates: [[
          [-2.8456, 54.4234],
          [-2.8400, 54.4234],
          [-2.8400, 54.4280],
          [-2.8456, 54.4280],
          [-2.8456, 54.4234]
        ]]
      }
    },
    {
      type: 'Feature',
      properties: {
        id: 'NC_007',
        name: 'Norfolk Broadleaf Plantation',
        area_hectares: 12.8,
        suitability: 'Medium',
        land_use: 'Arable - wheat',
        soil_type: 'Light clay',
        slope: '0-3 degrees',
        access: 'Excellent - direct road access',
        constraints: ['Former field boundaries', 'Scattered mature trees'],
        carbon_potential: 145,
        biodiversity_score: 76,
        flood_risk: 'Very Low',
        archaeology: false,
        protected_species: false,
        land_app_id: 'LA_007_001',
        ewco_eligible: true,
        fast_track_eligible: true,
        estimated_cost_per_ha: 7650,
        maintenance_requirements: 'Weed control for 5 years, formative pruning',
        created_date: '2024-02-01T14:20:00Z',
        last_updated: '2024-02-01T14:20:00Z'
      },
      geometry: {
        type: 'Polygon',
        coordinates: [[
          [1.2456, 52.6234],
          [1.2485, 52.6234],
          [1.2485, 52.6255],
          [1.2456, 52.6255],
          [1.2456, 52.6234]
        ]]
      }
    },
    {
      type: 'Feature',
      properties: {
        id: 'NC_008',
        name: 'Northumberland Conifer Estate',
        area_hectares: 87.6,
        suitability: 'High',
        land_use: 'Upland grazing',
        soil_type: 'Podzolic',
        slope: '15-30 degrees',
        access: 'Poor - requires significant infrastructure',
        constraints: ['Steep gradients', 'Remote location', 'Weather exposure'],
        carbon_potential: 780,
        biodiversity_score: 72,
        flood_risk: 'Very Low',
        archaeology: false,
        protected_species: true,
        land_app_id: 'LA_008_001',
        ewco_eligible: true,
        fast_track_eligible: false,
        estimated_cost_per_ha: 7470,
        maintenance_requirements: 'Extensive deer management, wind damage monitoring',
        created_date: '2024-02-03T10:45:00Z',
        last_updated: '2024-02-03T10:45:00Z'
      },
      geometry: {
        type: 'Polygon',
        coordinates: [[
          [-2.1456, 55.1234],
          [-2.1350, 55.1234],
          [-2.1350, 55.1334],
          [-2.1456, 55.1334],
          [-2.1456, 55.1234]
        ]]
      }
    },
    {
      type: 'Feature',
      properties: {
        id: 'NC_009',
        name: 'Dorset Agroforestry System',
        area_hectares: 18.2,
        suitability: 'High',
        land_use: 'Livestock grazing',
        soil_type: 'Chalk downland',
        slope: '3-12 degrees',
        access: 'Good - farm track access',
        constraints: ['Livestock integration required', 'Existing hedgerows'],
        carbon_potential: 165,
        biodiversity_score: 88,
        flood_risk: 'Low',
        archaeology: true,
        protected_species: false,
        land_app_id: 'LA_009_001',
        ewco_eligible: true,
        fast_track_eligible: true,
        estimated_cost_per_ha: 8570,
        maintenance_requirements: 'Livestock protection, hedge management integration',
        created_date: '2024-01-28T16:30:00Z',
        last_updated: '2024-02-12T09:15:00Z'
      },
      geometry: {
        type: 'Polygon',
        coordinates: [[
          [-2.4456, 50.6234],
          [-2.4425, 50.6234],
          [-2.4425, 50.6260],
          [-2.4456, 50.6260],
          [-2.4456, 50.6234]
        ]]
      }
    },
    {
      type: 'Feature',
      properties: {
        id: 'NC_010',
        name: 'Hertfordshire Mixed Woodland',
        area_hectares: 34.7,
        suitability: 'Medium',
        land_use: 'Improved grassland',
        soil_type: 'Clay with flints',
        slope: '2-8 degrees',
        access: 'Excellent - multiple access points',
        constraints: ['Public footpaths', 'Adjacent residential area'],
        carbon_potential: 295,
        biodiversity_score: 81,
        flood_risk: 'Medium',
        archaeology: false,
        protected_species: false,
        land_app_id: 'LA_010_001',
        ewco_eligible: true,
        fast_track_eligible: false,
        estimated_cost_per_ha: 8330,
        maintenance_requirements: 'Public access management, edge habitat maintenance',
        created_date: '2024-02-05T11:20:00Z',
        last_updated: '2024-02-05T11:20:00Z'
      },
      geometry: {
        type: 'Polygon',
        coordinates: [[
          [-0.2456, 51.8234],
          [-0.2400, 51.8234],
          [-0.2400, 51.8280],
          [-0.2456, 51.8280],
          [-0.2456, 51.8234]
        ]]
      }
    },
    {
      type: 'Feature',
      properties: {
        id: 'NC_011',
        name: 'Shropshire Small Woodland',
        area_hectares: 9.4,
        suitability: 'Low',
        land_use: 'Rough pasture',
        soil_type: 'Heavy clay',
        slope: '5-15 degrees',
        access: 'Poor - no vehicular access',
        constraints: ['Waterlogged conditions', 'Ancient earthworks', 'Access limitations'],
        carbon_potential: 85,
        biodiversity_score: 65,
        flood_risk: 'High',
        archaeology: true,
        protected_species: true,
        land_app_id: 'LA_011_001',
        ewco_eligible: false,
        fast_track_eligible: false,
        estimated_cost_per_ha: 9200,
        maintenance_requirements: 'Drainage management, archaeological monitoring',
        created_date: '2024-01-30T13:45:00Z',
        last_updated: '2024-02-10T10:20:00Z'
      },
      geometry: {
        type: 'Polygon',
        coordinates: [[
          [-2.7456, 52.7234],
          [-2.7435, 52.7234],
          [-2.7435, 52.7250],
          [-2.7456, 52.7250],
          [-2.7456, 52.7234]
        ]]
      }
    },
    {
      type: 'Feature',
      properties: {
        id: 'NC_012',
        name: 'Oxfordshire Valley Woodland',
        area_hectares: 56.1,
        suitability: 'High',
        land_use: 'Permanent pasture',
        soil_type: 'Alluvial loam',
        slope: '0-5 degrees',
        access: 'Good - existing tracks',
        constraints: ['Flood plain location', 'Historic parkland features'],
        carbon_potential: 485,
        biodiversity_score: 91,
        flood_risk: 'Medium',
        archaeology: true,
        protected_species: true,
        land_app_id: 'LA_012_001',
        ewco_eligible: true,
        fast_track_eligible: false,
        estimated_cost_per_ha: 7930,
        maintenance_requirements: 'Flood resilience planning, historic feature preservation',
        created_date: '2024-01-18T08:30:00Z',
        last_updated: '2024-02-08T14:45:00Z'
      },
      geometry: {
        type: 'Polygon',
        coordinates: [[
          [-1.2456, 51.7234],
          [-1.2380, 51.7234],
          [-1.2380, 51.7300],
          [-1.2456, 51.7300],
          [-1.2456, 51.7234]
        ]]
      }
    },
    {
      type: 'Feature',
      properties: {
        id: 'NC_013',
        name: 'Somerset Copse Extension',
        area_hectares: 7.9,
        suitability: 'Medium',
        land_use: 'Orchard - old',
        soil_type: 'Red clay',
        slope: '8-15 degrees',
        access: 'Moderate - farm gate access',
        constraints: ['Existing fruit trees', 'Slope stability'],
        carbon_potential: 72,
        biodiversity_score: 79,
        flood_risk: 'Low',
        archaeology: false,
        protected_species: false,
        land_app_id: 'LA_013_001',
        ewco_eligible: true,
        fast_track_eligible: true,
        estimated_cost_per_ha: 8480,
        maintenance_requirements: 'Existing tree management, slope stabilization',
        created_date: '2024-02-08T15:10:00Z',
        last_updated: '2024-02-08T15:10:00Z'
      },
      geometry: {
        type: 'Polygon',
        coordinates: [[
          [-2.9456, 51.1234],
          [-2.9440, 51.1234],
          [-2.9440, 51.1250],
          [-2.9456, 51.1250],
          [-2.9456, 51.1234]
        ]]
      }
    },
    {
      type: 'Feature',
      properties: {
        id: 'NC_014',
        name: 'Lancashire Upland Forest',
        area_hectares: 102.3,
        suitability: 'Medium',
        land_use: 'Moorland grazing',
        soil_type: 'Peaty gleysol',
        slope: '10-25 degrees',
        access: 'Poor - off-road access only',
        constraints: ['Peat bog areas', 'Grouse moor', 'Weather exposure'],
        carbon_potential: 920,
        biodiversity_score: 86,
        flood_risk: 'Very Low',
        archaeology: false,
        protected_species: true,
        land_app_id: 'LA_014_001',
        ewco_eligible: true,
        fast_track_eligible: false,
        estimated_cost_per_ha: 8040,
        maintenance_requirements: 'Peat conservation, grouse habitat integration',
        created_date: '2024-02-10T09:00:00Z',
        last_updated: '2024-02-10T09:00:00Z'
      },
      geometry: {
        type: 'Polygon',
        coordinates: [[
          [-2.5456, 53.9234],
          [-2.5300, 53.9234],
          [-2.5300, 53.9380],
          [-2.5456, 53.9380],
          [-2.5456, 53.9234]
        ]]
      }
    },
    {
      type: 'Feature',
      properties: {
        id: 'NC_015',
        name: 'Warwickshire Agroforestry',
        area_hectares: 26.5,
        suitability: 'High',
        land_use: 'Mixed farming',
        soil_type: 'Loamy clay',
        slope: '2-6 degrees',
        access: 'Excellent - road frontage',
        constraints: ['Field drainage systems', 'Existing farm infrastructure'],
        carbon_potential: 235,
        biodiversity_score: 84,
        flood_risk: 'Low',
        archaeology: false,
        protected_species: false,
        land_app_id: 'LA_015_001',
        ewco_eligible: true,
        fast_track_eligible: true,
        estimated_cost_per_ha: 8000,
        maintenance_requirements: 'Farm system integration, drainage maintenance',
        created_date: '2024-01-22T12:15:00Z',
        last_updated: '2024-02-05T16:30:00Z'
      },
      geometry: {
        type: 'Polygon',
        coordinates: [[
          [-1.5456, 52.3234],
          [-1.5420, 52.3234],
          [-1.5420, 52.3270],
          [-1.5456, 52.3270],
          [-1.5456, 52.3234]
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