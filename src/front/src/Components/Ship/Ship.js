import React from 'react'
import './Ship.css'

export default function Ship({ ship, sizeUnit}) {
  const { length, name } = ship;

  return (
    <div className='Ship'
         style={{ 
           width: length*sizeUnit,
           height: sizeUnit }}>
      {name}
    </div>
  )
}
