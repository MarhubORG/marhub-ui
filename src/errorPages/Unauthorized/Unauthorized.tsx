import React from 'react';
import styled from 'styled-components';
import { Link } from '@reach/router';

export default function Unauthorized(): JSX.Element {
  return (
    <StyledDiv>
      Unauthorized user, please click
      <StyledLink to="/login">login</StyledLink> to continue.
    </StyledDiv>
  );
}

const StyledDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 37.5vh;
`;

const StyledLink = styled(Link)`
  margin: 0 0.2rem;
`;
