import React, { useEffect, useRef } from 'react'
import './LogList.css'
import Log from '../Log/Log'

export default function LogList({ logList, userId, setLogList }) {
  const logContainer = useRef(null)

  useEffect(() => {
    logContainer.current.scrollTop = logContainer.current.scrollHeight
  }, [logList])

  return (
    <div className="LogList" ref={logContainer}>
      {logList.map((log, i) => {
        return (
          <Log
            key={i}
            userId={userId}
            playerId={log.playerId}
            playerName={log.playerName}
            coordinates={log.coordinates}
            shotResult={log.shotResult}
            sunkenShipName={log.sunkenShipName}
            setLogList={setLogList}
          />
        )
      })}
    </div>
  )
}
