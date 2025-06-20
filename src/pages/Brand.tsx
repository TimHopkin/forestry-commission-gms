import React, { useState } from 'react';
import { Palette, Type, Download, Copy, Check, Eye, Globe, FileText, Trees } from 'lucide-react';
import LinkPreview from '../components/LinkPreview';

const Brand: React.FC = () => {
  const [copiedColor, setCopiedColor] = useState<string | null>(null);
  const [activeSection, setActiveSection] = useState<'colors' | 'typography' | 'logos' | 'language' | 'previews'>('colors');

  const copyToClipboard = async (text: string, id: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedColor(id);
      setTimeout(() => setCopiedColor(null), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const brandColors = [
    { name: 'Forestry Blue', hex: '#1e40af', rgb: '30, 64, 175', usage: 'Primary brand color, headers, navigation' },
    { name: 'Forestry Blue Dark', hex: '#1e3a8a', rgb: '30, 58, 138', usage: 'Hover states, active elements' },
    { name: 'Forest Green', hex: '#16a34a', rgb: '22, 163, 74', usage: 'Success states, environmental data' },
    { name: 'Forest Green Dark', hex: '#15803d', rgb: '21, 128, 61', usage: 'Hover states for green elements' },
    { name: 'Government Black', hex: '#0b0c0c', rgb: '11, 12, 12', usage: 'GOV.UK header, official text' },
    { name: 'Text Gray', hex: '#374151', rgb: '55, 65, 81', usage: 'Body text, secondary content' },
    { name: 'Light Gray', hex: '#f3f4f6', rgb: '243, 244, 246', usage: 'Backgrounds, subtle sections' },
    { name: 'Border Gray', hex: '#e5e7eb', rgb: '229, 231, 235', usage: 'Borders, dividers' },
  ];

  const typography = [
    { name: 'Headings', font: 'Inter', weight: '600-700', usage: 'Page titles, section headers' },
    { name: 'Body Text', font: 'Inter', weight: '400', usage: 'Paragraphs, descriptions' },
    { name: 'UI Elements', font: 'Inter', weight: '500', usage: 'Buttons, navigation, labels' },
    { name: 'Monospace', font: 'ui-monospace', weight: '400', usage: 'Code, technical data' },
  ];

  const languageRules = [
    { category: 'Style', rule: 'British English throughout', example: 'colour (not color), realise (not realize)' },
    { category: 'Currency', rule: 'Pounds Sterling format', example: '£1,234.56 (not $1,234.56)' },
    { category: 'Tone', rule: 'Professional, authoritative', example: 'Clear, direct government communication' },
    { category: 'Terminology', rule: 'Forestry-specific language', example: 'EWCO, Land App, woodland creation' },
    { category: 'Compliance', rule: 'GDPR and accessibility', example: 'Data protection by design' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-green-600 rounded-2xl flex items-center justify-center">
              <Trees className="w-8 h-8 text-white" />
            </div>
            <div className="text-left">
              <h1 className="text-4xl font-bold text-gray-900">Brand Guidelines</h1>
              <p className="text-lg text-gray-600">Forestry Commission GMS</p>
            </div>
          </div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Comprehensive brand standards for the Digital Land Solutions Grant Management System, 
            ensuring consistent professional presentation across all government digital services.
          </p>
        </div>

        {/* Navigation */}
        <div className="flex justify-center mb-12">
          <div className="bg-white rounded-xl p-2 shadow-sm border border-gray-200 flex flex-wrap gap-2">
            {[
              { id: 'colors', label: 'Colours', icon: Palette },
              { id: 'typography', label: 'Typography', icon: Type },
              { id: 'logos', label: 'Logos', icon: Eye },
              { id: 'language', label: 'Language', icon: Globe },
              { id: 'previews', label: 'Link Previews', icon: FileText },
            ].map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setActiveSection(id as any)}
                className={`px-6 py-3 rounded-lg font-medium transition-colors flex items-center gap-2 ${
                  activeSection === id
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                <Icon className="w-4 h-4" />
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Content Sections */}
        {activeSection === 'colors' && (
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center gap-3">
              <Palette className="w-6 h-6 text-blue-600" />
              Brand Colours
            </h2>
            <p className="text-gray-600 mb-8">
              Our colour palette reflects the natural environment and professional government standards. 
              All colours meet WCAG accessibility guidelines for contrast.
            </p>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {brandColors.map((color, index) => (
                <div key={index} className="group">
                  <div 
                    className="w-full h-24 rounded-lg shadow-sm mb-4 border border-gray-200"
                    style={{ backgroundColor: color.hex }}
                  ></div>
                  <div className="space-y-2">
                    <h3 className="font-semibold text-gray-900">{color.name}</h3>
                    <div className="flex items-center gap-2">
                      <code className="text-sm bg-gray-100 px-2 py-1 rounded font-mono">{color.hex}</code>
                      <button
                        onClick={() => copyToClipboard(color.hex, color.hex)}
                        className="p-1 hover:bg-gray-100 rounded"
                      >
                        {copiedColor === color.hex ? (
                          <Check className="w-4 h-4 text-green-600" />
                        ) : (
                          <Copy className="w-4 h-4 text-gray-400" />
                        )}
                      </button>
                    </div>
                    <p className="text-xs text-gray-500">RGB: {color.rgb}</p>
                    <p className="text-sm text-gray-600">{color.usage}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeSection === 'typography' && (
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center gap-3">
              <Type className="w-6 h-6 text-blue-600" />
              Typography
            </h2>
            <p className="text-gray-600 mb-8">
              Inter is our primary typeface, providing excellent readability across digital platforms 
              and supporting government accessibility standards.
            </p>
            <div className="space-y-8">
              {typography.map((type, index) => (
                <div key={index} className="border-b border-gray-100 pb-6 last:border-b-0">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">{type.name}</h3>
                      <div className="space-y-1 text-sm text-gray-600">
                        <p><span className="font-medium">Font:</span> {type.font}</p>
                        <p><span className="font-medium">Weight:</span> {type.weight}</p>
                        <p><span className="font-medium">Usage:</span> {type.usage}</p>
                      </div>
                    </div>
                    <div>
                      <div 
                        className={`text-2xl ${type.name === 'Headings' ? 'font-bold' : type.name === 'UI Elements' ? 'font-medium' : 'font-normal'}`}
                        style={{ fontFamily: type.font === 'ui-monospace' ? 'ui-monospace, monospace' : 'Inter, sans-serif' }}
                      >
                        {type.name === 'Headings' && 'Forestry Commission Grant Management'}
                        {type.name === 'Body Text' && 'Supporting woodland creation and environmental stewardship across England through digital innovation.'}
                        {type.name === 'UI Elements' && 'Submit Application'}
                        {type.name === 'Monospace' && 'APP-2024-001234'}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeSection === 'logos' && (
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center gap-3">
              <Eye className="w-6 h-6 text-blue-600" />
              Logos & Icons
            </h2>
            <p className="text-gray-600 mb-8">
              Our visual identity combines the official Forestry Commission branding with modern digital design principles.
            </p>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-4">Primary Logo</h3>
                  <div className="bg-gray-50 rounded-lg p-6 flex items-center justify-center">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-green-600 rounded-2xl flex items-center justify-center">
                        <Trees className="w-8 h-8 text-white" />
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-gray-900">Forestry Commission</div>
                        <div className="text-green-600 font-medium">Grant Management System</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-4">Icon Only</h3>
                  <div className="bg-gray-50 rounded-lg p-6 flex items-center justify-center">
                    <div className="w-20 h-20 bg-gradient-to-br from-blue-600 to-green-600 rounded-2xl flex items-center justify-center">
                      <Trees className="w-10 h-10 text-white" />
                    </div>
                  </div>
                </div>
              </div>
              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-4">Usage Guidelines</h3>
                  <div className="space-y-3 text-sm text-gray-600">
                    <div className="flex gap-3">
                      <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span>Always maintain the gradient from blue to green</span>
                    </div>
                    <div className="flex gap-3">
                      <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span>Minimum size: 32px for digital use</span>
                    </div>
                    <div className="flex gap-3">
                      <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span>Ensure adequate clear space around logo</span>
                    </div>
                    <div className="flex gap-3">
                      <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span>Use on light backgrounds for optimal contrast</span>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-4">Download Assets</h3>
                  <div className="space-y-2">
                    <button className="w-full flex items-center justify-between p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors">
                      <span className="font-medium">SVG Logo</span>
                      <Download className="w-4 h-4" />
                    </button>
                    <button className="w-full flex items-center justify-between p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors">
                      <span className="font-medium">PNG Assets</span>
                      <Download className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeSection === 'language' && (
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center gap-3">
              <Globe className="w-6 h-6 text-blue-600" />
              Language & Communication
            </h2>
            <p className="text-gray-600 mb-8">
              Our communication style reflects professional government standards while remaining accessible and user-friendly.
            </p>
            <div className="space-y-6">
              {languageRules.map((rule, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-6">
                  <h3 className="font-semibold text-gray-900 mb-3">{rule.category}</h3>
                  <p className="text-gray-700 mb-2">{rule.rule}</p>
                  <div className="bg-blue-50 border-l-4 border-blue-400 p-3">
                    <p className="text-sm text-blue-800"><span className="font-medium">Example:</span> {rule.example}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeSection === 'previews' && (
          <div className="space-y-12">
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center gap-3">
                <FileText className="w-6 h-6 text-blue-600" />
                Link Preview Components
              </h2>
              <p className="text-gray-600 mb-8">
                Professional link preview components showcasing the Digital Land Solutions value proposition 
                and Forestry Commission GMS capabilities.
              </p>
            </div>

            {/* Default Variant */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-semibold text-gray-900 mb-2">Default Variant</h3>
                <p className="text-gray-600">Full-featured rich preview with gradient branding, live metrics, and comprehensive GMS value proposition</p>
              </div>
              <div className="flex justify-center mb-6">
                <LinkPreview variant="default" className="mx-auto" />
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <code className="text-sm text-gray-800">{`<LinkPreview variant="default" className="mx-auto" />`}</code>
              </div>
            </div>

            {/* Compact Variant */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-semibold text-gray-900 mb-2">Compact Variant</h3>
                <p className="text-gray-600">Perfect for sidebars and notifications - streamlined version maintaining brand consistency</p>
              </div>
              <div className="flex justify-center mb-6">
                <LinkPreview variant="compact" className="w-full max-w-md" />
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <code className="text-sm text-gray-800">{`<LinkPreview variant="compact" className="w-full max-w-md" />`}</code>
              </div>
            </div>

            {/* Card Variant */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-semibold text-gray-900 mb-2">Card Variant</h3>
                <p className="text-gray-600">Social media optimized format with key statistics - ideal for external sharing</p>
              </div>
              <div className="flex justify-center mb-6">
                <LinkPreview variant="card" className="mx-auto" />
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <code className="text-sm text-gray-800">{`<LinkPreview variant="card" className="mx-auto" />`}</code>
              </div>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="mt-16 bg-gradient-to-r from-blue-600 to-green-600 rounded-2xl p-8 text-white text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Trees className="w-8 h-8" />
            <h3 className="text-2xl font-bold">Digital Land Solutions</h3>
          </div>
          <p className="text-blue-100 max-w-2xl mx-auto">
            Professional government digital services built with modern web technologies, 
            ensuring accessibility, security, and user-centered design for the Forestry Commission.
          </p>
          <div className="mt-6 flex justify-center gap-4 flex-wrap">
            <span className="px-4 py-2 bg-white/10 rounded-full text-sm font-medium">React + TypeScript</span>
            <span className="px-4 py-2 bg-white/10 rounded-full text-sm font-medium">Tailwind CSS</span>
            <span className="px-4 py-2 bg-white/10 rounded-full text-sm font-medium">GOV.UK Compatible</span>
            <span className="px-4 py-2 bg-white/10 rounded-full text-sm font-medium">WCAG 2.1 AA</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Brand;