import React from 'react'
import Square from '../../HomeComponents/Square/Square'

export default function Grid({ battleMap }) {
  return (
    <div className="BattleMap">
      {battleMap.map((row, i) => {
        return (
          <div className="row" key={`row${i}`}>
            {row.map((square, j) => {
              return (
                <Square
                  key={`${i}, ${j}`}
                  coordinates={square.coordinates}
                  color={square.color}
                />
              )
            })}
          </div>
        )
      })}
    </div>
  )
}
