import React from 'react';
import { Table } from 'react-bootstrap';
import PropTypes from 'prop-types';

const ProductListDetail = ({ query }) => {
  if (!query) {
    return <div>Loading...</div>;
  }

  const { productID, code, name, descript, price, expirable } = query;
  // only can query based on userID, I tried to query based on firstName, does not work
  // query userID has to be the actually ID -1
  const qList = `http://localhost:3000/api/${query.productID}`;
  return (
    <div>
      <br />
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>productID</th>
            <th>code</th>
            <th>name</th>
            <th>descript</th>
            <th>price</th>
            <th>expirable</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td> {productID} </td>
            <td> {code} </td>
            <td>{name} </td>
            <td>{descript} </td>
            <td>{price}</td>
            <td>{expirable} </td>
            <td>
              <button type="submit">Edit</button>{' '}
            </td>
            <td>
              <button type="submit">Delete</button>
            </td>
          </tr>
        </tbody>
      </Table>
    </div>
  );
};

ProductListDetail.propTypes = {
  query: PropTypes.number.isRequired,
};

export default ProductListDetail;
