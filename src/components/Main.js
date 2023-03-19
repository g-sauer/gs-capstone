const Card = ({ image, name, price, text }) => (
  <div className='card'>
    <img className='card-image' src={image} alt={name} />
    <div className='card-text'>
      <h1>{name}</h1>
      <h2>${price}</h2>
      <p>{text}</p>
    </div>
    <div className='order-button'>
      <a href={`/order?${name}`}>Order a delivery</a>
      <img src='bike.svg' alt='' />
    </div>
  </div>
)

const Hero = () => (
  <main>
    <div className='hero'>
      <div>
        <h1>Little Lemon</h1>
        <h2>Chicago</h2>
        <main>
          We are a family owned <br /> Mediterranean restaurant, <br />
          focused on traditional <br /> recipes served with a modern <br />
          twist.
        </main>
        <a className='button' href='/reserve'>
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
      <a className='button' href='/menu'>
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

export const Main = () => {
  return (
    <>
      <Hero />
      <Specials />
      <Testimonials />
      <About />
    </>
  )
}
