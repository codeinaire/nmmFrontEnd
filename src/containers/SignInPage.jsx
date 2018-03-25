// @flow
import React, { Component } from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import { Redirect, Switch } from 'react-router-dom';
import { FormWithConstraints, FieldFeedback } from 'react-form-with-constraints';
import { FieldFeedbacks, FormGroup, FormControlLabel, FormControlInput } from 'react-form-with-constraints-bootstrap4';
import { StyledFlex } from './SplashPage';
import NavBar from '../sharedPresentational/SharedNavBar';
import TextBox from '../sharedPresentational/SharedTextBox';

type Props = {
  usernameCall: () => {},
  mutate: () => {}
};

type State = {
  invalidCreds: boolean,
  email: string,
  emptyForm: boolean,
  password: string,
  redirect: boolean,
  submitButtonDisabled: boolean,
  username: string,
}

class SignInPage extends Component<Props, State> {
  constructor(props) {
    super(props);

    this.state = {
      invalidCreds: false,
      email: '',
      emptyForm: false,
      password: '',
      redirect: false,
      submitButtonDisabled: false,
      username: '',
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();

    this.form.validateFields();

    const data = new FormData(e.target);

    const dataToSend = {
      email: data.get('email'),
      password: data.get('password'),
    };

    if (!dataToSend.email || !dataToSend.password) {
      return this.setState({
        emptyForm: true,
        submitButtonDisabled: !this.form.isValid(),
      });
    }

    this.props.mutate({
      variables: dataToSend,
    }).then((response) => {
      this.props.usernameCall(response.data.signInUser.username);
      this.setState({
        redirect: true,
        username: response.data.signInUser.username,
      });
    }).catch((err) => {
      console.error('there was an error sending the query', err.networkError.response.status);
      if (err.networkError.response.status === 511) {
        return this.setState({ invalidCreds: true });
      }
    });
  }

  handleChange(e) {
    const target = e.currentTarget;

    this.form.validateFields(target);

    this.setState({
      [target.name]: target.value,
      submitButtonDisabled: !this.form.isValid(),
    });
  }

  render() {
    const AlertEmptyForm = this.state.emptyForm ? (
      <div className="alert alert-danger alert-dismissible fade show" role="alert">
        <strong>Woah there!</strong> You can't do anything without signing on.
        <button type="button" className="close" data-dismiss="alert" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>) :
      null;

    const InvalidCredentials = this.state.invalidCreds ? (
      <div className="alert alert-danger alert-dismissible fade show" role="alert">
        <strong>Hold On!</strong> Your email and/or password ain't matching. Re-enter.
        <button type="button" className="close" data-dismiss="alert" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>) :
      null;

    const Redirection = this.state.redirect ? (
      <Switch>
        <Redirect from="/signin" to={`/profile/${this.state.username}`} />
      </Switch>
    ) :
      null;

    return (
      <StyledFlex >
        {Redirection}
        <NavBar />
        <TextBox
          size="3"
          text="No Meat May"
        />
        <TextBox
          size="2"
          text="Sign In!"
          backgroundColour="#fbbd08"
          textColour="#fff"
        />
        {AlertEmptyForm}
        {InvalidCredentials}
        <FormWithConstraints
          ref={formWithConstraints => this.form = formWithConstraints}
          onSubmit={this.handleSubmit}
          noValidate
        >
          <FormGroup for="email">
            <FormControlLabel htmlFor="email">Email</FormControlLabel>
            <FormControlInput
              ariaLabel="email"
              id="email"
              name="email"
              onChange={this.handleChange}
              placeholder="Enter your email."
              required
              type="email"
              value={this.state.email}
            />
            <FieldFeedbacks for="email" className="invalid-feedback">
              <FieldFeedback when="valueMissing" />
              <FieldFeedback when="*" />
            </FieldFeedbacks>
          </FormGroup>

          <FormGroup for="password">
            <FormControlLabel htmlFor="password">Password</FormControlLabel>
            <FormControlInput
              ariaLabel="password"
              id="password"
              name="password"
              onChange={this.handleChange}
              placeholder="Please enter password"
              required
              type="password"
              value={this.state.password}
            />
            <FieldFeedbacks for="password" className="invalid-feedback">
              <FieldFeedback when="valueMissing" warning />
            </FieldFeedbacks>
          </FormGroup>

          <button
            className="btn btn-lg btn-warning"
            type="submit"
            disabled={this.state.submitButtonDisabled}
          >
          Sign In
          </button>
        </FormWithConstraints>
      </StyledFlex>
    );
  }
}

const submitSignInDetails = gql`
  mutation signInUser(
    $email: String,
    $password: String!,
  ) {
    signInUser (
      email: $email,
      password: $password,
    ) {
      username
    }
  }
`;

const SignInPageRequest = graphql(submitSignInDetails)(SignInPage);

export default SignInPageRequest;
