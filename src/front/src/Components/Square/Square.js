import React from 'react'
import './Square.css'
import { placeShip } from '../../Utils'

function Square({
  coordinates,
  ship,
  wasShot,
  isRestricted,
  size,
  selectedShip,
  setSelectedShip,
  setFleet,
}) {
  const colorSquares = (length, color, coordinates) => {
    let x = coordinates.x,
      y = coordinates.y
    let vertical = selectedShip.vertical
    for (let i = 0; i < length; i++) {
      if ((vertical && y + i > 9) || (!vertical && x + i > 9)) return
      let square = vertical
        ? document.getElementById(`x${x}y${y + i}`)
        : document.getElementById(`x${x + i}y${y}`)
      if ((vertical && y + length > 10) || (!vertical && x + length > 10))
        square.style.backgroundColor = 'red'
      else square.style.backgroundColor = color
    }
  }

  const uncolorSquares = (length, color, coordinates) => {
    let x = coordinates.x,
      y = coordinates.y
    for (let i = 0; i < length; i++) {
      if (
        (selectedShip.vertical && y + i > 9) ||
        (!selectedShip.vertical && x + i > 9)
      )
        return
      let square = selectedShip.vertical
        ? document.getElementById(`x${x}y${y + i}`)
        : document.getElementById(`x${x + i}y${y}`)
      square.style.backgroundColor = color
    }
  }

  const handleEnter = () => {
    colorSquares(selectedShip.length, 'lightblue', coordinates)
  }

  const handleLeave = () => {
    uncolorSquares(selectedShip.length, 'gray', coordinates)
  }

  const handleRightClick = (e) => {
    e.preventDefault()
    if (!selectedShip) return
    uncolorSquares(selectedShip.length, 'gray', coordinates)
    selectedShip.vertical = !selectedShip.vertical
    colorSquares(selectedShip.length, 'lightblue', coordinates)
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
      }}
    ></div>
  )
}

export default Square
