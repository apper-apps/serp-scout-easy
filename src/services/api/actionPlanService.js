import actionPlansData from "@/services/mockData/actionPlans.json"

// Simulate network delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

class ActionPlanService {
  constructor() {
    this.data = [...actionPlansData]
  }

  async getAll() {
    await delay(300)
    return [...this.data]
  }

  async getById(id) {
    await delay(200)
    const plan = this.data.find(item => item.Id === parseInt(id))
    if (!plan) {
      throw new Error("Action plan not found")
    }
    return { ...plan }
  }

async generatePlan(analysisData) {
    await delay(600)
    
    // Generate dynamic plan based on actual analysis data
    const maxId = this.data.length > 0 ? Math.max(...this.data.map(item => item.Id)) : 0
    const planId = maxId + 1
    
    // Create dynamic weekly tasks based on analysis
    const weeklyTasks = this.generateWeeklyTasks(analysisData)
    const monthlyTasks = this.generateMonthlyTasks(analysisData)
    const technicalIssues = this.generateTechnicalIssues(analysisData)
    const internalLinks = this.generateInternalLinks(analysisData)
    
    const plan = {
      Id: planId,
      analysisId: analysisData.analysisId,
      weekly: weeklyTasks,
      monthly: monthlyTasks,
      internalLinks: internalLinks,
      technicalIssues: technicalIssues
    }
    
    // Remove existing plan for this analysis if it exists
    this.data = this.data.filter(p => p.analysisId !== analysisData.analysisId)
    this.data.push(plan)
    
    return { ...plan }
  }

  generateWeeklyTasks(analysisData) {
    const tasks = []
    let taskId = 1
    
    // Title optimization based on analysis
    if (analysisData.technicalScore < 70) {
      tasks.push({
        Id: taskId++,
        title: `Optimize ${analysisData.url} Title Tags`,
        description: `Update title tags to include primary keywords and improve SEO score from ${analysisData.technicalScore}%`,
        category: "On-Page SEO",
        priority: "High",
        estimatedTime: "2 hours",
        searchIntent: "Commercial"
      })
    }
    
    // Schema markup based on business type
    if (analysisData.businessType) {
      tasks.push({
        Id: taskId++,
        title: `Create ${analysisData.businessType} Schema`,
        description: `Implement structured data markup specific to ${analysisData.businessType} business type`,
        category: "Technical SEO",
        priority: "High",
        estimatedTime: "3 hours",
        searchIntent: "Informational"
      })
    }
    
    // Performance optimization
    if (analysisData.performanceScore < 80) {
      tasks.push({
        Id: taskId++,
        title: "Improve Page Performance",
        description: `Optimize page speed and performance metrics (current score: ${analysisData.performanceScore}%)`,
        category: "Technical SEO",
        priority: "High",
        estimatedTime: "4 hours",
        searchIntent: "Informational"
      })
    }
    
    // Meta description optimization
    tasks.push({
      Id: taskId++,
      title: "Optimize Meta Descriptions",
      description: `Rewrite meta descriptions for ${analysisData.url} to improve CTR from SERP`,
      category: "On-Page SEO",
      priority: "Medium",
      estimatedTime: "2 hours",
      searchIntent: "Commercial"
    })
    
    return tasks
  }

  generateMonthlyTasks(analysisData) {
    const tasks = []
    let taskId = 8
    
    // Content strategy based on business type
    if (analysisData.businessType) {
      tasks.push({
        Id: taskId++,
        title: `${analysisData.businessType} Content Strategy`,
        description: `Develop content strategy targeting ${analysisData.businessType} industry keywords and topics`,
        category: "Content Strategy",
        priority: "High",
        estimatedTime: "12 hours",
        searchIntent: "Informational"
      })
    }
    
    // Competitor analysis integration
    tasks.push({
      Id: taskId++,
      title: "Competitive Analysis Implementation",
      description: "Analyze top competitors and implement strategies to improve market position",
      category: "Strategy",
      priority: "High",
      estimatedTime: "16 hours",
      searchIntent: "Commercial"
    })
    
    return tasks
  }

  generateTechnicalIssues(analysisData) {
    const issues = []
    let issueId = 1
    
    if (analysisData.performanceScore < 70) {
      issues.push({
        Id: issueId++,
        issue: "Page Load Speed",
        description: `Performance score is ${analysisData.performanceScore}%, needs optimization`,
        priority: "High",
        solution: "Optimize images, enable compression, and minimize JavaScript"
      })
    }
    
    if (analysisData.technicalScore < 80) {
      issues.push({
        Id: issueId++,
        issue: "Technical SEO Issues",
        description: `Technical SEO score is ${analysisData.technicalScore}%, multiple issues detected`,
        priority: "High",
        solution: "Fix meta tags, improve internal linking, and implement schema markup"
      })
    }
    
    return issues
  }

  generateInternalLinks(analysisData) {
    return [
      {
        Id: 1,
        sourcePage: "Homepage",
        destinationPage: `${analysisData.businessType || 'Main'} Services`,
        anchorText: `professional ${analysisData.businessType || 'business'} services`,
        context: `Learn more about our professional ${analysisData.businessType || 'business'} services`
      }
    ]
  }

  async create(planData) {
    await delay(400)
    const maxId = this.data.length > 0 ? Math.max(...this.data.map(item => item.Id)) : 0
    const newPlan = {
      Id: maxId + 1,
      ...planData
    }
    this.data.push(newPlan)
    return { ...newPlan }
  }

  async update(id, updates) {
    await delay(300)
    const index = this.data.findIndex(item => item.Id === parseInt(id))
    if (index === -1) {
      throw new Error("Action plan not found")
    }
    this.data[index] = { ...this.data[index], ...updates }
    return { ...this.data[index] }
  }

  async delete(id) {
    await delay(250)
    const index = this.data.findIndex(item => item.Id === parseInt(id))
    if (index === -1) {
      throw new Error("Action plan not found")
    }
    const deleted = this.data.splice(index, 1)[0]
    return { ...deleted }
  }
}

export const actionPlanService = new ActionPlanService()