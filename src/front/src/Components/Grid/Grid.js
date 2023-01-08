import React from 'react'
import Square from '../Square/Square'
import './Grid.css'

export default function Grid({
  battleMap,
  squareSize,
  selectedShip,
  setSelectedShip,
  setSail,
  setBattleMap,
  mountBattleMap,
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
        square.color = 'red'
      else square.color = 'lightblue'
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
      if (square.ship) square.color = 'lightblue'
      else square.color = 'gray'
    }
    setBattleMap(newBattleMap)
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
                  setSelectedShip={setSelectedShip}
                  setSail={setSail}
                  mountBattleMap={mountBattleMap}
                />
              )
            })}
          </div>
        )
      })}
    </div>
  )
}
