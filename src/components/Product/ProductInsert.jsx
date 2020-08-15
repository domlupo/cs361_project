import React, { Component, useState } from 'react';
import {
  Form,
  FormLabel,
  FormGroup,
  FormControl,
  Button,
  Container,
  Row,
  Col,
} from 'react-bootstrap';
import ReactTooltip from 'react-tooltip';
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
      notificationCount: 10,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    const { value } = e.target;
    const { name } = e.target;

    if (value < 0 && (name === 'price' || name === 'notificationCount')) {
      this.setState({
        [name]: 0,
      });
      return;
    }

    this.setState({
      [name]: value,
    });
  }

  handleSubmit(e) {
    const { prodName, code, descript, price, notificationCount } = this.state;

    let { expirable } = this.state;

    expirable = expirable === 'Yes' ? 1 : 0;

    API.instance
      .post(`/product/create`, {
        prodName,
        code,
        descript,
        price,
        expirable,
        notificationCount,
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
      notificationCount,
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
                    value={prodName}
                    handleChange={this.handleChange}
                  />

                  <InputBox
                    label="Product Code"
                    name="code"
                    type="text"
                    value={code}
                    handleChange={this.handleChange}
                  />

                  <InputBox
                    label="Description"
                    name="descript"
                    type="text"
                    value={descript}
                    handleChange={this.handleChange}
                  />

                  <InputBox
                    label="Price in $"
                    name="price"
                    type="number"
                    value={price}
                    handleChange={this.handleChange}
                  />

                  <FormGroup bssize="large">
                    <FormLabel>
                      Does this product have an expiration date?
                    </FormLabel>
                    <Form.Control
                      name="expirable"
                      as="select"
                      value={expirable}
                      onChange={this.handleChange}
                    >
                      <option />
                      <option>Yes</option>
                      <option>No</option>
                    </Form.Control>
                  </FormGroup>

                  <FormGroup bssize="large">
                    <FormLabel>
                      Notification Count
                      <br />
                      Low stock threshold for shelf count
                    </FormLabel>
                    <FormControl
                      name="notificationCount"
                      type="number"
                      value={notificationCount}
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
                    Only an owner or manager can add a new product type
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

export default ProductInsert;
