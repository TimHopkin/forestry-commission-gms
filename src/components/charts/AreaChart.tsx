import { AreaChart as RechartsAreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { motion } from 'framer-motion'
import InfoTooltip from '../InfoTooltip'

interface AreaChartProps {
  data: Array<{
    name: string
    value: number
    target?: number
  }>
  title: string
  color?: string
  height?: number
  info?: string
  infoTitle?: string
}

export default function AreaChart({ data, title, color = '#3B82F6', height = 300, info, infoTitle }: AreaChartProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-white rounded-xl shadow-lg p-6"
    >
      <div className="flex items-center gap-2 mb-4">
        <h3 className="text-lg font-bold text-gray-900">{title}</h3>
        {info && <InfoTooltip content={info} title={infoTitle} />}
      </div>
      <ResponsiveContainer width="100%" height={height}>
        <RechartsAreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={color} stopOpacity={0.3}/>
              <stop offset="95%" stopColor={color} stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
          <XAxis 
            dataKey="name" 
            tick={{ fontSize: 12, fill: '#6B7280' }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis 
            tick={{ fontSize: 12, fill: '#6B7280' }}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip 
            contentStyle={{
              backgroundColor: 'white',
              border: '1px solid #E5E7EB',
              borderRadius: '8px',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
            }}
          />
          <Area
            type="monotone"
            dataKey="value"
            stroke={color}
            strokeWidth={2}
            fill="url(#colorGradient)"
          />
          {data.some(d => d.target) && (
            <Area
              type="monotone"
              dataKey="target"
              stroke="#E5E7EB"
              strokeWidth={2}
              strokeDasharray="5 5"
              fill="none"
            />
          )}
        </RechartsAreaChart>
      </ResponsiveContainer>
    </motion.div>
  )
}