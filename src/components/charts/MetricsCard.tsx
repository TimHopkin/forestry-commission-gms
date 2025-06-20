import { LucideIcon } from 'lucide-react'
import { motion } from 'framer-motion'
import InfoTooltip from '../InfoTooltip'

interface MetricsCardProps {
  title: string
  value: string | number
  change?: string
  target?: number
  current?: number
  icon: LucideIcon
  color?: 'blue' | 'green' | 'yellow' | 'purple'
  suffix?: string
  trend?: 'up' | 'down' | 'neutral'
  info?: string
  infoTitle?: string
}

export default function MetricsCard({
  title,
  value,
  change,
  target,
  current,
  icon: Icon,
  color = 'blue',
  suffix,
  trend = 'neutral',
  info,
  infoTitle
}: MetricsCardProps) {
  const colorClasses = {
    blue: 'bg-blue-500 text-blue-600 bg-blue-50',
    green: 'bg-green-500 text-green-600 bg-green-50',
    yellow: 'bg-yellow-500 text-yellow-600 bg-yellow-50',
    purple: 'bg-purple-500 text-purple-600 bg-purple-50'
  }

  const progress = target && current ? (current / target) * 100 : 0

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative overflow-hidden rounded-xl bg-white p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100"
    >
      <div className="flex items-center">
        <div className={`rounded-lg p-3 ${colorClasses[color].split(' ')[0]}`}>
          <Icon className="h-6 w-6 text-white" />
        </div>
        <div className="ml-4 flex-1">
          <div className="flex items-center gap-2">
            <p className="text-sm font-medium text-gray-600 uppercase tracking-wide">{title}</p>
            {info && <InfoTooltip content={info} title={infoTitle} />}
          </div>
          <div className="flex items-baseline">
            <p className="text-2xl font-bold text-gray-900">
              {typeof value === 'number' ? value.toLocaleString() : value}
              {suffix && <span className="text-sm text-gray-500 ml-1">{suffix}</span>}
            </p>
            {change && (
              <span className={`ml-2 text-sm font-semibold ${
                trend === 'up' ? 'text-green-600' : trend === 'down' ? 'text-red-600' : 'text-gray-600'
              }`}>
                {change}
              </span>
            )}
          </div>
        </div>
      </div>

      {target && current && (
        <div className="mt-4">
          <div className="flex justify-between text-xs text-gray-600 mb-1">
            <span>Progress to Target</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <motion.div
              className={`h-2 rounded-full ${colorClasses[color].split(' ')[0]}`}
              initial={{ width: 0 }}
              animate={{ width: `${Math.min(progress, 100)}%` }}
              transition={{ duration: 1, delay: 0.5 }}
            />
          </div>
        </div>
      )}

      <div className={`absolute top-0 right-0 w-32 h-32 ${colorClasses[color].split(' ')[2]} opacity-10 rounded-full -translate-y-16 translate-x-16`} />
    </motion.div>
  )
}