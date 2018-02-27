// @flow
import React from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import { FormWithConstraints, FieldFeedback } from 'react-form-with-constraints';
import { FieldFeedbacks, FormGroup, FormControlLabel, FormControlInput } from 'react-form-with-constraints-bootstrap4';
// import { Link } from 'react-router-dom';
import { StyledFlex } from './SplashPage';
import NavBar from '../sharedPresentational/SharedNavBar';
import TextBox from '../sharedPresentational/SharedTextBox';

type PropsType = {
  mutate: () => {};
};

class SignInPage extends React.Component {
  constructor(props: PropsType) {
    super(props: PropsType);

    this.state = {
      email: '',
      password: '',
      emptyForm: false,
      submitButtonDisabled: false,
      invalidCreds: false,
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
      console.log('got data', response);
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

    return (
      <StyledFlex >
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
    $username: String!,
    $password: String!,
  ) {
    signInUser (
      username: $username,
      password: $password,
    ) {
      username,
      firstname,
      lastname,
      motivation,
    }
  }
`;

const SignInPageRequest = graphql(submitSignInDetails)(SignInPage);

export default SignInPageRequest;
