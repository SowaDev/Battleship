import React from 'react'
import Square from '../Square/Square'
import './Grid.css'
import { putShip, removeShip } from '../../../Utils'

export default function Grid({
  battleMap,
  squareSize,
  selectedShip,
  setSelectedShip,
  setSail,
  setBattleMap,
  mountBattleMap,
  updateHint,
}) {
  const colorSquares = (x, y, length, vertical) => {
    let newBattleMap = [...battleMap]
    for (let i = 0; i < length; i++) {
      if ((vertical && x + i > 9) || (!vertical && y + i > 9)) break
      let square = vertical ? newBattleMap[x + i][y] : newBattleMap[x][y + i]
      if (
        (vertical && x + length > 10) ||
        (!vertical && y + length > 10) ||
        checkForShip(x, y, length, vertical)
      )
        square.color = 'rgba(217, 67, 48, 0.8)'
      else square.color = 'rgba(230, 202, 50, 0.8)'
    }
    setBattleMap(newBattleMap)
  }

  const checkForShip = (x, y, length, vertical) => {
    for (let i = 0; i < length; i++) {
      if ((vertical && x + i > 9) || (!vertical && y + i > 9)) break
      let square = vertical ? battleMap[x + i][y] : battleMap[x][y + i]
      if (square.ship) {
        return true
      }
    }
  }

  const uncolorSquares = (x, y, length, vertical) => {
    let newBattleMap = [...battleMap]
    for (let i = 0; i < length; i++) {
      if ((vertical && x + i > 9) || (!vertical && y + i > 9)) break
      let square = vertical ? newBattleMap[x + i][y] : newBattleMap[x][y + i]
      if (square.ship) square.color = 'rgba(230, 202, 50, 0.8)'
      else square.color = 'rgba(51, 71, 80, 0.1)'
    }
    setBattleMap(newBattleMap)
  }

  const placeShip = async (x, y) => {
    let response = await putShip(x, y, selectedShip)
    if (response.placementResult === 'ok') {
      mountBattleMap(response.grid)
      setSail(true, selectedShip)
    } else {
      uncolorSquares(x, y, selectedShip.length, selectedShip.vertical)
      updateHint(response.placementResult)
    }
    setSelectedShip(null)
  }

  const takeShipOut = async (ship) => {
    let newBattleMap = await removeShip(ship.name)
    mountBattleMap(newBattleMap)
    setSail(false, ship)
    setSelectedShip(null)
  }

  return (
    <div className="BattleMap" data-testid="Grid">
      {battleMap.map((row, i) => {
        return (
          <div key={`row ${i}`} className="row">
            {row.map((square, j) => {
              return (
                <Square
                  key={`${i}, ${j}`}
                  coordinates={square.coordinates}
                  x={square.coordinates.x}
                  y={square.coordinates.y}
                  color={square.color}
                  ship={square.ship}
                  size={squareSize}
                  selectedShip={selectedShip}
                  colorSquares={colorSquares}
                  uncolorSquares={uncolorSquares}
                  placeShip={placeShip}
                  takeShipOut={takeShipOut}
                />
              )
            })}
          </div>
        )
      })}
    </div>
  )
}
