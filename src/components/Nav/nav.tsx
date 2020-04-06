import React from 'react';
import styled from 'styled-components';
import { FiLogIn } from 'react-icons/fi';
import { Link, navigate } from '@reach/router';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { RootState } from '../../types/interfaces';
import { LogoutAction, logout } from '../../redux/actions/index';

const StyledNav = styled.nav`
  height: 2.75rem;
  display: flex;
  padding: 1rem;
  background-color: ${({ theme }): string => theme.white};
`;

const Logo = styled.img`
  padding-top: 0.3rem;
  height: 2rem;
`;

const Span = styled.span`
  text-align: center;
  min-width: 8rem;
  border-radius: 5px;
  height: 1.75rem;
  color: ${({ theme }): string => theme.white};
  margin-top: 0.1rem;
  margin-right: 1rem;
  background-color: ${({ theme }): string => theme.primaryColor};
  padding-top: 0.8rem;
  font-weight: 600;
  text-transform: uppercase;
  font-size: 0.8rem;
  text-decoration: none;
`;

const LoginIcon = styled(FiLogIn)`
  height: 1.2rem;
  width: 1.2rem;
  margin-bottom: -0.35rem;
  margin-right: 0.5rem;
`;

const StyledLink = styled(Link)`
  text-align: center;
  min-width: 8rem;
  border-radius: 5px;
  height: 1.75rem;
  color: ${({ theme }): string => theme.white};
  margin-top: 0.1rem;
  margin-left: auto;
  margin-right: 1rem;
  background-color: ${({ theme }): string => theme.primaryColor};
  padding-top: 0.8rem;
  font-weight: 600;
  text-transform: uppercase;
  font-size: 0.8rem;
  text-decoration: none;
`;

const StyledLogout = styled.button`
  text-align: center;
  min-width: 8rem;
  border-radius: 5px;
  height: 2.5rem;
  color: ${({ theme }): string => theme.white};
  margin-top: 0.1rem;
  margin-left: auto;
  margin-right: 1rem;
  background-color: ${({ theme }): string => theme.black};
  padding-top: 0.8rem;
  font-weight: 600;
  text-transform: uppercase;
  font-size: 0.8rem;
  text-decoration: none;
`;

const LOGO_SOURCE = `${process.env.PUBLIC_URL}logo.png`;

export function Login(): JSX.Element {
  return (
    <Span>
      <LoginIcon />
      Login
    </Span>
  );
}

export function Logout(): JSX.Element {
  return (
    <Span>
      <LoginIcon />
      Logout
    </Span>
  );
}

interface NavProps {
  isLoggedIn: boolean;
  logout(): LogoutAction;
}

export function UnconnectedNav(props: NavProps): JSX.Element {
  return (
    <StyledNav>
      <Link to="/">
        <Logo src={LOGO_SOURCE} alt="logo" />
      </Link>
      {!props.isLoggedIn && (
        <StyledLink to="login">
          <Login />
        </StyledLink>
      )}
      {props.isLoggedIn && (
        <StyledLink to="/" onClick={(): LogoutAction => props.logout()}>
          <Logout />
        </StyledLink>
      )}
    </StyledNav>
  );
}

export interface MapStateToProps {
  isLoggedIn: boolean;
}

export function mapStateToProps(state: RootState): MapStateToProps {
  const { isLoggedIn } = state.registration;
  return { isLoggedIn };
}

export interface MapDispatchToProps {
  logout(): LogoutAction;
}

export function mapDispatchToProps(dispatch: Dispatch): MapDispatchToProps {
  return {
    logout: (): LogoutAction => dispatch(logout()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(UnconnectedNav);
