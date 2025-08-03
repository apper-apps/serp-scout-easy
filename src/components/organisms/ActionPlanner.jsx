import React, { useState, useEffect } from "react"
import Card from "@/components/atoms/Card"
import Button from "@/components/atoms/Button"
import Badge from "@/components/atoms/Badge"
import ApperIcon from "@/components/ApperIcon"
import ProgressRing from "@/components/molecules/ProgressRing"
import Loading from "@/components/ui/Loading"
import Error from "@/components/ui/Error"
import Empty from "@/components/ui/Empty"
import { actionPlanService } from "@/services/api/actionPlanService"
import { toast } from "react-toastify"

const ActionPlanner = ({ analysis, serpData, competitors }) => {
  const [actionPlan, setActionPlan] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [activeTab, setActiveTab] = useState("weekly")
  const [completedTasks, setCompletedTasks] = useState(new Set())

  useEffect(() => {
    if (analysis && serpData?.length > 0) {
      generateActionPlan()
    }
  }, [analysis, serpData])

  const generateActionPlan = async () => {
    setLoading(true)
    setError("")
    try {
      const plan = await actionPlanService.generatePlan({
        analysisId: analysis.Id,
        businessType: analysis.businessType,
        location: analysis.location
      })
      setActionPlan(plan)
    } catch (err) {
      setError("Failed to generate action plan. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const handleTaskComplete = (taskId) => {
    const newCompleted = new Set(completedTasks)
    if (newCompleted.has(taskId)) {
      newCompleted.delete(taskId)
      toast.info("Task marked as incomplete")
    } else {
      newCompleted.add(taskId)
      toast.success("Task completed!")
    }
    setCompletedTasks(newCompleted)
  }

  const calculateProgress = (tasks) => {
    if (!tasks?.length) return 0
    const completed = tasks.filter(task => completedTasks.has(task.Id)).length
    return (completed / tasks.length) * 100
  }

  const regeneratePlan = async () => {
    toast.info("Regenerating action plan with updated data...")
    await generateActionPlan()
    toast.success("Action plan regenerated successfully!")
  }
const downloadSEOPlan = async () => {
    try {
      toast.info("Generating SEO action plan...")
      
      // Simulate plan generation
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      const planData = {
        url: analysis?.url || 'N/A',
        businessType: analysis?.businessType || 'N/A',
        generatedAt: new Date().toISOString(),
        actionPlan: plan,
        priority: {
          high: plan?.tasks?.filter(task => task.priority === 'high') || [],
          medium: plan?.tasks?.filter(task => task.priority === 'medium') || [],
          low: plan?.tasks?.filter(task => task.priority === 'low') || []
        },
        estimatedTimeline: '3-6 months',
        estimatedImpact: 'Medium to High',
        keyMetrics: [
          'Organic traffic increase: 25-40%',
          'Keyword rankings improvement: 15-30%',
          'Page load speed improvement: 20-35%',
          'Mobile usability score: 85-95%'
        ]
      }
      
      // Create and download JSON file
      const blob = new Blob([JSON.stringify(planData, null, 2)], { 
        type: 'application/json' 
      })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `seo-action-plan-${Date.now()}.json`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)
      
      toast.success("SEO action plan downloaded successfully!")
    } catch (error) {
      toast.error("Failed to generate SEO plan")
      console.error("Download error:", error)
    }
  }
  if (loading) return <Loading />
  if (error) return <Error message={error} onRetry={generateActionPlan} />
  if (!analysis || !serpData?.length) {
    return <Empty message="Complete analysis to generate action plan" />
  }

  const currentTasks = activeTab === "weekly" ? actionPlan?.weekly || [] : actionPlan?.monthly || []
  const progress = calculateProgress(currentTasks)

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <ApperIcon name="Calendar" className="w-5 h-5 text-accent" />
            <h2 className="text-lg font-semibold text-white">SEO Action Plan</h2>
            <Badge variant="success">Generated</Badge>
          </div>
<div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={downloadSEOPlan}>
              <ApperIcon name="Download" className="w-4 h-4 mr-2" />
              Download Plan
            </Button>
            <Button variant="outline" size="sm" onClick={regeneratePlan}>
              <ApperIcon name="RefreshCw" className="w-4 h-4 mr-2" />
              Regenerate Plan
            </Button>
          </div>
        </div>

        <div className="flex items-center space-x-6 mb-6">
          <div className="flex items-center space-x-3">
            <ProgressRing percentage={progress} size={50} />
            <div>
              <p className="text-sm font-medium text-white">Overall Progress</p>
              <p className="text-xs text-gray-400">
                {completedTasks.size} of {currentTasks.length} tasks completed
              </p>
            </div>
          </div>
        </div>

        <div className="flex space-x-4 mb-6">
          <Button
            variant={activeTab === "weekly" ? "primary" : "outline"}
            size="sm"
            onClick={() => setActiveTab("weekly")}
          >
            <ApperIcon name="Calendar" className="w-4 h-4 mr-2" />
            Weekly Plan
          </Button>
          <Button
            variant={activeTab === "monthly" ? "primary" : "outline"}
            size="sm"
            onClick={() => setActiveTab("monthly")}
          >
            <ApperIcon name="CalendarDays" className="w-4 h-4 mr-2" />
            Monthly Plan
          </Button>
        </div>

        <div className="space-y-3">
          {currentTasks.map((task, index) => (
            <div
              key={task.Id}
              className={`p-4 rounded-lg border transition-all duration-200 ${
                completedTasks.has(task.Id)
                  ? "bg-success/10 border-success/30"
                  : "bg-primary border-secondary/50"
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-3 flex-1">
                  <button
                    onClick={() => handleTaskComplete(task.Id)}
                    className={`mt-1 w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${
                      completedTasks.has(task.Id)
                        ? "bg-success border-success"
                        : "border-gray-400 hover:border-accent"
                    }`}
                  >
                    {completedTasks.has(task.Id) && (
                      <ApperIcon name="Check" className="w-3 h-3 text-white" />
                    )}
                  </button>
                  <div className="flex-1">
                    <h3 className={`text-sm font-medium mb-1 ${
                      completedTasks.has(task.Id) ? "text-gray-400 line-through" : "text-white"
                    }`}>
                      {task.title}
                    </h3>
                    <p className={`text-xs mb-2 ${
                      completedTasks.has(task.Id) ? "text-gray-500" : "text-gray-400"
                    }`}>
                      {task.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="info" size="sm">{task.category}</Badge>
                      <Badge variant="warning" size="sm">{task.priority}</Badge>
                      <Badge variant="accent" size="sm">{task.estimatedTime}</Badge>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <Badge variant="default" size="sm">Day {index + 1}</Badge>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {actionPlan?.internalLinks?.length > 0 && (
        <Card className="p-6">
          <div className="flex items-center space-x-3 mb-4">
            <ApperIcon name="Link" className="w-5 h-5 text-accent" />
            <h3 className="text-lg font-semibold text-white">Internal Linking Strategy</h3>
            <Badge variant="info">{actionPlan.internalLinks.length} Suggestions</Badge>
          </div>
          
          <div className="space-y-3">
            {actionPlan.internalLinks.map((link) => (
              <div key={link.Id} className="p-3 bg-primary rounded border border-secondary/50">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-white">{link.sourcePage}</span>
                  <ApperIcon name="ArrowRight" className="w-4 h-4 text-accent" />
                  <span className="text-sm font-medium text-white">{link.destinationPage}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge variant="accent" size="sm">Anchor: {link.anchorText}</Badge>
                  <Badge variant="info" size="sm">Context: {link.context}</Badge>
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  )
}

export default ActionPlanner