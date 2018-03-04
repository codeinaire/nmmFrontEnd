// @flow
import React from 'react';
import styled from 'styled-components';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import { Link } from 'react-router-dom';
import LinkedButton from './SharedButton';

const StyledNav = styled.nav`
  background-color: #646fe2;
  width: 100%;
  padding: 1em 0em;
  display: flex;
  justify-content: space-between;
  order: 0;
`;

const SharedNavBar = (props) => {
  const SignInSignOut = props.signInSignOut ? (
    <div>
      <Link to="/signin">
        <LinkedButton title="Sign In" leftRightMargin="1" />
      </Link>
    </div>
  ) : (
    <div>
      <Link to="/signin">
        <LinkedButton title="Sign In" leftRightMargin="1" />
      </Link>
    </div>
  );
  return (
    <StyledNav className="navbar" >
      {SignInSignOut}
      <Link to="/profile">
        <LinkedButton title="Profile Page" leftRightMargin="1" />
      </Link>
    </StyledNav>
  );
};

export default SharedNavBar;
