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
  width: 20rem;
  border-radius: 0.2rem;
`;

const Label = styled.label`
  display: block;
`;

const Header = styled.h1`
  text-align: center;
  font-family: Open Sans, sans-serif;
`;

const Button = styled.button`
  margin-top: 1rem;
  align-self: center;
  height: 2rem;
  width: 20.4rem;
  border: 1px solid black;
`;

export default function Login(props: RouteComponentProps) {
  return (
    <Layout>
      <div>
        <div>
          <Header>Login</Header>
        </div>
        <div>
          <Label htmlFor="email">Email:</Label>
          <TextInput type="text" name="email" />
        </div>
        <div>
          <Label htmlFor="email">Password:</Label>
          <TextInput type="password" name="password" />
        </div>
        <div>
          <Button type="submit">Log in</Button>
        </div>
      </div>
    </Layout>
  );
}
