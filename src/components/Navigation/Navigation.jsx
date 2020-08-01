import React from 'react';
import { Navbar } from 'react-bootstrap';
import { NavLink, Link } from 'react-router-dom';
import { ReactComponent as Logo } from '../../assets/logo/logo.svg';

import './Navigation.css';

export default function Navigation({ children }) {
  return (
    <main className="MainNavigation">
      <section className="NavigationSide">
        <Navbar.Brand>
          <Link className="NavigationHeader" to="/">
            <Logo style={{ height: 40, width: 40 }} />
            <div>
              <p className="NavigationTitle">Inventory</p>
              <p className="NavigationTitle">Management</p>
            </div>
          </Link>
        </Navbar.Brand>
        <NavLink
          className="NavigationLink"
          to="/"
          activeClassName="NavigationLinkActive"
          exact
        >
          Products
        </NavLink>
        <NavLink
          className="NavigationLink"
          to="/transactions"
          activeClassName="NavigationLinkActive"
        >
          Transactions
        </NavLink>
        <NavLink
          className="NavigationLink"
          to="/user-list"
          activeClassName="NavigationLinkActive"
        >
          Users
        </NavLink>
        <NavLink
          className="NavigationLink"
          to="/user-insert"
          activeClassName="NavigationLinkActive"
        >
          Add New User
        </NavLink>
        <hr />
      </section>
      <div className="NavigationSideContainer" />
      <section className="NavigationMain">{children}</section>
    </main>
  );
}
