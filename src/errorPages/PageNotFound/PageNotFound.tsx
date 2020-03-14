import React from 'react';
import styled from 'styled-components';
import { Link, RouteComponentProps } from '@reach/router';

export default function Unauthorized(props: RouteComponentProps): JSX.Element {
  return (
    <Layout>
      <StyledMessage>Sorry! This page doesn't exist.</StyledMessage>
      <SecondaryMessage>
        Click back or the link to go to the
        <StyledLink to="/">home page</StyledLink>.
      </SecondaryMessage>
    </Layout>
  );
}

const Layout = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-color: ${({ theme }): string => theme.white};
  border-radius: 0.2rem;
  margin: 2rem 3rem;
  min-width: 90%;
  min-height: 65vh;
  box-shadow: 0 0.5rem 1rem 0 rgba(44, 51, 73, 0.1);

  @media (max-width: 768px) {
    margin: 0rem 0rem;
    min-height: 75vh;
  }
`;

const StyledMessage = styled.div`
  font-size: 2rem;
  color: ${({ theme }): string => theme.secondaryColor};
`;

const SecondaryMessage = styled.div`
  margin-top: 0.5rem;
  font-size: 1.2rem;
  color: ${({ theme }): string => theme.secondaryColor};
`;

const StyledLink = styled(Link)`
  margin: 0 0.2rem;
  a {
    color: ${({ theme }): string => theme.primaryColor};
  }
`;
