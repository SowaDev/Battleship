import React, { useEffect } from 'react'
import Square from '../Square/Square'
import './Grid.css'

export default function Grid({ battleMap, squareSize }) {
  
  return (
    <div className='BattleMap'>
    {
    battleMap.map((row, i) => {
      return <div key={`row ${i}`}
                  className='row'>
      {
      row.map((square, j) => {
        return <Square coordinates={square.coordinates}
                       ship={square.ship}
                       wasShot={square.wasShot}
                       isRestricted={square.restricted}
                       key={`${i}, ${j}`}
                       size={squareSize} />
      })
    }
      </div>
    })}
    </div>
  )
}