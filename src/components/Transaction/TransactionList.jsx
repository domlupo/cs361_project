import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import API from '../../apis/API'; // library for AJAX functions
import Header, { HeaderPadding } from '../Navigation/Header';

class TransactionList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      index: [],
    };

    this.getTransaction = this.getTransaction.bind(this);
  }

  componentDidMount() {
    this.getTransaction();
  }

  getTransaction() {
    API.instance
      .get('/transaction')
      .then((res) => {
        this.setState({ index: res.data });
      })
      .catch((error) => console.log(error.response));
  }

  render() {
    const { index } = this.state;
    return (
      <div>
        <Header />
        <HeaderPadding />
        <div className="container-fluid text-center">
          <table className="table-responhsive-p1">
            <tr>
              <th style={{ border: '1px solid black' }}> UserId </th>
              <th style={{ border: '1px solid black' }}> ProductId </th>
              <th style={{ border: '1px solid black' }}> Date </th>
              <th style={{ border: '1px solid black' }}> ProductQty </th>
              <th style={{ border: '1px solid black' }}> StartLoc </th>
              <th style={{ border: '1px solid black' }}> EndLoc </th>
              <th style={{ border: '1px solid black' }}> CreatedAt </th>
              <th style={{ border: '1px solid black' }}> UpdatedAt </th>
              <th style={{ border: '1px solid black' }}> Edit </th>
            </tr>
            {index.map((inx) => (
              <tr>
                <td style={{ border: '1px solid black' }}> {inx.userID} </td>
                <td style={{ border: '1px solid black' }}> {inx.productID} </td>
                <td style={{ border: '1px solid black' }}>
                  {' '}
                  {inx.date.split('T')[0]}{' '}
                </td>
                <td style={{ border: '1px solid black' }}>
                  {' '}
                  {inx.productQty}{' '}
                </td>
                <td style={{ border: '1px solid black' }}> {inx.startLoc} </td>
                <td style={{ border: '1px solid black' }}> {inx.endLoc} </td>
                <td style={{ border: '1px solid black' }}>
                  {' '}
                  {inx.createdAt.split('T')[0]}{' '}
                </td>
                <td style={{ border: '1px solid black' }}>
                  {' '}
                  {inx.updatedAt.split('T')[0]}{' '}
                </td>
                <td style={{ border: '1px solid black' }}>
                  <Button type="button">Edit</Button>{' '}
                </td>
              </tr>
            ))}
          </table>
        </div>
      </div>
    );
  }
}

export default TransactionList;
