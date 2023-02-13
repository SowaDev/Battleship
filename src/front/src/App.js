import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './Pages/Home/Home'
import Game from './Pages/Game/Game'
import { ColorContext, colors } from './Context/ColorContext'
import StompClientProvider from './Context/StompClientContext'

export default function App() {
  return (
    <BrowserRouter>
      <ColorContext.Provider value={colors}>
        <StompClientProvider>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/game" element={<Game />} />
          </Routes>
        </StompClientProvider>
      </ColorContext.Provider>
    </BrowserRouter>
  )
}
