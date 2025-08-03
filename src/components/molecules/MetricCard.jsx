import React from "react"
import Card from "@/components/atoms/Card"
import ApperIcon from "@/components/ApperIcon"

const MetricCard = ({ 
  title, 
  value, 
  change, 
  changeType = "neutral",
  icon, 
  subtitle,
  gradient = false 
}) => {
  const changeColors = {
    positive: "text-success",
    negative: "text-error",
    neutral: "text-gray-400"
  }

  return (
    <Card className="p-6 hover:shadow-lg transition-shadow duration-200">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-400 mb-1">{title}</p>
          <p className={`text-3xl font-bold mb-2 ${gradient ? "gradient-text" : "text-white"}`}>
            {value}
          </p>
          {subtitle && (
            <p className="text-sm text-gray-300">{subtitle}</p>
          )}
          {change && (
            <div className="flex items-center mt-2">
              <ApperIcon 
                name={changeType === "positive" ? "TrendingUp" : changeType === "negative" ? "TrendingDown" : "Minus"} 
                className={`w-4 h-4 mr-1 ${changeColors[changeType]}`} 
              />
              <span className={`text-sm font-medium ${changeColors[changeType]}`}>
                {change}
              </span>
            </div>
          )}
        </div>
        {icon && (
          <div className="p-3 bg-accent/20 rounded-lg">
            <ApperIcon name={icon} className="w-6 h-6 text-accent" />
          </div>
        )}
      </div>
    </Card>
  )
}

export default MetricCard