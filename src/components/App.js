import React from 'react';
import {Link, BrowserRouter, Switch, Route } from 'react-router-dom';
import {Navbar } from 'react-bootstrap';

import './App.css';
import SignIn from './SignIn';
import SignUp from './SignUp';
import About from './About';


function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <header className="App-header">
          <h1>Different Time Zone Inventory Management System</h1>
          <Navbar>
            <Link to="/about" style={{margin: '10px'}}>About</Link>
            <Link to="/signin" style={{margin: '10px'}}>Sign In</Link>
            <Link to="/signup" style={{margin: '10px'}}>Sign Up</Link>
          </Navbar>
        </header>
        <Switch>
          <Route path='/about' component={About} />
          <Route path='/signin' component={SignIn} />
          <Route path='/signup' component={SignUp} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
