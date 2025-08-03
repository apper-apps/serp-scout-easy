import React, { useState, useRef, useEffect } from 'react'
import Button from '@/components/atoms/Button'
import ApperIcon from '@/components/ApperIcon'

const LOCATIONS = [
  // United States - States
  { id: 'us-al', name: 'Alabama, US', country: 'United States', type: 'state' },
  { id: 'us-ak', name: 'Alaska, US', country: 'United States', type: 'state' },
  { id: 'us-az', name: 'Arizona, US', country: 'United States', type: 'state' },
  { id: 'us-ar', name: 'Arkansas, US', country: 'United States', type: 'state' },
  { id: 'us-ca', name: 'California, US', country: 'United States', type: 'state' },
  { id: 'us-co', name: 'Colorado, US', country: 'United States', type: 'state' },
  { id: 'us-ct', name: 'Connecticut, US', country: 'United States', type: 'state' },
  { id: 'us-de', name: 'Delaware, US', country: 'United States', type: 'state' },
  { id: 'us-fl', name: 'Florida, US', country: 'United States', type: 'state' },
  { id: 'us-ga', name: 'Georgia, US', country: 'United States', type: 'state' },
  { id: 'us-hi', name: 'Hawaii, US', country: 'United States', type: 'state' },
  { id: 'us-id', name: 'Idaho, US', country: 'United States', type: 'state' },
  { id: 'us-il', name: 'Illinois, US', country: 'United States', type: 'state' },
  { id: 'us-in', name: 'Indiana, US', country: 'United States', type: 'state' },
  { id: 'us-ia', name: 'Iowa, US', country: 'United States', type: 'state' },
  { id: 'us-ks', name: 'Kansas, US', country: 'United States', type: 'state' },
  { id: 'us-ky', name: 'Kentucky, US', country: 'United States', type: 'state' },
  { id: 'us-la', name: 'Louisiana, US', country: 'United States', type: 'state' },
  { id: 'us-me', name: 'Maine, US', country: 'United States', type: 'state' },
  { id: 'us-md', name: 'Maryland, US', country: 'United States', type: 'state' },
  { id: 'us-ma', name: 'Massachusetts, US', country: 'United States', type: 'state' },
  { id: 'us-mi', name: 'Michigan, US', country: 'United States', type: 'state' },
  { id: 'us-mn', name: 'Minnesota, US', country: 'United States', type: 'state' },
  { id: 'us-ms', name: 'Mississippi, US', country: 'United States', type: 'state' },
  { id: 'us-mo', name: 'Missouri, US', country: 'United States', type: 'state' },
  { id: 'us-mt', name: 'Montana, US', country: 'United States', type: 'state' },
  { id: 'us-ne', name: 'Nebraska, US', country: 'United States', type: 'state' },
  { id: 'us-nv', name: 'Nevada, US', country: 'United States', type: 'state' },
  { id: 'us-nh', name: 'New Hampshire, US', country: 'United States', type: 'state' },
  { id: 'us-nj', name: 'New Jersey, US', country: 'United States', type: 'state' },
  { id: 'us-nm', name: 'New Mexico, US', country: 'United States', type: 'state' },
  { id: 'us-ny', name: 'New York, US', country: 'United States', type: 'state' },
  { id: 'us-nc', name: 'North Carolina, US', country: 'United States', type: 'state' },
  { id: 'us-nd', name: 'North Dakota, US', country: 'United States', type: 'state' },
  { id: 'us-oh', name: 'Ohio, US', country: 'United States', type: 'state' },
  { id: 'us-ok', name: 'Oklahoma, US', country: 'United States', type: 'state' },
  { id: 'us-or', name: 'Oregon, US', country: 'United States', type: 'state' },
  { id: 'us-pa', name: 'Pennsylvania, US', country: 'United States', type: 'state' },
  { id: 'us-ri', name: 'Rhode Island, US', country: 'United States', type: 'state' },
  { id: 'us-sc', name: 'South Carolina, US', country: 'United States', type: 'state' },
  { id: 'us-sd', name: 'South Dakota, US', country: 'United States', type: 'state' },
  { id: 'us-tn', name: 'Tennessee, US', country: 'United States', type: 'state' },
  { id: 'us-tx', name: 'Texas, US', country: 'United States', type: 'state' },
  { id: 'us-ut', name: 'Utah, US', country: 'United States', type: 'state' },
  { id: 'us-vt', name: 'Vermont, US', country: 'United States', type: 'state' },
  { id: 'us-va', name: 'Virginia, US', country: 'United States', type: 'state' },
  { id: 'us-wa', name: 'Washington, US', country: 'United States', type: 'state' },
  { id: 'us-wv', name: 'West Virginia, US', country: 'United States', type: 'state' },
  { id: 'us-wi', name: 'Wisconsin, US', country: 'United States', type: 'state' },
  { id: 'us-wy', name: 'Wyoming, US', country: 'United States', type: 'state' },
  
  // Major US Cities
  { id: 'us-nyc', name: 'New York City, NY', country: 'United States', type: 'city' },
  { id: 'us-la', name: 'Los Angeles, CA', country: 'United States', type: 'city' },
  { id: 'us-chicago', name: 'Chicago, IL', country: 'United States', type: 'city' },
  { id: 'us-houston', name: 'Houston, TX', country: 'United States', type: 'city' },
  { id: 'us-phoenix', name: 'Phoenix, AZ', country: 'United States', type: 'city' },
  { id: 'us-philadelphia', name: 'Philadelphia, PA', country: 'United States', type: 'city' },
  { id: 'us-san-antonio', name: 'San Antonio, TX', country: 'United States', type: 'city' },
  { id: 'us-san-diego', name: 'San Diego, CA', country: 'United States', type: 'city' },
  { id: 'us-dallas', name: 'Dallas, TX', country: 'United States', type: 'city' },
  { id: 'us-san-jose', name: 'San Jose, CA', country: 'United States', type: 'city' },
  { id: 'us-austin', name: 'Austin, TX', country: 'United States', type: 'city' },
  { id: 'us-jacksonville', name: 'Jacksonville, FL', country: 'United States', type: 'city' },
  { id: 'us-san-francisco', name: 'San Francisco, CA', country: 'United States', type: 'city' },
  { id: 'us-columbus', name: 'Columbus, OH', country: 'United States', type: 'city' },
  { id: 'us-charlotte', name: 'Charlotte, NC', country: 'United States', type: 'city' },
  { id: 'us-fort-worth', name: 'Fort Worth, TX', country: 'United States', type: 'city' },
  { id: 'us-detroit', name: 'Detroit, MI', country: 'United States', type: 'city' },
  { id: 'us-el-paso', name: 'El Paso, TX', country: 'United States', type: 'city' },
  { id: 'us-memphis', name: 'Memphis, TN', country: 'United States', type: 'city' },
  { id: 'us-seattle', name: 'Seattle, WA', country: 'United States', type: 'city' },
  { id: 'us-denver', name: 'Denver, CO', country: 'United States', type: 'city' },
  { id: 'us-washington', name: 'Washington, DC', country: 'United States', type: 'city' },
  { id: 'us-boston', name: 'Boston, MA', country: 'United States', type: 'city' },
  { id: 'us-nashville', name: 'Nashville, TN', country: 'United States', type: 'city' },
  { id: 'us-baltimore', name: 'Baltimore, MD', country: 'United States', type: 'city' },
  { id: 'us-oklahoma-city', name: 'Oklahoma City, OK', country: 'United States', type: 'city' },
  { id: 'us-portland', name: 'Portland, OR', country: 'United States', type: 'city' },
  { id: 'us-las-vegas', name: 'Las Vegas, NV', country: 'United States', type: 'city' },
  { id: 'us-milwaukee', name: 'Milwaukee, WI', country: 'United States', type: 'city' },
  { id: 'us-albuquerque', name: 'Albuquerque, NM', country: 'United States', type: 'city' },
  { id: 'us-tucson', name: 'Tucson, AZ', country: 'United States', type: 'city' },
  { id: 'us-fresno', name: 'Fresno, CA', country: 'United States', type: 'city' },
  { id: 'us-sacramento', name: 'Sacramento, CA', country: 'United States', type: 'city' },
  { id: 'us-mesa', name: 'Mesa, AZ', country: 'United States', type: 'city' },
  { id: 'us-kansas-city', name: 'Kansas City, MO', country: 'United States', type: 'city' },
  { id: 'us-atlanta', name: 'Atlanta, GA', country: 'United States', type: 'city' },
  { id: 'us-omaha', name: 'Omaha, NE', country: 'United States', type: 'city' },
  { id: 'us-colorado-springs', name: 'Colorado Springs, CO', country: 'United States', type: 'city' },
  { id: 'us-raleigh', name: 'Raleigh, NC', country: 'United States', type: 'city' },
  { id: 'us-miami', name: 'Miami, FL', country: 'United States', type: 'city' },
  { id: 'us-virginia-beach', name: 'Virginia Beach, VA', country: 'United States', type: 'city' },
  
  // International Countries
  { id: 'ca', name: 'Canada', country: 'Canada', type: 'country' },
  { id: 'uk', name: 'United Kingdom', country: 'United Kingdom', type: 'country' },
  { id: 'au', name: 'Australia', country: 'Australia', type: 'country' },
  { id: 'de', name: 'Germany', country: 'Germany', type: 'country' },
  { id: 'fr', name: 'France', country: 'France', type: 'country' },
  { id: 'it', name: 'Italy', country: 'Italy', type: 'country' },
  { id: 'es', name: 'Spain', country: 'Spain', type: 'country' },
  { id: 'nl', name: 'Netherlands', country: 'Netherlands', type: 'country' },
  { id: 'be', name: 'Belgium', country: 'Belgium', type: 'country' },
  { id: 'ch', name: 'Switzerland', country: 'Switzerland', type: 'country' },
  { id: 'at', name: 'Austria', country: 'Austria', type: 'country' },
  { id: 'se', name: 'Sweden', country: 'Sweden', type: 'country' },
  { id: 'no', name: 'Norway', country: 'Norway', type: 'country' },
  { id: 'dk', name: 'Denmark', country: 'Denmark', type: 'country' },
  { id: 'fi', name: 'Finland', country: 'Finland', type: 'country' },
  { id: 'ie', name: 'Ireland', country: 'Ireland', type: 'country' },
  { id: 'pt', name: 'Portugal', country: 'Portugal', type: 'country' },
  { id: 'pl', name: 'Poland', country: 'Poland', type: 'country' },
  { id: 'cz', name: 'Czech Republic', country: 'Czech Republic', type: 'country' },
  { id: 'hu', name: 'Hungary', country: 'Hungary', type: 'country' },
  { id: 'gr', name: 'Greece', country: 'Greece', type: 'country' },
  { id: 'tr', name: 'Turkey', country: 'Turkey', type: 'country' },
  { id: 'ru', name: 'Russia', country: 'Russia', type: 'country' },
  { id: 'jp', name: 'Japan', country: 'Japan', type: 'country' },
  { id: 'kr', name: 'South Korea', country: 'South Korea', type: 'country' },
  { id: 'cn', name: 'China', country: 'China', type: 'country' },
  { id: 'in', name: 'India', country: 'India', type: 'country' },
  { id: 'br', name: 'Brazil', country: 'Brazil', type: 'country' },
  { id: 'mx', name: 'Mexico', country: 'Mexico', type: 'country' },
  { id: 'ar', name: 'Argentina', country: 'Argentina', type: 'country' },
  { id: 'cl', name: 'Chile', country: 'Chile', type: 'country' },
  { id: 'co', name: 'Colombia', country: 'Colombia', type: 'country' },
  { id: 'pe', name: 'Peru', country: 'Peru', type: 'country' },
  { id: 'za', name: 'South Africa', country: 'South Africa', type: 'country' },
  { id: 'eg', name: 'Egypt', country: 'Egypt', type: 'country' },
  { id: 'ng', name: 'Nigeria', country: 'Nigeria', type: 'country' },
  { id: 'ke', name: 'Kenya', country: 'Kenya', type: 'country' },
  { id: 'ma', name: 'Morocco', country: 'Morocco', type: 'country' },
  { id: 'ae', name: 'United Arab Emirates', country: 'United Arab Emirates', type: 'country' },
  { id: 'sa', name: 'Saudi Arabia', country: 'Saudi Arabia', type: 'country' },
  { id: 'il', name: 'Israel', country: 'Israel', type: 'country' },
  { id: 'sg', name: 'Singapore', country: 'Singapore', type: 'country' },
  { id: 'my', name: 'Malaysia', country: 'Malaysia', type: 'country' },
  { id: 'th', name: 'Thailand', country: 'Thailand', type: 'country' },
  { id: 'vn', name: 'Vietnam', country: 'Vietnam', type: 'country' },
  { id: 'ph', name: 'Philippines', country: 'Philippines', type: 'country' },
  { id: 'id', name: 'Indonesia', country: 'Indonesia', type: 'country' },
  
  // Major International Cities
  { id: 'ca-toronto', name: 'Toronto, Canada', country: 'Canada', type: 'city' },
  { id: 'ca-vancouver', name: 'Vancouver, Canada', country: 'Canada', type: 'city' },
  { id: 'ca-montreal', name: 'Montreal, Canada', country: 'Canada', type: 'city' },
  { id: 'uk-london', name: 'London, UK', country: 'United Kingdom', type: 'city' },
  { id: 'uk-manchester', name: 'Manchester, UK', country: 'United Kingdom', type: 'city' },
  { id: 'uk-birmingham', name: 'Birmingham, UK', country: 'United Kingdom', type: 'city' },
  { id: 'au-sydney', name: 'Sydney, Australia', country: 'Australia', type: 'city' },
  { id: 'au-melbourne', name: 'Melbourne, Australia', country: 'Australia', type: 'city' },
  { id: 'au-brisbane', name: 'Brisbane, Australia', country: 'Australia', type: 'city' },
  { id: 'de-berlin', name: 'Berlin, Germany', country: 'Germany', type: 'city' },
  { id: 'de-munich', name: 'Munich, Germany', country: 'Germany', type: 'city' },
  { id: 'de-hamburg', name: 'Hamburg, Germany', country: 'Germany', type: 'city' },
  { id: 'fr-paris', name: 'Paris, France', country: 'France', type: 'city' },
  { id: 'fr-marseille', name: 'Marseille, France', country: 'France', type: 'city' },
  { id: 'fr-lyon', name: 'Lyon, France', country: 'France', type: 'city' },
  { id: 'it-rome', name: 'Rome, Italy', country: 'Italy', type: 'city' },
  { id: 'it-milan', name: 'Milan, Italy', country: 'Italy', type: 'city' },
  { id: 'it-naples', name: 'Naples, Italy', country: 'Italy', type: 'city' },
  { id: 'es-madrid', name: 'Madrid, Spain', country: 'Spain', type: 'city' },
  { id: 'es-barcelona', name: 'Barcelona, Spain', country: 'Spain', type: 'city' },
  { id: 'es-valencia', name: 'Valencia, Spain', country: 'Spain', type: 'city' },
  { id: 'nl-amsterdam', name: 'Amsterdam, Netherlands', country: 'Netherlands', type: 'city' },
  { id: 'nl-rotterdam', name: 'Rotterdam, Netherlands', country: 'Netherlands', type: 'city' },
  { id: 'jp-tokyo', name: 'Tokyo, Japan', country: 'Japan', type: 'city' },
  { id: 'jp-osaka', name: 'Osaka, Japan', country: 'Japan', type: 'city' },
  { id: 'kr-seoul', name: 'Seoul, South Korea', country: 'South Korea', type: 'city' },
  { id: 'cn-beijing', name: 'Beijing, China', country: 'China', type: 'city' },
  { id: 'cn-shanghai', name: 'Shanghai, China', country: 'China', type: 'city' },
  { id: 'in-mumbai', name: 'Mumbai, India', country: 'India', type: 'city' },
  { id: 'in-delhi', name: 'Delhi, India', country: 'India', type: 'city' },
  { id: 'br-sao-paulo', name: 'São Paulo, Brazil', country: 'Brazil', type: 'city' },
  { id: 'br-rio', name: 'Rio de Janeiro, Brazil', country: 'Brazil', type: 'city' },
  { id: 'mx-mexico-city', name: 'Mexico City, Mexico', country: 'Mexico', type: 'city' },
  { id: 'sg-singapore', name: 'Singapore', country: 'Singapore', type: 'city' }
]

const LocationSelector = ({ selectedLocation, onLocationChange, disabled = false }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [focusedIndex, setFocusedIndex] = useState(-1)
  const dropdownRef = useRef(null)
  const searchInputRef = useRef(null)

  const filteredLocations = LOCATIONS.filter(location =>
    location.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    location.country.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const currentLocation = selectedLocation 
    ? LOCATIONS.find(loc => loc.id === selectedLocation) || { name: 'Global (No Location)', id: null }
    : { name: 'Global (No Location)', id: null }

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false)
        setSearchTerm('')
        setFocusedIndex(-1)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  useEffect(() => {
    if (isOpen && searchInputRef.current) {
      searchInputRef.current.focus()
    }
  }, [isOpen])

  const handleLocationSelect = (location) => {
    onLocationChange(location.id)
    setIsOpen(false)
    setSearchTerm('')
    setFocusedIndex(-1)
  }

  const handleKeyDown = (e) => {
    if (!isOpen) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault()
        setIsOpen(true)
      }
      return
    }

    switch (e.key) {
      case 'Escape':
        setIsOpen(false)
        setSearchTerm('')
        setFocusedIndex(-1)
        break
      case 'ArrowDown':
        e.preventDefault()
        setFocusedIndex(prev => 
          prev < filteredLocations.length - 1 ? prev + 1 : prev
        )
        break
      case 'ArrowUp':
        e.preventDefault()
        setFocusedIndex(prev => prev > 0 ? prev - 1 : -1)
        break
      case 'Enter':
        e.preventDefault()
        if (focusedIndex >= 0 && focusedIndex < filteredLocations.length) {
          handleLocationSelect(filteredLocations[focusedIndex])
        }
        break
    }
  }

  const getLocationIcon = (type) => {
    switch (type) {
      case 'country': return 'Globe'
      case 'state': return 'MapPin'
      case 'city': return 'Building'
      default: return 'MapPin'
    }
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <Button
        variant="outline"
        size="sm"
        onClick={() => !disabled && setIsOpen(!isOpen)}
        onKeyDown={handleKeyDown}
        disabled={disabled}
        className="flex items-center space-x-2 min-w-[200px] justify-between"
      >
        <div className="flex items-center space-x-2">
          <ApperIcon name="MapPin" className="w-4 h-4" />
          <span className="truncate">{currentLocation.name}</span>
        </div>
        <ApperIcon 
          name={isOpen ? "ChevronUp" : "ChevronDown"} 
          className="w-4 h-4 ml-2 flex-shrink-0" 
        />
      </Button>

      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-surface border border-gray-600 rounded-lg shadow-elevation z-50 max-h-80 overflow-hidden">
          <div className="p-3 border-b border-gray-600">
            <div className="relative">
              <ApperIcon name="Search" className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                ref={searchInputRef}
                type="text"
                placeholder="Search locations..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value)
                  setFocusedIndex(-1)
                }}
                onKeyDown={handleKeyDown}
                className="w-full pl-10 pr-4 py-2 bg-primary border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent"
              />
            </div>
          </div>

          <div className="max-h-60 overflow-y-auto">
            {/* Global Option */}
            <button
              className={`w-full px-4 py-3 text-left hover:bg-primary/50 transition-colors flex items-center space-x-3 ${
                !selectedLocation ? 'bg-accent/20 text-accent' : 'text-white'
              }`}
              onClick={() => handleLocationSelect({ id: null, name: 'Global (No Location)' })}
            >
              <ApperIcon name="Globe" className="w-4 h-4 flex-shrink-0" />
              <span>Global (No Location)</span>
            </button>

            {filteredLocations.length > 0 ? (
              filteredLocations.map((location, index) => (
                <button
                  key={location.id}
                  className={`w-full px-4 py-3 text-left hover:bg-primary/50 transition-colors flex items-center space-x-3 ${
                    selectedLocation === location.id ? 'bg-accent/20 text-accent' : 'text-white'
                  } ${
                    index === focusedIndex ? 'bg-primary/30' : ''
                  }`}
                  onClick={() => handleLocationSelect(location)}
                >
                  <ApperIcon name={getLocationIcon(location.type)} className="w-4 h-4 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <div className="truncate">{location.name}</div>
                    {location.type !== 'country' && (
                      <div className="text-xs text-gray-400 capitalize">{location.type}</div>
                    )}
                  </div>
                </button>
              ))
            ) : (
              <div className="px-4 py-6 text-center text-gray-400">
                <ApperIcon name="Search" className="w-8 h-8 mx-auto mb-2 opacity-50" />
                <p>No locations found</p>
                <p className="text-sm">Try adjusting your search</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default LocationSelector