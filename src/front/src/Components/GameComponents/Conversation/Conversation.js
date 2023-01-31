import React, { useEffect, useRef } from 'react'
import Message from '../Message/Message'
import './Conversation.css'

export default function Conversation({ messages, userId }) {
  const messageContainer = useRef(null)

  useEffect(() => {
    messageContainer.current.scrollTop = messageContainer.current.scrollHeight
  }, [messages])

  return (
    <div className="Conversation">
      <div className="MessageList" ref={messageContainer}>
        {messages.map((message, i) => {
          return (
            <Message
              key={i}
              sender={message.senderName}
              senderId={message.senderId}
              text={message.text}
              date={message.date}
              userId={userId}
            />
          )
        })}
      </div>
    </div>
  )
}
