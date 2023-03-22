import { render, screen, fireEvent } from '@testing-library/react'
import App from './App'
import { reducer, Booking } from './components/Main'

test('home page renders', () => {
  render(<App />)
  const linkElement = screen.getByText(/reserve a table/i)
  expect(linkElement).toBeInTheDocument()
})
test('booking page renders', () => {
  render(<Booking availableTimes={[]} dispatch={() => {}} />)
  const linkElement = screen.getByText(/Find a table/i)
  expect(linkElement).toBeInTheDocument()
})

describe('Reducer related', () => {
  test('changing the date dispatches update_times to reducer', () => {
    const dispatch = jest.fn()
    const availableTimes = ['17:00', '18:00', '19:00']
    render(<Booking availableTimes={availableTimes} dispatch={dispatch} />)

    const dateInput = screen.getByLabelText('Choose date')
    fireEvent.change(dateInput, { target: { value: '2023-09-22' } })

    expect(dispatch).toHaveBeenCalledWith({
      type: 'update_times',
      date: '2023-09-22',
    })
  })
  test('on first load of Booking dispatches initialize_times to reducer', () => {
    const dispatch = jest.fn()
    const availableTimes = ['17:00', '18:00', '19:00']
    render(<Booking availableTimes={availableTimes} dispatch={dispatch} />)

    expect(dispatch).toHaveBeenCalledWith({ type: 'initialize_times' })
    expect(dispatch).toHaveBeenCalledTimes(1)
  })

  test('reducer returns only 17:00 on update_times', () => {
    const result = reducer([], { type: 'update_times' })
    expect(result).toStrictEqual(['17:00'])
  })
})
describe('form related', () => {
  test('cannot submit with empty fields', () => {
    const dispatch = jest.fn()
    render(<Booking availableTimes={[]} dispatch={dispatch} />)

    const btn = screen.getByRole('button')
    fireEvent.click(btn)
    expect(dispatch).not.toHaveBeenCalledWith({ type: 'update_times'})
  })
  test('should be able to submit if fields are filled', () => { 
    const dispatch = jest.fn()
    render(<Booking availableTimes={[]} dispatch={dispatch} />)
    const btn = screen.getByRole('button')

    const dateInput = screen.getByLabelText('Choose date')
    fireEvent.change(dateInput, { target: { value: '2023-09-22' } })
    const timeInput = screen.getByLabelText('Choose time')
    fireEvent.change(timeInput, { target: { value: '17:00' } })
    const guestsInput = screen.getByLabelText('Number of guests')
    fireEvent.change(guestsInput, { target: { value: '3' } })

    fireEvent.click(btn)
    expect(dispatch).toHaveBeenCalledWith({ type: 'update_times'})

   })
})
