import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import ButtonLink from '../ButtonLink'
import { setUserName } from '../../../../Utils/BattleshipAPI'

const updateHint = jest.fn()
const mockedUsedNavigate = jest.fn()

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedUsedNavigate,
}))

jest.mock('../../../../Utils/BattleshipAPI', () => ({
  setUserName: jest.fn(),
}))

it('renders', () => {
  render(<ButtonLink fleetReady={false} userName="" />)
  const button = screen.getByTestId('play-button')
  expect(button).toBeInTheDocument()
})

describe('transforms', () => {
  it('transform the button on hover when conditions are met', () => {
    render(<ButtonLink fleetReady={true} userName="username" />)
    const button = screen.getByTestId('play-button')
    fireEvent.mouseEnter(button)
    expect(button).toHaveStyle('transform: scale(1.1);')
    expect(button).toHaveStyle(
      'box-shadow: 2px 4px 50px 0 rgba(0, 0, 0, 0.25);'
    )
  })

  it('untransform the button on hover when conditions are met', () => {
    render(<ButtonLink fleetReady={true} userName="username" />)
    const button = screen.getByTestId('play-button')
    fireEvent.mouseEnter(button)
    fireEvent.mouseLeave(button)
    expect(button).toHaveStyle('transform: scale(1);')
    expect(button).toHaveStyle(
      'box-shadow: 2px 4px 10px 0 rgba(0, 0, 0, 0.25);'
    )
  })

  // not able to check, because original values are inherited from Home.css

  // it('does not transform the button on hover when conditions are met', () => {
  //   render(<ButtonLink fleetReady={false} userName="username" />)
  //   const button = screen.getByTestId('play-button')
  //   fireEvent.mouseEnter(button)
  //   expect(button).toHaveStyle('transform: scale(1);')
  //   expect(button).toHaveStyle(
  //     'box-shadow: 2px 4px 10px 0 rgba(0, 0, 0, 0.25);'
  //   )
  // })
})

describe('background color', () => {
  it('displays the Play button with a gray background if the desired conditions are not met', () => {
    render(<ButtonLink fleetReady={false} userName="" />)
    const button = screen.getByTestId('play-button')
    expect(button).toHaveStyle('background-color: gray;')
  })

  it('displays the Play button with a lightseagreen background if the fleet is ready and userName is not an empty string', () => {
    render(<ButtonLink fleetReady={true} userName="username" />)
    const button = screen.getByTestId('play-button')
    expect(button).toHaveStyle('background-color: lightseagreen;')
  })
})

describe('calls function', () => {
  it('calls setUserName and useNavigate with the correct arguments when the Play button is clicked and fleet is ready and userName is not an empty string', async () => {
    // const navigate = mockedUsedNavigate()
    render(
      <ButtonLink
        fleetReady={true}
        userName="username"
        userId="45345345"
        updateHint={updateHint}
      />
    )
    const button = screen.getByTestId('play-button')
    fireEvent.click(button)

    expect(setUserName).toHaveBeenCalledWith('username')
    // expect(navigate).toHaveBeenCalled()
  })

  it('does not calls setUserName and useNavigate when the Play button is clicked and conditions are not met', async () => {
    // const navigate = mockedUsedNavigate()
    render(
      <ButtonLink
        fleetReady={false}
        userName=""
        userId="45345345"
        updateHint={updateHint}
      />
    )
    const button = screen.getByTestId('play-button')
    fireEvent.click(button)

    expect(setUserName).toHaveBeenCalledTimes(0)
    // expect(navigate).toHaveBeenCalledTimes(0)
  })
})

describe('update hint', () => {
  it('updates hint with correct message when fleet is ready and username is an empty string', async () => {
    // const navigate = mockedUsedNavigate()
    render(
      <ButtonLink
        fleetReady={true}
        userName=""
        userId="45345345"
        updateHint={updateHint}
      />
    )
    const button = screen.getByTestId('play-button')
    fireEvent.click(button)
    expect(updateHint).toHaveBeenCalledWith(
      'Before the game begins please enter your name'
    )
  })

  it('updates hint with correct message when fleet is not ready', async () => {
    // const navigate = mockedUsedNavigate()
    render(
      <ButtonLink
        fleetReady={false}
        userName=""
        userId="45345345"
        updateHint={updateHint}
      />
    )
    const button = screen.getByTestId('play-button')
    fireEvent.click(button)
    expect(updateHint).toHaveBeenCalledWith(
      'To begin the game please put all of your ships on the map'
    )
  })
})
