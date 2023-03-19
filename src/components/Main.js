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
      {specials.map((special) => (
        <Card
          image={special.image}
          name={special.name}
          price={special.price}
          text={special.text}
        />
      ))}
    </div>
  )
}

export const Main = () => {
  return (
    <>
      <Hero />
      <Specials />
    </>
  )
}
