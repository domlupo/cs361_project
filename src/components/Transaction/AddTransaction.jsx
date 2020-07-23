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
import API from '../../apis/API';
import Header, { HeaderPadding } from '../Navigation/Header';

class AddTransaction extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userID: '',
      productID: '',
      date: '',
      ProductQty: '',
      startLoc: '',
      endLoc: '',
      createdAt: '',
      updatedAt: '',
      errorMessage: '',
      successMessage: '',
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
    const {
      userID,
      productID,
      date,
      ProductQty,
      startLoc,
      endLoc,
      createdAt,
      updatedAt,
      errorMessage,
      successMessage,
    } = this.state;

    API.instance
      .post(`/transaction/posts`, {
        userID,
        productID,
        date,
        ProductQty,
        startLoc,
        endLoc,
        createdAt,
        updatedAt,
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
      userID,
      productID,
      date,
      ProductQty,
      startLoc,
      endLoc,
      createdAt,
      updatedAt,
      errorMessage,
      successMessage,
    } = this.state;
    return (
      <div>
        <Header />
        <HeaderPadding />
        <Container>
          <Row>
            <Col />
            <Col>
              <div className="userID">
                <form className="userIDForm" onSubmit={this.handleSubmit}>
                  <FormGroup controlId="userID" bssize="large">
                    <FormLabel>UserID</FormLabel>
                    <FormControl
                      autoFocus
                      name="userID"
                      type="text"
                      value={userID}
                      onChange={this.handleChange}
                    />
                  </FormGroup>
                  <FormGroup bssize="large">
                    <FormLabel>ProductID</FormLabel>
                    <FormControl
                      name="productID"
                      type="text"
                      value={productID}
                      onChange={this.handleChange}
                    />
                  </FormGroup>
                  <FormGroup controlId="date" bssize="large">
                    <FormLabel>Date</FormLabel>
                    <FormControl
                      name="date"
                      type="date"
                      value={date}
                      onChange={this.handleChange}
                    />
                  </FormGroup>
                  <FormGroup bssize="large">
                    <FormLabel>ProductQty</FormLabel>
                    <FormControl
                      name="ProductQty"
                      type="ProductQty"
                      value={ProductQty}
                      onChange={this.handleChange}
                    />
                  </FormGroup>
                  <FormGroup bssize="large">
                    <FormLabel>startLoc</FormLabel>
                    <FormControl
                      name="startLoc"
                      type="text"
                      value={startLoc}
                      onChange={this.handleChange}
                    />
                  </FormGroup>
                  <FormGroup bssize="large">
                    <FormLabel>endLoc</FormLabel>
                    <FormControl
                      name="endLoc"
                      type="text"
                      value={endLoc}
                      onChange={this.handleChange}
                    />
                  </FormGroup>
                  <FormGroup bssize="large">
                    <FormLabel>Created At</FormLabel>
                    <FormControl
                      name="createdAt"
                      type="date"
                      value={createdAt}
                      onChange={this.handleChange}
                    />
                  </FormGroup>
                  <FormGroup bssize="large">
                    <FormLabel>Updated At</FormLabel>
                    <FormControl
                      name="updatedAt"
                      type="date"
                      value={updatedAt}
                      onChange={this.handleChange}
                    />
                  </FormGroup>
                  <Button onClick={this.handleSubmit}>Submit</Button>
                  {successMessage && (
                    <p className="text-success">{successMessage}</p>
                  )}
                  {errorMessage && (
                    <p className="text-danger">{errorMessage}</p>
                  )}
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

export default AddTransaction;
