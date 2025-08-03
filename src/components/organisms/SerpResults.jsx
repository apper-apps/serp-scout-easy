import React, { useState, useEffect } from "react"
import Card from "@/components/atoms/Card"
import Badge from "@/components/atoms/Badge"
import Button from "@/components/atoms/Button"
import ApperIcon from "@/components/ApperIcon"
import Loading from "@/components/ui/Loading"
import Error from "@/components/ui/Error"
import Empty from "@/components/ui/Empty"
import { serpService } from "@/services/api/serpService"

const SerpResults = ({ analysis, onResultsUpdate }) => {
  const [serpData, setSerpData] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [expandedResult, setExpandedResult] = useState(null)

  useEffect(() => {
    if (analysis) {
      loadSerpData()
    }
  }, [analysis])

  const loadSerpData = async () => {
    setLoading(true)
    setError("")
    try {
      const data = await serpService.getAll()
      setSerpData(data)
      onResultsUpdate(data)
    } catch (err) {
      setError("Failed to load SERP data. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const toggleExpanded = (position) => {
    setExpandedResult(expandedResult === position ? null : position)
  }

  if (loading) return <Loading />
  if (error) return <Error message={error} onRetry={loadSerpData} />
  if (!analysis) return <Empty message="Complete website analysis to view SERP results" />

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <ApperIcon name="Search" className="w-5 h-5 text-accent" />
          <h2 className="text-lg font-semibold text-white">SERP Analysis Results</h2>
          <Badge variant="success">{serpData.length} Results</Badge>
        </div>
        <Button variant="outline" size="sm" onClick={loadSerpData}>
          <ApperIcon name="RefreshCw" className="w-4 h-4 mr-2" />
          Refresh
        </Button>
      </div>

      <div className="space-y-3">
        {serpData.map((result) => (
          <div
            key={result.Id}
            className="bg-primary rounded-lg border border-secondary/50 table-row-hover cursor-pointer"
            onClick={() => toggleExpanded(result.position)}
          >
            <div className="p-4">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <Badge variant="accent" size="sm">#{result.position}</Badge>
                    <h3 className="text-sm font-medium text-white line-clamp-1">
                      {result.title}
                    </h3>
                  </div>
                  <p className="text-xs text-accent mb-2">{result.url}</p>
                  <div className="flex flex-wrap gap-2">
                    <div className="flex items-center space-x-2">
                      <span className="text-xs text-gray-400">Entities:</span>
                      {result.entities.slice(0, 3).map((entity, idx) => (
                        <Badge key={idx} variant="info" size="sm">{entity}</Badge>
                      ))}
                      {result.entities.length > 3 && (
                        <Badge variant="default" size="sm">+{result.entities.length - 3}</Badge>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  {result.snippetType && (
                    <Badge variant="warning" size="sm">{result.snippetType}</Badge>
                  )}
                  <ApperIcon 
                    name={expandedResult === result.position ? "ChevronUp" : "ChevronDown"} 
                    className="w-4 h-4 text-gray-400" 
                  />
                </div>
              </div>

              {expandedResult === result.position && (
                <div className="mt-4 pt-4 border-t border-secondary/50">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="text-sm font-medium text-white mb-2">All Entities</h4>
                      <div className="flex flex-wrap gap-1">
                        {result.entities.map((entity, idx) => (
                          <Badge key={idx} variant="info" size="sm">{entity}</Badge>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-white mb-2">LSI Terms</h4>
                      <div className="flex flex-wrap gap-1">
                        {result.lsiTerms.map((term, idx) => (
                          <Badge key={idx} variant="accent" size="sm">{term}</Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </Card>
  )
}

export default SerpResults