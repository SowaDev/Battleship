import React from 'react'
import './Square.css'

export default function Square({ coordinates }) {
  return (
    <div
      className="GameSquare"
      style={{
        // height: 50,
        // width: 50,
        backgroundColor: 'lightblue',
      }}
    ></div>
  )
}
