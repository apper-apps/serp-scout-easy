import serpResultsData from "@/services/mockData/serpResults.json"

// Simulate network delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

class SerpService {
  constructor() {
    this.data = [...serpResultsData]
  }

async getAll(locationId = null) {
    await delay(500)
    
    // Return location-aware results if location is specified
    if (locationId) {
      return this.getLocationAwareResults(locationId)
    }
    
    return [...this.data]
  }

  getLocationAwareResults(locationId) {
    // Create location-specific variations of SERP results
    const locationVariations = {
      'us-ca': { multiplier: 1.1, localBoost: ['local', 'california', 'CA', 'west coast'] },
      'us-ny': { multiplier: 0.9, localBoost: ['local', 'new york', 'NY', 'east coast'] },
      'us-tx': { multiplier: 1.05, localBoost: ['local', 'texas', 'TX', 'southwest'] },
      'us-fl': { multiplier: 0.95, localBoost: ['local', 'florida', 'FL', 'southeast'] },
      'us-nyc': { multiplier: 0.85, localBoost: ['local', 'NYC', 'new york city', 'manhattan'] },
      'us-la': { multiplier: 1.15, localBoost: ['local', 'los angeles', 'LA', 'hollywood'] },
      'us-chicago': { multiplier: 0.92, localBoost: ['local', 'chicago', 'midwest', 'IL'] },
      'us-seattle': { multiplier: 1.08, localBoost: ['local', 'seattle', 'pacific northwest', 'WA'] },
      'ca': { multiplier: 0.88, localBoost: ['canadian', 'canada', 'CA', 'maple'] },
      'uk': { multiplier: 0.91, localBoost: ['british', 'UK', 'england', 'london'] },
      'au': { multiplier: 1.12, localBoost: ['australian', 'australia', 'AU', 'sydney'] },
      'de': { multiplier: 0.87, localBoost: ['german', 'germany', 'berlin', 'deutsche'] },
      'fr': { multiplier: 0.94, localBoost: ['french', 'france', 'paris', 'européen'] },
      'jp': { multiplier: 1.18, localBoost: ['japanese', 'japan', 'tokyo', 'nihon'] },
    }

    const locationConfig = locationVariations[locationId] || { multiplier: 1.0, localBoost: ['local'] }
    
    return this.data.map((item, index) => {
      // Apply location-based position shuffling
      const positionVariation = Math.floor((Math.random() - 0.5) * 4 * locationConfig.multiplier)
      const newPosition = Math.max(1, Math.min(10, item.position + positionVariation))
      
      // Add location-aware entities and LSI terms
      const locationEntities = [
        ...item.entities,
        ...locationConfig.localBoost.slice(0, 2).map(term => 
          `${term.charAt(0).toUpperCase() + term.slice(1)} Marketing`
        )
      ]
      
      const locationLsiTerms = [
        ...item.lsiTerms,
        ...locationConfig.localBoost.slice(0, 3).map(term => 
          `${term} services`
        )
      ]

      // Modify titles to include location awareness
      let locationTitle = item.title
      if (Math.random() > 0.6) { // 40% chance to modify title
        const locationTerm = locationConfig.localBoost[0]
        locationTitle = item.title.replace('Marketing', `${locationTerm.charAt(0).toUpperCase() + locationTerm.slice(1)} Marketing`)
      }

      return {
        ...item,
        position: newPosition,
        title: locationTitle,
        entities: locationEntities,
        lsiTerms: locationLsiTerms,
        locationId: locationId,
        locationAware: true
      }
    }).sort((a, b) => a.position - b.position) // Re-sort by new positions
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