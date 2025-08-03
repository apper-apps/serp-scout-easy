import competitorsData from "@/services/mockData/competitors.json"

// Simulate network delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

class CompetitorService {
  constructor() {
    this.data = [...competitorsData]
  }

  async getAll() {
    await delay(400)
    return [...this.data]
  }

  async getById(id) {
    await delay(200)
    const competitor = this.data.find(item => item.Id === parseInt(id))
    if (!competitor) {
      throw new Error("Competitor not found")
    }
    return { ...competitor }
  }

  async create(competitorData) {
    await delay(300)
    const maxId = this.data.length > 0 ? Math.max(...this.data.map(item => item.Id)) : 0
    const newCompetitor = {
      Id: maxId + 1,
      ...competitorData
    }
    this.data.push(newCompetitor)
    return { ...newCompetitor }
  }

  async update(id, updates) {
    await delay(250)
    const index = this.data.findIndex(item => item.Id === parseInt(id))
    if (index === -1) {
      throw new Error("Competitor not found")
    }
    this.data[index] = { ...this.data[index], ...updates }
    return { ...this.data[index] }
  }

  async delete(id) {
    await delay(200)
    const index = this.data.findIndex(item => item.Id === parseInt(id))
    if (index === -1) {
      throw new Error("Competitor not found")
    }
    const deleted = this.data.splice(index, 1)[0]
    return { ...deleted }
  }

  async getTopCompetitors(limit = 3) {
    await delay(350)
    return [...this.data].slice(0, limit)
  }
}

export const competitorService = new CompetitorService()