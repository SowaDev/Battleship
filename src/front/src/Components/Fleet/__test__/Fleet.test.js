import { render, screen} from '@testing-library/react'
import Fleet from '../Fleet'

const ships = [
  { 
      name: 'AircraftCarrier',
      length: 5
  },
  { 
      name: 'Battleship',
      length: 4
  },
  { 
      name: 'Cruiser',
      length: 3
  },
  { 
      name: 'Destroyer',
      length: 2
  },
  { 
      name: 'Submarine',
      length: 2
  }
]
  

test('render', async () => {
  render(<Fleet ships={ships}/>)
  const fleet = await screen.findByTestId('fleet')
  expect(fleet).toBeInTheDocument()
})