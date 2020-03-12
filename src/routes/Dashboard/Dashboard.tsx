import React from 'react';
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
  return <div>Dashboard {props.isLoggedIn}</div>;
}

export interface MapStateToProps {
  isLoggedIn: boolean;
}

export function mapStateToProps(state: RootState): MapStateToProps {
  const { isLoggedIn } = state.registration;
  return { isLoggedIn };
}

export default connect(mapStateToProps)(UnconnectedDashboard);
