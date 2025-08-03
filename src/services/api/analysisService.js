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
    const newAnalysis = {
      Id: maxId + 1,
      ...analysisData,
      timestamp: new Date().toISOString()
    }
    this.data.push(newAnalysis)
    return { ...newAnalysis }
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