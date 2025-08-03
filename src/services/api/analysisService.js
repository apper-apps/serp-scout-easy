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
    await delay(800) // Longer delay for more realistic analysis
    const maxId = this.data.length > 0 ? Math.max(...this.data.map(item => item.Id)) : 0
    
    // Enhanced realistic analysis data based on URL characteristics
    const domain = analysisData.url ? new URL(analysisData.url).hostname : 'unknown.com'
    const domainLength = domain.length
    const hasSubdomain = domain.split('.').length > 2
    const isHttps = analysisData.url?.startsWith('https://') || false
    const tld = domain.split('.').pop()
    
    // Domain quality factors that influence metrics
    const domainQualityScore = (
      (domainLength < 15 ? 10 : domainLength > 25 ? -5 : 5) + // Shorter domains generally better
      (hasSubdomain ? -3 : 7) + // Subdomains may indicate lower authority
      (isHttps ? 8 : -10) + // HTTPS is crucial
      (['com', 'org', 'net'].includes(tld) ? 5 : ['gov', 'edu'].includes(tld) ? 15 : 0) // TLD reputation
    )
    
    // Business type influences (based on detected business type)
    const businessMultipliers = {
      "E-commerce Store": { traffic: 1.5, keywords: 1.3, backlinks: 1.2 },
      "Software Company": { traffic: 1.2, keywords: 1.4, backlinks: 1.1 },
      "Healthcare Practice": { traffic: 0.8, keywords: 0.9, backlinks: 0.7 },
      "Legal Services": { traffic: 0.9, keywords: 1.1, backlinks: 0.8 },
      "Digital Marketing Agency": { traffic: 1.1, keywords: 1.2, backlinks: 1.0 }
    }
    
    const multiplier = businessMultipliers[analysisData.businessType] || { traffic: 1.0, keywords: 1.0, backlinks: 1.0 }
    
    // Generate metrics influenced by domain characteristics and business type
    const baseTraffic = Math.floor(Math.random() * 80000) + 2000
    const baseKeywords = Math.floor(Math.random() * 8000) + 300
    const baseBacklinks = Math.floor(Math.random() * 40000) + 200
    
    const newAnalysis = {
      Id: maxId + 1,
      ...analysisData,
      timestamp: new Date().toISOString(),
      metrics: {
        domainAge: Math.max(1, Math.floor(Math.random() * 20) + (domainQualityScore > 10 ? 3 : 0)), // 1-23 years
        pageCount: Math.floor(Math.random() * 2000) + 25 + (hasSubdomain ? 500 : 0), // More pages for subdomains
        backlinks: Math.floor(baseBacklinks * multiplier.backlinks * (1 + domainQualityScore / 100)),
        organicKeywords: Math.floor(baseKeywords * multiplier.keywords * (1 + domainQualityScore / 100)),
        monthlyTraffic: Math.floor(baseTraffic * multiplier.traffic * (1 + domainQualityScore / 100)),
        loadSpeed: (Math.random() * 2.5 + 1.2 - (isHttps ? 0.3 : 0)).toFixed(2), // HTTPS sites typically faster
        mobileScore: Math.max(45, Math.min(100, 75 + domainQualityScore + Math.floor(Math.random() * 20) - 10)),
        seoScore: Math.max(35, Math.min(100, 65 + domainQualityScore + Math.floor(Math.random() * 25) - 12)),
        // Additional realistic metrics
        bounceRate: Math.max(25, Math.min(85, 55 - domainQualityScore + Math.floor(Math.random() * 20))),
        avgSessionDuration: (Math.random() * 180 + 60 + (domainQualityScore > 5 ? 30 : 0)).toFixed(0), // seconds
        conversionRate: (Math.random() * 4 + 1 + (domainQualityScore > 10 ? 1 : 0)).toFixed(2) + '%'
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