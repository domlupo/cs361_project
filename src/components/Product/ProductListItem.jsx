import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Card, CardGroup, Button, Modal, Form } from 'react-bootstrap';
import { capitalize, round } from 'lodash';
import { useSelector } from 'react-redux';
import API from '../../apis/API';
import { isBuyer, isCashier } from '../../util/util';

const SELL = 'SELL';
const PURCHASE = 'PURCHASE';
const RESTOCK = 'RESTOCK';

export default function ProductListItem({ product: propProduct }) {
  const [product, setProduct] = useState(propProduct);
  const [modal, setModal] = useState('');
  const [quantity, setQuantity] = useState(0);
  const [error, setError] = useState('');

  const user = useSelector((state) => state.user);

  const sellProduct = (productQty) => {
    API.instance
      .put(`/product/${product.productID}/sell`, { productQty })
      .then(({ data }) => {
        console.log(data);
        setProduct(data);
        setQuantity(0);
        setModal('');
      })
      .catch((err) => {
        setError(err?.response?.data?.error ?? 'An unexpected error occurred');
      });
  };

  const restockProduct = (productQty) => {
    API.instance
      .put(`/product/${product.productID}/restock`, { productQty })
      .then(({ data }) => {
        console.log(data);
        setProduct(data);
        setQuantity(0);
        setModal('');
      })
      .catch((err) => {
        setError(err?.response?.data?.error ?? 'An unexpected error occurred');
      });
  };

  const purchaseProduct = (productQty) => {
    API.instance
      .put(`/product/${product.productID}/purchase`, { productQty })
      .then(({ data }) => {
        console.log(data);
        setProduct(data);
        setQuantity(0);
        setModal('');
      })
      .catch((err) => {
        setError(err?.response?.data?.error ?? 'An unexpected error occurred');
      });
  };

  const onModalClick = () => {
    if (!quantity) return;
    if (modal === SELL) {
      sellProduct(quantity);
    } else if (modal === PURCHASE) {
      purchaseProduct(quantity);
    } else if (modal === RESTOCK) {
      restockProduct(quantity);
    }
  };

  const renderModal = () => {
    return (
      <Modal show={!!modal} onHide={() => setModal('')} centered>
        <Modal.Header closeButton>
          <Modal.Title>{capitalize(modal)} Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Label>Quantity</Form.Label>
            <Form.Control
              type="number"
              min="0"
              placeholder={`Enter ${modal.toLowerCase()} quantity`}
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
            />
            <Form.Text className="text-danger" type="invalid">
              {error}
            </Form.Text>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button disabled={!quantity || quantity <= 0} onClick={onModalClick}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    );
  };

  return (
    <CardGroup className="ProductListItem">
      {renderModal()}
      <Card border="light">
        <Card.Body>
          <Card.Title>{capitalize(product.name)}</Card.Title>
          <Card.Subtitle>
            <i>{product.code}</i>
          </Card.Subtitle>
          <Card.Text>{capitalize(product.descript)}</Card.Text>
          <Card.Text>
            <strong>${round(product.price).toFixed(2)}</strong>
          </Card.Text>
        </Card.Body>
      </Card>
      <Card className="ProductListItemDetails" border="light">
        <Card.Body>
          <Card.Text>On shelf: {product.shelfCount}</Card.Text>
          <Card.Text>In inventory: {product.inventoryCount}</Card.Text>
        </Card.Body>
        <div className="ProductListItemButtons">
          {isCashier(user) && (
            <Button
              size="sm"
              className="ProductListItemButton"
              variant="outline-danger"
              type="button"
              onClick={() => setModal(SELL)}
            >
              Sell
            </Button>
          )}
          {isBuyer(user) && (
            <Button
              size="sm"
              className="ProductListItemButton"
              variant="outline-primary"
              type="button"
              onClick={() => setModal(RESTOCK)}
            >
              Restock
            </Button>
          )}
          {isBuyer(user) && (
            <Button
              size="sm"
              className="ProductListItemButton"
              variant="outline-success"
              type="button"
              onClick={() => setModal(PURCHASE)}
            >
              Purchase
            </Button>
          )}
        </div>
      </Card>
    </CardGroup>
  );
}

ProductListItem.propTypes = {
  product: PropTypes.shape({
    productID: PropTypes.number,
    name: PropTypes.string,
    code: PropTypes.string,
    descript: PropTypes.string,
    price: PropTypes.number,
    shelfCount: PropTypes.number,
    inventoryCount: PropTypes.number,
  }).isRequired,
};
