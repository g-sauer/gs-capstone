import { useFormik } from 'formik'
import { useEffect, useReducer, useState } from 'react'
import {
  BrowserRouter as Router,
  Routes,
  Switch,
  Route,
  Link,
  useNavigate,
} from 'react-router-dom'
import { fetchAPI, submitAPI } from '../api'
import * as Yup from 'yup'

const Card = ({ image, name, price, text }) => (
  <div className='card'>
    <img className='card-image' src={image} alt={name} />
    <div className='card-text'>
      <h1>{name}</h1>
      <h2>${price}</h2>
      <p>{text}</p>
    </div>
    <div className='order-button'>
      <a role='button' href={`/order?${name}`}>
        Order a delivery
      </a>
      <img src='bike.svg' alt='' />
    </div>
  </div>
)

const Hero = () => (
  <main>
    <div className='hero'>
      <div>
        <h1 id='ll-header'>Little Lemon</h1>
        <h2>Chicago</h2>
        <main>
          We are a family owned <br /> Mediterranean restaurant, <br />
          focused on traditional <br /> recipes served with a modern <br />
          twist.
        </main>
        <a role='button' className='button' href='/booking'>
          Reserve a Table
        </a>
      </div>
      <img src={'restauranfood.jpg'} alt='' />
    </div>
  </main>
)

const Specials = () => {
  const specials = [
    {
      image: 'greek-salad.jpg',
      name: 'Greek salad',
      price: '12.99',
      text: 'The famous Greek salad of crispy lettuce, peppers, olives and our Chicago style feta cheese, garnished with crunchy garlic and rosemary croutons.',
    },
    {
      image: 'bruschetta.svg',
      name: 'Bruschetta',
      price: '5.99',
      text: 'Our Bruschetta is made from grilled bread that has been smeared with garlic and seasoned with salt and olive oil. ',
    },
    {
      image: 'lemon-dessert.jpg',
      name: 'Lemon Dessert',
      price: '5.00',
      text: 'This comes straight from grandma’s recipe book, every last ingredient has been sourced and is as authentic as can be imagined.',
    },
  ]
  return (
    <div className='specials'>
      <h1>This week's specials!</h1>
      <a role='button' className='button' href='/menu'>
        Online Menu
      </a>
      {specials.map((special, index) => (
        <Card
          image={special.image}
          name={special.name}
          price={special.price}
          text={special.text}
          key={index}
        />
      ))}
    </div>
  )
}

const numberToStars = (rating) => {
  const result = []
  let i = 0
  while (i < rating) {
    result.push('⭐')
    i++
  }
  return result
}

const TestimonialCard = ({ rating, image, name, review }) => (
  <div className='testimonial-card'>
    <div>{numberToStars(rating)}</div>
    <img src={image} alt='' />
    <h3>{name}</h3>
    <p>{review}</p>
  </div>
)

const Testimonials = () => {
  const testimonials = [
    {
      rating: 4,
      image: 'Testimonial-1.jpg',
      name: 'Mary',
      review:
        'Review text Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod quibusdam deserunt, iure veniam omnis inventore architecto alias',
    },
    {
      rating: 5,
      image: 'Testimonial-2.jpg',
      name: 'Jane',
      review:
        'Review text Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod quibusdam deserunt, iure veniam omnis inventore architecto alias',
    },
    {
      rating: 5,
      image: 'Testimonial-3.jpg',
      name: 'John',
      review:
        'Review text Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod quibusdam deserunt, iure veniam omnis inventore architecto alias',
    },
    {
      rating: 4,
      image: 'Testimonial-4.jpg',
      name: 'Bob',
      review:
        'Review text Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod quibusdam deserunt, iure veniam omnis inventore architecto alias',
    },
  ]
  return (
    <div className='testimonials'>
      <h1>Testimonials</h1>
      {testimonials.map((testimonial, index) => (
        <TestimonialCard
          rating={testimonial.rating}
          image={testimonial.image}
          name={testimonial.name}
          review={testimonial.review}
          key={index}
        />
      ))}
    </div>
  )
}

const About = () => (
  <div className='about'>
    <h1>Little Lemon</h1>
    <h2>Chicago</h2>
    <p>
      Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint.
      Velit officia consequat duis enim velit mollit. Exercitation veniam
      consequat sunt nostrud amet. Amet minim mollit non deserunt ullamco est
      sit aliqua dolor do amet sint. Velit officia consequat duis enim velit
      mollit.{' '}
    </p>
    <img src='Mario and Adrian A.jpg' alt='Mario and Adrian' />
    <img src='Mario and Adrian b.jpg' alt='Mario and Adrian' />
  </div>
)

const ConfirmedBooking = () => {
  return (
    <div>
      <h1>Your booking was confirmed</h1>
    </div>
  )
}

export const Booking = ({ availableTimes, dispatch, submitForm }) => {
  const [date, setDate] = useState('')
  const [time, setTime] = useState('')
  const [guests, setGuests] = useState('1')
  const [occasion, setOccasion] = useState('')
  const navigate = useNavigate()
  const today = new Date().toLocaleDateString('en-CA')
  const formik = useFormik({
    initialValues: {
      date: '',
      time: '',
      guests: 1,
      occasion: '',
    },
    onSubmit: (values) => {
      // console.error(values)
      if (submitForm(values)) {
        navigate('/confirmation')
      }
    },
    validationSchema: Yup.object({
      date: Yup.date()
        .min(today, 'Date cannot be before current date')
        .required('Required'),
      time: Yup.string().required('Required'),
      guests: Yup.number()
        .min(1, 'Must be at least 1')
        .max(
          10,
          'To make a reservation for more than 10 people, please call us'
        )
        .required('Required'),
    }),
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    if (
      submitForm({
        date: date,
        time: time,
        guests: guests,
        occasion: occasion,
      }) === true
    )
      navigate('/confirmation')
  }
  const handleDateChange = (e) => {
    setDate(e.target.value)
    dispatch({ type: 'update_times', date: new Date(e.target.value) })
  }

  useEffect(() => {
    dispatch({ type: 'initialize_times' })
    setTime(availableTimes[0])
  }, [])
  return (
    <div className='booking'>
      <h1 id='ll-header'>Little Lemon</h1>
      <h2>Chicago</h2>
      <h3>Find a table for any occasion</h3>
      <form className='booking-form' onSubmit={formik.handleSubmit}>
        <label htmlFor='res-date'>Choose date</label>
        <input
          type='date'
          name='date'
          id='res-date'
          min={today}
          onChange={(e) => {
            formik.handleChange(e)
            handleDateChange(e)
          }}
          required
        />
        {formik.errors.date && (
          <div className='error'>{formik.errors.date}</div>
        )}
        <label htmlFor='res-time'>Choose time</label>
        <select
          name='time'
          required
          value={time}
          id='res-time'
          onChange={formik.handleChange}
        >
          <option hidden disabled value=''>
            Choose time
          </option>
          {availableTimes.map((date, i) => (
            <option key={i}>{date}</option>
          ))}
        </select>
        {formik.errors.time && (
          <div className='error'>{formik.errors.time}</div>
        )}
        <label htmlFor='guests'>Number of guests</label>
        <input
          name='guests'
          type='number'
          placeholder={1}
          min={1}
          max={10}
          id='guests'
          onChange={formik.handleChange}
        />
        {formik.errors.guests && (
          <div className='error'>{formik.errors.guests}</div>
        )}
        <label htmlFor='occasion'>Occasion</label>
        <select name='occasion' id='occasion' onChange={formik.handleChange}>
          <option></option>
          <option>Birthday</option>
          <option>Anniversary</option>
        </select>
        <input
          className='button'
          id='form-submit'
          type='submit'
          defaultValue='Make Your reservation'
          disabled={!(formik.isValid && formik.dirty)}
        />
      </form>
    </div>
  )
}

const HomePage = () => (
  <>
    <Hero />
    <Specials />
    <Testimonials />
    <About />
  </>
)
export const fetchData = (date) => {
  return fetchAPI(date)
}

export const reducer = (state, action) => {
  switch (action.type) {
    case 'update_times':
      return fetchData(action.date)
    case 'initialize_times':
      return fetchData(new Date())
    default:
      return state
  }
}
export const Main = () => {
  const initialState = []
  const [state, dispatch] = useReducer(reducer, initialState)

  const submitForm = (form) => {
    return submitAPI(form)
  }

  return (
    <Router>
      <Routes>
        <Route path='/' element={<HomePage />}></Route>
        <Route
          path='/booking'
          element={
            <Booking
              availableTimes={state}
              dispatch={dispatch}
              submitForm={submitForm}
            />
          }
        ></Route>
        <Route path='/confirmation' element={<ConfirmedBooking />}></Route>
      </Routes>
    </Router>
  )
}
