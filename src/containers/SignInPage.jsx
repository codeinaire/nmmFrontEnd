import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { StyledFlex } from './SplashPage';
import Button from '../sharedPresentational/SharedButton';
import NavBar from '../sharedPresentational/SharedNavBar';
import Picture from '../sharedPresentational/SharedPicture';
import TextBox from '../sharedPresentational/SharedTextBox';
import InputField from '../sharedPresentational/SharedInputField';

class SignInPage extends Component {
  render() {
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
        <InputField
          label="Username"
          placeholder="Enter your username or email."
          type="text"
          name="username"
        />
        <InputField
          label="Password"
          placeholder="Enter your password"
          type="password"
          name="password"
        />
        <Link to="/profile-edit">
          <Button
            title="Sign In"
            size="3"
            margin="1"
          />
        </Link>
      </StyledFlex>
    );
  }
}

export default SignInPage;
