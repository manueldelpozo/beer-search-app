import React from 'react'
import ReactDOM from 'react-dom'
import BeerSearchPanel from '../components/BeerSearchPanel'

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<BeerSearchPanel />, div)
  ReactDOM.unmountComponentAtNode(div)
})