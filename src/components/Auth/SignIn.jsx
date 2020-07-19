import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Button, FormGroup, FormControl } from 'react-bootstrap';
import PropTypes from 'prop-types';

import logo from '../../assets/logo/logo.png';
import './Sign.css';
import API from '../../apis/API';
import { authUser } from '../../redux/actions/actions';

const SignIn = (props) => {
  const dispatch = useDispatch();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const validateForm = () => {
    return email.length > 0 && password.length > 0;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!validateForm()) {
      setErrorMessage('Please enter a valid email and password');
      return;
    }

    setErrorMessage('');
    setLoading(true);

    API.instance
      .post('/user/login', { email, password })
      .then(({ data }) => {
        setLoading(false);
        dispatch(authUser(data));

        props.history.push(props.location?.state?.from ?? '/');
      })
      .catch((error) => {
        setLoading(false);
        setErrorMessage(
          error.response?.data?.message || 'An unexpected error occurred',
        );
      });
  };

  return (
    <div className="SignIn">
      <img className="SignInLogo" src={logo} alt="logo" />
      <form className="SignInForm" onSubmit={handleSubmit}>
        <FormGroup controlId="email">
          <FormControl
            autoFocus
            type="email"
            value={email}
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </FormGroup>
        <FormGroup controlId="password">
          <FormControl
            type="password"
            value={password}
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </FormGroup>
        <Button
          style={{ width: '100%' }}
          disabled={loading}
          type="submit"
          bssize="large"
        >
          {loading ? 'Loading' : 'Sign In'}
        </Button>
      </form>
      {errorMessage && <p className="text-danger">{errorMessage}</p>}
    </div>
  );
};

SignIn.propTypes = {
  location: PropTypes.shape({
    state: PropTypes.shape({
      from: PropTypes.shape({
        path: PropTypes.string.isRequired,
      }),
    }),
  }).isRequired,
  history: PropTypes.shape({ push: PropTypes.func.isRequired }).isRequired,
};

export default SignIn;
