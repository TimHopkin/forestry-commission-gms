import { useEffect } from 'react'
import { MapContainer, TileLayer, GeoJSON, LayersControl, useMap } from 'react-leaflet'
import L from 'leaflet'
import { LandAppGeoJSON, LandAppFeature } from '@/data/landAppData'
import { MapPin } from 'lucide-react'

// Fix for default markers in react-leaflet
import 'leaflet/dist/leaflet.css'

let DefaultIcon = L.divIcon({
  html: `<div class="bg-govuk-blue w-3 h-3 rounded-full border-2 border-white shadow-lg"></div>`,
  iconSize: [12, 12],
  iconAnchor: [6, 6],
  className: ''
})

L.Marker.prototype.options.icon = DefaultIcon

interface LandAppMapProps {
  data: LandAppGeoJSON
  height?: string
  className?: string
}

// Component to fit map bounds to data
function MapBounds({ data }: { data: LandAppGeoJSON }) {
  const map = useMap()
  
  useEffect(() => {
    if (data.features.length > 0) {
      const group = new L.FeatureGroup()
      
      data.features.forEach(feature => {
        if (feature.geometry.type === 'Polygon') {
          const coords = feature.geometry.coordinates[0].map(([lng, lat]) => [lat, lng] as [number, number])
          L.polygon(coords).addTo(group)
        }
      })
      
      map.fitBounds(group.getBounds(), { padding: [20, 20] })
    }
  }, [data, map])
  
  return null
}

export default function LandAppMap({ data, height = '600px', className = '' }: LandAppMapProps) {
  const getSuitabilityColor = (suitability: string) => {
    switch (suitability) {
      case 'High': return '#00703c' // GOV.UK Green
      case 'Medium': return '#ffdd00' // GOV.UK Yellow
      case 'Low': return '#d4351c' // GOV.UK Red
      default: return '#626a6e' // GOV.UK Grey
    }
  }


  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-GB', {
      style: 'currency',
      currency: 'GBP',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount)
  }

  const onEachFeature = (feature: LandAppFeature, layer: L.Layer) => {
    // Style the feature
    if (layer instanceof L.Path) {
      layer.setStyle({
        fillColor: getSuitabilityColor(feature.properties.suitability),
        weight: 2,
        opacity: 1,
        color: '#1d70b8', // GOV.UK Blue border
        dashArray: '3',
        fillOpacity: 0.4
      })

      // Add hover effects
      layer.on({
        mouseover: (e) => {
          const layer = e.target
          layer.setStyle({
            weight: 3,
            fillOpacity: 0.6
          })
        },
        mouseout: (e) => {
          const layer = e.target
          layer.setStyle({
            weight: 2,
            fillOpacity: 0.4
          })
        }
      })
    }

    // Create detailed popup content
    const props = feature.properties
    const popupContent = `
      <div class="min-w-[320px] max-w-[400px]">
        <div class="border-b border-gray-200 pb-3 mb-3">
          <h3 class="text-lg font-semibold text-gray-900 flex items-center">
            <span class="w-3 h-3 rounded-full mr-2" style="background-color: ${getSuitabilityColor(props.suitability)}"></span>
            ${props.name}
          </h3>
          <p class="text-sm text-gray-600">Land App ID: ${props.land_app_id}</p>
        </div>
        
        <div class="space-y-3">
          <div class="grid grid-cols-2 gap-3 text-sm">
            <div>
              <span class="font-medium text-gray-700">Area:</span>
              <br>${props.area_hectares} hectares
            </div>
            <div>
              <span class="font-medium text-gray-700">Suitability:</span>
              <br><span class="font-medium" style="color: ${getSuitabilityColor(props.suitability)}">${props.suitability}</span>
            </div>
            <div>
              <span class="font-medium text-gray-700">Land Use:</span>
              <br>${props.land_use}
            </div>
            <div>
              <span class="font-medium text-gray-700">Soil Type:</span>
              <br>${props.soil_type}
            </div>
            <div>
              <span class="font-medium text-gray-700">Slope:</span>
              <br>${props.slope}
            </div>
            <div>
              <span class="font-medium text-gray-700">Access:</span>
              <br>${props.access}
            </div>
          </div>

          <div class="border-t border-gray-200 pt-3">
            <div class="grid grid-cols-2 gap-3 text-sm">
              <div>
                <span class="font-medium text-gray-700">Carbon Potential:</span>
                <br>${props.carbon_potential} tonnes CO₂
              </div>
              <div>
                <span class="font-medium text-gray-700">Biodiversity Score:</span>
                <br>${props.biodiversity_score}/100
              </div>
              <div>
                <span class="font-medium text-gray-700">Est. Cost/ha:</span>
                <br>${formatCurrency(props.estimated_cost_per_ha)}
              </div>
              <div>
                <span class="font-medium text-gray-700">Flood Risk:</span>
                <br>${props.flood_risk}
              </div>
            </div>
          </div>

          <div class="border-t border-gray-200 pt-3">
            <div class="flex items-center space-x-3 text-sm">
              <div class="flex items-center">
                ${props.ewco_eligible ? '<span class="text-green-600">✓</span>' : '<span class="text-red-600">✗</span>'}
                <span class="ml-1">EWCO Eligible</span>
              </div>
              <div class="flex items-center">
                ${props.fast_track_eligible ? '<span class="text-green-600">✓</span>' : '<span class="text-red-600">✗</span>'}
                <span class="ml-1">Fast Track</span>
              </div>
            </div>
          </div>

          ${props.constraints.length > 0 ? `
            <div class="border-t border-gray-200 pt-3">
              <span class="font-medium text-gray-700 text-sm">Constraints:</span>
              <ul class="mt-1 text-sm text-gray-600">
                ${props.constraints.map(constraint => `<li class="flex items-start"><span class="mr-1">•</span><span>${constraint}</span></li>`).join('')}
              </ul>
            </div>
          ` : ''}

          <div class="border-t border-gray-200 pt-3">
            <span class="font-medium text-gray-700 text-sm">Maintenance Requirements:</span>
            <p class="mt-1 text-sm text-gray-600">${props.maintenance_requirements}</p>
          </div>

          <div class="border-t border-gray-200 pt-3 text-xs text-gray-500">
            <div>Created: ${new Date(props.created_date).toLocaleDateString()}</div>
            <div>Updated: ${new Date(props.last_updated).toLocaleDateString()}</div>
          </div>
        </div>
      </div>
    `

    layer.bindPopup(popupContent, {
      maxWidth: 400,
      className: 'land-app-popup'
    })
  }

  return (
    <div className={`relative ${className}`} style={{ height }}>
      <MapContainer
        center={[50.7250, -2.3470]} // Center on Devon area
        zoom={14}
        style={{ height: '100%', width: '100%' }}
        className="rounded-lg overflow-hidden"
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

          <LayersControl.Overlay checked name="Land App Data">
            <GeoJSON 
              data={data as any} 
              onEachFeature={onEachFeature as any}
            />
          </LayersControl.Overlay>
        </LayersControl>

        <MapBounds data={data} />
      </MapContainer>

      {/* Legend */}
      <div className="absolute bottom-4 left-4 bg-white p-3 rounded-lg shadow-lg border text-sm max-w-48">
        <h4 className="font-semibold text-gray-900 mb-2">Suitability</h4>
        <div className="space-y-1">
          <div className="flex items-center">
            <div className="w-4 h-4 rounded mr-2" style={{ backgroundColor: '#00703c' }}></div>
            <span>High</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 rounded mr-2" style={{ backgroundColor: '#ffdd00' }}></div>
            <span>Medium</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 rounded mr-2" style={{ backgroundColor: '#d4351c' }}></div>
            <span>Low</span>
          </div>
        </div>
      </div>

      {/* Data Info */}
      <div className="absolute top-4 left-4 bg-white p-2 rounded-lg shadow-lg border">
        <div className="flex items-center text-sm text-gray-700">
          <MapPin className="h-4 w-4 mr-1" />
          <span className="font-medium">Land App Data</span>
        </div>
        <div className="text-xs text-gray-500 mt-1">
          {data.features.length} parcels • {data.features.reduce((sum, f) => sum + f.properties.area_hectares, 0).toFixed(1)} ha
        </div>
      </div>
    </div>
  )
}