import React, { useEffect, useContext, useRef } from 'react'
import { StompClientContext } from '../../../Context/StompClientContext'
import './CaptainsLog.css'
import LogList from '../LogList/LogList'

export default function CaptainsLog({ logList, gameId, setLogList, userId }) {
  const stompClient = useContext(StompClientContext)

  useEffect(() => {
    if (stompClient) {
      stompClient.subscribe(`/log/${gameId}`, (payload) => {
        let log = JSON.parse(payload.body)
        setLogList((prev) => [...prev, log])
      })
    }
  }, [gameId, stompClient, setLogList])

  return (
    <div className="CaptainsLog">
      <LogList logList={logList} userId={userId} setLogList={setLogList} />
    </div>
  )
}
