// @flow
import React from 'react';
import axios from 'axios';
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
  const handleSubmit = () => {
    console.log('this is sign out handleSubmit');

    const url = 'http://localhost:3001/signout';

    axios({
      method: 'get',
      url,
    }).then((response) => {
      console.log('got data', response);
      props.userSignOut();
    }).catch((error) => {
      console.error('there was an error sending the query', error);
    });
  }

  const SignInSignOut = props.isAuthenticated ? (
    <div>
      <Link to="/signin">
        <button
          className="btn btn-lg btn-warning"
          onClick={handleSubmit}
        >
        Sign Out
        </button>
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
      <Link to={`/profile/${props.username}`} >
        <LinkedButton
          title="Profile Page"
          leftRightMargin="1"
        />
      </Link>
    </StyledNav>
  );
};

export default SharedNavBar;
