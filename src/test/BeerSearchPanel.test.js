import React from 'react'
import { render, fireEvent, wait, waitForElement } from '@testing-library/react'
import BeerSearchPanel from '../components/BeerSearchPanel'
import * as errorMessages from '../constants/errorMessages'

describe('BeerSearchPanel component loads and displays the items of a BeerList component', () => {
    test('does not display any beer initially', async () => {
        const { getByTestId } = render(<BeerSearchPanel />)
        const beerList = await waitForElement(() => getByTestId('beer-list'))
        
        expect(beerList.children).toHaveLength(0)
    })

    test('loads and displays a list of beers by name after submiting search form', async () => {
        const { container, getByTestId } = render(<BeerSearchPanel />)
        const input = container.querySelector('input')

        fireEvent.change(input, { target: { value: 'ale' } })
        fireEvent.click(getByTestId('search-button'))
        
        await wait(() => {
            const beerList = getByTestId('beer-list')
            expect(beerList.children).not.toHaveLength(0)
        })
    })

    test('loads and displays a list of beers by before brewed date after changing radio and submiting search form', async () => {
        const { container, getByDisplayValue, getByTestId } = render(<BeerSearchPanel />)
        const input = container.querySelector('input')
 
        fireEvent.change(input, { target: { value: '12-2009' } })
        fireEvent.click(getByDisplayValue('brewed_before'))
        fireEvent.click(getByTestId('search-button'))
        
        await wait(() => {
            const beerList = getByTestId('beer-list')
            expect(beerList.children).not.toHaveLength(0)
        })
    })
})
