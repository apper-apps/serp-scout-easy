import React, { useState } from "react"
import UrlAnalyzer from "@/components/organisms/UrlAnalyzer"
import TechnicalSeoScorecard from "@/components/organisms/TechnicalSeoScorecard"
import SerpResults from "@/components/organisms/SerpResults"
import CompetitorAnalysis from "@/components/organisms/CompetitorAnalysis"
import ActionPlanner from "@/components/organisms/ActionPlanner"
import EntitySuggestions from "@/components/organisms/EntitySuggestions"
const HomePage = () => {
const [currentAnalysis, setCurrentAnalysis] = useState(null)
  const [serpData, setSerpData] = useState([])
  const [competitors, setCompetitors] = useState([])
  const [selectedLocation, setSelectedLocation] = useState(null)

  const handleAnalysisComplete = (analysis) => {
    setCurrentAnalysis(analysis)
    // Reset dependent data when new analysis starts
    setSerpData([])
    setCompetitors([])
  }

  const handleSerpResultsUpdate = (results) => {
    setSerpData(results)
  }

  const handleLocationChange = (locationId) => {
    setSelectedLocation(locationId)
  }

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold gradient-text mb-4">
          SERP Scout SEO Analysis
        </h1>
        <p className="text-xl text-gray-400 max-w-3xl mx-auto">
          Analyze websites, extract SERP insights, and generate data-driven SEO strategies 
          with real-time competitor analysis and actionable recommendations.
        </p>
      </div>

      {/* URL Analyzer */}
      <UrlAnalyzer onAnalysisComplete={handleAnalysisComplete} />

      {/* Two Column Layout */}
<div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Main Analysis */}
        <div className="lg:col-span-2 space-y-8">
          <TechnicalSeoScorecard analysis={currentAnalysis} />
          
          <SerpResults 
            analysis={currentAnalysis} 
            onResultsUpdate={handleSerpResultsUpdate}
            selectedLocation={selectedLocation}
            onLocationChange={handleLocationChange}
          />
          
          <CompetitorAnalysis 
            serpData={serpData}
          />
        </div>
        {/* Right Column - Action Plans */}
        <div className="space-y-8">
<ActionPlanner 
            analysis={currentAnalysis}
            serpData={serpData}
            competitors={competitors}
          />
        </div>
      </div>

      {/* Entity Suggestions - Full Width */}
      <EntitySuggestions 
        serpData={serpData}
        businessType={currentAnalysis?.businessType}
      />
    </div>
  )
}

export default HomePage