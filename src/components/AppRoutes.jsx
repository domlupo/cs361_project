import React from 'react';
import { Switch, Route } from 'react-router-dom';
import About from './About/About';
import SignIn from './Auth/SignIn';
import SignUp from './Auth/SignUp';
import Product from './Product/ProductList';
import UserList from './Users/UserList';
import UsersInsert from './Users/UsersInsert';
import Navigation from './Navigation/Navigation';
import WIP from './shared/WIP';

export default function AppRoutes() {
  return (
    <Navigation>
      <Switch>
        <Route path="/signin" component={SignIn} />
        <Route path="/about" component={About} />
        <Route path="/signup" component={SignUp} />
        <Route path="/transactions" component={WIP} />
        <Route path="/user-insert" component={UsersInsert} />
        <Route path="/user-list" component={UserList} />
        <Route path="/" component={Product} />
      </Switch>
    </Navigation>
  );
}
