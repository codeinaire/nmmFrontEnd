import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { ApolloProvider } from 'react-apollo';
import SplashPage from './containers/SplashPage';
import SignUpPage from './containers/SignUpPage';
import SignInPage from './containers/SignInPage';
import ProfilePage from './containers/ProfilePage';

const fakeAuth = {
  isAuthenticated: false,
  authenticate(cb) {
    this.isAuthenticated = true;
    setTimeout(cb, 100); // fake async
  },
  signout(cb) {
    this.isAuthenticated = false;
    setTimeout(cb, 100);
  },
};


// const PrivateRoute = ({ component: Profile, ...rest }) => (
//   <Route
//     {...rest}
//     render={props =>
//       fakeAuth.isAuthenticated ? (
//         <Profile {...props} />
//       ) : (
//         <Redirect
//           to={{
//             pathname: "/signin",
//             state: { from: props.location }
//           }}
//         />
//       )
//     }
//   />
// );

class App extends Component {
  constructor() {
    super();

    this.state = {
      username: '',
    };
    this.usernameCall = this.usernameCall.bind(this);
  }

  usernameCall(username) {
    this.setState({
      username,
    });
  }

  render() {
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
        <Route
          path="/profile/:username"
          component={() => (
            <ProfilePage username={this.state.username} />
          )}
        />
      </Switch>
    );
  }
}

export default App;
