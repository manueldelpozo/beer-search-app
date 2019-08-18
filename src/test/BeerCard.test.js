import React from 'react'
import { render, fireEvent, wait, waitForElement } from '@testing-library/react'
import BeerCard from '../components/BeerCard'

const parseAbvContentToNumber = (text) => {
    return Number(text.replace('ABV: ', '').replace(' %', ''))
}
const abvLimit = 0.5

describe('BeerCard component loads and displays a random beer', () => {
    test('loads and displays a random beer with image, name and description initially', async () => {
        const { getByTestId } = render(<BeerCard />)
        const beerImage = await waitForElement(() => getByTestId('beer-image'))
        const beerName = await waitForElement(() => getByTestId('beer-name'))
        const beerDescription = await waitForElement(() => getByTestId('beer-description'))

        await wait(() => {
            expect(beerImage.src).toBeTruthy()
            expect(beerName.textContent).toBeTruthy()
            expect(beerDescription.textContent).toBeTruthy()
        })
    }, 30000)

    test('loads and displays an alcocholic random beer on click button "Show me another beer"', async () => {
        const { getByText, getByTestId } = render(<BeerCard />)
        fireEvent.click(getByText(/Show me another beer/))
        const beerAbv = await waitForElement(() => getByTestId('beer-abv'))

        await wait(() => {
            expect(parseAbvContentToNumber(beerAbv.textContent)).toBeGreaterThan(abvLimit)
        })
    }, 30000)

    test('loads and displays a non-alcoholic random beer on click button "Show me another non-alcoholic beer"', async () => {
        const { getByText, getByTestId } = render(<BeerCard />)
        fireEvent.click(getByText(/Show me another non-alcoholic beer/))
        const beerAbv = await waitForElement(() => getByTestId('beer-abv'))

        await wait(() => {
            expect(parseAbvContentToNumber(beerAbv.textContent)).toBeLessThanOrEqual(abvLimit)
        })
    })
})
