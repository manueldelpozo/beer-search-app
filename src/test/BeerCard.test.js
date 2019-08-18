import React from 'react'
import ReactDOM from 'react-dom'
import BeerCard from '../components/BeerCard'

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<BeerCard />, div)
  ReactDOM.unmountComponentAtNode(div)
})