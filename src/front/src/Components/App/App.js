import { useState, useEffect } from 'react'
import { fetchUser } from '../../Utils.js'
import './App.css';
import NameBar from '../NameBar/NameBar.js'
import Grid from '../Grid/Grid.js';
import Fleet from '../Fleet/Fleet.js';

const url = 'http://localhost:8080/'

function App() {
  const [userId, setUserId] = useState('')
  const [userName, setUserName] = useState('')
  const [grid, setGrid] = useState()
  const [fleet, setFleet] = useState([])
  const [battleMap, setBattleMap] = useState([])
  const [selectedShip, setSelectedShip] = useState()

  const squareSize = 60;

  useEffect(() => {
    fetchUser(url).then(user => {
      setUserName(user.name)
      setBattleMap(user.grid.battleMap)
      setFleet(user.fleet)
    })
  }, [])

  return (
    <>
      <h1>Welcome to Battleship {userName}</h1>
      <div className="App">
        {/* <NameBar name={userName}
                  changeName={setUserName}/> */}
        <Fleet ships={fleet}
               sizeUnit={squareSize}
               selectedShip={selectedShip}
               setSelectedShip={setSelectedShip} />
        <Grid battleMap={battleMap}
              squareSize={squareSize}
              selectedShip={selectedShip}
              setSelectedShip={setSelectedShip}
              setFleet={setFleet} />
      </div>
    </>
  );
}

export default App;
