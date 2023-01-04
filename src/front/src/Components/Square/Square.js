import React from 'react'
import './Square.css'
import { placeShip } from '../../Utils'

function Square({
  x,
  y,
  coordinates,
  size,
  selectedShip,
  color,
  colorSquares,
  uncolorSquares,
}) {
  const handleEnter = () => {
    colorSquares(x, y, selectedShip.length, selectedShip.vertical)
  }

  const handleLeave = () => {
    uncolorSquares(x, y, selectedShip.length, selectedShip.vertical)
  }

  const handleRightClick = (e) => {
    e.preventDefault()
    if (!selectedShip) return
    uncolorSquares(x, y, selectedShip.length, selectedShip.vertical)
    selectedShip.vertical = !selectedShip.vertical
    colorSquares(x, y, selectedShip.length, selectedShip.vertical)
  }

  return (
    <div
      className="Square"
      data-testid={`Square${coordinates.x}${coordinates.y}`}
      id={`x${coordinates.x}y${coordinates.y}`}
      onMouseEnter={selectedShip ? handleEnter : undefined}
      onMouseLeave={selectedShip ? handleLeave : undefined}
      onContextMenu={handleRightClick}
      style={{
        height: size,
        width: size,
        backgroundColor: color,
      }}
    ></div>
  )
}

export default Square
