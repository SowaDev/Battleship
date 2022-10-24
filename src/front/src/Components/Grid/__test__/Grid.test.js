import { render, screen, fireEvent } from '@testing-library/react'
import Grid from '../Grid'

const battlemap = Array.from({length: 10}, x => Array.from({ length: 10}, y => {
  return {
    coordinates: {x:x, y:y},
    restricted: false,
    ship: null,
    wasShote: false
  }
}))
  

test('render', async () => {
  render(<Grid battleMap={battlemap}/>)
  const grid = await screen.findByTestId('Grid')
  expect(grid).toBeInTheDocument()
})