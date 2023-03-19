import { Nav } from '../components/Nav'
export const Header = () => {
  return (
    <header className='header'> 
      <div className='logo'>
        <img src={'Logo.svg'} alt='Little Lemon logo' />
      </div>
      <Nav />
    </header>
  )
}
