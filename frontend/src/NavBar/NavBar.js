/* eslint-disable jsx-a11y/label-has-for */
import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import auth0Client from '../Auth';

function NavBar(props) {
  const signOut = () => {
    auth0Client.signOut();
    // eslint-disable-next-line react/prop-types
    props.history.replace('/');
  };
  return (
    <nav className="navbar navbar-dark bg-primary fixed-top">
      <Link className="navbar-brand" to="/">
        Pair=Programming
      </Link>
      <Link className="navbar-nav mr-1" to="/playground" style={{ marginLeft: '20px' }}>
        PlayGround
      </Link>
      <Link className="navbar-nav mr-1" to="/tasks">
        Tasks
      </Link>
      <Link className="navbar-nav mr-1" to="/forum">
        Forum
      </Link>
      {!auth0Client.isAuthenticated() && (
        <button type="button" className="btn btn-dark" onClick={auth0Client.signIn}>
          Sign In
        </button>
      )}
      {auth0Client.isAuthenticated() && (
        <div>
          <label htmlFor="signOut" className="mr-2 text-white">
            {auth0Client.getProfile().name}
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
    </nav>
  );
}

export default withRouter(NavBar);
