import React, { useState } from "react"
import Button from "@/components/atoms/Button"
import Input from "@/components/atoms/Input"
import ApperIcon from "@/components/ApperIcon"

const SearchInput = ({ onAnalyze, loading = false, placeholder = "Enter website URL..." }) => {
  const [url, setUrl] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()
    if (url.trim() && onAnalyze) {
      onAnalyze(url.trim())
    }
  }

  const isValidUrl = (string) => {
    try {
      new URL(string)
      return true
    } catch (_) {
      return false
    }
  }

  const formatUrl = (input) => {
    if (!input) return ""
    if (!input.startsWith("http://") && !input.startsWith("https://")) {
      return `https://${input}`
    }
    return input
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-3">
      <div className="flex-1">
        <Input
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder={placeholder}
          className="text-base"
          disabled={loading}
        />
      </div>
      <Button
        type="submit"
        size="lg"
        disabled={loading || !url.trim() || !isValidUrl(formatUrl(url))}
        className="px-8"
      >
        {loading ? (
          <>
            <ApperIcon name="Loader2" className="w-5 h-5 mr-2 animate-spin" />
            Analyzing...
          </>
        ) : (
          <>
            <ApperIcon name="Search" className="w-5 h-5 mr-2" />
            Analyze
          </>
        )}
      </Button>
    </form>
  )
}

export default SearchInput