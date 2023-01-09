import React from 'react'
import './Square.css'
import { putShip, removeShip } from '../../Utils'

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
  mountBattleMap,
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
      mountBattleMap(battleMap)
      setSail(false, ship)
      setSelectedShip(null)
    }
  }

  const handleClick = async (e) => {
    if (!selectedShip) return
    let response = await putShip(x, y, selectedShip)
    if (response.placementResult === 'ok') {
      mountBattleMap(response.grid)
      setSail(true, selectedShip)
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
