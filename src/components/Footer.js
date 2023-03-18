export const Footer = () => {
  return (
    <footer>
      <img src={'footer-logo.png'} alt='Little Lemon logo' />
      <nav>
        <header>Navigation</header>
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
            <a href='/'>Reservations</a>
          </li>
          <li>
            <a href='/'>Order Online</a>
          </li>
          <li>
            <a href='/'>Login</a>
          </li>
        </ul>
      </nav>
      <nav>
        <header>Contact</header>
        <ul>
          <li>Address</li>
          <li>Phone number</li>
          <li>Email</li>
        </ul>
        <nav>
          <header>Social media</header>
          <ul>
            <li>Twitter</li>
            <li>Facebook</li>
            <li>Instagram</li>
          </ul>
        </nav>
      </nav>
    </footer>
  )
}
