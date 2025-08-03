import React, { useState, useEffect } from "react"
import Card from "@/components/atoms/Card"
import Badge from "@/components/atoms/Badge"
import Button from "@/components/atoms/Button"
import ApperIcon from "@/components/ApperIcon"
import Loading from "@/components/ui/Loading"
import Error from "@/components/ui/Error"
import Empty from "@/components/ui/Empty"
import { competitorService } from "@/services/api/competitorService"

const CompetitorAnalysis = ({ serpData }) => {
  const [competitors, setCompetitors] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [selectedCompetitor, setSelectedCompetitor] = useState(null)

  useEffect(() => {
    if (serpData?.length > 0) {
      loadCompetitors()
    }
  }, [serpData])

  const loadCompetitors = async () => {
    setLoading(true)
    setError("")
    try {
      const data = await competitorService.getAll()
      setCompetitors(data.slice(0, 3)) // Top 3 competitors
    } catch (err) {
      setError("Failed to load competitor data. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  if (loading) return <Loading />
  if (error) return <Error message={error} onRetry={loadCompetitors} />
  if (!serpData?.length) return <Empty message="SERP analysis required for competitor insights" />

  return (
    <Card className="p-6">
      <div className="flex items-center space-x-3 mb-6">
        <ApperIcon name="Users" className="w-5 h-5 text-accent" />
        <h2 className="text-lg font-semibold text-white">Top Competitor Analysis</h2>
        <Badge variant="warning">Top 3</Badge>
      </div>

      <div className="space-y-4">
        {competitors.map((competitor, index) => (
          <div key={competitor.Id} className="bg-primary rounded-lg border border-secondary/50">
            <div className="p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <Badge variant="accent" size="sm">#{index + 1}</Badge>
                  <h3 className="text-base font-semibold text-white">{competitor.domain}</h3>
                  <Badge variant="info" size="sm">{competitor.keywords.length} Keywords</Badge>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSelectedCompetitor(
                    selectedCompetitor === competitor.Id ? null : competitor.Id
                  )}
                >
                  <ApperIcon 
                    name={selectedCompetitor === competitor.Id ? "ChevronUp" : "ChevronDown"} 
                    className="w-4 h-4" 
                  />
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-3">
                <div>
                  <p className="text-xs text-gray-400 mb-1">Content Types</p>
                  <div className="flex flex-wrap gap-1">
                    {competitor.contentTypes.slice(0, 2).map((type, idx) => (
                      <Badge key={idx} variant="success" size="sm">{type}</Badge>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-xs text-gray-400 mb-1">Keyword Strength</p>
                  <div className="flex items-center space-x-2">
                    <div className="flex-1 bg-secondary rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-accent to-success h-2 rounded-full" 
                        style={{ width: `${Math.min(competitor.keywords.length * 10, 100)}%` }}
                      ></div>
                    </div>
                    <span className="text-xs text-white font-medium">
                      {Math.min(competitor.keywords.length * 10, 100)}%
                    </span>
                  </div>
                </div>
                <div>
                  <p className="text-xs text-gray-400 mb-1">Content Gaps</p>
                  <Badge variant="warning" size="sm">{competitor.gaps.length} Opportunities</Badge>
                </div>
              </div>

              {selectedCompetitor === competitor.Id && (
                <div className="mt-4 pt-4 border-t border-secondary/50">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="text-sm font-medium text-white mb-3 flex items-center">
                        <ApperIcon name="Target" className="w-4 h-4 mr-2 text-accent" />
                        Top Keywords
                      </h4>
                      <div className="space-y-2">
                        {competitor.keywords.slice(0, 5).map((keyword, idx) => (
                          <div key={idx} className="flex items-center justify-between p-2 bg-surface rounded">
                            <span className="text-sm text-white">{keyword.term}</span>
                            <div className="flex items-center space-x-2">
                              <Badge variant="info" size="sm">Vol: {keyword.volume}</Badge>
                              <Badge variant="success" size="sm">Pos: {keyword.position}</Badge>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-white mb-3 flex items-center">
                        <ApperIcon name="AlertTriangle" className="w-4 h-4 mr-2 text-warning" />
                        Content Gaps
                      </h4>
                      <div className="space-y-2">
                        {competitor.gaps.map((gap, idx) => (
                          <div key={idx} className="p-2 bg-warning/10 border border-warning/20 rounded">
                            <p className="text-sm text-white">{gap}</p>
                          </div>
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

export default CompetitorAnalysis