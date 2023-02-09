import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import ButtonBar from '../ButtonBar'

const putShipsAtRandom = jest.fn()
const removeAllShips = jest.fn()

describe('PlaceButton', () => {
  it('renders placeButton with proper text', () => {
    render(<ButtonBar />)
    const placeButton = screen.getByText(/Place at random/i)
    expect(placeButton).toBeInTheDocument()
  })
  it('calls the putShipsAtRandom function when the putShipsAtRandom button is clicked', () => {
    render(
      <ButtonBar
        putShipsAtRandom={putShipsAtRandom}
        removeAllShips={removeAllShips}
      />
    )
    const placeButton = screen.getByText(/Place at random/i)
    fireEvent.click(placeButton)
    expect(putShipsAtRandom).toHaveBeenCalled()
  })
})

describe('RemoveButton', () => {
  it('renders removeButton with proper text', () => {
    render(<ButtonBar />)
    const removeButton = screen.getByText(/Remove ships/i)
    expect(removeButton).toBeInTheDocument()
  })

  it('calls the removeAllShips function when the removeAllShips button is clicked', () => {
    render(
      <ButtonBar
        putShipsAtRandom={putShipsAtRandom}
        removeAllShips={removeAllShips}
      />
    )
    const removeButton = screen.getByText(/Remove ships/i)
    fireEvent.click(removeButton)
    expect(removeAllShips).toHaveBeenCalled()
  })
})
