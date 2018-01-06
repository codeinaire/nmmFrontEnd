// @flow
import React from 'react';
import styled from 'styled-components';

const StyledLabel = styled.label.attrs({
  htmlFor: props => props.labelFor,
})`
  font-family: 'Lato','Helvetica Neue', 'Arial', 'Helvetica', sans-serif;
  margin: 0.5rem;
  padding: 0.5rem;
  text-align: center;
`;

const StyledInput = styled.input.attrs({
  'aria-label': props => props.ariaLabel,
  id: props => props.id,
  name: props => props.name,
  type: props => props.type,
})`
  background-color: #646fe2;
  border: none;
  border-radius: 3px;
  color: #fff;
  display: inline-block;
  font-family: 'Lato','Helvetica Neue', 'Arial', 'Helvetica', sans-serif;
  font-size: 1rem;
  margin: 0.5rem;
  min-height: 1rem;
  padding: .75rem 1.5rem .75rem .5rem;
`;

type PropsType = {
  ariaLabel: string,
  labelFor: string,
  labelName: string,
  name: string,
  placeholder: string,
  type: string,
}

const SharedInputField = (props: PropsType) => (
  <div>
    <StyledLabel
      labelFor={props.labelFor}
    >
      <span>{props.labelName}:</span>
      <StyledInput
        ariaLabel={props.ariaLabel}
        id={props.labelFor}
        name={props.name}
        placeholder={props.placeholder}
        type={props.type}
      />
    </StyledLabel>
  </div>
);

export default SharedInputField;
