// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { StyledFlex } from './SplashPage';
import Button from '../sharedPresentational/SharedButton';
import NavBar from '../sharedPresentational/SharedNavBar';
import TextBox from '../sharedPresentational/SharedTextBox';
import InputField from '../sharedPresentational/SharedInputField';


const DropdownWrapper = styled.div`
  margin: 1em 0em;
`;

const MotiveDropdown = styled.select.attrs({
  name: 'motive',
})`
  background-color: #646fe2;
`;

const MotiveOption = styled.option.attrs({
  value: props => props.value,
})`
  background-color: #646fe2;
`;

const StyledLabel = styled.label`
  padding: 0.5em;
  margin: 0.5em;
  font-family: 'Lato','Helvetica Neue', 'Arial', 'Helvetica', sans-serif;
`;


class SignUpPage extends Component {
  render() {
    const motivations = ['environment', 'animal', 'food', 'health', 'all'];

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
          backgroundColour="#fbbd08"
          textColour="#fff"
        />
        <form >
          <InputField
            label="Username"
            name="username"
            placeholder="Time to name the new you!"
            type="text"
          />
          <InputField
            label="Email"
            name="email"
            placeholder="Some way to contact you."
            type="email"
          />
          <InputField
            label="Password"
            name="password"
            placeholder="Just for you. We won't tell anyone, promise."
            type="password"
          />
          <DropdownWrapper>
            <StyledLabel >
              Motivation
            </StyledLabel>
            <MotiveDropdown >
              {motivations.map((motivation: string, index: number) => {
                const motivationTitles = ['Environment', 'Animal Welfare', 'Food Equity', 'Personal Health', 'All of the Above'];
                return (
                  <MotiveOption value={motivation}>
                    {motivationTitles[index]}
                  </MotiveOption>
                );
              })}
            </MotiveDropdown>
          </DropdownWrapper>
          <Link to="/signin">
            <Button
              title="Let's Get Started"
              size="1"
              margin="5"
            />
          </Link>
        </form>
      </StyledFlex>
    );
  }
}

export default SignUpPage;
