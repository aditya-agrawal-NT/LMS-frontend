import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import './Navbar.css'
import logo from "../../../assets/logo-main2.png";

const Navbar = () => {

  const[search, setSearch] = useState()

  const handleChange = (e) => {
    setSearch(e.target.value)
  }

  const handleClick = () => {
    console.log(search)
    setSearch()
  }

  return (
    <nav className="navbar">
        <ul className="navbar-menu">
            <li className="navbar-logo"><Link to ="/"><img src={logo} alt="logo" className='logo'></img></Link></li>
            {/* <li className='shop-name'>Dukaan - Your Hoodie Store</li> */}
            {/* <li className='search'><input type='text' placeholder='Search Products' className="searchbar" onChange={handleChange}></input>
            <button className='search-button' onClick={handleClick}>Search</button>
            <div className='search-icon' onClick={handleClick}><FaSearch /></div>
            </li> */}
            <li className="nav-link">
              {/* <Link to ="/contact" className='navbar-item nav-items'>Contact Us</Link>  */}
              <Link to ="/about" className='navbar-item nav-items'>About Us</Link>
            </li>
            {/* <li className="navbar-item"><Link to='/login'><button className="login-logout">Login</button></Link></li> */}
        </ul>
    </nav>
    
  )
}

export default Navbar
