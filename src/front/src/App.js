import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './Pages/Home/Home'
import Game from './Pages/Game/Game'
import { ColorContext, colors } from './ColorContext'

export default function App() {
  return (
    <BrowserRouter>
      <ColorContext.Provider value={colors}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/game" element={<Game />} />
        </Routes>
      </ColorContext.Provider>
    </BrowserRouter>
  )
}
