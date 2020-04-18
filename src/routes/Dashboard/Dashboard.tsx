/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import styled from 'styled-components';
import { RouteComponentProps, Router, Link } from '@reach/router';
import { connect } from 'react-redux';
import { RootState } from '../../types/interfaces';
import IrapDownload from './IrapDownload/irapDownload';
import OrganizationList from './OrganizationList/OrganizationList';
import OrganizationExportTemplate from './OrganizationExportTemplate/OrganizationExportTemplate';
import Unauthorized from '../../errorPages/Unauthorized/Unauthorized';
import TableauDashboard from './TableauDashboard/TableauDashboard';
import NewOrganization from './NewOrganization/NewOrganization';
import { MARHUB_ADMIN } from '../../auth/permissionTypes';

const DashboardItems = [
  {
    component: IrapDownload,
    buttonText: 'Irap Download',
    pathString: '/irap-download',
    permissions: [MARHUB_ADMIN, ''],
    showButton: true,
  },
  {
    component: OrganizationList,
    buttonText: 'Organizations',
    pathString: '/organizations',
    permissions: [MARHUB_ADMIN, ''],
    showButton: true,
  },
  {
    component: OrganizationExportTemplate,
    buttonText: 'Organization Export Template',
    pathString: 'organizations/organization-export-template/:organization',
    permissions: [MARHUB_ADMIN, ''],
    showButton: false,
  },
  {
    component: TableauDashboard,
    buttonText: 'Tableau',
    pathString: '/tableau',
    permissions: [MARHUB_ADMIN, ''],
    showButton: true,
  },
  {
    component: NewOrganization,
    buttonText: '',
    pathString: '/organizations/new',
    permissions: [MARHUB_ADMIN],
    showButton: false,
  },
];

interface DashboardItem {
  permissions: string[];
}

export function hasPermission(el: DashboardItem, role: string): boolean {
  if (el.permissions.includes(role)) {
    return true;
  }
  return false;
}

interface DashboardProps extends RouteComponentProps {
  isLoggedIn: boolean;
  role?: string;
}

export class UnconnectedDashboard extends Component<DashboardProps> {
  createActionItems = () => {
    const { role } = this.props;
    return DashboardItems.map(el => {
      if (role !== undefined && hasPermission(el, role) && el.showButton) {
        return (
          <ActionItem
            key={el.pathString}
            text={el.buttonText}
            path={el.pathString}
          />
        );
      }
      return null;
    });
  };

  createRouterItems = () => {
    const { role } = this.props;

    return DashboardItems.map(el => {
      if (role !== undefined && hasPermission(el, role)) {
        const DashboardComponent = el.component;
        return <DashboardComponent key={el.pathString} path={el.pathString} />;
      }
      return null;
    });
  };

  render(): JSX.Element {
    if (this.props.isLoggedIn !== true) {
      return <Unauthorized />;
    }
    return (
      <Container>
        <OptionsPanel>{this.createActionItems()}</OptionsPanel>
        <ActionPanel>
          <Router>{this.createRouterItems()}</Router>
        </ActionPanel>
      </Container>
    );
  }
}

interface ActionItemProps {
  text: string;
  path: string;
}
export function ActionItem(props: ActionItemProps): JSX.Element {
  return (
    <StyledLink to={`/dashboard${props.path}`}>
      <ActionItemLayout>{props.text}</ActionItemLayout>
    </StyledLink>
  );
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
  margin-bottom: 1rem;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
`;

export interface MapStateToProps {
  isLoggedIn: boolean;
  role: string;
}

export function mapStateToProps(state: RootState): MapStateToProps {
  const { isLoggedIn, role } = state.registration;
  return { isLoggedIn, role };
}

export default connect(mapStateToProps)(UnconnectedDashboard);
