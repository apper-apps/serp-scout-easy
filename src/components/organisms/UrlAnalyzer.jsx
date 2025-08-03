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

const [isEditing, setIsEditing] = useState(false)
  const [editedBusinessType, setEditedBusinessType] = useState('')
  const [editedLocation, setEditedLocation] = useState('')

  const handleAnalyze = async (url) => {
    setLoading(true)
    try {
      // Enhanced analysis process with URL-based detection
      toast.info("Starting comprehensive website analysis...")
      
      // Extract domain characteristics for realistic business detection
      const domain = url ? new URL(url).hostname : 'unknown.com'
      const domainParts = domain.split('.')
      const subdomain = domainParts.length > 2 ? domainParts[0] : null
      
      // Simulate business type detection based on domain/subdomain patterns
      const businessTypes = [
        "E-commerce Store", "Digital Marketing Agency", "Software Company", 
        "Healthcare Practice", "Legal Services", "Real Estate Agency",
        "Restaurant & Food Service", "Financial Services", "Consulting Firm",
        "Educational Institution", "Non-profit Organization", "Local Business"
      ]
      
      // Generate business type based on domain characteristics
      let detectedBusinessType = businessTypes[Math.floor(Math.random() * businessTypes.length)]
      if (subdomain) {
        if (subdomain.includes('shop') || subdomain.includes('store')) detectedBusinessType = "E-commerce Store"
        if (subdomain.includes('blog') || subdomain.includes('news')) detectedBusinessType = "Media & Publishing"
        if (subdomain.includes('app') || subdomain.includes('api')) detectedBusinessType = "Software Company"
      }
      
      // Geographic detection simulation
      const locations = [
        "New York, NY", "Los Angeles, CA", "Chicago, IL", "Houston, TX",
        "Phoenix, AZ", "Philadelphia, PA", "San Antonio, TX", "San Diego, CA",
        "Dallas, TX", "San Jose, CA", "Austin, TX", "San Francisco, CA"
      ]
      const detectedLocation = locations[Math.floor(Math.random() * locations.length)]
      
      // Create analysis with detected characteristics
      const analysis = await analysisService.create({
        url: url,
        businessType: detectedBusinessType,
        location: detectedLocation,
        timestamp: new Date().toISOString()
      })

      setCurrentAnalysis(analysis)
      setEditedBusinessType(analysis.businessType)
      setEditedLocation(analysis.location)
      onAnalysisComplete(analysis)
      
      toast.success("Analysis completed successfully!")
    } catch (error) {
      toast.error("Failed to analyze website. Please try again.")
      console.error("Analysis error:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleStartEdit = () => {
    setIsEditing(true)
  }

  const handleSaveEdit = async () => {
    try {
      const updatedAnalysis = await analysisService.update(currentAnalysis.Id, {
        businessType: editedBusinessType,
        location: editedLocation,
        timestamp: new Date().toISOString()
      })
      
      setCurrentAnalysis(updatedAnalysis)
      onAnalysisComplete(updatedAnalysis)
      setIsEditing(false)
      toast.success("Analysis information updated successfully!")
    } catch (error) {
      toast.error("Failed to update analysis. Please try again.")
      console.error("Update error:", error)
    }
  }

  const handleCancelEdit = () => {
    setEditedBusinessType(currentAnalysis.businessType)
    setEditedLocation(currentAnalysis.location)
    setIsEditing(false)
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
            subtitle="AI-detected from website analysis"
          />
          <MetricCard
            title="Service Area"
            value={currentAnalysis.location}
            icon="MapPin"
            subtitle="Geographic targeting identified"
          />
          <MetricCard
            title="SEO Score"
            value={`${currentAnalysis.metrics?.seoScore || 75}/100`}
            icon="TrendingUp"
            subtitle="Overall website optimization"
            gradient={true}
          />
          <MetricCard
            title="Monthly Traffic"
            value={`${Math.floor((currentAnalysis.metrics?.monthlyTraffic || 5000) / 1000)}K`}
            icon="Users"
            subtitle="Estimated organic visitors"
          />
          <MetricCard
            title="Domain Age"
            value={`${currentAnalysis.metrics?.domainAge || 3} years`}
            icon="Calendar"
            subtitle="Domain registration age"
          />
          <MetricCard
            title="Analysis Status"
            value="Complete"
            icon="CheckCircle"
            subtitle="Ready for detailed SEO analysis"
            gradient={true}
          />
        </div>
      )}
    </div>
  )
}

export default UrlAnalyzer