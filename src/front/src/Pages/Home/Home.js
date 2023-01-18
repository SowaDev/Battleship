import { useState, useEffect } from 'react'
import { fetchUser, randomPlacement, removeShips, play } from '../../Utils'
import { Link, useNavigate } from 'react-router-dom'
import './Home.css'
import NameBar from '../../Components/NameBar/NameBar.js'
import Grid from '../../Components/Grid/Grid.js'
import Fleet from '../../Components/Fleet/Fleet.js'
import ButtonLink from '../../Components/ButtonLink/ButtonLink'

const url = 'http://localhost:8080/'

function Home() {
  const [userId, setUserId] = useState('')
  const [userName, setUserName] = useState('')
  const [grid, setGrid] = useState()
  const [fleet, setFleet] = useState([])
  const [battleMap, setBattleMap] = useState([])
  const [selectedShip, setSelectedShip] = useState()
  const [fleetReady, setFleetReady] = useState(false)

  const squareSize = 60

  useEffect(() => {
    fetchUser(url).then((user) => {
      setUserName(user.name)
      mountBattleMap(user.grid)
      setFleet(user.fleet)
      setFleetReady(checkFleetReady())
    })
  }, [])

  useEffect(() => {
    setFleetReady(checkFleetReady())
  }, [fleet])

  const mountBattleMap = (grid) => {
    setBattleMap(
      grid.battleMap.map((row) => {
        return row.map((square) => ({
          ...square,
          color: square.ship ? 'lightblue' : 'gray',
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

  const checkFleetReady = () => {
    return !fleet.some((ship) => ship.setSail === false)
  }

  return (
    <>
      <h1>Welcome to Battleship {userName}</h1>
      <div className="App">
        <Grid
          battleMap={battleMap}
          squareSize={squareSize}
          selectedShip={selectedShip}
          setSelectedShip={setSelectedShip}
          setBattleMap={setBattleMap}
          mountBattleMap={mountBattleMap}
          setSail={setSail}
        />
        <div className="Right">
          <NameBar name={userName} changeName={setUserName} />
          <Fleet
            ships={fleet}
            sizeUnit={squareSize}
            selectedShip={selectedShip}
            setSelectedShip={setSelectedShip}
          />
          <div className="PlacementButtons">
            <button className="Random" onClick={putShipsAtRandom}>
              Put all ships at random
            </button>
            <button className="Random" onClick={removeAllShips}>
              Remove all ships
            </button>
          </div>
          <ButtonLink fleetReady={fleetReady} />
        </div>
      </div>
    </>
  )
}

export default Home
