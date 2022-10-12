import React from 'react'
import Square from '../Square/Square'
import './Ship.css'

export default function Ship(props) {
  const { length, name } = props.ship;

  return (
    <div className='Ship'
         style={{ width: `${length*60}px` }}>
      {name}
    </div>
  )
}
