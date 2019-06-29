/* eslint-disable jsx-a11y/label-has-for */
/* eslint-disable prettier/prettier */
import React from 'react';
import { Link, withRouter } from 'react-router-dom';

function Footer() {
  return (
    <footer className="footer navbar navbar-dark bg-primary fixed-bottom">
      <Link className="mx-auto" to="/">
        <span>Pair=Programming</span>
      </Link>
    </footer>
  );
}

export default withRouter(Footer);
