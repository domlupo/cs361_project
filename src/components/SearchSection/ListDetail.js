import React from 'react';
import { Table } from 'react-bootstrap';
import PropTypes from 'prop-types';

const ListDetail = ({ query }) => {
  if (!query) {
    return <div>Loading...</div>;
  }

  const { userID, userLevelID, firstName, lastName } = query;
  // only can query based on userID, I tried to query based on firstName, does not work
  // query userID has to be the actually ID -1
  const qList = `http://localhost:3000/api/${query.userID}`;
  return (
    <div>
      <br />
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>userID</th>
            <th>userLevelID</th>
            <th>firstName</th>
            <th>lastName</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td> {userID} </td>
            <td> {userLevelID} </td>
            <td>{firstName} </td>
            <td>{lastName} </td>
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

ListDetail.propTypes = {
  query: PropTypes.number.isRequired,
};

export default ListDetail;
