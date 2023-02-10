import { createContext } from 'react'

export const colors = {
  golden: 'rgba(230, 202, 50, 0.8)',
  transparentGray: 'rgba(51, 71, 80, 0.1)',
  red: 'rgba(217, 67, 48, 0.8)',
  transparentBlack: 'rgba(0, 0, 0, 0.2)',
  oceanBlue: 'rgba(12, 164, 232, 0.6)',
  hitRed: 'rgba(250, 0, 0, 0.6)',
}

export const ColorContext = createContext(colors)
