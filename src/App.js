import React, { useState, useEffect, useCallback } from 'react'

import BeerCard from './components/BeerCard.js'
import BeerList from './components/BeerList.js'

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

  // const onSelectBeer = useCallback((event, id) => {
  //   setSelectedBeerId(id)
  //   fetchBeerById()
  // }, [selectedBeerId])

  useEffect(() => {
    function handleWindowMouseMove(event, details) {
      setSelectedBeerId(details.id)
      fetchBeerById()
    }
    // Note: this implementation is a bit simplified
    window.addEventListener('on-select-beer', handleWindowMouseMove);
    return () => window.removeEventListener('on-select-beer', handleWindowMouseMove);
  }, []);

  return (
    <div className="App">
      <BeerCard { ...selectedBeer } />
      {/* <BeerSearchPanel /> */}
      <BeerList />
    </div>
  )
}
