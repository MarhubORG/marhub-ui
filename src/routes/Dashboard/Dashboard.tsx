import React from 'react';
import styled from 'styled-components';
import cookie from 'react-cookies';
import { RouteComponentProps } from '@reach/router';
import { connect } from 'react-redux';
import { RootState } from '../../types/interfaces';
import Login from '../Registration/Login/Login';

interface DashboardProps extends RouteComponentProps {
  isLoggedIn: boolean;
}

export function UnconnectedDashboard(props: DashboardProps): JSX.Element {
  if (props.isLoggedIn !== true) {
    return <Login />;
  }
  return (
    <div>
      <Button>Download IRAP Data</Button>
    </div>
  );
}

export interface MapStateToProps {
  isLoggedIn: boolean;
}

export function mapStateToProps(state: RootState): MapStateToProps {
  const { isLoggedIn } = state.registration;
  return { isLoggedIn };
}

const Button = styled.button`
  margin: 1rem;
  width: 12rem;
  height: 3rem;
  background-color: ${({ theme }): string => theme.primaryColor};
  color: white;
  font-family: Open Sans, sans-serif;
  font-weight: 700;
  border-radius: 0.2rem;
  font-size: 0.8rem;
`;

export default connect(mapStateToProps)(UnconnectedDashboard);
