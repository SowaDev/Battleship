import React from 'react'
import './Message.css'

export default function Message({ sender, senderId, text, date, userId }) {
  return (
    <div
      className="Message"
      style={{
        alignItems: senderId === userId ? 'flex-start' : 'flex-end',
      }}
    >
      <p className="Sender">
        {date} {sender} wrote:
      </p>
      <div className="Content">
        <p
          className="Text"
          style={{
            backgroundColor:
              userId === senderId
                ? 'rgba(255, 255, 255, 1)'
                : 'rgba(112, 248, 255, 1)',
          }}
        >
          {text}
        </p>
      </div>
    </div>
  )
}
