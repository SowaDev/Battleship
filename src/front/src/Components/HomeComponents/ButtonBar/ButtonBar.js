import React from 'react'
import './ButtonBar.css'

export default function ButtonBar({ putShipsAtRandom, removeAllShips }) {
  return (
    <div className="ButtonBar">
      <button className="buttonz" onClick={putShipsAtRandom}>
        Place at random
      </button>
      <button className="buttonz" onClick={removeAllShips}>
        Remove ships
      </button>
    </div>
  )
}
