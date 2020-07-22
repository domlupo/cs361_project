import React from 'react';
import { Table } from 'react-bootstrap';
import PropTypes from 'prop-types';

const TransactionListDetail = ({ query }) => {
  if (!query) {
    return <div>Loading...</div>;
  }

  const {
    userID,
    productID,
    date,
    productQty,
    startLoc,
    endLoc,
    createdAt,
    updatedAt,
  } = query;
  // only can query based on userID, I tried to query based on firstName, does not work
  // query userID has to be the actually ID -1
  const qList = `http://localhost:3000/api/${query.id}`;
  return (
    <div>
      <br />
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>userID</th>
            <th>productID</th>
            <th>date</th>
            <th>productQty</th>
            <th>startLoc</th>
            <th>endLoc</th>
            <th>createdAt</th>
            <th>updatedAt</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{userID} </td>
            <td> {productID} </td>
            <td> {date} </td>
            <td>{productQty} </td>
            <td>{startLoc}</td>
            <td>{endLoc}</td>
            <td>{createdAt} </td>
            <td>{updatedAt}</td>
          </tr>
        </tbody>
      </Table>
    </div>
  );
};

TransactionListDetail.propTypes = {
  query: PropTypes.number.isRequired,
};

export default TransactionListDetail;
