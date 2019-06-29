/* eslint-disable no-console */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/no-unused-state */
import React, { Component } from 'react';
import { Route, withRouter } from 'react-router-dom';
import auth0Client from './Auth';
// import NavBar from './NavBar/NavBar';
import NavBarTest from './NavBar/NavBarTest';
import Footer from './Footer/Footer';
import Home from './Home/Home';
import Question from './Question/Question';
import Questions from './Questions/Questions';
import Callback from './Callback';
import NewQuestion from './NewQuestion/NewQuestion';
import SecuredRoute from './SecuredRoute/SecuredRoute';
import Playground from './Pusher/playground';

// styles main.scss
import './styles/main.scss';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checkingSession: true,
    };
  }

  async componentDidMount() {
    // eslint-disable-next-line
    if (this.props.location.pathname === '/callback') {
      this.setState({ checkingSession: false });
      return;
    }
    try {
      await auth0Client.silentAuth();
      this.forceUpdate();
    } catch (err) {
      if (err.error !== 'login_required') console.log(err.error);
    }
    this.setState({ checkingSession: false });
  }

  render() {
    return (
      <div>
        <NavBarTest />
        <Route exact path="/" component={Home} />
        <Route exact path="/forum" component={Questions} />
        <Route exact path="/playground" component={Playground} />
        <Route exact path="/question/:questionId" component={Question} />
        <Route exact path="/callback" component={Callback} />
        <SecuredRoute
          path="/new-question"
          component={NewQuestion}
          checkingSession={this.state.checkingSession}
        />
        <Footer />
      </div>
    );
  }
}

export default withRouter(App);
