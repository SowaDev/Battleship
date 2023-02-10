import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import Fleet from '../Fleet'

const mockShips = [
  {
    name: 'AircraftCarrier',
    length: 5,
  },
  {
    name: 'Battleship',
    length: 4,
  },
  {
    name: 'Cruiser',
    length: 3,
  },
  {
    name: 'Destroyer',
    length: 2,
  },
  {
    name: 'Submarine',
    length: 2,
  },
]

const setSelectedShip = jest.fn()

test('render', async () => {
  render(<Fleet ships={mockShips} />)
  const fleet = await screen.findByTestId('fleet')
  expect(fleet).toBeInTheDocument()
})

test('renders the correct number of ships', () => {
  render(<Fleet ships={mockShips} />)
  const ships = screen.getAllByRole('button')
  expect(ships.length).toBe(mockShips.length)
})

test('calls setSelectedShip correctly', () => {
  const setSelectedShip = jest.fn()
  render(<Fleet ships={mockShips} setSelectedShip={setSelectedShip} />)
  const ship = screen.getByText(mockShips[0].name)

  fireEvent.click(ship)
  expect(setSelectedShip).toHaveBeenCalledWith(mockShips[0])
})
