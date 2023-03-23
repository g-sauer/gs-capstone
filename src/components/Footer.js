export const Footer = () => {
  return (
    <footer className='footer'>
      <img src={'footer-logo.png'} alt='Little Lemon logo' />
      <nav className='footer-list'>
        <header>
          Doormat <br /> Navigation
        </header>
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
      <div className='footer-list'>
        <header>Contact</header>
        <ul>
          <li>Address</li>
          <li>Phone number</li>
          <li>Email</li>
        </ul>
      </div>
      <div className='footer-list'>
        <header>Social Media Links</header>
        <ul>
          <li>Twitter</li>
          <li>Facebook</li>
          <li>Instagram</li>
        </ul>
      </div>
    </footer>
  )
}
