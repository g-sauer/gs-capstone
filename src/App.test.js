import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import App from './App'
import { reducer, Booking, fetchData } from './components/Main'
const mockedUsedNavigate = jest.fn()

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedUsedNavigate,
}))

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
      date: new Date('2023-09-22'),
    })
  })
  test('on first load of Booking dispatches initialize_times to reducer', () => {
    const dispatch = jest.fn()
    const availableTimes = ['17:00', '18:00', '19:00']
    render(<Booking availableTimes={availableTimes} dispatch={dispatch} />)

    expect(dispatch).toHaveBeenCalledWith({ type: 'initialize_times' })
    expect(dispatch).toHaveBeenCalledTimes(1)
  })
})
describe('form related', () => {
  test('cannot submit with empty fields', () => {
    const submitForm = jest.fn()
    render(
      <Booking
        availableTimes={[]}
        dispatch={() => {}}
        submitForm={submitForm}
      />
    )

    const btn = screen.getByRole('button')
    fireEvent.click(btn)
    expect(submitForm).not.toHaveBeenCalled()
  })
  test('should be able to submit if fields are filled', async () => {
    const submitForm = jest.fn()
    render(
      <Booking
        availableTimes={['17:00', '17:30', '18:00']}
        dispatch={() => {}}
        submitForm={submitForm}
      />
    )
    const btn = screen.getByRole('button')

    const dateInput = screen.getByLabelText('Choose date')
    fireEvent.change(dateInput, { target: { value: '2023-09-22' } })
    const timeInput = screen.getByLabelText('Choose time')
    fireEvent.change(timeInput, { target: { value: '17:30' } })
    const guestsInput = screen.getByLabelText('Number of guests')
    fireEvent.change(guestsInput, { target: { value: 3 } })
    const occasionInput = screen.getByLabelText('Occasion')
    fireEvent.change(occasionInput, { target: { value: 'Birthday' } })

    fireEvent.click(btn)
    await waitFor(() => {
      expect(submitForm).toHaveBeenCalledWith({
        date: '2023-09-22',
        guests: 3,
        occasion: 'Birthday',
        time: '17:30',
      })
    })
  })
  test('cannot submit if date is empty', async () => {
    const submitForm = jest.fn()
    render(
      <Booking
        availableTimes={['17:00', '17:30', '18:00']}
        dispatch={() => {}}
        submitForm={submitForm}
      />
    )
    const btn = screen.getByRole('button')

    const timeInput = screen.getByLabelText('Choose time')
    fireEvent.change(timeInput, { target: { value: '17:30' } })
    const guestsInput = screen.getByLabelText('Number of guests')
    fireEvent.change(guestsInput, { target: { value: 3 } })
    const occasionInput = screen.getByLabelText('Occasion')
    fireEvent.change(occasionInput, { target: { value: 'Birthday' } })

    fireEvent.click(btn)
    await waitFor(() => {
      expect(submitForm).not.toHaveBeenCalled()
    })
  })
  test('cannot submit if time is empty', async () => {
    const submitForm = jest.fn()
    render(
      <Booking
        availableTimes={['17:00', '17:30', '18:00']}
        dispatch={() => {}}
        submitForm={submitForm}
      />
    )
    const btn = screen.getByRole('button')

    const dateInput = screen.getByLabelText('Choose date')
    fireEvent.change(dateInput, { target: { value: '2023-09-22' } })
    const guestsInput = screen.getByLabelText('Number of guests')
    fireEvent.change(guestsInput, { target: { value: 3 } })
    const occasionInput = screen.getByLabelText('Occasion')
    fireEvent.change(occasionInput, { target: { value: 'Birthday' } })

    fireEvent.click(btn)
    await waitFor(() => {
      expect(submitForm).not.toHaveBeenCalled()
    })
  })
  test('cannot submit if guests is under 1', async () => {
    const submitForm = jest.fn()
    render(
      <Booking
        availableTimes={['17:00', '17:30', '18:00']}
        dispatch={() => {}}
        submitForm={submitForm}
      />
    )
    const btn = screen.getByRole('button')

    const dateInput = screen.getByLabelText('Choose date')
    fireEvent.change(dateInput, { target: { value: '2023-09-22' } })
    const timeInput = screen.getByLabelText('Choose time')
    fireEvent.change(timeInput, { target: { value: '17:30' } })
    const occasionInput = screen.getByLabelText('Occasion')
    fireEvent.change(occasionInput, { target: { value: 'Birthday' } })

    const guestsInput = screen.getByLabelText('Number of guests')
    fireEvent.change(guestsInput, { target: { value: -1 } })

    fireEvent.click(btn)
    await waitFor(() => {
      expect(submitForm).not.toHaveBeenCalled()
    })
    
  })
  test('cannot submit if guests is over 10', async () => {
    const submitForm = jest.fn()
    render(
      <Booking
        availableTimes={['17:00', '17:30', '18:00']}
        dispatch={() => {}}
        submitForm={submitForm}
      />
    )
    const btn = screen.getByRole('button')

    const dateInput = screen.getByLabelText('Choose date')
    fireEvent.change(dateInput, { target: { value: '2023-09-22' } })
    const timeInput = screen.getByLabelText('Choose time')
    fireEvent.change(timeInput, { target: { value: '17:30' } })
    const occasionInput = screen.getByLabelText('Occasion')
    fireEvent.change(occasionInput, { target: { value: 'Birthday' } })

    const guestsInput = screen.getByLabelText('Number of guests')
    fireEvent.change(guestsInput, { target: { value: 12 } })

    fireEvent.click(btn)
    await waitFor(() => {
      expect(submitForm).not.toHaveBeenCalled()
    })
    
  })
})
describe('fetching', () => {
  test('fetchData should return a non empty array when called with a date', () => {
    const res = fetchData(new Date())
    expect(res.length).toBeGreaterThan(0)
  })
})
