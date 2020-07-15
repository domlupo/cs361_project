import React, {Component, useState } from 'react';
import {Button, Form, FormLabel, FormGroup, FormControl} from 'react-bootstrap';
import './Sign.css';


export default function SignUp(){
    const [firstName, setFirstName] = useState(""); 
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState(""); 
    const [password, setPassword] = useState("");

    function validateForm(){
        return email.length > 0 && password.length > 0;
    }

    function handleSubmit(event){
        event.preventDefault();
    }

    return (
        <div className="SignIn">
            <form onSubmit={handleSubmit}>
                <FormGroup controlId="firstName" bsSize="large">
                    <FormLabel>First Name</FormLabel>
                    <FormControl autoFocus type="firstName" value={firstName} onChange={e => setFirstName(e.targe.value)} />
                </FormGroup>
                <FormGroup controlId="lastName" bsSize="large">
                    <FormLabel>Last Name</FormLabel>
                    <FormControl type="lastName" value={lastName} onChange={e => setLastName(e.targe.value)} />
                </FormGroup>
                <FormGroup controlId="email" bsSize="large">
                    <FormLabel>Email</FormLabel>
                    <FormControl type="email" value={email} onChange={e => setEmail(e.targe.value)} />
                </FormGroup>
                <FormGroup controlId="password" bsSize="large">
                    <FormLabel>Password</FormLabel>
                    <FormControl type="password" value={password} onChange={e => setPassword(e.target.value)}  />
                </FormGroup>
                <Button type="submit">
                    Sign Up
                </Button>
            </form>
        </div>
    );

};
