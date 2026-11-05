import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import './Navbar.css'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()

  const isLanding = location.pathname === '/'

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMenuOpen(false)
  }, [location])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  const navLinks = [
    { to: '/home', label: 'Home' },
    { to: '/about', label: 'About' },
    { to: '/services', label: 'Services' },
    { to: '/blog', label: 'Blog' },
    { to: '/contact', label: 'Contact' },
  ]

  // Solid background if scrolled OR if on any page other than the landing page
  const showSolid = scrolled || !isLanding

  return (
    <header className={`navbar ${showSolid ? 'navbar--scrolled' : ''}`}>
      <div className="navbar__inner container">
        <Link to="/" className="navbar__logo">
          <img 
            src={`${import.meta.env.BASE_URL}Logo_Growth Catalyst.png`} 
            alt="Growth Catalyst Logo" 
            className="navbar__logo-img" 
          />
          <span>Growth Catalyst</span>
        </Link>

        <nav className={`navbar__nav ${menuOpen ? 'navbar__nav--open' : ''}`}>
          <ul className="navbar__links">
            {navLinks.map((link) => (
              <li key={link.to}>
                <Link
                  to={link.to}
                  className={`navbar__link ${location.pathname === link.to ? 'navbar__link--active' : ''}`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li className="navbar__cta-mobile">
              <Link to="/intern" className="btn btn--outline btn--pill navbar__cta-btn">
                Be Our Intern
              </Link>
            </li>
          </ul>
        </nav>

        <Link to="/intern" className="btn btn--outline btn--pill navbar__cta-btn navbar__cta-desktop">
          Be Our Intern
        </Link>

        <button
          className={`navbar__hamburger ${menuOpen ? 'navbar__hamburger--open' : ''}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span />
          <span />
          <span />
        </button>
      </div>
    </header>
  )
}
