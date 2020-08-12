import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Card, CardGroup } from 'react-bootstrap';
import { capitalize } from 'lodash';

export default function TransactionListItem({ transaction: propTransaction }) {
  const [transaction] = useState(propTransaction);

  return (
    <CardGroup className="TransactionListItem">
      <Card border="light">
        <Card.Body>
          <Card.Title>UserID: {transaction.userID}</Card.Title>
          <Card.Text> {transaction.code} </Card.Text>
          <Card.Text>{capitalize(transaction.name)} </Card.Text>
        </Card.Body>
      </Card>

      <Card className="TransactionListItemDetails" border="light">
        <Card.Body>
          <Card.Text>TransactionID: {transaction.transactionID} </Card.Text>
          <Card.Text>ProductyQty: {transaction.productQty} </Card.Text>
          <Card.Text>Date: {transaction.date.split('T')[0]} </Card.Text>
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
