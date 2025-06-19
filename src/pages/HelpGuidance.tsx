import { useState } from 'react'
import { 
  Play, 
  Book, 
  MessageCircle, 
  Search, 
  ChevronDown, 
  ChevronRight,
  HelpCircle,
  Clock,
  Users,
  CheckCircle,
  MapPin,
  FileText,
  Calculator,
  Database,
  X,
  Send,
  Bot,
  User,
  Lightbulb,
  AlertCircle,
  Star
} from 'lucide-react'

interface TutorialVideo {
  id: string
  title: string
  duration: string
  description: string
  thumbnail: string
  category: string
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced'
}

interface AIMessage {
  id: string
  type: 'user' | 'assistant'
  content: string
  timestamp: Date
}

const tutorialVideos: TutorialVideo[] = [
  {
    id: 'getting-started',
    title: 'Getting Started with the Grant Management System',
    duration: '8:32',
    description: 'Complete overview of the system, navigation, and key features for new users.',
    thumbnail: '/api/placeholder/320/180',
    category: 'Getting Started',
    difficulty: 'Beginner'
  },
  {
    id: 'processing-applications',
    title: 'Processing Applications: From Submission to Decision',
    duration: '12:45',
    description: 'Step-by-step guide to reviewing applications, conducting assessments, and making decisions.',
    thumbnail: '/api/placeholder/320/180',
    category: 'Core Workflows',
    difficulty: 'Intermediate'
  },
  {
    id: 'land-app-integration',
    title: 'Understanding Land App Integration & Map Data',
    duration: '15:20',
    description: 'How to interpret Land App submissions, use the interactive mapping features, and validate geospatial data.',
    thumbnail: '/api/placeholder/320/180',
    category: 'Land App Integration',
    difficulty: 'Intermediate'
  },
  {
    id: 'payment-calculations',
    title: 'Grant Payment Calculations & Verification',
    duration: '10:15',
    description: 'Understanding payment structures, using the calculator tool, and verifying grant amounts.',
    thumbnail: '/api/placeholder/320/180',
    category: 'Financial Management',
    difficulty: 'Beginner'
  },
  {
    id: 'compliance-reporting',
    title: 'Compliance Reporting & Data Export',
    duration: '18:30',
    description: 'Advanced features for generating reports, exporting data to Defra and Treasury systems.',
    thumbnail: '/api/placeholder/320/180',
    category: 'Reporting & Compliance',
    difficulty: 'Advanced'
  },
  {
    id: 'troubleshooting',
    title: 'Common Issues & Troubleshooting',
    duration: '6:45',
    description: 'Solving common problems, error messages, and when to escalate technical issues.',
    thumbnail: '/api/placeholder/320/180',
    category: 'Support',
    difficulty: 'Beginner'
  }
]

const faqs = [
  {
    question: 'How do I prioritize applications for review?',
    answer: 'Applications are automatically prioritized based on fast-track eligibility, submission date, and grant value. Fast-track eligible applications appear at the top of your queue with a blue badge. You can also use filters to focus on specific criteria.'
  },
  {
    question: 'What should I do if Land App data seems incorrect?',
    answer: 'First, check the data quality assessment panel in the application detail view. If issues persist, use the "Request More Information" button to ask the applicant for clarification. For technical data issues, contact the Land App support team.'
  },
  {
    question: 'How are payment calculations verified?',
    answer: 'The system automatically calculates payments based on current rates and area measurements. Always cross-reference with the Payment Calculator tool and verify against the latest grant scheme guidelines. Any discrepancies should be flagged for manual review.'
  },
  {
    question: 'When should I schedule a site visit?',
    answer: 'Site visits are recommended for applications over £100,000, those in environmentally sensitive areas, or when remote assessment is insufficient. The system will suggest site visits based on application criteria.'
  },
  {
    question: 'How do I export data for Defra reporting?',
    answer: 'Use the System Overview page to access reporting tools. Monthly and quarterly reports can be generated automatically. For custom reports, use the advanced export features in the Applications list.'
  }
]

export default function HelpGuidance() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [expandedFaq, setExpandedFaq] = useState<string | null>(null)
  const [showAIAssistant, setShowAIAssistant] = useState(false)
  const [aiMessages, setAiMessages] = useState<AIMessage[]>([
    {
      id: '1',
      type: 'assistant',
      content: "👋 Hello! I'm your Grant Management System assistant. I can help you navigate the system, understand processes, and answer questions about applications. What would you like help with today?",
      timestamp: new Date()
    }
  ])
  const [aiInput, setAiInput] = useState('')

  const categories = ['all', ...new Set(tutorialVideos.map(video => video.category))]
  const filteredVideos = selectedCategory === 'all' 
    ? tutorialVideos 
    : tutorialVideos.filter(video => video.category === selectedCategory)

  const handleAISubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!aiInput.trim()) return

    const userMessage: AIMessage = {
      id: Date.now().toString(),
      type: 'user',
      content: aiInput,
      timestamp: new Date()
    }

    // Mock AI response based on user input
    let aiResponse = "I understand you're asking about that. Let me help you with some specific guidance..."
    
    if (aiInput.toLowerCase().includes('application')) {
      aiResponse = `📋 For application processing:
      
1. **Review Applications**: Go to Applications → Select application → Review all sections
2. **Check Land App Data**: Look for the "Land App Map Review" panel for geospatial validation
3. **Verify Calculations**: Use the Payment Calculator to double-check grant amounts
4. **Make Decision**: Use the action buttons on the right sidebar

Would you like me to walk you through any specific part of this process?`
    } else if (aiInput.toLowerCase().includes('map') || aiInput.toLowerCase().includes('land app')) {
      aiResponse = `🗺️ For Land App mapping features:

1. **View Map Data**: Open any application → Scroll to "Land App Map Review" section
2. **Interactive Features**: Click on colored parcels to see detailed information
3. **Data Quality**: Check the "Data Quality Assessment" panel for validation status
4. **Recommendations**: Review Land App's automated recommendations

The map shows suitability levels: Green (High), Yellow (Medium), Red (Low). Need help with a specific map feature?`
    } else if (aiInput.toLowerCase().includes('payment') || aiInput.toLowerCase().includes('calculator')) {
      aiResponse = `💰 For payment calculations:

1. **Payment Calculator**: Use the main calculator tool for estimates
2. **Verify Amounts**: Check application details against calculator results
3. **Grant Types**: Standard Capital, Maintenance, Additional Contributions, etc.
4. **Rates**: Current rates are automatically applied

The calculator helps verify Land App calculations. Any specific payment questions?`
    }

    const assistantMessage: AIMessage = {
      id: (Date.now() + 1).toString(),
      type: 'assistant',
      content: aiResponse,
      timestamp: new Date()
    }

    setAiMessages(prev => [...prev, userMessage, assistantMessage])
    setAiInput('')
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-green-100 text-green-800'
      case 'Intermediate': return 'bg-yellow-100 text-yellow-800'
      case 'Advanced': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Help & Guidance</h1>
          <p className="text-gray-600">Training resources and support for the Grant Management System</p>
        </div>
        
        {/* AI Assistant Toggle */}
        <button
          onClick={() => setShowAIAssistant(true)}
          className="flex items-center space-x-2 px-4 py-2 bg-govuk-blue text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Bot className="h-5 w-5" />
          <span>AI Assistant</span>
        </button>
      </div>

      {/* Quick Help Tips */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <Lightbulb className="h-5 w-5 text-govuk-blue mt-0.5" />
          <div>
            <h3 className="font-medium text-gray-900">Quick Tips</h3>
            <div className="mt-2 text-sm text-gray-700 space-y-1">
              <p>• Use <kbd className="px-2 py-1 bg-gray-200 rounded text-xs">Ctrl+/</kbd> to quickly search applications</p>
              <p>• Fast-track applications are highlighted with blue badges for priority processing</p>
              <p>• Click the 👁️ eye icon on applications to preview without opening the full detail page</p>
              <p>• Use the Map View to see geographic distribution of applications across regions</p>
            </div>
          </div>
        </div>
      </div>

      {/* Video Tutorials Section */}
      <div className="bg-white rounded-lg shadow border">
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-medium text-gray-900 flex items-center">
              <Play className="h-5 w-5 mr-2" />
              Video Tutorials
            </h2>
            
            {/* Category Filter */}
            <select 
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="govuk-input text-sm"
            >
              {categories.map(category => (
                <option key={category} value={category}>
                  {category === 'all' ? 'All Categories' : category}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredVideos.map(video => (
              <div key={video.id} className="group cursor-pointer">
                <div className="relative bg-gray-100 rounded-lg overflow-hidden mb-3">
                  {/* Mock Video Thumbnail */}
                  <div className="aspect-video bg-gradient-to-br from-govuk-blue to-blue-600 flex items-center justify-center">
                    <div className="text-center text-white">
                      <Play className="h-12 w-12 mx-auto mb-2 opacity-80" />
                      <p className="text-sm font-medium">Video Tutorial</p>
                      <p className="text-xs opacity-75">{video.duration}</p>
                    </div>
                  </div>
                  
                  {/* Difficulty Badge */}
                  <div className="absolute top-2 left-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(video.difficulty)}`}>
                      {video.difficulty}
                    </span>
                  </div>
                  
                  {/* Duration */}
                  <div className="absolute bottom-2 right-2 bg-black bg-opacity-75 text-white px-2 py-1 rounded text-xs">
                    {video.duration}
                  </div>
                </div>
                
                <div>
                  <h3 className="font-medium text-gray-900 group-hover:text-govuk-blue transition-colors">
                    {video.title}
                  </h3>
                  <p className="text-sm text-gray-600 mt-1">{video.description}</p>
                  <div className="flex items-center mt-2 text-xs text-gray-500">
                    <span className="bg-gray-100 px-2 py-1 rounded">{video.category}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Step-by-Step Guides */}
      <div className="bg-white rounded-lg shadow border">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-medium text-gray-900 flex items-center">
            <Book className="h-5 w-5 mr-2" />
            Step-by-Step Guides
          </h2>
        </div>
        
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Application Processing Guide */}
            <div className="border border-gray-200 rounded-lg p-4">
              <h3 className="font-medium text-gray-900 mb-3 flex items-center">
                <FileText className="h-5 w-5 mr-2 text-govuk-blue" />
                Processing Applications
              </h3>
              <ol className="space-y-2 text-sm">
                <li className="flex items-start">
                  <span className="flex-shrink-0 w-6 h-6 bg-govuk-blue text-white rounded-full text-xs flex items-center justify-center mr-3 mt-0.5">1</span>
                  <span>Navigate to Applications list and select an application</span>
                </li>
                <li className="flex items-start">
                  <span className="flex-shrink-0 w-6 h-6 bg-govuk-blue text-white rounded-full text-xs flex items-center justify-center mr-3 mt-0.5">2</span>
                  <span>Review applicant details, land information, and environmental assessments</span>
                </li>
                <li className="flex items-start">
                  <span className="flex-shrink-0 w-6 h-6 bg-govuk-blue text-white rounded-full text-xs flex items-center justify-center mr-3 mt-0.5">3</span>
                  <span>Examine Land App Map Review section for geospatial validation</span>
                </li>
                <li className="flex items-start">
                  <span className="flex-shrink-0 w-6 h-6 bg-govuk-blue text-white rounded-full text-xs flex items-center justify-center mr-3 mt-0.5">4</span>
                  <span>Verify payment calculations using the integrated calculator</span>
                </li>
                <li className="flex items-start">
                  <span className="flex-shrink-0 w-6 h-6 bg-govuk-blue text-white rounded-full text-xs flex items-center justify-center mr-3 mt-0.5">5</span>
                  <span>Make decision using action buttons: Approve, Request Info, or Schedule Visit</span>
                </li>
              </ol>
            </div>

            {/* Land App Integration Guide */}
            <div className="border border-gray-200 rounded-lg p-4">
              <h3 className="font-medium text-gray-900 mb-3 flex items-center">
                <MapPin className="h-5 w-5 mr-2 text-green-600" />
                Using Land App Data
              </h3>
              <ol className="space-y-2 text-sm">
                <li className="flex items-start">
                  <span className="flex-shrink-0 w-6 h-6 bg-green-600 text-white rounded-full text-xs flex items-center justify-center mr-3 mt-0.5">1</span>
                  <span>Locate "Land App Map Review" panel in application details</span>
                </li>
                <li className="flex items-start">
                  <span className="flex-shrink-0 w-6 h-6 bg-green-600 text-white rounded-full text-xs flex items-center justify-center mr-3 mt-0.5">2</span>
                  <span>Review Land App integration data summary for key metrics</span>
                </li>
                <li className="flex items-start">
                  <span className="flex-shrink-0 w-6 h-6 bg-green-600 text-white rounded-full text-xs flex items-center justify-center mr-3 mt-0.5">3</span>
                  <span>Click on map parcels to view detailed suitability information</span>
                </li>
                <li className="flex items-start">
                  <span className="flex-shrink-0 w-6 h-6 bg-green-600 text-white rounded-full text-xs flex items-center justify-center mr-3 mt-0.5">4</span>
                  <span>Check recommendations and data quality assessment panels</span>
                </li>
                <li className="flex items-start">
                  <span className="flex-shrink-0 w-6 h-6 bg-green-600 text-white rounded-full text-xs flex items-center justify-center mr-3 mt-0.5">5</span>
                  <span>Verify constraints and environmental considerations</span>
                </li>
              </ol>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="bg-white rounded-lg shadow border">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-medium text-gray-900 flex items-center">
            <HelpCircle className="h-5 w-5 mr-2" />
            Frequently Asked Questions
          </h2>
        </div>
        
        <div className="p-6">
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="border border-gray-200 rounded-lg">
                <button
                  onClick={() => setExpandedFaq(expandedFaq === faq.question ? null : faq.question)}
                  className="w-full px-4 py-3 text-left flex items-center justify-between hover:bg-gray-50"
                >
                  <span className="font-medium text-gray-900">{faq.question}</span>
                  {expandedFaq === faq.question ? (
                    <ChevronDown className="h-5 w-5 text-gray-500" />
                  ) : (
                    <ChevronRight className="h-5 w-5 text-gray-500" />
                  )}
                </button>
                {expandedFaq === faq.question && (
                  <div className="px-4 pb-3 text-sm text-gray-700 border-t border-gray-200 pt-3">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* AI Assistant Modal */}
      {showAIAssistant && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl h-[600px] flex flex-col">
            {/* AI Assistant Header */}
            <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-govuk-blue rounded-full flex items-center justify-center">
                  <Bot className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">GMS AI Assistant</h3>
                  <p className="text-sm text-gray-500">Always here to help with the Grant Management System</p>
                </div>
              </div>
              <button
                onClick={() => setShowAIAssistant(false)}
                className="p-1 rounded-full hover:bg-gray-100"
              >
                <X className="h-5 w-5 text-gray-500" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {aiMessages.map(message => (
                <div key={message.id} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`flex items-start space-x-2 max-w-[80%] ${message.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${message.type === 'user' ? 'bg-gray-300' : 'bg-govuk-blue'}`}>
                      {message.type === 'user' ? (
                        <User className="h-4 w-4 text-gray-600" />
                      ) : (
                        <Bot className="h-4 w-4 text-white" />
                      )}
                    </div>
                    <div className={`rounded-lg px-4 py-2 ${message.type === 'user' ? 'bg-gray-100 text-gray-900' : 'bg-govuk-blue text-white'}`}>
                      <p className="text-sm whitespace-pre-line">{message.content}</p>
                      <p className={`text-xs mt-1 ${message.type === 'user' ? 'text-gray-500' : 'text-blue-100'}`}>
                        {message.timestamp.toLocaleTimeString()}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Input */}
            <div className="px-6 py-4 border-t border-gray-200">
              <form onSubmit={handleAISubmit} className="flex space-x-2">
                <input
                  type="text"
                  value={aiInput}
                  onChange={(e) => setAiInput(e.target.value)}
                  placeholder="Ask me anything about the Grant Management System..."
                  className="flex-1 govuk-input"
                />
                <button
                  type="submit"
                  disabled={!aiInput.trim()}
                  className="px-4 py-2 bg-govuk-blue text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send className="h-4 w-4" />
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}