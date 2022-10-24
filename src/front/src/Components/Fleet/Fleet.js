import React from 'react'
import Ship from '../Ship/Ship'
import './Fleet.css'

export default function Fleet({ ships, sizeUnit }) {
  return (
    <div className='Fleet' data-testid='fleet'>
      {
        ships.map(ship => {
          return <Ship ship={ship}
                       sizeUnit={sizeUnit}
                       key={ship.name} />
        })
      }
    </div>
  )
}