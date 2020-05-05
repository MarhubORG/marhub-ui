import React, { useState } from 'react';
import styled from 'styled-components';
import { FiLogIn } from 'react-icons/fi';
import { Link } from '@reach/router';

import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { RootState } from '../../types/interfaces';
import { LogoutAction, logout } from '../../redux/actions/index';
import { DashboardItems } from '../../routes/Dashboard/Dashboard';

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
  margin-left: 1rem;
  margin-right: 1rem;
  background-color: ${({ theme }): string => theme.primaryColor};
  padding-top: 0.8rem;
  font-weight: 600;
  text-transform: uppercase;
  font-size: 0.8rem;
  text-decoration: none;
`;

const LoginLink = styled(Link)`
  text-align: center;
  min-width: 8rem;
  border-radius: 5px;
  height: 1.75rem;
  color: ${({ theme }): string => theme.white};
  margin-left: auto;
  margin-right: 1rem;
  background-color: ${({ theme }): string => theme.primaryColor};
  padding-top: 0.8rem;
  font-weight: 600;
  text-transform: uppercase;
  font-size: 0.8rem;
  text-decoration: none;
`;

const LOGO_SOURCE = `${process.env.PUBLIC_URL}logo.png`;

const DashboardLink = styled(Link)`
  background-color: ${({ theme }): string => theme.primaryColor};
  color: ${({ theme }): string => theme.white};
  min-width: 8rem;
  text-decoration: none;
  padding-top: 0.8rem;
  font-weight: 600;
  text-transform: uppercase;
  font-size: 0.8rem;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  margin-left: 1rem;
  height: 1.75rem;
`;

const InvertedDashboardLink = styled(Link)`
  background-color: ${({ theme }): string => theme.white};
  color: ${({ theme }): string => theme.primaryColor};
  min-width: 8rem;
  text-decoration: none;
  padding-top: 0.8rem;
  font-weight: 600;
  text-transform: uppercase;
  font-size: 0.8rem;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  margin-left: 1rem;
  height: 1.75rem;
  border: 1px solid ${({ theme }): string => theme.primaryColor};
`;

const DashboardLinks = styled.div`
  margin-left: auto;
  display: flex;
`;

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
  pathname: string;
  isLoggedIn: boolean;
  logout(): LogoutAction;
  role: string;
}

interface Params {
  setCurrentButton: (str: string) => void;
  currentButton: string;
  pathname: string;
  role: string;
}
export function createDashboardLinks(params: Params) {
  const { role } = params;
  // eslint-disable-next-line consistent-return
  const items = DashboardItems.map(el => {
    if (!el.permissions.includes(role)) {
      return null;
    }
    const url = `/dashboard${el.pathString}`;
    const currentString =
      params.currentButton === '' ? params.pathname : params.currentButton;
    if (el.showButton) {
      if (url === currentString) {
        return (
          <InvertedDashboardLink key={el.pathString} to={url}>
            {el.buttonText}
          </InvertedDashboardLink>
        );
      }
      return (
        <DashboardLink
          key={el.pathString}
          to={url}
          onClick={(): void => params.setCurrentButton(url)}
        >
          {el.buttonText}
        </DashboardLink>
      );
    }
  });
  // setSelectedButton('a');
  const nonNullItems = items.filter(el => {
    return el !== null;
  });

  return nonNullItems;
}
export function UnconnectedNav(props: NavProps): JSX.Element {
  const [currentButton, setCurrentButton] = useState('');
  const { pathname, role } = props;
  return (
    <StyledNav>
      <Link to="/">
        <Logo src={LOGO_SOURCE} alt="logo" />
      </Link>
      {!props.isLoggedIn && (
        <LoginLink to="login">
          <Login />
        </LoginLink>
      )}
      {props.isLoggedIn && (
        <>
          <DashboardLinks>
            {createDashboardLinks({
              setCurrentButton,
              currentButton,
              pathname,
              role,
            })}
          </DashboardLinks>
          <StyledLink to="/" onClick={(): LogoutAction => props.logout()}>
            <Logout />
          </StyledLink>
        </>
      )}
    </StyledNav>
  );
}

export interface MapStateToProps {
  isLoggedIn: boolean;
  role: string;
}

export function mapStateToProps(state: RootState): MapStateToProps {
  const { isLoggedIn, role } = state.registration;
  return { isLoggedIn, role };
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
