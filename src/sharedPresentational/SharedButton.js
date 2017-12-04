import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Button = styled.button`
  border: 1px solid #e1a904;
  border-radius: .25rem;
  background-color: #fbbd08;
  min-height: 1rem;
  margin: ${props => props.topBotMargin}em ${props => props.leftRightMargin}em;
  padding: .75rem 1.5rem .75rem;
  font-family: 'Lato','Helvetica Neue', 'Arial', 'Helvetica', sans-serif;
  color: #fff;
  font-size: ${props => props.fontSize};
  align-self: center;

  &:hover {
    background-color: #e1a904;
  }
`;

const SharedButton = (props) => (
  <Button
    leftRightMargin={props.leftRightMargin || 0}
    topBotMargin={props.topBotMargin || 0}
    type={props}
    size={props.size}
  >
    {props.title}
  </Button>
)

SharedButton.propTypes = {
  title: PropTypes.string.isRequired,
  size: PropTypes.string,
  lefRightmargin: PropTypes.string,
  topBotMargin: PropTypes.string,
}

export default SharedButton;