import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Card, CardGroup } from 'react-bootstrap';
import { capitalize } from 'lodash';
import API from '../../apis/API';

export default function TransactionListItem({ transaction: propTransaction }) {
  const [transaction] = useState(propTransaction);
  const [user, setUser] = useState('');

  useEffect(() => {
    API.instance.get(`/user/${transaction.userID}`).then((res) => {
      setUser(res.data);
    });
  }, []);

  return (
    <CardGroup className="TransactionListItem">
      <Card border="light">
        <Card.Body>
          <Card.Title>Transaction ID: {transaction.transactionID} </Card.Title>
          {user && (
            <Card.Title>
              User: {capitalize(user.firstName)} {capitalize(user.lastName)}
            </Card.Title>
          )}
          {!user && <Card.Title>User: Prior Employee</Card.Title>}
          <Card.Text>Date: {transaction.date.split('T')[0]} </Card.Text>
        </Card.Body>
      </Card>

      <Card className="TransactionListItemDetails" border="light">
        <Card.Body>
          <Card.Text>{capitalize(transaction.name)} </Card.Text>
          <Card.Text>Code: {transaction.code} </Card.Text>
          <Card.Text>Product Quantity: {transaction.productQty} </Card.Text>
        </Card.Body>
      </Card>
    </CardGroup>
  );
}

TransactionListItem.propTypes = {
  transaction: PropTypes.shape({
    transactionID: PropTypes.number,
    userID: PropTypes.number,
    productID: PropTypes.number,
    date: PropTypes.instanceOf(Date),
    startLoc: PropTypes.string,
    endLoc: PropTypes.string,
  }).isRequired,
};
