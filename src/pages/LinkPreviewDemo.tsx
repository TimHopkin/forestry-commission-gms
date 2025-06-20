import React, { useState } from 'react';
import { Copy, Check, Share2, Code } from 'lucide-react';
import LinkPreview from '../components/LinkPreview';

const LinkPreviewDemo: React.FC = () => {
  const [copiedVariant, setCopiedVariant] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'preview' | 'code'>('preview');

  const copyToClipboard = async (text: string, variant: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedVariant(variant);
      setTimeout(() => setCopiedVariant(null), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const embedCode = `<LinkPreview variant="default" className="mx-auto" />`;
  const compactCode = `<LinkPreview variant="compact" className="w-full max-w-md" />`;
  const cardCode = `<LinkPreview variant="card" className="mx-auto" />`;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Forestry Commission GMS
          </h1>
          <p className="text-xl text-gray-600 mb-2">Rich Link Preview Component</p>
          <p className="text-gray-500 max-w-2xl mx-auto">
            Professional link previews showcasing the power of Digital Land Solutions 
            and the comprehensive Forestry Commission Grant Management System.
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex justify-center mb-8">
          <div className="bg-white rounded-lg p-1 shadow-sm border border-gray-200">
            <button
              onClick={() => setActiveTab('preview')}
              className={`px-6 py-2 rounded-md font-medium transition-colors ${
                activeTab === 'preview'
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <Share2 className="w-4 h-4 inline mr-2" />
              Live Preview
            </button>
            <button
              onClick={() => setActiveTab('code')}
              className={`px-6 py-2 rounded-md font-medium transition-colors ${
                activeTab === 'code'
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <Code className="w-4 h-4 inline mr-2" />
              Implementation
            </button>
          </div>
        </div>

        {activeTab === 'preview' ? (
          <>
            {/* Default Variant */}
            <div className="mb-16">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-2">Default Variant</h2>
                <p className="text-gray-600">Full-featured rich link preview with complete branding</p>
              </div>
              <div className="flex justify-center">
                <LinkPreview variant="default" className="mx-auto" />
              </div>
              <div className="mt-4 text-center">
                <button
                  onClick={() => copyToClipboard(embedCode, 'default')}
                  className="inline-flex items-center gap-2 bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors"
                >
                  {copiedVariant === 'default' ? (
                    <>
                      <Check className="w-4 h-4" />
                      Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      Copy Code
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Compact Variant */}
            <div className="mb-16">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-2">Compact Variant</h2>
                <p className="text-gray-600">Streamlined version for sidebars and notifications</p>
              </div>
              <div className="flex justify-center">
                <LinkPreview variant="compact" className="w-full max-w-md" />
              </div>
              <div className="mt-4 text-center">
                <button
                  onClick={() => copyToClipboard(compactCode, 'compact')}
                  className="inline-flex items-center gap-2 bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors"
                >
                  {copiedVariant === 'compact' ? (
                    <>
                      <Check className="w-4 h-4" />
                      Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      Copy Code
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Card Variant */}
            <div className="mb-16">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-2">Card Variant</h2>
                <p className="text-gray-600">Social media and mobile-optimized format</p>
              </div>
              <div className="flex justify-center">
                <LinkPreview variant="card" className="mx-auto" />
              </div>
              <div className="mt-4 text-center">
                <button
                  onClick={() => copyToClipboard(cardCode, 'card')}
                  className="inline-flex items-center gap-2 bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors"
                >
                  {copiedVariant === 'card' ? (
                    <>
                      <Check className="w-4 h-4" />
                      Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      Copy Code
                    </>
                  )}
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="bg-white rounded-2xl shadow-lg p-8 max-w-4xl mx-auto">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Implementation Guide</h2>
            
            <div className="space-y-8">
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Installation</h3>
                <div className="bg-gray-900 rounded-lg p-4 text-green-400 font-mono text-sm">
                  <div>import LinkPreview from '../components/LinkPreview';</div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Usage Examples</h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-gray-700 mb-2">Default Variant</h4>
                    <div className="bg-gray-900 rounded-lg p-4 text-green-400 font-mono text-sm">
                      {`<LinkPreview variant="default" className="mx-auto" />`}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-gray-700 mb-2">Compact Variant</h4>
                    <div className="bg-gray-900 rounded-lg p-4 text-green-400 font-mono text-sm">
                      {`<LinkPreview variant="compact" className="w-full max-w-md" />`}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-gray-700 mb-2">Card Variant</h4>
                    <div className="bg-gray-900 rounded-lg p-4 text-green-400 font-mono text-sm">
                      {`<LinkPreview variant="card" className="mx-auto" />`}
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Props</h3>
                <div className="overflow-x-auto">
                  <table className="w-full border border-gray-200 rounded-lg">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-3 text-left font-medium text-gray-900">Prop</th>
                        <th className="px-4 py-3 text-left font-medium text-gray-900">Type</th>
                        <th className="px-4 py-3 text-left font-medium text-gray-900">Default</th>
                        <th className="px-4 py-3 text-left font-medium text-gray-900">Description</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      <tr>
                        <td className="px-4 py-3 font-mono text-sm">variant</td>
                        <td className="px-4 py-3 font-mono text-sm">'default' | 'compact' | 'card'</td>
                        <td className="px-4 py-3 font-mono text-sm">'default'</td>
                        <td className="px-4 py-3 text-sm">Visual style variant</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3 font-mono text-sm">className</td>
                        <td className="px-4 py-3 font-mono text-sm">string</td>
                        <td className="px-4 py-3 font-mono text-sm">''</td>
                        <td className="px-4 py-3 text-sm">Additional CSS classes</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="mt-16 text-center">
          <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-200 max-w-2xl mx-auto">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Digital Land Solutions for Government
            </h3>
            <p className="text-gray-600 mb-4">
              This link preview component showcases the powerful capabilities of the 
              Forestry Commission Grant Management System, demonstrating professional 
              government digital services with modern web technologies.
            </p>
            <div className="flex justify-center gap-4">
              <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                React + TypeScript
              </span>
              <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                Tailwind CSS
              </span>
              <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm font-medium">
                GOV.UK Compatible
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LinkPreviewDemo;