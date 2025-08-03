import entitiesData from "@/services/mockData/entities.json"
import lsiTermsData from "@/services/mockData/lsiTerms.json"

// Simulate network delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

class EntityService {
  constructor() {
    this.entities = [...entitiesData]
    this.lsiTerms = [...lsiTermsData]
  }

  async getEntities() {
    await delay(300)
    return [...this.entities]
  }

  async getLsiTerms() {
    await delay(250)
    return [...this.lsiTerms]
  }

  async getEntityById(id) {
    await delay(200)
    const entity = this.entities.find(item => item.Id === parseInt(id))
    if (!entity) {
      throw new Error("Entity not found")
    }
    return { ...entity }
  }

  async getLsiTermById(id) {
    await delay(200)
    const term = this.lsiTerms.find(item => item.Id === parseInt(id))
    if (!term) {
      throw new Error("LSI term not found")
    }
    return { ...term }
  }

  async getEntitiesByCategory(category) {
    await delay(300)
    return [...this.entities].filter(entity => entity.category === category)
  }

  async getLsiTermsByRelevance(minRelevance = 70) {
    await delay(250)
    return [...this.lsiTerms].filter(term => term.relevance >= minRelevance)
  }

  async createEntity(entityData) {
    await delay(300)
    const maxId = this.entities.length > 0 ? Math.max(...this.entities.map(item => item.Id)) : 0
    const newEntity = {
      Id: maxId + 1,
      ...entityData
    }
    this.entities.push(newEntity)
    return { ...newEntity }
  }

  async createLsiTerm(termData) {
    await delay(300)
    const maxId = this.lsiTerms.length > 0 ? Math.max(...this.lsiTerms.map(item => item.Id)) : 0
    const newTerm = {
      Id: maxId + 1,
      ...termData
    }
    this.lsiTerms.push(newTerm)
    return { ...newTerm }
  }

  async updateEntity(id, updates) {
    await delay(250)
    const index = this.entities.findIndex(item => item.Id === parseInt(id))
    if (index === -1) {
      throw new Error("Entity not found")
    }
    this.entities[index] = { ...this.entities[index], ...updates }
    return { ...this.entities[index] }
  }

  async updateLsiTerm(id, updates) {
    await delay(250)
    const index = this.lsiTerms.findIndex(item => item.Id === parseInt(id))
    if (index === -1) {
      throw new Error("LSI term not found")
    }
    this.lsiTerms[index] = { ...this.lsiTerms[index], ...updates }
    return { ...this.lsiTerms[index] }
  }

  async deleteEntity(id) {
    await delay(200)
    const index = this.entities.findIndex(item => item.Id === parseInt(id))
    if (index === -1) {
      throw new Error("Entity not found")
    }
    const deleted = this.entities.splice(index, 1)[0]
    return { ...deleted }
  }

  async deleteLsiTerm(id) {
    await delay(200)
    const index = this.lsiTerms.findIndex(item => item.Id === parseInt(id))
    if (index === -1) {
      throw new Error("LSI term not found")
    }
    const deleted = this.lsiTerms.splice(index, 1)[0]
    return { ...deleted }
  }
}

export const entityService = new EntityService()