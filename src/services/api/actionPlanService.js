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
    // Find existing plan or create new one
    let plan = this.data.find(p => p.analysisId === analysisData.analysisId)
    
    if (!plan) {
      const maxId = this.data.length > 0 ? Math.max(...this.data.map(item => item.Id)) : 0
      plan = {
        Id: maxId + 1,
        analysisId: analysisData.analysisId,
        ...this.data[0] // Use template from first plan
      }
      this.data.push(plan)
    }
    
    return { ...plan }
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