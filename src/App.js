import React, { useState, useEffect, useCallback } from 'react'

import BeerCard from './components/BeerCard.js'
import BeerSearchPanel from './components/BeerSearchPanel.js'

import './App.css'

export default function App() {
  return (
    <div className="App">
      <BeerCard />
      <BeerSearchPanel />
    </div>
  )
}
