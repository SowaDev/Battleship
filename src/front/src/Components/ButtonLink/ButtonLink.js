import React from 'react'

export default function ButtonLink({ fleetReady }) {
  const handleEnter = (e) => {
    if (fleetReady) {
      e.target.style.transform = 'scale(1.1)'
      e.target.style.boxShadow = '2px 4px 50px 0 rgba(0, 0, 0, 0.25)'
    }
  }

  const handleLeave = (e) => {
    if (fleetReady) {
      e.target.style.transform = 'scale(1)'
      e.target.style.boxShadow = '2px 4px 10px 0 rgba(0, 0, 0, 0.25)'
    }
  }

  return (
    <button
      className="Play"
      style={{
        backgroundColor: fleetReady ? 'lightseagreen' : 'gray',
      }}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
    >
      Play
    </button>
  )
}
