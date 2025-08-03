import analysesData from "@/services/mockData/analyses.json"

// Simulate network delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

class AnalysisService {
  constructor() {
    this.data = [...analysesData]
  }

  async getAll() {
    await delay(300)
    return [...this.data]
  }

  async getById(id) {
    await delay(200)
    const analysis = this.data.find(item => item.Id === parseInt(id))
    if (!analysis) {
      throw new Error("Analysis not found")
    }
    return { ...analysis }
  }

async create(analysisData) {
    await delay(400)
    const maxId = this.data.length > 0 ? Math.max(...this.data.map(item => item.Id)) : 0
    
    // Generate more realistic analysis data based on URL
    const domain = analysisData.url ? new URL(analysisData.url).hostname : 'unknown.com'
    const domainLength = domain.length
    const hasSubdomain = domain.split('.').length > 2
    
    const newAnalysis = {
      Id: maxId + 1,
      ...analysisData,
      timestamp: new Date().toISOString(),
      // Add realistic metrics based on domain characteristics
      metrics: {
        domainAge: Math.floor(Math.random() * 15) + 1, // 1-15 years
        pageCount: Math.floor(Math.random() * 1000) + 50, // 50-1050 pages
        backlinks: Math.floor(Math.random() * 50000) + 100, // 100-50100 backlinks
        organicKeywords: Math.floor(Math.random() * 10000) + 200, // 200-10200 keywords
        monthlyTraffic: Math.floor(Math.random() * 100000) + 1000, // 1K-101K visits
        loadSpeed: (Math.random() * 3 + 1).toFixed(2), // 1-4 seconds
        mobileScore: Math.floor(Math.random() * 40) + 60, // 60-100
        seoScore: Math.floor(Math.random() * 50) + 50 // 50-100
      }
    }
    this.data.push(newAnalysis)
    return { ...newAnalysis }
  }

  async downloadReport(id, format = 'json') {
    await delay(300)
    const analysis = this.data.find(item => item.Id === parseInt(id))
    if (!analysis) {
      throw new Error("Analysis not found")
    }

    // Generate comprehensive report data
    const reportData = {
      ...analysis,
      generatedAt: new Date().toISOString(),
      reportType: 'Full SEO Analysis Report',
      sections: {
        technical: {
          score: analysis.metrics?.seoScore || 75,
          loadSpeed: analysis.metrics?.loadSpeed || '2.5s',
          mobileScore: analysis.metrics?.mobileScore || 85,
          issues: ['Optimize images', 'Minify CSS', 'Enable compression']
        },
        content: {
          wordCount: Math.floor(Math.random() * 2000) + 500,
          readabilityScore: Math.floor(Math.random() * 40) + 60,
          keywordDensity: (Math.random() * 3 + 0.5).toFixed(1) + '%'
        },
        backlinks: {
          total: analysis.metrics?.backlinks || 5000,
          domains: Math.floor((analysis.metrics?.backlinks || 5000) / 10),
          quality: 'Good'
        }
      }
    }

    if (format === 'json') {
      return reportData
    }

    // For other formats, return download blob info
    return {
      filename: `seo-analysis-${analysis.Id}-${Date.now()}.${format}`,
      data: reportData,
      mimeType: format === 'pdf' ? 'application/pdf' : 'application/json'
    }
  }

  async update(id, updates) {
    await delay(300)
    const index = this.data.findIndex(item => item.Id === parseInt(id))
    if (index === -1) {
      throw new Error("Analysis not found")
    }
    this.data[index] = { ...this.data[index], ...updates }
    return { ...this.data[index] }
  }

  async delete(id) {
    await delay(250)
    const index = this.data.findIndex(item => item.Id === parseInt(id))
    if (index === -1) {
      throw new Error("Analysis not found")
    }
    const deleted = this.data.splice(index, 1)[0]
    return { ...deleted }
  }
}

export const analysisService = new AnalysisService()