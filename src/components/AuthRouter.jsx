import React from 'react';

import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useSelector } from 'react-redux';
import SignIn from './Auth/SignIn';
import AuthenticatedRoute from './shared/AuthenticatedRoute';
import AppRoutes from './AppRoutes';

export default function AuthRouter() {
  const authenticated = useSelector((state) => state.authenticated);
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/signin" component={SignIn} />
        <AuthenticatedRoute
          authenticated={authenticated}
          path="/"
          component={AppRoutes}
        />
      </Switch>
    </BrowserRouter>
  );
}
