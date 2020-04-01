/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import styled from 'styled-components';
import { RouteComponentProps, Router, Link } from '@reach/router';
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
        <OptionsPanel>
          <ActionItem text="IRAP Download" />
        </OptionsPanel>
        <ActionPanel>
          <Router>
            <IrapDownload path="/irap-download" />
          </Router>
        </ActionPanel>
      </Container>
    );
  }
}

interface ActionItemProps {
  text: string;
}
export function ActionItem(props: ActionItemProps): JSX.Element {
  return (
    <StyledLink to="/dashboard/irap-download">
      <ActionItemLayout>{props.text}</ActionItemLayout>
    </StyledLink>
  );
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
  height: 72.37vh;
  border: 1px solid ${({ theme }): string => theme.grayText};
  padding: 0.5rem;
`;

const ActionPanel = styled.div`
  flex: 3;
`;

const ActionItemLayout = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 5rem;
  width: 100%;
  border: 1px solid black;
  border-radius: 0.5rem;
  background-color: ${({ theme }): string => theme.primaryColor};
  color: ${({ theme }): string => theme.white};
  text-decoration: none;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
`;

export default connect(mapStateToProps)(UnconnectedDashboard);
