import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import SplashPage from './containers/SplashPage.js';
import SignUpPage from './containers/SignUpPage.js';
import SignInPage from './containers/SignInPage.js';

class App extends Component {
  render() {
    return (
      <Router >
        <div>
          <Route exact path="/" component={SplashPage}/>
          <Route path="/signup" component={SignUpPage} />
          <Route path="/signin" component={SignInPage} />
        </div>
      </Router>
    );
  }
}

export default App;
