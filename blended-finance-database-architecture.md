# Blended Finance Land Use Database Architecture Specification

## Executive Summary

This specification outlines the database architecture for a comprehensive land use management system that enables "blended finance" - coordinated public and private investment in land use changes across the UK. The system will expand from managing Forestry Commission EWCO applications to become the foundational platform for all UK government land use incentives and private sector environmental investments.

## System Overview

### Core Concept
The platform enables land managers to:
1. Receive free UKHab baselines derived from Ordnance Survey MasterMap data
2. View spatially-targeted incentives for various land use changes
3. Create and submit land management plans via API
4. Attract blended finance from both public and private sectors
5. Provide monitoring, reporting, and verification (MRV) through mobile apps and earth observation

### Blended Finance Model
- **Government pays for**: Income foregone by land managers
- **Private sector pays for**: Specific ecosystem services they value
  - Water companies → Water services and natural flood management
  - Food retailers → Soil health and cover crop services
  - Property developers → Biodiversity net gain requirements
  - Energy companies → Carbon sequestration services

## Database Architecture Requirements

### 1. Core Entity Model

#### Land Parcels & Ownership
```sql
-- Primary land registry integration
land_parcels
- parcel_id (Primary Key)
- land_registry_title_number (Unique)
- geometry (PostGIS polygon)
- area_hectares
- owner_id (Foreign Key)
- current_land_use_classification
- soil_type
- elevation_data
- flood_risk_zone
- conservation_designations
- created_at, updated_at

-- Land ownership and management rights
land_owners
- owner_id (Primary Key)
- owner_type (individual, company, trust, public_body)
- name
- contact_details
- land_registry_verified
- created_at, updated_at

land_management_rights
- rights_id (Primary Key)
- parcel_id (Foreign Key)
- manager_id (Foreign Key)
- rights_type (owner, tenant, license, management_agreement)
- start_date, end_date
- terms_and_conditions
```

#### Baseline Data Integration
```sql
-- UKHab baseline data derived from OS MasterMap
ukhab_baselines
- baseline_id (Primary Key)
- parcel_id (Foreign Key)
- habitat_type
- confidence_score
- area_hectares
- geometry (PostGIS polygon)
- os_mastermap_source_date
- ukhab_classification_version
- created_at

-- Soil and environmental data
environmental_baselines
- baseline_id (Primary Key)
- parcel_id (Foreign Key)
- soil_organic_carbon
- soil_ph
- biodiversity_index
- water_retention_capacity
- carbon_stock_estimate
- pollinator_suitability_score
- flood_risk_mitigation_potential
- data_source
- confidence_interval
- measurement_date
```

### 2. Incentive and Opportunity Management

#### Spatial Incentive Mapping
```sql
-- Government incentive schemes
incentive_schemes
- scheme_id (Primary Key)
- scheme_name
- administering_body (forestry_commission, defra, natural_england)
- scheme_type (grants, payments, tax_relief)
- eligibility_criteria
- payment_rates
- start_date, end_date
- application_deadlines

-- Spatially targeted incentives
spatial_incentives
- incentive_id (Primary Key)
- scheme_id (Foreign Key)
- geometry (PostGIS polygon/multipolygon)
- land_use_change_type
- priority_score
- payment_rate_per_hectare
- minimum_area_requirement
- maximum_area_allowed
- eligibility_requirements
- created_at, expires_at

-- Private sector opportunities
private_sector_opportunities
- opportunity_id (Primary Key)
- buyer_organization_id (Foreign Key)
- service_type (water, biodiversity, carbon, soil_health)
- payment_rate_per_unit
- minimum_contract_duration
- maximum_contract_value
- eligibility_requirements
- geographic_targeting
- created_at, expires_at
```

### 3. Land Management Plans and Applications

#### Plan Development
```sql
-- Land management plans
land_management_plans
- plan_id (Primary Key)
- parcel_id (Foreign Key)
- plan_name
- plan_description
- planned_land_use_changes
- total_area_affected
- implementation_timeline
- estimated_costs
- expected_outcomes
- plan_status (draft, submitted, approved, rejected, active, completed)
- created_by_user_id
- created_at, updated_at

-- Specific interventions within plans
planned_interventions
- intervention_id (Primary Key)
- plan_id (Foreign Key)
- intervention_type (agroforestry, pollinator_strips, solar_panels, natural_flood_management)
- geometry (PostGIS polygon)
- area_hectares
- implementation_year
- maintenance_requirements
- expected_ecosystem_services
- cost_estimate
```

#### Application and Approval Process
```sql
-- Funding applications
funding_applications
- application_id (Primary Key)
- plan_id (Foreign Key)
- applicant_id (Foreign Key)
- application_type (public_only, private_only, blended_finance)
- total_funding_requested
- public_funding_requested
- private_funding_requested
- application_status
- submitted_at
- decision_date
- decision_rationale

-- Professional accreditation
accredited_professionals
- professional_id (Primary Key)
- name
- qualification_type
- accreditation_body
- specialization_areas
- accreditation_expiry_date
- contact_details
- active_status

-- Digital signatures and approvals
professional_approvals
- approval_id (Primary Key)
- application_id (Foreign Key)
- professional_id (Foreign Key)
- approval_type (plan_review, implementation_sign_off, monitoring_verification)
- digital_signature_hash
- approval_date
- comments
```

### 4. Blended Finance Management

#### Contract Management
```sql
-- Master contracts for blended finance
blended_finance_contracts
- contract_id (Primary Key)
- application_id (Foreign Key)
- contract_reference
- total_contract_value
- contract_duration_years
- start_date, end_date
- terms_and_conditions
- payment_schedule
- performance_metrics
- contract_status

-- Public sector contributions
public_funding_commitments
- commitment_id (Primary Key)
- contract_id (Foreign Key)
- funding_body (defra, forestry_commission, natural_england)
- funding_type (income_foregone, capital_grants, annual_payments)
- committed_amount
- payment_schedule
- conditions_and_requirements

-- Private sector investments
private_investments
- investment_id (Primary Key)
- contract_id (Foreign Key)
- investor_organization_id (Foreign Key)
- service_type (water, biodiversity, carbon, soil_health)
- investment_amount
- payment_per_unit
- minimum_service_delivery
- payment_schedule
- performance_penalties
```

#### Payment and Service Delivery
```sql
-- Payment tracking
payments
- payment_id (Primary Key)
- contract_id (Foreign Key)
- payer_type (public, private)
- payer_organization_id
- payment_amount
- payment_date
- payment_period_start, payment_period_end
- payment_status
- payment_reference

-- Service delivery tracking
ecosystem_service_delivery
- delivery_id (Primary Key)
- contract_id (Foreign Key)
- service_type
- measurement_period_start, measurement_period_end
- quantity_delivered
- quality_metrics
- verification_method
- verified_by_professional_id
- verification_date
```

### 5. Monitoring, Reporting, and Verification (MRV)

#### Mobile App Data Collection
```sql
-- Field monitoring data
field_monitoring_records
- record_id (Primary Key)
- parcel_id (Foreign Key)
- user_id (Foreign Key)
- monitoring_date
- location_coordinates (PostGIS point)
- monitoring_type (implementation_progress, outcome_measurement, compliance_check)
- data_collected (JSON field for flexible data structure)
- photos_attached
- device_metadata
- created_at

-- Mobile app usage tracking
mobile_app_sessions
- session_id (Primary Key)
- user_id (Foreign Key)
- parcel_id (Foreign Key)
- session_start, session_end
- actions_performed
- data_synced
- offline_mode_used
```

#### Earth Observation Integration
```sql
-- Satellite monitoring
earth_observation_analysis
- analysis_id (Primary Key)
- parcel_id (Foreign Key)
- satellite_source (sentinel, landsat, commercial)
- image_date
- analysis_type (land_cover_change, vegetation_health, flood_extent)
- analysis_results (JSON field)
- confidence_score
- validation_status
- created_at

-- Change detection
land_use_change_detection
- detection_id (Primary Key)
- parcel_id (Foreign Key)
- change_detected_date
- change_type
- area_affected
- confidence_level
- validation_required
- follow_up_actions
```

### 6. User Management and Access Control

#### User Authentication and Authorization
```sql
-- User accounts
users
- user_id (Primary Key)
- email (Unique)
- user_type (land_manager, professional_advisor, government_official, private_investor)
- organization_id (Foreign Key, nullable)
- authentication_method
- last_login
- account_status
- created_at, updated_at

-- Role-based access control
user_roles
- role_id (Primary Key)
- role_name
- permissions (JSON array)
- created_at

user_role_assignments
- assignment_id (Primary Key)
- user_id (Foreign Key)
- role_id (Foreign Key)
- assigned_date
- assigned_by_user_id
```

#### Organization Management
```sql
-- Organizations (government bodies, private companies, NGOs)
organizations
- organization_id (Primary Key)
- organization_name
- organization_type (government, private_company, ngo, academic)
- sector (water, energy, food, property, finance)
- contact_details
- registration_number
- verification_status
- created_at

-- Organization relationships
organization_relationships
- relationship_id (Primary Key)
- organization_1_id (Foreign Key)
- organization_2_id (Foreign Key)
- relationship_type (parent_subsidiary, partnership, contractor)
- start_date, end_date
```

### 7. API and Integration Layer

#### API Management
```sql
-- API endpoints and usage
api_endpoints
- endpoint_id (Primary Key)
- endpoint_path
- http_method
- description
- required_permissions
- rate_limit
- version
- active_status

-- API usage tracking
api_usage_logs
- log_id (Primary Key)
- user_id (Foreign Key)
- endpoint_id (Foreign Key)
- request_timestamp
- response_status
- response_time_ms
- request_size_bytes
- response_size_bytes
```

#### External System Integration
```sql
-- Third-party integrations
external_system_integrations
- integration_id (Primary Key)
- system_name (land_registry, ordnance_survey, defra_rpa, banking_apis)
- integration_type (real_time, batch, webhook)
- last_sync_timestamp
- sync_status
- error_log
- configuration_settings (JSON)
```

## Technical Implementation Notes

### Database Technology Stack
- **Primary Database**: PostgreSQL with PostGIS extension for spatial data
- **Caching Layer**: Redis for session management and frequently accessed data
- **Search Engine**: Elasticsearch for full-text search across plans and applications
- **Time Series Data**: InfluxDB for monitoring and sensor data
- **File Storage**: Amazon S3 or equivalent for document and image storage

### Scalability Considerations
- Horizontal partitioning of large tables by geographic region
- Read replicas for reporting and analytics workloads
- Asynchronous processing queues for earth observation analysis
- Microservices architecture for different functional domains

### Security and Compliance
- End-to-end encryption for sensitive financial data
- Audit trails for all data modifications
- GDPR compliance for personal data handling
- Integration with Government Digital Service authentication standards

### Performance Optimization
- Spatial indexing for all geometric data
- Materialized views for complex reporting queries
- Background processing for resource-intensive operations
- CDN for static content delivery

## Next Steps for Implementation

1. **Phase 1**: Core land parcel and baseline data management
2. **Phase 2**: Incentive mapping and plan development tools
3. **Phase 3**: Blended finance contract management
4. **Phase 4**: Mobile MRV and earth observation integration
5. **Phase 5**: Advanced analytics and reporting dashboard

This architecture provides the foundation for a comprehensive land use management system that can scale from Forestry Commission applications to become the backbone of UK environmental finance.