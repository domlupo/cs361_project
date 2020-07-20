import React, { Component, useState } from 'react';
import {
  Button,
  Form,
  FormLabel,
  FormGroup,
  FormControl,
} from 'react-bootstrap';
import './Sign.css';

export default function SignUp() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function validateForm() {
    return email.length > 0 && password.length > 0;
  }

  function handleSubmit(event) {
    event.preventDefault();
  }

  return (
    <div className="SignIn">
      <form className="SignInForm" onSubmit={handleSubmit}>
        <FormGroup controlId="firstName" bssize="large">
          <FormLabel>First Name</FormLabel>
          <FormControl
            autoFocus
            type="firstName"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </FormGroup>
        <FormGroup controlId="lastName" bssize="large">
          <FormLabel>Last Name</FormLabel>
          <FormControl
            type="lastName"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </FormGroup>
        <FormGroup controlId="email" bssize="large">
          <FormLabel>Email</FormLabel>
          <FormControl
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
        <Button style={{ width: '100%' }} type="submit">
          Sign Up
        </Button>
      </form>
    </div>
  );
}
