import React from 'react'
import './Square.css'

function Square({ coordinates, ship, wasShot, isRestricted, size }) {
  return (
    <div className='Square' style={{
      height: size,
      width: size
    }}>
    </div>
  )
}

export default Square