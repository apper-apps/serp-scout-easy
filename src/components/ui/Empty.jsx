import React from "react"
import ApperIcon from "@/components/ApperIcon"

const Empty = ({ 
  message = "No data available", 
  description = "Complete the required steps to see results here.",
  icon = "Search"
}) => {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-6 text-center">
      <div className="w-16 h-16 bg-accent/20 rounded-full flex items-center justify-center mb-4">
        <ApperIcon name={icon} className="w-8 h-8 text-accent" />
      </div>
      <h3 className="text-lg font-semibold text-white mb-2">{message}</h3>
      <p className="text-gray-400 max-w-md">{description}</p>
    </div>
  )
}

export default Empty