import React, { useContext } from 'react'
import { ColorContext } from '../../../Context/ColorContext'
import Square from '../Square/HomeSquare'
import './HomeGrid.css'
import { removeShip } from '../../../Utils/BattleshipAPI'
import { putShip } from '../../../Utils/Utils'

export default function Grid({
  battleMap,
  selectedShip,
  setSelectedShip,
  setSail,
  setBattleMap,
  mountBattleMap,
  updateHint,
}) {
  const { golden, red, transparentGray } = useContext(ColorContext)

  const colorSquares = (x, y, length, isVertical) => {
    let newBattleMap = [...battleMap]
    for (let i = 0; i < length; i++) {
      if ((isVertical && x + i > 9) || (!isVertical && y + i > 9)) break
      let square = isVertical ? newBattleMap[x + i][y] : newBattleMap[x][y + i]
      const outOfBounds =
        (isVertical && x + length > 10) || (!isVertical && y + length > 10)
      if (outOfBounds || isThereAShip(x, y, length, isVertical))
        square.color = red
      else square.color = golden
    }
    setBattleMap(newBattleMap)
  }

  const isThereAShip = (x, y, length, vertical) => {
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
      if (square.ship) square.color = golden
      else square.color = transparentGray
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
    <div className="Grid" data-testid="Grid">
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
