import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { FormStep, FormField } from '@/types'
import { ChevronRight, ChevronLeft, Upload } from 'lucide-react'

interface DynamicFormProps {
  steps: FormStep[]
  onSubmit: (data: any) => void
  initialData?: any
}

export default function DynamicForm({ steps, onSubmit, initialData = {} }: DynamicFormProps) {
  const [currentStepIndex, setCurrentStepIndex] = useState(0)
  const [formData, setFormData] = useState(initialData)
  
  const { register, handleSubmit, watch, formState: { errors } } = useForm({
    defaultValues: formData
  })

  const currentStep = steps[currentStepIndex]
  const watchedValues = watch()

  const renderField = (field: FormField) => {
    // Check if field should be shown based on conditionals
    if (field.conditional) {
      const dependentValue = watchedValues[field.conditional.dependsOn]
      if (!field.conditional.values.includes(dependentValue)) {
        return null
      }
    }

    const fieldError = errors[field.id]?.message as string

    switch (field.type) {
      case 'text':
        return (
          <div key={field.id} className="mb-6">
            <label className="govuk-label" htmlFor={field.id}>
              {field.label}
              {field.required && <span className="text-govuk-red ml-1">*</span>}
            </label>
            {field.hint && <p className="govuk-hint">{field.hint}</p>}
            <input
              {...register(field.id, { required: field.required })}
              type="text"
              id={field.id}
              className={`govuk-input w-full ${fieldError ? 'border-govuk-red' : ''}`}
            />
            {fieldError && <p className="govuk-error-message">{fieldError}</p>}
          </div>
        )

      case 'number':
        return (
          <div key={field.id} className="mb-6">
            <label className="govuk-label" htmlFor={field.id}>
              {field.label}
              {field.required && <span className="text-govuk-red ml-1">*</span>}
            </label>
            {field.hint && <p className="govuk-hint">{field.hint}</p>}
            <input
              {...register(field.id, { 
                required: field.required,
                valueAsNumber: true 
              })}
              type="number"
              step="0.01"
              id={field.id}
              className={`govuk-input w-full ${fieldError ? 'border-govuk-red' : ''}`}
            />
            {fieldError && <p className="govuk-error-message">{fieldError}</p>}
          </div>
        )

      case 'select':
        return (
          <div key={field.id} className="mb-6">
            <label className="govuk-label" htmlFor={field.id}>
              {field.label}
              {field.required && <span className="text-govuk-red ml-1">*</span>}
            </label>
            {field.hint && <p className="govuk-hint">{field.hint}</p>}
            <select
              {...register(field.id, { required: field.required })}
              id={field.id}
              className={`govuk-input w-full ${fieldError ? 'border-govuk-red' : ''}`}
            >
              <option value="">Please select...</option>
              {field.options?.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            {fieldError && <p className="govuk-error-message">{fieldError}</p>}
          </div>
        )

      case 'radio':
        return (
          <div key={field.id} className="mb-6">
            <fieldset className="border-0">
              <legend className="govuk-label">
                {field.label}
                {field.required && <span className="text-govuk-red ml-1">*</span>}
              </legend>
              {field.hint && <p className="govuk-hint">{field.hint}</p>}
              <div className="space-y-3">
                {field.options?.map((option) => (
                  <div key={option.value} className="flex items-center">
                    <input
                      {...register(field.id, { required: field.required })}
                      type="radio"
                      id={`${field.id}-${option.value}`}
                      value={option.value}
                      className="mr-3"
                    />
                    <label htmlFor={`${field.id}-${option.value}`} className="text-gray-900">
                      {option.label}
                    </label>
                  </div>
                ))}
              </div>
              {fieldError && <p className="govuk-error-message">{fieldError}</p>}
            </fieldset>
          </div>
        )

      case 'file':
        return (
          <div key={field.id} className="mb-6">
            <label className="govuk-label" htmlFor={field.id}>
              {field.label}
              {field.required && <span className="text-govuk-red ml-1">*</span>}
            </label>
            {field.hint && <p className="govuk-hint">{field.hint}</p>}
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-govuk-blue transition-colors">
              <Upload className="mx-auto h-12 w-12 text-gray-400" />
              <div className="mt-4">
                <input
                  {...register(field.id, { required: field.required })}
                  type="file"
                  id={field.id}
                  className="hidden"
                  multiple
                />
                <label
                  htmlFor={field.id}
                  className="cursor-pointer bg-govuk-blue text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                  Choose files
                </label>
                <p className="mt-2 text-sm text-gray-500">
                  or drag and drop files here
                </p>
              </div>
            </div>
            {fieldError && <p className="govuk-error-message">{fieldError}</p>}
          </div>
        )

      default:
        return null
    }
  }

  const handleNext = (data: any) => {
    const updatedData = { ...formData, ...data }
    setFormData(updatedData)

    if (currentStepIndex < steps.length - 1) {
      setCurrentStepIndex(currentStepIndex + 1)
    } else {
      onSubmit(updatedData)
    }
  }

  const handlePrevious = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex(currentStepIndex - 1)
    }
  }

  return (
    <div className="max-w-2xl mx-auto">
      {/* Progress indicator */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm font-medium text-gray-500">
            Step {currentStepIndex + 1} of {steps.length}
          </span>
          <span className="text-sm text-gray-500">
            {Math.round(((currentStepIndex + 1) / steps.length) * 100)}% complete
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-govuk-blue h-2 rounded-full transition-all duration-300"
            style={{
              width: `${((currentStepIndex + 1) / steps.length) * 100}%`
            }}
          />
        </div>
      </div>

      {/* Step content */}
      <div className="bg-white rounded-lg shadow-sm border p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          {currentStep.title}
        </h2>
        <p className="text-gray-600 mb-8">
          {currentStep.description}
        </p>

        <form onSubmit={handleSubmit(handleNext)}>
          {currentStep.fields.map(renderField)}

          <div className="flex justify-between pt-6 border-t">
            <button
              type="button"
              onClick={handlePrevious}
              disabled={currentStepIndex === 0}
              className="flex items-center px-4 py-2 text-gray-700 border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="h-4 w-4 mr-2" />
              Previous
            </button>

            <button
              type="submit"
              className="flex items-center govuk-button"
            >
              {currentStepIndex === steps.length - 1 ? 'Submit Application' : 'Continue'}
              {currentStepIndex < steps.length - 1 && <ChevronRight className="h-4 w-4 ml-2" />}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}