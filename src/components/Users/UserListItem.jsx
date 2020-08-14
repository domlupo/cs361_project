import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Card, CardGroup, Button, Modal, Form } from 'react-bootstrap';
import { capitalize } from 'lodash';
import { useSelector } from 'react-redux';
import API from '../../apis/API';
import { isOwner, isManagement } from '../../util/util';
import { getIDfromRole, getRoleFromID } from '../shared/userRoleHelpers';

const CHANGE_ROLE = 'CHANGE ROLE';
const REMOVE = 'REMOVE';

export default function UserListItem({ user: propUser }) {
  const [user, setUser] = useState(propUser);
  const [newUserRole, setNewUserRole] = useState('');
  const [modal, setModal] = useState('');
  const [error, setError] = useState('');

  const currentUser = useSelector((state) => state.user);

  const changeRole = (updatedUserRole) => {
    const userLevelID = getIDfromRole(updatedUserRole.toLowerCase());

    API.instance
      .put(`/user/${user.userID}/level`, { userLevelID })
      .then((res) => {
        console.log(res);
        setUser(res.data);
        setNewUserRole('');
        setModal('');
      })
      .catch((err) => {
        setError(err?.response?.data?.error ?? 'An unexpected error occurred');
      });
  };

  const deleteUser = () => {
    API.instance
      .delete(`/user/${user.userID}`)
      .then((res) => {
        window.location.reload();
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
        setError(err?.response?.data?.error ?? 'Delete user failed!');
      });
  };

  const onModalClick = () => {
    if (modal === CHANGE_ROLE) {
      changeRole(newUserRole);
    } else if (modal === REMOVE) {
      deleteUser();
    }
  };

  const renderModal = () => {
    if (modal === 'CHANGE ROLE') {
      return (
        <Modal show={!!modal} onHide={() => setModal('')} centered>
          <Modal.Header closeButton>
            <Modal.Title>
              Change {capitalize(user.firstName)}{' '}
              {capitalize(`${user.lastName}'s `)}
              Role
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Label>Select Role</Form.Label>
              <Form.Control
                as="select"
                value={newUserRole}
                onChange={(e) => setNewUserRole(e.target.value)}
              >
                <option />
                {isOwner(currentUser) && <option>Owner</option>}
                <option>Manager</option>
                <option>Buyer</option>
                <option>Cashier</option>
              </Form.Control>
              <Form.Text className="text-danger" type="invalid">
                {error}
              </Form.Text>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button disabled={newUserRole === ''} onClick={onModalClick}>
              Confirm
            </Button>
          </Modal.Footer>
        </Modal>
      );
    }

    if (modal === 'REMOVE') {
      return (
        <Modal show={!!modal} onHide={() => setModal('')} centered>
          <Modal.Header closeButton>
            <Modal.Title>
              Remove employee {capitalize(user.firstName)}{' '}
              {capitalize(`${user.lastName}`)}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Label>
                Are you sure you wanna remove {capitalize(user.firstName)}{' '}
                {capitalize(`${user.lastName}`)}?
              </Form.Label>
              <Form.Text className="text-danger" type="invalid">
                {error}
              </Form.Text>
            </Form>
          </Modal.Body>

          <Modal.Footer>
            <Button onClick={onModalClick}>Confirm</Button>
          </Modal.Footer>
        </Modal>
      );
    }
  };

  return (
    <CardGroup className="UserListItem">
      {renderModal()}
      <Card className="UserListItemDetails" border="light">
        <Card.Body>
          <Card.Title>
            {capitalize(user.firstName)} {capitalize(user.lastName)}
          </Card.Title>
          <Card.Subtitle>
            <i>{user.email}</i>
          </Card.Subtitle>
          <Card.Text>{capitalize(getRoleFromID(user.userLevelID))}</Card.Text>
        </Card.Body>
        <div className="UserListItemButtons">
          {isManagement(currentUser) && (
            <Button
              size="sm"
              className="UserListItemButton"
              variant="outline-success"
              type="button"
              onClick={() => setModal(CHANGE_ROLE)}
            >
              Change Role
            </Button>
          )}
          {isManagement(currentUser) && (
            <Button
              size="sm"
              className="UserListItemButton"
              variant="outline-danger"
              type="button"
              onClick={() => setModal(REMOVE)}
            >
              Remove
            </Button>
          )}
        </div>
      </Card>
    </CardGroup>
  );
}

UserListItem.propTypes = {
  user: PropTypes.shape({
    userID: PropTypes.number,
    userLevelID: PropTypes.number,
    email: PropTypes.string,
    firstName: PropTypes.string,
    lastName: PropTypes.string,
  }).isRequired,
};
