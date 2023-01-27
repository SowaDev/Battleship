import React from 'react'
import './GameSquare.css'

export default function Square({ coordinates }) {
  return (
    <div
      className="GameSquare"
      style={{
        backgroundColor: 'lightblue',
      }}
    ></div>
  )
}
