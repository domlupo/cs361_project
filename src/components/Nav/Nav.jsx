import { Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import React from 'react';

export default function Nav() {
  return (
    <header className="App-header">
      <h1>Different Time Zone Inventory Management System</h1>
      <Navbar>
        <Link to="/about" style={{ margin: '10px' }}>
          About
        </Link>
        <Link to="/signin" style={{ margin: '10px' }}>
          Sign In
        </Link>
        <Link to="/signup" style={{ margin: '10px' }}>
          Sign Up
        </Link>
        <Link to="/user-index" style={{ margin: '10px' }}>
          User Index
        </Link>
        <Link to="/product" style={{ margin: '10px' }}>
          Product
        </Link>
      </Navbar>
    </header>
  );
}
