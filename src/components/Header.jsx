import { Link } from 'react-router-dom'

function Header() {
  return (
    <header className="header">
      <div className="header-content">
        <Link to="/" className="logo">
          🌍 HobbyHub Travel
        </Link>
        <nav>
          <ul className="nav-links">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/create">Create Post</Link></li>
          </ul>
        </nav>
      </div>
    </header>
  )
}

export default Header