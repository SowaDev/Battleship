import { render, screen } from '@testing-library/react'
import Ship from '../Ship'

const mockShip = {
  name: 'Battleship',
  length: 4
}
const size = 60

test('renders with correct height', () => {
  render(<Ship ship={mockShip} sizeUnit={size} />)
  const ship = screen.getByTestId(mockShip.name)
  expect(getComputedStyle(ship).height).toBe(`${size}px`)
})

test('renders with correct width', () => {
  render(<Ship ship={mockShip} sizeUnit={60} />)
  const ship = screen.getByTestId(mockShip.name)
  expect(getComputedStyle(ship).width).toBe(`${size * mockShip.length}px`)
})