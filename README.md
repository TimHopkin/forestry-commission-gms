# Forestry Commission Grant Management System

A comprehensive digital platform for managing England Woodland Creation Offer (EWCO) grant applications, built with React, TypeScript, and modern web technologies.

## 🌲 Overview

The Forestry Commission Grant Management System streamlines the entire grant application process from Land App submission through to government reporting, providing an intuitive interface for Forestry Commission staff to manage woodland creation grants efficiently.

## ✨ Key Features

### 📊 Dashboard
- Real-time grant statistics and KPIs
- Recent applications overview
- Quick access to pending reviews
- Grant value summaries

### 📋 Application Management
- Comprehensive application listing with filtering
- Detailed application review interface
- Status tracking through the approval process
- Document management and verification

### 🗺️ Interactive Mapping
- **Land App Integration**: Direct integration with Land App geospatial data
- **Spatial Overview**: Map view showing all applications geographically
- **Interactive GeoJSON**: Click-to-explore land parcel details
- **Suitability Analysis**: Color-coded land suitability visualization

### 🔄 System Architecture
- **End-to-end Workflow**: Interactive diagram showing process from farmers to treasury
- **Stakeholder Mapping**: Clear visualization of all system participants
- **Data Flow Tracking**: Understanding of how information moves through the system
- **Compliance Framework**: Government regulations and audit requirements

### 🤖 Help & AI Assistance
- **Video Tutorials**: Comprehensive training materials for staff
- **AI Assistant**: Contextual help that understands GMS workflows
- **Step-by-step Guides**: Detailed process documentation
- **FAQ Section**: Common questions and troubleshooting

## 🏗️ Technical Stack

- **Frontend**: React 18 with TypeScript
- **Styling**: Tailwind CSS with GOV.UK Design System
- **Mapping**: React Leaflet with OpenStreetMap
- **Forms**: React Hook Form with Zod validation
- **Routing**: React Router v6
- **Build Tool**: Vite
- **Icons**: Lucide React

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/TimHopkin/forestry-commission-gms.git
cd forestry-commission-gms

# Install dependencies
npm install

# Start development server
npm run dev
```

Visit `http://localhost:3000` to view the application.

### Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
npm run test         # Run tests
```

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── DynamicForm.tsx     # Multi-step form wizard
│   ├── LandAppMap.tsx      # Interactive mapping component
│   └── Layout.tsx          # Main layout wrapper
├── pages/              # Route components
│   ├── Dashboard.tsx       # Main dashboard
│   ├── ApplicationsList.tsx    # Applications listing
│   ├── ApplicationDetail.tsx   # Detailed application view
│   ├── ApplicationsMapView.tsx # Spatial applications overview
│   ├── SystemDiagram.tsx      # System architecture diagram
│   └── HelpGuidance.tsx       # Help and training resources
├── data/               # Mock data and configurations
│   ├── landAppData.ts      # GeoJSON and Land App integration data
│   └── formSteps.ts        # Form configuration
└── types/              # TypeScript type definitions
    └── index.ts
```

## 🌍 Land App Integration

The system seamlessly integrates with Land App to provide:

- **Real-time Data Sync**: Applications flow directly from Land App submissions
- **Geospatial Validation**: Interactive maps with land parcel details
- **Quality Assessment**: Automated data quality checks and recommendations
- **Environmental Analysis**: Biodiversity scores, carbon potential, and constraints

### Example Land App Data Structure

```typescript
interface LandAppFeature {
  properties: {
    name: string
    area_hectares: number
    suitability: 'High' | 'Medium' | 'Low'
    carbon_potential: number
    biodiversity_score: number
    ewco_eligible: boolean
    constraints: string[]
  }
  geometry: {
    type: 'Polygon'
    coordinates: number[][][]
  }
}
```

## 🔐 Government Compliance

Built to meet government standards:

- **GDPR Compliance**: Data protection by design
- **Government Security Classifications**: OFFICIAL-SENSITIVE handling
- **Accessibility**: GOV.UK Design System compliance
- **Audit Trail**: Complete transaction logging for transparency
- **Data Integration**: Defra and HM Treasury reporting capabilities
- **Language Standards**: British English throughout the application
- **Currency Standards**: All monetary values displayed in Pounds Sterling (£)

## 🎯 User Workflows

### 1. Application Processing
1. View applications list with filtering options
2. Select application for detailed review
3. Examine Land App geospatial data and recommendations
4. Verify payment calculations and eligibility
5. Make approval decision or request additional information

### 2. Spatial Overview
1. Access Map View to see geographic distribution
2. Filter applications by status, county, or other criteria
3. Click map markers to preview application details
4. Identify regional patterns and workload distribution

### 3. System Understanding
1. Review System Diagram for end-to-end process clarity
2. Understand data flows between stakeholders
3. Access compliance and governance information
4. Export data for government reporting requirements

## 🆘 Support & Training

The system includes comprehensive support features:

- **Interactive AI Assistant**: Contextual help for any workflow
- **Video Tutorials**: Step-by-step training materials
- **Process Guides**: Detailed workflow documentation
- **FAQ Section**: Common issues and solutions

## 🔮 Future Enhancements

Planned improvements include:

- **Real API Integration**: Connection to live Land App and government systems
- **Advanced Reporting**: Custom report generation and scheduling
- **Mobile Optimization**: Field staff mobile interface
- **Automated Workflows**: AI-powered application prioritization
- **Enhanced Analytics**: Predictive insights and trend analysis

## 📄 Documentation

- [System Architecture Diagram](docs/system-architecture.mmd)
- [Product Requirements Document](docs/PRD.md)
- [API Integration Specifications](docs/)

## 📞 Support

For technical support or questions:
- Email: support@forestrycommission.gov.uk
- Internal Help: Use the AI Assistant within the application

## 📜 License

This project is developed for the Forestry Commission and UK Government use.

---

🤖 **Built with Claude Code** - AI-assisted development for government digital services.

*Last updated: December 2024*