import { useEffect } from 'react'
import { MapContainer, TileLayer, Circle, Popup, useMap } from 'react-leaflet'
import L from 'leaflet'
import { motion } from 'framer-motion'
import InfoTooltip from '../InfoTooltip'
import 'leaflet/dist/leaflet.css'

interface RegionalData {
  region: string
  investment: number
  impact: number
  coordinates: [number, number]
  hectares?: number
  jobs?: number
  co2?: number
}

interface RegionalImpactMapProps {
  title: string
  data: RegionalData[]
  info?: string
  infoTitle?: string
}

// Component to fit map bounds to show all England
function MapBounds({ data }: { data: RegionalData[] }) {
  const map = useMap()
  
  useEffect(() => {
    // Set bounds to cover England
    const englandBounds = L.latLngBounds(
      [49.9, -6.2], // Southwest corner
      [55.8, 1.8]   // Northeast corner
    )
    map.fitBounds(englandBounds, { padding: [20, 20] })
  }, [data, map])
  
  return null
}

export default function RegionalImpactMap({ title, data, info, infoTitle }: RegionalImpactMapProps) {
  const maxInvestment = Math.max(...data.map(d => d.investment))
  
  // Regional coordinates mapping for England
  const regionCoordinates: { [key: string]: [number, number] } = {
    'North East': [54.9, -1.6],
    'North West': [54.0, -2.7],
    'Yorkshire': [53.8, -1.5],
    'East Midlands': [52.8, -1.0],
    'West Midlands': [52.5, -2.0],
    'East England': [52.2, 0.5],
    'London': [51.5, -0.1],
    'South East': [51.3, -0.8],
    'South West': [50.8, -3.5]
  }

  const getCircleOptions = (investment: number, impact: number) => {
    const intensity = investment / maxInvestment
    const radius = Math.max(15000, intensity * 80000) // Base radius 15km, max 80km
    
    return {
      radius,
      fillColor: impact >= 80 ? '#10B981' : impact >= 70 ? '#F59E0B' : '#EF4444',
      color: '#ffffff',
      weight: 2,
      opacity: 1,
      fillOpacity: 0.3 + (intensity * 0.4)
    }
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-GB', {
      style: 'currency',
      currency: 'GBP',
      notation: 'compact',
      maximumFractionDigits: 1
    }).format(amount)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
      className="bg-white rounded-xl shadow-lg p-6"
    >
      <div className="flex items-center gap-2 mb-4">
        <h3 className="text-lg font-bold text-gray-900">{title}</h3>
        {info && <InfoTooltip content={info} title={infoTitle} />}
      </div>
      
      <div className="relative h-96 rounded-lg overflow-hidden">
        <MapContainer
          center={[52.5, -1.5]} // Centre of England
          zoom={6}
          style={{ height: '100%', width: '100%' }}
          className="rounded-lg"
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          
          {data.map((region) => {
            const coordinates = regionCoordinates[region.region] || region.coordinates
            const circleOptions = getCircleOptions(region.investment, region.impact)
            
            return (
              <Circle
                key={region.region}
                center={coordinates}
                {...circleOptions}
              >
                <Popup className="regional-impact-popup">
                  <div className="min-w-[280px] p-2">
                    <div className="border-b border-gray-200 pb-2 mb-3">
                      <h3 className="text-lg font-semibold text-gray-900">
                        {region.region}
                      </h3>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="grid grid-cols-2 gap-3 text-sm">
                        <div>
                          <span className="font-medium text-gray-700">Investment:</span>
                          <br />
                          <span className="text-green-600 font-semibold">
                            {formatCurrency(region.investment)}
                          </span>
                        </div>
                        <div>
                          <span className="font-medium text-gray-700">Impact Score:</span>
                          <br />
                          <span className="font-semibold" style={{ 
                            color: region.impact >= 80 ? '#10B981' : region.impact >= 70 ? '#F59E0B' : '#EF4444' 
                          }}>
                            {region.impact}%
                          </span>
                        </div>
                        {region.hectares && (
                          <div>
                            <span className="font-medium text-gray-700">Hectares:</span>
                            <br />{region.hectares.toLocaleString()} ha
                          </div>
                        )}
                        {region.jobs && (
                          <div>
                            <span className="font-medium text-gray-700">Jobs Created:</span>
                            <br />{region.jobs.toLocaleString()}
                          </div>
                        )}
                        {region.co2 && (
                          <div className="col-span-2">
                            <span className="font-medium text-gray-700">CO₂ Sequestration:</span>
                            <br />{region.co2.toLocaleString()} tonnes/year
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </Popup>
              </Circle>
            )
          })}
          
          <MapBounds data={data} />
        </MapContainer>

        {/* Legend */}
        <div className="absolute bottom-4 right-4 bg-white p-3 rounded-lg shadow-md border text-xs">
          <div className="font-semibold text-gray-700 mb-2">Impact Level</div>
          <div className="space-y-1">
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
              <span>High (80%+)</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></div>
              <span>Medium (70-79%)</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
              <span>Low (&lt;70%)</span>
            </div>
          </div>
          <div className="mt-2 pt-2 border-t border-gray-200 text-gray-500">
            Circle size = Investment
          </div>
        </div>

        {/* Map Info */}
        <div className="absolute top-4 left-4 bg-white p-2 rounded-lg shadow-md border text-xs">
          <div className="font-semibold text-gray-700">EWCO Regional Impact</div>
          <div className="text-gray-500 mt-1">
            Total: {formatCurrency(data.reduce((sum, d) => sum + d.investment, 0))}
          </div>
        </div>
      </div>

      {/* Regional Summary */}
      <div className="mt-4 grid grid-cols-2 md:grid-cols-3 gap-3">
        {data.slice(0, 6).map((region) => (
          <div key={region.region} className="bg-gray-50 rounded-lg p-3">
            <div className="text-sm font-semibold text-gray-900">{region.region}</div>
            <div className="text-xs text-gray-600">
              {formatCurrency(region.investment)}
            </div>
            <div className="text-xs" style={{ 
              color: region.impact >= 80 ? '#10B981' : region.impact >= 70 ? '#F59E0B' : '#EF4444' 
            }}>
              {region.impact}% impact
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  )
}