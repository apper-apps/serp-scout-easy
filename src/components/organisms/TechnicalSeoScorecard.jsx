import React, { useState, useEffect } from "react"
import { toast } from "react-toastify"
import Card from "@/components/atoms/Card"
import Badge from "@/components/atoms/Badge"
import Button from "@/components/atoms/Button"
import ApperIcon from "@/components/ApperIcon"
import { cn } from "@/utils/cn"

const TechnicalSeoScorecard = ({ analysis }) => {
  const [loading, setLoading] = useState(false)
  const [techData, setTechData] = useState(null)

  useEffect(() => {
    if (analysis?.url) {
      runTechnicalAnalysis(analysis.url)
    }
  }, [analysis])

  const runTechnicalAnalysis = async (url) => {
    setLoading(true)
    try {
      toast.info("Running technical SEO analysis...")
      
      // Simulate API calls to PageSpeed Insights and mobile testing
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // Mock technical data with realistic scores
      const mockTechData = {
        pageSpeed: {
          desktop: {
            performance: Math.floor(Math.random() * 40) + 60, // 60-100
            fcp: Math.floor(Math.random() * 2000) + 1000, // 1-3s
            lcp: Math.floor(Math.random() * 3000) + 2000, // 2-5s
            cls: (Math.random() * 0.2).toFixed(3), // 0-0.2
            fid: Math.floor(Math.random() * 200) + 50 // 50-250ms
          },
          mobile: {
            performance: Math.floor(Math.random() * 30) + 50, // 50-80
            fcp: Math.floor(Math.random() * 3000) + 2000, // 2-5s
            lcp: Math.floor(Math.random() * 4000) + 3000, // 3-7s
            cls: (Math.random() * 0.3).toFixed(3), // 0-0.3
            fid: Math.floor(Math.random() * 300) + 100 // 100-400ms
          }
        },
        mobileFriendly: {
          score: Math.floor(Math.random() * 30) + 70, // 70-100
          issues: [
            "Text too small to read",
            "Clickable elements too close together",
            "Content wider than screen"
          ].slice(0, Math.floor(Math.random() * 3))
        },
        security: {
          https: Math.random() > 0.2, // 80% chance of HTTPS
          mixedContent: Math.random() > 0.7, // 30% chance of mixed content
          hsts: Math.random() > 0.4 // 60% chance of HSTS
        },
        accessibility: {
          score: Math.floor(Math.random() * 40) + 60, // 60-100
          issues: Math.floor(Math.random() * 8) + 2 // 2-10 issues
        }
      }
      
      setTechData(mockTechData)
      toast.success("Technical analysis completed!")
    } catch (error) {
      toast.error("Failed to run technical analysis")
      console.error("Technical analysis error:", error)
    } finally {
      setLoading(false)
    }
  }

  const getSeverityColor = (score, type = 'performance') => {
    if (type === 'performance') {
      if (score >= 90) return 'success'
      if (score >= 70) return 'warning' 
      if (score >= 50) return 'error'
      return 'error'
    }
    
    if (type === 'timing') {
      if (score <= 1000) return 'success'
      if (score <= 2500) return 'warning'
      return 'error'
    }
    
    if (type === 'cls') {
      if (score <= 0.1) return 'success'
      if (score <= 0.25) return 'warning'
      return 'error'
    }
    
    return 'neutral'
  }

  const getSeverityLabel = (score, type = 'performance') => {
    const color = getSeverityColor(score, type)
    if (color === 'success') return 'Good'
    if (color === 'warning') return 'Needs Improvement'
    return 'Poor'
  }

  const calculateOverallScore = () => {
    if (!techData) return 0
    
    const weights = {
      desktopPerf: 0.25,
      mobilePerf: 0.35,
      mobileFriendly: 0.25,
      security: 0.1,
      accessibility: 0.05
    }
    
    const securityScore = (techData.security.https ? 40 : 0) + 
                         (techData.security.hsts ? 30 : 0) + 
                         (!techData.security.mixedContent ? 30 : 0)
    
    return Math.round(
      techData.pageSpeed.desktop.performance * weights.desktopPerf +
      techData.pageSpeed.mobile.performance * weights.mobilePerf +
      techData.mobileFriendly.score * weights.mobileFriendly +
      securityScore * weights.security +
      techData.accessibility.score * weights.accessibility
    )
  }

  if (!analysis) {
    return (
      <Card className="p-6">
        <div className="text-center text-gray-400">
          <ApperIcon name="Search" className="w-12 h-12 mx-auto mb-4 opacity-50" />
          <p>Run a website analysis to see technical SEO scores</p>
        </div>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <ApperIcon name="Gauge" className="w-5 h-5 text-accent" />
            <h2 className="text-lg font-semibold text-white">Technical SEO Scorecard</h2>
          </div>
          
          {techData && (
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <div className="text-2xl font-bold text-white">{calculateOverallScore()}/100</div>
                <div className="text-xs text-gray-400">Overall Score</div>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => runTechnicalAnalysis(analysis.url)}
                disabled={loading}
              >
                <ApperIcon name="RefreshCw" className="w-4 h-4 mr-2" />
                Refresh
              </Button>
            </div>
          )}
        </div>

        {loading && (
          <div className="flex items-center justify-center py-12">
            <div className="text-center">
              <ApperIcon name="Loader2" className="w-8 h-8 text-accent animate-spin mx-auto mb-4" />
              <p className="text-white font-medium">Running technical analysis...</p>
              <p className="text-sm text-gray-400">Checking PageSpeed, mobile-friendliness, and security</p>
            </div>
          </div>
        )}

        {techData && (
          <div className="space-y-8">
            {/* Core Web Vitals */}
            <div>
              <h3 className="text-md font-semibold text-white mb-4 flex items-center">
                <ApperIcon name="Zap" className="w-4 h-4 mr-2 text-accent" />
                Core Web Vitals
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-400">First Contentful Paint</span>
                    <Badge variant={getSeverityColor(techData.pageSpeed.mobile.fcp, 'timing')}>
                      {getSeverityLabel(techData.pageSpeed.mobile.fcp, 'timing')}
                    </Badge>
                  </div>
                  <div className="text-xl font-bold text-white">
                    {(techData.pageSpeed.mobile.fcp / 1000).toFixed(1)}s
                  </div>
                  <div className="text-xs text-gray-500">Mobile</div>
                </Card>

                <Card className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-400">Largest Contentful Paint</span>
                    <Badge variant={getSeverityColor(techData.pageSpeed.mobile.lcp, 'timing')}>
                      {getSeverityLabel(techData.pageSpeed.mobile.lcp, 'timing')}
                    </Badge>
                  </div>
                  <div className="text-xl font-bold text-white">
                    {(techData.pageSpeed.mobile.lcp / 1000).toFixed(1)}s
                  </div>
                  <div className="text-xs text-gray-500">Mobile</div>
                </Card>

                <Card className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-400">Cumulative Layout Shift</span>
                    <Badge variant={getSeverityColor(parseFloat(techData.pageSpeed.mobile.cls), 'cls')}>
                      {getSeverityLabel(parseFloat(techData.pageSpeed.mobile.cls), 'cls')}
                    </Badge>
                  </div>
                  <div className="text-xl font-bold text-white">
                    {techData.pageSpeed.mobile.cls}
                  </div>
                  <div className="text-xs text-gray-500">Mobile</div>
                </Card>

                <Card className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-400">First Input Delay</span>
                    <Badge variant={getSeverityColor(techData.pageSpeed.mobile.fid, 'timing')}>
                      {getSeverityLabel(techData.pageSpeed.mobile.fid, 'timing')}
                    </Badge>
                  </div>
                  <div className="text-xl font-bold text-white">
                    {techData.pageSpeed.mobile.fid}ms
                  </div>
                  <div className="text-xs text-gray-500">Mobile</div>
                </Card>
              </div>
            </div>

            {/* Performance Scores */}
            <div>
              <h3 className="text-md font-semibold text-white mb-4 flex items-center">
                <ApperIcon name="Monitor" className="w-4 h-4 mr-2 text-accent" />
                Performance Scores
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-400">Desktop Performance</span>
                    <Badge variant={getSeverityColor(techData.pageSpeed.desktop.performance)}>
                      {getSeverityLabel(techData.pageSpeed.desktop.performance)}
                    </Badge>
                  </div>
                  <div className="text-2xl font-bold text-white">
                    {techData.pageSpeed.desktop.performance}/100
                  </div>
                </Card>

                <Card className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-400">Mobile Performance</span>
                    <Badge variant={getSeverityColor(techData.pageSpeed.mobile.performance)}>
                      {getSeverityLabel(techData.pageSpeed.mobile.performance)}
                    </Badge>
                  </div>
                  <div className="text-2xl font-bold text-white">
                    {techData.pageSpeed.mobile.performance}/100
                  </div>
                </Card>

                <Card className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-400">Mobile-Friendly</span>
                    <Badge variant={getSeverityColor(techData.mobileFriendly.score)}>
                      {getSeverityLabel(techData.mobileFriendly.score)}
                    </Badge>
                  </div>
                  <div className="text-2xl font-bold text-white">
                    {techData.mobileFriendly.score}/100
                  </div>
                </Card>
              </div>
            </div>

            {/* Security & Accessibility */}
            <div>
              <h3 className="text-md font-semibold text-white mb-4 flex items-center">
                <ApperIcon name="Shield" className="w-4 h-4 mr-2 text-accent" />
                Security & Accessibility
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-400">HTTPS</span>
                    <Badge variant={techData.security.https ? 'success' : 'error'}>
                      {techData.security.https ? 'Secure' : 'Not Secure'}
                    </Badge>
                  </div>
                  <div className="flex items-center">
                    <ApperIcon 
                      name={techData.security.https ? "Lock" : "Unlock"} 
                      className={cn("w-4 h-4 mr-2", techData.security.https ? "text-success" : "text-error")}
                    />
                    <span className="text-sm text-white">
                      {techData.security.https ? "SSL Certificate Valid" : "No SSL Certificate"}
                    </span>
                  </div>
                </Card>

                <Card className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-400">Mixed Content</span>
                    <Badge variant={!techData.security.mixedContent ? 'success' : 'warning'}>
                      {!techData.security.mixedContent ? 'Clean' : 'Issues Found'}
                    </Badge>
                  </div>
                  <div className="flex items-center">
                    <ApperIcon 
                      name={!techData.security.mixedContent ? "CheckCircle" : "AlertTriangle"} 
                      className={cn("w-4 h-4 mr-2", !techData.security.mixedContent ? "text-success" : "text-warning")}
                    />
                    <span className="text-sm text-white">
                      {!techData.security.mixedContent ? "All Secure" : "Mixed HTTP/HTTPS"}
                    </span>
                  </div>
                </Card>

                <Card className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-400">HSTS</span>
                    <Badge variant={techData.security.hsts ? 'success' : 'warning'}>
                      {techData.security.hsts ? 'Enabled' : 'Missing'}
                    </Badge>
                  </div>
                  <div className="flex items-center">
                    <ApperIcon 
                      name={techData.security.hsts ? "Shield" : "ShieldAlert"} 
                      className={cn("w-4 h-4 mr-2", techData.security.hsts ? "text-success" : "text-warning")}
                    />
                    <span className="text-sm text-white">
                      {techData.security.hsts ? "Security Headers" : "No HSTS Header"}
                    </span>
                  </div>
                </Card>

                <Card className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-400">Accessibility</span>
                    <Badge variant={getSeverityColor(techData.accessibility.score)}>
                      {getSeverityLabel(techData.accessibility.score)}
                    </Badge>
                  </div>
                  <div className="text-xl font-bold text-white mb-1">
                    {techData.accessibility.score}/100
                  </div>
                  <div className="text-xs text-gray-500">
                    {techData.accessibility.issues} issues found
                  </div>
                </Card>
              </div>
            </div>

            {/* Mobile Issues */}
            {techData.mobileFriendly.issues.length > 0 && (
              <div>
                <h3 className="text-md font-semibold text-white mb-4 flex items-center">
                  <ApperIcon name="Smartphone" className="w-4 h-4 mr-2 text-warning" />
                  Mobile Usability Issues
                </h3>
                
                <Card className="p-4">
                  <div className="space-y-2">
                    {techData.mobileFriendly.issues.map((issue, index) => (
                      <div key={index} className="flex items-center space-x-3 py-2">
                        <ApperIcon name="AlertTriangle" className="w-4 h-4 text-warning flex-shrink-0" />
                        <span className="text-sm text-white">{issue}</span>
                        <Badge variant="warning">High Priority</Badge>
                      </div>
                    ))}
                  </div>
                </Card>
              </div>
            )}
          </div>
        )}
      </Card>
    </div>
  )
}

export default TechnicalSeoScorecard