import { useState } from 'react'
import { Nav } from '../components/Nav'
const Hamburger = () => {
  const [open, setOpen] = useState(false)
  const handleClick = () => {
    setOpen(!open)
  }
  return (
    <div className='hamburger'>
      <img
        id={open.toString()}
        src='hamburger-menu.svg'
        alt='hamburger menu'
        aria-label='On click'
        onClick={handleClick}
      />
      <nav className='sidebar' id={open.toString()}>
        <ul>
          <li>
            <a href='/'>Home</a>
          </li>
          <li>
            <a href='/'>About</a>
          </li>
          <li>
            <a href='/'>Menu</a>
          </li>
          <li>
            <a href='/booking'>Reservations</a>
          </li>
          <li>
            <a href='/'>Order Online</a>
          </li>
          <li>
            <a href='/'>Login</a>
          </li>
        </ul>
      </nav>
    </div>
  )
}
export const Header = () => {
  return (
    <header className='header'>
      <Hamburger />
      <div className='logo'>
        <img src={'Logo.svg'} alt='Little Lemon logo' />
      </div>
      <Nav />
    </header>
  )
}
