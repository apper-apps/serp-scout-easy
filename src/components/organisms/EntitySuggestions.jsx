import React, { useState, useEffect } from "react"
import Card from "@/components/atoms/Card"
import Badge from "@/components/atoms/Badge"
import Button from "@/components/atoms/Button"
import ApperIcon from "@/components/ApperIcon"
import Loading from "@/components/ui/Loading"
import Error from "@/components/ui/Error"
import Empty from "@/components/ui/Empty"
import { entityService } from "@/services/api/entityService"
import { toast } from "react-toastify"

const EntitySuggestions = ({ serpData, businessType }) => {
  const [entities, setEntities] = useState([])
  const [lsiTerms, setLsiTerms] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")

  useEffect(() => {
    if (serpData?.length > 0 && businessType) {
      loadEntitySuggestions()
    }
  }, [serpData, businessType])

  const loadEntitySuggestions = async () => {
    setLoading(true)
    setError("")
    try {
      const entityData = await entityService.getEntities()
      const lsiData = await entityService.getLsiTerms()
      
      setEntities(entityData)
      setLsiTerms(lsiData)
    } catch (err) {
      setError("Failed to load entity suggestions. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(() => {
      toast.success(`"${text}" copied to clipboard!`)
    }).catch(() => {
      toast.error("Failed to copy to clipboard")
    })
  }

  const getFilteredEntities = () => {
    if (selectedCategory === "all") return entities
    return entities.filter(entity => entity.category === selectedCategory)
  }

  const categories = [...new Set(entities.map(e => e.category))]

  if (loading) return <Loading />
  if (error) return <Error message={error} onRetry={loadEntitySuggestions} />
  if (!serpData?.length) return <Empty message="SERP analysis required for entity suggestions" />

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <div className="flex items-center space-x-3 mb-6">
          <ApperIcon name="Tag" className="w-5 h-5 text-accent" />
          <h2 className="text-lg font-semibold text-white">Entity Suggestions</h2>
          <Badge variant="success">{entities.length} Entities</Badge>
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          <Button
            variant={selectedCategory === "all" ? "primary" : "outline"}
            size="sm"
            onClick={() => setSelectedCategory("all")}
          >
            All ({entities.length})
          </Button>
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "primary" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(category)}
            >
              {category} ({entities.filter(e => e.category === category).length})
            </Button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {getFilteredEntities().map((entity) => (
            <div
              key={entity.Id}
              className="group p-3 bg-primary rounded border border-secondary/50 hover:bg-surface transition-colors cursor-pointer"
              onClick={() => copyToClipboard(entity.name)}
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <h3 className="text-sm font-medium text-white group-hover:text-accent transition-colors">
                    {entity.name}
                  </h3>
                  <div className="flex items-center justify-between mt-2">
                    <Badge variant="info" size="sm">{entity.category}</Badge>
                    <div className="flex items-center space-x-2">
                      <Badge variant="accent" size="sm">
                        {entity.frequency}x
                      </Badge>
                      <ApperIcon name="Copy" className="w-3 h-3 text-gray-400 group-hover:text-accent transition-colors" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      <Card className="p-6">
        <div className="flex items-center space-x-3 mb-6">
          <ApperIcon name="Hash" className="w-5 h-5 text-accent" />
          <h2 className="text-lg font-semibold text-white">LSI Term Suggestions</h2>
          <Badge variant="warning">{lsiTerms.length} Terms</Badge>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
          {lsiTerms.map((term) => (
            <div
              key={term.Id}
              className="group p-3 bg-primary rounded border border-secondary/50 hover:bg-surface transition-colors cursor-pointer"
              onClick={() => copyToClipboard(term.term)}
            >
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-white group-hover:text-accent transition-colors">
                  {term.term}
                </span>
                <div className="flex items-center space-x-2">
                  <Badge variant="warning" size="sm">
                    {term.relevance}%
                  </Badge>
                  <ApperIcon name="Copy" className="w-3 h-3 text-gray-400 group-hover:text-accent transition-colors" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}

export default EntitySuggestions