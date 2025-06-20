import React from 'react';
import { ExternalLink, TreePine, MapPin, TrendingUp, Shield, Users } from 'lucide-react';

interface LinkPreviewProps {
  className?: string;
  variant?: 'default' | 'compact' | 'card';
}

export const LinkPreview: React.FC<LinkPreviewProps> = ({ 
  className = '', 
  variant = 'default' 
}) => {
  const baseUrl = window.location.origin;
  
  const stats = [
    { label: 'Grants Processed', value: '2,847', icon: TrendingUp },
    { label: 'Hectares Protected', value: '45,230', icon: TreePine },
    { label: 'Applications Active', value: '156', icon: MapPin },
  ];

  if (variant === 'compact') {
    return (
      <div className={`bg-gradient-to-r from-blue-600 to-green-600 rounded-lg p-4 text-white shadow-lg ${className}`}>
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center">
            <TreePine className="w-6 h-6" />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-lg">Forestry Commission GMS</h3>
            <p className="text-blue-100 text-sm">Digital Land Solutions • Woodland Creation</p>
          </div>
          <ExternalLink className="w-5 h-5 text-blue-200" />
        </div>
      </div>
    );
  }

  if (variant === 'card') {
    return (
      <div className={`bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden max-w-md ${className}`}>
        <div className="bg-gradient-to-r from-blue-600 to-green-600 p-6 text-white">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="w-14 h-14 bg-white/10 rounded-xl flex items-center justify-center">
                <TreePine className="w-8 h-8" />
              </div>
              <div>
                <h3 className="font-bold text-xl">FC GMS</h3>
                <p className="text-blue-100">Digital Platform</p>
              </div>
            </div>
            <ExternalLink className="w-5 h-5 text-blue-200" />
          </div>
        </div>
        <div className="p-6">
          <h4 className="font-semibold text-gray-900 mb-2">Woodland Creation Grants</h4>
          <p className="text-gray-600 text-sm mb-4">Streamlined grant management for England's forestry initiatives</p>
          <div className="grid grid-cols-3 gap-3 text-center">
            {stats.map((stat, index) => (
              <div key={index} className="p-2">
                <div className="text-lg font-bold text-green-600">{stat.value}</div>
                <div className="text-xs text-gray-500">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden max-w-2xl ${className}`}>
      {/* Header with Gradient and Branding */}
      <div className="bg-gradient-to-br from-blue-700 via-blue-600 to-green-600 p-8 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/5"></div>
        <div className="relative z-10">
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center border border-white/20">
                <TreePine className="w-9 h-9" />
              </div>
              <div>
                <h1 className="text-2xl font-bold tracking-tight">Forestry Commission</h1>
                <p className="text-blue-100 font-medium">Grant Management System</p>
              </div>
            </div>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-3 py-1.5 rounded-full border border-white/20">
              <Shield className="w-4 h-4" />
              <span className="text-sm font-medium">GOV.UK</span>
            </div>
          </div>
          
          <div className="space-y-2">
            <h2 className="text-xl font-semibold">Digital Land Solutions</h2>
            <p className="text-blue-100 leading-relaxed max-w-lg">
              Transforming England's woodland creation through intelligent grant management, 
              Land App integration, and streamlined government processes.
            </p>
          </div>
        </div>
        
        {/* Decorative Elements */}
        <div className="absolute -top-4 -right-4 w-32 h-32 bg-white/5 rounded-full"></div>
        <div className="absolute -bottom-8 -left-8 w-40 h-40 bg-green-500/10 rounded-full"></div>
      </div>

      {/* Content Section */}
      <div className="p-8">
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-green-600" />
            Powerful GMS Capabilities
          </h3>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-4 h-4 text-blue-600" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">Land App Integration</h4>
                  <p className="text-sm text-gray-600">Real-time geospatial data and application processing</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <TreePine className="w-4 h-4 text-green-600" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">EWCO Grant Processing</h4>
                  <p className="text-sm text-gray-600">Streamlined woodland creation offer management</p>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Shield className="w-4 h-4 text-purple-600" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">Government Compliance</h4>
                  <p className="text-sm text-gray-600">GDPR, accessibility, and audit trail ready</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Users className="w-4 h-4 text-orange-600" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">Multi-Stakeholder</h4>
                  <p className="text-sm text-gray-600">Farmers, staff, and treasury integration</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Statistics */}
        <div className="bg-gray-50 rounded-xl p-6 mb-6">
          <h3 className="font-semibold text-gray-900 mb-4 text-center">Live System Metrics</h3>
          <div className="grid grid-cols-3 gap-6 text-center">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="space-y-2">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-green-500 rounded-xl flex items-center justify-center mx-auto">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                  <div className="text-sm text-gray-600 font-medium">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-6 border-t border-gray-100">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span>System Operational</span>
          </div>
          
          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-500 font-mono">{baseUrl}</span>
            <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
              <span>Open GMS</span>
              <ExternalLink className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LinkPreview;