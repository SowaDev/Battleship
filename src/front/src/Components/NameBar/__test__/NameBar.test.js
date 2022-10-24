import { render, screen, fireEvent, getByText, getByDisplayValue } from '@testing-library/react'
import userEvent from '@testing-library/user-event';
import NameBar from '../NameBar'

const mockChangeName = jest.fn();

test('renders correctly', () => {
  render(<NameBar name={''}
                  changeName={mockChangeName} />)
  const input = screen.getByRole('textbox')
  expect(input).toBeInTheDocument()
})

test('on initial render should display correct placeholder value', () => {
  render(<NameBar name={''}
                  changeName={mockChangeName} />)
  const input = screen.getByRole('textbox')
  expect(input.getAttribute('placeholder')).toBe('Enter your name')
})