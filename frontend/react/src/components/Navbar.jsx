import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/navbar.css'; // Assuming you create a separate CSS file for styling

const Navbar = () => {
  const isLoggedIn = !!localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/login';
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/">NotesAI</Link>
      </div>
      <div className="navbar-links">
        {isLoggedIn ? (
          <>
            <Link to="/notes">Home</Link>
            <Link to="/new-note">New Note</Link>
            <button onClick={handleLogout} className="logout-button">
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/signup">Sign Up</Link>
            <Link to="/login">Login</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
