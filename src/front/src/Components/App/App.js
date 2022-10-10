import {useState, useEffect} from 'react'
import {fetchUser} from '../../Utils.js'
import './App.css';

const url = 'http://localhost:8080/'

function App() {
  const [userData, setUserData] = useState({})

  useEffect(() => {
    fetchUser(url).then(user => {
      setUserData(user)
    })
  }, [])

  return (
    <div className="App">
      <p>{userData.playerId}</p>
    </div>
  );
}

export default App;
