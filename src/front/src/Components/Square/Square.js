import React from 'react'
import './Square.css'
import { placeShip, removeShip } from '../../Utils'

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
  setSelectedShip,
  setSail,
  setBattleMap,
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
    else if (ship) {
      let battleMap = await removeShip(ship.name)
      setBattleMap(battleMap)
      setSail(false)
      uncolorSquares(x, y, ship.length, ship.vertical)
      setSelectedShip(null)
    }
  }

  const handleClick = async (e) => {
    if (!selectedShip) return
    let response = await placeShip(x, y, selectedShip)
    console.log(response)
    if (response.placementResult === 'ok') {
      setBattleMap(response.grid)
      setSail(true)
    } else uncolorSquares(x, y, selectedShip.length, selectedShip.vertical)
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
