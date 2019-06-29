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
      <div className="jumbotron text-center">
        <h1 className="display-3">Pair=Programming</h1>
        <p className="lead text-secondary">
          Website Pair Programming, aprenda a programar fazendo desafios junto com um parceiro e se
          torne um desenvolvedor profissional hoje mesmo.
        </p>
        <small className="text-secondary">Faça seu login e começe a construir seu futuro.</small>
        <br />
        <br />
        <br />
        <Link to="/playground">
          <button type="button" className="btn btn-success">
            Playground
          </button>
        </Link>
      </div>
    );
  }
}

export default Home;
