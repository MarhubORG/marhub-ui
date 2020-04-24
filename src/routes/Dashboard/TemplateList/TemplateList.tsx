import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { Dispatch } from 'redux';
import { Link } from '@reach/router';
import { RootState } from '../../../types/interfaces';
import {
  Organization,
  fetchOrganizations,
  FetchOrganizationsAction,
} from '../../../redux/actions/dashboard';

interface TemplateListProps {
  myOrganization: string;
  organizations: Organization[];
  fetchOrganizations(): FetchOrganizationsAction;
}

class UnconnectedTemplateList extends Component<TemplateListProps> {
  componentDidMount(): void {
    this.props.fetchOrganizations();
  }

  getMyOrganization = (): Organization | null => {
    const { myOrganization, organizations } = this.props;
    for (let x = 0; x < organizations.length; x++) {
      if (`${organizations[x].id}` === myOrganization) {
        return organizations[x];
      }
    }
    return null;
  };

  createTemplateList = (): JSX.Element[] | null => {
    const myOrg = this.getMyOrganization();
    const templates = myOrg?.organisation.templates;
    if (templates !== undefined) {
      const arr = Object.keys(templates);
      return arr.map(el => {
        return (
          <StyledLink key={el} to="#">
            {el}
          </StyledLink>
        );
      });
    }
    return null;
  };

  render(): JSX.Element {
    return (
      <Layout>
        <h1>Templates</h1>
        <StyledLinkInverted to="/dashboard/templates/new">
          Create New Template
        </StyledLinkInverted>
        {this.createTemplateList()}
      </Layout>
    );
  }
}

const Layout = styled.div`
  margin-left: 1rem;
`;

const StyledLink = styled(Link)`
  background-color: ${({ theme }): string => theme.white};
  height: 4rem;
  display: flex;
  align-items: center;
  padding-left: 3rem;
  margin: 1rem;
  border-radius: 0.5rem;
  text-decoration: none;
  color: ${({ theme }): string => theme.primaryColor};
  font-weight: 600;
`;

const StyledLinkInverted = styled(Link)`
  background-color: ${({ theme }): string => theme.primaryColor};
  height: 4rem;
  display: flex;
  align-items: center;
  padding-left: 3rem;
  margin: 1rem 1rem 1rem 0;
  border-radius: 0.5rem;
  text-decoration: none;
  color: ${({ theme }): string => theme.white};
  font-weight: 600;
`;

export interface MapStateToProps {
  myOrganization: string;
  organizations: Organization[];
}

export function mapStateToProps(state: RootState): MapStateToProps {
  const { myOrganization } = state.registration;
  const { organizations } = state.dashboardReducer;
  return { myOrganization, organizations };
}

export interface MapDispatchToProps {
  fetchOrganizations(): FetchOrganizationsAction;
}

export function mapDispatchToProps(dispatch: Dispatch): MapDispatchToProps {
  return {
    fetchOrganizations: (): FetchOrganizationsAction =>
      dispatch(fetchOrganizations()),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UnconnectedTemplateList);
