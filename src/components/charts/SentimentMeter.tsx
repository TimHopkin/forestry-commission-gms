import { motion } from 'framer-motion'
import { Smile, Meh, Frown } from 'lucide-react'
import InfoTooltip from '../InfoTooltip'

interface SentimentMeterProps {
  score: number // 0-100 scale
  totalResponses: number
  title: string
  info?: string
  infoTitle?: string
}

export default function SentimentMeter({ score, totalResponses, title, info, infoTitle }: SentimentMeterProps) {
  const getSentimentIcon = () => {
    if (score >= 70) return Smile
    if (score >= 40) return Meh
    return Frown
  }

  const getSentimentColor = () => {
    if (score >= 70) return 'text-green-500'
    if (score >= 40) return 'text-yellow-500'
    return 'text-red-500'
  }

  const getSentimentBg = () => {
    if (score >= 70) return 'bg-green-500'
    if (score >= 40) return 'bg-yellow-500'
    return 'bg-red-500'
  }

  const Icon = getSentimentIcon()

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-xl shadow-lg p-6 text-center"
    >
      <div className="flex items-center justify-center gap-2 mb-4">
        <h3 className="text-lg font-bold text-gray-900">{title}</h3>
        {info && <InfoTooltip content={info} title={infoTitle} />}
      </div>
      
      <div className="relative mb-4">
        <div className={`mx-auto w-16 h-16 rounded-full ${getSentimentBg()} bg-opacity-10 flex items-center justify-center mb-2`}>
          <Icon className={`w-8 h-8 ${getSentimentColor()}`} />
        </div>
        
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-3xl font-bold text-gray-900"
        >
          {score}%
        </motion.div>
        
        <div className="text-sm text-gray-600">
          Satisfaction Score
        </div>
      </div>

      {/* Score bar */}
      <div className="w-full bg-gray-200 rounded-full h-3 mb-4">
        <motion.div
          className={`h-3 rounded-full ${getSentimentBg()}`}
          initial={{ width: 0 }}
          animate={{ width: `${score}%` }}
          transition={{ duration: 1.5, delay: 0.5 }}
        />
      </div>

      <div className="text-xs text-gray-500">
        Based on {totalResponses.toLocaleString()} responses
      </div>

      {/* Sentiment breakdown */}
      <div className="mt-4 grid grid-cols-3 gap-2 text-xs">
        <div className="text-center">
          <Smile className="w-4 h-4 text-green-500 mx-auto mb-1" />
          <div className="text-green-600 font-semibold">
            {Math.round((score / 100) * 0.7 * 100)}%
          </div>
          <div className="text-gray-500">Happy</div>
        </div>
        <div className="text-center">
          <Meh className="w-4 h-4 text-yellow-500 mx-auto mb-1" />
          <div className="text-yellow-600 font-semibold">
            {Math.round((1 - score / 100) * 0.2 * 100)}%
          </div>
          <div className="text-gray-500">Neutral</div>
        </div>
        <div className="text-center">
          <Frown className="w-4 h-4 text-red-500 mx-auto mb-1" />
          <div className="text-red-600 font-semibold">
            {Math.round((1 - score / 100) * 0.1 * 100)}%
          </div>
          <div className="text-gray-500">Unhappy</div>
        </div>
      </div>
    </motion.div>
  )
}