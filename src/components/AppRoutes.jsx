import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import About from './About/About';
import SignIn from './Auth/SignIn';
import SignUp from './Auth/SignUp';
import UsersIndex from './Users/UsersIndex';
import UsersInsert from './Users/UsersInsert';
import UsersUpdate from './Users/UsersUpdate';
import Product from './Product/ProductList';
import Navigation from './Navigation/Navigation';
import WIP from './shared/WIP';
import TransactionList from './Transaction/TransactionList';

export default function AppRoutes() {
  return (
    <Navigation>
      <Switch>
        <Route path="/signin" component={SignIn} />
        <Route path="/about" component={About} />
        <Route path="/signup" component={SignUp} />
        <Route path="/transactions" component={TransactionList} />
        <Route path="/user-index" component={UsersIndex} />
        <Route path="/user-insert" component={UsersInsert} />
        <Route path="/user-update" component={UsersUpdate} />
        <Route path="/" component={Product} />
      </Switch>
      <ToastContainer />
    </Navigation>
  );
}
