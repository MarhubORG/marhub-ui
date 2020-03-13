import React, { Component } from 'react';
import styled from 'styled-components';
import { Link } from '@reach/router';

export default function Unauthorized(): JSX.Element {
  return (
    <StyledDiv>
      Sorry! This page doesn't exist. Click back or the link to go to the
      <StyledLink to="/">home page</StyledLink>.
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
