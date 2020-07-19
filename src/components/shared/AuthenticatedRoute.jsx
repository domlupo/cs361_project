import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

export default function AuthenticatedRoute({
  component: Component,
  authenticated,
  ...rest
}) {
  return (
    <Route
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...rest}
      render={(props) =>
        authenticated === true ? (
          // eslint-disable-next-line react/jsx-props-no-spreading
          <Component {...props} />
        ) : (
          <Redirect
            to={{ pathname: '/signin', state: { from: props.location } }}
          />
        )
      }
    />
  );
}

AuthenticatedRoute.propTypes = {
  authenticated: PropTypes.bool.isRequired,
  component: PropTypes.node.isRequired,
};
