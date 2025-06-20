import { motion } from 'framer-motion'

interface ProgressGaugeProps {
  value: number
  max: number
  title: string
  subtitle?: string
  color?: 'blue' | 'green' | 'yellow' | 'purple'
  size?: 'sm' | 'md' | 'lg'
}

export default function ProgressGauge({
  value,
  max,
  title,
  subtitle,
  color = 'blue',
  size = 'md'
}: ProgressGaugeProps) {
  const percentage = Math.min((value / max) * 100, 100)
  const strokeDasharray = 2 * Math.PI * 45 // circumference
  const strokeDashoffset = strokeDasharray - (strokeDasharray * percentage) / 100

  const colors = {
    blue: '#3B82F6',
    green: '#10B981',
    yellow: '#F59E0B',
    purple: '#8B5CF6'
  }

  const sizes = {
    sm: { width: 120, height: 120, strokeWidth: 8 },
    md: { width: 160, height: 160, strokeWidth: 10 },
    lg: { width: 200, height: 200, strokeWidth: 12 }
  }

  const currentSize = sizes[size]

  return (
    <div className="flex flex-col items-center p-4">
      <div className="relative">
        <svg
          width={currentSize.width}
          height={currentSize.height}
          viewBox={`0 0 ${currentSize.width} ${currentSize.height}`}
          className="transform -rotate-90"
        >
          {/* Background circle */}
          <circle
            cx={currentSize.width / 2}
            cy={currentSize.height / 2}
            r="45"
            stroke="#E5E7EB"
            strokeWidth={currentSize.strokeWidth}
            fill="transparent"
          />
          {/* Progress circle */}
          <motion.circle
            cx={currentSize.width / 2}
            cy={currentSize.height / 2}
            r="45"
            stroke={colors[color]}
            strokeWidth={currentSize.strokeWidth}
            fill="transparent"
            strokeLinecap="round"
            strokeDasharray={strokeDasharray}
            initial={{ strokeDashoffset: strokeDasharray }}
            animate={{ strokeDashoffset }}
            transition={{ duration: 2, ease: "easeInOut" }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900">
              {Math.round(percentage)}%
            </div>
            <div className="text-xs text-gray-500">
              {value.toLocaleString()}/{max.toLocaleString()}
            </div>
          </div>
        </div>
      </div>
      <div className="mt-2 text-center">
        <div className="font-semibold text-gray-900">{title}</div>
        {subtitle && <div className="text-sm text-gray-600">{subtitle}</div>}
      </div>
    </div>
  )
}