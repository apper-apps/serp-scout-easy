export const downloadJSON = (data, filename) => {
  const blob = new Blob([JSON.stringify(data, null, 2)], { 
    type: 'application/json' 
  })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
}

export const downloadCSV = (data, filename) => {
  const csv = convertToCSV(data)
  const blob = new Blob([csv], { type: 'text/csv' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
}

const convertToCSV = (data) => {
  if (!Array.isArray(data) || data.length === 0) {
    return ''
  }
  
  const headers = Object.keys(data[0])
  const csvContent = [
    headers.join(','),
    ...data.map(row => 
      headers.map(header => {
        const value = row[header]
        // Escape commas and quotes in CSV
        if (typeof value === 'string' && (value.includes(',') || value.includes('"'))) {
          return `"${value.replace(/"/g, '""')}"`
        }
        return value
      }).join(',')
    )
  ].join('\n')
  
  return csvContent
}

export const generateReportData = (analysis, techData, serpData, competitors) => {
  return {
    url: analysis?.url || 'N/A',
    businessType: analysis?.businessType || 'N/A',
    location: analysis?.location || 'N/A',
    generatedAt: new Date().toISOString(),
    technicalAnalysis: techData,
    serpAnalysis: {
      totalResults: serpData?.length || 0,
      topCompetitors: competitors?.slice(0, 5) || [],
      averagePosition: serpData?.length > 0 
        ? (serpData.reduce((sum, item) => sum + (item.position || 0), 0) / serpData.length).toFixed(1)
        : 'N/A'
    },
    recommendations: [
      'Optimize page loading speed',
      'Improve mobile responsiveness',
      'Enhance content quality and relevance',
      'Build high-quality backlinks',
      'Optimize meta tags and descriptions',
      'Implement structured data markup',
      'Improve internal linking structure',
      'Focus on user experience improvements'
    ],
    metrics: analysis?.metrics || {}
  }
}