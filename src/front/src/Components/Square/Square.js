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
  setSelectedShip,
  setSail,
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

  const handleClick = async (e) => {
    if (!selectedShip) return
    let result = await placeShip(x, y, selectedShip)
    console.log(result)
    if (result === 'ok') setSail()
    setSelectedShip(null)
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
