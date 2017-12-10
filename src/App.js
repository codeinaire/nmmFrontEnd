import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { ApolloProvider } from 'react-apollo';
import client from './apollo/ApolloClient';
import SplashPage from './containers/SplashPage';
import SignUpPage from './containers/SignUpPage';
import SignInPage from './containers/SignInPage';

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <Router >
          <div>
            <Route exact path="/" component={SplashPage} />
            <Route path="/signup" component={SignUpPage} />
            <Route path="/signin" component={SignInPage} />
          </div>
        </Router>
      </ApolloProvider>
    );
  }
}

export default App;
