import React from 'react'
import './NameBar.css'

export default function NameBar({ name, changeName }) {
  const handleChange = (event) => {
    event.preventDefault()
    let name = event.target.value
    changeName(name)
  }

  return (
    <div className="NameBar">
      <input
        type="text"
        value={name}
        placeholder="Enter your name"
        onChange={handleChange}
      ></input>
    </div>
  )
}
