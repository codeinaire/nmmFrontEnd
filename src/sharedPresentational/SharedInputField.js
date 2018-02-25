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
  font-family: 'Lato','Helvetica Neue', 'Arial', 'Helvetica', sans-serif;
  margin: 0.5rem 0.5rem 0;
`;

type PropsType = {
  ariaLabel: string,
  innerRef: () => {},
  labelFor: string,
  labelName: string,
  name: string,
  onChange: () => {},
  pattern: string,
  placeholder: string,
  type: string,
  value: () => {},
}

const SharedInputField = (props: PropsType) => (
  <StyledLabel
    labelFor={props.labelFor}
  >
    <span>{props.labelName}:</span>
    <StyledInput
      ariaLabel={props.ariaLabel}
      className="form-control"
      id={props.labelFor}
      innerRef={props.innerRef || null}
      name={props.name}
      onChange={props.onChange || null}
      pattern={props.pattern || null}
      placeholder={props.placeholder}
      type={props.type}
      value={props.value || null}
      required
    />
  </StyledLabel>
);

export default SharedInputField;
