import React from 'react';
import { Navbar } from 'react-bootstrap';
import PropTypes from 'prop-types';

import { useDispatch, useSelector } from 'react-redux';
import { capitalize } from 'lodash';
import { Link } from 'react-router-dom';

import './Navigation.css';
import UserIcon from '../shared/UserIcon';
import { signOutUser } from '../../redux/actions/actions';

export const HeaderPadding = () => <div style={{ height: 72 }} />;

export default function Header({ children }) {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const logOut = (e) => {
    e.preventDefault();

    dispatch(signOutUser());
  };

  return (
    <Navbar className="NavigationBar" variant="light" fixed="top">
      <div className="NavigationSideContainer" />
      {children}
      <div className="NavigationUser">
        <UserIcon user={user} />
        <div className="NavigationUserText">
          <strong>{capitalize(user.firstName)}</strong>
          <Link to="/" onClick={logOut}>
            Log Out
          </Link>
        </div>
      </div>
    </Navbar>
  );
}

Header.propTypes = {
  children: PropTypes.node.isRequired,
};
