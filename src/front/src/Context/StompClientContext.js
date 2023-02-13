import React, { createContext, useEffect, useState } from 'react'
import SockJS from 'sockjs-client'
import Stomp from 'stompjs'

export const StompClientContext = createContext()

export default function StompClientProvider({ children }) {
  const [stompClient, setStompClient] = useState()

  useEffect(() => {
    const socket = new SockJS('http://localhost:8080/ws-game')
    const client = Stomp.over(socket)
    setStompClient(client)
  }, [])

  return (
    <StompClientContext.Provider value={stompClient}>
      {children}
    </StompClientContext.Provider>
  )
}
