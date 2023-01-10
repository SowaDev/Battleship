import React from 'react'
import './Square.css'

function Square({
  x,
  y,
  coordinates,
  size,
  selectedShip,
  color,
  ship,
  colorSquares,
  uncolorSquares,
  placeShip,
  takeShipOut,
}) {
  const handleEnter = () => {
    colorSquares(x, y, selectedShip.length, selectedShip.vertical)
  }

  const handleLeave = () => {
    uncolorSquares(x, y, selectedShip.length, selectedShip.vertical)
  }

  const rotateShip = () => {
    uncolorSquares(x, y, selectedShip.length, selectedShip.vertical)
    selectedShip.vertical = !selectedShip.vertical
    colorSquares(x, y, selectedShip.length, selectedShip.vertical)
  }

  const handleRightClick = async (e) => {
    e.preventDefault()
    if (selectedShip) rotateShip()
    else if (ship) takeShipOut(ship)
  }

  const handleClick = async (e) => {
    if (!selectedShip) return
    placeShip(x, y)
  }

  return (
    <div
      className="Square"
      data-testid={`Square${coordinates.x}${coordinates.y}`}
      id={`x${coordinates.x}y${coordinates.y}`}
      onMouseEnter={selectedShip ? handleEnter : undefined}
      onMouseLeave={selectedShip ? handleLeave : undefined}
      onContextMenu={handleRightClick}
      onClick={handleClick}
      style={{
        height: size,
        width: size,
        backgroundColor: color,
      }}
    ></div>
  )
}

export default Square
