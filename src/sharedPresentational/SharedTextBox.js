//  @flow
import React from 'react';
import styled from 'styled-components';

const StyledText = styled.h2.attrs({
  backgroundcolour: props => props.backgroundcolour || '#646fe2',
  fontSize: props => props.size || '1rem',
  textColour: props => props.textColour || '#000',
})`
  align-self: center;
  background-color: ${props => props.backgroundcolour};
  border: 1px solid;
  border-radius: .25rem;
  color: ${props => props.textColour};
  font-family: 'Lato','Helvetica Neue', 'Arial', 'Helvetica', sans-serif;
  font-size: ${props => props.fontSize}rem;
  margin: 1rem 0rem;
  min-height: 1rem;
  padding: .75rem 1.5em .75rem;
  text-align: center;
`;

type PropsType = {
  backgroundcolour: string,
  text: string,
  textColour: string,
  size: string,
}

const SharedTextBox = (props: PropsType) => (
  <StyledText
    backgroundcolour={props.backgroundcolour}
    size={props.size}
    textColour={props.textColour}
  >
    {props.text}
  </StyledText>
);

export default SharedTextBox;
