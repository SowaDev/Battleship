import React from 'react'
import Square from '../Square/GameSquare'
import './GameGrid.css'

export default function Grid({ battleMap, opponent, shoot }) {
  return (
    <div
      className="GameGrid"
      style={{
        height: opponent ? '30vw' : '20vw',
        width: opponent ? '30vw' : '20vw',
      }}
    >
      {battleMap.map((row, i) => {
        return (
          <div className="row" key={`row${i}`}>
            {row.map((square, j) => {
              return (
                <Square
                  key={`${i}, ${j}`}
                  coordinates={square.coordinates}
                  status={square.status}
                  ship={opponent ? null : square.ship}
                  opponent={opponent}
                  shoot={shoot}
                />
              )
            })}
          </div>
        )
      })}
    </div>
  )
}
