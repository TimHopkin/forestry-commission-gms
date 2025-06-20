import { motion } from 'framer-motion'

interface HeatMapProps {
  title: string
  data: Array<{
    region: string
    investment: number
    impact: number
    coordinates: [number, number]
  }>
}

export default function HeatMap({ title, data }: HeatMapProps) {
  const maxInvestment = Math.max(...data.map(d => d.investment))
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
      className="bg-white rounded-xl shadow-lg p-6"
    >
      <h3 className="text-lg font-bold text-gray-900 mb-4">{title}</h3>
      
      {/* Simplified England regions visualization */}
      <div className="relative bg-gray-50 rounded-lg p-4 h-80">
        <svg viewBox="0 0 400 500" className="w-full h-full">
          {/* Simplified England outline */}
          <path
            d="M50 50 L350 50 L370 100 L360 200 L350 300 L340 400 L320 450 L280 480 L200 490 L120 480 L80 450 L60 400 L40 300 L30 200 L40 100 Z"
            fill="#F3F4F6"
            stroke="#D1D5DB"
            strokeWidth="2"
          />
          
          {/* Heat map points */}
          {data.map((point, index) => {
            const intensity = point.investment / maxInvestment
            const radius = 8 + (intensity * 20)
            const opacity = 0.3 + (intensity * 0.7)
            
            return (
              <motion.circle
                key={point.region}
                cx={point.coordinates[0]}
                cy={point.coordinates[1]}
                r={radius}
                fill="#10B981"
                opacity={opacity}
                initial={{ r: 0, opacity: 0 }}
                animate={{ r: radius, opacity }}
                transition={{ duration: 1, delay: index * 0.1 }}
              >
                <title>{`${point.region}: £${point.investment.toLocaleString()}`}</title>
              </motion.circle>
            )
          })}
        </svg>
        
        {/* Legend */}
        <div className="absolute bottom-4 right-4 bg-white p-3 rounded-lg shadow-md">
          <div className="text-xs font-semibold text-gray-700 mb-2">Investment Level</div>
          <div className="flex items-center space-x-2">
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-green-500 opacity-30 mr-1"></div>
              <span className="text-xs text-gray-600">Low</span>
            </div>
            <div className="flex items-center">
              <div className="w-4 h-4 rounded-full bg-green-500 opacity-70 mr-1"></div>
              <span className="text-xs text-gray-600">High</span>
            </div>
          </div>
        </div>
      </div>

      {/* Regional breakdown */}
      <div className="mt-4 grid grid-cols-2 gap-4">
        {data.slice(0, 4).map((region) => (
          <div key={region.region} className="bg-gray-50 rounded-lg p-3">
            <div className="text-sm font-semibold text-gray-900">{region.region}</div>
            <div className="text-xs text-gray-600">
              £{region.investment.toLocaleString()} invested
            </div>
            <div className="text-xs text-green-600">
              {region.impact}% environmental impact
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  )
}