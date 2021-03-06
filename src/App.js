// @flow
import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import SplashPage from './containers/SplashPage';
import SignUpPage from './containers/SignUpPage';
import SignInPage from './containers/SignInPage';
import ProfilePage from './containers/ProfilePage';

type State = {
  username: string,
}

class App extends React.Component<State> {
  constructor() {
    super();

    this.state = {
      username: '',
      isAuthenticated: false,
    };
    this.usernameCall = this.usernameCall.bind(this);
  }

  usernameCall(username: string): string {
    this.setState({
      username,
      isAuthenticated: true,
    });
  }

  render() {
    const PrivateRoute = ({ component: Component, ...rest }) => (
      <Route
        {...rest}
        render={props =>
          this.state.isAuthenticated ? (
            <Component
              {...props}
              username={this.state.username}
            />
      ) : (
        <Redirect to="/signin" />
      )}
      />
    );

    return (
      <Switch >
        <Route exact path="/" component={SplashPage} />
        <Route path="/signup" component={SignUpPage} />
        <Route
          path="/signin"
          render={() => (
            <SignInPage usernameCall={this.usernameCall} />
          )}
        />
        {// to make private again replace Route with PrivateRoute
        }
        <Route path="/profile" component={ProfilePage} />
      </Switch>
    );
  }
}

export default App;
