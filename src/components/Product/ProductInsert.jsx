import React, { Component, useState } from 'react';
import { Button, Container, Row, Col } from 'react-bootstrap';
import API from '../../apis/API';
import InputBox from '../shared/entryFormHelpers';
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
                  <InputBox
                    label="Product Name"
                    name="prodName"
                    type="text"
                    dataVal={prodName}
                    handleChange={this.handleChange}
                  />

                  <InputBox
                    label="Product ID Code"
                    name="code"
                    type="text"
                    dataVal={code}
                    handleChange={this.handleChange}
                  />

                  <InputBox
                    label="Description"
                    name="descript"
                    type="text"
                    dataVal={descript}
                    handleChange={this.handleChange}
                  />

                  <InputBox
                    label="Price in $"
                    name="price"
                    type="number"
                    dataVal={price}
                    handleChange={this.handleChange}
                  />

                  <InputBox
                    label="Does this product have an expiration date? Enter 1 for Yes, and enter 0 for No"
                    name="expirable"
                    type="text"
                    dataVal={expirable}
                    handleChange={this.handleChange}
                  />

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
