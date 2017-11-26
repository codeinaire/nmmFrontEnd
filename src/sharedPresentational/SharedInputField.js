import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledLabel = styled.label`
  padding: 0.5em;
  margin: 0.5em;
  font-family: 'Lato','Helvetica Neue', 'Arial', 'Helvetica', sans-serif;
`;

const StyledInput = styled.input.attrs({
  type: props => props.type,
  name: props => props.name
})`
  padding: 0.5em;
  margin: 0.5em;
  color: #fff;
  background-color: #646fe2;
  border: none;
  border-radius: 3px;
  min-height: 1em;
  font-size: 1rem;
  padding: .78571429em 1.5em .78571429em .5;
  font-family: 'Lato','Helvetica Neue', 'Arial', 'Helvetica', sans-serif;
`;

const SharedInputField = (props) => (
  <div>
    <StyledLabel >
      {props.label}
    </StyledLabel>
    <StyledInput
      placeholder={props.placeholder}
      type={props.type}
      name={props.name}
    />
  </div>
)

SharedInputField.propTypes = {
  label: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
}

export default SharedInputField;
