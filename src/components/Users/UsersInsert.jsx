import React, { Component } from 'react';
import {
  Button,
  Container,
  Row,
  Col,
  FormLabel,
  FormGroup,
  FormControl,
} from 'react-bootstrap';
import ReactTooltip from 'react-tooltip';
import API from '../../apis/API';
import { getIDfromRole, validRole } from '../shared/userRoleHelpers';
import Header, { HeaderPadding } from '../Navigation/Header';
import '../Auth/Sign.css';

class UsersInsert extends Component {
  constructor(props) {
    super(props);

    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      userRole: '',
      successMessage: '',
      errorMessage: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    const { value } = e.target;
    const { name } = e.target;

    this.setState({
      [name]: value,
    });
  }

  handleSubmit(e) {
    const { firstName, lastName, email, password, userRole } = this.state;

    if (!validRole(userRole)) {
      this.setState({
        successMessage: null,
        errorMessage: 'Please input a valid role',
      });

      return;
    }

    const userLevelID = getIDfromRole(userRole);

    API.instance
      .post(`/user/create`, {
        userLevelID,
        email,
        password,
        firstName,
        lastName,
      })
      .then(() => {
        this.setState({
          errorMessage: null,
          successMessage: 'Success',
        });
      })
      .catch((error) => {
        this.setState({
          successMessage: null,
          errorMessage:
            error.response?.data?.message || 'An unexpected error occurred',
        });
      });

    e.preventDefault();
  }

  render() {
    const {
      firstName,
      lastName,
      email,
      password,
      userRole,
      successMessage,
      errorMessage,
    } = this.state;

    return (
      <div>
        <Header />
        <HeaderPadding />
        <Container>
          <Row>
            <Col />
            <Col>
              <div className="SignIn">
                <form className="SignInForm" onSubmit={this.handleSubmit}>
                  <FormGroup controlId="firstName" bssize="large">
                    <FormLabel>First Name</FormLabel>
                    <FormControl
                      autoFocus
                      name="firstName"
                      type="text"
                      value={firstName}
                      onChange={this.handleChange}
                    />
                  </FormGroup>
                  <FormGroup bssize="large">
                    <FormLabel>Last Name</FormLabel>
                    <FormControl
                      name="lastName"
                      type="text"
                      value={lastName}
                      onChange={this.handleChange}
                    />
                  </FormGroup>
                  <FormGroup controlId="email" bssize="large">
                    <FormLabel>Email</FormLabel>
                    <FormControl
                      name="email"
                      type="email"
                      value={email}
                      onChange={this.handleChange}
                    />
                  </FormGroup>
                  <FormGroup bssize="large">
                    <FormLabel>Password</FormLabel>
                    <FormControl
                      name="password"
                      type="password"
                      value={password}
                      onChange={this.handleChange}
                    />
                  </FormGroup>
                  <FormGroup bssize="large">
                    <FormLabel>User Role</FormLabel>
                    <FormControl
                      name="userRole"
                      type="text"
                      value={userRole}
                      onChange={this.handleChange}
                    />
                  </FormGroup>
                  <Button
                    data-tip
                    data-for="submitTip"
                    onClick={this.handleSubmit}
                  >
                    Submit
                  </Button>
                  {successMessage && (
                    <p className="text-success">{successMessage}</p>
                  )}
                  {errorMessage && (
                    <p className="text-danger">{errorMessage}</p>
                  )}
                  <ReactTooltip id="submitTip" place="top" effect="solid">
                    Only an owner or manager can add a new user
                  </ReactTooltip>
                </form>
              </div>
            </Col>
            <Col />
          </Row>
        </Container>
      </div>
    );
  }
}

export default UsersInsert;
