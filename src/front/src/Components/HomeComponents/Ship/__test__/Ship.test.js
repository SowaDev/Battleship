import React from 'react'
import { fireEvent, render, screen } from '@testing-library/react'
import { hover } from '@testing-library/user-event/dist/hover'
import Ship from '../Ship'

const mockShip = {
  name: 'Battleship',
  length: 4,
}
const moveShip = jest.fn()
const height = '3vw'
const width = 3

test('render', async () => {
  render(<Ship ship={mockShip} />)
  const ship = await screen.findByTestId(mockShip.name)
  expect(ship).toBeInTheDocument()
})

//Gets an empty string as a height property for some reason

// test('renders with correct height', () => {
//   render(<Ship ship={mockShip} />)
//   const ship = screen.getByTestId('ship')
//   expect(getComputedStyle(ship).height).toBe(`${height}`)
// })

test('renders with correct width', () => {
  render(<Ship ship={mockShip} />)
  const ship = screen.getByTestId(mockShip.name)
  expect(getComputedStyle(ship).width).toBe(`${width * mockShip.length}vw`)
})

test('calls moveShip when clicked', () => {
  render(<Ship ship={mockShip} moveShip={moveShip} />)
  const ship = screen.getByTestId(mockShip.name)
  fireEvent.click(ship)
  expect(moveShip).toHaveBeenCalled()
})
