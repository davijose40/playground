/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      st: null, // eslint-disable-line
    };
  }

  render() {
    return (
      <div className="jumbotron">
        <h1 className="display-3">Pair=Programming WebSite</h1>
        <p className="lead">
          Pair Programming, aprenda a programar fazendo desafios junto com um parceiro e se torne um
          desenvolvedor profissional hoje mesmo.
        </p>
        <small>Faça seu login e começe a construir seu futuro.</small>
        <Link to="/playground">
          <button type="button" className="btn btn-info">
            Playground
          </button>
        </Link>
      </div>
    );
  }
}

export default Home;
