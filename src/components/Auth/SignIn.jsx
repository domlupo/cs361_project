import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Button, FormLabel, FormGroup, FormControl } from 'react-bootstrap';
import './Sign.css';
import API from '../../apis/API';
import { authUser } from '../../redux/actions/actions';

const SignIn = () => {
  const dispatch = useDispatch();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

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

    API.instance
      .post('/user/login', { email, password })
      .then(({ data }) => {
        dispatch(authUser(data));
      })
      .catch((error) => {
        setErrorMessage(
          error.response?.data?.message || 'An unexpected error occurred',
        );
      });
  };

  return (
    <div className="SignIn">
      <form onSubmit={handleSubmit}>
        <FormGroup controlId="email" bssize="large">
          <FormLabel>Email</FormLabel>
          <FormControl
            autoFocus
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </FormGroup>
        <FormGroup controlId="password" bssize="large">
          <FormLabel>Password</FormLabel>
          <FormControl
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </FormGroup>
        <Button type="submit">Sign In</Button>
      </form>
      {errorMessage && <p className="text-danger">{errorMessage}</p>}
    </div>
  );
};

export default SignIn;
