import React from 'react';
import styled from 'styled-components';
import cookie from 'react-cookies';
import { RouteComponentProps } from '@reach/router';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { RootState } from '../../types/interfaces';
import Login from '../Registration/Login/Login';
import {
  ExportingIrapDataAction,
  exportingIrapData,
} from '../../redux/actions/api';

interface DashboardProps extends RouteComponentProps {
  isLoggedIn: boolean;
  exportingIrapData(): ExportingIrapDataAction;
}

export function UnconnectedDashboard(props: DashboardProps): JSX.Element {
  // if (props.isLoggedIn !== true) {
  //   return <Login />;
  // }

  return (
    <div>
      <Button
        onClick={() =>
          props.exportingIrapData !== undefined
            ? props.exportingIrapData()
            : null
        }
      >
        Download IRAP Data
      </Button>
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

export interface MapDispatchToProps {
  exportingIrapData(): ExportingIrapDataAction;
}

export function mapDispatchToProps(dispatch: Dispatch): MapDispatchToProps {
  return {
    exportingIrapData: (): ExportingIrapDataAction =>
      dispatch(exportingIrapData()),
  };
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UnconnectedDashboard);
