import React, { Component, useState } from 'react';
import {
  Button,
  Form,
  Container,
  Row,
  Col,
  FormLabel,
  FormGroup,
  FormControl,
} from 'react-bootstrap';
import API from '../../apis/API';
// import { getIDfromRole, validRole } from '../shared/userRoleHelpers';
import Header, { HeaderPadding } from '../Navigation/Header';
import '../Auth/Sign.css';

class ProductInsert extends Component {
  constructor(props) {
    super(props);

    this.state = {
      prodName: '',
      code: '',
      descript: '',
      price: '',
      expirable: '',
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
    const { prodName, code, descript, price, expirable } = this.state;

    API.instance
      .post(`/product/create`, {
        prodName,
        code,
        descript,
        price,
        expirable,
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
      prodName,
      code,
      descript,
      price,
      expirable,
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
                  <FormGroup controlId="prodName" bssize="large">
                    <FormLabel>Product Name</FormLabel>
                    <FormControl
                      autoFocus
                      name="prodName"
                      type="text"
                      value={prodName}
                      onChange={this.handleChange}
                    />
                  </FormGroup>
                  <FormGroup bssize="large">
                    <FormLabel>Product ID Code</FormLabel>
                    <FormControl
                      name="code"
                      type="number"
                      value={code}
                      onChange={this.handleChange}
                    />
                  </FormGroup>
                  <FormGroup controlId="descript" bssize="large">
                    <FormLabel>Description</FormLabel>
                    <FormControl
                      name="descript"
                      type="text"
                      value={descript}
                      onChange={this.handleChange}
                    />
                  </FormGroup>
                  <FormGroup bssize="large">
                    <FormLabel>Price in $</FormLabel>
                    <FormControl
                      name="price"
                      type="number"
                      value={price}
                      onChange={this.handleChange}
                    />
                  </FormGroup>
                  <FormGroup bssize="large">
                    <FormLabel>Is Product Expirable?</FormLabel>
                    <FormControl
                      name="expirable"
                      type="text"
                      value={expirable}
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

export default ProductInsert;
