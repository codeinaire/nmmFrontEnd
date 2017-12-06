// @flow
import React from 'react';
import styled from 'styled-components';
import LinkedButton from './SharedButton';

const StyledNav = styled.nav`
  background-color: #646fe2;
  width: 100%;
  padding: 1em 0em;
  display: flex;
  justify-content: space-between;
  order: 0;
`;

const SharedNavBar = () => (
  <StyledNav >
    <LinkedButton title="I'm a linked button 1" leftRightMargin="1" />
    <LinkedButton title="I'm a linked button 2" leftRightMargin="1" />
  </StyledNav>
);

export default SharedNavBar;
