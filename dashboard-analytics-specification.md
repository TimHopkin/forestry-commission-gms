# Dashboard Analytics Specification
## Real-Time Tracking Metrics for Forestry Commission Grant Management System

### 1. Application Processing Metrics

#### Applications Processed Over Time
- **Chart Type**: Line chart with trend analysis
- **Timeframes**: Daily, Weekly, Monthly, Quarterly, Annual
- **Metrics**:
  - Total applications received
  - Applications approved/rejected
  - Average processing time
  - Applications in each stage of review
- **Filters**: By scheme type, region, application size

#### Application Pipeline Status
- **Chart Type**: Funnel chart
- **Stages**: Submitted → Under Review → Site Visit → Approved → Funded → Completed
- **Real-time updates**: Show bottlenecks and processing efficiency

### 2. Environmental Impact Tracking

#### Hectares Funded Dashboard
- **Chart Type**: Cumulative area chart + regional breakdown
- **Metrics**:
  - Total hectares funded (cumulative)
  - Hectares by woodland type (broadleaf, coniferous, mixed)
  - Hectares by scheme (EWCO, countryside stewardship, etc.)
  - Regional distribution map
- **Target tracking**: Progress towards national woodland targets

#### 30x30 Biodiversity Contribution
- **Chart Type**: Progress bar with map overlay
- **Metrics**:
  - Percentage contribution to 30% land protection target by 2030
  - EWCO-specific biodiversity improvements
  - Species habitat creation (hectares)
  - Connectivity corridors established
- **Visual**: Heat map showing biodiversity hotspots created

### 3. Financial Performance & ROI

#### Taxpayer Return on Investment
- **Chart Type**: Multi-layered dashboard with KPI cards
- **Metrics**:
  - Carbon sequestration value (£/tonne CO2)
  - Flood risk reduction savings
  - Air quality improvements (£ health benefits)
  - Biodiversity net gain value
  - Recreation and tourism revenue generated
- **ROI Formula**: (Environmental + Social + Economic Benefits) / Investment
- **Benchmark**: Compare against other green infrastructure investments

#### Budget Utilisation Tracker
- **Chart Type**: Gauge chart with spending velocity
- **EWCO Budget Metrics**:
  - Total budget allocated
  - Amount committed
  - Amount spent
  - Remaining budget
  - Forecast spend rate
  - Budget utilisation by region/scheme
- **Alerts**: Underspend/overspend warnings

### 4. Water and Environmental Protection

#### Waterway Protection Impact
- **Chart Type**: Geographic heat map with water network overlay
- **Metrics**:
  - Linear metres of waterway protected
  - Buffer zone areas established (hectares)
  - Estimated pollution reduction (kg/year)
  - Flood risk mitigation (properties protected)
- **Visual**: River network with protection zones highlighted

#### Riparian Woodland Coverage
- **Chart Type**: Before/after comparison maps
- **Metrics**:
  - Percentage of priority waterways with woodland buffer
  - Average buffer width achieved
  - Water quality improvement indicators

### 5. Social Value & Community Impact

#### Value for Society Around Settlements
- **Chart Type**: Concentric circle analysis around population centres
- **Metrics**:
  - Accessible woodland within 500m/2km/5km of settlements
  - Population served by new green infrastructure
  - Air quality improvement by settlement
  - Mental health and wellbeing proxy metrics
- **Social value calculation**: £ per person benefit

#### Community Engagement Metrics
- **Chart Type**: Engagement funnel and satisfaction scores
- **Metrics**:
  - Public consultation participation rates
  - Community volunteer hours generated
  - Educational visits to funded sites
  - Local employment created (FTE jobs)

### 6. Applicant Experience & Feedback

#### Live Sentiment Analysis
- **Chart Type**: Real-time sentiment gauge + word cloud
- **Data Sources**:
  - Post-application surveys (1-5 star rating)
  - Processing experience feedback
  - Support service ratings
  - Net Promoter Score (NPS)
- **Metrics**:
  - Average satisfaction rating
  - Response time satisfaction
  - Process clarity rating
  - Support quality rating

#### Application Journey Analytics
- **Chart Type**: Sankey diagram showing user paths
- **Metrics**:
  - Drop-off rates at each stage
  - Time spent on each application section
  - Common help requests
  - Success rates by application type

### 7. Geospatial Impact Visualisation

#### England Benefit Heat Map
- **Chart Type**: Interactive choropleth map
- **Layers**:
  - EWCO investment density
  - Environmental benefit intensity
  - Carbon sequestration hotspots
  - Biodiversity improvement zones
  - Community access improvements
- **Interactivity**: Click regions for detailed breakdowns

#### Priority Area Coverage
- **Chart Type**: Progress overlay on national priority maps
- **Metrics**:
  - Nature Recovery Network coverage
  - Priority habitat restoration
  - Climate adaptation zone coverage
  - Areas of Outstanding Natural Beauty enhancement

### 8. Performance Benchmarking

#### Scheme Comparison Dashboard
- **Chart Type**: Radar chart comparing scheme performance
- **Metrics**:
  - Cost per hectare
  - Environmental impact per £
  - Processing efficiency
  - Applicant satisfaction
  - Long-term success rates

#### Regional Performance League Table
- **Chart Type**: Sortable table with trend arrows
- **Metrics**:
  - Applications processed per region
  - Success rates
  - Average grant size
  - Environmental impact per region
  - Budget utilisation rates

### 9. Predictive Analytics

#### Demand Forecasting
- **Chart Type**: Predictive line chart with confidence intervals
- **Metrics**:
  - Projected application volumes
  - Budget requirement forecasts
  - Seasonal demand patterns
  - Capacity planning recommendations

#### Impact Projection Models
- **Chart Type**: Scenario comparison charts
- **Metrics**:
  - Projected carbon sequestration (2030/2050)
  - Biodiversity target achievement timeline
  - Water quality improvement trajectories
  - Economic benefit accumulation

### Technical Implementation Notes

- **Real-time updates**: WebSocket connections for live data
- **Data sources**: Application database, GIS systems, financial systems, survey platforms
- **Export capabilities**: PDF reports, Excel downloads, API access
- **Mobile responsiveness**: All charts optimised for mobile viewing
- **Accessibility**: WCAG 2.1 AA compliance for all visualisations
- **Performance**: Lazy loading for complex geographic visualisations

### Dashboard Refresh Rates

- **Financial metrics**: Every 15 minutes
- **Application status**: Real-time
- **Environmental metrics**: Daily
- **Sentiment feedback**: Every 5 minutes
- **Geospatial data**: Weekly (or when new grants approved)