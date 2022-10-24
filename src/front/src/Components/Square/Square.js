import React from 'react'
import './Square.css'

function Square({ coordinates, ship, wasShot, isRestricted, size }) {
  return (
    <div className='Square'
         data-testid={`Square${coordinates.x}${coordinates.y}`}
         style={{
           height: size,
           width: size
         }}
         >
    </div>
  )
}

export default Square