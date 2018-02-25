//  @flow
import React from 'react';
import styled from 'styled-components';

const StyledImage = styled.img`
  border: .5rem solid #e1a904;
  border-radius: .25rem;
  margin: 0rem 2rem;
`;

type PropsType = {
  source: string,
  alt: string,
  height: string,
  width: string,
}

const SharedPicture = (props: PropsType) => (
  <StyledImage
    className="card-img-top"
    src={props.source}
    alt={props.alt}
    height={props.height}
    width={props.width}
  />
);

export default SharedPicture;
