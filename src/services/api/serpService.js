import serpResultsData from "@/services/mockData/serpResults.json"

// Simulate network delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

class SerpService {
  constructor() {
    this.data = [...serpResultsData]
  }

  async getAll() {
    await delay(500)
    return [...this.data]
  }

  async getById(id) {
    await delay(200)
    const result = this.data.find(item => item.Id === parseInt(id))
    if (!result) {
      throw new Error("SERP result not found")
    }
    return { ...result }
  }

  async create(resultData) {
    await delay(300)
    const maxId = this.data.length > 0 ? Math.max(...this.data.map(item => item.Id)) : 0
    const newResult = {
      Id: maxId + 1,
      ...resultData
    }
    this.data.push(newResult)
    return { ...newResult }
  }

  async update(id, updates) {
    await delay(250)
    const index = this.data.findIndex(item => item.Id === parseInt(id))
    if (index === -1) {
      throw new Error("SERP result not found")
    }
    this.data[index] = { ...this.data[index], ...updates }
    return { ...this.data[index] }
  }

  async delete(id) {
    await delay(200)
    const index = this.data.findIndex(item => item.Id === parseInt(id))
    if (index === -1) {
      throw new Error("SERP result not found")
    }
    const deleted = this.data.splice(index, 1)[0]
    return { ...deleted }
  }

  async getTopResults(limit = 10) {
    await delay(400)
    return [...this.data].slice(0, limit)
  }
}

export const serpService = new SerpService()