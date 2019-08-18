import React, { useState, useEffect, useCallback } from 'react'

import BeerCard from './components/BeerCard.js'
import BeerSearchPanel from './components/BeerSearchPanel.js'

import './App.css'

export default function App() {
  const [selectedBeerId, setSelectedBeerId] = useState(0)
  const [selectedBeer, setSelectedBeer] = useState({
    id: 0,
    image_url: '',
    name: '',
    description: '',
    abv: 0
  })

  const fetchBeerById = async () => {
    const url = `https://api.punkapi.com/v2/beers?id=${ selectedBeerId }`
    const response = await fetch(url)
    const json = await response.json()
    setSelectedBeer(json[0])
  }

  return (
    <div className="App">
      <BeerCard { ...selectedBeer } />
      <BeerSearchPanel />
    </div>
  )
}
