import { useState } from 'react'
import { Calculator, Info } from 'lucide-react'

export default function PaymentCalculator() {
  const [formData, setFormData] = useState({
    landArea: '',
    woodlandType: '',
    inProtectedArea: '',
    additionalBenefits: '',
    lowSensitivity: ''
  })

  const [calculation, setCalculation] = useState<{
    standardCapital: number
    annualMaintenance: number
    additionalContributions: number
    lowSensitivityPayment: number
    natureRecoveryPremium: number
    total: number
  } | null>(null)

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const calculatePayments = () => {
    const area = parseFloat(formData.landArea) || 0
    
    if (area <= 0) {
      alert('Please enter a valid land area')
      return
    }

    // Standard capital costs (up to £10,200/ha)
    const standardCapital = area * 10200

    // Annual maintenance payments (£400/ha for 15 years)
    const annualMaintenance = area * 400 * 15

    // Low sensitivity land payment (£1,100/ha)
    const lowSensitivityPayment = formData.lowSensitivity === 'yes' ? area * 1100 : 0

    // Additional contributions based on benefits (up to £12,700/ha)
    let additionalContributions = 0
    if (formData.additionalBenefits && formData.additionalBenefits !== 'none') {
      // Example calculation - would be more complex in reality
      const benefitMultiplier = {
        'carbon': 0.3,
        'biodiversity': 0.4,
        'water': 0.25,
        'flood': 0.35,
        'access': 0.2,
        'multiple': 0.5
      }
      const multiplier = benefitMultiplier[formData.additionalBenefits as keyof typeof benefitMultiplier] || 0
      additionalContributions = area * 12700 * multiplier
    }

    // Nature Recovery premium (£3,300/ha)
    const natureRecoveryPremium = (formData.additionalBenefits === 'biodiversity' || 
                                  formData.additionalBenefits === 'multiple') ? area * 3300 : 0

    const total = standardCapital + annualMaintenance + additionalContributions + 
                  lowSensitivityPayment + natureRecoveryPremium

    setCalculation({
      standardCapital,
      annualMaintenance,
      additionalContributions,
      lowSensitivityPayment,
      natureRecoveryPremium,
      total
    })
  }

  const resetCalculator = () => {
    setFormData({
      landArea: '',
      woodlandType: '',
      inProtectedArea: '',
      additionalBenefits: '',
      lowSensitivity: ''
    })
    setCalculation(null)
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-4 flex items-center justify-center">
          <Calculator className="h-8 w-8 mr-3 text-govuk-blue" />
          EWCO Payment Calculator
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Calculate potential grant payments for your England Woodland Creation Offer application. 
          This calculator provides estimates based on the information you provide.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Input Form */}
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Project Details</h2>
          
          <div className="space-y-6">
            <div>
              <label className="govuk-label" htmlFor="landArea">
                Land area (hectares) *
              </label>
              <p className="govuk-hint">
                Minimum 1 hectare required for EWCO funding
              </p>
              <input
                type="number"
                id="landArea"
                step="0.1"
                min="1"
                value={formData.landArea}
                onChange={(e) => handleInputChange('landArea', e.target.value)}
                className="govuk-input w-full"
                placeholder="e.g. 15.5"
              />
            </div>

            <div>
              <label className="govuk-label" htmlFor="woodlandType">
                Woodland type *
              </label>
              <select
                id="woodlandType"
                value={formData.woodlandType}
                onChange={(e) => handleInputChange('woodlandType', e.target.value)}
                className="govuk-input w-full"
              >
                <option value="">Please select...</option>
                <option value="broadleaf">Broadleaf woodland (native species)</option>
                <option value="conifer">Conifer woodland</option>
                <option value="mixed">Mixed woodland</option>
                <option value="agroforestry">Agroforestry system</option>
              </select>
            </div>

            <div>
              <fieldset>
                <legend className="govuk-label">
                  Is the land in a protected environmental area?
                </legend>
                <p className="govuk-hint">
                  This affects eligibility for low sensitivity land payments
                </p>
                <div className="space-y-3 mt-3">
                  <div className="flex items-center">
                    <input
                      type="radio"
                      id="protected-yes"
                      name="inProtectedArea"
                      value="yes"
                      checked={formData.inProtectedArea === 'yes'}
                      onChange={(e) => handleInputChange('inProtectedArea', e.target.value)}
                      className="mr-3"
                    />
                    <label htmlFor="protected-yes" className="text-gray-900">Yes</label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="radio"
                      id="protected-no"
                      name="inProtectedArea"
                      value="no"
                      checked={formData.inProtectedArea === 'no'}
                      onChange={(e) => handleInputChange('inProtectedArea', e.target.value)}
                      className="mr-3"
                    />
                    <label htmlFor="protected-no" className="text-gray-900">No</label>
                  </div>
                </div>
              </fieldset>
            </div>

            <div>
              <fieldset>
                <legend className="govuk-label">
                  Low sensitivity land?
                </legend>
                <p className="govuk-hint">
                  Land with low environmental sensitivity may qualify for additional payments
                </p>
                <div className="space-y-3 mt-3">
                  <div className="flex items-center">
                    <input
                      type="radio"
                      id="lowsens-yes"
                      name="lowSensitivity"
                      value="yes"
                      checked={formData.lowSensitivity === 'yes'}
                      onChange={(e) => handleInputChange('lowSensitivity', e.target.value)}
                      className="mr-3"
                    />
                    <label htmlFor="lowsens-yes" className="text-gray-900">Yes</label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="radio"
                      id="lowsens-no"
                      name="lowSensitivity"
                      value="no"
                      checked={formData.lowSensitivity === 'no'}
                      onChange={(e) => handleInputChange('lowSensitivity', e.target.value)}
                      className="mr-3"
                    />
                    <label htmlFor="lowsens-no" className="text-gray-900">No</label>
                  </div>
                </div>
              </fieldset>
            </div>

            <div>
              <label className="govuk-label" htmlFor="additionalBenefits">
                Additional environmental benefits
              </label>
              <p className="govuk-hint">
                Additional benefits may qualify for extra payments
              </p>
              <select
                id="additionalBenefits"
                value={formData.additionalBenefits}
                onChange={(e) => handleInputChange('additionalBenefits', e.target.value)}
                className="govuk-input w-full"
              >
                <option value="">Please select...</option>
                <option value="carbon">Enhanced carbon sequestration</option>
                <option value="biodiversity">Biodiversity enhancement</option>
                <option value="water">Water quality improvement</option>
                <option value="flood">Flood risk reduction</option>
                <option value="access">Public access provision</option>
                <option value="multiple">Multiple benefits</option>
                <option value="none">No additional benefits</option>
              </select>
            </div>

            <div className="flex space-x-4">
              <button
                onClick={calculatePayments}
                className="govuk-button flex-1"
                disabled={!formData.landArea || !formData.woodlandType}
              >
                Calculate Payments
              </button>
              <button
                onClick={resetCalculator}
                className="govuk-button govuk-button--secondary px-6"
              >
                Reset
              </button>
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="space-y-6">
          {calculation ? (
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Payment Breakdown</h2>
              
              <div className="space-y-4">
                <div className="flex justify-between py-3 border-b border-gray-200">
                  <div>
                    <p className="font-medium text-gray-900">Standard Capital Grant</p>
                    <p className="text-sm text-gray-500">Up to £10,200 per hectare</p>
                  </div>
                  <p className="font-semibold text-gray-900">
                    £{calculation.standardCapital.toLocaleString()}
                  </p>
                </div>

                <div className="flex justify-between py-3 border-b border-gray-200">
                  <div>
                    <p className="font-medium text-gray-900">Annual Maintenance</p>
                    <p className="text-sm text-gray-500">£400/ha for 15 years</p>
                  </div>
                  <p className="font-semibold text-gray-900">
                    £{calculation.annualMaintenance.toLocaleString()}
                  </p>
                </div>

                {calculation.lowSensitivityPayment > 0 && (
                  <div className="flex justify-between py-3 border-b border-gray-200">
                    <div>
                      <p className="font-medium text-gray-900">Low Sensitivity Payment</p>
                      <p className="text-sm text-gray-500">£1,100 per hectare</p>
                    </div>
                    <p className="font-semibold text-gray-900">
                      £{calculation.lowSensitivityPayment.toLocaleString()}
                    </p>
                  </div>
                )}

                {calculation.additionalContributions > 0 && (
                  <div className="flex justify-between py-3 border-b border-gray-200">
                    <div>
                      <p className="font-medium text-gray-900">Additional Contributions</p>
                      <p className="text-sm text-gray-500">For environmental benefits</p>
                    </div>
                    <p className="font-semibold text-gray-900">
                      £{calculation.additionalContributions.toLocaleString()}
                    </p>
                  </div>
                )}

                {calculation.natureRecoveryPremium > 0 && (
                  <div className="flex justify-between py-3 border-b border-gray-200">
                    <div>
                      <p className="font-medium text-gray-900">Nature Recovery Premium</p>
                      <p className="text-sm text-gray-500">£3,300 per hectare</p>
                    </div>
                    <p className="font-semibold text-gray-900">
                      £{calculation.natureRecoveryPremium.toLocaleString()}
                    </p>
                  </div>
                )}

                <div className="bg-govuk-blue rounded-lg p-4 text-white">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-lg font-semibold">Total Grant Value</p>
                      <p className="text-blue-100 text-sm">
                        For {formData.landArea} hectares
                      </p>
                    </div>
                    <p className="text-2xl font-bold">
                      £{calculation.total.toLocaleString()}
                    </p>
                  </div>
                </div>

                <div className="bg-blue-50 rounded-lg p-4">
                  <div className="flex">
                    <Info className="h-5 w-5 text-govuk-blue mt-0.5 mr-3 flex-shrink-0" />
                    <div className="text-sm text-gray-700">
                      <p className="font-medium mb-2">Important Notes:</p>
                      <ul className="space-y-1 text-sm">
                        <li>• This is an estimate only - actual payments may vary</li>
                        <li>• Final amounts depend on application approval and site assessment</li>
                        <li>• Payments are made in stages over the contract period</li>
                        <li>• Additional conditions may apply</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-gray-50 rounded-lg p-8 text-center">
              <Calculator className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Ready to Calculate?
              </h3>
              <p className="text-gray-600">
                Fill in the project details on the left to see your potential grant payments.
              </p>
            </div>
          )}

          {/* Help Information */}
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Payment Information</h3>
            <div className="space-y-4 text-sm text-gray-700">
              <div>
                <h4 className="font-medium text-gray-900">Standard Capital Grant</h4>
                <p>Covers establishment costs including site preparation, tree purchase, planting, and protection.</p>
              </div>
              <div>
                <h4 className="font-medium text-gray-900">Annual Maintenance</h4>
                <p>Supports ongoing woodland management for 15 years after establishment.</p>
              </div>
              <div>
                <h4 className="font-medium text-gray-900">Additional Payments</h4>
                <p>Extra funding available for woodlands that deliver wider environmental and social benefits.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}