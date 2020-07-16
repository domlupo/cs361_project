import React from 'react';
import { BrowserRouter, Link, Switch, Route } from 'react-router-dom';
import { Navbar } from 'react-bootstrap';
import About from './About/About';
import SignIn from './Auth/SignIn';
import SignUp from './Auth/SignUp';
import UsersIndex from './Users/UsersIndex';

export default function Router() {
  return (
    <BrowserRouter>
      <div className="App">
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
          </Navbar>
        </header>
        <Switch>
          <Route path="/about" component={About} />
          <Route path="/signin" component={SignIn} />
          <Route path="/signup" component={SignUp} />
          <Route path="/user-index" component={UsersIndex} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}
