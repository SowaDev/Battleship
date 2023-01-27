import React from 'react'
import Square from '../Square/GameSquare'
import './GameGrid.css'

export default function Grid({ battleMap }) {
  return (
    <div className="GameGrid">
      <div className="GameBattleMap">
        {battleMap.map((row, i) => {
          return (
            <div className="row" key={`row${i}`}>
              {row.map((square, j) => {
                return (
                  <Square key={`${i}, ${j}`} coordinates={square.coordinates} />
                )
              })}
            </div>
          )
        })}
      </div>
    </div>
  )
}
