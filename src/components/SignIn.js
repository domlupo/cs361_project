import React, {Component, useState } from 'react';
import {Button, Form, FormLabel, FormGroup, FormControl} from 'react-bootstrap';
import './Sign.css';


export default function SignIn(){
    
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
                <FormGroup controlId="email" bsSize="large">
                    <FormLabel>Email</FormLabel>
                    <FormControl autoFocus type="email" value={email} onChange={e => setEmail(e.targe.value)} />
                </FormGroup>
                <FormGroup controlId="password" bsSize="large">
                    <FormLabel>Password</FormLabel>
                    <FormControl type="password" value={password} onChange={e => setPassword(e.target.value)}  />
                </FormGroup>
                <Button type="submit">
                    Sign In
                </Button>
            </form>
        </div>
    );
}
    /* constructor(props){
        super(props)
        this.state = {
        email: '',
        password: '',
        firstName: '',
        lastName: ''}
    }

    handleChange = (e) =>{
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    handleSubmit = (e) =>{
        e.preventDefault();
        console.log(this.state);
    }

    render(){
        return (
            <div className="container">
                <form onSubmit={this.handleSubmit} className="white">
                    <h5 className="grey-text text-darken-3">SignIn</h5>
                    <div className="input-field">
                        <label htmlFor="email">Email
                            <input type="email" id="email" onChange={this.handleChange} />
                        </label>
                    </div>
                    <div className="input-field">
                        <label htmlFor="password">Password
                            <input type="password" id="password" onChange={this.handleChange} />
                        </label>
                    </div>
                    <div className="input-field">
                        <button type="button">Login</button>
                    </div>
                </form>
            </div>
        );
    }; */

// };

// export default SignIn;
