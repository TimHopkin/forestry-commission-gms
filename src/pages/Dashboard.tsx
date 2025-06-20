import { Link } from 'react-router-dom'
import { FileText, TreePine, Droplets, PoundSterling, Target, Award, Heart } from 'lucide-react'
import InfoTooltip from '../components/InfoTooltip'
import MetricsCard from '../components/charts/MetricsCard'
import ProgressGauge from '../components/charts/ProgressGauge'
import AreaChart from '../components/charts/AreaChart'
import RegionalImpactMap from '../components/charts/RegionalImpactMap'
import SentimentMeter from '../components/charts/SentimentMeter'

export default function Dashboard() {
  // Mock data for engaging analytics
  const applicationData = [
    { name: 'Jan', value: 23, target: 25 },
    { name: 'Feb', value: 34, target: 30 },
    { name: 'Mar', value: 45, target: 35 },
    { name: 'Apr', value: 56, target: 40 },
    { name: 'May', value: 67, target: 45 },
    { name: 'Jun', value: 78, target: 50 }
  ]

  const hectareData = [
    { name: 'Jan', value: 234, target: 250 },
    { name: 'Feb', value: 567, target: 500 },
    { name: 'Mar', value: 890, target: 750 },
    { name: 'Apr', value: 1234, target: 1000 },
    { name: 'May', value: 1678, target: 1250 },
    { name: 'Jun', value: 2134, target: 1500 }
  ]

  const regionalData = [
    { region: 'North East', investment: 2400000, impact: 85, coordinates: [54.9, -1.6] as [number, number], hectares: 1240, jobs: 89, co2: 4200 },
    { region: 'North West', investment: 3200000, impact: 78, coordinates: [54.0, -2.7] as [number, number], hectares: 1680, jobs: 124, co2: 5800 },
    { region: 'Yorkshire', investment: 2800000, impact: 82, coordinates: [53.8, -1.5] as [number, number], hectares: 1450, jobs: 98, co2: 5100 },
    { region: 'East Midlands', investment: 1900000, impact: 76, coordinates: [52.8, -1.0] as [number, number], hectares: 980, jobs: 67, co2: 3400 },
    { region: 'West Midlands', investment: 2100000, impact: 80, coordinates: [52.5, -2.0] as [number, number], hectares: 1100, jobs: 78, co2: 3900 },
    { region: 'East England', investment: 1700000, impact: 74, coordinates: [52.2, 0.5] as [number, number], hectares: 890, jobs: 56, co2: 3100 },
    { region: 'London', investment: 800000, impact: 65, coordinates: [51.5, -0.1] as [number, number], hectares: 420, jobs: 34, co2: 1500 },
    { region: 'South East', investment: 1500000, impact: 72, coordinates: [51.3, -0.8] as [number, number], hectares: 780, jobs: 52, co2: 2700 },
    { region: 'South West', investment: 2600000, impact: 88, coordinates: [50.8, -3.5] as [number, number], hectares: 1350, jobs: 112, co2: 4700 }
  ]

  const recentApplications = [
    {
      id: 'EWCO-2024-001',
      applicant: 'John Smith',
      area: '15.5 ha',
      status: 'Under Review',
      submitted: '2024-01-15',
      type: 'Broadleaf'
    },
    {
      id: 'EWCO-2024-002',
      applicant: 'Green Valley Farms Ltd',
      area: '32.0 ha',
      status: 'Approved',
      submitted: '2024-01-12',
      type: 'Mixed'
    },
    {
      id: 'EWCO-2024-003',
      applicant: 'Sarah Johnson',
      area: '8.3 ha',
      status: 'Documents Required',
      submitted: '2024-01-10',
      type: 'Conifer'
    }
  ]

  return (
    <div className="space-y-8 pb-8">
      {/* Header */}
      <div className="md:flex md:items-center md:justify-between">
        <div className="min-w-0 flex-1">
          <h1 className="text-3xl font-bold text-gray-900">
            EWCO Grant Management Dashboard
          </h1>
          <p className="mt-2 text-gray-600">
            Real-time insights into England's woodland creation impact
          </p>
        </div>
      </div>

      {/* Key Performance Metrics */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <MetricsCard
          title="Applications Processed"
          value={2847}
          change="+12.5%"
          icon={FileText}
          color="blue"
          trend="up"
          current={2847}
          target={3000}
          info="Total number of EWCO applications processed from submission to final decision. Includes approved, rejected, and withdrawn applications. Target set at 3,000 applications per year. Processing time measured from complete application receipt to final decision."
          infoTitle="Application Processing Metrics"
        />
        <MetricsCard
          title="Hectares Funded"
          value={18250}
          change="+18.2%"
          icon={TreePine}
          color="green"
          trend="up"
          suffix="ha"
          info="Cumulative hectares of woodland creation funded through EWCO grants this financial year. Includes all approved applications where agreements have been signed. Contributes to government target of 30,000 hectares of woodland creation per year by 2025."
          infoTitle="Woodland Creation Area"
        />
        <MetricsCard
          title="Taxpayer ROI"
          value="4.2x"
          change="+0.3x"
          icon={PoundSterling}
          color="purple"
          trend="up"
          info="Return on Investment calculation: (Environmental Benefits + Social Benefits + Economic Benefits) ÷ Total Grant Investment. Environmental benefits include carbon sequestration value (£25/tonne CO₂), biodiversity net gain, flood prevention. Social benefits include health improvements, recreation value. Economic benefits include timber value, job creation, tourism revenue."
          infoTitle="Taxpayer Return on Investment"
        />
        <MetricsCard
          title="Waterways Protected"
          value={342}
          change="+28%"
          icon={Droplets}
          color="blue"
          trend="up"
          suffix="km"
          info="Linear kilometres of rivers, streams, and waterways protected through riparian woodland creation. Measured as length of waterway with woodland buffer zone within 50m. Provides flood risk mitigation, water quality improvement, and habitat connectivity. Calculated using GIS analysis of woodland polygons against Ordnance Survey waterway data."
          infoTitle="Waterway Protection Impact"
        />
      </div>

      {/* Progress Gauges - 30x30 and Budget */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <ProgressGauge
            value={18250}
            max={50000}
            title="30x30 Contribution"
            subtitle="Hectares towards 2030 target"
            color="green"
            size="md"
          />
        </div>
        <div className="bg-white rounded-xl shadow-lg p-6">
          <ProgressGauge
            value={47200000}
            max={75000000}
            title="EWCO Budget Used"
            subtitle="£47.2M of £75M allocated"
            color="blue"
            size="md"
          />
        </div>
        <div className="bg-white rounded-xl shadow-lg p-6">
          <ProgressGauge
            value={89}
            max={100}
            title="Processing Efficiency"
            subtitle="Applications within target time"
            color="yellow"
            size="md"
          />
        </div>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <AreaChart
          data={applicationData}
          title="Monthly Applications Processed"
          color="#3B82F6"
          height={280}
          info="Monthly trend showing applications processed from submission to final decision. Blue area shows actual processing numbers, dashed line shows monthly targets. Seasonal variations typically occur due to planting season cycles (autumn/winter peak). Processing includes full assessment, site visits, and decision-making workflow."
          infoTitle="Application Processing Trends"
        />
        <AreaChart
          data={hectareData}
          title="Cumulative Hectares Funded"
          color="#10B981"
          height={280}
          info="Cumulative woodland area approved for creation through EWCO grants. Green area shows actual hectares funded, dashed line shows cumulative targets. Rapid acceleration indicates successful scheme adoption. Includes all approved applications where grant agreements have been signed and landowner commitments secured."
          infoTitle="Woodland Creation Progress"
        />
      </div>

      {/* Impact Visualization Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <RegionalImpactMap
            title="Regional Investment Impact Across England"
            data={regionalData}
            info="Interactive map showing EWCO investment distribution and environmental impact across English regions. Circle size represents total investment amount, circle color indicates impact effectiveness (green=high impact 80%+, yellow=medium 70-79%, red=low <70%). Impact score calculated from biodiversity gain, carbon sequestration, job creation, and community benefit metrics. Click circles for detailed regional breakdown."
            infoTitle="Regional Impact Analysis"
          />
        </div>
        <div className="space-y-6">
          <SentimentMeter
            score={87}
            totalResponses={1456}
            title="Applicant Satisfaction"
            info="Real-time sentiment analysis based on post-application surveys and feedback forms. Score calculated from 5-star ratings on application process clarity, support responsiveness, decision timeframes, and overall experience. Automated sentiment analysis of free-text feedback combined with structured ratings. Updated daily with new responses."
            infoTitle="Applicant Experience Tracking"
          />
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center gap-2 mb-4">
              <h3 className="text-lg font-bold text-gray-900">Social Value Impact</h3>
              <InfoTooltip 
                content="Quantified social benefits from EWCO woodland creation investments. Communities served measured by population within 2km of new woodland. Jobs created includes direct forestry employment, supply chain, and ongoing maintenance roles. CO₂ sequestration calculated using Forestry Commission carbon look-up tables for different species and growth rates over 40-year timeframe."
                title="Social Value Calculation"
              />
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Heart className="w-5 h-5 text-red-500 mr-2" />
                  <span className="text-sm font-medium">Communities Served</span>
                </div>
                <span className="text-lg font-bold text-gray-900">234</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Award className="w-5 h-5 text-yellow-500 mr-2" />
                  <span className="text-sm font-medium">Jobs Created</span>
                </div>
                <span className="text-lg font-bold text-gray-900">892</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Target className="w-5 h-5 text-blue-500 mr-2" />
                  <span className="text-sm font-medium">CO₂ Sequestered</span>
                </div>
                <span className="text-lg font-bold text-gray-900">45.2k</span>
              </div>
              <div className="text-xs text-gray-500 pt-2">
                Tonnes per year projected over 40 years
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Applications Section */}
      <div className="grid grid-cols-1 gap-6">
        <div className="bg-white shadow-lg rounded-xl overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
            <h3 className="text-lg font-bold text-gray-900">Recent Applications</h3>
          </div>
          <div className="overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Application ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Applicant
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Area
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {recentApplications.map((application) => (
                  <tr key={application.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-govuk-blue">
                      <Link to={`/applications/${application.id}`}>
                        {application.id}
                      </Link>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {application.applicant}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {application.area}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {application.type}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        application.status === 'Approved' 
                          ? 'bg-green-100 text-green-800'
                          : application.status === 'Under Review'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {application.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="px-6 py-3 bg-gray-50">
            <Link 
              to="/applications" 
              className="text-sm font-medium text-govuk-blue hover:text-blue-700"
            >
              View all applications →
            </Link>
          </div>
        </div>

        {/* Achievement Badge */}
        <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-6 text-white">
          <div className="flex items-center mb-2">
            <Award className="h-6 w-6 mr-2" />
            <h3 className="text-lg font-bold">Achievement Unlocked!</h3>
          </div>
          <p className="text-green-100 text-sm mb-4">
            Reached 18,000+ hectares funded this year - exceeding targets by 22%!
          </p>
          <div className="text-xs text-green-200">
            Contributing significantly to Net Zero 2050 goals
          </div>
        </div>
      </div>
    </div>
  )
}