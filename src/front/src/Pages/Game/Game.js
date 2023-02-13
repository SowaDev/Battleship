import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { fetchGame } from '../../Utils/BattleshipAPI'
import { createOpponentBattleMap } from '../../Utils/Utils'
import './Game.css'
import Chat from '../../Components/GameComponents/Chat/Chat'
import TurnBox from '../../Components/GameComponents/TurnBox/TurnBox'
import DescribedGrid from '../../Components/GameComponents/DescribedGrid/DescribedGrid'
import CaptainsLog from '../../Components/GameComponents/CaptainsLog/CaptainsLog'
import { useContext } from 'react'
import { StompClientContext } from '../../Context/StompClientContext'

export default function Game() {
  const { state } = useLocation()
  const { userId, userName } = state
  const [gameId, setGameId] = useState('')
  const [userBattleMap, setUserBattleMap] = useState([])
  const [opponentBattleMap, setOpponentBattleMap] = useState([])
  const [gameStatus, setGameStatus] = useState('')
  const [messageList, setMessageList] = useState([])
  const [logList, setLogList] = useState([])
  const [isUserTurn, setIsUserTurn] = useState(false)

  const stompClient = useContext(StompClientContext)

  useEffect(() => {
    fetchGame().then((game) => {
      if (stompClient) {
        stompClient.subscribe(`/game/${game.gameId}`, (jsonGame) => {
          console.log(game.gameId)
          const parsedGame = JSON.parse(jsonGame.body)
          setMapTurnAndStatus(parsedGame)
        })
      }
      setGameId(game.gameId)
      setMessageList(game.messageList)
      setLogList(game.captainsLog)
      setMapTurnAndStatus(game)
    })
  }, [stompClient])

  const setMapTurnAndStatus = (game) => {
    setBattleMaps(game)
    isUserTurnNow(game.playerTurn)
    setGameStatus(game.gameStatus)
  }

  const isUserTurnNow = (turnsPlayerId) => {
    setIsUserTurn(userId === turnsPlayerId ? true : false)
  }

  const setBattleMaps = (game) => {
    game.players.forEach((user) => {
      if (!user) setOpponentBattleMap(createOpponentBattleMap())
      else if (user.playerId === userId) setUserBattleMap(user.grid.battleMap)
      else if (user.playerId !== userId)
        setOpponentBattleMap(mountOpponentBattleMap(user.grid))
    })
  }

  const mountOpponentBattleMap = (grid) => {
    return grid.battleMap.map((row) => {
      return row.map((square) => {
        return {
          coordinates: square.coordinates,
          status: square.status,
        }
      })
    })
  }

  const shoot = async (coordinates) => {
    let shot = {
      coordinates: coordinates,
      playerId: userId,
      playerName: userName,
      gameId: gameId,
    }
    stompClient.send('/app/shot', {}, JSON.stringify(shot))
  }

  return (
    <div className="GamePage">
      <div className="Game">
        <div className="Map">
          <DescribedGrid battleMap={userBattleMap} opponent={false} />
          <div className="Center">
            <TurnBox isUserTurn={isUserTurn} gameStatus={gameStatus} />
            <Chat
              gameId={gameId}
              userId={userId}
              userName={userName}
              messageList={messageList}
              setMessageList={setMessageList}
            />
          </div>
          <DescribedGrid
            battleMap={opponentBattleMap}
            opponent={true}
            shoot={shoot}
            isUserTurn={isUserTurn}
          />
        </div>
      </div>
    </div>
  )
}
