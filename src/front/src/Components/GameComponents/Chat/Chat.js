import React, { useState, useEffect, useContext } from 'react'
import { StompClientContext } from '../../../Context/StompClientContext'
import Conversation from '../Conversation/Conversation'
import './Chat.css'

export default function Chat({
  gameId,
  userName,
  userId,
  messageList,
  setMessageList,
}) {
  const [text, setText] = useState('')
  const stompClient = useContext(StompClientContext)

  useEffect(() => {
    if (stompClient) {
      stompClient.subscribe(`/chat/${gameId}`, (payload) => {
        let message = JSON.parse(payload.body)
        setMessageList((prev) => [...prev, message])
      })
    }
  }, [gameId, stompClient, setMessageList])

  const handleChange = (e) => {
    e.preventDefault()
    let message = e.target.value
    setText(message)
  }

  const sendMessage = () => {
    if (text === '') return
    let message = {
      senderName: userName,
      senderId: userId,
      text: text,
      gameId: gameId,
    }
    stompClient.send('/app/message', {}, JSON.stringify(message))
    setText('')
  }

  const sendOnEnter = (e) => {
    if (e.key === 'Enter') sendMessage()
  }

  return (
    <div className="Chat">
      <Conversation messages={messageList} userId={userId} />
      <div className="InputBar">
        <input
          type="text"
          className="Input-message"
          placeholder="enter the message"
          onKeyDown={sendOnEnter}
          onChange={handleChange}
          value={text}
        />
        <button className="SendButton" onClick={sendMessage}>
          SEND
        </button>
      </div>
    </div>
  )
}
