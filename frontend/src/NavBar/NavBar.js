/* eslint-disable jsx-a11y/label-has-for */
/* eslint-disable prettier/prettier */
/* eslint-disable react/prop-types */
import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import auth0Client from '../Auth';

function NavBar(props) {
  const signOut = () => {
    auth0Client.signOut();
    props.history.replace('/');
  };
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary fixed-top">
      <Link className="navbar-brand" to="/">
        Pair=Programming
      </Link>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarColor01"
        aria-controls="navbarColor01"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon" />
      </button>

      <div className="collapse navbar-collapse" id="navbarColor01">
        <ul className="navbar-nav mr-auto">
          <Link className="navbarLink" to="/playground" style={{ marginLeft: '20px' }}>
            <span className="nav-link">PlayGround</span>
          </Link>
          <Link className="navbarLink" to="/tasks" style={{ marginLeft: '20px' }}>
            <span className="nav-link">Tasks</span>
          </Link>
          <Link className="navbarLink" to="/forum" style={{ marginLeft: '20px' }}>
            <span className="nav-link">Forum</span>
          </Link>
          <Link className="navbarLink" to="/about" style={{ marginLeft: '20px' }}>
            <span className="nav-link">About</span>
          </Link>
        </ul>
        {!auth0Client.isAuthenticated() && (
          <button type="button" className="btn btn-dark" onClick={auth0Client.signIn}>
            Sign In
          </button>
        )}
        {auth0Client.isAuthenticated() && (
          <div>
            <label htmlFor="signOut" className="mr-2 text-white">
              {auth0Client.getProfile().given_name}
            </label>
            <button
              type="button"
              className="btn btn-dark"
              onClick={() => {
                signOut();
              }}
            >
              Sign Out
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}

export default withRouter(NavBar);
