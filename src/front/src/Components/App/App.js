import {useState, useEffect} from 'react'
import {fetchUser} from '../../Utils.js'
import './App.css';

const url = 'http://localhost:8080/'

function App() {
  const [userId, setUserId] = useState('')
  const [userName, setUserName] = useState('')
  const [grid, setGrid] = useState()
  const [fleet, setFleet] = useState()

  useEffect(() => {
    fetchUser(url).then(user => {
      setUserId(user.playerId)
      setUserName(user.name)
      setGrid(user.grid)
      setFleet(user.Fleet)
    })
  }, [])

  return (
    <div className="App">
      <p>{userId}</p>
    </div>
  );
}

export default App;
