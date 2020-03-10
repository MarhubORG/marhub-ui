import React from 'react';
import styled from 'styled-components';
import { RouteComponentProps } from '@reach/router';

const Layout = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: white;
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

const TextInput = styled.input`
  height: 2rem;
  min-width: 18rem;
  max-width: 18rem;
  border-radius: 0.2rem;
  font-size: 0.9rem;
  padding-left: 1rem;
  padding-right: 1rem;
  border: 1px solid #edf1f7;
`;

const Label = styled.label`
  display: block;
  color: ${({ theme }): string => theme.grayText};
  font-family: Open Sans, sans-serif;
  font-size: 0.75rem;
  font-weight: 700;
  line-height: 1rem;
  margin: 0.5rem 0rem;
`;

const Header = styled.h1`
  text-align: center;
  font-family: Open Sans, sans-serif;
`;

const Button = styled.button`
  margin-top: 2rem;
  align-self: center;
  height: 2.4rem;
  width: 20rem;
  background-color: ${({ theme }): string => theme.disabledButtonBackground};
  color: ${({ theme }): string => theme.disabledButtonText};
  font-family: Open Sans, sans-serif;
  font-weight: 700;
  font-size: 0.9rem;
  text-transform: uppercase;
  border-radius: 0.2rem;
  border: none;
`;

const Container = styled.div`
  margin-top: -5rem;
`;

export default function Login(props: RouteComponentProps) {
  return (
    <Layout>
      <Container>
        <div>
          <Header>Login</Header>
        </div>
        <div>
          <Label htmlFor="email">Email:</Label>
          <TextInput type="text" placeholder="Email" name="email" />
        </div>
        <div>
          <Label htmlFor="email">Password:</Label>
          <TextInput type="password" placeholder="Password" name="password" />
        </div>
        <div>
          <Button disabled type="submit">
            Login
          </Button>
        </div>
      </Container>
    </Layout>
  );
}
