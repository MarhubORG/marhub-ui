/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import styled from 'styled-components';
import { RouteComponentProps, Router, Link } from '@reach/router';
import { connect } from 'react-redux';
import { RootState } from '../../types/interfaces';
import IrapDownload from './IrapDownload/irapDownload';
import OrganizationList from './OrganizationList/OrganizationList';
import UserList from './UserList/UserList';
import UserEdit from './UserEdit/UserEdit';
import UserNew from './UserNew/UserNew';
import TemplateList from './TemplateList/TemplateList';
import TemplateNew from './TemplateNew/TemplateNew';
import OrganizationExportTemplate from './OrganizationExportTemplate/OrganizationExportTemplate';
import Unauthorized from '../../errorPages/Unauthorized/Unauthorized';
import TableauDashboard from './TableauDashboard/TableauDashboard';
import NewOrganization from './NewOrganization/NewOrganization';
import TemplateEdit from './TemplateEdit/TemplateEdit';

import {
  MARHUB_ADMIN,
  MARHUB_USER,
  ADMIN,
  USER,
} from '../../auth/permissionTypes';

import {
  MARHUB,
  IRAP,
  TALENT_BEYOND_BOUNDARIES,
} from '../../auth/organizations';

export const DashboardItems = [
  // {
  //   component: UserList,
  //   buttonText: 'Users',
  //   pathString: '/users',
  //   permissions: [MARHUB_ADMIN],
  //   orgPermissions: [MARHUB],
  //   showButton: true,
  // },
  // {
  //   component: OrganizationList,
  //   buttonText: 'Organizations',
  //   pathString: '/organizations',
  //   permissions: [MARHUB_ADMIN],
  //   orgPermissions: [MARHUB],
  //   showButton: true,
  // },
  // {
  //   component: OrganizationExportTemplate,
  //   buttonText: 'Organization Export Template',
  //   pathString: 'organizations/organization-export-template/:organization',
  //   permissions: [MARHUB_ADMIN],
  //   orgPermissions: [MARHUB],
  //   showButton: false,
  // },
  // {
  //   component: TableauDashboard,
  //   buttonText: 'Dashboard',
  //   pathString: '/',
  //   permissions: [MARHUB_ADMIN, MARHUB_ADMIN, MARHUB_USER, ADMIN, USER],
  //   orgPermissions: [MARHUB, IRAP, TALENT_BEYOND_BOUNDARIES],
  //   showButton: true,
  // },
  // {
  //   component: IrapDownload,
  //   buttonText: 'Search',
  //   pathString: '/search',
  //   permissions: [MARHUB_ADMIN, MARHUB_USER, ADMIN, USER],
  //   orgPermissions: [MARHUB, IRAP],
  //   showButton: true,
  // },
  // {
  //   component: NewOrganization,
  //   buttonText: '',
  //   pathString: '/organizations/new',
  //   permissions: [MARHUB_ADMIN],
  //   orgPermissions: [MARHUB],
  //   showButton: false,
  // },
  // {
  //   component: UserEdit,
  //   buttonText: '',
  //   pathString: '/users/:id',
  //   permissions: [MARHUB_ADMIN],
  //   orgPermissions: [MARHUB],
  //   showButton: false,
  // },
  // {
  //   component: UserNew,
  //   buttonText: '',
  //   pathString: '/users/new',
  //   permissions: [MARHUB_ADMIN],
  //   orgPermissions: [MARHUB],
  //   showButton: false,
  // },
  // {
  //   component: TemplateList,
  //   buttonText: 'Templates',
  //   pathString: '/templates',
  //   permissions: [MARHUB_ADMIN, MARHUB_USER, ADMIN, USER],
  //   orgPermissions: [MARHUB, IRAP],
  //   showButton: true,
  // },
  {
    component: TemplateNew,
    buttonText: '',
    pathString: '/templates/new',
    permissions: [MARHUB_ADMIN, MARHUB_USER, ADMIN, USER],
    orgPermissions: [MARHUB, IRAP],
    showButton: false,
  },
  {
    component: TemplateEdit,
    buttonText: '',
    pathString: '/templates/:name',
    permissions: [MARHUB_ADMIN, MARHUB_USER, ADMIN, USER],
    orgPermissions: [MARHUB, IRAP],
    showButton: false,
  },
];

interface DashboardItem {
  permissions: string[];
  orgPermissions: string[];
}

export function hasPermission(
  el: DashboardItem,
  role: string,
  org: string
): boolean {
  console.log(this.props, 'props');

  if (el.permissions.includes(role)) {
    if (el.orgPermissions.includes(org)) {
      return true;
    }
  }
  return false;
}

interface DashboardProps extends RouteComponentProps {
  isLoggedIn: boolean;
  role?: string;
  myOrganization: string;
}

export class UnconnectedDashboard extends Component<DashboardProps> {
  createActionItems = () => {
    const { role, myOrganization } = this.props;
    return DashboardItems.map(el => {
      if (
        role !== undefined &&
        hasPermission(el, role, myOrganization) &&
        el.showButton
      ) {
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
    const { role, myOrganization } = this.props;
    console.log(this.props, 'props');
    const items = DashboardItems.map(el => {
      if (role !== undefined && hasPermission(el, role, myOrganization)) {
        const DashboardComponent = el.component;
        return <DashboardComponent key={el.pathString} path={el.pathString} />;
      }
      return null;
    });

    const nonNullItems = items.filter(el => {
      return el !== null;
    });

    return nonNullItems;
  };

  render(): JSX.Element {
    if (this.props.isLoggedIn !== true) {
      return <Unauthorized />;
    }
    const routerItems = this.createRouterItems();
    return (
      <Container>
        <ActionPanel>
          <Router>{routerItems}</Router>
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
  myOrganization: string;
}

export function mapStateToProps(state: RootState): MapStateToProps {
  const { isLoggedIn, role, myOrganization } = state.registration;
  return { isLoggedIn, role, myOrganization };
}

export default connect(mapStateToProps)(UnconnectedDashboard);
