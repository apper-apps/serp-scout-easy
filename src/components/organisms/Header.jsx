import React from "react"
import ApperIcon from "@/components/ApperIcon"

const Header = () => {
  return (
    <header className="bg-surface border-b border-secondary/50 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-gradient-to-r from-accent to-success rounded-lg">
            <ApperIcon name="Search" className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold gradient-text">SERP Scout</h1>
            <p className="text-sm text-gray-400">SEO Analysis & Strategy Tool</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2 text-sm text-gray-400">
            <ApperIcon name="Activity" className="w-4 h-4" />
            <span>Real-time SERP Analysis</span>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header