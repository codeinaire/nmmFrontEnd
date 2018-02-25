// @flow
import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { FormWithConstraints, FieldFeedback } from 'react-form-with-constraints';
import { FieldFeedbacks, FormGroup, FormControlLabel, FormControlInput } from 'react-form-with-constraints-bootstrap4';
// might need to reconsider importing this from another file as it's important for responsiveness and may need to be in this file
import { StyledFlex } from './SplashPage';
import Button from '../sharedPresentational/SharedButton';
import NavBar from '../sharedPresentational/SharedNavBar';
import TextBox from '../sharedPresentational/SharedTextBox';
import InputField from '../sharedPresentational/SharedInputField';

type MotivationObjectType = {
  motivation: string,
};

class SignUpPage extends React.Component {
  constructor() {
    super();
    this.state = {
      password: '',
      passwordConfirm: '',
      submitButtonDisabled: false,
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
      firstname: data.get('first-name'),
      lastname: data.get('last-name'),
      email: data.get('email'),
      password: data.get('password'),
      motivation: data.get('motivation'),
    };

    axios({
      method: 'post',
      url,
      data: dataToSend,
    }).then((response) => {
      console.log('got data', response);
    }).catch((error) => {
      console.log('there was an error sending the query', error);
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

  handlePasswordChange(e) {
    this.form.validateFields('passwordConfirm');

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

    return (
      <StyledFlex >
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
        <FormWithConstraints
          ref={formWithConstraints => this.form = formWithConstraints}
          onSubmit={this.handleSubmit}
          noValidate
        >
          <FormGroup for="first-name">
            <FormControlLabel htmlFor="first-name">First Name</FormControlLabel>
            <FormControlInput
              ariaLabel="first name"
              id="first-name"
              name="first-name"
              placeholder="First Name"
              required
              type="text"
            />
            <FieldFeedbacks for="first-name" className="invalid-feedback">
              <FieldFeedback when="valueMissing" />
            </FieldFeedbacks>
          </FormGroup>

          <FormGroup for="last-name">
            <FormControlLabel htmlFor="last-name">Last Name</FormControlLabel>
            <FormControlInput
              ariaLabel="last name"
              id="last-name"
              name="last-name"
              placeholder="Last Name"
              required
              type="text"
            />
            <FieldFeedbacks for="last-name" className="invalid-feedback">
              <FieldFeedback when="valueMissing" />
            </FieldFeedbacks>
          </FormGroup>

          <FormGroup for="email">
            <FormControlLabel htmlFor="email">Email</FormControlLabel>
            <FormControlInput
              ariaLabel="email address"
              id="email"
              name="email"
              placeholder="Some way to contact you."
              required
              type="email"
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
              required
              value={this.state.password}
            />
            <FieldFeedbacks for="password" show="all" className="invalid-feedback">
              <FieldFeedback when="valueMissing" />
              <FieldFeedback when="patternMismatch">Should be at least 5 characters long</FieldFeedback>
              <FieldFeedback when={value => !/\d/.test(value)} warning>Should contain numbers</FieldFeedback>
              <FieldFeedback when={value => !/[a-z]/.test(value)} warning>Should contain small letters</FieldFeedback>
              <FieldFeedback when={value => !/[A-Z]/.test(value)} warning>Should contain capital letters</FieldFeedback>
              <FieldFeedback when={value => !/\W/.test(value)} warning>Should contain special characters</FieldFeedback>
            </FieldFeedbacks>
          </FormGroup>

          <FormGroup for="password-confirm">
            <FormControlLabel htmlFor="password-confirm">Confirm Password</FormControlLabel>
            <FormControlInput
              ariaLabel="password confirm"
              id="password-confirm"
              name="passwordConfirm"
              onChange={this.handleChange}
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

          <Button
            title="Let's Get Started"
            size="1"
            margin="5"
            disabled={this.state.submitButtonDisabled}
          />
        </FormWithConstraints>
      </StyledFlex>
    );
  }
}

// <Link to="/signin">
// </Link>

export default SignUpPage;
