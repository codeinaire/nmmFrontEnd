// @flow
import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
// might need to reconsider importing this from another file as it's important for responsiveness and may need to be in this file
import { StyledFlex } from './SplashPage';
import Button from '../sharedPresentational/SharedButton';
import NavBar from '../sharedPresentational/SharedNavBar';
import TextBox from '../sharedPresentational/SharedTextBox';
import InputField from '../sharedPresentational/SharedInputField';


const DropdownWrapper = styled.div`
  margin: 1em 0em;
`;

const MotiveDropdown = styled.select.attrs({
  'aria-label': 'Choose a motivation',
  id: 'name',
  name: 'motive',
})`
  background-color: #646fe2;
`;

const MotiveOption = styled.option.attrs({
  'aria-label': props => props.ariaLabel,
  value: props => props.value,
})`
  background-color: #646fe2;
`;

const StyledLabel = styled.label`
  padding: 0.5em;
  margin: 0.5em;
  font-family: 'Lato','Helvetica Neue', 'Arial', 'Helvetica', sans-serif;
`;

type MotivationObjectType = {
  motivation: string,
}

const SignUpPage = (props) => {

  function handleSubmit(event) {
    event.preventDefault();
    const form = event.target;
    const data = new FormData(form);
    const formData = data.get('username');
    // console.log('this is data', stringifyFormData(data));
    console.log('this is event', formData);
    props.mutate({
      variables: { username: data.get('username') },
    });
  }

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
      <form onSubmit={handleSubmit}>
        <InputField
          ariaLabel="Username"
          labelFor="userName"
          labelName="Username"
          name="username"
          placeholder="Time to name the new you!"
          type="text"
        />
        <InputField
          ariaLabel="First name"
          labelFor="firstName"
          labelName="First name"
          name="first-name"
          placeholder="First Name"
          type="text"
        />
        <InputField
          ariaLabel="Surname"
          labelFor="lastName"
          labelName="Last name"
          name="lastname"
          placeholder="Last Name"
          type="text"
        />
        <InputField
          ariaLabel="email address"
          labelFor="email"
          labelName="Email"
          name="email"
          placeholder="Some way to contact you."
          type="email"
        />
        <InputField
          ariaLabel="password"
          labelFor="password"
          labelName="Password"
          name="password"
          placeholder="Just for you. We won't tell anyone, promise."
          type="password"
        />
        <DropdownWrapper>
          <StyledLabel >
            Motivation
          </StyledLabel>
          <MotiveDropdown >
            {motiveToJoin.map((motivation: MotivationObjectType) =>
              (
                <MotiveOption
                  key={Object.keys(motivation)[0]}
                  ariaLabel={motivation[Object.keys(motivation)[0]]}
                  value={Object.keys(motivation)[0]}
                >
                  {motivation[Object.keys(motivation)[0]]}
                </MotiveOption>
              ))}
          </MotiveDropdown>
        </DropdownWrapper>
        <Button
          title="Let's Get Started"
          size="1"
          margin="5"
        />
      </form>
    </StyledFlex>
  );
};

// <Link to="/signin">
// </Link>
const submitSignupDetails = gql`
  mutation submitSignupDetails($username: String!) {
    submitSignupDetails(username: $username){
      username
    }
  }
`;

const SignUpPageRequest = graphql(submitSignupDetails)(SignUpPage);

// function stringifyFormData(fd) {
//   const data = {};
// for (let key of fd.keys()) {
//   data[key] = fd.get(key);
//   }
//   return JSON.stringify(data, null, 2);
// }

export default SignUpPageRequest;
