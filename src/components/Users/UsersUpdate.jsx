import React, { Component } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import API from '../../apis/API';
import {
  getRoleFromID,
  getIDfromRole,
  validRole,
} from '../shared/userRoleHelpers';
import Header, { HeaderPadding } from '../Navigation/Header';

class UsersUpdate extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userRole: '',
      successMessage: '',
      errorMessage: '',
    };

    this.getUser = this.getUser.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.getUserID = this.getUserID.bind(this);
  }

  componentDidMount() {
    this.getUser();
  }

  getUserID() {
    const { location } = this.props;
    const userID = location.pathname.slice(13);

    return userID;
  }

  getUser() {
    const userID = this.getUserID();

    if (userID !== null) {
      API.instance
        .get(`/user/${userID}`)
        .then((res) => {
          this.setState({
            userRole: getRoleFromID(res.data.userLevelID),
            firstName: res.data.firstName,
            lastName: res.data.lastName,
          });
        })
        .catch((error) => console.log(error.response));
    }
  }

  handleChange(e) {
    const { value } = e.target;
    const { name } = e.target;

    this.setState({
      [name]: value,
    });
  }

  handleSubmit(e) {
    const { userRole, firstName, lastName } = this.state;

    // check if valid role inputted
    if (!validRole(userRole)) {
      this.setState({
        successMessage: null,
        errorMessage: 'Please input a valid role',
      });

      return;
    }

    const userID = this.getUserID();
    const userLevelID = getIDfromRole(userRole);

    API.instance
      .put(`/user/${userID}/level`, { userLevelID, firstName, lastName })
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
    const { userRole, successMessage, errorMessage } = this.state;

    return (
      <div>
        <Header />
        <HeaderPadding />
        <Container>
          <Row>
            <Col />
            <Col>
              <Form.Label>Role</Form.Label>
              <Form.Control
                type="text"
                onChange={this.handleChange}
                name="userRole"
                value={userRole}
              />
              <Button onClick={this.handleSubmit}>Submit</Button>
              {successMessage && (
                <p className="text-success">{successMessage}</p>
              )}
              {errorMessage && <p className="text-danger">{errorMessage}</p>}
            </Col>
            <Col />
          </Row>
        </Container>
      </div>
    );
  }
}

export default UsersUpdate;
