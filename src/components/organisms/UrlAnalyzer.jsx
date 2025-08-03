import React, { useState } from "react"
import { toast } from "react-toastify"
import Card from "@/components/atoms/Card"
import SearchInput from "@/components/molecules/SearchInput"
import MetricCard from "@/components/molecules/MetricCard"
import ApperIcon from "@/components/ApperIcon"
import { analysisService } from "@/services/api/analysisService"

const UrlAnalyzer = ({ onAnalysisComplete }) => {
  const [loading, setLoading] = useState(false)
  const [currentAnalysis, setCurrentAnalysis] = useState(null)

  const handleAnalyze = async (url) => {
    setLoading(true)
    try {
      // Simulate analysis process
      toast.info("Starting website analysis...")
      
      // Create analysis with mock data
      const analysis = await analysisService.create({
        url: url,
        businessType: "Digital Marketing Agency",
        location: "San Francisco, CA",
        timestamp: new Date().toISOString()
      })

      setCurrentAnalysis(analysis)
      onAnalysisComplete(analysis)
      
      toast.success("Analysis completed successfully!")
    } catch (error) {
      toast.error("Failed to analyze website. Please try again.")
      console.error("Analysis error:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <div className="flex items-center space-x-3 mb-4">
          <ApperIcon name="Globe" className="w-5 h-5 text-accent" />
          <h2 className="text-lg font-semibold text-white">Website Analysis</h2>
        </div>
        
        <SearchInput
          onAnalyze={handleAnalyze}
          loading={loading}
          placeholder="Enter website URL (e.g., https://example.com)"
        />

        {loading && (
          <div className="mt-4 p-4 bg-primary/50 rounded-lg border border-accent/30">
            <div className="flex items-center space-x-3">
              <ApperIcon name="Loader2" className="w-5 h-5 text-accent animate-spin" />
              <div>
                <p className="text-sm font-medium text-white">Analyzing website...</p>
                <p className="text-xs text-gray-400">Extracting business information and SERP data</p>
              </div>
            </div>
          </div>
        )}
      </Card>

      {currentAnalysis && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <MetricCard
            title="Business Type"
            value={currentAnalysis.businessType}
            icon="Building2"
            subtitle="Detected from website content"
          />
          <MetricCard
            title="Service Area"
            value={currentAnalysis.location}
            icon="MapPin"
            subtitle="Geographic focus identified"
          />
          <MetricCard
            title="Analysis Status"
            value="Complete"
            icon="CheckCircle"
            subtitle="Ready for SERP analysis"
            gradient={true}
          />
        </div>
      )}
    </div>
  )
}

export default UrlAnalyzer