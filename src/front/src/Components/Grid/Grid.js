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
}) {
  const colorSquares = (x, y, length, vertical) => {
    let newBattleMap = [...battleMap]
    for (let i = 0; i < length; i++) {
      if ((vertical && x + i > 9) || (!vertical && y + i > 9)) break
      let square = vertical ? newBattleMap[x + i][y] : newBattleMap[x][y + i]
      if ((vertical && x + length > 10) || (!vertical && y + length > 10))
        square.color = 'red'
      else square.color = 'lightblue'
    }
    setBattleMap(newBattleMap)
  }

  const uncolorSquares = (x, y, length, vertical) => {
    let newBattleMap = [...battleMap]
    for (let i = 0; i < length; i++) {
      if ((vertical && x + i > 9) || (!vertical && y + i > 9)) break
      let square = vertical ? newBattleMap[x + i][y] : newBattleMap[x][y + i]
      square.color = 'gray'
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
                  coordinates={square.coordinates}
                  x={square.coordinates.x}
                  y={square.coordinates.y}
                  key={`${i}, ${j}`}
                  size={squareSize}
                  selectedShip={selectedShip}
                  color={square.color}
                  colorSquares={colorSquares}
                  uncolorSquares={uncolorSquares}
                  setSelectedShip={setSelectedShip}
                  setSail={setSail}
                />
              )
            })}
          </div>
        )
      })}
    </div>
  )
}
