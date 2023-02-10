import React from 'react'
import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import Square from '../HomeSquare'

const x = 1
const y = 5
const colorSquares = jest.fn()
const uncolorSquares = jest.fn()
const placeShip = jest.fn()
const takeShipOut = jest.fn()
const rotateShip = jest.fn()

const mockShip = {
  name: 'Battleship',
  length: 4,
}

const squareAndSelectedShip = (
  <Square
    x={x}
    y={y}
    color={'rgba(230, 202, 50, 0.8)'}
    ship={false}
    selectedShip={mockShip}
    colorSquares={colorSquares}
    uncolorSquares={uncolorSquares}
    placeShip={placeShip}
    takeShipOut={takeShipOut}
  />
)

const squareAndNoSelectedShip = (
  <Square
    x={x}
    y={y}
    color={'rgba(230, 202, 50, 0.8)'}
    ship={false}
    selectedShip={false}
    colorSquares={colorSquares}
    uncolorSquares={uncolorSquares}
    placeShip={placeShip}
    takeShipOut={takeShipOut}
  />
)

const squareWithShip = (
  <Square
    x={x}
    y={y}
    color={'rgba(230, 202, 50, 0.8)'}
    ship={mockShip}
    selectedShip={false}
    colorSquares={colorSquares}
    uncolorSquares={uncolorSquares}
    placeShip={placeShip}
    takeShipOut={takeShipOut}
  />
)

it('renders', async () => {
  render(<Square x={x} y={y} />)
  const ship = await screen.findByTestId(`Square${x}${y}`)
  expect(ship).toBeInTheDocument()
})

it('calls place ship on left click when the ship is selected', () => {
  render(squareAndSelectedShip)
  const square = screen.getByTestId(`Square${x}${y}`)
  fireEvent.click(square)
  expect(placeShip).toHaveBeenCalled()
})

describe('on hover', () => {
  it('calls colorSquares on hover when the ship has been selected', () => {
    render(squareAndSelectedShip)
    const square = screen.getByTestId(`Square${x}${y}`)
    fireEvent.mouseEnter(square)
    expect(colorSquares).toHaveBeenCalled()
  })

  it('does not call colorSquares on hover when the ship has been selected', () => {
    render(squareAndNoSelectedShip)
    const square = screen.getByTestId(`Square${x}${y}`)
    fireEvent.mouseEnter(square)
    expect(colorSquares).toHaveBeenCalledTimes(0)
  })

  it('calls uncolorSquares on hover when the ship has been selected', () => {
    render(squareAndSelectedShip)
    const square = screen.getByTestId(`Square${x}${y}`)
    fireEvent.mouseLeave(square)
    expect(uncolorSquares).toHaveBeenCalled()
  })

  it('does not call uncolorSquares on hover when the ship has not been selected', () => {
    render(squareAndNoSelectedShip)
    const square = screen.getByTestId(`Square${x}${y}`)
    fireEvent.mouseLeave(square)
    expect(uncolorSquares).toHaveBeenCalledTimes(0)
  })
})

describe('on right click', () => {
  it('calls takeShipOut when the ship has not been selected', () => {
    render(squareWithShip)
    const square = screen.getByTestId(`Square${x}${y}`)
    fireEvent.contextMenu(square)
    expect(takeShipOut).toHaveBeenCalled()
  })

  // it('calls rotateShip on right-click when the ship has been selected', () => {
  //   render(squareAndSelectedShip)
  //   const square = screen.getByTestId(`Square${x}${y}`)
  //   fireEvent.contextMenu(square)
  //   expect(rotateShip).toHaveBeenCalled()
  // })
})
