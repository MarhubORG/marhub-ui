/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import styled from 'styled-components';
import { RouteComponentProps } from '@reach/router';
import { connect } from 'react-redux';
import { RootState } from '../../types/interfaces';
import IrapDownload from './IrapDownload/irapDownload';

interface DashboardProps extends RouteComponentProps {
  isLoggedIn: boolean;
}

/* eslint-disable @typescript-eslint/indent */
export class UnconnectedDashboard extends Component<DashboardProps> {
  /* eslint-enable @typescript-eslint/indent */

  render(): JSX.Element {
    // if (this.props.isLoggedIn !== true) {
    //   return <Unauthorized />;
    // }
    return (
      <Container>
        <OptionsPanel>Hi</OptionsPanel>
        <ActionPanel>
          <IrapDownload />
        </ActionPanel>
      </Container>
    );
  }
}

export interface MapStateToProps {
  isLoggedIn: boolean;
}

export function mapStateToProps(state: RootState): MapStateToProps {
  const { isLoggedIn } = state.registration;
  return { isLoggedIn };
}

const Container = styled.div`
  display: flex;
`;

const OptionsPanel = styled.div`
  flex: 1;
  background-color: ${({ theme }): string => theme.white};
  height: 74.8vh;
  border: 1px solid ${({ theme }): string => theme.grayText};
`;

const ActionPanel = styled.div`
  flex: 3;
`;

export default connect(mapStateToProps)(UnconnectedDashboard);
