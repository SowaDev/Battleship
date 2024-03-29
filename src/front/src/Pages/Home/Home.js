import { useState, useEffect, useContext } from 'react'
import {
  fetchUser,
  randomPlacement,
  removeShips,
} from '../../Utils/BattleshipAPI'
import { checkFleetReady } from '../../Utils/Utils'
import { ColorContext } from '../../Context/ColorContext'
import './Home.css'
import NameBar from '../../Components/HomeComponents/NameBar/NameBar'
import Grid from '../../Components/HomeComponents/Grid/HomeGrid.js'
import Fleet from '../../Components/HomeComponents/Fleet/Fleet.js'
import ButtonLink from '../../Components/HomeComponents/ButtonLink/ButtonLink'
import Hint from '../../Components/SharedComponents/Hint/Hint'
import ButtonBar from '../../Components/HomeComponents/ButtonBar/ButtonBar'

const url = 'http://localhost:8080/'

function Home() {
  const [userName, setUserName] = useState('')
  const [userId, setUserId] = useState('')
  const [fleet, setFleet] = useState([])
  const [battleMap, setBattleMap] = useState([])
  const [selectedShip, setSelectedShip] = useState()
  const [fleetReady, setFleetReady] = useState(false)
  const [hint, setHint] = useState()
  const [hintChanges, setHintChanges] = useState(0)

  useEffect(() => {
    fetchUser(url).then((user) => {
      setUserName(user.name)
      setUserId(user.playerId)
      mountBattleMap(user.grid)
      setFleet(user.fleet)
      setFleetReady(checkFleetReady(user.fleet))
    })
  }, [])

  useEffect(() => {
    setFleetReady(checkFleetReady(fleet))
  }, [fleet])

  const { gray, golden } = useContext(ColorContext)

  const mountBattleMap = (grid) => {
    setBattleMap(
      grid.battleMap.map((row) => {
        return row.map((square) => ({
          ...square,
          color: square.ship ? golden : gray,
        }))
      })
    )
  }

  const setSail = (bool, targetShip) => {
    let updatedFleet = fleet.map((ship) => {
      if (ship.name === targetShip.name) {
        ship.setSail = bool
      }
      return ship
    })
    setFleet(updatedFleet)
  }

  const putShipsAtRandom = async () => {
    let updatedGrid = await randomPlacement()
    let updatedFleet = fleet.map((ship) => {
      ship.setSail = true
      return ship
    })
    mountBattleMap(updatedGrid)
    setFleet(updatedFleet)
  }

  const removeAllShips = async () => {
    let updatedGrid = await removeShips()
    let updatedFleet = fleet.map((ship) => {
      ship.setSail = false
      return ship
    })
    mountBattleMap(updatedGrid)
    setFleet(updatedFleet)
  }

  const updateHint = (hint) => {
    setHintChanges((prev) => prev + 1)
    setHint(hint)
  }

  return (
    <div className="Home">
      <div className="App">
        <div className="Center">
          <Hint hint={hint} hintChanges={hintChanges} />
          <Grid
            battleMap={battleMap}
            selectedShip={selectedShip}
            setSelectedShip={setSelectedShip}
            setBattleMap={setBattleMap}
            mountBattleMap={mountBattleMap}
            setSail={setSail}
            updateHint={updateHint}
          />
        </div>
        <div className="Right">
          <ButtonBar
            putShipsAtRandom={putShipsAtRandom}
            removeAllShips={removeAllShips}
          />
          <Fleet
            ships={fleet}
            selectedShip={selectedShip}
            setSelectedShip={setSelectedShip}
          />
          <div className="BottomRight">
            <NameBar name={userName} changeName={setUserName} />
            <ButtonLink
              fleetReady={fleetReady}
              userName={userName}
              userId={userId}
              updateHint={updateHint}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
