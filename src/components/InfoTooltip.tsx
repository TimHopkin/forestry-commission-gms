import { Info } from 'lucide-react'
import { useState, useRef, useEffect } from 'react'
import { createPortal } from 'react-dom'

interface InfoTooltipProps {
  content: string
  title?: string
}

export default function InfoTooltip({ content, title }: InfoTooltipProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [tooltipStyle, setTooltipStyle] = useState<React.CSSProperties>({})
  const [arrowStyle, setArrowStyle] = useState<React.CSSProperties>({})
  const iconRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (isVisible && iconRef.current) {
      const iconRect = iconRef.current.getBoundingClientRect()
      const tooltipWidth = 320 // Fixed width for calculation
      const tooltipHeight = 120 // Estimated height
      const viewportWidth = window.innerWidth
      const viewportHeight = window.innerHeight
      const margin = 10

      let tooltipLeft = iconRect.right + margin
      let tooltipTop = iconRect.top + iconRect.height / 2 - tooltipHeight / 2
      let arrowLeft = -6
      let arrowTop = tooltipHeight / 2 - 6
      let arrowTransform = 'rotate(45deg)'
      let arrowBorder = 'border-r-0 border-b-0'

      // Check if tooltip fits on the right
      if (tooltipLeft + tooltipWidth > viewportWidth) {
        // Try left side
        tooltipLeft = iconRect.left - tooltipWidth - margin
        arrowLeft = tooltipWidth - 6
        arrowBorder = 'border-l-0 border-t-0'
        
        // If still doesn't fit, try top or bottom
        if (tooltipLeft < 0) {
          tooltipLeft = iconRect.left + iconRect.width / 2 - tooltipWidth / 2
          
          // Try above
          if (iconRect.top - tooltipHeight - margin > 0) {
            tooltipTop = iconRect.top - tooltipHeight - margin
            arrowLeft = tooltipWidth / 2 - 6
            arrowTop = tooltipHeight - 6
            arrowBorder = 'border-t-0 border-l-0'
          } else {
            // Default to below
            tooltipTop = iconRect.bottom + margin
            arrowLeft = tooltipWidth / 2 - 6
            arrowTop = -6
            arrowBorder = 'border-b-0 border-r-0'
          }
        }
      }

      // Ensure tooltip stays within viewport
      tooltipLeft = Math.max(margin, Math.min(tooltipLeft, viewportWidth - tooltipWidth - margin))
      tooltipTop = Math.max(margin, Math.min(tooltipTop, viewportHeight - tooltipHeight - margin))

      setTooltipStyle({
        position: 'fixed',
        left: tooltipLeft,
        top: tooltipTop,
        width: tooltipWidth,
        zIndex: 9999
      })

      setArrowStyle({
        position: 'absolute',
        left: arrowLeft,
        top: arrowTop,
        width: '12px',
        height: '12px',
        backgroundColor: 'white',
        border: '1px solid #e5e7eb',
        transform: arrowTransform,
        className: arrowBorder
      })
    }
  }, [isVisible])

  const tooltipContent = isVisible ? (
    <div
      style={tooltipStyle}
      className="p-3 bg-white border border-gray-200 rounded-lg shadow-xl"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      <div style={arrowStyle}></div>
      {title && (
        <div className="font-semibold text-gray-900 mb-1 text-sm">{title}</div>
      )}
      <div className="text-xs text-gray-600 leading-relaxed">{content}</div>
    </div>
  ) : null

  return (
    <div className="relative inline-block">
      <div
        ref={iconRef}
        className="cursor-help p-1 -m-1 rounded"
        onMouseEnter={() => setIsVisible(true)}
        onMouseLeave={() => setIsVisible(false)}
      >
        <Info className="w-4 h-4 text-gray-400 hover:text-gray-600 transition-colors" />
      </div>
      
      {tooltipContent && createPortal(tooltipContent, document.body)}
    </div>
  )
}