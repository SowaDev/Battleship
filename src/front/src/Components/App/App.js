import { useState, useEffect } from 'react'
import { fetchUser, setUserData } from '../../Utils.js'
import './App.css';
import NameBar from '../NameBar/NameBar.js'

const url = 'http://localhost:8080/'

function App() {
  const [userId, setUserId] = useState('')
  const [userName, setUserName] = useState('')
  const [grid, setGrid] = useState()
  const [fleet, setFleet] = useState()

  useEffect(() => {
    fetchUser(url).then(user => {
      setUserData(user, setUserId, setUserName, setGrid, setFleet)
    })
  }, [])

  return (
    <div className="App">
      <NameBar name={userName}
               changeName={setUserName}/>
      <p>{userId}</p>
      <p>Welcome {userName}</p>
    </div>
  );
}

export default App;
