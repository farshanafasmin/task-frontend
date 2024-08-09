import React from 'react';
import { Container, Navbar } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

function Header() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear user data from local storage
    localStorage.removeItem('currentUserId');
    localStorage.removeItem('authToken');

    // Navigate to home page
    navigate('/');
  };

  // Check if user is logged in
  const isLoggedIn = !!localStorage.getItem('currentUserId');

  return (
    <div className="header-container">
      <Navbar className="bg-body-tertiary">
        <Container>
          <Navbar.Brand className='navbar-brand'>
            <div className='logo'>
              <Link to={'/'} style={{ textDecoration: 'none' }}>Task<span>Aura</span></Link>
            </div>
            <div className='links'>
              {isLoggedIn ? (
                <button onClick={handleLogout} style={{ textDecoration: 'none', color: 'white' }} className='btn py-2 px-3 mb-2 w-100 h-100'>Logout</button>
              ) : (
                <Link to='/authentication' style={{ textDecoration: 'none', color: 'white' }} className='btn py-2 px-3 mb-2 w-100 h-100'>Login</Link>
              )}
            </div>
          </Navbar.Brand>
        </Container>
      </Navbar>
    </div>
  );
}

export default Header;
