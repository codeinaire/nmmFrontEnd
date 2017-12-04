import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledLabel = styled.label`
  padding: 0.5rem;
  margin: 0.5rem;
  font-family: 'Lato','Helvetica Neue', 'Arial', 'Helvetica', sans-serif;
`;

const StyledInput = styled.input.attrs({
  type: props => props.type,
  name: props => props.name
})`
  padding: 0.5rem;
  margin: 0.5rem;
  color: #fff;
  background-color: #646fe2;
  border: none;
  border-radius: 3px;
  min-height: 1rem;
  font-size: 1rem;
  padding: .75rem 1.5rem .75rem .5;
  font-family: 'Lato','Helvetica Neue', 'Arial', 'Helvetica', sans-serif;
`;

const SharedInputField = (props) => (
  <StyledLabel >
    {props.label}
    <StyledInput placeholder={props.placeholder} type={props.type} name={props.name}/>
  </StyledLabel>
)

SharedInputField.propTypes = {
  label: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
}

export default SharedInputField;
