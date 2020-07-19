import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import About from './About/About';
import SignIn from './Auth/SignIn';
import SignUp from './Auth/SignUp';
import UsersIndex from './Users/UsersIndex';
import Product from './Product/ProductList';
import Nav from './Nav/Nav';
import AuthenticatedRoute from './shared/AuthenticatedRoute';

export default function AppRoutes() {
  return (
    <>
      <Nav />
      <Switch>
        <Route path="/signin" component={SignIn} />
        <Route path="/about" component={About} />
        <Route path="/signup" component={SignUp} />
        <Route path="/user-index" component={UsersIndex} />
        <Route path="/" component={Product} />
      </Switch>
    </>
  );
}
