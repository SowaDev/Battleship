import { render, screen } from '@testing-library/react'
import Square from '../Square'

const coordinates = {
  x:1,
  y:5
}

test('renders with correct height', () => {
  render(<Square size={60} coordinates={coordinates} />)
  const square = screen.getByTestId(`Square${coordinates.x}${coordinates.y}`)
  expect(getComputedStyle(square).height).toBe('60px')
})

test('renders with correct width', () => {
  render(<Square size={60} coordinates={coordinates} />)
  const square = screen.getByTestId(`Square${coordinates.x}${coordinates.y}`)
  expect(getComputedStyle(square).width).toBe('60px')
})