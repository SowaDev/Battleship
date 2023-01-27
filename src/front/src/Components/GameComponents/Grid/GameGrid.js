import React from 'react'
import Square from '../Square/GameSquare'
import './GameGrid.css'

export default function Grid({ battleMap, opponent }) {
  return (
    <div className="GameGrid">
      <div className="GameBattleMap">
        {battleMap.map((row, i) => {
          return (
            <div className="row" key={`row${i}`}>
              {row.map((square, j) => {
                return (
                  <Square
                    key={`${i}, ${j}`}
                    x={square.coordinates.x}
                    y={square.coordinates.y}
                    status={square.status}
                    ship={opponent ? null : square.ship}
                    opponent={opponent}
                  />
                )
              })}
            </div>
          )
        })}
      </div>
    </div>
  )
}
