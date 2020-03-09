import React from 'react';
import styled from 'styled-components';
import { FiLogIn } from 'react-icons/fi';

const StyledNav = styled.nav`
  height: 2.75rem;
  display: flex;
  padding: 1rem;
`;

const Logo = styled.img`
  padding-top: 0.3rem;
  height: 2rem;
`;

const Anchor = styled.a`
  min-width: 8rem;
  border-radius: 5px;
  height: 1.75rem;
  color: white;
  margin-top: 0.1rem;
  margin-left: auto;
  margin-right: 1rem;
  background-color: #3366ff;
  padding-top: 0.8rem;
  font-weight: 600;
  text-transform: uppercase;
  font-size: 0.8rem;
`;

const LoginIcon = styled(FiLogIn)`
  height: 1.2rem;
  width: 1.2rem;
  margin-bottom: -0.35rem;
  margin-right: 0.5rem;
`;

const LOGO_SOURCE = `${process.env.PUBLIC_URL}logo.png`;

export function LoginAnchor() {
  return (
    <Anchor>
      <LoginIcon />
      Login
    </Anchor>
  );
}
export default function Nav() {
  return (
    <StyledNav>
      <Logo src={LOGO_SOURCE} alt="logo" />
      <LoginAnchor />
    </StyledNav>
  );
}
