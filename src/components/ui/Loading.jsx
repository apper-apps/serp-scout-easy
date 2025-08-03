import React from "react"
import ApperIcon from "@/components/ApperIcon"

const Loading = ({ message = "Loading data..." }) => {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-6">
      <div className="relative">
        <div className="w-16 h-16 border-4 border-secondary rounded-full animate-spin border-t-accent"></div>
        <ApperIcon name="Search" className="w-6 h-6 text-accent absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
      </div>
      <h3 className="text-lg font-semibold text-white mt-4">Analyzing...</h3>
      <p className="text-gray-400 text-center max-w-md mt-2">
        {message}
      </p>
      <div className="flex items-center space-x-2 mt-4">
        <div className="w-2 h-2 bg-accent rounded-full animate-bounce"></div>
        <div className="w-2 h-2 bg-accent rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
        <div className="w-2 h-2 bg-accent rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
      </div>
    </div>
  )
}

export default Loading