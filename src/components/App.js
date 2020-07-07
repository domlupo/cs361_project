import React from 'react';
import './App.css';
import {Navbar, Container } from 'react-bootstrap';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Different Time Zone</h1>
        <Navbar expand="lg" variant="light" bg="light">
          <Container className="nav-bar">
            <Navbar.Brand href="#">Navbar</Navbar.Brand>
          </Container>
        </Navbar>
      </header>
      <body className="App-body">
        <h3>Grocery Story </h3>
      </body>
    </div>
  );
}

export default App;
