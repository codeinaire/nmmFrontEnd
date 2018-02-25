// @flow
import React from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
// import { Link } from 'react-router-dom';
import { StyledFlex } from './SplashPage';
import Button from '../sharedPresentational/SharedButton';
import NavBar from '../sharedPresentational/SharedNavBar';
import TextBox from '../sharedPresentational/SharedTextBox';
import InputField from '../sharedPresentational/SharedInputField';

type PropsType = {
  mutate: () => {};
};

const SignInPage = (props: PropsType) => {
  function handleSubmit(event) {
    event.preventDefault();
    const data = new FormData(event.target);
    props.mutate({
      variables: {
        username: data.get('username'),
        password: data.get('password'),
      },
    }).then((response) => {
        console.log('got data', response);
    }).catch((error) => {
        console.log('there was an error sending the query', error);
    });
  }
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
      <form onSubmit={handleSubmit}>
        <InputField
          ariaLabel="Username"
          labelFor="userName"
          labelName="Username"
          name="username"
          placeholder="Enter your username or email."
          type="text"
        />
        <InputField
          ariaLabel="password"
          labelFor="password"
          labelName="Password"
          name="password"
          placeholder="Please enter password"
          type="password"
        />
        <Button
          title="Sign In"
          size="3"
          margin="1"
        />
      </form>
    </StyledFlex>
  );
};

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
