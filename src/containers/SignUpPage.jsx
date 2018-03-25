// @flow
import React from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import { FormWithConstraints, FieldFeedback } from 'react-form-with-constraints';
import { FieldFeedbacks, FormGroup, FormControlLabel, FormControlInput } from 'react-form-with-constraints-bootstrap4';
// might need to reconsider importing this from another file as it's important for responsiveness and may need to be in this file
import { StyledFlex } from './SplashPage';
import NavBar from '../sharedPresentational/SharedNavBar';
import TextBox from '../sharedPresentational/SharedTextBox';

type MotivationObjectType = {
  motivation: string,
};

class SignUpPage extends React.Component {
  constructor() {
    super();
    this.state = {
      username: '',
      email: '',
      password: '',
      passwordConfirm: '',
      submitButtonDisabled: false,
      emptyForm: false,
      redirect: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();

    this.form.validateFields();


    const data = new FormData(e.target);
    const url = 'http://localhost:3001/signup';
    const dataToSend = {
      username: data.get('username'),
      email: data.get('email'),
      password: data.get('password'),
      motivation: data.get('motivation'),
    };

    if (!dataToSend.username || !dataToSend.email || !dataToSend.password) {
      return this.setState({ emptyForm: true });
    }

    axios({
      method: 'post',
      url,
      data: dataToSend,
    }).then((response) => {
      console.log('got data', response);
    }).catch((error) => {
      console.error('there was an error sending the query', error);
    });

    this.setState({ redirect: true });
  }

  handleChange(e) {
    const target = e.currentTarget;

    this.form.validateFields(target);

    this.setState({
      [target.name]: target.value,
      submitButtonDisabled: !this.form.isValid(),
    });
  }

  handlePasswordChange(e) {
    this.form.validateFields('password');

    this.handleChange(e);
  }

  render() {
    const motiveToJoin = [
      { environment: 'Environment' },
      { animal: 'Animal Welfare' },
      { food: 'Food Equality' },
      { health: 'Personal Health' },
      { all: 'All of the Above' },
    ];

    const AlertEmptyForm = this.state.emptyForm ? (
      <div className="alert alert-danger alert-dismissible fade show" role="alert">
        <strong>Holy Cow!</strong> Seems you've left a few fields empty. Fill them in to continue.
        <button type="button" className="close" data-dismiss="alert" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>) :
      null;

    const Redirection = this.state.redirect ? (<Redirect to="/signin" />) : null;

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
          text="Change your diet, change the world. Sign-up now!"
          backgroundcolour="#fbbd08"
          textColour="#fff"
        />
        {AlertEmptyForm}
        <FormWithConstraints
          ref={formWithConstraints => this.form = formWithConstraints}
          onSubmit={this.handleSubmit}
          noValidate
        >
          <FormGroup for="username">
            <FormControlLabel htmlFor="username">Username</FormControlLabel>
            <FormControlInput
              ariaLabel="username"
              id="username"
              name="username"
              onChange={this.handleChange}
              placeholder="Username"
              required
              type="text"
              value={this.state.username}
            />
            <FieldFeedbacks for="username" className="invalid-feedback">
              <FieldFeedback when="valueMissing" />
            </FieldFeedbacks>
          </FormGroup>

          <FormGroup for="email">
            <FormControlLabel htmlFor="email">Email</FormControlLabel>
            <FormControlInput
              ariaLabel="email address"
              id="email"
              name="email"
              onChange={this.handleChange}
              placeholder="Some way to contact you."
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
              type="password"
              id="password"
              innerRef={password => this.password = password}
              name="password"
              onChange={this.handlePasswordChange}
              pattern=".{5,}"
              placeholder="Enter a password"
              required
              value={this.state.password}
            />
            <FieldFeedbacks for="password" show="all" className="invalid-feedback">
              <FieldFeedback when="valueMissing" />
              <FieldFeedback when="patternMismatch">Should be at least 5 characters long</FieldFeedback>
              <FieldFeedback when={value => !/\d/.test(value)} >Should contain numbers</FieldFeedback>
              <FieldFeedback when={value => !/[a-z]/.test(value)} >Should contain small letters</FieldFeedback>
              <FieldFeedback when={value => !/[A-Z]/.test(value)} >Should contain capital letters</FieldFeedback>
              <FieldFeedback when={value => !/\W/.test(value)} >Should contain special characters</FieldFeedback>
            </FieldFeedbacks>
          </FormGroup>

          <FormGroup for="passwordConfirm">
            <FormControlLabel htmlFor="passwordConfirm">Confirm Password</FormControlLabel>
            <FormControlInput
              ariaLabel="password confirm"
              id="password-confirm"
              name="passwordConfirm"
              onChange={this.handleChange}
              placeholder="Confirm password"
              required
              type="password"
              value={this.state.passwordConfirm}
            />
            <FieldFeedbacks for="passwordConfirm" className="invalid-feedback">
              <FieldFeedback when={value => value !== this.password.value}>Not the same password</FieldFeedback>
            </FieldFeedbacks>
          </FormGroup>

          <div className="form-group">
            <label className="form-control-label" htmlFor="motivation" >Motivation</label>
            <select
              ariaLlabel="Choose a motivation"
              className="custom-select"
              id="motivation"
              name="motivation"
            >
              {motiveToJoin.map((motivation: MotivationObjectType) =>
                (
                  <option
                    key={Object.keys(motivation)[0]}
                    ariaLabel={motivation[Object.keys(motivation)[0]]}
                    value={Object.keys(motivation)[0]}
                  >
                    {motivation[Object.keys(motivation)[0]]}
                  </option>
                ))}
            </select>
          </div>

          <button
            className="btn btn-lg btn-warning"
            type="submit"
            disabled={this.state.submitButtonDisabled}
          >
          Let's Get Started
          </button>
        </FormWithConstraints>
      </StyledFlex>
    );
  }
}

export default SignUpPage;
