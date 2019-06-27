/* eslint-disable jsx-a11y/label-has-for */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { Component, Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import auth0Client from '../Auth';

class SubmitAnswer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      answer: '',
    };
  }

  updateAnswer(value) {
    this.setState({
      answer: value,
    });
  }

  submit() {
    // eslint-disable-next-line
    this.props.submitAnswer(this.state.answer);

    this.setState({
      answer: '',
    });
  }

  render() {
    if (!auth0Client.isAuthenticated()) return null;
    return (
      <Fragment>
        <div className="form-group text-center">
          <label htmlFor="exampleInputEmail1">Answer:</label>
          <input
            type="text"
            onChange={(e) => {
              this.updateAnswer(e.target.value);
            }}
            className="form-control"
            placeholder="Share your answer."
            value={this.state.answer} // eslint-disable-line
          />
        </div>
        <button
          type="button"
          className="btn btn-primary"
          onClick={() => {
            this.submit();
          }}
        >
          Submit
        </button>
        <hr className="my-4" />
      </Fragment>
    );
  }
}

export default withRouter(SubmitAnswer);
